'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Clock, 
  Users, 
  Globe2, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight,
  Filter,
  DollarSign,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers
} from 'lucide-react';
import { FORMATIONS } from '@/data/mockData';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function FormationsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Expanded semesters state: formationId-semesterIndex
  const [expandedSemesters, setExpandedSemesters] = useState<Record<string, boolean>>({
    'licence-theologie-pastorale-0': true,
    'master-sciences-religieuses-0': true,
    'du-ingenierie-pastorale-0': true,
  });

  const toggleSemester = (key: string) => {
    setExpandedSemesters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredFormations = FORMATIONS.filter(f => {
    const matchesCategory = activeCategory === 'all' || f.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch = 
      f.title.toLowerCase().includes(q) ||
      f.subtitle.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.careerProspects.some(cp => cp.toLowerCase().includes(q)) ||
      f.program.some(p => p.modules.some(m => m.toLowerCase().includes(q)));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      
      {/* Header Banner with Atmospheric Background */}
      <section className="relative bg-gradient-to-br from-[#07192A] via-[#0B2545] to-[#13416F] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-400/15 blur-3xl pointer-events-none animate-float-slow" />

        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10 animate-fade-in-down">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold backdrop-blur-sm border border-amber-400/40 shadow-sm">
            <Award className="w-4 h-4 text-amber-400" />
            Diplômes Canoniques (Rome) &amp; Diplômes Universitaires (UCAC)
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Catalogue des Formations
          </h1>
          <p className="text-slate-200 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            Découvrez nos 9 filières d&apos;excellence en théologie, pastorale, gestion ecclésiale et éducation, 
            dispensées en présentiel sur le campus de Mvolyé (Yaoundé) et en direct en ligne.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="sticky top-[69px] z-30 bg-white/95 backdrop-blur-md border-b border-amber-100 py-3.5 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'bg-blue-900 text-white shadow-md scale-[1.02] ring-2 ring-blue-900/20'
                  : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
              }`}
            >
              Toutes les filières ({FORMATIONS.length})
            </button>
            <button
              onClick={() => setActiveCategory('canonique')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                activeCategory === 'canonique'
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-md scale-[1.02] ring-2 ring-blue-500/20'
                  : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
              }`}
            >
              Grades Canoniques &amp; Masters ({FORMATIONS.filter(f => f.category === 'canonique').length})
            </button>
            <button
              onClick={() => setActiveCategory('professionnelle')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                activeCategory === 'professionnelle'
                  ? 'bg-gradient-to-r from-rose-700 to-red-600 text-white shadow-md scale-[1.02] ring-2 ring-rose-500/20'
                  : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
              }`}
            >
              Licences &amp; DU Professionnels ({FORMATIONS.filter(f => f.category === 'professionnelle').length})
            </button>
            <button
              onClick={() => setActiveCategory('certificat')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                activeCategory === 'certificat'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md scale-[1.02] ring-2 ring-amber-500/20'
                  : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
              }`}
            >
              Certificats &amp; Formation Continue ({FORMATIONS.filter(f => f.category === 'certificat').length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par discipline, module..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-[#FCFAF6] focus:bg-white"
            />
          </div>

        </div>
      </section>

      {/* Results Header Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium">
          {filteredFormations.length} filière{filteredFormations.length > 1 ? 's' : ''} trouvée{filteredFormations.length > 1 ? 's' : ''}
        </span>
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="text-issr-gold hover:underline font-semibold"
          >
            Effacer la recherche
          </button>
        )}
      </div>

      {/* Formations List with Staggered Scroll Reveal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-12">
        {filteredFormations.map((formation, idx) => (
          <ScrollReveal key={formation.id} delay={idx * 60} direction="up">
            <div 
              id={formation.id}
              className="interactive-card bg-white rounded-3xl p-6 sm:p-10 border border-amber-100/90 hover:border-amber-400 shadow-sm hover:shadow-2xl transition-all scroll-mt-28 relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                formation.category === 'canonique' 
                  ? 'bg-gradient-to-r from-blue-700 via-amber-500 to-indigo-700'
                  : 'bg-gradient-to-r from-rose-600 via-amber-500 to-red-600'
              }`} />

              {/* Top Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-100 pb-6 pt-2">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                      formation.category === 'canonique'
                        ? 'bg-blue-50 text-blue-900 border-blue-200'
                        : 'bg-rose-50 text-rose-900 border-rose-200'
                    }`}>
                      <Award className={`w-3.5 h-3.5 ${formation.category === 'canonique' ? 'text-blue-700' : 'text-rose-700'}`} />
                      {formation.category === 'canonique' ? 'Diplôme Canonique (Saint-Siège, Rome)' : 'Diplôme Universitaire (DU)'}
                    </span>
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {formation.duration}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 pt-1">
                    {formation.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-amber-800 font-bold">
                    {formation.subtitle}
                  </p>
                </div>

                {/* Action Button */}
                <div className="shrink-0">
                  <Link
                    href={`/admissions?filiere=${encodeURIComponent(formation.title)}`}
                    className="btn-shimmer inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/35 transition-all hover:scale-105 active:scale-95 border border-amber-300"
                  >
                    <span>Postuler à cette filière</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </Link>
                </div>
              </div>

              {/* Content Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                
                {/* Left : Overview & Program */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Présentation de la filière</span>
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed font-normal">
                      {formation.description}
                    </p>
                  </div>

                  {/* Objectives */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Objectifs pédagogiques &amp; compétences
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {formation.objectives.map((obj, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 p-2.5 rounded-xl bg-amber-50/30 border border-amber-100 hover:border-amber-300 transition">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Semesters / Modules Accordion */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-amber-600" />
                        <span>Programme académique (cliquer pour déployer)</span>
                      </h3>
                      <span className="text-[11px] text-amber-800 font-bold">
                        {formation.program.length} semestres
                      </span>
                    </div>

                    <div className="space-y-3">
                      {formation.program.map((prog, i) => {
                        const semesterKey = `${formation.id}-${i}`;
                        const isOpen = expandedSemesters[semesterKey] ?? (i === 0);

                        return (
                          <div 
                            key={i} 
                            className="rounded-2xl border border-amber-200/70 overflow-hidden bg-white shadow-xs transition-all duration-200"
                          >
                            <button
                              type="button"
                              onClick={() => toggleSemester(semesterKey)}
                              className="w-full p-4 text-left flex items-center justify-between hover:bg-amber-50/40 transition"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                                <h4 className="font-serif font-bold text-sm text-issr-primary">
                                  {prog.semester}
                                </h4>
                                <span className="text-[11px] text-slate-600 font-medium px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                                  {prog.modules.length} cours
                                </span>
                              </div>
                              <div className="p-1 rounded-full text-slate-500 hover:text-amber-700 transition">
                                {isOpen ? <ChevronUp className="w-4 h-4 text-amber-600" /> : <ChevronDown className="w-4 h-4" />}
                              </div>
                            </button>

                            {isOpen && (
                              <div className="p-4 pt-0 border-t border-amber-100 bg-amber-50/20 animate-fade-in">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mt-3">
                                  {prog.modules.map((mod, j) => (
                                    <li key={j} className="flex items-start gap-2 p-2 rounded-lg bg-white border border-amber-100/80 hover:border-amber-300 transition">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                                      <span className="leading-snug">{mod}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Career Prospects */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Débouchés professionnels &amp; pastoraux
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {formation.careerProspects.map((cp, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-xl bg-stone-100 text-slate-800 text-xs font-semibold hover:bg-stone-200 transition">
                          💼 {cp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right : Sidebar details (Modalités, Public, Frais) */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-4 text-xs shadow-xs">
                    <div>
                      <span className="font-bold text-amber-900 uppercase tracking-wider block mb-1">
                        Public Cible
                      </span>
                      <p className="text-slate-800 font-medium leading-relaxed">
                        {formation.targetAudience}
                      </p>
                    </div>

                    <div className="border-t border-amber-200/70 pt-3">
                      <span className="font-bold text-amber-900 uppercase tracking-wider block mb-1">
                        Modalités d&apos;Enseignement
                      </span>
                      <p className="text-slate-800 font-semibold flex items-center gap-1.5">
                        <Globe2 className="w-4 h-4 text-blue-700 shrink-0" />
                        <span>{formation.modality}</span>
                      </p>
                    </div>

                    <div className="border-t border-amber-200/70 pt-3">
                      <span className="font-bold text-amber-900 uppercase tracking-wider block mb-1">
                        Conditions d&apos;Admission
                      </span>
                      <ul className="space-y-1 text-slate-700 font-medium">
                        {formation.requirements.map((req, i) => (
                          <li key={i}>• {req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-amber-200/70 pt-3">
                      <span className="font-bold text-amber-900 uppercase tracking-wider block mb-1 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                        <span>Frais de Scolarité</span>
                      </span>
                      <div className="space-y-1 text-slate-800">
                        <p>Inscription : <strong className="text-blue-900 font-bold">{formation.tuition.registrationFee}</strong></p>
                        <p>Scolarité annuelle : <strong className="text-amber-800 font-extrabold text-sm">{formation.tuition.annualTuition}</strong></p>
                        <p className="text-[11px] text-amber-900 bg-amber-100/60 p-2.5 rounded-xl border border-amber-300/60 mt-1 font-medium">
                          {formation.tuition.installments}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/admissions?filiere=${encodeURIComponent(formation.title)}`}
                    className="btn-shimmer w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-900 to-issr-primary hover:from-blue-800 hover:to-issr-primary-light text-white font-bold text-xs text-center flex items-center justify-center gap-2 transition shadow-md hover:scale-[1.02] active:scale-[0.98] border border-blue-800"
                  >
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    <span>S&apos;inscrire à cette formation</span>
                  </Link>
                </div>

              </div>
            </div>
          </ScrollReveal>
        ))}

        {filteredFormations.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-slate-700 mb-1">Aucune formation ne correspond à votre recherche</h3>
            <p className="text-slate-500 text-sm mb-4">
              Essayez un autre mot-clé ou réinitialisez les filtres.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="px-5 py-2 rounded-xl bg-issr-primary text-white text-xs font-semibold"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
