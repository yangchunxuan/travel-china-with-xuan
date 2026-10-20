import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Beijing in Spanish, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Guía de viaje de Pekín: 4–5 noches y dónde alojarte",
  h1: "Pekín: palacios, la Gran Muralla y los hutongs, en cuatro o cinco noches",
  description:
    "Dedica cuatro o cinco noches a Pekín: la Ciudad Prohibida, la Gran Muralla, los hutongs. Dónde alojarte, qué aeropuerto y qué estación usar, y adónde ir después.",
  summary:
    "Camina hacia el norte desde Tiananmén a través de la Ciudad Prohibida, sube a la colina de Jingshan y todo un mar de tejados de teja dorada se extiende a tus pies. Dedica otro día a la Gran Muralla, sobre sus crestas montañosas fuera de la ciudad, y pasa las noches cenando y paseando por los callejones de los hutongs alrededor de la Torre del Tambor. Cada uno de los grandes lugares de Pekín pide de medio día a un día entero, así que cuatro o cinco noches te dan tres o cuatro días de verdad, sin prisas.",
  heroAlt:
    "La Torre del Tambor y la Torre de la Campana de Pekín sobre los tejados de teja gris de los hutongs, con un callejón concurrido a la derecha.",
  heroCaption:
    "Al pie de la Torre del Tambor y la Torre de la Campana, los hutongs de tejas grises se extienden en todas direcciones. Ven a última hora de la tarde, come en los callejones y luego camina unos minutos hasta los lagos de Shichahai.",
  geography: {
    title: "Los lugares de Pekín se reparten en cinco direcciones",
    caption:
      "Esquema sin escala. Los lugares de una misma dirección caben en un mismo día; la Gran Muralla necesita un día entero para ella sola.",
    legend: {
      core: "Centro de la ciudad",
      cluster: "Medio día o más",
      outside: "Un día entero",
      gateway: "Aeropuerto",
    },
    nodes: {
      axis: { label: "Tiananmén · Ciudad Prohibida · Jingshan", note: "Un día entero, caminando de sur a norte" },
      south: { label: "Qianmen · Templo del Cielo", note: "De medio día a un día entero" },
      northwest: { label: "Palacio de Verano · noroeste", note: "Al menos medio día, a menudo casi uno entero" },
      gulou: { label: "Gulou · Shichahai", note: "Paseos por los hutongs y cenas" },
      chaoyang: { label: "Chaoyang · CBD", note: "Cenas y vida nocturna; cómodo tras un vuelo tardío" },
      wall: { label: "Gran Muralla", note: "Ir y volver lleva todo el día; no añadas nada más" },
      pek: { label: "PEK", note: "Al noreste; tren del aeropuerto hasta Dongzhimen" },
      pkx: { label: "PKX", note: "Muy al sur; tren del aeropuerto hasta Caoqiao" },
    },
  },
  overview: {
    nights: {
      answer: "Cuatro o cinco noches te dan tres o cuatro días completos.",
      detail:
        "Los días de llegada y de salida se van casi enteros en desplazamientos. Con tres noches aún te da tiempo para la Ciudad Prohibida y la Gran Muralla, pero el Palacio de Verano suele quedarse fuera, y si una reserva falla no queda ningún día libre al que pasarla.",
    },
    stay: {
      answer: "¿Primera vez? Alójate cerca de Wangfujing o Dongdan.",
      detail:
        "La Ciudad Prohibida queda cerca, hay líneas de metro en todas direcciones y es fácil encontrar dónde cenar. Para un hotel con patio en los hutongs, busca en torno a Gulou y Shichahai, pero pregunta antes si hay ascensor y si un coche puede llegar hasta la puerta.",
    },
    gateway: {
      answer: "Comprueba qué aeropuerto y qué estación figuran en tus billetes y después reserva el hotel.",
      detail:
        "Pekín tiene dos aeropuertos, Capital y Daxing, y ocho grandes estaciones de tren, todos muy alejados entre sí. ¿Aterrizas tarde en Capital? Pasa la primera noche cerca de Dongzhimen. Los trenes a Shanghái suelen salir de Pekín Sur, y los de Xi’an, de Pekín Oeste. No pongas ninguna gran visita el día que te vas.",
    },
    next: {
      answer: "Xi’an es la continuación más natural; Shanghái, el mayor contraste.",
      detail:
        "Un tren de alta velocidad te lleva a Xi’an para ver los Guerreros de Terracota y la antigua muralla. Shanghái cambia la vieja capital por los rascacielos. Con tiempo suficiente, Pekín, Xi’an y Shanghái se encadenan en una sola línea de alta velocidad.",
    },
  },
  opening: {
    heading: "Por qué tantos primeros viajes a China empiezan en Pekín",
    paragraphs: [
      "Una sola ciudad reúne un palacio imperial, la Gran Muralla, los callejones de los hutongs y torres de cristal. Puedes pasar la mañana en los patios donde vivían los emperadores, cenar en un hutong y terminar la noche en Guomao o Sanlitun, en el Pekín de hoy.",
      "Empezar aquí tiene otra ventaja. Unos días en el mismo hotel te permiten superar el desfase horario y aprender cómo funciona China sobre el terreno: reservar las visitas con tu pasaporte, moverte en metro y cuánto se camina dentro de los grandes recintos. Cada ciudad que venga después te resultará más fácil. Si Pekín va al final, no encadenes la llegada desde otra ciudad, un día en la Gran Muralla y un vuelo internacional a primera hora: basta un retraso para que todo lo que viene detrás se venga abajo.",
    ],
  },
  sources: {
    "https://www.beijing.gov.cn/ywdt/gzdt/202512/t20251229_4374283.html": {
      publisher: "Gobierno Municipal de Pekín",
      label: "El sistema de ocho estaciones y dos aeropuertos de Pekín tras la apertura de Tongzhou",
    },
    "https://english.beijing.gov.cn/livinginbeijing/transportation/railway/202512/t20251231_4381067.html": {
      publisher: "Gobierno Municipal de Pekín",
      label: "La estación de Pekín Tongzhou empezó a recibir pasajeros el 30 de diciembre de 2025",
    },
    "https://english.beijing.gov.cn/livinginbeijing/transportation/airport/202005/t20200516_1899219.html": {
      publisher: "Gobierno Municipal de Pekín",
      label: "Recorrido del tren exprés del aeropuerto Capital por Sanyuanqiao y Dongzhimen",
    },
    "https://english.beijing.gov.cn/travellinginbeijing/transportation/airport/202005/t20200516_1899220.html": {
      publisher: "Gobierno Municipal de Pekín",
      label: "Recorrido del tren exprés del aeropuerto de Daxing hasta Caoqiao",
    },
  },
  guides: {
    "china-10-day-itinerary": "China en 10 días",
    "beijing-where-to-stay-first-trip": "Dónde alojarse en Pekín",
    "beijing-courtyard-hotel-or-modern-hotel": "Hotel con patio u hotel moderno",
    "which-beijing-railway-station": "¿Qué estación de Pekín?",
    "beijing-south-station-to-capital-or-daxing-airport": "De Pekín Sur a PEK o PKX",
    "great-wall-section-selector-from-beijing": "Muralla China desde Pekín",
  },
};

export default content;
