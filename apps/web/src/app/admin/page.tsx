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
  Download
} from 'lucide-react';
import { ARTICLES, INSTITUTION_INFO } from '../../data/mockData';
import { Article, AdmissionApplication } from '../../types';

type AdminTab = 'dashboard' | 'admissions' | 'articles' | 'messages' | 'pedagogy';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [currentUser, setCurrentUser] = useState<string>('P. Dr Patrice MEKANA (Directeur)');

  // Data states
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  // Filter & Search states
  const [admissionFilter, setAdmissionFilter] = useState<string>('ALL');
  const [admissionSearch, setAdmissionSearch] = useState<string>('');
  const [selectedAdmission, setSelectedAdmission] = useState<AdmissionApplication | null>(null);

  // Article creation form state
  const [showArticleModal, setShowArticleModal] = useState<boolean>(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: 'Admissions',
    author: currentUser,
    excerpt: '',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    readTime: '3 min',
    featured: false
  });

  // Load initial data
  useEffect(() => {
    // 1. Load admissions
    try {
      const storedAdmissions = JSON.parse(localStorage.getItem('issr_admissions') || '[]');
      if (Array.isArray(storedAdmissions) && storedAdmissions.length > 0) {
        setAdmissions(storedAdmissions);
      } else {
        // Seed some sample realistic admissions if empty
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
            previousEducation: {
              highestDegree: "Baccalauréat A4",
              institution: "Lycée Général Leclerc",
              yearObtained: "2013"
            },
            documentsSubmitted: {
              idCardOrPassport: true,
              highestDiploma: true,
              recommendationLetter: true,
              motivationLetter: true
            }
          },
          {
            id: "adm-102",
            trackingNumber: "ISSR-2026-3104",
            createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
            status: "ACCEPTED",
            personalInfo: {
              firstName: "Sr. Marie-Claire",
              lastName: "FOTSO",
              gender: "F",
              dateOfBirth: "1988-11-23",
              placeOfBirth: "Bafoussam",
              nationality: "Camerounaise",
              phone: "+237 677 88 99 00",
              whatsapp: "+237677889900",
              email: "sr.marieclaire@soeurs-clarisses.org",
              address: "Mvolyé, Couvent Sainte Claire",
              status: "RELIGIEUSE",
              congregationOrDiocese: "Sœurs Clarisses de Yaoundé"
            },
            academicChoice: {
              formationId: "du-ingenierie-pastorale",
              formationTitle: "DU en Ingénierie Pastorale & Gestion de Projets d'Église",
              modality: "HYBRID",
              academicYear: "2026-2027"
            },
            previousEducation: {
              highestDegree: "Licence en Sciences de Gestion",
              institution: "Université de Yaoundé II Soa",
              yearObtained: "2018"
            },
            documentsSubmitted: {
              idCardOrPassport: true,
              highestDiploma: true,
              recommendationLetter: true,
              motivationLetter: true
            }
          }
        ];
        setAdmissions(sampleAdmissions);
        localStorage.setItem('issr_admissions', JSON.stringify(sampleAdmissions));
      }
    } catch {
      // fallback
    }

    // 2. Load articles
    try {
      const storedArticles = JSON.parse(localStorage.getItem('issr_custom_articles') || '[]');
      if (Array.isArray(storedArticles) && storedArticles.length > 0) {
        setArticles([...storedArticles, ...ARTICLES]);
      } else {
        setArticles(ARTICLES);
      }
    } catch {
      setArticles(ARTICLES);
    }

    // 3. Load messages
    try {
      const storedMsgs = JSON.parse(localStorage.getItem('issr_contact_messages') || '[]');
      if (Array.isArray(storedMsgs) && storedMsgs.length > 0) {
        setMessages(storedMsgs);
      } else {
        const sampleMsgs = [
          {
            id: "msg-1",
            name: "Abbé Martin ESSOMBA",
            email: "martin.essomba@diocese-ebolowa.cm",
            phone: "+237 690 11 22 33",
            subject: "Dossier d’admission & Inscription",
            formationInterest: "Master en Sciences Religieuses",
            message: "Bonjour cher Père Directeur, nous souhaiterions envoyer 3 candidats pour le Master à distance. Les cours du samedi sont-ils enregistrés ?",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            read: false
          }
        ];
        setMessages(sampleMsgs);
        localStorage.setItem('issr_contact_messages', JSON.stringify(sampleMsgs));
      }
    } catch {
      // fallback
    }
  }, []);

  // Update admission status
  const updateAdmissionStatus = (id: string, newStatus: AdmissionApplication['status']) => {
    const updated = admissions.map(app => app.id === id ? { ...app, status: newStatus } : app);
    setAdmissions(updated);
    localStorage.setItem('issr_admissions', JSON.stringify(updated));
    if (selectedAdmission && selectedAdmission.id === id) {
      setSelectedAdmission({ ...selectedAdmission, status: newStatus });
    }
  };

  // Publish new article
  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Article = {
      id: `art-${Date.now()}`,
      slug: newArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newArticle.title,
      category: newArticle.category,
      author: newArticle.author || currentUser,
      excerpt: newArticle.excerpt,
      content: newArticle.content,
      imageUrl: newArticle.imageUrl,
      readTime: newArticle.readTime,
      publishedAt: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      featured: newArticle.featured
    };

    const customArticles = JSON.parse(localStorage.getItem('issr_custom_articles') || '[]');
    customArticles.unshift(created);
    localStorage.setItem('issr_custom_articles', JSON.stringify(customArticles));

    setArticles([created, ...articles]);
    setShowArticleModal(false);
    setNewArticle({
      title: '',
      category: 'Admissions',
      author: currentUser,
      excerpt: '',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
      readTime: '3 min',
      featured: false
    });
  };

  // Delete article
  const handleDeleteArticle = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cet article ?")) {
      const updated = articles.filter(a => a.id !== id);
      setArticles(updated);
      const customArticles = JSON.parse(localStorage.getItem('issr_custom_articles') || '[]').filter((a: any) => a.id !== id);
      localStorage.setItem('issr_custom_articles', JSON.stringify(customArticles));
    }
  };

  // Mark message as read
  const markMessageAsRead = (id: string) => {
    const updated = messages.map(m => m.id === id ? { ...m, read: true } : m);
    setMessages(updated);
    localStorage.setItem('issr_contact_messages', JSON.stringify(updated));
  };

  // Filtered admissions
  const filteredAdmissions = admissions.filter(app => {
    const matchesFilter = admissionFilter === 'ALL' || app.status === admissionFilter;
    const query = admissionSearch.toLowerCase();
    const matchesSearch = 
      app.trackingNumber.toLowerCase().includes(query) ||
      `${app.personalInfo.firstName} ${app.personalInfo.lastName}`.toLowerCase().includes(query) ||
      app.academicChoice.formationTitle.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-slate-100 min-h-screen pb-16">
      
      {/* Admin Top Navigation */}
      <header className="bg-issr-primary text-white border-b border-issr-primary-light shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-issr-gold text-slate-900 flex items-center justify-center font-bold font-serif text-lg shadow">
              B
            </div>
            <div>
              <div className="font-bold text-sm leading-none">ISSR Sainte Bakhita</div>
              <div className="text-xs text-issr-gold-light mt-0.5">Portail de Gestion & CMS Collaboratif</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {/* Persona switcher */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-700">
              <span className="text-slate-400">Connecté en tant que :</span>
              <select
                value={currentUser}
                onChange={(e) => {
                  setCurrentUser(e.target.value);
                  setNewArticle(prev => ({ ...prev, author: e.target.value }));
                }}
                className="bg-transparent font-semibold text-issr-gold-light outline-none cursor-pointer"
              >
                <option value="P. Dr Patrice MEKANA (Directeur)" className="text-slate-900">P. Dr Patrice MEKANA (Directeur)</option>
                <option value="Sr. Patience ENGANEMBEN (Préfet Études)" className="text-slate-900">Sr. Patience ENGANEMBEN (Préfet Études)</option>
                <option value="M. Jean Claude MEKOULOU (Enseignant)" className="text-slate-900">M. Jean Claude MEKOULOU (Enseignant)</option>
                <option value="Secrétariat Académique" className="text-slate-900">Secrétariat Académique</option>
                <option value="Délégué des Étudiants" className="text-slate-900">Délégué des Étudiants</option>
              </select>
            </div>

            <Link
              href="/"
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl transition flex items-center gap-1.5"
            >
              <span>Site Public</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-4 overflow-x-auto text-xs sm:text-sm font-medium border-t border-issr-primary-light/40">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'border-issr-gold text-issr-gold-light font-bold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Tableau de Bord</span>
          </button>

          <button
            onClick={() => setActiveTab('admissions')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'admissions'
                ? 'border-issr-gold text-issr-gold-light font-bold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Admissions & Inscriptions</span>
            <span className="bg-issr-gold text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
              {admissions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'articles'
                ? 'border-issr-gold text-issr-gold-light font-bold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Articles & Annonces CMS</span>
            <span className="bg-white/20 text-white font-bold px-1.5 py-0.2 rounded-full text-[10px]">
              {articles.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'messages'
                ? 'border-issr-gold text-issr-gold-light font-bold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Messages Contact</span>
            {messages.filter(m => !m.read).length > 0 && (
              <span className="bg-red-500 text-white font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                {messages.filter(m => !m.read).length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('pedagogy')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'pedagogy'
                ? 'border-issr-gold text-issr-gold-light font-bold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Ressources Pédagogiques</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* 1. DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            
            {/* Welcome banner */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-issr-gold tracking-wider">
                  Session Active
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Bienvenue, {currentUser}
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Tableau de bord institutionnel pour le suivi des inscriptions, la publication d’articles et la gestion des flux.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setActiveTab('articles');
                    setShowArticleModal(true);
                  }}
                  className="inline-flex items-center gap-2 bg-issr-primary hover:bg-issr-primary-light text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow transition"
                >
                  <PlusCircle className="w-4 h-4 text-issr-gold" />
                  <span>Publier un Article</span>
                </button>

                <button
                  onClick={() => setActiveTab('admissions')}
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow transition"
                >
                  <GraduationCap className="w-4 h-4 text-issr-gold" />
                  <span>Examiner Candidatures</span>
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 bg-blue-50 text-blue-700 rounded-2xl">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{admissions.length}</div>
                  <div className="text-xs text-slate-500 font-medium">Candidatures reçues</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">
                    {admissions.filter(a => a.status === 'PENDING').length}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">En attente d’examen</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">
                    {admissions.filter(a => a.status === 'ACCEPTED').length}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Candidatures admises</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 bg-purple-50 text-purple-600 rounded-2xl">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{articles.length}</div>
                  <div className="text-xs text-slate-500 font-medium">Articles & Annonces en ligne</div>
                </div>
              </div>
            </div>

            {/* Recent Admissions & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left 2 Cols: Recent Applications */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-issr-primary" />
                    <span>Dernières Candidatures Reçues</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('admissions')}
                    className="text-xs font-bold text-issr-primary hover:text-issr-gold transition flex items-center gap-1"
                  >
                    <span>Voir tout</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {admissions.slice(0, 4).map(app => (
                    <div key={app.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">
                            {app.personalInfo.firstName} {app.personalInfo.lastName}
                          </span>
                          <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
                            {app.trackingNumber}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {app.academicChoice.formationTitle}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          app.status === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                          app.status === 'UNDER_REVIEW' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {app.status}
                        </span>

                        <button
                          onClick={() => {
                            setSelectedAdmission(app);
                            setActiveTab('admissions');
                          }}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-issr-primary transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Col: Quick Guidance & Direct Contact */}
              <div className="space-y-6">
                <div className="bg-issr-primary text-white rounded-3xl p-6 shadow-sm">
                  <h4 className="font-serif text-base font-bold mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-issr-gold" />
                    <span>Statut Institutionnel</span>
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed mb-4">
                    Institut Supérieur des Sciences Religieuses Sainte Joséphine Bakhita. Érection canonique par le Saint-Siège (Rome, 2022) et rattachement à la Faculté de Théologie de l&apos;UCAC.
                  </p>
                  <div className="text-[11px] text-issr-gold-light bg-black/20 p-3 rounded-xl">
                    Numéro officiel d’assistance : <span className="font-bold text-white">{INSTITUTION_INFO.phone}</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                  <h4 className="font-serif text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-issr-gold" />
                    <span>Actions Rapides</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <Link
                      href="/admissions"
                      target="_blank"
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 transition"
                    >
                      <span>Tester le formulaire d’admission</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </Link>
                    <Link
                      href="/actualites"
                      target="_blank"
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 transition"
                    >
                      <span>Consulter la page Actualités publique</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </Link>
                    <Link
                      href="/contact"
                      target="_blank"
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 transition"
                    >
                      <span>Vérifier la page Contact & Maps</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. ADMISSIONS TAB */}
        {activeTab === 'admissions' && (
          <div className="space-y-6">
            
            {/* Filter and search bar */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {['ALL', 'PENDING', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setAdmissionFilter(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      admissionFilter === status
                        ? 'bg-issr-primary text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {status === 'ALL' ? 'Toutes' :
                     status === 'PENDING' ? 'En Attente' :
                     status === 'UNDER_REVIEW' ? 'En Examen' :
                     status === 'ACCEPTED' ? 'Admis' : 'Refusé'}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={admissionSearch}
                  onChange={(e) => setAdmissionSearch(e.target.value)}
                  placeholder="Rechercher nom, code suivi..."
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-issr-primary outline-none"
                />
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Numéro de Suivi</th>
                      <th className="px-6 py-4">Candidat</th>
                      <th className="px-6 py-4">Statut Ecclésial</th>
                      <th className="px-6 py-4">Filière Choisi</th>
                      <th className="px-6 py-4">Modalité</th>
                      <th className="px-6 py-4">Statut Dossier</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredAdmissions.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4 font-mono font-bold text-issr-primary">
                          {app.trackingNumber}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">
                            {app.personalInfo.firstName} {app.personalInfo.lastName}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {app.personalInfo.email} • {app.personalInfo.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            {app.personalInfo.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium max-w-xs truncate">
                          {app.academicChoice.formationTitle}
                        </td>
                        <td className="px-6 py-4">
                          {app.academicChoice.modality}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            app.status === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-800' :
                            app.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                            app.status === 'UNDER_REVIEW' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setSelectedAdmission(app)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-issr-primary hover:text-issr-gold transition"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Examiner</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredAdmissions.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Aucune candidature trouvée.
                </div>
              )}
            </div>

          </div>
        )}

        {/* 3. ARTICLES / CMS TAB */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Gestionnaire de Publications & Actualités
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  Rédigez, modifiez ou supprimez les articles consultables sur le site public de l’ISSR Bakhita.
                </p>
              </div>

              <button
                onClick={() => setShowArticleModal(true)}
                className="inline-flex items-center gap-2 bg-issr-primary hover:bg-issr-primary-light text-white text-xs font-bold py-3 px-5 rounded-xl shadow transition"
              >
                <PlusCircle className="w-4 h-4 text-issr-gold" />
                <span>Rédiger un Nouvel Article</span>
              </button>
            </div>

            {/* Articles List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((art) => (
                <div key={art.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                  <div className="h-44 bg-slate-100 relative">
                    <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[11px] font-bold px-2.5 py-0.5 rounded-full text-issr-primary">
                      {art.category}
                    </span>
                    {art.featured && (
                      <span className="absolute top-3 right-3 bg-issr-gold text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        À la une
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 mb-1 flex items-center gap-2">
                        <span>{art.publishedAt}</span>
                        <span>•</span>
                        <span>{art.author}</span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-slate-900 line-clamp-2 mb-2">
                        {art.title}
                      </h4>
                      <p className="text-slate-600 text-xs line-clamp-3 mb-4">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href="/actualites"
                        target="_blank"
                        className="text-xs font-semibold text-issr-primary hover:text-issr-gold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Aperçu public</span>
                      </Link>

                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition rounded-lg hover:bg-red-50"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* 4. MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">
                Boîte de Réception des Demandes de Contact
              </h3>
              <p className="text-slate-500 text-xs">
                Messages envoyés par des futurs étudiants, prêtres, évêques ou fidèles depuis la page de contact du site.
              </p>
            </div>

            <div className="space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`p-6 rounded-2xl border transition ${
                    msg.read ? 'bg-white border-slate-200' : 'bg-blue-50/40 border-blue-200 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{msg.name}</span>
                        {!msg.read && (
                          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Nouveau
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">
                        {msg.email} • {msg.phone}
                      </div>
                    </div>

                    <div className="text-xs text-slate-400">
                      {new Date(msg.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-issr-primary mb-2">
                    Objet : {msg.subject} {msg.formationInterest ? `(${msg.formationInterest})` : ''}
                  </div>

                  <p className="text-slate-700 text-xs sm:text-sm whitespace-pre-line bg-slate-50/80 p-4 rounded-xl border border-slate-100">
                    {msg.message}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 items-center justify-between">
                    <div className="flex gap-2">
                      <a
                        href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition inline-flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Répondre sur WhatsApp</span>
                      </a>

                      <a
                        href={`mailto:${msg.email}`}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-xl transition"
                      >
                        Répondre par Email
                      </a>
                    </div>

                    {!msg.read && (
                      <button
                        onClick={() => markMessageAsRead(msg.id)}
                        className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                      >
                        Marquer comme lu
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {messages.length === 0 && (
                <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
                  Aucun message de contact pour l’instant.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. PEDAGOGY TAB */}
        {activeTab === 'pedagogy' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">
                Espace Pédagogique & Syllabi de Cours
              </h3>
              <p className="text-slate-500 text-xs">
                Programmes de cours, emploi du temps des sessions intensives et ressources partagées par le corps professoral.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-serif font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-issr-primary" />
                  <span>Calendrier Académique 2026-2027</span>
                </h4>
                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-900 min-w-[90px]">15 Oct. 2026 :</span>
                    <span>Rentrée académique solennelle & Messe de l’Esprit Saint</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-900 min-w-[90px]">20 Oct. 2026 :</span>
                    <span>Début des cours magistraux du 1er Semestre</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-900 min-w-[90px]">15 Jan. 2027 :</span>
                    <span>Session intensive d’examens partiels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-900 min-w-[90px]">01 Mars 2027 :</span>
                    <span>Colloque annuel de l’Institut sur la Théologie Africaine</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-serif font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-issr-gold" />
                  <span>Manuels & Règlements Intérieurs</span>
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                    <span className="font-medium text-slate-800">Guide de l’Étudiant ISSR 2026-2027 (PDF)</span>
                    <button className="text-issr-primary hover:text-issr-gold font-bold flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>Télécharger</span>
                    </button>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                    <span className="font-medium text-slate-800">Statuts Canoniques & Charte Académique UCAC</span>
                    <button className="text-issr-primary hover:text-issr-gold font-bold flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>Télécharger</span>
                    </button>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                    <span className="font-medium text-slate-800">Normes de Rédaction du Mémoire de Master</span>
                    <button className="text-issr-primary hover:text-issr-gold font-bold flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>Télécharger</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL: CANDIDATE DOSSIER INSPECTOR */}
      {selectedAdmission && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-[10px] font-mono font-bold bg-issr-primary/10 text-issr-primary px-2.5 py-1 rounded">
                  {selectedAdmission.trackingNumber}
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                  Dossier de {selectedAdmission.personalInfo.firstName} {selectedAdmission.personalInfo.lastName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAdmission(null)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6 text-xs sm:text-sm">
              
              {/* Status Selector */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <span className="font-semibold text-slate-700">Décision de la Commission d’Admission :</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => updateAdmissionStatus(selectedAdmission.id, 'ACCEPTED')}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                      selectedAdmission.status === 'ACCEPTED'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50'
                    }`}
                  >
                    Valider / Admis
                  </button>

                  <button
                    onClick={() => updateAdmissionStatus(selectedAdmission.id, 'UNDER_REVIEW')}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                      selectedAdmission.status === 'UNDER_REVIEW'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50'
                    }`}
                  >
                    En Examen
                  </button>

                  <button
                    onClick={() => updateAdmissionStatus(selectedAdmission.id, 'REJECTED')}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                      selectedAdmission.status === 'REJECTED'
                        ? 'bg-red-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-red-50'
                    }`}
                  >
                    Refuser
                  </button>
                </div>
              </div>

              {/* Personal Info */}
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-2 text-issr-primary">
                  1. Identité & Statut Ecclésial
                </h4>
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl text-xs">
                  <div><span className="text-slate-400">Date & Lieu de naissance :</span> <span className="font-semibold text-slate-800">{selectedAdmission.personalInfo.dateOfBirth} ({selectedAdmission.personalInfo.placeOfBirth})</span></div>
                  <div><span className="text-slate-400">Nationalité :</span> <span className="font-semibold text-slate-800">{selectedAdmission.personalInfo.nationality}</span></div>
                  <div><span className="text-slate-400">Statut ecclésial :</span> <span className="font-semibold text-slate-800">{selectedAdmission.personalInfo.status}</span></div>
                  <div><span className="text-slate-400">Congrégation / Diocèse :</span> <span className="font-semibold text-slate-800">{selectedAdmission.personalInfo.congregationOrDiocese || 'N/A'}</span></div>
                  <div><span className="text-slate-400">Téléphone :</span> <span className="font-semibold text-slate-800">{selectedAdmission.personalInfo.phone}</span></div>
                  <div><span className="text-slate-400">WhatsApp :</span> <span className="font-semibold text-slate-800">{selectedAdmission.personalInfo.whatsapp}</span></div>
                  <div className="col-span-2"><span className="text-slate-400">Adresse de résidence :</span> <span className="font-semibold text-slate-800">{selectedAdmission.personalInfo.address}</span></div>
                </div>
              </div>

              {/* Academic Choice */}
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-2 text-issr-primary">
                  2. Programme d&apos;Études Choisi
                </h4>
                <div className="bg-slate-50 p-4 rounded-2xl text-xs space-y-1">
                  <div><span className="text-slate-400">Formation :</span> <span className="font-bold text-slate-800">{selectedAdmission.academicChoice.formationTitle}</span></div>
                  <div><span className="text-slate-400">Modalité d&apos;enseignement :</span> <span className="font-semibold text-slate-800">{selectedAdmission.academicChoice.modality}</span></div>
                  <div><span className="text-slate-400">Année académique :</span> <span className="font-semibold text-slate-800">{selectedAdmission.academicChoice.academicYear}</span></div>
                </div>
              </div>

              {/* Previous degrees */}
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-2 text-issr-primary">
                  3. Diplôme Précédent & Établissement
                </h4>
                <div className="bg-slate-50 p-4 rounded-2xl text-xs space-y-1">
                  <div><span className="text-slate-400">Plus haut diplôme :</span> <span className="font-semibold text-slate-800">{selectedAdmission.previousEducation.highestDegree}</span></div>
                  <div><span className="text-slate-400">Établissement d&apos;obtention :</span> <span className="font-semibold text-slate-800">{selectedAdmission.previousEducation.institution}</span></div>
                  <div><span className="text-slate-400">Année d&apos;obtention :</span> <span className="font-semibold text-slate-800">{selectedAdmission.previousEducation.yearObtained}</span></div>
                </div>
              </div>

              {/* Documents check */}
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-2 text-issr-primary">
                  4. Pièces Justificatives Déclarées
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Pièce d’identité / Passeport</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Copie certifiée du diplôme</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Lettre de recommandation</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Lettre de motivation</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedAdmission(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition"
              >
                Fermer l&apos;inspecteur
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE ARTICLE */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Rédiger un Nouvel Article / Annonce
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  Ce texte apparaîtra instantanément sur la page Actualités et la page d’accueil.
                </p>
              </div>
              <button
                onClick={() => setShowArticleModal(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                  Titre de l’article <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  placeholder="Ex: Conférence théologique : Église et enjeux contemporains en Afrique"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-issr-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                    Catégorie <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-issr-primary outline-none bg-white"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Événements">Événements</option>
                    <option value="Formations">Formations</option>
                    <option value="Pastorale">Pastorale</option>
                    <option value="Vie de l’Institut">Vie de l’Institut</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                    Auteur
                  </label>
                  <input
                    type="text"
                    value={newArticle.author}
                    onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-issr-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                  URL de l’image d’illustration
                </label>
                <input
                  type="url"
                  value={newArticle.imageUrl}
                  onChange={(e) => setNewArticle({ ...newArticle, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-issr-primary outline-none"
                />
                <div className="flex gap-2 mt-1.5 text-[10px] text-slate-500">
                  <span>Presets :</span>
                  <button
                    type="button"
                    onClick={() => setNewArticle({ ...newArticle, imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200" })}
                    className="text-issr-primary underline"
                  >
                    Étudiants
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewArticle({ ...newArticle, imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200" })}
                    className="text-issr-primary underline"
                  >
                    Conférence
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewArticle({ ...newArticle, imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200" })}
                    className="text-issr-primary underline"
                  >
                    Amphithéâtre
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                  Extrait / Résumé d&apos;accroche <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={newArticle.excerpt}
                  onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                  placeholder="Une courte synthèse en 1 ou 2 phrases pour les cartes d'aperçu..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-issr-primary outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                  Contenu complet <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  placeholder="Développez ici l'ensemble de l'article ou de l'annonce..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-issr-primary outline-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newArticle.featured}
                  onChange={(e) => setNewArticle({ ...newArticle, featured: e.target.checked })}
                  className="rounded border-slate-300 text-issr-primary focus:ring-issr-primary w-4 h-4"
                />
                <label htmlFor="featured" className="text-slate-700 font-medium text-xs">
                  Mettre cet article « À la une » sur la page d’accueil et des actualités
                </label>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowArticleModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-xs transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-issr-primary hover:bg-issr-primary-light text-white font-bold text-xs py-2.5 px-6 rounded-xl transition shadow"
                >
                  Publier l&apos;Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
