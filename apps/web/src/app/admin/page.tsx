'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  FileText, 
  PlusCircle, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Eye, 
  Search, 
  Filter, 
  Trash2, 
  Send, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight,
  BookOpen,
  Calendar,
  Layers,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  Check,
  UserCheck,
  Download,
  LogOut,
  FileCheck,
  UploadCloud,
  X,
  AlertCircle,
  Award,
  DollarSign,
  Lock,
  Unlock,
  CreditCard,
  RefreshCw,
  FileSpreadsheet,
  Key,
  AlertTriangle,
  HelpCircle,
  FileDown,
  Printer,
  Mail,
  UserPlus,
  Inbox
} from 'lucide-react';
import { ARTICLES, INSTITUTION_INFO } from '../../data/mockData';
import { Article, AdmissionApplication, UploadedDocumentItem } from '../../types';
import { SCHOOL_API_URL, CMS_API_URL } from '../../lib/api';
import { 
  UserRole, 
  UserProfile, 
  StudentGradeItem, 
  FinancialTuitionRecord, 
  CourseResourceItem, 
  AuditLogEntry 
} from '../../types/rbac';
import { 
  PROFILES_CONFIG, 
  ROLE_PERMISSIONS, 
  SAMPLE_GRADES, 
  SAMPLE_FINANCES, 
  SAMPLE_COURSES, 
  SAMPLE_AUDIT_LOGS 
} from '../../data/rbacConfig';

type AdminTab = 
  | 'dashboard' 
  | 'admissions' 
  | 'pedagogy' 
  | 'grades' 
  | 'finance' 
  | 'courses' 
  | 'articles' 
  | 'messages' 
  | 'security';

