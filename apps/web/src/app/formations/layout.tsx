import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Les 9 Filières Officielles & Diplômes Canoniques',
  description: 'Catalogue complet des 9 filières de formation de l\'ISSR Sainte Joséphine Bakhita : Baccalauréat canonique, Masters en sciences religieuses, Licences et DU en Ingénierie Pastorale et Pédagogie Religieuse, Certificats 100% en ligne.',
  keywords: [
    'Filières ISSR Bakhita',
    'Baccalauréat canonique Yaoundé',
    'Master théologie pastorale',
    'Ingénierie pastorale',
    'Pédagogie religieuse',
    'DU pastorale',
    'Leadership ecclésial',
    'Certificats en ligne théologie'
  ],
  alternates: {
    canonical: '/formations',
  },
  openGraph: {
    title: 'Catalogue des 9 Formations & Diplômes | ISSR Sainte Bakhita',
    description: 'Diplômes canoniques du Saint-Siège et diplômes universitaires d\'État. Cursus en présentiel à Yaoundé et en direct en ligne.',
    url: '/formations',
  },
};

export default function FormationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
