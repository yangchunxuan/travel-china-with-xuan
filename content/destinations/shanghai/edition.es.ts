import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Shanghai in Spanish, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Guía de viaje de Shanghái: 4 noches y dónde alojarte",
  h1: "Shanghái: el Bund al atardecer, callejones antiguos y rascacielos, en cuatro noches",
  description:
    "Dedica cuatro noches a Shanghái: el Bund al atardecer, el Jardín Yu y los callejones antiguos. Dónde alojarte, Pudong o Hongqiao, y por qué Hangzhou va después.",
  summary:
    "Pasea por el Jardín Yu y las callejuelas comerciales de la Ciudad Vieja y sigue a pie hasta el Bund cuando cae la luz. A tu espalda quedan bancos de piedra centenarios, al otro lado del río se alzan las torres de cristal de Pudong, y después se iluminan las dos orillas. Dedica otro día a las calles arboladas de la antigua Concesión Francesa, con sus casas de callejón, sus tiendas y sus cafés. Los días de llegada y de salida se van casi enteros en desplazamientos, así que cuatro noches te dan tres días completos; una excursión a Disneyland o a Suzhou ocupa uno entero.",
  heroAlt:
    "Dos puentes cruzan el arroyo Suzhou al atardecer, con edificios antiguos de Puxi delante y, al fondo, la Torre de la Perla Oriental y la Torre de Shanghái.",
  heroCaption:
    "Edificios antiguos de Puxi bordean el arroyo Suzhou, con la Torre de la Perla Oriental y la Torre de Shanghái al fondo. Sigue el arroyo hasta el Huangpu y luego camina hacia el sur por el Bund mientras se encienden las luces.",
  geography: {
    title: "Los lugares de Shanghái, a ambas orillas del Huangpu",
    caption:
      "Esquema sin escala. La mayoría de los días de un primer viaje transcurren al oeste del río, en Puxi; Disneyland necesita un día entero para él solo.",
    legend: {
      core: "Centro de la ciudad",
      cluster: "Medio día o más",
      outside: "Un día entero",
      gateway: "Aeropuertos y estación",
    },
    nodes: {
      bund: { label: "El Bund", note: "Paseo junto al río; mejor del atardecer a la noche" },
      oldcity: { label: "Ciudad Vieja · Jardín Yu", note: "Jardín y callejuelas comerciales; sigue a pie hasta el Bund" },
      square: { label: "Plaza del Pueblo · calle Nanjing Este", note: "Nudo de metro; calle comercial hasta el Bund" },
      jingan: { label: "Jing’an · antigua Concesión Francesa", note: "Calles arboladas, casas de callejón, cafés" },
      lujiazui: { label: "Lujiazui", note: "Entre las torres, con el Bund enfrente" },
      hongqiao: { label: "Nudo de Hongqiao", note: "Muy al oeste; aeropuerto SHA y estación de alta velocidad" },
      pvg: { label: "PVG", note: "Al este; aquí aterrizan la mayoría de los vuelos de largo recorrido" },
      disney: { label: "Disneyland", note: "Un día entero; no cabe en una tarde" },
    },
  },
  overview: {
    nights: {
      answer: "Cuatro noches te dan tres días completos.",
      detail:
        "Los días de llegada y de salida se van casi enteros en desplazamientos. Con tres noches siguen quedando dos días completos: uno para el Bund, la Ciudad Vieja y el Jardín Yu, y otro para la Plaza del Pueblo con Jing’an o Lujiazui. Disneyland o una excursión a Suzhou ocupan un día entero, así que añade una noche si aun así quieres tres días en la ciudad.",
    },
    stay: {
      answer: "¿Primera vez? Alójate en el centro de Puxi, cerca de la Plaza del Pueblo.",
      detail:
        "Aquí se cruzan las líneas de metro, y la calle Nanjing Este te lleva a pie hasta el Bund. Para calles arboladas y cenar fuera, prueba Jing’an o la antigua Concesión Francesa, pero comprueba qué parada de metro queda realmente cerca. Cruza el río para ver las torres de Lujiazui; la mayoría de los días de un primer viaje transcurren en Puxi.",
    },
    gateway: {
      answer: "Mira tus billetes: Pudong y Hongqiao están en extremos opuestos de la ciudad.",
      detail:
        "La mayoría de los vuelos de largo recorrido aterrizan en Pudong (PVG), al este del centro. Muy al oeste, Hongqiao reúne el segundo aeropuerto (SHA) y la principal estación de alta velocidad, aunque algunos trenes usan la estación de Shanghái, más cerca de la Plaza del Pueblo. Después de un vuelo largo y con maletas pesadas, un taxi suele ser más fácil que la línea 2 del metro.",
    },
    next: {
      answer: "Hangzhou es la siguiente parada natural; Suzhou funciona como excursión de un día.",
      detail:
        "En Hangzhou, el Lago del Oeste, las colinas de té y el templo Lingyin quedan lejos unos de otros, y el lago merece verse temprano y al final del día, así que quédate al menos una noche. Los imprescindibles de Suzhou están más juntos, y un jardín más las calles antiguas dan para una buena excursión desde Shanghái. Si Nanjing está en tu lista, dale su propia estancia.",
    },
  },
  opening: {
    heading: "Por qué un viaje a China necesita unos días en Shanghái",
    paragraphs: [
      "En Shanghái, lo antiguo y lo nuevo se miran cara a cara a ambos lados del Huangpu. La mayoría de los bancos y hoteles de piedra del Bund se levantaron hace aproximadamente un siglo, y todas las torres de la otra orilla han crecido desde 1990. Cruza en el ferri público entre la gente que va al trabajo, date la vuelta en cubierta y todo el Bund se extiende a tu espalda. Después sube en el ascensor de la Torre de Shanghái, 546 metros en menos de un minuto, y hasta los demás rascacielos quedan a tus pies.",
      "Shanghái funciona tanto al principio como al final de un viaje por China. La mayoría de los vuelos de largo recorrido a la ciudad aterrizan en Pudong, y unas noches en el mismo hotel te permiten situarte antes de que un tren de alta velocidad te lleve a Hangzhou o Suzhou. Si la dejas para el final, tendrás muchos vuelos de vuelta entre los que elegir. Siempre que puedas, llega a una ciudad y vuelve a casa desde otra, por ejemplo Pekín y Shanghái, para no tener que desandar el camino.",
    ],
  },
  stayExample: [
    { id: "five-day-heading", type: "heading", level: 2, text: "Shanghái en cinco días: un itinerario" },
    {
      id: "five-day-intro",
      type: "paragraph",
      text: "La llegada y la salida se van casi enteras en desplazamientos, así que cuatro noches dejan tres días completos: dos en la ciudad y una excursión. Organízate en función de los vuelos y las reservas.",
    },
    {
      id: "five-day-plan",
      type: "list",
      ordered: true,
      items: [
        "Llega y descansa, con un paseo por los alrededores si te apetece.",
        "Pasea por el Jardín Yu y los callejones de la Ciudad Vieja y llega al Bund al atardecer para ver cómo se iluminan las dos orillas. El jardín es de pago; consulta antes las normas de entrada.",
        "Combina un museo con las calles arboladas de la antigua Concesión Francesa, o cruza en ferri y contempla el Bund desde Lujiazui. Las dos sedes del Museo de Shanghái cierran en días distintos; compruébalo antes.",
        "Elige una opción: un jardín de Suzhou y sus antiguas calles junto a los canales, el pueblo de agua de Zhujiajiao o un día entero en Disneyland. Para Suzhou, cuenta el tiempo de ida y vuelta a las estaciones.",
        "Deja el hotel con tiempo de sobra: Pudong y Hongqiao están en extremos opuestos de la ciudad.",
      ],
    },
    {
      id: "five-full-days",
      type: "paragraph",
      text: "Con cinco días completos además de la llegada y la salida, dedica tres a la ciudad, uno a Suzhou o Zhujiajiao y guarda otro para la lluvia, el cansancio o Disneyland. Si quieres añadir Hangzhou, haz noche allí.",
    },
  ],
  dayTripLinks: {
    title: "Excursiones de un día desde Shanghái",
    items: [
      { label: "Excursión de un día de Shanghái a Suzhou", description: "Elige las estaciones, un día en Suzhou bien enfocado y una vuelta que funcione." },
      { label: "De Shanghái a Hangzhou en tren", description: "Compara los pares de estaciones antes de decidir entre una excursión de un día o hacer noche." },
    ],
  },
  sources: {
    "https://english.shanghai.gov.cn/en-Transportation/20241231/f66f14bbd4b549ab88e6f3aec375790c.html": {
      publisher: "Gobierno Municipal de Shanghái; fuente: Metro de Shanghái",
      label: "Estaciones, transbordos e información de viaje de la línea Airport Link",
    },
    "https://english.shanghai.gov.cn/en-Transportation/20231214/649e06ea38f74aaeb573fa2debbe97d3.html": {
      publisher: "Gobierno Municipal de Shanghái; fuente: Autoridad Aeroportuaria de Shanghái",
      label: "Funciones de Pudong y Hongqiao, terminales, metro, taxi y traslados entre los dos aeropuertos",
    },
    "https://www.shanghaidisneyresort.com/en/information/transportation": {
      publisher: "Shanghai Disney Resort",
      label: "Shanghai Disney Resort: información oficial de transporte",
    },
    "https://www.shanghai.gov.cn/xbhygq/20240514/45ef2426bf66467d96a2a2927cf53579.html": {
      publisher: "Gobierno Municipal de Shanghái",
      label: "Songjiang Sur se llama Shanghai Songjiang desde el 22 de mayo de 2024",
    },
  },
  guides: {
    "china-10-day-itinerary": "China en 10 días",
    "shanghai-where-to-stay-first-trip": "Zonas para una primera visita a Shanghái",
    "shanghai-pudong-or-hongqiao-airport": "¿Aeropuerto de Pudong o de Hongqiao?",
    "pudong-airport-to-shanghai-disneyland": "Del aeropuerto de Pudong a Shanghai Disneyland",
    "shanghai-hangzhou-transport-route": "De Shanghái a Hangzhou",
    "shanghai-suzhou-hangzhou-nanjing-route-order": "Orden de la ruta por el delta del Yangtsé",
  },
};

export default content;
