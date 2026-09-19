import React from 'react';
import Link from 'next/link';
import { GraduationCap, MapPin, Phone, Mail, Award, ShieldCheck, Heart, MessageCircle } from 'lucide-react';
import { INSTITUTION_INFO, FORMATIONS } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07192A] text-slate-300 pt-16 pb-8 border-t-4 border-amber-500/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1 : Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1.5 shadow-md shadow-amber-500/20 flex items-center justify-center shrink-0 border border-amber-400/30">
                <img 
                  src="/logo-seal.png" 
                  alt="Logo Officiel ISSR Sainte Joséphine Bakhita" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-white text-lg leading-tight tracking-tight">
                  ISSR SAINTE BAKHITA
                </span>
                <span className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                  Institut Supérieur des Sciences Religieuses
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {INSTITUTION_INFO.name}. Établissement d&apos;enseignement supérieur catholique dédié à la formation intellectuelle, spirituelle et pastorale.
            </p>
            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-amber-400/30 text-xs space-y-1.5 shadow-xs">
              <p className="font-bold text-amber-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                {INSTITUTION_INFO.affiliation}
              </p>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {INSTITUTION_INFO.erection}
              </p>
            </div>
          </div>

          {/* Col 2 : Formations */}
          <div>
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Formations &amp; Diplômes
            </h3>
            <ul className="space-y-2.5 text-xs">
              {FORMATIONS.slice(0, 5).map((f) => (
                <li key={f.id}>
                  <Link href={`/formations#${f.id}`} className="hover:text-amber-300 transition line-clamp-1 flex items-center gap-1.5">
                    <span className="text-amber-400/70">›</span> {f.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/formations" className="text-amber-300 font-bold hover:underline inline-flex items-center gap-1">
                  Voir toutes les 9 filières &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 : Liens Rapides */}
          <div>
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Liens Utiles
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-amber-300 transition flex items-center gap-1.5">
                  <span className="text-amber-400/70">›</span> Accueil
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-amber-300 transition flex items-center gap-1.5">
                  <span className="text-amber-400/70">›</span> Histoire &amp; Érection à Rome
                </Link>
              </li>
              <li>
                <Link href="/a-propos#direction" className="hover:text-amber-300 transition flex items-center gap-1.5">
                  <span className="text-amber-400/70">›</span> Équipe de Direction
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-white transition font-bold text-amber-300 flex items-center gap-1.5">
                  <span className="text-amber-400">★</span> Candidature en ligne (2026-2027)
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="hover:text-amber-300 transition flex items-center gap-1.5">
                  <span className="text-amber-400/70">›</span> Actualités &amp; Événements
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition flex items-center gap-1.5">
                  <span className="text-amber-400/70">›</span> Nous contacter &amp; Accès campus
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 : Contact & Localisation */}
          <div>
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Contact &amp; Accès
            </h3>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-300">{INSTITUTION_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${INSTITUTION_INFO.phone}`} className="hover:text-amber-300 font-medium transition text-slate-200">
                  {INSTITUTION_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${INSTITUTION_INFO.email}`} className="hover:text-amber-300 font-medium transition text-slate-200">
                  {INSTITUTION_INFO.email}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={`https://wa.me/${INSTITUTION_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold transition text-xs shadow-md shadow-emerald-900/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Échanger sur WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {INSTITUTION_INFO.name}. Tous droits réservés.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-slate-400">Devise officielle :</span>
            <span className="text-amber-300 font-semibold italic font-serif">« {INSTITUTION_INFO.motto} »</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
