'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Building2, 
  Smartphone, 
  Check, 
  Copy, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  GraduationCap, 
  Laptop, 
  BookOpen, 
  Building, 
  MessageCircle, 
  Mail, 
  Phone, 
  HelpCircle,
  Sparkles,
  ExternalLink,
  CreditCard,
  Send
} from 'lucide-react';
import { INSTITUTION_INFO, DONATION_INFO } from '@/data/mockData';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function NousSoutenirPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'momo' | 'bank'>('all');
  
  // Notification form state
  const [donorName, setDonorName] = useState('');
  const [donorContact, setDonorContact] = useState('');
  const [donorAmount, setDonorAmount] = useState('');
  const [paymentChannel, setPaymentChannel] = useState('Orange Money');
  const [donorMessage, setDonorMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorContact) return;

    const message = `Bonjour Économat ISSR Bakhita,\n\nJe vous informe d'un don de soutien en faveur de l'Institut.\n\n• Donateur : ${donorName}\n• Contact : ${donorContact}\n• Montant : ${donorAmount || 'Non spécifié'} FCFA\n• Canal utilisé : ${paymentChannel}\n• Message : ${donorMessage || 'En union de prière et d\'action pour la formation des chrétiens.'}\n\nMerci de m'établir l'attestation de bienfaiteur.`;
    
    // Open WhatsApp pre-filled
    const whatsappUrl = `https://wa.me/237655165757?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setFormSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pb-20">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-[#07192A] via-[#0B2545] to-[#13416F] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 backdrop-blur-md shadow-inner">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Mécénat, Dons &amp; Solidarité Écclésiale</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Soutenir la Mission de l&apos;ISSR Sainte Bakhita
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed font-light">
            En soutenant l&apos;Institut Supérieur des Sciences Religieuses, vous participez directement 
            à la formation intégrale des religieux(ses), prêtres et laïcs acteurs du développement humain 
            et pastoral en Afrique Centrale.
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-3 text-xs text-amber-200/90 font-medium">
            <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Érigé par Rome (2022) • Rattaché à l&apos;UCAC
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
              <FileText className="w-4 h-4 text-emerald-400" />
              Reçu officiel &amp; Attestation délivrés par l&apos;Économat
            </span>
          </div>

          {/* Quick jump to payment channels */}
          <div className="pt-6 flex flex-wrap justify-center gap-3">
            <a 
              href="#mobile-money"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-amber-500/20 transition hover:scale-105"
            >
              <Smartphone className="w-4 h-4" />
              Mobile Money (OM &amp; MoMo)
            </a>
            <a 
              href="#compte-bancaire"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition hover:scale-105"
            >
              <Building2 className="w-4 h-4 text-amber-300" />
              Virement Bancaire (RIB / IBAN)
            </a>
          </div>
        </div>
      </section>

      {/* 2. Payment Channels Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12">
        {/* Navigation filter pills */}
        <div className="bg-white rounded-2xl p-2 shadow-lg border border-slate-200/80 flex items-center justify-center gap-2 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition ${
              activeTab === 'all'
                ? 'bg-issr-primary text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Tous les canaux
          </button>
          <button
            onClick={() => setActiveTab('momo')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'momo'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile Money
          </button>
          <button
            onClick={() => setActiveTab('bank')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'bank'
                ? 'bg-blue-900 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Virement Bancaire
          </button>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Orange Money Cameroun */}
          {(activeTab === 'all' || activeTab === 'momo') && (
            <ScrollReveal direction="up">
              <div 
                id="mobile-money"
                className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-500/30 hover:border-orange-500 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-orange-500/30">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-600">Cameroun &amp; CEMAC</span>
                        <h3 className="font-serif font-extrabold text-xl text-slate-900">Orange Money (OM)</h3>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200">
                      Instantané
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                    Transfert direct pour le Cameroun et la zone CEMAC. Prise en compte immédiate par l&apos;Économat.
                  </p>

                  <div className="space-y-3.5 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Numéro de Dépôt / Transfert :</span>
                      <button
                        onClick={() => copyToClipboard(DONATION_INFO.mobileMoney.orangeMoney.number, 'om-num')}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-100/70 hover:bg-orange-100 px-2.5 py-1 rounded-lg transition"
                      >
                        {copiedKey === 'om-num' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copié !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="font-mono font-bold text-lg sm:text-xl text-slate-900 tracking-wider">
                      {DONATION_INFO.mobileMoney.orangeMoney.displayNumber}
                    </div>

                    <div className="pt-2 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                      <span className="text-slate-500">Titulaire officiel :</span>
                      <span className="font-bold text-slate-800">{DONATION_INFO.mobileMoney.orangeMoney.accountName}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                      <span className="text-slate-500">Syntaxe directe USSD :</span>
                      <code className="bg-slate-200/80 px-2 py-0.5 rounded text-[11px] font-mono font-semibold text-slate-800">
                        {DONATION_INFO.mobileMoney.orangeMoney.shortCode}
                      </code>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 bg-orange-50/60 rounded-xl p-3 border border-orange-100 mb-6">
                    <p className="font-medium text-orange-950">
                      💡 <strong>Procédure rapide :</strong> {DONATION_INFO.mobileMoney.orangeMoney.instructions}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${DONATION_INFO.mobileMoney.orangeMoney.number}`}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-orange-500/25 transition"
                >
                  <Phone className="w-4 h-4" />
                  Composer le numéro OM
                </a>
              </div>
            </ScrollReveal>
          )}

          {/* Card 2: MTN Mobile Money Cameroun */}
          {(activeTab === 'all' || activeTab === 'momo') && (
            <ScrollReveal direction="up" delay={100}>
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-yellow-500/40 hover:border-yellow-500 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-500 flex items-center justify-center text-slate-950 shadow-md shadow-yellow-500/30">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700">Cameroun &amp; CEMAC</span>
                        <h3 className="font-serif font-extrabold text-xl text-slate-900">MTN Mobile Money (MoMo)</h3>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-50 text-amber-800 border border-yellow-300">
                      Instantané
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                    Paiement direct et sécurisé via le réseau MTN MoMo pour les donateurs au Cameroun et dans la sous-région.
                  </p>

                  <div className="space-y-3.5 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Numéro de Dépôt / Transfert :</span>
                      <button
                        onClick={() => copyToClipboard(DONATION_INFO.mobileMoney.mtnMoMo.number, 'momo-num')}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 bg-yellow-200/70 hover:bg-yellow-200 px-2.5 py-1 rounded-lg transition"
                      >
                        {copiedKey === 'momo-num' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copié !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="font-mono font-bold text-lg sm:text-xl text-slate-900 tracking-wider">
                      {DONATION_INFO.mobileMoney.mtnMoMo.displayNumber}
                    </div>

                    <div className="pt-2 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                      <span className="text-slate-500">Titulaire officiel :</span>
                      <span className="font-bold text-slate-800">{DONATION_INFO.mobileMoney.mtnMoMo.accountName}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                      <span className="text-slate-500">Syntaxe directe USSD :</span>
                      <code className="bg-slate-200/80 px-2 py-0.5 rounded text-[11px] font-mono font-semibold text-slate-800">
                        {DONATION_INFO.mobileMoney.mtnMoMo.shortCode}
                      </code>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 bg-yellow-50/60 rounded-xl p-3 border border-yellow-200 mb-6">
                    <p className="font-medium text-amber-950">
                      💡 <strong>Procédure rapide :</strong> {DONATION_INFO.mobileMoney.mtnMoMo.instructions}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${DONATION_INFO.mobileMoney.mtnMoMo.number}`}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:brightness-105 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-yellow-500/25 transition"
                >
                  <Phone className="w-4 h-4" />
                  Composer le numéro MoMo
                </a>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Card 3: Compte Bancaire Officiel (RIB / IBAN / SWIFT) */}
        {(activeTab === 'all' || activeTab === 'bank') && (
          <ScrollReveal direction="up">
            <div 
              id="compte-bancaire"
              className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-blue-900/30 hover:border-blue-900 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-900/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center text-amber-300 shadow-lg shadow-blue-950/20">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-900">
                      Virement National &amp; International
                    </span>
                    <h3 className="font-serif font-extrabold text-2xl text-slate-900">
                      Compte Bancaire Officiel de l&apos;Institut
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-blue-700" />
                    Banque Partenaire Cameroun
                  </span>
                </div>
              </div>

              {/* Grid of Bank Identifiers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Titulaire */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 md:col-span-2 lg:col-span-3">
                  <span className="text-xs text-slate-500 block mb-1">Titulaire du compte :</span>
                  <div className="font-serif font-bold text-base sm:text-lg text-slate-900">
                    {DONATION_INFO.bank.accountName}
                  </div>
                  <span className="text-xs text-amber-800 font-semibold mt-1 block">
                    Abréviation usuelle : {DONATION_INFO.bank.shortName}
                  </span>
                </div>

                {/* Banque & Domiciliation */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-500 block mb-1">Établissement bancaire :</span>
                  <div className="font-bold text-sm text-slate-900">{DONATION_INFO.bank.bankName}</div>
                  <span className="text-xs text-slate-500 block mt-1">{DONATION_INFO.bank.domiciliation}</span>
                </div>

                {/* SWIFT / BIC */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Code SWIFT / BIC :</span>
                    <button
                      onClick={() => copyToClipboard(DONATION_INFO.bank.swiftBic, 'swift')}
                      className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                      {copiedKey === 'swift' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'swift' ? 'Copié' : 'Copier'}</span>
                    </button>
                  </div>
                  <div className="font-mono font-bold text-base text-slate-900">{DONATION_INFO.bank.swiftBic}</div>
                  <span className="text-[11px] text-slate-500 block mt-1">Requis pour les virements internationaux</span>
                </div>

                {/* IBAN */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">IBAN International :</span>
                    <button
                      onClick={() => copyToClipboard(DONATION_INFO.bank.iban, 'iban')}
                      className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                      {copiedKey === 'iban' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'iban' ? 'Copié' : 'Copier'}</span>
                    </button>
                  </div>
                  <div className="font-mono font-bold text-xs sm:text-sm text-slate-900 break-all">{DONATION_INFO.bank.iban}</div>
                  <span className="text-[11px] text-slate-500 block mt-1">Norme bancaire internationale CEMAC</span>
                </div>
              </div>

              {/* Full RIB Display Box */}
              <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 rounded-2xl shadow-inner border border-blue-800/50 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-sm tracking-wide text-amber-200">
                      Relevé d&apos;Identité Bancaire (RIB Complet)
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(DONATION_INFO.bank.fullRib, 'rib')}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow"
                  >
                    {copiedKey === 'rib' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-950" />
                        <span>RIB Copié dans le presse-papier !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copier le RIB complet</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Code Banque</span>
                    <span className="font-mono font-bold text-sm sm:text-base text-amber-300">{DONATION_INFO.bank.bankCode}</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Code Guichet</span>
                    <span className="font-mono font-bold text-sm sm:text-base text-amber-300">{DONATION_INFO.bank.branchCode}</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">N° de Compte</span>
                    <span className="font-mono font-bold text-sm sm:text-base text-amber-300">{DONATION_INFO.bank.accountNumber}</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Clé RIB</span>
                    <span className="font-mono font-bold text-sm sm:text-base text-amber-300">{DONATION_INFO.bank.ribKey}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-4 text-center sm:text-left italic">
                  👉 {DONATION_INFO.bank.referenceNote}
                </p>
              </div>

              {/* Notice & Instructions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                  <p>
                    <strong>Besoin d&apos;un document RIB officiel avec cachet de l&apos;Économat ?</strong> Nous vous le transmettons sous 24h par email ou WhatsApp.
                  </p>
                </div>
                <a
                  href={`mailto:${INSTITUTION_INFO.email}?subject=Demande%20de%20RIB%20officiel%20ISSR%20Bakhita`}
                  className="shrink-0 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition shadow-xs"
                >
                  Demander le RIB en PDF
                </a>
              </div>
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* 3. Impact & Projets Soutenus */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Transparence &amp; Destination des Fonds
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              À quoi servent vos dons ?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Chaque contribution est administrée avec rigueur sous la supervision directe du Conseil de Direction et de l&apos;Économe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 mb-2">Bourses d&apos;Études</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prise en charge des scolarités pour les religieuses et catéchistes des paroisses pauvres d&apos;Afrique centrale.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800 mb-4">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 mb-2">Campus Numérique</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fibre optique haut débit et équipement de captation vidéo pour rendre les cours accessibles aux étudiants en province et à l&apos;étranger.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 mb-2">Bibliothèque &amp; Recherche</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Acquisition des publications pontificales, ouvrages d&apos;exégèse biblique et dictionnaires théologiques de référence.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 mb-4">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 mb-2">Infrastructures Mvolyé</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rénovation continue des salles de cours et maintien d&apos;un environnement d&apos;étude propice à la prière et à la réflexion.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. Formulaire interactif : Prévenir l'Économat de mon Don */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <ScrollReveal direction="up">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  Déclarer ou Confirmer un Don à l&apos;Économat
                </h3>
                <p className="text-xs text-slate-500">
                  Remplissez ce formulaire rapide pour recevoir votre reçu et attestation officielle de bienfaiteur.
                </p>
              </div>
            </div>

            {formSubmitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-emerald-900 text-base">Merci pour votre générosité !</h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Votre message a été préparé pour transmission à l&apos;Économat de l&apos;ISSR Sainte Bakhita. Nous vous remercions pour votre précieux soutien.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition"
                >
                  Envoyer une autre déclaration
                </button>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Votre Nom &amp; Prénom <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: M. Jean-Paul NDONGO / Congrégation..."
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Numéro Téléphone / WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: +237 600 000 000"
                      value={donorContact}
                      onChange={(e) => setDonorContact(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Montant du don (FCFA ou Devise)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 50 000 FCFA"
                      value={donorAmount}
                      onChange={(e) => setDonorAmount(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Canal de paiement utilisé
                    </label>
                    <select
                      value={paymentChannel}
                      onChange={(e) => setPaymentChannel(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                    >
                      <option value="Orange Money">Orange Money (OM Cameroun)</option>
                      <option value="MTN Mobile Money">MTN Mobile Money (MoMo Cameroun)</option>
                      <option value="Virement Bancaire">Virement Bancaire (Afriland / RIB)</option>
                      <option value="Espèces / Chèque Économat">Espèces / Chèque à l&apos;Économat (Mvolyé)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Message ou intention particulière (Optionnel)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ex: En mémoire de... / Affectation souhaitée : bourses d'études..."
                    value={donorMessage}
                    onChange={(e) => setDonorMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  Transmettre la déclaration à l&apos;Économat
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* 5. Contact Direct Économat & Assistance */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <div className="bg-slate-100 p-8 rounded-3xl border border-slate-200 space-y-4">
          <h3 className="font-serif font-bold text-lg text-slate-900">
            Une question relative à votre don ou mécénat ?
          </h3>
          <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
            L&apos;équipe de l&apos;Économat de l&apos;ISSR Sainte Bakhita est à votre écoute pour vous accompagner dans vos démarches de legs, donations institutionnelles ou mécénat d&apos;entreprise.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${INSTITUTION_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition"
            >
              <MessageCircle className="w-4 h-4" />
              Échanger avec l&apos;Économe sur WhatsApp
            </a>
            <a
              href={`mailto:${INSTITUTION_INFO.email}?subject=Renseignement%20Don%20et%20M%C3%A9c%C3%A9nat%20ISSR`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-sm transition"
            >
              <Mail className="w-4 h-4 text-amber-600" />
              Écrire à {INSTITUTION_INFO.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
