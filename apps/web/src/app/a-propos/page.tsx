'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  Target, 
  Eye, 
  HeartHandshake, 
  CheckCircle, 
  Users, 
  ArrowRight,
  BookOpen,
  Sparkles,
  Milestone,
  Compass,
  GraduationCap
} from 'lucide-react';
import { INSTITUTION_INFO, TEAM_MEMBERS } from '@/data/mockData';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function AboutPage() {
  const milestones = [
    {
      year: "Fondation",
      title: "Création de l'ITPR",
      desc: "L'Institut de Théologie Pastorale pour les Religieux (ITPR) est créé à Yaoundé pour offrir une solide formation théologique et spirituelle aux religieux et religieuses d'Afrique centrale.",
      badge: "Origines"
    },
    {
      year: "Consolidation",
      title: "Rattachement à l'UCAC-ICY",
      desc: "L'Institut s'associe à la Faculté de Théologie de l'Université Catholique d'Afrique Centrale (UCAC) – Institut Catholique de Yaoundé (ICY), garantissant une haute rigueur universitaire.",
      badge: "Affiliation académique"
    },
    {
      year: "2022",
      title: "Érection Canonique par le Saint-Siège (Rome)",
      desc: "Par décret de la Congrégation pour l'Éducation Catholique au Vatican, l'ITPR est érigé canoniquement en Institut Supérieur des Sciences Religieuses (ISSR) Sainte Joséphine Bakhita, habilité à conférer le Baccalauréat canonique.",
      badge: "Reconnaissance de Rome",
      highlight: true
    },
    {
      year: "Aujourd'hui",
      title: "Ouverture Panafricaine & Formations Hybrides",
      desc: "L'ISSR ouvre grand ses portes aux laïcs chrétiens engagés, lance des Diplômes Universitaires d'État et déploie l'enseignement à distance en direct pour toute la sous-région.",
      badge: "Innovation & Mission"
    }
  ];

  const values = [
    {
      title: "Excellence Académique",
      description: "Qualité et rigueur dans l'enseignement théologique, la recherche scripturaire et l'accompagnement méthodologique des apprenants.",
      icon: Award
    },
    {
      title: "Service Évangélique",
      description: "Notre devise « Se former pour mieux servir » inspire chaque cours, chaque stage et chaque action pastorale au bénéfice de l'Église et du bien commun.",
      icon: HeartHandshake
    },
    {
      title: "Intégrité & Éthique",
      description: "Promotion de la rectitude morale, de la responsabilité citoyenne, de la transparence et du respect inconditionnel de la personne humaine.",
      icon: ShieldCheck
    },
    {
      title: "Solidarité Fraternelle",
      description: "Communion chrétienne, entraide communautaire entre étudiants et attention fraternelle envers les personnes vulnérables.",
      icon: Users
    },
    {
      title: "Foi & Engagement Citoyen",
      description: "Maturation spirituelle et humaine permettant à chaque diplômé d'être sel de la terre et lumière du monde dans la société africaine.",
      icon: Sparkles
    }
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      
      {/* Hero Header with Atmosphere */}
      <section className="relative bg-gradient-to-br from-[#07192A] via-[#0B2545] to-[#13416F] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-400/15 blur-3xl pointer-events-none animate-float-slow" />

        <div className="max-w-7xl mx-auto space-y-4 text-center relative z-10 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold backdrop-blur-sm border border-amber-400/40 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Institution d&apos;Enseignement Supérieur Catholique érigée par Rome</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            À Propos de l&apos;ISSR Sainte Bakhita
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            Une formation intégrale pour des femmes et des hommes appelés à servir l&apos;Église et la société avec compétence, discernement et amour.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-20">
        
        {/* 1. Histoire & Évolution */}
        <ScrollReveal direction="up">
          <section className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-amber-200/80 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300/70 uppercase tracking-wider inline-flex items-center gap-1.5 shadow-xs">
                <Milestone className="w-4 h-4 text-amber-600" />
                <span>Histoire &amp; Fondation</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                De l&apos;ITPR à l&apos;ISSR Sainte Joséphine Bakhita
              </h2>
              <div className="text-sm text-slate-600 space-y-3 leading-relaxed font-normal">
                <p>
                  L&apos;Institut Supérieur des Sciences Religieuses Sainte Joséphine Bakhita est né de la volonté de consolider la formation théologique et pastorale des religieux, religieuses et laïcs en Afrique centrale.
                </p>
                <p>
                  Anciennement connu sous le nom d&apos;<strong>Institut de Théologie Pastorale pour les Religieux (ITPR)</strong>, l&apos;établissement a franchi une étape historique décisive en étant érigé canoniquement en <strong>Institut Supérieur des Sciences Religieuses (ISSR) par la Congrégation pour l&apos;Éducation Catholique (Rome) en 2022</strong>.
                </p>
                <p>
                  Rattaché à la Faculté de Théologie de l&apos;<strong>Université Catholique d&apos;Afrique Centrale (UCAC) – Institut Catholique de Yaoundé (ICY)</strong>, l&apos;institut propose un cadre académique prestigieux, rigoureux et porteur de diplômes reconnus internationalement.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 text-xs text-slate-800 flex items-center gap-3">
                <Award className="w-9 h-9 text-amber-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 text-sm">Diplômes reconnus par le Saint-Siège &amp; l&apos;État</p>
                  <p className="text-slate-600 mt-0.5">Baccalauréat canonique en Sciences Religieuses, Master canonique et Diplômes Universitaires d&apos;État (DU).</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-amber-300/60 ring-4 ring-amber-400/20 bg-slate-900 h-80 group">
                <img
                  src="/images/hero-1608.jpg"
                  alt="Campus ISSR Yaoundé Mvolyé"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex items-end p-6">
                  <div className="text-white text-xs space-y-1">
                    <p className="font-bold font-serif text-base text-amber-300">Campus de Mvolyé</p>
                    <p className="text-slate-200">Derrière le Collège Saint Benoît, Yaoundé, Cameroun</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 2. Interactive Milestones Timeline */}
        <ScrollReveal direction="up">
          <section className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-issr-gold uppercase tracking-wider flex items-center justify-center gap-1.5">
                <Compass className="w-4 h-4" />
                <span>Parcours Historique</span>
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-slate-900">
                Les Grandes Étapes de l&apos;Institut
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Un cheminement guidé par l&apos;Esprit Saint au service de l&apos;Église en Afrique.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((item, index) => (
                <div 
                  key={index}
                  className={`interactive-card p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                    item.highlight 
                      ? 'bg-gradient-to-b from-issr-primary/5 via-white to-amber-50/40 border-issr-gold shadow-md' 
                      : 'bg-white border-slate-200/80 shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        item.highlight 
                          ? 'bg-issr-gold text-white shadow' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.badge}
                      </span>
                      <span className="font-mono text-sm font-extrabold text-issr-gold-dark">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-slate-900 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-issr-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-issr-gold"></span>
                    <span>Étape {index + 1} sur 4</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* 3. Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal direction="left">
            <div className="interactive-card bg-white rounded-3xl p-8 border border-blue-200 shadow-sm space-y-4 h-full flex flex-col justify-between hover:shadow-xl hover:border-blue-400">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-slate-900">
                  Notre Mission
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Former des femmes et des hommes capables d&apos;articuler foi vivante, rigueur intellectuelle et compétences professionnelles au service du bien commun :
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-blue-50/50 border border-blue-100">
                    <CheckCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>Assurer une formation théologique, biblique et magistérielle intégrale.</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-blue-50/50 border border-blue-100">
                    <CheckCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>Développer le discernement éthique face aux défis contemporains en Afrique.</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-blue-50/50 border border-blue-100">
                    <CheckCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>Outiller les acteurs pastoraux pour l&apos;ingénierie et le leadership d&apos;œuvres chrétiennes.</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="interactive-card bg-white rounded-3xl p-8 border border-amber-200 shadow-sm space-y-4 h-full flex flex-col justify-between hover:shadow-xl hover:border-amber-400">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/30">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-slate-900">
                  Notre Vision
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Être l&apos;institution universitaire de référence en Afrique centrale dans la formation religieuse, pastorale et humaine, reconnue pour l&apos;excellence de son enseignement, la fidélité à l&apos;Évangile et l&apos;impact concret de ses diplômés.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 font-semibold italic leading-relaxed">
                « Permettre à chaque chrétien, laïc comme consacré, d&apos;être sel de la terre et lumière du monde dans son milieu de vie et de travail. »
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 4. Les 5 Valeurs Fondatrices */}
        <ScrollReveal direction="up">
          <section className="bg-white rounded-3xl p-8 lg:p-12 border border-amber-100 shadow-sm space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300/70 shadow-xs">
                Charte Éthique
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-slate-900">
                Nos 5 Piliers Cardinaux
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Les valeurs spirituelles, académiques et morales qui guident notre communauté universitaire au quotidien.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {values.map((v, idx) => {
                const IconComponent = v.icon;
                return (
                  <div 
                    key={idx} 
                    className="interactive-card p-5 rounded-2xl bg-[#FCFAF6] border border-amber-100 flex flex-col justify-between hover:bg-white hover:border-amber-300 hover:shadow-lg transition duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-extrabold text-amber-800">
                          0{idx + 1}.
                        </span>
                        <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
                          <IconComponent className="w-4 h-4 text-amber-700" />
                        </div>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-slate-900 mb-2">
                        {v.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {v.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* 5. Équipe de Direction */}
        <section id="direction" className="space-y-8 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300/70 shadow-xs">
              Gouvernance &amp; Direction
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-slate-900">
              L&apos;Équipe Dirigeante
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Assurant la conduite spirituelle, académique et administrative de l&apos;ISSR Bakhita avec bienveillance et rigueur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <ScrollReveal key={member.id} delay={idx * 100} direction="up">
                <div 
                  className="interactive-card bg-white rounded-3xl overflow-hidden border border-amber-100 hover:border-amber-400 shadow-sm hover:shadow-xl flex flex-col h-full group"
                >
                  <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-blue-900/90 backdrop-blur-sm text-white shadow border border-blue-700">
                      {member.title}
                    </span>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-blue-900 transition">
                        {member.name}
                      </h3>
                      <p className="text-xs font-bold text-amber-800 mt-0.5">
                        {member.role}
                      </p>
                      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-normal">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 6. CTA Banner */}
        <ScrollReveal direction="up">
          <section className="bg-gradient-to-br from-[#07192A] via-[#0B2545] to-[#13416F] rounded-3xl p-8 lg:p-12 text-white text-center space-y-6 relative overflow-hidden shadow-2xl border-t-4 border-amber-500">
            <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />
            
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold relative z-10">
              Envie de rejoindre l&apos;ISSR Sainte Bakhita ?
            </h2>
            <p className="text-sm text-slate-200 max-w-xl mx-auto relative z-10 leading-relaxed font-light">
              Consultez le catalogue détaillé de nos 9 filières ou déposez dès maintenant votre dossier de candidature pour la rentrée académique.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <Link
                href="/formations"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-400/40 text-white font-semibold text-sm transition hover:scale-105"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Voir les formations</span>
              </Link>
              <Link
                href="/admissions"
                className="btn-shimmer inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/30 hover:scale-105 border border-amber-300 transition"
              >
                <span>Candidater en ligne</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>
          </section>
        </ScrollReveal>

      </div>
    </div>
  );
}
