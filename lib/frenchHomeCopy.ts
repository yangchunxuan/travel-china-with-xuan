import { getHomegroundCopy, type HomegroundCopy } from './homegroundI18n';
import { getHomepageShowcaseCopy } from './homepageShowcaseI18n';
import { getHomepagePlanningDeskCopy, type HomepagePlanningDeskCopy } from './homepagePlanningDesk';
import type { HomepageProductShowcaseTemplateCopy } from '../components/HomepageProductShowcase';
import type { PlanningScopeCopy } from './homegroundPlanningScopeI18n';
import { frenchContactEdition } from './frenchContactEdition';

const original = getHomegroundCopy('en');

/** The original home layout reads these fields; intake still uses its established locale contract. */
export const frenchHomeCopy: HomegroundCopy = {
  ...original,
  htmlLang: 'fr', path: '/fr/', languageName: 'Français', languageShort: 'FR',
  skipLink: 'Aller au contenu',
  businessDescriptor: 'Agence de voyages en Chine',
  brandTagline: 'La Chine, à votre façon. À vos côtés.',
  schemaDescription: 'Homeground China est une agence de voyages en Chine spécialisée dans les voyages privés sur mesure : itinéraires, hébergements, réservations, transports et accompagnement local. Un guide francophone est proposé en supplément sur devis.',
  hero: {
    ...original.hero,
    eyebrow: 'Voyages privés et sur mesure en Chine',
    title: 'La Chine, à votre façon. À vos côtés.',
    socialImageAlt: 'Une tour d’angle de la Cité interdite de Pékin se reflète dans les douves',
  },
  guides: { ...original.guides, viewAllLabel: 'Tous nos conseils de voyage' },
  faq: {
    eyebrow: 'Vos questions', title: 'Quelques repères avant de partir.', intro: '',
    items: [
      {
        question: 'S’agit-il de voyages privés ou de départs en petit groupe ?',
        answer: 'La plupart de nos circuits sont privés : le guide et le véhicule sont réservés à vous et à vos compagnons de voyage. Les circuits indiqués « petit groupe » partent à dates fixes avec d’autres voyageurs. Certains voyages privés comprennent aussi des trains, des croisières ou des transports collectifs à l’intérieur des sites ; ces trajets sont précisés sur la page du circuit et dans la confirmation écrite. Le type de voyage, les prestations et le prix sont confirmés avant paiement. Nous ne vous intégrons jamais à un groupe partagé sans votre accord. Un guide francophone est proposé en supplément, sur devis et selon les disponibilités.',
      },
      {
        question: 'Que se passe-t-il après mon premier message ?',
        answer: 'Un conseiller commence par comprendre votre projet et les points sur lesquels vous souhaitez être accompagné. Si vous souhaitez poursuivre avec nous, nous confirmons les prestations, leur périmètre et leur prix avant tout travail payant.',
      },
      {
        question: 'Qui s’occupe des réservations et des prestations sur place ?',
        answer: 'Cela dépend de l’accompagnement choisi. Avant de commencer, nous précisons par écrit ce que Homeground prend en charge, les prestations assurées par nos partenaires locaux et les réservations qui restent à votre charge.',
      },
      {
        question: 'Pouvez-vous adapter le voyage aux enfants, aux parents âgés ou à une mobilité réduite ?',
        answer: 'Oui. Précisez-nous dès le départ vos besoins : temps de marche, escaliers, départs matinaux, répartition des chambres, alimentation ou pauses. Nous en tenons compte pour construire le parcours et organiser chaque journée.',
      },
      {
        question: 'Puis-je vous contacter si mon projet est encore vague ?',
        answer: 'Bien sûr. Indiquez-nous vos dates, le nombre de voyageurs et les villes déjà retenues, si vous en avez. La conversation nous permettra de préciser ensemble le reste du voyage.',
      },
      {
        question: 'Et si j’ai déjà réservé des vols, des hôtels ou une partie du voyage ?',
        answer: 'Vous n’avez pas besoin de tout reprendre. Nous construisons le reste du parcours autour de vos réservations confirmées et vous signalons les horaires incompatibles, les transferts difficiles ou les éléments à compléter.',
      },
      {
        question: 'Pouvez-vous m’aider pour une seule partie du voyage ?',
        answer: 'Oui. Vous pouvez nous confier l’ensemble du voyage ou seulement ce qui vous semble difficile à organiser : le choix des étapes, les correspondances, les lieux où séjourner ou une portion précise de l’itinéraire.',
      },
    ],
  },
};

