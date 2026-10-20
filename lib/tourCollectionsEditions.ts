import type { TourCollectionEditionLocale } from "./tourCollections";
import type { TourCollectionsCopy } from "./tourCollectionsI18n";

/**
 * The French, Spanish, German and Arabic copies of the tour collections
 * (/xx/tours/multi-city/, /regions/, /seasonal/), translated from the English
 * page in lib/tourCollectionsI18n.ts and lib/northeastWinterComparison.ts.
 * Facts (lengths, seasons, dates, the number of routes) are the English ones.
 *
 * Tour names, routes, "best for" lines and prices are not here: each card and
 * table row reads them from that edition's own tour catalogue, the one its
 * /xx/tours/ page and tour pages show. The menu rows, service rows and region
 * names repeat that edition's header and catalogue word for word (a test holds
 * them together).
 */

type RegionId = "east" | "southwest" | "south" | "north" | "northeast" | "central";
export type TourCollectionEditionMenuId = "all-tours" | "multi-city" | "regions" | "seasonal";
export type TourCollectionEditionServiceId = "attraction-tickets" | "english-guides" | "private-car" | "trip-support";

interface EditionMenuEntry {
  readonly label: string;
  readonly description: string;
  readonly href: string;
}

/** The five winter routes with a published two-traveller price, as in lib/northeastWinterComparison.ts. */
export const tourCollectionWinterRouteSlugs = [
  "harbin-yabuli-snow-town-6-day-private-tour",
  "harbin-snow-town-changbaishan-yanji-8-day-private-tour",
  "harbin-mohe-arctic-village-7-day-private-tour",
  "harbin-snow-town-mohe-9-day-private-tour",
  "yanji-changbaishan-wanda-6-day-private-tour",
] as const;
type WinterRouteSlug = (typeof tourCollectionWinterRouteSlugs)[number];

export interface TourCollectionEditionCopy extends TourCollectionsCopy {
  readonly skipLink: string;
  readonly breadcrumbLabel: string;
  readonly home: string;
  /** The header's own name for the catalogue (/xx/tours/), the breadcrumb's middle step. */
  readonly tours: string;
  /** A tour card's call to action ("Itinerary & price"). */
  readonly tourAction: string;
  /** Region group names, as this edition's catalogue filter names them. */
  readonly regionLabels: Readonly<Record<RegionId, string>>;
  /** The header's Private Tours menu rows ("Browse another way" links them). */
  readonly tourMenu: Readonly<Record<TourCollectionEditionMenuId, EditionMenuEntry>>;
  /** The header's Services menu rows (the closing band lists them). */
  readonly serviceMenu: Readonly<Record<TourCollectionEditionServiceId, EditionMenuEntry>>;
  /** The price lines of a winter tour card, as this edition's catalogue cards word them. */
  readonly priceCopy: {
    readonly startingPriceLabel: string;
    readonly quoteOnlyLabel: string;
    readonly quoteOnlyBody: string;
    readonly partySize: (travelers: number) => string;
    readonly perPersonPriceNote: string;
  };
  readonly winter: {
    readonly title: string;
    readonly intro: string;
    readonly route: string;
    readonly nights: string;
    /** The catalogue's "who it suits" line, named as this edition's catalogue names it. */
    readonly fit: string;
    /** The catalogue's stay-and-pace line, named as this edition's catalogue names it. */
    readonly travel: string;
    readonly price: string;
    readonly priceBasis: string;
    readonly cardSeasonLabel: string;
    readonly priceNote: string;
    readonly routeNights: Readonly<Record<WinterRouteSlug, string>>;
  };
  /** Credits under a row of cards with openly licensed photos. */
  readonly photoCredits: {
    readonly photo: string;
    readonly photos: string;
    readonly edited: (count: number) => string;
    readonly colon: string;
    readonly comma: string;
  };
}

const nb = " ";

