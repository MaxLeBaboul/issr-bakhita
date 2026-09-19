'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ShieldCheck, 
  UserCheck, 
  CheckCircle2, 
  Sparkles,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { INSTITUTION_INFO } from '../../data/mockData';

const PRESET_PROFILES = [
  {
    role: "Directeur",
    name: "P. Dr Patrice MEKANA",
    email: "directeur@issr-bakhita.org",
    badge: "Gouvernance & Validation"
  },
  {
    role: "Préfet des Études",
    name: "Sr. Patience ENGANEMBEN",
    email: "etudes@issr-bakhita.org",
    badge: "Pédagogie & Cursus"
  },
  {
    role: "Secrétariat de Direction",
    name: "Mlle Manuella NYAMBONE",
    email: "secretariat@issr-bakhita.org",
    badge: "Administration & Dossiers"
  },
  {
    role: "Corps Enseignant",
    name: "M. Jean Claude MEKOULOU",
    email: "faculte@issr-bakhita.org",
    badge: "Publication & Cours"
  }
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('directeur@issr-bakhita.org');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [loginError, setLoginError] = useState('');

  const handleSelectPreset = (index: number) => {
    setSelectedProfileIndex(index);
    const profile = PRESET_PROFILES[index];
    setEmail(profile.email);
    setPassword('Bakhita2026!');
    setLoginError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    // Simulate authenticating session
    setTimeout(() => {
      setIsLoading(false);
      // Store user session info in localStorage
      const activeProfile = PRESET_PROFILES[selectedProfileIndex];
      try {
        localStorage.setItem('issr_logged_user', JSON.stringify({
          name: activeProfile ? activeProfile.name : email.split('@')[0],
          role: activeProfile ? activeProfile.role : 'Utilisateur',
          email: email,
          timestamp: new Date().toISOString()
        }));
      } catch (err) {
        console.error("Session storage error", err);
      }
      router.push('/admin');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#06121E] text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-amber-400 selection:text-slate-950">
      {/* Background photography overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none scale-105"
        style={{ backgroundImage: `url('/images/hero-1608.jpg')` }}
      />

      {/* Atmospheric radial glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-amber-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />

      {/* Top Bar: Return Link */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex items-center justify-between">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-amber-300 transition px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au site public de l&apos;ISSR</span>
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-[11px] text-amber-200/80 uppercase font-bold tracking-widest bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Accès Sécurisé SSL 256 bits</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-xl">
          {/* Card Container */}
          <div className="bg-slate-900/85 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl shadow-slate-950/80 relative">
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-amber-400 to-rose-600 rounded-t-3xl" />

            {/* Header / Logo */}
            <div className="text-center space-y-3 mb-8">
              <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-white/10 border border-white/15 shadow-md">
                <img 
                  src="/logo.jpg" 
                  alt="ISSR Sainte Joséphine Bakhita" 
                  className="h-16 w-auto object-contain rounded-lg"
                />
              </div>

              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  UCAC - ICY &bull; Érection Canonique Rome 2022
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Portail Institutionnel
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
                  Connexion réservée à la Direction, au Corps Professoral et au Secrétariat de l&apos;ISSR Sainte Bakhita.
                </p>
              </div>
            </div>

            {/* Preset Profile Switcher for Instant Testing */}
            <div className="mb-6 bg-slate-950/60 rounded-2xl p-3.5 border border-white/10">
              <div className="flex items-center justify-between mb-2.5 px-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  Profils Institutionnels Rapides
                </span>
                <span className="text-[10px] text-amber-300/80 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                  Cliquez pour pré-remplir
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {PRESET_PROFILES.map((prof, idx) => (
                  <button
                    key={prof.email}
                    type="button"
                    onClick={() => handleSelectPreset(idx)}
                    className={`text-left p-2.5 rounded-xl text-xs transition border ${
                      selectedProfileIndex === idx
                        ? 'bg-amber-500/15 border-amber-400/70 text-white shadow-sm'
                        : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span className="truncate">{prof.role}</span>
                      {selectedProfileIndex === idx && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">{prof.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 rounded-xl bg-red-900/40 border border-red-500/40 text-red-200 text-xs">
                  {loginError}
                </div>
              )}

              {/* Email / Identifier Field */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Identifiant institutionnel ou Email universitaire
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ex: direction@issr-bakhita.org"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/70 border border-white/15 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder:text-slate-500 text-sm outline-none transition"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Mot de passe
                  </label>
                  <a 
                    href={`https://wa.me/237655165757?text=${encodeURIComponent("Bonjour Secrétariat ISSR, j'ai oublié mes accès au portail de gestion.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-amber-300 hover:text-amber-200 hover:underline"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950/70 border border-white/15 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder:text-slate-500 text-sm outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-400 bg-slate-950/80"
                  />
                  <span className="text-xs text-slate-300">Rester connecté sur cet appareil</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Vérification des autorisations canoniques...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Se connecter au Back-office</span>
                  </>
                )}
              </button>
            </form>

            {/* Assistance Box */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Besoin d&apos;aide pour vous connecter ?</span>
              </div>
              <a
                href={`tel:${INSTITUTION_INFO.phone}`}
                className="text-amber-300 hover:text-white font-semibold flex items-center gap-1 transition"
              >
                <span>Secrétariat : {INSTITUTION_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Notice */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 text-center text-xs text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} {INSTITUTION_INFO.name} &bull; Système d&apos;Information Académique &amp; Scolarité.
        </p>
      </footer>
    </div>
  );
}
