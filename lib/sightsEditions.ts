import { arabicSightsCopy } from "./arabicSightsCopy.ts";
import { germanSightsCopy } from "./germanSightsCopy.ts";
import { japaneseSightsCopy } from "./japaneseSightsCopy.ts";
import type { SightCityId } from "./sights";
import type { SightsCopy } from "./sightsI18n";

/**
 * Must-See Sights in the French, Spanish, German, Arabic and Japanese
 * editions: the same words as lib/sightsI18n.ts, translated from the English,
 * plus the city names and the alt text of the sights' own photos, which the
 * English, Chinese and Korean versions take from shared data. French and
 * Spanish are here; German, Arabic and Japanese are in their own files, as for
 * the attraction-reservation copy (lib/attractionReservationEditions.ts).
 *
 * The French, Spanish, German and Arabic editions have the hub; the sight
 * pages themselves stay English, so a card links the English page with the
 * edition's marker (lib/editionEnglishMarker.ts). Japanese has the words for
 * the city pages' sight cards; it has no hub yet.
 */
export type SightsEditionLocale = "fr" | "es" | "de" | "ar" | "ja";
/** The editions with their own Must-See Sights and Travel Inspiration hubs. */
export type SightsHubEditionLocale = Exclude<SightsEditionLocale, "ja">;
export const sightsHubEditionLocales = ["fr", "es", "de", "ar"] as const satisfies readonly SightsHubEditionLocale[];

/** The sights that carry their own photo (`image` in lib/sights.ts), so the edition translates its alt text. */
export type SightWithOwnPhotoId =
  | "great-wall"
  | "the-bund"
  | "shanghai-tower"
  | "west-lake"
  | "lingyin"
  | "chengdu-panda-base"
  | "hongyadong"
  | "wulong"
  | "dazu-rock-carvings"
  | "zhangjiajie-grand-canyon"
  | "chen-clan-hall"
  | "canton-tower"
  | "shamian";

export interface SightsEditionCopy extends SightsCopy {
  /** Each sight's city as the edition names it (its reservation page and footer use the same names). */
  cities: Readonly<Record<SightCityId, string>>;
  /** The alt text of the sights' own photos. */
  imageAlt: Readonly<Record<SightWithOwnPhotoId, string>>;
}

