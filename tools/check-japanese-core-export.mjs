import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parse } from 'parse5';

// Inspect the exported HTML, rather than source copy: wiring a Japanese route to
// the English renderer must fail even when a complete translation file exists.
const out = resolve('out');
const origin = 'https://homegroundchina.com';
const serviceSlugs = [
  'private-english-speaking-guides', 'private-car-and-driver',
  'china-attraction-reservations', 'full-trip-support',
];
const corporatePaths = [
  '/ja/corporate-travel/',
  '/ja/corporate-travel/zhangjiajie-4-day-team-trip/',
  '/ja/corporate-travel/shanghai-suzhou-4-day-company-retreat/',
];
const halfDayPath = '/ja/tours/xian-terracotta-warriors-half-day-private-tour/';
const newPaths = [...serviceSlugs.map(slug => `/ja/services/${slug}/`), ...corporatePaths, halfDayPath];
const enquiryAnchorByPath = {
  '/ja/services/private-english-speaking-guides/': 'guide-enquiry',
  '/ja/services/private-car-and-driver/': 'car-enquiry',
  '/ja/services/china-attraction-reservations/': 'reservation-enquiry',
  '/ja/services/full-trip-support/': 'trip-enquiry',
  ...Object.fromEntries(corporatePaths.map(route => [route, 'corporate-enquiry'])),
  [halfDayPath]: 'half-day-enquiry',
};
const languages = { en: '', 'zh-Hans': '/zh', ko: '/ko', ja: '/ja', es: '/es', fr: '/fr', de: '/de', ar: '/ar' };
const errors = [];
const cache = new Map();
const count = { pages: 0, reciprocalServiceLinks: 0, faqAnswers: 0, localLinks: 0, cityPages: 0, cityLinks: 0 };
const normalize = value => value.replace(/\s+/gu, ' ').trim();
const japanese = /[\p{Script=Hiragana}\p{Script=Katakana}]/u;

