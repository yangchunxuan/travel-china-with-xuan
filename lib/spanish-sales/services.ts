// @ts-ignore Node source tests use explicit TypeScript extensions.
import { attractionReservationServiceFeeCny } from '../attractionReservations.ts';
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS as leadDays } from '../attractionReservationGuarantee.ts';
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { privateGuideRates } from '../privateGuideServices.ts';
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { getPrivateTourProduct, localizePrivateTourProduct, privateTourProducts } from '../privateTourProducts.ts';
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { getSpanishTourCopy } from '../spanishTourCopy.ts';
import {
  spanishLowestPrice, spanishSalesFacts, spanishSalesLabels, spanishSalesPaths, spanishSalesSources, spanishSiteUrgency,
  type SpanishLinkedText, type SpanishSalesCopy,
// @ts-ignore Node source tests use explicit TypeScript extensions.
} from '../spanishSales.ts';

const f = spanishSalesFacts, u = spanishSiteUrgency, p = spanishSalesPaths;
const cny = (amount: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'CNY', currencyDisplay: 'code', maximumFractionDigits: 0 }).format(amount);
const fee = cny(attractionReservationServiceFeeCny);
const tourPrice = (slug: string) => {
  const price = spanishLowestPrice(localizePrivateTourProduct(getPrivateTourProduct(slug), 'en').packages);
  if (!price) throw new Error(`No published price: ${slug}`);
  return price;
};
/** The lowest published per-person price in the catalogue, with its route. */
function catalogueFrom() {
  const priced = privateTourProducts.flatMap((product: Parameters<typeof localizePrivateTourProduct>[0]) => {
    const price = spanishLowestPrice(localizePrivateTourProduct(product, 'en').packages);
    return price ? [{ slug: product.slug, price }] : [];
  });
  return priced.reduce((low: typeof priced[number], item: typeof priced[number]) => item.price.lowest.amount < low.price.lowest.amount ? item : low);
}
const guideFrom = Math.min(...Object.values(privateGuideRates).map(rate => rate.standardCny));
const guideTop = Math.max(...Object.values(privateGuideRates).map(rate => rate.standardCny));
const reservationGuarantee = `Si nos envías la solicitud y pagas al menos ${leadDays} días antes de la visita, la reserva está garantizada; si no la conseguimos, te devolvemos íntegros la tarifa de servicio y el importe de la entrada de ese lugar.`;
const shaanxiDemand: SpanishLinkedText = { text: `En 2023, el Museo de Historia de Shaanxi recibía cada día más de 600 000 intentos de reserva para unas 12 000 plazas (${spanishSalesSources.shaanxiDemand.label}).`, links: [spanishSalesSources.shaanxiDemand] };
const transitNote: SpanishLinkedText = { text: `Si viajas con el tránsito sin visado de 240 horas, el itinerario tiene que caber en ese plazo, quedarse en las zonas permitidas y terminar en un vuelo a un tercer país o región (${spanishSalesSources.transit240.label}).`, links: [spanishSalesSources.transit240] };
const pandaMorning: SpanishLinkedText = { ...u.panda[1], text: `${u.panda[1].text} Por eso, en la base de pandas de Chengdu conviene la entrada de mañana, que se reserva en línea hasta 14 días antes, según disponibilidad.` };
const license = 'Agencia de viajes con licencia en Pekín: L-BJ10587';
const reply = 'Respondemos en menos de 12 horas';
const completeForm = 'Completa el formulario de esta página o escríbenos por WhatsApp o por correo con la ciudad, la fecha y el número de viajeros. Respondemos en menos de 12 horas.';

