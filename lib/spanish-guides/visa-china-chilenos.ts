import type { SpanishGuide } from "../spanishGuideTypes";

export const visaChinaChilenos: SpanishGuide = {
  slug: "visa-china-chilenos",
  title: "Visa China para chilenos 2026–2027: hasta cuándo sin visa",
  headline: "Chilenos en China sin visa: 30 días hasta el 31 de diciembre de 2026, y qué hacer en 2027",
  description:
    "Con pasaporte chileno se entra en China sin visa hasta 30 días, por turismo o negocios, hasta el 31/12/2026. Qué pasa en 2027 y cuándo sirve el tránsito de 240 horas.",
  navTitle: "Visa China para chilenos",
  heroImage: {
    src: "/images/tours/beijing-xian-guilin-shanghai-10-day-private-tour/hero.webp",
    width: 1600,
    height: 1000,
    alt: "Niebla matinal sobre el río Li entre picos kársticos",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [
    "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
    "beijing-xian-guilin-shanghai-10-day-private-tour",
    "guangzhou-shunde-foshan-5-day-private-tour",
  ],
  offers: [
    {
      id: "zhangjiajie-14-day",
      afterBlockId: "deadline-copy",
      kind: "tour",
      tourSlug: "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
      label: "Los 14 días completos, sin visa",
      note: "Pekín, Xi'an, Zhangjiajie, Guilin y Shanghái: la Ciudad Prohibida, la Gran Muralla, los Guerreros de Terracota, los pilares de piedra de Zhangjiajie y el río Li, con guía y vehículo privados en cada ciudad. Con pasaporte chileno cabe en la entrada sin visa de 30 días si entra y sale de China antes del 31 de diciembre de 2026; con el tránsito de 240 horas ya no cabe. Si confirma el viaje con al menos 8 días de antelación y no conseguimos la reserva de la Ciudad Prohibida o de la plaza de Tiananmén, le devolvemos todo lo que haya pagado.",
      action: "Ver el itinerario y el precio",
    },
    {
      id: "transit-10-day",
      afterBlockId: "deadline-copy",
      kind: "tour",
      tourSlug: "beijing-xian-guilin-shanghai-10-day-private-tour",
      label: "Si viaja en 2027: 10 días que caben en el tránsito",
      note: "Pekín, Xi'an, Guilin y Shanghái en 10 días. Todas las ciudades están en las zonas permitidas, así que el viaje cabe en las 240 horas si sale de China hacia un tercer país o región con el boleto confirmado. Si lo confirma con al menos 8 días de antelación y no conseguimos la reserva de la Ciudad Prohibida o de la plaza de Tiananmén, le devolvemos todo lo que haya pagado.",
      action: "Ver el itinerario y el precio",
    },
    {
      id: "chile-tickets",
      afterBlockId: "tickets-copy",
      kind: "attraction-reservation",
      title: "Las entradas se abren a las 9 de la mañana en Santiago",
      body: "Las entradas de la Ciudad Prohibida salen siete días antes, a las 20:00 de Pekín: las 09:00 en Santiago con el horario de verano chileno y las 08:00 en invierno. Cada una lleva el nombre y el pasaporte de un visitante. Encárguenos las entradas con su fecha y nos ocupamos nosotros cuando se abra la venta.",
      attractionIds: ["forbidden-city", "tiananmen-square", "great-wall-mutianyu", "terracotta-warriors", "li-river-cruise"],
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
        text: "No hace falta visa hasta el 31 de diciembre de 2026. Con pasaporte chileno ordinario se entra en China continental sin visa y se puede estar hasta 30 días, por turismo, negocios, visitas a familiares o amigos, intercambios o tránsito. Así lo establece el aviso del Departamento Consular de la Cancillería china del 3 de noviembre de 2025, que fija el final en las 24:00 del 31 de diciembre de 2026. A 19 de octubre de 2026 no hay prórroga anunciada para 2027. Chile, además, está entre los seis países de América que pueden usar el tránsito sin visa de 240 horas.",
      },
      {
        id: "glance-table",
        type: "table",
        caption: "Pasaporte chileno y China, comprobado el 19 de octubre de 2026",
        columns: ["Punto", "Hasta el 31/12/2026", "En 2027, si no hay prórroga"],
        rows: [
          ["¿Hace falta visa?", "No", "Sí, salvo con el tránsito de 240 horas"],
          ["Estancia máxima", "30 días por entrada", "240 horas con el tránsito; con visa, la que conceda"],
          ["Ida y vuelta Chile–China", "Sí", "Solo con visa"],
          ["Viaje de negocios, ferias y visitas a proveedores", "Sí", "Con visa o con el tránsito de 240 horas"],
          ["Dónde se puede estar", "Toda China continental", "Con el tránsito, solo en las zonas permitidas"],
        ],
      },
      {
        id: "rules-list",
        type: "list",
        items: [
          "Pasaporte ordinario chileno, sin trámite previo.",
          "Hasta 30 días por estancia; para más tiempo, visa.",
          "Trabajar, estudiar o hacer periodismo exige siempre la visa correspondiente.",
          "Al llegar se presenta la tarjeta de llegada, que se puede llenar en línea antes de volar, y el control fronterizo decide la entrada.",
        ],
      },
      { id: "business-heading", type: "heading", level: 2, text: "Negocios: la exención también cubre ferias y proveedores" },
      {
        id: "business-copy",
        type: "paragraph",
        text: "La entrada sin visa incluye los viajes de negocios, así que un importador chileno puede ir a la fase 3 de la 140.ª Feria de Cantón, del 31 de octubre al 4 de noviembre de 2026, y quedarse a visitar fábricas sin pedir visa. Para la edición de primavera de 2027, que todavía no tiene fechas oficiales, la exención publicada ya no llega: hará falta visa o el tránsito de 240 horas, y Guangzhou-Baiyun es uno de los puertos habilitados. Lo contamos en nuestra guía de la Feria de Cantón.",
        link: {
          label: "guía de la Feria de Cantón",
          href: "/es/guias/feria-de-canton/",
        },
      },
      { id: "transit-heading", type: "heading", level: 2, text: "En 2027 sin prórroga: el tránsito de 240 horas" },
      {
        id: "transit-copy",
        type: "paragraph",
        text: "Con pasaporte chileno se puede entrar sin visa hasta 240 horas si sale de China hacia un tercer país o región distinto de aquel desde el que llegó, con el boleto confirmado. Hay que entrar por uno de los 65 puertos habilitados, entre ellos los aeropuertos de Pekín, Shanghái y Guangzhou, y quedarse en las zonas permitidas, en las que se puede pasar de una provincia a otra. Las 240 horas se cuentan desde las 00:00 del día siguiente a la entrada. Es decir: Santiago–Shanghái–Tokio sirve; Santiago–Shanghái–Santiago, no. Las condiciones completas están en nuestra guía de China sin visado.",
        link: {
          label: "guía de China sin visado",
          href: "/es/guias/china-sin-visado-2026-2027/",
        },
      },
      {
        id: "plan-table",
        type: "table",
        caption: "Qué viaje cabe con cada opción",
        columns: ["Viaje", "Sin visa, hasta el 31/12/2026", "Tránsito de 240 h"],
        rows: [
          ["Ida y vuelta Chile–China, 14 días", "Sí", "No: dura más de 10 días y vuelve a Chile"],
          ["Pekín, Xi'an, Guilin y Shanghái, 10 días, saliendo a Japón o Corea", "Sí", "Sí"],
          ["Feria de Cantón y fábricas en Guangdong, saliendo a Hong Kong", "Sí", "Sí, si dura 10 días o menos"],
        ],
      },
      { id: "deadline-heading", type: "heading", level: 2, text: "Por qué conviene cerrar ahora un viaje para diciembre" },
      {
        id: "deadline-copy",
        type: "paragraph",
        text: "Hasta el 31 de diciembre, el viaje largo, ida y vuelta desde Santiago, no exige ningún trámite. Un viaje que empiece en 2027, si no hay prórroga, tendrá que esperar a una visa o recortarse a 10 días con salida a un tercer país. Si sus vacaciones empiezan en diciembre, el plazo que le queda es el de las fiestas de fin de año, y en esas fechas se reservan a la vez vuelos, hoteles y entradas.",
      },
      {
        id: "tickets-copy",
        type: "paragraph",
        text: "Además, en China hay entradas que se reservan con nombre y pasaporte y que no se venden en taquilla el mismo día. La Ciudad Prohibida abre la venta siete días antes a las 20:00 de Pekín, a las 09:00 en Santiago con el horario de verano chileno. En la Semana Dorada de 2025, el 1 de octubre ya estaban completos todos los días del 2 al 7, según Yicai.",
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos en español por WhatsApp o por correo con sus fechas, el número de viajeros y el viaje que le interesa. Respondemos en un plazo de 12 horas con el presupuesto completo por escrito y le decimos si el programa cabe en la exención de 30 días o en el tránsito de 240 horas. Los guías hablan inglés y, si prefiere hacer el viaje en español, hay guía de habla hispana disponible en todas las ciudades de la ruta, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto. Para reservar se paga un 30 % de depósito con Alipay o con VBill, que acepta tarjetas chilenas y de toda América Latina; el resto, al llegar. Somos una agencia de viajes con licencia en Pekín (L-BJ10587). Los guías y los conductores son nuestros, y no hay paradas obligatorias en tiendas.",
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas de chilenos que viajan a China",
        items: [
          {
            question: "¿Los chilenos necesitan visa para China?",
            answer: "No hasta el 31 de diciembre de 2026: con pasaporte chileno ordinario se entra sin visa hasta 30 días, por turismo o negocios.",
          },
          {
            question: "¿Qué pasa en 2027?",
            answer: "A 19 de octubre de 2026 no hay prórroga anunciada. Sin prórroga, hará falta visa, salvo con el tránsito de 240 horas, que exige salir de China hacia un tercer país o región.",
          },
          {
            question: "¿Puedo ir a la Feria de Cantón sin visa con pasaporte chileno?",
            answer: "Sí, a la fase 3 de la 140.ª edición, del 31 de octubre al 4 de noviembre de 2026: la exención cubre los viajes de negocios. Para la primavera de 2027, sin prórroga, necesitará visa o el tránsito de 240 horas.",
          },
          {
            question: "¿A qué hora salen las entradas de la Ciudad Prohibida en Chile?",
            answer: "Siete días antes de la visita, a las 09:00 en Santiago con el horario de verano chileno y a las 08:00 en invierno: son las 20:00 en Pekín.",
          },
          {
            question: "¿Cómo se paga un viaje con Homeground China desde Chile?",
            answer: "Con Alipay o VBill, que acepta tarjetas de América Latina: un 30 % de depósito al reservar y el resto al llegar.",
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
            description: "Todos los países y las condiciones del tránsito de 240 horas.",
          },
          {
            label: "Feria de Cantón",
            href: "/es/guias/feria-de-canton/",
            description: "Fechas, visado, traslados, coche con conductor e intérprete.",
          },
          {
            label: "Guangzhou, Shunde y Foshan en 5 días",
            href: "/es/tours/guangzhou-shunde-foshan-5-day-private-tour/",
            description: "Para quedarse unos días después de la feria.",
          },
          {
            label: "Cómo pagar en China",
            href: "/es/guias/como-pagar-en-china/",
            description: "Alipay, WeChat Pay, tarjetas y efectivo desde el primer día.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes",
        items: [
          {
            label: "Aviso sobre la prórroga de la exención unilateral de visado hasta el 31 de diciembre de 2026, con Chile (3 de noviembre de 2025)",
            url: "https://bio.visaforchina.cn/BRN4_ZH/tongzhigonggao/552376593302032425.html",
            publisher: "Departamento Consular del Ministerio de Asuntos Exteriores de China",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Política de tránsito sin visa: 57 países, Chile incluido, y 65 puertos (20 de agosto de 2026)",
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
            label: "Fechas de las tres fases de la 140.ª Feria de Cantón (24 de julio de 2026)",
            url: "https://www.mofcom.gov.cn/zwjg/jmxw/md/art/2026/art_784ba2c67efa4c66b430a26ad084ade8.html",
            publisher: "Oficina Económica y Comercial de la Embajada de China en el Perú",
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
