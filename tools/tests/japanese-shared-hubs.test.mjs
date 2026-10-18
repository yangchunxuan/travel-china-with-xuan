import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import test from 'node:test';
import ts from 'typescript';

const require = createRequire(import.meta.url);
// Use the runtime modules, including their existing JSON price source.
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText, filename);
const { getJapanesePublishedTourCatalog } = require('../../lib/japanesePublishedTourCatalog.ts');
const { getJapaneseTourCatalog, japaneseTourEntryHref } = require('../../lib/japaneseTourCatalog.ts');
const { getPublishedPrivateTourCatalog } = require('../../lib/publishedPrivateTourCatalog.ts');
const { getPrivateTourStartingPrice, getPrivateTourTwoTravellerPrice } = require('../../lib/privateTourStartingPrice.ts');
const { getJapaneseToursHubFacets } = require('../../lib/japaneseToursHubEdition.ts');
const { getJapaneseHomepageGuideChapters } = require('../../lib/japaneseHomepageEditorial.ts');
const { getHomepageGuideChapters } = require('../../lib/homepageEditorial.ts');
const { japaneseHomepageEditionCopy, japaneseHomepageGuideSearchCopy } = require('../../lib/japaneseHomepageEdition.ts');
const { japaneseHomeCopy } = require('../../lib/japaneseHomeCopy.ts');
const { getHomepagePrivateTourItems } = require('../../lib/homepagePrivateTourCatalog.ts');
const { getFrenchHomepageProducts } = require('../../lib/frenchHomepageEditorial.ts');
const { getSpanishHomepageProducts } = require('../../lib/spanishHomepageEditorial.ts');
const { getGermanHomepageProducts } = require('../../lib/germanHomepageEditorial.ts');
const { getArabicHomepageProducts } = require('../../lib/arabicHomepageEditorial.ts');

test('every shared homepage price opens its displayed party size without changing the advertised price', () => {
  const editions = { en: getHomepagePrivateTourItems('en'), zh: getHomepagePrivateTourItems('zh'), ko: getHomepagePrivateTourItems('ko'), fr: getFrenchHomepageProducts(), es: getSpanishHomepageProducts(), de: getGermanHomepageProducts(), ar: getArabicHomepageProducts() };
  for (const [language, products] of Object.entries(editions)) {
    for (const product of products) {
      const url = new URL(product.href, 'https://homegroundchina.com');
      if (!product.startingPrice) { assert.equal(url.search, '', `${language}:${product.id}`); continue; }
      assert.equal(url.searchParams.get('travelers'), String(product.twoTravellerPrice ? 2 : product.startingPrice.travelers), `${language}:${product.id}`);
      assert.equal(url.searchParams.get('package'), product.startingPrice.selection.packageId, `${language}:${product.id}`);
    }
    const first = products.find(product => product.id === 'beijing-xian-chengdu-guilin-shanghai-13-day-private-tour');
    assert.equal(first.startingPrice.travelers, 8);
    assert.equal(new URL(first.href, 'https://homegroundchina.com').searchParams.get('travelers'), '8', language);
  }
});

test('shared Japanese catalogue preserves every current route, image and actual Japanese price basis', () => {
  const catalog = getJapanesePublishedTourCatalog();
  const english = new Map(getPublishedPrivateTourCatalog('en').map(item => [item.slug, item]));
  const original = getJapaneseTourCatalog();
  assert.equal(catalog.length, original.length + 1);
  assert.equal(new Set(catalog.map(item => item.slug)).size, catalog.length);
  for (const tour of original) {
    const item = catalog.find(candidate => candidate.slug === tour.slug);
    assert.ok(item, tour.slug);
    assert.equal(item.title, tour.title);
    assert.equal(item.href, tour.path);
    assert.equal(item.startingPriceHref, japaneseTourEntryHref(tour));
    assert.equal(item.image.src, english.get(tour.slug).image.src);
    const starting = getPrivateTourStartingPrice(tour);
    const two = getPrivateTourTwoTravellerPrice(tour);
    assert.equal(item.startingPrice?.amount, starting?.amount, tour.slug);
    assert.equal(item.startingPrice?.currency, starting?.currency, tour.slug);
    assert.equal(item.startingPrice?.formatted, starting?.formatted, tour.slug);
    assert.deepEqual(item.startingPrice?.selection, starting?.selection, tour.slug);
    assert.equal(item.twoTravellerPrice?.amount, two?.amount, tour.slug);
    if (starting) assert.equal(item.startingPrice.currency, 'CNY');
  }
  const half = catalog.find(item => item.slug === 'xian-terracotta-warriors-half-day-private-tour');
  assert.equal(half.startingPrice, null);
  assert.equal(half.days, 0.5);
  assert.ok(existsSync(resolve('public', half.image.src.slice(1))));
});

test('Japanese price filters match the displayed yuan amounts, not dollar thresholds', () => {
  const catalog = getJapanesePublishedTourCatalog();
  const facets = getJapaneseToursHubFacets(catalog);
  for (const item of catalog) {
    const price = item.startingPrice;
    const expected = !price ? 'quote' : price.amount < 3500 ? 'low' : price.amount <= 6500 ? 'mid' : 'high';
    assert.equal(facets.items.find(facet => facet.id === item.id).price, expected, item.slug);
  }
  assert.equal(facets.prices.reduce((total, option) => total + option.count, 0), catalog.length);
  assert.ok([...facets.regions, ...facets.lengths, ...facets.prices].every(option => option.label));
});

test('Japanese homepage retains all existing FAQs and uses current chapter photos with honest language destinations', () => {
  assert.deepEqual(japaneseHomepageEditionCopy.faq.items, japaneseHomeCopy.faq.items);
  assert.equal(japaneseHomepageEditionCopy.faq.items.length, 8);
  const chapters = getJapaneseHomepageGuideChapters();
  const source = getHomepageGuideChapters('en');
  assert.deepEqual(chapters.map(item => item.photo), source.map(item => item.photo));
  const guides = chapters.flatMap(item => item.guides);
  assert.equal(guides.filter(item => item.href.startsWith('/ja/')).length, 3);
  const yangshuo = guides.find(item => item.id === 'yangshuo-town-or-yulong-river-where-to-stay');
  assert.equal(yangshuo.href, '/ja/guides/yangshuo-town-or-yulong-river-where-to-stay/');
  assert.equal(yangshuo.linkLabel, '日本語で読む');
  assert.doesNotMatch(yangshuo.title, /（英語）$/u);
  for (const guide of guides) {
    if (!guide.href.startsWith('/ja/')) assert.match(guide.title, /（英語）$/u);
  }
  assert.match(japaneseHomepageGuideSearchCopy.label, /英語/u);
  assert.match(japaneseHomepageGuideSearchCopy.suggestionsLabel(2), /英語/u);
  assert.equal(japaneseHomepageGuideSearchCopy.path, '/guides/search/');
});
