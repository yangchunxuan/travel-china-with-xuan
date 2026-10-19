import type { SpanishGuide } from "../spanishGuideTypes";

export const pasaporteNombreBilletesChina: SpanishGuide = {
  slug: "pasaporte-nombre-billetes-china",
  sourceGuideId: "passport-name-across-china-bookings",
  title: "Pasaporte PAO y apellidos con ñ: su nombre en trenes de China",
  headline: "Pasaporte que empieza por PAO y apellidos con ñ: cómo escribir su nombre en los billetes de tren y las entradas de China",
  description:
    "Cómo escribir dos apellidos, la ñ y las tildes en los billetes de tren y las entradas de China, y por qué revisar la O y el cero si su pasaporte empieza por PAO.",
  navTitle: "Pasaporte PAO y apellidos con ñ",
  heroImage: {
    src: "/images/guides/which-beijing-railway-station/hero-1600.webp",
    width: 1600,
    height: 1000,
    alt: "Fachada de la estación de tren de Pekín Chaoyang, con su nombre en chino",
    credit: {
      text: "Foto: N509FZ, recortada",
      sourceLabel: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Beijing_Chaoyang_Railway_Station_(20251220131259).jpg",
      licenseLabel: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [
    "beijing-xian-guilin-shanghai-10-day-private-tour",
    "beijing-highlights-5-day-private-tour",
  ],
  offers: [
    {
      id: "passport-tickets",
      afterBlockId: "tickets-help",
      kind: "attraction-reservation",
      title: "Cuando confirme, mándenos la página del pasaporte: el nombre lo escribimos nosotros",
      body: "Reservamos sus entradas en el sistema oficial de cada lugar copiando el nombre y el número tal y como figuran en su pasaporte, letra a letra, y le enviamos la confirmación para que la compare con el documento antes de viajar. La entrada oficial se paga a su precio, sin sobreprecio; nuestra gestión, a la tarifa indicada, cubre la reserva en el sistema oficial y el envío de la confirmación. Le confirmamos por escrito el importe total y se paga después de esa confirmación.",
      attractionIds: ["forbidden-city", "tiananmen-square", "terracotta-warriors", "chengdu-panda-base"],
      preselect: "forbidden-city",
      action: "Pedir presupuesto de las entradas",
    },
    {
      id: "beijing-xian-guilin-shanghai-10-day",
      afterBlockId: "full-trip-copy",
      kind: "tour",
      tourSlug: "beijing-xian-guilin-shanghai-10-day-private-tour",
      label: "Trenes, vuelos, hoteles y entradas que reservamos nosotros con los datos de su pasaporte",
      note: "En este viaje, el tren Pekín–Xi’an, los vuelos Xi’an–Guilin y Guilin–Shanghái, los hoteles y las entradas principales los reservamos nosotros con los datos de su pasaporte y le enviamos cada reserva para que la compare. El precio, por persona compartiendo habitación de dos camas, incluye nueve noches de hotel con desayuno, guía local de habla inglesa y vehículo privado los días de visita, las entradas principales, el crucero por el río Li, el tren y los dos vuelos internos; no incluye los vuelos internacionales. Si nos confirma el viaje al menos 8 días antes de empezar y no conseguimos la reserva de la Ciudad Prohibida o de la plaza de Tiananmén, le devolvemos todo lo que haya pagado.",
      action: "Ver el viaje de 10 días",
    },
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: "En China, los billetes de tren, los vuelos internos, los hoteles y las entradas de los grandes monumentos van a nombre del pasaporte, y el control compara lo que usted escribió con el documento. Para la web oficial de trenes 12306, escriba primero los apellidos y después el nombre, separados por un espacio, solo con letras de la A a la Z: sin tildes y con la ñ escrita como aparece en las líneas de la parte inferior de su pasaporte, normalmente como N. Y si el número de su pasaporte empieza por letras, como PAO, compruebe letra a letra que la O no se ha convertido en un cero: algunos viajeros con pasaporte español cuentan que el torno de acceso al andén confundió esa letra con el número.",
      },
      { id: "number-heading", type: "heading", level: 2, text: "El número de pasaporte: la O no es un cero" },
      {
        id: "number-copy",
        type: "paragraph",
        text: "Los pasaportes españoles con chip, emitidos desde el 29 de junio de 2009, tienen un número de tres letras seguidas de seis cifras. Algunos empiezan por PAO. En la página del pasaporte, la letra O y el cero se parecen mucho, y es fácil teclear un cero donde va la letra.",
      },
      {
        id: "number-cases",
        type: "callout",
        tone: "warning",
        title: "Lo que cuentan algunos viajeros",
        body: "En comentarios de vídeos de viaje, algunos viajeros con pasaporte español cuentan que su número empezaba por PAO y que el torno automático de acceso al andén leyó esa O como un cero. No es una norma oficial ni le pasa a todo el mundo. Si el torno no le deja pasar, acuda al control manual (人工通道) o pida ayuda al personal de la estación, con el pasaporte en la mano, y deje tiempo de margen antes del tren. Y antes de pagar cualquier billete, compare el número carácter a carácter con la última línea de su pasaporte.",
      },
      { id: "name-heading", type: "heading", level: 2, text: "Dos apellidos, ñ y tildes: cómo escribir el nombre" },
      {
        id: "name-table",
        type: "table",
        caption: "Ejemplo con un pasaporte a nombre de María José García Muñoz; 12306 pide los apellidos, un espacio y el nombre, solo con letras de la A a la Z",
        columns: ["Dato", "En el pasaporte", "En el billete de tren (12306)"],
        rows: [
          ["Apellidos", "GARCÍA MUÑOZ", "Los dos apellidos, en el orden impreso"],
          ["Nombre", "MARÍA JOSÉ", "Después de los apellidos, con un espacio"],
          ["Tildes", "Í, É", "Sin tilde: solo letras de la A a la Z"],
          ["Ñ", "MUÑOZ", "Como aparezca en las líneas inferiores del pasaporte, normalmente N"],
          ["Resultado", "—", "GARCIA MUNOZ MARIA JOSE, si así figura en esas líneas"],
        ],
      },
      {
        id: "name-copy",
        type: "paragraph",
        text: "Las dos o tres líneas de letras y símbolos de la parte inferior de la página del pasaporte son la zona de lectura mecánica. 12306 dice que manda lo impreso en la página y que esas líneas sirven de apoyo para los separadores: si su nombre lleva guiones, apóstrofos o comas, mire cómo aparecen allí y escríbalos como espacios, sin teclear los símbolos «<». Ahí verá también cómo aparece su ñ. Para nombres muy largos, 12306 admite hasta 64 caracteres. No elimine el segundo apellido ni invente una forma más corta: escriba lo que figura en el pasaporte.",
      },
      {
        id: "airline-copy",
        type: "paragraph",
        text: "Las aerolíneas y los hoteles usan otros formularios: pueden pedir los apellidos y el nombre en campos separados. Siga las instrucciones de cada uno, sin copiar en un campo el orden que pide otro. Lo que debe coincidir siempre es la persona, el tipo de documento y el número.",
      },
      {
        id: "fix-callout",
        type: "callout",
        tone: "warning",
        title: "Un nombre mal escrito en un billete de tren no se corrige",
        body: "Según las preguntas frecuentes de 12306, el nombre del viajero no se puede cambiar después de comprar el billete. Si los datos están mal, hay que devolverlo, pagar la comisión de devolución que corresponda y comprar otro, si todavía quedan asientos en ese tren.",
      },
      { id: "attractions-heading", type: "heading", level: 2, text: "Las entradas de los monumentos" },
      {
        id: "attractions-copy",
        type: "paragraph",
        text: "La Ciudad Prohibida pide el nombre completo y el número de pasaporte de cada visitante, y en la puerta comprueba el pasaporte original con el que se reservó. Los Guerreros de Terracota, la base de pandas de Chengdu o la Gran Muralla de Mutianyu también venden entradas nominativas. Cada lugar tiene su propio formulario: no copie sin revisar la forma abreviada que le haya dado una aerolínea o la web de trenes. En la Ciudad Prohibida, además, no hay entradas del día: salen a la venta 7 días antes, a las 20:00 hora de China (las 14:00 en la España peninsular en horario de verano y las 13:00 en invierno), y el 1 de octubre de 2025, en plena semana de la fiesta nacional, el sistema oficial ya mostraba completos todos los días del 2 al 7 de octubre, según Yicai. Por eso conviene tener el nombre exacto antes de reservar.",
      },
      {
        id: "tickets-help",
        type: "paragraph",
        text: "¿Prefiere no escribir usted esos datos? Mándenos la página del pasaporte y los copiamos nosotros, letra a letra; usted recibe la confirmación para compararla con el documento. Si nos lo pide con menos de 8 días de antelación, intentamos reservar, pero ya no podemos garantizarlo.",
      },
      {
        id: "full-trip-copy",
        type: "paragraph",
        text: "Si prefiere no escribir usted su nombre en los formularios de billetes y entradas, nuestro servicio de organización completa del viaje planifica la ruta y reserva los hoteles, las entradas y los traslados con los datos de su pasaporte, y le enviamos cada reserva para que la compare antes de viajar.",
        link: { label: "servicio de organización completa del viaje", href: "/es/services/full-trip-support/" },
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva con nosotros",
        body: "Escríbanos en español por WhatsApp o por correo con sus fechas, el número de viajeros y lo que necesita: entradas o el viaje completo. Le respondemos en un plazo de 12 horas, y antes de pagar recibe el presupuesto completo por escrito. Los datos del pasaporte se los pedimos solo cuando confirma la reserva, y los escribimos nosotros a partir de la página del pasaporte. El mismo planificador le atiende de principio a fin. Si prefiere hacer el viaje en español, hay guía de habla hispana en todas las ciudades de la ruta, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto; el guía habitual habla inglés. Para reservar un viaje se paga un 30 % de depósito con Alipay o con VBill, que acepta tarjetas bancarias de América Latina; el resto, al llegar. Las entradas sueltas se pagan después de nuestra confirmación escrita. Somos una agencia de viajes con licencia en Pekín (L-BJ10587); los guías y los conductores son nuestros, y no hacemos paradas en tiendas.",
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas sobre el nombre y el pasaporte en las reservas de China",
        items: [
          {
            question: "¿Cómo se escriben dos apellidos en un billete de tren de China?",
            answer: "En la web oficial 12306, los dos apellidos en el orden del pasaporte, un espacio y después el nombre, solo con letras de la A a la Z. Por ejemplo, GARCIA MUNOZ MARIA JOSE.",
          },
          {
            question: "¿Cómo se escribe la ñ en las reservas de China?",
            answer: "Normalmente con una N: en las líneas de lectura mecánica de la parte inferior del pasaporte, la ñ aparece sin tilde (MUÑOZ se lee MUNOZ); compruébelo en el suyo. 12306 solo admite letras de la A a la Z; si un formulario rechaza su apellido, no lo cambie por su cuenta: pregunte antes de pagar.",
          },
          {
            question: "¿Hay que poner las tildes?",
            answer: "No en 12306, que solo admite letras de la A a la Z. Otros formularios pueden tener sus propias reglas: siga las de cada uno.",
          },
          {
            question: "Mi pasaporte empieza por PAO: ¿es una O o un cero?",
            answer: "Es la letra O: en los pasaportes españoles con chip, las tres primeras posiciones son letras y las seis siguientes, cifras. Compruebe el número carácter a carácter con la última línea del pasaporte antes de pagar; algunos viajeros cuentan que el torno de acceso al andén leyó la O como un cero.",
          },
          {
            question: "¿Se puede corregir el nombre en un billete de tren ya comprado?",
            answer: "No. Según 12306, hay que devolver el billete, pagar la comisión que corresponda y comprar otro.",
          },
          {
            question: "¿Qué pasa si renuevo el pasaporte después de reservar?",
            answer: "Las reservas no se actualizan solas. Cada billete, hotel y entrada sigue ligado al número antiguo: hay que avisar a cada proveedor por separado.",
          },
        ],
      },
      {
        id: "next-links",
        type: "internal-links",
        title: "Siga preparando el viaje",
        items: [
          {
            label: "¿Visado para China con pasaporte español?",
            href: "/es/guias/visado-china-espanoles/",
            description: "Qué pasaporte sirve y qué validez necesita.",
          },
          {
            label: "Tarjeta de llegada a China",
            href: "/es/guias/tarjeta-de-llegada-china/",
            description: "El formulario digital gratuito, con los mismos datos del pasaporte.",
          },
          {
            label: "Qué ver en Pekín en 3, 4 y 5 días",
            href: "/es/guias/que-ver-en-pekin/",
            description: "Cuándo salen las entradas de la Ciudad Prohibida.",
          },
          {
            label: "Cómo pagar en China en 2026",
            href: "/es/guias/como-pagar-en-china/",
            description: "Alipay, WeChat Pay y tarjeta: qué preparar antes de volar.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes",
        items: [
          {
            label: "Instrucciones para escribir el nombre y el número de un pasaporte extranjero",
            url: "https://mobile.12306.cn/otsmobile/h5/otsbussiness/passportInstruction/passport-entry-instructions.html",
            publisher: "China Railway 12306",
            reviewedAt: "2026-08-13",
          },
          {
            label: "Preguntas frecuentes de compra: errores de nombre y documento",
            url: "https://kyfw.12306.cn/otn/gonggao/buyTicket.html",
            publisher: "China Railway 12306",
            reviewedAt: "2026-08-13",
          },
          {
            label: "Billete nominativo y documento original",
            url: "https://www.12306.cn/en/faq.html?item=2",
            publisher: "China Railway 12306",
            reviewedAt: "2026-08-13",
          },
          {
            label: "Pasaporte español: formato del número desde el 29 de junio de 2009",
            url: "https://www.consilium.europa.eu/prado/es/ESP-AO-04001/index.html",
            publisher: "Consejo de la UE, registro PRADO",
            reviewedAt: "2026-10-19",
          },
          {
            label: "La Ciudad Prohibida, completa del 2 al 7 de octubre de 2025",
            url: "https://www.yicai.com/news/102851899.html",
            publisher: "Yicai",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Reserva de la Ciudad Prohibida con pasaporte extranjero",
            url: "https://english.beijing.gov.cn/12345hotline/faqs/all/202506/t20250620_4117980.html",
            publisher: "Gobierno Municipal de Pekín, línea 12345",
            reviewedAt: "2026-08-22",
          },
        ],
      },
    ],
  },
};
