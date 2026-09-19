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
    id: "sciences-religieuses-master-pastorale-gouvernance",
    slug: "master-theologie-pastorale-gouvernance-ecclesiale",
    title: "Master Sciences Religieuses : Pastorale & Gouvernance Ecclésiale",
    subtitle: "Management institutionnel, audit pastoral et direction d'œuvres d'Église (UCAC)",
    category: "canonique",
    duration: "2 ans (4 semestres)",
    diploma: "Master universitaire en Sciences Religieuses (UCAC)",
    targetAudience: "Supérieurs majeurs, vicaires épiscopaux, économes diocésains, directeurs d'institutions confessionnelles",
    modality: "Présentiel et Enseignement synchrone à distance",
    description: "Cycle d'excellence dédié à la modernisation de l'administration ecclésiale, à la gouvernance financière transparente et à la planification pastorale stratégique sur le continent africain.",
    objectives: [
      "Maîtriser les outils de la planification pastorale stratégique et participative.",
      "Auditer et optimiser les structures et finances des congrégations et diocèses.",
      "Articuler droit canonique, gouvernance moderne et leadership serviteur."
    ],
    program: [
      {
        semester: "Master 1 : Droit, Finances & Management pastoral",
        modules: [
          "Droit canonique des biens temporels et gestion des œuvres",
          "Comptabilité de gestion et contrôle interne ecclésial",
          "Sociologie des organisations religieuses",
          "Gestion des ressources humaines en pastorale"
        ]
      },
      {
        semester: "Master 2 : Stratégie & Conduite du changement",
        modules: [
          "Stratégie de viabilité financière des congrégations",
          "Communication institutionnelle et gestion de crise en milieu d'Église",
          "Stage de terrain en gouvernance institutionnelle",
          "Mémoire de Master professionnel et soutenance"
        ]
      }
    ],
    careerProspects: [
      "Secrétaire général de diocèse ou de conférence épiscopale",
      "Économe général(e) ou provincial(e) de congrégation religieuse",
      "Directeur d'hôpitaux, complexes scolaires ou universités catholiques",
      "Auditeur et conseiller en gouvernance d'œuvres ecclésiales"
    ],
    requirements: [
      "Licence ou Baccalauréat canonique avec responsabilité pastorale avérée",
      "Projet professionnel ou lettre de mission de la congrégation/diocèse"
    ],
    tuition: {
      registrationFee: "15 000 FCFA",
      annualTuition: "450 000 FCFA (Laïcs) / 850 000 FCFA (Prêtres & Religieux)",
      installments: "Échelonné en 3 tranches"
    }
  },
  {
    id: "licence-ingenierie-pastorale",
    slug: "licence-sciences-religieuses-option-ingenierie-pastorale",
    title: "Licence Sciences Religieuses — Option Ingénierie Pastorale",
    subtitle: "Théologie pastorale approfondie, conduite de projets et évangélisation numérique",
    category: "professionnelle",
    duration: "3 ans (Passerelle directe en 1 ou 2 ans pour diplômés)",
    diploma: "Licence en Sciences Religieuses (Option Ingénierie Pastorale) - UCAC / ISSR",
    targetAudience: "Laïcs engagés, agents pastoraux, aumôniers, animateurs de jeunesse, religieux(ses)",
    modality: "En ligne & Présentiel (Cours du jour dès 8h ou Cours du soir à 17h00)",
    description: "Programme de formation approfondie en théologie et gestion pastorale. Alliant sciences religieuses, méthodologie de gestion de projets, accompagnement de crise et communication numérique.",
    objectives: [
      "Établir et maturer votre foi en approfondissant la connaissance des mystères sacrés.",
      "Acquérir les compétences modernes en gestion de projets et recherche de fonds.",
      "Maîtriser la pastorale des jeunes et l'évangélisation sur les réseaux sociaux.",
      "Accompagner spirituellement et humainement les personnes en situation de vulnérabilité."
    ],
    program: [
      {
        semester: "Année 1 : Fondements théologiques & pastoral des jeunes",
        modules: [
          "Théologie fondamentale et mystère de l'Église",
          "Psychosociologie des jeunes et dynamiques d'adolescence",
          "Initiation à la gestion de projets ecclésiaux",
          "Outils numériques et réseaux au service de l'Évangile"
        ]
      },
      {
        semester: "Année 2 : Ingénierie de terrain & Relation d'aide",
        modules: [
          "Écoute active, relation d'aide et accompagnement spirituel",
          "Pastorale de la santé et aumôneries spécialisées",
          "Budgétisation et recherche de partenaires financiers",
          "Intervention pastorale en milieu de crise et réfugiés"
        ]
      },
      {
        semester: "Année 3 : Conduite de projets & Mémoire de Licence",
        modules: [
          "Pilotage et évaluation de projets pastoraux diocésains",
          "Éthique pastorale et protection des personnes vulnérables",
          "Stage professionnel obligatoire de 3 mois",
          "Rédaction et soutenance du mémoire professionnel"
        ]
      }
    ],
    careerProspects: [
      "Coordinateur de projets caritatifs et diocésains",
      "Responsable d'aumônerie (santé, milieu carcéral, universités)",
      "Animateur et conseiller de jeunesse en paroisses et mouvements",
      "Professionnel d'intervention auprès des réfugiés et de l'enfance en difficulté"
    ],
    requirements: [
      "Baccalauréat secondaire (ou GCE A/L), lettre de motivation",
      "Frais de dossier : 10 000 FCFA • Test d'entrée officiel"
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
    title: "Licence Sciences Religieuses — Option Pédagogie Religieuse",
    subtitle: "Devenez un acteur clé de l'éducation religieuse et de la formation des consciences",
    category: "professionnelle",
    duration: "3 ans (ou passerelle 1 an)",
    diploma: "Licence en Sciences Religieuses (Option Pédagogie Religieuse) - UCAC / ISSR",
    targetAudience: "Enseignants de religion, catéchistes, candidats à l'enseignement catholique, religieux éducateurs",
    modality: "En ligne & Présentiel (Cours du jour dès 8h ou Cours du soir à 17h00)",
    description: "Dispensant une didactique spécifique, cette licence prépare des professeurs et formateurs capables de structurer l'enseignement religieux en milieu scolaire et de former des consciences droites.",
    objectives: [
      "Éclairer votre foi, la maturer et être capable de la défendre face à la crise du monde actuel.",
      "Maîtriser la pédagogie en matière d'éducation aux valeurs citoyennes et morales.",
      "Éduquer en matière de psycho-affectivité des adolescents et discernement éthique.",
      "Concevoir et animer des curricula d'enseignement religieux interactifs et attrayants."
    ],
    program: [
      {
        semester: "Année 1 : Didactique générale & Sciences de l'éducation",
        modules: [
          "Fondements théologiques de l'éducation chrétienne",
          "Psychologie du développement de l'enfant et de l'adolescent",
          "Didactique de l'instruction religieuse en milieu pluriculturel",
          "Expression orale et animation catéchétique"
        ]
      },
      {
        semester: "Année 2 : Méthodes actives & Éthique de l'éducateur",
        modules: [
          "Conception de fiches pédagogiques et supports multimédias",
          "Éducation à la citoyenneté, justice et paix en milieu scolaire",
          "Accompagnement des adolescents en questionnement existentiel",
          "Stage d'immersion dans un collège d'enseignement catholique"
        ]
      },
      {
        semester: "Année 3 : Professionnalisation & Mémoire",
        modules: [
          "Supervision pédagogique et évaluation des apprentissages",
          "Gestion de pastorale scolaire d'établissement",
          "Stage en responsabilité pratique (1 trimestre)",
          "Soutenance du mémoire professionnel devant jury"
        ]
      }
    ],
    careerProspects: [
      "Professeur certifié d'instruction religieuse et morale en collège/lycée",
      "Animateur et coordonnateur en pastorale scolaire d'établissement",
      "Responsable diocésain de la catéchèse et formation des catéchistes",
      "Gestionnaire de projets éducatifs confessionnels"
    ],
    requirements: [
      "Tout Baccalauréat secondaire ou GCE A/L",
      "Lettre de motivation et dossier d'inscription (10 000 FCFA)",
      "Test d'entrée académique"
    ],
    tuition: {
      registrationFee: "10 000 FCFA",
      annualTuition: "150 000 FCFA (Laïcs) / 765 000 FCFA (Religieux)",
      installments: "Payable par tranches"
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
