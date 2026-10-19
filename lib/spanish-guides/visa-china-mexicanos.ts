import type { SpanishGuide } from "../spanishGuideTypes";

export const visaChinaMexicanos: SpanishGuide = {
  slug: "visa-china-mexicanos",
  title: "Visa China para mexicanos: requisitos y tránsito 240 horas",
  headline: "¿Los mexicanos necesitan visa para China? Sí, salvo en el tránsito sin visa de 240 horas",
  description:
    "Con pasaporte mexicano hace falta visa para viajar a China. Requisitos y plazos del trámite en México, y cuándo sirve el tránsito sin visa de 240 horas.",
  navTitle: "Visa para China desde México",
  heroImage: {
    src: "/images/guides/passport-name-across-china-bookings/hero-1600.webp",
    width: 1600,
    height: 1000,
    alt: "Ilustración de una mano que sostiene un pasaporte con un boleto de avión asomando por arriba",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [
    "beijing-xian-shanghai-8-day-private-tour",
    "beijing-highlights-5-day-private-tour",
  ],
  offers: [
    {
      id: "beijing-xian-shanghai-8-day",
      afterBlockId: "fit-copy",
      kind: "tour",
      tourSlug: "beijing-xian-shanghai-8-day-private-tour",
      label: "Pekín, Xi'an y Shanghái en 8 días",
      note: "Sin visa, pero sin margen de error: la aerolínea revisa su boleto al tercer país antes de embarcar, y todo el viaje tiene que caber en las zonas permitidas. Este viaje cumple las dos cosas si sale de Shanghái hacia un tercer país o región y pasa el día 7 en Shanghái: entra por Pekín y recorre la Ciudad Prohibida, la Gran Muralla en Mutianyu y los Guerreros de Terracota, con guía y vehículo en cada ciudad, y con el tren a Xi'an y el vuelo a Shanghái incluidos. Si confirma el viaje con al menos 8 días de antelación y no conseguimos la reserva de la Ciudad Prohibida o de la plaza de Tiananmén, le devolvemos todo lo que haya pagado.",
      action: "Ver el itinerario y el precio",
    },
    {
      id: "beijing-5-day",
      afterBlockId: "fit-copy",
      kind: "tour",
      tourSlug: "beijing-highlights-5-day-private-tour",
      label: "Pekín en 5 días",
      note: "Si tiene pocos días, Pekín en 5 días cabe de sobra en las 240 horas, siempre que su vuelo de salida vaya a un tercer país o región y cumpla las demás condiciones de arriba. Incluye cuatro noches de hotel con desayuno, recogida en el aeropuerto, vehículo privado y las entradas de adulto previstas. Igual que en el viaje de 8 días, si lo confirma con al menos 8 días de antelación y no conseguimos la reserva de la Ciudad Prohibida o de la plaza de Tiananmén, le devolvemos todo lo que haya pagado.",
      action: "Ver el itinerario y el precio",
    },
    {
      id: "transit-tickets",
      afterBlockId: "help-copy",
      kind: "attraction-reservation",
      title: "Las entradas no esperan a que llegue",
      body: "La Ciudad Prohibida no vende entradas para el mismo día: salen a las 20:00, hora de China, siete días antes, a nombre de cada visitante y con su número de pasaporte. En la Semana Dorada de 2025, el 1 de octubre ya estaban completos todos los días del 2 al 7, según Yicai. No espere a aterrizar en China: encárguenos las entradas antes de que se abra la venta.",
      attractionIds: ["forbidden-city", "temple-of-heaven", "great-wall-mutianyu", "terracotta-warriors", "shanghai-tower"],
      action: "Reservar las entradas",
    },
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: "Sí. Con pasaporte mexicano hace falta visa para viajar a China como turista: México no está en la lista de países que entran sin visa hasta 30 días. Hay una excepción útil: el tránsito sin visa de hasta 240 horas, que sí admite el pasaporte mexicano si entra por uno de los 65 puertos habilitados y sale de China hacia un tercer país o región, distinto de aquel desde el que llegó (por ejemplo, llega desde México y sigue a Japón, Corea del Sur o Hong Kong), con el boleto ya confirmado. Comprobamos estas normas en las fuentes oficiales el 19 de octubre de 2026.",
      },
      {
        id: "glance-table",
        type: "table",
        caption: "Las dos formas de entrar en China con pasaporte mexicano",
        columns: ["Punto", "Visa de turista (L)", "Tránsito sin visa de 240 horas"],
        rows: [
          ["Para qué viaje", "Cualquier viaje de turismo, también ida y vuelta desde México", "Un viaje que sigue desde China hacia un tercer país o región"],
          ["Estancia", "La que conceda la visa", "Hasta 240 horas, contadas desde las 00:00 del día siguiente a la entrada"],
          ["Dónde se puede estar", "Toda China continental", "Solo en las zonas permitidas de 24 provincias"],
          ["Trámite", "Solicitud en línea y entrega en el centro de visas, en Ciudad de México o Tijuana", "Ninguno antes de viajar: se pide en el control fronterizo al llegar"],
          ["Pasaporte", "Más de 6 meses de vigencia y dos páginas en blanco", "Al menos 3 meses de vigencia"],
        ],
      },
      { id: "visa-heading", type: "heading", level: 2, text: "La visa de turista: cómo se tramita en México" },
      {
        id: "visa-copy",
        type: "paragraph",
        text: "Desde septiembre de 2025, la visa se solicita en línea a través del Centro de Servicio de Solicitud de Visa China: se crea una cuenta, se llena el formulario y se suben los documentos. Después se entrega el pasaporte en el centro de Ciudad de México o en el de Tijuana. La embajada recomienda pedirla con al menos un mes de antelación.",
      },
      {
        id: "visa-docs",
        type: "list",
        items: [
          "Pasaporte original con más de 6 meses de vigencia y dos páginas en blanco, y copia de la página de datos.",
          "El formulario de solicitud en línea y una foto a color con fondo blanco.",
          "Itinerario, reservas de vuelos de ida y vuelta y reserva de hotel.",
          "Si no es mexicano, un comprobante de su estancia legal en México.",
        ],
      },
      {
        id: "visa-times",
        type: "paragraph",
        text: "Según la embajada, en Ciudad de México la tramitación ordinaria tarda 4 días hábiles y la urgente 3; en Tijuana, unos 10 a 15 días hábiles, porque los documentos se envían a Ciudad de México. Las tarifas las publica el centro de visas: consúltelas allí antes de presentar la solicitud.",
      },
      { id: "transit-heading", type: "heading", level: 2, text: "El tránsito sin visa de 240 horas" },
      {
        id: "transit-copy",
        type: "paragraph",
        text: "México está entre los 57 países cuyos ciudadanos pueden entrar en China sin visa en tránsito, junto a Estados Unidos, Canadá, Brasil, Argentina y Chile en América. Sirve para turismo, negocios y visitas familiares; trabajar, estudiar o hacer periodismo siguen necesitando visa. Estas son las condiciones publicadas por la Administración Nacional de Inmigración:",
      },
      {
        id: "transit-list",
        type: "list",
        items: [
          "Pasaporte ordinario con al menos 3 meses de vigencia.",
          "Un boleto confirmado, con fecha y asiento, hacia un tercer país o región, con salida dentro de las 240 horas, y cumplir los requisitos de entrada de ese destino.",
          "Entrar por uno de los 65 puertos fronterizos habilitados en 24 provincias, entre ellos los aeropuertos de Pekín-Capital y Pekín-Daxing.",
          "Quedarse dentro de las zonas permitidas; se puede viajar de una provincia a otra dentro de ellas.",
          "Llenar la tarjeta de llegada y pasar el control fronterizo, donde se decide la entrada.",
        ],
      },
      {
        id: "count-copy",
        type: "paragraph",
        text: "Las 240 horas empiezan a contar a las 00:00 del día siguiente a la entrada. Si llega a Pekín el 1 de mayo a las 15:00, el plazo empieza el 2 de mayo a las 00:00 y termina a las 24:00 del 11 de mayo.",
      },
      { id: "route-heading", type: "heading", level: 2, text: "Qué rutas sirven y cuáles no" },
      {
        id: "route-copy",
        type: "paragraph",
        text: "La clave es el destino al salir de China: tiene que ser un tercer país o región, distinto del país desde el que llegó. Hong Kong, Macao y Taiwán cuentan como región de destino; el gobierno de Shanghái pone como ejemplo válido un viaje Londres–Shanghái–Hong Kong. Si su vuelo de salida desde China vuelve directamente a México, no es un tránsito: para ese viaje, pida la visa.",
      },
      {
        id: "route-table",
        type: "table",
        caption: "Ejemplos de rutas desde México",
        columns: ["Ruta", "¿Encaja en el tránsito de 240 horas?", "Por qué"],
        rows: [
          ["México → Pekín → Tokio", "Sí", "Llega desde México y sale hacia Japón"],
          ["México → Shanghái → Hong Kong", "Sí", "Hong Kong cuenta como región de destino"],
          ["México → Pekín → Xi'an → Shanghái → Seúl", "Sí", "Puede entrar y salir por ciudades distintas, dentro de las zonas permitidas"],
          ["México → Shanghái → México", "No", "Vuelve al país de origen: pida la visa"],
          ["México → Tokio → Pekín → Tokio → México", "No", "Llega a China desde Japón y sale hacia Japón: no es un tercer país"],
        ],
      },
      {
        id: "airline-callout",
        type: "callout",
        tone: "warning",
        title: "La aerolínea revisa antes que China",
        body: "Al documentar, avise a la aerolínea de que va a usar el tránsito sin visa y tenga a mano el boleto de salida hacia el tercer país o región. El personal de la aerolínea revisa primero sus documentos en el aeropuerto de salida; la decisión final la toma el control fronterizo al llegar.",
      },
      {
        id: "other-passports",
        type: "paragraph",
        text: "Si además tiene pasaporte español, argentino, chileno, peruano o uruguayo, puede entrar sin visa hasta 30 días con ese pasaporte, sin necesidad de salir hacia un tercer país, en las entradas hasta el 31 de diciembre de 2026. Lo explicamos en nuestra guía del visado para China.",
        link: {
          label: "nuestra guía del visado para China",
          href: "/es/guias/visado-china-espanoles/",
        },
      },
      {
        id: "card-copy",
        type: "paragraph",
        text: "Con visa o en tránsito, al llegar hay que presentar la tarjeta de llegada, que se puede llenar en línea antes de volar. Cómo hacerlo, paso a paso, está en nuestra guía de la tarjeta de llegada a China.",
        link: {
          label: "guía de la tarjeta de llegada a China",
          href: "/es/guias/tarjeta-de-llegada-china/",
        },
      },
      { id: "fit-heading", type: "heading", level: 2, text: "Qué viaje cabe en 240 horas" },
      {
        id: "fit-copy",
        type: "paragraph",
        text: "Pekín, Shanghái y la provincia de Shaanxi, donde está Xi'an, están dentro de las zonas permitidas. Por eso un viaje de 8 días por Pekín, Xi'an y Shanghái cabe en el tránsito si entra por Pekín, sale de Shanghái hacia un tercer país o región y todas las ciudades del programa están en esas zonas. Antes de reservar, compruebe las zonas de cada ciudad de su ruta en la lista oficial.",
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos en español por WhatsApp o por correo con sus fechas, el número de viajeros y el viaje o el traslado que le interesa. Respondemos en un plazo de 12 horas con el presupuesto completo por escrito. Para reservar se paga un 30 % de depósito con Alipay o VBill, y el resto al llegar. Somos una agencia de viajes con licencia en Pekín (L-BJ10587). Los guías y los conductores son nuestros; los guías hablan inglés. Y no hay paradas obligatorias en tiendas: el tiempo del viaje es para lo que usted vino a ver.",
      },
      { id: "help-heading", type: "heading", level: 2, text: "Cuando tenga clara la entrada" },
      {
        id: "help-copy",
        type: "paragraph",
        text: "¿Va a pedir la visa? La embajada recomienda solicitarla con al menos un mes de antelación, y en Tijuana el trámite tarda unos 10 a 15 días hábiles: no deje el resto del viaje para el final. Con la visa o la ruta de tránsito decidida, nos encargamos de hoteles, trenes y coches con conductor, con guías y conductores propios. Cuéntenos fechas y ciudades en nuestra página de planificación del viaje y le respondemos en un plazo de 12 horas.",
        link: {
          label: "página de planificación del viaje",
          href: "/es/services/full-trip-support/",
        },
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas sobre la visa para China con pasaporte mexicano",
        items: [
          {
            question: "¿Los mexicanos necesitan visa para China?",
            answer: "Sí, para un viaje de turismo normal. México no está en la lista de entrada sin visa de 30 días. La excepción es el tránsito sin visa de hasta 240 horas, si sale de China hacia un tercer país o región con boleto confirmado.",
          },
          {
            question: "¿Dónde se tramita la visa china en México?",
            answer: "En línea, a través del Centro de Servicio de Solicitud de Visa China, y después en persona en su centro de Ciudad de México o en el de Tijuana. En Ciudad de México la tramitación ordinaria tarda 4 días hábiles; en Tijuana, unos 10 a 15.",
          },
          {
            question: "¿Puedo ir de México a China y volver a México sin visa?",
            answer: "No con el tránsito de 240 horas: el boleto de salida tiene que ser hacia un tercer país o región, como Japón, Corea del Sur o Hong Kong. Para un viaje de ida y vuelta entre México y China, pida la visa.",
          },
          {
            question: "¿Cómo se cuentan las 240 horas?",
            answer: "Desde las 00:00 del día siguiente a la entrada. Si llega el 1 de mayo por la tarde, el plazo va del 2 de mayo a las 00:00 al 11 de mayo a las 24:00.",
          },
          {
            question: "¿Hong Kong cuenta como tercer país para el tránsito?",
            answer: "Sí. Hong Kong, Macao y Taiwán cuentan como región de destino. Necesita además un boleto confirmado y cumplir los requisitos de entrada de ese destino.",
          },
          {
            question: "¿Cómo se paga un viaje organizado con Homeground China?",
            answer: "Con Alipay o VBill: un 30 % de depósito al reservar y el resto al llegar. Antes de pagar recibe por escrito el presupuesto con todo lo que incluye.",
          },
        ],
      },
      {
        id: "next-links",
        type: "internal-links",
        title: "Rutas y guías para preparar el viaje",
        items: [
          {
            label: "China en 8 días: Pekín, Xi'an y Shanghái",
            href: "/es/tours/beijing-xian-shanghai-8-day-private-tour/",
            description: "La ruta clásica de un primer viaje, con precio por persona publicado.",
          },
          {
            label: "Visado para China",
            href: "/es/guias/visado-china-espanoles/",
            description: "La entrada sin visado de 30 días y los pasaportes de los países de habla hispana.",
          },
          {
            label: "Cómo pagar en China",
            href: "/es/guias/como-pagar-en-china/",
            description: "Alipay, WeChat Pay, tarjetas y efectivo desde el primer día.",
          },
          {
            label: "Todos los viajes",
            href: "/es/tours/",
            description: "Rutas privadas con el precio por persona publicado.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes oficiales",
        items: [
          {
            label: "Museo del Palacio: el 1 de octubre de 2025, todos los días del 2 al 7 de octubre ya estaban reservados",
            url: "https://www.yicai.com/news/102851899.html",
            publisher: "Yicai",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Requisitos de solicitud de visa de la Embajada de China en México (a partir de septiembre de 2025)",
            url: "https://mx.china-embassy.gov.cn/esp/LSFW/consular1/202510/t20251001_11722302.htm",
            publisher: "Embajada de China en México",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Visa-Free Transit Policies: 57 países, México incluido, y 65 puertos",
            url: "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
            publisher: "Administración Nacional de Inmigración de China",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Anuncio n.º 4 de 2025: condiciones del tránsito de 240 horas y cómputo del plazo",
            url: "https://es.nia.gov.cn/n32407/n32461/c189786/content.html",
            publisher: "Administración Nacional de Inmigración de China",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Lista de entrada sin visado de 30 días (17 de febrero de 2026)",
            url: "https://en.nia.gov.cn/n147418/n147463/c183390/content.html",
            publisher: "Administración Nacional de Inmigración de China",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Ampliación del tránsito sin visa: 24 provincias, Shaanxi entera y viaje entre provincias (17 de diciembre de 2024)",
            url: "https://www.nia.gov.cn/n897453/c1688948/content.html",
            publisher: "Administración Nacional de Inmigración de China",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Tránsito sin visa: Londres–Shanghái–Hong Kong como ruta válida",
            url: "https://english.shanghai.gov.cn/en-Visafreetransit/index.html",
            publisher: "Gobierno municipal de Shanghái",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Exención de visa de tránsito de 240 horas: tercer país o región, con Hong Kong, Macao y Taiwán, y aviso a la aerolínea",
            url: "https://spanish.beijing.gov.cn/travellinginbeijing/144hourvisafreetransit/mobile/",
            publisher: "Gobierno municipal de Pekín",
            reviewedAt: "2026-10-19",
          },
        ],
      },
    ],
  },
};
