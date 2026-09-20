'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Phone, Mail, GraduationCap, ShieldCheck, UserCheck, LogOut, LayoutDashboard, Globe, ExternalLink } from 'lucide-react';
import { INSTITUTION_INFO } from '../data/mockData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const syncAuth = () => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('issr_logged_role');
      const userStr = localStorage.getItem('issr_logged_user');
      const isAdminRoute = pathname?.startsWith('/admin');

      if (role || isAdminRoute) {
        setIsLoggedIn(true);
        if (userStr) {
          try {
            const parsed = JSON.parse(userStr);
            setUserName(parsed.name || parsed.roleTitle || 'Session Active');
          } catch {
            setUserName('Session Active');
          }
        } else {
          setUserName('Session Active');
        }
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    }
  };

  useEffect(() => {
    syncAuth();

    const handleStorageChange = () => syncAuth();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('issr_logged_role');
      localStorage.removeItem('issr_logged_user');
      setIsLoggedIn(false);
      setUserName('');
      window.dispatchEvent(new Event('storage'));
    }
    router.push('/login');
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Liturgical tri-color accent line (Vatican Sapphire, Sacred Gold, Cardinal Red) */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-amber-500 to-rose-600"></div>

      {/* Top bar with institutional affiliation and contacts */}
      <div className="bg-issr-primary text-white text-xs py-2 px-4 border-b border-issr-primary-light/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 font-bold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Érigé par Rome (2022) • Rattaché à l&apos;UCAC-ICY
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline italic text-amber-100 font-serif">
              « {INSTITUTION_INFO.motto} »
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-200">
            <a href={`tel:${INSTITUTION_INFO.phone}`} className="flex items-center gap-1.5 hover:text-amber-300 transition">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium">{INSTITUTION_INFO.phone}</span>
            </a>
            <a href={`mailto:${INSTITUTION_INFO.email}`} className="hidden sm:flex items-center gap-1.5 hover:text-amber-300 transition">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium">{INSTITUTION_INFO.email}</span>
            </a>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-3 pl-2.5 border-l border-white/20">
                {pathname?.startsWith('/admin') ? (
                  <Link 
                    href="/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-semibold text-amber-200/90 hover:text-white transition"
                    title="Visiter le site public dans un nouvel onglet"
                  >
                    <Globe className="w-3.5 h-3.5 text-amber-400" />
                    <span>Site Public</span>
                    <ExternalLink className="w-3 h-3 text-amber-300/70" />
                  </Link>
                ) : (
                  <Link 
                    href="/admin" 
                    className="flex items-center gap-1.5 font-semibold text-amber-200/90 hover:text-white transition"
                    title="Accéder au tableau de bord d'administration"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tableau de bord</span>
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-rose-300 hover:text-rose-100 flex items-center gap-1.5 font-bold hover:underline cursor-pointer pl-2 border-l border-white/20"
                  title="Se déconnecter du portail"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Se déconnecter</span>
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-amber-200/90 hover:text-white flex items-center gap-1.5 pl-2.5 border-l border-white/20 font-medium hover:underline">
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Se connecter</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <img 
            src="/logo.jpg" 
            alt="ISSR Sainte Joséphine Bakhita" 
            className="h-11 sm:h-12 w-auto object-contain rounded-sm shadow-xs transition-transform duration-300 group-hover:scale-105"
          />
          <div className="h-8 w-px bg-amber-200/80 hidden md:block"></div>
          <div className="hidden md:flex flex-col justify-center">
            <span className="font-serif font-bold text-sm lg:text-base text-issr-primary leading-tight tracking-tight group-hover:text-blue-900 transition-colors">
              Sainte Joséphine Bakhita
            </span>
            <span className="text-[10px] font-bold text-amber-800/90 uppercase tracking-wider">
              Institut Supérieur des Sciences Religieuses
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-7">
          <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-blue-900 transition relative group py-1">
            <span>Accueil</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>
          <Link href="/a-propos" className="text-sm font-semibold text-slate-700 hover:text-blue-900 transition relative group py-1">
            <span>L&apos;Institut &amp; Direction</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>
          <Link href="/formations" className="text-sm font-semibold text-slate-700 hover:text-blue-900 transition relative group py-1">
            <span>Formations &amp; Diplômes</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>
          <Link href="/actualites" className="text-sm font-semibold text-slate-700 hover:text-blue-900 transition relative group py-1">
            <span>Actualités</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>
          <Link href="/contact" className="text-sm font-semibold text-slate-700 hover:text-blue-900 transition relative group py-1">
            <span>Contact</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>
        </div>

        {/* CTA Button with luminous amber glow */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/admissions"
            className="btn-shimmer inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-white shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/35 hover:scale-105 active:scale-95 transition-all duration-200 border border-amber-400/40"
          >
            Postuler / S&apos;inscrire
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            href="/admissions"
            className="btn-shimmer px-3.5 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-sm"
          >
            Postuler
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-issr-primary" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fadeIn">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-800 hover:text-issr-primary border-b border-slate-50"
          >
            Accueil
          </Link>
          <Link
            href="/a-propos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-800 hover:text-issr-primary border-b border-slate-50"
          >
            L&apos;Institut & Direction
          </Link>
          <Link
            href="/formations"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-800 hover:text-issr-primary border-b border-slate-50"
          >
            Formations & Diplômes
          </Link>
          <Link
            href="/actualites"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-800 hover:text-issr-primary border-b border-slate-50"
          >
            Actualités
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-800 hover:text-issr-primary border-b border-slate-50"
          >
            Contact
          </Link>
          {isLoggedIn ? (
            <div className="space-y-1 border-b border-slate-100 pb-2">
              {pathname?.startsWith('/admin') ? (
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-semibold text-slate-800 hover:text-issr-primary flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-amber-600" />
                    <span>Site Public</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </Link>
              ) : (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-semibold text-issr-primary hover:text-blue-950 flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-amber-500" />
                  <span>Tableau de bord {userName ? `(${userName})` : ''}</span>
                </Link>
              )}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left py-2 text-base font-bold text-rose-600 hover:text-rose-800 flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-600" />
                <span>Se déconnecter</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-amber-700 hover:text-amber-800 border-b border-slate-50 flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-amber-600" />
              <span>Se connecter (Portail)</span>
            </Link>
          )}
          <div className="pt-2">
            <Link
              href="/admissions"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 px-4 rounded-lg bg-issr-gold text-white font-semibold shadow hover:bg-issr-gold-dark transition"
            >
              Candidater en ligne (Admissions 2026-2027)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
