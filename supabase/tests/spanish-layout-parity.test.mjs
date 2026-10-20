import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';
import { getSpanishTourCatalog } from '../../lib/spanishTourCatalog.ts';
import { getPublishedPrivateTourCatalog } from '../../lib/publishedPrivateTourCatalog.ts';
import { getPrivateTourFacets } from '../../lib/privateTourCatalogFacets.ts';
import { formatPrivateTourPrice } from '../../lib/privateTourProducts.ts';
import { privateTourCurrencyNote } from '../../lib/privateTourCurrencyNote.ts';
import { zhangjiajieFourDayCny } from '../../lib/zhangjiajieFourDayPrice.ts';
import { arabicSitePagePathByEnglishPath } from '../../lib/arabicEditionIndex.ts';
import { germanSitePagePathByEnglishPath } from '../../lib/germanEditionIndex.ts';
import { frenchSitePagePathByEnglishPath } from '../../lib/frenchEditionIndex.ts';
import { homegroundBusiness } from '../../lib/homegroundBusiness.ts';
import { spanishGuides, spanishGuidePath } from '../../lib/spanishGuides.ts';
import { spanishSitePagePathByEnglishPath } from '../../lib/spanishEditionIndex.ts';
import { spanishContactEdition } from '../../lib/spanishContactEdition.ts';
import { buildPrivateTourDetailHref, getPrivateTourInquiryContext } from '../../lib/privateTourInquiryContext.ts';
import { getHomepagePrivateTourItems } from '../../lib/homepagePrivateTourCatalog.ts';

const require = createRequire(import.meta.url);
const source = path => readFile(new URL(`../../${path}`, import.meta.url), 'utf8');
async function load(path, dependencies = {}) {
  const code = ts.transpileModule(await source(path), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, process, require(id) {
    if (id === 'react/jsx-runtime') return require(id);
    assert.ok(id in dependencies, `Unexpected dependency ${id} in ${path}`);
    return dependencies[id];
  } }, { filename: path });
  return module.exports;
}
const normal = value => JSON.parse(JSON.stringify(value));
const money = (amount, currency) => new Intl.NumberFormat('es-ES', { style: 'currency', currency, currencyDisplay: 'code', maximumFractionDigits: 0 }).format(amount);
const pricing = JSON.parse(await source('content/product-previews/zhangjiajie-4-day-private-tour/pricing.json'));
const original = await load('lib/zhangjiajiePrivateTourPreview.ts', {
  '../content/product-previews/zhangjiajie-4-day-private-tour/pricing.json': pricing,
  '../content/product-previews/zhangjiajie-4-day-private-tour/product.json': JSON.parse(await source('content/product-previews/zhangjiajie-4-day-private-tour/product.json')),
  './privateTourProducts': { formatPrivateTourPrice }, './privateTourCurrencyNote': { privateTourCurrencyNote }, './zhangjiajieFourDayPrice': { zhangjiajieFourDayCny },
});
const halfDay = await load('lib/terracottaHalfDayTour.ts');
const legacyContact = await load('lib/spanishLegacyContactCopy.ts');
const legacy = await load('lib/spanishLegacyTours.ts', {
  '../content/product-previews/zhangjiajie-4-day-private-tour/pricing.json': pricing,
  './privateTourProducts': { formatPrivateTourPrice }, './zhangjiajiePrivateTourPreview': original,
  './terracottaHalfDayTour': halfDay, './spanishLegacyContactCopy': legacyContact,
});
const spanishSite = await load('lib/spanishSite.ts', { './arabicEditionIndex.ts': { arabicSitePagePathByEnglishPath }, './germanEditionIndex.ts': { germanSitePagePathByEnglishPath }, './frenchEditionIndex': { frenchSitePagePathByEnglishPath }, './homegroundBusiness': { homegroundBusiness } });
const classic = await load('lib/spanishLegacyPresentation.ts', { './zhangjiajiePrivateTourPreview': original, './spanishLegacyTours': legacy, './spanishSite': spanishSite });
const hub = await load('components/SpanishToursHubPage.tsx', {
  './PrivateToursHubPage': { PrivateToursHubPage: () => null }, './SpanishChrome': { SpanishSiteHeader: () => null, SpanishSiteFooter: () => null },
  '../lib/spanishTourCatalog': { getSpanishTourCatalog }, '../lib/publishedPrivateTourCatalog': { getPublishedPrivateTourCatalog },
  '../lib/privateTourCatalogFacets': { getPrivateTourFacets }, '../lib/spanishSite': spanishSite, '../lib/spanishLegacyTours': legacy,
  '../lib/privateTourInquiryContext': { buildPrivateTourDetailHref }, './SpanishServiceSales': { SpanishHubSales: () => null },
});
const homepage = await load('lib/spanishHomepageEditorial.ts', {
  './homepagePrivateTourCatalog': { getHomepagePrivateTourItems },
  './homepageEditorial': { getHomepageGuideChapters: () => { throw new Error('Guide chapters are not part of this product-price test'); } },
  './spanishTourCatalog': { getSpanishTourCatalog }, './privateTourInquiryContext': { buildPrivateTourDetailHref },
});

