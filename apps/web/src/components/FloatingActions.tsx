'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { INSTITUTION_INFO } from '@/data/mockData';

export const FloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${INSTITUTION_INFO.whatsapp}?text=${encodeURIComponent(
    "Bonjour ISSR Sainte Joséphine Bakhita, je souhaite obtenir des renseignements sur vos formations et admissions."
  )}`;

  return (
    <aside aria-label="Actions rapides" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* WhatsApp Quick Chat Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        title="Contacter le secrétariat sur WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
        </span>
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          WhatsApp Secrétariat
        </span>
      </a>

      {/* Back to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`pointer-events-auto p-3 rounded-full bg-issr-primary/90 hover:bg-issr-primary text-issr-gold-light border border-issr-gold/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 ${
          showBackToTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
        aria-label="Retour en haut de page"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </aside>
  );
};
