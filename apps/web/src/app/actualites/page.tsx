'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  User, 
  Search, 
  Tag, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Share2, 
  X,
  ChevronRight,
  MessageCircle,
  Newspaper,
  Copy,
  CheckCheck
} from 'lucide-react';
import { ARTICLES } from '../../data/mockData';
import { Article } from '../../types';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function ActualitesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    try {
      const storedArticles = JSON.parse(localStorage.getItem('issr_custom_articles') || '[]');
      if (Array.isArray(storedArticles) && storedArticles.length > 0) {
        setArticles([...storedArticles, ...ARTICLES]);
      } else {
        setArticles(ARTICLES);
      }
    } catch {
      setArticles(ARTICLES);
    }
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveArticle(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = ['Toutes', 'Admissions', 'Événements', 'Formations', 'Pastorale', 'Vie de l’Institut'];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'Toutes' || article.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch = 
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query) ||
      article.author.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find(a => a.featured) || articles[0];

  const handleShareWhatsApp = (article: Article) => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `${article.title} — ISSR Sainte Joséphine Bakhita`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    window.open(whatsappLink, '_blank');
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      
      {/* Header Banner with Ambient Lighting */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="relative bg-gradient-to-br from-[#07192A] via-[#0B2545] to-[#13416F] text-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden border-t-4 border-amber-500">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-400/15 blur-3xl pointer-events-none animate-float-slow" />

          <div className="max-w-3xl relative z-10 animate-fade-in-down">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold mb-4 backdrop-blur-sm border border-amber-400/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Publications, Colloques &amp; Vie Académique
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Actualités &amp; Événements
            </h1>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed font-light">
              Suivez le rythme de l’ISSR Sainte Joséphine Bakhita : annonces des rentrées académiques, colloques théologiques, parutions de recherche et chroniques universitaires.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search and Filters Bar */}
        <div className="sticky top-[69px] z-30 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-sm border border-amber-100 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between transition-all">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white shadow-md scale-[1.02] ring-2 ring-blue-900/20'
                    : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un article, auteur..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-[#FCFAF6] focus:bg-white"
            />
          </div>
        </div>

        {/* Featured Spotlight */}
        {selectedCategory === 'Toutes' && searchQuery === '' && featuredArticle && (
          <ScrollReveal direction="up">
            <div className="interactive-card mb-12 bg-white rounded-3xl overflow-hidden shadow-sm border border-amber-100 grid grid-cols-1 lg:grid-cols-12 group hover:shadow-2xl hover:border-amber-400 transition-all duration-300">
              <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[340px] bg-slate-900 overflow-hidden">
                <img
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-extrabold px-3.5 py-1 rounded-full text-xs uppercase tracking-wider shadow-md border border-amber-300">
                  À la une
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="bg-blue-100 text-blue-900 font-bold px-3 py-1 rounded-lg border border-blue-200">
                      {featuredArticle.category}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {featuredArticle.publishedAt}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 group-hover:text-blue-900 transition">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <User className="w-4 h-4 text-amber-600" />
                    <span>{featuredArticle.author}</span>
                  </div>

                  <button
                    onClick={() => setActiveArticle(featuredArticle)}
                    className="btn-shimmer inline-flex items-center gap-2 text-xs font-bold text-blue-900 hover:text-amber-700 transition uppercase tracking-wider group-hover:translate-x-1 duration-200"
                  >
                    <span>Lire l’article</span>
                    <ArrowRight className="w-4 h-4 text-amber-600" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Articles Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, idx) => (
            <ScrollReveal key={article.id} delay={idx * 70} direction="up">
              <article
                className="interactive-card bg-white rounded-3xl overflow-hidden shadow-xs border border-amber-100 flex flex-col hover:shadow-xl hover:border-amber-400 transition-all duration-300 group h-full"
              >
                {/* Card Image */}
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-blue-900 text-white font-bold px-3 py-1 rounded-full text-xs shadow-md border border-blue-700">
                    {article.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-issr-gold" />
                        {article.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-issr-gold" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-issr-primary transition mb-2.5 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <span className="text-xs text-slate-500 truncate max-w-[150px]">
                      {article.author}
                    </span>

                    <button
                      onClick={() => setActiveArticle(article)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-issr-primary hover:text-issr-gold transition uppercase tracking-wider group-hover:translate-x-1 duration-200"
                    >
                      <span>Détails</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-slate-700 mb-1">Aucun article trouvé</h3>
            <p className="text-slate-500 text-sm mb-4">
              Essayez un autre mot-clé ou réinitialisez la catégorie sélectionnée.
            </p>
            <button
              onClick={() => { setSelectedCategory('Toutes'); setSearchQuery(''); }}
              className="px-5 py-2 rounded-xl bg-issr-primary text-white text-xs font-semibold"
            >
              Réinitialiser
            </button>
          </div>
        )}

        {/* Bottom Banner: Back-office / CMS Access */}
        <ScrollReveal direction="up">
          <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-issr-gold/15 blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <span className="text-issr-gold text-xs font-bold uppercase tracking-wider block mb-1">
                Espace Rédactionnel Collaboratif
              </span>
              <h3 className="font-serif text-2xl font-bold mb-2">
                Vous êtes enseignant ou membre de l’Institut ?
              </h3>
              <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
                Publiez des comptes-rendus de colloques, des annonces pastorales ou des résumés de cours directement via le back-office collaboratif de l’ISSR.
              </p>
            </div>

            <Link
              href="/admin"
              className="btn-shimmer relative z-10 whitespace-nowrap inline-flex items-center gap-2 bg-issr-gold hover:bg-issr-gold-light text-slate-950 font-bold px-6 py-3.5 rounded-xl transition shadow-md text-sm hover:scale-105 active:scale-95"
            >
              <span>Accéder au Back-office</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

      </div>

      {/* Full Article Reader Modal with Animated Scale-Up */}
      {activeArticle && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setActiveArticle(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-8 animate-scale-up border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header Bar */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="bg-issr-primary/10 text-issr-primary text-xs font-bold px-2.5 py-1 rounded-md">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-400">
                  {activeArticle.readTime} de lecture
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="p-2 hover:bg-slate-100 text-slate-600 rounded-full transition"
                  title="Copier le lien"
                >
                  {copiedLink ? <CheckCheck className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleShareWhatsApp(activeArticle)}
                  className="p-2 hover:bg-slate-100 text-slate-600 rounded-full transition"
                  title="Partager sur WhatsApp"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 hover:bg-slate-100 text-slate-600 rounded-full transition hover:rotate-90 duration-200"
                  title="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-10">
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-inner">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-issr-gold" />
                  <span className="font-bold text-slate-800">{activeArticle.author}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-issr-gold" />
                  {activeArticle.publishedAt}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 leading-snug">
                {activeArticle.title}
              </h2>

              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line border-t border-slate-100 pt-6">
                {activeArticle.content}
              </div>

              {/* Call to action inside modal */}
              <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-base">Intéressé(e) par nos formations académiques ?</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Consultez notre catalogue complet des filières canoniques et universitaires.</p>
                </div>
                <Link
                  href="/formations"
                  className="btn-shimmer bg-issr-primary hover:bg-issr-primary-light text-white text-xs font-bold px-5 py-3 rounded-xl transition whitespace-nowrap shadow hover:scale-105"
                >
                  Voir les Formations
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
