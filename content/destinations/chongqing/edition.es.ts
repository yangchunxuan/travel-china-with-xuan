import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Chongqing in Spanish, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Guía de viaje de Chongqing: 3 noches y dónde alojarte",
  h1: "Chongqing: calles de escaleras, dos ríos y luces de ciudad, en tres noches",
  description:
    "Dedica tres noches a Chongqing: sus calles de escaleras, sus dos ríos y Hongyadong iluminado de noche. Dónde alojarte, qué estación usar y por qué sigue Chengdu.",
  summary:
    "Empieza en el Monumento a la Liberación y baja sin prisa por la antigua calle de escaleras de Shibati. En Chaotianmen, mira cómo el Jialing se une al Yangtsé, por lo general el río más claro frente al más turbio. Después de cenar, los once pisos de Hongyadong brillan dorados sobre el agua. Al día siguiente, cruza a la orilla sur, baja tranquilamente por los callejones de Danzishi y come junto al río mirando hacia las torres de Yuzhong. Tres noches te dan esos dos días completos; añade al menos una más para los puentes de piedra de Wulong o los grabados de Dazu.",
  heroAlt:
    "El perfil de Yuzhong al otro lado del río Jialing al atardecer, con el puente Qiansimen iluminado de rojo a la derecha.",
  heroCaption:
    "Las torres de Yuzhong brillan al otro lado del río Jialing al atardecer, y el puente Qiansimen se ilumina de rojo. Cuando oscurezca, camina hasta el centro del puente y vuelve la vista hacia Hongyadong.",
  geography: {
    title: "Dos ríos dividen en tres el centro de Chongqing",
    caption:
      "Esquema sin escala. Orillas que parecen cercanas pueden estar separadas por un puente o un túnel; Wulong y Dazu necesitan un día entero cada uno.",
    legend: {
      core: "Centro de la ciudad",
      cluster: "Medio día o más",
      outside: "Un día entero",
      gateway: "Aeropuerto y estación",
    },
    nodes: {
      yuzhong: { label: "Yuzhong · Jiefangbei", note: "Un día completo; Hongyadong iluminado de noche" },
      jiangbei: { label: "Jiangbei · Guanyinqiao", note: "Compras y cenas tardías al otro lado del río" },
      nanan: { label: "Nan’an · Nanshan", note: "Cena junto al río, mirando hacia Yuzhong" },
      liziba: { label: "Liziba · lado oeste", note: "Un tren que atraviesa un edificio; combínalo con Ciqikou" },
      wulong: { label: "Wulong", note: "Puentes de piedra en un desfiladero; mejor con una noche" },
      dazu: { label: "Dazu", note: "Grabados rupestres; un día entero por carretera" },
      ckg: { label: "Aeropuerto CKG", note: "Al norte del centro; en coche si aterrizas tarde" },
      eaststation: { label: "Chongqing Este", note: "Orilla sur; trenes a Wulong y Zhangjiajie" },
    },
  },
  overview: {
    nights: {
      answer: "Tres noches te dan dos días completos en la ciudad.",
      detail:
        "Los días de llegada y de salida se van casi enteros en desplazamientos, y con dos noches queda un solo día, suficiente solo para Yuzhong. Los puentes de piedra de Wulong y los grabados de Dazu ocupan un día entero cada uno, así que añade al menos una noche para cualquiera de los dos. La tarde en que llegues, localiza la entrada de tu hotel y cena cerca.",
    },
    stay: {
      answer: "¿Primera vez? Alójate en torno a Jiefangbei.",
      detail:
        "Hongyadong queda a unos quince minutos a pie cuesta abajo, y Shibati y Chaotianmen están a mano. Guanyinqiao, al otro lado del río, va bien para cenas tardías y compras, pero entonces la mayoría de las mañanas empiezan cruzando el río. Las calles están a varios niveles, así que pregunta en qué planta está la recepción y dónde paran los coches.",
    },
    gateway: {
      answer: "Comprueba cuál de las cuatro grandes estaciones de tren de Chongqing figura en tu billete.",
      detail:
        "Chongqing Norte, Oeste, Shapingba y Este son estaciones distintas, y los trenes de alta velocidad a Wulong salen de Chongqing Este, en la orilla sur. Los vuelos aterrizan en el aeropuerto de Jiangbei, al norte del centro. ¿Aterrizas tarde o llevas maletas grandes? Ve en coche hasta la entrada de vehículos del hotel, no en metro.",
    },
    next: {
      answer: "Chengdu es su pareja natural, con trenes frecuentes entre las dos.",
      detail:
        "Chengdu es más llana, con pandas y casas de té; Chongqing es empinada y está moldeada por sus ríos. Empieza con tres noches en cada una y después dale una noche más a Chongqing para Wulong, Dazu o un crucero por el Yangtsé, o a Chengdu para más pandas y excursiones por Sichuan.",
    },
  },
  opening: {
    heading: "Por qué Chongqing merece la subida",
    paragraphs: [
      "Chongqing trepa por las empinadas orillas donde se unen el Yangtsé y el Jialing, y toda la ciudad se apila en capas. Hay carreteras que pasan por debajo de otras calles, y en Liziba un tren atraviesa un edificio. En Hongyadong entras desde una calle de la ciudad por el último piso y sales abajo, a la carretera del río. No es de extrañar que la llamen la ciudad 8D. Las noches se alargan, con cenas junto al agua, calles animadas y el perfil de la ciudad iluminado al otro lado del río.",
      "Chongqing es también un punto natural para empezar o terminar un viaje más largo. Chengdu está a un cómodo trayecto en tren, la principal ruta de cruceros por el Yangtsé va de aquí a Yichang, y desde Chongqing Este salen trenes a Wulong y algunos a Zhangjiajie. Si vas a embarcar en un crucero justo después de un vuelo largo o un largo viaje en tren, duerme antes al menos una noche en Chongqing. Así tendrás margen si algo se retrasa, y tiempo para que te lleguen los últimos detalles del embarcadero.",
    ],
  },
  stayExample: [
    { id: "two-complete-days-heading", type: "heading", level: 2, text: "Dos días completos: escaleras abajo y después al otro lado del río" },
    {
      id: "two-complete-days-context",
      type: "paragraph",
      text: "Tres noches en un hotel de Jiefangbei te dan dos días enteros sin trenes ni vuelos que tomar. El día 1 transcurre en la península de Yuzhong; el día 2 cruza el río hasta Danzishi. Las comidas y los descansos están incluidos en el plan, así que Wulong y Dazu necesitan cada uno su propio día.",
    },
    {
      id: "two-complete-days-plan",
      type: "table",
      caption: "Una primera visita en dos días completos",
      columns: ["Momento del día", "Día 1: península de Yuzhong", "Día 2: Danzishi, orilla sur"],
      rows: [
        [
          "Mañana",
          "Empieza en el Monumento a la Liberación y baja sin prisa por la antigua calle de escaleras de Shibati desde la entrada de arriba. Si prefieres no volver a subir, toma un coche abajo.",
          "Pide al conductor que te deje en la entrada de arriba de la calle antigua de Danzishi y baja tranquilamente por sus patios y callejones hacia la avenida Nanbin.",
        ],
        [
          "Almuerzo y primera hora de la tarde",
          "Come cerca de Shibati, o vuelve a Jiefangbei para almorzar y descansar en el hotel; con calor o lluvia, haz una pausa de verdad bajo techo.",
          "Almuerza en Danzishi y después visita la Galería de Exposición de Planificación Urbana de Chongqing, en la plaza de Danzishi, si está abierta. Lo que muestra sobre la ciudad, las colinas y los ríos hace más fácil leer el perfil urbano; consulta las normas de entrada del día antes de ir.",
        ],
        [
          "Última hora de la tarde",
          "Ve en coche a Chaotianmen para dar un paseo corto donde el Jialing, por lo general el río más claro, se une al Yangtsé, más turbio. Acuerda con el conductor una entrada real o un punto de recogida junto a la carretera; el marcador del mapa en la punta de la península no es lugar para encontrarse con un coche.",
          "Pasea un rato por la orilla del río en la avenida Nanbin y después siéntate a tomar un café. Un mirador más alto en Danzishi supone subir más, así que ve solo si te apetece.",
        ],
        [
          "Noche",
          "Después de cenar, mira desde fuera cómo brillan dorados los once pisos de Hongyadong. Comprueba si usarás la calle de arriba o la carretera del río, y reúnete con tu coche donde los coches puedan parar; si la multitud cierra el acceso, no esperes por la foto.",
          "Cena junto al río con las luces de Yuzhong al otro lado del agua y después reúnete con tu coche en un punto acordado de antemano junto a la carretera, en esta orilla. El día ya está completo sin crucero por el río ni subida a Nanshan.",
        ],
      ],
    },
    {
      id: "two-complete-days-terrain",
      type: "paragraph",
      text: "Ir cuesta abajo ahorra subidas, pero los escalones siguen siendo duros para las rodillas. Si las escaleras te cuestan, sáltate los recorridos completos de bajada por Shibati y Danzishi; pasea por un solo nivel que sepas que no tiene escalones, toma un coche entre parada y parada y contempla el río sentado. No des por hecho que un ascensor que aparece en un mapa funciona o conecta las dos entradas que necesitas. La galería de planificación suele cerrar los lunes, así que intercambia los días, o dedica el lunes a Danzishi, un almuerzo largo y la orilla del río. Con lluvia persistente o calor intenso, acorta las partes al aire libre.",
    },
  ],
  sources: {
    "https://www.cq.gov.cn/ywdt/bmts/202512/t20251222_15262188.html": {
      publisher: "Gobierno Municipal de Chongqing",
      label: "Distribución de las terminales de pasajeros del aeropuerto de Chongqing",
    },
    "https://www.cq.gov.cn/ywdt/jrcq/202606/t20260626_15778151.html": {
      publisher: "Gobierno Municipal de Chongqing",
      label: "Funciones de las estaciones en el horario ferroviario de Chongqing del 3.er trimestre de 2026",
    },
    "https://www.cq.gov.cn/ywdt/bmts/202507/t20250728_14853868.html": {
      publisher: "Gobierno Municipal de Chongqing",
      label: "Acceso por la línea 6 a la estación de Chongqing Este",
    },
    "https://www.cq.gov.cn/ywdt/bmts/202206/t20220615_10817239.html": {
      publisher: "Gobierno Municipal de Chongqing",
      label: "Suspensión del servicio de pasajeros en la estación de Chongqing",
    },
  },
  guides: {
    "chengdu-chongqing-zhangjiajie-itinerary": "Chengdu–Chongqing–Zhangjiajie",
    "chongqing-upper-lower-city-orientation": "Los niveles de las calles de Chongqing",
    "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba": "Chongqing: tres zonas para alojarse",
    "china-tiankeng-sinkholes-explained": "Qué son los tiankeng de China",
    "sichuan-opera-face-changing-with-context": "La ópera de Sichuan, en su contexto",
    "chongqing-railway-station-selector": "Elige una estación de tren en Chongqing",
  },
};

export default content;
