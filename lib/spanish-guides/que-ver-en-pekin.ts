import type { SpanishGuide } from "../spanishGuideTypes";

export const queVerEnPekin: SpanishGuide = {
  slug: "que-ver-en-pekin",
  title: "Qué ver en Pekín (Beijing) en 3, 4 o 5 días: itinerario",
  headline: "Qué ver en Pekín (Beijing) en 3, 4 y 5 días: el itinerario y las entradas que no pueden fallar",
  description:
    "Itinerario de Pekín (Beijing) para 3, 4 y 5 días: Ciudad Prohibida, Gran Muralla, Templo del Cielo o Palacio de Verano, qué cierra los lunes y cuándo salen las entradas.",
  navTitle: "Qué ver en Pekín en 3, 4 y 5 días",
  heroImage: {
    src: "/images/guides/forbidden-city-for-foreign-visitors/hero-1600.webp",
    width: 1600,
    height: 1000,
    alt: "El Salón de la Armonía Suprema y su gran patio en la Ciudad Prohibida de Pekín, con visitantes",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [
    "beijing-highlights-5-day-private-tour",
    "beijing-xian-shanghai-8-day-private-tour",
    "beijing-xian-guilin-shanghai-10-day-private-tour",
  ],
  offers: [
    {
      id: "beijing-5-day",
      afterBlockId: "five-days-copy",
      kind: "tour",
      tourSlug: "beijing-highlights-5-day-private-tour",
      label: "Pekín en 5 días, con las entradas a su nombre",
      note: "Es la versión esencial de esta guía, ya organizada, en 5 días y 4 noches: hotel de 4 diamantes según la plataforma china Ctrip, con desayuno, traslados privados del aeropuerto o la estación, vehículo privado los tres días de visita y las entradas del itinerario (tarifa de adulto). Incluye el Templo del Cielo y el Palacio de Verano el mismo día, Tiananmén y la Ciudad Prohibida, y la Gran Muralla en Badaling, el tramo con el acceso más sencillo. Las entradas nominativas las tramitamos nosotros con su pasaporte, y si nos confirma el viaje al menos 8 días antes de empezar y no conseguimos la reserva de la Ciudad Prohibida o de la plaza de Tiananmén, le devolvemos todo lo que haya pagado. Elija guía de habla inglesa o solo conductor con asistencia a distancia; si prefiere guía de habla hispana, lo ponemos con un suplemento según ciudad y temporada, que confirmamos en su presupuesto.",
      action: "Ver el itinerario y el precio",
    },
    {
      id: "beijing-tickets",
      afterBlockId: "tickets-timezone",
      kind: "attraction-reservation",
      title: "No tiene que estar pendiente del reloj de Pekín",
      body: "Reservamos por usted, en el sistema oficial de cada lugar y a nombre de cada viajero, la Ciudad Prohibida, la plaza de Tiananmén, el Templo del Cielo, el Palacio de Verano y la Gran Muralla de Mutianyu. Usted nos manda las fechas y los datos del pasaporte, y le enviamos la confirmación para que la compare con su documento. La entrada oficial se paga a su precio, sin sobreprecio; nuestra gestión se cobra aparte, a la tarifa indicada.",
      attractionIds: ["forbidden-city", "tiananmen-square", "temple-of-heaven", "summer-palace", "great-wall-mutianyu"],
      preselect: "forbidden-city",
      action: "Pedir la reserva de la Ciudad Prohibida",
    },
    {
      id: "beijing-xian-shanghai-8-day",
      afterBlockId: "more-days-copy",
      kind: "tour",
      tourSlug: "beijing-xian-shanghai-8-day-private-tour",
      label: "Si tiene una semana: Pekín, Xi’an y Shanghái",
      note: "Tres noches en Pekín con la Ciudad Prohibida y la Gran Muralla de Mutianyu, los Guerreros de Terracota en Xi’an y Shanghái al final, con el tren y el vuelo internos incluidos. La garantía es la misma: si nos confirma el viaje al menos 8 días antes de empezar y no conseguimos la reserva de la Ciudad Prohibida o de la plaza de Tiananmén, le devolvemos todo lo que haya pagado.",
      action: "Ver el viaje de 8 días",
    },
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: "Con 3 días en Pekín (Beijing) verá lo imprescindible: Tiananmén y la Ciudad Prohibida, la Gran Muralla y el Templo del Cielo. Con 4 días añadirá el Palacio de Verano y los hutongs sin correr. Con 5 días cabe todo, con un día de margen por si una entrada o el tiempo cambian el plan. Lo que más condiciona el itinerario no es la distancia, sino tres reglas: la Ciudad Prohibida cierra los lunes, sus entradas salen 7 días antes a las 20:00 de Pekín y se reservan con el pasaporte de cada viajero, sin venta en taquilla el mismo día.",
      },
      { id: "name-heading", type: "heading", level: 2, text: "¿Pekín y Beijing son lo mismo?" },
      {
        id: "name-copy",
        type: "paragraph",
        text: "Sí, es la misma ciudad. «Pekín» es el nombre tradicional en español y «Beijing» es la transcripción oficial china en pinyin. En su billete de avión, en los carteles del aeropuerto y en las entradas verá «Beijing»; los aeropuertos son Beijing Capital (PEK) y Beijing Daxing (PKX). En esta guía usamos Pekín.",
      },
      { id: "plan-heading", type: "heading", level: 2, text: "El itinerario de Pekín en 3, 4 y 5 días" },
      {
        id: "plan-table",
        type: "table",
        caption: "Qué ver en Pekín según los días completos que tenga, sin contar el día de llegada",
        columns: ["Día", "3 días", "4 días", "5 días"],
        rows: [
          ["1", "Plaza de Tiananmén, Ciudad Prohibida y vista desde la colina de Jingshan", "Plaza de Tiananmén, Ciudad Prohibida y Jingshan", "Plaza de Tiananmén, Ciudad Prohibida y Jingshan"],
          ["2", "Gran Muralla (Mutianyu) todo el día", "Gran Muralla (Mutianyu) todo el día", "Gran Muralla (Mutianyu o Badaling) todo el día"],
          ["3", "Templo del Cielo por la mañana; tarde en los hutongs de la Torre del Tambor", "Templo del Cielo por la mañana; Palacio de Verano por la tarde", "Templo del Cielo y Palacio de Verano"],
          ["4", "—", "Hutongs, Templo de los Lamas y Parque Olímpico", "Hutongs, Templo de los Lamas y Parque Olímpico"],
          ["5", "—", "—", "Día de margen: museo, compras o lo que haya cambiado de día"],
        ],
      },
      {
        id: "monday-callout",
        type: "callout",
        tone: "warning",
        title: "Los lunes, a la Muralla",
        body: "La Ciudad Prohibida cierra los lunes, salvo festivos. Los monumentos de pago del Templo del Cielo y los recintos interiores del Palacio de Verano también suelen cerrar ese día, aunque los parques abran. Si su estancia incluye un lunes, dedíquelo a la Gran Muralla.",
      },
      {
        id: "three-days-copy",
        type: "paragraph",
        text: "En 3 días hay que elegir: la Ciudad Prohibida pide unas tres horas a pie, la Gran Muralla ocupa el día entero con unos 90 minutos de carretera hasta Mutianyu, y el tercer día solo da para uno de los dos grandes parques imperiales. Más abajo explicamos cuál.",
      },
      {
        id: "four-days-copy",
        type: "paragraph",
        text: "En 4 días el Templo del Cielo y el Palacio de Verano caben el mismo día, por la mañana y por la tarde, y queda una jornada para los hutongs, el Templo de los Lamas y el Parque Olímpico, donde se ven por fuera el Nido de Pájaro y el Cubo de Agua.",
      },
      {
        id: "five-days-copy",
        type: "paragraph",
        text: "Con 5 días el ritmo es cómodo y, sobre todo, hay un día de margen. Si la entrada de la Ciudad Prohibida sale para un día distinto del previsto, o si llueve el día de la Muralla, se cambia el orden sin perder nada. Es la duración que recomendamos para un primer viaje que solo incluya Pekín. Y si prefiere no reservar usted cada entrada, cada traslado y el coche hasta la Muralla, una versión esencial de este plan ya existe como viaje privado.",
      },
      { id: "choose-heading", type: "heading", level: 2, text: "¿Palacio de Verano o Templo del Cielo?" },
      {
        id: "choose-grid",
        type: "comparison",
        title: "Si solo le cabe uno",
        columns: [
          {
            heading: "Templo del Cielo",
            body: "Donde los emperadores rezaban por las cosechas. Es el más fácil de encajar.",
            items: [
              "En el sur del centro histórico, a pocas paradas de metro de Tiananmén",
              "Unas 2 o 3 horas, mejor temprano: los pekineses hacen ejercicio, bailan y cantan en el parque",
              "Para ver el Salón de la Oración por las Buenas Cosechas hace falta la entrada combinada, no solo la del parque",
              "Los monumentos de pago suelen cerrar los lunes",
            ],
          },
          {
            heading: "Palacio de Verano",
            body: "El jardín imperial junto al lago Kunming. Pide más tiempo y más piernas.",
            items: [
              "En el noroeste de la ciudad, más lejos del centro",
              "Media jornada como mínimo",
              "El Gran Corredor, la colina de la Longevidad (con escaleras) y el puente de los Diecisiete Arcos",
              "Los barcos del lago son de temporada y los recintos interiores cierran antes que el parque",
            ],
          },
        ],
      },
      {
        id: "choose-copy",
        type: "paragraph",
        text: "Nuestra recomendación: con 3 días, el Templo del Cielo, porque cabe en una mañana y deja la tarde libre. Con 4 o 5 días, los dos el mismo día: el Templo del Cielo temprano y el Palacio de Verano después. Si viaja de abril a octubre y le gusta caminar junto al agua, el Palacio de Verano compensa el desplazamiento.",
      },
      { id: "tickets-heading", type: "heading", level: 2, text: "Las entradas: cuándo salen y qué pasa en festivos" },
      {
        id: "tickets-list",
        type: "list",
        items: [
          "Ciudad Prohibida: reserva nominativa con el pasaporte de cada visitante. La venta abre 7 días antes de la visita a las 20:00, hora de Pekín, y no hay entradas para el mismo día.",
          "Plaza de Tiananmén: también exige reserva nominativa, aparte de la Ciudad Prohibida.",
          "Gran Muralla de Mutianyu: reserva nominativa hasta 30 días antes, una entrada por pasaporte y día y con franja horaria de entrada; la entrada son 40 yuanes, y el autobús lanzadera y el teleférico se pagan aparte.",
          "Templo del Cielo y Palacio de Verano: se reservan con pasaporte en sus canales oficiales; elija la entrada según lo que vaya a recorrer.",
          "En todos los casos: lleve el pasaporte original con el que reservó. Una foto del pasaporte no sirve en el control.",
        ],
      },
      {
        id: "tickets-urgency",
        type: "callout",
        tone: "warning",
        title: "En festivos, todos los días pueden estar completos",
        body: "El 1 de octubre de 2025, primer día de la Semana Dorada, la Ciudad Prohibida ya no tenía entradas, y el sistema oficial mostraba completos todos los días del 2 al 7 de octubre, según el diario económico Yicai. En la Ciudad Prohibida lo difícil no es la puerta, sino conseguir la entrada. Los vuelos y el hotel se reservan con meses de antelación, pero esta entrada solo se puede pedir 7 días antes: si su día ya está completo, es el resto del viaje el que hay que reordenar. Nuestra garantía pide que nos encargue la reserva al menos 8 días antes, es decir, antes de que abra la venta; con las fechas cerradas y los pasaportes a mano, escríbanos ya.",
      },
      {
        id: "tickets-timezone",
        type: "table",
        caption: "A qué hora de su país abre la venta de la Ciudad Prohibida (20:00 en Pekín)",
        columns: ["Dónde está usted", "Hora local"],
        rows: [
          ["España, horario de verano", "14:00"],
          ["España, horario de invierno", "13:00"],
          ["Ciudad de México", "06:00"],
          ["Bogotá y Lima", "07:00"],
          ["Buenos Aires", "09:00"],
        ],
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva con nosotros",
        body: "Escríbanos en español por WhatsApp o por correo con sus fechas, el número de viajeros y el viaje o el servicio que le interesa. Le respondemos en un plazo de 12 horas, y antes de pagar recibe el presupuesto completo por escrito. El mismo planificador le atiende de principio a fin. Si prefiere hacer el viaje en español, hay guía de habla hispana en todas las ciudades de la ruta, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto; el guía habitual habla inglés. Para reservar un viaje se paga un 30 % de depósito con Alipay o con VBill, que acepta tarjetas bancarias de América Latina; el resto, al llegar. Las entradas sueltas se pagan después de nuestra confirmación escrita. Somos una agencia de viajes con licencia en Pekín (L-BJ10587); los guías y los conductores son nuestros, y no hacemos paradas en tiendas.",
      },
      { id: "move-heading", type: "heading", level: 2, text: "Cómo moverse y dónde dormir" },
      {
        id: "move-copy",
        type: "paragraph",
        text: "El metro conecta bien el centro, pero los recintos son enormes y se camina mucho dentro de cada uno. Para la Gran Muralla, un coche con conductor ahorra el transporte público hasta Mutianyu, que exige combinar varios medios. Dónde dormir lo explicamos en nuestra guía de dónde alojarse en Pekín: para un primer viaje de 3 a 5 días, Wangfujing es la zona más equilibrada.",
        link: { label: "guía de dónde alojarse en Pekín", href: "/es/guias/donde-alojarse-en-pekin/" },
      },
      {
        id: "car-copy",
        type: "paragraph",
        text: "Si solo necesita el transporte, un coche con conductor para la Muralla o para todo un día de visitas le lleva de una visita a la siguiente, sin depender del transporte público. Los conductores son nuestros y le confirmamos el trayecto y el precio por escrito antes de pagar.",
        link: { label: "coche con conductor", href: "/es/services/private-car-and-driver/#car-enquiry" },
      },
      { id: "more-heading", type: "heading", level: 2, text: "¿Y si tiene más días en China?" },
      {
        id: "more-days-copy",
        type: "paragraph",
        text: "Pekín se combina casi siempre con Xi’an, a entre 4 horas y media y 6 horas de tren de alta velocidad, para ver los Guerreros de Terracota, y con Shanghái al final. En una semana caben las tres ciudades; en 10 días se añaden Guilin y el río Li.",
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas sobre Pekín en 3, 4 y 5 días",
        items: [
          {
            question: "¿Cuántos días hacen falta para ver Pekín?",
            answer: "Tres días completos para lo imprescindible: la Ciudad Prohibida, la Gran Muralla y el Templo del Cielo. Cinco días para verlo todo con calma y con un día de margen por si cambia una entrada o el tiempo. El día de llegada no cuenta.",
          },
          {
            question: "¿Pekín y Beijing son la misma ciudad?",
            answer: "Sí. Pekín es el nombre tradicional en español; Beijing es la transcripción oficial china, la que verá en billetes, aeropuertos y entradas.",
          },
          {
            question: "¿Qué es mejor, el Palacio de Verano o el Templo del Cielo?",
            answer: "Si solo tiene tiempo para uno, el Templo del Cielo: está cerca del centro y se ve en 2 o 3 horas. El Palacio de Verano, en el noroeste, pide media jornada; con 4 o 5 días se pueden ver los dos el mismo día.",
          },
          {
            question: "¿Qué día cierra la Ciudad Prohibida?",
            answer: "Los lunes, salvo festivos. Ese día conviene ir a la Gran Muralla.",
          },
          {
            question: "¿Cuándo salen las entradas de la Ciudad Prohibida?",
            answer: "7 días antes de la visita, a las 20:00 hora de Pekín: las 14:00 en España en verano, las 13:00 en invierno, las 06:00 en Ciudad de México, las 07:00 en Bogotá y Lima y las 09:00 en Buenos Aires. No se venden entradas para el mismo día.",
          },
          {
            question: "¿Se puede visitar la Ciudad Prohibida sin reserva?",
            answer: "No. Todas las entradas son nominativas y se reservan antes, con el pasaporte de cada visitante. En la puerta se muestra ese mismo pasaporte original.",
          },
          {
            question: "¿Qué tramo de la Gran Muralla conviene desde Pekín?",
            answer: "Para una primera visita, Mutianyu: paisaje, muralla restaurada y teleférico, a unos 90 minutos por carretera. Badaling tiene mejor acceso en transporte público.",
          },
          {
            question: "¿Y si no hablo inglés?",
            answer: "Ponemos guía de habla hispana en Pekín y en cualquier otra ciudad de su viaje, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto. El guía del precio publicado habla inglés.",
          },
        ],
      },
      {
        id: "next-links",
        type: "internal-links",
        title: "Siga preparando Pekín",
        items: [
          {
            label: "Dónde alojarse en Pekín (Beijing)",
            href: "/es/guias/donde-alojarse-en-pekin/",
            description: "Cuatro zonas comparadas para un primer viaje.",
          },
          {
            label: "Muralla China desde Pekín: qué tramo visitar",
            href: "/es/guias/muralla-china-desde-pekin/",
            description: "Mutianyu, Badaling, Jinshanling o Simatai.",
          },
          {
            label: "Guerreros de Terracota: entradas, horario y cómo ir",
            href: "/es/guias/guerreros-de-terracota-xian/",
            description: "Si continúa a Xi’an después de Pekín.",
          },
          {
            label: "Lo esencial de Pekín: viaje privado de 5 días",
            href: "/es/tours/beijing-highlights-5-day-private-tour/",
            description: "Itinerario y precio publicado por persona.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes",
        items: [
          {
            label: "Museo del Palacio: horarios, días de cierre y accesos",
            url: "https://www.dpm.org.cn/Visit.html",
            publisher: "Museo del Palacio (Ciudad Prohibida)",
            reviewedAt: "2026-08-22",
          },
          {
            label: "Reserva de la Ciudad Prohibida con pasaporte extranjero",
            url: "https://english.beijing.gov.cn/12345hotline/faqs/all/202506/t20250620_4117980.html",
            publisher: "Gobierno Municipal de Pekín, línea 12345",
            reviewedAt: "2026-08-22",
          },
          {
            label: "Canales oficiales de reserva de la plaza de Tiananmén",
            url: "https://english.beijing.gov.cn/travellinginbeijing/attractions/202603/t20260325_4566110.html",
            publisher: "Gobierno Municipal de Pekín",
            reviewedAt: "2026-08-22",
          },
          {
            label: "La Ciudad Prohibida, completa del 2 al 7 de octubre de 2025",
            url: "https://www.yicai.com/news/102851899.html",
            publisher: "Yicai",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Templo del Cielo: horarios y entrada combinada",
            url: "https://www.tiantanpark.cn/en/index.html",
            publisher: "Parque del Templo del Cielo",
            reviewedAt: "2026-08-12",
          },
          {
            label: "Palacio de Verano: horarios, entradas y barcos",
            url: "https://summerpalace.net.cn/en/index.html?_isa=1",
            publisher: "Palacio de Verano",
            reviewedAt: "2026-08-12",
          },
          {
            label: "Reserva con pasaporte en los parques de Pekín, 2026",
            url: "https://english.beijing.gov.cn/travellinginbeijing/parks/202603/t20260320_4562532.html",
            publisher: "Gobierno Municipal de Pekín",
            reviewedAt: "2026-08-12",
          },
        ],
      },
    ],
  },
};
