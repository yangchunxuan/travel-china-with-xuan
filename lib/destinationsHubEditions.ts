import type { DestinationHubId } from "./destinationHubs";
import type { DestinationsHubEditionLocale } from "./destinationEditions";
import { japaneseDestinationsHubCopy } from "./japaneseDestinationsHubCopy.ts";

/**
 * The destinations hub (/explore/, components/DestinationsHubPage.tsx) in
 * French, German, Spanish, Arabic and Japanese: the English hub's words
 * (lib/destinationsHubI18n.ts and the explore section of
 * lib/searchPlatformI18n.ts), translated with every number as the English
 * states it, plus the city photos' alt text and the three place indexes,
 * whose pages stay English. Japanese is in its own file
 * (lib/japaneseDestinationsHubCopy.ts), out of the Chinese serif font corpus.
 */
type ExploreCollectionId = "explore-regions-provinces" | "explore-cities-neighborhoods" | "explore-attractions-nature-heritage";

export interface DestinationsHubEditionCopy {
  readonly metadata: { readonly title: string };
  readonly section: {
    readonly eyebrow: string;
    readonly title: string;
    /** Also the page's meta description, as in English. */
    readonly description: string;
    readonly scopeTitle: string;
    readonly scope: readonly string[];
  };
  readonly cityEyebrow: string;
  readonly cityTitle: string;
  readonly cityIntroduction: (count: number) => string;
  readonly cityCount: (count: number) => string;
  readonly bestForLabel: string;
  readonly stayLabel: string;
  readonly routeRoleLabel: string;
  readonly cityComparisons: Readonly<Record<DestinationHubId, { readonly bestFor: string; readonly stay: string; readonly routeRole: string }>>;
  /** The alt text of each city's photo (the city page's hero alt where the city has a page in the language). */
  readonly cityImageAlt: Readonly<Record<DestinationHubId, string>>;
  readonly openCity: string;
  readonly winterGuideLabel: string;
  readonly scaleEyebrow: string;
  readonly scaleTitle: string;
  readonly scaleIntroduction: string;
  readonly openScale: string;
  readonly collections: Readonly<Record<ExploreCollectionId, { readonly label: string; readonly description: string }>>;
  readonly handoffEyebrow: string;
  readonly handoffTitle: string;
  readonly handoffBody: string;
  readonly guidesAction: string;
  readonly toursAction: string;
}

