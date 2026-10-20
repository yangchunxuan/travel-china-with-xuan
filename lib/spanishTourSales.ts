import type { LocalizedPrivateTourProduct } from './privateTourProducts';
import {
  spanishLowestPrice, spanishPriceLine, spanishSalesFacts, spanishSalesLabels, spanishSiteUrgency,
  type SpanishAnswerCopy, type SpanishLinkedText, type SpanishSalesCopy, type SpanishUrgencySite,
// @ts-ignore Node source tests use explicit TypeScript extensions.
} from './spanishSales.ts';
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { spanishKeyTourSales } from './spanish-sales/key-tours.ts';

/**
 * Reservable sights in each itinerary, read from the English source itinerary
 * on 2026-10-19. A sight listed here gets its booking rule or dated peak-day
 * fact in the sales block; tours without one get no urgency claim at all.
 */
const sitesBySlug: Readonly<Record<string, readonly SpanishUrgencySite[]>> = {
  'shanghai-suzhou-hangzhou-6-day-private-tour': ['lingyin', 'humble'],
  'chengdu-pandas-sanxingdui-5-day-private-tour': ['panda'],
  'xian-terracotta-warriors-5-day-private-tour': ['terracotta'],
  'guilin-yangshuo-5-day-private-tour': ['liRiver'],
  'guilin-li-river-yangshuo-4-day-private-tour': ['liRiver'],
  'shanghai-suzhou-5-day-private-tour': ['humble'],
  'beijing-highlights-5-day-private-tour': ['forbidden'],
  'zhangjiajie-forest-4-day-private-tour': ['wulingyuan', 'tianmen'],
  'zhangjiajie-furong-fenghuang-7-day-private-tour': ['wulingyuan'],
  'chengdu-jiuzhaigou-huanglong-6-day-private-tour': ['panda'],
  'chengdu-chongqing-8-day-private-tour': ['panda'],
  'datong-pingyao-6-day-private-tour': ['hanging'],
  'beijing-xian-shanghai-12-day-private-tour': ['forbidden', 'terracotta'],
  'beijing-xian-chengdu-guilin-shanghai-14-day-private-tour': ['forbidden', 'panda', 'terracotta', 'liRiver'],
  'beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour': ['forbidden', 'panda', 'terracotta', 'liRiver'],
  'beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour': ['forbidden', 'wulingyuan', 'tianmen', 'liRiver'],
  'beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour': ['forbidden', 'wulingyuan', 'tianmen', 'liRiver'],
  'beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour': ['forbidden', 'panda', 'terracotta'],
  'beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour': ['forbidden', 'panda', 'terracotta'],
  'beijing-xian-silk-road-15-day-private-tour': ['forbidden', 'terracotta'],
  'beijing-xian-silk-road-15-day-small-group-tour': ['forbidden', 'terracotta'],
  'beijing-xian-yunnan-14-day-private-tour': ['forbidden', 'jade', 'terracotta'],
  'beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour': ['forbidden', 'lingyin', 'terracotta'],
  'china-grand-tour-21-day-private-tour': ['forbidden', 'wulingyuan', 'tianmen', 'panda'],
  'beijing-xian-guilin-shanghai-10-day-private-tour': ['forbidden', 'terracotta', 'liRiver'],
  'beijing-hangzhou-suzhou-shanghai-11-day-private-tour': ['forbidden', 'lingyin', 'humble'],
  'shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour': ['wulingyuan', 'tianmen', 'liRiver'],
  'beijing-xian-shanghai-8-day-private-tour': ['forbidden', 'terracotta', 'mutianyu'],
  'beijing-xian-guilin-hong-kong-10-day-private-tour': ['forbidden', 'terracotta', 'liRiver'],
  'beijing-xian-yangtze-cruise-shanghai-12-day-private-tour': ['forbidden', 'terracotta'],
  'suzhou-tongli-hangzhou-shanghai-12-day-private-tour': ['humble'],
  'beijing-xian-chengdu-guilin-shanghai-13-day-private-tour': ['forbidden', 'panda', 'terracotta', 'liRiver'],
};
export function spanishTourSites(slug: string) { return sitesBySlug[slug] ?? []; }