const french: SightsEditionCopy = {
  hub: {
    metadata: {
      title: "Sites incontournables en Chine, ville par ville, avec aide à la réservation",
      description:
        "Les sites incontournables de Chine, ville par ville, de la Grande Muraille à la rivière Li : pourquoi chacun vaut le voyage, comment se passe la réservation, et les circuits privés et l’aide à la réservation que nous proposons.",
    },
    h1: "Sites incontournables",
    lede: "Construisez votre voyage autour des sites que vous venez voir. Sur ces {total} sites, nous pouvons en réserver {count} au nom figurant sur votre passeport. Envoyez vos dates dès qu’elles sont fixées : nous nous préparons avant l’ouverture des ventes.",
    cityLink: "À propos de la ville",
    byCity: "Par ville",
  },
  page: {
    bookingTitle: "La réservation en bref",
    story: { whyTitle: "Pourquoi il vaut le voyage", highlightsTitle: "À ne pas manquer", fitTitle: "L’intégrer à votre voyage", time: "Le temps à y consacrer", when: "Quand y aller", pair: "À combiner avec", skip: "Qui peut s’en passer", faqTitle: "Les questions des voyageurs", sourcesTitle: "Sources" },
    bookingNote: "D’après nos règles de réservation des sites.",
    guideLink: "Guide complet",
    reserve: "Réserver avec nous",
    reserveThis: "Nous confier cette réservation",
    reserveNote: "{fee} par personne et par site, plus le billet à sa valeur faciale.",
    openAll: "Envoyez vos dates tôt. Nous nous occupons des règles de réservation et confirmons par écrit, avant paiement, l’ouverture des ventes, les conditions liées au passeport et les prix pour votre visite.",
    seeTours: "Voir les circuits qui l’incluent",
    toursTitle: "Les circuits privés qui l’incluent",
    sameCity: "Autres sites à {city}",
    nearby: "À proximité",
    more: "Autres sites incontournables",
    allSights: "Tous les sites incontournables",
    openTopics: { release: "l’ouverture des ventes", passport: "l’usage du passeport", realName: "la réservation nominative", price: "le prix du billet" },
    extras: "Ce qui se réserve",
  },
  ctaTitle: "Réservez la visite qui motive votre voyage",
  ctaBody: "Laissez-nous la course aux réservations. Envoyez vos dates dès qu’elles sont fixées : nous nous préparons avant l’ouverture des ventes. Les frais sont de {fee} par personne et par site, plus le billet éventuel à sa valeur faciale. Un guide privé peut être organisé séparément.",
  guidedTitle: "Vous souhaitez que nous l’organisions ?",
  guidedBody: "Réservez un guide privé anglophone, ou confiez-nous tout le voyage.",
  photo: "Photo",
  photos: "Photos",
  edited: "recadrage et redimensionnement",
  reserveNoteFree: "{fee} par personne et par site. L’entrée elle-même est gratuite, mais exige une réservation nominative.",
  tripOnlyBody: "Confiez-nous tout le voyage, et nous l’y intégrerons.",
  ctaBodyNoGuide: "Laissez-nous la course aux réservations. Envoyez vos dates dès qu’elles sont fixées : nous nous préparons avant l’ouverture des ventes. Les frais sont de {fee} par personne et par site, plus le billet éventuel à sa valeur faciale.",
  planWithUs: "L’intégrer à un voyage conçu pour vous",
  sights: {
    "forbidden-city": { name: "La Cité interdite", line: "Le palais impérial des Ming et des Qing, au cœur de Pékin" },
    "great-wall": { name: "La Grande Muraille", line: "Une journée depuis Pékin, à Badaling ou à Mutianyu" },
    "temple-of-heaven": { name: "Temple du Ciel", line: "Là où les empereurs Ming et Qing priaient pour de bonnes récoltes" },
    "summer-palace": { name: "Palais d’Été", line: "Un jardin impérial : un lac, une colline et une longue galerie" },
    "national-museum": { name: "Musée national de Chine", line: "La Chine ancienne, de la préhistoire aux Qing, sur la place Tian’anmen" },
    "terracotta-warriors": { name: "L’armée de terre cuite", line: "L’armée enterrée du premier empereur de Chine" },
    "xian-city-wall": { name: "Remparts de Xi’an", line: "Parcourez un tronçon à pied, au sommet, ou faites tout le tour à vélo" },
    "shaanxi-history-museum": { name: "Musée d’histoire du Shaanxi", line: "Des trésors des Zhou aux Tang, et des peintures murales de tombes Tang" },
    "shanghai-museum-east": { name: "Musée de Shanghai, site Est", line: "Le nouveau bâtiment du musée de Shanghai, à Pudong" },
    "humble-administrators-garden": { name: "Jardin de l’Humble Administrateur", line: "Le plus grand jardin classique conservé de Suzhou, inscrit au patrimoine mondial" },
    liangzhu: { name: "Cité antique de Liangzhu", line: "Une cité bâtie il y a plus de 5 000 ans, inscrite au patrimoine mondial" },
    "chengdu-panda-base": { name: "Base des pandas de Chengdu", line: "Allez-y dès l’ouverture, quand les pandas sont généralement les plus actifs" },
    sanxingdui: { name: "Musée de Sanxingdui", line: "Masques de bronze et arbres sacrés de l’antique Shu, vieux de plus de 3 000 ans" },
    "li-river": { name: "La rivière Li", line: "Les pics karstiques en bateau, de Guilin à Yangshuo" },
    "jade-dragon-snow-mountain": { name: "Montagne enneigée du Dragon de Jade", line: "Le sommet enneigé qui domine Lijiang, accessible en téléphérique" },
    "zhangjiajie-forest-park": { name: "Parc forestier national de Zhangjiajie", line: "Les piliers de grès de Yuanjiajie et du mont Tianzi" },
    "the-bund": { name: "Le Bund", line: "Des banques et des hôtels du début du XXe siècle au bord du fleuve, face aux tours de Pudong" },
    "shanghai-tower": { name: "La tour de Shanghai", line: "Le plus haut bâtiment de Chine, avec une plateforme d’observation au 118e étage au-dessus de Lujiazui" },
    "west-lake": { name: "Le lac de l’Ouest", line: "Digues, pagodes et étangs de lotus, à pied à l’aube ou en bateau" },
    lingyin: { name: "Temple Lingyin et pic Feilai", line: "Un temple vieux de près de 1 700 ans, à côté de falaises sculptées de bouddhas" },
    "leshan-giant-buddha": { name: "Le Grand Bouddha de Leshan", line: "Un bouddha de 71 mètres taillé dans une falaise au bord du fleuve, à une journée de Chengdu" },
    hongyadong: { name: "Hongyadong", line: "Des bâtiments à la manière des maisons sur pilotis, étagés sur une falaise de la rivière Jialing, illuminés à la nuit tombée" },
    wulong: { name: "Le karst de Wulong", line: "Trois ponts naturels dans une gorge profonde, en une longue journée ou avec une nuit sur place depuis Chongqing" },
    "dazu-rock-carvings": { name: "Sculptures rupestres de Dazu", line: "Des sculptures sur falaise, bouddhiques pour la plupart, des Tang aux Song, inscrites au patrimoine mondial" },
    "tianmen-mountain": { name: "Le mont Tianmen", line: "Un téléphérique, des passerelles à flanc de falaise et l’escalier de la porte du Ciel" },
    "zhangjiajie-grand-canyon": { name: "Grand Canyon de Zhangjiajie", line: "Traversez le pont de verre, puis descendez le long du torrent du canyon" },
    "chen-clan-hall": { name: "Temple ancestral du clan Chen", line: "Une académie de clan de l’époque Qing, réputée pour ses sculptures du Lingnan sur bois, brique et pierre" },
    "canton-tower": { name: "La tour de Canton", line: "Le grand repère de la rivière des Perles, à voir de préférence illuminé la nuit" },
    shamian: { name: "L’île de Shamian", line: "Bâtiments de l’époque coloniale et banians, sur une île paisible de la rivière" },
  },
  cities: { beijing: "Pékin", xian: "Xi’an", shanghai: "Shanghai", suzhou: "Suzhou", hangzhou: "Hangzhou", chengdu: "Chengdu", chongqing: "Chongqing", zhangjiajie: "Zhangjiajie", guilin: "Guilin", lijiang: "Lijiang", guangzhou: "Canton", datong: "Datong" },
  imageAlt: {
    "great-wall": "Une section restaurée de la Grande Muraille sur des crêtes, au nord de Pékin",
    "the-bund": "Les bâtiments du début du XXe siècle sur le Bund, à Shanghai, au crépuscule, dont la tour de l’horloge de la Douane",
    "shanghai-tower": "La tour de Shanghai à côté de la tour Jin Mao et du Shanghai World Financial Center, au coucher du soleil",
    "west-lake": "Feuilles de lotus et bateau de promenade sur le lac de l’Ouest, avec la pagode Leifeng sur l’autre rive",
    lingyin: "Sculptures bouddhiques dans le calcaire du pic Feilai, à côté du temple Lingyin",
    "chengdu-panda-base": "Deux pandas géants se reposant sur une structure d’escalade en bois, parmi les arbres",
    hongyadong: "Les étages de Hongyadong, à la manière des maisons sur pilotis, illuminés la nuit au-dessus d’une rue animée",
    wulong: "Falaises calcaires des Trois Ponts naturels de Wulong",
    "dazu-rock-carvings": "Un bouddha sculpté parmi les sculptures rupestres peintes de Dazu",
    "zhangjiajie-grand-canyon": "Un torrent vert jade et une passerelle en bois au fond du Grand Canyon de Zhangjiajie",
    "chen-clan-hall": "Les faîtages sculptés du temple ancestral du clan Chen, à Canton",
    "canton-tower": "La tour de Canton sous un ciel bleu au bord de la rivière des Perles, avec devant elle l’arche blanche du pont Haixin",
    shamian: "Un bâtiment de l’époque coloniale sous les banians de l’île de Shamian",
  },
};

