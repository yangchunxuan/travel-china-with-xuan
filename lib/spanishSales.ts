/**
 * Spanish sales copy for product and service pages. The answer comes first and
 * stays factual; the sales block then explains the risk of booking late, using
 * only the dated, sourced facts below or the published reservation rules, and
 * ends with one offer: product, inclusions, price, guarantee, booking, payment.
 */

/** A paragraph whose links are spans of its own text. */
export interface SpanishLinkedText {
  readonly text: string;
  readonly links?: readonly { readonly label: string; readonly href: string }[];
}
export interface SpanishSalesOffer {
  readonly name: string;
  readonly includes: string;
  readonly price: string;
  readonly guarantee: string;
  /** 'Antes de pagar' where the product carries no refund guarantee. */
  readonly guaranteeLabel?: string;
  readonly book: string;
  readonly pay: string;
}
export interface SpanishSalesCopy {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly diyTitle?: string;
  readonly diy?: readonly SpanishLinkedText[];
  readonly lateTitle?: string;
  readonly late?: readonly SpanishLinkedText[];
  readonly solutionTitle: string;
  readonly solution: readonly SpanishLinkedText[];
  readonly offer: SpanishSalesOffer;
  readonly cta: { readonly label: string; readonly message: string; readonly subject: string };
  /** Proof points for this service, when the tour list does not apply. */
  readonly trust?: readonly string[];
  readonly faqTitle?: string;
  readonly faq?: readonly { readonly question: string; readonly answer: string }[];
}
export interface SpanishAnswerCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly items: readonly { readonly label: string; readonly value: string }[];
}

export const spanishSalesLabels = {
  diy: 'Si lo organizas por tu cuenta',
  late: 'Si lo dejas para más tarde',
  solution: 'Lo que hacemos por ti',
  offer: 'Nuestra propuesta',
  includes: 'Qué incluye',
  price: 'Precio',
  guarantee: 'Garantía',
  beforePay: 'Antes de pagar',
  book: 'Cómo reservar',
  pay: 'Cómo pagar',
  email: 'Prefiero escribir por correo',
  trustTitle: 'Con quién viajas',
  faq: 'Precio, reserva y pago: lo que más nos preguntan',
} as const;

/** Service facts the owner confirmed on 2026-10-19 (see the review rubric). */
export const spanishSalesFacts = {
  reply: 'Te respondemos en español en un plazo de 12 horas.',
  book: 'Escríbenos por WhatsApp o por correo con tus fechas y el número de viajeros. Te respondemos en español en un plazo de 12 horas.',
  payTour: 'Para reservar pagas solo un 30 % de depósito mediante un enlace de pago seguro de VBill, que también acepta tarjetas de bancos latinoamericanos; el 70 % restante, cuando ya estás en China.',
  // Owner, 2026-10-21: small groups book with 10% (the Yangtze cruise group with 30%), not the private-tour deposit.
  paySmallGroup: 'Para reservar pagas el 10 % del precio mediante un enlace de pago seguro de VBill, que también acepta tarjetas de bancos latinoamericanos; 60 días antes de la salida el pago sube al 30 %, y el 70 % restante se paga cuando ya estás en China.',
  payCruiseGroup: 'En este grupo los camarotes del crucero se reservan con antelación, así que para reservar pagas el 30 % del precio mediante un enlace de pago seguro de VBill, que también acepta tarjetas de bancos latinoamericanos; el 70 % restante se paga cuando ya estás en China.',
  payService: 'Pagas mediante un enlace de pago seguro de VBill, que también acepta tarjetas de bancos latinoamericanos, después de aceptar el presupuesto escrito.',
  license: 'Homeground China es una agencia de viajes con licencia en Pekín (L-BJ10587).',
  trust: [
    'Agencia de viajes con licencia en Pekín: L-BJ10587',
    'Guías y conductores propios, no subcontratados',
    'Sin paradas en tiendas',
    'Una misma persona planifica tu viaje de principio a fin',
  ],
  /** Owner, 2026-10-19: a Spanish-speaking guide in every city; the supplement is not published. */
  spanishGuide: 'Hay guía de habla hispana en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en tu presupuesto.',
  spanishGuideConcern: '¿No te manejas en inglés? Pide guía de habla hispana: lo hay en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en tu presupuesto.',
  spanishGuideFaq: 'Sí. El precio publicado incluye guía de habla inglesa donde se indica; si lo prefieres en español, lo hay en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en tu presupuesto.',
  /** Owner, 2026-10-19: Beijing tours and multi-city tours with a Beijing stage. */
  beijingGuarantee: 'Si reservas y nos envías los datos del pasaporte al menos 8 días antes de tu visita a la Ciudad Prohibida, y no conseguimos la reserva de la Ciudad Prohibida o de Tiananmén, te devolvemos todo lo que hayas pagado por el viaje. Son 8 días porque la venta abre 7 días antes: así tus datos ya están listos cuando se abre.',
  writtenTour: 'Antes de pagar recibes por escrito los hoteles, los servicios y el precio total.',
  beforePayTour: 'No pagas nada hasta recibir por escrito los hoteles, los servicios y el precio total, y si algo importante cambia antes del viaje, hablamos contigo primero.',
  reservationGuarantee: 'Si nos lo encargas, pagas y nos envías los datos del pasaporte de cada viajero al menos 8 días antes, la reserva está garantizada; si no la conseguimos, te devolvemos íntegros la tarifa de servicio y el importe de la entrada.',
} as const;

