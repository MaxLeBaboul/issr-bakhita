import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { FloatingActions } from "@/components/FloatingActions";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.issr-bakhita.com";

export const viewport: Viewport = {
  themeColor: "#0F2A47",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ISSR Sainte Joséphine Bakhita — Se former pour mieux servir !",
    template: "%s | ISSR Sainte Joséphine Bakhita",
  },
  description: "Institut Supérieur des Sciences Religieuses Sainte Joséphine Bakhita, rattaché à l'UCAC-ICY et érigé canoniquement par le Saint-Siège (Rome, 2022). Formations en sciences religieuses, théologie, pastorale et gouvernance à Yaoundé et 100% en direct en ligne.",
  keywords: [
    "ISSR Sainte Bakhita",
    "Sciences Religieuses",
    "Théologie Yaoundé",
    "UCAC",
    "ICY",
    "Baccalauréat canonique",
    "Master sciences religieuses",
    "Institut Supérieur des Sciences Religieuses",
    "Ingénierie pastorale",
    "Pédagogie religieuse",
    "Formation théologique chrétiens",
    "Formation prêtres religieuses laïcs",
    "Campus de Mvolyé",
    "Enseignement supérieur catholique Cameroun",
    "Saint-Siège Rome érection canonique"
  ],
  authors: [{ name: "ISSR Sainte Joséphine Bakhita", url: siteUrl }],
  creator: "ISSR Sainte Joséphine Bakhita — Direction des Études",
  publisher: "Université Catholique d'Afrique Centrale (UCAC) - Faculté de Théologie",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ISSR Sainte Joséphine Bakhita — Se former pour mieux servir !",
    description: "Institut Supérieur des Sciences Religieuses érigé canoniquement par le Saint-Siège (Rome, 2022) et rattaché à l'UCAC-ICY. 9 filières d'excellence pour laïcs, religieux(ses) et prêtres.",
    url: siteUrl,
    siteName: "ISSR Sainte Joséphine Bakhita",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/hero-1608.jpg",
        width: 1200,
        height: 630,
        alt: "Campus Universitaire de Mvolyé — ISSR Sainte Joséphine Bakhita",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ISSR Sainte Joséphine Bakhita — Se former pour mieux servir !",
    description: "Formations universitaires en théologie et sciences religieuses reconnues par Rome et l'UCAC. Présentiel et e-learning.",
    images: ["/images/hero-1608.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo-seal.png", type: "image/png", sizes: "128x128" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/logo-seal.png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "name": "Institut Supérieur des Sciences Religieuses Sainte Joséphine Bakhita",
  "alternateName": ["ISSR Sainte Bakhita", "ISSR Yaoundé", "ISSR-UCAC"],
  "url": siteUrl,
  "logo": `${siteUrl}/logo-seal.png`,
  "image": `${siteUrl}/images/hero-1608.jpg`,
  "description": "Institut Supérieur des Sciences Religieuses rattaché à l'UCAC-ICY et érigé canoniquement par le Saint-Siège en 2022. 9 filières canoniques et professionnelles en sciences religieuses.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Campus de Mvolyé, derrière le Collège Saint Benoît",
    "addressLocality": "Yaoundé",
    "addressRegion": "Région du Centre",
    "addressCountry": "CM"
  },
  "telephone": "+237 655 165 757",
  "email": "issrbakhita2026@gmail.com",
  "slogan": "Se former pour mieux servir !",
  "sameAs": [
    "https://ucac-icy.net"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-issr-gold selection:text-white">
        <ScrollProgress />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
