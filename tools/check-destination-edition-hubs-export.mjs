// Post-build check for the Must-See Sights and Travel Inspiration hubs of the
// French, Spanish, German and Arabic editions (/fr/sights/, /fr/inspiration/
// and the others). Each hub exports in its language and direction, with its
// canonical, the seven-language hreflang set (reciprocal with the English,
// Chinese and Korean hubs), a sitemap entry and one h1. In its main content a
// link to a page that stays English ends with the edition's marker and says
// hreflang="en"; a link to the edition's own page does neither. Every page of
// those editions links the local hubs from its header, never the English ones.
// Run after `next build`: node tools/check-destination-edition-hubs-export.mjs
import nodeAssert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { parse } from "parse5";

const out = path.resolve("out");
const origin = "https://homegroundchina.com";
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : entry.name === "index.html" ? [path.join(dir, entry.name)] : []);
const elements = (node, tag) => [...(node.tagName === tag ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => elements(child, tag))];
const attr = (node, name) => node?.attrs?.find((item) => item.name === name)?.value;
const text = (node) => node?.value ?? (node?.childNodes ?? []).map(text).join("");
const normalize = (value) => value.replace(/\s+/gu, " ").trim();
const fileFor = (pathname) => path.join(out, decodeURIComponent(pathname), pathname.endsWith("/") ? "index.html" : "");
const cache = new Map();
const docFor = (file) => { if (!cache.has(file)) cache.set(file, parse(readFileSync(file, "utf8"))); return cache.get(file); };

const editions = { fr: "(en anglais)", es: "(en inglés)", de: "(Englisch)", ar: "(بالإنجليزية)" };
const hubs = ["sights", "inspiration"];
const languages = (hub) => ({
  en: `/${hub}/`, "zh-Hans": `/zh/${hub}/`, ko: `/ko/${hub}/`,
  fr: `/fr/${hub}/`, es: `/es/${hub}/`, de: `/de/${hub}/`, ar: `/ar/${hub}/`, "x-default": `/${hub}/`,
});
const sitemap = readFileSync(path.join(out, "sitemap.xml"), "utf8");
let hubPages = 0, markedLinks = 0, localLinks = 0, editionPages = 0;

for (const [language, marker] of Object.entries(editions)) {
  for (const hub of hubs) {
    const route = `/${language}/${hub}/`;
    const file = fileFor(route);
    if (!existsSync(file)) { errors.push(`${route}: not exported`); continue; }
    hubPages++;
    const doc = docFor(file);
    const html = elements(doc, "html")[0];
    check(attr(html, "lang") === language, `${route}: html lang`);
    check(language === "ar" ? attr(html, "dir") === "rtl" : attr(html, "dir") !== "rtl", `${route}: direction`);
    check(elements(doc, "h1").length === 1, `${route}: one h1`);
    check(text(elements(doc, "title")[0]).includes("Homeground China"), `${route}: title`);
    check(elements(doc, "meta").some((node) => attr(node, "name") === "description" && (attr(node, "content") ?? "").length > 50), `${route}: description`);
    const links = elements(doc, "link");
    check(attr(links.find((node) => attr(node, "rel") === "canonical"), "href") === `${origin}${route}`, `${route}: canonical`);
    const alternates = Object.fromEntries(links.filter((node) => attr(node, "rel") === "alternate" && attr(node, "hreflang")).map((node) => [attr(node, "hreflang"), attr(node, "href")]));
    const expected = Object.fromEntries(Object.entries(languages(hub)).map(([key, value]) => [key, `${origin}${value}`]));
    check(JSON.stringify(Object.keys(alternates).sort()) === JSON.stringify(Object.keys(expected).sort()) && Object.entries(expected).every(([key, value]) => alternates[key] === value), `${route}: hreflang set ${JSON.stringify(alternates)}`);
    check(sitemap.includes(`<loc>${origin}${route}</loc>`), `${route}: sitemap`);
    // The English, Chinese and Korean hubs name this one back.
    for (const other of [`/${hub}/`, `/zh/${hub}/`, `/ko/${hub}/`]) {
      const back = elements(docFor(fileFor(other)), "link").find((node) => attr(node, "hreflang") === language);
      check(attr(back, "href") === `${origin}${route}`, `${other}: hreflang ${language} → ${route}`);
    }
    for (const anchor of elements(elements(doc, "main")[0] ?? doc, "a")) {
      const href = attr(anchor, "href");
      if (!href || href.startsWith("#")) continue;
      const url = new URL(href, origin);
      if (url.origin !== origin) continue;
      check(existsSync(fileFor(url.pathname)), `${route}: broken link ${href}`);
      const label = normalize(text(anchor));
      if (url.pathname.startsWith(`/${language}/`)) {
        check(!label.endsWith(marker), `${route}: ${href} is the edition's own page but says ${marker}`);
        localLinks++;
      } else {
        check(label.endsWith(marker), `${route}: ${href} is English and must end with ${marker} (${label})`);
        check(attr(anchor, "hreflang") === "en", `${route}: ${href} must say hreflang="en"`);
        markedLinks++;
      }
    }
  }
  // Every page of the edition links the local hubs, never the English ones
  // (the language switch, which says its hreflang, is the exception).
  for (const file of walk(path.join(out, language))) {
    const route = `/${path.relative(out, path.dirname(file)).replaceAll("\\", "/")}/`;
    const anchors = elements(docFor(file), "a");
    editionPages++;
    for (const hub of hubs) {
      check(anchors.some((anchor) => attr(anchor, "href") === `/${language}/${hub}/`), `${route}: no link to /${language}/${hub}/`);
      check(!anchors.some((anchor) => attr(anchor, "href") === `/${hub}/` && !attr(anchor, "hreflang")), `${route}: links the English /${hub}/`);
    }
  }
}

nodeAssert.deepEqual(errors, [], errors.join("\n"));
console.log(`Destination edition hubs: ${hubPages} hubs, ${markedLinks} English links marked, ${localLinks} local links unmarked; ${editionPages} edition pages link their own hubs.`);
