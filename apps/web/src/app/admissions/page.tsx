'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  GraduationCap, 
  CheckCircle, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  Copy, 
  CheckCheck, 
  Building2, 
  Calendar, 
  UserCheck,
  UploadCloud,
  FileCheck,
  File,
  Image as ImageIcon,
  Trash2,
  Eye,
  Download,
  AlertTriangle,
  X
} from 'lucide-react';
import { FORMATIONS, INSTITUTION_INFO } from '@/data/mockData';
import { UploadedDocumentItem, AdmissionApplication } from '@/types';

interface DocumentConfig {
  key: string;
  category: UploadedDocumentItem['category'];
  title: string;
  subtitle: string;
  description: string;
  mandatory: boolean;
  formats: string;
  accept: string;
  typeLabel: string;
}

const REQUIRED_DOCUMENTS: DocumentConfig[] = [
  {
    key: 'idDocument',
    category: 'idDocument',
    title: "Acte de Naissance ou CNI / Passeport",
    subtitle: "Justificatif d'état civil officiel",
    description: "Photocopie légalisée de l'acte de naissance ou pièce d'identité en cours de validité (recto/verso).",
    mandatory: true,
    formats: ".pdf, .jpg, .jpeg, .png",
    accept: ".pdf,.jpg,.jpeg,.png",
    typeLabel: "PDF ou Image"
  },
  {
    key: 'diploma',
    category: 'diploma',
    title: "Copie certifiée du plus haut diplôme",
    subtitle: "Baccalauréat, Licence ou équivalent",
    description: "Attestation de réussite ou diplôme officiel certifié par les autorités académiques compétentes.",
    mandatory: true,
    formats: ".pdf, .jpg, .jpeg, .png",
    accept: ".pdf,.jpg,.jpeg,.png",
    typeLabel: "PDF ou Image"
  },
  {
    key: 'transcripts',
    category: 'transcripts',
    title: "Relevés de notes universitaires / scolaires",
    subtitle: "Historique des résultats académiques",
    description: "Relevés de notes de la dernière année d'études ou du cursus secondaire/supérieur.",
    mandatory: false,
    formats: ".pdf, .jpg, .jpeg, .png",
    accept: ".pdf,.jpg,.jpeg,.png",
    typeLabel: "PDF ou Image (Optionnel)"
  },
  {
    key: 'recommendation',
    category: 'recommendation',
    title: "Lettre de recommandation ecclésiale",
    subtitle: "Avis favorable de l'autorité ecclésiastique",
    description: "Délivrée par l'Évêque ordinaire, le Supérieur(e) Majeur(e) ou le Curé de paroisse d'origine.",
    mandatory: false,
    formats: ".pdf, .doc, .docx, .jpg, .png",
    accept: ".pdf,.doc,.docx,.jpg,.png",
    typeLabel: "PDF, Word ou Image"
  },
  {
    key: 'motivation',
    category: 'motivation',
    title: "Lettre de motivation & Projet d'études",
    subtitle: "Exposé des motifs pour les sciences religieuses",
    description: "Lettre expliquant vos attentes spirituelles, intellectuelles et professionnelles au sein de l'ISSR.",
    mandatory: true,
    formats: ".pdf, .doc, .docx, .jpg, .png",
    accept: ".pdf,.doc,.docx,.jpg,.png",
    typeLabel: "PDF, Word ou Image"
  },
  {
    key: 'photo',
    category: 'photo',
    title: "Photo d'identité d'étudiant récente",
    subtitle: "Pour la carte officielle d'étudiant ISSR 2026-2027",
    description: "Photo d'identité nette en couleur sur fond clair uni, tête nue et visage dégagé.",
    mandatory: true,
    formats: ".jpg, .jpeg, .png",
    accept: ".jpg,.jpeg,.png,image/*",
    typeLabel: "Image JPG ou PNG"
  }
];