export default function AdminPage() {
  // Active Role state (defaults to Directeur)
  const [activeRole, setActiveRole] = useState<UserRole>('directeur');
  const currentProfile: UserProfile = PROFILES_CONFIG[activeRole];
  const permissions = ROLE_PERMISSIONS[activeRole];

  // Tab navigation state
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Load saved role from login or session
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem('issr_logged_role') as UserRole;
      if (savedRole && PROFILES_CONFIG[savedRole]) {
        setActiveRole(savedRole);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('issr_logged_role');
      localStorage.removeItem('issr_logged_user');
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}
    window.location.href = '/login';
  };

  // Ensure activeTab is allowed when switching role
  useEffect(() => {
    if (!permissions.allowedTabs.includes(activeTab)) {
      setActiveTab((permissions.allowedTabs[0] as AdminTab) || 'dashboard');
    }
  }, [activeRole, permissions.allowedTabs, activeTab]);

  // Data states
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [grades, setGrades] = useState<StudentGradeItem[]>(SAMPLE_GRADES);
  const [finances, setFinances] = useState<FinancialTuitionRecord[]>(SAMPLE_FINANCES);
  const [courses, setCourses] = useState<CourseResourceItem[]>(SAMPLE_COURSES);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(SAMPLE_AUDIT_LOGS);

  // Filter & Search states
  const [admissionFilter, setAdmissionFilter] = useState<string>('ALL');
  const [admissionSearch, setAdmissionSearch] = useState<string>('');
  const [selectedAdmission, setSelectedAdmission] = useState<AdmissionApplication | null>(null);
  const [previewDocument, setPreviewDocument] = useState<UploadedDocumentItem | null>(null);

  // Grade edit states (for teachers)
  const [editingGradeId, setEditingGradeId] = useState<string | null>(null);
  const [editCC, setEditCC] = useState<number>(0);
  const [editExam, setEditExam] = useState<number>(0);

  // Article creation form state
  const [showArticleModal, setShowArticleModal] = useState<boolean>(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: 'Admissions',
    excerpt: '',
    content: '',
    imageUrl: '/images/img-1050.jpg',
    readTime: '3 min',
    featured: false
  });

  // Action notification toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // User manual creation state (Strictly for Admin, Directeur, Secrétaire Admin)
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [newUserForm, setNewUserForm] = useState<{
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    department: string;
  }>({
    email: '',
    role: 'enseignants',
    firstName: '',
    lastName: '',
    department: 'Département d’Études Bibliques'
  });

  // Email notifications inspection state
  const [showEmailLogsModal, setShowEmailLogsModal] = useState<boolean>(false);
  const [emailLogs, setEmailLogs] = useState<any[]>([]);
  const [activeEmailPreview, setActiveEmailPreview] = useState<any | null>(null);

  const fetchEmailLogs = async () => {
    try {
      const res = await fetch(`${SCHOOL_API_URL}/api/notifications/logs`);
      if (res.ok) {
        const logs = await res.json();
        setEmailLogs(logs);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchEmailLogs();
    const interval = setInterval(fetchEmailLogs, 8000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Add an audit log entry
  const logAction = (action: string, target: string, details: string, severity: 'INFO' | 'WARNING' | 'CRITICAL' = 'INFO') => {
    const newEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorName: currentProfile.name,
      actorRole: activeRole,
      action,
      target,
      details,
      severity
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const canCreateAccounts = activeRole === 'admin' || activeRole === 'directeur' || activeRole === 'secretaire_admin';

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.email || !newUserForm.firstName || !newUserForm.lastName) {
      showToast("Veuillez renseigner tous les champs obligatoires.", "warning");
      return;
    }

    try {
      const res = await fetch(`${SCHOOL_API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': activeRole,
        },
        body: JSON.stringify(newUserForm),
      });

      const data = await res.json();
      if (res.ok) {
        setShowUserModal(false);
        setNewUserForm({
          email: '',
          role: 'enseignants',
          firstName: '',
          lastName: '',
          department: 'Département d’Études Bibliques',
        });
        logAction(
          'CRÉATION_COMPTE_MANUELLE',
          data.email,
          `Compte créé manuellement pour ${data.firstName} ${data.lastName} (${data.roleTitle}) avec envoi d'un email d'initialisation de mot de passe.`
        );
        showToast(`Compte créé avec succès ! Un email officiel d'activation a été transmis à ${data.email}.`);
        fetchEmailLogs();
      } else {
        showToast(data.message || "Erreur lors de la création du compte.", "warning");
      }
    } catch {
      // Fallback local
      setShowUserModal(false);
      logAction(
        'CRÉATION_COMPTE_MANUELLE',
        newUserForm.email,
        `Compte créé pour ${newUserForm.firstName} ${newUserForm.lastName} avec expédition du lien d'activation.`
      );
      showToast(`Compte créé ! Un email d'activation a été transmis à ${newUserForm.email}.`);
    }
  };

  // Load initial admissions & messages
  useEffect(() => {
    try {
      const storedAdmissions = JSON.parse(localStorage.getItem('issr_admissions') || '[]');
      if (Array.isArray(storedAdmissions) && storedAdmissions.length > 0) {
        setAdmissions(storedAdmissions);
      } else {
        const sampleAdmissions: AdmissionApplication[] = [
          {
            id: "adm-101",
            trackingNumber: "ISSR-2026-4891",
            createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            status: "PENDING",
            personalInfo: {
              firstName: "Jean-Paul",
              lastName: "NDONGO",
              gender: "M",
              dateOfBirth: "1994-06-12",
              placeOfBirth: "Yaoundé",
              nationality: "Camerounaise",
              phone: "+237 699 12 34 56",
              whatsapp: "+237699123456",
              email: "jp.ndongo@gmail.com",
              address: "Yaoundé, Quartier Biyem-Assi",
              status: "LAIC"
            },
            academicChoice: {
              formationId: "baccalaureat-canonique",
              formationTitle: "Baccalauréat Canonique en Sciences Religieuses (Licence)",
              modality: "PRESENTIAL",
              academicYear: "2026-2027"
            },
            academicBackground: {
              highestDegree: "BACCALAUREAT",
              degreeTitle: "Baccalauréat A4 Philosophie-Lettres",
              graduationYear: "2023",
              institution: "Collège François-Xavier Vogt"
            },
            religiousInfo: {
              parish: "Paroisse Saint-Pierre de Tsinga, Yaoundé",
              diocese: "Archidiocèse de Yaoundé"
            },
            documents: [
              {
                id: "doc-1",
                type: "BIRTH_CERTIFICATE",
                title: "Acte de Naissance certifié",
                fileName: "acte_naissance_jp_ndongo.pdf",
                fileSize: "1.4 MB",
                uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
                status: "VERIFIED"
              },
              {
                id: "doc-2",
                type: "HIGHEST_DIPLOMA",
                title: "Diplôme du Baccalauréat A4",
                fileName: "diplome_bac_a4_certifie.pdf",
                fileSize: "2.1 MB",
                uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
                status: "VERIFIED"
              },
              {
                id: "doc-3",
                type: "COVER_LETTER",
                title: "Lettre de Motivation & Projet d'Études",
                fileName: "lettre_motivation_ndongo.pdf",
                fileSize: "680 KB",
                uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
                status: "VERIFIED"
              }
            ],
            notes: "Dossier académique solide. Recommandé par la paroisse Saint-Pierre."
          },
          {
            id: "adm-102",
            trackingNumber: "ISSR-2026-3104",
            createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
            status: "ACCEPTED",
            personalInfo: {
              firstName: "Marie-Thérèse",
              lastName: "MEFIRY",
              gender: "F",
              dateOfBirth: "1998-03-24",
              placeOfBirth: "Foumban",
              nationality: "Camerounaise",
              phone: "+237 677 44 22 11",
              whatsapp: "+237677442211",
              email: "m.mefiry@congre-soeurs.org",
              address: "Communauté des Soeurs Pallottines, Yaoundé",
              status: "RELIGIEUSE"
            },
            academicChoice: {
              formationId: "licence-theologie-pastorale",
              formationTitle: "Licence en Théologie Pastorale & Catéchétique",
              modality: "PRESENTIAL",
              academicYear: "2026-2027"
            },
            academicBackground: {
              highestDegree: "LICENCE",
              degreeTitle: "Licence en Sciences de l'Éducation",
              graduationYear: "2021",
              institution: "Université de Yaoundé I"
            },
            religiousInfo: {
              congregation: "Soeurs Missionnaires de l'Apostolat Catholique (Pallottines)",
              superiorName: "Sr. Véronique NKEMBE",
              superiorContact: "+237 677 00 11 22",
              diocese: "Archidiocèse de Yaoundé"
            },
            documents: [
              {
                id: "doc-201",
                type: "BIRTH_CERTIFICATE",
                title: "CNI Religieuse",
                fileName: "cni_soeur_marie_therese.pdf",
                fileSize: "1.1 MB",
                uploadedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
                status: "VERIFIED"
              },
              {
                id: "doc-202",
                type: "HIGHEST_DIPLOMA",
                title: "Licence Sciences de l'Éducation",
                fileName: "diplome_licence_uy1.pdf",
                fileSize: "2.8 MB",
                uploadedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
                status: "VERIFIED"
              },
              {
                id: "doc-203",
                type: "COVER_LETTER",
                title: "Lettre de mission de la Supérieure",
                fileName: "autorisation_superieure_pallottines.pdf",
                fileSize: "850 KB",
                uploadedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
                status: "VERIFIED"
              }
            ],
            notes: "Candidature officiellement validée par la Direction le 16/09/2026."
          },
          {
            id: "adm-103",
            trackingNumber: "ISSR-2026-9052",
            createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
            status: "PENDING",
            personalInfo: {
              firstName: "Abbé Marc",
              lastName: "ONANA",
              gender: "M",
              dateOfBirth: "1990-11-05",
              placeOfBirth: "Mbalmayo",
              nationality: "Camerounaise",
              phone: "+237 698 88 77 66",
              whatsapp: "+237698887766",
              email: "m.onana@diocesembalmayo.org",
              address: "Évêché de Mbalmayo",
              status: "PRETRE"
            },
            academicChoice: {
              formationId: "master-sciences-religieuses",
              formationTitle: "Master Canonique / Licence Canonique en Sciences Religieuses",
              modality: "HYBRID",
              academicYear: "2026-2027"
            },
            academicBackground: {
              highestDegree: "AUTRE",
              degreeTitle: "Baccalauréat Canonique en Théologie",
              graduationYear: "2018",
              institution: "Grand Séminaire Théologique de Nkolbisson"
            },
            religiousInfo: {
              diocese: "Diocèse de Mbalmayo",
              superiorName: "S.E. Mgr Joseph Marie NDI-OKALLA"
            },
            documents: [
              {
                id: "doc-301",
                type: "BIRTH_CERTIFICATE",
                title: "Passeport & Celebret",
                fileName: "celebret_abbe_marc.pdf",
                fileSize: "1.9 MB",
                uploadedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
                status: "PENDING"
              },
              {
                id: "doc-302",
                type: "HIGHEST_DIPLOMA",
                title: "Baccalauréat Canonique Théologie",
                fileName: "bacc_canonique_theologie.pdf",
                fileSize: "3.2 MB",
                uploadedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
                status: "PENDING"
              },
              {
                id: "doc-303",
                type: "COVER_LETTER",
                title: "Projet de recherche Master",
                fileName: "projet_recherche_master_onana.pdf",
                fileSize: "920 KB",
                uploadedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
                status: "PENDING"
              }
            ],
            notes: "Dossier en attente de vérification des équivalences ecclésiastiques."
          }
        ];
        setAdmissions(sampleAdmissions);
        localStorage.setItem('issr_admissions', JSON.stringify(sampleAdmissions));
      }
    } catch (e) {
      console.error("Erreur chargement candidatures:", e);
    }

    setArticles(ARTICLES);

    setMessages([
      {
        id: "msg-1",
        name: "Dr. Samuel BIKOI",
        email: "s.bikoi@univ-yaounde.cm",
        phone: "+237 699 45 12 00",
        filiere: "Baccalauréat Canonique en Sciences Religieuses",
        subject: "Renseignements sur les cours du soir et cours du samedi",
        message: "Bonjour Père Directeur, je suis enseignant à l'université et je souhaiterais savoir si le Baccalauréat Canonique est accessible en formule cours du soir compatible avec mon emploi du temps.",
        createdAt: "2026-09-18T10:14:00Z",
        status: "NEW"
      },
      {
        id: "msg-2",
        name: "Sr. Bernadette MVONGO",
        email: "bernadette.mvongo@yahoo.fr",
        phone: "+237 671 23 89 90",
        filiere: "Licence en Théologie Pastorale",
        subject: "Prise en charge congréganiste des frais de scolarité",
        message: "Bonjour, notre congrégation compte inscrire deux religieuses pour la rentrée d'octobre 2026. Pourrions-nous recevoir le relevé d'identité bancaire pour le virement de la première tranche ?",
        createdAt: "2026-09-17T15:30:00Z",
        status: "REPLIED"
      }
    ]);
  }, []);

  // Save admissions changes
  const updateAdmissionStatus = (id: string, newStatus: "PENDING" | "ACCEPTED" | "REJECTED" | "WAITLIST" | "UNDER_REVIEW") => {
    const isApprovalOrRejection = newStatus === 'ACCEPTED' || newStatus === 'REJECTED';
    if (isApprovalOrRejection && !permissions.canApproveAdmission && activeRole !== 'admin') {
      showToast("Opération refusée : Seule la Direction est habilitée à statuer sur les admissions définitives.", "warning");
      return;
    }
    if (newStatus === 'UNDER_REVIEW' && !permissions.canVerifyDocuments && !permissions.canApproveAdmission && activeRole !== 'admin') {
      showToast("Opération refusée : Droits insuffisants pour mettre le dossier en examen.", "warning");
      return;
    }
    const updated = admissions.map(adm => {
      if (adm.id === id) {
        return { ...adm, status: newStatus as any };
      }
      return adm;
    });
    setAdmissions(updated);
    if (selectedAdmission && selectedAdmission.id === id) {
      setSelectedAdmission({ ...selectedAdmission, status: newStatus as any });
    }
    localStorage.setItem('issr_admissions', JSON.stringify(updated));
    logAction(
      `DÉCISION_ADMISSION_${newStatus}`,
      id,
      `Statut passé à ${newStatus} par ${currentProfile.name} (${currentProfile.title}) avec notification email transmise.`,
      newStatus === 'REJECTED' ? 'WARNING' : 'INFO'
    );

    // Call NestJS backend to dispatch candidate automated email
    fetch(`${SCHOOL_API_URL}/api/admissions/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: newStatus,
        notes: selectedAdmission?.notes || `Statut académique : ${newStatus}`,
      }),
    })
      .then(res => res.json())
      .then(() => {
        fetchEmailLogs();
        showToast(`Dossier ${id} mis à jour : Email officiel expédié au candidat (${newStatus}).`);
      })
      .catch(() => {
        showToast(`Dossier ${id} mis à jour avec succès : Statut -> ${newStatus}`);
      });
  };

  // Verify document
  const toggleDocStatus = (admId: string, docId: string) => {
    if (!permissions.canVerifyDocuments) {
      showToast("Vous n'avez pas les droits de certification des pièces administratives.", "warning");
      return;
    }
    const updated = admissions.map(adm => {
      if (adm.id === admId && adm.documents) {
        const updatedDocs = adm.documents.map(doc => {
          if (doc.id === docId) {
            const nextStatus: "VERIFIED" | "REJECTED" | "PENDING" = 
              doc.status === 'VERIFIED' ? 'REJECTED' : 'VERIFIED';
            return { ...doc, status: nextStatus };
          }
          return doc;
        });
        return { ...adm, documents: updatedDocs };
      }
      return adm;
    });
    setAdmissions(updated);
    localStorage.setItem('issr_admissions', JSON.stringify(updated));
    if (selectedAdmission && selectedAdmission.id === admId) {
      const refreshed = updated.find(a => a.id === admId);
      if (refreshed) setSelectedAdmission(refreshed);
    }
    logAction('VÉRIFICATION_DOCUMENT', `${admId}/${docId}`, `Contrôle de conformité de pièce par ${currentProfile.name}`);
    showToast("Statut de conformité du document mis à jour.");
  };

  // Toggle Financial Quitus (for Économe)
  const toggleFinancialQuitus = (recordId: string) => {
    if (!permissions.canGrantQuitus) {
      showToast("Accès restreint : Seul l'Économe peut octroyer le Quitus d'Examen officiel.", "warning");
      return;
    }
    setFinances(prev => prev.map(rec => {
      if (rec.id === recordId) {
        const nextState = !rec.examQuitusGranted;
        logAction(
          nextState ? 'OCTROI_QUITUS_EXAMEN' : 'RÉVOCATION_QUITUS_EXAMEN',
          rec.matricule,
          `${nextState ? 'Quitus délivré' : 'Quitus révoqué'} pour ${rec.studentName} par ${currentProfile.name}`,
          nextState ? 'INFO' : 'WARNING'
        );
        return {
          ...rec,
          examQuitusGranted: nextState,
          quitusGrantedBy: nextState ? currentProfile.name : undefined,
          quitusGrantedAt: nextState ? new Date().toISOString() : undefined
        };
      }
      return rec;
    }));
    showToast("Statut du Quitus d'Examen mis à jour.");
  };

  // Save grade edit (for Enseignant)
  const handleSaveGrade = (gradeId: string) => {
    if (!permissions.canEditGrades) {
      showToast("Vous n'êtes pas autorisé à saisir des notes d'examen.", "warning");
      return;
    }
    setGrades(prev => prev.map(grd => {
      if (grd.id === gradeId) {
        const avg = Math.round(((editCC * 0.4) + (editExam * 0.6)) * 10) / 10;
        const status = avg >= 10 ? 'VALIDE' : 'RATTRAPAGE';
        logAction(
          'SAISIE_NOTE_EXAMEN',
          `${grd.courseCode} - ${grd.studentName}`,
          `Notes modifiées : CC=${editCC}/20, Examen=${editExam}/20, Moyenne=${avg}/20`,
          'INFO'
        );
        return {
          ...grd,
          continuousAssessment: editCC,
          finalExam: editExam,
          average: avg,
          status
        };
      }
      return grd;
    }));
    setEditingGradeId(null);
    showToast("Note enregistrée avec succès dans le procès-verbal.");
  };

  // Filter admissions
  const filteredAdmissions = admissions.filter(item => {
    const matchFilter = admissionFilter === 'ALL' || item.status === admissionFilter;
    const q = admissionSearch.toLowerCase();
    const matchSearch = 
      item.trackingNumber.toLowerCase().includes(q) ||
      item.personalInfo.firstName.toLowerCase().includes(q) ||
      item.personalInfo.lastName.toLowerCase().includes(q) ||
      item.academicChoice.formationTitle.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* 1. TOP HEADER & PERSONA ROLE SWITCHER */}
      <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">
            
            {/* Institute Identity */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-issr-gold to-amber-600 flex items-center justify-center text-slate-950 font-serif font-black text-xl shadow-md ring-2 ring-white/10">
                IB
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-white tracking-wide text-base">ISSR Sainte Joséphine Bakhita</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-issr-gold/20 text-issr-gold px-2 py-0.5 rounded border border-issr-gold/30">
                    ERP & CMS v2.6
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">Portail Collaboratif de Gouvernance Universitaire</p>
              </div>
            </div>

            {/* Central / Right: Role Persona Switcher & Admin Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Manual Account Creation Button (strictly for Admin, Directeur, Secrétaire Admin) */}
              {canCreateAccounts && (
                <button
                  type="button"
                  onClick={() => setShowUserModal(true)}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs px-3 py-2 rounded-xl shadow transition"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Créer Compte</span>
                </button>
              )}

              {/* Email Notifications Logs Inspector Button */}
              <button
                type="button"
                onClick={() => {
                  fetchEmailLogs();
                  setShowEmailLogsModal(true);
                }}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-xl text-xs font-semibold transition"
                title="Historique des notifications email"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">Emails</span>
                <span className="bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded-full text-[10px] font-bold border border-amber-400/30">
                  {emailLogs.length}
                </span>
              </button>

              {/* Persona Switcher Selector */}
              <div className="flex items-center bg-slate-800/90 rounded-2xl p-1.5 border border-slate-700/80 shadow-inner">
                <span className="text-xs font-semibold text-slate-400 px-2.5 hidden lg:inline-flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-issr-gold" />
                  Rôle Actif :
                </span>
                <select
                  value={activeRole}
                  onChange={(e) => {
                    const newR = e.target.value as UserRole;
                    setActiveRole(newR);
                    try {
                      localStorage.setItem('issr_logged_role', newR);
                    } catch (err) {}
                    showToast(`Basculé sur le profil : ${PROFILES_CONFIG[newR].title} (${PROFILES_CONFIG[newR].name})`, 'info');
                  }}
                  className="bg-slate-900 text-white font-medium text-xs rounded-xl px-3 py-1.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-issr-gold cursor-pointer"
                >
                  <option value="admin">1. Super-Admin (DSI)</option>
                  <option value="directeur">2. Directeur (P. Dr Patrice MEKANA)</option>
                  <option value="secretaire_admin">3. Secrétaire Administrative (Mme Christine NKOLO)</option>
                  <option value="secretaire_acad">4. Secrétaire Académique (M. Jean Claude MEKOULOU)</option>
                  <option value="prefet_etudes">5. Préfet des Études (Sr. Patience ENGANEMBEN)</option>
                  <option value="econome">6. Économe (P. Jean-Paul BESSALA)</option>
                  <option value="rep_enseignants">7. Délégué Enseignants (Pr. Antoine ESSOMBA)</option>
                  <option value="enseignants">8. Enseignants (Dr. Théophile NDONG)</option>
                  <option value="etudiants">9. Espace Étudiant (Fr. Emmanuel NGOUMOU)</option>
                </select>
              </div>

              {/* View Public Website */}
              <Link 
                href="/"
                target="_blank"
                className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl border border-slate-700 transition"
              >
                <span>Site Public</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              {/* Explicit Logout Button in Admin Header */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-bold text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900 px-3.5 py-2 rounded-xl border border-rose-700/60 transition shadow-sm cursor-pointer"
                title="Mettre fin à la session et se déconnecter"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Se déconnecter</span>
              </button>

            </div>

          </div>
        </div>

        {/* Dynamic Context Banner for Current Role */}
        <div className="bg-slate-950/60 border-t border-slate-800/80 px-4 py-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${currentProfile.badgeColor}`}>
                {currentProfile.badgeLabel}
              </span>
              <span className="font-semibold text-white">{currentProfile.name}</span>
              <span className="text-slate-400 hidden sm:inline">• {currentProfile.title}</span>
              <span className="text-slate-500 hidden md:inline">({currentProfile.department})</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Session Authentifiée RBAC
              </span>
              <span>•</span>
              <span className="font-mono text-slate-400">{currentProfile.email}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce">
          <div className={`px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 ${
            toastMessage.type === 'warning' 
              ? 'bg-amber-900/90 text-white border-amber-500' 
              : toastMessage.type === 'info'
              ? 'bg-blue-900/90 text-white border-blue-500'
              : 'bg-emerald-900/90 text-white border-emerald-500'
          }`}>
            {toastMessage.type === 'warning' ? (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            ) : (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <p className="text-xs font-semibold leading-relaxed">{toastMessage.text}</p>
          </div>
        </div>
      )}

      {/* 2. MAIN LAYOUT: SIDEBAR + WORKSPACE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 shrink-0 space-y-6">
          
          {/* User Badge Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-serif font-bold text-lg text-slate-700">
                {currentProfile.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 text-sm truncate">{currentProfile.name}</h3>
                <p className="text-xs text-slate-500 truncate">{currentProfile.title}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Niveau d'accès :</span>
              <span className="font-mono font-bold text-slate-700 uppercase">{activeRole}</span>
            </div>
          </div>

          {/* Dynamic Sidebar Links */}
          <nav className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 space-y-1">
            
            {permissions.allowedTabs.includes('dashboard') && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition ${
                  activeTab === 'dashboard'
                    ? 'bg-issr-primary text-white shadow-md shadow-issr-primary/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Tableau de Bord</span>
              </button>
            )}

            {permissions.allowedTabs.includes('admissions') && (
              <button
                onClick={() => setActiveTab('admissions')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs transition ${
                  activeTab === 'admissions'
                    ? 'bg-issr-primary text-white shadow-md shadow-issr-primary/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4" />
                  <span>Candidatures En Ligne</span>
                </div>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {admissions.filter(a => a.status === 'PENDING').length}
                </span>
              </button>
            )}

            {permissions.allowedTabs.includes('pedagogy') && (
              <button
                onClick={() => setActiveTab('pedagogy')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition ${
                  activeTab === 'pedagogy'
                    ? 'bg-issr-primary text-white shadow-md shadow-issr-primary/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Maquettes & Pédagogie</span>
              </button>
            )}

            {permissions.allowedTabs.includes('grades') && (
              <button
                onClick={() => setActiveTab('grades')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition ${
                  activeTab === 'grades'
                    ? 'bg-issr-primary text-white shadow-md shadow-issr-primary/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>{activeRole === 'etudiants' ? 'Mes Notes & Relevé' : 'Notes & Examens'}</span>
              </button>
            )}

            {permissions.allowedTabs.includes('finance') && (
              <button
                onClick={() => setActiveTab('finance')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition ${
                  activeTab === 'finance'
                    ? 'bg-issr-primary text-white shadow-md shadow-issr-primary/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>{activeRole === 'etudiants' ? 'Ma Scolarité & Quitus' : 'Économat & Scolarités'}</span>
              </button>
            )}

            {permissions.allowedTabs.includes('courses') && (
              <button
                onClick={() => setActiveTab('courses')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition ${
                  activeTab === 'courses'
                    ? 'bg-issr-primary text-white shadow-md shadow-issr-primary/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Cours & Ressources</span>
              </button>
            )}

            {permissions.allowedTabs.includes('articles') && (
              <button
                onClick={() => setActiveTab('articles')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition ${
                  activeTab === 'articles'
                    ? 'bg-issr-primary text-white shadow-md shadow-issr-primary/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Articles & CMS</span>
              </button>
            )}

            {permissions.allowedTabs.includes('messages') && (
              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs transition ${
                  activeTab === 'messages'
                    ? 'bg-issr-primary text-white shadow-md shadow-issr-primary/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages Contact</span>
                </div>
                <span className="bg-blue-100 text-blue-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {messages.length}
                </span>
              </button>
            )}

            {permissions.allowedTabs.includes('security') && (
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition ${
                  activeTab === 'security'
                    ? 'bg-issr-primary text-white shadow-md shadow-issr-primary/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Sécurité & Audit DSI</span>
              </button>
            )}

            <div className="pt-2 mt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer"
                title="Quitter la session d'administration"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Se déconnecter</span>
              </button>
            </div>

          </nav>

          {/* Quick Institutional Notice */}
          <div className="bg-slate-900 text-slate-300 rounded-2xl p-4 text-xs space-y-2 border border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 text-issr-gold font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Gouvernance RBAC</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Toutes les actions de validation, saisie de notes et quittances financières sont enregistrées avec horodatage dans le journal d'audit officiel.
            </p>
          </div>

        </aside>

        {/* WORKSPACE CONTENT AREA */}
        <main className="flex-1 min-w-0 space-y-6">

          {/* ============================================================ */}
          {/* TAB: DASHBOARD                                              */}
          {/* ============================================================ */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Role Greeting Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-issr-primary rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-issr-gold text-xs font-semibold backdrop-blur-sm border border-white/10">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Espace Opérationnel • Session {currentProfile.badgeLabel}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    Bienvenue, {currentProfile.name}
                  </h1>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                    Vous êtes connecté en tant que <strong className="text-white">{currentProfile.title}</strong>. 
                    Votre tableau de bord centralise vos prérogatives institutionnelles pour l'année académique 2026-2027.
                  </p>
                </div>
              </div>

              {/* KPI Cards adapted to Active Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* KPI 1 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {activeRole === 'etudiants' ? 'Moyenne Générale' : activeRole === 'econome' ? 'Recouvrement Global' : 'Candidatures 2026'}
                    </span>
                    <GraduationCap className="w-5 h-5 text-issr-primary" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {activeRole === 'etudiants' ? '15.8 / 20' : activeRole === 'econome' ? '74.2 %' : admissions.length}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {activeRole === 'etudiants' ? 'Semestre 3 validé avec Mention Bien' : activeRole === 'econome' ? 'Objectif semestriel en bonne voie' : 'En hausse de +35% vs 2025'}
                  </p>
                </div>

                {/* KPI 2 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {activeRole === 'etudiants' ? 'Crédits Validés' : activeRole === 'enseignants' ? 'Notes Saisies' : 'Dossiers En Attente'}
                    </span>
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {activeRole === 'etudiants' ? '78 / 180 ECTS' : activeRole === 'enseignants' ? '100 % (18/18)' : admissions.filter(a => a.status === 'PENDING').length}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {activeRole === 'etudiants' ? 'Progression normale vers la Licence' : activeRole === 'enseignants' ? 'Procès-verbal transmis au Préfet' : 'À statuer par la commission'}
                  </p>
                </div>

                {/* KPI 3 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {activeRole === 'etudiants' ? 'Statut Quitus Examen' : activeRole === 'econome' ? 'Quitus Accordés' : 'Admissions Validées'}
                    </span>
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-black text-emerald-600">
                    {activeRole === 'etudiants' ? 'DÉLIVRÉ' : activeRole === 'econome' ? finances.filter(f => f.examQuitusGranted).length : admissions.filter(a => a.status === 'ACCEPTED').length}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {activeRole === 'etudiants' ? 'Autorisé à composer aux examens de session' : activeRole === 'econome' ? 'Sur 3 étudiants actifs en suivi' : 'Étudiants inscrits définitivement'}
                  </p>
                </div>

                {/* KPI 4 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {activeRole === 'admin' ? 'Sécurité & Audit' : 'Articles Publiés'}
                    </span>
                    <FileText className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {activeRole === 'admin' ? `${auditLogs.length} logs` : articles.length}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {activeRole === 'admin' ? 'Système intègre 0 incident' : 'Actualités visibles en ligne'}
                  </p>
                </div>

              </div>

              {/* Specific Role Operational Center */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 font-serif">Actions Clés & Prérogatives Accordées</h2>
                    <p className="text-xs text-slate-500">Synthèse des autorisations opérationnelles actives pour votre profil</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentProfile.badgeColor}`}>
                    {currentProfile.title}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  <div className={`p-4 rounded-2xl border ${permissions.canApproveAdmission ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    <div className="flex items-center gap-2 font-bold text-xs mb-1">
                      {permissions.canApproveAdmission ? <Check className="w-4 h-4 text-emerald-600" /> : <Lock className="w-4 h-4 text-slate-400" />}
                      <span>Validation Admissions</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {permissions.canApproveAdmission ? 'Signature et avis définitif sur les dossiers de candidature reçus.' : 'Réservé exclusivement à la Direction de l’Institut.'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${permissions.canGrantQuitus ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    <div className="flex items-center gap-2 font-bold text-xs mb-1">
                      {permissions.canGrantQuitus ? <Check className="w-4 h-4 text-emerald-600" /> : <Lock className="w-4 h-4 text-slate-400" />}
                      <span>Délivrance du Quitus Financier</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {permissions.canGrantQuitus ? 'Autorisation d’examen accordée après apurement de la scolarité.' : 'Prérogative exclusive de l’Économat.'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${permissions.canEditGrades ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    <div className="flex items-center gap-2 font-bold text-xs mb-1">
                      {permissions.canEditGrades ? <Check className="w-4 h-4 text-emerald-600" /> : <Lock className="w-4 h-4 text-slate-400" />}
                      <span>Saisie des Notes & Procès-Verbaux</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {permissions.canEditGrades ? 'Saisie des notes de CC et d’examen de vos matières enseignées.' : 'Réservé aux enseignants et au secrétariat académique.'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${permissions.canVerifyDocuments ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    <div className="flex items-center gap-2 font-bold text-xs mb-1">
                      {permissions.canVerifyDocuments ? <Check className="w-4 h-4 text-emerald-600" /> : <Lock className="w-4 h-4 text-slate-400" />}
                      <span>Vérification des Justificatifs</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {permissions.canVerifyDocuments ? 'Contrôle d’authenticité des diplômes et pièces d’identité.' : 'Réservé aux secrétariats et à la direction.'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${permissions.canPublishArticles ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    <div className="flex items-center gap-2 font-bold text-xs mb-1">
                      {permissions.canPublishArticles ? <Check className="w-4 h-4 text-emerald-600" /> : <Lock className="w-4 h-4 text-slate-400" />}
                      <span>Publication Immédiate CMS</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {permissions.canPublishArticles ? 'Mise en ligne directe des articles et annonces officielles.' : 'Vos articles sont enregistrés en brouillon pour validation.'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${permissions.canViewAudit ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    <div className="flex items-center gap-2 font-bold text-xs mb-1">
                      {permissions.canViewAudit ? <Check className="w-4 h-4 text-emerald-600" /> : <Lock className="w-4 h-4 text-slate-400" />}
                      <span>Supervision Sécurité & Audit</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {permissions.canViewAudit ? 'Inspection intégrale des journaux d’audit et conformité DSI.' : 'Accès réservé au Super-Admin et au Directeur.'}
                    </p>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: ADMISSIONS                                             */}
          {/* ============================================================ */}
          {activeTab === 'admissions' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-serif text-slate-900">Dossiers de Candidature Universitaire</h2>
                  <p className="text-xs text-slate-500">Gestion des inscriptions, contrôle des pièces justificatives et validation des admissions</p>
                </div>
                
                {/* Search & Filter bar */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Nom, matricule, filière..."
                      value={admissionSearch}
                      onChange={(e) => setAdmissionSearch(e.target.value)}
                      className="pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-issr-primary w-52"
                    />
                  </div>

                  <select
                    value={admissionFilter}
                    onChange={(e) => setAdmissionFilter(e.target.value)}
                    className="bg-white rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-issr-primary cursor-pointer"
                  >
                    <option value="ALL">Tous les statuts ({admissions.length})</option>
                    <option value="PENDING">En attente ({admissions.filter(a => a.status === 'PENDING').length})</option>
                    <option value="UNDER_REVIEW">En examen ({admissions.filter(a => (a.status as any) === 'UNDER_REVIEW').length})</option>
                    <option value="ACCEPTED">Admis ({admissions.filter(a => a.status === 'ACCEPTED').length})</option>
                    <option value="REJECTED">Refusés ({admissions.filter(a => a.status === 'REJECTED').length})</option>
                  </select>
                </div>
              </div>

              {/* Admissions Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-6 py-3.5">Réf & Date</th>
                        <th className="px-6 py-3.5">Candidat</th>
                        <th className="px-6 py-3.5">Filière Sollicitée</th>
                        <th className="px-6 py-3.5">Pièces Reçues</th>
                        <th className="px-6 py-3.5">Statut</th>
                        <th className="px-6 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAdmissions.map((adm) => {
                        const verifiedDocs = adm.documents?.filter(d => d.status === 'VERIFIED').length || 0;
                        const totalDocs = adm.documents?.length || 0;
                        return (
                          <tr key={adm.id} className="hover:bg-slate-50/80 transition">
                            <td className="px-6 py-4">
                              <span className="font-mono font-bold text-slate-900 block">{adm.trackingNumber}</span>
                              <span className="text-slate-400 text-[11px]">
                                {new Date(adm.createdAt).toLocaleDateString('fr-FR')}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-bold text-slate-900">
                                {adm.personalInfo.firstName} {adm.personalInfo.lastName}
                              </div>
                              <div className="text-slate-500 text-[11px]">
                                {adm.personalInfo.phone} • <span className="text-issr-primary font-semibold">{adm.personalInfo.status}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 max-w-xs">
                              <span className="font-medium text-slate-800 line-clamp-1">
                                {adm.academicChoice.formationTitle}
                              </span>
                              <span className="text-slate-400 text-[11px] block">
                                Modalité: {adm.academicChoice.modality}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  verifiedDocs === totalDocs && totalDocs > 0
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {verifiedDocs}/{totalDocs} certifiées
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                                adm.status === 'ACCEPTED'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : adm.status === 'REJECTED'
                                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                  : (adm.status as any) === 'UNDER_REVIEW'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : 'bg-amber-100 text-amber-800 border border-amber-200'
                              }`}>
                                {adm.status === 'ACCEPTED'
                                  ? 'Admis Définitif'
                                  : adm.status === 'REJECTED'
                                  ? 'Refusé'
                                  : (adm.status as any) === 'UNDER_REVIEW'
                                  ? 'En Examen'
                                  : 'En Attente'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => setSelectedAdmission(adm)}
                                className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-issr-primary hover:text-white text-slate-700 font-bold px-3 py-1.5 rounded-xl transition text-xs shadow-sm"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Examiner</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Admission Detail Modal Drawer */}
              {selectedAdmission && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
                  <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
                    
                    {/* Modal Header */}
                    <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-issr-gold font-bold">{selectedAdmission.trackingNumber}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            selectedAdmission.status === 'ACCEPTED'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : selectedAdmission.status === 'REJECTED'
                              ? 'bg-rose-500/20 text-rose-300'
                              : (selectedAdmission.status as any) === 'UNDER_REVIEW'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {selectedAdmission.status === 'ACCEPTED'
                              ? 'Admis'
                              : selectedAdmission.status === 'REJECTED'
                              ? 'Refusé'
                              : (selectedAdmission.status as any) === 'UNDER_REVIEW'
                              ? 'En Examen'
                              : 'En Attente'}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold font-serif text-white mt-1">
                          {selectedAdmission.personalInfo.firstName} {selectedAdmission.personalInfo.lastName}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedAdmission(null)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Modal Scrollable Body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-700">
                      
                      {/* Identity & Contact Card */}
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <UserCheck className="w-4 h-4 text-issr-primary" />
                          État Civil & Coordonnées
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Date et lieu de naissance</span>
                            <span className="font-semibold">{selectedAdmission.personalInfo.dateOfBirth} à {selectedAdmission.personalInfo.placeOfBirth}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Nationalité & Statut</span>
                            <span className="font-semibold">{selectedAdmission.personalInfo.nationality} ({selectedAdmission.personalInfo.status})</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Téléphone & WhatsApp</span>
                            <span className="font-semibold">{selectedAdmission.personalInfo.phone}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Adresse email</span>
                            <span className="font-semibold">{selectedAdmission.personalInfo.email}</span>
                          </div>
                        </div>
                      </div>

                      {/* Formation Choice */}
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-issr-primary" />
                          Filière Sollicitée
                        </h4>
                        <div className="font-bold text-slate-900 text-sm">
                          {selectedAdmission.academicChoice.formationTitle}
                        </div>
                        <div className="flex items-center gap-4 text-slate-500">
                          <span>Modalité : <strong>{selectedAdmission.academicChoice.modality}</strong></span>
                          <span>Session : <strong>{selectedAdmission.academicChoice.academicYear}</strong></span>
                        </div>
                      </div>

                      {/* Attached Documents Verification list */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                            <FileCheck className="w-4 h-4 text-issr-primary" />
                            Pièces Justificatives Téléversées ({selectedAdmission.documents?.length || 0})
                          </h4>
                          <span className="text-[10px] text-slate-400">Cliquez sur certifier pour attester de la conformité</span>
                        </div>

                        <div className="space-y-2">
                          {selectedAdmission.documents?.map(doc => (
                            <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                                  PDF
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900">{doc.title}</div>
                                  <div className="text-slate-400 text-[10px]">{doc.fileName} • {doc.fileSize}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  doc.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {doc.status === 'VERIFIED' ? 'Conforme' : 'À contrôler'}
                                </span>
                                {permissions.canVerifyDocuments && (
                                  <button
                                    onClick={() => toggleDocStatus(selectedAdmission.id, doc.id)}
                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 transition"
                                    title="Basculer conformité"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Observations / Notes */}
                      {selectedAdmission.notes && (
                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 space-y-1">
                          <span className="font-bold text-[11px] uppercase tracking-wider block">Notes & Observations Institutionnelles :</span>
                          <p className="text-xs leading-relaxed">{selectedAdmission.notes}</p>
                        </div>
                      )}

                    </div>

                    {/* Modal Decision Actions Footer */}
                    <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-slate-500 text-[11px]">
                        Rôle actif : <strong className="text-slate-800">{currentProfile.title}</strong>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Transition to UNDER_REVIEW if PENDING */}
                        {selectedAdmission.status === 'PENDING' && (permissions.canVerifyDocuments || permissions.canApproveAdmission || activeRole === 'admin') && (
                          <button
                            type="button"
                            onClick={() => updateAdmissionStatus(selectedAdmission.id, 'UNDER_REVIEW')}
                            className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-xs transition border border-blue-200 flex items-center gap-1.5"
                          >
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span>Mettre en Examen</span>
                          </button>
                        )}

                        {permissions.canApproveAdmission ? (
                          <>
                            <button
                              type="button"
                              onClick={() => updateAdmissionStatus(selectedAdmission.id, 'REJECTED')}
                              className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition border border-rose-200"
                            >
                              Rejeter le dossier
                            </button>
                            <button
                              type="button"
                              onClick={() => updateAdmissionStatus(selectedAdmission.id, 'ACCEPTED')}
                              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm flex items-center gap-1.5"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Valider l'Admission Définitive</span>
                            </button>
                          </>
                        ) : (
                          <div className="text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-[11px] flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5 shrink-0" />
                            <span>Décision finale réservée au Directeur (P. Dr Patrice MEKANA)</span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: GRADES & DELIBERATIONS                                  */}
          {/* ============================================================ */}
          {activeTab === 'grades' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-serif text-slate-900">
                    {activeRole === 'etudiants' ? 'Mon Relevé de Notes Académique' : 'Saisie & Délibérations des Examens'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {activeRole === 'etudiants' 
                      ? 'Consultez vos résultats semestriels et votre relevé sous réserve de quitus financier' 
                      : 'Gestion des contrôles continus, examens terminaux et procès-verbaux semestriels'}
                  </p>
                </div>

                {/* Quitus Banner for student */}
                {activeRole === 'etudiants' && (
                  <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <div>
                      <span className="font-bold text-emerald-900 text-xs block">Quitus d'Examen Validé</span>
                      <span className="text-emerald-700 text-[10px]">Délivré par l'Économe • Relevé officiel disponible à l'impression</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Grades Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-6 py-3.5">Code & Matière</th>
                        <th className="px-6 py-3.5">Étudiant</th>
                        <th className="px-6 py-3.5">Enseignant</th>
                        <th className="px-6 py-3.5">CC (40%)</th>
                        <th className="px-6 py-3.5">Examen (60%)</th>
                        <th className="px-6 py-3.5">Moyenne /20</th>
                        <th className="px-6 py-3.5">Crédits</th>
                        <th className="px-6 py-3.5">Statut</th>
                        {permissions.canEditGrades && <th className="px-6 py-3.5 text-right">Action</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {grades.map((grd) => {
                        const isEditing = editingGradeId === grd.id;
                        return (
                          <tr key={grd.id} className="hover:bg-slate-50/80 transition">
                            <td className="px-6 py-4">
                              <span className="font-mono font-bold text-issr-primary block">{grd.courseCode}</span>
                              <span className="font-semibold text-slate-800">{grd.courseTitle}</span>
                              <span className="text-[10px] text-slate-400 block">{grd.semester}</span>
                            </td>
                            <td className="px-6 py-4 font-bold text-slate-900">
                              {grd.studentName}
                            </td>
                            <td className="px-6 py-4 text-slate-600 text-[11px]">
                              {grd.teacherName}
                            </td>
                            <td className="px-6 py-4">
                              {isEditing ? (
                                <input
                                  type="number"
                                  min="0"
                                  max="20"
                                  step="0.5"
                                  value={editCC}
                                  onChange={(e) => setEditCC(parseFloat(e.target.value) || 0)}
                                  className="w-16 px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                                />
                              ) : (
                                <span className="font-mono font-semibold">{grd.continuousAssessment.toFixed(1)}</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {isEditing ? (
                                <input
                                  type="number"
                                  min="0"
                                  max="20"
                                  step="0.5"
                                  value={editExam}
                                  onChange={(e) => setEditExam(parseFloat(e.target.value) || 0)}
                                  className="w-16 px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                                />
                              ) : (
                                <span className="font-mono font-semibold">{grd.finalExam.toFixed(1)}</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`font-mono font-black text-sm ${
                                grd.average >= 12 ? 'text-emerald-600' : grd.average >= 10 ? 'text-blue-600' : 'text-rose-600'
                              }`}>
                                {grd.average.toFixed(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-bold text-slate-700">
                              {grd.credits} ECTS
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                grd.status === 'VALIDE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {grd.status}
                              </span>
                            </td>
                            {permissions.canEditGrades && (
                              <td className="px-6 py-4 text-right">
                                {isEditing ? (
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => handleSaveGrade(grd.id)}
                                      className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
                                      title="Enregistrer"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => setEditingGradeId(null)}
                                      className="p-1.5 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
                                      title="Annuler"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setEditingGradeId(grd.id);
                                      setEditCC(grd.continuousAssessment);
                                      setEditExam(grd.finalExam);
                                    }}
                                    className="px-3 py-1 bg-slate-100 hover:bg-issr-primary hover:text-white rounded-xl text-slate-700 font-bold transition text-[11px]"
                                  >
                                    Saisir Note
                                  </button>
                                )}
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Print Bulletin Button */}
              {activeRole === 'etudiants' && (
                <div className="flex justify-end">
                  <button 
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition"
                  >
                    <Printer className="w-4 h-4 text-issr-gold" />
                    <span>Imprimer mon Relevé Officiel (PDF)</span>
                  </button>
                </div>
              )}

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: FINANCE & QUITUS                                       */}
          {/* ============================================================ */}
          {activeTab === 'finance' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-serif text-slate-900">
                    {activeRole === 'etudiants' ? 'Situation Financière & Quitus d\'Examen' : 'Gestion Financière & Quitus d\'Examen'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {activeRole === 'etudiants' 
                      ? 'Suivi de vos versements de scolarité et délivrance de votre quitus pour composer' 
                      : 'Contrôle des versements par tranches et attribution du Quitus Officiel d\'Examen'}
                  </p>
                </div>
              </div>

              {/* Financial KPI Summary */}
              {activeRole !== 'etudiants' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Total Recouvré (Économat)</span>
                    <span className="text-2xl font-black text-emerald-600 block mt-1">1 245 000 FCFA</span>
                    <span className="text-slate-400 text-[11px]">Sur 1 680 000 FCFA budgétés (74.1%)</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Reste à Recouvrer</span>
                    <span className="text-2xl font-black text-amber-600 block mt-1">435 000 FCFA</span>
                    <span className="text-slate-400 text-[11px]">Échéance 2ème tranche : 15 Novembre 2026</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Quitus Examen Délivrés</span>
                    <span className="text-2xl font-black text-slate-900 block mt-1">
                      {finances.filter(f => f.examQuitusGranted).length} / {finances.length}
                    </span>
                    <span className="text-slate-400 text-[11px]">Étudiants en règle financière intégrale</span>
                  </div>
                </div>
              )}

              {/* Financial Records Ledger */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Registre des Écolages & Frais de Dossier</h3>
                  <span className="text-xs text-slate-400">Année Académique 2026-2027</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-6 py-3.5">Matricule & Étudiant</th>
                        <th className="px-6 py-3.5">Filière</th>
                        <th className="px-6 py-3.5">Statut Écolage</th>
                        <th className="px-6 py-3.5">Total Dû</th>
                        <th className="px-6 py-3.5">Versé</th>
                        <th className="px-6 py-3.5">Reste</th>
                        <th className="px-6 py-3.5">Quitus Examen</th>
                        {permissions.canGrantQuitus && <th className="px-6 py-3.5 text-right">Action Économe</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {finances.map((rec) => (
                        <tr key={rec.id} className="hover:bg-slate-50/80 transition">
                          <td className="px-6 py-4">
                            <span className="font-mono font-bold text-slate-900 block">{rec.matricule}</span>
                            <span className="font-semibold text-slate-800">{rec.studentName}</span>
                            <span className="text-[10px] text-issr-primary font-bold block">{rec.category}</span>
                          </td>
                          <td className="px-6 py-4 max-w-xs">
                            <span className="text-slate-700 font-medium line-clamp-1">{rec.filiere}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              rec.registrationFeePaid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              Dossier 50k: {rec.registrationFeePaid ? 'PAYÉ' : 'IMPAYÉ'}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-slate-900">
                            {rec.totalTuition.toLocaleString('fr-FR')} F
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-emerald-600">
                            {rec.totalPaid.toLocaleString('fr-FR')} F
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-amber-600">
                            {rec.remainingDue.toLocaleString('fr-FR')} F
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit ${
                              rec.examQuitusGranted
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}>
                              {rec.examQuitusGranted ? <CheckCircle className="w-3 h-3 text-emerald-600" /> : <Clock className="w-3 h-3 text-amber-600" />}
                              <span>{rec.examQuitusGranted ? 'ACCORDÉ' : 'EN ATTENTE'}</span>
                            </span>
                          </td>
                          {permissions.canGrantQuitus && (
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => toggleFinancialQuitus(rec.id)}
                                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ml-auto ${
                                  rec.examQuitusGranted
                                    ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                                }`}
                              >
                                {rec.examQuitusGranted ? (
                                  <>
                                    <Lock className="w-3.5 h-3.5" />
                                    <span>Révoquer</span>
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    <span>Octroyer Quitus</span>
                                  </>
                                )}
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: PEDAGOGY & MAQUETTE                                     */}
          {/* ============================================================ */}
          {activeTab === 'pedagogy' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-serif text-slate-900">Maquette Pédagogique & Répartition LMD</h2>
                  <p className="text-xs text-slate-500">Organisation des Unités d'Enseignement, crédits ECTS et attributions professorales</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => showToast("Exportation de la maquette pédagogique 2026-2027 en cours...", "info")}
                    className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs transition shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger la Maquette Officielle</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-issr-primary">Semestre 1 • 30 Crédits</span>
                    <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">Tronc Commun</span>
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Fondements Bibliques & Théologiques</h4>
                  <ul className="text-xs space-y-2 text-slate-600 divide-y divide-slate-100">
                    <li className="pt-2 flex items-center justify-between">
                      <span>Introduction à l'Ancien Testament (45h)</span>
                      <strong className="text-slate-900">6 ECTS</strong>
                    </li>
                    <li className="pt-2 flex items-center justify-between">
                      <span>Théologie Fondamentale & Révélation (45h)</span>
                      <strong className="text-slate-900">6 ECTS</strong>
                    </li>
                    <li className="pt-2 flex items-center justify-between">
                      <span>Histoire de l'Église Antique & Patristique (30h)</span>
                      <strong className="text-slate-900">4 ECTS</strong>
                    </li>
                    <li className="pt-2 flex items-center justify-between">
                      <span>Initiation aux Langues Bibliques : Grec Koinè (30h)</span>
                      <strong className="text-slate-900">4 ECTS</strong>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-issr-primary">Semestre 2 • 30 Crédits</span>
                    <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">Approfondissement</span>
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Dogmatique, Morale & Pastorale</h4>
                  <ul className="text-xs space-y-2 text-slate-600 divide-y divide-slate-100">
                    <li className="pt-2 flex items-center justify-between">
                      <span>Christologie & Sotériologie (45h)</span>
                      <strong className="text-slate-900">6 ECTS</strong>
                    </li>
                    <li className="pt-2 flex items-center justify-between">
                      <span>Théologie Morale Fondamentale (45h)</span>
                      <strong className="text-slate-900">6 ECTS</strong>
                    </li>
                    <li className="pt-2 flex items-center justify-between">
                      <span>Catéchétique & Méthodologie Pastorale (30h)</span>
                      <strong className="text-slate-900">4 ECTS</strong>
                    </li>
                    <li className="pt-2 flex items-center justify-between">
                      <span>Droit Canonique Fondamental (30h)</span>
                      <strong className="text-slate-900">4 ECTS</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: COURSES & DIGITAL RESOURCES                            */}
          {/* ============================================================ */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-serif text-slate-900">Espace Pédagogique Numérique & Ressources</h2>
                  <p className="text-xs text-slate-500">Supports de cours, syllabus académiques, fiches de TD et liens de visio-conférence</p>
                </div>
                {permissions.canDraftArticles && (
                  <button 
                    onClick={() => showToast("Modal d'ajout de support de cours ouvert.", "info")}
                    className="flex items-center gap-1.5 bg-issr-primary hover:bg-issr-primary-light text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Déposer un Support de Cours</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((crs) => (
                  <div key={crs.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold text-issr-primary">{crs.courseCode}</span>
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                          {crs.type}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{crs.title}</h4>
                      <p className="text-slate-500 text-xs line-clamp-2">{crs.description}</p>
                      <div className="pt-2 text-[11px] text-slate-400">
                        <span>Enseignant : <strong>{crs.teacherName}</strong></span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">{crs.fileSize}</span>
                      <div className="flex items-center gap-2">
                        {crs.meetUrl && (
                          <a 
                            href={crs.meetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold transition"
                            title="Rejoindre la salle virtuelle"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button 
                          onClick={() => showToast(`Téléchargement de ${crs.title} initié.`, 'success')}
                          className="flex items-center gap-1 bg-slate-900 hover:bg-issr-primary text-white font-bold px-3 py-1.5 rounded-xl transition text-[11px]"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Ouvrir</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: ARTICLES & CMS                                         */}
          {/* ============================================================ */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-serif text-slate-900">CMS & Actualités de l'Institut</h2>
                  <p className="text-xs text-slate-500">Gestion des annonces paroissiales, colloques théologiques et communiqués officiels</p>
                </div>
                <button
                  onClick={() => setShowArticleModal(true)}
                  className="flex items-center gap-1.5 bg-issr-primary hover:bg-issr-primary-light text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Rédiger un Article</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map((art) => (
                  <div key={art.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-issr-gold/20 text-issr-gold text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-issr-gold/30">
                        {art.category}
                      </span>
                      <span className="text-slate-400 text-[11px]">{art.publishedAt}</span>
                    </div>
                    <h4 className="font-serif font-bold text-slate-900 text-base">{art.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{art.excerpt}</p>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>Par {art.author}</span>
                      <span className="text-emerald-600 font-bold text-[11px]">En ligne</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: MESSAGES                                               */}
          {/* ============================================================ */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-serif text-slate-900">Boîte de Réception & Demandes d'Information</h2>
                <p className="text-xs text-slate-500">Messages soumis via le formulaire de contact du site institutionnel</p>
              </div>

              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{msg.name}</span>
                        <span className="text-slate-400 text-xs">({msg.email} • {msg.phone})</span>
                      </div>
                      <span className="text-slate-400 text-xs">
                        {new Date(msg.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <div className="font-bold text-slate-800 text-xs bg-slate-50 p-2.5 rounded-xl">
                      Filière ciblée : <span className="text-issr-primary">{msg.filiere}</span> — {msg.subject}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{msg.message}</p>
                    <div className="pt-2 flex items-center justify-end gap-2">
                      <a 
                        href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(msg.name)},%20suite%20%C3%A0%20votre%20demande%20sur%20le%20site%20de%20l'ISSR...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Répondre par WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: SECURITY & AUDIT DSI                                   */}
          {/* ============================================================ */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-serif text-slate-900">Journal d'Audit & Supervision DSI</h2>
                  <p className="text-xs text-slate-500">Traçabilité complète des délibérations, validations d'écolage et accès sécurisés</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                    <ShieldCheck className="w-4 h-4" />
                    Audit Immuable Actif
                  </span>
                </div>
              </div>

              {/* Audit Logs Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-6 py-3.5">Horodatage</th>
                        <th className="px-6 py-3.5">Acteur & Rôle</th>
                        <th className="px-6 py-3.5">Action</th>
                        <th className="px-6 py-3.5">Cible</th>
                        <th className="px-6 py-3.5">Détails Opérationnels</th>
                        <th className="px-6 py-3.5">Gravité</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/80 transition">
                          <td className="px-6 py-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                            {new Date(log.timestamp).toLocaleTimeString('fr-FR')}
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-slate-900 block">{log.actorName}</span>
                            <span className="font-mono text-slate-400 text-[10px] uppercase">{log.actorRole}</span>
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-slate-800 text-[11px]">
                            {log.action}
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-700">
                            {log.target}
                          </td>
                          <td className="px-6 py-4 text-slate-600 max-w-sm">
                            {log.details}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.severity === 'CRITICAL' 
                                ? 'bg-rose-100 text-rose-800' 
                                : log.severity === 'WARNING'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-50 text-blue-800'
                            }`}>
                              {log.severity}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ============================================================ */}
      {/* MODAL: CRÉATION MANUELLE DE COMPTE UTILISATEUR               */}
      {/* ============================================================ */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">Créer un Compte Utilisateur</h3>
                  <p className="text-xs text-slate-400">Règles RBAC : Réservé à la Direction et au Secrétariat</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowUserModal(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-2xl p-3.5 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Protocole de Sécurité :</strong> Aucun mot de passe n'est saisi manuellement. Dès l'enregistrement, un email ecclésiastique officiel avec un lien sécurisé d'activation (valable 48h) sera automatiquement expédié au destinataire.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Rôle & Cloisonnement RBAC *
                </label>
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as UserRole })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-issr-gold"
                  required
                >
                  <option value="admin">1. Super-Admin (DSI)</option>
                  <option value="directeur">2. Directeur (Direction Générale)</option>
                  <option value="secretaire_admin">3. Secrétaire Administrative</option>
                  <option value="secretaire_acad">4. Secrétaire Académique</option>
                  <option value="prefet_etudes">5. Préfet des Études</option>
                  <option value="econome">6. Économe (Gestion Financière)</option>
                  <option value="rep_enseignants">7. Délégué des Enseignants</option>
                  <option value="enseignants">8. Enseignants (Corps Professoral)</option>
                  <option value="etudiants">9. Étudiant / Apprenant</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex. Abbé François"
                    value={newUserForm.firstName}
                    onChange={(e) => setNewUserForm({ ...newUserForm, firstName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-issr-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex. MBIDA"
                    value={newUserForm.lastName}
                    onChange={(e) => setNewUserForm({ ...newUserForm, lastName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-issr-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Adresse Email Institutionnelle *
                </label>
                <input
                  type="email"
                  required
                  placeholder="nom.prenom@issr-bakhita.org"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-issr-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Département / Affiliation
                </label>
                <input
                  type="text"
                  placeholder="Ex. Département de Théologie Pastorale"
                  value={newUserForm.department}
                  onChange={(e) => setNewUserForm({ ...newUserForm, department: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-issr-gold"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-issr-gold font-bold text-xs flex items-center gap-2 shadow-md transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enregistrer & Expédier l'Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: JOURNAL DES NOTIFICATIONS EMAILS EXPÉDIÉES           */}
      {/* ============================================================ */}
      {showEmailLogsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-lg text-white">Journal des Notifications Email</h3>
                    <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full text-xs font-bold border border-amber-400/30">
                      {emailLogs.length} envoyés
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Traçabilité en temps réel des emails automatisés (Microservice NestJS)</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fetchEmailLogs}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  title="Rafraîchir les logs"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmailLogsModal(false)}
                  className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Table */}
            <div className="flex-1 overflow-y-auto p-6">
              {emailLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                  <Inbox className="w-12 h-12 stroke-[1.5] text-slate-300 mb-3" />
                  <p className="text-sm font-semibold text-slate-600">Aucun email envoyé pour l'instant</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    Les emails sont enregistrés ici dès qu'une candidature est soumise, examinée, acceptée ou qu'un compte utilisateur est généré.
                  </p>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3">Horodatage</th>
                        <th className="px-4 py-3">Destinataire</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Objet</th>
                        <th className="px-4 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {emailLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/80 transition">
                          <td className="px-4 py-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                            {new Date(log.sentAt).toLocaleString('fr-FR', {
                              day: '2-digit',
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit'
                            })}
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-slate-900 block">{log.to}</span>
                            <span className="text-[10px] text-slate-400 font-mono">ID: {log.id}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.type.includes('ACCEPTED') || log.type.includes('ACCOUNT_CREATED')
                                ? 'bg-emerald-100 text-emerald-800'
                                : log.type.includes('REJECTED')
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {log.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium text-slate-700 max-w-xs truncate">
                            {log.subject}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              type="button"
                              onClick={() => setActiveEmailPreview(log)}
                              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-issr-gold text-[11px] font-bold transition flex items-center gap-1.5 ml-auto"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Aperçu HTML</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Microservice de notification connecté sur port 3001
              </span>
              <button
                type="button"
                onClick={() => setShowEmailLogsModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: APERÇU DU TEMPLATE HTML DU COURRIEL                   */}
      {/* ============================================================ */}
      {activeEmailPreview && (
        <div className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full h-[90vh] flex flex-col overflow-hidden border border-slate-300 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-issr-gold block">
                  Aperçu du Courriel Institutionnel
                </span>
                <h4 className="font-bold text-sm text-white">{activeEmailPreview.subject}</h4>
                <p className="text-xs text-slate-400 mt-0.5">Destinataire : {activeEmailPreview.to}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveEmailPreview(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-100 p-6 flex justify-center">
              <div 
                className="bg-white rounded-2xl shadow-sm border border-slate-200 w-full max-w-2xl p-4 overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: activeEmailPreview.htmlBody }}
              />
            </div>

            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setActiveEmailPreview(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
              >
                Fermer l'aperçu
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
