import type { SpanishGuide } from "../spanishGuideTypes";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS as leadDays } from "../attractionReservations.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { spanishReservationFee } from "../spanishGuidePrices.ts";

const fee = spanishReservationFee();

const beijing5 = "beijing-highlights-5-day-private-tour";
const classic8 = "beijing-xian-shanghai-8-day-private-tour";

export const circuitoChinaCiudadProhibida: SpanishGuide = {
  slug: "circuito-china-ciudad-prohibida",
  title: "¿Su circuito por China no garantiza la Ciudad Prohibida?",
  headline: "¿Su circuito por China no garantiza la Ciudad Prohibida? Por qué pasa y cómo reservar la entrada a su nombre",
  description:
    "Algunos circuitos avisan de que la Ciudad Prohibida podría sustituirse por otra visita. Por qué ocurre, qué preguntar a su agencia y cómo reservar su entrada a su nombre.",
  navTitle: "Circuito sin Ciudad Prohibida",
  heroImage: {
    src: "/images/tours/beijing-highlights-5-day-private-tour/gallery-forbidden-corner-1600.webp",
    width: 1600,
    height: 1000,
    alt: "Torre de esquina de la Ciudad Prohibida reflejada en el foso al amanecer",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [classic8, beijing5],
  offers: [
    {
      id: "palace-only",
      afterBlockId: "free-time",
      kind: "attraction-reservation",
      title: "Mantenga su circuito y reserve aparte solo la Ciudad Prohibida",
      body: "No hace falta cambiar de agencia. Usted nos dice qué día tiene libre en Pekín y cuántos viajan, y nosotros reservamos la entrada en el sistema oficial del Museo del Palacio, a nombre de cada viajero, en cuanto se abre la venta. El día de la visita entra con su pasaporte, por su cuenta o con un guía nuestro.",
      attractionIds: ["forbidden-city", "tiananmen-square", "temple-of-heaven", "summer-palace"],
      preselect: "forbidden-city",
      action: "Reservar mi entrada",
    },
    {
      id: "classic-8-day",
      afterBlockId: "not-booked-yet",
      kind: "tour",
      tourSlug: classic8,
      label: "La ruta clásica, sin autobús y con la Ciudad Prohibida por escrito",
      note: `Pekín, Xi’an y Shanghái solo para su grupo y en sus fechas: la Ciudad Prohibida, la Gran Muralla en Mutianyu, un día entero para los Guerreros de Terracota y Shanghái. Siete noches de hotel con desayuno, guía y vehículo privados los días de visita, el tren Pekín–Xi’an y el vuelo Xi’an–Shanghái, y ninguna parada en tiendas. Si reserva el viaje y nos envía los pasaportes al menos ${leadDays} días antes de la visita y no conseguimos la Ciudad Prohibida o Tiananmén, le devolvemos todo lo pagado.`,
      action: "Ver el viaje de 8 días",
    },
    {
      id: "beijing-5-day",
      afterBlockId: "only-beijing",
      kind: "tour",
      tourSlug: beijing5,
      label: "Solo Pekín, 5 días, con la Ciudad Prohibida a su nombre",
      note: `Un viaje privado en el que la Ciudad Prohibida va por escrito: pedimos los pasaportes al confirmar y reservamos cada entrada a nombre del viajero. Si reserva el viaje y nos envía los pasaportes al menos ${leadDays} días antes de la visita y no conseguimos la Ciudad Prohibida o Tiananmén, le devolvemos todo lo pagado. Cuatro noches de hotel con desayuno, coche privado y ninguna parada en tiendas.`,
      action: "Ver Pekín en 5 días",
    },
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: "Sí, puede pasar: hay circuitos organizados que avisan en sus condiciones de que la visita a la Ciudad Prohibida podría cambiarse por otra. Ocurre porque el Museo del Palacio tiene un límite diario de visitantes, vende las entradas solo siete días antes, a las 20:00 de Pekín, y cada una va a nombre de un pasaporte. Si su circuito no le confirma por escrito la entrada para su fecha, tiene dos salidas: reservarla a su nombre para un rato libre en Pekín, o encargárnosla.",
      },
      { id: "clause-heading", type: "heading", level: 2, text: "Qué dicen las condiciones de algunos circuitos" },
      {
        id: "clause-quote",
        type: "callout",
        tone: "warning",
        title: "Texto publicado por Logitravel en su circuito de 9 días «Pekín, Xian y Shanghái en tren y avión» (consultado el 19 de octubre de 2026)",
        body: "«Debido al límite diario de visitantes marcado por el gobierno chino, la visita al Palacio Imperial en Pekín podría sustituirse por otra visita de manera excepcional.»",
      },
      {
        id: "clause-meaning",
        type: "paragraph",
        text: "El Palacio Imperial es la Ciudad Prohibida. La agencia lo presenta como algo excepcional, y es honesto que lo avise. Pero para quien viaja a Pekín sobre todo por ese lugar, la palabra que importa es «podría». Busque una frase parecida en las condiciones de su circuito, en el apartado de notas o de información importante, antes de pagar el resto.",
      },
      { id: "why-heading", type: "heading", level: 2, text: "Por qué una agencia no siempre puede prometerla" },
      {
        id: "why-list",
        type: "list",
        items: [
          "Límite diario: el museo limita cuántos visitantes entran cada día. Cuando una fecha se completa, solo quedan las entradas que otros cancelan.",
          "Venta siete días antes, a las 20:00 de Pekín: un circuito vendido con meses de antelación no puede reservar la entrada hasta una semana antes de pasar por Pekín.",
          "Una entrada por pasaporte: cada viajero del autobús necesita su propia reserva con su número de pasaporte. Si falla un dato, esa persona se queda fuera.",
          "Sin cambios: después de pagar no se cambian ni la fecha ni el nombre. Si el grupo cambia el orden de los días de Pekín, las entradas ya no sirven.",
          "Sin taquilla: el museo no vende entradas para el mismo día.",
        ],
      },
      {
        id: "golden-week",
        type: "paragraph",
        text: "La presión es real en las fechas fuertes: el 1 de octubre de 2025, primer día de la Semana Dorada china, el sistema de reservas del museo ya mostraba completos todos los días del 2 al 7 de octubre, según el diario económico Yicai. Y si se entera en Pekín de que su entrada no está, ya no hay arreglo: el museo no vende entradas para el mismo día, y la venta de su fecha se abrió una semana antes.",
      },
      { id: "ask-heading", type: "heading", level: 2, text: "Cuatro preguntas para su agencia, por escrito" },
      {
        id: "ask-list",
        type: "list",
        ordered: true,
        items: [
          "¿La entrada a la Ciudad Prohibida está incluida y se reservará a mi nombre, con mi número de pasaporte?",
          "¿Qué día y en qué franja (mañana o tarde) está prevista la visita?",
          "Si no se consigue, ¿qué visita la sustituye y me devuelven la diferencia?",
          "¿Qué tarde o qué día tengo libre en Pekín?",
        ],
      },
      {
        id: "ask-now",
        type: "paragraph",
        text: `Pregúntelo ahora, no la semana de la salida: si la respuesta no le convence, para garantizarle la reserva necesitamos su encargo y el pago al menos ${leadDays} días antes de la visita.`,
      },
      {
        id: "free-time",
        type: "paragraph",
        text: "Si la respuesta a la primera pregunta es «no está garantizada», la solución más sencilla es tener su propia entrada para un rato libre en Pekín: una tarde sin programa, el día de llegada si aterriza temprano o un día extra antes del circuito. La Ciudad Prohibida se recorre bien en unas tres horas y solo se entra por la Puerta del Meridiano, en el lado sur. Elija un día que no sea lunes, porque el museo cierra salvo festivos oficiales.",
      },
      {
        id: "service-terms",
        type: "paragraph",
        text: `La gestión cuesta ${fee} por persona y por lugar, más la entrada a su precio oficial, sin recargo. Antes de pagar recibe el total por escrito; después, el justificante de cada reserva y las instrucciones para el día de la visita.`,
      },
      {
        id: "not-booked-yet",
        type: "paragraph",
        text: "¿Todavía no ha pagado el circuito? Entonces compárelo con la misma ruta en privado: Pekín, Xi’an y Shanghái solo para su grupo, con la Ciudad Prohibida reservada a nombre de cada viajero en cuanto se abre la venta.",
      },
      {
        id: "only-beijing",
        type: "paragraph",
        text: "Si su viaje es solo Pekín, la misma condición vale para nuestros cinco días en la ciudad.",
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos por WhatsApp o por correo con el día libre que tiene en Pekín y cuántas personas viajan; no nos mande todavía los pasaportes. Respondemos en un plazo de 12 horas con el total por escrito y le pedimos los datos solo cuando confirme. Las entradas se pagan al aceptar el presupuesto, con Alipay o con VBill, que acepta tarjetas de América Latina. Somos una agencia de viajes con licencia en Pekín (L-BJ10587): reservamos en el sistema oficial del museo y no revendemos entradas. Si prefiere el viaje completo con nosotros, basta un 30 % de depósito y el resto se paga al llegar; el mismo planificador le atiende de principio a fin, los guías y los conductores son nuestros y no paramos en tiendas. Si quiere que alguien le explique el palacio en español, hay guía de habla hispana en Pekín, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto.",
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas frecuentes",
        items: [
          {
            question: "¿Por qué un circuito puede cambiar la Ciudad Prohibida por otra visita?",
            answer: "Porque el museo tiene un límite diario de visitantes, vende las entradas solo siete días antes, a las 20:00 de Pekín, y cada una va a nombre de un pasaporte. Si la agencia no consigue entradas para todo el grupo en su fecha, puede sustituir la visita por otra.",
          },
          {
            question: "¿Puedo comprar la entrada en la puerta si mi circuito no la consigue?",
            answer: "No. El Museo del Palacio no vende entradas para el mismo día. Hay que tener una reserva previa a nombre de cada viajero.",
          },
          {
            question: "¿Puedo reservar la Ciudad Prohibida por mi cuenta aunque vaya en circuito?",
            answer: "Sí, para un rato libre en Pekín. Cada entrada va a su nombre, así que no depende de la agencia. Eso sí, cada pasaporte admite una sola entrada por fecha: si su circuito ya la reservó a su nombre para ese día, no se puede reservar otra para el mismo día.",
          },
          {
            question: "¿Qué necesitan para reservarla por mí?",
            answer: "La fecha, el número de viajeros y, cuando confirme, el nombre completo y el número de pasaporte de cada uno, tal como figuran en el pasaporte que llevará ese día.",
          },
          {
            question: "¿Cuánto cuesta?",
            answer: `${fee} de gestión por persona y por lugar, más la entrada a su precio oficial. Si nos lo encarga y paga al menos ${leadDays} días antes y no la conseguimos, le devolvemos la gestión y la entrada.`,
          },
          {
            question: "¿Y si mi circuito cambia el día de Pekín?",
            answer: "Las entradas no se pueden cambiar de fecha. Por eso conviene elegir un día libre que no dependa del programa del grupo, como el día de llegada o un día extra en Pekín.",
          },
        ],
      },
      {
        id: "next-links",
        type: "internal-links",
        title: "Siga preparando Pekín",
        items: [
          {
            label: "A qué hora salen las entradas de la Ciudad Prohibida en su país",
            href: "/es/guias/entradas-ciudad-prohibida-tiananmen/",
            description: "Tabla de horarios para España y Latinoamérica.",
          },
          {
            label: "Ciudad Prohibida para extranjeros: entradas y acceso",
            href: "/es/guias/forbidden-city-for-foreign-visitors/",
            description: "La puerta de entrada, el recorrido y qué hacer si falla la reserva.",
          },
          {
            label: "China en 8 días: Pekín, Xi’an y Shanghái",
            href: "/es/tours/beijing-xian-shanghai-8-day-private-tour/",
            description: "La ruta clásica en privado, con las entradas reservadas a su nombre.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes",
        items: [
          {
            label: "Logitravel: condiciones del circuito «Pekín, Xian y Shanghái en tren y avión», 9 días",
            url: "https://www.logitravel.com/grandes-viajes/asia/china/circuitos/circuito-clasico/china-pekin-xian-shanghai-en-tren-y-avion-9-dias.html",
            publisher: "Logitravel",
            reviewedAt: "2026-10-19",
          },
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
        ],
      },
    ],
  },
};