const french: TourCollectionEditionCopy = {
  skipLink: "Aller au contenu",
  breadcrumbLabel: "Fil d’Ariane",
  home: "Accueil",
  tours: "Circuits",
  tourAction: "Programme et prix",
  facts: (routes, min, max) => `${routes} itinéraires · ${min === max ? min : `${min} à ${max}`} jours`,
  groupMeta: (routes, min, max) => `${routes} ${routes === 1 ? "itinéraire" : "itinéraires"} · ${min === max ? min : `${min} à ${max}`} jours`,
  otherWays: "Explorer autrement",
  servicesTitle: `Aucun itinéraire ne vous convient${nb}?`,
  servicesLede: "Indiquez-nous la durée de votre voyage et vos villes, et nous l’organisons autour de vous. Ou réservez seulement vos billets d’entrée, ou seulement un guide.",
  collections: {
    "multi-city": {
      metadata: {
        title: `Circuits privés multi-villes en Chine${nb}: classiques par durée`,
        description: `Des itinéraires privés à travers plusieurs villes, classés par durée${nb}: jusqu’à 10 jours, de 11 à 14 jours, 15 jours ou plus, ainsi que quelques départs en petit groupe à dates fixes. Chacun a un programme et un prix publiés.`,
      },
      name: "D’une ville à l’autre",
      h1Lines: [`Les grands classiques${nb}:`, "plusieurs villes en un seul voyage."],
      lede: `Un premier itinéraire courant relie Pékin, Xi’an et Shanghai, puis ajoute Guilin, Chengdu, Zhangjiajie ou une croisière sur le Yangtsé selon les jours disponibles. Ils sont classés ci-dessous par durée${nb}; un circuit «${nb}en petit groupe${nb}» part à dates fixes avec d’autres voyageurs.`,
      groups: {
        "up-to-10": { title: "Jusqu’à 10 jours", note: `Trois villes, ou trois villes et Guilin${nb}; le plus court est une croisière de 6 jours entre Chongqing et les Trois Gorges.` },
        "11-to-14": { title: "De 11 à 14 jours", note: `Plus de nuits à chaque étape, ou une ou deux régions de plus${nb}: Zhangjiajie, Guilin, le Yunnan ou Huangshan.` },
        "15-plus": { title: "15 jours ou plus", note: "La Route de la soie, une croisière sur le Yangtsé ou une grande boucle du nord au sud." },
      },
    },
    regions: {
      metadata: {
        title: `Circuits privés dans une région de Chine${nb}: Est, Sud-Ouest, Sud et autres`,
        description: "Des itinéraires privés qui restent dans une seule région de Chine, de la Chine de l’Est au Sud-Ouest, au Sud, au Nord et Nord-Ouest, au Nord-Est et à la Chine centrale. Chacun a un programme et un prix publiés.",
      },
      name: "Une région à la fois",
      h1Lines: ["Une région,", "à un rythme tranquille."],
      lede: `Vous préférez ne pas changer de ville tous les deux jours${nb}? Choisissez une région. Les circuits sont classés ci-dessous par région${nb}; faites-en un seul, ou ajoutez-le avant ou après un itinéraire à travers plusieurs villes.`,
      groups: {},
    },
    seasonal: {
      metadata: {
        title: "Circuits privés d’hiver dans le Nord-Est de la Chine 2026–27",
        description: "Comparez cinq circuits privés d’hiver 2026–27 à prix publiés entre Harbin, Yabuli, Snow Town, Mohe, le mont Changbai et Yanji, ainsi qu’un itinéraire sur devis.",
      },
      name: "Cette saison",
      h1Lines: ["Circuits d’hiver dans le Nord-Est de la Chine", "pour 2026–27."],
      lede: "Choisissez entre les sites de glace de Harbin, le ski à Yabuli ou au mont Changbai, Snow Town ou le train de nuit vers Mohe. Comparez les nuits à l’hôtel et en train-couchettes, le rythme des trajets et les prix basse saison pour deux voyageurs avant d’ouvrir les conditions complètes de chaque itinéraire.",
      groups: { "winter-northeast": { title: "L’hiver dans le Nord-Est" } },
    },
  },
  regionLabels: { east: "Chine de l’Est", southwest: "Sud-Ouest", south: "Chine du Sud", north: "Nord et Nord-Ouest", northeast: "Nord-Est", central: "Chine centrale" },
  tourMenu: {
    "all-tours": { label: "Tous nos circuits", description: "Comparer les régions, les durées et les prix", href: "/fr/tours/" },
    "multi-city": { label: "D’une ville à l’autre", description: "Plusieurs grandes étapes dans un même voyage", href: "/fr/tours/multi-city/" },
    regions: { label: "Une région à la fois", description: "Chine de l’Est, du Sud-Ouest, du Sud et autres régions", href: "/fr/tours/regions/" },
    seasonal: { label: "Cette saison", description: "L’hiver dans le Nord-Est : Harbin et le mont Changbai", href: "/fr/tours/seasonal/" },
  },
  serviceMenu: {
    "attraction-tickets": { label: "Billets et réservations", description: "Vos billets, sans les démarches. Contactez-nous dès vos dates fixées.", href: "/fr/services/china-attraction-reservations/" },
    "english-guides": { label: "Guides anglophones privés", description: "Un guide à la journée dans quatre villes ; guide francophone en supplément", href: "/fr/services/private-english-speaking-guides/" },
    "private-car": { label: "Voiture avec chauffeur", description: "Transferts aéroport et journées en véhicule privé", href: "/fr/services/private-car-and-driver/" },
    "trip-support": { label: "Organisation du séjour", description: "Hôtels, transferts et coordination sur place", href: "/fr/services/full-trip-support/" },
  },
  priceCopy: {
    startingPriceLabel: "À partir de",
    quoteOnlyLabel: "Sur devis",
    quoteOnlyBody: "Selon les dates, les chambres et le groupe",
    partySize: (travelers) => `${travelers} voyageurs`,
    perPersonPriceNote: "Tarifs par personne",
  },
  winter: {
    title: "Comparer cinq itinéraires d’hiver 2026–27 à prix publiés dans le Nord-Est",
    intro: `Commencez par les nuits${nb}: les itinéraires Harbin–Snow Town et Yanji–Changbai se font entièrement à l’hôtel, tandis que les itinéraires vers Mohe comprennent deux nuits en couchette dure à bord du train.`,
    route: "Itinéraire",
    nights: "Nuits",
    fit: "Pour quel voyage ?",
    travel: "Hébergements et rythme",
    price: "Prix basse saison",
    priceBasis: "Par personne · 2 adultes",
    cardSeasonLabel: "basse saison",
    priceNote: "Prix par personne en basse saison pour deux adultes partageant une chambre, pour des départs du 10 novembre au 19 décembre 2026 ou du 15 février au 10 mars 2027. Les autres nombres de voyageurs, les enfants, les chambres individuelles et le total final sont confirmés par écrit avant paiement. L’autre itinéraire d’hiver de cette sélection, Changbaishan–Yanji, est sur devis.",
    routeNights: {
      "harbin-yabuli-snow-town-6-day-private-tour": "5 nuits à l’hôtel · sans train de nuit",
      "harbin-snow-town-changbaishan-yanji-8-day-private-tour": "7 nuits à l’hôtel · sans train de nuit",
      "harbin-mohe-arctic-village-7-day-private-tour": "4 nuits à l’hôtel + 2 nuits en couchette dure",
      "harbin-snow-town-mohe-9-day-private-tour": "6 nuits à l’hôtel + 2 nuits en couchette dure",
      "yanji-changbaishan-wanda-6-day-private-tour": "5 nuits à l’hôtel · sans train de nuit",
    },
  },
  photoCredits: {
    photo: "Photo",
    photos: "Photos",
    edited: (count) => (count === 1 ? "recadrée et redimensionnée" : "recadrées et redimensionnées"),
    colon: `${nb}: `,
    comma: ", ",
  },
};