const french: DestinationsHubEditionCopy = {
  metadata: { title: "Où aller en Chine : villes et régions à découvrir" },
  section: {
    eyebrow: "Comparer les destinations en Chine",
    title: "Les plus beaux endroits à visiter en Chine.",
    description:
      "Comparez huit villes étapes : ce que chacune offre de mieux, combien de temps lui consacrer et le rôle qu’elle peut jouer dans un itinéraire plus large.",
    scopeTitle: "Que devez-vous décider ?",
    scope: [
      "Quelle ville mérite une place dans mon voyage ?",
      "Combien de nuits, et dans quel quartier loger ?",
      "Où arriver, d’où repartir, et où aller ensuite ?",
    ],
  },
  cityEyebrow: "Guides des villes",
  cityTitle: "Comparez huit villes avant de tracer votre itinéraire.",
  cityIntroduction: (count) =>
    `Utilisez ces ${count} guides pour comparer ce que chaque ville vous offre, le temps à prévoir et son rôle dans l’itinéraire. Ouvrez-en un pour les quartiers où loger, les points d’arrivée, les grands sites et les étapes suivantes logiques.`,
  cityCount: (count) => (count === 1 ? "1 guide de ville publié" : `${count} guides de villes publiés`),
  bestForLabel: "Idéal pour",
  stayLabel: "Prévoir",
  routeRoleLabel: "Place dans l’itinéraire",
  cityComparisons: {
    beijing: {
      bestFor: "Un premier voyage, l’histoire impériale et la Grande Muraille",
      stay: "4 à 5 nuits",
      routeRole: "Porte d’entrée du Nord ; un départ naturel avant Xi’an ou un itinéraire vers le sud",
    },
    shanghai: {
      bestFor: "La Chine moderne, ses quartiers et le delta du Yangtsé",
      stay: "3 journées complètes en ville",
      routeRole: "Grande porte d’entrée internationale, pratique pour commencer ou terminer",
    },
    xian: {
      bestFor: "Les anciennes capitales, l’armée de terre cuite et les remparts",
      stay: "3 nuits ; 4 avec le mont Hua",
      routeRole: "Une étape d’histoire compacte entre le nord de la Chine et le Sud-Ouest",
    },
    chengdu: {
      bestFor: "Les pandas, la cuisine du Sichuan et une ville où ralentir",
      stay: "2 à 3 nuits en ville ; davantage pour prolonger dans le Sichuan",
      routeRole: "Base du Sud-Ouest pour aller plus loin dans le Sichuan",
    },
    guangzhou: {
      bestFor: "La cuisine cantonaise, la culture du Lingnan et une grande ville active du Sud",
      stay: "2 à 3 nuits",
      routeRole: "Porte d’entrée du Sud pour le delta de la rivière des Perles",
    },
    hangzhou: {
      bestFor: "Le lac de l’Ouest, les paysages de thé et un changement de rythme facile",
      stay: "Une journée ou 2 nuits",
      routeRole: "Un prolongement naturel depuis Shanghai plutôt qu’un ajout au pas de course",
    },
    zhangjiajie: {
      bestFor: "Les pics de grès, les balades en forêt et les paysages de montagne",
      stay: "3 journées complètes de visite",
      routeRole: "Une étape en montagne qui demande ses propres journées complètes et son propre point de chute",
    },
    chongqing: {
      bestFor: "Une mégapole escarpée, des vues nocturnes et une cuisine régionale relevée",
      stay: "3 nuits",
      routeRole: "Porte d’entrée du Sud-Ouest ; gardez Wulong comme une extension à part",
    },
  },
  cityImageAlt: {
    beijing: "La tour du Tambour et la tour de la Cloche de Pékin au-dessus des toits de tuiles grises des hutongs, avec une ruelle animée à droite.",
    shanghai: "Deux ponts franchissent la rivière Suzhou au crépuscule, avec d’anciens bâtiments de Puxi au premier plan et, au-delà, la tour de la Perle de l’Orient et la tour de Shanghai.",
    xian: "La tour de la Cloche de Xi’an illuminée de doré sur un ciel bleu profond du soir, avec devant elle les traînées de lumière de la circulation.",
    chengdu: "Des gens boivent du thé sur des chaises en bambou sous un pavillon de bois couvert, orné de lanternes rouges, dans une maison de thé du parc du Peuple de Chengdu.",
    guangzhou: "Des dim sum dans des paniers vapeur en bambou, des rouleaux de pâte de riz rouges, une théière, une bouilloire en laiton et une gourde en osier sur une table ronde du restaurant Pan Xi.",
    hangzhou: "Des petits bateaux traversent le lac de l’Ouest à Hangzhou, sous des collines boisées et la brume.",
    zhangjiajie: "De hauts piliers de grès gris et fauves coiffés d’arbres, avec une brume blanche qui flotte entre eux, dans le parc forestier national de Zhangjiajie.",
    chongqing: "Les tours de Yuzhong de l’autre côté de la rivière Jialing au coucher du soleil, avec à droite le pont de Qiansimen éclairé en rouge.",
  },
  openCity: "Ouvrir le guide de la ville",
  winterGuideLabel: "Vous voyagez en décembre, janvier ou février ? Comparez les destinations d’hiver.",
  scaleEyebrow: "Explorer par type de lieu",
  scaleTitle: "Regardez au-delà du nom de la ville.",
  scaleIntroduction:
    "Utilisez ces index de lieux quand la question est géographique : quelle région, quel type de ville, ou quel site et quel paysage ont leur place dans l’itinéraire.",
  openScale: "Parcourir les lieux",
  collections: {
    "explore-regions-provinces": {
      label: "Régions et provinces",
      description: "Paysages régionaux, identités provinciales et géographies qui relient plusieurs villes, expliqués avant d’en faire un itinéraire.",
    },
    "explore-cities-neighborhoods": {
      label: "Villes et quartiers",
      description: "La forme de la ville, le caractère des quartiers et l’espace public du quotidien, pas seulement une liste de sites célèbres.",
    },
    "explore-attractions-nature-heritage": {
      label: "Sites, nature et patrimoine",
      description: "Sites du patrimoine, musées et paysages expliqués par leur sens, leurs conditions de réservation et l’ordre qui rend la visite cohérente.",
    },
  },
  handoffEyebrow: "Une autre question ?",
  handoffTitle: "Consultez nos conseils quand il vous faut une réponse, pas un lieu.",
  handoffBody:
    "Formalités d’entrée, paiements, transports, choix de l’hôtel et calendrier du voyage relèvent de nos conseils de voyage. Les itinéraires publiés se trouvent dans nos circuits privés.",
  guidesAction: "Voir nos conseils de voyage",
  toursAction: "Comparer les circuits privés",
};

