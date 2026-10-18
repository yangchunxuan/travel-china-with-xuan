import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parse } from 'parse5';

const englishRoutes = ['/corporate-travel/', '/corporate-travel/zhangjiajie-4-day-team-trip/', '/corporate-travel/shanghai-suzhou-4-day-company-retreat/'];
// The same three pages in Chinese and Korean, each with its own form button and credits label.
const editions = [
  { prefix: '', submit: 'Prepare my enquiry', credits: 'Photo credits', lang: 'en' },
  { prefix: '/zh', submit: '生成需求消息', credits: '图片来源', lang: 'zh-Hans' },
  { prefix: '/ko', submit: '요청 메시지 만들기', credits: '사진 출처', lang: 'ko' },
];
const pages = editions.flatMap((edition) => englishRoutes.map((route) => ({ ...edition, route: `${edition.prefix}${route}`, englishRoute: route })));
const routes = pages.map((page) => page.route);
const root = path.resolve('out');
function all(node, predicate, result = []) { if (predicate(node)) result.push(node); for (const child of node.childNodes ?? []) all(child, predicate, result); return result; }
function attr(node, name) { return node.attrs?.find(a => a.name === name)?.value ?? ''; }
function text(node) { return node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join(''); }
for (const { route, submit, credits, lang, englishRoute } of pages) {
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
  const pageText = text(doc);
  assert.ok(pageText.includes(submit), `${route}: form button`);
  assert.ok(pageText.includes(credits), `${route}: photo credits`);
  for (const [hreflang, href] of [['en', englishRoute], ['zh-Hans', `/zh${englishRoute}`], ['ko', `/ko${englishRoute}`], ['x-default', englishRoute]]) {
    assert.ok(elements.some(n => n.tagName === 'link' && attr(n, 'rel') === 'alternate' && attr(n, 'hreflang') === hreflang && attr(n, 'href') === `https://homegroundchina.com${href}`), `${route}: ${hreflang} alternate`);
  }
  assert.ok(elements.some(n => attr(n, 'lang') === lang), `${route}: page language ${lang}`);
  const graphs = elements.filter(n => n.tagName === 'script' && attr(n, 'type') === 'application/ld+json').map(n => JSON.parse(text(n)));
  const corporateGraph = graphs.find(g => g['@graph']?.some(n => n['@id'] === `https://homegroundchina.com${route}#webpage`));
  assert.ok(corporateGraph, `${route}: own structured data`);
  assert.ok(corporateGraph['@graph'].some(n => n['@type'] === 'Service'));
  assert.ok(!JSON.stringify(corporateGraph).includes('"offers"'), 'no invented price offers');
  const faq = corporateGraph['@graph'].find(n => n['@type'] === 'FAQPage');
  for (const item of faq.mainEntity) { assert.ok(pageText.includes(item.name)); assert.ok(pageText.includes(item.acceptedAnswer.text)); }
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
for (const route of routes) assert.ok(sitemap.includes(`https://homegroundchina.com${route}`), `${route} in sitemap`);
for (const route of [...englishRoutes, '/zh/corporate-travel/', '/ko/corporate-travel/']) assert.ok(llms.includes(`https://homegroundchina.com${route}`), `${route} in llms.txt`);
console.log('PASS all nine company pages in the sitemap, and the English pages and translated hubs in llms.txt');