const spanish: TourCollectionEditionCopy = {
  skipLink: "Saltar al contenido",
  breadcrumbLabel: "Ruta de navegación",
  home: "Inicio",
  tours: "Viajes",
  tourAction: "Itinerario y precio",
  facts: (routes, min, max) => `${routes} rutas · ${min === max ? min : `${min}–${max}`} días`,
  groupMeta: (routes, min, max) => `${routes} ${routes === 1 ? "ruta" : "rutas"} · ${min === max ? min : `${min}–${max}`} días`,
  otherWays: "Explora de otra manera",
  servicesTitle: "¿Ninguna ruta te encaja?",
  servicesLede: "Dinos cuántos días tienes y qué ciudades quieres ver, y organizamos el viaje a tu medida. O reserva solo las entradas, o solo un guía.",
  collections: {
    "multi-city": {
      metadata: {
        title: "Viajes privados por varias ciudades de China: clásicos por duración",
        description: "Rutas privadas por varias ciudades, ordenadas por duración: hasta 10 días, de 11 a 14 días y 15 días o más, además de algunos viajes en grupo reducido con fechas fijas. Cada una tiene un itinerario y un precio publicados.",
      },
      name: "Varias ciudades",
      h1Lines: ["Grandes clásicos:", "varias ciudades en un solo viaje."],
      lede: "Una primera ruta habitual une Pekín, Xi’an y Shanghái, y después añade Guilin, Chengdu, Zhangjiajie o un crucero por el Yangtsé según los días disponibles. Abajo están ordenadas por duración; un viaje «en grupo reducido» sale en fechas fijas con otros viajeros.",
      groups: {
        "up-to-10": { title: "Hasta 10 días", note: "Tres ciudades, o tres más Guilin; la más corta es un viaje de 6 días a Chongqing con crucero por las Tres Gargantas." },
        "11-to-14": { title: "De 11 a 14 días", note: "Más noches en cada etapa, o una o dos regiones más: Zhangjiajie, Guilin, Yunnan o Huangshan." },
        "15-plus": { title: "15 días o más", note: "La Ruta de la Seda, un crucero por el Yangtsé o una gran vuelta de norte a sur." },
      },
    },
    regions: {
      metadata: {
        title: "Viajes privados por una región de China: este, suroeste, sur y más",
        description: "Rutas privadas que no salen de una región de China: del este al suroeste, el sur, el norte y noroeste, el noreste y el centro del país. Cada una tiene un itinerario y un precio publicados.",
      },
      name: "Una región a fondo",
      h1Lines: ["Una región,", "sin prisas."],
      lede: "¿Prefieres no cambiar de ciudad cada dos días? Elige una región. Abajo están ordenadas por región; haz una por sí sola, o antes o después de una ruta por varias ciudades.",
      groups: {},
    },
    seasonal: {
      metadata: {
        title: "Viajes privados de invierno por el noreste de China 2026–27",
        description: "Compara cinco viajes privados de invierno 2026–27 con precio publicado por Harbin, Yabuli, Snow Town, Mohe, el monte Changbai y Yanji, además de una ruta con precio a consultar.",
      },
      name: "Viajes de temporada",
      h1Lines: ["Viajes de invierno por el noreste de China", "para 2026–27."],
      lede: "Elige entre los paisajes de hielo de Harbin, el esquí en Yabuli o en el monte Changbai, Snow Town o el tren nocturno a Mohe. Compara las noches de hotel y de tren con literas, el ritmo de los traslados y los precios de temporada baja para dos viajeros antes de abrir las condiciones completas de cada ruta.",
      groups: { "winter-northeast": { title: "Invierno en el noreste" } },
    },
  },
  regionLabels: { east: "Este de China", southwest: "Suroeste", south: "Sur de China", north: "Norte y noroeste", northeast: "Noreste", central: "China central" },
  tourMenu: {
    "all-tours": { label: "Todos los viajes", description: "Compara regiones, duración y precios", href: "/es/tours/" },
    "multi-city": { label: "Varias ciudades", description: "Grandes etapas de China en un mismo viaje", href: "/es/tours/multi-city/" },
    regions: { label: "Una región a fondo", description: "El este, el suroeste, el sur y otras regiones de China", href: "/es/tours/regions/" },
    seasonal: { label: "Viajes de temporada", description: "Invierno en el noreste: Harbin y la montaña Changbai", href: "/es/tours/seasonal/" },
  },
  serviceMenu: {
    "attraction-tickets": { label: "Entradas y reservas", description: "Reservamos tus entradas. Escríbenos en cuanto tengas fechas.", href: "/es/services/china-attraction-reservations/" },
    "english-guides": { label: "Guías privados en inglés", description: "Guías por días en cuatro ciudades; el español tiene suplemento", href: "/es/services/private-english-speaking-guides/" },
    "private-car": { label: "Vehículo con conductor", description: "Traslados de aeropuerto y recorridos en vehículo privado", href: "/es/services/private-car-and-driver/" },
    "trip-support": { label: "Organización del viaje", description: "Hoteles, traslados y coordinación durante el viaje", href: "/es/services/full-trip-support/" },
  },
  priceCopy: {
    startingPriceLabel: "Desde",
    quoteOnlyLabel: "A consultar",
    quoteOnlyBody: "Según fechas, habitaciones y grupo",
    partySize: (travelers) => `${travelers} viajeros`,
    perPersonPriceNote: "Precios por persona",
  },
  winter: {
    title: "Compara cinco rutas de invierno 2026–27 por el noreste con precio publicado",
    intro: "Empieza por cómo quieres dormir: las rutas Harbin–Snow Town y Yanji–Changbai son con hotel todas las noches, mientras que las rutas a Mohe incluyen dos noches en litera dura de tren.",
    route: "Ruta",
    nights: "Noches",
    fit: "¿Para quién es?",
    travel: "Alojamiento y ritmo",
    price: "Precio en temporada baja",
    priceBasis: "Por persona · 2 adultos",
    cardSeasonLabel: "temporada baja",
    priceNote: "Son precios por persona en temporada baja para dos adultos que comparten habitación, con salidas del 10 de noviembre al 19 de diciembre de 2026 o del 15 de febrero al 10 de marzo de 2027. Otros tamaños de grupo, niños, habitaciones individuales y el total final se confirman por escrito antes del pago. La otra ruta de invierno de esta selección, Changbaishan–Yanji, tiene precio a consultar.",
    routeNights: {
      "harbin-yabuli-snow-town-6-day-private-tour": "5 noches de hotel · sin tren nocturno",
      "harbin-snow-town-changbaishan-yanji-8-day-private-tour": "7 noches de hotel · sin tren nocturno",
      "harbin-mohe-arctic-village-7-day-private-tour": "4 noches de hotel + 2 noches en litera dura",
      "harbin-snow-town-mohe-9-day-private-tour": "6 noches de hotel + 2 noches en litera dura",
      "yanji-changbaishan-wanda-6-day-private-tour": "5 noches de hotel · sin tren nocturno",
    },
  },
  photoCredits: {
    photo: "Foto",
    photos: "Fotos",
    edited: (count) => (count === 1 ? "recortada y redimensionada" : "recortadas y redimensionadas"),
    colon: ": ",
    comma: ", ",
  },
};

