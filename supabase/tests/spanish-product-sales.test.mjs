import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { localizeSpanishPrivateTourProduct } from '../../lib/localizeSpanishPrivateTourProduct.ts';
import { formatPrivateTourPrice, getPrivateTourProduct } from '../../lib/privateTourProducts.ts';
import { getPublishedPrivateTourCatalog } from '../../lib/publishedPrivateTourCatalog.ts';
import { spanishSalesFacts, spanishSiteUrgency } from '../../lib/spanishSales.ts';
import { spanishTourAnswer, spanishTourSales, spanishTourSearchMeta, spanishTourSites } from '../../lib/spanishTourSales.ts';
import { spanishKeyTourSales } from '../../lib/spanish-sales/key-tours.ts';
import { spanishZhangjiajieAnswer, spanishZhangjiajieSales, spanishZhangjiajieSearchMeta } from '../../lib/spanish-sales/legacy-zhangjiajie.ts';
import { spanishHubSales, spanishServiceSales } from '../../lib/spanish-sales/services.ts';
import { spanishTourCopies, spanishTourSlugs } from '../../lib/spanishTourCopy.ts';
import { spanishLlmsSummary } from '../../tools/lib/llms-spanish-summary.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const tours = spanishTourSlugs.map(slug => localizeSpanishPrivateTourProduct(getPrivateTourProduct(slug)));
const money = row => new Intl.NumberFormat('es-ES', { style: 'currency', currency: row.currency, currencyDisplay: 'code', maximumFractionDigits: 0 }).format(row.amount);

// The legacy Zhangjiajie page takes its prices from the published price file.
const pricing = JSON.parse(read('content/product-previews/zhangjiajie-4-day-private-tour/pricing.json'));
const usd = cny => `${formatPrivateTourPrice(cny, 'en').amount} USD`;
const zhangjiajiePricing = {
  tiers: pricing.tiers.map(tier => ({ name: tier.name_en, base: usd(tier.from_price_per_person ?? tier.price_per_person), six: usd(tier.six_person_price_per_person) })),
  validFromLabel: '6 de septiembre de 2026', validUntilLabel: '30 de diciembre de 2026',
};

const keyTourSlugs = ['guilin-yangshuo-5-day-private-tour', 'beijing-highlights-5-day-private-tour', 'beijing-xian-shanghai-8-day-private-tour', 'beijing-xian-guilin-shanghai-10-day-private-tour', 'beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour', 'shanghai-suzhou-hangzhou-6-day-private-tour'];
const salesCopies = [
  ...tours.map(product => [product.slug, spanishTourSales(product)]),
  ['zhangjiajie-4-day-private-tour', spanishZhangjiajieSales(zhangjiajiePricing)],
  ...['reservations', 'car', 'guides', 'support'].map(id => [`service:${id}`, spanishServiceSales(id)]),
  ...['tours', 'services'].map(id => [`hub:${id}`, spanishHubSales(id)]),
];
const answers = [...tours.map(product => [product.slug, spanishTourAnswer(product)]), ['zhangjiajie-4-day-private-tour', spanishZhangjiajieAnswer(zhangjiajiePricing)]];
const strings = value => typeof value === 'string' ? [value] : Array.isArray(value) ? value.flatMap(strings) : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : [];
const linked = value => Array.isArray(value) ? value.flatMap(linked) : value && typeof value === 'object' ? [...('text' in value && 'links' in value ? [value] : []), ...Object.values(value).flatMap(linked)] : [];

/** Owner rules for Spanish sales copy (2026-10-19): no scarcity, queue, entry or call promises. */
const forbidden = {
  scarcity: /agotad|se agota|últimas (?:plazas|entradas)|plazas limitadas|quedan pocas|solo quedan|cuenta atrás/iu,
  'queue-jumping': /sin colas?\b|s[aá]lta(?:te|se) la cola|evit(?:e|a|ar) (?:las )?colas|colarse|sin esperas?\b|acceso prioritario|colas? de (?:varias )?horas/iu,
  'guaranteed entry': /entrada garantizada|acceso garantizado|garantiz\w* (?:la |tu |tus |el )?(?:entrada|acceso)/iu,
  'video or phone call': /videollamada|llamada (?:de v[ií]deo|telef[oó]nica)|(?:te|le|lo|la|les) llamamos|ll[aá]ma(?:me|nos)|video call|phone call/iu,
  english: /sell(?:s|ing)? out|sold out|selling fast|limited (?:spots|places|availability)|skip the (?:line|queue)|no queue|queue[- ]free|100\s*%|absolutely|guaranteed entry/iu,
};

test('every Spanish sales block, answer and FAQ keeps the owner copy rules', () => {
  for (const [id, copy] of [...salesCopies, ...answers]) {
    for (const text of strings(copy)) {
      for (const [rule, pattern] of Object.entries(forbidden)) assert.doesNotMatch(text, pattern, `${id}: ${rule} in «${text}»`);
    }
  }
});

