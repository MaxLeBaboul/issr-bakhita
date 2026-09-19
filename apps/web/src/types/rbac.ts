import { UploadedDocumentItem } from './index';

export type UserRole = 
  | 'admin'
  | 'directeur'
  | 'prefet_etudes'
  | 'secretaire_acad'
  | 'secretaire_admin'
  | 'econome'
  | 'rep_enseignants'
  | 'enseignants'
  | 'etudiants';

export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  title: string;
  email: string;
  avatar?: string;
  department: string;
  badgeColor: string;
  badgeLabel: string;
}

export interface StudentGradeItem {
  id: string;
  studentId: string;
  studentName: string;
  courseCode: string;
  courseTitle: string;
  filiere: string;
  semester: string;
  continuousAssessment: number; // /20
  finalExam: number; // /20
  average: number; // /20
  credits: number;
  status: 'VALIDE' | 'RATTRAPAGE' | 'EN_COURS';
  teacherName: string;
}

export interface FinancialTuitionRecord {
  id: string;
  studentId: string;
  studentName: string;
  matricule: string;
  filiere: string;
  academicYear: string;
  category: 'LAIC' | 'RELIGIEUX' | 'RELIGIEUSE' | 'PRETRE';
  sponsor?: string;
  registrationFeePaid: boolean; // 50 000 FCFA
  totalTuition: number; // e.g. 150 000 or 765 000 FCFA
  totalPaid: number;
  remainingDue: number;
  examQuitusGranted: boolean;
  quitusGrantedBy?: string;
  quitusGrantedAt?: string;
  installments: {
    id: string;
    label: string;
    amount: number;
    paid: boolean;
    paidAt?: string;
    receiptNumber?: string;
  }[];
}

export interface CourseResourceItem {
  id: string;
  courseCode: string;
  courseTitle: string;
  filiere: string;
  semester: string;
  teacherName: string;
  title: string;
  description: string;
  type: 'SYLLABUS' | 'COURS_PDF' | 'EXERCICE' | 'BIBLIOGRAPHIE';
  fileSize: string;
  downloadUrl: string;
  meetUrl?: string;
  updatedAt: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  target: string;
  details: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
}