test('the Spanish shared-layout hub includes 58 routes with unchanged prices and service choices', async () => {
  const en = getPublishedPrivateTourCatalog('en'), es = hub.getSpanishPublishedTourCatalog();
  assert.equal(es.length, en.length + 1);
  assert.equal(es.length, 58);
  assert.equal(new Set(es.map(product => product.slug)).size, 58);
  for (const product of en) {
    const translated = es.find(candidate => candidate.slug === product.slug);
    assert.ok(translated, product.slug);
    assert.equal(translated.href, `/es${product.href}`);
    if (product.startingPrice?.selection && !product.twoTravellerPrice) {
      const link = new URL(translated.startingPriceHref, 'https://homegroundchina.com');
      assert.equal(link.pathname, translated.href);
      assert.equal(link.searchParams.get('package'), product.startingPrice.selection.packageId);
      assert.equal(link.searchParams.get('travelers'), String(product.startingPrice.selection.travelers));
    } else assert.equal(translated.startingPriceHref, `/es${product.startingPriceHref}`);
    const terms = item => item.startingPrice ? { amount: item.startingPrice.amount, cny: item.startingPrice.cny, currency: item.startingPrice.currency, travelers: item.startingPrice.travelers, selection: item.startingPrice.selection } : null;
    assert.deepEqual(normal(terms(translated)), normal(terms(product)), product.slug);
    for (const field of ['days', 'nights', 'hasServiceChoice', 'shoppingStops']) assert.equal(translated[field], product[field], `${product.slug}: ${field}`);
    assert.equal(translated.image.src, product.image.src, `${product.slug}: source photo`);
    assert.equal(translated.twoTravellerPrice?.amount, product.twoTravellerPrice?.amount);
    assert.equal(translated.twoTravellerPrice?.currency, product.twoTravellerPrice?.currency);
    if (translated.startingPrice) assert.equal(translated.startingPrice.formatted, money(product.startingPrice.amount, product.startingPrice.currency));
    if (translated.twoTravellerPrice) assert.equal(translated.twoTravellerPrice.formatted, money(product.twoTravellerPrice.amount, product.twoTravellerPrice.currency));
    // Fixed small-group departures do not offer a Spanish-speaking guide until the owner decides.
    if (product.tourFormat === 'small-group') assert.doesNotMatch(translated.guideLanguage, /español/, product.slug);
    else assert.match(translated.guideLanguage, /español.*suplemento/, product.slug);
  }
  const half = es.find(product => product.slug === halfDay.terracottaHalfDaySlug);
  assert.equal(half.startingPrice, null);
  assert.equal(half.days, 0.5);
  await access(new URL(`../../public${half.image.src}`, import.meta.url));
  const edition = hub.SpanishToursHubPage().props.edition;
  assert.equal(edition.language, 'es');
  assert.equal(edition.facets.items.length, 58);
  for (const facet of ['regions', 'lengths', 'prices']) assert.equal(edition.facets[facet].reduce((sum, option) => sum + option.count, 0), 58, facet);
  assert.equal(edition.originalImageSlugs.includes(half.slug), true);
  const realSpanishPaths = new Set([...Object.values(spanishSitePagePathByEnglishPath), ...spanishGuides.map(guide => spanishGuidePath(guide.slug))]);
  for (const link of edition.arrivalPlanning.links) {
    assert.ok(realSpanishPaths.has(link.href), `arrival-planning link has no Spanish page: ${link.href}`);
  }
});

