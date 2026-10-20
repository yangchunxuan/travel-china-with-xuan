import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Xi'an in Spanish, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Guía de viaje de Xi’an: 3 noches y dónde alojarte",
  h1: "Xi’an: los Guerreros de Terracota, la muralla y los callejones de comida, en tres noches",
  description:
    "Tres noches en Xi’an: un día para los Guerreros de Terracota y otro para la muralla y los callejones de comida. Dónde alojarte, qué estación usar y adónde seguir.",
  summary:
    "Entra en la nave que cubre el foso 1, en Lintong, y de pronto el ejército está a tus pies: soldados de arcilla a tamaño natural, fila tras fila, con caras y barbas que cambian de uno a otro. De vuelta en la ciudad, recorre lo alto de la muralla, ancha como una carretera, y termina la tarde junto a las torres de la Campana y del Tambor, comiendo en los callejones del barrio musulmán. Los guerreros ocupan casi todo un día, así que tres noches te dan un día completo para ellos y otro para la propia Xi’an.",
  heroAlt:
    "La Torre de la Campana de Xi’an iluminada en dorado contra un cielo nocturno azul intenso, con estelas de luz del tráfico que pasa por delante.",
  heroCaption:
    "La Torre de la Campana se alza en el corazón de la ciudad amurallada. Pasa junto a la Torre del Tambor para comer en los callejones del barrio musulmán, o camina quince minutos por la calle Sur hasta la Puerta Sur para subir a la muralla.",
  geography: {
    title: "Los lugares de Xi’an se extienden al sur y al este de la muralla",
    caption:
      "Esquema sin escala. La ciudad antigua y el museo que queda al sur piden medio día cada uno; los guerreros ocupan casi todo un día, y el monte Hua, uno entero.",
    legend: {
      core: "Centro de la ciudad antigua",
      cluster: "Medio día o más",
      outside: "Un día fuera de la ciudad",
      gateway: "Aeropuerto y estaciones",
    },
    nodes: {
      wall: { label: "Muralla · torres de la Campana y del Tambor", note: "Paseos por la muralla y cenas en el barrio musulmán" },
      south: { label: "Museo de Historia de Shaanxi · Dayanta", note: "Medio día: el museo y después la pagoda" },
      lintong: { label: "Lintong · Guerreros de Terracota", note: "Casi todo un día, con la ida y la vuelta" },
      huashan: { label: "Monte Hua", note: "Un día entero, o haz noche cerca" },
      north: { label: "Xi’an Norte", note: "La principal estación de alta velocidad, al norte del centro" },
      xiy: { label: "Aeropuerto XIY", note: "Al noroeste, del lado de Xianyang" },
      east: { label: "Xi’an Este", note: "Estación del este, abierta desde junio de 2026" },
    },
  },
  overview: {
    nights: {
      answer: "Tres noches te dan un día completo para los guerreros y otro para la ciudad.",
      detail:
        "Los días de llegada y de salida se van casi enteros en desplazamientos. Con dos noches, la mayoría dedica su único día completo a los Guerreros de Terracota; una tercera noche le da a la ciudad un día propio. ¿Quieres añadir el monte Hua? Necesita otro día entero, así que cuenta cuatro noches.",
    },
    stay: {
      answer: "¿Primera vez? Alójate cerca de la Torre de la Campana, dentro de la muralla.",
      detail:
        "La Torre del Tambor y los callejones de comida del barrio musulmán quedan a un corto paseo, así que cenar es fácil. La zona se llena de gente y de ruido: pide una habitación en el lado tranquilo y comprueba que un coche pueda llegar hasta la puerta. Si lo que vienes a ver es el museo y la Gran Pagoda de la Oca Salvaje, alójate mejor en Dayanta o Xiaozhai.",
    },
    gateway: {
      answer: "Comprueba cuál de las tres grandes estaciones de Xi’an figura en tu billete.",
      detail:
        "Xi’an Norte, la principal estación de alta velocidad, queda a un trayecto de la Torre de la Campana, no a un paseo. La estación de Xi’an está justo al norte de la antigua muralla, y Xi’an Este abrió en junio de 2026, así que las guías más antiguas pueden no mencionarla. ¿Llegas en avión? El XIY está al noroeste, hacia Xianyang; ve a la terminal que indique tu aerolínea.",
    },
    next: {
      answer: "Sigue hacia Chengdu o Pekín; Xi’an está en la línea que las une.",
      detail:
        "Pekín, Xi’an y Chengdu forman una sola línea, en cualquier sentido. Chengdu cambia los soldados de arcilla y las murallas por la comida de Sichuan y la vida de barrio; Pekín salta a la capital de los emperadores de épocas posteriores. ¿Llegas tarde a Chengdu? Deja la mañana siguiente libre de visitas con hora fija.",
    },
  },
  opening: {
    heading: "Por qué tantos primeros viajes a China pasan por Xi’an",
    paragraphs: [
      "Xi’an te lleva más atrás en el tiempo que Pekín. Desde lo alto de la muralla, la ciudad antigua que ves abajo es solo una séptima parte, más o menos, de Chang’an, la capital de los Tang; el resto yace bajo la ciudad moderna que se extiende más allá. En el Museo de Historia de Shaanxi, las pinturas murales de las tumbas Tang devuelven el color a aquella corte: jugadores de polo a pleno galope, músicos, bailarines y enviados extranjeros, uno de ellos de Corea. A poca distancia se alza la Gran Pagoda de la Oca Salvaje, construida en origen para guardar las escrituras que el monje Xuanzang trajo de la India.",
      "Xi’an está entre Pekín y Chengdu en las grandes líneas ferroviarias, así que puedes añadirla a un primer viaje sin desviarte. Lo que pide a cambio es tiempo. Dale al menos un día completo que no sea ni de llegada ni de salida. Si llegas tarde y te vas temprano a la mañana siguiente, verás tu hotel y muy poco de Xi’an.",
    ],
  },
  sources: {
    "http://www.xa.gov.cn/xw/zwzx/msyw/2072145741715947521.html": {
      publisher: "Gobierno Popular Municipal de Xi’an",
      label: "La estación de Xi’an Este entró en servicio el 30 de junio de 2026 con la línea de alta velocidad Xi’an–Shiyan",
    },
    "https://en.xa.gov.cn/CultureTravel/Transportation/1873656097505083393.html": {
      publisher: "Gobierno Popular Municipal de Xi’an",
      label: "Terminal 5 del Aeropuerto Internacional de Xi’an Xianyang",
    },
    "https://www.bmy.com.cn/guide/": {
      publisher: "Museo del Mausoleo del Emperador Qin Shi Huang",
      label: "Una sola entrada para los fosos de los Guerreros de Terracota y el Jardín de Lishan, la lanzadera gratuita y la reserva con pasaporte",
    },
    "https://www.sxhm.com/guide.h": {
      publisher: "Museo de Historia de Shaanxi",
      label: "Guía de visita y reserva del Museo de Historia de Shaanxi",
    },
  },
  guides: {
    "china-10-day-itinerary": "China en 10 días",
    "terracotta-warriors-without-tour": "Guerreros de Terracota",
    "shaanxi-history-museum-booking-and-collection-plan": "Plan para el Museo de Historia de Shaanxi",
    "xian-where-to-stay-city-wall-or-dayanta": "Zonas para alojarse en Xi’an",
    "beijing-xian-chengdu-route-order": "Orden Pekín–Xi’an–Chengdu",
    "chinese-city-walls-gates-and-urban-order": "Cómo leer las murallas de las ciudades chinas",
  },
};

export default content;