/** Dated sources from homeground/queue-facts-verified-20261019.md. */
export const spanishSalesSources = {
  forbiddenFull: { label: 'Yicai, 1 de octubre de 2025', href: 'https://www.yicai.com/news/102851899.html' },
  wulingyuanApology: { label: 'Guangming Online, 4 de mayo de 2025', href: 'https://m.gmw.cn/2025-05/04/content_1304029265.htm' },
  wulingyuanQueues: { label: '36Kr, 6 de mayo de 2025', href: 'https://www.36kr.com/p/3280487039377538' },
  tianmenRouteC: { label: 'Xinhunan, 10 de octubre de 2026', href: 'https://m.voc.com.cn/rmt/article/18128145.html' },
  tianmenBreakdown: { label: 'Ziniu News, 6 de octubre de 2025', href: 'https://www.yzwb.net/news/sh/202510/t20251006_273358.html' },
  pandaQueue: { label: 'China Youth Daily en Chinanews', href: 'https://www.chinanews.com.cn/sh/2024/02-02/10157284.shtml' },
  shaanxiDemand: { label: 'Huashang Bao en The Paper, 4 de agosto de 2023', href: 'https://m.thepaper.cn/newsDetail_forward_24110428' },
  jadeDragon: { label: 'Cover News, 5 de febrero de 2025', href: 'https://www.peopleapp.com/column/30048174845-500006077194' },
  transit240: { label: 'Gobierno de China, 17 de diciembre de 2024', href: 'https://english.www.gov.cn/news/202412/17/content_WS6760ead6c6d0868f4e8ee0c1.html' },
} as const;

export const spanishSalesPaths = {
  reservations: '/es/services/china-attraction-reservations/',
  guides: '/es/services/private-english-speaking-guides/',
  car: '/es/services/private-car-and-driver/',
  support: '/es/services/full-trip-support/',
  services: '/es/services/',
  tours: '/es/tours/',
  forbiddenGuide: '/es/guias/forbidden-city-for-foreign-visitors/',
  tianmenGuide: '/es/guias/tianmen-mountain-tickets-and-routes/',
  liRiverGuide: '/es/guias/li-river-cruise-tickets-piers-booking/',
  visaGuide: '/es/guias/visado-china-espanoles/',
} as const;

const s = spanishSalesSources;
const cite = (text: string, source: { label: string; href: string }): SpanishLinkedText => ({ text: `${text} (${source.label}).`, links: [source] });