export function spanishServiceSales(id: 'reservations' | 'car' | 'guides' | 'support'): SpanishSalesCopy {
  const eight = tourPrice('beijing-xian-shanghai-8-day-private-tour');
  if (id === 'reservations') return {
    id: 'por-que-reservar-antes', eyebrow: 'Antes de viajar',
    title: 'En China, muchas visitas no se pueden comprar en la puerta',
    intro: 'Los grandes museos y monumentos venden entradas nominativas, con días y horas de venta fijos, en canales oficiales, muchos de ellos en chino. Esto es lo que te encuentras si lo intentas por tu cuenta:',
    diy: [
      { text: 'Las entradas salen a horas fijas de China: la Ciudad Prohibida, 7 días antes a las 20:00 (las 6:00 en Ciudad de México y las 13:00 o las 14:00 en Madrid); el Museo de Historia de Shaanxi, 5 días antes a las 17:00.' },
      { text: 'Muchos canales oficiales son miniprogramas de WeChat o webs en chino, y cada entrada lleva el nombre y el número de pasaporte de un visitante.' },
      { text: 'En la puerta te piden el pasaporte original con el que reservaste: una foto o una fotocopia no sirven.' },
      { text: 'En el Museo de Historia de Shaanxi, no presentarse supone 180 días sin poder reservar.' },
    ],
    late: [u.forbidden[1], shaanxiDemand, pandaMorning, u.jade[0]],
    solutionTitle: 'Lo que hacemos por ti',
    solution: [
      { text: 'Reservamos en el canal oficial de cada lugar, a nombre de tu pasaporte, en cuanto abre la venta.' },
      { text: `Pagas la entrada a su precio oficial, sin recargo, más ${fee} de tarifa de servicio por persona y lugar.` },
      { text: 'Recibes los justificantes y las indicaciones de acceso: qué llevar y por dónde entrar.' },
      { text: 'Si reservas un viaje privado con nosotros, las reservas de ese viaje no tienen tarifa de servicio. Mira los viajes privados con precio publicado.', links: [{ label: 'viajes privados con precio publicado', href: p.tours }] },
    ],
    offer: {
      name: 'Reserva de entradas en China',
      includes: 'La reserva nominativa en el canal oficial, los justificantes y las indicaciones de acceso de cada lugar, en Pekín, Shanghái, Suzhou, Hangzhou, Xi’an, Chengdu, Guilin, Lijiang y Datong.',
      price: `${fee} de tarifa de servicio por persona y lugar, más la entrada a su precio oficial, sin recargo.`,
      guarantee: reservationGuarantee,
      book: 'Elige los lugares y las fechas en el formulario de esta página y envíanos el mensaje por WhatsApp o por correo. Respondemos en menos de 12 horas.',
      pay: f.payService,
    },
    cta: { label: 'Enviar mis fechas por WhatsApp', message: 'Hola, quiero reservar mis entradas en China con Homeground.\nLugares:\nFechas de visita:\nNúmero de viajeros:', subject: 'Reserva de entradas en China' },
    trust: [license, 'Reservamos en el canal oficial de cada lugar, a nombre de tu pasaporte', 'Sin reventa ni recargo: la entrada, al precio oficial', reply],
  };
  if (id === 'car') return {
    id: 'por-que-reservar-el-coche', eyebrow: 'Antes de viajar',
    title: 'Los mejores horarios son los primeros, y para llegar a tiempo hace falta un coche reservado',
    intro: 'En los lugares más visitados de China, entrar temprano cambia el día. Pero las visitas quedan lejos del centro y, con maletas o en grupo, no siempre es fácil moverse a esa hora.',
    diy: [
      { text: 'Muchas visitas quedan lejos del hotel: Mutianyu, por ejemplo, está a unos 90 minutos de Pekín por carretera.' },
      { text: 'Con equipaje y varias personas, hace falta un vehículo con espacio suficiente y un conductor que te espere a la hora a la que llega tu vuelo o tu tren.' },
    ],
    lateTitle: 'Lo que pasa a primera hora',
    late: [
      { ...u.wulingyuanAlone[0], text: `${u.wulingyuanAlone[0].text} Estar en la puerta a esa hora es mucho más fácil con un coche reservado de antemano.` },
      { ...u.panda[1], text: `${u.panda[1].text} Para llegar antes, hay que salir del hotel muy temprano, con el transporte ya cerrado.` },
      { text: 'En la base de pandas de Chengdu, la entrada se reserva en línea hasta 14 días antes, según disponibilidad, con turno de mañana o de tarde, y la venta en taquilla queda para casos especiales: si quieres estar allí a primera hora, la entrada de mañana y el coche tienen que estar cerrados antes de llegar.' },
    ],
    solutionTitle: 'Lo que hacemos por ti',
    solution: [
      { text: 'Coche privado con conductor en cualquier ciudad de China continental, sin Hong Kong ni Macao: traslados, días de visitas y trayectos entre ciudades.' },
      { text: 'Los conductores son nuestros, no subcontratados.' },
      { text: 'Te confirmamos por escrito el vehículo, el punto de recogida y la hora: cuando aterrizas, no tienes que buscar, explicar ni negociar nada.' },
      { text: 'Elegimos el vehículo según el número de personas y el equipaje.' },
      { text: `Si además quieres guía, lo añadimos aparte: guía de habla inglesa desde ${cny(guideFrom)} por jornada de hasta 8 horas. Si lo prefieres en español, hay guía de habla hispana en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en tu presupuesto.`, links: [{ label: 'guía de habla inglesa', href: p.guides }] },
    ],
    offer: {
      name: 'Coche privado con conductor en China',
      includes: 'Un vehículo para tu grupo y tu equipaje, conductor propio, recogida en la hora y el lugar acordados y la ruta confirmada por escrito.',
      price: 'Precio a medida, según la ruta, las horas y el vehículo: te respondemos en menos de 12 horas y te enviamos el total por escrito antes de pagar. Si prefieres un viaje completo, el coche con conductor ya va incluido en nuestros viajes privados con precio publicado.',
      guarantee: 'La ruta, el vehículo, los horarios y el precio total quedan confirmados por escrito antes de pagar.',
      guaranteeLabel: spanishSalesLabels.beforePay,
      book: completeForm,
      pay: f.payService,
    },
    cta: { label: 'Pedir presupuesto por WhatsApp', message: 'Hola, necesito un coche con conductor en China.\nCiudad o ciudades:\nFecha:\nNúmero de viajeros y maletas:', subject: 'Coche con conductor en China' },
    trust: [license, 'Conductores propios, no subcontratados', 'Cualquier ciudad de China continental, sin Hong Kong ni Macao', reply],
  };
  if (id === 'guides') return {
    id: 'por-que-reservar-el-guia', eyebrow: 'Antes de viajar',
    title: 'Un buen día de visita empieza antes: con la hora de entrada y las reservas',
    intro: 'En los lugares más visitados de China, lo que decide el día no es solo la explicación, sino a qué hora entras y si tienes la reserva hecha.',
    diy: [
      u.forbidden[0],
      { text: 'En los Guerreros de Terracota, la visita al museo lleva unas 2 horas y media a 3 horas, y la venta puede cerrarse cuando se alcanza el aforo del día.' },
    ],
    late: [
      { ...u.wulingyuanAlone[0], text: `${u.wulingyuanAlone[0].text} Decidir esa hora de entrada es parte del trabajo de un buen guía.` },
      { text: `Para que tu guía tenga la hora de entrada planificada y las entradas a tu nombre, todo tiene que estar cerrado antes de que abra la venta: 7 días antes en la Ciudad Prohibida y 5 días antes, a las 17:00, en el Museo de Historia de Shaanxi, que en 2023 recibía cada día más de 600 000 intentos de reserva para unas 12 000 plazas (${spanishSalesSources.shaanxiDemand.label}).`, links: [spanishSalesSources.shaanxiDemand] },
      u.forbidden[1],
    ],
    solutionTitle: 'Lo que hacemos por ti',
    solution: [
      { text: 'Un guía con licencia oficial china de guía turístico que te explica lo que ves, organiza contigo la hora de entrada y el orden de la visita, y te ayuda a moverte en un país donde muchas indicaciones y aplicaciones están en chino.' },
      { text: 'Los guías son nuestros, no subcontratados.' },
      { text: '¿No te manejas en inglés? Elige guía de habla hispana en el formulario: lo hay en todas las ciudades.' },
      { text: `Las entradas las reservamos aparte por ${fee} por persona y lugar, más el precio oficial. Si nos las encargas y pagas al menos ${leadDays} días antes, la reserva está garantizada; si no la conseguimos, te devolvemos íntegros la tarifa y el importe de la entrada.`, links: [{ label: 'Las entradas las reservamos aparte', href: p.reservations }] },
      { text: 'Si necesitas transporte, añadimos coche con conductor en cualquier ciudad de China continental.', links: [{ label: 'coche con conductor', href: p.car }] },
    ],
    offer: {
      name: 'Guía privado en China',
      includes: 'Un guía con licencia solo para tu grupo, durante un máximo de 8 horas, con un recorrido acordado según tus intereses y tu ritmo. En inglés o en español.',
      price: `Guía de habla inglesa: ${cny(privateGuideRates.shanghai.standardCny)} por jornada en Shanghái y Pekín; ${cny(privateGuideRates.xian.standardCny)} en Xi’an y Zhangjiajie. En fechas de temporada alta se aplica la tarifa de temporada alta de cada ciudad, y te decimos cuál corresponde a tu fecha antes de reservar. El guía de habla hispana lleva un suplemento según ciudad y temporada, que confirmamos en tu presupuesto.`,
      guarantee: 'La tarifa, el horario y los servicios quedan confirmados por escrito antes de pagar.',
      guaranteeLabel: spanishSalesLabels.beforePay,
      book: completeForm,
      pay: f.payService,
    },
    cta: { label: 'Consultar un guía por WhatsApp', message: 'Hola, quiero un guía privado en China.\nCiudad:\nFecha:\nNúmero de viajeros:\nIdioma del guía (inglés o español):', subject: 'Guía privado en China' },
    trust: [license, 'Guías propios, no subcontratados', 'Guías con licencia oficial china de guía turístico', 'Guía de habla hispana en todas las ciudades, con suplemento'],
  };
  return {
    id: 'por-que-organizarlo-con-tiempo', eyebrow: 'Antes de viajar',
    title: 'Un viaje por China tiene decenas de reservas con fecha y hora: lo difícil es que encajen',
    intro: 'Vuelos internos, trenes, hoteles y entradas nominativas que salen a la venta en días distintos. Si una pieza falla, hay que mover las demás.',
    diy: [
      u.forbidden[0],
      { text: 'Las entradas de los grandes lugares se emiten a nombre de cada pasaporte, así que los datos de todos los viajeros tienen que estar listos antes de que abra la venta.' },
      transitNote,
    ],
    late: [u.forbidden[1], u.wulingyuan[0]],
    solutionTitle: 'Lo que hacemos por ti',
    solution: [
      { text: 'Una misma persona planifica tu viaje de principio a fin: itinerario, hoteles, entradas, guías y traslados.' },
      { text: 'Guías y conductores propios, no subcontratados.' },
      { text: f.spanishGuideConcern },
      { text: 'Reservamos las entradas a nombre de cada viajero en cuanto abren y te lo confirmamos todo por escrito antes de que pagues.' },
      { text: 'Sin paradas en tiendas. Si prefieres partir de una ruta ya diseñada, mira nuestros viajes privados con precio publicado.', links: [{ label: 'viajes privados con precio publicado', href: p.tours }] },
    ],
    offer: {
      name: 'Viaje a China a medida',
      includes: 'El itinerario, los hoteles, las reservas de entradas, guías en inglés o en español en los días que elijas, el coche y los traslados, y la coordinación mientras estás en China.',
      price: `Según la ruta y lo que quieras gastar. Como referencia, el circuito privado de 8 días por Pekín, Xi’an y Shanghái cuesta ${eight.twoFormatted} por persona con 2 viajeros y ${eight.formatted} con 6.`,
      guarantee: 'La propuesta escrita detalla los servicios, los proveedores, el precio total y las condiciones antes de cualquier pago.',
      guaranteeLabel: spanishSalesLabels.beforePay,
      book: 'Cuéntanos tu idea en el formulario de esta página o por WhatsApp. La primera consulta es gratuita y respondemos en menos de 12 horas.',
      pay: f.payTour,
    },
    cta: { label: 'Contar mi viaje por WhatsApp', message: 'Hola, quiero organizar un viaje a China a medida.\nFechas aproximadas:\nNúmero de viajeros:\nCiudades que me interesan:\nPresupuesto aproximado:', subject: 'Viaje a China a medida' },
  };
}

