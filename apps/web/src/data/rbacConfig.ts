import { 
  UserProfile, 
  UserRole, 
  StudentGradeItem, 
  FinancialTuitionRecord, 
  CourseResourceItem, 
  AuditLogEntry 
} from '../types/rbac';

export const PROFILES_CONFIG: Record<UserRole, UserProfile> = {
  admin: {
    id: 'usr-admin',
    role: 'admin',
    name: 'Maxwell BABOULA',
    title: 'Administrateur Système & DSI',
    email: 'maxwellbaboula@gmail.com',
    department: 'Direction des Systèmes d’Information',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    badgeLabel: 'Super-Admin'
  },
  directeur: {
    id: 'usr-dir',
    role: 'directeur',
    name: 'P. Dr Patrice MEKANA, sac',
    title: 'Directeur de l’Institut',
    email: 'direction@issr-bakhita.cm',
    department: 'Direction Générale',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    badgeLabel: 'Direction Institutionnelle'
  },
  prefet_etudes: {
    id: 'usr-prefet',
    role: 'prefet_etudes',
    name: 'Sr. Patience ENGANEMBEN',
    title: 'Préfet des Études',
    email: 'prefet.etudes@issr-bakhita.cm',
    department: 'Direction Académique & Pédagogique',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    badgeLabel: 'Préfet des Études'
  },
  secretaire_acad: {
    id: 'usr-sec-acad',
    role: 'secretaire_acad',
    name: 'M. Jean Claude MEKOULOU',
    title: 'Secrétaire Académique',
    email: 'scolarite.acad@issr-bakhita.cm',
    department: 'Service de la Scolarité & Examens',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    badgeLabel: 'Secrétariat Académique'
  },
  secretaire_admin: {
    id: 'usr-sec-admin',
    role: 'secretaire_admin',
    name: 'Mme Christine NKOLO',
    title: 'Secrétaire Administrative',
    email: 'secretariat@issr-bakhita.cm',
    department: 'Accueil & Admissions',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeLabel: 'Secrétariat Administratif'
  },
  econome: {
    id: 'usr-econome',
    role: 'econome',
    name: 'P. Économe Jean-Paul BESSALA',
    title: 'Économe & Gestionnaire Financier',
    email: 'economat@issr-bakhita.cm',
    department: 'Économat & Intendance',
    badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    badgeLabel: 'Économe'
  },
  rep_enseignants: {
    id: 'usr-rep-ens',
    role: 'rep_enseignants',
    name: 'Pr. Antoine ESSOMBA',
    title: 'Délégué du Collège des Enseignants',
    email: 'rep.enseignants@issr-bakhita.cm',
    department: 'Conseil Pédagogique',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    badgeLabel: 'Délégué Enseignants'
  },
  enseignants: {
    id: 'usr-ens',
    role: 'enseignants',
    name: 'Dr. Théophile NDONG (Prof. Écriture Sainte)',
    title: 'Enseignant Permanent',
    email: 't.ndong@issr-bakhita.cm',
    department: 'Département d’Études Bibliques',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    badgeLabel: 'Corps Enseignant'
  },
  etudiants: {
    id: 'usr-etud',
    role: 'etudiants',
    name: 'Fr. Emmanuel NGOUMOU (Matricule: ISSR-2026-084)',
    title: 'Étudiant en Baccalauréat Canonique (L2)',
    email: 'e.ngoumou@etudiant.issr-bakhita.cm',
    department: 'Promotion Saint Thomas d’Aquin',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    badgeLabel: 'Espace Étudiant'
  }
};

