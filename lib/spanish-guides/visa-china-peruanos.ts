import type { SpanishGuide } from "../spanishGuideTypes";

export const visaChinaPeruanos: SpanishGuide = {
  slug: "visa-china-peruanos",
  title: "Visa China para peruanos 2026–2027: sin visa hasta el 31/12",
  headline: "Peruanos en China sin visa: 30 días hasta el 31 de diciembre de 2026, y sin tránsito de 240 horas como reserva",
  description:
    "Con pasaporte peruano se entra en China sin visa hasta 30 días, hasta el 31/12/2026. Perú no tiene el tránsito de 240 horas: sin prórroga, en 2027 vuelve la visa.",
  navTitle: "Visa China para peruanos",
  heroImage: {
    src: "/images/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/hero.webp",
    width: 1600,
    height: 1000,
    alt: "Torre de vigilancia de la Gran Muralla en las colinas al norte de Pekín",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [
    "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
    "beijing-xian-shanghai-8-day-private-tour",
    "beijing-highlights-5-day-private-tour",
  ],
  offers: [
    {
      id: "classic-14-day",
      afterBlockId: "deadline-copy",
      kind: "tour",
      tourSlug: "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
      label: "El viaje completo, antes de que vuelva la visa",
      note: "Pekín, Xi'an, Chengdu, Guilin y Shanghái en 14 días, con guía y vehículo privados en cada ciudad: la Ciudad Prohibida, la Gran Muralla, los Guerreros de Terracota, los pandas y el río Li. Con pasaporte peruano cabe en la entrada sin visa de 30 días si entra y sale de China antes del 31 de diciembre de 2026. Si confirma el viaje con al menos 8 días de antelación y no conseguimos la reserva de la Ciudad Prohibida o de la plaza de Tiananmén, le devolvemos todo lo que haya pagado.",
      action: "Ver el itinerario y el precio",
    },
    {
      id: "classic-8-day",
      afterBlockId: "deadline-copy",
      kind: "tour",
      tourSlug: "beijing-xian-shanghai-8-day-private-tour",
      label: "Si tiene una semana",
      note: "Pekín, Xi'an y Shanghái en 8 días: la Ciudad Prohibida, la Gran Muralla en Mutianyu y los Guerreros de Terracota, con el tren a Xi'an y el vuelo a Shanghái incluidos. Cabe con holgura en la entrada sin visa de 30 días. Con la misma devolución si, confirmado con 8 días de antelación, no conseguimos la Ciudad Prohibida o la plaza de Tiananmén.",
      action: "Ver el itinerario y el precio",
    },
    {
      id: "peru-tickets",
      afterBlockId: "tickets-copy",
      kind: "attraction-reservation",
      title: "La venta abre a las 7 de la mañana en Lima",
      body: "Las entradas de la Ciudad Prohibida salen siete días antes, a las 20:00 de Pekín: las 07:00 en Perú. No se venden para el mismo día y cada una lleva el nombre y el pasaporte de un visitante. Encárguenos las entradas con su fecha y nos ocupamos nosotros cuando se abra la venta.",
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
        text: "No hace falta visa hasta el 31 de diciembre de 2026. Con pasaporte peruano ordinario se entra en China continental sin visa y se puede estar hasta 30 días, por turismo, negocios, visitas a familiares o amigos, intercambios o tránsito, según el aviso del Departamento Consular de la Cancillería china del 3 de noviembre de 2025. La exención termina a las 24:00 del 31 de diciembre de 2026 y, a 19 de octubre de 2026, no hay prórroga anunciada. A diferencia de Argentina, Chile o México, Perú no está en la lista del tránsito sin visa de 240 horas: si no se prorroga la exención, para viajar a China en 2027 hará falta visa.",
      },
      {
        id: "glance-table",
        type: "table",
        caption: "Pasaporte peruano y China, comprobado el 19 de octubre de 2026",
        columns: ["Punto", "Hasta el 31/12/2026", "En 2027, si no hay prórroga"],
        rows: [
          ["¿Hace falta visa?", "No", "Sí"],
          ["Estancia máxima", "30 días por entrada", "La que conceda la visa"],
          ["Tránsito sin visa de 240 horas", "No aplica a Perú", "No aplica a Perú"],
          ["Para qué", "Turismo, negocios, familia, intercambios, tránsito", "Según el tipo de visa"],
          ["Trámite previo", "Ninguno", "Solicitud de visa ante la representación china"],
        ],
      },
      {
        id: "rules-list",
        type: "list",
        items: [
          "Pasaporte ordinario peruano, sin trámite previo.",
          "Hasta 30 días por estancia; para quedarse más tiempo hace falta visa.",
          "Trabajar, estudiar o hacer periodismo exige siempre la visa correspondiente.",
          "Al llegar se presenta la tarjeta de llegada y el control fronterizo decide la entrada.",
        ],
      },
      {
        id: "card-copy",
        type: "paragraph",
        text: "La tarjeta de llegada se puede llenar en línea antes de volar. Le explicamos cómo en nuestra guía de la tarjeta de llegada a China.",
        link: {
          label: "guía de la tarjeta de llegada a China",
          href: "/es/guias/tarjeta-de-llegada-china/",
        },
      },
      { id: "transit-heading", type: "heading", level: 2, text: "Por qué el 31 de diciembre pesa más para un peruano" },
      {
        id: "transit-copy",
        type: "paragraph",
        text: "El tránsito sin visa de 240 horas es la alternativa de los argentinos, chilenos, brasileños y mexicanos para viajes cortos. La Administración Nacional de Inmigración lo aplica a 57 países y Perú no está entre ellos. Por eso, si la exención no se prorroga, un peruano no tendrá una opción intermedia en 2027: o pide la visa, o no viaja. Si el viaje le cae en enero o febrero, por ejemplo para ver el hielo de Harbin en sus vacaciones, prepárelo ya pensando en la visa y simplifíquelo si se anuncia la prórroga.",
      },
      {
        id: "future-callout",
        type: "callout",
        tone: "warning",
        title: "No dé por hecha la prórroga",
        body: "Que la exención ya se haya ampliado antes no garantiza que vuelva a ocurrir, ni cuándo se anunciaría. Si alguien le asegura hoy que en 2027 seguirá sin visa, pregúntele por el aviso oficial: a 19 de octubre de 2026 no existe.",
      },
      {
        id: "more-copy",
        type: "paragraph",
        text: "En nuestra guía de China sin visado comparamos, país por país, quién entra sin visa, hasta cuándo y qué alternativa le queda a cada uno en 2027.",
        link: {
          label: "guía de China sin visado",
          href: "/es/guias/china-sin-visado-2026-2027/",
        },
      },
      { id: "deadline-heading", type: "heading", level: 2, text: "Si quiere viajar sin visa, el viaje tiene que caber antes del 31 de diciembre" },
      {
        id: "deadline-copy",
        type: "paragraph",
        text: "Hasta el 31 de diciembre de 2026, un peruano puede volar a China, recorrerla de punta a punta en dos semanas y volver a Lima sin ningún trámite. Un viaje que empiece después, sin prórroga, empieza por una solicitud de visa. Si piensa viajar en diciembre, aproveche que los días festivos de fin de año todavía caen dentro del plazo, y cierre antes las fechas, porque vuelos, hoteles y entradas se reservan a la vez.",
      },
      {
        id: "tickets-copy",
        type: "paragraph",
        text: "Las entradas también tienen calendario. La Ciudad Prohibida no vende entradas para el mismo día: salen siete días antes, a las 20:00 de Pekín, que son las 07:00 en Lima, y cada una va a nombre de un visitante. En la Semana Dorada de 2025, el 1 de octubre ya estaban completos todos los días del 2 al 7, según Yicai.",
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos en español por WhatsApp o por correo con sus fechas, el número de viajeros y el viaje que le interesa. Respondemos en un plazo de 12 horas con el presupuesto completo por escrito. Los guías hablan inglés y, si prefiere hacer el viaje en español, hay guía de habla hispana disponible en todas las ciudades de la ruta, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto. Para reservar se paga un 30 % de depósito con Alipay o con VBill, que acepta tarjetas peruanas y de toda América Latina; el resto, al llegar. Somos una agencia de viajes con licencia en Pekín (L-BJ10587). Los guías y los conductores son nuestros, y no hay paradas obligatorias en tiendas.",
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas de peruanos que viajan a China",
        items: [
          {
            question: "¿Los peruanos necesitan visa para China?",
            answer: "No hasta el 31 de diciembre de 2026: con pasaporte peruano ordinario se entra sin visa hasta 30 días, por turismo o negocios.",
          },
          {
            question: "¿Los peruanos podrán viajar a China sin visa en 2027?",
            answer: "No se sabe. A 19 de octubre de 2026 no hay prórroga anunciada; si no llega, hará falta visa, porque Perú no está en el tránsito sin visa de 240 horas.",
          },
          {
            question: "¿Cuántos días puede estar un peruano en China sin visa?",
            answer: "Hasta 30 días por entrada, mientras siga vigente la exención.",
          },
          {
            question: "¿Un peruano puede hacer escala en China sin visa?",
            answer: "Hasta el 31 de diciembre de 2026, sí, con la exención de 30 días, que también cubre el tránsito. El tránsito de 240 horas no aplica a Perú.",
          },
          {
            question: "¿A qué hora salen las entradas de la Ciudad Prohibida en Perú?",
            answer: "A las 07:00 de Lima, siete días antes de la visita: son las 20:00 en Pekín.",
          },
          {
            question: "¿Cómo se paga un viaje con Homeground China desde Perú?",
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
            description: "Todos los países y qué alternativa queda en 2027.",
          },
          {
            label: "Pekín en 5 días",
            href: "/es/tours/beijing-highlights-5-day-private-tour/",
            description: "La Ciudad Prohibida, la Gran Muralla y el Templo del Cielo, si tiene pocos días.",
          },
          {
            label: "Feria de Cantón",
            href: "/es/guias/feria-de-canton/",
            description: "Fechas, visado, traslados, coche con conductor e intérprete.",
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
        title: "Fuentes oficiales",
        items: [
          {
            label: "Aviso sobre la prórroga de la exención unilateral de visado hasta el 31 de diciembre de 2026, con Perú (3 de noviembre de 2025)",
            url: "https://bio.visaforchina.cn/BRN4_ZH/tongzhigonggao/552376593302032425.html",
            publisher: "Departamento Consular del Ministerio de Asuntos Exteriores de China",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Política de tránsito sin visa: los 57 países de la lista, sin Perú (20 de agosto de 2026)",
            url: "https://www.nia.gov.cn/n741440/n741577/c1731205/content.html",
            publisher: "Administración Nacional de Inmigración de China",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Visa-Free Transit Policies (en inglés)",
            url: "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
            publisher: "Administración Nacional de Inmigración de China",
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
