'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Award, 
  BookOpen, 
  Globe2, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  GraduationCap,
  Calendar
} from 'lucide-react';
import { INSTITUTION_INFO } from '../data/mockData';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-issr-primary text-white py-16 lg:py-24 border-b-4 border-issr-gold">
      
      {/* 1. Real Authentic Image from the Main Site in the Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-100"
        style={{
          backgroundImage: `url('/images/photo-group.jpg')`
        }}
      />

      {/* 2. Deep Institutional Dark Gradient Overlay for Maximum Readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950/95 via-issr-primary/90 to-slate-950/85" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

      {/* 3. Subtle Ambient Light Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-issr-gold/15 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none animate-float-slow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Simplified, Punchy & Dignified Headline */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/50 text-amber-200 text-xs font-semibold backdrop-blur-md shadow-sm animate-fade-in-down">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Érigé par Rome (2022) • Rattaché à l&apos;UCAC-ICY</span>
            </div>

            {/* Main Title - Clean & Prestigious */}
            <div className="space-y-2 animate-fade-in-up">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Institut Supérieur des Sciences Religieuses <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 drop-shadow-sm">
                  Sainte Joséphine Bakhita
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl font-serif italic text-amber-300/95 flex items-center gap-2 pt-1 font-medium">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>« {INSTITUTION_INFO.motto} »</span>
              </p>
            </div>

            {/* Simplified Single-Sentence Value Proposition */}
            <p className="text-sm sm:text-base text-slate-100 font-light leading-relaxed max-w-xl animate-fade-in-up">
              Formation universitaire, spirituelle et pastorale d&apos;excellence, ouverte aux 
              <strong className="font-semibold text-amber-200"> laïcs, religieux(ses) et prêtres</strong>. 
              Diplômes canoniques du Saint-Siège et Diplômes Universitaires d&apos;État.
            </p>

            {/* Clean Key Highlights (Minimalist & Uncluttered) */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs text-slate-200">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-sm border border-amber-400/30 text-amber-100">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Campus de Mvolyé, Yaoundé
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-sm border border-blue-400/30 text-blue-100">
                <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                Présentiel &amp; En direct en ligne
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-sm border border-emerald-400/30 text-emerald-100">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                9 Filières Accréditées
              </span>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/admissions"
                className="btn-shimmer inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all duration-200 border border-amber-300/60"
              >
                <span>Candidater en ligne (2026-2027)</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>

              <Link
                href="/formations"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-400/40 text-white font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Explorer les formations</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Sleek Visual Card with Campus Photo & Session Info */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl group transition-all duration-300 hover:border-issr-gold/40">
              
              {/* Campus Preview Image Frame */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src="/images/hero-1608.jpg"
                  alt="Campus ISSR Sainte Joséphine Bakhita à Yaoundé Mvolyé"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                
                {/* Floating Status Pill */}
                <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-300 text-xs font-semibold border border-emerald-500/40 shadow">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Inscriptions Ouvertes</span>
                </div>

                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-issr-gold-light block">
                    Campus Universitaire de Mvolyé
                  </span>
                  <p className="font-serif font-bold text-sm text-white">
                    ISSR Sainte Joséphine Bakhita
                  </p>
                </div>
              </div>

              {/* Clean Summary Details (Without Redundant Text) */}
              <div className="p-6 space-y-4 text-xs">
                <div className="flex items-center justify-between text-slate-200 border-b border-white/10 pb-3">
                  <span className="font-semibold text-white">Session Académique :</span>
                  <span className="font-mono font-bold text-issr-gold-light">2026 – 2027</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-200">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                    <span className="text-[10px] font-bold text-issr-gold-light uppercase tracking-wider block">Cursus Canonique</span>
                    <p className="text-white font-medium text-[11px]">Baccalauréat &amp; Master</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                    <span className="text-[10px] font-bold text-issr-gold-light uppercase tracking-wider block">Diplômes d&apos;État (DU)</span>
                    <p className="text-white font-medium text-[11px]">Ingénierie &amp; Gestion</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3 text-slate-300">
                  <span className="text-[11px] text-slate-300">
                    Étude de dossier sous 48h ouvrées
                  </span>
                  <Link
                    href="/admissions"
                    className="text-xs font-bold text-issr-gold-light hover:text-white transition inline-flex items-center gap-1"
                  >
                    <span>Postuler</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
