import { Injectable, NotFoundException } from '@nestjs/common';

export interface AdmissionDossier {
  id: string;
  trackingNumber: string;
  createdAt: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'ACCEPTED' | 'REJECTED';
  personalInfo: {
    firstName: string;
    lastName: string;
    gender: 'M' | 'F';
    dateOfBirth: string;
    placeOfBirth: string;
    nationality: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    status: 'LAIC' | 'RELIGIEUX' | 'RELIGIEUSE' | 'PRETRE';
    congregationOrDiocese?: string;
  };
  academicChoice: {
    formationId: string;
    formationTitle: string;
    modality: 'PRESENTIAL' | 'ONLINE' | 'HYBRID';
    academicYear: string;
  };
  previousEducation: {
    highestDegree: string;
    institution: string;
    yearObtained: string;
  };
  documentsSubmitted: {
    idCardOrPassport: boolean;
    highestDiploma: boolean;
    recommendationLetter: boolean;
    motivationLetter: boolean;
  };
}

@Injectable()
export class AdmissionsService {
  private admissions: AdmissionDossier[] = [
    {
      id: 'adm-101',
      trackingNumber: 'ISSR-2026-4891',
      createdAt: '2026-09-17T10:30:00Z',
      status: 'PENDING',
      personalInfo: {
        firstName: 'Jean-Paul',
        lastName: 'NDONGO',
        gender: 'M',
        dateOfBirth: '1994-06-12',
        placeOfBirth: 'Yaoundé',
        nationality: 'Camerounaise',
        phone: '+237 699 12 34 56',
        whatsapp: '+237699123456',
        email: 'jp.ndongo@gmail.com',
        address: 'Yaoundé, Quartier Biyem-Assi',
        status: 'LAIC',
      },
      academicChoice: {
        formationId: 'baccalaureat-canonique',
        formationTitle: 'Baccalauréat Canonique en Sciences Religieuses (Licence)',
        modality: 'PRESENTIAL',
        academicYear: '2026-2027',
      },
      previousEducation: {
        highestDegree: 'Baccalauréat A4',
        institution: 'Lycée Général Leclerc',
        yearObtained: '2013',
      },
      documentsSubmitted: {
        idCardOrPassport: true,
        highestDiploma: true,
        recommendationLetter: true,
        motivationLetter: true,
      },
    },
    {
      id: 'adm-102',
      trackingNumber: 'ISSR-2026-3104',
      createdAt: '2026-09-14T09:15:00Z',
      status: 'ACCEPTED',
      personalInfo: {
        firstName: 'Sr. Marie-Claire',
        lastName: 'FOTSO',
        gender: 'F',
        dateOfBirth: '1988-11-23',
        placeOfBirth: 'Bafoussam',
        nationality: 'Camerounaise',
        phone: '+237 677 88 99 00',
        whatsapp: '+237677889900',
        email: 'sr.marieclaire@soeurs-clarisses.org',
        address: 'Mvolyé, Couvent Sainte Claire',
        status: 'RELIGIEUSE',
        congregationOrDiocese: 'Sœurs Clarisses de Yaoundé',
      },
      academicChoice: {
        formationId: 'du-ingenierie-pastorale',
        formationTitle: "DU en Ingénierie Pastorale & Gestion de Projets d'Église",
        modality: 'HYBRID',
        academicYear: '2026-2027',
      },
      previousEducation: {
        highestDegree: 'Licence en Sciences de Gestion',
        institution: 'Université de Yaoundé II Soa',
        yearObtained: '2018',
      },
      documentsSubmitted: {
        idCardOrPassport: true,
        highestDiploma: true,
        recommendationLetter: true,
        motivationLetter: true,
      },
    },
  ];

  findAll(status?: string): AdmissionDossier[] {
    if (status && status !== 'ALL') {
      return this.admissions.filter((a) => a.status === status);
    }
    return this.admissions;
  }

  findByTracking(tracking: string): AdmissionDossier {
    const item = this.admissions.find(
      (a) => a.trackingNumber.toUpperCase() === tracking.toUpperCase()
    );
    if (!item) {
      throw new NotFoundException(`Dossier avec numéro ${tracking} introuvable`);
    }
    return item;
  }

  create(dossier: Omit<AdmissionDossier, 'id' | 'trackingNumber' | 'createdAt' | 'status'>): AdmissionDossier {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `ISSR-2026-${randomCode}`;
    const newAdmission: AdmissionDossier = {
      id: `adm-${Date.now()}`,
      trackingNumber,
      createdAt: new Date().toISOString(),
      status: 'PENDING',
      ...dossier,
    };
    this.admissions.unshift(newAdmission);

    // Event Bus simulated dispatch
    console.log(`[EVENT_BUS] Event ADMISSION_SUBMITTED emitted for ${trackingNumber}`);

    return newAdmission;
  }

  updateStatus(id: string, status: AdmissionDossier['status']): AdmissionDossier {
    const admission = this.admissions.find((a) => a.id === id || a.trackingNumber === id);
    if (!admission) {
      throw new NotFoundException(`Candidature avec identifiant ${id} non trouvée`);
    }
    admission.status = status;
    console.log(`[EVENT_BUS] Event ADMISSION_STATUS_UPDATED for ${admission.trackingNumber}: ${status}`);
    return admission;
  }
}
