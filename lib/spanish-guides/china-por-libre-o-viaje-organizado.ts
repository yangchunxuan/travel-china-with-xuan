import type { SpanishGuide } from "../spanishGuideTypes";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { spanishTourPrice as price } from "../spanishGuidePrices.ts";

const beijing5 = "beijing-highlights-5-day-private-tour";
const classic8 = "beijing-xian-shanghai-8-day-private-tour";
const classic10 = "beijing-xian-guilin-shanghai-10-day-private-tour";
const pandas14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";

export const chinaPorLibreOViajeOrganizado: SpanishGuide = {
  slug: "china-por-libre-o-viaje-organizado",
  title: "¿China por libre, viaje organizado o a medida? Comparativa",
  headline: "¿Viajar a China por libre, en viaje organizado o a medida? Lo que cuesta cada opción y lo que tendrá que resolver",
  description:
    "Por libre, circuito o viaje privado a medida: precio, idioma, pagos, entradas y tiendas en cada opción, con datos de octubre de 2026, para elegir cómo viajar a China.",
  navTitle: "Por libre, organizado o a medida",
  heroImage: {
    src: "/images/tours/guilin-yangshuo-5-day-private-tour/yulong-countryside-1600.webp",
    width: 1600,
    height: 1000,
    alt: "Un balsero con sombrero cónico sobre una balsa de bambú en el río Yulong, entre arrozales y montañas kársticas de Yangshuo",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [classic10, pandas14, classic8, beijing5],
  offers: [
    {
      id: "ten-days",
      afterBlockId: "private-copy",
      kind: "tour",
      tourSlug: classic10,
      label: "La tercera vía, con precio publicado",
      note: "Diez días con sus fechas y su ritmo: guía y coche solo para su grupo, hoteles de cuatro estrellas con desayuno, entradas reservadas a su nombre, un tren de alta velocidad y dos vuelos internos. Sin autobús de grupo y sin paradas en tiendas.",
      action: "Ver el viaje de 10 días",
    },
    {
      id: "beijing-5-day",
      afterBlockId: "mix",
      kind: "tour",
      tourSlug: beijing5,
      label: "Para empezar por Pekín y seguir por libre",
      note: "Cinco días en Pekín con coche privado, hotel y la Ciudad Prohibida, el Templo del Cielo, el Palacio de Verano y la Gran Muralla resueltos. Después puede seguir viaje por su cuenta.",
      action: "Ver Pekín en 5 días",
    },
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: `Por libre es lo más barato, pero usted resuelve los pagos con el móvil, el idioma, las entradas con nombre y los trenes. Un viaje organizado de agencia (circuito) suele llevar el vuelo, visitas explicadas en español y precio cerrado, pero con fechas y ritmo de grupo, y algunos incluyen paradas en talleres o avisan de que la Ciudad Prohibida podría sustituirse. Un viaje privado a medida va a sus fechas y su ritmo, con guía y coche solo para su grupo y sin tiendas; para dos viajeros cuesta más que un circuito, y la diferencia se estrecha con cuatro o seis: nuestras rutas publicadas de 10 días cuestan ${price(classic10, 2)} por persona para dos y ${price(classic10, 6)} para seis, sin el vuelo internacional.`,
      },
      {
        id: "compare",
        type: "comparison",
        title: "Las tres formas de viajar, frente a frente",
        columns: [
          {
            heading: "Por libre",
            items: [
              "Precio: el más bajo; usted paga hoteles, trenes y entradas uno a uno",
              "Pagos: casi todo se paga con Alipay o WeChat Pay en el móvil",
              "Idioma: fuera de hoteles y zonas muy turísticas, poca gente habla inglés",
              "Entradas: usted las reserva, con su pasaporte, en los sistemas de cada sitio",
              "Ritmo: total libertad, y todos los imprevistos son suyos",
            ],
          },
          {
            heading: "Viaje organizado (circuito)",
            items: [
              "Precio: cerrado y con vuelo; por ejemplo, desde 2099 € en 9 días desde España",
              "Idioma: español, en los dos circuitos que hemos revisado",
              "Ritmo: el del grupo y el autobús; fechas de salida fijas",
              "Pagos: el circuito va pagado; propinas aparte (Mega Travel: 6 USD por pasajero y día)",
              "Tiendas: algunos incluyen «paradas técnicas y culturales en talleres»",
              "Ciudad Prohibida: algunos avisan de que «podría sustituirse por otra visita»",
            ],
          },
          {
            heading: "Viaje privado a medida",
            items: [
              `Precio: desde ${price(classic10, 2)} por persona en 10 días para dos, ${price(classic10, 6)} para seis, sin vuelo internacional`,
              "Idioma: guía privado de habla inglesa; de habla hispana, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto",
              "Ritmo: sus fechas, sus paradas y su hora de salida cada mañana",
              "Tiendas: ninguna",
              "Entradas: reservadas a nombre de cada viajero en cuanto se abre la venta",
            ],
          },
        ],
      },
      { id: "free-heading", type: "heading", level: 2, text: "Por libre: lo que tendrá que resolver usted" },
      {
        id: "free-pay",
        type: "paragraph",
        text: "Los pagos son el primer obstáculo. En China casi todo se paga con el móvil, y para un extranjero eso significa vincular su tarjeta a Alipay o a WeChat Pay antes de salir. Hay viajeros que cuentan que su tarjeta quedó en revisión, que no les llegó el código de verificación o que la cuenta se limitó al poco de usarla, y otros, con tarjetas latinoamericanas, que no consiguieron vincularla.",
        link: { label: "vincular su tarjeta a Alipay o a WeChat Pay", href: "/es/guias/como-pagar-en-china/" },
      },
      {
        id: "free-tickets",
        type: "paragraph",
        text: "Las entradas son el segundo. Los grandes lugares se reservan con nombre y número de pasaporte, y algunos abren la venta pocos días antes: la Ciudad Prohibida, siete días antes a las 20:00 de Pekín, que en España son las 13:00 o las 14:00 y en México las 06:00. El idioma es el tercero: en estaciones, taxis y restaurantes, poca gente habla inglés, y los trenes de alta velocidad salen de estaciones enormes con controles de pasaporte.",
      },
      {
        id: "free-pay-us",
        type: "paragraph",
        text: "En un viaje con nosotros, hoteles, entradas, trenes y vuelos internos van en un solo precio, pagado con Alipay o con VBill, que acepta tarjetas de América Latina. Del día a día en China solo le quedan las comidas, las propinas y sus gastos personales.",
      },
      {
        id: "free-golden-week",
        type: "paragraph",
        text: "Y en fechas fuertes no hay segunda oportunidad: el 1 de octubre de 2025, primer día de la Semana Dorada china, el sistema de reservas de la Ciudad Prohibida ya mostraba completos todos los días del 2 al 7 de octubre, según el diario económico Yicai. El museo no vende entradas para el mismo día: quien llega sin reserva a su nombre, no entra. Y quien nos lo encarga a última hora, con menos de 8 días, ya no tiene garantía.",
      },
      {
        id: "free-who",
        type: "paragraph",
        text: "Por libre funciona bien si alguien del grupo habla inglés o chino, viajan con tiempo de sobra y disfrutan resolviendo. Funciona peor con padres mayores, con niños pequeños o con un viaje corto en el que cada día cuenta.",
      },
      { id: "group-heading", type: "heading", level: 2, text: "Viaje organizado: lo que dicen las condiciones" },
      {
        id: "group-copy",
        type: "paragraph",
        text: "Un circuito de agencia es la opción más sencilla para dos personas que quieren un precio cerrado con avión. Lo que conviene leer son las condiciones. En el circuito de 9 días de Logitravel por Pekín, Xian y Shanghái, consultado el 19 de octubre de 2026, el precio parte de 2099 € con vuelo desde España, los guías locales son de habla española, se incluyen «paradas técnicas y culturales en talleres de productos locales» y se avisa de que la visita al Palacio Imperial «podría sustituirse por otra visita de manera excepcional». En México, el circuito Mega China de 10 días de Mega Travel parte de 1599 USD más 999 USD de impuestos, con vuelo desde México, y sus guías hablan español; las propinas, 6 USD por pasajero y día, van aparte.",
      },
      {
        id: "group-who",
        type: "paragraph",
        text: "El circuito encaja si viaja solo o en pareja, quiere el precio más bajo con avión y no le importa seguir el ritmo de un grupo. Encaja peor si quiere elegir cuánto tiempo pasa en cada sitio, si viaja con alguien que necesita parar, o si la Ciudad Prohibida es una visita que no está dispuesto a perder.",
      },
      { id: "private-heading", type: "heading", level: 2, text: "A medida: la tercera vía" },
      {
        id: "private-copy",
        type: "paragraph",
        text: `Un viaje privado combina lo mejor de los otros dos: alguien resuelve por usted pagos, entradas, trenes y traslados, pero el viaje es solo de su grupo, en sus fechas. Con nosotros, el viaje de 10 días por Pekín, Xi’an, Guilin y Shanghái cuesta ${price(classic10, 2)} por persona para dos viajeros, ${price(classic10, 4)} para cuatro y ${price(classic10, 6)} para seis; el de 14 días con los pandas de Chengdu, ${price(pandas14, 2)}, ${price(pandas14, 4)} y ${price(pandas14, 6)}. Incluyen hoteles con desayuno, guía y coche privados los días de visita, entradas y transporte entre ciudades. Lo que no incluyen es el vuelo internacional.`,
      },
      {
        id: "private-value",
        type: "paragraph",
        text: "Lo que se paga de más respecto a un circuito es control. Las entradas con nombre se reservan a nombre de cada viajero en cuanto se abre la venta, y en los viajes con Pekín, si reserva el viaje y nos envía los pasaportes al menos 8 días antes de la visita y no conseguimos la Ciudad Prohibida o Tiananmén, le devolvemos todo lo pagado. Y si son cuatro o seis, el guía y el coche se reparten entre más personas.",
      },
      {
        id: "mix",
        type: "paragraph",
        text: "Tampoco hay que elegir todo o nada. Se puede viajar por libre y encargarnos solo lo difícil: las entradas con nombre, un coche con conductor para un traslado o un día, o los primeros días en Pekín organizados antes de seguir por su cuenta.",
        link: { label: "las entradas con nombre", href: "/es/services/china-attraction-reservations/" },
      },
      {
        id: "custom",
        type: "paragraph",
        text: "Si ninguna de nuestras rutas encaja con sus días, le preparamos un viaje a medida con el precio cerrado por escrito antes de pagar.",
        link: { label: "le preparamos un viaje a medida", href: "/es/services/full-trip-support/" },
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos por WhatsApp o por correo con sus fechas, cuántas personas viajan y qué le gustaría ver. Respondemos en un plazo de 12 horas con el presupuesto completo por escrito, y el mismo planificador le atiende de principio a fin: desde esa primera respuesta hasta el último día del viaje. Para reservar se paga un 30 % de depósito con Alipay o con VBill, que acepta tarjetas de América Latina, y el resto al llegar a China. Somos una agencia de viajes con licencia en Pekín (L-BJ10587); los guías y los conductores son nuestros, y no paramos en tiendas. Nuestros guías hablan inglés; si prefiere el viaje en español, hay guía de habla hispana en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto.",
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas frecuentes",
        items: [
          {
            question: "¿Es mejor viajar a China por libre o en viaje organizado?",
            answer: "Por libre es más barato si alguien del grupo habla inglés o chino y tienen tiempo para resolver pagos, entradas y trenes. Un circuito organizado es más sencillo y lleva el avión, pero con ritmo de grupo. Un viaje privado a medida le da sus fechas y su ritmo, con todo resuelto.",
          },
          {
            question: "¿Se puede viajar a China sin hablar inglés ni chino?",
            answer: "Se puede, pero es más difícil: fuera de hoteles y zonas muy turísticas poca gente habla inglés. En un viaje privado con nosotros, el coche le recoge en el hotel y, en todas las ciudades, hay guía de habla hispana, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto.",
          },
          {
            question: "¿Cuánto cuesta un viaje a medida a China?",
            answer: `Nuestras rutas privadas publicadas cuestan, por ejemplo, ${price(classic8, 2)} por persona en 8 días para dos viajeros y ${price(classic10, 2)} en 10 días; con seis viajeros, ${price(classic8, 6)} y ${price(classic10, 6)}. Sin el vuelo internacional.`,
          },
          {
            question: "¿Qué diferencia hay entre un circuito y un viaje privado?",
            answer: "En un circuito comparte guía, autobús y horarios con otros viajeros, en fechas fijas. En un viaje privado, el guía y el coche son solo para su grupo y el viaje sale cuando usted quiere.",
          },
          {
            question: "¿Puedo ir por libre y contratar solo algunas cosas?",
            answer: "Sí. Podemos reservarle solo las entradas con nombre, poner un coche con conductor para un traslado o un día, u organizarle unos días concretos.",
          },
        ],
      },
      {
        id: "next-links",
        type: "internal-links",
        title: "Siga preparando el viaje",
        items: [
          {
            label: "Cuánto cuesta un viaje a China en 2026",
            href: "/es/guias/precio-viaje-a-china/",
            description: "Precios por persona de 5 a 21 días, para 2, 4 y 6 viajeros.",
          },
          {
            label: "Cómo pagar en China siendo turista",
            href: "/es/guias/como-pagar-en-china/",
            description: "Alipay, WeChat Pay, tarjetas y efectivo.",
          },
          {
            label: "Todos los viajes con precio publicado",
            href: "/es/tours/",
            description: "Rutas privadas de 4 a 21 días.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes",
        items: [
          {
            label: "Logitravel: circuito «Pekín, Xian y Shanghái en tren y avión», 9 días",
            url: "https://www.logitravel.com/grandes-viajes/asia/china/circuitos/circuito-clasico/china-pekin-xian-shanghai-en-tren-y-avion-9-dias.html",
            publisher: "Logitravel",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Mega Travel: «Mega China», 10 días",
            url: "https://www.megatravel.com.mx/viaje/mega-china-30023.html",
            publisher: "Mega Travel",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Museo del Palacio: el 1 de octubre de 2025, todos los días del 2 al 7 de octubre ya estaban reservados",
            url: "https://www.yicai.com/news/102851899.html",
            publisher: "Yicai",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Museo del Palacio: página oficial de visita y reserva de entradas",
            url: "https://www.dpm.org.cn/Visit.html",
            publisher: "Museo del Palacio",
            reviewedAt: "2026-10-19",
          },
        ],
      },
    ],
  },
};
