import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Chengdu in Spanish, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Guía de viaje de Chengdu: 3 noches y dónde alojarte",
  h1: "Chengdu: pandas, casas de té y hotpot de Sichuan, en tres noches",
  description:
    "Tres noches en Chengdu: los pandas, el té en el Parque del Pueblo y el hotpot de Sichuan. Dónde alojarte, aeropuerto de Tianfu o Shuangliu, y por qué sigue Chongqing.",
  summary:
    "Llega a la Base de osos panda cuando abren las puertas. Al doblar una curva puedes encontrarte un panda gigante recostado contra un tronco como una persona, dando cuenta de una caña de bambú que sujeta con las dos patas. Otra mañana, siéntate en una silla de bambú en una casa de té del Parque del Pueblo, deja pasar una hora o dos y termina el día con un hotpot. Solo los pandas llenan una mañana, así que tres noches te dan dos días completos, uno para cada cosa, sin prisas.",
  heroAlt:
    "Gente tomando té en sillas de bambú bajo un pabellón de madera cubierto con farolillos rojos, en una casa de té del Parque del Pueblo de Chengdu.",
  heroCaption:
    "Alarga el té y la vida del parque irá pasando junto a tu mesa. En este parque, en la centenaria casa de té Heming, puedes incluso pedir que te limpien los oídos, si te atreves.",
  geography: {
    title: "Los lugares de Chengdu, y tres ciudades más allá",
    caption:
      "Esquema sin escala. La Base de osos panda está en el borde de la ciudad; Dujiangyan, Sanxingdui y Leshan son otras ciudades, cada una a un día entero de excursión.",
    legend: {
      core: "Centro de la ciudad",
      cluster: "Medio día o más",
      outside: "Un día entero de excursión",
      gateway: "Aeropuertos y estación",
    },
    nodes: {
      centre: { label: "Parque del Pueblo · plaza Tianfu", note: "Té en el parque, museos, paseos por el centro" },
      panda: { label: "Base de osos panda de Chengdu", note: "En el borde de la ciudad; una mañana, mejor a la apertura" },
      wuhou: { label: "Templo Wuhou · Jinli", note: "Santuario de los Tres Reinos, con tiendas al lado" },
      dujiangyan: { label: "Dujiangyan · Valle de los Pandas", note: "Otra ciudad, al oeste; un día entero" },
      sanxingdui: { label: "Sanxingdui, Guanghan", note: "Rostros de bronce, al noreste; un día entero" },
      leshan: { label: "Leshan", note: "El Gran Buda, al sur; un día largo" },
      tfu: { label: "Aeropuerto de Tianfu (TFU)", note: "Muy al sureste; un largo trayecto hasta el centro" },
      ctu: { label: "Aeropuerto de Shuangliu (CTU)", note: "Al suroeste; suele estar más cerca del centro" },
      east: { label: "Chengdu Este", note: "Muchos trenes de alta velocidad; mira tu billete" },
    },
  },
  overview: {
    nights: {
      answer: "Tres noches te dan dos días completos en la ciudad.",
      detail:
        "Si aterrizas por la noche, el primer día se queda en la cena. Tres noches dan a los pandas una mañana propia, y otro día al té en el Parque del Pueblo y al Templo Wuhou. Añade ópera de Sichuan por la noche si aún te quedan fuerzas. Una cuarta noche suma una excursión de un día a Sanxingdui, Dujiangyan o Leshan.",
    },
    stay: {
      answer: "¿Primera vez? Alójate cerca de la calle Chunxi y Taikoo Li.",
      detail:
        "Tendrás cenas y calles animadas a la puerta, el templo Daci cerca y el metro en varias direcciones. Un hotel «cerca de Taikoo Li» puede tener la entrada en el interior de un centro comercial, así que comprueba el camino desde el metro y dónde puede parar un coche. Para mañanas tranquilas en una casa de té, mira los callejones Kuanzhai o el Parque del Pueblo.",
    },
    gateway: {
      answer: "Comprueba si tu billete dice Tianfu o Shuangliu y planifica el trayecto.",
      detail:
        "Tianfu está muy al sureste, a un largo trayecto del centro incluso con la línea 18 del metro; Shuangliu, al suroeste, suele estar más cerca del centro. Los vuelos cambian de uno a otro, así que vuelve a comprobarlo poco antes de volar. Muchos trenes de alta velocidad usan Chengdu Este, pero Chengdu Sur y Chengdu Oeste son estaciones distintas.",
    },
    next: {
      answer: "Chongqing es la siguiente parada natural, más empinada y más rápida que Chengdu.",
      detail:
        "Después de días lentos de casas de té y comidas largas, el contraste es la razón para ir. Si prefieres ver más de Sichuan, duerme una noche en Leshan o Dujiangyan para que la excursión no sea una carrera. Jiuzhaigou, en las montañas muy al norte, necesita varios días y alojamiento propio.",
    },
  },
  opening: {
    heading: "Por qué en Chengdu un viaje por China baja el ritmo",
    paragraphs: [
      "Chengdu es una ciudad enorme que aún te deja tomarte tu tiempo. El té en el Parque del Pueblo puede ocupar el final de la mañana, y una comida larga puede alargarse hasta la tarde. En torno al templo Daci, un templo antiguo se alza entre las tiendas de hoy, y en el Templo Wuhou puedes seguir la historia de los Tres Reinos. Al anochecer, camina hasta un puente cubierto sobre el río Jin, mira las torres de oficinas reflejadas en el agua y deja que una cena de hotpot te acompañe durante la noche.",
      "Después de Pekín o Xi’an, Chengdu lleva el viaje hacia la vida cotidiana, la cocina de Sichuan y los paisajes de más allá de la ciudad. Dale al menos tres noches, para que los pandas y las casas de té tengan un día cada uno. Si la metes con calzador en un viaje apretado por Pekín, Xi’an y Shanghái solo por una foto con un panda, puede convertirse en un desvío caro.",
    ],
  },
  stayExample: [
    { id: "first-stay-plan-heading", type: "heading", level: 2, text: "Tu primer viaje a Chengdu: tres noches, cuatro días" },
    {
      id: "first-stay-plan-intro",
      type: "paragraph",
      text: "Llegas el día uno y te vas el día cuatro, con dos días completos entre medias. Dedica uno a los pandas y el otro al té en el Parque del Pueblo y al Templo Wuhou.",
    },
    {
      id: "first-stay-plan",
      type: "list",
      items: [
        "Día 1 — Instálate en un hotel céntrico y cena cerca. Si aterrizas por la noche, la cena es todo el día, así que no pagues por adelantado un espectáculo que dependa de que el vuelo llegue a su hora.",
        "Día 2 — Ve a la Base de osos panda a tu hora de entrada reservada por la mañana y mira a los pandas desayunar, con el bambú entre las dos patas. La visita y el trayecto de ida y vuelta bastan para un día, así que come en la ciudad y tómate la tarde con calma.",
        "Día 3 — Empieza con un té en una silla de bambú en una casa de té del Parque del Pueblo y después dale tiempo al Templo Wuhou para que cuente su historia de los Tres Reinos. Toma un hotpot tan picante como le guste a tu grupo y añade la ópera de Sichuan solo si te quedan fuerzas y el teatro no queda lejos.",
        "Día 4 — Deja el hotel y sigue viaje. Comprueba primero cuánto se tarda en llegar exactamente al aeropuerto o a la estación de tu billete; añade un desayuno o un paseo corto solo si hay tiempo.",
      ],
    },
    {
      id: "first-stay-plan-extra-night",
      type: "paragraph",
      text: "Una cuarta noche suma un tercer día completo. Mantén los dos días en la ciudad y añade una excursión a Sanxingdui, Dujiangyan o Leshan, después de leer su guía más abajo. Con dos noches, quédate con la mañana de los pandas y un día en la ciudad, y deja las excursiones para otra vez. Si no consigues una entrada de mañana para los pandas el día 2, intercambia los días 2 y 3; no metas las dos cosas en una sola tarde.",
    },
  ],
  sources: {
    "https://www.wuhouci.net.cn/about": {
      publisher: "Museo del Templo Wuhou de Chengdu",
      label: "Museo del Templo Wuhou: el santuario y su contexto de los Tres Reinos",
    },
    "https://www.panda.org.cn/en/service/ticket/": {
      publisher: "Base de Investigación de Cría del Panda Gigante de Chengdu",
      label: "Base de Investigación de Cría del Panda Gigante de Chengdu: entradas, franjas de acceso y normas sobre documentos",
    },
    "https://m.panda.org.cn/cn/news/notice/2026-07-16/8879.html": {
      publisher: "Base de Investigación de Cría del Panda Gigante de Chengdu",
      label: "Base de osos panda de Chengdu: aviso oficial sobre el calor del verano y la observación en interiores",
    },
    "https://m.panda.org.cn/en/service/transit/": {
      publisher: "Base de Investigación de Cría del Panda Gigante de Chengdu",
      label: "Base de osos panda de Chengdu: indicaciones oficiales de transporte público",
    },
  },
  guides: {
    "chengdu-chongqing-zhangjiajie-itinerary": "Chengdu–Chongqing–Zhangjiajie",
    "chengdu-panda-base-or-dujiangyan-panda-valley": "Osos panda en Chengdu",
    "sanxingdui-museum-booking-and-gallery-order": "Sanxingdui: reserva y recorrido",
    "chengdu-jiuzhaigou-transport-route": "De Chengdu a Jiuzhaigou",
    "leshan-giant-buddha-land-or-boat-visit": "Leshan: por tierra o en barco",
    "chengdu-greenway-city-ring": "Elige un tramo del anillo verde de Chengdu",
  },
};

export default content;
