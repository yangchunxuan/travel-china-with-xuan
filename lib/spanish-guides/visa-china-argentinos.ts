import type { SpanishGuide } from "../spanishGuideTypes";

export const visaChinaArgentinos: SpanishGuide = {
  slug: "visa-china-argentinos",
  title: "Visa China para argentinos 2026–2027: hasta cuándo sin visa",
  headline: "Argentinos en China sin visa: 30 días hasta el 31 de diciembre de 2026, y el plan para 2027",
  description:
    "Con pasaporte argentino se entra en China sin visa hasta 30 días, hasta el 31/12/2026. Qué cubre, qué pasa en 2027, el vuelo por Auckland y el tránsito de 240 horas.",
  navTitle: "Visa China para argentinos",
  heroImage: {
    src: "/images/tours/harbin-winter-5-day-private-tour/hero-ice-world-1600.webp",
    width: 1600,
    height: 1000,
    alt: "Tren de hielo de colores y edificios iluminados en Ice and Snow World de Harbin en 2026",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [
    "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
    "harbin-winter-5-day-private-tour",
    "beijing-xian-guilin-shanghai-10-day-private-tour",
  ],
  offers: [
    {
      id: "classic-14-day",
      afterBlockId: "deadline-copy",
      kind: "tour",
      tourSlug: "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
      label: "Ida y vuelta desde Buenos Aires, sin visa",
      note: "Pekín, Xi'an, Chengdu, Guilin y Shanghái en 14 días, con guía y vehículo privados en cada ciudad: la Ciudad Prohibida, la Gran Muralla, los Guerreros de Terracota, los pandas y el río Li. Con pasaporte argentino cabe en la entrada sin visa de 30 días si entra y sale de China antes del 31 de diciembre de 2026. Si confirma el viaje con al menos 8 días de antelación y no conseguimos la reserva de la Ciudad Prohibida o de la plaza de Tiananmén, le devolvemos todo lo que haya pagado.",
      action: "Ver el itinerario y el precio",
    },
    {
      id: "harbin-winter",
      afterBlockId: "harbin-copy",
      kind: "tour",
      tourSlug: "harbin-winter-5-day-private-tour",
      label: "Harbin en sus vacaciones de verano",
      note: "Cinco días con base en Harbin: la Calle Central, el río Songhua helado, las esculturas de nieve de la Isla del Sol e Ice and Snow World, con guía en inglés, vehículo con calefacción y recogida en el aeropuerto. Todo el programa transcurre en Harbin, así que encaja en el tránsito de 240 horas si llega a China desde un país y sale hacia otro.",
      action: "Ver el viaje y el precio",
    },
    {
      id: "argentina-tickets",
      afterBlockId: "tickets-copy",
      kind: "attraction-reservation",
      title: "La venta abre a las 9 de la mañana en Buenos Aires",
      body: "Las entradas de la Ciudad Prohibida salen siete días antes, a las 20:00 de Pekín: las 09:00 en Argentina. No se venden para el mismo día y cada una lleva el nombre y el pasaporte de un visitante. Encárguenos las entradas con su fecha y nos ocupamos nosotros cuando se abra la venta.",
      attractionIds: ["forbidden-city", "tiananmen-square", "great-wall-mutianyu", "terracotta-warriors", "chengdu-panda-base"],
      preselect: "forbidden-city",
      action: "Reservar las entradas",
    },
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: "No hace falta visa hasta el 31 de diciembre de 2026. Con pasaporte argentino ordinario se entra en China continental sin visa y se puede estar hasta 30 días, por turismo, negocios, visitas a familiares o amigos, intercambios o tránsito. Lo fija el aviso del Departamento Consular de la Cancillería china del 3 de noviembre de 2025, que lleva la exención hasta las 24:00 del 31 de diciembre de 2026. Para 2027 no hay prórroga anunciada a 19 de octubre de 2026. Si no llega, a los argentinos les queda una salida que no tienen peruanos ni uruguayos: el tránsito sin visa de 240 horas.",
      },
      {
        id: "glance-table",
        type: "table",
        caption: "Pasaporte argentino y China, comprobado el 19 de octubre de 2026",
        columns: ["Punto", "Hasta el 31/12/2026", "En 2027, si no hay prórroga"],
        rows: [
          ["¿Hace falta visa?", "No", "Sí, salvo con el tránsito de 240 horas"],
          ["Estancia máxima", "30 días por entrada", "240 horas con el tránsito; con visa, la que conceda"],
          ["Ida y vuelta Argentina–China", "Sí", "Solo con visa"],
          ["Para qué", "Turismo, negocios, familia, intercambios, tránsito", "Igual; trabajar o estudiar siempre exige visa"],
          ["Dónde se puede estar", "Toda China continental", "Con el tránsito, solo en las zonas permitidas"],
        ],
      },
      {
        id: "rules-list",
        type: "list",
        items: [
          "Pasaporte ordinario argentino. No hace falta ningún trámite antes de volar.",
          "Cada estancia puede durar hasta 30 días; para quedarse más tiempo hace falta visa.",
          "Trabajar, estudiar o hacer periodismo exige siempre la visa correspondiente.",
          "Al llegar se presenta la tarjeta de llegada y el control fronterizo decide la entrada.",
        ],
      },
      { id: "flight-heading", type: "heading", level: 2, text: "Cómo se llega desde Buenos Aires" },
      {
        id: "flight-copy",
        type: "paragraph",
        text: "Desde el 4 de diciembre de 2025, China Eastern une Shanghái y Buenos Aires sin cambiar de avión, con una escala en Auckland: dos vuelos por semana en cada sentido, el MU745 hacia Buenos Aires y el MU746 hacia Shanghái, en unas 25 horas. En mayo de 2026 la ruta seguía operando con una ocupación media superior al 80 %, según la prensa económica china. El aeropuerto de llegada, Shanghái-Pudong, es además uno de los puertos habilitados para el tránsito de 240 horas. Compruebe días, horarios y precios con la aerolínea: cambian según la temporada.",
      },
      { id: "transit-heading", type: "heading", level: 2, text: "En 2027 sin prórroga: el tránsito de 240 horas" },
      {
        id: "transit-copy",
        type: "paragraph",
        text: "Argentina está entre los 57 países del tránsito sin visa de 240 horas. Funciona si sale de China hacia un tercer país o región distinto de aquel desde el que llegó, con el boleto confirmado, entra por uno de los 65 puertos habilitados y se queda dentro de las zonas permitidas, en las que puede pasar de una provincia a otra. Las 240 horas se cuentan desde las 00:00 del día siguiente a la entrada. Dos consecuencias prácticas: un viaje de ida y vuelta entre Argentina y China no vale, y un circuito de 14 días no cabe en 10. Todas las condiciones están en nuestra guía de China sin visado.",
        link: {
          label: "guía de China sin visado",
          href: "/es/guias/china-sin-visado-2026-2027/",
        },
      },
      {
        id: "route-table",
        type: "table",
        caption: "Rutas desde Argentina con el tránsito de 240 horas",
        columns: ["Ruta", "¿Sirve?", "Por qué"],
        rows: [
          ["Buenos Aires → Shanghái → Tokio", "Sí", "Llega desde Argentina y sale hacia Japón"],
          ["Buenos Aires → Shanghái → Pekín → Seúl", "Sí", "Puede moverse entre zonas permitidas y salir por otra ciudad"],
          ["Buenos Aires → Shanghái → Hong Kong", "Sí", "Hong Kong cuenta como región de destino"],
          ["Buenos Aires → Shanghái → Buenos Aires", "No", "Vuelve al país de origen: hace falta visa"],
        ],
      },
      { id: "harbin-heading", type: "heading", level: 2, text: "Harbin en enero: el verano argentino coincide con el hielo" },
      {
        id: "harbin-copy",
        type: "paragraph",
        text: "Las vacaciones de verano en Argentina coinciden con la temporada de hielo y nieve de Harbin. Nuestro viaje de Harbin tiene precio publicado para llegadas de domingo a jueves entre el 6 de enero y el 5 de febrero de 2027, es decir, después de la fecha publicada de la exención. Con pasaporte argentino se puede hacer hoy con el tránsito de 240 horas: el aeropuerto de Harbin-Taiping es el puerto habilitado de Heilongjiang y los cinco días transcurren en la ciudad. Si se anuncia una prórroga, todavía más sencillo.",
      },
      { id: "deadline-heading", type: "heading", level: 2, text: "El viaje largo, mejor antes del 31 de diciembre" },
      {
        id: "deadline-copy",
        type: "paragraph",
        text: "Hasta el 31 de diciembre, un argentino puede hacer el viaje completo —14 días, ida y vuelta desde Buenos Aires— sin ningún trámite. Un viaje que empiece en 2027, si no hay prórroga, exigirá visa o tendrá que recortarse a 10 días con salida a un tercer país. Las fiestas de fin de año caen dentro del plazo, y es ahí cuando se juntan las fechas de vuelos, hoteles y entradas.",
      },
      {
        id: "tickets-copy",
        type: "paragraph",
        text: "El visado no es la única fecha que cuenta. La Ciudad Prohibida no vende entradas para el mismo día: salen siete días antes, a las 20:00 de Pekín, que son las 09:00 en Buenos Aires, y cada una va a nombre de un visitante. En la Semana Dorada de 2025, el 1 de octubre ya estaban completos todos los días del 2 al 7, según Yicai.",
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos en español por WhatsApp o por correo con sus fechas, el número de viajeros y el viaje que le interesa. Respondemos en un plazo de 12 horas con el presupuesto completo por escrito y le decimos si el programa cabe en la exención de 30 días o en el tránsito de 240 horas. Los guías hablan inglés y, si prefiere hacer el viaje en español, hay guía de habla hispana disponible en todas las ciudades de la ruta, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto. Para reservar se paga un 30 % de depósito con Alipay o con VBill, que acepta tarjetas argentinas y de toda América Latina; el resto, al llegar. Somos una agencia de viajes con licencia en Pekín (L-BJ10587). Los guías y los conductores son nuestros, y no hay paradas obligatorias en tiendas.",
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas de argentinos que viajan a China",
        items: [
          {
            question: "¿Los argentinos necesitan visa para viajar a China en 2026?",
            answer: "No. Con pasaporte argentino ordinario se entra sin visa hasta 30 días, por turismo o negocios, hasta las 24:00 del 31 de diciembre de 2026.",
          },
          {
            question: "¿Y en 2027?",
            answer: "A 19 de octubre de 2026 no hay prórroga anunciada. Si no llega, hará falta visa, salvo que use el tránsito de 240 horas saliendo de China hacia un tercer país o región.",
          },
          {
            question: "¿Cuántos días puede estar un argentino en China sin visa?",
            answer: "Hasta 30 días por entrada con la exención vigente; hasta 240 horas con el tránsito, contadas desde las 00:00 del día siguiente a la entrada.",
          },
          {
            question: "¿Hay vuelo directo de Buenos Aires a China?",
            answer: "China Eastern vuela Buenos Aires–Shanghái sin cambiar de avión, con escala en Auckland, dos veces por semana en cada sentido, desde el 4 de diciembre de 2025.",
          },
          {
            question: "¿A qué hora salen las entradas de la Ciudad Prohibida en Argentina?",
            answer: "A las 09:00 de Argentina, siete días antes de la visita: son las 20:00 en Pekín.",
          },
          {
            question: "¿Cómo se paga un viaje con Homeground China desde Argentina?",
            answer: "Con Alipay o VBill, que acepta tarjetas de América Latina: un 30 % de depósito al reservar y el resto al llegar. Antes de pagar recibe el presupuesto completo por escrito.",
          },
        ],
      },
      {
        id: "next-links",
        type: "internal-links",
        title: "Siga preparando el viaje",
        items: [
          {
            label: "China sin visado 2026–2027",
            href: "/es/guias/china-sin-visado-2026-2027/",
            description: "Todos los países, las condiciones del tránsito de 240 horas y qué pasa en 2027.",
          },
          {
            label: "Harbin en invierno, 5 días",
            href: "/es/tours/harbin-winter-5-day-private-tour/",
            description: "Hielo y nieve en enero y febrero de 2027, con precio publicado.",
          },
          {
            label: "Cómo pagar en China",
            href: "/es/guias/como-pagar-en-china/",
            description: "Alipay, WeChat Pay, tarjetas y efectivo desde el primer día.",
          },
          {
            label: "Tarjeta de llegada a China",
            href: "/es/guias/tarjeta-de-llegada-china/",
            description: "Cómo llenarla en línea antes de volar.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes",
        items: [
          {
            label: "Aviso sobre la prórroga de la exención unilateral de visado hasta el 31 de diciembre de 2026, con Argentina (3 de noviembre de 2025)",
            url: "https://bio.visaforchina.cn/BRN4_ZH/tongzhigonggao/552376593302032425.html",
            publisher: "Departamento Consular del Ministerio de Asuntos Exteriores de China",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Política de tránsito sin visa: 57 países, Argentina incluida, y 65 puertos (20 de agosto de 2026)",
            url: "https://www.nia.gov.cn/n741440/n741577/c1731205/content.html",
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
            label: "Primer vuelo MU745 Shanghái–Auckland–Buenos Aires: frecuencias y escala (4 de diciembre de 2025)",
            url: "https://finance.eastmoney.com/a/202512043582429289.html",
            publisher: "Shanghai Securities News",
            reviewedAt: "2026-10-19",
          },
          {
            label: "La ruta Shanghái–Auckland–Buenos Aires supera el 80 % de ocupación media (22 de mayo de 2026)",
            url: "https://finance.eastmoney.com/a/202605223746706471.html",
            publisher: "Eastmoney",
            reviewedAt: "2026-10-19",
          },
          {
            label: "El aeropuerto de Harbin-Taiping, único puerto de Heilongjiang con tránsito de 240 horas (9 de febrero de 2026)",
            url: "https://www.yzwb.net/news/yw/202602/t20260209_320361.html",
            publisher: "China News Service",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Museo del Palacio: el 1 de octubre de 2025, todos los días del 2 al 7 de octubre ya estaban reservados",
            url: "https://www.yicai.com/news/102851899.html",
            publisher: "Yicai",
            reviewedAt: "2026-10-19",
          },
        ],
      },
    ],
  },
};
