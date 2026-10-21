import { getHomepagePrivateTourItems, type HomepagePrivateTourItem } from './homepagePrivateTourCatalog';
import { getHomepageGuideChapters, type HomepageGuideChapter } from './homepageEditorial';
import { getFrenchTourCatalog } from './frenchTourCatalog';

const tourAppeals: Readonly<Record<string, { appeal: string; alt: string }>> = {
  'beijing-xian-chengdu-guilin-shanghai-13-day-private-tour': {
    appeal: 'La Grande Muraille, l’armée de terre cuite, les pandas, la rivière Li et Shanghai réunis en un circuit privé de treize jours.',
    alt: 'Des visiteurs sur la Grande Muraille à Mutianyu',
  },
  'beijing-highlights-5-day-private-tour': {
    appeal: 'Trois jours de visites pour découvrir la Grande Muraille à Badaling et la Cité interdite, sous réserve des réservations confirmées, avec retour au même hôtel chaque soir.',
    alt: 'L’axe impérial et les monuments historiques de Pékin',
  },
  'suzhou-tongli-hangzhou-shanghai-12-day-private-tour': {
    appeal: 'Les jardins de Suzhou, une nuit dans le bourg de Tongli traversé de canaux, le lac de l’Ouest et les plantations de thé, puis cinq nuits pour explorer les quartiers et les musées de Shanghai.',
    alt: 'Le lac de l’Ouest et les collines boisées de Hangzhou',
  },
  'chengdu-pandas-sanxingdui-5-day-private-tour': {
    appeal: 'Voir les pandas tôt le matin, consacrer l’essentiel d’une journée au musée de Sanxingdui et prendre le temps d’un thé au parc du Peuple, sans changer d’hôtel à Chengdu.',
    alt: 'Un panda au centre de recherche de Chengdu',
  },
  'xian-terracotta-warriors-5-day-private-tour': {
    appeal: 'Découvrir les remparts de Xi’an, consacrer une journée à l’armée de terre cuite et au palais Huaqing, puis parcourir la Grande Mosquée et le quartier musulman avec votre guide.',
    alt: 'Les remparts et les toits historiques de Xi’an',
  },
  'guilin-yangshuo-5-day-private-tour': {
    appeal: 'Descendre la rivière Li au milieu des reliefs karstiques jusqu’à Yangshuo, y passer deux nuits et garder une journée entière pour la campagne de la rivière Yulong.',
    alt: 'Des radeaux de bambou sur la rivière Yulong au pied des reliefs karstiques de Yangshuo',
  },
};

const serviceLabels: Readonly<Record<string, string>> = {
  'With hotels and breakfast': 'Hôtels et petits-déjeuners compris',
  'Self-guided · private driver & remote support': 'Sans guide sur place · chauffeur privé et assistance à distance',
  'Private tour': 'Circuit privé',
};

/** Keep the original six routes, their order, photos, price basis and selection URLs. */
export function getFrenchHomepageProducts(): readonly HomepagePrivateTourItem[] {
  const catalog = new Map(getFrenchTourCatalog().map(tour => [tour.slug, tour]));
  return getHomepagePrivateTourItems('en').map(item => {
    const tour = catalog.get(item.id);
    const copy = tourAppeals[item.id];
    if (!tour || !copy) throw new Error(`Missing French homepage tour: ${item.id}`);
    const selectedPackage = tour.packages.find(option => option.id === item.startingPrice?.selection?.packageId);
    const startingRow = selectedPackage?.rows.find(row => row.travelers === item.startingPrice?.travelers);
    const twoTravellerRow = selectedPackage?.rows.find(row => row.travelers === 2);
    if (item.startingPrice && (!startingRow || !serviceLabels[item.startingPrice.serviceLabel])) {
      throw new Error(`Missing French homepage price or service label: ${item.id}`);
    }
    if (item.twoTravellerPrice && !twoTravellerRow) throw new Error(`Missing French couple price: ${item.id}`);
    return {
      ...item,
      title: tour.title,
      appeal: copy.appeal,
      href: `/fr${item.href}`,
      image: { ...item.image, alt: copy.alt },
      startingPrice: item.startingPrice && startingRow ? {
        ...item.startingPrice,
        formatted: startingRow.formatted,
        serviceLabel: serviceLabels[item.startingPrice.serviceLabel],
      } : null,
      ...(item.twoTravellerPrice && twoTravellerRow ? { twoTravellerPrice: { formatted: twoTravellerRow.formatted } } : {}),
    };
  });
}

const guideTitles: Readonly<Record<string, string>> = {
  'is-your-china-itinerary-too-rushed': 'Votre itinéraire en Chine est-il trop chargé ?',
  'china-regional-food-route': 'Voyager au fil des cuisines régionales : comment construire son parcours ?',
  'china-itinerary-with-older-parents': 'Partir en Chine avec ses parents : quel rythme prévoir ?',
  'beijing-south-station-to-capital-or-daxing-airport': 'De la gare de Pékin-Sud à Daxing ou à l’aéroport de la Capitale',
  'guilin-airport-or-railway-station-arrival-guide': 'Arriver à Guilin : quel aéroport ou quelle gare choisir ?',
  'shenzhen-airport-railway-station-border-port-selector': 'Arriver à Shenzhen : aéroport, gare ou poste-frontière ?',
  'zhangjiajie-city-or-wulingyuan-hotel-base': 'Où séjourner : en ville à Zhangjiajie ou à Wulingyuan ?',
  'beijing-where-to-stay-first-trip': 'Premier séjour à Pékin : quel quartier choisir ?',
  'yangshuo-town-or-yulong-river-where-to-stay': 'Yangshuo : séjourner près du centre ou dans la campagne de la Yulong ?',
};

/** Untranslated articles remain in English; only use an existing French equivalent. */
export function getFrenchHomepageGuideChapters(): readonly HomepageGuideChapter[] {
  return getHomepageGuideChapters('en').map(chapter => ({
    ...chapter,
    guides: chapter.guides.map(guide => {
      const title = guideTitles[guide.id];
      if (!title) throw new Error(`Missing French homepage guide label: ${guide.id}`);
      if (guide.id === 'yangshuo-town-or-yulong-river-where-to-stay') return { ...guide, title, eyebrow: 'Conseils pratiques', href: '/fr/guides/yangshuo-town-or-yulong-river-where-to-stay/', linkLabel: 'Lire l’article en français' };
      return { ...guide, title, eyebrow: 'Conseils pratiques', linkLabel: 'Lire l’article en anglais' };
    }),
  }));
}
