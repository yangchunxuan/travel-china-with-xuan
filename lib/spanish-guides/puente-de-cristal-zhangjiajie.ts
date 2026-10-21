import type { SpanishGuide } from "../spanishGuideTypes";

export const puenteDeCristalZhangjiajie: SpanishGuide = {
  slug: "puente-de-cristal-zhangjiajie",
  sourceGuideId: "zhangjiajie-glass-bridge-vs-skywalk",
  title: "Puente de cristal de Zhangjiajie: dónde está y entradas",
  headline: "Puente de cristal de Zhangjiajie, pasarelas de Tianmen o Parque Forestal: tres lugares distintos",
  description:
    "El puente de cristal está en el Gran Cañón de Zhangjiajie, no en el Parque Forestal ni en Tianmen. Qué entrada comprar, cuánto cuesta y cuánto tiempo dejar.",
  navTitle: "Puente de cristal de Zhangjiajie",
  heroImage: {
    src: "/images/guides/zhangjiajie/glass-bridge-ticket-guide.webp",
    width: 1280,
    height: 1600,
    alt: "Visitantes cruzando el puente colgante de cristal, de estructura blanca, sobre el Gran Cañón de Zhangjiajie",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-11",
  tourSlugs: [
    "zhangjiajie-4-day-private-tour",
    "zhangjiajie-forest-4-day-private-tour",
    "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
  ],
  offers: [
    {
      id: "zhangjiajie-4-day",
      afterBlockId: "mixup-copy",
      kind: "tour",
      tourSlug: "zhangjiajie-4-day-private-tour",
      label: "Puente de cristal y montaña Tianmen en 4 días",
      note: "Por su cuenta, el día del puente es una cadena de pasos: comprar la ruta B correcta, llegar a un recinto a una hora de la ciudad antes del último control de las 16:00 y encontrar el coche en la salida del cañón, que no es por donde entró. En nuestro viaje privado de 4 días todo eso ya está resuelto: el puente es el día 3, con guía, vehículo privado y la entrada reservada; la montaña Tianmen es el día 4 y el Parque Forestal el día 2. En festivos, el Parque Forestal del día 2 puede tener largas esperas: el distrito de Wulingyuan pidió disculpas públicamente por las del 2 de mayo de 2025 en los ascensores, teleféricos y autobuses del parque. Ese día, el guía planifica la hora de entrada y el sentido de la visita.",
      action: "Ver el itinerario y el precio",
    },
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: "En Zhangjiajie, «puente de cristal», «pasarela de cristal» y «Parque Forestal» son tres lugares distintos, con entradas distintas. El puente de cristal está en el Gran Cañón de Zhangjiajie, en el condado de Cili, a una hora en coche de la ciudad. Las pasarelas de cristal pegadas al acantilado están en la montaña Tianmen, junto a la ciudad. Los pilares de arenisca de Avatar están en el Parque Forestal Nacional, en Wulingyuan. Para cruzar el puente hay que comprar la ruta B del Gran Cañón: 175 yuanes por adulto en la tienda oficial del recinto, consultada el 11 de octubre de 2026.",
      },
      {
        id: "places-grid",
        type: "comparison",
        title: "Tres lugares que se confunden",
        columns: [
          {
            heading: "Puente de cristal del Gran Cañón",
            body: "Un puente colgante con suelo de cristal sobre el cañón.",
            items: [
              "Gran Cañón de Zhangjiajie, condado de Cili",
              "Entrada propia: la ruta B incluye el puente",
              "Unas tres horas de visita",
            ],
          },
          {
            heading: "Pasarelas de cristal de Tianmen",
            body: "Tramos de pasarela con suelo de cristal pegados al acantilado de la montaña.",
            items: [
              "Montaña Tianmen, junto a la ciudad de Zhangjiajie",
              "Se visitan con la entrada de Tianmen",
              "Es otro día de visita",
            ],
          },
          {
            heading: "Parque Forestal Nacional",
            body: "Los pilares de arenisca que se asocian con Avatar.",
            items: [
              "Wulingyuan, con Yuanjiajie y la montaña Tianzi",
              "Entrada propia, que no incluye el puente",
              "Uno o dos días completos",
            ],
          },
        ],
      },
      {
        id: "mixup-copy",
        type: "paragraph",
        text: "El error típico es ver «Parque Forestal Nacional» en un itinerario y dar por hecho que incluye el puente de cristal. No lo incluye: la entrada del Parque Forestal no sirve en el Gran Cañón, y las pasarelas de Tianmen son una tercera visita. Antes de pagar un viaje, busque el nombre exacto de cada lugar en cada día del programa.",
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos en español por WhatsApp o por correo con sus fechas, el número de viajeros y el viaje o el traslado que le interesa. Respondemos en un plazo de 12 horas con el presupuesto completo por escrito. Y el mismo planificador le atiende de principio a fin: desde esa primera respuesta hasta el último día del viaje. Los guías hablan inglés y, si prefiere hacer el viaje en español, hay guía de habla hispana disponible en todas las ciudades de la ruta, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto. Para reservar un viaje privado se paga un 30 % de depósito mediante un enlace de pago seguro de VBill, que acepta tarjetas de América Latina; el resto, al llegar. Somos una agencia de viajes con licencia en Pekín (L-BJ10587). Los guías y los conductores son nuestros, y no hay paradas obligatorias en tiendas: el tiempo del viaje es para lo que usted vino a ver.",
      },
      { id: "tickets-heading", type: "heading", level: 2, text: "Entradas del puente de cristal: precio y rutas" },
      {
        id: "price-table",
        type: "table",
        caption: "Precios del Gran Cañón de Zhangjiajie en la tienda oficial, 11 de octubre de 2026",
        columns: ["Entrada", "Adulto", "14 a 18 años, 60 a 65 años y estudiantes", "Más de 65 años", "Menores de 14"],
        rows: [
          ["Ruta B: puente de cristal + cañón", "175 yuanes", "88 yuanes", "63 yuanes", "Gratis"],
          ["Ruta A: solo el cañón, sin puente", "50 yuanes", "25 yuanes", "Gratis", "Gratis"],
        ],
      },
      {
        id: "price-copy",
        type: "paragraph",
        text: "Son precios sin seguro: la tienda vende cada entrada con o sin seguro de accidentes, por 3 yuanes por persona. Si ve 219, 216 o 91 yuanes en otras webs, son precios de lista antiguos. Cuando consultamos la tienda oficial no había una entrada solo para el puente; algunas webs y guías antiguas hablan de una «ruta C», pero no la dé por buena si la tienda oficial no la vende para su fecha.",
      },
      {
        id: "routes-grid",
        type: "comparison",
        title: "Qué recorre cada ruta",
        columns: [
          {
            heading: "B: puente + cañón",
            body: "Unas 3 horas según el aviso de la tienda; la web del recinto da 3,5 km y 3,5 horas.",
            items: [
              "Centro de visitantes → puente de cristal → pasarela de cristal → bajada al cañón → barco en el lago Shenquan → salida del cañón",
              "La bajada puede hacerse con atracciones de pago opcionales: tirolina y tobogán, o una cadena de tres ascensores",
            ],
          },
          {
            heading: "A: solo el cañón",
            body: "Unas 2 horas según el aviso de la tienda.",
            items: [
              "Centro de visitantes → garganta estrecha (一线天) → barco en el lago Shenquan → salida del cañón",
              "No se cruza el puente de cristal",
            ],
          },
        ],
      },
      {
        id: "extras-copy",
        type: "paragraph",
        text: "Las atracciones de dentro son opcionales y se pagan aparte: cada una se puede comprar allí escaneando un código, o en un paquete de 120 yuanes por persona.",
      },
      { id: "visit-heading", type: "heading", level: 2, text: "Horario, reserva con pasaporte y salida" },
      {
        id: "hours-copy",
        type: "paragraph",
        text: "Las dos rutas abren a las 8:00 y el último control de entradas es a las 16:00. Deje unas tres horas para la ruta B, más si añade atracciones o hay colas. El Gran Cañón está a una hora por carretera de la ciudad de Zhangjiajie, con Wulingyuan de camino. No ponga la montaña Tianmen el mismo día.",
      },
      {
        id: "passport-copy",
        type: "paragraph",
        text: "El formulario de la tienda oficial admite el pasaporte como documento y pide, por cada visitante, nombre, sexo, tipo y número de documento y país. Las entradas son nominativas: lleve el mismo pasaporte con el que reservó. Consultamos el formulario sin hacer un pedido, así que no hemos comprobado qué tarjetas o teléfonos extranjeros acepta. Si cancela antes de la hora de apertura del día reservado, el reembolso es completo; después, se descuenta el 10 % del pedido.",
      },
      {
        id: "exit-callout",
        type: "callout",
        tone: "decision",
        title: "La visita no termina donde empieza",
        body: "La ruta B empieza en el centro de visitantes, arriba, y termina en la salida del cañón, abajo. Si va en taxi o en coche, acuerde la recogida en la salida del cañón, no en la entrada.",
      },
      {
        id: "car-copy",
        type: "paragraph",
        text: "¿Prefiere no depender de taxis? Pídanos un coche con conductor para el día: le deja en el centro de visitantes y le espera en la salida del cañón. Los conductores son nuestros y le confirmamos el trayecto y el precio por escrito antes de pagar.",
        link: {
          label: "Pídanos un coche con conductor para el día",
          href: "/es/services/private-car-and-driver/#car-enquiry",
        },
      },
      { id: "tianmen-heading", type: "heading", level: 2, text: "Las pasarelas de cristal de Tianmen" },
      {
        id: "tianmen-copy",
        type: "paragraph",
        text: "Las pasarelas de cristal de la montaña Tianmen están en la cima, junto al acantilado, y se recorren con la entrada de Tianmen; algunos servicios de las pasarelas tienen un cargo opcional aparte. Desde el 13 de octubre de 2026, Tianmen solo vende la ruta C, que sube y baja en el teleférico rápido desde la puerta de la montaña. Los precios, el punto de inicio y los cierres están en nuestra guía de entradas de la montaña Tianmen.",
        link: {
          label: "guía de entradas de la montaña Tianmen",
          href: "/es/guias/tianmen-mountain-tickets-and-routes/",
        },
      },
      { id: "routes-heading", type: "heading", level: 2, text: "Qué viaje incluye cada lugar" },
      {
        id: "tours-table",
        type: "table",
        caption: "Nuestros viajes privados por Zhangjiajie y lo que incluyen",
        columns: ["Viaje", "Puente de cristal del Gran Cañón", "Montaña Tianmen", "Parque Forestal"],
        rows: [
          ["Zhangjiajie en 4 días", "Sí, el día 3", "Sí, el día 4", "Sí, el día 2"],
          ["Bosques de Zhangjiajie en 4 días", "No", "Sí, el día 3; con mal tiempo, se cambia por el lago Baofeng", "Sí"],
          ["Zhangjiajie, Furong y Fenghuang en 7 días", "No", "No", "Sí, dos días"],
        ],
      },
      {
        id: "tour-copy",
        type: "paragraph",
        text: "Si quiere el puente de cristal sin ocuparse de la entrada ni del transporte, el puente es el día 3 de nuestro viaje privado de 4 días por Zhangjiajie, con guía de habla inglesa y vehículo privado: reservamos la entrada y le recogemos en la salida del cañón. Se paga con tarjeta mediante un enlace de pago seguro de VBill: en un viaje privado, un 30 % de depósito al reservar y el resto al llegar.",
        link: {
          label: "viaje privado de 4 días por Zhangjiajie",
          href: "/es/tours/zhangjiajie-4-day-private-tour/",
        },
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas sobre el puente de cristal de Zhangjiajie",
        items: [
          {
            question: "¿Dónde está el puente de cristal de Zhangjiajie?",
            answer: "En el Gran Cañón de Zhangjiajie, en el condado de Cili, a una hora por carretera de la ciudad. No está en el Parque Forestal Nacional ni en la montaña Tianmen.",
          },
          {
            question: "¿Cuánto cuesta la entrada al puente de cristal?",
            answer: "175 yuanes por adulto en la tienda oficial del recinto, consultada el 11 de octubre de 2026. Es la ruta B, que incluye el puente y el cañón; el seguro de accidentes añade 3 yuanes. Los menores de 14 años entran gratis.",
          },
          {
            question: "¿Se puede comprar una entrada solo para el puente?",
            answer: "No en la tienda oficial cuando la consultamos el 11 de octubre de 2026: vendía la ruta A, solo el cañón, y la ruta B, el puente y el cañón.",
          },
          {
            question: "¿El puente de cristal y las pasarelas de Tianmen son lo mismo?",
            answer: "No. El puente de cristal cruza el Gran Cañón; las pasarelas de cristal están en el acantilado de la montaña Tianmen. Son dos lugares a una hora de distancia, con entradas distintas, y se visitan en días distintos.",
          },
          {
            question: "¿La entrada del Parque Forestal incluye el puente de cristal?",
            answer: "No. El Parque Forestal Nacional de Zhangjiajie y el Gran Cañón son recintos distintos, cada uno con su entrada y su horario.",
          },
          {
            question: "¿A qué hora abre el puente de cristal?",
            answer: "Las dos rutas abren a las 8:00 y el último control de entradas es a las 16:00. La ruta B dura unas tres horas, así que no llegue en el último momento.",
          },
        ],
      },
      {
        id: "next-links",
        type: "internal-links",
        title: "Siga preparando Zhangjiajie",
        items: [
          {
            label: "Montañas de Avatar en Zhangjiajie",
            href: "/es/guias/montanas-de-avatar-china/",
            description: "El Parque Forestal Nacional, sus entradas y cuántos días hacen falta.",
          },
          {
            label: "Entradas a la montaña Tianmen",
            href: "/es/guias/tianmen-mountain-tickets-and-routes/",
            description: "La ruta C, los teleféricos y el punto de inicio.",
          },
          {
            label: "Espectáculos nocturnos en Zhangjiajie",
            href: "/es/guias/espectaculos-nocturnos-zhangjiajie/",
            description: "Cuál ver según su hotel, y cuándo no ir a ninguno.",
          },
          {
            label: "Zhangjiajie en 4 días: picos de arenisca, puente de cristal y montaña Tianmen",
            href: "/es/tours/zhangjiajie-4-day-private-tour/",
            description: "Viaje privado con precio publicado por persona.",
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
            label: "Tienda oficial: lista de entradas, aviso y formulario de pedido",
            url: "https://fx.zjjdaxiagu.com/html/pt/dxg/product/pub/list.html",
            publisher: "Recinto del Gran Cañón de Zhangjiajie",
            reviewedAt: "2026-10-11",
          },
          {
            label: "Web oficial: guía del visitante con horarios y rutas",
            url: "https://zjjdaxiagu.com/guide.html",
            publisher: "Recinto del Gran Cañón de Zhangjiajie",
            reviewedAt: "2026-10-11",
          },
          {
            label: "Web oficial: página de entradas con los precios de lista antiguos",
            url: "https://zjjdaxiagu.com/ticket.html",
            publisher: "Recinto del Gran Cañón de Zhangjiajie",
            reviewedAt: "2026-10-11",
          },
          {
            label: "Montaña Tianmen: precios de los paquetes y aviso a partir del 13 de octubre de 2026",
            url: "https://www.ly.com/scenery/BookSceneryTicket_922.html",
            publisher: "Tongcheng Travel",
            reviewedAt: "2026-10-11",
          },
        ],
      },
    ],
  },
};
