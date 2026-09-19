import { Formation, TeamMember, Article } from '../types';

export const INSTITUTION_INFO = {
  name: "Institut Supérieur des Sciences Religieuses Sainte Joséphine Bakhita",
  acronym: "ISSR Sainte Bakhita",
  motto: "Se former pour mieux servir !",
  affiliation: "Rattaché à la Faculté de Théologie de l'Université Catholique d'Afrique Centrale (UCAC) – ICY",
  erection: "Érigé canoniquement par la Congrégation pour l'Éducation Catholique (Rome) en 2022",
  formerName: "Anciennement Institut de Théologie Pastorale pour les Religieux (ITPR)",
  address: "Yaoundé – Mvolyé, derrière le Collège Saint Benoît (Cameroun)",
  phone: "+237 655 165 757",
  whatsapp: "+237655165757",
  email: "issrbakhita2026@gmail.com",
  coordinates: {
    lat: 3.84328,
    lng: 11.51087,
  },
  director: {
    name: "P. Dr Patrice MEKANA, sac",
    title: "Directeur de l'ISSR Sainte Bakhita",
    quote: "La formation intégrale des chrétiens représente l’un des défis majeurs de l’Église en Afrique, si nous voulons un christianisme qui rejoint l’homme africain dans sa réalité. L’Institut Supérieur des Sciences Religieuses de Yaoundé répond à cette exigence en proposant une formation multidisciplinaire et professionnalisante, adaptée au contexte africain.",
  }
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "dir-1",
    name: "P. Dr Patrice MEKANA, sac",
    title: "Directeur",
    role: "Prêtre Pallottin, Docteur en Théologie",
    bio: "Responsable de la gouvernance académique et pastorale de l'Institut Supérieur des Sciences Religieuses.",
    imageUrl: "/images/team/dir-patrice-mekana.jpg"
  },
  {
    id: "dir-2",
    name: "Sr. Patience ENGANEMBEN LIMALEBA, ejnb",
    title: "Préfet des Études",
    role: "Religieuse, Coordination pédagogique",
    bio: "Supervise l'organisation des cours, le suivi académique des apprenants et le corps enseignant.",
    imageUrl: "/images/team/sr-patience-enganemben.jpg"
  },
  {
    id: "dir-3",
    name: "M. Jean Claude MEKOULOU",
    title: "Représentant des Enseignants",
    role: "Enseignant chercheur",
    bio: "Porte-parole du corps professoral et garant de l'excellence pédagogique.",
    imageUrl: "/images/team/jean-claude-mekoulou.jpg"
  },
  {
    id: "dir-4",
    name: "M. Gaël Marcel ABANDA",
    title: "Économe",
    role: "Gestion financière et intendance",
    bio: "En charge de l'administration financière, des scolarités et de la gestion matérielle.",
    imageUrl: "/images/team/gael-marcel-abanda.jpg"
  },
  {
    id: "dir-5",
    name: "Mlle Lydie TSELLE",
    title: "Secrétaire Académique",
    role: "Accueil & Gestion des dossiers",
    bio: "Assistance aux admissions, gestion des inscriptions et relation avec les étudiants.",
    imageUrl: "/images/team/lydie-tselle.jpg"
  },
  {
    id: "dir-6",
    name: "Mlle Manuella NYAMBONE",
    title: "Secrétaire Administrative",
    role: "Secrétariat de direction",
    bio: "Gestion des correspondances officielles, archives et suivi administratif.",
    imageUrl: "/images/team/manuella-nyambone.jpg"
  }
];