test('a Spanish-speaking guide is never given a price, a starting price or an availability doubt', () => {
  for (const [id, copy] of [...salesCopies, ...answers]) {
    for (const text of strings(copy)) {
      for (const sentence of text.split(/(?<=[.!?])\s+/u).filter(part => /habla hispana|gu[ií]a en español/iu.test(part) && !part.trim().endsWith('?'))) {
        assert.doesNotMatch(sentence, /(?:hispana|español)[^.]*(?:\d+\s*(?:CNY|USD)|desde)|disponibilidad/u, `${id}: «${sentence}»`);
      }
    }
  }
  // It answers the "I don't speak English" worry on every sales block for a tour, with the owner's wording for the supplement.
  for (const product of tours) assert.ok(strings(spanishTourSales(product)).some(text => /lo hay en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en tu presupuesto/u.test(text)), product.slug);
});

test('the Beijing refund applies to every private tour that visits the Forbidden City, and to no other', () => {
  for (const product of tours) {
    const { offer } = spanishTourSales(product);
    const beijing = product.tourFormat !== 'small-group' && spanishTourSites(product.slug).includes('forbidden');
    assert.equal(offer.guarantee.includes(spanishSalesFacts.beijingGuarantee), beijing, product.slug);
  }
});

test('a link label is always a span of its own paragraph', () => {
  for (const [id, copy] of salesCopies) {
    for (const item of linked(copy)) for (const link of item.links) assert.ok(item.text.includes(link.label), `${id}: «${link.label}» not in «${item.text}»`);
  }
});

test('each sales block ends in one complete offer: price, guarantee, booking and payment', () => {
  for (const [id, copy] of salesCopies) {
    for (const field of ['name', 'includes', 'price', 'guarantee', 'book', 'pay']) assert.ok(copy.offer[field]?.trim(), `${id}: empty offer.${field}`);
    assert.match(copy.offer.book, /12 horas/u, `${id}: reply time`);
    assert.match(copy.offer.pay, /enlace de pago seguro de VBill/u, `${id}: payment method`);
    assert.doesNotMatch(copy.offer.pay, /Alipay/u, `${id}: no Alipay`);
    assert.ok(copy.cta.message.trim() && copy.cta.subject.trim() && copy.cta.label.trim(), `${id}: CTA`);
  }
  // Private tours take the 30% deposit; small groups book with 10% (30% on the Yangtze cruise group),
  // and the offer, the key facts and the FAQ must all say the same as the group's own terms.
  for (const product of tours) {
    const sales = spanishTourSales(product);
    const expected = product.tourFormat !== 'small-group' ? spanishSalesFacts.payTour
      : product.slug.includes('yangtze') ? spanishSalesFacts.payCruiseGroup : spanishSalesFacts.paySmallGroup;
    assert.equal(sales.offer.pay, expected, `${product.slug}: tour payment terms`);
    assert.ok(spanishTourAnswer(product).items.find(item => item.label === 'Reserva y pago').value.endsWith(expected), `${product.slug}: key facts payment`);
    assert.ok(sales.faq.find(item => item.question === '¿Cómo se reserva y cómo se paga?').answer.endsWith(expected), `${product.slug}: FAQ payment`);
    if (product.tourFormat === 'small-group') assert.doesNotMatch(sales.offer.pay, /solo un 30 % de depósito/u, `${product.slug}: no private-tour deposit`);
  }
  assert.ok(tours.some(product => product.tourFormat === 'small-group'), 'small groups are in the Spanish catalogue');
});

test('tour offers quote every published price, and quote-only tours invent none', () => {
  for (const product of tours) {
    const { offer } = spanishTourSales(product);
    const rows = product.packages.flatMap(pkg => pkg.rows);
    for (const row of rows) assert.ok(offer.price.includes(money(row)), `${product.slug}: ${money(row)} missing`);
    if (!rows.length) assert.doesNotMatch(offer.price, /\d+ (?:USD|CNY)/u, `${product.slug}: invented price`);
  }
  const zjj = spanishZhangjiajieSales(zhangjiajiePricing).offer.price;
  for (const tier of zhangjiajiePricing.tiers) assert.ok(zjj.includes(tier.base) && zjj.includes(tier.six), tier.name);
});

test('the key routes carry hand-written sales copy; the others are built from the catalogue', () => {
  assert.deepEqual(Object.keys(spanishKeyTourSales).sort(), [...keyTourSlugs].sort());
  for (const product of tours) {
    const sales = spanishTourSales(product);
    if (keyTourSlugs.includes(product.slug)) assert.ok(sales.late?.length && sales.diy?.length, `${product.slug}: key copy`);
    const sites = spanishTourSites(product.slug);
    // A tour gets urgency only from a sight it really visits.
    if (!keyTourSlugs.includes(product.slug)) assert.equal(Boolean(sales.late?.length), sites.length > 0, `${product.slug}: urgency without a sight`);
  }
  // Beijing in five days goes to Badaling, so it must not borrow the Mutianyu rule.
  assert.deepEqual([...spanishTourSites('beijing-highlights-5-day-private-tour')], ['forbidden']);
  assert.ok(!strings(spanishTourSales(tours.find(product => product.slug === 'beijing-highlights-5-day-private-tour'))).some(text => /Mutianyu/u.test(text)));
});

