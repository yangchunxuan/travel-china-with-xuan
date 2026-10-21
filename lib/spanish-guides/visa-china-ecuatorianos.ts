import type { SpanishGuide } from "../spanishGuideTypes";

export const visaChinaEcuatorianos: SpanishGuide = {
  slug: "visa-china-ecuatorianos",
  title: "China sin visa para ecuatorianos: 30 días y sin fecha de fin",
  headline: "¿Los ecuatorianos necesitan visa para China? No, hasta 30 días seguidos y sin fecha de caducidad",
  description:
    "Con pasaporte ecuatoriano ordinario se viaja a China sin visa hasta 30 días seguidos, por un acuerdo bilateral sin fecha de fin. Qué cubre y qué viaje cabe en 30 días.",
  navTitle: "Visa China para ecuatorianos",
  heroImage: {
    src: "/images/tours/beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour/hero.webp",
    width: 1600,
    height: 1000,
    alt: "Pilares de arenisca del Parque Forestal Nacional de Zhangjiajie",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [
    "china-grand-tour-21-day-private-tour",
    "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour",
    "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
  ],
  offers: [
    {
      id: "grand-tour-21-day",
      afterBlockId: "fit-copy",
      kind: "tour",
      tourSlug: "china-grand-tour-21-day-private-tour",
      label: "Tres semanas que caben en sus 30 días",
      note: "El viaje más largo que publicamos: Pekín, Xi'an, Chengdu, Guilin, Zhangjiajie, tres noches de crucero por el Yangtsé y Shanghái. Incluye 17 noches en hoteles de nivel cuatro estrellas con desayuno y tres en camarote con balcón, con las comidas del crucero; guías locales y vehículos privados los días de visita en tierra, los trenes, el vuelo interno y las entradas indicadas. El suplemento del crucero en fechas de alta demanda se confirma por escrito antes de pagar. Aparte van los vuelos desde Ecuador y los almuerzos y las cenas en tierra. Con pasaporte ecuatoriano cabe entero en una sola estancia sin visa. Si reserva el viaje y nos envía los pasaportes al menos 8 días antes de su visita a la Ciudad Prohibida y no conseguimos esa reserva o la de la plaza de Tiananmén, le devolvemos todo lo que haya pagado.",
      action: "Ver el itinerario y el precio",
    },
    {
      id: "small-group-14-day",
      afterBlockId: "fit-copy",
      kind: "tour",
      tourSlug: "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour",
      label: "14 días en grupo reducido, con salidas en 2027",
      note: "La ruta clásica de un primer viaje —Pekín, Xi'an, Chengdu, Guilin y Shanghái— compartida con entre 8 y 12 viajeros. Salidas de 2027: 10 de abril, 8 de mayo, 11 de septiembre y 9 de octubre; como su exención no caduca el 31 de diciembre, puede elegir cualquiera. Incluye 13 noches de hotel con desayuno, guías locales los días de visita, el vehículo del grupo, las entradas indicadas, el crucero por el río Li, dos trenes y dos vuelos internos; aparte van los vuelos desde Ecuador, los almuerzos y las cenas. Cada salida se confirma con 8 reservas y se cierra al llegar a 12 viajeros. Comprobamos las reservas 60 días antes de la salida; si hay menos de 8, le contactamos y le explicamos las opciones en detalle, y si decide no viajar, le devolvemos íntegramente lo pagado.",
      action: "Ver las fechas y el precio",
    },
    {
      id: "ecuador-tickets",
      afterBlockId: "tickets-copy",
      kind: "attraction-reservation",
      title: "Sin entrada a su nombre, no se entra",
      body: "La Ciudad Prohibida no vende entradas para el mismo día: salen siete días antes, a las 20:00 de Pekín (las 07:00 en Quito y Guayaquil, las 06:00 en Galápagos), a nombre de cada visitante y con su pasaporte. En la Semana Dorada de 2025, el 1 de octubre ya estaban completos todos los días del 2 al 7, según Yicai. Díganos la fecha y nos ocupamos nosotros; la entrada se cobra al precio oficial, sin recargo.",
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
        text: "No. Con pasaporte ecuatoriano ordinario se viaja a China sin visa siempre que no se permanezca más de 30 días seguidos. Lo permite un tratado bilateral entre China y Ecuador, y por eso, a diferencia de la exención de Argentina, Chile, Perú o Uruguay, no tiene fecha de fin: no caduca el 31 de diciembre de 2026. Así lo publica la Embajada de China en Ecuador en su página de información sobre visas, actualizada el 12 de febrero de 2026 y consultada el 19 de octubre de 2026.",
      },
      {
        id: "glance-table",
        type: "table",
        caption: "Pasaporte ecuatoriano y China, comprobado el 19 de octubre de 2026",
        columns: ["Punto", "Qué dice la norma publicada"],
        rows: [
          ["¿Hace falta visa?", "No, con pasaporte ordinario"],
          ["Estancia máxima", "30 días seguidos por estancia"],
          ["Fecha de fin", "No tiene: es un acuerdo bilateral, no la exención temporal que termina el 31/12/2026"],
          ["Tránsito sin visa de 240 horas", "Ecuador no está en la lista, pero no le hace falta"],
          ["Quedarse más de 30 días, trabajar o estudiar", "Consulte a la embajada qué visa corresponde"],
        ],
      },
      {
        id: "rules-copy",
        type: "paragraph",
        text: "La entrada la decide siempre el control fronterizo al llegar, y hay que presentar la tarjeta de llegada, que se puede llenar en línea antes de volar. Le explicamos cómo en nuestra guía de la tarjeta de llegada a China.",
        link: {
          label: "guía de la tarjeta de llegada a China",
          href: "/es/guias/tarjeta-de-llegada-china/",
        },
      },
      { id: "compare-heading", type: "heading", level: 2, text: "En qué se diferencia de sus vecinos" },
      {
        id: "compare-copy",
        type: "paragraph",
        text: "Los argentinos, chilenos, peruanos y uruguayos también entran hoy sin visa en China, pero por una exención unilateral que el gobierno chino ha fijado hasta las 24:00 del 31 de diciembre de 2026, sin prórroga anunciada a 19 de octubre de 2026. Los colombianos necesitan visa. El acuerdo de Ecuador no depende de esas fechas: puede planear un viaje para 2027 con las mismas reglas de hoy. Comparamos todos los países en nuestra guía de China sin visado.",
        link: {
          label: "guía de China sin visado",
          href: "/es/guias/china-sin-visado-2026-2027/",
        },
      },
      { id: "fit-heading", type: "heading", level: 2, text: "Qué viaje cabe en 30 días" },
      {
        id: "fit-copy",
        type: "paragraph",
        text: "Treinta días seguidos son más de lo que necesita casi cualquier primer viaje. Dos semanas bastan para Pekín, Xi'an, Chengdu, Guilin y Shanghái; tres semanas permiten sumar Zhangjiajie y el crucero por el Yangtsé, y aún sobra margen. Lo único que hay que comprobar es que entre la llegada y la salida no pasen más de 30 días. El tiempo le sobra; lo difícil es encajar cinco o seis ciudades con trenes, vuelos internos y entradas con su nombre que salen a la venta en días distintos: la Gran Muralla de Mutianyu, 30 días antes; la Ciudad Prohibida, solo 7. Eso es lo que le dejamos hecho.",
      },
      { id: "dates-heading", type: "heading", level: 2, text: "Sin fecha límite para la visa, pero con fechas que mandan" },
      {
        id: "dates-copy",
        type: "paragraph",
        text: "Que su exención no caduque no significa que dé igual cuándo reservar. En China, las entradas de los lugares más visitados tienen sus propias reglas: se reservan con el nombre y el pasaporte de cada visitante, se abren a la venta con una antelación fija y, en semanas festivas, pueden completarse, como le pasó a la Ciudad Prohibida en la Semana Dorada de 2025. La Gran Muralla en Mutianyu se reserva desde 30 días antes, con una entrada por pasaporte y día.",
      },
      {
        id: "zhangjiajie-copy",
        type: "paragraph",
        text: "En los parques, lo que cuenta es la hora. En las vacaciones del 1 de mayo de 2025, uno de los picos del año en China, el distrito de Wulingyuan, en Zhangjiajie, pidió disculpas públicamente por las esperas en ascensores, teleféricos y autobuses del parque. Un viajero contó en 36Kr que el 3 de mayo entró al parque hacia las 6 de la mañana sin esperar en la puerta y que esa misma tarde esperó unas 2 horas para subir en el ascensor Bailong y hora y media para el teleférico de Tianzi. En nuestro viaje de 21 días, el guía decide la hora de entrada y el orden de la visita para empezar antes de las horas de más afluencia.",
      },
      {
        id: "tickets-copy",
        type: "paragraph",
        text: "La Ciudad Prohibida no vende entradas para el mismo día: salen siete días antes, a las 20:00 de Pekín, que son las 07:00 en Quito. En la Semana Dorada de 2025, el 1 de octubre ya estaban completos todos los días del 2 al 7, según Yicai. Si su viaje coincide con fiestas chinas como la Semana Dorada, que empieza cada 1 de octubre, encárguenos las entradas en cuanto tenga las fechas. Nuestra garantía pide que la solicitud, el pago y los datos del pasaporte de cada viajero nos lleguen con al menos 8 días de antelación: antes de que se abra la venta de su fecha.",
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos en español por WhatsApp o por correo con sus fechas, el número de viajeros y el viaje que le interesa. Le respondemos en un plazo de 12 horas y, antes de que pague nada, recibe por escrito el presupuesto completo. Y el mismo planificador le atiende de principio a fin: desde esa primera respuesta hasta el último día del viaje. ¿Prefiere no depender del inglés? En todas las ciudades de la ruta podemos asignarle un guía de habla hispana, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto. Para reservar un viaje privado se paga un 30 % de depósito mediante un enlace de pago seguro de VBill, que acepta tarjetas emitidas en Ecuador y en otros países de América Latina; el resto, al llegar. Somos una agencia de viajes con licencia en Pekín (L-BJ10587): los guías y los conductores son nuestros, y no le llevamos a tiendas.",
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas de ecuatorianos que viajan a China",
        items: [
          {
            question: "¿Los ecuatorianos necesitan visa para ir a China?",
            answer: "No, con pasaporte ordinario y para estancias de hasta 30 días seguidos, según la Embajada de China en Ecuador.",
          },
          {
            question: "¿La exención para ecuatorianos termina el 31 de diciembre de 2026?",
            answer: "No. Esa fecha es la de la exención unilateral de países como Argentina, Chile o Perú. La de Ecuador sale de un tratado bilateral y no tiene fecha de fin publicada.",
          },
          {
            question: "¿Cuántos días puede estar un ecuatoriano en China sin visa?",
            answer: "Hasta 30 días seguidos. Para quedarse más tiempo, trabajar o estudiar, consulte a la embajada qué visa corresponde.",
          },
          {
            question: "¿A qué hora salen las entradas de la Ciudad Prohibida en Ecuador?",
            answer: "A las 07:00 en Quito y Guayaquil, siete días antes de la visita: son las 20:00 en Pekín.",
          },
          {
            question: "¿Cómo se paga un viaje con Homeground China desde Ecuador?",
            answer: "Con un enlace de pago seguro de VBill, que acepta tarjetas emitidas en América Latina: en un viaje privado, un 30 % de depósito al reservar y el resto al llegar.",
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
            description: "Todos los países de la región, comparados.",
          },
          {
            label: "China en 14 días: Pekín, Xi'an, Chengdu, Guilin y Shanghái",
            href: "/es/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/",
            description: "La misma ruta en privado, en las fechas que elija.",
          },
          {
            label: "Escala en Pekín",
            href: "/es/guias/escala-en-pekin/",
            description: "Cómo ir a la Gran Muralla desde el aeropuerto.",
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
            label: "Información sobre visas chinas: exención para pasaportes ordinarios ecuatorianos (12 de febrero de 2026)",
            url: "http://ec.china-embassy.gov.cn/esp/lsfw/qzxx/202602/t20260212_11857152.htm",
            publisher: "Embajada de China en Ecuador",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Aviso sobre la prórroga de la exención unilateral de visado hasta el 31 de diciembre de 2026 (3 de noviembre de 2025)",
            url: "https://bio.visaforchina.cn/BRN4_ZH/tongzhigonggao/552376593302032425.html",
            publisher: "Departamento Consular del Ministerio de Asuntos Exteriores de China",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Mutianyu: reserva con pasaporte desde 30 días antes (consultado el 11 de octubre de 2026)",
            url: "https://www.mutianyugreatwall.com/cnInformation",
            publisher: "Gran Muralla de Mutianyu",
            reviewedAt: "2026-10-11",
          },
          {
            label: "Wulingyuan pide disculpas por las esperas del 2 de mayo de 2025 en ascensores, teleféricos y autobuses (4 de mayo de 2025)",
            url: "https://m.gmw.cn/2025-05/04/content_1304029265.htm",
            publisher: "Guangming Online (vía el centro de medios del distrito de Wulingyuan)",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Zhangjiajie en el puente de mayo de 2025: entrada sin esperas a las 6 y esperas en el ascensor Bailong y el teleférico de Tianzi por la tarde (6 de mayo de 2025)",
            url: "https://www.36kr.com/p/3280487039377538",
            publisher: "36Kr",
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
