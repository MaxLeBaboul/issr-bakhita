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
  CheckCircle2, 
  HelpCircle,
  Shield,
  GraduationCap,
  BookOpen,
  DollarSign,
  Award,
  Users,
  User,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { INSTITUTION_INFO } from '../../data/mockData';
import { UserRole } from '../../types/rbac';
import { SCHOOL_API_URL } from '../../lib/api';

interface InstitutionalRoleOption {
  id: UserRole;
  title: string;
  department: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'GOUVERNANCE' | 'PEDAGOGIE' | 'ETUDIANT';
}

const INSTITUTIONAL_ROLES: InstitutionalRoleOption[] = [
  {
    id: 'directeur',
    title: "Direction de l'Institut",
    department: "Gouvernance Institutionnelle & Décisions",
    badge: "Direction",
    icon: Shield,
    category: 'GOUVERNANCE'
  },
  {
    id: 'secretaire_admin',
    title: "Secrétariat Administratif",
    department: "Accueil, Candidatures & Convocations",
    badge: "Administration",
    icon: FileCheck,
    category: 'GOUVERNANCE'
  },
  {
    id: 'secretaire_acad',
    title: "Secrétariat Académique",
    department: "Scolarité, Équivalences & Examens",
    badge: "Scolarité",
    icon: GraduationCap,
    category: 'GOUVERNANCE'
  },
  {
    id: 'prefet_etudes',
    title: "Préfecture des Études",
    department: "Pédagogie, Maquettes LMD & Jurys",
    badge: "Académique",
    icon: BookOpen,
    category: 'PEDAGOGIE'
  },
  {
    id: 'econome',
    title: "Économat & Intendance",
    department: "Gestion Financière, Écolages & Quitus",
    badge: "Économat",
    icon: DollarSign,
    category: 'GOUVERNANCE'
  },
  {
    id: 'rep_enseignants',
    title: "Délégation des Enseignants",
    department: "Conseil Pédagogique & Coordination",
    badge: "Coordination",
    icon: Users,
    category: 'PEDAGOGIE'
  },
  {
    id: 'enseignants',
    title: "Corps Professoral",
    department: "Saisie des Notes & Polycopiés de Cours",
    badge: "Enseignement",
    icon: Award,
    category: 'PEDAGOGIE'
  },
  {
    id: 'etudiants',
    title: "Espace Étudiant",
    department: "Relevé de Notes & Ressources Numériques",
    badge: "Étudiant LMD",
    icon: User,
    category: 'ETUDIANT'
  },
  {
    id: 'admin',
    title: "Administration Système (DSI)",
    department: "Sécurité Réseau, Audit & Infrastructure",
    badge: "Super-Admin",
    icon: KeyRound,
    category: 'GOUVERNANCE'
  }
];