/** Owner, 2026-10-19: the Beijing refund covers private tours with a Beijing stage; small groups wait for a decision. */
export function beijingRefund(product: LocalizedPrivateTourProduct) {
  return product.tourFormat !== 'small-group' && spanishTourSites(product.slug).includes('forbidden');
}

const startsInHarbin = (slug: string) => slug.startsWith('harbin-');

const shortNames: Readonly<Record<string, string>> = {
  'beijing-highlights-5-day-private-tour': 'Pekín en 5 días',
  'shenzhen-family-tech-4-day-private-tour': 'Shenzhen en familia, 4 días',
};
const commonStart = /^(?:Un|Una|Dos|Tres|Cuatro|Cinco|Seis|Siete|Ocho|Nueve|Diez|Once|Doce|Trece|Catorce|Quince|Veinte|El|La|Los|Las|Vehículo|Traslados|Hoteles|Guía|Guías|Salidas|Alojamiento|Transporte)\b/u;
/** Lower-cases a leading common word so the text can follow a colon. */
const afterColon = (text: string) => commonStart.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text;

/** "Guilin y Yangshuo en 5 días", from the Spanish title. */
export function spanishTourShortName(product: LocalizedPrivateTourProduct) {
  if (shortNames[product.slug]) return shortNames[product.slug];
  const core = product.title.split(':')[0].trim();
  if (/\d+\s+días?/.test(core)) return core;
  return / en /.test(core) ? `${core} (${product.days} días)` : `${core} en ${product.days} días`;
}

function priceLine(product: LocalizedPrivateTourProduct) {
  if (product.tourFormat !== 'small-group') return spanishPriceLine(product.packages);
  const low = spanishLowestPrice(product.packages);
  return low ? `${low.formatted} por persona, en grupo reducido.` : spanishPriceLine(product.packages);
}

/** Search title and description aimed at Spanish buying queries, with the published price. */
export function spanishTourSearchMeta(product: LocalizedPrivateTourProduct) {
  const key = spanishKeyTourSales[product.slug]?.(product);
  if (key?.meta) return key.meta;
  const name = spanishTourShortName(product);
  const low = spanishLowestPrice(product.packages);
  if (!low) return { title: `${name}: viaje privado a medida y precio`, description: `Presupuesto a medida: respondemos en menos de 12 horas. ${product.metadataDescription}` };
  if (product.tourFormat === 'small-group') return { title: `${name}: circuito en grupo reducido desde ${low.formatted}`, description: `Desde ${low.formatted} por persona en grupo reducido. ${product.metadataDescription}` };
  const basis = low.two && low.two.amount !== low.lowest.amount ? `Desde ${low.formatted} por persona con ${low.lowest.travelers} viajeros; ${low.twoFormatted} con 2` : `Desde ${low.formatted} por persona`;
  return { title: `${name}: tour privado desde ${low.formatted}`, description: `${basis}. ${product.metadataDescription}` };
}

/** The short factual answer shown under the key facts. */
export function spanishTourAnswer(product: LocalizedPrivateTourProduct): SpanishAnswerCopy {
  const includes = spanishKeyTourSales[product.slug]?.(product).answerIncludes ?? product.summary;
  return {
    eyebrow: 'En resumen',
    title: '¿Cuánto cuesta y qué incluye?',
    items: [
      { label: 'Duración', value: `${product.days} días y ${product.nights} noches, ${product.tourFormat === 'small-group' ? 'en grupo reducido' : 'en privado: solo tu grupo'}.` },
      { label: 'Precio', value: `${priceLine(product)} Los vuelos internacionales no están incluidos.` },
      { label: 'Incluye', value: includes },
      { label: 'Idioma del guía', value: `Inglés, incluido donde se indica. ${spanishSalesFacts.spanishGuide}` },
      { label: 'No incluye', value: `${product.exclusions.slice(0, 3).join(' · ')}.` },
      { label: 'Reserva y pago', value: `${spanishSalesFacts.book} ${spanishSalesFacts.payTour}` },
      { label: 'Quién lo organiza', value: `${spanishSalesFacts.trust.join(' · ')}.` },
    ],
  };
}

