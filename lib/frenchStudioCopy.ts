import { getHomegroundStudioCopy, type HomegroundStudioCopy } from './homegroundStudioI18n';
import { frenchGuideLanguageNote } from './frenchSite';

const original = getHomegroundStudioCopy('en');
const members: Record<string, Omit<HomegroundStudioCopy['members'][number], 'image'> & { alt: string }> = {
  evan: {
    id: 'evan', name: 'Evan', role: 'Responsable des voyages et de la coordination interculturelle',
    value: 'Transformer les incertitudes d’un premier voyage en Chine en choix clairs, que l’on peut discuter ensemble.',
    bio: 'Diplômé de l’université Sogang en Corée, Evan a également vécu à Taïwan, en Thaïlande et en Malaisie. Cette expérience l’aide à comprendre les questions que se posent les voyageurs étrangers avant un premier séjour en Chine : quelles villes garder, les transferts sont-ils réalistes, la communication sera-t-elle facile ? Il définit les grandes lignes du voyage et explique les choix complexes en anglais ou en coréen.',
    tags: ['Anglais', 'Coréen', 'Échanges interculturels', 'Voyages entre plusieurs villes'], alt: 'Evan en train de lire dans une librairie',
  },
  yoyo: {
    id: 'yoyo', name: 'Yoyo', role: 'Conception des itinéraires et coordination des détails',
    value: 'Relier vos envies, même encore éparses, pour construire un parcours cohérent.',
    bio: 'Sa formation en comptabilité a donné à Yoyo le goût des choses bien structurées. Elle transforme les premières idées en itinéraires réalisables, en vérifiant le nombre de nuits, les correspondances entre les villes et les détails faciles à oublier. Son expérience auprès des voyageurs, notamment à Pékin, l’amène toujours à se demander si le programme convient réellement aux personnes qui vont le suivre.',
    tags: ['Construction du parcours', 'Répartition des nuits', 'Vérification des détails', 'Liaisons entre les villes'], alt: 'Yoyo au bord d’un lac de montagne pendant un voyage en Chine',
  },
  tantan: {
    id: 'tantan', name: 'Tantan', role: 'Conception des voyages et coordination dans le Hunan',
    value: 'Faire entrer la réalité du terrain dans chaque itinéraire autour de Zhangjiajie.',
    bio: 'Tantan partage son travail entre la préparation des voyages et leur coordination dans le Hunan, notamment à Zhangjiajie, Changsha et Fenghuang. Elle sait qu’un trajet apparemment simple sur le papier peut se compliquer avec les temps de route, les files d’attente et la météo. Son rôle est de vérifier que le programme fonctionne aussi une fois sur place.',
    tags: ['Zhangjiajie', 'Changsha', 'Fenghuang', 'Coordination dans le Hunan'], alt: 'Tantan souriant près d’un éléphant lors d’un voyage en Thaïlande',
  },
  kevin: {
    id: 'kevin', name: 'Kevin', role: 'Conception des voyages et organisation sur place',
    value: 'Repérer les problèmes de coordination avant qu’ils ne perturbent une journée de voyage.',
    bio: 'Kevin a étudié l’anglais et commencé à travailler comme guide local et dans l’organisation de voyages pendant ses études. Il a ainsi acquis environ quatre ans d’expérience pratique. De l’arrivée aux transferts en ville, de la communication avec les voyageurs au déroulement du séjour, il connaît les différentes étapes. Il repère les étapes où la coordination entre les intervenants demande une attention particulière et veille à ce qu’un programme séduisant reste réalisable à l’arrivée.',
    tags: ['Assistance en anglais', 'Organisation locale', 'Suivi des opérations', 'Vérification du déroulement'], alt: 'Kevin devant la mosquée Putra lors d’un voyage en Malaisie',
  },
  vivi: {
    id: 'vivi', name: 'Vivi', role: 'Relation voyageurs et coordination locale',
    value: 'Faire en sorte que chaque voyageur se sente écouté, informé et accompagné.',
    bio: 'Vivi apporte son expérience de l’accueil sur place et une manière chaleureuse de communiquer. Au-delà de la liste des visites, elle veille aux réponses données à temps, à la clarté des relais entre les équipes et à la prise en compte des demandes des voyageurs. Elle participe aux échanges et à la coordination locale, en apportant une attention personnelle aux aspects pratiques du séjour.',
    tags: ['Échanges avec les voyageurs', 'Coordination locale', 'Relais entre les équipes', 'Assistance pendant le séjour'], alt: 'Vivi faisant une pause autour d’une boisson pendant un voyage',
  },
};

