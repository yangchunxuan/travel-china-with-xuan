import { getHomepagePrivateTourItems, type HomepagePrivateTourItem } from './homepagePrivateTourCatalog';
import { getHomepageGuideChapters, type HomepageGuideChapter } from './homepageEditorial';
import { buildPrivateTourDetailHref } from './privateTourInquiryContext';
import { getGermanTourCatalog } from './germanTourCatalog';

const tourAppeals: Readonly<Record<string, { appeal: string; alt: string }>> = {
  'beijing-xian-chengdu-guilin-shanghai-13-day-private-tour': {
    appeal: 'Große Mauer, Terrakotta-Armee, Pandas, Li-Fluss und Shanghai in einer dreizehntägigen Privatreise.',
    alt: 'Besucher auf der Großen Mauer bei Mutianyu',
  },
  'beijing-highlights-5-day-private-tour': {
    appeal: 'Drei Besichtigungstage für die Große Mauer bei Badaling und die Verbotene Stadt, vorbehaltlich bestätigter Reservierungen, mit Rückkehr in dasselbe Hotel jeden Abend.',
    alt: 'Die kaiserliche Achse und historische Bauwerke Pekings',
  },
  'suzhou-tongli-hangzhou-shanghai-12-day-private-tour': {
    appeal: 'Suzhous Gärten, eine Nacht in der Wasserstadt Tongli, Westsee und Teeplantagen, anschließend fünf Nächte für Shanghais Viertel und Museen.',
    alt: 'Westsee und bewaldete Hügel in Hangzhou',
  },
  'chengdu-pandas-sanxingdui-5-day-private-tour': {
    appeal: 'Pandas früh am Morgen, der Großteil eines Tages im Sanxingdui-Museum und Zeit für Tee im Volkspark, ohne Hotelwechsel in Chengdu.',
    alt: 'Ein Panda in Chengdus Forschungsstation',
  },
  'xian-terracotta-warriors-5-day-private-tour': {
    appeal: 'Xi’ans Stadtmauer entdecken, einen Tag für Terrakotta-Armee und Huaqing-Palast einplanen und anschließend Große Moschee und muslimisches Viertel mit Reiseleitung erkunden.',
    alt: 'Stadtmauer und historische Dächer von Xi’an',
  },
  'guilin-yangshuo-5-day-private-tour': {
    appeal: 'Auf dem Li-Fluss zwischen Karstbergen nach Yangshuo fahren, dort zwei Nächte verbringen und einen ganzen Tag für die Landschaft am Yulong-Fluss haben.',
    alt: 'Bambusflöße auf dem Yulong-Fluss am Fuß der Karstberge von Yangshuo',
  },
};

const serviceLabels: Readonly<Record<string, string>> = {
  'With hotels and breakfast': 'Hotels und Frühstück enthalten',
  'No on-site guide': 'Ohne Reiseleitung vor Ort',
  'Private tour': 'Privatreise',
};

/** Keep the original six routes, their order, photos, price basis and selection URLs. */
export function getGermanHomepageProducts(): readonly HomepagePrivateTourItem[] {
  const catalog = new Map(getGermanTourCatalog().map(tour => [tour.slug, tour]));
  return getHomepagePrivateTourItems('en').map(item => {
    const tour = catalog.get(item.id);
    const copy = tourAppeals[item.id];
    if (!tour || !copy) throw new Error(`Missing German homepage tour: ${item.id}`);
    const selectedPackage = tour.packages.find(option => option.id === item.startingPrice?.selection?.packageId);
    const startingRow = selectedPackage?.rows.find(row => row.travelers === item.startingPrice?.travelers);
    const twoTravellerRow = selectedPackage?.rows.find(row => row.travelers === 2);
    if (item.startingPrice && (!startingRow || !serviceLabels[item.startingPrice.serviceLabel])) {
      throw new Error(`Missing German homepage price or service label: ${item.id}`);
    }
    if (item.twoTravellerPrice && !twoTravellerRow) throw new Error(`Missing German couple price: ${item.id}`);
    return {
      ...item,
      title: tour.title,
      appeal: copy.appeal,
      href: item.startingPrice?.selection && !item.twoTravellerPrice
        ? buildPrivateTourDetailHref(tour.path, tour.slug, item.startingPrice.selection)
        : `/de${item.href}`,
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
  'is-your-china-itinerary-too-rushed': 'Ist Ihre China-Route zu voll geplant?',
  'china-regional-food-route': 'Chinas regionale Küchen entdecken: Wie plant man die Route?',
  'china-itinerary-with-older-parents': 'Mit älteren Eltern nach China: Welches Tempo passt?',
  'beijing-south-station-to-capital-or-daxing-airport': 'Vom Bahnhof Peking Süd zum Flughafen Daxing oder Capital',
  'guilin-airport-or-railway-station-arrival-guide': 'Ankunft in Guilin: Welcher Flughafen oder Bahnhof passt?',
  'shenzhen-airport-railway-station-border-port-selector': 'Ankunft in Shenzhen: Flughafen, Bahnhof oder Grenzübergang?',
  'zhangjiajie-city-or-wulingyuan-hotel-base': 'Wo übernachten: in Zhangjiajie-Stadt oder Wulingyuan?',
  'beijing-where-to-stay-first-trip': 'Zum ersten Mal in Peking: Welches Viertel wählen?',
  'yangshuo-town-or-yulong-river-where-to-stay': 'Yangshuo: nahe dem Zentrum oder am ländlichen Yulong übernachten?',
};

/** Articles remain in English, disclosed beside the search; never invent German article URLs. */
export function getGermanHomepageGuideChapters(): readonly HomepageGuideChapter[] {
  return getHomepageGuideChapters('en').map(chapter => ({
    ...chapter,
    guides: chapter.guides.map(guide => {
      const title = guideTitles[guide.id];
      if (!title) throw new Error(`Missing German homepage guide label: ${guide.id}`);
      return { ...guide, title, eyebrow: 'Praktische Reisetipps', linkLabel: 'Artikel auf Englisch lesen' };
    }),
  }));
}