/** Questions buyers ask before booking, answered from the catalogue and the confirmed service facts. */
export function spanishTourBuyingFaq(product: LocalizedPrivateTourProduct) {
  const sites = spanishTourSites(product.slug);
  const includes = spanishKeyTourSales[product.slug]?.(product).answerIncludes;
  const faq = [
    { question: `¿Cuánto cuesta el viaje ${spanishTourShortName(product)}?`, answer: `${priceLine(product)} ${includes ? `Incluye ${afterColon(includes)}` : product.summary} Los vuelos internacionales no están incluidos. ${spanishSalesFacts.writtenTour}` },
    { question: '¿Cómo se reserva y cómo se paga?', answer: `${spanishSalesFacts.book} ${spanishSalesFacts.writtenTour} ${spanishSalesFacts.payTour}` },
    { question: '¿Hay guía en español?', answer: spanishSalesFacts.spanishGuideFaq },
    { question: '¿Quién organiza el viaje?', answer: `${spanishSalesFacts.license} Los guías y los conductores son nuestros, no subcontratados. No hay paradas en tiendas y una misma persona planifica tu viaje de principio a fin.` },
  ];
  const ownGuarantee = (product.faq ?? []).some(item => /garantizadas/u.test(item.question));
  if (beijingRefund(product) && !ownGuarantee) faq.push({ question: '¿Y si no hay entradas para la Ciudad Prohibida o Tiananmén?', answer: spanishSalesFacts.beijingGuarantee });
  if (sites.length) faq.push({ question: '¿Hay que reservar las entradas con antelación?', answer: `Sí. ${sites.map(site => spanishSiteUrgency[site][0].text).join(' ')} Las entradas incluidas en este viaje las reservamos nosotros a nombre de cada viajero; por eso te pedimos los datos del pasaporte con tiempo.` });
  return faq;
}

/** The sales block: hand-written for the key routes, built from the catalogue for the others. */
export function spanishTourSales(product: LocalizedPrivateTourProduct): SpanishSalesCopy {
  const key = spanishKeyTourSales[product.slug]?.(product);
  const faq = spanishTourBuyingFaq(product);
  if (key) return { ...key.sales, faq: key.sales.faq ?? [...faq, ...(key.extraFaq ?? [])] };
  const sites = spanishTourSites(product.slug);
  const late: SpanishLinkedText[] = sites.flatMap(site => spanishSiteUrgency[site]).slice(0, 3);
  const harbin = startsInHarbin(product.slug);
  return {
    id: 'reservar-este-viaje',
    eyebrow: 'Antes de elegir fechas',
    title: sites.length ? 'Algunas visitas de este viaje no se pueden dejar para el último momento' : 'Reserva este viaje con un equipo local',
    intro: sites.length
      ? 'Las entradas son nominativas y salen a la venta en fechas y horas fijas de China. Esto es lo que conviene saber antes de elegir fechas:'
      : 'Nos ocupamos de que hoteles, vehículo, guía y entradas encajen en tus fechas, y te lo confirmamos todo por escrito antes de que pagues.',
    ...(late.length ? { late } : {}),
    solutionTitle: 'Lo que hacemos por ti',
    solution: [
      ...(sites.length ? [{ text: 'Reservamos las entradas incluidas a nombre de cada viajero en cuanto abre la venta y ordenamos las visitas según las franjas que conseguimos.' }] : []),
      ...(harbin ? [{ text: 'Los traslados de llegada y salida en Harbin están incluidos, y con el depósito tu precio queda fijado.' }] : []),
      { text: 'Guías y conductores propios, no subcontratados.' },
      { text: spanishSalesFacts.spanishGuideConcern },
      { text: 'Sin paradas en tiendas, y una misma persona planifica tu viaje de principio a fin.' },
    ],
    offer: {
      name: product.title,
      includes: product.packages[0]?.summary ?? product.summary,
      price: priceLine(product),
      ...(beijingRefund(product) ? { guarantee: spanishSalesFacts.beijingGuarantee } : { guarantee: spanishSalesFacts.beforePayTour, guaranteeLabel: spanishSalesLabels.beforePay }),
      book: spanishSalesFacts.book,
      pay: spanishSalesFacts.payTour,
    },
    cta: { label: 'Consultar mis fechas por WhatsApp', message: `Hola, me interesa el viaje «${product.title}».\nFechas aproximadas:\nNúmero de viajeros:`, subject: `Consulta: ${product.title}` },
    faq,
  };
}