const german: DestinationsHubEditionCopy = {
  metadata: { title: "Die schönsten Reiseziele in China: Städte und Regionen" },
  section: {
    eyebrow: "Reiseziele in China vergleichen",
    title: "Die schönsten Reiseziele in China.",
    description:
      "Vergleichen Sie acht Städte als Standorte: wofür sich jede am besten eignet, wie viel Zeit Sie einplanen sollten und welche Rolle sie in einer längeren Route spielen kann.",
    scopeTitle: "Was müssen Sie entscheiden?",
    scope: [
      "Welche Stadt verdient einen Platz auf meiner Reise?",
      "Wie viele Nächte und welcher Standort sind sinnvoll?",
      "Wo komme ich an, wo reise ich ab, und wohin geht es danach?",
    ],
  },
  cityEyebrow: "Stadtführer",
  cityTitle: "Vergleichen Sie acht Städte, bevor Sie die Route planen.",
  cityIntroduction: (count) =>
    `Vergleichen Sie mit diesen ${count} Stadtführern, was zu Ihnen passt, wie viel Zeit Sie brauchen und welche Rolle jede Stadt in der Route spielt. Öffnen Sie einen für Wohngegenden, Ankunftsorte, wichtige Sehenswürdigkeiten und sinnvolle nächste Stationen.`,
  cityCount: (count) => (count === 1 ? "1 veröffentlichter Stadtführer" : `${count} veröffentlichte Stadtführer`),
  bestForLabel: "Ideal für",
  stayLabel: "Einplanen",
  routeRoleLabel: "Rolle in der Route",
  cityComparisons: {
    beijing: {
      bestFor: "Eine erste Reise, Kaisergeschichte und die Große Mauer",
      stay: "4–5 Nächte",
      routeRole: "Tor zum Norden; ein natürlicher Start vor Xi’an oder einer Route nach Süden",
    },
    shanghai: {
      bestFor: "Das moderne China, Stadtviertel und das Jangtse-Delta",
      stay: "3 volle Tage in der Stadt",
      routeRole: "Internationales Tor und praktischer Start- oder Endpunkt",
    },
    xian: {
      bestFor: "Alte Hauptstädte, die Terrakotta-Armee und die Stadtmauer",
      stay: "3 Nächte; 4 mit dem Huashan",
      routeRole: "Ein kompakter Geschichtshalt zwischen Nordchina und dem Südwesten",
    },
    chengdu: {
      bestFor: "Pandas, Sichuan-Küche und ein gemächlicherer Standort",
      stay: "2–3 Nächte in der Stadt; länger für Abstecher in Sichuan",
      routeRole: "Standort im Südwesten für Reisen tiefer nach Sichuan",
    },
    guangzhou: {
      bestFor: "Kantonesische Küche, Lingnan-Kultur und eine geschäftige Stadt im Süden",
      stay: "2–3 Nächte",
      routeRole: "Tor zum Süden für das Perlflussdelta",
    },
    hangzhou: {
      bestFor: "Westsee, Teelandschaften und ein leichter Tempowechsel",
      stay: "Ein Tagesausflug oder 2 Nächte",
      routeRole: "Eine natürliche Verlängerung ab Shanghai statt eines gehetzten Zusatzes",
    },
    zhangjiajie: {
      bestFor: "Sandsteingipfel, Waldwanderungen und Berglandschaft",
      stay: "3 volle Besichtigungstage",
      routeRole: "Ein Bergabschnitt, der eigene volle Tage und einen eigenen Standort braucht",
    },
    chongqing: {
      bestFor: "Eine steile Megastadt, Nachtblicke und kräftige regionale Küche",
      stay: "3 Nächte",
      routeRole: "Tor zum Südwesten; Wulong als eigene Verlängerung planen",
    },
  },
  cityImageAlt: {
    beijing: "Der Trommelturm und der Glockenturm von Peking über den grau gedeckten Dächern der Hutongs, rechts eine belebte Gasse.",
    shanghai: "Zwei Brücken über den Suzhou Creek in der Dämmerung, vorne ältere Gebäude in Puxi, dahinter der Oriental Pearl Tower und der Shanghai Tower.",
    xian: "Der Glockenturm von Xi’an golden beleuchtet vor tiefblauem Abendhimmel, davor Lichtspuren des Verkehrs.",
    chengdu: "Menschen trinken Tee auf Bambusstühlen unter einem überdachten Holzpavillon mit roten Laternen, in einem Teehaus im Volkspark von Chengdu.",
    guangzhou: "Dim Sum in Bambuskörbchen, rote Reisnudelrollen, eine Teekanne, ein Messingkessel und eine Korbflasche auf einem runden Tisch im Restaurant Pan Xi.",
    hangzhou: "Kleine Boote überqueren den Westsee in Hangzhou unter bewaldeten Hügeln und Nebel.",
    zhangjiajie: "Hohe graue und hellbraune Sandsteinsäulen mit Bäumen auf den Spitzen, zwischen denen weißer Nebel treibt, im Nationalen Waldpark Zhangjiajie.",
    chongqing: "Die Skyline von Yuzhong jenseits des Jialing-Flusses bei Sonnenuntergang, rechts die rot beleuchtete Qiansimen-Brücke.",
  },
  openCity: "Stadtführer öffnen",
  winterGuideLabel: "Sie reisen im Dezember, Januar oder Februar? Vergleichen Sie Winterziele.",
  scaleEyebrow: "Nach Art des Ortes stöbern",
  scaleTitle: "Schauen Sie über den Städtenamen hinaus.",
  scaleIntroduction:
    "Nutzen Sie diese Ortsverzeichnisse, wenn die Frage geografisch ist: welche Region, welche Art von Stadt oder welche Sehenswürdigkeit und Landschaft in die Route gehört.",
  openScale: "Orte ansehen",
  collections: {
    "explore-regions-provinces": {
      label: "Regionen und Provinzen",
      description: "Regionale Landschaften, Identitäten der Provinzen und Geografien über mehrere Städte hinweg, erklärt, bevor daraus eine Reiseroute wird.",
    },
    "explore-cities-neighborhoods": {
      label: "Städte und Viertel",
      description: "Stadtgestalt, Charakter der Viertel und alltäglicher öffentlicher Raum, nicht nur eine Liste berühmter Sehenswürdigkeiten.",
    },
    "explore-attractions-nature-heritage": {
      label: "Sehenswürdigkeiten, Natur und Kulturerbe",
      description: "Kulturerbestätten, Museen und Landschaften, erklärt durch ihre Bedeutung, die Grenzen der Buchung und die Reihenfolge, die einen Besuch stimmig macht.",
    },
  },
  handoffEyebrow: "Eine andere Frage?",
  handoffTitle: "Nutzen Sie unsere Reisetipps, wenn Sie eine Antwort brauchen, keinen Ort.",
  handoffBody:
    "Einreiseregeln, Bezahlen, Verkehr, Hotelwahl und Reisezeit gehören in unsere Reisetipps. Veröffentlichte Reiseverläufe finden Sie bei unseren Privatreisen.",
  guidesAction: "Reisetipps öffnen",
  toursAction: "Privatreisen vergleichen",
};

