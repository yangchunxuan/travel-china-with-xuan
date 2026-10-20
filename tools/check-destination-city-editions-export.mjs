// Post-build check for the city pages and destinations hubs of the editions
// (lib/destinationEditions.ts): every city page with content and the French,
// German, Spanish and Arabic hubs export in their language and direction with
// their canonical, reciprocal hreflang, sitemap entry and structured data; they
// keep the English page's sections, in order, with the same pictures; a link to
// a page that stays English ends with the edition's marker and says
// hreflang="en", a local link does neither, and every internal link resolves;
// a tour card is the edition's own tour page under that page's own name. Every
// page of an edition links its own hub, and French and German pages link their
// own city pages. The English, Chinese and Korean pages name the new pages in
// hreflang and in their language switch.
// Run after `next build`: node --experimental-strip-types --no-warnings tools/check-destination-city-editions-export.mjs
import nodeAssert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { parse } from "parse5";
import {
  destinationCityLanguagePaths,
  destinationEditionCityIds,
  destinationEditionLocales,
  destinationsHubEditionLocales,
  destinationsHubEditionPath,
  hasDestinationEditionCity,
} from "../lib/destinationEditions.ts";

const out = path.resolve("out");
const origin = "https://homegroundchina.com";
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : entry.name === "index.html" ? [path.join(dir, entry.name)] : []);
const elements = (node, tag) => [...(node.tagName === tag ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => elements(child, tag))];
const attr = (node, name) => node?.attrs?.find((item) => item.name === name)?.value;
/** Visible text: what a reader sees, leaving out decorative arrows (aria-hidden). */
const text = (node) => attr(node, "aria-hidden") === "true" ? "" : node?.value ?? (node?.childNodes ?? []).map(text).join("");
const normalize = (value) => value.replace(/\s+/gu, " ").trim();
const fileFor = (pathname) => path.join(out, decodeURIComponent(pathname), pathname.endsWith("/") ? "index.html" : "");
const cache = new Map();
const docFor = (file) => { if (!cache.has(file)) cache.set(file, parse(readFileSync(file, "utf8"))); return cache.get(file); };
const marker = { fr: "(en anglais)", de: "(Englisch)", es: "(en inglés)", ar: "(بالإنجليزية)", ja: "（英語）" };
const sitemap = readFileSync(path.join(out, "sitemap.xml"), "utf8");
const jsonLd = (doc) => elements(doc, "script").filter((node) => attr(node, "type") === "application/ld+json").map((node) => JSON.parse(text(node)));
const graph = (doc) => jsonLd(doc).flatMap((data) => data["@graph"] ?? [data]);
const headings = (doc) => elements(elements(doc, "main")[0], "h2").map((node) => attr(node, "id") ?? "(no id)");
const pictures = (doc) => elements(elements(doc, "main")[0], "img").map((node) => attr(node, "src"));
const counts = { cities: 0, hubs: 0, marked: 0, local: 0, tours: 0, reciprocal: 0, editionPages: 0 };

function checkHead(route, language, expectedLanguages) {
  const file = fileFor(route);
  if (!existsSync(file)) { errors.push(`${route}: not exported`); return null; }
  const doc = docFor(file);
  const html = elements(doc, "html")[0];
  check(attr(html, "lang") === language, `${route}: html lang`);
  check(language === "ar" ? attr(html, "dir") === "rtl" : attr(html, "dir") !== "rtl", `${route}: direction`);
  check(elements(doc, "h1").length === 1, `${route}: one h1`);
  check(normalize(text(elements(doc, "title")[0])).endsWith("| Homeground China"), `${route}: title`);
  check(elements(doc, "meta").some((node) => attr(node, "name") === "description" && (attr(node, "content") ?? "").length > 50), `${route}: description`);
  check(!elements(doc, "meta").some((node) => attr(node, "name") === "robots" && /noindex/u.test(attr(node, "content") ?? "")), `${route}: indexable`);
  const links = elements(doc, "link");
  check(attr(links.find((node) => attr(node, "rel") === "canonical"), "href") === `${origin}${route}`, `${route}: canonical`);
  const alternates = Object.fromEntries(links.filter((node) => attr(node, "rel") === "alternate" && attr(node, "hreflang")).map((node) => [attr(node, "hreflang"), attr(node, "href")]));
  const expected = Object.fromEntries(Object.entries(expectedLanguages).map(([key, value]) => [key, `${origin}${value}`]));
  check(JSON.stringify(Object.keys(alternates).sort()) === JSON.stringify(Object.keys(expected).sort()) && Object.entries(expected).every(([key, value]) => alternates[key] === value), `${route}: hreflang ${JSON.stringify(alternates)}`);
  // Every other language version names this page back.
  for (const [hreflang, href] of Object.entries(alternates)) {
    if (hreflang === language || hreflang === "x-default") continue;
    const target = fileFor(new URL(href).pathname);
    if (!existsSync(target)) { errors.push(`${route}: alternate ${href} not exported`); continue; }
    const back = elements(docFor(target), "link").find((node) => attr(node, "rel") === "alternate" && attr(node, "hreflang") === language);
    check(attr(back, "href") === `${origin}${route}`, `${new URL(href).pathname}: hreflang ${language} → ${route}`);
    counts.reciprocal++;
  }
  check(sitemap.includes(`<loc>${origin}${route}</loc>`), `${route}: sitemap`);
  return doc;
}

