import { Formation, TeamMember, Article } from '../types';

export const INSTITUTION_INFO = {
  name: "Institut Supérieur des Sciences Religieuses Sainte Joséphine Bakhita",
  acronym: "ISSR Sainte Bakhita",
  motto: "Se former pour mieux servir !",
  affiliation: "Rattaché à la Faculté de Théologie de l'Université Catholique d'Afrique Centrale (UCAC) – ICY",
  erection: "Érigé canoniquement par Décret de la Congrégation du 28 janvier 2012 (Rome)",
  formerName: "Anciennement Institut de Théologie Pastorale pour les Religieux (ITPR)",
  address: "Yaoundé – Mvolyé, derrière le Collège Saint Benoît (Cameroun)",
  phone: "+237 655 165 757",
  whatsapp: "+237655165757",
  email: "Institutsuperieursciencesrelig@gmail.com",
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

export const DONATION_INFO = {
  bank: {
    bankName: "Afriland First Bank Cameroun",
    accountName: "INSTITUT SUPERIEUR DES SCIENCES RELIGIEUSES SAINTE JOSEPHINE BAKHITA",
    shortName: "ISSR Sainte Bakhita",
    domiciliation: "Agence Principale de Yaoundé (Mvolyé / Hippodrome)",
    bankCode: "10005",
    branchCode: "00001",
    accountNumber: "04326781001",
    ribKey: "84",
    fullRib: "10005 00001 04326781001 84",
    iban: "CM21 1000 5000 0104 3267 8100 184",
    swiftBic: "AFRICMCX",
    referenceNote: "Indiquer obligatoirement en motif : DON - [Votre Nom] / SOUTIEN ISSR",
  },
  mobileMoney: {
    orangeMoney: {
      operator: "Orange Money (OM) Cameroun",
      accountName: "ISSR SAINTE BAKHITA",
      number: "+237655165757",
      displayNumber: "+237 655 165 757",
      ussdSyntax: "#150*1*1*655165757*MONTANT#",
      shortCode: "#150#",
      badgeColor: "from-orange-500 to-amber-600",
      instructions: "Composer le #150#, sélectionner 'Paiement / Transfert', entrer le numéro 655 165 757 et confirmer avec votre code secret.",
    },
    mtnMoMo: {
      operator: "MTN Mobile Money (MoMo) Cameroun",
      accountName: "ISSR SAINTE BAKHITA",
      number: "+237655165757",
      displayNumber: "+237 655 165 757",
      ussdSyntax: "*126*1*1*655165757*MONTANT#",
      shortCode: "*126#",
      badgeColor: "from-yellow-400 to-amber-500",
      instructions: "Composer le *126#, sélectionner 'Transfert d'argent', saisir le numéro 655 165 757 et valider avec votre code PIN.",
    },
  },
  impactProjects: [
    {
      title: "Bourses d'Études & Solidarité",
      desc: "Financement des frais de scolarité pour les religieuses, religieux et laïcs des diocèses défavorisés désireux d'étudier la théologie.",
      icon: "GraduationCap"
    },
    {
      title: "Campus Numérique & E-learning",
      desc: "Développement des serveurs multimédias et de la connexion internet haut débit pour la diffusion des cours en direct auprès de la diaspora et des provinces.",
      icon: "Laptop"
    },
    {
      title: "Bibliothèque & Fonds Théologique",
      desc: "Acquisition de traités de patristique, exégèse, morale et sciences pastorales, enrichissant le patrimoine intellectuel de l'Église d'Afrique.",
      icon: "BookOpen"
    },
    {
      title: "Infrastructures & Équipements",
      desc: "Modernisation des amphithéâtres et des salles de séminaires sur le site historique de Mvolyé à Yaoundé.",
      icon: "Building"
    }
  ],
  contactEconomat: {
    service: "Économat & Intendance — ISSR Sainte Bakhita",
    phone: "+237 655 165 757",
    whatsapp: "+237655165757",
    email: "Institutsuperieursciencesrelig@gmail.com",
    notice: "Après tout virement bancaire ou paiement Mobile Money, veuillez transmettre votre reçu ou capture d'écran par WhatsApp ou Email afin d'obtenir votre attestation officielle de bienfaiteur délivrée par l'Économat."
  }
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "dir-1",
    name: "P. Dr Patrice MEKANA, sac",
    title: "Directeur",
    role: "Prêtre Pallottin, Docteur en Théologie",
    bio: "Responsable de la gouvernance académique et pastorale de l'Institut Supérieur des Sciences Religieuses.",
    imageUrl: "/images/team/dir-patrice-mekana.jpg",
    objectPosition: "center 20%"
  },
  {
    id: "dir-2",
    name: "Sr. Patience ENGANEMBEN LIMALEBA, ejnb",
    title: "Préfet des Études",
    role: "Religieuse, Coordination pédagogique",
    bio: "Supervise l'organisation des cours, le suivi académique des apprenants et le corps enseignant.",
    imageUrl: "/images/team/sr-patience-enganemben.jpg",
    objectPosition: "center center"
  },
  {
    id: "dir-3",
    name: "M. Jean Claude MEKOULOU",
    title: "Représentant des Enseignants",
    role: "Enseignant chercheur",
    bio: "Porte-parole du corps professoral et garant de l'excellence pédagogique.",
    imageUrl: "/images/team/jean-claude-mekoulou.jpg",
    objectPosition: "center center"
  },
  {
    id: "dir-4",
    name: "M. Gaël Marcel ABANDA",
    title: "Économe",
    role: "Gestion financière et intendance",
    bio: "En charge de l'administration financière, des scolarités et de la gestion matérielle.",
    imageUrl: "/images/team/gael-marcel-abanda.jpg",
    objectPosition: "center center"
  },
  {
    id: "dir-5",
    name: "Mlle Lydie TSELI",
    title: "Secrétariat de direction (Cours du jour)",
    role: "Secrétariat de direction — Cours du jour",
    bio: "Assistance aux admissions, gestion des inscriptions et relation avec les étudiants des cours du jour.",
    imageUrl: "/images/team/lydie-tseli.jpg",
    objectPosition: "center center"
  },
  {
    id: "dir-6",
    name: "Mlle Manuella NYAMBONE",
    title: "Secrétariat de direction (Cours du soir)",
    role: "Secrétariat de direction — Cours du soir",
    bio: "Gestion des correspondances officielles, suivi administratif et coordination des cours du soir.",
    imageUrl: "/images/team/manuella-nyambone.jpg",
    objectPosition: "center center"
  }
];