export const frenchStudioCopy: HomegroundStudioCopy = {
  path: '/fr/studio/',
  metadata: { title: 'Comment Homeground prépare votre voyage en Chine', description: 'Vos dates, vos envies et vos réservations deviennent un itinéraire cohérent, avec des prestations définies par écrit et une équipe locale à vos côtés.', openGraphTitle: 'Comment Homeground prépare un voyage en Chine' },
  eyebrow: 'Comment nous préparons votre voyage',
  title: 'De votre projet à un voyage qui tient la route.',
  intro: 'Dites-nous ce qui est déjà fixé, ce qui compte pour vous et ce qui reste à décider. Un conseiller principal construit un itinéraire cohérent, vérifie qu’il fonctionne sur place et précise le travail à réaliser avant toute prestation payante.',
  overview: {
    title: 'Du premier échange au programme écrit',
    stages: [
      { label: '01 / Votre projet', title: 'Partir de votre situation', detail: 'Dates, voyageurs, incontournables, rythme, mobilité, réservations déjà faites et questions encore ouvertes.' },
      { label: '02 / Notre travail', title: 'Écouter, vérifier, puis préciser par écrit', detail: 'Un conseiller vérifie ce qui s’enchaîne bien, ce qui pose problème et les décisions à prendre en premier.' },
      { label: '03 / Votre programme', title: 'Une organisation et des prestations précises', detail: 'Vous recevez le document convenu pour votre voyage, avec les services définis ensemble, plutôt qu’une liste générale de lieux à voir.' },
    ],
    termsLabel: '04 / Le calendrier', termsTitle: 'Convenir du délai avant de commencer une prestation payante',
    terms: [{ label: 'Délai', value: 'Date de remise du document convenu confirmée avant paiement' }],
  },
  collageLabel: 'Cinq membres de l’équipe Homeground China', peopleEyebrow: 'Qui s’occupe de quoi',
  peopleTitle: 'Des expériences différentes, un voyage construit ensemble.',
  peopleIntro: 'Votre conseiller principal reste le fil conducteur de vos échanges. Selon les besoins du voyage, le reste de l’équipe apporte sa connaissance des itinéraires, des destinations, de l’organisation sur place et de l’accueil des voyageurs.',
  peopleDetailsLabel: 'Son parcours et son expérience',
  proof: { label: 'Homeground en quelques chiffres', people: 'personnes dans l’équipe Homeground', guides: 'guides pratiques publiés en anglais', tours: 'circuits publiés', languages: 'éditions linguistiques du site' },
  members: original.members.map(member => {
    const { alt, ...text } = members[member.id];
    return { ...text, image: { ...member.image, alt } };
  }),
  trust: {
    eyebrow: 'Notre méthode', title: 'Ce qui se passe après votre premier message.',
    body: 'Vous gardez un interlocuteur principal qui connaît l’ensemble du voyage. Votre confirmation de voyage précise ce que Homeground organise et l’assistance incluse pendant le séjour.',
    inputsTitle: 'Ce que vous nous envoyez',
    inputs: ['Les dates et les lieux d’arrivée et de départ', 'Les voyageurs, le rythme souhaité, les besoins liés à la mobilité et à la répartition des chambres', 'Les lieux incontournables et les étapes auxquelles vous pourriez renoncer', 'Les réservations déjà faites, une indication de budget et les décisions à prendre avant une date précise'],
    stepsTitle: 'Ce que nous faisons',
    points: [
      { title: 'Comprendre votre projet', detail: 'Nous distinguons ce qui est fixé, ce qui reste flexible et les informations manquantes qui peuvent changer le parcours.' },
      { title: 'Vérifier le voyage dans son ensemble', detail: 'Ordre des villes, nuits, transferts, rythme et contraintes locales sont étudiés ensemble, pour que les étapes s’enchaînent.' },
      { title: 'Confirmer avant toute prestation payante', detail: 'Nous précisons le service adapté, les prestations prévues, le devis et les prochaines étapes par écrit.' },
    ],
    deliverablesTitle: 'Ce que vous recevez',
    deliverables: ['Pour un accompagnement complet : un document propre à votre voyage, précisant la préparation, les réservations et l’assistance sur place', 'Les hypothèses retenues, les compromis à envisager et les prochaines décisions pour le service convenu'],
    boundary: `La première demande de circuit privé est gratuite. Nous confirmons l’organisation du voyage, les prestations incluses et le devis pour vos dates et votre groupe avant réservation. ${frenchGuideLanguageNote}`,
  },
  cta: { label: 'La prochaine étape', title: 'Quels lieux ne voulez-vous surtout pas manquer ?', body: 'Écrivez-nous sur WhatsApp ou laissez votre adresse e-mail. Un conseiller vous aide à préciser les points encore ouverts et la prochaine étape. Les prestations payantes ne commencent qu’après accord sur leur contenu, leur prix et leur délai.', button: 'Parler de mon voyage avec un conseiller', secondaryButton: 'Découvrir tous les services' },
  homeLink: 'Rencontrer l’équipe qui prépare votre voyage',
};
