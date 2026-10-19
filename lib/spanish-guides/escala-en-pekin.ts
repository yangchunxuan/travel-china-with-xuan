// @ts-ignore Source-TypeScript tests require the explicit extension.
import { ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS, attractionReservationServiceFeeCny } from "../attractionReservations.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { privateGuideHours, privateGuideRates } from "../privateGuideServices.ts";
import type { SpanishGuide } from "../spanishGuideTypes";

const yuan = (amount: number) => `${new Intl.NumberFormat("es-ES", { useGrouping: "always" }).format(amount)} yuanes`;
const beijingGuide = privateGuideRates.beijing;
const guideRate = `${yuan(beijingGuide.standardCny)} por guía y día de hasta ${privateGuideHours} horas en tarifa habitual y ${yuan(beijingGuide.peakMinCny)} en temporada alta`;
const bookingFee = yuan(attractionReservationServiceFeeCny);
const leadDays = ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS;

export const escalaEnPekin: SpanishGuide = {
  slug: "escala-en-pekin",
  title: "Escala en Pekín: a la Gran Muralla desde el aeropuerto",
  headline: "Escala en Pekín: quién puede salir del aeropuerto sin visa y cómo llegar a la Gran Muralla",
  description:
    "Quién puede salir del aeropuerto de Pekín sin visa, cuántas horas de escala hacen falta para Mutianyu, entradas y horarios, y cuánto cuestan el coche y el guía.",
  navTitle: "Escala en Pekín",
  heroImage: {
    src: "/images/guides/beijing-to-mutianyu-great-wall-transfer/hero-1600.webp",
    width: 1600,
    height: 1000,
    alt: "El tramo restaurado de la Gran Muralla en Mutianyu, cerca de Pekín",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [
    "beijing-highlights-5-day-private-tour",
    "beijing-xian-shanghai-8-day-private-tour",
  ],
  offers: [
    {
      id: "layover-tickets",
      afterBlockId: "sell-copy",
      kind: "attraction-reservation",
      title: "Su entrada a Mutianyu, a su nombre antes de aterrizar",
      body: "La entrada de Mutianyu es nominativa: va con el pasaporte de cada viajero, una por persona y día, con franja horaria de entrada, y la venta abre 30 días antes. En una escala no hay margen para resolverlo en la puerta. Encárguenosla con la fecha de su vuelo.",
      attractionIds: ["great-wall-mutianyu", "great-wall-badaling", "forbidden-city", "temple-of-heaven", "summer-palace"],
      preselect: "great-wall-mutianyu",
      action: "Reservar la entrada",
    },
    {
      id: "beijing-5-day",
      afterBlockId: "longer-copy",
      kind: "tour",
      tourSlug: "beijing-highlights-5-day-private-tour",
      label: "Si la escala se convierte en parada",
      note: "Cuatro noches en Pekín con desayuno, traslados privados al aeropuerto, tres días de visitas privadas —el Templo del Cielo y el Palacio de Verano, el Pekín imperial y la Gran Muralla— y las entradas para adultos previstas, con guía o sin guía. Con pasaporte mexicano cabe en el tránsito de 240 horas si sale hacia un tercer país o región. Si lo confirma con al menos 8 días de antelación y no conseguimos la reserva de la Ciudad Prohibida o de la plaza de Tiananmén, le devolvemos todo lo que haya pagado.",
      action: "Ver el viaje y el precio",
    },
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: "Puede salir del aeropuerto durante la escala si su pasaporte se lo permite. Sin visa entran hasta 30 días los de España, Argentina, Brasil, Chile, Perú y Uruguay, hasta el 31 de diciembre de 2026, y los de Ecuador; los mexicanos pueden usar el tránsito sin visa de 240 horas si siguen viaje hacia un tercer país o región; los colombianos necesitan visa. Para ver la Gran Muralla en una escala, el tramo que recomendamos es Mutianyu: la entrada general cuesta 40 yuanes, se reserva con pasaporte desde 30 días antes y abre a las 7:30 hasta el 15 de noviembre y a las 8:00 en invierno. Una escala corta no alcanza: Civitatis pide al menos 9 horas de escala incluso para su visita de 5 horas por la ciudad.",
      },
      {
        id: "passport-table",
        type: "table",
        caption: "¿Puedo salir del aeropuerto de Pekín? Comprobado el 19 de octubre de 2026",
        columns: ["Pasaporte", "¿Sin visa?", "Condición"],
        rows: [
          ["España, Argentina, Brasil, Chile, Perú, Uruguay", "Sí, hasta el 31/12/2026", "Exención de 30 días: no hace falta seguir hacia un tercer país"],
          ["Ecuador", "Sí", "Hasta 30 días seguidos, sin fecha de fin"],
          ["México", "Sí, con el tránsito de 240 horas", "Boleto confirmado hacia un tercer país o región distinto del de origen"],
          ["España, Argentina, Brasil y Chile, en 2027 si no hay prórroga", "Sí, con el tránsito de 240 horas", "Las mismas condiciones que México"],
          ["Colombia", "No", "Hace falta visa; el tránsito de 24 horas obliga a quedarse en la zona restringida del aeropuerto"],
        ],
      },
      {
        id: "airports-copy",
        type: "paragraph",
        text: "Los dos aeropuertos de Pekín, Pekín-Capital y Pekín-Daxing, son puertos habilitados para el tránsito de 240 horas. Con el tránsito, avise a la aerolínea al facturar y tenga a mano el boleto de salida: el personal de la aerolínea revisa los documentos antes de embarcar, y la decisión final la toma el control fronterizo al llegar. Todas las condiciones, país por país, están en nuestra guía de China sin visado.",
        link: {
          label: "guía de China sin visado",
          href: "/es/guias/china-sin-visado-2026-2027/",
        },
      },
      { id: "hours-heading", type: "heading", level: 2, text: "Cuántas horas de escala hacen falta" },
      {
        id: "hours-copy",
        type: "paragraph",
        text: "No hay una cifra oficial. Sume el desembarque y el control de entrada, el trayecto hasta Mutianyu y la vuelta, la visita con la lanzadera interna y, si lo usa, el teleférico, y el regreso con margen para facturar y pasar el control de seguridad. Como referencia, Civitatis, que vende una excursión de escala, pide al menos 9 horas para su visita de 5 horas por la ciudad y estar de vuelta en el aeropuerto 2 horas y media antes de la salida. Para la Muralla, piense en una escala larga y de día: si su avión aterriza de noche, el recinto está cerrado.",
      },
      {
        id: "mutianyu-table",
        type: "table",
        caption: "Mutianyu: precios y horarios oficiales (consultados el 11 de octubre de 2026)",
        columns: ["Concepto", "Precio u horario", "Detalle"],
        rows: [
          ["Entrada general", "40 yuanes", "Nominativa, con pasaporte; una por persona y día, con franja horaria"],
          ["Lanzadera interna", "15 yuanes ida y vuelta", "Entre la zona de servicios y la muralla"],
          ["Teleférico", "100 yuanes ida, 140 ida y vuelta", "Ahorra la subida; puede cerrar por el tiempo o por mantenimiento"],
          ["Horario, 16 de marzo–15 de noviembre", "7:30–18:00 entre semana; 7:30–18:30 sábados y domingos", "Compruebe el aviso del recinto antes de salir"],
          ["Horario, 16 de noviembre–15 de marzo", "8:00–17:30", "Con menos horas de luz, la escala tiene que ser de día"],
        ],
      },
      { id: "compare-heading", type: "heading", level: 2, text: "Excursión de escala: qué comparar antes de reservar" },
      {
        id: "compare-table",
        type: "table",
        caption: "Precios y condiciones publicados, consultados el 19 de octubre de 2026",
        columns: ["Punto", "Excursión de escala de Civitatis", "Homeground China"],
        rows: [
          ["Precio publicado", "Desde 346,48 USD", `Coche: presupuesto según el aeropuerto y sus horarios. Guía en inglés: ${guideRate}`],
          ["Entradas", "Aparte: 120, 200 o 300 yuanes por persona según la visita", `Aparte: ${bookingFee} de gestión por persona y lugar, más la entrada oficial, reservada a su nombre`],
          ["Aeropuertos", "Solo Pekín-Capital (PEK)", "Pekín-Capital o Pekín-Daxing"],
          ["Idioma", "Español", "Inglés; también español, con suplemento según ciudad y temporada, que confirmamos en su presupuesto"],
        ],
      },
      { id: "sell-heading", type: "heading", level: 2, text: "Lo que organizamos para su escala" },
      {
        id: "sell-list",
        type: "list",
        items: [
          "Un coche con conductor que le recoge en Pekín-Capital o en Pekín-Daxing, le lleva a la Muralla y le devuelve al aeropuerto.",
          `Un guía en inglés: ${guideRate}.`,
          "Si prefiere la visita en español, hay guía de habla hispana disponible en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto.",
          `Las entradas de Mutianyu a su nombre: ${bookingFee} de gestión por persona, más la entrada oficial.`,
        ],
      },
      {
        id: "sell-copy",
        type: "paragraph",
        text: `En una escala no hay segunda oportunidad: la entrada va con el pasaporte de cada viajero, en una franja horaria concreta, y el teleférico puede cerrar por el tiempo. Por eso conviene tener la entrada antes de volar y el coche esperando a la salida. Si nos encarga las entradas y paga al menos ${leadDays} días antes, la reserva está garantizada; si no la conseguimos, le devolvemos íntegramente la gestión y la entrada. El coche y el guía se presupuestan con los horarios de sus vuelos: envíenoslos desde nuestra página de coche con conductor y le respondemos por escrito en un plazo de 12 horas.`,
        link: {
          label: "página de coche con conductor",
          href: "/es/services/private-car-and-driver/#car-enquiry",
        },
      },
      { id: "longer-heading", type: "heading", level: 2, text: "Si puede quedarse unos días" },
      {
        id: "longer-copy",
        type: "paragraph",
        text: "Una escala da para la Muralla; Pekín pide algo más. Con la exención de 30 días o con el tránsito de 240 horas, una escala puede convertirse en una parada de cuatro o cinco noches: la Ciudad Prohibida, el Templo del Cielo y la Gran Muralla sin mirar el reloj del vuelo.",
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos en español por WhatsApp o por correo con sus vuelos de llegada y salida, el aeropuerto, su nacionalidad y el número de viajeros. Respondemos en un plazo de 12 horas con el presupuesto completo por escrito y le decimos si su escala da para la Muralla. Para reservar se paga un 30 % de depósito con Alipay o con VBill, que acepta tarjetas de América Latina; el resto, al llegar. Somos una agencia de viajes con licencia en Pekín (L-BJ10587). Los guías y los conductores son nuestros, y no hay paradas obligatorias en tiendas: la escala es para la Muralla.",
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas sobre la escala en Pekín",
        items: [
          {
            question: "¿Puedo salir del aeropuerto de Pekín durante una escala?",
            answer: "Sí, si su pasaporte entra sin visa en China (España, Argentina, Brasil, Chile, Perú y Uruguay hasta el 31 de diciembre de 2026, y Ecuador) o puede usar el tránsito de 240 horas, como México. Con pasaporte colombiano hace falta visa.",
          },
          {
            question: "¿Cuántas horas de escala necesito para ir a la Gran Muralla?",
            answer: "No hay cifra oficial. Civitatis pide al menos 9 horas de escala para una visita de 5 horas por la ciudad; para Mutianyu, cuente con una escala larga y de día, dentro del horario del recinto.",
          },
          {
            question: "¿Cuánto cuesta la entrada a Mutianyu?",
            answer: "La entrada general, 40 yuanes; la lanzadera, 15 yuanes ida y vuelta; el teleférico, 100 yuanes de ida o 140 de ida y vuelta. Precios oficiales consultados el 11 de octubre de 2026.",
          },
          {
            question: "¿A qué hora abre la Gran Muralla de Mutianyu?",
            answer: "Del 16 de marzo al 15 de noviembre, de 7:30 a 18:00 entre semana y hasta las 18:30 los fines de semana; del 16 de noviembre al 15 de marzo, de 8:00 a 17:30.",
          },
          {
            question: "¿Los mexicanos pueden salir del aeropuerto de Pekín sin visa?",
            answer: "Sí, con el tránsito de 240 horas, si tienen un boleto confirmado hacia un tercer país o región distinto del de origen. Si vuelven a México, necesitan visa.",
          },
          {
            question: "¿Cuánto cuesta un guía en Pekín?",
            answer: `En inglés, ${guideRate}. Si prefiere un guía en su idioma, hay guía de habla hispana disponible, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto.`,
          },
        ],
      },
      {
        id: "next-links",
        type: "internal-links",
        title: "Siga preparando el viaje",
        items: [
          {
            label: "La Gran Muralla desde Pekín",
            href: "/es/guias/muralla-china-desde-pekin/",
            description: "Mutianyu, Badaling, Jinshanling o Simatai: cuál elegir.",
          },
          {
            label: "China sin visado 2026–2027",
            href: "/es/guias/china-sin-visado-2026-2027/",
            description: "Quién entra sin visa, hasta cuándo y el tránsito de 240 horas.",
          },
          {
            label: "Visa para China desde México",
            href: "/es/guias/visa-china-mexicanos/",
            description: "La visa de turista y el tránsito de 240 horas, paso a paso.",
          },
          {
            label: "Dónde alojarse en Pekín",
            href: "/es/guias/donde-alojarse-en-pekin/",
            description: "Si la escala se convierte en parada.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes",
        items: [
          {
            label: "Visa-Free Transit Policies: los 57 países del tránsito de 240 horas y la regla de 24 horas (en inglés)",
            url: "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
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
            label: "Aviso sobre la prórroga de la exención unilateral de visado hasta el 31 de diciembre de 2026 (3 de noviembre de 2025)",
            url: "https://bio.visaforchina.cn/BRN4_ZH/tongzhigonggao/552376593302032425.html",
            publisher: "Departamento Consular del Ministerio de Asuntos Exteriores de China",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Mutianyu: precios, reserva con pasaporte y horarios (consultado el 11 de octubre de 2026)",
            url: "https://www.mutianyugreatwall.com/cnInformation",
            publisher: "Gran Muralla de Mutianyu",
            reviewedAt: "2026-10-11",
          },
          {
            label: "¿Escala en Pekín? Tour privado desde el aeropuerto: precio, entradas no incluidas y escala mínima",
            url: "https://www.civitatis.com/mx/pekin/escala-pekin/",
            publisher: "Civitatis",
            reviewedAt: "2026-10-19",
          },
        ],
      },
    ],
  },
};
