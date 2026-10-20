import type { SpanishGuide } from "../spanishGuideTypes";

export const visaChinaPeruanos: SpanishGuide = {
  slug: "visa-china-peruanos",
  title: "Visa China para peruanos 2026–2027: sin visa hasta el 31/12",
  headline: "Peruanos en China sin visa: 30 días hasta el 31 de diciembre de 2026, y sin el tránsito de 240 horas como plan B",
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
      label: "El viaje completo, dentro del plazo sin visa",
      note: "Pekín, Xi'an, Chengdu, Guilin y Shanghái en 14 días: la Ciudad Prohibida, la Gran Muralla, los Guerreros de Terracota, los pandas y el río Li. Incluye 13 noches en hoteles de nivel cuatro estrellas con desayuno, guía y vehículo solo para su grupo los días de visita, las entradas principales, el crucero por el río Li, dos trenes y dos vuelos internos. Aparte van los vuelos desde Perú, los almuerzos y las cenas. Con pasaporte peruano cabe en la entrada sin visa si entra en China a más tardar el 31 de diciembre; si el viaje cruza al año nuevo, lo confirmamos con la aerolínea antes del depósito. Si reserva el viaje y nos envía los pasaportes al menos 8 días antes de su visita a la Ciudad Prohibida y no conseguimos esa reserva o la de la plaza de Tiananmén, le devolvemos todo lo que haya pagado.",
      action: "Ver el itinerario y el precio",
    },
    {
      id: "classic-8-day",
      afterBlockId: "deadline-copy",
      kind: "tour",
      tourSlug: "beijing-xian-shanghai-8-day-private-tour",
      label: "Si tiene una semana",
      note: "Pekín, Xi'an y Shanghái en 8 días: la Ciudad Prohibida, la Gran Muralla en Mutianyu y los Guerreros de Terracota. Incluye siete noches en hoteles de nivel cuatro estrellas con desayuno, guía y vehículo solo para su grupo los días de visita, las entradas principales, el tren a Xi'an y el vuelo a Shanghái. Aparte van los vuelos desde Perú, los almuerzos y las cenas. Cabe en la entrada sin visa si entra en China a más tardar el 31 de diciembre; si el viaje cruza al año nuevo, lo confirmamos con la aerolínea antes del depósito. Con la misma devolución si nos envía los pasaportes al menos 8 días antes de la visita y no conseguimos la Ciudad Prohibida o la plaza de Tiananmén.",
      action: "Ver el itinerario y el precio",
    },
    {
      id: "peru-tickets",
      afterBlockId: "tickets-copy",
      kind: "attraction-reservation",
      title: "Sin entrada a su nombre, no se entra",
      body: "La Ciudad Prohibida no vende entradas para el mismo día: salen siete días antes, a las 20:00 de Pekín (las 07:00 en Perú), a nombre de cada visitante y con su pasaporte. En la Semana Dorada de 2025, el 1 de octubre ya estaban completos todos los días del 2 al 7, según Yicai. Díganos la fecha y nos ocupamos nosotros; la entrada se cobra al precio oficial, sin recargo.",
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
        text: "El tránsito sin visa de 240 horas es la alternativa de los argentinos, chilenos, brasileños y mexicanos para viajes cortos. La Administración Nacional de Inmigración lo aplica a 57 países y Perú no está entre ellos. Por eso, si la exención no se prorroga, un peruano no tendrá una opción intermedia en 2027: o pide la visa, o no viaja. Si su viaje es en enero o febrero —por ejemplo, para ver el hielo de Harbin en sus vacaciones de verano—, planifíquelo desde ya contando con la visa; si se anuncia la prórroga, se ahorrará ese trámite.",
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
      { id: "deadline-heading", type: "heading", level: 2, text: "Si quiere viajar sin visa, tiene que entrar en China antes de que termine el año" },
      {
        id: "deadline-copy",
        type: "paragraph",
        text: "Hasta el 31 de diciembre de 2026, un peruano puede volar a China, recorrerla de punta a punta en dos semanas y volver a Lima sin ningún trámite. Hay que entrar en China dentro del plazo publicado, a más tardar el 31 de diciembre, y los 30 días se cuentan desde el día siguiente a la entrada. Un viaje que empiece antes de fin de año puede incluir la Navidad y el Año Nuevo; en ese caso, antes de que pague el depósito lo confirmamos con la aerolínea. Para que valga nuestra devolución por la Ciudad Prohibida, envíenos los pasaportes al menos 8 días antes de la visita: si entra el 31 de diciembre y la visita es el 1 de enero, a más tardar el 24 de diciembre.",
      },
      {
        id: "tickets-copy",
        type: "paragraph",
        text: "Las entradas también tienen calendario. La Ciudad Prohibida no vende entradas para el mismo día: salen siete días antes, a las 20:00 de Pekín, que son las 07:00 en Lima, y cada una va a nombre de un visitante. Si su fecha se completa antes de que usted reserve, toca mover el resto del viaje o quedarse sin entrar. Por eso nuestra garantía pide encargarnos la reserva con al menos 8 días de antelación: antes de que se abra la venta de su fecha.",
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos en español por WhatsApp o por correo con sus fechas, el número de viajeros y el viaje que le interesa. Le respondemos en un plazo de 12 horas y, antes de que pague nada, recibe por escrito el presupuesto completo. Y el mismo planificador le atiende de principio a fin: desde esa primera respuesta hasta el último día del viaje. ¿Prefiere no depender del inglés? En todas las ciudades de la ruta podemos asignarle un guía de habla hispana, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto. Para reservar se paga un 30 % de depósito con Alipay o con VBill, que acepta tarjetas emitidas en Perú y en otros países de América Latina; el resto, al llegar. Somos una agencia de viajes con licencia en Pekín (L-BJ10587): los guías y los conductores son nuestros, y no le llevamos a tiendas.",
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
            answer: "Con Alipay o VBill, que acepta tarjetas emitidas en América Latina: un 30 % de depósito al reservar y el resto al llegar.",
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
            description: "Fechas, visa, traslados, coche con conductor e intérprete.",
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
            label: "Preguntas frecuentes sobre la exención de visado: plazo hasta el 31 de diciembre de 2026 y estancia de hasta 30 días naturales contada desde el día siguiente a la entrada (10 de noviembre de 2025)",
            url: "https://www.shanghai.gov.cn/nw17239/20251110/8bf34bf9718842f3ac32d6ea8fa5d9e5.html",
            publisher: "Gobierno municipal de Shanghái",
            reviewedAt: "2026-10-20",
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
