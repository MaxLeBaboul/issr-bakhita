import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À Propos, Histoire & Érection Canonique à Rome',
  description: 'Découvrez l\'histoire de l\'Institut Supérieur des Sciences Religieuses Sainte Joséphine Bakhita, son érection canonique par Rome en 2022, son affiliation à l\'UCAC-ICY et son équipe de direction.',
  keywords: [
    'Histoire ISSR Bakhita',
    'Érection canonique Rome 2022',
    'ITPR Yaoundé',
    'P. Patrice MEKANA',
    'Sr. Patience ENGANEMBEN',
    'Direction ISSR Bakhita',
    'Institut Supérieur Sciences Religieuses Cameroun'
  ],
  alternates: {
    canonical: '/a-propos',
  },
  openGraph: {
    title: 'Notre Histoire & Gouvernance | ISSR Sainte Joséphine Bakhita',
    description: 'De l\'ancien ITPR à l\'érection pontificale en 2022. Mission, piliers pédagogiques et équipe académique dirigeante.',
    url: '/a-propos',
  },
};

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
