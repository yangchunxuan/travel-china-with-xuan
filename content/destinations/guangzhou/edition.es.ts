import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Guangzhou in Spanish (Cantón, as the edition names it), translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Guía de viaje de Cantón: 3 noches y dónde alojarte",
  h1: "Cantón: té de la mañana, callejones antiguos y el río de las Perlas, en tres noches",
  description:
    "Tres noches en Cantón (Guangzhou): té de la mañana, callejones antiguos y la Torre de Cantón de noche. Dónde alojarte, qué terminal y estación usar y adónde seguir.",
  summary:
    "Empieza el día con el té de la mañana en Liwan, con las vaporeras de bambú llenas de dim sum ocupando la mesa. Después levanta la vista en el Salón Ancestral del Clan Chen, donde las figuras de arcilla llenan las cumbreras, y pasea por los callejones de Yongqingfang hasta la tranquila calle de Shamian, bajo los alcanforeros. Cuando oscurece, la Torre de Cantón se ilumina sobre el río de las Perlas. Llegar y marcharse ocupa más del día de lo que esperas, así que tres noches te permiten disfrutar de la ciudad antigua y de la nueva junto al río sin ir con prisa en ninguna.",
  heroAlt:
    "Dim sum en vaporeras de bambú, rollos rojos de fideos de arroz, una tetera, un hervidor de latón y una petaca de mimbre sobre una mesa redonda del restaurante Pan Xi.",
  heroCaption:
    "Té de la mañana en el restaurante Pan Xi, en Liwan, con las cestas pasando de mano en mano alrededor de la mesa. Después dedica el día al viejo oeste, del Salón Ancestral del Clan Chen, pasando por Yongqingfang, hasta Shamian a última hora de la tarde.",
  geography: {
    title: "El Cantón antiguo, al oeste; la ciudad nueva, al este",
    caption:
      "Esquema sin escala. El viejo oeste se recorre a pie en un día tranquilo; Chimelong, al sur, en Panyu, necesita un día entero para él solo.",
    legend: {
      core: "Ciudad antigua",
      cluster: "Medio día o más",
      outside: "Un día entero",
      gateway: "Aeropuerto y estaciones",
    },
    nodes: {
      liwan: { label: "Liwan · Shamian", note: "Té de la mañana, callejones antiguos, Shamian al atardecer" },
      yuexiu: { label: "Calle Beijing · Yuexiu", note: "Calzadas antiguas a la vista bajo la calle; museos" },
      tianhe: { label: "Tianhe · Ciudad Nueva de Zhujiang", note: "Los rascacielos; la Torre de Cantón al otro lado del río" },
      pazhou: { label: "Pazhou", note: "Pabellones de la Feria de Cantón; las ferias disparan los precios de los hoteles" },
      panyu: { label: "Chimelong, Panyu", note: "Un día entero en familia; no añadas nada más" },
      baiyun: { label: "Aeropuerto de Baiyun", note: "Solo T2 o T3; la T1 está cerrada" },
      gzstation: { label: "Estación de Cantón", note: "Trenes de alta velocidad a Pekín desde 2026" },
      east: { label: "Cantón Este", note: "Lado de Tianhe; trenes a Shenzhen" },
      south: { label: "Cantón Sur", note: "Enorme estación en Panyu; trenes a Hong Kong" },
    },
  },
  overview: {
    nights: {
      answer: "Tres noches te dan dos días completos en la ciudad.",
      detail:
        "Con dos noches tienes un buen día en el viejo oeste, más la ciudad nueva junto al río o una llegada sin prisas, pero no las dos cosas. Chimelong ocupa un día entero, así que las familias suelen añadir una noche para él. Un día gastronómico en Shunde o una excursión a Foshan necesita otra más.",
    },
    stay: {
      answer: "¿Primera vez? Alójate en Liwan o cerca de la calle Beijing, en Yuexiu.",
      detail:
        "En Liwan tienes el té de la mañana a mano; el Salón Ancestral del Clan Chen, Yongqingfang y Shamian se recorren a pie en un día tranquilo, y las noches son pausadas. La calle Beijing es más céntrica, con museos cerca y líneas de metro que cruzan la ciudad. Comprueba el trayecto real a pie del hotel al metro, no solo el distrito.",
    },
    gateway: {
      answer: "Comprueba la terminal del aeropuerto y la estación de tren, y después reserva el hotel.",
      detail:
        "El aeropuerto de Baiyun ya solo usa las terminales T2 y T3; la T1 está cerrada a los pasajeros desde mayo de 2026. La T3 no tiene estación de metro propia, así que toma la línea 3 o 9 hasta Gaozeng y después el autobús del aeropuerto, o un taxi si llevas equipaje pesado. Para Hong Kong, mira primero Cantón Sur, en las afueras, en Panyu, y calcula el tiempo para llegar.",
    },
    next: {
      answer: "Hong Kong es la siguiente parada natural; dale al menos una noche.",
      detail:
        "Hay trenes de alta velocidad de Cantón Sur a Hong Kong West Kowloon, pero Hong Kong tiene su propio control de entrada, así que no conviene como excursión de un día. Para una excursión, elige Foshan o Shunde, y Shunde si lo que buscas es la comida. Shenzhen queda de camino; haz noche allí solo si hay algo que de verdad quieras hacer.",
    },
  },
  opening: {
    heading: "Por qué Cantón merece más que una escala",
    paragraphs: [
      "La comida cantonesa ya es razón suficiente para quedarse, y cada día puede empezar con ella: té servido alrededor de una gran mesa y cestas de dim sum para compartir. La calle Beijing es una concurrida calle comercial construida sobre calzadas más antiguas, excavadas y dejadas a la vista. Cruza un pequeño puente hacia Shamian, donde antes se cerraban unas verjas de hierro por la noche, y el ruido del tráfico se desvanece. Cuando oscurece, recorre el curvo puente Haixin hasta la orilla norte y date la vuelta. La Torre de Cantón brilla sobre el río de las Perlas, con su reflejo debajo.",
      "Muchos viajes pasan por Cantón de todos modos. Es una gran ciudad de llegada internacional, con trenes que siguen hacia Hong Kong y Macao, así que resulta una primera o última parada fácil en la China continental. Eso sí, cuenta las horas reales. Si aterrizas a media tarde, recoges el equipaje y te registras en el hotel, la tarde ya se ha ido. Si sales en un tren de la mañana desde Cantón Sur, buena parte de la mañana se va antes que el tren.",
    ],
  },
  sources: {
    "https://www.eguangzhou.gov.cn/gzlatest/content/post_42957.html": {
      publisher: "Oficina de Asuntos Exteriores del Gobierno Municipal de Cantón",
      label: "Las aerolíneas de la T1 de Baiyun pasaron a la T3 y las estaciones de tren ligadas a la T1 dejaron de tener parada desde el 7 de mayo de 2026",
    },
    "https://www.eguangzhou.gov.cn/gzlatest/content/post_43024.html": {
      publisher: "Oficina de Asuntos Exteriores del Gobierno Municipal de Cantón",
      label: "La T1 cerró; la T3 no tiene conexión directa de metro y el aeropuerto aconseja la línea 3 o la línea 9 hasta Gaozeng y después la lanzadera",
    },
    "https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10648700.html": {
      publisher: "Gobierno Popular del Municipio de Cantón",
      label: "Desde el 26 de enero de 2026, ningún tren convencional empieza ni termina su recorrido en la estación de Cantón",
    },
    "https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10675644.html": {
      publisher: "Gobierno Popular del Municipio de Cantón",
      label: "La estación de Cantón pasa a la alta velocidad y Cantón Baiyun asume los servicios convencionales",
    },
  },
  guides: {
    "guangzhou-baiyun-airport-t2-t3": "Aeropuerto de Guangzhou",
    "guangzhou-hong-kong-transport-route": "De Cantón a Hong Kong",
    "guangzhou-macau-transport-route": "Rutas de Cantón a Macao",
    "guangzhou-shenzhen-hong-kong-route-order": "Cantón–Shenzhen–Hong Kong",
    "how-guangzhou-morning-tea-works": "Cómo funciona el té de la mañana en Cantón",
    "when-metro-construction-meets-archaeology": "Cuando las obras del metro se topan con la arqueología",
  },
};

export default content;
