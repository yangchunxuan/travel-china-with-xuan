// @ts-ignore Source-TypeScript tests require the explicit extension.
import { getSpanishTourCatalog } from "../spanishTourCatalog.ts";
import type { SpanishGuide } from "../spanishGuideTypes";

/** Pesos per US dollar, as published in the Diario Oficial de la Federación on this date. */
const PESOS_PER_DOLLAR = 18.493;
const RATE_DATE = "19 de octubre de 2026";

const tours = getSpanishTourCatalog();

/** The published per-person price for 2 and for 6 travellers, read from the tour's own price table. */
function published(slug: string) {
  const tour = tours.find((candidate) => candidate.slug === slug);
  const pkg = tour?.packages.find((candidate) => candidate.rows.length > 0 && candidate.guideMode !== "self-guided");
  if (!tour || !pkg) throw new Error(`viajar-a-china-desde-mexico: no published price for ${slug}`);
  const two = pkg.rows.find((row) => row.travelers === 2) ?? pkg.rows[0];
  const six = pkg.rows.find((row) => row.travelers === 6);
  return { title: tour.title, two: two.amount, six: six?.amount };
}

const pesos = (dollars: number) =>
  `unos ${new Intl.NumberFormat("es-MX").format(Math.round((dollars * PESOS_PER_DOLLAR) / 100) * 100)} pesos`;

const priceRow = (slug: string) => {
  const price = published(slug);
  return [price.title, `${price.two} USD`, pesos(price.two), price.six ? `${price.six} USD` : "Precio por plaza"];
};

/** A small-group departure is sold per place, at one price whatever the size of the reader's party. */
const smallGroupRow = (slug: string) => {
  const price = published(slug);
  return [`${price.title}, salidas fijas de 2027`, `${price.two} USD por plaza en habitación doble`, pesos(price.two), "El mismo precio por plaza"];
};

const eightDay = published("beijing-xian-shanghai-8-day-private-tour");

