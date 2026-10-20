import type { SpanishGuide } from "../spanishGuideTypes";

export const zhangjiajieCuantosDias: SpanishGuide = {
  slug: "zhangjiajie-cuantos-dias",
  title: "Zhangjiajie: cuántos días, cómo llegar y mejor época",
  headline: "Zhangjiajie: cuántos días, cómo llegar desde Shanghái o Pekín, la mejor época y si ir a Fenghuang o a Furong",
  description:
    "Cuántos días dedicar a Zhangjiajie, cómo llegar desde Shanghái o Pekín en avión o tren, la mejor época, Tianmen desde octubre de 2026 y Fenghuang o Furong.",
  navTitle: "Zhangjiajie: cuántos días y cómo llegar",
  heroImage: {
    src: "/images/tours/beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour/hero.webp",
    width: 1600,
    height: 1000,
    alt: "Pilares de arenisca cubiertos de bosque en el Parque Forestal Nacional de Zhangjiajie",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [
    "zhangjiajie-4-day-private-tour",
    "zhangjiajie-forest-4-day-private-tour",
    "zhangjiajie-furong-fenghuang-7-day-private-tour",
    "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour",
    "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
  ],
  offers: [
    {
      id: "zhangjiajie-4-day",
      afterBlockId: "days-copy",
      kind: "tour",
      tourSlug: "zhangjiajie-4-day-private-tour",
      label: "Los cuatro días de esta guía, ya organizados",
      note: "Por su cuenta, Zhangjiajie es una cadena de piezas sueltas: la entrada del Parque Forestal con su puerta y su franja horaria, los autobuses y el ascensor dentro del parque, la ruta de Tianmen que esté a la venta ese día y el coche para ir de una zona a otra con el equipaje. En este viaje privado de 4 días todo eso llega resuelto en un solo presupuesto por escrito: el Parque Forestal el día 2 y el puente de cristal el día 3, con guía de habla inglesa y vehículo privado, y, si su hora de salida lo permite, la montaña Tianmen el día 4, de camino al aeropuerto o la estación (con vehículo privado y sin guía; si quiere guía ese día, se presupuesta aparte). No incluye el viaje hasta Zhangjiajie ni los almuerzos ni las cenas; sí incluye los traslados en vehículo privado y las entradas de adulto y el transporte interno del parque que figuren en la confirmación.",
      action: "Ver el itinerario y el precio",
    },
    {
      id: "zhangjiajie-furong-fenghuang-7-day",
      afterBlockId: "towns-copy",
      kind: "tour",
      tourSlug: "zhangjiajie-furong-fenghuang-7-day-private-tour",
      label: "Zhangjiajie, Furong y Fenghuang en 7 días",
      note: "Tres noches en Wulingyuan con dos días completos en el parque, una noche en Furong y dos en Fenghuang, siempre hacia el sur y sin volver atrás. Las maletas viajan con usted en el vehículo privado entre los tres lugares, y el último día le llevamos a la estación de Fenghuang Gucheng. Incluye seis noches de hotel (el desayuno se confirma por escrito antes de pagar), guía de habla inglesa los días 2 a 5, la entrada a Wulingyuan con los autobuses del parque, el trenecito de la Galería de las Diez Millas, la entrada nocturna a 72 Qilou y la entrada al pueblo de Furong; el día 6 es libre, sin guía ni vehículo.",
      action: "Ver el viaje de 7 días",
    },
    {
      id: "shanghai-zhangjiajie-13-day",
      afterBlockId: "shanghai-copy",
      kind: "tour",
      tourSlug: "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour",
      label: "Desde Shanghái: Zhangjiajie, Fenghuang y Guilin en 13 días",
      note: "Empieza y termina en Shanghái, con el vuelo a Zhangjiajie, el tren a Fenghuang y a Guilin y el vuelo de vuelta incluidos. Entradas del Parque Forestal, ascensor Bailong y Tianmen incluidas, y el crucero por el río Li.",
      action: "Ver el viaje de 13 días",
    },
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: "Para una primera visita, dedique a Zhangjiajie 4 días y 3 noches: un día de llegada, un día completo en el Parque Forestal Nacional (las montañas de Avatar), uno para el puente de cristal, y la salida, con la montaña Tianmen de camino si el horario lo permite. Con 7 días se añaden los pueblos de Furong y Fenghuang. Desde Shanghái o Pekín, lo más rápido es el avión, unas 2 horas y media hasta el aeropuerto de Zhangjiajie Hehua; en tren, desde Shanghái hay un tren directo de unas 9 horas y desde Pekín son de 10 a 12 horas con un cambio. Las mejores épocas son abril-mayo y septiembre-octubre, evitando los festivos chinos de principios de mayo y de principios de octubre.",
      },
      { id: "days-heading", type: "heading", level: 2, text: "¿Cuántos días en Zhangjiajie?" },
      {
        id: "days-table",
        type: "table",
        caption: "Qué cabe en Zhangjiajie según los días, contando el de llegada y el de salida",
        columns: ["Días", "Qué se ve", "Para quién"],
        rows: [
          ["3 días, 2 noches", "Solo el Parque Forestal, un día", "Si va muy justo de tiempo: se queda sin Tianmen"],
          ["4 días, 3 noches", "Parque Forestal + puente de cristal; Tianmen el día de salida si el horario lo permite", "La primera visita más habitual"],
          ["5 días, 4 noches", "Parque Forestal dos días, Tianmen y puente de cristal", "Si quiere caminar también por el fondo del valle"],
          ["7 días, 6 noches", "Parque Forestal dos días, Furong y Fenghuang", "Si quiere los pueblos antiguos del oeste de Hunan"],
        ],
      },
      {
        id: "days-copy",
        type: "paragraph",
        text: "Cuente solo los días completos de visita: una llegada por la tarde es un día de viaje, no de parque. Para el Parque Forestal conviene dormir en Wulingyuan, a unos 40 minutos en coche de la ciudad de Zhangjiajie, donde están el aeropuerto, la estación y la montaña Tianmen. Qué ver dentro del parque, ruta por ruta, lo explicamos en nuestra guía de las montañas de Avatar.",
        link: { label: "guía de las montañas de Avatar", href: "/es/guias/montanas-de-avatar-china/" },
      },
      { id: "tianmen-heading", type: "heading", level: 2, text: "La montaña Tianmen desde el 13 de octubre de 2026" },
      {
        id: "tianmen-copy",
        type: "paragraph",
        text: "Desde el 13 de octubre de 2026, Tianmen solo vende la ruta C: se entra por la puerta de la montaña, se sube en el teleférico rápido hasta la cueva de Tianmen, se continúa por las escaleras mecánicas que atraviesan la montaña hasta la cima y se baja por el mismo camino. El gran teleférico que sale del centro de la ciudad está cerrado por obras y no hay fecha publicada de reapertura. Si un itinerario que ya tiene cuenta con ese teleférico, hay que rehacerlo con la ruta C: escríbanos con sus fechas y le presupuestamos la ruta que esté a la venta ese día. Precios y detalles, en nuestra guía de entradas de la montaña Tianmen.",
        link: { label: "guía de entradas de la montaña Tianmen", href: "/es/guias/tianmen-mountain-tickets-and-routes/" },
      },
      { id: "arrive-heading", type: "heading", level: 2, text: "Cómo llegar a Zhangjiajie desde Shanghái, Pekín y otras ciudades" },
      {
        id: "arrive-table",
        type: "table",
        caption: "Tiempos aproximados de viaje hasta Zhangjiajie; los horarios cambian según la fecha",
        columns: ["Desde", "En avión", "En tren de alta velocidad"],
        rows: [
          ["Shanghái", "Unas 2 h 30 hasta Zhangjiajie Hehua (DYG)", "Tren directo Shanghái Hongqiao–Zhangjiajie Oeste, unas 9 horas"],
          ["Pekín", "Unas 2 h 30 hasta Zhangjiajie Hehua (DYG)", "De 10 a 12 horas, con un cambio de tren"],
          ["Xi’an", "Unas 1 h 30", "—"],
          ["Guilin", "—", "Tren directo de unas 7 horas"],
        ],
      },
      {
        id: "arrive-copy",
        type: "paragraph",
        text: "Dos trampas al reservar el tren: Zhangjiajie Oeste (张家界西), la estación de alta velocidad, no es la estación de Zhangjiajie (张家界站); y ninguna de las dos está junto al parque, así que después queda el trayecto por carretera hasta el hotel. Compruebe el nombre chino de la estación en su reserva antes de pedir el traslado.",
      },
      {
        id: "shanghai-copy",
        type: "paragraph",
        text: "Desde Shanghái compensa el avión: nueve horas de tren son un día entero. Desde Pekín, el tren no tiene sentido salvo que ya viaje hacia el sur. Si su viaje empieza y termina en Shanghái, hay una ruta que encaja Zhangjiajie, Fenghuang y Guilin sin volver sobre sus pasos.",
      },
      { id: "season-heading", type: "heading", level: 2, text: "La mejor época para ir a Zhangjiajie" },
      {
        id: "season-table",
        type: "table",
        caption: "Zhangjiajie por épocas",
        columns: ["Época", "Cómo es", "A tener en cuenta"],
        rows: [
          ["Abril y mayo", "Verde, temperaturas suaves", "Evite los festivos del 1 de mayo"],
          ["Junio a agosto", "Calor, chubascos, senderos resbaladizos", "Vacaciones escolares chinas: mucha gente"],
          ["Septiembre y octubre", "Buena época para caminar", "Evite la Semana Dorada del 1 al 7 de octubre"],
          ["Noviembre a marzo", "Frío, a veces nieve en los miradores, menos gente", "Hielo o niebla pueden cerrar rutas"],
        ],
      },
      {
        id: "season-urgency",
        type: "callout",
        tone: "warning",
        title: "Lo que pasó el 2 de mayo de 2025",
        body: "El 4 de mayo de 2025, el distrito de Wulingyuan pidió disculpas públicamente por las largas esperas del 2 de mayo en los ascensores, los teleféricos y los autobuses del Parque Forestal: esa noche hubo atascos entre la puerta sur y la ciudad, y hasta las 21:53 no terminaron de sacar a todos los visitantes. Un viajero que contó esos días en el medio chino 36Kr entró al parque hacia las 6 de la mañana sin esperar en la puerta, pero ese mismo día esperó unas 2 horas el ascensor Bailong y hora y media el teleférico de Tianzi; en Tianmen esperó unas 2 horas y media para entrar. Si su viaje cae en festivo, cuente con que los ascensores y los teleféricos pueden costarle horas de espera. Escríbanos con sus fechas y le proponemos cómo organizar el día antes de que reserve nada.",
      },
      {
        id: "season-copy",
        type: "paragraph",
        text: "Nadie puede saltarse las colas de un festivo. Lo que hacen nuestros guías es ordenar su día: a qué puerta llegar, qué zona hacer primero y cuándo bajar, según el tiempo y la gente de esa jornada.",
      },
      { id: "towns-heading", type: "heading", level: 2, text: "¿Fenghuang o Furong? Mejor los dos, en este orden" },
      {
        id: "towns-grid",
        type: "comparison",
        title: "Los dos pueblos antiguos del oeste de Hunan",
        columns: [
          {
            heading: "Furong",
            body: "El pueblo de la cascada, con casas sobre la roca.",
            items: [
              "Una noche basta para ver la cascada y el pueblo iluminado",
              "Queda de camino entre Zhangjiajie y Fenghuang",
              "La estación de tren está a unos 2,5 km de la zona visitable",
            ],
          },
          {
            heading: "Fenghuang",
            body: "La ciudad antigua junto al río Tuojiang.",
            items: [
              "Dos noches: un día con guía y otro a su ritmo",
              "Las calles y las orillas son públicas; los barcos se pagan aparte",
              "La estación de Fenghuang Gucheng está a unos 10 km del casco antiguo",
            ],
          },
        ],
      },
      {
        id: "towns-copy",
        type: "paragraph",
        text: "Si solo puede ir a uno, elija Fenghuang: tiene más que ver y merece dos noches. Si tiene 7 días, haga los dos en el orden Zhangjiajie, Furong y Fenghuang, que están en el mismo eje norte-sur: así no vuelve atrás y termina en la estación de Fenghuang Gucheng, a una hora de tren de Zhangjiajie Oeste y a unas seis horas de Guilin.",
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva con nosotros",
        body: "Escríbanos en español por WhatsApp o por correo con sus fechas, el número de viajeros y el viaje que le interesa. Le respondemos en un plazo de 12 horas, y antes de pagar recibe el presupuesto completo por escrito. El mismo planificador le atiende de principio a fin. Si prefiere hacer el viaje en español, hay guía de habla hispana en todas las ciudades de la ruta, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto; el guía habitual habla inglés. Para reservar un viaje se paga un 30 % de depósito con Alipay o con VBill, que acepta tarjetas bancarias de América Latina; el resto, al llegar. Somos una agencia de viajes con licencia en Pekín (L-BJ10587); los guías y los conductores son nuestros, y no hacemos paradas en tiendas.",
      },
      { id: "routes-heading", type: "heading", level: 2, text: "Nuestros viajes con Zhangjiajie" },
      {
        id: "routes-table",
        type: "table",
        caption: "Viajes privados con Zhangjiajie, de 4 a 14 días",
        columns: ["Viaje", "Zhangjiajie", "Además"],
        rows: [
          ["Zhangjiajie en 4 días", "Parque Forestal, puente de cristal y, si el horario lo permite, Tianmen", "—"],
          ["Bosques de Zhangjiajie en 4 días", "Parque Forestal y Tianmen; con mal tiempo, lago Baofeng", "Tres noches en una sola base en Wulingyuan"],
          ["Zhangjiajie, Furong y Fenghuang en 7 días", "Parque Forestal, dos días", "Furong y Fenghuang"],
          ["Shanghái, Zhangjiajie, Fenghuang y Guilin en 13 días", "Parque Forestal y Tianmen", "Fenghuang, Longji, río Li y Shanghái"],
          ["Pekín, Xi’an, Zhangjiajie, Guilin y Shanghái en 14 días", "Parque Forestal y Tianmen", "Pekín, Guerreros de Terracota, río Li y Shanghái"],
        ],
        rowLinks: [
          "/es/tours/zhangjiajie-4-day-private-tour/",
          "/es/tours/zhangjiajie-forest-4-day-private-tour/",
          "/es/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/",
          "/es/tours/shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour/",
          "/es/tours/beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour/",
        ],
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas sobre Zhangjiajie",
        items: [
          {
            question: "¿Cuántos días hacen falta en Zhangjiajie?",
            answer: "4 días y 3 noches para una primera visita: un día completo en el Parque Forestal, otro para el puente de cristal (y Tianmen el día de salida, si el horario lo permite), más la llegada y la salida. Con 7 días se añaden Furong y Fenghuang.",
          },
          {
            question: "¿Cómo se llega a Zhangjiajie desde Shanghái?",
            answer: "En avión, unas 2 horas y media hasta el aeropuerto de Zhangjiajie Hehua. También hay un tren directo de alta velocidad de Shanghái Hongqiao a Zhangjiajie Oeste de unas 9 horas.",
          },
          {
            question: "¿Cómo se llega a Zhangjiajie desde Pekín?",
            answer: "En avión, unas 2 horas y media. En tren son de 10 a 12 horas, con un cambio.",
          },
          {
            question: "¿Cuál es la mejor época para visitar Zhangjiajie?",
            answer: "Abril-mayo y septiembre-octubre, evitando los festivos chinos del 1 de mayo y del 1 al 7 de octubre. En invierno hay menos gente, pero el hielo o la niebla pueden cerrar rutas.",
          },
          {
            question: "¿Funciona el teleférico de Tianmen?",
            answer: "Desde el 13 de octubre de 2026 solo funciona la ruta C: el teleférico rápido desde la puerta de la montaña hasta la cueva de Tianmen y las escaleras mecánicas hasta la cima. El gran teleférico desde el centro de la ciudad está cerrado sin fecha de reapertura.",
          },
          {
            question: "¿Qué es mejor, Fenghuang o Furong?",
            answer: "Si solo va a uno, Fenghuang, con dos noches. Si tiene 7 días, los dos: primero Furong, una noche, y después Fenghuang, que quedan en ese orden hacia el sur desde Zhangjiajie.",
          },
          {
            question: "¿Se puede ir de Zhangjiajie a Fenghuang en tren?",
            answer: "Sí. El tren de Zhangjiajie Oeste a Fenghuang Gucheng tarda aproximadamente una hora; la estación está a unos 10 km del casco antiguo.",
          },
          {
            question: "¿Y si no hablo inglés?",
            answer: "Ponemos guía de habla hispana en Zhangjiajie y en cualquier otra ciudad de su viaje, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto. El guía del precio publicado habla inglés.",
          },
        ],
      },
      {
        id: "next-links",
        type: "internal-links",
        title: "Siga preparando Zhangjiajie",
        items: [
          {
            label: "Montañas de Avatar en China: dónde están y cómo verlas",
            href: "/es/guias/montanas-de-avatar-china/",
            description: "Las zonas del Parque Forestal, las entradas y la ruta de un día.",
          },
          {
            label: "Entradas a la montaña Tianmen",
            href: "/es/guias/tianmen-mountain-tickets-and-routes/",
            description: "La ruta C, los precios y el punto de inicio.",
          },
          {
            label: "Puente de cristal de Zhangjiajie",
            href: "/es/guias/puente-de-cristal-zhangjiajie/",
            description: "Dónde está, qué entrada comprar y cuánto tiempo dejar.",
          },
          {
            label: "Espectáculos nocturnos en Zhangjiajie",
            href: "/es/guias/espectaculos-nocturnos-zhangjiajie/",
            description: "Cuál ver según su hotel.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes",
        items: [
          {
            label: "El distrito de Wulingyuan pide disculpas por las largas esperas del 2 de mayo de 2025",
            url: "https://m.gmw.cn/2025-05/04/content_1304029265.htm",
            publisher: "Guangming Online, del Centro de Medios del distrito de Wulingyuan",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Crónica de un visitante en Zhangjiajie, 2 y 3 de mayo de 2025",
            url: "https://www.36kr.com/p/3280487039377538",
            publisher: "36Kr",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Montaña Tianmen: aviso a partir del 13 de octubre de 2026",
            url: "https://m.voc.com.cn/rmt/article/18128145.html",
            publisher: "Xinhunan (voc.com.cn)",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Estaciones de tren de Hunan y sus nombres oficiales",
            url: "https://www.enghunan.gov.cn/hneng/Services/Live/Transportation/RailwayStations/202607/t20260703_34019377.html",
            publisher: "Gobierno Popular de la Provincia de Hunan",
            reviewedAt: "2026-09-20",
          },
          {
            label: "Conexiones ferroviarias y distancia de la estación de Fenghuang al casco antiguo",
            url: "https://www.hunan.gov.cn/hnszf/hnyw/zwdt/202112/t20211206_21247807.html",
            publisher: "Gobierno Popular de la Provincia de Hunan",
            reviewedAt: "2026-09-20",
          },
          {
            label: "Horarios de tren Shanghái–Zhangjiajie",
            url: "https://trains.ctrip.com/trainbooking/shanghai-zhangjiajie",
            publisher: "Trip.com (Ctrip)",
            reviewedAt: "2026-10-19",
          },
        ],
      },
    ],
  },
};
