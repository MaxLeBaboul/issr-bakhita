import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Award, 
  BookOpen, 
  Users, 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  Quote, 
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Hero } from '@/components/Hero';
import { ScrollReveal } from '@/components/ScrollReveal';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { INSTITUTION_INFO, FORMATIONS, ARTICLES } from '@/data/mockData';

export default function HomePage() {
  const featuredFormations = FORMATIONS.slice(0, 4);
  const recentArticles = ARTICLES.slice(0, 3);

  return (
    <div>
      {/* 1. Hero Section (No slider - Fixed high-impact banner as requested by Director) */}
      <Hero />

      {/* 2. Key Metrics & Institutional Affiliation Strip (Superposed Overlapping Design with Upward Animation) */}
      <section className="relative z-20 -mt-12 sm:-mt-16 lg:-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
          
          {/* Rome 2022 - Royal Sapphire Card */}
          <div 
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-blue-200/90 shadow-xl shadow-blue-950/15 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-3 transition-all duration-300 group cursor-default animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            <div className="h-1.5 w-12 mx-auto rounded-full bg-blue-600 mb-3 group-hover:w-20 transition-all duration-300 shadow-sm shadow-blue-400" />
            <span className="block font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-900 group-hover:text-blue-700 transition-colors">
              Rome <AnimatedCounter end={2022} duration={1500} />
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-blue-800/90 uppercase tracking-wider mt-1.5 block">
              Érection canonique officielle
            </span>
          </div>

          {/* UCAC - ICY - Cardinal Crimson Card */}
          <div 
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-rose-200/90 shadow-xl shadow-rose-950/15 hover:border-rose-500 hover:shadow-2xl hover:shadow-rose-500/20 hover:-translate-y-3 transition-all duration-300 group cursor-default animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            <div className="h-1.5 w-12 mx-auto rounded-full bg-rose-600 mb-3 group-hover:w-20 transition-all duration-300 shadow-sm shadow-rose-400" />
            <span className="block font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-rose-900 group-hover:text-rose-700 transition-colors">
              UCAC - ICY
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-rose-800/90 uppercase tracking-wider mt-1.5 block">
              Faculté de Théologie
            </span>
          </div>

          {/* 9 Filières - Deep Purple/Navy Card */}
          <div 
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-indigo-200/90 shadow-xl shadow-indigo-950/15 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-3 transition-all duration-300 group cursor-default animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            <div className="h-1.5 w-12 mx-auto rounded-full bg-indigo-600 mb-3 group-hover:w-20 transition-all duration-300 shadow-sm shadow-indigo-400" />
            <span className="block font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-indigo-950 group-hover:text-indigo-700 transition-colors">
              <AnimatedCounter end={9} duration={1200} /> Filières
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-indigo-800/90 uppercase tracking-wider mt-1.5 block">
              Canoniques &amp; Professionnelles
            </span>
          </div>

          {/* 100% Hybride - Sacred Gold/Amber Card */}
          <div 
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-amber-300/90 shadow-xl shadow-amber-950/15 hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-3 transition-all duration-300 group cursor-default animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            <div className="h-1.5 w-12 mx-auto rounded-full bg-amber-500 mb-3 group-hover:w-20 transition-all duration-300 shadow-sm shadow-amber-400" />
            <span className="block font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-700 group-hover:text-amber-600 transition-colors">
              <AnimatedCounter end={100} duration={1800} suffix="%" />
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-amber-900 uppercase tracking-wider mt-1.5 block">
              Présentiel &amp; En Ligne
            </span>
          </div>

        </div>
      </section>

      {/* 3. Mot du Directeur - Warm Sanctuary Parchment Card */}
      <section className="pt-16 sm:pt-20 pb-16 lg:pb-20 bg-[#FAF8F5] relative overflow-hidden">
        {/* Ambient warm glows */}
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-rose-400/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up" distance="28px">
            <div className="bg-gradient-to-br from-white via-amber-50/30 to-white rounded-3xl p-8 lg:p-12 shadow-md border-2 border-amber-200/80 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center hover:shadow-2xl transition-all duration-300">
              
              {/* Director Photo with Double Gold Ring */}
              <div className="lg:col-span-5 flex flex-col items-center text-center group">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400 ring-4 ring-amber-400/20 group-hover:ring-amber-400/50 transition-all duration-300">
                  <img
                    src="/images/team/dir-patrice-mekana.jpg"
                    alt={INSTITUTION_INFO.director.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="mt-4">
                  <h3 className="font-serif font-bold text-lg text-issr-primary group-hover:text-amber-700 transition-colors">
                    {INSTITUTION_INFO.director.name}
                  </h3>
                  <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mt-0.5">
                    {INSTITUTION_INFO.director.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Société de l&apos;Apostolat Catholique (Pères Pallottins)
                  </p>
                </div>
              </div>

              {/* Director Message */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-300/80 shadow-xs">
                  <Quote className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                  Message de Bienvenue
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                  « Se former pour mieux servir : un défi majeur pour l&apos;Église en Afrique »
                </h2>

                <blockquote className="text-base text-slate-700 leading-relaxed space-y-3 italic border-l-4 border-amber-500 pl-5 bg-amber-50/40 py-3 rounded-r-2xl">
                  <p>
                    &ldquo;Bienvenue ! Welcome ! La formation intégrale des chrétiens représente l’un des défis majeurs de l’Église en Afrique, si nous voulons un christianisme qui rejoint l’homme africain dans sa réalité. L’Institut Supérieur des Sciences Religieuses de Yaoundé répond à cette exigence, en proposant une formation multidisciplinaire et professionnalisante, adaptée au contexte africain.&rdquo;
                  </p>
                  <p>
                    &ldquo;L’objectif visé est mieux exprimé par notre devise : <strong className="text-amber-900 font-bold not-italic">« se former pour mieux servir »</strong>. Vous voulez approfondir votre foi, peut-être pour mieux exercer des responsabilités pastorales, soyez les bienvenus à l&apos;ISSR Sainte Bakhita.&rdquo;
                  </p>
                </blockquote>

                <div className="pt-2 flex items-center gap-4">
                  <Link
                    href="/a-propos"
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-amber-700 transition-all duration-200 hover:translate-x-1"
                  >
                    <span>En savoir plus sur notre mission et nos valeurs</span>
                    <ArrowRight className="w-4 h-4 text-amber-600" />
                  </Link>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Pourquoi Choisir l'ISSR Bakhita ? (Institutional Background with Authentic Photo & Deep Vatican Overlay) */}
      <section className="relative overflow-hidden bg-issr-primary text-white py-20 lg:py-28 border-y-4 border-issr-gold shadow-2xl">
        
        {/* Authentic Academic Procession Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-100"
          style={{
            backgroundImage: `url('/images/mg-1964.jpg')`
          }}
        />

        {/* Deep Vatican Blue Gradient Overlay identical to Header for maximum readability & prestige */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950/95 via-issr-primary/90 to-slate-950/85" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

        {/* Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-issr-gold/15 blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none animate-float-slow" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-200 uppercase tracking-wider bg-amber-500/15 px-4 py-1.5 rounded-full border border-amber-400/50 shadow-sm backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Excellence Académique &amp; Spirituelle</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2 leading-tight">
                Pourquoi choisir l&apos;ISSR{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 drop-shadow-sm">
                  Sainte Joséphine Bakhita ?
                </span>
              </h2>
              <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
                Un cadre d&apos;apprentissage universitaire chrétien alliant rigueur intellectuelle, ancrage théologique et formation humaine intégrale.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1: Rome (Royal Sapphire) */}
            <ScrollReveal delay={0} direction="up">
              <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/15 hover:border-blue-400/70 hover:shadow-2xl hover:shadow-blue-500/10 interactive-card group h-full flex flex-col justify-between overflow-hidden transition-all duration-300">
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                <div className="p-7">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center mb-5 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white mb-2 group-hover:text-amber-300 transition-colors">
                    Accréditation du Saint-Siège
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                    Institut canoniquement érigé par Rome en 2022 et rattaché à la Faculté de Théologie de l&apos;UCAC-ICY.
                  </p>
                </div>
                <div className="px-7 pb-6 pt-2 border-t border-white/10 flex items-center gap-1.5 text-xs font-semibold text-blue-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Érection canonique officielle</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Diplômes (Cardinal Red) */}
            <ScrollReveal delay={100} direction="up">
              <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/15 hover:border-rose-400/70 hover:shadow-2xl hover:shadow-rose-500/10 interactive-card group h-full flex flex-col justify-between overflow-hidden transition-all duration-300">
                <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 to-red-500" />
                <div className="p-7">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center mb-5 shadow-lg shadow-rose-500/30 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white mb-2 group-hover:text-amber-300 transition-colors">
                    Diplômes Universitaires Reconnus
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                    Baccalauréat canonique (Licence), Master, et Diplômes Universitaires (DU) reconnus dans l&apos;Église universelle.
                  </p>
                </div>
                <div className="px-7 pb-6 pt-2 border-t border-white/10 flex items-center gap-1.5 text-xs font-semibold text-rose-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Validité ecclésiale &amp; d&apos;État</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3: Ouvert à Tous (Sacred Gold) */}
            <ScrollReveal delay={200} direction="up">
              <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/15 hover:border-amber-400/70 hover:shadow-2xl hover:shadow-amber-500/10 interactive-card group h-full flex flex-col justify-between overflow-hidden transition-all duration-300">
                <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 to-yellow-400" />
                <div className="p-7">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 text-slate-950 flex items-center justify-center mb-5 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-slate-950" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white mb-2 group-hover:text-amber-300 transition-colors">
                    Ouvert à Tous les Profils
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                    Laïcs engagés, religieux, religieuses, séminaristes et prêtres — étudiants ordinaires et auditeurs libres.
                  </p>
                </div>
                <div className="px-7 pb-6 pt-2 border-t border-white/10 flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Laïcs &amp; Consacrés</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 4: Enseignement Hybride (Pastoral Emerald) */}
            <ScrollReveal delay={300} direction="up">
              <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/15 hover:border-emerald-400/70 hover:shadow-2xl hover:shadow-emerald-500/10 interactive-card group h-full flex flex-col justify-between overflow-hidden transition-all duration-300">
                <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-400" />
                <div className="p-7">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                    <Globe2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white mb-2 group-hover:text-amber-300 transition-colors">
                    Enseignement Hybride &amp; Flexible
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                    Cours en présentiel sur le campus de Mvolyé à Yaoundé et en direct synchrone via Zoom et Google Meet.
                  </p>
                </div>
                <div className="px-7 pb-6 pt-2 border-t border-white/10 flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Mvolyé + Cours en Ligne</span>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 5. Catalogue des Formations Phares */}
      <section className="py-16 lg:py-20 bg-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300/70 shadow-xs">
                  Nos Programmes Académiques
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                  Découvrez nos filières de formation
                </h2>
                <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Des cursus complets avec programmes semestriels détaillés, débouchés professionnels et accompagnement personnalisé.
                </p>
              </div>
              <Link
                href="/formations"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-900 hover:text-amber-700 transition-all duration-200 hover:translate-x-1 shrink-0"
              >
                <span>Voir tout le catalogue (9 filières)</span>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredFormations.map((formation, idx) => (
              <ScrollReveal key={formation.id} delay={idx * 120} direction="up">
                <div 
                  className="bg-white rounded-3xl p-7 sm:p-8 border border-amber-100 hover:border-amber-400 interactive-card flex flex-col justify-between h-full group shadow-xs hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`px-3.5 py-1 rounded-full text-xs font-bold border ${
                        formation.category === 'canonique' 
                          ? 'bg-blue-50 text-blue-800 border-blue-200' 
                          : 'bg-purple-50 text-purple-800 border-purple-200'
                      }`}>
                        {formation.category === 'canonique' ? 'Diplôme Canonique (Rome)' : 'Diplôme Universitaire (DU)'}
                      </span>
                      <span className="text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-0.5 rounded-full">
                        {formation.duration}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-slate-900 mb-2.5 group-hover:text-blue-900 transition-colors">
                      {formation.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mb-5 leading-relaxed font-normal">
                      {formation.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 text-xs text-slate-700 mb-6 bg-amber-50/40 p-4 rounded-2xl border border-amber-200/60">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span><strong>Public :</strong> {formation.targetAudience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span><strong>Modalités :</strong> {formation.modality}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-lg border border-amber-300/60">
                      Scolarité : {formation.tuition.annualTuition} / an
                    </span>
                    <Link
                      href={`/formations#${formation.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-amber-700 transition-all duration-200 hover:translate-x-1"
                    >
                      <span>Consulter le programme</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={200}>
            <div className="mt-12 text-center">
              <Link
                href="/formations"
                className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-900 to-issr-primary hover:from-blue-800 hover:to-issr-primary-light text-white font-bold text-sm transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 border border-blue-800"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Explorer l&apos;ensemble des formations et certificats</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Dernières Actualités */}
      <section className="py-16 bg-white border-t border-amber-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300/70 shadow-xs">
                  Vie Académique &amp; Événements
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                  Actualités de l&apos;Institut
                </h2>
              </div>
              <Link
                href="/actualites"
                className="inline-flex items-center gap-1 text-sm font-bold text-blue-900 hover:text-amber-700 transition-all duration-200 hover:translate-x-1"
              >
                <span>Toutes les actualités</span>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentArticles.map((article, idx) => (
              <ScrollReveal key={article.id} delay={idx * 120} direction="up">
                <article 
                  className="bg-white rounded-3xl overflow-hidden border border-amber-100/90 hover:border-amber-400 interactive-card flex flex-col justify-between h-full group shadow-xs hover:shadow-xl"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-blue-900 text-white shadow-md border border-blue-700">
                        {article.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span>{article.publishedAt}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2">
                        <Link href={`/actualites#${article.id}`}>
                          {article.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-amber-100">
                    <Link
                      href={`/actualites#${article.id}`}
                      className="text-xs font-bold text-blue-900 hover:text-amber-700 flex items-center gap-1.5 transition-all duration-200 hover:translate-x-1"
                    >
                      <span>Lire l&apos;article complet</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call To Action (Admissions 2026-2027) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#07192A] via-[#0B2545] to-[#13416F] text-white py-20 px-4 sm:px-6 lg:px-8 border-t-4 border-amber-500">
        {/* Floating background orbs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl pointer-events-none animate-float" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none animate-pulse-glow" />

        <ScrollReveal direction="up">
          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/40 shadow-sm">
              Admissions Ouvertes 2026-2027
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Prêt à approfondir votre foi et acquérir des compétences pastorales ?
            </h2>

            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-light">
              Rejoignez l&apos;Institut Supérieur des Sciences Religieuses Sainte Joséphine Bakhita. 
              Déposez votre candidature en ligne en quelques minutes et recevez votre numéro de suivi de dossier officiel.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/admissions"
                className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 font-extrabold text-base shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all duration-200 border border-amber-300"
              >
                <span>Déposer ma Candidature</span>
                <ArrowRight className="w-5 h-5 text-slate-950" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-400/40 text-white font-semibold text-base backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span>Nous contacter &amp; Visiter le campus</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