export const FORMATIONS: Formation[] = [
  {
    id: "sciences-religieuses-licence",
    slug: "sciences-religieuses-baccalaureat-canonique",
    title: "Sciences Religieuses (Baccalauréat Canonique / Licence)",
    subtitle: "Formation académique de référence reconnue par le Saint-Siège (Rome) et l'UCAC",
    category: "canonique",
    duration: "3 ans (6 semestres)",
    diploma: "Baccalauréat Canonique en Sciences Religieuses (Équivalent Licence LMD)",
    targetAudience: "Laïcs engagés, religieux, religieuses, séminaristes et prêtres",
    modality: "Présentiel (campus de Mvolyé) et En ligne (Zoom/Google Meet)",
    description: "Une formation théologique, philosophique, scripturaire et pastorale rigoureuse permettant d'entrer dans l'intelligence de la foi et de répondre aux défis ecclésiaux et sociétaux contemporains.",
    objectives: [
      "Approfondir les fondements théologiques, bibliques, magistériels et dogmatiques de la foi catholique.",
      "Développer une solide capacité d'analyse philosophique, éthique et anthropologique.",
      "Acquérir les méthodes de transmission de la foi et de pastorale contextualisées à l'Afrique.",
      "Préparer aux responsabilités pastorales, à l'enseignement et à la recherche théologique."
    ],
    program: [
      {
        semester: "Semestre 1 & 2 : Fondements",
        modules: [
          "Introduction à l'Ancien et au Nouveau Testament",
          "Histoire de l'Église antique et médiévale",
          "Philosophie fondamentale et Anthropologie",
          "Théologie fondamentale : Révélation et Foi",
          "Méthodologie de la recherche académique"
        ]
      },
      {
        semester: "Semestre 3 & 4 : Approfondissements théologiques",
        modules: [
          "Christologie et Trinité",
          "Théologie sacramentaire et Liturgie",
          "Éthique théologique et Morale fondamentale",
          "Pères de l'Église et Patristique",
          "Droit Canonique fondamental"
        ]
      },
      {
        semester: "Semestre 5 & 6 : Synthèse & Pastorale africaine",
        modules: [
          "Ecclésiologie et Théologie pastorale",
          "Doctrine Sociale de l'Église",
          "Théologie des religions et Dialogue œcuménique",
          "Défis de l'inculturation en Afrique",
          "Rédaction et soutenance du mémoire de Baccalauréat canonique"
        ]
      }
    ],
    careerProspects: [
      "Responsable de pastorale paroissiale, diocésaine ou provinciale",
      "Enseignant de culture religieuse dans les collèges et lycées",
      "Cadre dans les commissions épiscopales et œuvres caritatives (Caritas)",
      "Poursuite d'études vers le Master et le Doctorat en Théologie"
    ],
    requirements: [
      "Baccalauréat de l'enseignement secondaire ou titre équivalent",
      "Lettre de recommandation de l'Ordinaire du lieu (Évêque) ou du Supérieur(e) majeur(e) pour les religieux/prêtres",
      "Lettre de motivation et dossier d'inscription complet"
    ],
    tuition: {
      registrationFee: "25 000 FCFA",
      annualTuition: "350 000 FCFA",
      installments: "Payable en 3 tranches (Octobre, Janvier, Avril)"
    }
  },
  {
    id: "sciences-religieuses-master",
    slug: "master-en-sciences-religieuses",
    title: "Master en Sciences Religieuses",
    subtitle: "Cycle supérieur de spécialisation, de recherche et de leadership ecclésial",
    category: "canonique",
    duration: "2 ans (4 semestres)",
    diploma: "Master universitaire en Sciences Religieuses (UCAC)",
    targetAudience: "Titulaires d'un Baccalauréat canonique ou Licence en Théologie/Sciences Humaines",
    modality: "Présentiel et Enseignement à distance synchrone",
    description: "Cycle d'excellence formant des cadres de haut niveau capables de concevoir des projets pastoraux, d'animer des institutions ecclésiales et d'enseigner au niveau universitaire.",
    objectives: [
      "Maîtriser les méthodologies avancées de recherche théologique et interdisciplinaire.",
      "Former des conseillers éthiques et des formateurs d'adultes dans la foi.",
      "Développer une pensée théologique originale face aux mutations culturelles africaines."
    ],
    program: [
      {
        semester: "Master 1",
        modules: [
          "Herméneutique biblique avancée",
          "Éthique sociale, politique et bioéthique",
          "Gouvernance et management pastoral",
          "Séminaires de recherche thématiques"
        ]
      },
      {
        semester: "Master 2",
        modules: [
          "Inculturation et nouvelles approches théologiques",
          "Stage de formation ou intervention de terrain",
          "Atelier de rédaction de thèse de Master",
          "Soutenance publique devant un jury d'État et canonique"
        ]
      }
    ],
    careerProspects: [
      "Enseignement dans les instituts théologiques et universités",
      "Direction de centres pastoraux et de formation spirituelle",
      "Direction d'ONG confessionnelles et institutions sanitaires/éducatives"
    ],
    requirements: [
      "Licence en Sciences Religieuses / Baccalauréat canonique ou diplôme équivalent (avec mention)",
      "Projet de recherche initial",
      "Entretien d'admission"
    ],
    tuition: {
      registrationFee: "35 000 FCFA",
      annualTuition: "450 000 FCFA",
      installments: "Payable en 3 tranches"
    }
  },
  {
    id: "ingenierie-pastorale",
    slug: "ingenierie-pastorale",
    title: "Diplôme Universitaire en Ingénierie Pastorale",
    subtitle: "Conception, gestion et accompagnement de projets pastoraux et caritatifs",
    category: "professionnelle",
    duration: "2 ans",
    diploma: "Diplôme Universitaire (DU) - UCAC/ISSR",
    targetAudience: "Aumôniers, coordinateurs de mouvements, agents pastoraux, laïcs engagés",
    modality: "Présentiel à Mvolyé ou En ligne",
    description: "Une formation professionnalisante qui apporte les outils modernes du management de projet, de la sociologie et de l'animation spirituelle pour revitaliser l'action pastorale de terrain.",
    objectives: [
      "Apprendre à diagnostiquer les besoins socioculturels et spirituels d'un milieu de vie.",
      "Concevoir, budgétiser et piloter des projets d'aumônerie (hôpitaux, prisons, universités).",
      "Mobiliser et coordonner des équipes de bénévoles et d'acteurs de terrain."
    ],
    program: [
      {
        semester: "Année 1 : Diagnostic & Outils",
        modules: [
          "Sociologie des religions et dynamique des communautés",
          "Gestion de projets pastoraux (Cycle de projet)",
          "Écoute active, relation d'aide et accompagnement spirituel",
          "Communication pastorale et outils numériques"
        ]
      },
      {
        semester: "Année 2 : Ingénierie & Terrains",
        modules: [
          "Pastorale de la santé et aumônerie hospitalière",
          "Pastorale pénitentiaire et réinsertion sociale",
          "Recherche de financements et gestion de projets caritatifs",
          "Stage pratique obligatoire (3 mois) et rapport d'intervention"
        ]
      }
    ],
    careerProspects: [
      "Responsable d'aumônerie (hôpitaux, prisons, universités, aéroports)",
      "Coordinateur de projets caritatifs et diocésains",
      "Animateur de réseaux d'entraide et d'évangélisation"
    ],
    requirements: [
      "Baccalauréat de l'enseignement secondaire ou expérience pastorale attestée",
      "Lettre de recommandation d'une paroisse ou communauté"
    ],
    tuition: {
      registrationFee: "25 000 FCFA",
      annualTuition: "280 000 FCFA",
      installments: "Échelonné en 3 paiements"
    }
  },
  {
    id: "pedagogie-religieuse",
    slug: "pedagogie-religieuse",
    title: "Diplôme Universitaire en Pédagogie Religieuse",
    subtitle: "Former les enseignants d'éducation religieuse pour les collèges et lycées",
    category: "professionnelle",
    duration: "2 ans",
    diploma: "Diplôme Universitaire (DU) d'Enseignant de Religion",
    targetAudience: "Enseignants en exercice, catéchistes, candidats à l'enseignement catholique",
    modality: "Présentiel et En ligne",
    description: "Répond aux besoins des secrétariats à l'éducation catholique en dotant les futurs enseignants de méthodologies pédagogiques modernes et d'une maîtrise des programmes d'instruction religieuse.",
    objectives: [
      "Maîtriser la didactique spécifique de l'enseignement religieux en contexte pluraliste.",
      "Concevoir des séquences d'apprentissage interactives et motivantes pour la jeunesse.",
      "Articuler culture contemporaine, sciences humaines et éveil à la foi."
    ],
    program: [
      {
        semester: "Année 1 : Didactique & Psychologie",
        modules: [
          "Psychologie de l'enfant et de l'adolescent",
          "Théories de l'apprentissage et didactique de la religion",
          "Éthique professionnelle de l'éducateur chrétien",
          "Culture biblique pour les jeunes"
        ]
      },
      {
        semester: "Année 2 : Pratiques de classe & Stage",
        modules: [
          "Élaboration de fiches pédagogiques et évaluation",
          "Gestion de classe et dialogue interreligieux en milieu scolaire",
          "Stage en établissement d'enseignement secondaire (Collège / Lycée)",
          "Soutenance du mémoire professionnel"
        ]
      }
    ],
    careerProspects: [
      "Professeur de culture et instruction religieuse en collège/lycée",
      "Animateur en pastorale scolaire d'établissement",
      "Formateur diocésain de catéchistes"
    ],
    requirements: [
      "Baccalauréat secondaire ou niveau universitaire",
      "Intérêt pour l'enseignement et l'éducation de la jeunesse"
    ],
    tuition: {
      registrationFee: "25 000 FCFA",
      annualTuition: "280 000 FCFA",
      installments: "Payable par tranches"
    }
  },
  {
    id: "leadership-gestion-oeuvres",
    slug: "leadership-et-gestion-des-oeuvres",
    title: "DU & Certificat en Leadership et Gestion des Œuvres",
    subtitle: "Gouvernance, management éthique et gestion financière des institutions ecclésiales",
    category: "professionnelle",
    duration: "1 à 2 ans (selon formule Certificat ou DU)",
    diploma: "Diplôme Universitaire (DU) ou Certificat Universitaire d'Aptitude",
    targetAudience: "Supérieurs majeurs, économes, gestionnaires de congrégations, laïcs gestionnaires",
    modality: "Présentiel et Sessions intensives hybrides",
    description: "Formation indispensable pour administrer avec transparence, compétence et fidélité au droit canonique les biens, œuvres et congrégations religieuses.",
    objectives: [
      "Maîtriser les principes de gouvernance canonique et de transparence civile.",
      "Élaborer et suivre un budget institutionnel équilibré.",
      "Gérer les ressources humaines et les œuvres de manière pérenne."
    ],
    program: [
      {
        semester: "Module Fondamental",
        modules: [
          "Droit patrimonial canonique et législation civile locale",
          "Comptabilité générale appliquée aux institutions ecclésiales",
          "Management des ressources humaines et relations de travail"
        ]
      },
      {
        semester: "Module Stratégique",
        modules: [
          "Stratégie de viabilité financière des congrégations",
          "Gestion immobilière et entretien du patrimoine",
          "Leadership serviteur et discernement managérial"
        ]
      }
    ],
    careerProspects: [
      "Économe général(e) ou provincial(e)",
      "Administrateur(trice) d'œuvres scolaires, sanitaires ou pastorales",
      "Gestionnaire financier d'organisation d'Église"
    ],
    requirements: [
      "Responsabilité effective dans une congrégation, diocèse ou œuvre",
      "Niveau Baccalauréat minimum"
    ],
    tuition: {
      registrationFee: "30 000 FCFA",
      annualTuition: "320 000 FCFA",
      installments: "Formule modulaire flexible"
    }
  }
];