export const frenchHomepageShowcaseCopy: ReturnType<typeof getHomepageShowcaseCopy> = {
  heroBody: 'Choisissez un itinéraire qui vous ressemble, puis adaptons-le à vos dates.',
  heroHeadline: {
    fixedLines: ['La Chine, à votre façon.'], joiner: ' ',
    phrases: ['À vos côtés.', 'Des étapes bien reliées.', 'Du temps pour voyager.', 'On s’occupe du reste.'],
  },
  heroPrimary: 'Comparer les circuits privés', heroSecondary: 'Parler de mon voyage',
  heroDestinationPrompt: 'Vous hésitez encore sur les étapes ?', heroDestinationAction: 'Découvrir les destinations (en anglais)',
  guidePaths: { listLabel: 'Conseils pour préparer votre voyage en Chine', items: [
    { id: 'stay', title: 'Choisir où séjourner' },
    { id: 'transport', title: 'Préparer son arrivée' },
    { id: 'plan', title: 'Trouver le bon rythme' },
  ] },
  planning: {
    eyebrow: 'Une équipe sur place, quand vous en avez besoin',
    title: 'Gardez ce qui est déjà prévu. Confiez-nous la suite.',
    body: 'Homeground est une agence de voyages en Chine spécialisée dans les voyages privés sur mesure. Conservez les vols ou les hôtels déjà réservés : nous pouvons organiser le reste du voyage ou vous aider sur une seule étape difficile à préparer.',
    teamAction: 'Rencontrer l’équipe Homeground',
  },
};

export const frenchHomepageProductCopy: HomepageProductShowcaseTemplateCopy = {
  eyebrow: 'Quelques voyages pour commencer',
  title: 'Des anciennes capitales aux rivières du Sud.',
  intro: 'Comparez les étapes et les tarifs, puis découvrez le voyage qui vous ressemble. Guide francophone en supplément sur devis.',
  countLabel: '{count} voyages', durationLabel: '{days} jours · {nights} nuits',
  productLabel: 'Circuit privé', startingPriceLabel: 'Tarif publié à partir de',
  quoteOnlyLabel: 'Sur devis', quoteOnlyNote: 'Selon vos dates et votre groupe',
  perPersonLabel: 'par personne', groupBasis: 'sur la base de {travelers} voyageurs',
  actionLabel: 'Découvrir ce voyage', hubActionLabel: 'Comparer tous les circuits en Chine',
  productListLabel: 'Circuits privés Homeground China',
};

export const frenchPlanningScopeCopy: PlanningScopeCopy = {
  htmlLang: 'fr',
  title: 'Un voyage en Chine, bien pensé de bout en bout.',
  titleLines: ['Un voyage en Chine, ', 'bien pensé de bout en bout.'],
  body: 'Nous organisons l’ordre des étapes, les quartiers où séjourner, les trajets entre les villes, les réservations et le rythme de chaque journée en fonction de vos dates, de vos envies et des personnes qui vous accompagnent.',
  values: ['Des étapes adaptées au temps disponible', 'Des déplacements qui s’enchaînent bien', 'Un rythme qui convient à votre groupe'],
  cta: 'Parler de mon voyage',
};

const originalDesk = getHomepagePlanningDeskCopy('en');
export const frenchHomepagePlanningCopy: HomepagePlanningDeskCopy = {
  ...originalDesk,
  contactPanelLabel: 'WhatsApp, Messenger ou e-mail',
  contactNoPayment: 'Aucun paiement pour nous contacter.',
  contactStart: {
    ...originalDesk.contactStart,
    ...frenchContactEdition.desk,
    whatsappEyebrow: 'En direct', whatsappTitle: 'Discuter sur WhatsApp',
    messengerLead: 'Vous préférez Facebook ?', emailEyebrow: 'Une seule information',
    emailSuccessTitle: 'Votre adresse e-mail est enregistrée.',
    emailSuccessBody: 'Un conseiller Homeground peut désormais vous répondre. Aucun détail d’itinéraire n’a été recueilli ici.',
    referenceLabel: 'Référence', emailFallbackAction: 'Nous écrire directement',
  },
};
