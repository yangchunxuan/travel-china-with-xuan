import type { SpanishGuide } from "../spanishGuideTypes";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { homegroundBusiness as business } from "../homegroundBusiness.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { spanishTourPrice as price } from "../spanishGuidePrices.ts";

const classic10 = "beijing-xian-guilin-shanghai-10-day-private-tour";
const beijing5 = "beijing-highlights-5-day-private-tour";

export const comoElegirAgenciaViajeChina: SpanishGuide = {
  slug: "como-elegir-agencia-viaje-china",
  title: "Cómo elegir agencia para viajar a China: 7 comprobaciones",
  headline: "Cómo elegir agencia para viajar a China: siete comprobaciones antes de pagar",
  description:
    "Licencia de agencia de viajes, registro de la empresa, precios publicados, tiendas por escrito y cómo pagar: cómo comprobar una agencia en China antes de enviarle dinero.",
  navTitle: "Cómo elegir agencia",
  heroImage: {
    src: "/images/tours/beijing-highlights-5-day-private-tour/forbidden-city-corridor-1600.webp",
    width: 1600,
    height: 1000,
    alt: "Vigas pintadas en azul, verde y rojo sobre un corredor de columnas rojas en la Ciudad Prohibida",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [classic10, beijing5, "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"],
  offers: [
    {
      id: "start-small",
      afterBlockId: "our-data",
      kind: "attraction-reservation",
      title: "Pruébenos con algo pequeño",
      body: "Si todavía no se fía de ninguna agencia, empiece por un encargo pequeño: la entrada de la Ciudad Prohibida o la de los Guerreros de Terracota, reservada a su nombre en el sistema oficial de cada lugar. Paga solo cuando ha aceptado por escrito el total; después recibe el justificante de cada reserva y las instrucciones para el día de la visita. Así verá cómo trabajamos antes de confiarnos el viaje entero.",
      attractionIds: ["forbidden-city", "terracotta-warriors", "chengdu-panda-base", "great-wall-mutianyu"],
      preselect: "forbidden-city",
      action: "Encargar una entrada",
    },
    {
      id: "ten-days",
      afterBlockId: "our-promise",
      kind: "tour",
      tourSlug: classic10,
      label: "Un viaje con precio publicado y licencia a la vista",
      note: "Lo que ve es lo que paga: hoteles, guía y coche privados, entradas, un tren y dos vuelos internos, con el precio por persona publicado para 2, 4 y 6 viajeros y ninguna parada en tiendas.",
      action: "Ver el viaje de 10 días",
    },
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: "Si contrata directamente con una agencia en China, esa agencia debe tener una licencia de agencia de viajes china, con un número propio, emitida por la autoridad de turismo de su provincia o municipio, y estar registrada como empresa con un código de crédito social de 18 caracteres. Las dos cosas se comprueban en webs oficiales chinas. Además, pida tres cosas por escrito antes de pagar: el precio total y lo que incluye, que no habrá paradas en tiendas, y quién le cobra. Si una agencia no le da su número de licencia ni el nombre registrado de la empresa, no le envíe dinero.",
      },
      { id: "checks-heading", type: "heading", level: 2, text: "Siete comprobaciones antes de pagar" },
      {
        id: "checks",
        type: "list",
        ordered: true,
        items: [
          "Número de licencia de agencia de viajes. Pídalo y compruebe que figura en la web de la empresa, no solo en un mensaje.",
          "Nombre registrado en chino y código de crédito social. Son los datos con los que se busca la empresa en los registros oficiales; un nombre comercial en inglés o en español no basta.",
          "Ámbito de la licencia. Una agencia que recibe a viajeros extranjeros debe tener el turismo receptivo (入境旅游业务) en su licencia.",
          "Precios publicados. Una agencia que publica cuánto cuesta cada viaje por persona, y qué incluye, se compromete antes de saber quién es usted.",
          "Tiendas, por escrito. Pregunte si hay paradas en tiendas, fábricas o talleres, y pida la respuesta por escrito.",
          "Quién le cobra y cuánto por adelantado. El presupuesto debe decir el total, el depósito y cuándo se paga el resto.",
          "Cuándo le piden el pasaporte. Para presupuestar bastan las fechas y el número de viajeros; los datos del pasaporte se piden al confirmar.",
        ],
      },
      { id: "verify-heading", type: "heading", level: 2, text: "Dónde se comprueba una agencia china" },
      {
        id: "verify-table",
        type: "table",
        caption: "Registros oficiales chinos; las dos webs están en chino",
        columns: ["Qué comprobar", "Dónde", "Cómo"],
        rows: [
          ["Licencia de agencia de viajes", "Ministerio de Cultura y Turismo de China", "Busque el nombre registrado en chino de la agencia y compare el número de licencia"],
          ["Registro de la empresa", "Sistema Nacional de Información Crediticia Empresarial", "Busque el código de crédito social de 18 caracteres y compare el nombre y el estado de la empresa"],
        ],
      },
      { id: "law-heading", type: "heading", level: 2, text: "Lo que dice la ley china sobre las tiendas" },
      {
        id: "law",
        type: "paragraph",
        text: "La Ley de Turismo de China, en su artículo 35, prohíbe a las agencias organizar viajes a precios irrazonablemente bajos para luego obtener comisiones con compras, y les prohíbe fijar tiendas concretas o actividades de pago extra, salvo que se acuerde con el viajero o este lo pida. Si se incumple, el viajero puede pedir, en los 30 días siguientes al final del viaje, que la agencia tramite la devolución de lo comprado y adelante el dinero. Por eso conviene que el «sin tiendas» esté por escrito.",
      },
      {
        id: "red-flags",
        type: "callout",
        tone: "warning",
        title: "Señales para desconfiar",
        body: "Una agencia que no da su número de licencia ni el nombre registrado de la empresa. Un precio muy por debajo de los demás: hay viajeros que cuentan excursiones de un día por menos de 100 yuanes que acabaron en tiendas de jade. Una petición de pago total por adelantado sin presupuesto escrito. Y, sin ser prueba de nada, una web que no publica ningún precio le obliga a aceptar un presupuesto sin referencia para comparar.",
      },
      { id: "us-heading", type: "heading", level: 2, text: "Nuestros datos, para que nos compruebe" },
      {
        id: "our-checks",
        type: "paragraph",
        text: "Con nosotros, las siete comprobaciones tienen respuesta en esta página: licencia L-BJ10587, nombre registrado y código de crédito social en la tabla de abajo, turismo receptivo en el ámbito de la licencia, precios publicados por persona, ninguna parada en tiendas por escrito, 30 % de depósito y el resto al llegar, y los pasaportes solo al confirmar.",
      },
      {
        id: "our-data",
        type: "table",
        caption: "Datos de Homeground China; las copias de la licencia están en nuestra página de información de la empresa",
        columns: ["Dato", "Homeground China"],
        rows: [
          ["Empresa (nombre registrado)", business.registeredName],
          ["Código de crédito social", business.unifiedSocialCreditCode],
          ["Licencia de agencia de viajes", business.travelAgencyLicenceNumber],
          ["Emitida por", `${business.travelAgencyLicenceAuthority} (Oficina Municipal de Cultura y Turismo de Pekín)`],
          ["Ámbito de la licencia", `${business.licensedBusinessScope} (turismo nacional y receptivo)`],
        ],
      },
      {
        id: "no-last-week",
        type: "paragraph",
        text: "Y no deje la prueba para la última semana. La Ciudad Prohibida abre la venta siete días antes, a las 20:00 de Pekín, y no vende entradas para el mismo día; el 1 de octubre de 2025, primer día de la Semana Dorada china, su sistema de reservas ya mostraba completos todos los días del 2 al 7, según el diario económico Yicai. Para garantizarle la reserva necesitamos su encargo y el pago al menos 8 días antes de la visita.",
      },
      {
        id: "our-docs",
        type: "paragraph",
        text: "Las copias de nuestra licencia de agencia de viajes y de la licencia comercial, con los enlaces a los dos registros oficiales, están en nuestra página de información de la empresa.",
        link: { label: "información de la empresa", href: "/es/business-information/" },
      },
      {
        id: "our-promise",
        type: "paragraph",
        text: `Y lo demás, también por escrito. Publicamos el precio por persona de cada viaje: por ejemplo, ${price(classic10, 2)} por persona para dos viajeros en 10 días por Pekín, Xi’an, Guilin y Shanghái, o ${price(classic10, 6)} si son seis. Antes de pagar recibe el presupuesto completo por escrito. Para reservar un viaje se paga un 30 % de depósito con Alipay o con VBill, que acepta tarjetas de América Latina, y el resto al llegar a China. El mismo planificador le atiende de principio a fin, los guías y los conductores son nuestros, y no paramos en tiendas.`,
      },
      {
        id: "products",
        type: "paragraph",
        text: "Puede encargarnos un viaje entero o solo una parte: un viaje privado con precio publicado, un viaje a medida, las entradas con nombre, o un coche con conductor en cualquier ciudad de China continental.",
        link: { label: "un viaje a medida", href: "/es/services/full-trip-support/" },
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos por WhatsApp o por correo con sus fechas, cuántas personas viajan y qué le interesa; no nos mande todavía los pasaportes. Respondemos en un plazo de 12 horas con el presupuesto completo por escrito. Para reservar un viaje se paga un 30 % de depósito con Alipay o con VBill, que acepta tarjetas de América Latina, y el resto al llegar a China; las entradas sueltas se pagan al aceptar el presupuesto. Si reserva el viaje y nos envía los pasaportes al menos 8 días antes de la visita y no conseguimos la Ciudad Prohibida o Tiananmén, le devolvemos todo lo pagado. Nuestros guías hablan inglés; si prefiere el viaje en español, hay guía de habla hispana en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto.",
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas frecuentes",
        items: [
          {
            question: "¿Cómo sé si una agencia de viajes china es real?",
            answer: "Pida su número de licencia de agencia de viajes, su nombre registrado en chino y su código de crédito social. Busque la licencia en la web del Ministerio de Cultura y Turismo de China y la empresa en el Sistema Nacional de Información Crediticia Empresarial. Los nombres y los números deben coincidir.",
          },
          {
            question: "¿Qué licencia necesita una agencia para recibir turistas extranjeros en China?",
            answer: "Una licencia de agencia de viajes china cuyo ámbito incluya el turismo receptivo (入境旅游业务). La nuestra es la L-BJ10587, emitida por la Oficina Municipal de Cultura y Turismo de Pekín, para turismo nacional y receptivo.",
          },
          {
            question: "¿Es legal que un viaje organizado pare en tiendas?",
            answer: "La Ley de Turismo de China prohíbe a las agencias fijar tiendas concretas, salvo que se acuerde con el viajero o este lo pida. Pida por escrito si su viaje tiene paradas en tiendas o talleres.",
          },
          {
            question: "¿Es seguro pagar un depósito a una agencia en China?",
            answer: "Pague solo con un presupuesto escrito que indique el total, el depósito y el resto, y después de comprobar la licencia y el registro de la empresa. Con nosotros se paga un 30 % de depósito con Alipay o con VBill, y el resto al llegar a China.",
          },
          {
            question: "¿Cuándo debo dar los datos del pasaporte?",
            answer: "Al confirmar la reserva, no en el primer mensaje. Para presupuestar bastan las fechas y el número de viajeros.",
          },
        ],
      },
      {
        id: "next-links",
        type: "internal-links",
        title: "Siga comparando",
        items: [
          {
            label: "Información de la empresa y copias de la licencia",
            href: "/es/business-information/",
            description: "Registro, licencia y enlaces a los registros oficiales.",
          },
          {
            label: "Cuánto cuesta un viaje a China en 2026",
            href: "/es/guias/precio-viaje-a-china/",
            description: "Precios por persona publicados y comparación con circuitos.",
          },
          {
            label: "¿China por libre, viaje organizado o a medida?",
            href: "/es/guias/china-por-libre-o-viaje-organizado/",
            description: "Lo que cuesta y lo que resuelve cada opción.",
          },
          {
            label: "Todos los viajes con precio publicado",
            href: "/es/tours/",
            description: "Rutas privadas de 4 a 21 días.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes",
        items: [
          {
            label: "Ley de Turismo de la República Popular China, artículo 35",
            url: "https://www.gov.cn/flfg/2013-04/25/content_2390945.htm",
            publisher: "Gobierno central de China",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Museo del Palacio: el 1 de octubre de 2025, todos los días del 2 al 7 de octubre ya estaban reservados",
            url: "https://www.yicai.com/news/102851899.html",
            publisher: "Yicai",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Consulta de licencias de agencias de viajes",
            url: business.travelAgencyRegistryUrl,
            publisher: "Ministerio de Cultura y Turismo de China",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Sistema Nacional de Información Crediticia Empresarial",
            url: business.registryUrl,
            publisher: "Administración Estatal de Regulación del Mercado de China",
            reviewedAt: "2026-10-19",
          },
        ],
      },
    ],
  },
};
