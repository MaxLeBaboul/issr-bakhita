import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { FloatingActions } from "@/components/FloatingActions";

export const metadata: Metadata = {
  title: "ISSR Sainte Joséphine Bakhita — Se former pour mieux servir !",
  description: "Institut Supérieur des Sciences Religieuses Sainte Joséphine Bakhita, rattaché à l'UCAC-ICY et érigé canoniquement par Rome en 2022. Formations théologiques, pastorales et managériales à Yaoundé et en ligne.",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
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
