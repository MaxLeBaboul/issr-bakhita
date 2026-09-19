'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  Navigation, 
  Building2, 
  User, 
  GraduationCap,
  Sparkles,
  ChevronRight,
  Loader2,
  Check
} from 'lucide-react';
import Link from 'next/link';
import { INSTITUTION_INFO } from '../../data/mockData';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Renseignements sur une formation',
    formationInterest: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeMapTab, setActiveMapTab] = useState<'map' | 'directions'>('map');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newMessage = {
      id: `msg-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
      read: false
    };

    try {
      const existing = JSON.parse(localStorage.getItem('issr_contact_messages') || '[]');
      existing.unshift(newMessage);
      localStorage.setItem('issr_contact_messages', JSON.stringify(existing));
    } catch {
      // Fallback
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const whatsappUrl = `https://wa.me/237655165757?text=${encodeURIComponent(
    "Bonjour ISSR Sainte Joséphine Bakhita, je souhaiterais obtenir des informations complémentaires."
  )}`;

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      
      {/* Header Banner with Atmospheric Lighting */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="relative bg-gradient-to-br from-[#07192A] via-[#0B2545] to-[#13416F] text-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden border-t-4 border-amber-500">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-400/15 blur-3xl pointer-events-none animate-float-slow" />
          
          <div className="max-w-3xl relative z-10 animate-fade-in-down">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold mb-4 backdrop-blur-sm border border-amber-400/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Secrétariat &amp; Accueil Académique
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Contact &amp; Accès au Campus
            </h1>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed mb-6 font-light">
              L’équipe de direction et le secrétariat académique de l’ISSR Sainte Joséphine Bakhita vous accueillent sur notre campus de Yaoundé – Mvolyé, ou répondent à vos demandes à distance.
            </p>
            <div className="flex flex-wrap gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-amber-400/30 text-amber-100">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Mvolyé, derrière Collège Saint Benoît, Yaoundé</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-blue-400/30 text-blue-100">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{INSTITUTION_INFO.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Coordinates & Key Contacts */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Contact Cards */}
            <ScrollReveal direction="left">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100 space-y-4">
                <h2 className="font-serif text-xl font-bold text-issr-primary mb-4 flex items-center gap-2">
                  <span>Coordonnées Directes</span>
                </h2>

                <div className="space-y-3.5 text-sm">
                  <div className="interactive-card flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition">
                    <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-500 text-[10px] uppercase tracking-wider">Téléphone / Secrétariat</div>
                      <a href={`tel:${INSTITUTION_INFO.phone}`} className="font-bold text-issr-primary hover:text-issr-gold transition text-base">
                        {INSTITUTION_INFO.phone}
                      </a>
                      <div className="text-xs text-slate-400 mt-0.5">Appel vocal direct</div>
                    </div>
                  </div>

                  <div className="interactive-card flex items-start gap-3.5 p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/80 transition">
                    <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-500 text-[10px] uppercase tracking-wider">Assistance WhatsApp</div>
                      <a 
                        href={whatsappUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-bold text-emerald-700 hover:text-emerald-800 transition text-base inline-flex items-center gap-1.5"
                      >
                        Écrire sur WhatsApp
                        <ChevronRight className="w-4 h-4" />
                      </a>
                      <div className="text-xs text-slate-400 mt-0.5">Réponse rapide de l’équipe</div>
                    </div>
                  </div>

                  <div className="interactive-card flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-amber-200 hover:bg-amber-50/40 transition">
                    <div className="p-2.5 rounded-xl bg-amber-100 text-issr-gold-dark">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-500 text-[10px] uppercase tracking-wider">Courrier Électronique</div>
                      <a href={`mailto:${INSTITUTION_INFO.email}`} className="font-bold text-issr-primary hover:text-issr-gold transition break-all text-xs sm:text-sm">
                        {INSTITUTION_INFO.email}
                      </a>
                      <div className="text-xs text-slate-400 mt-0.5">Pour tout dossier officiel</div>
                    </div>
                  </div>

                  <div className="interactive-card flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
                    <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-500 text-[10px] uppercase tracking-wider">Horaires du Secrétariat</div>
                      <div className="font-semibold text-slate-800 text-xs">Lun – Ven : 08h00 – 17h00</div>
                      <div className="font-semibold text-slate-800 text-xs">Samedi : 08h30 – 12h30</div>
                      <div className="text-xs text-slate-400 mt-0.5">Dimanche &amp; Jours fériés : Fermé</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Direction Key Personnel */}
            <ScrollReveal direction="left" delay={100}>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <h3 className="font-serif text-lg font-bold text-issr-primary mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-issr-gold" />
                  <span>Interlocuteurs Clés</span>
                </h3>

                <div className="space-y-3.5 text-xs text-slate-600">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="font-bold text-slate-900 text-sm">{INSTITUTION_INFO.director.name}</div>
                    <div className="text-issr-primary font-semibold">{INSTITUTION_INFO.director.title}</div>
                    <div className="text-slate-500 mt-1">Gouvernance générale et partenariats académiques</div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="font-bold text-slate-900 text-sm">Sr. Patience ENGANEMBEN, ejnb</div>
                    <div className="text-issr-primary font-semibold">Préfet des Études</div>
                    <div className="text-slate-500 mt-1">Orientation, validation des équivalences &amp; cursus</div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="font-bold text-slate-900 text-sm">Secrétariat Général &amp; Admissions</div>
                    <div className="text-issr-primary font-semibold">Mlles Lydie TSELLE &amp; Manuella NYAMBONE</div>
                    <div className="text-slate-500 mt-1">Dépôt des dossiers, attestations et scolarité</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Quick Admission CTA */}
            <ScrollReveal direction="left" delay={200}>
              <div className="interactive-card bg-issr-primary text-white p-6 rounded-3xl shadow-lg text-center relative overflow-hidden">
                <GraduationCap className="w-10 h-10 text-issr-gold mx-auto mb-3" />
                <h4 className="font-serif font-bold text-lg mb-2">Prêt(e) à postuler ?</h4>
                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  Le formulaire d’admission en ligne vous permet d’enregistrer votre candidature en 5 minutes avec attribution d’un numéro de suivi.
                </p>
                <Link 
                  href="/admissions" 
                  className="btn-shimmer inline-block w-full bg-issr-gold hover:bg-issr-gold-light text-slate-950 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition hover:scale-105"
                >
                  Candidature en Ligne
                </Link>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column: Interactive Contact Form & Campus Map */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Contact Form */}
            <ScrollReveal direction="right">
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
                <div className="max-w-2xl mb-6">
                  <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-issr-primary mb-2">
                    Envoyez-nous un message
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Remplissez ce formulaire pour toute question sur nos filières, les modalités d’admission ou pour solliciter un entretien d&apos;orientation.
                  </p>
                </div>

                {submitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center animate-scale-up">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner ring-4 ring-emerald-50">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-slate-800 mb-2">
                      Message transmis avec succès !
                    </h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                      Merci <strong className="text-slate-800">{formData.name}</strong>. Votre message a bien été transmis au secrétariat de l’ISSR Sainte Bakhita. Nous vous répondrons à <strong className="text-slate-800">{formData.email}</strong> ou au <strong className="text-slate-800">{formData.phone}</strong> dans les meilleurs délais.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: 'Renseignements sur une formation',
                          formationInterest: '',
                          message: ''
                        });
                      }}
                      className="btn-shimmer bg-issr-primary hover:bg-issr-primary-light text-white font-bold text-xs py-3 px-6 rounded-xl transition shadow"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Nom complet <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ex: Paul Marie ATANGANA"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-issr-primary focus:border-issr-primary outline-none transition text-sm bg-slate-50/50 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Adresse Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Ex: votrenom@domaine.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-issr-primary focus:border-issr-primary outline-none transition text-sm bg-slate-50/50 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Téléphone / WhatsApp <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+237 6XX XX XX XX"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-issr-primary focus:border-issr-primary outline-none transition text-sm bg-slate-50/50 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Objet de la demande <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-issr-primary focus:border-issr-primary outline-none transition text-sm bg-white"
                        >
                          <option value="Renseignements sur une formation">Renseignements sur une formation</option>
                          <option value="Dossier d’admission & Inscription">Dossier d’admission &amp; Inscription</option>
                          <option value="Validation des acquis & Équivalences">Validation des acquis &amp; Équivalences</option>
                          <option value="Partenariat diocésain / Congrégation">Partenariat diocésain / Congrégation</option>
                          <option value="Demande de rendez-vous avec la Direction">Demande de rendez-vous avec la Direction</option>
                          <option value="Autre demande">Autre demande</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Filière concernée (facultatif)
                      </label>
                      <input
                        type="text"
                        value={formData.formationInterest}
                        onChange={(e) => setFormData({ ...formData, formationInterest: e.target.value })}
                        placeholder="Ex: Baccalauréat Canonique, DU Ingénierie Pastorale..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-issr-primary focus:border-issr-primary outline-none transition text-sm bg-slate-50/50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Votre Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Écrivez votre message ici..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-issr-primary focus:border-issr-primary outline-none transition text-sm resize-y bg-slate-50/50 focus:bg-white"
                      ></textarea>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-slate-500">
                        Vos coordonnées restent strictement confidentielles et ne sont transmises qu&apos;au secrétariat de l&apos;Institut.
                      </p>
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 font-extrabold py-3.5 px-8 rounded-xl shadow-md shadow-amber-500/25 transition disabled:opacity-50 hover:scale-105 active:scale-95 border border-amber-300"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                            <span>Envoi en cours...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-slate-950" />
                            <span>Envoyer le Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Campus Map & Directions Container */}
            <ScrollReveal direction="right" delay={150}>
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-issr-primary flex items-center gap-2">
                      <MapPin className="w-6 h-6 text-issr-gold" />
                      <span>Plan d’Accès au Campus</span>
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1">
                      {INSTITUTION_INFO.address}
                    </p>
                  </div>

                  <a 
                    href={`https://maps.google.com/?q=${INSTITUTION_INFO.coordinates.lat},${INSTITUTION_INFO.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2.5 px-4 rounded-xl transition self-start sm:self-auto shadow-sm"
                  >
                    <Navigation className="w-4 h-4 text-issr-primary" />
                    <span>Ouvrir l’Itinéraire</span>
                  </a>
                </div>

                {/* Map Iframe */}
                <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative bg-slate-100">
                  <iframe
                    title="Plan d'accès ISSR Sainte Joséphine Bakhita Yaoundé Mvolyé"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.706346294713!2d11.5082951!3d3.84328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcf7f1e564d27%3A0x8e833ebcbe2eb0a9!2sMvoly%C3%A9%2C%20Yaound%C3%A9!5e0!3m2!1sfr!2scm!4v1710000000000!5m2!1sfr!2scm"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Repères pour les transports :</span>
                    Arrêt Mvolyé ou Collège Saint Benoît. Suivre la voie pavée contournant le collège jusqu’à l’entrée de l’Institut.
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Stationnement &amp; Accueil :</span>
                    Parking sécurisé disponible à l’intérieur de l’enceinte universitaire. Poste de garde et accueil à l&apos;entrée.
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </div>
    </div>
  );
}