export const ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "inscriptions-ouvertes-annee-academique-2026-2027",
    title: "Inscriptions ouvertes pour la rentrée académique 2026-2027 à l'ISSR Bakhita",
    category: "Admissions",
    excerpt: "L'Institut Supérieur des Sciences Religieuses Sainte Joséphine Bakhita lance sa campagne d'admissions pour l'ensemble de ses filières canoniques et professionnelles.",
    content: `L'Institut Supérieur des Sciences Religieuses Sainte Joséphine Bakhita, érigé canoniquement par le Saint-Siège et rattaché à l'Université Catholique d'Afrique Centrale (UCAC-ICY), informe le public de l'ouverture des candidatures pour l'année académique 2026-2027.

Que vous soyez laïc engagé désireux d'approfondir votre foi, religieux(se) en formation initiale ou permanente, ou pasteur en responsabilité, nos programmes d'excellence vous ouvrent leurs portes.

Les cours sont dispensés en mode présentiel sur notre campus de Yaoundé (Mvolyé, derrière le Collège Saint Benoît) ainsi qu'en mode distanciel synchrone (Zoom & Google Meet) pour les apprenants situés hors de Yaoundé ou de la région.`,
    author: "Secrétariat Général",
    publishedAt: "15 Septembre 2026",
    imageUrl: "/images/img-1050.jpg",
    readTime: "3 min",
    featured: true
  },
  {
    id: "art-2",
    slug: "colloque-theologique-afrique-eglise-societe",
    title: "Colloque : « La formation théologique des laïcs, moteur du développement en Afrique »",
    category: "Événements",
    excerpt: "Retour sur la journée de réflexion organisée à Yaoundé réunissant théologiens, pasteurs et universitaires autour de la mission de l'ISSR.",
    content: `Sous la présidence du P. Dr Patrice MEKANA, sac, Directeur de l'Institut, l'ISSR Sainte Bakhita a accueilli une conférence académique majeure portant sur la place cruciale des laïcs chrétiens formés intellectuellement et spirituellement dans la société africaine actuelle.

Les débats ont souligné l'urgence d'une foi adulte, capable de rendre compte de l'espérance chrétienne dans les sphères professionnelles, politiques et familiales.`,
    author: "P. Dr Patrice MEKANA, sac",
    publishedAt: "04 Août 2026",
    imageUrl: "/images/mg-2217.jpg",
    readTime: "5 min",
    featured: false
  },
  {
    id: "art-3",
    slug: "diplome-universitaire-ingenierie-pastorale-inscriptions",
    title: "L'Ingénierie Pastorale : une réponse moderne aux aumôneries et projets d'Église",
    category: "Formations",
    excerpt: "Découvrez notre Diplôme Universitaire en Ingénierie Pastorale spécialement conçu pour les aumôniers hospitaliers, pénitentiaires et responsables d'œuvres caritatives.",
    content: `Comment structurer une aumônerie d'hôpital ? Quels outils pour accompagner la réinsertion sociale en milieu carcéral ? Comment gérer une équipe bénévole et financer un projet paroissial ?

Le DU en Ingénierie Pastorale de l'ISSR Bakhita offre 2 années de formation pratique et théorique pour professionnaliser l'action d'Église. Les inscriptions sont en cours.`,
    author: "Sr. Patience ENGANEMBEN, ejnb",
    publishedAt: "28 Juillet 2026",
    imageUrl: "/images/img-1139.jpg",
    readTime: "4 min",
    featured: false
  }
];