test('single-price Spanish cards open the advertised party size; two-person cards and quote-only entries retain their scope', () => {
  const enHub = getPublishedPrivateTourCatalog('en'), esHub = hub.getSpanishPublishedTourCatalog();
  const enHome = getHomepagePrivateTourItems('en'), esHome = homepage.getSpanishHomepageProducts();
  const priceSelection = (href, packageId, travelers) => {
    const url = new URL(href, 'https://homegroundchina.com');
    assert.equal(url.searchParams.get('package'), packageId);
    assert.equal(url.searchParams.get('travelers'), String(travelers));
    assert.match(url.pathname, /^\/es\/tours\/[^/]+\/$/);
  };
  for (const [slug, travelers, amount] of [
    ['beijing-xian-chengdu-guilin-shanghai-13-day-private-tour', 8, 2090],
    ['huangshan-hongcun-huizhou-5-day-private-tour', 6, 740],
  ]) {
    const en = enHub.find(item => item.slug === slug), es = esHub.find(item => item.slug === slug);
    assert.equal(es.startingPrice.travelers, travelers);
    assert.equal(es.startingPrice.amount, amount);
    assert.equal(es.startingPrice.currency, 'USD');
    priceSelection(es.startingPriceHref, es.startingPrice.selection.packageId, travelers);
    // This scoped Spanish correction must not silently rewrite the English
    // catalogue's current entry selection.
    assert.equal(new URL(en.startingPriceHref, 'https://homegroundchina.com').searchParams.get('travelers'), '4');
  }
  const national = esHome.find(item => item.id === 'beijing-xian-chengdu-guilin-shanghai-13-day-private-tour');
  assert.equal(national.startingPrice.formatted, money(2090, 'USD'));
  priceSelection(national.href, national.startingPrice.selection.packageId, 8);
  for (const item of esHub.filter(candidate => candidate.twoTravellerPrice)) {
    const original = enHub.find(candidate => candidate.slug === item.slug);
    assert.equal(item.startingPriceHref, `/es${original.startingPriceHref}`, `${item.slug}: two-person entry`);
    assert.equal(new URL(item.startingPriceHref, 'https://homegroundchina.com').searchParams.get('travelers'), '2');
  }
  for (const item of esHome.filter(candidate => candidate.twoTravellerPrice)) {
    const original = enHome.find(candidate => candidate.id === item.id);
    assert.equal(item.href, `/es${original.href}`, `${item.id}: homepage two-person entry`);
    assert.equal(new URL(item.href, 'https://homegroundchina.com').searchParams.get('travelers'), '2');
  }
  const jiangnanSlug = 'suzhou-tongli-hangzhou-shanghai-12-day-private-tour';
  const jiangnanHub = esHub.find(item => item.slug === jiangnanSlug), jiangnanHome = esHome.find(item => item.id === jiangnanSlug);
  for (const [item, href] of [[jiangnanHub, jiangnanHub.startingPriceHref], [jiangnanHome, jiangnanHome.href]]) {
    assert.equal(item.startingPrice, null);
    assert.equal(new URL(href, 'https://homegroundchina.com').search, '');
  }
});

test('the Spanish classic preserves dated prices, three room tiers, guiding days and hotel photos', () => {
  const en = original.getZhangjiajiePrivateTourPublicPricing('en'), es = classic.spanishClassicPricing();
  assert.equal(es.validFrom, en.validFrom);
  assert.equal(es.validUntil, en.validUntil);
  assert.equal(es.tiers.length, en.tiers.length);
  for (let index = 0; index < en.tiers.length; index += 1) {
    for (const key of ['id', 'fromPrice', 'price', 'sixPersonPrice', 'regularPrice', 'featured']) assert.equal(es.tiers[index][key], en.tiers[index][key], `${index}: ${key}`);
    assert.match(es.tiers[index].formattedPrice, /USD/);
  }
  assert.match(es.guideLanguageNote, /días 2 y 3/);
  assert.match(es.guideLanguageNote, /español.*suplemento/);
  assert.equal(classic.spanishClassicCopy.daySummaries.length, original.productPreviewCopy.en.daySummaries.length);
  assert.deepEqual(normal(classic.spanishClassicCopy.accommodationOptions.map(stay => stay.images.map(image => image.src))), normal(original.productPreviewCopy.en.accommodationOptions.map(stay => stay.images.map(image => image.src))));
  assert.equal(classic.spanishZhangjiajieComparison.rows.length, 6);
  assert.match(classic.spanishZhangjiajieComparison.boundary, /español.*suplemento/);
});

test('the classic contact draft preserves the chosen accommodation and custom group without a fabricated price tier', () => {
  for (const [id, label] of Object.entries(legacyContact.spanishLegacyStayNames)) {
    const selected = getPrivateTourInquiryContext(legacy.spanishLegacyZhangjiajieSlug, 'en', { packageId: id, travelers: 6 });
    assert.ok(selected);
    assert.equal(spanishContactEdition.selectionLabel(selected), `${label} · 6 viajeros`);
    const custom = getPrivateTourInquiryContext(legacy.spanishLegacyZhangjiajieSlug, 'en', undefined, { stayId: id });
    assert.ok(custom);
    assert.equal(custom.selection, undefined);
    const draft = spanishContactEdition.messageText(custom, undefined, { travelDate: '2027-04-03', requestedTravelers: 3, note: 'Una habitación familiar' });
    for (const text of [legacyContact.spanishLegacyZhangjiajieContactTitle, `Alojamiento preferido (por confirmar): ${label}`, 'Viajeros: 3', 'Llegada prevista: 2027-04-03', 'Una habitación familiar', legacy.spanishLegacyZhangjiajiePath]) assert.ok(draft.includes(text), `${id}: ${text}`);
    assert.equal(getPrivateTourInquiryContext(legacy.spanishLegacyZhangjiajieSlug, 'en', { packageId: id, travelers: 3 }), null);
  }
});
