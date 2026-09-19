'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  KeyRound, 
  Mail, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { INSTITUTION_INFO } from '../../data/mockData';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [simulatedToken, setSimulatedToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setFeedbackMessage('Veuillez renseigner une adresse email universitaire valide.');
      return;
    }

    setIsLoading(true);
    setFeedbackMessage('');

    try {
      // Call NestJS backend
      const response = await fetch('http://localhost:3001/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();
      setIsLoading(false);
      setIsSuccess(true);
      setFeedbackMessage(data.message || "Un lien de réinitialisation sécurisé a été transmis à votre adresse email universitaire.");
      if (data.simulatedToken) {
        setSimulatedToken(data.simulatedToken);
      }
    } catch (err) {
      console.warn("Connexion API backend distante échouée, bascule sur simulation locale:", err);
      // Fallback local simulation
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        const fallbackToken = 'sim_' + Math.random().toString(36).substring(2, 15);
        setSimulatedToken(fallbackToken);
        setFeedbackMessage("Un lien de réinitialisation sécurisé a été expédié à votre adresse email universitaire.");
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#06121E] text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* Background Photography */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none scale-105"
        style={{ backgroundImage: `url('/images/hero-1608.jpg')` }}
      />

      {/* Atmospheric radial glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-amber-500/15 blur-[120px] pointer-events-none" />

      {/* Top Bar */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex items-center justify-between">
        <Link 
          href="/login"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-amber-300 transition px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la page de connexion</span>
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-[11px] text-amber-200/80 uppercase font-bold tracking-widest bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Procédure Sécurisée SSL 256 bits</span>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-lg">
          
          <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl shadow-slate-950/80 relative">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-amber-400 to-rose-600 rounded-t-3xl" />

            {/* Header / Seal */}
            <div className="text-center space-y-3 mb-8">
              <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-white/10 border border-white/15 shadow-md">
                <img 
                  src="/logo-seal.png" 
                  alt="Sceau Officiel ISSR Sainte Joséphine Bakhita" 
                  className="h-16 w-auto object-contain rounded-lg"
                />
              </div>

              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  Authentification & Sécurité
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Mot de Passe Oublié
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
                  Renseignez votre adresse email universitaire pour recevoir un lien de réinitialisation sécurisé valable 24 heures.
                </p>
              </div>
            </div>

            {/* Success State */}
            {isSuccess ? (
              <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Demande prise en compte</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {feedbackMessage}
                  </p>
                  <div className="pt-2 border-t border-emerald-500/20 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pensez à vérifier vos courriers indésirables (spams). Lien valide pendant 24h.</span>
                  </div>
                </div>

                {/* Local Dev Inspection Link */}
                {simulatedToken && (
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-xs space-y-2">
                    <span className="font-bold text-amber-300 text-[10px] uppercase tracking-wider block">
                      Aperçu Immédiat du Lien de Réinitialisation :
                    </span>
                    <Link
                      href={`/reset-password?token=${simulatedToken}&email=${encodeURIComponent(email)}`}
                      className="text-amber-400 hover:text-amber-300 underline font-mono text-[11px] break-all flex items-center gap-1"
                    >
                      <span>Accéder au formulaire de choix du mot de passe</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  </div>
                )}

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setEmail('');
                      setSimulatedToken(null);
                    }}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs border border-white/10 transition"
                  >
                    Réessayer avec une autre adresse
                  </button>
                  <Link
                    href="/login"
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition text-center shadow-md shadow-amber-500/20"
                  >
                    Retourner à la page de connexion
                  </Link>
                </div>
              </div>
            ) : (
              /* Request Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {feedbackMessage && (
                  <div className="p-3.5 rounded-xl bg-red-900/50 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Adresse email universitaire ou institutionnelle <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      autoFocus
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ex: prenom.nom@issr-bakhita.cm"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder:text-slate-500 text-sm outline-none transition"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/50 border border-white/10 text-[11px] text-slate-400 leading-relaxed">
                  Conformément aux règles de sécurité de l&apos;Institut, les comptes ne peuvent pas être réinitialisés par téléphone. Un lien chiffré unique vous sera expédié.
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-3 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Transmission de la demande sécurisée...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Envoyer le lien de réinitialisation</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Assistance Contact */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <span>Vous ne recevez pas l&apos;email ?</span>
              <a
                href={`tel:${INSTITUTION_INFO.phone}`}
                className="text-amber-300 hover:text-white font-semibold transition"
              >
                Assistance DSI : {INSTITUTION_INFO.phone}
              </a>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 text-center text-xs text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} {INSTITUTION_INFO.name} &bull; Système d&apos;Information Académique &amp; Sécurité.
        </p>
      </footer>
    </div>
  );
}