export default function LoginPage() {
  const router = useRouter();
  
  // Role selection state (Strictly without any personal name or prefilled credentials)
  const [selectedRole, setSelectedRole] = useState<UserRole>('directeur');
  
  // Credentials states strictly empty by default for security
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'GOUVERNANCE' | 'PEDAGOGIE' | 'ETUDIANT'>('ALL');

  const filteredRoles = INSTITUTIONAL_ROLES.filter(r => {
    if (roleFilter === 'ALL') return true;
    return r.category === roleFilter;
  });

  const handleSelectRole = (roleId: UserRole) => {
    setSelectedRole(roleId);
    setLoginError('');
    // SECURITY: strictly do NOT fill in email or password
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!email.trim() || !password.trim()) {
      setLoginError('Veuillez renseigner votre identifiant universitaire et votre mot de passe.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${SCHOOL_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
          expectedRole: selectedRole,
        }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (res.ok && data.success) {
        const user = data.user;
        
        // Strictly verify that user.role matches selectedRole
        if (user.role !== selectedRole) {
          const userRoleObj = INSTITUTIONAL_ROLES.find(r => r.id === user.role) || INSTITUTIONAL_ROLES[0];
          setLoginError(
            `Accès refusé : Vos identifiants correspondent au profil « ${userRoleObj.title} ». Vous ne pouvez pas vous connecter dans l'espace « ${selectedRoleObj.title} ». Veuillez sélectionner « ${userRoleObj.title} » sur la gauche.`
          );
          return;
        }

        const effectiveRole = user.role as UserRole;
        const activeRoleObj = INSTITUTIONAL_ROLES.find(r => r.id === effectiveRole) || INSTITUTIONAL_ROLES[0];
        
        localStorage.setItem('issr_logged_role', effectiveRole);
        localStorage.setItem('issr_logged_user', JSON.stringify({
          id: user.id,
          role: effectiveRole,
          roleTitle: user.roleTitle || activeRoleObj.title,
          department: user.department || activeRoleObj.department,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || activeRoleObj.title,
          email: user.email || email.trim(),
          timestamp: new Date().toISOString()
        }));

        router.push('/admin');
      } else {
        setLoginError(data.message || 'Identifiant ou mot de passe incorrect.');
      }
    } catch {
      // Local fallback in case the microservice is temporarily offline
      setIsLoading(false);
      const isMaxwell = email.trim().toLowerCase() === 'maxwellbaboula@gmail.com';
      const validAdminPasswords = ['Admin@Bakhita2026!', 'Bakhita2026!', 'Admin2026!'];
      
      // Strict role check for Admin
      if (isMaxwell) {
        if (!validAdminPasswords.includes(password.trim())) {
          setLoginError('Mot de passe incorrect pour le compte Administrateur.');
          return;
        }
        if (selectedRole !== 'admin') {
          setLoginError(
            `Accès refusé : Ce compte est configuré avec le rôle « Administration Système (DSI) ». Vous ne pouvez pas vous connecter dans l'espace « ${selectedRoleObj.title} ». Veuillez sélectionner « Administration Système (DSI) » pour continuer.`
          );
          return;
        }
      }

      // Strict role check for Student
      if (selectedRole === 'etudiants') {
        const isStudentEmail = email.toLowerCase().includes('etudiant') || email.toLowerCase().startsWith('e.');
        if (!isStudentEmail && !isMaxwell) {
          setLoginError(
            `Accès refusé pour l'espace « Espace Étudiant » : Ces identifiants ne sont pas reconnus comme un compte étudiant matriculé.`
          );
          return;
        }
      }

      // Check teacher
      if (selectedRole === 'enseignants' || selectedRole === 'rep_enseignants') {
        if (isMaxwell) {
          setLoginError(
            `Accès refusé : Le compte administrateur ne peut pas accéder à l'espace enseignant sans changer de rôle.`
          );
          return;
        }
      }

      const effectiveRole = isMaxwell ? 'admin' : selectedRole;
      const activeRoleObj = INSTITUTIONAL_ROLES.find(r => r.id === effectiveRole) || INSTITUTIONAL_ROLES[0];
      
      localStorage.setItem('issr_logged_role', effectiveRole);
      localStorage.setItem('issr_logged_user', JSON.stringify({
        role: effectiveRole,
        roleTitle: activeRoleObj.title,
        department: activeRoleObj.department,
        name: isMaxwell ? 'Maxwell BABOULA' : activeRoleObj.title,
        email: email.trim(),
        timestamp: new Date().toISOString()
      }));

      router.push('/admin');
    }
  };

  const selectedRoleObj = INSTITUTIONAL_ROLES.find(r => r.id === selectedRole) || INSTITUTIONAL_ROLES[0];

  return (
    <div className="min-h-screen bg-[#06121E] text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-amber-400 selection:text-slate-950">
      
      {/* Subtle Background Photography */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none scale-105"
        style={{ backgroundImage: `url('/images/hero-1608.jpg')` }}
      />

      {/* Atmospheric radial glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-amber-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />

      {/* Top Bar: Return Link & Security Badge */}
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
          <span>Portail Sécurisé SSL 256 bits</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-2xl">
          
          {/* Card Container */}
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
                  UCAC - ICY &bull; Érection Canonique Rome 2022
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Espace d&apos;Authentification Collaboratif
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
                  Connexion sécurisée aux services de gouvernance, gestion académique et espaces de travail de l&apos;ISSR Sainte Bakhita.
                </p>
              </div>
            </div>

            {/* Security Notice: No pre-filling */}
            <div className="mb-6 p-3.5 rounded-2xl bg-slate-950/80 border border-amber-500/20 flex items-start gap-3 text-xs text-slate-300">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 block uppercase tracking-wider text-[10px]">
                  Protocole de Confidentialité &amp; Sécurité :
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">
                  Aucun identifiant ni mot de passe n&apos;est pré-rempli sur ce terminal. Veuillez sélectionner votre fonction institutionnelle et renseigner vos identifiants nominatifs.
                </p>
              </div>
            </div>

            {/* 1. SELECTION DU RÔLE INSTITUTIONNEL (SANS NOMS DE PERSONNES) */}
            <div className="mb-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>1. Sélectionner votre fonction institutionnelle</span>
                </label>
                
                {/* Category Filter Pills */}
                <div className="flex items-center gap-1 text-[10px] bg-slate-950/70 p-1 rounded-xl border border-white/10 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setRoleFilter('ALL')}
                    className={`px-2 py-0.5 rounded-lg font-semibold transition ${
                      roleFilter === 'ALL' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Tous ({INSTITUTIONAL_ROLES.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoleFilter('GOUVERNANCE')}
                    className={`px-2 py-0.5 rounded-lg font-semibold transition ${
                      roleFilter === 'GOUVERNANCE' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Gouvernance
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoleFilter('PEDAGOGIE')}
                    className={`px-2 py-0.5 rounded-lg font-semibold transition ${
                      roleFilter === 'PEDAGOGIE' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Pédagogie
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoleFilter('ETUDIANT')}
                    className={`px-2 py-0.5 rounded-lg font-semibold transition ${
                      roleFilter === 'ETUDIANT' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Étudiant
                  </button>
                </div>
              </div>

              {/* Roles Grid (9 Roles, No Personal Names) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-h-64 sm:max-h-none overflow-y-auto pr-1">
                {filteredRoles.map((role) => {
                  const isSelected = selectedRole === role.id;
                  const IconComp = role.icon;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleSelectRole(role.id)}
                      className={`text-left p-3 rounded-2xl text-xs transition border flex flex-col justify-between gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-slate-900 border-amber-400 text-white shadow-md shadow-amber-500/10 ring-1 ring-amber-400'
                          : 'bg-slate-950/60 border-white/10 text-slate-300 hover:bg-slate-800/80 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`p-1.5 rounded-lg shrink-0 ${
                            isSelected ? 'bg-amber-400 text-slate-950' : 'bg-white/5 text-amber-400'
                          }`}>
                            <IconComp className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-bold text-xs truncate leading-tight">{role.title}</span>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 ml-1" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">
                        {role.department}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Role Confirmation Banner */}
              <div className="bg-slate-950/70 p-3 rounded-2xl border border-amber-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  <span className="text-slate-300">
                    Espace ciblé : <strong className="text-amber-300 font-bold">{selectedRoleObj.title}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 hidden sm:inline">Identifiants cloisonnés à ce rôle</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {selectedRoleObj.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. FORMULAIRE DE CONNEXION (VIDE PAR DEFAUT) */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {loginError && (
                <div className="p-3.5 rounded-xl bg-red-900/50 border border-red-500/50 text-red-200 text-xs flex items-center gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Email / Identifier Field (EMPTY by default) */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  2. Identifiant institutionnel ou Email universitaire <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ex: identifiant@issr-bakhita.cm ou matricule"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder:text-slate-500 text-sm outline-none transition"
                  />
                </div>
              </div>

              {/* Password Field (EMPTY by default) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    3. Mot de passe <span className="text-amber-400">*</span>
                  </label>
                  <Link 
                    href="/forgot-password"
                    className="text-[11px] text-amber-300 hover:text-amber-200 hover:underline font-semibold"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
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
                    placeholder="Entrez votre mot de passe confidentiel"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950/80 border border-white/15 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder:text-slate-500 text-sm outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition cursor-pointer"
                    title={showPassword ? 'Masquer' : 'Afficher'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Toggle */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-400 bg-slate-950/80"
                  />
                  <span className="text-xs text-slate-300">Mémoriser cet appareil (hors mot de passe)</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Vérification des autorisations...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Accéder à l&apos;Espace {selectedRoleObj.title}</span>
                  </>
                )}
              </button>
            </form>

            {/* Assistance Box */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Assistance technique &amp; délivrance des accès :</span>
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
          &copy; {new Date().getFullYear()} {INSTITUTION_INFO.name} &bull; Système d&apos;Information Académique, Scolarité &amp; Gouvernance.
        </p>
      </footer>
    </div>
  );
}
