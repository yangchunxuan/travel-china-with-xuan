import type { CorporateTrip } from "./corporateTravelTypes";

const zhangjiajieImages = "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/";
const shanghaiImages = "/images/tours/shanghai-suzhou-5-day-private-tour/";

export const corporateTripsEs: CorporateTrip[] = [
  {
    slug: "zhangjiajie-4-day-team-trip",
    title: "Viaje de empresa a Zhangjiajie: cuatro días entre las cumbres",
    seoTitle: "Viaje de empresa a Zhangjiajie | 4 días, 3 noches | Homeground China",
    description: "Viaje de empresa de 4 días a Zhangjiajie para 10–30 personas: tres noches en Wulingyuan, un día entre las cumbres del parque, un paseo por el valle y una cena de equipo. Programa y presupuesto adaptados al grupo.",
    eyebrow: "Viajes de empresa · Viajes de incentivo",
    lede: "Tres noches en un mismo hotel de Wulingyuan, un día completo entre los pilares de arenisca, un paseo más tranquilo junto al arroyo del Látigo Dorado y una cena de equipo para cerrar el viaje.",
    duration: "4 días, 3 noches",
    groupSize: "Unas 10 a 30 personas",
    base: "Un hotel en Wulingyuan",
    format: "Viajes para empleados e incentivos",
    hero: {
      src: `${zhangjiajieImages}wulingyuan-peaks-1600.webp`,
      alt: "Pilares de arenisca y bosque verde en Wulingyuan, Zhangjiajie",
      caption: "Wulingyuan, Zhangjiajie.",
    },
    storyTitle: "Un paisaje que comparte todo el equipo.",
    story: "Las cumbres de Zhangjiajie son de esos paisajes que un grupo recuerda en común: todos se detienen en el mismo mirador, hacen la misma foto y siguen hablando de ello durante la cena. Tres noches en un solo hotel simplifican el viaje, y el tercer día tiene un ritmo más suave para que lo disfruten compañeros con distintas condiciones físicas.",
    highlights: [
      { title: "Un hotel, tres noches", text: "Sin hacer maletas y cambiar de alojamiento. Elegimos el hotel de Wulingyuan según la distribución de habitaciones, el acceso del autocar y el presupuesto." },
      { title: "El gran día, bien organizado", text: "La montaña Tianzi y Yuanjiajie con vuestro guía, con los autobuses del parque, el ascensor y el teleférico organizados de antemano." },
      { title: "Una noche para dar las gracias", text: "Una cena final de equipo en un salón privado, con discursos o entrega de premios si queréis." },
    ],
    days: [
      {
        title: "Llegada e instalación",
        place: "Aeropuerto o estación de Zhangjiajie → Wulingyuan",
        summary: "Recogemos a cada persona a su llegada y llevamos al grupo al hotel de Wulingyuan. Si todos llegan a tiempo, el viaje empieza con una cena de bienvenida.",
        details: [
          "Organizamos las recogidas según cada vuelo y tren, para que nadie espere horas por una llegada tardía.",
          "Habitaciones individuales, de dos camas o una combinación de ambas, en el mismo hotel las tres noches.",
          "Una tarde libre para descansar después del viaje.",
        ],
        image: { src: `${zhangjiajieImages}wulingyuan-peaks-1600.webp`, alt: "Pilares de arenisca cubiertos de vegetación en Wulingyuan, Zhangjiajie", caption: "Wulingyuan, base para las tres noches." },
      },
      {
        title: "Un día entre las cumbres del parque",
        place: "Parque Forestal Nacional de Zhangjiajie · Montaña Tianzi y Yuanjiajie",
        summary: "El día principal del viaje. El guía lleva al grupo entre los pilares de arenisca de la montaña Tianzi y Yuanjiajie, con almuerzo en el parque y tiempo en los mejores miradores.",
        details: [
          "Las entradas del parque, los autobuses internos, el ascensor y el teleférico se reservan antes de la llegada.",
          "Hay escalones y tramos a pie entre los miradores. Quien prefiera un día más corto tendrá una ruta más sencilla.",
          "Regreso al hotel a última hora de la tarde; cena en grupo o por libre, según prefiráis.",
        ],
        image: { src: `${zhangjiajieImages}tianzi-mountain-panorama-1600.webp`, alt: "Vista panorámica del bosque y los pilares de arenisca de la montaña Tianzi", caption: "Montaña Tianzi." },
      },
      {
        title: "Un paseo por el valle y la cena de equipo",
        place: "Arroyo del Látigo Dorado → hotel → cena de equipo",
        summary: "Una mañana más tranquila junto al arroyo del Látigo Dorado, al pie de las cumbres que visteis desde arriba. La tarde queda libre o se dedica a una breve reunión, antes de la cena de equipo.",
        details: [
          "Recorremos un tramo del sendero junto al arroyo adecuado para el grupo, sin hacer la ruta completa.",
          "Si queréis una reunión, reservamos una sala con la distribución y el equipamiento que necesitéis.",
          "La cena final se celebra en un salón privado, con el menú y la distribución de mesas acordados de antemano.",
        ],
        image: { src: `${zhangjiajieImages}golden-whip-stream-1600.webp`, alt: "Bosque verde junto al arroyo del Látigo Dorado en Zhangjiajie", caption: "Arroyo del Látigo Dorado." },
      },
      {
        title: "Desayuno y continuación del viaje",
        place: "Wulingyuan → aeropuerto o estación de Zhangjiajie",
        summary: "Desayuno, salida del hotel y traslados coordinados con cada vuelo o tren.",
        details: [
          "Agrupamos las salidas según los horarios de vuelos y trenes.",
          "Se puede añadir al presupuesto una noche extra o una salida tardía del hotel.",
        ],
        image: { src: `${zhangjiajieImages}zhangjiajie-hehua-airport-1600.webp`, alt: "Aeropuerto de Zhangjiajie Hehua con las montañas al fondo", caption: "Aeropuerto de Zhangjiajie Hehua." },
      },
    ],
    stay: {
      title: "Un hotel en Wulingyuan durante tres noches.",
      body: "Elegimos el hotel según la distribución de habitaciones, el acceso del autocar y el presupuesto, con desayuno cada mañana y una sala privada para reuniones o cenas si la necesitáis.",
      details: [
        "Presupuestamos por separado habitaciones individuales, de dos camas y una combinación de ambas para que podáis comparar.",
        "La propuesta confirma el nombre del hotel, los tipos de habitación y el número de habitaciones.",
        "Sala de reuniones o salón privado para cenas bajo petición.",
      ],
    },
    scope: [
      "Tres noches en un hotel de Wulingyuan con desayuno",
      "Autocar privado para traslados y visitas",
      "Un guía local los días de visitas",
      "Entradas del parque forestal, autobuses internos, ascensor y teleférico",
      "Cena de bienvenida, almuerzos los días de visitas y cena de equipo",
      "Una persona de contacto por WhatsApp durante todo el viaje",
    ],
    options: [
      "Una sala de reuniones el día 3, con equipamiento y pausas con refrigerios",
      "Montaje para entrega de premios, micrófono y un salón privado de mayor tamaño para la cena",
      "Un fotógrafo durante parte del viaje",
      "Noches extra, traslados adicionales o una jornada con menos caminata",
    ],
    notIncluded: [
      "Vuelos o trenes de ida y vuelta a Zhangjiajie, salvo que se añadan al presupuesto",
      "Bebidas, extras de la habitación y gastos personales",
      "Seguro de viaje y visados",
    ],
    planningNotes: [
      { title: "Dos días de visitas y dos de desplazamientos", body: "Los días 1 y 4 se adaptan a vuestros vuelos y trenes. Con una llegada temprana o una salida tardía podemos añadir más actividades." },
      { title: "Distintas condiciones físicas", body: "El día del parque incluye escalones y caminatas al aire libre. Decidnos quién prefiere un día más suave y prepararemos una alternativa." },
      { title: "Un plan para el tiempo", body: "El tiempo en la montaña cambia. Acordamos con vosotros una alternativa para la lluvia en la propuesta." },
    ],
    faqs: [
      { question: "¿Para quién es este viaje de empresa a Zhangjiajie?", answer: "Para unos 10 a 30 compañeros que viajan como un único grupo privado, en un viaje anual para empleados o un viaje de incentivo. Para otros tamaños de grupo, adaptamos el autocar, el hotel y los guías." },
      { question: "¿Qué incluye el programa de cuatro días?", answer: "La llegada a Zhangjiajie, tres noches en Wulingyuan, un día en la montaña Tianzi y Yuanjiajie, un paseo junto al arroyo del Látigo Dorado, una cena de equipo y los traslados de salida. La montaña Tianmen y el Puente de Cristal se pueden añadir con un día extra." },
      { question: "¿Podemos celebrar una reunión o una cena de entrega de premios?", answer: "Sí. Reservamos una sala de reuniones durante parte del día 3 y un salón privado para la cena final, con discursos o premios. Vuestra empresa dirige las sesiones." },
      { question: "¿Cuánto cuesta un viaje de empresa a Zhangjiajie?", answer: "Preparamos el presupuesto según las fechas, el número de personas y la distribución de habitaciones. Las habitaciones individuales o compartidas, las comidas y las reuniones modifican el total; cada opción se valora por separado." },
      { question: "¿Es adecuado para compañeros con distintas condiciones físicas?", answer: "Sí, con planificación. El día del parque incluye escalones y caminatas: indicadnos quién prefiere una jornada más suave y organizaremos una ruta más corta o una alternativa." },
      { question: "¿Están incluidos los vuelos y es privado el parque?", answer: "Los vuelos y trenes no están incluidos salvo que nos pidáis añadirlos. El autocar y el guía son exclusivos para vuestra empresa; el parque nacional es público." },
    ],
    relatedGuides: [
      { href: "/guides/zhangjiajie-city-or-wulingyuan-hotel-base/", label: "Ciudad de Zhangjiajie o Wulingyuan: dónde alojarse (en inglés)" },
      { href: "/guides/zhangjiajie-national-forest-park-tickets-and-entrances/", label: "Entradas, accesos y autobuses del parque forestal (en inglés)" },
      { href: "/guides/zhangjiajie-older-travellers/", label: "Zhangjiajie a un ritmo más suave para viajeros menos activos (en inglés)" },
    ],
  },
  {
    slug: "shanghai-suzhou-4-day-company-retreat",
    title: "Encuentro de empresa en Shanghái y Suzhou: cuatro días, una sola base",
    seoTitle: "Encuentro de empresa en Shanghái y Suzhou | 4 días | Homeground China",
    description: "Encuentro de empresa de 4 días en Shanghái y Suzhou para 10–24 personas: tres noches en un hotel de Shanghái, un día en un jardín de Suzhou y una reunión opcional de medio día. Programa y presupuesto adaptados al grupo.",
    eyebrow: "Viajes de empresa · Pequeñas reuniones y encuentros de equipo",
    lede: "Tres noches en un mismo hotel del centro de Shanghái, una mañana para vuestra propia reunión si la necesitáis, el Bund por la tarde y un día entre los jardines y canales de Suzhou.",
    duration: "4 días, 3 noches",
    groupSize: "Unas 10 a 24 personas",
    base: "Un hotel en el centro de Shanghái",
    format: "Viajes para empleados y encuentros de equipo",
    hero: {
      src: `${shanghaiImages}hero-shanghai-clocktower-1600.webp`,
      alt: "La torre del reloj del Bund y los rascacielos modernos de Shanghái al anochecer",
      caption: "El Bund, Shanghái.",
    },
    storyTitle: "La energía de una ciudad, la calma de un jardín.",
    story: "Shanghái da a un equipo mucho que ver y comentar: el río, los rascacielos y calles donde aún se reconoce la ciudad antigua. Suzhou invita a bajar el ritmo, con jardines, agua y piedra a una escala más íntima. Tres noches en un solo hotel evitan tener que hacer maletas entre visitas, y cabe una reunión de medio día sin apresurar el resto del viaje.",
    highlights: [
      { title: "Un hotel, tres noches", text: "El centro de Shanghái como base y Suzhou como excursión de un día. Una sola llegada al hotel y una sola vez para deshacer las maletas." },
      { title: "Una reunión que encaja en el viaje", text: "La mañana del día 2 para vuestra propia sesión o para recorrer la ciudad. Lo elegís antes de reservar." },
      { title: "Tiempo juntos y tiempo libre", text: "El Bund, un jardín de Suzhou y una cena de equipo, con tiempo libre para explorar por vuestra cuenta." },
    ],
    days: [
      {
        title: "Llegada a Shanghái",
        place: "Aeropuerto o estación de Shanghái → centro de Shanghái",
        summary: "Recogemos a cada persona en Pudong, Hongqiao o la estación y la llevamos al hotel. Si el grupo llega a tiempo, hay una cena de bienvenida esa noche.",
        details: [
          "Recogidas organizadas según cada vuelo y tren, desde los dos aeropuertos de Shanghái si hace falta.",
          "El mismo hotel las tres noches, con habitaciones individuales, de dos camas o una combinación de ambas.",
          "Cena de bienvenida en un restaurante que reservamos para el grupo.",
        ],
        image: { src: `${shanghaiImages}arrival-shanghai-dusk-1600.webp`, alt: "Los rascacielos de Shanghái junto al río con la luz del atardecer", caption: "Shanghái al anochecer." },
      },
      {
        title: "Vuestra reunión, después la ciudad",
        place: "Reunión opcional → el Bund y el centro de Shanghái",
        summary: "Una reunión por la mañana en una sala que reservamos, o una mañana tranquila por la ciudad. Por la tarde, el guía acompaña al grupo por el Bund y las calles que quedan detrás.",
        details: [
          "Sala de reuniones con la distribución, la pantalla y las pausas con refrigerios que pidáis; vuestra empresa dirige la sesión.",
          "Si no hay reunión, la mañana se dedica a una zona de Shanghái elegida para vuestro equipo.",
          "Noche libre, o un crucero por el río o una cena en una azotea añadidos al presupuesto.",
        ],
        image: { src: `${shanghaiImages}shanghai-skyline-1600.webp`, alt: "La Torre de Shanghái y el Centro Financiero Mundial sobresalen entre los rascacielos", caption: "Rascacielos de Pudong." },
      },
      {
        title: "Un día en Suzhou",
        place: "Shanghái → jardín de Suzhou y calle Pingjiang → Shanghái",
        summary: "Un autocar privado os lleva a Suzhou para visitar un jardín clásico, almorzar juntos y pasear junto a los canales de la calle Pingjiang. Después, regreso a Shanghái para la cena de equipo.",
        details: [
          "El Jardín del Administrador Humilde, con las entradas reservadas de antemano.",
          "Un jardín bien disfrutado, en lugar de varios con prisas.",
          "Regreso a Shanghái para la cena final de equipo, con discursos o entrega de premios si queréis.",
        ],
        image: { src: `${shanghaiImages}suzhou-humble-garden-1600.webp`, alt: "Un pabellón, un estanque y galerías cubiertas en el Jardín del Administrador Humilde de Suzhou", caption: "Jardín del Administrador Humilde, Suzhou." },
      },
      {
        title: "Desayuno y salidas",
        place: "Centro de Shanghái → vuestro aeropuerto o estación",
        summary: "Desayuno, salida del hotel y traslados coordinados con cada salida.",
        details: [
          "Agrupamos las salidas según el aeropuerto y el horario.",
          "Los compañeros que prolonguen la estancia pueden añadir noches y su propio traslado al presupuesto.",
        ],
        image: { src: `${shanghaiImages}departure-shanghai-1600.webp`, alt: "Una plataforma junto al río frente a los rascacielos de Shanghái", caption: "La ribera del Huangpu." },
      },
    ],
    stay: {
      title: "Un hotel en el centro de Shanghái durante tres noches.",
      body: "Buscamos hoteles alrededor de la Plaza del Pueblo y Jing’an, cerca de las principales vías hacia los aeropuertos y de buenos restaurantes, con sala de reuniones si la necesitáis.",
      details: [
        "Tres noches en el mismo hotel; Suzhou se visita en una excursión de un día.",
        "Presupuestos comparables para habitaciones individuales, de dos camas y una combinación de ambas.",
        "Aforo, distribución y equipamiento de la sala de reuniones comprobados con el hotel.",
      ],
    },
    scope: [
      "Tres noches en un hotel de Shanghái con desayuno",
      "Traslados a aeropuertos y estaciones para cada llegada y salida",
      "Autocar privado los días de visitas, incluido Suzhou",
      "Un guía local los días de visitas",
      "Entradas al jardín de Suzhou",
      "Cena de bienvenida, almuerzos los días de visitas y cena de equipo",
      "Una persona de contacto por WhatsApp durante todo el viaje",
    ],
    options: [
      "Una sala de reuniones durante medio día el día 2, con equipamiento y pausas con refrigerios",
      "Montaje para entrega de premios, micrófono y salón privado para la cena",
      "Crucero por el río Huangpu o cena en una azotea",
      "Noches extra y salidas por separado",
    ],
    notIncluded: [
      "Vuelos o trenes de ida y vuelta a Shanghái, salvo que se añadan al presupuesto",
      "Bebidas, extras de la habitación y gastos personales",
      "Seguro de viaje y visados",
    ],
    planningNotes: [
      { title: "Dos días de programa y dos de desplazamientos", body: "Los días 1 y 4 se adaptan a vuestros vuelos. Añadir Hangzhou u otra ciudad requiere al menos un día más." },
      { title: "Preparar bien la reunión", body: "Indicadnos el número de personas, la distribución de la sala y el equipamiento. Vuestra empresa se encarga del contenido." },
      { title: "Un día de Suzhou con un ritmo realista", body: "Un jardín y una calle junto al canal, en autocar privado, con tiempo para disfrutar de ambos." },
    ],
    faqs: [
      { question: "¿Para quién es este encuentro de empresa en Shanghái y Suzhou?", answer: "Para unos 10 a 24 compañeros que buscan tiempo en la ciudad, un día en un jardín de Suzhou y momentos juntos, como viaje para empleados o un pequeño encuentro de equipo con una reunión de medio día." },
      { question: "¿Pasamos la noche en Suzhou?", answer: "No. Las tres noches son en un mismo hotel de Shanghái y Suzhou se visita en una excursión de un día en autocar privado el día 3." },
      { question: "¿Está incluida la sala de reuniones en el precio?", answer: "La reunión es opcional para la mañana del día 2. Presupuestamos por separado la sala, el equipamiento y las pausas con refrigerios; vuestra empresa dirige la sesión." },
      { question: "¿Podéis presupuestar habitaciones individuales y de dos camas compartidas?", answer: "Sí. Presentamos los precios de habitaciones individuales, de dos camas y una combinación de ambas para que podáis comparar antes de confirmar." },
      { question: "¿Pueden llegar los compañeros a Pudong y a Hongqiao?", answer: "Sí. Enviadnos el vuelo o tren de cada persona y organizamos las recogidas en ambos aeropuertos y en las estaciones." },
      { question: "¿Qué pasa si llueve el día de Suzhou?", answer: "Los jardines son bonitos con lluvia y tienen galerías cubiertas. Si hace mal tiempo, acordamos con vosotros una alternativa en un espacio interior." },
    ],
    relatedGuides: [
      { href: "/es/guias/shanghai-where-to-stay-first-trip/", label: "Dónde alojarse en Shanghái" },
      { href: "/guides/shanghai-to-suzhou-day-trip/", label: "Excursión de un día de Shanghái a Suzhou (en inglés)" },
      { href: "/guides/how-to-read-a-suzhou-garden/", label: "Cómo descubrir un jardín de Suzhou (en inglés)" },
      { href: "/guides/shanghai-pudong-or-hongqiao-airport/", label: "Pudong o Hongqiao: qué aeropuerto elegir (en inglés)" },
    ],
  },
];