export function spanishHubSales(id: 'tours' | 'services'): SpanishSalesCopy {
  const from = catalogueFrom();
  const fromName = getSpanishTourCopy(from.slug).title.split(':')[0];
  const beijing = tourPrice('beijing-highlights-5-day-private-tour');
  const eight = tourPrice('beijing-xian-shanghai-8-day-private-tour');
  const guilin = tourPrice('guilin-yangshuo-5-day-private-tour');
  const picks: SpanishLinkedText = {
    text: `Para empezar: Pekín en 5 días, desde ${beijing.formatted} por persona; Pekín, Xi’an y Shanghái en 8 días, desde ${eight.formatted}; Guilin y Yangshuo en 5 días, desde ${guilin.formatted} (precios por persona con 6 viajeros).`,
    links: [
      { label: 'Pekín en 5 días', href: '/es/tours/beijing-highlights-5-day-private-tour/' },
      { label: 'Pekín, Xi’an y Shanghái en 8 días', href: '/es/tours/beijing-xian-shanghai-8-day-private-tour/' },
      { label: 'Guilin y Yangshuo en 5 días', href: '/es/tours/guilin-yangshuo-5-day-private-tour/' },
    ],
  };
  if (id === 'tours') return {
    id: 'antes-de-elegir', eyebrow: 'Antes de reservar',
    title: 'Elegir pronto el viaje te da margen para las visitas clave',
    intro: 'La Ciudad Prohibida y los Guerreros de Terracota se reservan con nombre y fecha, y en fechas punta pueden quedarse sin plazas; en Zhangjiajie, lo que se dispara son las colas.',
    diyTitle: 'Lo que conviene saber',
    diy: [
      u.forbidden[0],
      u.terracotta[0],
      { text: `Con pasaporte español puedes entrar en China sin visado hasta 30 días, hasta el 31 de diciembre de 2026. Con pasaporte mexicano, y con otros pasaportes admitidos, el tránsito sin visado de 240 horas permite recorrer Pekín, Shaanxi y Shanghái si sales hacia un tercer país o región (${spanishSalesSources.transit240.label}). Nuestro viaje Pekín, Xi’an y Shanghái en 8 días cabe en ese plazo.`, links: [spanishSalesSources.transit240, { label: 'Pekín, Xi’an y Shanghái en 8 días', href: '/es/tours/beijing-xian-shanghai-8-day-private-tour/' }] },
    ],
    late: [u.forbidden[1], u.wulingyuan[0]],
    solutionTitle: 'Lo que hacemos por ti',
    solution: [
      { text: 'La mayoría de los viajes publican su precio por persona según el número de viajeros: sabes cuánto cuesta antes de escribirnos.' },
      { text: 'Reservamos las entradas incluidas a nombre de cada viajero y te confirmamos por escrito hoteles, servicios y precio total antes de que pagues.' },
      { text: 'Guías y conductores propios, no subcontratados. Sin paradas en tiendas.' },
      { text: f.spanishGuideConcern },
      picks,
      { text: '¿Ya tienes el viaje organizado y solo necesitas una parte? Mira nuestros servicios: entradas, guía, coche con conductor o el viaje completo a medida.', links: [{ label: 'nuestros servicios', href: p.services }] },
    ],
    offer: {
      name: 'Tu viaje privado por China',
      includes: 'Según el itinerario: hoteles con desayuno, coche privado, traslados, las entradas indicadas y, en la mayoría de los viajes, guía de habla inglesa los días de visita. Cada ficha indica el servicio de guía.',
      price: `Desde ${from.price.formatted} por persona (${fromName}, con ${from.price.lowest.travelers} viajeros). Los más pedidos: Pekín en 5 días, desde ${beijing.formatted}, y Pekín, Xi’an y Shanghái en 8 días, desde ${eight.formatted} (precios por persona con 6 viajeros).`,
      guarantee: `En los viajes privados que pasan por Pekín: ${f.beijingGuarantee.charAt(0).toLowerCase()}${f.beijingGuarantee.slice(1)}`,
      book: f.book,
      pay: f.payTour,
    },
    cta: { label: 'Consultar un viaje por WhatsApp', message: 'Hola, estoy preparando un viaje a China.\nViaje que me interesa:\nFechas aproximadas:\nNúmero de viajeros:', subject: 'Consulta: viaje a China' },
  };
  return {
    id: 'servicios-y-precios', eyebrow: 'Servicios y precios',
    title: 'Elige solo la ayuda que necesitas, con el precio por delante',
    intro: 'No hace falta contratar un circuito para tener respaldo local en China. Esto es lo que ofrecemos y lo que cuesta:',
    diyTitle: 'Nuestros servicios',
    diy: [
      { text: `Reserva de entradas: ${fee} por persona y lugar, más la entrada a su precio oficial, con reserva garantizada si nos la encargas y pagas al menos ${leadDays} días antes.`, links: [{ label: 'Reserva de entradas', href: p.reservations }] },
      { text: `Guía privado de habla inglesa: ${cny(guideFrom)} por jornada de hasta 8 horas en Xi’an o Zhangjiajie, y ${cny(guideTop)} en Shanghái o Pekín. También hay guía de habla hispana en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en tu presupuesto.`, links: [{ label: 'Guía privado de habla inglesa', href: p.guides }] },
      { text: 'Coche con conductor: en cualquier ciudad de China continental, con presupuesto según la ruta.', links: [{ label: 'Coche con conductor', href: p.car }] },
      { text: 'Viaje completo a medida: itinerario, hoteles, entradas, guías y traslados, con la primera consulta gratuita.', links: [{ label: 'Viaje completo a medida', href: p.support }] },
      { text: `Viajes privados con precio publicado: desde ${from.price.formatted} por persona.`, links: [{ label: 'Viajes privados con precio publicado', href: p.tours }] },
    ],
    lateTitle: 'Lo que más urge: las entradas',
    late: [u.forbidden[0], u.forbidden[1], shaanxiDemand, u.jade[0]],
    solutionTitle: 'Cómo trabajamos',
    solution: [
      { text: 'Nos dices qué necesitas y cuándo, por WhatsApp o por correo, y respondemos en menos de 12 horas.' },
      { text: 'Antes de que pagues, te enviamos por escrito el servicio, el precio total y las condiciones.' },
      { text: 'Reservamos a nombre de cada viajero y te mandamos los justificantes y las indicaciones de acceso.' },
      { text: 'Si algo cambia en tu viaje, hablas con la misma persona que lo organizó.' },
    ],
    offer: {
      name: 'Empieza por lo más urgente: tus entradas',
      includes: 'La reserva nominativa en el canal oficial de cada lugar, los justificantes y las indicaciones de acceso.',
      price: `${fee} de tarifa de servicio por persona y lugar, más la entrada a su precio oficial, sin recargo.`,
      guarantee: reservationGuarantee,
      book: f.book,
      pay: f.payService,
    },
    cta: { label: 'Enviar mis fechas por WhatsApp', message: 'Hola, quiero reservar mis entradas en China con Homeground.\nLugares:\nFechas de visita:\nNúmero de viajeros:', subject: 'Reserva de entradas en China' },
  };
}