/** Facts that make waiting risky, by attraction. Each is dated and sourced, or a published release rule. */
export const spanishSiteUrgency = {
  forbidden: [
    { text: 'La Ciudad Prohibida pone a la venta sus entradas 7 días antes, a las 20:00 de Pekín: las 6:00 en Ciudad de México y las 13:00 o las 14:00 en Madrid, según la época del año. No vende entradas para el mismo día.' },
    cite('El 1 de octubre de 2025, primer día de la Semana Dorada china, el sistema oficial del museo ya no tenía entradas para ningún día del 2 al 7 de octubre', s.forbiddenFull),
  ],
  terracotta: [
    { text: 'La venta de entradas de los Guerreros de Terracota puede cerrarse cuando se alcanza el aforo del día.' },
  ],
  panda: [
    { text: 'La Base del Panda Gigante de Chengdu vende entradas en línea hasta 14 días antes, por turnos de mañana o de tarde.' },
    cite('Según un reportaje publicado el 2 de febrero de 2024, a las 7:40 la cola para ver a la panda Huahua en Chengdu ya medía 500 metros y un cartel avisaba de más de dos horas de espera', s.pandaQueue),
  ],
  wulingyuan: [
    cite('En el puente del 1 de mayo de 2025, el distrito de Wulingyuan pidió disculpas públicamente por las largas colas en ascensores, teleféricos y autobuses del parque', s.wulingyuanApology),
    cite('En ese mismo puente de mayo de 2025, un visitante contó unas 2 horas de cola para subir en el ascensor Bailong, hora y media para bajar en el teleférico de Tianzi y más de 9 horas de colas en dos días; el día que entró hacia las 6:00, no hizo cola', s.wulingyuanQueues),
  ],
  wulingyuanAlone: [
    cite('En el puente del 1 de mayo de 2025, un visitante de Zhangjiajie contó unas 2 horas de cola para subir en el ascensor Bailong y más de 9 horas de colas en dos días; el día que entró en el parque hacia las 6:00, no hizo cola', s.wulingyuanQueues),
  ],
  tianmenPeak: [
    { text: 'Antes del cambio de ruta, el 2 de mayo de 2025 un visitante esperó unas 2 horas y media para entrar en Tianmen y hora y media para bajar en teleférico (36Kr, 6 de mayo de 2025); el 5 de octubre de 2025, en plena Semana Dorada china, hubo más de una hora de cola para el teleférico y además una avería (Ziniu News, 6 de octubre de 2025).', links: [s.wulingyuanQueues, s.tianmenBreakdown] },
  ],
  tianmen: [
    cite('Desde el 13 de octubre de 2026, en la montaña Tianmen solo se vende la ruta C: desde la puerta de la montaña, teleférico rápido hasta la cueva de Tianmen y escaleras mecánicas por dentro de la roca hasta la cima, con regreso por el mismo camino. El teleférico que sale de la ciudad de Zhangjiajie dejó de transportar pasajeros y su reapertura no tiene fecha anunciada', s.tianmenRouteC),
  ],
  liRiver: [
    { text: 'Para la Semana Dorada china de 2026, la venta del crucero completo por el río Li se abrió solo 15 días antes, y una crecida puede suspender las salidas con poco aviso.' },
  ],
  mutianyu: [
    { text: 'En Mutianyu, la entrada es nominativa: una por pasaporte y día, con franja horaria, y la entrada, la lanzadera y el teleférico son billetes distintos.' },
  ],
  jade: [
    cite('El 2 de febrero de 2025, con nieve, hubo visitantes que esperaron de las 14:00 a las 18:00 para bajar en teleférico de la Montaña Nevada del Dragón de Jade, y el día 4 ya no quedaban billetes de teleférico para ese día', s.jadeDragon),
  ],
  lingyin: [
    { text: 'El templo Lingyin es gratuito, pero cada visitante necesita una reserva nominativa con horario, no se puede reservar para el mismo día y el registro en la puerta terminó el 1 de febrero de 2026.' },
  ],
  humble: [
    { text: 'El Jardín del Administrador Humilde vende entradas nominativas con franja horaria, entre 1 y 7 días antes de la visita.' },
  ],
  hanging: [
    { text: 'Desde el 1 de abril de 2026, el Templo Colgante limita a 2475 al día las entradas para subir a las galerías, y solo 1200 se venden en línea.' },
  ],
} as const satisfies Record<string, readonly SpanishLinkedText[]>;
export type SpanishUrgencySite = keyof typeof spanishSiteUrgency;

/** The draft a sales button opens: its message plus the page it came from. */
export function spanishSalesMessage(cta: SpanishSalesCopy['cta'], path: string) {
  return `${cta.message}\nPágina: https://homegroundchina.com${path}`;
}

const money = (amount: number, currency: string) => new Intl.NumberFormat('es-ES', { style: 'currency', currency, currencyDisplay: 'code', maximumFractionDigits: 0 }).format(amount);
export { money as spanishSalesMoney };

interface PricedPackage { readonly label: string; readonly rows: readonly { readonly travelers: number; readonly amount: number; readonly currency: string }[] }

/** "769 USD por persona con 2 viajeros · 629 USD con 4 · 600 USD con 6", per package. */
export function spanishPriceLine(packages: readonly PricedPackage[]): string {
  const priced = packages.filter(pkg => pkg.rows.length);
  if (!priced.length) return 'Presupuesto a medida según tus fechas, las habitaciones y el número de viajeros.';
  const line = (pkg: PricedPackage) => [...pkg.rows].sort((a, b) => a.travelers - b.travelers)
    .map((row, index) => index === 0 ? `${money(row.amount, row.currency)} por persona con ${row.travelers} viajeros` : `${money(row.amount, row.currency)} con ${row.travelers}`)
    .join(' · ');
  return priced.length === 1 ? `${line(priced[0])}.` : priced.map(pkg => `${pkg.label}: ${line(pkg)}.`).join(' ');
}

/** The lowest published per-person price and the party size it applies to. */
export function spanishLowestPrice(packages: readonly PricedPackage[]) {
  const rows = packages.flatMap(pkg => pkg.rows);
  if (!rows.length) return null;
  const lowest = rows.reduce((low, row) => row.amount < low.amount ? row : low);
  const two = rows.filter(row => row.travelers === 2).sort((a, b) => a.amount - b.amount)[0];
  return { lowest, two, formatted: money(lowest.amount, lowest.currency), twoFormatted: two ? money(two.amount, two.currency) : null };
}
