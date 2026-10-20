import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { parse } from "parse5";

/*
 * The French, Spanish, German and Arabic copies of the tour collections and
 * the company page, and the Japanese copies of the collections, as exported:
 * language and direction, canonical and the full reciprocal hreflang set,
 * every tour card and winter table row showing the name its tour page shows
 * as H1 and only prices that tour page shows, the English page's tours in the
 * English page's order, and no edition page still sending readers to the
 * English copies.
 */

const out = path.resolve(process.argv[2] ?? "out");
const origin = "https://homegroundchina.com";
const editions = ["fr", "es", "de", "ar"];
/** The editions with the collections: the four above and Japanese (no company page yet, and its header is left as it is). */
const collectionEditions = [...editions, "ja"];
const collections = ["multi-city", "regions", "seasonal"];
const languages = ["en", "zh-Hans", "ko", "fr", "es", "de", "ar", "x-default"];
const collectionLanguages = [...languages, "ja"];
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const cache = new Map();

function documentFor(route) {
  if (!cache.has(route)) {
    const file = path.join(out, route, "index.html");
    cache.set(route, existsSync(file) ? parse(readFileSync(file, "utf8")) : null);
  }
  return cache.get(route);
}
function elements(node, predicate) {
  const found = [];
  const visit = (current) => {
    if (predicate(current)) found.push(current);
    for (const child of current.childNodes ?? []) visit(child);
  };
  if (node) visit(node);
  return found;
}
const attr = (node, name) => node?.attrs?.find((item) => item.name === name)?.value;
const text = (node) => (node ? node.value ?? (node.childNodes ?? []).map(text).join("") : "");
const clean = (value) => value.replace(/[\s  ]+/gu, " ").trim();
const classed = (node, name) => new RegExp(`(?:^|\\s)\\w+_${name}__`, "u").test(attr(node, "class") ?? "");
const head = (doc) => elements(doc, (node) => node.tagName === "link");
const alternates = (doc) => Object.fromEntries(head(doc).filter((node) => attr(node, "rel") === "alternate" && attr(node, "hreflang")).map((node) => [attr(node, "hreflang"), attr(node, "href")]));
const canonical = (doc) => attr(head(doc).find((node) => attr(node, "rel") === "canonical"), "href");
const noindex = (doc) => elements(doc, (node) => node.tagName === "meta" && attr(node, "name") === "robots").some((node) => attr(node, "content")?.includes("noindex"));
const sitemap = readFileSync(path.join(out, "sitemap.xml"), "utf8");
const inSitemap = (route) => sitemap.includes(`<loc>${origin}${route}</loc>`);

function cardsOf(doc) {
  return elements(doc, (node) => node.tagName === "a" && classed(node, "tourCard")).map((card) => ({
    href: attr(card, "href"),
    name: clean(text(elements(card, (node) => node.tagName === "h4")[0])),
    prices: elements(card, (node) => node.tagName === "strong").map((node) => clean(text(node))),
  }));
}

/** The company page is also in Japanese (checked in tools/check-japanese-core-export.mjs), so its copies name eight languages. */
const companyLanguages = ["en", "zh-Hans", "ko", "ja", "fr", "es", "de", "ar", "x-default"];

/** The hreflang set every copy of a page carries: English, Chinese, Korean and the editions that have it. */
function checkLanguageSet(route, doc, pathFor, set = languages) {
  const found = alternates(doc);
  check(JSON.stringify(Object.keys(found).sort()) === JSON.stringify([...set].sort()), `${route}: hreflang set ${Object.keys(found).join(",")}`);
  for (const language of set) {
    const target = pathFor(language);
    check(found[language] === `${origin}${target}`, `${route}: hreflang ${language} should be ${target}, found ${found[language]}`);
    if (language === "x-default") continue;
    const back = alternates(documentFor(target) ?? null);
    check(documentFor(target) !== null, `${route}: ${language} copy ${target} is not exported`);
    check(back[route.split("/")[1]] === `${origin}${route}`, `${route}: ${target} does not name it back`);
  }
}