const spanish: SightsEditionCopy = {
  hub: {
    metadata: {
      title: "Lugares imprescindibles de China, ciudad por ciudad, con ayuda para reservar",
      description:
        "Los lugares imprescindibles de China por ciudades, de la Gran Muralla al río Li: por qué merece la pena cada uno, cómo funciona la reserva y los viajes privados y la ayuda con las reservas que ofrecemos.",
    },
    h1: "Lugares imprescindibles",
    lede: "Organiza tu viaje en torno a los lugares que vienes a ver. De estos {total}, podemos reservar {count} con el nombre de tu pasaporte. Envíanos tus fechas en cuanto las tengas para prepararlo todo antes de que salgan las entradas.",
    cityLink: "Sobre la ciudad",
    byCity: "Por ciudad",
  },
  page: {
    bookingTitle: "La reserva, de un vistazo",
    story: { whyTitle: "Por qué merece la pena", highlightsTitle: "No te pierdas", fitTitle: "Cómo encajarlo en el viaje", time: "Tiempo que dedicarle", when: "Cuándo ir", pair: "Combínalo con", skip: "Quién puede saltárselo", faqTitle: "Lo que preguntan los viajeros", sourcesTitle: "Fuentes" },
    bookingNote: "Según nuestras normas de reserva de visitas.",
    guideLink: "Guía completa",
    reserve: "Resérvalo con nosotros",
    reserveThis: "Dejarnos reservar esta visita",
    reserveNote: "{fee} por persona y lugar, más la entrada a su precio oficial.",
    openAll: "Envíanos tus fechas con tiempo. Nos ocupamos de las normas de reserva y, antes de que pagues, te confirmamos por escrito cuándo salen las entradas, qué se exige del pasaporte y los precios para tu visita.",
    seeTours: "Ver viajes que lo incluyen",
    toursTitle: "Viajes privados que lo incluyen",
    sameCity: "Más en {city}",
    nearby: "Cerca",
    more: "Más lugares imprescindibles",
    allSights: "Todos los lugares imprescindibles",
    openTopics: { release: "cuándo salen las entradas", passport: "el uso del pasaporte", realName: "la reserva nominativa", price: "el precio de la entrada" },
    extras: "Qué hay que reservar",
  },
  ctaTitle: "Reserva la visita que te trae aquí",
  ctaBody: "Déjanos a nosotros la carrera por las reservas. Envíanos tus fechas en cuanto las tengas para prepararlo todo antes de que salgan las entradas. Los gastos de gestión son {fee} por persona y lugar, más la entrada, si la hay, a su precio oficial. También podemos organizar aparte un guía privado.",
  guidedTitle: "¿Quieres que lo organicemos nosotros?",
  guidedBody: "Reserva un guía privado de habla inglesa o déjanos todo el viaje.",
  photo: "Foto",
  photos: "Fotos",
  edited: "recorte y ajuste de tamaño",
  reserveNoteFree: "{fee} por persona y lugar. La entrada en sí es gratuita, pero exige una reserva nominativa.",
  tripOnlyBody: "Déjanos todo el viaje y lo incluiremos.",
  ctaBodyNoGuide: "Déjanos a nosotros la carrera por las reservas. Envíanos tus fechas en cuanto las tengas para prepararlo todo antes de que salgan las entradas. Los gastos de gestión son {fee} por persona y lugar, más la entrada, si la hay, a su precio oficial.",
  planWithUs: "Inclúyelo en un viaje a tu medida",
  sights: {
    "forbidden-city": { name: "La Ciudad Prohibida", line: "El palacio imperial de los Ming y los Qing, en el centro de Pekín" },
    "great-wall": { name: "La Gran Muralla", line: "Una excursión de un día desde Pekín, a Badaling o Mutianyu" },
    "temple-of-heaven": { name: "Templo del Cielo", line: "Donde los emperadores Ming y Qing rezaban por las buenas cosechas" },
    "summer-palace": { name: "Palacio de Verano", line: "Un jardín imperial de lago, colina y una larga galería" },
    "national-museum": { name: "Museo Nacional de China", line: "La China antigua, de la prehistoria a los Qing, en la plaza de Tiananmén" },
    "terracotta-warriors": { name: "Guerreros de Terracota", line: "El ejército enterrado del primer emperador de China" },
    "xian-city-wall": { name: "Muralla de Xi’an", line: "Recorre un tramo a pie por lo alto o da la vuelta completa en bicicleta" },
    "shaanxi-history-museum": { name: "Museo de Historia de Shaanxi", line: "Tesoros de los Zhou a los Tang y pinturas murales de tumbas Tang" },
    "shanghai-museum-east": { name: "Museo de Shanghái, sede Este", line: "El nuevo edificio del Museo de Shanghái, en Pudong" },
    "humble-administrators-garden": { name: "Jardín del Administrador Humilde", line: "El mayor jardín clásico conservado de Suzhou, Patrimonio de la Humanidad" },
    liangzhu: { name: "Ciudad antigua de Liangzhu", line: "Una ciudad construida hace más de 5000 años, Patrimonio de la Humanidad" },
    "chengdu-panda-base": { name: "Base de osos panda de Chengdu", line: "Ve a la hora de apertura, cuando los pandas suelen estar más activos" },
    sanxingdui: { name: "Museo de Sanxingdui", line: "Máscaras de bronce y árboles sagrados del antiguo Shu, de más de 3000 años" },
    "li-river": { name: "Río Li", line: "Picos kársticos en barco, de Guilin a Yangshuo" },
    "jade-dragon-snow-mountain": { name: "Montaña Nevada del Dragón de Jade", line: "La cumbre nevada sobre Lijiang, a la que se sube en teleférico" },
    "zhangjiajie-forest-park": { name: "Parque Forestal Nacional de Zhangjiajie", line: "Pilares de arenisca en Yuanjiajie y la montaña Tianzi" },
    "the-bund": { name: "El Bund", line: "Una ribera de bancos y hoteles de principios del siglo XX, frente al perfil de Pudong" },
    "shanghai-tower": { name: "Torre de Shanghái", line: "El edificio más alto de China, con un mirador en la planta 118 sobre Lujiazui" },
    "west-lake": { name: "Lago del Oeste", line: "Diques, pagodas y estanques de lotos, a pie al amanecer o en barca" },
    lingyin: { name: "Templo Lingyin y pico Feilai", line: "Un templo de casi 1700 años, junto a acantilados tallados con budas" },
    "leshan-giant-buddha": { name: "Gran Buda de Leshan", line: "Un buda de 71 metros tallado en un acantilado junto al río, en una excursión de un día desde Chengdu" },
    hongyadong: { name: "Hongyadong", line: "Edificios al estilo de las casas sobre pilotes, escalonados en un acantilado del río Jialing, iluminados al anochecer" },
    wulong: { name: "Karst de Wulong", line: "Tres puentes naturales en un profundo desfiladero, en un día largo o con una noche desde Chongqing" },
    "dazu-rock-carvings": { name: "Grabados rupestres de Dazu", line: "Tallas en acantilados, en su mayoría budistas, de los Tang a los Song, Patrimonio de la Humanidad" },
    "tianmen-mountain": { name: "Montaña Tianmen", line: "Un teleférico, pasarelas en el acantilado y la escalera hasta la Puerta del Cielo" },
    "zhangjiajie-grand-canyon": { name: "Gran Cañón de Zhangjiajie", line: "Cruza el puente de cristal y baja después junto al arroyo del cañón" },
    "chen-clan-hall": { name: "Salón Ancestral del Clan Chen", line: "Una academia de clan de la dinastía Qing, famosa por la talla lingnan en madera, ladrillo y piedra" },
    "canton-tower": { name: "Torre de Cantón", line: "El símbolo del río de las Perlas, más bonito iluminado de noche" },
    shamian: { name: "Isla de Shamian", line: "Edificios de la época colonial y banianos en una tranquila isla del río" },
  },
  cities: { beijing: "Pekín", xian: "Xi’an", shanghai: "Shanghái", suzhou: "Suzhou", hangzhou: "Hangzhou", chengdu: "Chengdu", chongqing: "Chongqing", zhangjiajie: "Zhangjiajie", guilin: "Guilin", lijiang: "Lijiang", guangzhou: "Cantón", datong: "Datong" },
  imageAlt: {
    "great-wall": "Un tramo restaurado de la Gran Muralla sobre crestas montañosas al norte de Pekín",
    "the-bund": "Edificios de principios del siglo XX en el Bund de Shanghái al atardecer, entre ellos la torre del reloj de la Aduana",
    "shanghai-tower": "La Torre de Shanghái junto a la Torre Jin Mao y el Shanghai World Financial Center al atardecer",
    "west-lake": "Hojas de loto y una barca de recreo en el Lago del Oeste, con la pagoda Leifeng en la otra orilla",
    lingyin: "Tallas budistas en la piedra caliza del pico Feilai, junto al templo Lingyin",
    "chengdu-panda-base": "Dos pandas gigantes descansando en una estructura de madera para trepar entre los árboles",
    hongyadong: "Los niveles de Hongyadong, al estilo de las casas sobre pilotes, iluminados de noche sobre una calle concurrida",
    wulong: "Acantilados de piedra caliza de los Tres Puentes Naturales de Wulong",
    "dazu-rock-carvings": "Un buda tallado entre los grabados rupestres pintados de Dazu",
    "zhangjiajie-grand-canyon": "Un arroyo verde jade y una pasarela de madera en el fondo del Gran Cañón de Zhangjiajie",
    "chen-clan-hall": "Las cumbreras talladas del Salón Ancestral del Clan Chen, en Cantón",
    "canton-tower": "La Torre de Cantón bajo un cielo azul junto al río de las Perlas, con el arco blanco del puente Haixin delante",
    shamian: "Un edificio de la época colonial bajo los banianos de la isla de Shamian",
  },
};

const copy: Readonly<Record<SightsEditionLocale, SightsEditionCopy>> = {
  fr: french,
  es: spanish,
  de: germanSightsCopy,
  ar: arabicSightsCopy,
  ja: japaneseSightsCopy,
};

export function getSightsEditionCopy(language: SightsEditionLocale): SightsEditionCopy {
  return copy[language];
}
