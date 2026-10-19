import type { SpanishGuide } from "../spanishGuideTypes";

export const visaChinaColombianos: SpanishGuide = {
  slug: "visa-china-colombianos",
  title: "Visa China para colombianos 2026: requisitos, costo y tiempos",
  headline: "Visa china para colombianos: cómo se pide en Bogotá, cuánto tarda y cuánto cuesta",
  description:
    "Con pasaporte colombiano hace falta visa para China: no aplica la exención de 30 días ni el tránsito de 240 horas. Trámite en Bogotá, plazos, tarifas y qué viaje elegir.",
  navTitle: "Visa China para colombianos",
  heroImage: {
    src: "/images/tours/shanghai-suzhou-5-day-private-tour/hero-shanghai-clocktower-1600.webp",
    width: 1600,
    height: 1000,
    alt: "Reloj del Bund y rascacielos de Lujiazui al anochecer",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [
    "beijing-xian-guilin-hong-kong-10-day-private-tour",
    "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
  ],
  offers: [
    {
      id: "hong-kong-10-day",
      afterBlockId: "plan-copy",
      kind: "tour",
      tourSlug: "beijing-xian-guilin-hong-kong-10-day-private-tour",
      label: "Una sola entrada en China, salida por Hong Kong",
      note: "Pekín, Xi'an y Guilin, y el último tramo en tren de alta velocidad hasta Hong Kong, donde los colombianos no necesitan visa para estancias de hasta 90 días. Entra una sola vez en China continental, así que le basta la visa de una entrada, la más barata. Incluye nueve noches en hoteles de nivel cuatro estrellas con desayuno, la última en Hong Kong, guías locales y vehículos privados los días de visita en China continental, el crucero por el río Li, los trenes y el vuelo interno; aparte van los vuelos desde Colombia, los almuerzos y las cenas. Si confirma el viaje con al menos 8 días de antelación y no conseguimos la reserva de la Ciudad Prohibida o de la plaza de Tiananmén, le devolvemos todo lo que haya pagado.",
      action: "Ver el itinerario y el precio",
    },
    {
      id: "classic-14-day",
      afterBlockId: "plan-copy",
      kind: "tour",
      tourSlug: "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
      label: "Si tiene dos semanas",
      note: "Pekín, Xi'an, Chengdu, Guilin y Shanghái en 14 días: la Ciudad Prohibida, la Gran Muralla, los Guerreros de Terracota, los pandas y el río Li. Incluye 13 noches en hoteles de nivel cuatro estrellas con desayuno, guía y vehículo solo para su grupo los días de visita, las entradas principales, el crucero por el río Li, dos trenes y dos vuelos internos; aparte van los vuelos desde Colombia, los almuerzos y las cenas. Una sola entrada en China continental, de Pekín a Shanghái. Con la misma devolución si, confirmado con 8 días de antelación, no conseguimos la Ciudad Prohibida o la plaza de Tiananmén.",
      action: "Ver el itinerario y el precio",
    },
    {
      id: "colombia-tickets",
      afterBlockId: "tickets-copy",
      kind: "attraction-reservation",
      title: "Sin entrada a su nombre, no se entra",
      body: "La Ciudad Prohibida no vende entradas para el mismo día: salen siete días antes, a las 20:00 de Pekín (las 07:00 en Colombia), a nombre de cada visitante y con el número del pasaporte que lleva su visa. En la Semana Dorada de 2025, el 1 de octubre ya estaban completos todos los días del 2 al 7, según Yicai. Díganos la fecha y nos ocupamos nosotros; la entrada se cobra al precio oficial, sin recargo.",
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
        text: "Sí. Con pasaporte colombiano hace falta visa para entrar en China continental: Colombia no está en la exención de 30 días de Argentina, Chile, Perú o Uruguay, ni en el tránsito sin visa de 240 horas. La visa de turista (tipo L) se pide en la Embajada de China en Bogotá: primero en línea y después entregando el pasaporte en la sección consular. La embajada pide presentar la solicitud al menos 3 semanas antes del viaje y menos de 90 días antes, y el trámite normal tarda 5 días hábiles desde la entrega del pasaporte. Son los datos de la guía de visas de la embajada (versión de octubre de 2025), consultada el 19 de octubre de 2026.",
      },
      {
        id: "steps-table",
        type: "table",
        caption: "La visa china en Bogotá, paso a paso",
        columns: ["Paso", "Qué hacer", "Detalle"],
        rows: [
          ["1. Revisión preliminar en línea", "Crear una cuenta en consular.mfa.gov.cn/VISA, llenar el formulario y subir la foto, la copia del pasaporte en JPG y los documentos de apoyo", "Desde el 30 de septiembre de 2025 ya no se usa el formulario COVA en papel"],
          ["2. Esperar la aprobación previa", "Cuando el estado cambie a «Pasaporte pendiente de ser presentado», ya se puede ir a la embajada", "Si piden cambios, se corrigen en línea y se vuelve a enviar"],
          ["3. Entregar el pasaporte", "Calle 72 #2A-41, Bogotá; lunes, miércoles y viernes de 9:00 a 11:30, sin cita", "Con el código de barras impreso y el pasaporte original; no hacen falta copias del formulario"],
          ["4. Recoger la visa", "Con el recibo blanco o rosado y una tarjeta de débito o crédito", "La tarifa se paga con datáfono al recoger; normal, 5 días hábiles; urgente, 2 días hábiles, sin garantía"],
        ],
      },
      {
        id: "docs-copy",
        type: "paragraph",
        text: "Qué se presenta: el formulario en línea con una foto digital reciente, una copia legible del pasaporte en JPG y los documentos de apoyo que la plataforma pide para la visa de turista; si son varias páginas, en un solo PDF. En la embajada solo se entregan el pasaporte original y el código de barras impreso.",
      },
      {
        id: "proxy-copy",
        type: "paragraph",
        text: "Para una visa de turista de una o dos entradas no hace falta tomar las huellas, así que, según la embajada, no tiene que ir en persona: el pasaporte puede entregarlo un tercero, un tramitador o una agencia de viajes. Con visa de entradas múltiples hay que dar las huellas en persona, salvo excepciones como los menores de 14 años, los mayores de 70 o quien ya las registró en esta embajada con el mismo pasaporte después del 14 de abril de 2025. Homeground China no tramita visas: nuestro trabajo empieza donde termina el trámite, con el viaje. La embajada puede pedir una entrevista telefónica o presencial a algunos solicitantes, y no avisa cuando la visa está aprobada: se recoge en la fecha del recibo.",
      },
      { id: "fees-heading", type: "heading", level: 2, text: "Cuánto cuesta" },
      {
        id: "fees-copy",
        type: "paragraph",
        text: "La guía de octubre de 2025 publica estas tarifas para colombianos: 311.000 pesos por una entrada, 374.000 por dos, 436.000 por entradas múltiples de seis meses o menos y 561.000 por entradas múltiples de un año o más, más 113.000 por el trámite urgente. Esa tabla es de 2025; el 29 de diciembre de 2025 la embajada anunció que la reducción temporal de tarifas sigue hasta el 31 de diciembre de 2026. Confirme el importe vigente antes de ir: se paga con tarjeta al recoger y, como advierte la plataforma en línea, una vez hecho el pago no se reembolsa.",
      },
      { id: "no-heading", type: "heading", level: 2, text: "Lo que no sirve con pasaporte colombiano" },
      {
        id: "no-list",
        type: "list",
        items: [
          "El tránsito sin visa de 240 horas: Colombia no está entre los 57 países de la lista.",
          "El tránsito de 24 horas no sirve para hacer turismo: obliga a quedarse en la zona restringida del aeropuerto, y para salir hace falta un permiso temporal que decide la inmigración del aeropuerto.",
          "La exención de 30 días de Argentina, Chile, Perú y Uruguay no se extiende a Colombia.",
        ],
      },
      {
        id: "yes-copy",
        type: "paragraph",
        text: "Dos cosas sí juegan a su favor. Hong Kong no exige visa a los colombianos para estancias de hasta 90 días, y Macao da visa a la llegada para hasta 30, según la propia embajada. Y si además tiene la nacionalidad de un país exento, como España, cuya exención también está fijada hasta el 31 de diciembre de 2026, puede entrar en China con ese pasaporte; tendrá que salir de Colombia con el colombiano. Todos los países de la región, comparados, están en nuestra guía de China sin visado.",
        link: {
          label: "guía de China sin visado",
          href: "/es/guias/china-sin-visado-2026-2027/",
        },
      },
      { id: "plan-heading", type: "heading", level: 2, text: "Con visa, el viaje se decide antes de pedirla" },
      {
        id: "plan-copy",
        type: "paragraph",
        text: "La solicitud tiene que entrar al menos 3 semanas antes de salir, y la embajada solo recibe pasaportes tres mañanas por semana y cierra en las fiestas chinas que anuncia en su web. En la práctica, cuando presenta la solicitud ya tiene que saber cuántas veces entrará en China continental: un viaje que termina en Hong Kong o va de Pekín a Shanghái sin salir del país se hace con una sola entrada, la visa más barata. Haga la cuenta con su fecha: para salir de Bogotá el martes 15 de diciembre, el pasaporte tendría que estar en la embajada como muy tarde el lunes 23 de noviembre, y antes tiene que haber pasado la revisión en línea, cuyo plazo la guía de la embajada no indica. Si para entonces todavía no sabe por qué ciudades va a ir, no sabrá qué visa pedir. Por eso conviene cerrar el viaje antes de empezar el trámite.",
      },
      {
        id: "tickets-copy",
        type: "paragraph",
        text: "Las entradas también tienen calendario. La Ciudad Prohibida no vende entradas para el mismo día: salen siete días antes, a las 20:00 de Pekín, que son las 07:00 en Bogotá, y cada una va a nombre de un visitante con su número de pasaporte. En la Semana Dorada de 2025, el 1 de octubre ya estaban completos todos los días del 2 al 7, según Yicai.",
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos en español por WhatsApp o por correo con sus fechas, el número de viajeros y el viaje que le interesa. Le respondemos en un plazo de 12 horas. En el presupuesto escrito, que recibe antes de pagar nada, figuran las ciudades y cuántas veces entra en China continental: el dato que necesita para elegir entre la visa de una o de dos entradas. No tramitamos visas. ¿Prefiere no depender del inglés? En todas las ciudades de la ruta podemos asignarle un guía de habla hispana, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto. Para reservar se paga un 30 % de depósito con Alipay o con VBill, que acepta tarjetas emitidas en Colombia y en otros países de América Latina; el resto, al llegar. Somos una agencia de viajes con licencia en Pekín (L-BJ10587): los guías y los conductores son nuestros, y no le llevamos a tiendas.",
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas sobre la visa china para colombianos",
        items: [
          {
            question: "¿Los colombianos necesitan visa para China?",
            answer: "Sí, para entrar en China continental. Colombia no está en la exención de 30 días ni en el tránsito sin visa de 240 horas.",
          },
          {
            question: "¿Dónde se tramita la visa china en Colombia?",
            answer: "En la Embajada de China en Bogotá: primero en línea, en consular.mfa.gov.cn/VISA, y después entregando el pasaporte en la Calle 72 #2A-41, los lunes, miércoles y viernes de 9:00 a 11:30, sin cita.",
          },
          {
            question: "¿Cuánto tarda la visa china en Colombia?",
            answer: "El trámite normal, 5 días hábiles desde la entrega del pasaporte; el urgente, 2 días hábiles, sin garantía. La embajada pide presentar la solicitud al menos 3 semanas antes del viaje y menos de 90 días antes.",
          },
          {
            question: "¿Cuánto cuesta la visa china para colombianos?",
            answer: "La guía de octubre de 2025 publica 311.000 pesos por una entrada y 374.000 por dos, más 113.000 por el trámite urgente (tabla de 2025). La reducción temporal de tarifas sigue hasta el 31 de diciembre de 2026; confirme el importe con la embajada.",
          },
          {
            question: "¿Puede un colombiano usar el tránsito de 240 horas?",
            answer: "No. Colombia no está entre los 57 países del tránsito sin visa de 240 horas.",
          },
          {
            question: "¿Los colombianos necesitan visa para Hong Kong?",
            answer: "No, para estancias de hasta 90 días, según la Embajada de China en Colombia. Macao da visa a la llegada para hasta 30 días.",
          },
          {
            question: "¿Cómo se paga un viaje con Homeground China desde Colombia?",
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
            description: "Quién entra sin visa en la región y hasta cuándo.",
          },
          {
            label: "Feria de Cantón",
            href: "/es/guias/feria-de-canton/",
            description: "Fechas, traslados, coche con conductor e intérprete para compradores.",
          },
          {
            label: "Tarjeta de llegada a China",
            href: "/es/guias/tarjeta-de-llegada-china/",
            description: "Cómo llenarla en línea antes de volar.",
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
            label: "Guía de solicitud de visas para China, versión de octubre de 2025: trámite, plazos, tarifas, Hong Kong y doble nacionalidad",
            url: "https://co.china-embassy.gov.cn/esp/lsfw/qzxx/202404/P020250930117098605656.pdf",
            publisher: "Embajada de China en Colombia",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Extensión de la reducción temporal de las tarifas de visa hasta el 31 de diciembre de 2026 (29 de diciembre de 2025)",
            url: "https://co.china-embassy.gov.cn/esp/lsfw/qzxx/202512/t20251229_11789846.htm",
            publisher: "Embajada de China en Colombia",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Visa-Free Transit Policies: los 57 países del tránsito de 240 horas y la regla de 24 horas (en inglés)",
            url: "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
            publisher: "Administración Nacional de Inmigración de China",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Aviso sobre la prórroga de la exención unilateral de visado, sin Colombia (3 de noviembre de 2025)",
            url: "https://bio.visaforchina.cn/BRN4_ZH/tongzhigonggao/552376593302032425.html",
            publisher: "Departamento Consular del Ministerio de Asuntos Exteriores de China",
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
