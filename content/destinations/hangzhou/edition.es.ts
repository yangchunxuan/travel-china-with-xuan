import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Hangzhou in Spanish, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Guía de viaje de Hangzhou: 2 noches o excursión desde Shanghái",
  h1: "Hangzhou: el Lago del Oeste, Lingyin y las aldeas de té de Longjing, en dos noches",
  description:
    "Dos noches en Hangzhou, no una excursión: el Lago del Oeste al alba y al atardecer, Lingyin y las aldeas de té de Longjing. Dónde alojarte, qué estación y qué sigue.",
  summary:
    "Llega temprano al dique Su, cuando la niebla aún flota sobre el agua y los sauces rozan la superficie. Sal en barca hasta las tres pequeñas pagodas de piedra que aparecen en el reverso del billete de un yuan. Dedica una mañana a Lingyin, donde un arroyo claro corre al pie de un acantilado lleno de budas tallados, y para después en las aldeas de Longjing a tomar un té cultivado en las laderas que te rodean. Una excursión desde Shanghái no da para todo eso; dos noches te dan además el lago al atardecer y al amanecer.",
  heroAlt: "Pequeñas barcas cruzan el Lago del Oeste de Hangzhou bajo colinas boscosas y niebla.",
  heroCaption:
    "Pequeñas barcas cruzan el Lago del Oeste bajo colinas bajas y boscosas. Cuando la orilla se llene de gente, ve hacia el oeste, al pie de las colinas, donde la multitud se dispersa entre remansos y bosques.",
  geography: {
    title: "Alrededor del Lago del Oeste, y dos lugares más al norte",
    caption:
      "Esquema sin escala. Recorre el lago por partes; Liangzhu, a unos 25 km al noroeste, necesita un día entero para él solo.",
    legend: {
      core: "Centro de la ciudad junto al lago",
      cluster: "Medio día o más",
      outside: "Un día entero",
      gateway: "Aeropuerto y estación",
    },
    nodes: {
      east: { label: "Hubin · orilla este", note: "Hoteles, cenas y paseos al atardecer junto al lago" },
      north: { label: "Beishan · orilla norte", note: "Dique Bai, Puente Roto y Gushan" },
      south: { label: "Orilla sur · pagoda Leifeng", note: "Sube a la pagoda y tendrás todo el lago a tus pies" },
      west: { label: "Lingyin · Longjing", note: "Budas tallados, incienso y aldeas de té" },
      canal: { label: "Gran Canal", note: "Una vía navegable en uso, al norte de la ciudad" },
      liangzhu: { label: "Liangzhu", note: "Una ciudad de 5000 años entre arrozales" },
      hgh: { label: "Aeropuerto HGH", note: "En Xiaoshan, fuera del centro de Hangzhou" },
      eaststation: { label: "Hangzhou Este", note: "A menudo la de más trenes, muchos a Shanghái" },
    },
  },
  overview: {
    nights: {
      answer: "Dos noches te dan el lago al atardecer y al amanecer, además de las colinas del oeste.",
      detail:
        "Una excursión desde Shanghái da para un tramo del lago, una parada más y el tren de vuelta. Con dos noches puedes recorrer la orilla al atardecer y otra vez a primera hora de la mañana siguiente, y aún te queda tiempo para Lingyin o las aldeas de té de Longjing. Añade una tercera noche solo si Liangzhu o el Gran Canal son el motivo de tu viaje.",
    },
    stay: {
      answer: "¿Primera vez? Alójate en la orilla este del Lago del Oeste, en torno a Hubin.",
      detail:
        "Aquí la ciudad se encuentra con el lago, así que hoteles, tiendas y cenas quedan cerca y tienes la orilla ahí mismo para un paseo al atardecer. También es la zona más concurrida, y las habitaciones con vistas al lago no suelen compensar lo que cuestan. Si buscas tranquilidad, mira el lado de Lingyin y Longjing, pero cuenta con menos conexiones de metro y carreteras de montaña con mucho tráfico.",
    },
    gateway: {
      answer: "Mira la estación de tu billete; Hangzhou Oeste no está junto al lago.",
      detail:
        "Hangzhou tiene el aeropuerto de Xiaoshan (HGH) y cuatro grandes estaciones de tren: Hangzhou, Este, Oeste y Sur. La Este suele tener más trenes, muchos de ellos a Shanghái, pero desde allí hay que cruzar la ciudad para llegar al lago. En una excursión desde Shanghái, elige el tren de vuelta antes de reservar el de ida.",
    },
    next: {
      answer: "Shanghái es su pareja natural; ve a Suzhou por los jardines y los canales.",
      detail:
        "Trenes rápidos unen las dos ciudades, y en Shanghái empiezan y terminan muchos viajes por esta parte de China. Suzhou es otra ciudad, que merece su propia parada por los jardines y los canales. ¿Vuelves a casa en avión desde Shanghái? Comprueba si sales de Pudong o de Hongqiao, porque el trayecto desde Hangzhou es distinto para cada uno.",
    },
  },
  opening: {
    heading: "Por qué Hangzhou merece más que un día desde Shanghái",
    paragraphs: [
      "En Hangzhou, la ciudad llega hasta el borde del agua. El Lago del Oeste no tiene entrada ni puerta, y toda su orilla, de unos 15 kilómetros de contorno, está abierta de día y de noche. El poeta Su Dongpo mandó sacar el lodo del fondo del lago y amontonarlo para formar el dique de sauces y melocotoneros que lleva su nombre. Las colinas son bajas y el paisaje, suave, y esa calma es justo lo que se viene a buscar. Adéntrate hacia el oeste en esas colinas y el incienso flota sobre los patios de Lingyin, mientras el té crece en las laderas que rodean Longjing.",
      "El tren rápido desde Shanghái hace que Hangzhou parezca una excursión fácil. Pero el trayecto es solo una parte del día, porque aún tienes que ir de la estación al lago y volver a tiempo para el tren. Si solo quieres ver el Lago del Oeste, un día basta. Si te quedas, puedes recorrer la orilla al atardecer y otra vez a primera hora de la mañana siguiente. Y si un vuelo desde el propio aeropuerto de Hangzhou encaja en tu ruta, no hace falta que vuelvas a Shanghái.",
    ],
  },
  sources: {
    "https://whc.unesco.org/en/list/1334/": {
      publisher: "Centro del Patrimonio Mundial de la UNESCO",
      label: "Paisaje cultural del Lago del Oeste de Hangzhou",
    },
    "https://westlake.hangzhou.gov.cn/": {
      publisher: "Comité de Gestión del Área Escénica del Lago del Oeste de Hangzhou",
      label: "Autoridad del área escénica del Lago del Oeste y avisos vigentes",
    },
    "https://www.hzairport.com/en/guide/metro.html": {
      publisher: "Aeropuerto Internacional de Hangzhou Xiaoshan",
      label: "Acceso en metro al aeropuerto HGH",
    },
    "https://www.12306.cn/en/index.html": {
      publisher: "China Railway 12306",
      label: "Búsqueda por fecha en China Railway 12306",
    },
  },
  guides: {
    "shanghai-hangzhou-transport-route": "De Shanghái a Hangzhou",
    "shanghai-suzhou-hangzhou-nanjing-route-order": "Orden de la ruta por el delta del Yangtsé",
    "liangzhu-ruins-park-and-museum-sequence": "Liangzhu: museo y parque",
    "white-snake-legend-hangzhou-zhenjiang": "La Serpiente Blanca: ¿Hangzhou o Zhenjiang?",
    "grand-canal-everyday-urban-history": "La vida a orillas del Gran Canal",
    "tea-landscape-regions-of-china": "Compara cuatro paisajes del té",
  },
};

export default content;