const german: TourCollectionEditionCopy = {
  skipLink: "Zum Inhalt",
  breadcrumbLabel: "Seitennavigation",
  home: "Startseite",
  tours: "Reisen",
  tourAction: "Programm und Preis",
  facts: (routes, min, max) => `${routes} Routen · ${min === max ? min : `${min}–${max}`} Tage`,
  groupMeta: (routes, min, max) => `${routes} ${routes === 1 ? "Route" : "Routen"} · ${min === max ? min : `${min}–${max}`} Tage`,
  otherWays: "Auf andere Weise auswählen",
  servicesTitle: "Keine Route passt?",
  servicesLede: "Nennen Sie uns Ihre Reisetage und Städte, dann planen wir die Reise ganz auf Sie zugeschnitten. Oder buchen Sie nur Eintrittskarten oder nur eine Reiseleitung.",
  collections: {
    "multi-city": {
      metadata: {
        title: "Private Rundreisen durch mehrere Städte Chinas: Klassiker nach Reisedauer",
        description: "Private Routen durch mehrere Städte, nach Dauer geordnet: bis 10 Tage, 11 bis 14 Tage, 15 Tage oder mehr, dazu einige Kleingruppenreisen mit festen Terminen. Zu jeder Route gibt es ein veröffentlichtes Programm und einen veröffentlichten Preis.",
      },
      name: "Rundreisen",
      h1Lines: ["Klassische Rundreisen:", "mehrere Städte auf einer Reise."],
      lede: "Eine häufige erste Route verbindet Peking, Xi’an und Shanghai und ergänzt je nach verfügbaren Tagen Guilin, Chengdu, Zhangjiajie oder eine Jangtse-Kreuzfahrt. Unten sind die Reisen nach Dauer geordnet; eine Reise „in der Kleingruppe“ startet an festen Terminen mit anderen Reisenden.",
      groups: {
        "up-to-10": { title: "Bis 10 Tage", note: "Drei Städte oder drei Städte plus Guilin; die kürzeste ist eine 6-tägige Reise nach Chongqing mit Kreuzfahrt durch die Drei Schluchten." },
        "11-to-14": { title: "11 bis 14 Tage", note: "Mehr Nächte pro Station oder ein bis zwei weitere Regionen: Zhangjiajie, Guilin, Yunnan oder Huangshan." },
        "15-plus": { title: "15 Tage oder mehr", note: "Die Seidenstraße, eine Jangtse-Kreuzfahrt oder eine große Runde von Nord nach Süd." },
      },
    },
    regions: {
      metadata: {
        title: "Private Reisen in einer Region Chinas: Osten, Südwesten, Süden und mehr",
        description: "Private Routen, die in einer Region Chinas bleiben: von Ostchina über den Südwesten, den Süden, den Norden und Nordwesten und den Nordosten bis nach Zentralchina. Zu jeder Route gibt es ein veröffentlichtes Programm und einen veröffentlichten Preis.",
      },
      name: "Regionen",
      h1Lines: ["Eine Region,", "in ruhigem Tempo."],
      lede: "Sie möchten nicht alle zwei Tage die Stadt wechseln? Wählen Sie eine Region. Unten sind die Reisen nach Region geordnet; unternehmen Sie eine für sich oder vor oder nach einer Rundreise durch mehrere Städte.",
      groups: {},
    },
    seasonal: {
      metadata: {
        title: "Private Winterreisen in Nordostchina 2026–27",
        description: "Vergleichen Sie fünf private Winterreisen 2026–27 mit veröffentlichten Preisen durch Harbin, Yabuli, Snow Town, Mohe, den Changbai-Berg und Yanji, dazu eine Route mit Preis auf Anfrage.",
      },
      name: "Saisonreisen",
      h1Lines: ["Winterreisen in Nordostchina", "für 2026–27."],
      lede: "Wählen Sie zwischen den Eisattraktionen von Harbin, Skifahren in Yabuli oder am Changbai-Berg, Snow Town oder dem Nachtzug nach Mohe. Vergleichen Sie Hotel- und Schlafwagennächte, Reisetempo und Nebensaisonpreise für zwei Reisende, bevor Sie die vollständigen Bedingungen der einzelnen Routen öffnen.",
      groups: { "winter-northeast": { title: "Winter im Nordosten" } },
    },
  },
  regionLabels: { east: "Ostchina", southwest: "Südwestchina", south: "Südchina", north: "Nord- und Nordwestchina", northeast: "Nordostchina", central: "Zentralchina" },
  tourMenu: {
    "all-tours": { label: "Alle Reisen", description: "Regionen, Reisedauer und Preise vergleichen", href: "/de/tours/" },
    "multi-city": { label: "Rundreisen", description: "Mehrere große Reiseziele in einer Reise verbinden", href: "/de/tours/multi-city/" },
    regions: { label: "Regionen", description: "Ostchina, Südwestchina, Südchina und weitere Regionen", href: "/de/tours/regions/" },
    seasonal: { label: "Saisonreisen", description: "Winter im Nordosten: Harbin und das Changbai-Gebirge", href: "/de/tours/seasonal/" },
  },
  serviceMenu: {
    "attraction-tickets": { label: "Tickets und Reservierungen", description: "Wir buchen Ihre Tickets. Melden Sie sich, sobald Ihre Termine feststehen.", href: "/de/services/china-attraction-reservations/" },
    "english-guides": { label: "Private englischsprachige Reiseleitung", description: "Private Tagesführungen auf Englisch in vier Städten", href: "/de/services/private-english-speaking-guides/" },
    "private-car": { label: "Privatwagen mit Fahrer", description: "Flughafentransfers und Tagesfahrten im Privatwagen", href: "/de/services/private-car-and-driver/" },
    "trip-support": { label: "Reiseorganisation", description: "Hotels, Transfers und Koordination vor Ort", href: "/de/services/full-trip-support/" },
  },
  priceCopy: {
    startingPriceLabel: "Ab",
    quoteOnlyLabel: "Auf Anfrage",
    quoteOnlyBody: "Je nach Datum, Zimmern und Reisegruppe",
    partySize: (travelers) => `${travelers} Reisende`,
    perPersonPriceNote: "Preise pro Person",
  },
  winter: {
    title: "Fünf Winterrouten 2026–27 im Nordosten mit veröffentlichtem Preis im Vergleich",
    intro: "Beginnen Sie mit den Übernachtungen: Auf den Routen Harbin–Snow Town und Yanji–Changbai übernachten Sie durchgehend im Hotel, die Mohe-Routen umfassen zwei Nächte auf Hard-Sleeper-Liegen im Zug.",
    route: "Route",
    nights: "Übernachtungen",
    fit: "Für wen geeignet?",
    travel: "Unterkünfte und Tempo",
    price: "Nebensaisonpreis",
    priceBasis: "Pro Person · 2 Erwachsene",
    cardSeasonLabel: "Nebensaison",
    priceNote: "Dies sind Nebensaisonpreise pro Person für zwei Erwachsene im gemeinsamen Zimmer bei Reisebeginn zwischen dem 10. November und dem 19. Dezember 2026 oder zwischen dem 15. Februar und dem 10. März 2027. Andere Gruppengrößen, Kinder, Einzelzimmer und der endgültige Gesamtpreis werden vor der Zahlung schriftlich bestätigt. Für die separate Winterroute Changbaishan–Yanji in dieser Auswahl erstellen wir ein Angebot auf Anfrage.",
    routeNights: {
      "harbin-yabuli-snow-town-6-day-private-tour": "5 Hotelnächte · kein Nachtzug",
      "harbin-snow-town-changbaishan-yanji-8-day-private-tour": "7 Hotelnächte · kein Nachtzug",
      "harbin-mohe-arctic-village-7-day-private-tour": "4 Hotelnächte + 2 Nächte auf Hard-Sleeper-Liegen",
      "harbin-snow-town-mohe-9-day-private-tour": "6 Hotelnächte + 2 Nächte auf Hard-Sleeper-Liegen",
      "yanji-changbaishan-wanda-6-day-private-tour": "5 Hotelnächte · kein Nachtzug",
    },
  },
  photoCredits: {
    photo: "Foto",
    photos: "Fotos",
    edited: () => "zugeschnitten und skaliert",
    colon: ": ",
    comma: ", ",
  },
};

