import type { LocalizedPrivateTourProduct } from '../privateTourProducts';
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { getPrivateTourProduct, localizePrivateTourProduct } from '../privateTourProducts.ts';
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { attractionReservationServiceFeeCny } from '../attractionReservations.ts';
import {
  spanishLowestPrice, spanishPriceLine, spanishSalesFacts, spanishSalesLabels, spanishSalesPaths, spanishSalesSources, spanishSiteUrgency,
  type SpanishLinkedText, type SpanishSalesCopy,
// @ts-ignore Node source tests use explicit TypeScript extensions.
} from '../spanishSales.ts';

type KeyTourSales = (product: LocalizedPrivateTourProduct) => {
  meta: { title: string; description: string };
  /** What the answer block and the price FAQ list as included. */
  answerIncludes: string;
  sales: SpanishSalesCopy;
  extraFaq?: readonly { question: string; answer: string }[];
};

const f = spanishSalesFacts, u = spanishSiteUrgency, p = spanishSalesPaths;
const fee = `${attractionReservationServiceFeeCny} CNY`;
const low = (product: LocalizedPrivateTourProduct) => {
  const price = spanishLowestPrice(product.packages);
  if (!price?.two) throw new Error(`Key tour without a published two-traveller price: ${product.slug}`);
  return price;
};
/** "Desde 600 USD por persona con 6 viajeros (769 USD con 2)" for search descriptions. */
const fromPrice = (product: LocalizedPrivateTourProduct) => {
  const price = low(product);
  return `Desde ${price.formatted} por persona con ${price.lowest.travelers} viajeros (${price.twoFormatted} con 2)`;
};
const cta = (name: string) => ({ label: 'Consultar mis fechas por WhatsApp', message: `Hola, me interesa el viaje ${name}.\nFechas aproximadas:\nNúmero de viajeros:`, subject: `Consulta: ${name}` });
const offer = (product: LocalizedPrivateTourProduct, includes: string, beijing: boolean) => ({
  name: product.title, includes, price: spanishPriceLine(product.packages),
  ...(beijing ? { guarantee: f.beijingGuarantee } : { guarantee: f.beforePayTour, guaranteeLabel: spanishSalesLabels.beforePay }),
  book: f.book, pay: f.payTour,
});
const spanishGuide: SpanishLinkedText = { text: f.spanishGuideConcern };

/** The FAQ entry added to the 8-day page, which is the route that fits the 240-hour transit. */
export const spanishTransitFaq = {
  question: '¿Puedo hacer este viaje con el tránsito sin visado de 240 horas?',
  answer: 'Sí, si tu pasaporte está en la lista oficial (el mexicano lo está), entras por un puesto fronterizo admitido como Pekín o Shanghái y sales hacia un tercer país o región con un pasaje de fecha y asiento confirmados. Pekín, Shaanxi y Shanghái están dentro de las zonas permitidas y se puede viajar entre ellas. Las 240 horas cuentan desde las 0:00 del día siguiente a la llegada, y el viaje dura 8 días. Con pasaporte español no te hace falta: puedes entrar sin visado hasta 30 días, hasta el 31 de diciembre de 2026.',
};

