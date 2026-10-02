import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Faire un Don & Nous Soutenir | Informations Bancaires & Mobile Money',
  description: 'Soutenez la mission académique et pastorale de l\'ISSR Sainte Joséphine Bakhita. Retrouvez les coordonnées du compte bancaire officiel (RIB, IBAN, SWIFT) et les comptes Mobile Money Cameroun (Orange Money et MTN MoMo).',
  keywords: [
    'Nous Soutenir ISSR Bakhita',
    'Faire un don ISSR Bakhita',
    'Compte bancaire ISSR Bakhita',
    'RIB IBAN don théologie Cameroun',
    'Orange Money don Yaoundé',
    'MTN Mobile Money MoMo Cameroun',
    'Bourses d\'études sciences religieuses',
    'Mécénat église Yaoundé'
  ],
  alternates: {
    canonical: '/nous-soutenir',
  },
  openGraph: {
    title: 'Faire un Don & Nous Soutenir | ISSR Sainte Joséphine Bakhita',
    description: 'Participez à la formation pastorale et théologique en Afrique. Coordonnées bancaires officielles, Orange Money & MTN MoMo.',
    url: '/nous-soutenir',
  },
};

export default function NousSoutenirLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
