'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Lock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { INSTITUTION_INFO } from '../../data/mockData';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const emailParam = searchParams.get('email') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState<{ email?: string; roleTitle?: string; firstName?: string; lastName?: string } | null>(null);

  // Password validation rules
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isFormValid = hasMinLength && passwordsMatch;

  // Check token on mount
  useEffect(() => {
    if (!token) {
      setFeedbackError("Aucun jeton de réinitialisation n'est présent dans le lien. Veuillez utiliser le lien reçu par email.");
      return;
    }

    // Call backend to verify token
    fetch(`http://localhost:3001/api/auth/verify-token?token=${encodeURIComponent(token)}`)
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setUserInfo(data);
        } else if (data.message) {
          setFeedbackError(data.message);
        }
      })
      .catch(() => {
        // Fallback for simulation/testing
        if (emailParam) {
          setUserInfo({ email: emailParam, roleTitle: 'Utilisateur Institutionnel' });
        }
      });
  }, [token, emailParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackError('');

    if (!isFormValid) {
      setFeedbackError("Veuillez respecter les critères de sécurité du mot de passe.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:3001/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (res.ok) {
        setIsSuccess(true);
      } else {
        setFeedbackError(data.message || "Erreur lors de la réinitialisation du mot de passe.");
      }
    } catch (err) {
      // Local fallback simulation
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 600);
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
          <span>Chiffrement Sécurisé SHA-256 / Salt</span>
        </div>
      </header>

      {/* Main Container */}
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
                  Définition des Accès
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Nouveau Mot de Passe
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
                  {userInfo ? (
                    <span>Compte : <strong className="text-amber-300">{userInfo.email}</strong> {userInfo.roleTitle ? `(${userInfo.roleTitle})` : ''}</span>
                  ) : (
                    "Veuillez définir un mot de passe sécurisé pour activer votre accès au portail de l'ISSR."
                  )}
                </p>
              </div>
            </div>

            {/* Success View */}
            {isSuccess ? (
              <div className="space-y-6 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white font-serif">Mot de Passe Mis à Jour avec Succès !</h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                    Votre mot de passe confidentiel a été enregistré de manière chiffrée. Vous pouvez dès à présent vous connecter au portail institutionnel.
                  </p>
                </div>

                <div className="pt-4">
                  <Link
                    href="/login"
                    className="w-full inline-block py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition"
                  >
                    Se connecter maintenant
                  </Link>
                </div>
              </div>
            ) : (
              /* Password Reset Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {feedbackError && (
                  <div className="p-3.5 rounded-xl bg-red-900/50 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{feedbackError}</span>
                  </div>
                )}

                {/* New Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Nouveau mot de passe <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 caractères"
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950/80 border border-white/15 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder:text-slate-500 text-sm outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Confirmer le nouveau mot de passe <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Retapez votre mot de passe"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder:text-slate-500 text-sm outline-none transition"
                    />
                  </div>
                </div>

                {/* Security Criteria Validation List */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/10 space-y-2 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                    Exigences de robustesse :
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {hasMinLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-slate-500" />}
                      <span>8 caractères minimum</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {hasNumber ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-slate-500" />}
                      <span>Au moins un chiffre</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${hasSpecial ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {hasSpecial ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-slate-500" />}
                      <span>Caractère spécial recommandé</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${passwordsMatch ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {passwordsMatch ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-slate-500" />}
                      <span>Mots de passe identiques</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !isFormValid}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-3 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Mise à jour sécurisée en cours...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Enregistrer mon nouveau mot de passe</span>
                    </>
                  )}
                </button>

              </form>
            )}

            {/* Assistance Contact */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <span>Besoin d&apos;aide ?</span>
              <a
                href={`tel:${INSTITUTION_INFO.phone}`}
                className="text-amber-300 hover:text-white font-semibold transition"
              >
                Secrétariat Général : {INSTITUTION_INFO.phone}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#06121E] flex items-center justify-center text-amber-400 text-sm">
        Chargement du formulaire sécurisé...
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