/** Links in the page's main content: English pages say so, local ones do not, all resolve. */
function checkMainLinks(route, doc, language) {
  for (const anchor of elements(elements(doc, "main")[0], "a")) {
    const href = attr(anchor, "href");
    if (!href || href.startsWith("#")) continue;
    const url = new URL(href, origin);
    if (url.origin !== origin) continue;
    check(existsSync(fileFor(url.pathname)), `${route}: broken link ${href}`);
    const label = normalize(text(anchor));
    if (url.pathname.startsWith(`/${language}/`)) {
      check(!label.endsWith(marker[language]), `${route}: ${href} is local but says ${marker[language]}`);
      check(attr(anchor, "hreflang") !== "en", `${route}: ${href} is local but says hreflang="en"`);
      counts.local++;
    } else {
      check(label.endsWith(marker[language]), `${route}: ${href} is English and must end with ${marker[language]} (${label})`);
      check(attr(anchor, "hreflang") === "en", `${route}: ${href} must say hreflang="en"`);
      counts.marked++;
    }
  }
}

/** The edition page keeps the English page's sections in order, its pictures and its structured-data identity. */
function checkSameAs(route, doc, englishRoute, language) {
  const english = docFor(fileFor(englishRoute));
  check(JSON.stringify(headings(doc)) === JSON.stringify(headings(english)), `${route}: sections ${headings(doc)} differ from ${englishRoute} ${headings(english)}`);
  check(JSON.stringify(pictures(doc)) === JSON.stringify(pictures(english)), `${route}: pictures differ from ${englishRoute}`);
  const ids = (nodes) => nodes.map((node) => `${node["@type"]}:${(node["@id"] ?? "").replace(/^https:\/\/homegroundchina\.com\/(?:[a-z]{2}\/)?/u, "/")}`).sort();
  const editionGraph = graph(doc), englishGraph = graph(english).filter((node) => node["@type"] !== "FAQPage");
  check(JSON.stringify(ids(editionGraph)) === JSON.stringify(ids(englishGraph)), `${route}: structured data ${ids(editionGraph)} differs from ${englishRoute} ${ids(englishGraph)}`);
  for (const node of editionGraph) {
    if (node["@type"] === "CollectionPage") check(node.inLanguage === language, `${route}: CollectionPage inLanguage ${node.inLanguage}`);
    if (node.url && node["@type"] !== "Organization" && node["@type"] !== "WebSite") check(node.url === `${origin}${route}`, `${route}: ${node["@type"]} url`);
  }
  check(!editionGraph.some((node) => node["@type"] === "FAQPage"), `${route}: an FAQ the page does not show`);
}

