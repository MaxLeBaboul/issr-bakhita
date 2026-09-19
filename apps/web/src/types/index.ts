export type FormationCategory = 'canonique' | 'professionnelle' | 'certificat';

export interface Formation {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: FormationCategory;
  duration: string; // e.g. "3 ans (6 semestres)" or "2 ans"
  diploma: string; // e.g. "Baccalauréat Canonique / Licence"
  targetAudience: string; // e.g. "Laïcs, religieux(ses), prêtres"
  modality: string; // e.g. "Présentiel à Yaoundé & En ligne (Zoom/Meet)"
  description: string;
  objectives: string[];
  program: {
    semester: string;
    modules: string[];
  }[];
  careerProspects: string[];
  requirements: string[];
  tuition: {
    registrationFee: string;
    annualTuition: string;
    installments: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  objectPosition?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  readTime: string;
  featured?: boolean;
}

export interface UploadedDocumentItem {
  id: string;
  category: 'idDocument' | 'diploma' | 'transcripts' | 'recommendation' | 'motivation' | 'photo';
  title: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  dataUrl?: string;
  uploadedAt: string;
}

export interface AdmissionApplication {
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
  uploadedDocuments?: UploadedDocumentItem[];
}