const arabic: TourCollectionEditionCopy = {
  skipLink: "انتقل إلى المحتوى",
  breadcrumbLabel: "التنقّل بين الصفحات",
  home: "الرئيسية",
  tours: "الرحلات",
  tourAction: "البرنامج والسعر",
  facts: (routes, min, max) => `المسارات: ${routes} · الأيام: ${min === max ? min : `من ${min} إلى ${max}`}`,
  groupMeta: (routes, min, max) => `المسارات: ${routes} · الأيام: ${min === max ? min : `من ${min} إلى ${max}`}`,
  otherWays: "تصفّح بطريقة أخرى",
  servicesTitle: "لا يناسبك أي مسار؟",
  servicesLede: "أخبرنا بعدد أيامك والمدن التي تريدها، وسنخطط الرحلة بما يناسبك. أو احجز تذاكر المعالم فقط، أو مرشدًا فقط.",
  collections: {
    "multi-city": {
      metadata: {
        title: "رحلات خاصة متعددة المدن في الصين: مسارات كلاسيكية حسب المدة",
        description: "مسارات خاصة عبر عدة مدن، مرتبة حسب المدة: حتى 10 أيام، ومن 11 إلى 14 يومًا، و15 يومًا أو أكثر، إضافة إلى بعض رحلات المجموعات الصغيرة بمواعيد ثابتة. لكل منها برنامج منشور وسعر منشور.",
      },
      name: "رحلات متعددة المدن",
      h1Lines: ["الرحلات الكلاسيكية:", "عدة مدن في رحلة واحدة."],
      lede: "يربط مسار أول شائع بين بكين وشيآن وشنغهاي، ثم يضيف غويلين أو تشنغدو أو تشانغجياجيه أو رحلة نهرية على اليانغتسي بحسب عدد الأيام. رتّبنا المسارات أدناه حسب المدة؛ والرحلة «ضمن مجموعة صغيرة» تنطلق في مواعيد ثابتة مع مسافرين آخرين.",
      groups: {
        "up-to-10": { title: "حتى 10 أيام", note: "ثلاث مدن، أو ثلاث مدن مع غويلين؛ وأقصرها رحلة لمدة 6 أيام إلى تشونغتشينغ مع رحلة نهرية في المضائق الثلاثة." },
        "11-to-14": { title: "من 11 إلى 14 يومًا", note: "ليالٍ أكثر في كل محطة، أو منطقة أو منطقتان إضافيتان: تشانغجياجيه أو غويلين أو يونان أو هوانغشان." },
        "15-plus": { title: "15 يومًا أو أكثر", note: "طريق الحرير، أو رحلة نهرية على اليانغتسي، أو جولة طويلة من الشمال إلى الجنوب." },
      },
    },
    regions: {
      metadata: {
        title: "رحلات خاصة في منطقة واحدة من الصين: الشرق والجنوب الغربي والجنوب وغيرها",
        description: "مسارات خاصة تبقى في منطقة واحدة من الصين: من شرق الصين إلى الجنوب الغربي والجنوب والشمال والشمال الغربي والشمال الشرقي ووسط الصين. لكل منها برنامج منشور وسعر منشور.",
      },
      name: "المناطق",
      h1Lines: ["منطقة واحدة،", "بوتيرة هادئة."],
      lede: "لا تريد تغيير المدينة كل يومين؟ اختر منطقة واحدة. رتّبنا الرحلات أدناه حسب المنطقة؛ يمكنك القيام بإحداها وحدها، أو قبل مسار متعدد المدن أو بعده.",
      groups: {},
    },
    seasonal: {
      metadata: {
        title: "رحلات شتوية خاصة في شمال شرق الصين 2026–2027",
        description: "قارن خمس رحلات شتوية خاصة لموسم 2026–2027 بأسعار منشورة عبر هاربين ويابولي وبلدة الثلج وموخه وجبل تشانغباي ويانجي، إضافة إلى مسار واحد حسب عرض السعر.",
      },
      name: "الرحلات الموسمية",
      h1Lines: ["رحلات الشتاء في شمال شرق الصين", "لموسم 2026–2027."],
      lede: "اختر بين معالم الجليد في هاربين، أو التزلج في يابولي أو جبل تشانغباي، أو بلدة الثلج، أو قطار الليل إلى موخه. قارن ليالي الفندق وليالي قطار النوم، ووتيرة التنقل، وأسعار الموسم المنخفض لمسافرَين اثنين قبل فتح الشروط الكاملة لكل مسار.",
      groups: { "winter-northeast": { title: "الشتاء في الشمال الشرقي" } },
    },
  },
  regionLabels: { east: "شرق الصين", southwest: "جنوب غرب الصين", south: "جنوب الصين", north: "شمال الصين وشمال غربها", northeast: "شمال شرق الصين", central: "وسط الصين" },
  tourMenu: {
    "all-tours": { label: "جميع الرحلات", description: "قارن المناطق والمدة والأسعار", href: "/ar/tours/" },
    "multi-city": { label: "رحلات متعددة المدن", description: "اجمع بين وجهات رئيسية في رحلة واحدة", href: "/ar/tours/multi-city/" },
    regions: { label: "المناطق", description: "شرق الصين وجنوبها الغربي وجنوبها ومناطق أخرى", href: "/ar/tours/regions/" },
    seasonal: { label: "الرحلات الموسمية", description: "شتاء الشمال الشرقي: هاربين وجبال تشانغباي", href: "/ar/tours/seasonal/" },
  },
  serviceMenu: {
    "attraction-tickets": { label: "التذاكر والحجوزات", description: "نتولى حجز تذاكرك. راسلنا فور تحديد مواعيدك.", href: "/ar/services/china-attraction-reservations/" },
    "english-guides": { label: "مرشد خاص باللغة الإنجليزية", description: "جولات يومية خاصة بالإنجليزية في أربع مدن", href: "/ar/services/private-english-speaking-guides/" },
    "private-car": { label: "سيارة خاصة مع سائق", description: "انتقالات المطار والرحلات اليومية بسيارة خاصة", href: "/ar/services/private-car-and-driver/" },
    "trip-support": { label: "تنظيم الرحلة", description: "الإقامة والانتقالات والتنسيق المحلي", href: "/ar/services/full-trip-support/" },
  },
  priceCopy: {
    startingPriceLabel: "ابتداءً من",
    quoteOnlyLabel: "حسب عرض السعر",
    quoteOnlyBody: "بحسب المواعيد والغرف والمجموعة",
    partySize: (travelers) => `${travelers} مسافرين`,
    perPersonPriceNote: "الأسعار لكل شخص",
  },
  winter: {
    title: "قارن خمسة مسارات شتوية لموسم 2026–2027 في الشمال الشرقي بأسعار منشورة",
    intro: "ابدأ بخطة المبيت: مسارا هاربين–بلدة الثلج ويانجي–تشانغباي يعتمدان على الفنادق طوال الرحلة، بينما تتضمن مسارات موخه ليلتين على أسرّة Hard Sleeper في القطار.",
    route: "المسار",
    nights: "خطة المبيت",
    fit: "لمن تناسب هذه الرحلة؟",
    travel: "الإقامة ووتيرة السفر",
    price: "سعر الموسم المنخفض",
    priceBasis: "للشخص · بالغان اثنان",
    cardSeasonLabel: "الموسم المنخفض",
    priceNote: "هذه أسعار للشخص في الموسم المنخفض لبالغَين يتشاركان غرفة واحدة، للانطلاق من 10 نوفمبر إلى 19 ديسمبر 2026 أو من 15 فبراير إلى 10 مارس 2027. نؤكد كتابيًا قبل الدفع أسعار أعداد المسافرين الأخرى والأطفال والغرف الفردية والسعر الإجمالي النهائي. أما مسار تشانغبايشان–يانجي الشتوي الآخر ضمن هذه المجموعة فسعره حسب عرض السعر.",
    routeNights: {
      "harbin-yabuli-snow-town-6-day-private-tour": "5 ليالٍ في الفندق · دون قطار نوم",
      "harbin-snow-town-changbaishan-yanji-8-day-private-tour": "7 ليالٍ في الفندق · دون قطار نوم",
      "harbin-mohe-arctic-village-7-day-private-tour": "4 ليالٍ في الفندق + ليلتان في قطار النوم (Hard Sleeper)",
      "harbin-snow-town-mohe-9-day-private-tour": "6 ليالٍ في الفندق + ليلتان في قطار النوم (Hard Sleeper)",
      "yanji-changbaishan-wanda-6-day-private-tour": "5 ليالٍ في الفندق · دون قطار نوم",
    },
  },
  photoCredits: {
    photo: "صورة",
    photos: "الصور",
    edited: () => "بعد الاقتصاص وتغيير الحجم",
    colon: ": ",
    comma: "، ",
  },
};

const copy: Record<TourCollectionEditionLocale, TourCollectionEditionCopy> = { fr: french, es: spanish, de: german, ar: arabic };

export function getTourCollectionEditionCopy(edition: TourCollectionEditionLocale): TourCollectionEditionCopy {
  return copy[edition];
}
