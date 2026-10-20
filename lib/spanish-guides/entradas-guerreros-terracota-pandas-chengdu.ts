import type { SpanishGuide } from "../spanishGuideTypes";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS as leadDays } from "../attractionReservations.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { spanishReservationFee } from "../spanishGuidePrices.ts";

const fee = spanishReservationFee();

const xian5 = "xian-terracotta-warriors-5-day-private-tour";
const chengdu5 = "chengdu-pandas-sanxingdui-5-day-private-tour";
const pandas14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";

export const entradasGuerrerosTerracotaPandasChengdu: SpanishGuide = {
  slug: "entradas-guerreros-terracota-pandas-chengdu",
  title: "Entradas Guerreros de Terracota y pandas de Chengdu 2026",
  headline: "Entradas para los Guerreros de Terracota y la base de pandas de Chengdu: precio y cómo reservar con pasaporte",
  description:
    "Guerreros de Terracota: 120 yuanes, reserva nominativa con pasaporte. Base de pandas de Chengdu: 55 yuanes, hasta 14 días antes, turno de mañana o tarde. Cómo reservar en 2026.",
  navTitle: "Entradas Terracota y pandas",
  heroImage: {
    src: "/images/destinations/xian/terracotta-pit-one-1200.webp",
    width: 1200,
    height: 750,
    alt: "El foso 1 de los Guerreros de Terracota, en Xi’an, con las filas de figuras bajo la gran cubierta",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [xian5, chengdu5, pandas14],
  offers: [
    {
      id: "xian-chengdu-tickets",
      afterBlockId: "huahua",
      kind: "attraction-reservation",
      title: "Las dos entradas, a su nombre, antes de salir de casa",
      body: "Usted nos da las fechas y, cuando confirma, el nombre y el número de pasaporte de cada viajero. Nosotros reservamos los Guerreros de Terracota y la base de pandas en sus sistemas oficiales, a nombre de cada uno, y para los pandas elegimos el turno de mañana, el de la apertura. Si también quiere el Museo de Historia de Shaanxi o Sanxingdui, los añadimos a la misma solicitud.",
      attractionIds: ["terracotta-warriors", "chengdu-panda-base", "shaanxi-history-museum", "sanxingdui-museum"],
      preselect: "terracotta-warriors",
      action: "Reservar mis entradas",
    },
    {
      id: "xian-5-day",
      afterBlockId: "tours-intro",
      kind: "tour",
      tourSlug: xian5,
      label: "Xi’an en 5 días, con un día entero para los guerreros",
      note: "Las entradas reservadas a su nombre, y guía y coche privados desde el hotel: el día de los Guerreros de Terracota no depende del autobús 602 ni de una parada dudosa. Después, la muralla de Xi’an, los monumentos Tang y el barrio musulmán. Cuatro noches con desayuno.",
      action: "Ver Xi’an en 5 días",
    },
    {
      id: "chengdu-5-day",
      afterBlockId: "chengdu-tour",
      kind: "tour",
      tourSlug: chengdu5,
      label: "Chengdu en 5 días: pandas a primera hora y Sanxingdui",
      note: "Llegamos a la base de pandas para la apertura, con la entrada del turno de mañana ya reservada, y le dedicamos otro día completo a Sanxingdui. Cuatro noches en Chengdu, traslados privados y las entradas de los pandas, Sanxingdui y Dujiangyan.",
      action: "Ver Chengdu en 5 días",
    },
    {
      id: "pandas-14-day",
      afterBlockId: "both",
      kind: "tour",
      tourSlug: pandas14,
      label: "Los guerreros y los pandas en el mismo viaje",
      note: `Un día entero para los Guerreros de Terracota, los pandas de Chengdu a primera hora, el río Li y cuatro noches en Pekín, con las entradas reservadas a nombre de cada viajero. Trece noches de hotel con desayuno, dos trenes y dos vuelos internos. Si reserva el viaje y nos envía los pasaportes al menos ${leadDays} días antes de la visita y no conseguimos la Ciudad Prohibida o Tiananmén, le devolvemos todo lo pagado.`,
      action: "Ver el viaje de 14 días",
    },
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: "La entrada de adulto a los Guerreros de Terracota cuesta 120 yuanes y se reserva con el nombre y el número de pasaporte de cada visitante; una sola entrada cubre los tres fosos, el jardín de Lishan y la lanzadera entre ambos, y la venta puede cerrarse cuando se alcanza el aforo. La base de pandas de Chengdu cuesta 55 yuanes por adulto, se reserva en línea hasta 14 días antes, también con pasaporte, y se elige turno de mañana o de tarde; en taquilla solo se vende en casos especiales. En los dos sitios hay que llevar el pasaporte original con el que se reservó.",
      },
      { id: "facts-heading", type: "heading", level: 2, text: "Las dos entradas, comparadas" },
      {
        id: "facts-table",
        type: "table",
        caption: "Datos oficiales revisados el 11 de agosto de 2026",
        columns: ["Dato", "Guerreros de Terracota (Xi’an)", "Base de pandas de Chengdu"],
        rows: [
          ["Precio de adulto", "120 yuanes", "55 yuanes"],
          ["Cuándo reservar", "Por adelantado en los canales oficiales del museo; la venta se cierra al llegar al aforo", "En línea, hasta 14 días antes, según disponibilidad"],
          ["Pasaporte", "Sí, reserva nominativa; lleve el original", "Sí, reserva nominativa; lleve el original"],
          ["Qué cubre", "Los fosos 1, 2 y 3, el jardín de Lishan y la lanzadera gratuita entre ambos", "Solo la base de la ciudad; no sirve en el Valle del Panda de Dujiangyan"],
          ["Horario", "08:30–17:00 del 16 de marzo al 15 de noviembre; 08:30–16:30 del 16 de noviembre al 15 de marzo", "Del 16 de marzo al 31 de octubre de 2026: turno de mañana de 07:30 a 12:00 y de tarde de 12:00 a 17:00. Desde el 1 de noviembre rige el horario de invierno que publique la base; se lo confirmamos para su fecha"],
          ["Taquilla", "No cuente con ella: el museo pide comprar en línea antes de llegar", "Solo para casos especiales"],
        ],
      },
      { id: "xian-heading", type: "heading", level: 2, text: "Guerreros de Terracota: lo que suele fallar" },
      {
        id: "xian-copy",
        type: "paragraph",
        text: "El aforo ordinario del museo es de 65.000 visitantes al día, y en festivos los avisos pueden cambiar horarios y aforo. Lo que más falla no es la entrada, sino los detalles: un número de pasaporte mal escrito, una web con nombre parecido a la oficial que no emite la entrada del museo, o llegar en autobús desde Xi’an sin haber comprobado la vuelta. El museo está en Lintong, fuera de la ciudad, y con el trayecto la visita suele ocupar el día entero.",
      },
      {
        id: "shaanxi",
        type: "paragraph",
        text: "Si también quiere el Museo de Historia de Shaanxi, en el centro de Xi’an, la entrada básica es gratuita pero hay que reservarla: sale cinco días antes a las 17:00 de Pekín (comprobado el 12 de agosto de 2026), es decir, a las 10:00 u 11:00 en España y a las 03:00 en Ciudad de México, en plena madrugada: es una de las reservas que más conviene encargarnos. En una carta abierta de agosto de 2023, el museo explicó que cada día recibía más de 600.000 clics de reserva y que solo unas 12.000 personas conseguían reservar y entrar.",
      },
      { id: "panda-heading", type: "heading", level: 2, text: "Base de pandas de Chengdu: la entrada es lo fácil" },
      {
        id: "panda-copy",
        type: "paragraph",
        text: "Con 14 días de margen, conseguir la entrada de los pandas es más sencillo que en la Ciudad Prohibida. Lo que decide la visita es el turno y la hora de llegada. Entrar temprano da más margen y evita el calor del verano, cuando la base puede pasar a los pandas al interior. Aun así, la base no promete cuántos verá ni qué estarán haciendo: un animal puede estar dentro o descansando fuera de la vista. Por eso conviene reservar el turno de mañana y llegar a la apertura.",
      },
      {
        id: "huahua",
        type: "callout",
        tone: "warning",
        title: "La cola para ver a Huahua",
        body: "Huahua es una de las pandas más populares de la base. En un reportaje publicado el 2 de febrero de 2024, el diario China Youth Daily contó que a las 7:40 de la mañana la cola para verla ya medía 500 metros, y que un cartel avisaba de que desde ese punto quedaban más de dos horas de espera para llegar a ella. Muchos internautas lo resumían con humor: dos horas de cola para tres minutos con Huahua. Esa espera no la acorta nadie, tampoco nosotros: lo que sí cambia la mañana es llegar a la apertura con la entrada del turno de mañana y decidir con calma si hace la cola o dedica ese tiempo al resto de la base.",
      },
      {
        id: "service-terms",
        type: "paragraph",
        text: `La gestión cuesta ${fee} por persona y por lugar, más cada entrada a su precio oficial, sin recargo. Reservamos en el sistema oficial de cada lugar, a nombre de cada viajero, y no revendemos entradas. Antes de pagar recibe el total por escrito; después, el justificante de cada reserva y las instrucciones para el día de la visita.`,
      },
      { id: "tours-heading", type: "heading", level: 2, text: "Si prefiere no ocuparse de nada" },
      {
        id: "tours-intro",
        type: "paragraph",
        text: "En nuestros viajes privados de Xi’an y de Chengdu, las entradas van incluidas y las reservamos nosotros en cuanto se abre la venta de su fecha, junto con el coche desde el hotel y un guía de habla inglesa que conoce el orden de la visita.",
      },
      {
        id: "chengdu-tour",
        type: "paragraph",
        text: "En Chengdu, el viaje se organiza alrededor de la hora que más cuenta en la base de pandas: la apertura. El guía le espera con la entrada del turno de mañana ya reservada, y Sanxingdui y Dujiangyan tienen cada uno su propio día.",
      },
      {
        id: "both",
        type: "paragraph",
        text: "¿Quiere ver los guerreros y los pandas en el mismo viaje? Nuestra ruta de dos semanas los une con Pekín, el río Li y Shanghái.",
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos por WhatsApp o por correo con las fechas y cuántas personas viajan; no nos mande todavía los pasaportes. Respondemos en un plazo de 12 horas con el total por escrito y le pedimos los datos solo cuando confirme. Las entradas se pagan al aceptar el presupuesto, con Alipay o con VBill, que acepta tarjetas de América Latina; si reserva un viaje, basta un 30 % de depósito y el resto se paga al llegar, y el mismo planificador le atiende de principio a fin. Somos una agencia de viajes con licencia en Pekín (L-BJ10587); los guías y los conductores son nuestros, y no paramos en tiendas. Nuestros guías hablan inglés; en Xi’an y en Chengdu hay guía de habla hispana, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto.",
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas frecuentes",
        items: [
          {
            question: "¿Cuánto cuesta la entrada a los Guerreros de Terracota?",
            answer: "120 yuanes la entrada estándar de adulto. Incluye los fosos 1, 2 y 3, el jardín de Lishan y la lanzadera gratuita entre ambos. Compruebe el precio al pagar, porque puede cambiar.",
          },
          {
            question: "¿Se puede reservar con pasaporte extranjero?",
            answer: "Sí, en los dos sitios. La reserva es nominativa: se hace con el nombre y el número de pasaporte de cada visitante, y hay que llevar ese pasaporte original.",
          },
          {
            question: "¿Con cuántos días de antelación se reserva la base de pandas?",
            answer: "Hasta 14 días antes, en línea y según disponibilidad. Hay turno de mañana y de tarde; la venta en el recinto es solo para casos especiales.",
          },
          {
            question: "¿La entrada de la base de pandas sirve para el Valle del Panda de Dujiangyan?",
            answer: "No. Son recintos distintos con entradas separadas.",
          },
          {
            question: "¿Cuánto hay que esperar para ver a Huahua?",
            answer: "Depende del día. Según un reportaje de China Youth Daily publicado el 2 de febrero de 2024, a las 7:40 la cola para verla ya medía 500 metros y un cartel avisaba de que desde ese punto quedaban más de dos horas de espera. La base no garantiza ver a un panda concreto.",
          },
          {
            question: "¿Cuánto cobran por reservar las entradas?",
            answer: `${fee} de gestión por persona y por lugar, más la entrada a su precio oficial. Si nos lo encarga y paga al menos ${leadDays} días antes y no conseguimos la reserva, le devolvemos la gestión y la entrada.`,
          },
        ],
      },
      {
        id: "next-links",
        type: "internal-links",
        title: "Siga preparando Xi’an y Chengdu",
        items: [
          {
            label: "Guerreros de Terracota por libre: cómo llegar y qué ver",
            href: "/es/guias/guerreros-de-terracota-xian/",
            description: "Metro, autobús, los tres fosos y el jardín de Lishan en un día.",
          },
          {
            label: "Osos panda en Chengdu: qué centro elegir",
            href: "/es/guias/osos-panda-chengdu/",
            description: "Base de la ciudad o Valle del Panda de Dujiangyan, con horarios y transporte.",
          },
          {
            label: "China en 2 semanas: Pekín, Xi’an, pandas, Guilin y Shanghái",
            href: "/es/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/",
            description: "Los guerreros y los pandas en un mismo viaje, con precio publicado.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes",
        items: [
          {
            label: "Guía de visitantes: reserva, horarios, pasaporte y lanzadera",
            url: "https://www.bmy.com.cn/guide/",
            publisher: "Museo del Mausoleo del Emperador Qin Shihuang",
            reviewedAt: "2026-08-11",
          },
          {
            label: "Entrada única, exposiciones del jardín de Lishan y paradas de la lanzadera",
            url: "https://www.bmy.com.cn/news/news/980.html",
            publisher: "Museo del Mausoleo del Emperador Qin Shihuang",
            reviewedAt: "2026-08-11",
          },
          {
            label: "Normas de entradas de la base de pandas de Chengdu",
            url: "https://www.panda.org.cn/en/service/ticket/",
            publisher: "Base de Investigación y Cría del Panda Gigante de Chengdu",
            reviewedAt: "2026-08-11",
          },
          {
            label: "Aviso de ajuste del horario de temporada de 2026",
            url: "https://www.panda.org.cn/cn/news/notice/2026-02-19/8855.html",
            publisher: "Base de Investigación y Cría del Panda Gigante de Chengdu",
            reviewedAt: "2026-08-11",
          },
          {
            label: "La cola para ver a Huahua, 2 de febrero de 2024 (China Youth Daily, reproducido por China News)",
            url: "https://www.chinanews.com.cn/sh/2024/02-02/10157284.shtml",
            publisher: "China News Service",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Carta abierta del Museo de Historia de Shaanxi sobre la demanda de reservas, 4 de agosto de 2023",
            url: "https://m.thepaper.cn/newsDetail_forward_24110428",
            publisher: "The Paper",
            reviewedAt: "2026-10-19",
          },
        ],
      },
    ],
  },
};
