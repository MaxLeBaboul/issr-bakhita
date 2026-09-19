import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Actualités, Événements & Publications Académiques',
  description: 'Suivez la vie universitaire, les conférences théologiques, les sessions pastorales et les annonces officielles de l\'ISSR Sainte Joséphine Bakhita.',
  keywords: [
    'Actualités ISSR Bakhita',
    'Conférences théologie Yaoundé',
    'Événements pastoraux Cameroun',
    'Colloques sciences religieuses',
    'Publications académiques UCAC'
  ],
  alternates: {
    canonical: '/actualites',
  },
  openGraph: {
    title: 'Actualités & Vie Académique | ISSR Sainte Bakhita',
    description: 'Toutes les actualités académiques, spirituelles et pastorales de l\'Institut Supérieur des Sciences Religieuses Sainte Joséphine Bakhita.',
    url: '/actualites',
  },
};

export default function ActualitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
