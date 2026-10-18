import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parse } from 'parse5';
import { corporateLocales } from '../lib/corporateTravelTypes.ts';
import { getCorporateHubCopy } from '../lib/corporateTravelHub.ts';
import { getCorporateEnquiryCopy } from '../lib/corporateEnquiryDraft.ts';

const englishRoutes = ['/corporate-travel/', '/corporate-travel/zhangjiajie-4-day-team-trip/', '/corporate-travel/shanghai-suzhou-4-day-company-retreat/'];
const editions = corporateLocales.map(locale => ({ prefix: locale === 'en' ? '' : `/${locale}`, locale, submit: getCorporateEnquiryCopy(locale).submit, credits: getCorporateHubCopy(locale).ui.photoCredits, lang: locale === 'zh' ? 'zh-Hans' : locale }));
const pages = editions.flatMap((edition) => englishRoutes.map((route) => ({ ...edition, route: `${edition.prefix}${route}`, englishRoute: route })));
const routes = pages.map((page) => page.route);
const root = path.resolve('out');
function all(node, predicate, result = []) { if (predicate(node)) result.push(node); for (const child of node.childNodes ?? []) all(child, predicate, result); return result; }
function attr(node, name) { return node.attrs?.find(a => a.name === name)?.value ?? ''; }
function text(node) { return node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join(''); }
function visibleText(node) {
  if (!node || ['script', 'style', 'template'].includes(node.tagName)) return '';
  return node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(visibleText).join('');
}
const normalize = value => value.replace(/\s+/gu, ' ').trim();
for (const { route, submit, credits, lang, locale, englishRoute } of pages) {
  const html = await readFile(path.join(root, route, 'index.html'), 'utf8');
  const doc = parse(html), elements = all(doc, n => Boolean(n.tagName));
  const canonical = elements.find(n => n.tagName === 'link' && attr(n, 'rel') === 'canonical');
  assert.equal(attr(canonical, 'href'), `https://homegroundchina.com${route}`);
  assert.equal(elements.filter(n => n.tagName === 'h1').length, 1, `${route}: exactly one H1`);
  assert.equal(elements.filter(n => attr(n, 'id') === 'corporate-enquiry').length, 1);
  assert.ok(elements.some(n => n.tagName === 'form'));
  assert.ok(elements.some(n => attr(n, 'name') === 'company'));
  assert.ok(elements.some(n => attr(n, 'name') === 'people'));
  assert.ok(elements.some(n => attr(n, 'name') === 'timing'));
  const main = elements.find(n => n.tagName === 'main');
  assert.ok(main, `${route}: main content landmark`);
  const pageText = normalize(visibleText(main));
  assert.ok(pageText.includes(submit), `${route}: form button`);
  assert.ok(pageText.includes(credits), `${route}: photo credits`);
  const alternates = [...editions.map(e => [e.lang, `${e.prefix}${englishRoute}`]), ['x-default', englishRoute]];
  assert.equal(elements.filter(n => n.tagName === 'link' && attr(n, 'rel') === 'alternate' && attr(n, 'hreflang')).length, 9, `${route}: eight languages plus x-default`);
  for (const [hreflang, href] of alternates) {
    assert.ok(elements.some(n => n.tagName === 'link' && attr(n, 'rel') === 'alternate' && attr(n, 'hreflang') === hreflang && attr(n, 'href') === `https://homegroundchina.com${href}`), `${route}: ${hreflang} alternate`);
  }
  assert.equal(attr(elements.find(n => n.tagName === 'html'), 'lang'), lang, `${route}: document language ${lang}`);
  if (locale === 'ar') assert.ok(elements.some(n => attr(n, 'data-homeground-locale') === 'ar' && attr(n, 'dir') === 'rtl'), `${route}: RTL page root`);
  for (const e of editions) assert.ok(elements.some(n => n.tagName === 'a' && attr(n, 'href') === `${e.prefix}${englishRoute}`), `${route}: equivalent ${e.lang} language link`);
  const graphs = elements.filter(n => n.tagName === 'script' && attr(n, 'type') === 'application/ld+json').map(n => JSON.parse(text(n)));
  const corporateGraph = graphs.find(g => g['@graph']?.some(n => n['@id'] === `https://homegroundchina.com${route}#webpage`));
  assert.ok(corporateGraph, `${route}: own structured data`);
  assert.equal(corporateGraph['@graph'].find(n => n['@id'] === `https://homegroundchina.com${route}#webpage`).inLanguage, lang, `${route}: page entity language`);
  assert.ok(corporateGraph['@graph'].some(n => n['@type'] === 'Service'));
  assert.ok(!JSON.stringify(corporateGraph).includes('"offers"'), 'no invented price offers');
  const faq = corporateGraph['@graph'].find(n => n['@type'] === 'FAQPage');
  assert.ok(faq, `${route}: FAQ entity`);
  assert.equal(faq.inLanguage, lang, `${route}: FAQ language`);
  for (const item of faq.mainEntity) {
    assert.ok(pageText.includes(normalize(item.name)), `${route}: visible FAQ question: ${item.name}`);
    assert.ok(pageText.includes(normalize(item.acceptedAnswer.text)), `${route}: visible FAQ answer: ${item.name}`);
  }
  for (const image of elements.filter(n => n.tagName === 'img' && attr(n, 'src').startsWith('/'))) {
    await access(path.join(root, decodeURIComponent(attr(image, 'src').split('?')[0])));
    for (const candidate of attr(image, 'srcset').split(',').filter(Boolean)) {
      const src = candidate.trim().split(/\s+/)[0];
      if (src.startsWith('/')) await access(path.join(root, decodeURIComponent(src.split('?')[0])));
    }
  }
  for (const link of elements.filter(n => n.tagName === 'a')) {
    const href = attr(link, 'href');
    if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/_next')) continue;
    const pathname = new URL(href, 'https://homegroundchina.com').pathname;
    if (/\.[a-z0-9]{2,5}$/i.test(pathname)) continue;
    await access(path.join(root, decodeURIComponent(pathname), 'index.html'));
  }
  console.log(`PASS ${route}: canonical, H1, enquiry, visible FAQ/schema, image variants and internal link targets`);
}
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
const llms = await readFile(path.join(root, 'llms.txt'), 'utf8');
const sitemapRows = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/gu)].map(match => match[1]);
for (const { route, englishRoute } of pages) {
  const rows = sitemapRows.filter(row => row.includes(`<loc>https://homegroundchina.com${route}</loc>`));
  assert.equal(rows.length, 1, `${route}: one sitemap entry`);
  for (const e of editions) assert.ok(rows[0].includes(`href="https://homegroundchina.com${e.prefix}${englishRoute}"`), `${route}: sitemap equivalent ${e.lang}`);
}
for (const route of routes) assert.ok(llms.includes(`https://homegroundchina.com${route}`), `${route} in llms.txt`);
console.log('PASS all 24 company pages in sitemap and llms.txt, with reciprocal equivalents');