const spanish: DestinationsHubEditionCopy = {
  metadata: { title: "Los mejores lugares para visitar en China: ciudades y regiones" },
  section: {
    eyebrow: "Compara destinos en China",
    title: "Los mejores lugares para visitar en China.",
    description:
      "Compara ocho ciudades base según lo que mejor ofrece cada una, cuánto tiempo dedicarle y el papel que puede tener en una ruta más amplia.",
    scopeTitle: "¿Qué necesitas decidir?",
    scope: [
      "¿Qué ciudad merece un lugar en mi viaje?",
      "¿Cuántas noches y qué zona tienen sentido?",
      "¿Por dónde llego, por dónde salgo y adónde voy después?",
    ],
  },
  cityEyebrow: "Guías de ciudades",
  cityTitle: "Compara ocho ciudades antes de trazar la ruta.",
  cityIntroduction: (count) =>
    `Usa estas ${count} guías de ciudades para comparar qué encaja contigo, cuánto tiempo hace falta y el papel de cada ciudad en la ruta. Abre una para ver zonas donde alojarte, puntos de llegada, grandes lugares y siguientes paradas sensatas.`,
  cityCount: (count) => (count === 1 ? "1 guía de ciudad publicada" : `${count} guías de ciudades publicadas`),
  bestForLabel: "Ideal para",
  stayLabel: "Calcula",
  routeRoleLabel: "Papel en la ruta",
  cityComparisons: {
    beijing: {
      bestFor: "Un primer viaje, la historia imperial y la Gran Muralla",
      stay: "4–5 noches",
      routeRole: "Puerta del norte; un comienzo natural antes de Xi’an o de una ruta hacia el sur",
    },
    shanghai: {
      bestFor: "La China moderna, sus barrios y el delta del Yangtsé",
      stay: "3 días completos en la ciudad",
      routeRole: "Puerta internacional y un comienzo o final práctico",
    },
    xian: {
      bestFor: "Antiguas capitales, los Guerreros de Terracota y la muralla",
      stay: "3 noches; 4 con el monte Hua",
      routeRole: "Una parada histórica compacta entre el norte de China y el suroeste",
    },
    chengdu: {
      bestFor: "Pandas, comida de Sichuan y una ciudad más tranquila",
      stay: "2–3 noches en la ciudad; más para extensiones por Sichuan",
      routeRole: "Base del suroeste para adentrarse en Sichuan",
    },
    guangzhou: {
      bestFor: "La cocina cantonesa, la cultura lingnan y una ciudad activa del sur",
      stay: "2–3 noches",
      routeRole: "Puerta del sur para el delta del río de las Perlas",
    },
    hangzhou: {
      bestFor: "El Lago del Oeste, paisajes de té y un cambio de ritmo fácil",
      stay: "Una excursión de un día o 2 noches",
      routeRole: "Una extensión natural desde Shanghái, no un añadido a la carrera",
    },
    zhangjiajie: {
      bestFor: "Picos de arenisca, paseos por el bosque y paisajes de montaña",
      stay: "3 días completos de visitas",
      routeRole: "Un tramo de montaña que necesita sus propios días completos y su propia base",
    },
    chongqing: {
      bestFor: "Una megaciudad empinada, vistas nocturnas y una cocina regional intensa",
      stay: "3 noches",
      routeRole: "Puerta del suroeste; deja Wulong como una extensión aparte",
    },
  },
  cityImageAlt: {
    beijing: "La Torre del Tambor y la Torre de la Campana de Pekín sobre los tejados de teja gris de los hutongs, con un callejón concurrido a la derecha.",
    shanghai: "Dos puentes cruzan el arroyo Suzhou al atardecer, con edificios antiguos de Puxi delante y, al fondo, la Torre de la Perla Oriental y la Torre de Shanghái.",
    xian: "La Torre de la Campana de Xi’an iluminada en dorado contra un cielo nocturno azul intenso, con estelas de luz del tráfico que pasa por delante.",
    chengdu: "Gente tomando té en sillas de bambú bajo un pabellón de madera cubierto con farolillos rojos, en una casa de té del Parque del Pueblo de Chengdu.",
    guangzhou: "Dim sum en vaporeras de bambú, rollos rojos de fideos de arroz, una tetera, un hervidor de latón y una petaca de mimbre sobre una mesa redonda del restaurante Pan Xi.",
    hangzhou: "Pequeñas barcas cruzan el Lago del Oeste de Hangzhou bajo colinas boscosas y niebla.",
    zhangjiajie: "Altos pilares de arenisca grises y ocres coronados de árboles, con niebla blanca flotando entre ellos, en el Parque Forestal Nacional de Zhangjiajie.",
    chongqing: "El perfil de Yuzhong al otro lado del río Jialing al atardecer, con el puente Qiansimen iluminado de rojo a la derecha.",
  },
  openCity: "Abrir la guía de la ciudad",
  winterGuideLabel: "¿Viajas en diciembre, enero o febrero? Compara destinos de invierno.",
  scaleEyebrow: "Explora por tipo de lugar",
  scaleTitle: "Mira más allá del nombre de la ciudad.",
  scaleIntroduction:
    "Usa estos índices de lugares cuando la pregunta sea geográfica: qué región, qué tipo de ciudad o qué lugar y paisaje encaja en la ruta.",
  openScale: "Ver lugares",
  collections: {
    "explore-regions-provinces": {
      label: "Regiones y provincias",
      description: "Paisajes regionales, identidades provinciales y geografías que unen varias ciudades, explicados antes de convertirlos en un itinerario.",
    },
    "explore-cities-neighborhoods": {
      label: "Ciudades y barrios",
      description: "La forma de la ciudad, el carácter de los barrios y el espacio público cotidiano, no solo una lista de lugares famosos.",
    },
    "explore-attractions-nature-heritage": {
      label: "Lugares, naturaleza y patrimonio",
      description: "Sitios patrimoniales, museos y paisajes explicados por su significado, sus límites de reserva y el orden que da sentido a la visita.",
    },
  },
  handoffEyebrow: "¿Otro tipo de pregunta?",
  handoffTitle: "Consulta nuestras guías prácticas cuando necesites una respuesta, no un lugar.",
  handoffBody:
    "Requisitos de entrada, pagos, transporte, elección de hotel y fechas del viaje están en nuestras guías prácticas. Los itinerarios publicados están en Viajes privados.",
  guidesAction: "Abrir las guías prácticas",
  toursAction: "Comparar viajes privados",
};

