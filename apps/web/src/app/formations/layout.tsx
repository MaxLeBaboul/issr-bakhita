import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Les 6 Filières Officielles & Diplômes Canoniques',
  description: 'Catalogue complet des 6 filières de formation de l\'ISSR Sainte Joséphine Bakhita : Baccalauréat canonique, Master en sciences religieuses (Foi, Culture, Œcuménique & Dialogue Interreligieux), DU en Ingénierie Pastorale et Pédagogie Religieuse, Certificats 100% en ligne.',
  keywords: [
    'Filières ISSR Bakhita',
    'Baccalauréat canonique Yaoundé',
    'Master théologie pastorale',
    'Master œcuménique',
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
    title: 'Catalogue des 6 Formations & Diplômes | ISSR Sainte Bakhita',
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