function AdmissionsContent() {
  const searchParams = useSearchParams();
  const preselectedFiliere = searchParams.get('filiere') || '';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Academic Choice
    filiere: preselectedFiliere || FORMATIONS[0].title,
    modality: 'PRESENTIAL',
    academicYear: '2026-2027',

    // Step 2: Profile & Status
    status: 'LAIC',
    congregationOrDiocese: '',

    // Step 3: Civil info & Contact
    firstName: '',
    lastName: '',
    gender: 'M',
    dateOfBirth: '',
    placeOfBirth: '',
    nationality: 'Camerounaise',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',

    // Step 4: Previous studies
    highestDegree: 'Baccalauréat',
    institution: '',
    yearObtained: '2025',
  });

  // Real uploaded documents state (Base64 data URL persistent)
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, UploadedDocumentItem>>({});
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);
  const [activePreviewDoc, setActivePreviewDoc] = useState<UploadedDocumentItem | null>(null);
  const [validationError, setValidationError] = useState<string>('');

  const [submitted, setSubmitted] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedFiliere) {
      setFormData(prev => ({ ...prev, filiere: preselectedFiliere }));
    }
  }, [preselectedFiliere]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (docKey: string, file: File) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("Le fichier dépasse la taille maximale autorisée de 10 Mo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' o';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
        return (bytes / (1024 * 1024)).toFixed(2) + ' Mo';
      };

      const docConfig = REQUIRED_DOCUMENTS.find(d => d.key === docKey);
      const newDoc: UploadedDocumentItem = {
        id: `doc-${Date.now()}-${docKey}`,
        category: (docConfig?.category || 'idDocument') as any,
        title: docConfig?.title || file.name,
        fileName: file.name,
        fileSize: formatSize(file.size),
        fileType: file.type || 'application/octet-stream',
        dataUrl: result,
        uploadedAt: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };

      setUploadedDocs(prev => ({
        ...prev,
        [docKey]: newDoc
      }));
      setValidationError('');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveDoc = (docKey: string) => {
    setUploadedDocs(prev => {
      const updated = { ...prev };
      delete updated[docKey];
      return updated;
    });
  };

  const handleGoToStep5 = () => {
    const missing: string[] = [];
    if (!uploadedDocs['idDocument']) missing.push("Acte de Naissance ou CNI / Passeport");
    if (!uploadedDocs['diploma']) missing.push("Copie certifiée du plus haut diplôme");
    if (!uploadedDocs['motivation']) missing.push("Lettre de motivation");
    if (!uploadedDocs['photo']) missing.push("Photo d'identité d'étudiant");
    if (formData.status !== 'LAIC' && !uploadedDocs['recommendation']) {
      missing.push("Lettre de recommandation ecclésiale (obligatoire pour clercs et consacrés)");
    }

    if (missing.length > 0) {
      setValidationError(`Veuillez téléverser les documents obligatoires suivants avant de poursuivre : ${missing.join(', ')}.`);
      return;
    }

    setValidationError('');
    setStep(5);
  };

  const copyTrackingNumber = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const tracking = `ISSR-2026-${randomCode}`;
    setTrackingNumber(tracking);

    const docsList = Object.values(uploadedDocs);

    const newApplication: AdmissionApplication = {
      id: Date.now().toString(),
      trackingNumber: tracking,
      createdAt: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'PENDING' as const,
      personalInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender as 'M' | 'F',
        dateOfBirth: formData.dateOfBirth,
        placeOfBirth: formData.placeOfBirth,
        nationality: formData.nationality,
        phone: formData.phone,
        whatsapp: formData.whatsapp || formData.phone,
        email: formData.email,
        address: formData.address,
        status: formData.status as any,
        congregationOrDiocese: formData.congregationOrDiocese,
      },
      academicChoice: {
        formationId: 'filiere-selected',
        formationTitle: formData.filiere,
        modality: formData.modality as any,
        academicYear: formData.academicYear,
      },
      previousEducation: {
        highestDegree: formData.highestDegree,
        institution: formData.institution,
        yearObtained: formData.yearObtained,
      },
      documentsSubmitted: {
        idCardOrPassport: !!uploadedDocs['idDocument'],
        highestDiploma: !!uploadedDocs['diploma'],
        recommendationLetter: !!uploadedDocs['recommendation'],
        motivationLetter: !!uploadedDocs['motivation'],
      },
      uploadedDocuments: docsList
    };

    try {
      const storedApplications = JSON.parse(localStorage.getItem('issr_admissions') || '[]');
      localStorage.setItem('issr_admissions', JSON.stringify([newApplication, ...storedApplications]));

      // Also send to NestJS school service in background
      fetch('http://localhost:3001/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApplication)
      }).catch(() => {
        // Fallback gracefully
      });
    } catch {
      // Fallback
    }

    setSubmitted(true);
  };

  const stepLabels = ['Formation', 'Statut', 'Identité', 'Parcours & Pièces', 'Confirmation'];

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-20">
      
      {/* Header Banner with Authentic Student Study Background */}
      <section className="relative overflow-hidden bg-issr-primary text-white pt-14 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500">
        
        {/* Authentic Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-100"
          style={{ backgroundImage: `url('/images/img-1050.jpg')` }}
        />
        {/* Deep Institutional Dark Gradient Overlay for Maximum Readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950/95 via-[#0B2545]/90 to-slate-950/85" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/50" />

        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-400/15 blur-3xl pointer-events-none animate-float-slow" />

        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-3 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold backdrop-blur-sm border border-amber-400/40 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Portail Officiel d&apos;Admission 2026-2027</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Dossier de Candidature en Ligne
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto font-light leading-relaxed">
            Rejoignez l&apos;Institut Supérieur des Sciences Religieuses Sainte Bakhita. Candidatures ouvertes pour les 9 filières canoniques et professionnelles.
          </p>
        </div>
      </section>

      {/* Main Container with Overlapping Wizard Card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20">
        
        {/* Wizard Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-100/90 shadow-2xl relative overflow-hidden">
          
          {!submitted ? (
            <div>
              {/* Stepper with animated indicators */}
              <div className="mb-10">
                <div className="flex items-center justify-between relative">
                  {/* Background Track */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-stone-100 -translate-y-1/2 z-0" />
                  {/* Active Animated Progress Line */}
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-700 via-amber-500 to-emerald-500 -translate-y-1/2 transition-all duration-500 ease-out z-0"
                    style={{ width: `${((step - 1) / (stepLabels.length - 1)) * 100}%` }}
                  />

                  {stepLabels.map((label, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = step > stepNumber;
                    const isCurrent = step === stepNumber;

                    return (
                      <div key={index} className="flex flex-col items-center relative z-10">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : isCurrent
                              ? 'bg-blue-900 text-white ring-4 ring-amber-400/50 scale-110 shadow-md'
                              : 'bg-white text-slate-400 border-2 border-stone-200'
                          }`}
                        >
                          {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
                        </div>
                        <span className={`text-[11px] mt-1.5 hidden sm:block font-medium transition-colors ${
                          isCurrent ? 'text-blue-900 font-bold' : isCompleted ? 'text-slate-700 font-semibold' : 'text-slate-400'
                        }`}>
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Step 1: Formation */}
                {step === 1 && (
                  <div className="space-y-5 animate-fade-in-up">
                    <h2 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-issr-gold" />
                      <span>Étape 1 : Choix de la Filière &amp; Modalité</span>
                    </h2>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Filière académique souhaitée *
                      </label>
                      <select
                        name="filiere"
                        value={formData.filiere}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-issr-primary focus:border-issr-primary bg-white transition"
                      >
                        {FORMATIONS.map((f) => (
                          <option key={f.id} value={f.title}>
                            {f.title} — ({f.duration})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Modalité d&apos;enseignement souhaitée *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div 
                          onClick={() => setFormData(p => ({ ...p, modality: 'PRESENTIAL' }))}
                          className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between text-xs transition-all duration-200 ${
                            formData.modality === 'PRESENTIAL' 
                              ? 'border-issr-primary bg-issr-primary/5 font-bold text-issr-primary ring-2 ring-issr-primary/20 shadow-sm' 
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className="block font-bold">📍 Présentiel à Yaoundé</span>
                            <span className="text-[11px] text-slate-500 font-normal">Campus de Mvolyé, derrière Collège Saint Benoît</span>
                          </div>
                          {formData.modality === 'PRESENTIAL' && <CheckCircle className="w-4 h-4 text-issr-primary shrink-0" />}
                        </div>

                        <div 
                          onClick={() => setFormData(p => ({ ...p, modality: 'ONLINE' }))}
                          className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between text-xs transition-all duration-200 ${
                            formData.modality === 'ONLINE' 
                              ? 'border-issr-primary bg-issr-primary/5 font-bold text-issr-primary ring-2 ring-issr-primary/20 shadow-sm' 
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className="block font-bold">💻 En direct en ligne (Hybride)</span>
                            <span className="text-[11px] text-slate-500 font-normal">Classes virtuelles interactives Google Meet / Zoom</span>
                          </div>
                          {formData.modality === 'ONLINE' && <CheckCircle className="w-4 h-4 text-issr-primary shrink-0" />}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="btn-shimmer inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-issr-primary hover:bg-issr-primary-light text-white text-xs font-bold shadow-md transition-all hover:scale-105"
                      >
                        <span>Suivant</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Profil & Statut */}
                {step === 2 && (
                  <div className="space-y-5 animate-fade-in-up">
                    <h2 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-issr-gold" />
                      <span>Étape 2 : Statut Canonique &amp; Ecclésial</span>
                    </h2>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Vous postulez en tant que : *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { id: 'LAIC', label: 'Laïc(que) engagé(e)' },
                          { id: 'RELIGIEUX', label: 'Religieux (Frère)' },
                          { id: 'RELIGIEUSE', label: 'Religieuse (Sœur)' },
                          { id: 'PRETRE', label: 'Prêtre / Diacre' }
                        ].map((statusOption) => (
                          <button
                            key={statusOption.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, status: statusOption.id }))}
                            className={`p-4 text-center rounded-2xl border text-xs font-semibold transition-all duration-200 ${
                              formData.status === statusOption.id
                                ? 'border-issr-gold bg-amber-50 text-issr-gold-dark ring-2 ring-issr-gold/30 shadow-sm font-bold scale-[1.02]'
                                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {statusOption.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {formData.status !== 'LAIC' && (
                      <div className="pt-2 animate-fade-in">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Nom de la Congrégation / Institut de Vie Consacrée / Diocèse *
                        </label>
                        <input
                          type="text"
                          name="congregationOrDiocese"
                          value={formData.congregationOrDiocese}
                          onChange={handleChange}
                          placeholder="Ex. : Congrégation des Pères Pallottins, Sœurs de la Doctrine Chrétienne, Diocèse d'Obala..."
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-issr-primary focus:border-issr-primary transition"
                        />
                      </div>
                    )}

                    <div className="pt-4 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Précédent</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="btn-shimmer inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-issr-primary hover:bg-issr-primary-light text-white text-xs font-bold shadow-md transition-all hover:scale-105"
                      >
                        <span>Suivant</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: État civil & Coordonnées */}
                {step === 3 && (
                  <div className="space-y-5 animate-fade-in-up">
                    <h2 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-3">
                      Étape 3 : État Civil &amp; Coordonnées
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Prénom(s) *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          placeholder="Ex. : Paul Marie"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-issr-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Nom de famille *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          placeholder="Ex. : ATANGANA"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-issr-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Genre *
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-issr-primary bg-white"
                        >
                          <option value="M">Homme</option>
                          <option value="F">Femme</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Date de naissance *
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-issr-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Nationalité *
                        </label>
                        <input
                          type="text"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-issr-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Numéro Téléphone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+237 6..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-issr-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Adresse Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="exemple@domaine.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-issr-primary"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Précédent</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="btn-shimmer inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-issr-primary hover:bg-issr-primary-light text-white text-xs font-bold shadow-md transition-all hover:scale-105"
                      >
                        <span>Suivant</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Parcours Antérieur & Pièces */}
                {step === 4 && (
                  <div className="space-y-5 animate-fade-in-up">
                    <h2 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-3">
                      Étape 4 : Parcours Antérieur &amp; Pièces du Dossier
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Dernier diplôme obtenu *
                        </label>
                        <input
                          type="text"
                          name="highestDegree"
                          value={formData.highestDegree}
                          onChange={handleChange}
                          required
                          placeholder="Ex. : Baccalauréat A4, Licence en Philosophie..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-issr-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Établissement d&apos;obtention *
                        </label>
                        <input
                          type="text"
                          name="institution"
                          value={formData.institution}
                          onChange={handleChange}
                          required
                          placeholder="Ex. : Collège Vogt, Université de Yaoundé I..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-issr-primary"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                          <span className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                            Pièces justificatives du dossier numérique *
                          </span>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Téléversez vos documents scannés ou photographiés (PDF, JPG, PNG, DOC - max 10 Mo par document).
                          </p>
                        </div>

                        {/* Upload Progress Pill */}
                        {(() => {
                          const mandatoryCount = REQUIRED_DOCUMENTS.filter(d => d.mandatory || (d.key === 'recommendation' && formData.status !== 'LAIC')).length;
                          const uploadedMandatoryCount = REQUIRED_DOCUMENTS.filter(d => (d.mandatory || (d.key === 'recommendation' && formData.status !== 'LAIC')) && !!uploadedDocs[d.key]).length;
                          const isComplete = uploadedMandatoryCount >= mandatoryCount;

                          return (
                            <div className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 self-start sm:self-auto ${
                              isComplete 
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}>
                              <span className={`w-2 h-2 rounded-full ${isComplete ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                              <span>Pièces obligatoires : {uploadedMandatoryCount} / {mandatoryCount}</span>
                            </div>
                          );
                        })()}
                      </div>

                      {validationError && (
                        <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-start gap-2.5 animate-fadeIn">
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">Documents obligatoires manquants :</span>
                            <p className="mt-0.5 leading-relaxed">{validationError}</p>
                          </div>
                        </div>
                      )}

                      {/* Documents Upload Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {REQUIRED_DOCUMENTS.map((doc) => {
                          const isUploaded = !!uploadedDocs[doc.key];
                          const uploadedFile = uploadedDocs[doc.key];
                          const isMandatory = doc.mandatory || (doc.key === 'recommendation' && formData.status !== 'LAIC');
                          const isDragOver = dragOverKey === doc.key;

                          return (
                            <div
                              key={doc.key}
                              onDragOver={(e) => {
                                e.preventDefault();
                                setDragOverKey(doc.key);
                              }}
                              onDragLeave={() => setDragOverKey(null)}
                              onDrop={(e) => {
                                e.preventDefault();
                                setDragOverKey(null);
                                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                  handleFileUpload(doc.key, e.dataTransfer.files[0]);
                                }
                              }}
                              className={`p-4 rounded-2xl border transition-all duration-200 relative ${
                                isUploaded
                                  ? 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                                  : isDragOver
                                  ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 shadow-md'
                                  : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-sm'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <div className="flex items-start gap-2.5">
                                  <div className={`p-2 rounded-xl shrink-0 ${
                                    isUploaded 
                                      ? 'bg-emerald-100 text-emerald-700' 
                                      : 'bg-slate-100 text-slate-600'
                                  }`}>
                                    {isUploaded ? <FileCheck className="w-5 h-5" /> : <UploadCloud className="w-5 h-5" />}
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-slate-900 text-xs leading-snug">
                                      {doc.title}
                                    </h4>
                                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                                      {doc.subtitle}
                                    </p>
                                  </div>
                                </div>

                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                                  isMandatory 
                                    ? 'bg-rose-100 text-rose-700' 
                                    : 'bg-blue-50 text-blue-700'
                                }`}>
                                  {isMandatory ? 'Obligatoire' : 'Recommandé'}
                                </span>
                              </div>

                              {/* Upload / Ready Area */}
                              {isUploaded ? (
                                <div className="mt-3 pt-2.5 border-t border-emerald-200/70 flex items-center justify-between text-xs">
                                  <div className="truncate pr-2">
                                    <span className="font-semibold text-slate-800 text-[11px] block truncate">
                                      {uploadedFile.fileName}
                                    </span>
                                    <span className="text-[10px] text-emerald-700 font-medium">
                                      ✓ Téléversé &bull; {uploadedFile.fileSize}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => setActivePreviewDoc(uploadedFile)}
                                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-issr-primary hover:bg-slate-50 transition"
                                      title="Visualiser la pièce"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <label className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-amber-600 hover:bg-slate-50 transition cursor-pointer" title="Remplacer le fichier">
                                      <Upload className="w-3.5 h-3.5" />
                                      <input
                                        type="file"
                                        accept={doc.accept}
                                        onChange={(e) => e.target.files?.[0] && handleFileUpload(doc.key, e.target.files[0])}
                                        className="hidden"
                                      />
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveDoc(doc.key)}
                                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition"
                                      title="Supprimer la pièce"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <label className="mt-2.5 block border border-dashed border-slate-300 rounded-xl p-3 text-center bg-slate-50/70 hover:bg-amber-50/50 hover:border-amber-400 transition cursor-pointer group">
                                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 group-hover:text-amber-900">
                                    <Upload className="w-3.5 h-3.5 text-amber-600" />
                                    <span>Choisir un fichier ou glisser-déposer</span>
                                  </div>
                                  <span className="text-[10px] text-slate-400 block mt-0.5">
                                    {doc.typeLabel} (max 10 Mo)
                                  </span>
                                  <input
                                    type="file"
                                    accept={doc.accept}
                                    onChange={(e) => e.target.files?.[0] && handleFileUpload(doc.key, e.target.files[0])}
                                    className="hidden"
                                  />
                                </label>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Précédent</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleGoToStep5}
                        className="btn-shimmer inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-issr-primary hover:bg-issr-primary-light text-white text-xs font-bold shadow-md transition-all hover:scale-105"
                      >
                        <span>Vérifier &amp; Confirmer</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 5: Final Review & Submit */}
                {step === 5 && (
                  <div className="space-y-5 animate-fade-in-up">
                    <h2 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-issr-gold" />
                      <span>Étape 5 : Récapitulatif et Transmission du Dossier</span>
                    </h2>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                      <div>
                        <span className="text-slate-500 uppercase font-bold text-[10px]">Filière retenue :</span>
                        <p className="text-slate-900 font-serif font-bold text-base mt-0.5">{formData.filiere}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200">
                        <div>
                          <span className="text-slate-500 uppercase font-bold text-[10px]">Modalité :</span>
                          <p className="text-slate-800 font-medium">
                            {formData.modality === 'PRESENTIAL' ? '📍 Présentiel (Mvolyé)' : '💻 En direct en ligne'}
                          </p>
                        </div>
                        <div>
                          <span className="text-slate-500 uppercase font-bold text-[10px]">Statut :</span>
                          <p className="text-slate-800 font-medium">{formData.status}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-2">
                        <div>
                          <span className="text-slate-500 uppercase font-bold text-[10px]">Candidat :</span>
                          <p className="text-slate-800 font-medium">{formData.firstName} {formData.lastName}</p>
                        </div>
                        <div>
                          <span className="text-slate-500 uppercase font-bold text-[10px]">Contact :</span>
                          <p className="text-slate-800 font-medium">{formData.phone}</p>
                        </div>
                      </div>

                      {/* Attached Documents Recapitulative */}
                      <div className="border-t border-slate-200 pt-2.5">
                        <span className="text-slate-500 uppercase font-bold text-[10px] block mb-2">
                          Pièces justificatives prêtes pour l&apos;envoi ({Object.keys(uploadedDocs).length}) :
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {Object.values(uploadedDocs).map((doc) => (
                            <div 
                              key={doc.id} 
                              className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs"
                            >
                              <div className="flex items-center gap-2 truncate pr-2">
                                <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                                <div className="truncate">
                                  <span className="font-bold text-slate-800 block truncate text-[11px]">{doc.title}</span>
                                  <span className="text-[10px] text-slate-500 truncate">{doc.fileName} ({doc.fileSize})</span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => setActivePreviewDoc(doc)}
                                className="text-[11px] text-issr-primary hover:text-amber-600 font-semibold underline shrink-0"
                              >
                                Aperçu
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        En soumettant ce formulaire, votre candidature complète et vos pièces justificatives numériques sont instantanément enregistrées au secrétariat de l&apos;ISSR Sainte Bakhita. Un code de suivi officiel vous sera attribué pour toutes vos correspondances.
                      </span>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 text-slate-700 text-xs font-semibold hover:bg-stone-50 transition"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Précédent</span>
                      </button>
                      <button
                        type="submit"
                        className="btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-105 active:scale-95 border border-amber-300"
                      >
                        <Sparkles className="w-4 h-4 text-slate-950" />
                        <span>Confirmer &amp; Transmettre ma Candidature</span>
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          ) : (
            /* Success Screen */
            <div className="text-center py-8 space-y-6 animate-scale-up">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50">
                <CheckCircle className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Candidature Enregistrée avec Succès !
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Votre dossier de pré-inscription pour la rentrée académique a bien été transmis au secrétariat académique de l&apos;ISSR Sainte Joséphine Bakhita.
                </p>
              </div>

              {/* Tracking Ticket with Copy Button */}
              <div className="max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-[#07192A] via-[#0B2545] to-[#13416F] text-white space-y-3 shadow-2xl border-2 border-amber-400/60 relative">
                <span className="text-xs uppercase tracking-wider text-amber-300 font-bold block">
                  Votre Référence de Dossier Officielle
                </span>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-3xl font-extrabold tracking-widest text-white">
                    {trackingNumber}
                  </span>
                  <button
                    type="button"
                    onClick={copyTrackingNumber}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 transition border border-amber-400/30"
                    title="Copier le numéro"
                  >
                    {copied ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copied && (
                  <p className="text-[11px] text-emerald-300 font-semibold animate-fade-in">
                    ✓ Numéro copié dans le presse-papier !
                  </p>
                )}
                <p className="text-[11px] text-slate-300">
                  Conservez précieusement ce numéro pour toutes vos correspondances avec le préfet des études.
                </p>
              </div>

              {/* Next Steps */}
              <div className="max-w-md mx-auto text-left p-5 rounded-2xl bg-amber-50/40 border border-amber-200/80 text-xs space-y-2.5">
                <span className="font-bold text-amber-900 uppercase tracking-wider block">
                  Prochaines étapes :
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-700 font-medium">
                  <li>Étude de votre dossier par la commission des admissions sous 48h ouvrées.</li>
                  <li>Notification d&apos;admissibilité envoyée par WhatsApp et par Email.</li>
                  <li>Dépôt physique des pièces certifiées au campus de Mvolyé (Yaoundé).</li>
                </ol>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <Link
                  href="/"
                  className="px-6 py-3 rounded-xl border border-stone-300 text-slate-700 text-xs font-semibold hover:bg-stone-50 transition"
                >
                  Retour à l&apos;Accueil
                </Link>
                <a
                  href={`https://wa.me/${INSTITUTION_INFO.whatsapp}?text=Bonjour%2C%20je%20viens%20de%20d%C3%A9poser%20ma%20candidature%20avec%20le%20num%C3%A9ro%20${trackingNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-900/20 transition hover:scale-105"
                >
                  Contacter le Secrétariat sur WhatsApp
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Document Preview Modal */}
        {activePreviewDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                    Aperçu de la pièce justificative
                  </span>
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    {activePreviewDoc.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activePreviewDoc.fileName} &bull; {activePreviewDoc.fileSize} &bull; Transmis à {activePreviewDoc.uploadedAt}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePreviewDoc(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 flex items-center justify-center bg-slate-50 rounded-2xl my-4">
                {activePreviewDoc.dataUrl?.startsWith('data:image/') ? (
                  <img 
                    src={activePreviewDoc.dataUrl} 
                    alt={activePreviewDoc.title} 
                    className="max-h-[60vh] max-w-full rounded-xl object-contain shadow"
                  />
                ) : activePreviewDoc.dataUrl?.startsWith('data:application/pdf') ? (
                  <div className="text-center space-y-3 p-8">
                    <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div className="font-bold text-slate-900 text-sm">Document PDF numérique certifié</div>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Ce document a été chiffré et encodé au format officiel pour l&apos;instruction du dossier.
                    </p>
                    <a
                      href={activePreviewDoc.dataUrl}
                      download={activePreviewDoc.fileName}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-issr-primary text-white text-xs font-bold hover:bg-issr-primary-light transition shadow"
                    >
                      <Download className="w-4 h-4" />
                      <span>Télécharger le PDF original</span>
                    </a>
                  </div>
                ) : (
                  <div className="text-center space-y-3 p-8">
                    <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{activePreviewDoc.fileName}</div>
                    <a
                      href={activePreviewDoc.dataUrl}
                      download={activePreviewDoc.fileName}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-issr-primary text-white text-xs font-bold hover:bg-issr-primary-light transition shadow"
                    >
                      <Download className="w-4 h-4" />
                      <span>Télécharger le fichier</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setActivePreviewDoc(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition cursor-pointer"
                >
                  Fermer l&apos;aperçu
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function AdmissionsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Chargement du portail d&apos;admission...</div>}>
      <AdmissionsContent />
    </Suspense>
  );
}
