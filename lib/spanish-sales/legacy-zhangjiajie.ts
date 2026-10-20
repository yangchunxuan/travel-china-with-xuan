import {
  spanishSalesFacts, spanishSalesLabels, spanishSalesPaths, spanishSiteUrgency,
  type SpanishAnswerCopy, type SpanishSalesCopy,
// @ts-ignore Node source tests use explicit TypeScript extensions.
} from '../spanishSales.ts';

/** The published stay tiers, already formatted, with the dates the prices apply to. */
export interface SpanishZhangjiajiePricing {
  readonly tiers: readonly { readonly name: string; readonly base: string; readonly six: string }[];
  readonly validFromLabel: string;
  readonly validUntilLabel: string;
}

const f = spanishSalesFacts, u = spanishSiteUrgency;
const priceLine = (pricing: SpanishZhangjiajiePricing) => `${pricing.tiers.map(tier => `${tier.name}: ${tier.base} por persona de 2 a 4 adultos, ${tier.six} con 6`).join(' · ')}. Precios publicados para viajes del ${pricing.validFromLabel} al ${pricing.validUntilLabel}.`;

export function spanishZhangjiajieSearchMeta(pricing: SpanishZhangjiajiePricing) {
  const [city] = pricing.tiers;
  return {
    title: `Tour privado Zhangjiajie 4 días: Avatar, puente de cristal y Tianmen desde ${city.six}`,
    description: `Viaje privado de 4 días en Zhangjiajie: parque forestal (montañas de Avatar), puente de cristal y Tianmen, con guía en inglés los días 2 y 3. Desde ${city.base} por persona de 2 a 4 adultos; ${city.six} con 6.`,
  };
}

export function spanishZhangjiajieAnswer(pricing: SpanishZhangjiajiePricing): SpanishAnswerCopy {
  return {
    eyebrow: 'En resumen',
    title: '¿Cuánto cuesta y qué incluye?',
    items: [
      { label: 'Duración', value: '4 días y 3 noches, en privado: solo tu grupo. Parque forestal, puente de cristal del Gran Cañón y montaña Tianmen.' },
      { label: 'Precio', value: priceLine(pricing) },
      { label: 'Incluye', value: 'Tres noches en la categoría elegida, coche privado y traslados de llegada y salida, guía de habla inglesa los días 2 y 3 y las entradas de adulto de las visitas del programa: el parque forestal, el puente de cristal del Gran Cañón, la cueva de Huanglong o el lago Baofeng (una de las dos) y Tianmen por la ruta C. La lista exacta de entradas y transportes internos te la confirmamos por escrito antes de pagar.' },
      { label: 'No incluye', value: 'El viaje hasta Zhangjiajie y desde allí; almuerzos y cenas; actividades opcionales; el guía del día 4.' },
      { label: 'Idioma del guía', value: `Inglés los días 2 y 3. ${f.spanishGuide}` },
      { label: 'Reserva y pago', value: `${f.book} ${f.payTour}` },
      { label: 'Quién lo organiza', value: `${f.trust.join(' · ')}.` },
    ],
  };
}

export function spanishZhangjiajieSales(pricing: SpanishZhangjiajiePricing): SpanishSalesCopy {
  return {
    id: 'reservar-este-viaje', eyebrow: 'Antes de elegir fechas',
    title: 'En Zhangjiajie, la hora a la que entras decide cuánto tiempo pasas en la cola',
    intro: 'Son tres días de paisajes con ascensores, teleféricos y autobuses dentro de los parques. En fechas punta, todo eso se convierte en colas.',
    lateTitle: 'Lo que ya ha pasado en fechas punta',
    late: [...u.wulingyuan, ...u.tianmenPeak, { text: 'La franja de Tianmen que consigas decide si el día 4 cabe antes de tu tren o tu vuelo: cuanto antes tengamos tus fechas y los datos del pasaporte, más margen tenemos para elegirla.' }],
    diyTitle: 'Lo que cambia desde octubre de 2026',
    diy: [
      u.tianmen[0],
      { text: 'Las entradas de Tianmen y del parque forestal asignan recorrido y franja horaria, y el día 4 hay que encajar Tianmen con la hora de tu tren o vuelo. Lo explicamos en nuestra guía de la montaña Tianmen.', links: [{ label: 'guía de la montaña Tianmen', href: spanishSalesPaths.tianmenGuide }] },
    ],
    solutionTitle: 'Lo que hacemos por ti',
    solution: [
      { text: 'Tu guía organiza la hora de entrada y el sentido de la visita en el parque forestal: entrar temprano es la mejor forma de evitar las horas punta.' },
      { text: 'Reservamos las entradas incluidas y, antes de que pagues, comprobamos tu franja de Tianmen frente a la hora de salida: solo combinamos las dos cosas el mismo día si hay margen.' },
      { text: 'Guía de habla inglesa los días 2 y 3, coche privado todo el viaje y tres noches en la categoría de alojamiento que elijas.' },
      { text: `Por ${pricing.tiers[0].base} por persona (de 2 a 4 adultos, ${pricing.tiers[0].name.toLowerCase()}) tienes resuelto lo que más tiempo hace perder en Zhangjiajie: las entradas y las franjas, un coche para moverte entre tres zonas alejadas entre sí y un guía que decide a qué hora entrar.` },
      { text: 'Sin paradas en tiendas.' },
      { text: f.spanishGuideConcern },
    ],
    offer: {
      name: 'Zhangjiajie en 4 días: viaje privado',
      includes: 'Tres noches en la categoría elegida, coche privado y traslados, guía de habla inglesa los días 2 y 3 y las entradas de adulto de las visitas del programa, con la lista exacta por escrito antes de pagar. Sin el viaje hasta Zhangjiajie.',
      price: priceLine(pricing),
      guarantee: f.beforePayTour,
      guaranteeLabel: spanishSalesLabels.beforePay,
      book: f.book,
      pay: f.payTour,
    },
    cta: { label: 'Consultar mis fechas por WhatsApp', message: 'Hola, me interesa el viaje Zhangjiajie en 4 días.\nFechas aproximadas:\nNúmero de viajeros:\nAlojamiento preferido:', subject: 'Consulta: Zhangjiajie en 4 días' },
    faq: [
      { question: '¿Cuánto cuesta el viaje de 4 días a Zhangjiajie?', answer: `${priceLine(pricing)} Para 5 personas, 7 o más, o grupos con niños, preparamos un presupuesto según las habitaciones y las entradas. ${f.writtenTour}` },
      { question: '¿Cómo se reserva y cómo se paga?', answer: `${f.book} ${f.writtenTour} ${f.payTour}` },
      { question: '¿Hay guía en español?', answer: 'Sí. El precio incluye guía de habla inglesa los días 2 y 3; si lo prefieres en español, lo hay en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en tu presupuesto.' },
      { question: '¿Quién organiza el viaje?', answer: `${f.license} Los guías y los conductores son nuestros, no subcontratados. No hay paradas en tiendas y una misma persona planifica tu viaje de principio a fin.` },
      { question: '¿Cómo se sube a Tianmen ahora?', answer: 'Desde el 13 de octubre de 2026 solo se vende la ruta C: desde la puerta de la montaña, teleférico rápido hasta la cueva de Tianmen y escaleras mecánicas hasta la cima, con regreso por el mismo camino. El teleférico que sale de la ciudad de Zhangjiajie no transporta pasajeros y su reapertura no tiene fecha anunciada.' },
    ],
  };
}
