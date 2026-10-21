import type { SpanishGuide } from "../spanishGuideTypes";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { spanishTourName, spanishTourPrice as price } from "../spanishGuidePrices.ts";

const beijing5 = "beijing-highlights-5-day-private-tour";
const classic8 = "beijing-xian-shanghai-8-day-private-tour";
const classic10 = "beijing-xian-guilin-shanghai-10-day-private-tour";
const jiangnan11 = "beijing-hangzhou-suzhou-shanghai-11-day-private-tour";
const classic12 = "beijing-xian-shanghai-12-day-private-tour";
const pandas14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";
const avatar14 = "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour";
const yangtze17 = "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour";
const grand21 = "china-grand-tour-21-day-private-tour";
const group14 = "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour";

/** One table row per published tour: name, days and the price per person for 2, 4 and 6 travellers. */
const tableTours = [
  [beijing5, "english-guided"],
  [classic8],
  [classic10],
  [jiangnan11],
  [classic12],
  [pandas14],
  [avatar14],
  [yangtze17],
  [grand21],
] as const;

export const precioViajeAChina: SpanishGuide = {
  slug: "precio-viaje-a-china",
  title: "Cuánto cuesta un viaje a China en 2026: precios reales",
  headline: "Cuánto cuesta un viaje a China en 2026: precios reales por persona (10, 14 y 21 días)",
  description:
    `Precios de un viaje a China de 10, 14 y 21 días: 10 días desde ${price(classic10, 2)} por persona para dos y ${price(classic10, 6)} para seis. Qué incluye y por qué el vuelo va aparte.`,
  navTitle: "Precio de un viaje a China",
  heroImage: {
    src: "/images/tours/beijing-highlights-5-day-private-tour/departure-beijing-layers-1600.webp",
    width: 1600,
    height: 1000,
    alt: "Tejados amarillos de la Ciudad Prohibida con los rascacielos del centro de negocios de Pekín al fondo",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [classic10, pandas14, avatar14, grand21, classic8, beijing5],
  offers: [
    {
      id: "ten-days",
      afterBlockId: "group-size",
      kind: "tour",
      tourSlug: classic10,
      label: "China en 10 días, con precio cerrado",
      note: "La primera vez en China, sin prisas de circuito: la Gran Muralla, los Guerreros de Terracota, el río Li y Shanghái, con guía y coche solo para su grupo. Incluye nueve noches en hoteles de nivel cuatro estrellas (4 diamantes en Trip.com/Ctrip) con desayuno, las entradas indicadas, el barco del río Li, un tren de alta velocidad y dos vuelos internos. No hay paradas en tiendas. ¿Alguien del grupo no habla inglés? En todas las ciudades hay guía de habla hispana, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto.",
      action: "Ver el itinerario de 10 días",
    },
    {
      id: "fourteen-days",
      afterBlockId: "included",
      kind: "tour",
      tourSlug: pandas14,
      label: "Dos semanas: Pekín, Xi’an, pandas, Guilin y Shanghái",
      note: "Dos semanas para ver lo esencial sin correr: cuatro noches en Pekín, un día entero para los Guerreros de Terracota, los pandas de Chengdu a primera hora, el río Li y Shanghái. Trece noches de hotel con desayuno, dos trenes y dos vuelos internos incluidos.",
      action: "Ver el itinerario de 14 días",
    },
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: `Nuestro viaje privado de 10 días por China cuesta ${price(classic10, 2)} por persona si viajan dos, ${price(classic10, 4)} si son cuatro y ${price(classic10, 6)} si son seis. Uno de 14 días por Pekín, Xi’an, Chengdu, Guilin y Shanghái cuesta ${price(pandas14, 2)}, ${price(pandas14, 4)} y ${price(pandas14, 6)} por persona, y el gran viaje de 21 días, ${price(grand21, 2)}, ${price(grand21, 4)} y ${price(grand21, 6)}. Son nuestros precios publicados el 19 de octubre de 2026, por persona y compartiendo habitación doble con dos camas. Incluyen hoteles con desayuno, guía y vehículo privados los días de visita, traslados, entradas indicadas, y los trenes y vuelos dentro de China. No incluyen el vuelo internacional de ida y vuelta, ni almuerzos y cenas, ni el seguro de viaje. Como referencia, un circuito en grupo con vuelo incluido parte de 2099 € en 9 días desde España (Logitravel) o de 1599 USD más 999 USD de impuestos en 10 días desde México (Mega Travel), según sus webs el 19 de octubre de 2026.`,
      },
      { id: "table-heading", type: "heading", level: 2, text: "Precio por persona según los días y cuántos viajan" },
      {
        id: "price-table",
        type: "table",
        caption: "Precio por persona en dólares (USD), en habitación doble con dos camas y sin vuelo internacional. Revisado el 19 de octubre de 2026.",
        columns: ["Viaje privado", "Días", "2 viajeros", "4 viajeros", "6 viajeros"],
        rows: tableTours.map(([slug, packageId]) => {
          const tour = spanishTourName(slug);
          return [tour.title, String(tour.days), price(slug, 2, packageId), price(slug, 4, packageId), price(slug, 6, packageId)];
        }),
        rowLinks: tableTours.map(([slug]) => spanishTourName(slug).path),
      },
      {
        id: "group-size",
        type: "paragraph",
        text: "El precio por persona baja cuantos más viajan porque el guía, el conductor y el vehículo se pagan por grupo, no por persona: entre seis, cada uno paga una sexta parte. El hotel, las entradas y los trenes, en cambio, cuestan lo mismo por cabeza. Por eso la diferencia es mayor en los viajes con más días de visita guiada.",
      },
      { id: "included-heading", type: "heading", level: 2, text: "Qué incluye el precio y qué no" },
      {
        id: "included",
        type: "comparison",
        title: "En los viajes de 10 y 14 días",
        columns: [
          {
            heading: "Incluido",
            items: [
              "Hoteles de cuatro estrellas (4 diamantes en Trip.com, también llamado Ctrip) con desayuno, en habitación doble con dos camas",
              "Guía local privado de habla inglesa y vehículo solo para su grupo los días de visita",
              "Recogida y traslado al aeropuerto o la estación en cada ciudad",
              "Las entradas indicadas en el programa, también la de la Ciudad Prohibida, reservada a nombre de cada viajero",
              "Los trenes de alta velocidad en segunda clase y los vuelos internos en clase turista",
              "Ninguna parada en tiendas, fábricas ni talleres",
            ],
          },
          {
            heading: "No incluido",
            items: [
              "El vuelo internacional de ida y vuelta a China",
              "Almuerzos, cenas y bebidas",
              "Seguro de viaje, visado, propinas y gastos personales",
              "Suplemento por habitación individual y suplementos en festivos chinos",
            ],
          },
        ],
      },
      {
        id: "all-inclusive",
        type: "callout",
        tone: "warning",
        title: "«Todo incluido» no siempre incluye el avión",
        body: "En España y en Latinoamérica, muchos viajeros entienden que un viaje «todo incluido» lleva el vuelo desde su país. En nuestros precios no está: usted compra el vuelo internacional con la aerolínea y desde la ciudad que prefiera, y nosotros nos ocupamos de todo lo que pasa dentro de China. Para comparar con un circuito que sí lleva avión, sume el precio de su vuelo de ida y vuelta.",
      },
      { id: "compare-heading", type: "heading", level: 2, text: "Comparado con un circuito organizado desde España o México" },
      {
        id: "compare-copy",
        type: "paragraph",
        text: "Los dos circuitos que hemos revisado incluyen el vuelo internacional; nuestro viaje privado no. Para comparar el total, sume ese vuelo a nuestro precio. Estos son los datos que cada agencia publicaba el 19 de octubre de 2026:",
      },
      {
        id: "compare-table",
        type: "table",
        caption: "Datos publicados en la web de cada agencia, consultados el 19 de octubre de 2026. Un guion (—) indica un dato que no hemos podido comprobar en su web.",
        columns: ["Dato", "Logitravel (España): Pekín, Xian y Shanghái, 9 días", "Mega Travel (México): Mega China, 10 días", "Homeground: Pekín, Xi’an, Guilin y Shanghái, 10 días"],
        rows: [
          ["Precio por persona", "Desde 2099 €", "Desde 1599 USD, más 999 USD de impuestos", `${price(classic10, 2)} con dos viajeros; ${price(classic10, 6)} con seis`],
          ["Vuelo internacional", "Incluido, ida y vuelta desde España", "Incluido, México–Pekín–México", "No incluido"],
          ["Visitas", "«En tour regular», es decir, con otros viajeros", "—", "Solo su grupo, en las fechas que usted elija"],
          ["Tiendas y talleres", "«Paradas técnicas y culturales en talleres de productos locales»", "—", "Ninguna parada en tiendas"],
          ["Ciudad Prohibida", "«Podría sustituirse por otra visita de manera excepcional»", "—", "Si reserva el viaje y nos envía los pasaportes al menos 8 días antes de la visita y no conseguimos la entrada, le devolvemos todo lo pagado"],
          ["Idioma del guía", "Español", "Español", "Inglés; en español, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto"],
          ["Propinas", "No incluidas; sugieren unos 50 yuanes por persona y día", "No incluidas: 6 USD por pasajero y día", "No incluidas"],
        ],
      },
      {
        id: "compare-meaning",
        type: "paragraph",
        text: `¿Qué ofrece nuestro viaje privado? Tres cosas, y las tres por escrito. Ninguna parada en tiendas ni talleres: ningún día se recorta para pasar por un taller. La Ciudad Prohibida, reservada a nombre de cada viajero: si reserva el viaje y nos envía los pasaportes al menos 8 días antes de la visita y no la conseguimos, le devolvemos todo lo pagado. Y un guía y un coche que esperan a su grupo, no a un autobús. Con seis viajeros, el viaje de 10 días cuesta ${price(classic10, 6)} por persona.`,
      },
      {
        id: "small-group",
        type: "paragraph",
        text: `¿Prefiere pagar menos y viajar con otros? Nuestro grupo reducido de 14 días sale en cuatro fechas fijas de 2027 (10 de abril, 8 de mayo, 11 de septiembre y 9 de octubre), nunca con más de 12 viajeros, desde ${price(group14, 2)} por persona y sin paradas en tiendas. La salida se confirma con 8 reservas; para reservar basta con el 10 %.`,
        link: { label: "Nuestro grupo reducido de 14 días", href: spanishTourName(group14).path },
      },
      { id: "when-heading", type: "heading", level: 2, text: "Por qué no conviene dejarlo para el final" },
      {
        id: "when-tickets",
        type: "paragraph",
        text: "Lo que más condiciona un viaje a China no es el precio del hotel, sino las entradas con nombre. La Ciudad Prohibida no vende entradas para el mismo día: salen a las 20:00 de Pekín, siete días antes de la visita, una por pasaporte, y después de pagar no se corrige ni una letra. El 1 de octubre de 2025, primer día de la Semana Dorada china, el sistema de reservas del museo ya mostraba completos todos los días del 2 al 7 de octubre, según el diario económico Yicai. Por eso nuestra garantía tiene fecha límite: si reserva el viaje y nos envía los pasaportes al menos 8 días antes de la visita y no conseguimos la Ciudad Prohibida o Tiananmén, le devolvemos todo lo pagado. Con menos margen lo seguimos intentando, pero ya no podemos garantizarlo. Y si prefiere el grupo reducido, cada salida de 2027 se cierra al llegar a 12 viajeros.",
      },
      {
        id: "when-visa",
        type: "paragraph",
        text: "El visado también cuenta. Los ciudadanos de España, Argentina, Chile, Perú, Uruguay y Brasil pueden entrar en China sin visado hasta 30 días, por turismo o negocios, según el aviso del Ministerio de Asuntos Exteriores chino del 3 de noviembre de 2025, que fija esa medida hasta el 31 de diciembre de 2026. Ecuador tiene un acuerdo bilateral de exención de visados. Los mexicanos necesitan visado; el tránsito sin visado de 240 horas solo les sirve si continúan viaje a un tercer país (por ejemplo, México–Pekín–Tokio), no en un viaje de ida y vuelta México–China–México. Los colombianos necesitan visado y no pueden usar ese tránsito.",
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos por WhatsApp o por correo con sus fechas, cuántas personas viajan y el viaje que le interesa. Respondemos en un plazo de 12 horas con el presupuesto completo por escrito, y el mismo planificador le atiende de principio a fin: desde esa primera respuesta hasta el último día del viaje. Para reservar se paga un 30 % de depósito mediante un enlace de pago seguro de VBill, que acepta tarjetas de América Latina, y el resto al llegar a China. Si reserva el viaje y nos envía los pasaportes al menos 8 días antes de la visita y no conseguimos la Ciudad Prohibida o Tiananmén, le devolvemos todo lo pagado. Somos una agencia de viajes con licencia en Pekín (L-BJ10587); los guías y los conductores son nuestros, y no paramos en tiendas. Nuestros guías hablan inglés; si prefiere el viaje en español, hay guía de habla hispana en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto.",
      },
      {
        id: "custom",
        type: "paragraph",
        text: "¿Ninguna ruta encaja con sus días o su presupuesto? Cuéntenos cuántas personas viajan, cuántos días tiene y qué le gustaría ver, y le preparamos un viaje a medida, con el precio cerrado por escrito antes de pagar.",
        link: { label: "le preparamos un viaje a medida", href: "/es/services/full-trip-support/" },
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas frecuentes sobre el precio",
        items: [
          {
            question: "¿Cuánto cuesta un viaje a China de 10 días?",
            answer: `Nuestro viaje privado de 10 días por Pekín, Xi’an, Guilin y Shanghái cuesta ${price(classic10, 2)} por persona para dos viajeros, ${price(classic10, 4)} para cuatro y ${price(classic10, 6)} para seis, en habitación doble con dos camas. Incluye nueve noches de hotel con desayuno, guía y vehículo privados los días de visita, entradas, el barco del río Li, un tren y dos vuelos internos. El vuelo internacional va aparte.`,
          },
          {
            question: "¿Cuánto cuesta un viaje a China de 14 días?",
            answer: `Para dos viajeros, ${price(pandas14, 2)} por persona en la ruta con los pandas de Chengdu y ${price(avatar14, 2)} en la ruta con las montañas de Zhangjiajie. Con seis viajeros baja a ${price(pandas14, 6)} y ${price(avatar14, 6)}. En grupo reducido de 8 a 12 personas, en las salidas de 2027, cuesta desde ${price(group14, 2)} por persona.`,
          },
          {
            question: "¿Cuánto cuesta un viaje a China de 21 días?",
            answer: `El gran viaje privado de 21 días, con Pekín, Xi’an, los pandas, el río Li, Zhangjiajie y tres noches de crucero por el Yangtsé, cuesta ${price(grand21, 2)} por persona para dos viajeros, ${price(grand21, 4)} para cuatro y ${price(grand21, 6)} para seis, sin el vuelo internacional.`,
          },
          {
            question: "¿El precio incluye el vuelo desde España o desde México?",
            answer: "No. Nuestros precios empiezan y terminan en China: usted compra el vuelo internacional y nosotros organizamos hoteles, guías, coches, entradas, trenes y vuelos internos. Así puede salir de su ciudad, usar sus millas o combinar China con otro país.",
          },
          {
            question: "¿Por qué sale más barato por persona cuantos más viajamos?",
            answer: "Porque el guía, el conductor y el vehículo se pagan por grupo. Con seis viajeros se reparten entre seis; el hotel, las entradas y los trenes cuestan lo mismo por persona.",
          },
          {
            question: "¿Cuánto cuesta un guía que hable español?",
            answer: "Nuestros precios publicados llevan guía de habla inglesa. En todas las ciudades hay guía de habla hispana, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto antes de que pague.",
          },
          {
            question: "¿Hay que pagar todo por adelantado?",
            answer: "No. Para reservar se paga un 30 % de depósito mediante un enlace de pago seguro de VBill, que acepta tarjetas de América Latina, y el resto al llegar a China. Antes de pagar recibe por escrito los hoteles, los trenes, los vuelos internos y el total.",
          },
          {
            question: "¿En qué moneda están los precios?",
            answer: "Los publicamos en dólares estadounidenses (USD), por persona. El importe final de su viaje se confirma por escrito antes del pago.",
          },
        ],
      },
      {
        id: "next-links",
        type: "internal-links",
        title: "Siga preparando el viaje",
        items: [
          {
            label: "Todos los viajes con precio publicado",
            href: "/es/tours/",
            description: "Rutas de 4 a 21 días, con el precio por persona de cada una.",
          },
          {
            label: "Visado para China desde España",
            href: "/es/guias/visado-china-espanoles/",
            description: "Entrada sin visado hasta 30 días y qué documentos llevar.",
          },
          {
            label: "Entradas de la Ciudad Prohibida para extranjeros",
            href: "/es/guias/forbidden-city-for-foreign-visitors/",
            description: "Cómo se reserva con pasaporte y cuándo salen las entradas.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes",
        items: [
          {
            label: "Logitravel: circuito «Pekín, Xian y Shanghái en tren y avión», 9 días (precio, vuelo, talleres, Ciudad Prohibida y propinas)",
            url: "https://www.logitravel.com/grandes-viajes/asia/china/circuitos/circuito-clasico/china-pekin-xian-shanghai-en-tren-y-avion-9-dias.html",
            publisher: "Logitravel",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Mega Travel: «Mega China», 10 días (precio, impuestos, vuelo, guías y propinas)",
            url: "https://www.megatravel.com.mx/viaje/mega-china-30023.html",
            publisher: "Mega Travel",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Museo del Palacio: el 1 de octubre de 2025, todos los días del 2 al 7 de octubre ya estaban reservados",
            url: "https://www.yicai.com/news/102851899.html",
            publisher: "Yicai",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Aviso sobre la exención de visado para ciudadanos de varios países, prorrogada hasta el 31 de diciembre de 2026",
            url: "https://bio.visaforchina.cn/BRN4_ZH/tongzhigonggao/552376593302032425.html",
            publisher: "Centro de Solicitud de Visados de China, aviso del Ministerio de Asuntos Exteriores",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Tránsito sin visado de 240 horas: países y requisitos",
            url: "https://www.nia.gov.cn/n741440/n741577/c1731205/content.html",
            publisher: "Administración Nacional de Inmigración de China",
            reviewedAt: "2026-10-19",
          },
        ],
      },
    ],
  },
};