export const viajarAChinaDesdeMexico: SpanishGuide = {
  slug: "viajar-a-china-desde-mexico",
  title: "Viajar a China desde México: precios en pesos y tránsito 240 h",
  headline: "Viajar a China desde México: cuánto cuesta en pesos, el vuelo directo a Shenzhen y el tránsito de 240 horas",
  description:
    "Precios publicados en dólares y su equivalente aproximado en pesos, el vuelo de China Southern de Ciudad de México a Shenzhen y qué viajes caben en el tránsito sin visa de 240 horas.",
  navTitle: "Viajar a China desde México",
  heroImage: {
    src: "/images/tours/shenzhen-family-tech-4-day-private-tour/hero.webp",
    width: 1600,
    height: 1200,
    alt: "Rascacielos de Futian en Shenzhen",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [
    "beijing-xian-shanghai-8-day-private-tour",
    "shenzhen-family-tech-4-day-private-tour",
    "guangzhou-shunde-foshan-5-day-private-tour",
    "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
  ],
  offers: [
    {
      id: "classic-8-day",
      afterBlockId: "sell-copy",
      kind: "tour",
      tourSlug: "beijing-xian-shanghai-8-day-private-tour",
      label: "Su primer viaje a China, dentro de las 240 horas",
      note: "Pekín, Xi'an y Shanghái en 8 días: la Ciudad Prohibida, la Gran Muralla en Mutianyu y los Guerreros de Terracota. Incluye siete noches en hoteles de nivel cuatro estrellas con desayuno, guía y vehículo solo para su grupo los días de visita, las entradas principales, el tren a Xi'an y el vuelo a Shanghái. Aparte van los vuelos internacionales, los almuerzos y las cenas; si llega a Shenzhen en el vuelo de China Southern, tampoco incluye el vuelo de Shenzhen a Pekín. Con pasaporte mexicano cabe en el tránsito sin visa si sale de Shanghái hacia un tercer país o región; para volver directo a México, pida la visa. Si confirma el viaje con al menos 8 días de antelación y no conseguimos la reserva de la Ciudad Prohibida o de la plaza de Tiananmén, le devolvemos todo lo que haya pagado.",
      action: "Ver el itinerario y el precio",
    },
    {
      id: "shenzhen-4-day",
      afterBlockId: "sell-copy",
      kind: "tour",
      tourSlug: "shenzhen-family-tech-4-day-private-tour",
      label: "Aterrice en Shenzhen y empiece ahí",
      note: "Si llega en el vuelo de China Southern, Shenzhen es la primera parada natural: tres noches con desayuno en un mismo hotel, el Museo de Ciencia y Tecnología, Huaqiangbei y una tarde a su elección, con guía en inglés, conductor y vehículo privados y las entradas indicadas los días 2 y 3. Aparte van los vuelos, los almuerzos y las cenas. Shenzhen está dentro de las zonas del tránsito de 240 horas, y Hong Kong, al otro lado de la frontera, cuenta como región de destino.",
      action: "Ver el viaje y el precio",
    },
    {
      id: "mexico-tickets",
      afterBlockId: "sell-copy",
      kind: "attraction-reservation",
      title: "Sin entrada a su nombre, no se entra en la Ciudad Prohibida",
      body: "La Ciudad Prohibida no vende entradas para el mismo día: salen siete días antes, a las 20:00 de Pekín (las 06:00 en el centro de México), a nombre de cada visitante y con su pasaporte. Díganos la fecha y nos ocupamos nosotros; la entrada se cobra al precio oficial, sin recargo.",
      attractionIds: ["forbidden-city", "tiananmen-square", "great-wall-mutianyu", "terracotta-warriors", "shanghai-tower"],
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
        text: `Un viaje privado de 8 días por Pekín, Xi'an y Shanghái cuesta desde ${eightDay.two} USD por persona con dos viajeros, ${pesos(eightDay.two)} al tipo de cambio del ${RATE_DATE}, sin los vuelos internacionales. Desde Ciudad de México hay vuelo directo a Shenzhen con China Southern, tres veces por semana, con escala en Tijuana sin cambiar de avión. Con pasaporte mexicano hace falta visa para un viaje de ida y vuelta; la excepción es el tránsito sin visa de 240 horas, si sale de China hacia un tercer país o región.`,
      },
      { id: "price-heading", type: "heading", level: 2, text: "Cuánto cuesta, en dólares y en pesos" },
      {
        id: "price-table",
        type: "table",
        caption: `Precios publicados por persona, sin vuelos internacionales. Pesos al tipo de cambio publicado en el DOF el ${RATE_DATE}: ${new Intl.NumberFormat("es-MX").format(PESOS_PER_DOLLAR)} pesos por dólar`,
        columns: ["Viaje", "Desde, por persona con 2 viajeros", "En pesos, aprox.", "Por persona con 6 viajeros"],
        rows: [
          priceRow("shenzhen-family-tech-4-day-private-tour"),
          priceRow("guangzhou-shunde-foshan-5-day-private-tour"),
          priceRow("beijing-highlights-5-day-private-tour"),
          priceRow("beijing-xian-shanghai-8-day-private-tour"),
          priceRow("beijing-xian-guilin-shanghai-10-day-private-tour"),
          priceRow("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"),
          smallGroupRow("beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour"),
        ],
      },
      {
        id: "price-copy",
        type: "paragraph",
        text: "En un viaje privado, el guía y el vehículo son solo para su grupo; por eso el precio por persona baja cuando viajan más. Cada itinerario detalla qué incluye: hoteles con desayuno, guía y vehículo los días de visita, los trenes y vuelos internos del programa y las entradas indicadas. No incluye el vuelo desde México ni la visa, ni los almuerzos y las cenas que no indique el itinerario. Los pesos son orientativos: el presupuesto final se confirma por escrito antes de pagar.",
      },
      { id: "flight-heading", type: "heading", level: 2, text: "El vuelo directo a Shenzhen" },
      {
        id: "flight-copy",
        type: "paragraph",
        text: "China Southern opera la ruta Shenzhen–Ciudad de México con tres vuelos de ida y vuelta a la semana en Airbus A350, según la información del gobierno de Guangdong de octubre de 2025. Son más de 14,000 kilómetros: el vuelo hacia México es sin escalas y el de Ciudad de México a Shenzhen hace una escala en Tijuana, sin cambiar de avión. Compruebe días y horarios con la aerolínea antes de planear, porque cambian según la temporada.",
      },
      {
        id: "flight-why",
        type: "paragraph",
        text: "Llegar a Shenzhen tiene una ventaja práctica: está en la provincia de Guangdong, junto a Guangzhou y a la frontera con Hong Kong. Desde ahí se sigue a Pekín, Xi'an o Shanghái en tren de alta velocidad o en vuelo interno.",
      },
      { id: "visa-heading", type: "heading", level: 2, text: "Visa o tránsito de 240 horas" },
      {
        id: "visa-copy",
        type: "paragraph",
        text: "Con pasaporte mexicano hace falta visa para un viaje de ida y vuelta entre México y China. La embajada recomienda pedirla con al menos un mes de antelación; en Ciudad de México el trámite ordinario tarda 4 días hábiles y en Tijuana, de 10 a 15. La alternativa es el tránsito sin visa de 240 horas: México está en la lista, y Shenzhen-Bao'an, Guangzhou-Baiyun y los aeropuertos de Pekín y Shanghái son puertos habilitados. Las condiciones y los documentos, paso a paso, están en nuestra guía de la visa para mexicanos.",
        link: {
          label: "guía de la visa para mexicanos",
          href: "/es/guias/visa-china-mexicanos/",
        },
      },
      {
        id: "route-table",
        type: "table",
        caption: "Rutas desde México y el tránsito de 240 horas",
        columns: ["Ruta", "¿Sin visa?", "Por qué"],
        rows: [
          ["Ciudad de México → Shenzhen → Guangzhou → Hong Kong", "Sí", "Guangdong está en las zonas permitidas y Hong Kong cuenta como región de destino"],
          ["Ciudad de México → Shenzhen → Pekín → Tokio", "Sí", "Se puede pasar de una provincia a otra dentro de las zonas permitidas y salir hacia Japón"],
          ["Ciudad de México → Shenzhen → Ciudad de México", "No", "Vuelve a México: pida la visa"],
          ["Un viaje de 14 días", "No", "Las 240 horas son 10 días desde las 00:00 del día siguiente a la llegada"],
        ],
      },
      { id: "sell-heading", type: "heading", level: 2, text: "Sin visa, pero sin margen de error" },
      {
        id: "sell-copy",
        type: "paragraph",
        text: "El tránsito de 240 horas ahorra la visa, pero no perdona: la aerolínea revisa el boleto de salida al tercer país antes de dejarle embarcar, y todo el programa tiene que caber en 10 días y en las zonas permitidas. Si pide la visa, cuente los días: la embajada recomienda solicitarla con al menos un mes de antelación, y en Tijuana el trámite tarda de 10 a 15 días hábiles. Y las entradas no esperan a nadie: la Ciudad Prohibida no vende para el mismo día, y en la Semana Dorada de 2025, el 1 de octubre ya estaban reservados todos los días del 2 al 7, según Yicai; en los Guerreros de Terracota, la venta del día puede cerrarse cuando se completa el aforo. En cuanto tenga fechas, encárguenos el viaje y las entradas.",
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos en español por WhatsApp o por correo con sus fechas, el número de viajeros, su vuelo o la ruta que tiene en mente. Le respondemos en un plazo de 12 horas y, antes de que pague nada, recibe por escrito el presupuesto completo, donde le indicamos si el programa cabe en el tránsito de 240 horas. Y el mismo planificador le atiende de principio a fin: desde esa primera respuesta hasta el último día del viaje. ¿Prefiere no depender del inglés? En todas las ciudades de la ruta podemos asignarle un guía de habla hispana, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto. Para reservar se paga un 30 % de depósito con Alipay o con VBill, que acepta tarjetas emitidas en México y en otros países de América Latina; el resto, al llegar. Somos una agencia de viajes con licencia en Pekín (L-BJ10587): los guías y los conductores son nuestros, y no le llevamos a tiendas.",
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas de mexicanos que viajan a China",
        items: [
          {
            question: "¿Cuánto cuesta un viaje a China desde México?",
            answer: `Un viaje privado de 8 días por Pekín, Xi'an y Shanghái cuesta desde ${eightDay.two} USD por persona con dos viajeros, ${pesos(eightDay.two)} al tipo de cambio del ${RATE_DATE}, sin el vuelo desde México. Con más viajeros, el precio por persona baja.`,
          },
          {
            question: "¿Hay vuelo directo de México a China?",
            answer: "Sí. China Southern vuela entre Ciudad de México y Shenzhen tres veces por semana; el vuelo hacia Shenzhen hace escala en Tijuana sin cambiar de avión.",
          },
          {
            question: "¿Los mexicanos necesitan visa para China?",
            answer: "Sí, para un viaje de ida y vuelta. Con el tránsito sin visa de 240 horas se puede entrar sin visa si se sale de China hacia un tercer país o región con el boleto confirmado.",
          },
          {
            question: "¿Puedo usar el tránsito de 240 horas si vuelo a Shenzhen?",
            answer: "Sí, si sale de China hacia un tercer país o región, como Japón, Corea del Sur o Hong Kong, y se queda en las zonas permitidas. Si vuelve de Shenzhen a México, necesita visa.",
          },
          {
            question: "¿A qué hora salen las entradas de la Ciudad Prohibida en México?",
            answer: "A las 06:00 del centro de México, siete días antes de la visita: son las 20:00 en Pekín.",
          },
          {
            question: "¿Cómo se paga desde México?",
            answer: "Con Alipay o VBill, que acepta tarjetas mexicanas: un 30 % de depósito al reservar y el resto al llegar. El presupuesto final llega por escrito antes de pagar.",
          },
        ],
      },
      {
        id: "next-links",
        type: "internal-links",
        title: "Siga preparando el viaje",
        items: [
          {
            label: "Visa para China desde México",
            href: "/es/guias/visa-china-mexicanos/",
            description: "Requisitos, plazos y el tránsito de 240 horas, paso a paso.",
          },
          {
            label: "Escala en Pekín",
            href: "/es/guias/escala-en-pekin/",
            description: "Cómo ir a la Gran Muralla desde el aeropuerto con el tránsito sin visa.",
          },
          {
            label: "Feria de Cantón",
            href: "/es/guias/feria-de-canton/",
            description: "Fechas, traslados, coche con conductor e intérprete para compradores.",
          },
          {
            label: "Todos los viajes",
            href: "/es/tours/",
            description: "Rutas privadas con el precio por persona publicado.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes",
        items: [
          {
            label: "La ruta Shenzhen–Ciudad de México: tres vuelos semanales en A350, con escala en Tijuana hacia Shenzhen (3 de octubre de 2025)",
            url: "https://info.newsgd.com/node_73b7112307/1e4ec14f5b.shtml",
            publisher: "Gobierno de la provincia de Guangdong (Newsgd)",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Tipo de cambio del dólar publicado el 19 de octubre de 2026",
            url: "https://dof.gob.mx/indicadores.php",
            publisher: "Diario Oficial de la Federación",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Requisitos de solicitud de visa de la Embajada de China en México (a partir de septiembre de 2025)",
            url: "https://mx.china-embassy.gov.cn/esp/LSFW/consular1/202510/t20251001_11722302.htm",
            publisher: "Embajada de China en México",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Política de tránsito sin visa: 57 países, México incluido, y 65 puertos (20 de agosto de 2026)",
            url: "https://www.nia.gov.cn/n741440/n741577/c1731205/content.html",
            publisher: "Administración Nacional de Inmigración de China",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Tránsito en Guangdong: entrada por Guangzhou-Baiyun o Shenzhen-Bao'an y estancia en toda la provincia (2023)",
            url: "https://www.sz.gov.cn/hdjl/ywzsk/rmzfkabgs/tgcs/content/post_11016988.html",
            publisher: "Gobierno municipal de Shenzhen",
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
