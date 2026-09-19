import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact, Accès Campus de Mvolyé & Secrétariat',
  description: 'Prenez contact avec le secrétariat de l\'ISSR Sainte Joséphine Bakhita : téléphone direct, assistance WhatsApp, courriel et localisation sur le campus de Mvolyé à Yaoundé.',
  keywords: [
    'Contact ISSR Bakhita',
    'Secrétariat ISSR Yaoundé',
    'Téléphone ISSR Bakhita',
    'Campus Mvolyé plan d\'accès',
    'WhatsApp ISSR Sainte Bakhita',
    'Collège Saint Benoît Yaoundé'
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contactez le Secrétariat de l\'ISSR Sainte Bakhita',
    description: 'Accueil académique, orientation des étudiants et plan d\'accès au campus de Yaoundé – Mvolyé.',
    url: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