export interface RolePermissionRule {
  allowedTabs: string[];
  canApproveAdmission: boolean;
  canVerifyDocuments: boolean;
  canSendWhatsApp: boolean;
  canEditGrades: boolean;
  canLockGrades: boolean;
  canGrantQuitus: boolean;
  canPublishArticles: boolean;
  canDraftArticles: boolean;
  canManageMaquette: boolean;
  canManageUsers: boolean;
  canViewAudit: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissionRule> = {
  admin: {
    allowedTabs: ['dashboard', 'admissions', 'pedagogy', 'grades', 'finance', 'courses', 'articles', 'messages', 'security'],
    canApproveAdmission: false,
    canVerifyDocuments: true,
    canSendWhatsApp: true,
    canEditGrades: false,
    canLockGrades: false,
    canGrantQuitus: false,
    canPublishArticles: true,
    canDraftArticles: true,
    canManageMaquette: true,
    canManageUsers: true,
    canViewAudit: true,
  },
  directeur: {
    allowedTabs: ['dashboard', 'admissions', 'pedagogy', 'grades', 'finance', 'courses', 'articles', 'messages'],
    canApproveAdmission: true,
    canVerifyDocuments: true,
    canSendWhatsApp: true,
    canEditGrades: false,
    canLockGrades: true,
    canGrantQuitus: false,
    canPublishArticles: true,
    canDraftArticles: true,
    canManageMaquette: true,
    canManageUsers: false,
    canViewAudit: true,
  },
  prefet_etudes: {
    allowedTabs: ['dashboard', 'admissions', 'pedagogy', 'grades', 'courses', 'articles'],
    canApproveAdmission: false, // Donner avis
    canVerifyDocuments: true,
    canSendWhatsApp: true,
    canEditGrades: true,
    canLockGrades: true,
    canGrantQuitus: false,
    canPublishArticles: true,
    canDraftArticles: true,
    canManageMaquette: true,
    canManageUsers: false,
    canViewAudit: false,
  },
  secretaire_acad: {
    allowedTabs: ['dashboard', 'admissions', 'pedagogy', 'grades', 'courses'],
    canApproveAdmission: false,
    canVerifyDocuments: true,
    canSendWhatsApp: true,
    canEditGrades: true,
    canLockGrades: false,
    canGrantQuitus: false,
    canPublishArticles: false,
    canDraftArticles: true,
    canManageMaquette: false,
    canManageUsers: false,
    canViewAudit: false,
  },
  secretaire_admin: {
    allowedTabs: ['dashboard', 'admissions', 'messages', 'articles'],
    canApproveAdmission: false,
    canVerifyDocuments: true,
    canSendWhatsApp: true,
    canEditGrades: false,
    canLockGrades: false,
    canGrantQuitus: false,
    canPublishArticles: false,
    canDraftArticles: true,
    canManageMaquette: false,
    canManageUsers: false,
    canViewAudit: false,
  },
  econome: {
    allowedTabs: ['dashboard', 'finance', 'admissions'],
    canApproveAdmission: false,
    canVerifyDocuments: false,
    canSendWhatsApp: true,
    canEditGrades: false,
    canLockGrades: false,
    canGrantQuitus: true,
    canPublishArticles: false,
    canDraftArticles: false,
    canManageMaquette: false,
    canManageUsers: false,
    canViewAudit: false,
  },
  rep_enseignants: {
    allowedTabs: ['dashboard', 'pedagogy', 'courses', 'articles'],
    canApproveAdmission: false,
    canVerifyDocuments: false,
    canSendWhatsApp: false,
    canEditGrades: false,
    canLockGrades: false,
    canGrantQuitus: false,
    canPublishArticles: false,
    canDraftArticles: true,
    canManageMaquette: false,
    canManageUsers: false,
    canViewAudit: false,
  },
  enseignants: {
    allowedTabs: ['dashboard', 'grades', 'courses', 'articles'],
    canApproveAdmission: false,
    canVerifyDocuments: false,
    canSendWhatsApp: false,
    canEditGrades: true,
    canLockGrades: false,
    canGrantQuitus: false,
    canPublishArticles: false,
    canDraftArticles: true,
    canManageMaquette: false,
    canManageUsers: false,
    canViewAudit: false,
  },
  etudiants: {
    allowedTabs: ['dashboard', 'courses', 'grades', 'finance'],
    canApproveAdmission: false,
    canVerifyDocuments: false,
    canSendWhatsApp: false,
    canEditGrades: false,
    canLockGrades: false,
    canGrantQuitus: false,
    canPublishArticles: false,
    canDraftArticles: false,
    canManageMaquette: false,
    canManageUsers: false,
    canViewAudit: false,
  }
};

// Seed Mock Data for Academic Grades
export const SAMPLE_GRADES: StudentGradeItem[] = [
  {
    id: 'grd-01',
    studentId: 'std-101',
    studentName: 'Fr. Emmanuel NGOUMOU',
    courseCode: 'THEO-201',
    courseTitle: 'Théologie Fondamentale & Révélation',
    filiere: 'Baccalauréat Canonique en Sciences Religieuses',
    semester: 'Semestre 3',
    continuousAssessment: 15.5,
    finalExam: 16.0,
    average: 15.8,
    credits: 6,
    status: 'VALIDE',
    teacherName: 'Dr. Théophile NDONG'
  },
  {
    id: 'grd-02',
    studentId: 'std-101',
    studentName: 'Fr. Emmanuel NGOUMOU',
    courseCode: 'BIBL-202',
    courseTitle: 'Exégèse des Évangiles Synoptiques',
    filiere: 'Baccalauréat Canonique en Sciences Religieuses',
    semester: 'Semestre 3',
    continuousAssessment: 14.0,
    finalExam: 15.0,
    average: 14.6,
    credits: 6,
    status: 'VALIDE',
    teacherName: 'Dr. Théophile NDONG'
  },
  {
    id: 'grd-03',
    studentId: 'std-102',
    studentName: 'Sr. Marie-Claire ATSAMA',
    courseCode: 'PAST-301',
    courseTitle: 'Ingénierie des Projets d’Église & Aumônerie',
    filiere: 'Licence en Sciences Religieuses — Option Ingénierie Pastorale',
    semester: 'Semestre 5',
    continuousAssessment: 17.0,
    finalExam: 17.5,
    average: 17.3,
    credits: 6,
    status: 'VALIDE',
    teacherName: 'P. Dr Patrice MEKANA'
  },
  {
    id: 'grd-04',
    studentId: 'std-103',
    studentName: 'M. Jean-Baptiste TCHAMBA',
    courseCode: 'PED-102',
    courseTitle: 'Didactique et Pédagogie de l’Enseignement Religieux',
    filiere: 'DU en Pédagogie Religieuse',
    semester: 'Semestre 2',
    continuousAssessment: 11.5,
    finalExam: 12.0,
    average: 11.8,
    credits: 4,
    status: 'VALIDE',
    teacherName: 'Sr. Patience ENGANEMBEN'
  },
  {
    id: 'grd-05',
    studentId: 'std-104',
    studentName: 'Abbé Justin FOE',
    courseCode: 'GOUV-401',
    courseTitle: 'Gouvernance et Droit Canonique Appliqué',
    filiere: 'Master Sciences Religieuses : Option Pastorale & Gouvernance Ecclésiale',
    semester: 'Semestre 1',
    continuousAssessment: 16.0,
    finalExam: 16.5,
    average: 16.3,
    credits: 6,
    status: 'VALIDE',
    teacherName: 'P. Dr Patrice MEKANA'
  }
];

// Seed Mock Data for Financial Tuition Records (Économe)
export const SAMPLE_FINANCES: FinancialTuitionRecord[] = [
  {
    id: 'fin-01',
    studentId: 'std-101',
    studentName: 'Fr. Emmanuel NGOUMOU',
    matricule: 'ISSR-2026-084',
    filiere: 'Baccalauréat Canonique en Sciences Religieuses',
    academicYear: '2026-2027',
    category: 'RELIGIEUX',
    sponsor: 'Congrégation des Frères Pallottins',
    registrationFeePaid: true,
    totalTuition: 765000,
    totalPaid: 765000,
    remainingDue: 0,
    examQuitusGranted: true,
    quitusGrantedBy: 'P. Économe Jean-Paul BESSALA',
    quitusGrantedAt: '12 Septembre 2026',
    installments: [
      { id: 'inst-1', label: 'Inscription administrative', amount: 50000, paid: true, paidAt: '01/08/2026', receiptNumber: 'REC-2026-012' },
      { id: 'inst-2', label: '1ère Tranche (Rentrée)', amount: 400000, paid: true, paidAt: '15/08/2026', receiptNumber: 'REC-2026-045' },
      { id: 'inst-3', label: '2ème Tranche (Mi-parcours)', amount: 315000, paid: true, paidAt: '10/09/2026', receiptNumber: 'REC-2026-089' }
    ]
  },
  {
    id: 'fin-02',
    studentId: 'std-102',
    studentName: 'Mme Sandrine MBIDA',
    matricule: 'ISSR-2026-112',
    filiere: 'Baccalauréat Canonique en Sciences Religieuses',
    academicYear: '2026-2027',
    category: 'LAIC',
    registrationFeePaid: true,
    totalTuition: 150000,
    totalPaid: 150000,
    remainingDue: 0,
    examQuitusGranted: true,
    quitusGrantedBy: 'P. Économe Jean-Paul BESSALA',
    quitusGrantedAt: '15 Septembre 2026',
    installments: [
      { id: 'inst-4', label: 'Inscription administrative', amount: 50000, paid: true, paidAt: '05/08/2026', receiptNumber: 'REC-2026-024' },
      { id: 'inst-5', label: '1ère Tranche', amount: 60000, paid: true, paidAt: '20/08/2026', receiptNumber: 'REC-2026-062' },
      { id: 'inst-6', label: 'Solde annuel', amount: 40000, paid: true, paidAt: '14/09/2026', receiptNumber: 'REC-2026-095' }
    ]
  },
  {
    id: 'fin-03',
    studentId: 'std-103',
    studentName: 'M. Jean-Baptiste TCHAMBA',
    matricule: 'ISSR-2026-145',
    filiere: 'DU en Pédagogie Religieuse',
    academicYear: '2026-2027',
    category: 'LAIC',
    registrationFeePaid: true,
    totalTuition: 280000,
    totalPaid: 180000,
    remainingDue: 100000,
    examQuitusGranted: false,
    installments: [
      { id: 'inst-7', label: 'Inscription administrative', amount: 50000, paid: true, paidAt: '10/08/2026', receiptNumber: 'REC-2026-033' },
      { id: 'inst-8', label: '1ère Tranche', amount: 130000, paid: true, paidAt: '01/09/2026', receiptNumber: 'REC-2026-078' },
      { id: 'inst-9', label: '2ème Tranche (Échéance Nov. 2026)', amount: 100000, paid: false }
    ]
  },
  {
    id: 'fin-04',
    studentId: 'std-104',
    studentName: 'Abbé Justin FOE',
    matricule: 'ISSR-2026-029',
    filiere: 'Master Sciences Religieuses : Option Pastorale & Gouvernance Ecclésiale',
    academicYear: '2026-2027',
    category: 'PRETRE',
    sponsor: 'Archidiocèse de Yaoundé',
    registrationFeePaid: true,
    totalTuition: 850000,
    totalPaid: 850000,
    remainingDue: 0,
    examQuitusGranted: true,
    quitusGrantedBy: 'P. Économe Jean-Paul BESSALA',
    quitusGrantedAt: '18 Septembre 2026',
    installments: [
      { id: 'inst-10', label: 'Inscription administrative', amount: 50000, paid: true, paidAt: '02/08/2026', receiptNumber: 'REC-2026-015' },
      { id: 'inst-11', label: 'Prise en charge intégrale Diocèse', amount: 800000, paid: true, paidAt: '12/09/2026', receiptNumber: 'REC-2026-092' }
    ]
  }
];

// Seed Mock Data for Course Resources & Syllabi
export const SAMPLE_COURSES: CourseResourceItem[] = [
  {
    id: 'crs-01',
    courseCode: 'THEO-201',
    courseTitle: 'Théologie Fondamentale & Révélation',
    filiere: 'Baccalauréat Canonique en Sciences Religieuses',
    semester: 'Semestre 3',
    teacherName: 'Dr. Théophile NDONG',
    title: 'Syllabus & Bibliographie Officielle 2026-2027',
    description: 'Programme détaillé du cours, critères d’évaluation de session et lectures obligatoires du Magistère.',
    type: 'SYLLABUS',
    fileSize: '1.2 Mo',
    downloadUrl: '#',
    meetUrl: 'https://meet.google.com/issr-theo-201',
    updatedAt: '14 Septembre 2026'
  },
  {
    id: 'crs-02',
    courseCode: 'THEO-201',
    courseTitle: 'Théologie Fondamentale & Révélation',
    filiere: 'Baccalauréat Canonique en Sciences Religieuses',
    semester: 'Semestre 3',
    teacherName: 'Dr. Théophile NDONG',
    title: 'Module 1 : Foi et Raison selon Vatican I et Vatican II (PDF)',
    description: 'Polycopié complet avec analyse comparée de Dei Filius et Dei Verbum.',
    type: 'COURS_PDF',
    fileSize: '4.8 Mo',
    downloadUrl: '#',
    meetUrl: 'https://meet.google.com/issr-theo-201',
    updatedAt: '17 Septembre 2026'
  },
  {
    id: 'crs-03',
    courseCode: 'PAST-301',
    courseTitle: 'Ingénierie des Projets d’Église & Aumônerie',
    filiere: 'Licence en Sciences Religieuses — Option Ingénierie Pastorale',
    semester: 'Semestre 5',
    teacherName: 'P. Dr Patrice MEKANA',
    title: 'Guide méthodologique de montage de projet pastoral',
    description: 'Cahier des charges pour la planification pastorale participative en contexte africain.',
    type: 'COURS_PDF',
    fileSize: '3.1 Mo',
    downloadUrl: '#',
    meetUrl: 'https://meet.google.com/issr-past-301',
    updatedAt: '16 Septembre 2026'
  },
  {
    id: 'crs-04',
    courseCode: 'GOUV-401',
    courseTitle: 'Gouvernance et Droit Canonique Appliqué',
    filiere: 'Master Sciences Religieuses : Option Pastorale & Gouvernance Ecclésiale',
    semester: 'Semestre 1',
    teacherName: 'P. Dr Patrice MEKANA',
    title: 'Recueil des canons applicables aux biens temporels d’Église',
    description: 'Code de droit canonique (Livre V) et décrets d’application des conférences épiscopales régionales.',
    type: 'BIBLIOGRAPHIE',
    fileSize: '2.5 Mo',
    downloadUrl: '#',
    meetUrl: 'https://meet.google.com/issr-gouv-401',
    updatedAt: '10 Septembre 2026'
  }
];

// Seed Mock Data for Audit Logs (Admin DSI)
export const SAMPLE_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-01',
    timestamp: '19 Septembre 2026 à 15:42',
    actorName: 'P. Économe Jean-Paul BESSALA',
    actorRole: 'econome',
    action: 'Délivrance de Quitus Financier',
    target: 'Fr. Emmanuel NGOUMOU (ISSR-2026-084)',
    details: 'Solde intégralement réglé (765 000 FCFA). Quitus d’examen accordé avec succès.',
    severity: 'INFO'
  },
  {
    id: 'log-02',
    timestamp: '19 Septembre 2026 à 15:10',
    actorName: 'Mme Christine NKOLO',
    actorRole: 'secretaire_admin',
    action: 'Instruction de Dossier de Candidature',
    target: 'Candidat Jean-Marc Kouamé (ISSR-2026-4692)',
    details: 'Conformité vérifiée : CNI, Baccalauréat certifié et Lettre de motivation.',
    severity: 'INFO'
  },
  {
    id: 'log-03',
    timestamp: '19 Septembre 2026 à 14:35',
    actorName: 'P. Dr Patrice MEKANA, sac',
    actorRole: 'directeur',
    action: 'Décision d’Admission Définitive',
    target: 'Sr. Thérèse MBALLA (ISSR-2026-108)',
    details: 'Avis favorable du Préfet des Études confirmé. Admission définitive prononcée.',
    severity: 'INFO'
  },
  {
    id: 'log-04',
    timestamp: '19 Septembre 2026 à 11:20',
    actorName: 'Dr. Théophile NDONG',
    actorRole: 'enseignants',
    action: 'Saisie de Notes de Contrôle Continu',
    target: 'Module THEO-201 (Théologie Fondamentale)',
    details: 'Notes saisies pour 18 étudiants de la promotion L2.',
    severity: 'INFO'
  },
  {
    id: 'log-05',
    timestamp: '19 Septembre 2026 à 09:15',
    actorName: 'M. Gaël Marcel ABANDA',
    actorRole: 'admin',
    action: 'Sauvegarde Système & Contrôle des Accès',
    target: 'Base de données & Stockage numérique',
    details: 'Snapshot complet généré et chiffré. Intégrité des réplicas validée.',
    severity: 'INFO'
  }
];