/** Arabic counts its nouns: one, two, three to ten, eleven and up. */
function arabicGuideCount(count: number) {
  if (count === 1) return "دليل مدينة واحد منشور";
  if (count === 2) return "دليلا مدينتين منشوران";
  return count <= 10 ? `${count} أدلة مدن منشورة` : `${count} دليل مدينة منشورًا`;
}

const arabic: DestinationsHubEditionCopy = {
  metadata: { title: "أجمل الأماكن لزيارتها في الصين: المدن والمناطق" },
  section: {
    eyebrow: "قارن الوجهات في الصين",
    title: "أجمل الأماكن لزيارتها في الصين.",
    description:
      "قارن بين ثماني مدن تصلح قاعدةً لإقامتك: بمَ تتميز كل منها، وكم من الوقت تخصص لها، والدور الذي يمكن أن تؤديه في مسار أطول.",
    scopeTitle: "ما الذي تحتاج إلى تقريره؟",
    scope: [
      "أي مدينة تستحق مكانًا في رحلتي؟",
      "كم ليلة، وفي أي منطقة أقيم؟",
      "من أين أصل وأغادر، وإلى أين أذهب بعدها؟",
    ],
  },
  cityEyebrow: "أدلة المدن",
  cityTitle: "قارن بين ثماني مدن قبل أن ترسم مسارك.",
  cityIntroduction: (count) =>
    `استعن بأدلة المدن هذه، وعددها ${count}، لتقارن ما يناسبك والوقت اللازم ودور كل مدينة في المسار. افتح أيًّا منها لتعرف مناطق الإقامة ونقاط الوصول وأهم المعالم والمحطات التالية المنطقية.`,
  cityCount: arabicGuideCount,
  bestForLabel: "الأنسب لـ",
  stayLabel: "المدة المقترحة",
  routeRoleLabel: "دورها في المسار",
  cityComparisons: {
    beijing: {
      bestFor: "رحلة أولى، والتاريخ الإمبراطوري، وسور الصين العظيم",
      stay: "4–5 ليالٍ",
      routeRole: "بوابة الشمال؛ بداية طبيعية قبل شيآن أو قبل مسار نحو الجنوب",
    },
    shanghai: {
      bestFor: "الصين الحديثة وأحياؤها ودلتا نهر اليانغتسي",
      stay: "3 أيام كاملة في المدينة",
      routeRole: "بوابة دولية، وبداية أو نهاية عملية للرحلة",
    },
    xian: {
      bestFor: "العواصم القديمة وجيش التيراكوتا وسور المدينة",
      stay: "3 ليالٍ؛ 4 مع جبل هوا",
      routeRole: "محطة تاريخية مركّزة بين شمال الصين والجنوب الغربي",
    },
    chengdu: {
      bestFor: "الباندا ومطبخ سيتشوان وقاعدة أهدأ إيقاعًا",
      stay: "2–3 ليالٍ في المدينة؛ أكثر لمن يمدّ رحلته في سيتشوان",
      routeRole: "قاعدة في الجنوب الغربي للتوغل أكثر في سيتشوان",
    },
    guangzhou: {
      bestFor: "المطبخ الكانتوني وثقافة لينغنان ومدينة جنوبية نابضة بالعمل",
      stay: "2–3 ليالٍ",
      routeRole: "بوابة الجنوب إلى دلتا نهر اللؤلؤ",
    },
    hangzhou: {
      bestFor: "البحيرة الغربية ومناظر الشاي وتغيير سهل للإيقاع",
      stay: "رحلة ليوم واحد أو ليلتان",
      routeRole: "امتداد طبيعي من شنغهاي، لا إضافة على عجل",
    },
    zhangjiajie: {
      bestFor: "قمم الحجر الرملي ونزهات الغابات ومناظر الجبال",
      stay: "3 أيام كاملة لمشاهدة المعالم",
      routeRole: "محطة جبلية تحتاج إلى أيام كاملة خاصة بها وقاعدة إقامة مستقلة",
    },
    chongqing: {
      bestFor: "مدينة ضخمة شديدة الانحدار، ومناظر ليلية، ومطبخ إقليمي جريء",
      stay: "3 ليالٍ",
      routeRole: "بوابة الجنوب الغربي؛ اجعل وولونغ امتدادًا مستقلًا",
    },
  },
  cityImageAlt: {
    beijing: "برج الطبل وبرج الجرس في بكين فوق أسطح الهوتونغ ذات القرميد الرمادي، وعلى اليمين زقاق مزدحم.",
    shanghai: "جسران فوق جدول سوتشو عند الغسق، وفي المقدمة مبانٍ قديمة في بوشي، وخلفها برج لؤلؤة الشرق وبرج شنغهاي.",
    xian: "برج الجرس في شيآن مضاء بلون ذهبي أمام سماء مسائية زرقاء داكنة، وأمامه خيوط من أضواء السيارات العابرة.",
    chengdu: "أشخاص يشربون الشاي على كراسٍ من الخيزران تحت جناح خشبي مسقوف تتدلى منه فوانيس حمراء، في بيت شاي بحديقة الشعب في تشنغدو.",
    guangzhou: "ديم سوم في سلال خيزران للطهي بالبخار، ولفائف نودلز الأرز الحمراء، وإبريق شاي، وغلاية نحاسية، وقارورة من الخوص على طاولة مستديرة في مطعم بان شي.",
    hangzhou: "قوارب صغيرة تعبر البحيرة الغربية في هانغتشو تحت تلال مكسوة بالأشجار والضباب.",
    zhangjiajie: "أعمدة شاهقة من الحجر الرملي الرمادي والبني الفاتح تعلوها الأشجار، ويتهادى بينها ضباب أبيض، في حديقة تشانغجياجيه الوطنية للغابات.",
    chongqing: "أفق يوتشونغ عبر نهر جيالينغ عند الغروب، وعلى اليمين جسر تشيانسيمن مضاء باللون الأحمر.",
  },
  openCity: "افتح دليل المدينة",
  winterGuideLabel: "تسافر في ديسمبر أو يناير أو فبراير؟ قارن بين وجهات الشتاء.",
  scaleEyebrow: "تصفّح حسب نوع المكان",
  scaleTitle: "انظر إلى ما هو أبعد من اسم المدينة.",
  scaleIntroduction:
    "استعن بفهارس الأماكن هذه عندما يكون السؤال جغرافيًا: أي منطقة، وأي نوع من المدن، أو أي معلم ومشهد طبيعي يستحق مكانًا في المسار.",
  openScale: "تصفّح الأماكن",
  collections: {
    "explore-regions-provinces": {
      label: "المناطق والمقاطعات",
      description: "المناظر الإقليمية وهويات المقاطعات والجغرافيا التي تربط بين عدة مدن، مشروحة قبل أن تتحول إلى برنامج رحلة.",
    },
    "explore-cities-neighborhoods": {
      label: "المدن والأحياء",
      description: "شكل المدينة وطابع أحيائها والفضاء العام اليومي، لا مجرد قائمة بالمعالم الشهيرة.",
    },
    "explore-attractions-nature-heritage": {
      label: "المعالم والطبيعة والتراث",
      description: "مواقع التراث والمتاحف والمناظر الطبيعية، مشروحة بمعناها وحدود الحجز والترتيب الذي يجعل الزيارة متماسكة.",
    },
  },
  handoffEyebrow: "سؤال من نوع آخر؟",
  handoffTitle: "استعن بدليل السفر حين تحتاج إلى إجابة، لا إلى مكان.",
  handoffBody:
    "قواعد الدخول والدفع والتنقل واختيار الفندق وتوقيت السفر تجدها في دليل السفر. أما برامج الرحلات المنشورة فتجدها في الرحلات الخاصة.",
  guidesAction: "افتح دليل السفر",
  toursAction: "قارن الرحلات الخاصة",
};

const copies: Readonly<Record<DestinationsHubEditionLocale, DestinationsHubEditionCopy>> = {
  fr: french,
  de: german,
  es: spanish,
  ar: arabic,
  ja: japaneseDestinationsHubCopy,
};

export function getDestinationsHubEditionCopy(language: DestinationsHubEditionLocale): DestinationsHubEditionCopy {
  return copies[language];
}
