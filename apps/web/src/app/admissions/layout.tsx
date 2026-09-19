import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Candidatures & Inscriptions en Ligne 2026-2027',
  description: 'Portail officiel d\'admission en ligne de l\'ISSR Sainte Joséphine Bakhita. Déposez vos pièces justificatives numériques et suivez l\'instruction de votre dossier avec votre code officiel.',
  keywords: [
    'Inscription ISSR Bakhita',
    'Candidature en ligne sciences religieuses',
    'Admission théologie Yaoundé',
    'Dossier de candidature UCAC',
    'Bourse et scolarité ISSR',
    'Inscription prêtres religieux laïcs'
  ],
  alternates: {
    canonical: '/admissions',
  },
  openGraph: {
    title: 'Candidature en Ligne 2026-2027 | ISSR Sainte Bakhita',
    description: 'Postulez aux 9 filières canoniques et professionnelles de l\'ISSR. Dépôt de dossier 100% en ligne et quittance immédiate.',
    url: '/admissions',
  },
};

export default function AdmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