function check(label, verify) {
  try { verify(); } catch (error) { errors.push(`${label}: ${error.message}`); }
}
function attr(node, name) { return node?.attrs?.find(item => item.name === name)?.value; }
function hasAttr(node, name) { return Boolean(node?.attrs?.some(item => item.name === name)); }
function all(node, predicate) {
  return [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap(child => all(child, predicate))];
}
function tags(node, name) { return all(node, item => item.tagName === name); }
function text(node) {
  if (!node || ['script', 'style', 'template'].includes(node.tagName)) return '';
  return node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');
}
/** A link's words as read out: decorative arrows (aria-hidden) left out. */
function label(node) {
  if (attr(node, 'aria-hidden') === 'true') return '';
  return node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(label).join('');
}
function objects(value) {
  if (!value || typeof value !== 'object') return [];
  return [...(Array.isArray(value) ? [] : [value]), ...Object.values(value).flatMap(objects)];
}
function types(node) { return Array.isArray(node['@type']) ? node['@type'] : [node['@type']]; }
function fileFor(route) { return join(out, route.replace(/^\//u, ''), 'index.html'); }
function page(route) {
  if (cache.has(route)) return cache.get(route);
  const file = fileFor(route);
  if (!existsSync(file)) { errors.push(`${route}: missing exported HTML`); cache.set(route, null); return null; }
  const html = readFileSync(file, 'utf8');
  const doc = parse(html);
  const main = tags(doc, 'main')[0];
  const scripts = tags(doc, 'script').filter(node => attr(node, 'type') === 'application/ld+json');
  const schemas = scripts.flatMap(node => {
    try { return objects(JSON.parse((node.childNodes ?? []).map(child => child.value ?? '').join(''))); }
    catch (error) { errors.push(`${route}: malformed JSON-LD (${error.message})`); return []; }
  });
  const result = { html, doc, main, visible: normalize(text(main)), schemas };
  cache.set(route, result);
  return result;
}
function linkTarget(node) {
  try { return new URL(attr(node, 'href'), origin); } catch { return null; }
}
function hasMainLink(route, target) {
  const current = page(route);
  return current && tags(current.main ?? current.doc, 'a').some(node => linkTarget(node)?.pathname === target);
}
function headAlternate(current, language) {
  return tags(current.doc, 'link').find(node => attr(node, 'rel') === 'alternate' && attr(node, 'hreflang') === language);
}

const untranslatedUi = [
  /\b(?:All services|Ask about your transport|Choose a service|Choose a city|Date not decided yet|Number of travellers|Service start date|Pickup point|Luggage|Route and stops|Other needs)\b/iu,
  /\b(?:Before you enquire|Your trip brief|Send your trip brief|Full trip planning|Written proposal and quote|See when tickets open|Request this attraction|Estimated service fees)\b/iu,
  /\b(?:Company trips|Incentive travel|Meetings and retreats|Sample programmes|Plan my half-day|Private English-speaking guide|No shopping stops|Airport or station transfer)\b/iu,
  /\b(?:Open WhatsApp draft|Prepare an email|Privacy notice|Request a quote|Back to corporate travel)\b/iu,
];

const sitemapPath = join(out, 'sitemap.xml');
assert.ok(existsSync(sitemapPath), 'Build the production export before checking Japanese core pages.');
const sitemap = readFileSync(sitemapPath, 'utf8');

for (const route of newPaths) {
  const current = page(route);
  if (!current) continue;
  count.pages++;
  const { doc, main, schemas, visible } = current;
  check(route, () => {
    assert.equal(attr(tags(doc, 'html')[0], 'lang'), 'ja', 'document language');
    assert.ok(main, 'main content landmark');
    assert.equal(tags(main, 'h1').length, 1, 'one main heading');
    assert.match(text(tags(main, 'h1')[0]), japanese, 'Japanese main heading');
    assert.match(text(tags(doc, 'title')[0]), japanese, 'Japanese title');
    const description = tags(doc, 'meta').find(node => attr(node, 'name') === 'description');
    assert.ok((attr(description, 'content') ?? '').length >= 30, 'substantive description');
    assert.match(attr(description, 'content') ?? '', japanese, 'Japanese description');
    assert.equal(attr(tags(doc, 'link').find(node => attr(node, 'rel') === 'canonical'), 'href'), origin + route, 'own canonical');
    assert.ok(!tags(doc, 'meta').some(node => attr(node, 'name') === 'robots' && /noindex/iu.test(attr(node, 'content') ?? '')), 'indexable page');
    assert.ok(sitemap.includes(`<loc>${origin}${route}</loc>`), 'included in sitemap');
    assert.doesNotMatch(visible, /\{(?:fee|days|name|attraction|operator)\}/u, 'no unresolved copy placeholders');
  });
  for (const pattern of untranslatedUi) check(`${route} visible UI`, () => assert.doesNotMatch(visible, pattern));
  check(`${route} enquiry destination`, () => {
    const id = enquiryAnchorByPath[route];
    const destinations = all(main, node => attr(node, 'id') === id);
    assert.equal(destinations.length, 1, 'one enquiry destination in main content');
    if (route.endsWith('/full-trip-support/')) {
      assert.equal(destinations[0].tagName, 'form', 'trip brief is available directly in the hero');
      assert.ok(tags(destinations[0], 'input').length >= 4, 'trip brief has its traveller, duration, budget and month inputs');
    } else {
      const ids = new Set(all(destinations[0], node => hasAttr(node, 'id')).map(node => attr(node, 'id')));
      assert.ok(tags(main, 'a').some(node => ids.has((attr(node, 'href') ?? '').replace(/^#/u, ''))), 'a visible CTA reaches the enquiry');
    }
  });
  for (const node of all(main ?? doc, node => Boolean(node.tagName))) {
    for (const name of ['aria-label', 'placeholder', 'alt']) {
      const value = attr(node, name);
      if (value) for (const pattern of untranslatedUi) check(`${route} ${name}`, () => assert.doesNotMatch(value, pattern));
    }
  }
  check(`${route} JSON-LD`, () => {
    assert.ok(schemas.some(node => types(node).some(type => ['WebPage', 'CollectionPage'].includes(type)) && node.inLanguage === 'ja'), 'Japanese page entity');
    assert.ok(schemas.some(node => types(node).includes('FAQPage')), 'FAQ entity');
    for (const node of schemas) {
      if (node.inLanguage !== undefined) assert.equal(node.inLanguage, 'ja', 'no conflicting schema language');
      if (types(node).includes('FAQPage')) {
        assert.equal(node.inLanguage, 'ja', 'Japanese FAQ entity');
        assert.ok(Array.isArray(node.mainEntity) && node.mainEntity.length >= 3, 'substantive FAQs');
        for (const faq of node.mainEntity) {
          assert.match(faq.name ?? '', japanese, 'Japanese FAQ question');
          assert.match(faq.acceptedAnswer?.text ?? '', japanese, 'Japanese FAQ answer');
          assert.ok(visible.includes(normalize(faq.name ?? '')), 'FAQ question is present in main content');
          assert.ok(visible.includes(normalize(faq.acceptedAnswer?.text ?? '')), 'FAQ answer is present in main content');
          count.faqAnswers++;
        }
      }
    }
  });
  for (const anchor of tags(main ?? doc, 'a')) {
    const href = attr(anchor, 'href');
    if (!href) continue;
    const target = linkTarget(anchor);
    if (target?.origin !== origin || /\.[^/]+$/u.test(target.pathname)) continue;
    check(`${route} link ${href}`, () => assert.ok(existsSync(fileFor(target.pathname)), 'local destination exists'));
    count.localLinks++;
  }
}

// All eight language editions point at real matching service pages, and each
// service edition points back to this Japanese detail rather than its homepage.
for (const slug of serviceSlugs) {
  const jaPath = `/ja/services/${slug}/`;
  for (const [language, prefix] of Object.entries(languages)) {
    const route = `${prefix}/services/${slug}/`;
    const current = page(route);
    if (!current) continue;
    for (const [targetLanguage, targetPrefix] of Object.entries(languages)) {
      const target = `${targetPrefix}/services/${slug}/`;
      check(`${route} alternate ${targetLanguage}`, () => assert.equal(attr(headAlternate(current, targetLanguage), 'href'), origin + target));
      count.reciprocalServiceLinks++;
    }
    check(`${route} alternate x-default`, () => assert.equal(attr(headAlternate(current, 'x-default'), 'href'), `${origin}/services/${slug}/`));
    const entry = sitemap.split(`<loc>${origin}${route}</loc>`)[1]?.split('</url>')[0] ?? '';
    check(`${route} sitemap Japanese alternate`, () => assert.ok(entry.includes(`hreflang="ja" href="${origin}${jaPath}"`)));
  }
  check(`Japanese services hub → ${slug}`, () => assert.ok(hasMainLink('/ja/services/', jaPath)));
}
check('Japanese tours catalog → half-day tour', () => assert.ok(hasMainLink('/ja/tours/', halfDayPath)));
check('Japanese service overview uses the current shared illustrations', () => {
  const ja = page('/ja/services/');
  const en = page('/services/');
  const cardImages = current => {
    const cards = tags(current.main, 'ol').find(node => hasAttr(node, 'data-count'));
    assert.ok(cards, 'shared service-card grid');
    return tags(cards, 'img').map(node => ({ src: attr(node, 'src'), width: attr(node, 'width'), height: attr(node, 'height') }));
  };
  assert.equal(cardImages(ja).length, 4, 'four core service illustrations');
  assert.deepEqual(cardImages(ja), cardImages(en), 'same images and proportions as the English service overview');
  assert.ok(hasMainLink('/ja/services/', '/ja/services/private-car-and-driver/'), 'private transfer service stays reachable');
});
for (const target of corporatePaths.slice(1)) {
  check(`Japanese corporate hub → ${target}`, () => assert.ok(hasMainLink(corporatePaths[0], target)));
}

const reservation = page('/ja/services/china-attraction-reservations/');
if (reservation) {
  const { main, schemas, visible } = reservation;
  check('Japanese reservation price and guarantee', () => {
    const service = schemas.find(node => types(node).includes('Service') && node.url === `${origin}/ja/services/china-attraction-reservations/`);
    assert.equal(String(service?.offers?.price), '45', 'CNY 45 fee');
    assert.equal(service?.offers?.priceCurrency, 'CNY', 'CNY currency');
    assert.match(service?.offers?.priceSpecification?.unitText ?? '', /1名.*1施設.*45/u, 'fee applies per person per attraction');
    const guarantee = all(main, node => hasAttr(node, 'data-reservation-guarantee'));
    assert.equal(guarantee.length, 1, 'one clear advance guarantee');
    assert.match(text(guarantee[0]), /8日前.*ご依頼とお支払い.*完了/u, 'both request and payment before cutoff');
    assert.match(text(guarantee[0]), /サービス料とチケット代を全額返金/u, 'full guaranteed refund');
    const timing = all(main, node => hasAttr(node, 'data-reservation-timing'))[0];
    const rows = tags(timing, 'li');
    assert.equal(rows.length, 3, 'early / guaranteed / late timing choices');
    assert.match(text(rows[2]), /確約はできません/u, 'late requests have no guarantee');
    assert.match(text(rows[2]), /サービス料全額.*未使用のチケット代/u, 'late refund distinction');
    assert.match(visible, /定価/u, 'face-value ticket promise');
    const rules = all(main, node => node.tagName === 'tr' && (attr(node, 'id') ?? '').startsWith('rule-'));
    assert.equal(rules.length, 25, 'all 25 attraction rules are rendered');
    const ruleText = id => text(rules.find(node => attr(node, 'id') === `rule-${id}`));
    assert.match(ruleText('forbidden-city'), /7日前.*20:00/u, 'Forbidden City release remains seven days at 20:00');
    assert.match(ruleText('shaanxi-history-museum'), /5日前.*17:00/u, 'Shaanxi release remains five days at 17:00');
    assert.match(ruleText('national-museum-of-china'), /7日先まで.*17:00/u, 'NMC seven-day advance window is not mistranslated as a deadline');
    assert.doesNotMatch(visible, /best[ -]effort|ベストエフォート|尽力予約|尽力预约|「尽力」|一部の(?:施設|観光地).{0,15}(?:保証対象外|除外)/iu, 'no attraction-specific guarantee exceptions');
  });
}

// The eight Japanese city pages (content/destinations/<city>/edition.ja.ts):
// Japanese metadata, headings and structured data, indexable and in the
// sitemap, every link resolving, English pages marked （英語）; the hub
// (/ja/explore/) and the homepage footer open them, and no Japanese page links
// an English city page any more.
const cityIds = ['beijing', 'shanghai', 'xian', 'chengdu', 'guangzhou', 'hangzhou', 'zhangjiajie', 'chongqing'];
for (const city of cityIds) {
  const route = `/ja/destinations/${city}/`;
  const current = page(route);
  if (!current) continue;
  count.cityPages++;
  const { doc, main, schemas, visible } = current;
  check(route, () => {
    assert.equal(attr(tags(doc, 'html')[0], 'lang'), 'ja', 'document language');
    assert.ok(main, 'main content landmark');
    assert.equal(tags(main, 'h1').length, 1, 'one main heading');
    assert.match(text(tags(main, 'h1')[0]), japanese, 'Japanese main heading');
    assert.match(text(tags(doc, 'title')[0]), /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}].*\| Homeground China$/u, 'Japanese title with the brand');
    const description = attr(tags(doc, 'meta').find(node => attr(node, 'name') === 'description'), 'content') ?? '';
    assert.ok(description.length >= 30, 'substantive description');
    assert.match(description, japanese, 'Japanese description');
    assert.equal(attr(tags(doc, 'link').find(node => attr(node, 'rel') === 'canonical'), 'href'), origin + route, 'own canonical');
    assert.ok(!tags(doc, 'meta').some(node => attr(node, 'name') === 'robots' && /noindex/iu.test(attr(node, 'content') ?? '')), 'indexable page');
    assert.ok(sitemap.includes(`<loc>${origin}${route}</loc>`), 'included in sitemap');
    assert.equal(attr(headAlternate(current, 'ja'), 'href'), origin + route, 'names itself in hreflang');
    for (const heading of tags(main, 'h2')) assert.match(text(heading), japanese, `Japanese section heading (${normalize(text(heading))})`);
    assert.doesNotMatch(visible, /\{(?:city|name|count)\}|undefined|\[object Object\]/u, 'no unresolved copy');
    assert.ok(schemas.some(node => types(node).includes('CollectionPage') && node.inLanguage === 'ja'), 'Japanese page entity');
  });
  for (const pattern of untranslatedUi) check(`${route} visible UI`, () => assert.doesNotMatch(visible, pattern));
  for (const anchor of tags(main ?? doc, 'a')) {
    const target = linkTarget(anchor);
    if (target?.origin !== origin || /\.[^/]+$/u.test(target.pathname)) continue;
    check(`${route} link ${attr(anchor, 'href')}`, () => {
      assert.ok(existsSync(fileFor(target.pathname)), 'local destination exists');
      if (!target.pathname.startsWith('/ja/')) assert.ok(normalize(label(anchor)).endsWith('（英語）') && attr(anchor, 'hreflang') === 'en', 'an English page says （英語） and hreflang="en"');
    });
    count.localLinks++;
  }
  check(`Japanese hub → ${route}`, () => assert.ok(hasMainLink('/ja/explore/', route)));
  check(`Japanese homepage footer → ${route}`, () => assert.ok(tags(tags(page('/ja/').doc, 'footer')[0], 'a').some(node => attr(node, 'href') === route)));
  count.cityLinks += 2;
}
check('Japanese hub no longer says the city guides are English', () => {
  assert.doesNotMatch(page('/ja/explore/').visible, /都市ガイド（英語）|英語・中国語・韓国語で公開/u);
});
for (const route of [...newPaths, ...cityIds.map(city => `/ja/destinations/${city}/`), '/ja/', '/ja/explore/', '/ja/guides/forbidden-city-for-foreign-visitors/', '/ja/guides/shanghai-where-to-stay-first-trip/']) {
  const current = page(route);
  if (!current) continue;
  check(`${route} links no English city page`, () => assert.ok(!tags(current.doc, 'a').some(node => !attr(node, 'hreflang') && /^\/destinations\/[a-z]+\/$/u.test(attr(node, 'href') ?? ''))));
}

// The three Japanese tour collections (/ja/tours/multi-city/, /regions/,
// /seasonal/): Japanese metadata, headings and structured data, indexable and
// in the sitemap, reciprocal with the English page, every card photo exported
// and every link resolving (an English page would say （英語）).
let collectionPages = 0;
let collectionLinks = 0;
for (const id of ['multi-city', 'regions', 'seasonal']) {
  const route = `/ja/tours/${id}/`;
  const current = page(route);
  if (!current) continue;
  collectionPages++;
  const { doc, main, schemas, visible } = current;
  check(route, () => {
    assert.equal(attr(tags(doc, 'html')[0], 'lang'), 'ja', 'document language');
    assert.ok(main, 'main content landmark');
    assert.equal(tags(main, 'h1').length, 1, 'one main heading');
    assert.match(text(tags(main, 'h1')[0]), japanese, 'Japanese main heading');
    assert.match(text(tags(doc, 'title')[0]), /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}].*\| Homeground China$/u, 'Japanese title with the brand');
    const description = attr(tags(doc, 'meta').find(node => attr(node, 'name') === 'description'), 'content') ?? '';
    assert.ok(description.length >= 30, 'substantive description');
    assert.match(description, japanese, 'Japanese description');
    assert.equal(attr(tags(doc, 'link').find(node => attr(node, 'rel') === 'canonical'), 'href'), origin + route, 'own canonical');
    assert.ok(!tags(doc, 'meta').some(node => attr(node, 'name') === 'robots' && /noindex/iu.test(attr(node, 'content') ?? '')), 'indexable page');
    assert.ok(sitemap.includes(`<loc>${origin}${route}</loc>`), 'included in sitemap');
    assert.equal(attr(headAlternate(current, 'ja'), 'href'), origin + route, 'names itself in hreflang');
    assert.equal(attr(headAlternate(current, 'en'), 'href'), `${origin}/tours/${id}/`, 'names the English page');
    // Group headings may be kanji only (華東, 10日以内).
    for (const heading of tags(main, 'h2')) assert.match(text(heading), /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u, `Japanese section heading (${normalize(text(heading))})`);
    assert.doesNotMatch(visible, /undefined|\[object Object\]/u, 'no unresolved copy');
    assert.ok(schemas.some(node => types(node).includes('CollectionPage') && node.inLanguage === 'ja'), 'Japanese page entity');
    for (const node of schemas) if (node.inLanguage !== undefined) assert.equal(node.inLanguage, 'ja', 'no conflicting schema language');
    for (const image of tags(main, 'img')) assert.ok(existsSync(join(out, decodeURI(attr(image, 'src') ?? '').replace(/^\//u, ''))), `card photo ${attr(image, 'src')} exported`);
  });
  for (const pattern of untranslatedUi) check(`${route} visible UI`, () => assert.doesNotMatch(visible, pattern));
  for (const anchor of tags(main ?? doc, 'a')) {
    const target = linkTarget(anchor);
    // In-page links (#routes-east) stay on this page.
    if ((attr(anchor, 'href') ?? '').startsWith('#') || target?.origin !== origin || /\.[^/]+$/u.test(target.pathname)) continue;
    check(`${route} link ${attr(anchor, 'href')}`, () => {
      assert.ok(existsSync(fileFor(target.pathname)), 'local destination exists');
      if (!target.pathname.startsWith('/ja/')) assert.ok(normalize(label(anchor)).endsWith('（英語）') && attr(anchor, 'hreflang') === 'en', 'an English page says （英語） and hreflang="en"');
    });
    collectionLinks++;
  }
  // The English page and its sitemap entry name the Japanese copy back.
  check(`/tours/${id}/ alternate ja`, () => assert.equal(attr(headAlternate(page(`/tours/${id}/`), 'ja'), 'href'), origin + route));
  const entry = sitemap.split(`<loc>${origin}/tours/${id}/</loc>`)[1]?.split('</url>')[0] ?? '';
  check(`/tours/${id}/ sitemap Japanese alternate`, () => assert.ok(entry.includes(`hreflang="ja" href="${origin}${route}"`)));
}
check('Japanese tour collections exported', () => assert.equal(collectionPages, 3, 'three collection pages'));
if (collectionPages) console.log(`Japanese tour collections: ${collectionPages} pages and ${collectionLinks} local links checked.`);

if (errors.length) throw new Error(`Japanese core export checks failed (${errors.length}):\n${errors.join('\n')}`);
console.log(`Japanese core export: ${count.pages} new pages and ${count.cityPages} city pages, ${count.reciprocalServiceLinks} reciprocal service-edition links, ${count.faqAnswers} visible FAQ answers, ${count.localLinks} local destinations and ${count.cityLinks} hub and footer links to the city pages checked; metadata, sitemap, Japanese UI and reservation terms passed.`);