let cards = 0;
let prices = 0;
let pages = 0;
for (const edition of collectionEditions) {
  const expectedDirection = edition === "ar" ? "rtl" : "ltr";
  for (const id of collections) {
    const route = `/${edition}/tours/${id}/`;
    const doc = documentFor(route);
    check(doc !== null, `${route}: not exported`);
    if (!doc) continue;
    pages++;
    const html = elements(doc, (node) => node.tagName === "html")[0];
    check(attr(html, "lang") === edition && attr(html, "dir") === expectedDirection, `${route}: lang ${attr(html, "lang")} dir ${attr(html, "dir")}`);
    check(canonical(doc) === `${origin}${route}`, `${route}: canonical`);
    check(!noindex(doc) && inSitemap(route), `${route}: indexable and in the sitemap`);
    checkLanguageSet(route, doc, (language) => (language === "x-default" || language === "en" ? `/tours/${id}/` : `/${language === "zh-Hans" ? "zh" : language}/tours/${id}/`), collectionLanguages);
    const englishSlugs = cardsOf(documentFor(`/tours/${id}/`)).map((card) => card.href.split("/").at(-2));
    const found = cardsOf(doc);
    check(JSON.stringify(found.map((card) => card.href.split("/").at(-2))) === JSON.stringify(englishSlugs), `${route}: not the English page's tours in its order`);
    const rows = elements(doc, (node) => node.tagName === "tr").flatMap((row) => {
      const link = elements(row, (node) => node.tagName === "a")[0];
      return link ? [{ href: attr(link, "href"), name: clean(text(link)), prices: elements(row, (node) => node.tagName === "strong").map((node) => clean(text(node))) }] : [];
    });
    check(id === "seasonal" ? rows.length === 5 : rows.length === 0, `${route}: ${rows.length} winter table rows`);
    for (const item of [...found, ...rows]) {
      cards++;
      check(new RegExp(`^/${edition}/tours/[a-z0-9-]+/$`, "u").test(item.href), `${route}: ${item.href} is not a ${edition} tour page`);
      const tour = documentFor(item.href);
      check(tour !== null, `${route}: ${item.href} is not exported`);
      if (!tour) continue;
      const h1 = clean(text(elements(tour, (node) => node.tagName === "h1")[0]));
      check(item.name === h1, `${route}: card "${item.name}" but ${item.href} is "${h1}"`);
      const shown = clean(text(elements(tour, (node) => node.tagName === "main")[0] ?? tour));
      for (const price of item.prices) {
        // A quote-only card names no amount; any amount must be one the tour page shows.
        if (!/\d/u.test(price)) continue;
        prices++;
        check(shown.includes(price), `${route}: ${price} is not on ${item.href}`);
      }
      if (id !== "seasonal") check(item.prices.length === 0, `${route}: ${item.href} shows a price (the English page does not)`);
    }
  }
  if (edition === "ja") continue;
  const route = `/${edition}/company/`;
  const doc = documentFor(route);
  check(doc !== null, `${route}: not exported`);
  if (doc) {
    pages++;
    const html = elements(doc, (node) => node.tagName === "html")[0];
    check(attr(html, "lang") === edition && attr(html, "dir") === expectedDirection, `${route}: lang and dir`);
    check(canonical(doc) === `${origin}${route}`, `${route}: canonical`);
    // A draft, as the English page: noindex and out of the sitemap until the owner approves the copy.
    check(noindex(doc) && !inSitemap(route), `${route}: noindex and out of the sitemap`);
    checkLanguageSet(route, doc, (language) => (language === "x-default" || language === "en" ? "/company/" : `/${language === "zh-Hans" ? "zh" : language}/company/`), companyLanguages);
  }
}

// No edition page still sends readers to the English copies of these four pages
// (the language switch's own "EN" choice, marked with hrefLang, is meant to);
// no Japanese page to the English collections.
const englishCopies = /<a(?![^>]*\bhrefLang=)[^>]*\bhref="\/(?:tours\/(?:multi-city|regions|seasonal)|company)\/"/u;
const englishCollections = /<a(?![^>]*\bhrefLang=)[^>]*\bhref="\/tours\/(?:multi-city|regions|seasonal)\/"/u;
let scanned = 0;
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? walk(path.join(dir, entry.name)) : entry.name === "index.html" ? [path.join(dir, entry.name)] : []));
for (const edition of collectionEditions) {
  for (const file of walk(path.join(out, edition))) {
    scanned++;
    check(!(edition === "ja" ? englishCollections : englishCopies).test(readFileSync(file, "utf8")), `/${path.relative(out, path.dirname(file))}/: links an English collection or company page`);
  }
  // The Japanese header and footer keep their own menus for now.
  if (edition === "ja") continue;
  const home = readFileSync(path.join(out, edition, "index.html"), "utf8");
  for (const target of [...collections.map((id) => `tours/${id}/`), "company/"]) {
    check(home.includes(`href="/${edition}/${target}"`), `/${edition}/: header or footer does not link /${edition}/${target}`);
  }
}

if (errors.length) {
  console.error(`Edition collections export failed (${errors.length}):\n${errors.slice(0, 40).join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Edition collections export: ${pages} pages, ${cards} tour cards and table rows matched to their tour pages, ${prices} prices found on those pages, ${scanned} edition pages free of links to the English copies.`);
}