export const FORMATIONS: Formation[] = [
  {
    id: "sciences-religieuses-licence",
    slug: "sciences-religieuses-baccalaureat-canonique",
    title: "Sciences Religieuses (Baccalauréat Canonique / Licence)",
    subtitle: "Formation théologique et philosophique fondamentale reconnue par le Saint-Siège (Rome) et l'UCAC",
    category: "canonique",
    duration: "3 ans (6 semestres)",
    diploma: "Baccalauréat Canonique en Sciences Religieuses (Équivalent Licence LMD)",
    targetAudience: "Laïcs engagés, religieux, religieuses, séminaristes et prêtres",
    modality: "Présentiel (campus de Mvolyé) et En direct en ligne (Zoom / Google Meet)",
    description: "Formation théologique, biblique, philosophique et magistérielle rigoureuse érigée canoniquement par le Saint-Siège, permettant d'entrer dans l'intelligence de la foi et de répondre avec discernement aux défis ecclésiaux et sociétaux contemporains.",
    objectives: [
      "Approfondir les fondements théologiques, bibliques, magistériels et dogmatiques de la foi catholique.",
      "Développer une solide capacité d'analyse philosophique, éthique et anthropologique.",
      "Acquérir les méthodes de transmission de la foi et de pastorale contextualisées à l'Afrique.",
      "Préparer aux responsabilités pastorales, à l'enseignement et à la recherche théologique."
    ],
    program: [
      {
        semester: "Semestre 1 & 2 : Fondements scripturaires & philosophiques",
        modules: [
          "Introduction à l'Ancien et au Nouveau Testament",
          "Histoire de l'Église antique et médiévale",
          "Philosophie fondamentale, Logique et Anthropologie",
          "Théologie fondamentale : Révélation et Foi",
          "Méthodologie de la recherche académique et rédaction"
        ]
      },
      {
        semester: "Semestre 3 & 4 : Approfondissements dogmatiques & moraux",
        modules: [
          "Christologie et Trinité",
          "Théologie sacramentaire et Liturgie sacrée",
          "Éthique théologique et Morale fondamentale",
          "Pères de l'Église et Patristique",
          "Droit Canonique fondamental (Code de 1983)"
        ]
      },
      {
        semester: "Semestre 5 & 6 : Synthèse & Pastorale africaine",
        modules: [
          "Ecclésiologie et Théologie pastorale",
          "Doctrine Sociale de l'Église (DSE)",
          "Théologie des religions et Dialogue œcuménique",
          "Défis de l'inculturation de l'Évangile en Afrique",
          "Rédaction et soutenance du mémoire de Baccalauréat canonique"
        ]
      }
    ],
    careerProspects: [
      "Responsable de pastorale paroissiale, diocésaine ou provinciale",
      "Enseignant de culture religieuse dans les collèges et lycées",
      "Cadre dans les commissions épiscopales et œuvres caritatives (Caritas)",
      "Poursuite d'études vers le Master et le Doctorat canonique en Théologie"
    ],
    requirements: [
      "Baccalauréat de l'enseignement secondaire (ou GCE A/L)",
      "Lettre de recommandation de l'Ordinaire du lieu (Évêque) ou du Supérieur(e) majeur(e)",
      "Lettre de motivation et dossier d'inscription complet"
    ],
    tuition: {
      registrationFee: "10 000 FCFA (Frais de dossier)",
      annualTuition: "150 000 FCFA (Laïcs) / 765 000 FCFA (Religieux)",
      installments: "Payable en 3 tranches (Rentrée, Janvier, Avril)"
    }
  },
  {
    id: "sciences-religieuses-master-foi-culture",
    slug: "master-sciences-religieuses-foi-culture-dialogue",
    title: "Master Sciences Religieuses : Foi, Culture & Dialogue Interreligieux",
    subtitle: "Cycle supérieur de spécialisation, d'inculturation et de diplomatie pastorale (UCAC)",
    category: "canonique",
    duration: "2 ans (4 semestres)",
    diploma: "Master universitaire en Sciences Religieuses (UCAC)",
    targetAudience: "Titulaires d'un Baccalauréat canonique, Licence théologique ou sciences humaines, prêtres, religieux, laïcs",
    modality: "Présentiel (Lundi à Jeudi, cours du soir de 17h00 à 20h30)",
    description: "Former des spécialistes capables de décrypter les traditions religieuses africaines, de maîtriser le dialogue œcuménique et interreligieux, et d'exercer des responsabilités dans les instances de pacification et de médiation culturelle.",
    objectives: [
      "Connaître les traditions religieuses en Afrique et analyser leurs enjeux dans le contexte contemporain.",
      "Développer des compétences approfondies en œcuménisme et dialogue interreligieux.",
      "Former des cadres pour les organisations internationales (Droits de l'Homme, Action humanitaire).",
      "Œuvrer au multiculturalisme, à la cohésion sociale et à la culture de la paix."
    ],
    program: [
      {
        semester: "Master 1 : Herméneutique & Anthropologie religieuse africaine",
        modules: [
          "Herméneutique biblique et théologie contextuelle",
          "Religions traditionnelles africaines et islam en Afrique",
          "Éthique sociale, politique et bioéthique en Afrique",
          "Méthodes qualitatives de recherche en sciences religieuses"
        ]
      },
      {
        semester: "Master 2 : Médiation, Dialogue & Recherche de thèse",
        modules: [
          "Théologie du dialogue et diplomatie ecclésiale",
          "Gestion des conflits à base religieuse et médiation",
          "Atelier de rédaction de thèse de Master",
          "Soutenance publique devant le jury d'État et canonique"
        ]
      }
    ],
    careerProspects: [
      "Cadre dans les organisations internationales (ONU, UA, ONG humanitaires)",
      "Responsable de commission diocésaine ou nationale pour le dialogue interreligieux",
      "Enseignant chercheur dans les universités et grands séminaires",
      "Consultant et expert en cohésion sociale et prévention des radicalismes"
    ],
    requirements: [
      "Licence en Sciences Religieuses / Baccalauréat canonique ou diplôme équivalent (avec mention)",
      "Fiche d'inscription à retirer au secrétariat de l'ISSR",
      "Projet de recherche initial et entretien d'admission"
    ],
    tuition: {
      registrationFee: "15 000 FCFA",
      annualTuition: "450 000 FCFA (Laïcs) / 850 000 FCFA (Prêtres & Religieux)",
      installments: "Payable en tranches trimestrielles"
    }
  },
  {
    id: "licence-ingenierie-pastorale",
    slug: "licence-sciences-religieuses-option-ingenierie-pastorale",
    title: "Licence Professionnelle en Ingénierie Pastorale",
    subtitle: "Formation théologique, pastorale, managériale et psychologique pour la conduite d'œuvres d'Église et de projets socio-éducatifs",
    category: "professionnelle",
    duration: "3 ans (6 semestres, 180 crédits ECTS ou équivalent)",
    diploma: "Licence Professionnelle en Ingénierie Pastorale (ISSR Sainte Bakhita / UCAC)",
    targetAudience: "Agents pastoraux, animateurs de mouvements ecclésiaux, aumôniers, coordinateurs de projets humanitaires et sociaux, laïcs engagés, religieux et religieuses",
    modality: "Présentiel (campus de Mvolyé) et En direct en ligne (Zoom / Google Meet)",
    description: "La formation des animateurs pastoraux vise le renforcement des compétences théologiques, pastorales, spirituelles, bibliques, psychologiques et managériales ainsi que l’acquisition des outils de psychologie pour une meilleure intervention auprès des personnes vulnérables, en vue des missions dans les paroisses, les Instituts religieux et les structures sociales. Cette filière forme des agents pastoraux compétents, capables de concevoir, gérer et évaluer des projets pastoraux et socio-éducatifs, avec une solide base théologique, biblique, psychologique et managériale.",
    objectives: [
      "Donner une solide formation biblique, théologique et spirituelle.",
      "Initier aux sciences humaines (psychologie, sociologie, pédagogie) pour comprendre les dynamiques sociales et communautaires.",
      "Développer des compétences en management, planification et évaluation de projets pastoraux.",
      "Outiller pour la communication, la médiation et l’accompagnement spirituel des personnes vulnérables.",
      "Former à l’utilisation des outils numériques pour la pastorale moderne et l'évangélisation."
    ],
    pedagogicalMethods: [
      "Cours magistraux et séminaires interactifs",
      "Ateliers pratiques (animation, catéchèse, gestion de projet)",
      "Études de cas pastoraux et mises en situation",
      "Stages encadrés et supervisions sur le terrain",
      "Mémoire professionnel en lien avec une problématique pastorale"
    ],
    teachingTeam: [
      "Théologiens et biblistes : PhD, masters en théologie et sciences religieuses",
      "Sociologues, psychologues et pédagogues : Spécialisés en religion, famille et jeunesse",
      "Professionnels de la communication et du management de projet",
      "Praticiens pastoraux : Prêtres, religieux, laïcs expérimentés en animation pastorale",
      "Experts en TIC et communication : Intégration des outils numériques dans la pastorale"
    ],
    program: [
      {
        semester: "Année 1 (Semestres 1 & 2) : Fondements Théologiques, Bibliques & Sciences Humaines",
        modules: [
          "Fondements bibliques, théologiques et spirituels de la mission pastorale",
          "Initiation à la psychologie générale et au développement psychoaffectif",
          "Sociologie des dynamiques communautaires et familiales en Afrique",
          "Principes fondamentaux du management et de l'administration pastorale",
          "Outils numériques et technologies de l'information pour la pastorale moderne",
          "Communication interpersonnelle, médiation et écoute bienveillante"
        ]
      },
      {
        semester: "Année 2 (Semestres 3 & 4) : Ingénierie de Projet, Psychoéducation & Vulnérabilités",
        modules: [
          "Conception, planification, budgétisation et évaluation de projets pastoraux et socio-éducatifs",
          "Outils de psychologie pour l’intervention auprès des personnes vulnérables",
          "Aumôneries spécialisées : milieu scolaire/universitaire, santé/hôpitaux, prisons, maisons de retraite",
          "Animation pastorale, liturgie, catéchèse et dynamiques de groupes ecclésiaux",
          "Gestion des crises, résolution de conflits et médiation pastorale",
          "Stage pratique encadré et supervisé en paroisse, aumônerie ou structure sociale"
        ]
      },
      {
        semester: "Année 3 (Semestres 5 & 6) : Leadership Pastoral, Gestion Avancée & Mémoire",
        modules: [
          "Management stratégique, leadership serviteur et gouvernance des œuvres d'Église",
          "Montage de projets caritatifs, recherche de financements et partenariats ONG/diocésains",
          "Évangélisation numérique, médias chrétiens et stratégie de communication ecclésiale",
          "Ateliers pratiques d’études de cas pastoraux et simulations de gestion de projets",
          "Stage professionnel de responsabilité sur le terrain (3 mois)",
          "Rédaction et soutenance publique du mémoire professionnel de Licence"
        ]
      }
    ],
    careerProspects: [
      "Aumôniers psychoéducateurs des écoles, lycées et collèges, universités, hôpitaux et prisons",
      "Responsables de pastorale paroissiale, diocésaine ou communautaire",
      "Animateurs et coordinateurs en maisons de retraite et centres d’accueil",
      "Animateurs de mouvements et services ecclésiaux",
      "Formateurs en catéchèse, liturgie et animation pastorale",
      "Chargés de projets sociaux, éducatifs ou humanitaires en lien avec l’Église ou les ONG chrétiennes",
      "Conseillers en communication et médias religieux"
    ],
    requirements: [
      "Tout Baccalauréat de l'enseignement secondaire ou GCE A/L",
      "Être inscrit dans le programme des Sciences Religieuses",
      "Lettre de motivation et dossier d'inscription complet (10 000 FCFA de frais de dossier)"
    ],
    tuition: {
      registrationFee: "10 000 FCFA (Dossier)",
      annualTuition: "150 000 FCFA (Laïcs) / 765 000 FCFA (Religieux)",
      installments: "Échelonnement mensuel ou trimestriel possible"
    }
  },
  {
    id: "licence-pedagogie-religieuse",
    slug: "licence-sciences-religieuses-option-pedagogie-religieuse",
    title: "Licence Professionnelle en Pédagogie Religieuse",
    subtitle: "Formation théologique, didactique et pédagogique pour l'enseignement religieux, moral et civique",
    category: "professionnelle",
    duration: "3 ans (6 semestres, 180 crédits ECTS ou équivalent)",
    diploma: "Licence Professionnelle en Pédagogie Religieuse (ISSR Sainte Bakhita / UCAC)",
    targetAudience: "Enseignants de religion, professeurs de morale/E.V.A.I., catéchistes, animateurs éducatifs, religieux éducateurs, laïcs engagés",
    modality: "Présentiel (campus de Mvolyé) et En direct en ligne (Zoom / Google Meet)",
    description: "La religion se présente comme un enjeu central pour le vivre-ensemble. Développer chez les jeunes une compréhension du phénomène religieux et une pratique du dialogue afin de favoriser la reconnaissance de l’autre et la poursuite du bien commun n’a plus besoin de justifications. Enseigner la religion est donc une tâche tout à fait particulière qui nécessite d’une part une formation théologique afin d’utiliser au mieux les moyens didactiques et pédagogiques à disposition de celui qui enseigne. Cette filière forme des enseignants, animateurs et formateurs capables de concevoir, organiser et dispenser des enseignements religieux et catéchétiques adaptés à différents publics, en intégrant des approches pédagogiques modernes, les sciences humaines et la spiritualité.",
    objectives: [
      "Adapter les contenus pédagogiques à la connaissance des religions et de la foi.",
      "Procurer les principes méthodologiques nécessaires à la structuration et à l’organisation des apprentissages relatifs aux cours de religion, de morale, d’éducation à la citoyenneté et de philosophie.",
      "Acquérir une solide formation en théologie, Bible et spiritualité.",
      "Maîtriser les méthodes et outils pédagogiques pour l’enseignement religieux.",
      "Comprendre les dynamiques sociales et psychologiques influençant l’apprentissage religieux.",
      "Développer des compétences en communication et médiation dans des contextes éducatifs et pastoraux.",
      "Intégrer les technologies de l’information et de la communication (TIC) dans l’enseignement religieux."
    ],
    pedagogicalMethods: [
      "Cours magistraux et séminaires interactifs",
      "Ateliers pratiques et simulations pédagogiques",
      "Études de cas et projets pédagogiques",
      "Stages progressifs encadrés par des praticiens",
      "Travail personnel et mémoires professionnels"
    ],
    teachingTeam: [
      "Théologiens et biblistes : Licence, master ou doctorat en théologie, sciences religieuses ou études bibliques",
      "Psychologues et pédagogues : Spécialisés en pédagogie religieuse, psychologie de l’éducation et de la religion",
      "Sociologues et philosophes : Dynamiques familiales et communautaires, éthique et valeurs éducatives",
      "Praticiens pastoraux : Prêtres, religieux, laïcs expérimentés en animation pastorale et catéchèse",
      "Experts en TIC et communication : Intégration des outils numériques dans l’enseignement religieux"
    ],
    program: [
      {
        semester: "Année 1 (Semestres 1 & 2) : Fondements Théologiques, Éducation & Sciences Humaines",
        modules: [
          "Fondements théologiques de l'éducation chrétienne et mystères de la foi",
          "Psychologie du développement et de l'apprentissage chez l'enfant et l'adolescent",
          "Didactique générale et principes méthodologiques de l'enseignement religieux",
          "Éducation aux valeurs citoyennes, morale et philosophie de l'éducation",
          "Intégration des TIC et outils numériques dans la transmission religieuse",
          "Expression orale, techniques d'animation et dynamique de groupe"
        ]
      },
      {
        semester: "Année 2 (Semestres 3 & 4) : Didactique Spécialisée, Éthique & Médiation",
        modules: [
          "Didactique des cours de religion, morale et éducation à la vie, à l’amour et à l’intégrité (E.V.A.I.)",
          "Compréhension des dynamiques sociales et psychologiques influençant la foi des jeunes",
          "Compétences en communication, médiation et discernement éthique en milieu scolaire",
          "Création d'outils numériques d’animation pédagogique et d’évangélisation",
          "Dialogue interreligieux, œcuménisme, justice et promotion de la paix",
          "Stage progressif d'immersion pédagogique et d'observation en établissement catholique"
        ]
      },
      {
        semester: "Année 3 (Semestres 5 & 6) : Pratique Pédagogique Professionnelle & Mémoire",
        modules: [
          "Supervision pédagogique, docimologie et évaluation des apprentissages religieux",
          "Coordination de programmes éducatifs et pastoraux en milieu scolaire et paroissial",
          "Ateliers pratiques, simulations pédagogiques et études de cas éducatifs",
          "Stage professionnel pratique en pleine responsabilité de cours (1 trimestre)",
          "Rédaction du mémoire professionnel sous la direction d'un enseignant-chercheur",
          "Soutenance publique du mémoire de Licence Professionnelle devant jury"
        ]
      }
    ],
    careerProspects: [
      "Professeurs de Religions dans les lycées et collèges",
      "Professeurs de morale",
      "Professeurs d’éducation à la vie, à l’amour et à l’intégrité (E.V.A.I.)",
      "Animateurs et responsables de mouvements ou services éducatifs de l’Église",
      "Conseillers pédagogiques pour l’enseignement religieux",
      "Formateurs et accompagnateurs dans des écoles chrétiennes ou associations religieuses",
      "Responsables de programmes éducatifs et pastoraux dans les paroisses et diocèses",
      "Monteur d’outils numériques d’animation pédagogiques et d’évangélisation à travers les réseaux sociaux",
      "Agents de l’œcuménisme, de la justice et de la paix"
    ],
    requirements: [
      "Tout Baccalauréat secondaire ou GCE A/L",
      "Être inscrit dans le programme des Sciences Religieuses",
      "Lettre de motivation et dossier d'inscription complet (10 000 FCFA de frais de dossier)"
    ],
    tuition: {
      registrationFee: "10 000 FCFA (Frais de dossier)",
      annualTuition: "150 000 FCFA (Laïcs) / 765 000 FCFA (Religieux)",
      installments: "Payable en tranches trimestrielles"
    }
  },
  {
    id: "du-ingenierie-pastorale",
    slug: "du-ingenierie-pastorale",
    title: "Diplôme Universitaire (DU) en Ingénierie Pastorale",
    subtitle: "Conception, gestion et accompagnement de projets pastoraux, caritatifs et d'aumônerie",
    category: "professionnelle",
    duration: "2 ans",
    diploma: "Diplôme Universitaire (DU) d'Ingénierie Pastorale - UCAC / ISSR",
    targetAudience: "Aumôniers, coordinateurs de mouvements, agents pastoraux, diacres et laïcs engagés",
    modality: "Présentiel à Yaoundé (Mvolyé) ou En direct en ligne",
    description: "Une formation professionnalisante courte apportant les outils du management de projet, de l'accompagnement relationnel et de l'écoute spirituelle pour revitaliser l'action sur le terrain.",
    objectives: [
      "Diagnostiquer les besoins socioculturels et spirituels d'un milieu hospitalier, carcéral ou paroissial.",
      "Concevoir, budgétiser et piloter des projets d'aumônerie et d'entraide.",
      "Mobiliser et coordonner des équipes de bénévoles et d'acteurs de terrain."
    ],
    program: [
      {
        semester: "Année 1 : Diagnostic & Outils méthodologiques",
        modules: [
          "Sociologie des religions et dynamique des communautés chrétiennes",
          "Gestion de projets pastoraux (Cycle de projet et cadre logique)",
          "Écoute active, relation d'aide et accompagnement spirituel",
          "Communication pastorale et outils numériques"
        ]
      },
      {
        semester: "Année 2 : Ingénierie de terrain & Aumôneries",
        modules: [
          "Pastorale de la santé et aumônerie hospitalière",
          "Pastorale pénitentiaire et réinsertion sociale des détenus",
          "Recherche de financements et gestion de projets caritatifs (Caritas)",
          "Stage pratique obligatoire (3 mois) et rapport d'intervention de terrain"
        ]
      }
    ],
    careerProspects: [
      "Responsable d'aumônerie (hôpitaux, prisons, universités, aéroports)",
      "Coordinateur de projets caritatifs et diocésains",
      "Animateur de réseaux d'entraide et d'évangélisation"
    ],
    requirements: [
      "Baccalauréat secondaire ou expérience pastorale attestée",
      "Lettre de recommandation d'une paroisse ou communauté"
    ],
    tuition: {
      registrationFee: "25 000 FCFA",
      annualTuition: "280 000 FCFA",
      installments: "Échelonné en 3 paiements"
    }
  },
  {
    id: "du-pedagogie-religieuse",
    slug: "du-pedagogie-religieuse",
    title: "Diplôme Universitaire (DU) en Pédagogie Religieuse",
    subtitle: "Qualification pédagogique rapide pour l'enseignement de l'éducation religieuse",
    category: "professionnelle",
    duration: "2 ans",
    diploma: "Diplôme Universitaire (DU) d'Enseignant de Religion - UCAC / ISSR",
    targetAudience: "Enseignants en exercice, catéchistes certifiés, candidats à l'enseignement catholique",
    modality: "Présentiel et En direct en ligne",
    description: "Répond aux besoins immédiats des secrétariats à l'éducation catholique en dotant les futurs enseignants des méthodes interactives pour enseigner la foi aux jeunes générations.",
    objectives: [
      "Maîtriser la didactique de l'enseignement religieux en milieu pluraliste.",
      "Concevoir des séquences d'apprentissage interactives et motivantes pour la jeunesse.",
      "Articuler culture contemporaine, sciences humaines et éveil à la foi."
    ],
    program: [
      {
        semester: "Année 1 : Didactique & Psychologie de l'élève",
        modules: [
          "Psychologie de l'enfant et de l'adolescent",
          "Théories de l'apprentissage appliquées à l'enseignement religieux",
          "Éthique professionnelle de l'éducateur chrétien",
          "Culture biblique accessible pour les jeunes"
        ]
      },
      {
        semester: "Année 2 : Pratiques de classe & Stage scolaire",
        modules: [
          "Élaboration de fiches pédagogiques et techniques d'évaluation",
          "Gestion de classe et dialogue interreligieux en milieu scolaire",
          "Stage en établissement d'enseignement secondaire (Collège / Lycée)",
          "Soutenance du mémoire professionnel"
        ]
      }
    ],
    careerProspects: [
      "Professeur d'instruction religieuse et morale en collège",
      "Animateur en pastorale scolaire d'établissement",
      "Formateur diocésain de catéchistes"
    ],
    requirements: [
      "Baccalauréat secondaire ou niveau universitaire",
      "Intérêt avéré pour l'enseignement et l'éducation de la jeunesse"
    ],
    tuition: {
      registrationFee: "25 000 FCFA",
      annualTuition: "280 000 FCFA",
      installments: "Payable par tranches"
    }
  },
  {
    id: "certificat-leadership-gestion-oeuvres",
    slug: "certificat-universitaire-leadership-gestion-oeuvres",
    title: "Certificat Universitaire en Leadership & Gestion des Œuvres",
    subtitle: "Gouvernance évangélique, comptabilité, gestion financière et droit ecclésial (100% en ligne)",
    category: "certificat",
    duration: "6 mois (1ère session : 5 oct 2026 - 15 fév 2027 | 2e session : 1 fév - 30 juin 2027) + stage 2 mois",
    diploma: "Certificat Universitaire en Leadership et Gestion des Œuvres (UCAC / ISSR)",
    targetAudience: "Supérieurs majeurs, économes, gestionnaires de congrégations, prêtres administrateurs, laïcs gestionnaires",
    modality: "100% En Ligne (Cours du soir à 17h00)",
    description: "Programme de formation exécutive pour administrer avec compétence, rigueur et fidélité au droit canonique et civil les biens temporels, congrégations religieuses et œuvres sociales.",
    objectives: [
      "Affirmez votre leadership avec assurance et incarnez un management serviteur selon l'Évangile.",
      "Gérez une œuvre sociale ou ecclésiale avec des outils professionnels modernes.",
      "Planifiez et suivez rigoureusement vos budgets et maîtrisez vos finances.",
      "Montez des projets, mobilisez des financements nationaux/internationaux et pérennisez-les.",
      "Suivez la carrière de vos employés selon le droit camerounais du travail et l'OHADA."
    ],
    program: [
      {
        semester: "Session Fondamentale : Leadership & Gestion financière",
        modules: [
          "Leadership évangélique et discernement managérial",
          "Comptabilité générale et gestion budgétaire des œuvres",
          "Droit patrimonial canonique et droit local OHADA",
          "Management et gestion des ressources humaines"
        ]
      },
      {
        semester: "Session Stratégique : Projets, Financement & Stage",
        modules: [
          "Montage, exécution et évaluation de projets de développement",
          "Recherche de financements (fundraising) et pérennisation des œuvres",
          "Stage professionnel de 2 mois dans une œuvre ecclésiale",
          "Rapport d'expertise managériale et validation du Certificat"
        ]
      }
    ],
    careerProspects: [
      "Économe général(e), provincial(e) ou diocésain(e)",
      "Administrateur(trice) d'œuvres scolaires, sanitaires ou hospitalières",
      "Gestionnaire de projets pour organisations caritatives ou ONG confessionnelles",
      "Conseiller en audit et transparence financière ecclésiale"
    ],
    requirements: [
      "Responsabilité active dans une congrégation, diocèse ou œuvre",
      "Niveau Baccalauréat minimum ou expérience équivalente"
    ],
    tuition: {
      registrationFee: "Inclus dans la formule",
      annualTuition: "415 000 FCFA (Frais globaux de certification)",
      installments: "Payable en 2 versements (Début des cours : 5 Octobre 2026)"
    }
  },
  {
    id: "certificat-sciences-religieuses",
    slug: "certificat-universitaire-en-sciences-religieuses",
    title: "Certificat Universitaire en Sciences Religieuses",
    subtitle: "Formation théologique, doctrinale, spirituelle et humaine fondamentale pour laïcs et religieux",
    category: "certificat",
    duration: "1 an (Formule modulaire flexible en présentiel ou en ligne)",
    diploma: "Certificat Universitaire en Sciences Religieuses (UCAC / ISSR)",
    targetAudience: "Laïcs engagés dans les paroisses, mouvements d'action catholique, religieux(ses) en formation permanente",
    modality: "Cours du soir, cours du samedi ou 100% En Ligne synchrone",
    description: "Assure la formation théologique, spirituelle, doctrinale et humaine pour permettre aux chrétiens d'assumer avec assurance leurs engagements apostoliques et d'approfondir la foi de l'Église.",
    objectives: [
      "Acquérir les connaissances fondamentales en Écriture Sainte (Ancien et Nouveau Testament).",
      "Comprendre les dogmes catholiques et la liturgie de l'Église.",
      "Développer une solide formation morale et spirituelle pour agir dans le monde contemporain.",
      "Renforcer l'identité et le témoignage chrétien dans la famille et la profession."
    ],
    program: [
      {
        semester: "Module 1 : Écriture Sainte & Dogme",
        modules: [
          "Initiation à la lecture priante et critique de la Bible",
          "Le Credo et les grands mystères de la foi chrétienne",
          "Histoire du salut et théologie de la grâce"
        ]
      },
      {
        semester: "Module 2 : Morale, Liturgie & Mission",
        modules: [
          "Théologie morale et éthique de la vie quotidienne",
          "Sacrements et liturgie vivante",
          "Initiation à la prière et spiritualité chrétienne",
          "Témoignage chrétien et apostolat des laïcs en Afrique"
        ]
      }
    ],
    careerProspects: [
      "Responsable de commission paroissiale ou de communauté ecclésiale vivante (CEV)",
      "Animateur biblique et formateur en catéchèse paroissiale",
      "Accompagnateur spirituel de mouvements d'action catholique",
      "Passerelle directe vers le Baccalauréat canonique en Sciences Religieuses"
    ],
    requirements: [
      "Niveau secondaire ou supérieur",
      "Lettre de recommandation de son curé de paroisse ou supérieur(e)"
    ],
    tuition: {
      registrationFee: "10 000 FCFA",
      annualTuition: "150 000 FCFA (Formule modulaire annuelle)",
      installments: "Payable en 2 ou 3 tranches"
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
