import type { SpanishGuide } from "../spanishGuideTypes";

export const murallaChinaDesdePekin: SpanishGuide = {
  slug: "muralla-china-desde-pekin",
  sourceGuideId: "great-wall-section-selector-from-beijing",
  title: "Muralla China desde Pekín: qué tramo visitar",
  headline: "Muralla China desde Pekín: Mutianyu, Badaling, Jinshanling o Simatai",
  description:
    "Mutianyu para la mayoría de primeras visitas, Badaling por transporte público, Jinshanling para caminar y Simatai de noche. Compare esfuerzo, acceso y riesgos.",
  navTitle: "Muralla China desde Pekín",
  heroImage: {
    src: "/images/guides/great-wall-section-selector-from-beijing/hero-1600.webp",
    width: 1600,
    height: 1000,
    alt: "Ilustración de la Gran Muralla sobre crestas de montaña, con cuatro torres que representan cuatro tramos; es un gráfico de decisión, no un mapa",
  },
  datePublished: "2026-10-11",
  dateModified: "2026-10-11",
  sourceReviewedDate: "2026-08-22",
  tourSlugs: [
    "beijing-highlights-5-day-private-tour",
    "beijing-xian-shanghai-8-day-private-tour",
    "beijing-xian-guilin-shanghai-10-day-private-tour",
    "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
    "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: "Para una primera visita desde Pekín, Mutianyu es la opción más segura: combina paisaje, muralla restaurada, teleférico para ahorrar la subida y un día asumible desde la ciudad. Elija Badaling si lo que más le importa es llegar fácil en transporte público, Jinshanling si lo que quiere es caminar por las crestas, y Simatai si el plan incluye una visita nocturna o una noche en Gubei Water Town. Los cuatro tramos pueden dar un día excelente, pero piden transportes, piernas y márgenes distintos. Elija primero el tipo de día y después la fotografía.",
      },
      { id: "matrix-heading", type: "heading", level: 2, text: "Cuatro tramos, cuatro promesas distintas" },
      {
        id: "matrix-table",
        type: "table",
        caption: "Elija por la experiencia que necesita y después compruebe la operación para su fecha",
        columns: ["Tramo", "A quién le encaja", "Esfuerzo y logística", "La principal renuncia"],
        rows: [
          [
            "Badaling",
            "Primeras visitas que priorizan la ruta pública más clara; grupos de edades mezcladas que valoran las instalaciones",
            "Muchas opciones de transporte; muralla restaurada; la caminata puede ser empinada y la propia estación de tren implica bastante desnivel",
            "El tramo más famoso también puede resultar el más masificado en horas punta",
          ],
          [
            "Mutianyu",
            "La mayoría de primeros viajes; familias; parejas; quien quiere paisaje con opción de teleférico",
            "Trayecto por carretera más largo; el transporte público suele incluir un transbordo en Huairou; el teleférico o el telesilla reducen la subida",
            "«Más tranquilo que Badaling» no es una promesa en fines de semana ni festivos",
          ],
          [
            "Jinshanling",
            "Buenos caminantes, fotógrafos y viajeros dispuestos a dormir cerca",
            "El más lejano y el menos indulgente como excursión improvisada; caminata más larga y expuesta; hay que organizar la vuelta antes de empezar",
            "Una caminata preciosa puede convertirse en un problema de transporte si se trata como una excursión urbana",
          ],
          [
            "Simatai",
            "Quien busca la muralla de noche o la combina con Gubei Water Town o con una noche allí",
            "Terreno empinado; la entrada y el acceso van ligados a un producto concreto de día o de noche y al sistema del complejo",
            "Es otro tipo de viaje, no un sustituto más tranquilo de Mutianyu",
          ],
        ],
      },
      { id: "mutianyu-heading", type: "heading", level: 2, text: "Mutianyu: la primera visita más equilibrada" },
      {
        id: "mutianyu-copy",
        type: "paragraph",
        text: "Mutianyu se gana el puesto por defecto porque permite varios tipos de día. La muralla restaurada recorre crestas boscosas; el recinto tiene teleférico y tobogán, y se puede hacer un circuito corto o guardar fuerzas para una caminata más larga. La contrapartida está abajo: por libre, el transporte público suele exigir un transbordo en Huairou, y los autobuses turísticos directos y los vehículos concertados tienen sus propias horas de recogida y de vuelta. El tramo no es «fácil» hasta que funciona toda la cadena del hotel a la muralla y de vuelta al hotel.",
      },
      {
        id: "mutianyu-route",
        type: "callout",
        tone: "neutral",
        title: "No compre el tobogán antes de decidir el sentido de la caminata",
        body: "Mutianyu tiene más de un sistema de subida y más de un tramo atractivo. Decida dónde empieza el grupo, cuánto debe caminar la persona con menos movilidad y si la bajada tiene que volver a la misma zona. El teleférico, el telesilla y el tobogán son herramientas dentro de esa ruta, no la ruta. Su funcionamiento puede cambiar por el tiempo o por mantenimiento.",
      },
      { id: "badaling-heading", type: "heading", level: 2, text: "Badaling: se elige por el acceso" },
      {
        id: "badaling-copy",
        type: "paragraph",
        text: "Badaling es la respuesta práctica cuando el grupo necesita un lugar reconocible, con muchos servicios, y un trayecto público que se puede planificar desde varios puntos de Pekín. La página oficial para visitantes lo sitúa a unos 60 kilómetros del centro. Esa variedad de opciones tiene valor real para quien va por libre, y también concentra la demanda. Llegar temprano un día laborable normal mejora la experiencia, pero nadie puede garantizar una muralla vacía.",
      },
      { id: "jinshanling-heading", type: "heading", level: 2, text: "Jinshanling: vaya porque quiere caminar" },
      {
        id: "jinshanling-copy",
        type: "paragraph",
        text: "Jinshanling está a unos 130 kilómetros del centro de Pekín, del lado de Hebei. Su atractivo no es un mirador concreto: es el ritmo de las torres de vigilancia, los tramos restaurados y los menos restaurados, las subidas repetidas y las vistas largas a lo largo de la cresta. Trátelo como un día de caminata con la vuelta cerrada o como un plan de fotografía con noche cerca, no como un añadido espontáneo después de desayunar en el centro de Pekín.",
      },
      {
        id: "jinshanling-boundary",
        type: "callout",
        tone: "warning",
        title: "Una línea en un mapa antiguo puede no ser una ruta abierta",
        body: "No dé por hecho que se puede caminar de forma continua de Gubeikou a Simatai pasando por Jinshanling porque lo cuente un blog antiguo. Las puertas, los controles de conservación, los daños temporales y los tramos abiertos cambian. Use la entrada actual del recinto, siga la ruta pública señalizada y pregunte al operador qué salida está abierta ese día.",
      },
      { id: "simatai-heading", type: "heading", level: 2, text: "Simatai: el plan de noche, no solo la muralla" },
      {
        id: "simatai-copy",
        type: "paragraph",
        text: "Simatai es la elección más clara cuando el recuerdo central es la muralla después del anochecer y Gubei Water Town forma parte del viaje a propósito. El material oficial de Pekín describe un terreno empinado y abrupto y un programa nocturno que lleva años funcionando; el complejo vende productos separados de día, de noche, de teleférico y combinados. Eso importa: una entrada nocturna puede exigir el acceso al complejo, y el tramo de muralla abierto de noche es limitado. Compruebe el producto exacto, el horario de entrada y la última bajada.",
      },
      { id: "mobility-heading", type: "heading", level: 2, text: "El teleférico reduce la subida; no crea una visita llana" },
      {
        id: "mobility-copy",
        type: "paragraph",
        text: "Todos los tramos combinan caminata de acceso, escalones, pavimento irregular, pendientes, colas y exposición al sol o al viento. Un teleférico puede quitar una gran subida, pero normalmente no quita la distancia desde el aparcamiento, el autobús interno del recinto, la cola, el andén ni la propia muralla. Pregunte al recinto por la ruta exacta que necesita la persona con menos movilidad y acorte el plan de muralla antes que el margen de seguridad.",
      },
      {
        id: "group-table",
        type: "table",
        caption: "Empiece por la persona menos flexible del grupo",
        columns: ["Viajero", "Primer tramo que conviene mirar", "La pregunta que decide"],
        rows: [
          ["Pareja o amigos en su primer viaje", "Mutianyu", "¿Encaja con el hotel el traslado completo de ida y vuelta por carretera?"],
          ["Familia con niños pequeños", "Mutianyu o Badaling", "¿Puede el grupo llegar, subir, reagruparse y bajar sin depender de que un niño cansado camine más?"],
          ["Padre o madre mayor con poca resistencia", "Badaling o Mutianyu", "¿Qué ruta exacta sin escalones o con menos subida está abierta ese día?"],
          ["Caminante serio", "Jinshanling", "¿Están confirmadas la puerta elegida, la salida y el transporte de vuelta?"],
          ["Quien busca la experiencia nocturna", "Simatai, o un programa con fecha en Badaling o Mutianyu", "¿Funciona el programa nocturno en esa fecha exacta y qué tramo de muralla abre?"],
        ],
      },
      { id: "crowds-heading", type: "heading", level: 2, text: "La gente depende de la fecha y de la entrada" },
      {
        id: "crowds-copy",
        type: "paragraph",
        text: "Badaling carga con la fama de masificado, Mutianyu se vende a menudo como la alternativa tranquila y Jinshanling como vacío. Son etiquetas demasiado limpias: una mañana de la Semana Dorada, un fin de semana de vacaciones escolares, un teleférico cerrado o una cresta de otoño de moda cambian el reparto. Lo que ayuda es un día laborable no festivo, la primera entrada posible, una ruta que se aleje del primer grupo y tiempo para parar sin bloquear un paso estrecho.",
      },
      { id: "season-heading", type: "heading", level: 2, text: "Cada estación cambia la misma muralla" },
      {
        id: "season-table",
        type: "table",
        caption: "Prepare una versión del día para el mal tiempo",
        columns: ["Estación", "Qué mejora", "Qué puede fallar", "La mejor decisión"],
        rows: [
          ["Primavera", "Caminata más fresca y follaje nuevo", "Viento, visibilidad variable y picos en festivos", "Lleve una capa de abrigo y no prometa fechas de floración"],
          ["Verano", "Días largos y crestas verdes", "Calor, humedad, tormentas y cierres repentinos por seguridad", "Empiece temprano, lleve agua y mantenga el día sustituible"],
          ["Otoño", "Aire más claro y color intenso cuando acompañan las condiciones", "Demanda máxima y ninguna fecha garantizada de follaje", "Elija un día laborable y trate el color como un extra"],
          ["Invierno", "Siluetas más nítidas y a veces menos gente", "Frío expuesto, viento, hielo y menos servicios", "Calzado con agarre y aceptar una ruta más corta o un cierre"],
        ],
      },
      {
        id: "weather-proof",
        type: "callout",
        tone: "warning",
        title: "Un traslado pagado no demuestra que la muralla esté abierta",
        body: "En agosto de 2026, Mutianyu publicó un cierre temporal durante una alerta roja por lluvias y, aparte, un aviso de reapertura. La lección vale para todos los tramos: compruebe el aviso del propio recinto después de un temporal y otra vez antes de salir. Un conductor, un hotel o un revendedor pueden tener una reserva de transporte válida cuando el recinto ha dejado de admitir visitantes.",
      },
      { id: "night-heading", type: "heading", level: 2, text: "Las visitas nocturnas son programas con fecha" },
      {
        id: "night-copy",
        type: "paragraph",
        text: "En 2026, Badaling publicó un programa nocturno de temporada hasta principios de octubre, Mutianyu publicó fechas nocturnas separadas para puentes y para el verano, y Simatai siguió vendiendo un producto nocturno definido a través de Gubei Water Town. Eso prueba que varios tramos pueden abrir de noche, no que se puedan reutilizar las fechas de 2026 el año siguiente. El acceso nocturno puede cubrir solo un tramo pequeño y depender de un teleférico o de una puerta concretos.",
      },
      { id: "check-heading", type: "heading", level: 2, text: "La comprobación de la víspera" },
      {
        id: "check-list",
        type: "list",
        ordered: true,
        items: [
          "Abra el aviso oficial del tramo elegido y confirme que admite visitantes en su fecha.",
          "Compruebe que el nombre del pasaporte y el tipo de documento coinciden con lo que pide el canal de venta de entradas.",
          "Apunte en chino el punto exacto de salida en Pekín y la entrada de la muralla.",
          "Confirme qué sistema de subida funciona y qué ruta de muralla va a recorrer el grupo.",
          "Fije una hora para dejar la muralla que proteja una vuelta comprobada, no solo la hora de cierre.",
          "Mire los avisos de lluvia, tormenta, nieve, hielo, viento y calor, y mantenga el día sustituible.",
        ],
      },
      {
        id: "tours",
        type: "internal-links",
        title: "La Gran Muralla en un viaje privado",
        items: [
          {
            label: "China en 8 días: Pekín, Xi'an y Shanghái",
            href: "/es/tours/beijing-xian-shanghai-8-day-private-tour/",
            description: "Un día para la Gran Muralla en Mutianyu, con el teleférico o telesilla de un trayecto incluido.",
          },
          {
            label: "Pekín en 5 días: Ciudad Prohibida y Gran Muralla",
            href: "/es/tours/beijing-highlights-5-day-private-tour/",
            description: "Esta ruta visita Badaling, con vehículo privado desde el hotel.",
          },
          {
            label: "De Pekín a Mutianyu: el traslado completo (en inglés)",
            href: "/guides/beijing-to-mutianyu-great-wall-transfer/",
            description: "Cómo montar el trayecto por carretera y la vuelta una vez elegido Mutianyu.",
          },
          {
            label: "De Pekín a Badaling (en inglés)",
            href: "/guides/beijing-to-badaling-great-wall-transfer/",
            description: "Trenes y autobuses desde los distintos puntos de salida de Pekín.",
          },
        ],
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas antes de elegir tramo",
        items: [
          {
            question: "¿Qué tramo de la Muralla China conviene para una primera visita desde Pekín?",
            answer:
              "Mutianyu es la opción más segura para la mayoría de primeros viajes, no porque esté siempre tranquilo, sino porque equilibra paisaje, muralla restaurada, opciones de subida y un día asumible desde Pekín. Elija Badaling si lo que más importa es el transporte público sencillo y las instalaciones, Jinshanling si lo importante es la caminata, y Simatai si el plan incluye una visita nocturna con fecha o una noche en Gubei Water Town.",
          },
          {
            question: "¿Mutianyu o Badaling?",
            answer:
              "Mutianyu para la mayoría: muralla restaurada entre crestas boscosas y teleférico para ahorrar la subida, a cambio de un trayecto por carretera más largo. Badaling cuando el grupo necesita la ruta pública más clara desde Pekín y muchos servicios, sabiendo que es el tramo más concurrido.",
          },
          {
            question: "¿Se puede caminar de Jinshanling a Simatai?",
            answer:
              "No dé por hecho que la ruta continua está abierta. Las puertas, los controles de conservación, los daños temporales y los tramos abiertos cambian. Use la entrada actual del recinto, siga la ruta pública señalizada y pregunte al operador qué salida está abierta ese día.",
          },
          {
            question: "¿El teleférico hace la Gran Muralla apta para alguien con movilidad reducida?",
            answer:
              "Por sí solo, no. Un teleférico puede quitar una gran subida, pero normalmente no quita la distancia desde el aparcamiento, el autobús interno, la cola, el andén ni la propia muralla. Pregunte al recinto por la ruta exacta que necesita esa persona y acorte el plan de muralla antes que el margen de seguridad.",
          },
          {
            question: "¿A qué distancia está Jinshanling de Pekín? ¿Se puede ir y volver en el día?",
            answer:
              "Jinshanling está a unos 130 kilómetros del centro de Pekín, del lado de Hebei, y es el más lejano y el menos indulgente de los cuatro como excursión improvisada. Cierre el transporte de vuelta antes de empezar a caminar y trátelo como un día entero de caminata. Para el amanecer o el atardecer suele ser más sensato dormir cerca.",
          },
          {
            question: "¿Se puede visitar la Gran Muralla de noche?",
            answer:
              "Solo en programas con fecha. En 2026 hubo programas nocturnos en Badaling, Mutianyu y Simatai, pero no son horarios permanentes, y el acceso nocturno puede cubrir solo un tramo pequeño de muralla.",
          },
          {
            question: "Tengo el coche y el conductor reservados: ¿significa que la muralla está abierta?",
            answer:
              "No. En agosto de 2026, Mutianyu publicó un cierre temporal durante una alerta roja por lluvias. Compruebe el aviso del propio recinto después de un temporal y otra vez antes de salir.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes",
        items: [
          {
            label: "The Great Wall: ficha del Patrimonio Mundial",
            url: "https://whc.unesco.org/en/list/438/",
            publisher: "Centro del Patrimonio Mundial de la UNESCO",
            reviewedAt: "2026-08-22",
          },
          {
            label: "Badaling: información para visitantes y horarios de temporada",
            url: "https://english.beijing.gov.cn/travellinginbeijing/attractions/202603/t20260320_4562521.html",
            publisher: "Gobierno Municipal de Pekín",
            reviewedAt: "2026-08-22",
          },
          {
            label: "Mutianyu: información oficial para visitantes y avisos",
            url: "https://en.mutianyugreatwall.com/",
            publisher: "Mutianyu Great Wall Tourism Service Co., Ltd.",
            reviewedAt: "2026-08-22",
          },
          {
            label: "Aviso de la visita nocturna de verano de Mutianyu en 2026",
            url: "https://english.beijing.gov.cn/latest/news/202606/t20260630_4738683.html",
            publisher: "Gobierno Municipal de Pekín",
            reviewedAt: "2026-08-22",
          },
          {
            label: "Aviso de la visita nocturna de temporada de Badaling en 2026",
            url: "https://english.beijing.gov.cn/travellinginbeijing/events/202604/t20260424_4608135.html",
            publisher: "Gobierno Municipal de Pekín",
            reviewedAt: "2026-08-22",
          },
          {
            label: "Jinshanling: ficha del recinto",
            url: "https://s.visitbeijing.com.cn/attraction/118029",
            publisher: "Portal de visitantes de la Oficina Municipal de Cultura y Turismo de Pekín",
            reviewedAt: "2026-08-22",
          },
          {
            label: "Gubei Water Town y Simatai: productos de entrada",
            url: "https://www.gubeiwatertown.com/Basic%20information/entrance-fees",
            publisher: "Gubei Water Town",
            reviewedAt: "2026-08-22",
          },
          {
            label: "Simatai y Gubei Water Town: información para visitantes",
            url: "https://english.beijing.gov.cn/specials/ticketing/attractions/202407/t20240717_3751547.html",
            publisher: "Gobierno Municipal de Pekín",
            reviewedAt: "2026-08-22",
          },
        ],
      },
    ],
  },
};