test('search titles target buying terms and show the published price', () => {
  const titles = new Set();
  for (const product of tours) {
    const meta = spanishTourSearchMeta(product);
    assert.match(meta.title, /tour privado|circuito|viaje privado|grupo reducido/iu, product.slug);
    const rows = product.packages.flatMap(pkg => pkg.rows);
    if (rows.length) {
      const lowest = rows.reduce((low, row) => row.amount < low.amount ? row : low);
      assert.ok(meta.title.includes(money(lowest)) && meta.description.includes(money(lowest)), `${product.slug}: starting price`);
    }
    assert.ok(meta.description.length >= 70, `${product.slug}: description`);
    assert.equal(titles.has(meta.title), false, `${product.slug}: duplicate title`);
    titles.add(meta.title);
  }
  const zjj = spanishZhangjiajieSearchMeta(zhangjiajiePricing);
  assert.match(zjj.title, /tour privado/iu);
  assert.ok(zjj.title.includes(zhangjiajiePricing.tiers[0].six));
});

test('the tours and services hubs link to each other', () => {
  const links = id => linked(spanishHubSales(id)).flatMap(item => item.links.map(link => link.href));
  assert.ok(links('tours').includes('/es/services/'));
  assert.ok(links('services').includes('/es/tours/'));
  assert.match(read('components/SpanishToursHubPage.tsx'), /salesSection:<SpanishHubSales hub="tours"\/>/);
  assert.match(read('components/SpanishServicesPage.tsx'), /salesSection:<SpanishHubSales hub="services"\/>/);
});

test('Spanish Zhangjiajie copy follows the Tianmen route C closure from 13 October 2026', () => {
  for (const [slug, copy] of Object.entries(spanishTourCopies)) {
    const text = strings(copy).join(' ');
    assert.doesNotMatch(text, /ruta A, B o C|teleférico de Tianmen sale|tomar el teleférico de Tianmen/u, slug);
    if (/El teleférico|teleférico rápido/u.test(text) && /Tianmen/u.test(text) && /La visita a Tianmen/u.test(text)) assert.match(text, /ruta C/u, slug);
  }
  assert.doesNotMatch(read('lib/spanishLegacyTours.ts'), /ruta A, B o C/u);
  assert.match(spanishSiteUrgency.tianmen[0].text, /13 de octubre de 2026.*ruta C/u);
});

test('pages render the answer, the sales block and their FAQ in structured data', () => {
  const tour = read('components/ShanghaiJiangnanImaginePage.tsx');
  assert.match(tour, /<SpanishTourAnswer answer=\{spanishTourAnswer\(localized\)\} \/>/);
  assert.match(tour, /<SpanishSalesBlock copy=\{spanishSales\} path=\{localized\.path\} \/>/);
  assert.match(tour, /mainEntity: pageFaq\.map/);
  assert.match(read('app/(spanish)/es/tours/[slug]/page.tsx'), /spanishTourSearchMeta\(localized\)/);
  for (const [file, service] of [['AttractionReservationsPage', 'reservations'], ['PrivateCarServicesPage', 'car'], ['PrivateGuideServicesPage', 'guides'], ['FullTripSupportPage', 'support']]) {
    assert.match(read(`components/${file}.tsx`), new RegExp(`editionLocale === "es" \\? <SpanishServiceSales service="${service}" />`), file);
  }
  const legacy = read('components/SpanishLegacyTours.tsx');
  assert.match(legacy, /extraFaq:sales\.faq/);
  // The Zhangjiajie offers come from the shared page, the same in every language (lib/zhangjiajieOffers.ts).
  assert.match(read('components/ZhangjiajiePrivateTourPreviewPage.tsx'), /offers: zhangjiajieOffers\(publishedPricing, locale, pageUrl/);
  assert.match(read('components/PrivateToursHubPage.tsx'), /edition\?\.schemaOffers && product\.startingPrice/);
});

test('llms.txt gives answer engines the Spanish prices and service facts', () => {
  const summary = spanishLlmsSummary(getPublishedPrivateTourCatalog('en')).join('\n');
  for (const text of ['L-BJ10587', '45 CNY por persona y lugar', '8 días antes', 'cualquier ciudad de China continental', 'guía de habla hispana en todas las ciudades', 'Ciudad Prohibida o Tiananmén', 'enlace de pago seguro de VBill', '12 horas', 'ruta C']) assert.ok(summary.includes(text), text);
  assert.match(read('tools/generate-llms-txt.mjs'), /\.\.\.spanishLlmsSummary\(tours\)/);
  for (const [rule, pattern] of Object.entries(forbidden)) assert.doesNotMatch(summary, pattern, rule);
});
