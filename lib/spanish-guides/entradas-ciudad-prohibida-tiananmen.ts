import type { SpanishGuide } from "../spanishGuideTypes";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS as leadDays } from "../attractionReservations.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { spanishReservationFee } from "../spanishGuidePrices.ts";

const fee = spanishReservationFee();

const beijing5 = "beijing-highlights-5-day-private-tour";

export const entradasCiudadProhibidaTiananmen: SpanishGuide = {
  slug: "entradas-ciudad-prohibida-tiananmen",
  title: "Entradas Ciudad Prohibida y Tiananmén 2026: a qué hora salen",
  headline: "Entradas de la Ciudad Prohibida y Tiananmén en 2026: a qué hora salen en su país",
  description:
    "Las entradas de la Ciudad Prohibida salen 7 días antes, a las 20:00 de Pekín: a las 13:00 o 14:00 en España, 06:00 en México, 07:00 en Bogotá y Lima, 09:00 en Buenos Aires.",
  navTitle: "A qué hora salen las entradas",
  heroImage: {
    src: "/images/destinations/beijing/hero-1600.webp",
    width: 1600,
    height: 1000,
    alt: "Los tejados de la Ciudad Prohibida vistos desde el norte, con palomas en vuelo sobre Pekín",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [beijing5, "beijing-xian-shanghai-8-day-private-tour", "beijing-xian-guilin-shanghai-10-day-private-tour"],
  offers: [
    {
      id: "palace-booking",
      afterBlockId: "eight-terms",
      kind: "attraction-reservation",
      title: "Ni despertador a las 06:00 ni pausa en el trabajo a las 14:00: la reservamos nosotros",
      body: "Usted nos da la fecha y, cuando confirma, el nombre y el número de pasaporte de cada viajero. Nosotros presentamos la reserva en el sistema oficial del Museo del Palacio, a nombre de cada uno, en cuanto se abre la venta a las 20:00 de Pekín. No tiene que estar conectado a las 06:00 en México ni a las 14:00 en Madrid. Recibe el justificante de cada reserva y las instrucciones para el día de la visita.",
      attractionIds: ["forbidden-city", "tiananmen-square", "temple-of-heaven", "summer-palace", "great-wall-mutianyu"],
      preselect: "forbidden-city",
      action: "Reservar la Ciudad Prohibida",
    },
    {
      id: "beijing-5-day",
      afterBlockId: "tiananmen-copy",
      kind: "tour",
      tourSlug: beijing5,
      label: "Pekín en 5 días, con la entrada ya resuelta",
      note: `Si todavía no tiene el viaje cerrado, la Ciudad Prohibida va dentro: pedimos los pasaportes al confirmar y reservamos las entradas a nombre de cada viajero. Cuatro noches de hotel con desayuno, coche privado, el Templo del Cielo, el Palacio de Verano y la Gran Muralla en Badaling. Si reserva el viaje y nos envía los pasaportes al menos ${leadDays} días antes de la visita y no conseguimos la Ciudad Prohibida o Tiananmén, le devolvemos todo lo pagado.`,
      action: "Ver Pekín en 5 días",
    },
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: "Las entradas de la Ciudad Prohibida (Museo del Palacio) salen a la venta siete días antes de la visita, a las 20:00 hora de Pekín, y no se venden entradas para el mismo día. En España eso son las 14:00 en horario de verano y las 13:00 en invierno; en Ciudad de México, las 06:00; en Bogotá y Lima, las 07:00, y en Buenos Aires, las 09:00, siempre el mismo día. Cada entrada va a nombre de un viajero, con su número de pasaporte, y hay que llevar ese pasaporte original. La plaza de Tiananmén tiene su propia reserva, aunque, según las medidas publicadas, quien tiene entrada válida del Museo del Palacio para ese día puede entrar en la plaza sin reservarla aparte.",
      },
      { id: "times-heading", type: "heading", level: 2, text: "A qué hora salen las entradas en su país" },
      {
        id: "times-table",
        type: "table",
        caption: "Las 20:00 de Pekín (UTC+8, sin cambio de hora) en cada país. Es siempre el mismo día del calendario, siete días antes de la visita.",
        columns: ["País o ciudad", "Hora local de apertura", "Cuándo se aplica"],
        rows: [
          ["España peninsular y Baleares", "13:00", "Horario de invierno, del 25 de octubre de 2026 al 27 de marzo de 2027"],
          ["España peninsular y Baleares", "14:00", "Horario de verano: hasta el 24 de octubre de 2026 y desde el 28 de marzo de 2027"],
          ["Islas Canarias", "13:00 en verano, 12:00 en invierno", "Una hora menos que en la Península"],
          ["Ciudad de México, Guadalajara y Monterrey", "06:00", "Todo el año: México ya no cambia la hora"],
          ["Cancún", "07:00", "Todo el año"],
          ["Bogotá, Lima y Quito", "07:00", "Todo el año"],
          ["Santiago de Chile", "09:00 / 08:00", "09:00 con el horario de verano chileno (de septiembre a abril); 08:00 el resto del año"],
          ["Buenos Aires y Montevideo", "09:00", "Todo el año"],
          ["Pekín", "20:00", "Hora oficial de la venta"],
        ],
      },
      {
        id: "times-example",
        type: "callout",
        tone: "decision",
        title: "Un ejemplo con fechas",
        body: "Para entrar en la Ciudad Prohibida el sábado 14 de noviembre de 2026, la venta se abre el sábado 7 de noviembre a las 20:00 de Pekín: a las 13:00 en Madrid, a las 06:00 en Ciudad de México, a las 07:00 en Bogotá y Lima y a las 09:00 en Buenos Aires y Santiago. El museo cierra los lunes, salvo festivos oficiales o avisos especiales: no cuente con un lunes sin comprobarlo antes.",
      },
      { id: "rules-heading", type: "heading", level: 2, text: "Las normas que deciden si entra o no" },
      {
        id: "rules-table",
        type: "table",
        caption: "Normas del Museo del Palacio revisadas el 22 de agosto de 2026; portal oficial revisado el 8 de octubre de 2026",
        columns: ["Norma", "Qué significa para usted"],
        rows: [
          ["No hay entradas para el mismo día", "Si llega a Pekín sin reserva, no la conseguirá en la puerta"],
          ["Venta 7 días antes, a las 20:00 de Pekín", "Las fechas se abren de una en una: no se puede reservar con un mes de antelación"],
          ["Un documento, una entrada por fecha", "Cada viajero, también los niños, necesita su propia reserva con su pasaporte"],
          ["Después de pagar no se cambia nada", "Fecha, franja de mañana o tarde y nombre quedan fijos; un número mal escrito obliga a cancelar y volver a intentarlo, si quedan entradas"],
          ["Pasaporte original en el control", "Una foto o una fotocopia no sirven"],
          ["Cierra los lunes", "Salvo festivos oficiales o avisos especiales del museo"],
        ],
      },
      {
        id: "golden-week",
        type: "paragraph",
        text: "En fechas de mucha demanda, conviene estar preparado cuando se abre la venta, siete días antes. El 1 de octubre de 2025, primer día de la Semana Dorada, el sistema de reservas del museo ya mostraba completos todos los días del 2 al 7 de octubre, según el diario económico Yicai.",
      },
      { id: "travellers-heading", type: "heading", level: 2, text: "Lo que les ha pasado a otros viajeros" },
      {
        id: "travellers-copy",
        type: "paragraph",
        text: "En foros de viajeros en español hay quien cuenta que se conectó a las 14:00, hora de España, y no consiguió entrada para su fecha. Otros no pudieron usar el miniprograma de WeChat porque no aceptaba su número de móvil español. El portal oficial en inglés usa verificación por correo electrónico, pero la hora de apertura es la misma para todo el mundo, y desde España o Latinoamérica cae en plena jornada de trabajo o de madrugada.",
      },
      { id: "eight-heading", type: "heading", level: 2, text: `Por qué le pedimos ${leadDays} días y no 7` },
      {
        id: "eight-days",
        type: "paragraph",
        text: `La venta se abre siete días antes, a las 20:00 de Pekín. Para presentar la reserva en ese mismo momento necesitamos tener ya, el día anterior, el nombre y el número de pasaporte de cada viajero comprobados, y el pago hecho. Por eso pedimos ${leadDays} días: ese día de más es el que permite revisar cada dígito antes de que se abra la venta, porque después no se puede corregir.`,
      },
      {
        id: "eight-terms",
        type: "paragraph",
        text: `Si nos encarga la reserva y paga al menos ${leadDays} días antes de la visita, la reserva está garantizada, y si no la conseguimos le devolvemos íntegramente la gestión y la entrada. Si nos lo encarga con menos de ${leadDays} días, lo intentamos igual, pero ya no podemos garantizarlo; si no la conseguimos, le devolvemos la gestión y lo que no se haya gastado de la entrada. Cobramos ${fee} de gestión por persona y por lugar, más la entrada a su precio oficial, sin recargo. ¿Ya tiene fecha para Pekín? Escríbanos hoy, no la semana de la venta.`,
      },
      { id: "tiananmen-heading", type: "heading", level: 2, text: "Plaza de Tiananmén: cuándo hace falta reservar" },
      {
        id: "tiananmen-copy",
        type: "paragraph",
        text: "La plaza de Tiananmén, la Tribuna de Tiananmén y el Museo del Palacio tienen reservas distintas. La reserva de la plaza sirve solo para la plaza abierta; la Tribuna se reserva en su propia cuenta oficial de WeChat. Según las medidas publicadas, si tiene una entrada válida del Museo del Palacio para ese mismo día, puede entrar en la plaza mostrándola en el control, sin otra reserva. Si quiere ver la plaza otro día, necesita su reserva aparte, y también se la gestionamos.",
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos por WhatsApp o por correo con la fecha de la visita y cuántas personas viajan; no nos mande todavía los pasaportes. Respondemos en un plazo de 12 horas con el total por escrito y le pedimos los datos solo cuando confirme. Las entradas se pagan al aceptar el presupuesto, mediante un enlace de pago seguro de VBill, que acepta tarjetas de América Latina; si reserva también un viaje con nosotros, basta un 30 % de depósito y el resto se paga al llegar. Somos una agencia de viajes con licencia en Pekín (L-BJ10587): reservamos en el sistema oficial del museo, a nombre de cada viajero, y no revendemos entradas. Si además viaja con nosotros, el mismo planificador le atiende de principio a fin, los guías y los conductores son nuestros y no paramos en tiendas. Si prefiere que alguien le explique el palacio en español, hay guía de habla hispana en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto.",
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas frecuentes",
        items: [
          {
            question: "¿A qué hora salen las entradas de la Ciudad Prohibida en España?",
            answer: "A las 14:00 en horario de verano y a las 13:00 en horario de invierno (desde el 25 de octubre de 2026), siete días antes de la visita. En Canarias, una hora menos.",
          },
          {
            question: "¿Y en México, Colombia, Perú, Argentina y Chile?",
            answer: "A las 06:00 en Ciudad de México, Guadalajara y Monterrey, y a las 07:00 en Cancún, Bogotá y Lima; a las 09:00 en Buenos Aires, y en Santiago de Chile a las 09:00 de septiembre a abril y a las 08:00 el resto del año. Siempre siete días antes de la visita.",
          },
          {
            question: "¿Se pueden comprar entradas en la taquilla?",
            answer: "No. El Museo del Palacio no vende entradas para el mismo día. Sin reserva previa a nombre de cada viajero, no se entra.",
          },
          {
            question: "¿Necesito reservar la plaza de Tiananmén?",
            answer: "Si visita la plaza el mismo día que tiene entrada del Museo del Palacio, según las medidas publicadas basta con mostrar esa entrada en el control. Para ir otro día, la plaza tiene su propia reserva. La Tribuna de Tiananmén es una reserva distinta.",
          },
          {
            question: "¿Qué pasa si escribo mal el número de pasaporte?",
            answer: "Si el nombre o el número de pasaporte es incorrecto, la identidad del visitante no se puede editar directamente después de comprar. Consulte primero las normas de cancelación vigentes del museo; una nueva reserva con los datos corregidos depende de que queden entradas.",
          },
          {
            question: "¿Cuánto cuesta que ustedes reserven la entrada?",
            answer: `${fee} de gestión por persona y por lugar, más la entrada a su precio oficial. Si nos lo encarga y paga al menos ${leadDays} días antes y no conseguimos la reserva, le devolvemos la gestión y la entrada.`,
          },
          {
            question: "¿Abre la Ciudad Prohibida los lunes?",
            answer: "No, salvo festivos oficiales o avisos especiales del museo. Compruebe siempre su fecha antes de organizar el día.",
          },
        ],
      },
      {
        id: "next-links",
        type: "internal-links",
        title: "Siga preparando Pekín",
        items: [
          {
            label: "Ciudad Prohibida para extranjeros: entradas y acceso",
            href: "/es/guias/forbidden-city-for-foreign-visitors/",
            description: "La puerta de entrada, el recorrido de tres horas y qué hacer si falla la reserva.",
          },
          {
            label: "Dónde alojarse en Pekín",
            href: "/es/guias/donde-alojarse-en-pekin/",
            description: "Cuatro zonas comparadas según sus visitas y su estación.",
          },
          {
            label: "Lo esencial de Pekín en 5 días",
            href: "/es/tours/beijing-highlights-5-day-private-tour/",
            description: "Con la Ciudad Prohibida, la Gran Muralla y el precio publicado.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes",
        items: [
          {
            label: "Museo del Palacio: página oficial de visita y reserva de entradas",
            url: "https://www.dpm.org.cn/Visit.html",
            publisher: "Museo del Palacio",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Museo del Palacio: el 1 de octubre de 2025, todos los días del 2 al 7 de octubre ya estaban reservados",
            url: "https://www.yicai.com/news/102851899.html",
            publisher: "Yicai",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Plataforma oficial de reservas de la plaza de Tiananmén",
            url: "https://yuyue2026.tamgw.beijing.gov.cn/web/",
            publisher: "Comité de Gestión de la Zona de Tiananmén",
            reviewedAt: "2026-08-22",
          },
          {
            label: "Canales oficiales de reserva de la Tribuna de Tiananmén",
            url: "https://english.beijing.gov.cn/latest/news/202509/t20250906_4192380.html",
            publisher: "Gobierno municipal de Pekín",
            reviewedAt: "2026-08-22",
          },
        ],
      },
    ],
  },
};
