import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Zhangjiajie in Spanish, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Guía de viaje de Zhangjiajie: 4–5 noches y dónde alojarte",
  h1: "Zhangjiajie: pilares de arenisca entre las nubes, en cuatro o cinco noches",
  description:
    "Dedica cuatro o cinco noches a Zhangjiajie: los pilares de arenisca y la montaña Tianmen. Dónde alojarte, qué aeropuerto y qué estación usar, y adónde ir después.",
  summary:
    "Asómate al borde en Yuanjiajie y el suelo desaparece bajo tus pies. Cientos de pilares de arenisca se alzan a pico desde el bosque, con pinos aferrados a sus cimas. Baja después al arroyo del Látigo Dorado y recorre el fondo del valle mirándolos desde abajo. Otro día, sube los 999 escalones de la montaña Tianmen hasta un agujero que atraviesa el acantilado de lado a lado. El Parque Forestal merece dos días, y Tianmen, uno. Cuatro noches te dan esos tres días completos; cinco te dejan uno de reserva por si la niebla tapa las vistas.",
  heroAlt:
    "Altos pilares de arenisca grises y ocres coronados de árboles, con niebla blanca flotando entre ellos, en el Parque Forestal Nacional de Zhangjiajie.",
  heroCaption:
    "Después de la lluvia, las nubes suben de los valles y flotan entre los pilares, y columnas enteras se desvanecen y reaparecen ante tus ojos. Intenta tener una mañana así en el borde de Yuanjiajie o de la montaña Tianzi.",
  geography: {
    title: "Los lugares de Zhangjiajie, en tres zonas",
    caption:
      "Esquema sin escala. Tianmen, el Parque Forestal y el Gran Cañón están separados, así que dale a cada uno su propio día. El aeropuerto y la estación están junto a la ciudad.",
    legend: {
      core: "Ciudad de Zhangjiajie",
      cluster: "Medio día o más",
      outside: "Un día aparte",
      gateway: "Aeropuerto y estación",
    },
    nodes: {
      city: { label: "Ciudad de Zhangjiajie", note: "Cerca de Tianmen; cómoda tras una llegada tardía" },
      wulingyuan: { label: "Wulingyuan", note: "Junto a la Puerta Este; alójate aquí para el parque" },
      yuanjiajie: { label: "Yuanjiajie", note: "El puente de piedra y el pilar de Avatar" },
      tianzi: { label: "Montaña Tianzi", note: "La vista más amplia sobre los pilares" },
      tianmen: { label: "Montaña Tianmen", note: "El arco y los senderos del acantilado; un día entero" },
      grandcanyon: { label: "Gran Cañón", note: "El puente de cristal y después la bajada hasta las cascadas" },
      dyg: { label: "Aeropuerto DYG", note: "Junto a la ciudad; a un trayecto en coche del parque" },
      weststation: { label: "Zhangjiajie Oeste", note: "Trenes de alta velocidad, junto a la ciudad" },
    },
  },
  overview: {
    nights: {
      answer: "Cuatro o cinco noches te dan tres o cuatro días completos.",
      detail:
        "Los días de llegada y de salida se van casi enteros en desplazamientos. Con tres días completos, el Parque Forestal se lleva dos y la montaña Tianmen, uno; con solo dos, o el parque se queda en un día o Tianmen se cae del plan. Un cuarto día te permite esperar a que se vaya la niebla, ir más despacio o ver el puente de cristal del Gran Cañón.",
    },
    stay: {
      answer: "Alójate en Wulingyuan, justo a la salida de la Puerta Este del Parque Forestal.",
      detail:
        "Te despiertas junto al parque y puedes cruzar la entrada temprano los dos días de parque. El aeropuerto, la estación y Tianmen están junto a la ciudad, así que duerme allí tras una llegada tardía, antes de una salida temprana o para tu día en Tianmen. Cambia de hotel solo cuando el trayecto que te ahorras compense volver a hacer las maletas.",
    },
    gateway: {
      answer: "Tanto el aeropuerto DYG como la estación de Zhangjiajie Oeste están junto a la ciudad.",
      detail:
        "Ninguno de los dos está en el parque, así que al aterrizar o bajar del tren aún te queda un trayecto en coche hasta Wulingyuan. ¿Llegas tarde? Duerme en la ciudad y sal por la mañana. Ten a mano el nombre y la dirección de tu hotel en chino, y sube solo a coches con licencia.",
    },
    next: {
      answer: "Después de las montañas, pasa una noche en el casco antiguo de Fenghuang.",
      detail:
        "Llegar ya es un viaje en sí mismo, así que no sirve como escapada rápida de una tarde. Llega para la tarde, quédate a dormir y vuelve a recorrer el casco antiguo a la mañana siguiente. ¿Vas a Pekín o Shanghái? Compara vuelos y trenes por el trayecto completo, de puerta a puerta.",
    },
  },
  opening: {
    heading: "Por qué Zhangjiajie no se parece a ningún otro lugar de China",
    paragraphs: [
      "Zhangjiajie es un bosque hecho de piedra. Miles de pilares de arenisca se alzan desde valles boscosos, muchos más altos que una torre de 60 plantas. Puedes cruzar a pie un puente natural de piedra a más de 300 metros sobre el valle y, en un día de niebla, entender por qué un pilar se rebautizó con el nombre de la película Avatar. Hacia principios de noviembre, las laderas de la montaña Tianzi suelen volverse rojas y doradas. En los días húmedos, las nubes entran en el gran arco de la montaña Tianmen y salen a borbotones por el otro lado.",
      "Zhangjiajie queda lejos de Pekín o Shanghái, en avión o en tren, así que dale tiempo. Si la vas a encajar entre las dos, cuenta solo los días que pasarás en las montañas. El vuelo o el tren de llegada, el trayecto hasta Wulingyuan y cualquier cambio de hotel van aparte. En un viaje muy corto por China, ven solo si estos pilares son lo que más quieres ver. Guarda un día de reserva si puedes, para que un día de niebla no te cueste las vistas.",
    ],
  },
  sources: {
    "https://whc.unesco.org/en/list/640/": {
      publisher: "Centro del Patrimonio Mundial de la UNESCO",
      label: "Área de interés paisajístico e histórico de Wulingyuan",
    },
    "https://www.zjj.gov.cn/": {
      publisher: "Gobierno Popular del Municipio de Zhangjiajie",
      label: "Gobierno municipal de Zhangjiajie",
    },
    "https://www.12306.cn/en/index.html": {
      publisher: "China Railway 12306",
      label: "Búsqueda por fecha en China Railway 12306",
    },
    "https://www.caac.gov.cn/": {
      publisher: "Administración de Aviación Civil de China",
      label: "Identificación del aeropuerto Hehua de Zhangjiajie",
    },
  },
  guides: {
    "chengdu-chongqing-zhangjiajie-itinerary": "Chengdu–Chongqing–Zhangjiajie",
    "zhangjiajie-itinerary": "Guía de Zhangjiajie",
    "avatar-mountains-zhangjiajie": "Montañas de Avatar",
    "zhangjiajie-national-forest-park-tickets-and-entrances": "Parque de Zhangjiajie: entradas y accesos",
    "zhangjiajie-city-or-wulingyuan-hotel-base": "Dónde alojarse en Zhangjiajie",
    "zhangjiajie-glass-bridge-vs-skywalk": "Notas de campo de Tantan en Zhangjiajie",
  },
};

export default content;