export const spanishKeyTourSales: Readonly<Record<string, KeyTourSales>> = {
  'guilin-yangshuo-5-day-private-tour': product => ({
    meta: {
      title: `Guilin y Yangshuo en 5 días: tour privado desde ${low(product).formatted}`,
      description: `${fromPrice(product)}: Guilin y Yangshuo en 5 días, en privado, con crucero por el río Li, dos noches en Yangshuo, guía en inglés y coche privado.`,
    },
    answerIncludes: 'Cuatro noches en hoteles de 4 diamantes con desayuno (dos en Guilin y dos en Yangshuo), traslados privados, guía de habla inglesa los días 2 a 4, crucero por el río Li con tus maletas por carretera hasta Yangshuo y la entrada a una visita de Guilin el día 4.',
    sales: {
      id: 'reservar-este-viaje', eyebrow: 'Antes de elegir fechas',
      title: 'El día del río Li es el que más se complica si lo organizas tarde',
      intro: 'El crucero es el centro de este viaje y también el día con más piezas: un pasaje nominativo, un embarcadero que depende del barco y unas maletas que tienen que llegar a Yangshuo sin ti.',
      diy: [
        { text: 'Tienes que elegir entre barco de 3 y de 4 estrellas: salen de embarcaderos distintos de Guilin y cuestan 215 o 360 CNY por adulto (tarifas de agosto de 2026).' },
        { text: 'El pasaje es nominativo, y hay que comprobar que el canal de venta acepte tu pasaporte y cómo se recogen los pasajes.' },
        { text: 'Mientras navegas, tus maletas tienen que ir por carretera hasta Yangshuo y estar en el hotel cuando llegues. Lo explicamos en nuestra guía del crucero por el río Li.', links: [{ label: 'guía del crucero por el río Li', href: p.liRiverGuide }] },
      ],
      late: [
        { text: 'El pasaje no se puede comprar cuando tú quieras: para la Semana Dorada china de 2026, la venta del recorrido completo abrió solo 15 días antes, y para el resto del año no hay una fecha de apertura publicada. Nadie puede decirte hoy qué día se abrirá la venta para tu fecha; por eso conviene tener ya los datos del pasaporte de cada viajero y a alguien pendiente de reservar ese mismo día.' },
        { text: 'Si solo quieres el pasaje y nos lo encargas con menos de 8 días de margen, seguimos intentándolo, pero ya no podemos garantizarlo: la venta para tu fecha puede haber abierto ya.' },
        { text: 'Una crecida puede suspender las salidas con poco aviso, y entonces hay que replantear el día con las maletas ya en camino.' },
      ],
      solutionTitle: 'Lo que hacemos por ti',
      solution: [
        { text: 'Reservamos el crucero a nombre de cada viajero en cuanto abre la venta y te confirmamos por escrito la salida, la categoría del barco y el embarcadero.' },
        { text: 'Tu equipaje viaja por carretera hasta el hotel de Yangshuo mientras navegas.' },
        { text: 'Guía de habla inglesa los días 2, 3 y 4, coche privado en todos los traslados y dos noches seguidas en Yangshuo para recorrer el campo del Yulong sin cambiar de hotel.' },
        { text: 'Lo que pagas cubre lo que más cuesta resolver desde fuera: el pasaje nominativo del barco que elegiste, tus maletas esperándote en el hotel de Yangshuo, un coche en cada traslado y un guía de habla inglesa los días de visita.' },
        { text: 'Si el nivel del agua obliga a cambiar algo, hablamos contigo antes. Sin paradas en tiendas.' },
        spanishGuide,
        { text: `¿Solo necesitas el pasaje del crucero? Lo reservamos por ${fee} por persona más la tarifa oficial. Si nos lo encargas y pagas al menos 8 días antes, la reserva está garantizada; si no la conseguimos, te devolvemos íntegros los ${fee} y el importe del pasaje.`, links: [{ label: 'Lo reservamos', href: p.reservations }] },
      ],
      offer: offer(product, 'Cuatro noches en hoteles de 4 diamantes con desayuno (dos en Guilin y dos en Yangshuo), crucero por el río Li, traslado del equipaje, guía de habla inglesa los días 2 a 4, coche privado y la entrada a una visita de Guilin el día 4. Sin vuelos.', false),
      cta: cta('Guilin y Yangshuo en 5 días'),
    },
  }),

  'beijing-highlights-5-day-private-tour': product => {
    const guided = product.packages.find(pkg => pkg.id === 'english-guided');
    const guidedLow = guided ? spanishLowestPrice([guided]) : null;
    return {
      meta: {
        title: `Pekín en 5 días: tour privado con Ciudad Prohibida, desde ${low(product).formatted}`,
        description: `Desde ${low(product).formatted} por persona (6 viajeros, sin guía)${guidedLow ? ` o ${guidedLow.formatted} con guía en inglés` : ''}: Pekín en 5 días, en privado, con Ciudad Prohibida, Tiananmén, Badaling, Templo del Cielo y Palacio de Verano. Con 8 días de margen, reserva de la Ciudad Prohibida garantizada o te devolvemos todo.`,
      },
      answerIncludes: 'Cuatro noches en hotel de 4 diamantes con desayuno, traslados privados de llegada y salida, coche con conductor los tres días de visitas, entradas de adulto previstas y la gestión de las reservas; con guía de habla inglesa los días 2 a 4 o, en la opción sin guía, con asistencia a distancia durante el viaje.',
      sales: {
        id: 'reservar-este-viaje', eyebrow: 'Antes de elegir fechas',
        title: 'Sin entrada reservada no hay Ciudad Prohibida',
        intro: 'La visita estrella de Pekín no vende entradas para el mismo día. Si llegas sin reserva, ese día de tu viaje se queda sin su visita principal.',
        diy: [
          u.forbidden[0],
          { text: 'Cada entrada lleva el nombre y el número de pasaporte de un visitante, y en la puerta te piden ese mismo pasaporte original.' },
          { text: 'La plaza de Tiananmén también exige reserva nominativa, con los datos del pasaporte de cada visitante.' },
        ],
        late: [
          u.forbidden[1],
          { text: 'Además, la Ciudad Prohibida cierra los lunes, salvo festivos oficiales: el Templo del Cielo, el Palacio de Verano y la Gran Muralla de Badaling hay que encajarlos alrededor de la franja que consigas.' },
        ],
        solutionTitle: 'Lo que hacemos por ti',
        solution: [
          { text: 'Reservamos la Ciudad Prohibida y Tiananmén a nombre de cada viajero en cuanto abre la venta, gestionamos la entrada de Badaling según las normas vigentes para tu fecha y ordenamos los días según las franjas que conseguimos.' },
          { text: 'Con o sin guía, el precio ya incluye lo que más se complica desde fuera: las reservas nominativas, el hotel, el coche con conductor durante los tres días de visitas y los traslados. La opción con guía añade a alguien de habla inglesa que te acompaña y te explica cada visita; la opción sin guía incluye asistencia a distancia: nos escribes si necesitas ayuda durante el viaje.' },
          { text: 'Cuatro noches en un hotel de 4 diamantes con desayuno. Sin paradas en tiendas.' },
          spanishGuide,
          { text: 'Lo único que necesitamos de ti: tus fechas y los datos del pasaporte de cada viajero, con al menos 8 días de margen.' },
        ],
        offer: offer(product, 'Cuatro noches con desayuno, traslados de llegada y salida, coche con conductor los tres días de visitas, entradas de adulto previstas y la gestión de las reservas. Con guía de habla inglesa o sin guía presencial.', true),
        cta: cta('Pekín en 5 días'),
      },
    };
  },

  'beijing-xian-shanghai-8-day-private-tour': product => ({
    meta: {
      title: `Circuito por China de 8 días: Pekín, Xi’an y Shanghái desde ${low(product).formatted}`,
      description: `${fromPrice(product)}: Pekín, Xi’an y Shanghái en 8 días, en privado, con guía en inglés, tren de alta velocidad, vuelo interno y entradas. Compatible con el tránsito sin visado de 240 horas.`,
    },
    answerIncludes: 'Siete noches en hoteles de 4 diamantes con desayuno (Pekín 3, Xi’an 2 y Shanghái 2), guía local de habla inglesa y coche privado los días de visita, traslados, entradas principales, tren de alta velocidad Pekín–Xi’an y vuelo Xi’an–Shanghái.',
    sales: {
      id: 'reservar-este-viaje', eyebrow: 'Antes de elegir fechas',
      title: 'Ocho días que caben en el tránsito sin visado de 240 horas, si cumples sus condiciones',
      intro: 'Con pasaporte español no necesitas el tránsito: puedes entrar en China sin visado hasta 30 días, hasta el 31 de diciembre de 2026. Para pasaportes sin esa exención, como el mexicano, Pekín, Shaanxi —la provincia de Xi’an— y Shanghái están dentro de las zonas del tránsito sin visado de 240 horas, y desde el 17 de diciembre de 2024 se puede viajar de una a otra. Así, este viaje puede hacerse sin tramitar visado, pero el tránsito tiene condiciones que no admiten improvisación.',
      diyTitle: 'Lo que exige el tránsito de 240 horas',
      diy: [
        { text: 'Tienes que salir de China hacia un tercer país o región, con un pasaje de fecha y asiento confirmados: volver directamente al país del que vienes no cuenta.' },
        { text: `Hay que entrar por un puesto fronterizo admitido —los aeropuertos de Pekín y Shanghái lo son— y no salir de las zonas permitidas (${spanishSalesSources.transit240.label}).`, links: [spanishSalesSources.transit240] },
        { text: 'Las 240 horas empiezan a contar a las 0:00 del día siguiente a tu llegada. Lo explicamos en nuestra guía de visado y entrada en China.', links: [{ label: 'guía de visado y entrada en China', href: p.visaGuide }] },
      ],
      lateTitle: 'Y las entradas no esperan',
      late: [
        u.forbidden[0],
        u.forbidden[1],
        { text: 'Con el tránsito de 240 horas, tu vuelo de salida ya tiene fecha fija: el día de la Ciudad Prohibida tiene que caber en ese calendario, no al revés.' },
        u.terracotta[0],
      ],
      solutionTitle: 'Lo que hacemos por ti',
      solution: [
        { text: 'Antes de pagar te enviamos por escrito las fechas de cada etapa, los trenes y el vuelo interno: así compruebas que el viaje cabe en tus 240 horas.' },
        { text: 'Reservamos la Ciudad Prohibida y los Guerreros de Terracota a nombre de cada viajero cuando abre la venta; las entradas están incluidas en el precio. Por eso te pedimos los datos del pasaporte en cuanto acordamos las fechas.' },
        { text: 'El precio ya incluye el tren de alta velocidad, el vuelo interno, todos los traslados y un guía local de habla inglesa con coche en cada ciudad: entre ciudades no tienes que comprar nada más.' },
        { text: 'Siete noches en hoteles de 4 diamantes con desayuno. Sin paradas en tiendas.' },
        spanishGuide,
      ],
      offer: offer(product, 'Siete noches con desayuno (Pekín 3, Xi’an 2 y Shanghái 2), guía local de habla inglesa y coche privado los días de visita, traslados, entradas principales, tren Pekín–Xi’an y vuelo Xi’an–Shanghái. Sin vuelos internacionales.', true),
      cta: cta('Pekín, Xi’an y Shanghái en 8 días'),
    },
    extraFaq: [spanishTransitFaq],
  }),

  'beijing-xian-guilin-shanghai-10-day-private-tour': product => ({
    meta: {
      title: `Circuito por China de 10 días: Pekín, Xi’an, Guilin y Shanghái desde ${low(product).formatted}`,
      description: `${fromPrice(product)}: China en 10 días, en privado. Ciudad Prohibida, Gran Muralla, Guerreros de Terracota, río Li y Shanghái, con guía en inglés, tren, dos vuelos internos y entradas.`,
    },
    answerIncludes: 'Nueve noches en hoteles de 4 diamantes con desayuno (Pekín 3, Xi’an 2, Guilin 1, Yangshuo 1 y Shanghái 2), guía local de habla inglesa y coche privado los días de visita, traslados, entradas principales, crucero por el Li, tren Pekín–Xi’an y vuelos Xi’an–Guilin y Guilin–Shanghái.',
    sales: {
      id: 'reservar-este-viaje', eyebrow: 'Antes de elegir fechas',
      title: 'Cuatro ciudades y tres reservas con reglas distintas: no lo dejes para el final',
      intro: 'Este viaje enlaza un tren, dos vuelos internos y un crucero, y sus tres visitas clave —la Ciudad Prohibida, los Guerreros de Terracota y el río Li— se reservan cada una con sus propias reglas.',
      diy: [
        u.forbidden[0],
        u.terracotta[0],
        u.liRiver[0],
        { text: 'Y todo eso hay que cuadrarlo con el tren Pekín–Xi’an y los vuelos Xi’an–Guilin y Guilin–Shanghái.' },
      ],
      late: [
        u.forbidden[1],
        { text: 'Si una entrada sale en una franja distinta de la prevista, hay que mover visitas de otra ciudad con los trenes y los vuelos ya comprados.' },
      ],
      solutionTitle: 'Lo que hacemos por ti',
      solution: [
        { text: 'Reservamos las tres visitas clave a nombre de cada viajero en cuanto abre la venta, con las entradas incluidas en el precio, y ordenamos el viaje según las franjas que conseguimos.' },
        { text: 'El precio ya incluye los dos vuelos internos, el tren de alta velocidad, todos los traslados y tus maletas por carretera hasta Yangshuo: entre ciudades no tienes que comprar nada más. Un conductor te lleva a cada salida y otro te recibe al llegar.' },
        { text: 'Guía local de habla inglesa y coche solo para tu grupo los días de visita.' },
        { text: 'Nueve noches en hoteles de 4 diamantes con desayuno. Sin paradas en tiendas.' },
        spanishGuide,
      ],
      offer: offer(product, 'Nueve noches con desayuno (Pekín 3, Xi’an 2, Guilin 1, Yangshuo 1 y Shanghái 2), guía local de habla inglesa y coche privado los días de visita, traslados, entradas principales, crucero por el Li, tren Pekín–Xi’an y vuelos Xi’an–Guilin y Guilin–Shanghái. Sin vuelos internacionales.', true),
      cta: cta('Pekín, Xi’an, Guilin y Shanghái en 10 días'),
    },
  }),

  'beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour': product => {
    const group = localizePrivateTourProduct(getPrivateTourProduct('beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour'), 'en');
    const groupPrice = spanishLowestPrice(group.packages);
    const tianmen = u.tianmen[0];
    return {
      meta: {
        title: `China en 14 días con Zhangjiajie y Guilin: tour privado desde ${low(product).formatted}`,
        description: `${fromPrice(product)}: Pekín, Xi’an, Zhangjiajie, río Li, Yangshuo y Shanghái en 14 días, en privado, con guía en inglés, vuelos internos y entradas.`,
      },
      answerIncludes: 'Trece noches en hoteles de 4 diamantes con desayuno, guía local de habla inglesa y coche privado los días de visita, traslados, entradas principales (Parque Forestal de Zhangjiajie, ascensor Bailong y Tianmen), crucero por el Li, balsa en el Yulong, trenes Pekín–Xi’an y Zhangjiajie–Guilin y vuelos Xi’an–Zhangjiajie y Guilin–Shanghái.',
      sales: {
        id: 'reservar-este-viaje', eyebrow: 'Antes de elegir fechas',
        title: 'En Zhangjiajie, la hora a la que entras decide cuánto tiempo pasas en la cola',
        intro: 'Este viaje junta los grandes clásicos de China con dos paisajes que atraen multitudes. Lo que pasó en las fiestas de 2025 explica por qué conviene planificarlo con tiempo.',
        lateTitle: 'Lo que conviene saber antes de elegir fechas',
        late: [...u.wulingyuan, ...u.tianmenPeak, u.forbidden[0], u.forbidden[1]],
        diyTitle: 'Lo que cambia desde octubre de 2026',
        diy: [
          { text: `${tianmen.text} Lo explicamos en nuestra guía de la montaña Tianmen.`, links: [...(tianmen.links ?? []), { label: 'guía de la montaña Tianmen', href: p.tianmenGuide }] },
        ],
        solutionTitle: 'Lo que hacemos por ti',
        solution: [
          { text: 'Tu guía organiza la hora de entrada y el sentido de la visita en el parque forestal: entrar temprano es la mejor forma de evitar las horas punta.' },
          { text: 'Reservamos la Ciudad Prohibida, los Guerreros de Terracota, Tianmen y el crucero por el Li a nombre de cada viajero; las entradas están incluidas en el precio.' },
          { text: 'El precio ya incluye dos vuelos internos, dos trenes, el crucero por el Li, las entradas principales y un guía local de habla inglesa con coche en cada ciudad: entre ciudades no tienes que comprar nada más. Duermes tres noches en la zona de Zhangjiajie y dos en Yangshuo.' },
          { text: 'Sin paradas en tiendas.' },
          spanishGuide,
          ...(groupPrice ? [{ text: `¿Es un grupo de 8 a 12 personas? En 2027 hay salidas en grupo reducido a ${groupPrice.formatted} por persona, el 17 de abril y el 16 de octubre.`, links: [{ label: 'salidas en grupo reducido', href: '/es/tours/beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour/' }] }] : []),
        ],
        offer: offer(product, 'Trece noches con desayuno, guía local de habla inglesa y coche privado los días de visita, traslados, entradas principales (Parque Forestal de Zhangjiajie, ascensor Bailong y Tianmen), crucero por el Li, balsa en el Yulong, trenes Pekín–Xi’an y Zhangjiajie–Guilin y vuelos Xi’an–Zhangjiajie y Guilin–Shanghái. Sin vuelos internacionales.', true),
        cta: cta('China en 14 días con Zhangjiajie y Guilin'),
      },
    };
  },

  'shanghai-suzhou-hangzhou-6-day-private-tour': product => ({
    meta: {
      title: `Shanghái, Suzhou y Hangzhou en 6 días: tour privado desde ${low(product).formatted}`,
      description: `${fromPrice(product)}: Shanghái, Suzhou y Hangzhou en 6 días, en privado, con guía en inglés, el Bund, los jardines de Suzhou, el templo Lingyin y el lago del Oeste. Traslados entre ciudades incluidos.`,
    },
    answerIncludes: 'Cinco noches en hoteles de 4 diamantes con desayuno (Shanghái 2, Suzhou 1 y Hangzhou 2), recibimiento con guía el día 1 y guía de habla inglesa del día 2 al 5, coches privados, entradas de adulto previstas —incluido el paseo en barco por el lago del Oeste— y los trayectos entre ciudades con tu equipaje. Empieza en Shanghái y termina en Hangzhou.',
    sales: {
      id: 'reservar-este-viaje', eyebrow: 'Antes de elegir fechas',
      title: 'Lo más bonito de Jiangnan no se improvisa: se reserva con nombre y hora',
      intro: 'Jiangnan —la región de Shanghái, Suzhou y Hangzhou— parece un viaje tranquilo, pero sus visitas más conocidas ya no admiten llegar sin reserva.',
      diy: [
        u.humble[0],
        u.lingyin[0],
        { text: 'Entre ciudades hay que mover las maletas: con 2 o 3 personas se suele ir en tren con traslados al hotel; con 4 a 9, de hotel a hotel en coche.' },
      ],
      late: [
        { text: 'Si llegas a Hangzhou sin reserva para Lingyin, ese día no podrás entrar: no se reserva para el mismo día.' },
        { text: 'Las entradas del Jardín del Administrador Humilde se reservan como mucho 7 días antes, así que no se pueden dejar compradas cuando reservas los vuelos: la reserva puede caer cuando ya estás de viaje, en un tren o en otra ciudad. Es justo el trámite que conviene dejar en otras manos.' },
      ],
      solutionTitle: 'Lo que hacemos por ti',
      solution: [
        { text: 'Reservamos el Jardín del Administrador Humilde, Lingyin y las demás entradas previstas a nombre de cada viajero en cuanto abren.' },
        { text: 'Recibimiento con guía de habla inglesa el día 1, guía del día 2 al 5 y traslado de salida con conductor el día 6.' },
        { text: 'Nos encargamos de los trayectos entre ciudades con tu equipaje, en tren con traslados o de hotel a hotel según el tamaño del grupo.' },
        { text: 'Lo que pagas cubre lo que más trabajo da en Jiangnan: dos cambios de hotel con maletas, las reservas con nombre y hora de Lingyin y del Jardín del Administrador Humilde, y un guía de habla inglesa cuatro días seguidos.' },
        { text: 'Cinco noches en hoteles de 4 diamantes con desayuno. Sin paradas en tiendas.' },
        spanishGuide,
      ],
      offer: offer(product, 'Cinco noches con desayuno, recibimiento con guía el día 1, guía de habla inglesa del día 2 al 5, coches privados, entradas de adulto previstas —incluido el paseo en barco por el lago del Oeste— y los trayectos entre ciudades. Sin vuelos.', false),
      cta: cta('Shanghái, Suzhou y Hangzhou en 6 días'),
    },
  }),
};