for (const language of destinationEditionLocales) {
  for (const city of destinationEditionCityIds(language)) {
    const route = `/${language}/destinations/${city}/`;
    const doc = checkHead(route, language, destinationCityLanguagePaths(city));
    if (!doc) continue;
    counts.cities++;
    checkMainLinks(route, doc, language);
    checkSameAs(route, doc, `/destinations/${city}/`, language);
    // Tour cards: the edition's tour pages, under their own names.
    for (const anchor of elements(elements(doc, "main")[0], "a").filter((node) => /^\/[a-z]{2}\/tours\/[^/?#]+\/$/u.test(attr(node, "href") ?? ""))) {
      const href = attr(anchor, "href");
      check(href.startsWith(`/${language}/tours/`), `${route}: tour card ${href} is not the edition's`);
      const title = normalize(text(elements(anchor, "h4")[0] ?? { value: "" }));
      const tourPage = docFor(fileFor(href));
      const pageTitle = normalize(text(elements(tourPage, "h1")[0]));
      check(title && pageTitle.replace(/\s+/gu, "") === title.replace(/\s+/gu, ""), `${route}: tour card "${title}" is "${pageTitle}" on ${href}`);
      counts.tours++;
    }
    // The language switch of the English, Chinese and Korean pages opens this page.
    for (const englishRoute of [`/destinations/${city}/`, `/zh/destinations/${city}/`, `/ko/destinations/${city}/`]) {
      const switcher = elements(elements(docFor(fileFor(englishRoute)), "header")[0], "a").filter((node) => attr(node, "hreflang") === language);
      check(switcher.length > 0 && switcher.every((node) => attr(node, "href") === route), `${englishRoute}: the ${language} switch opens ${route}`);
    }
  }
}

for (const language of destinationsHubEditionLocales) {
  const route = destinationsHubEditionPath[language];
  const languages = { en: "/explore/", "zh-Hans": "/zh/explore/", ko: "/ko/explore/", ja: "/ja/explore/", ...Object.fromEntries(destinationsHubEditionLocales.map((other) => [other, destinationsHubEditionPath[other]])), "x-default": "/explore/" };
  const doc = checkHead(route, language, languages);
  if (!doc) continue;
  counts.hubs++;
  checkMainLinks(route, doc, language);
  checkSameAs(route, doc, "/explore/", language);
  // City cards: the edition's city page where it has one.
  for (const anchor of elements(elements(doc, "main")[0], "a").filter((node) => /\/destinations\/[a-z]+\/$/u.test(attr(node, "href") ?? ""))) {
    const city = /\/destinations\/([a-z]+)\/$/u.exec(attr(anchor, "href"))[1];
    check(attr(anchor, "href") === (hasDestinationEditionCity(language, city) ? `/${language}/destinations/${city}/` : `/destinations/${city}/`), `${route}: ${city} card`);
  }
  for (const englishRoute of ["/explore/", "/zh/explore/", "/ko/explore/"]) {
    const switcher = elements(elements(docFor(fileFor(englishRoute)), "header")[0], "a").filter((node) => attr(node, "hreflang") === language);
    check(switcher.length > 0 && switcher.every((node) => attr(node, "href") === route), `${englishRoute}: the ${language} switch opens ${route}`);
  }
}

// Every page of an edition links its own hub, never the English one; French and German link their own city pages.
// (A language switch says its hreflang and may open another language.)
for (const language of destinationsHubEditionLocales) {
  for (const file of walk(path.join(out, language))) {
    const route = `/${path.relative(out, path.dirname(file)).replaceAll("\\", "/")}/`;
    const anchors = elements(docFor(file), "a").filter((node) => !attr(node, "hreflang"));
    counts.editionPages++;
    check(anchors.some((node) => attr(node, "href") === destinationsHubEditionPath[language]), `${route}: no link to ${destinationsHubEditionPath[language]}`);
    check(!anchors.some((node) => attr(node, "href") === "/explore/"), `${route}: links the English /explore/`);
    for (const node of anchors) {
      const city = /^\/destinations\/([a-z]+)\/$/u.exec(attr(node, "href") ?? "")?.[1];
      if (city && hasDestinationEditionCity(language, city)) errors.push(`${route}: links the English /destinations/${city}/ although /${language}/destinations/${city}/ exists`);
    }
  }
}

nodeAssert.deepEqual(errors, [], errors.join("\n"));
console.log(`Destination city editions: ${counts.cities} city pages and ${counts.hubs} hubs; ${counts.reciprocal} reciprocal alternates, ${counts.marked} English links marked, ${counts.local} local links, ${counts.tours} tour cards; ${counts.editionPages} edition pages link their own hub and city pages.`);
