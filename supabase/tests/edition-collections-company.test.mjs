import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";

/*
 * The French, Spanish, German and Arabic copies of the three tour collections
 * and the company page. The pages themselves are rendered here (header and
 * footer left out), so the cards, prices and links checked are the ones a
 * reader gets.
 */

const root = path.resolve(import.meta.dirname, "../..");
const nodeRequire = createRequire(path.join(root, "package.json"));
const ts = nodeRequire("typescript");
const React = nodeRequire("react");
const { renderToStaticMarkup } = nodeRequire("react-dom/server");
const { parseFragment } = nodeRequire("parse5");

const editions = ["fr", "es", "de", "ar"];
const collections = ["multi-city", "regions", "seasonal"];
const routeGroups = { fr: "french", es: "spanish", de: "german", ar: "arabic" };
const headers = { fr: "FrenchHeader", es: "SpanishHeader", de: "GermanHeader", ar: "ArabicHeader" };
const chromes = { fr: "FrenchChrome", es: "SpanishChrome", de: "GermanChrome", ar: "ArabicChrome" };
const hubs = { fr: "French", es: "Spanish", de: "German", ar: "Arabic" };
/** How each edition tells the reader a link opens an English page (as localized-guide-links.test.mjs). */
const englishMarker = { fr: /\(en anglais\)$/u, es: /\(en inglés\)$/u, de: /\(Englisch\)$/u, ar: /\(بالإنجليزية\)$/u };
/** A label that ends by saying the page is in English (Arabic labels used to end in a bare "بالإنجليزية"). */
const anyEnglishMarker = /(?:\(en anglais\)|\(en inglés\)|\(Englisch\)|\(?بالإنجليزية\)?)$/u;
const source = (file) => readFileSync(path.join(root, file), "utf8");

/* A small module loader: TypeScript and TSX transpiled to CommonJS, CSS modules as class-name proxies. */
const stubbed = new Set([
  "components/EditionSiteChrome.tsx", "components/HomegroundHeader.tsx", "components/HomegroundFooter.tsx",
  "components/PrivateToursHubPage.tsx", "components/FrenchChrome.tsx", "components/GermanChrome.tsx",
  "components/SpanishChrome.tsx", "components/ArabicChrome.tsx",
]);
const componentStub = new Proxy({}, { get: (_, key) => (key === "__esModule" ? true : () => null) });
const cssModule = new Proxy({}, { get: (_, key) => (key === "__esModule" ? false : String(key)) });
const cache = new Map();
function resolveFile(from, id) {
  const base = path.resolve(path.dirname(from), id);
  for (const candidate of [base, `${base}.ts`, `${base}.tsx`, `${base}.json`, path.join(base, "index.ts"), path.join(base, "index.tsx")]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  throw new Error(`Cannot resolve ${id} from ${from}`);
}
function load(relative) {
  return loadFile(path.join(root, relative));
}
function loadFile(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} };
  cache.set(file, module);
  if (file.endsWith(".json")) {
    module.exports = JSON.parse(readFileSync(file, "utf8"));
    return module.exports;
  }
  const code = ts.transpileModule(readFileSync(file, "utf8"), {
    fileName: file,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, resolveJsonModule: true },
  }).outputText;
  const require = (id) => {
    if (id.endsWith(".css")) return cssModule;
    if (!id.startsWith(".")) return nodeRequire(id);
    const target = resolveFile(file, id);
    return stubbed.has(path.relative(root, target)) ? componentStub : loadFile(target);
  };
  vm.runInThisContext(`(function (exports, require, module, __filename, __dirname) {${code}\n})`, { filename: file })(module.exports, require, module, file, path.dirname(file));
  return module.exports;
}

/* Rendered markup, read as a tree. */
function elements(node, predicate) {
  const found = [];
  const visit = (current) => {
    if (predicate(current)) found.push(current);
    for (const child of current.childNodes ?? []) visit(child);
  };
  visit(node);
  return found;
}
const attr = (node, name) => node?.attrs?.find((item) => item.name === name)?.value;
const text = (node) => (node.value ?? (node.childNodes ?? []).map(text).join(""));
const clean = (value) => value.replace(/[\s ]+/gu, " ").trim();
const hasClass = (node, name) => (attr(node, "class") ?? "").split(/\s+/u).includes(name);
/** next/link renders "/fr/tours/x" outside the app; the site's own links all end in "/". */
const page = (href) => (/^\/[^#?]*[^/]$/u.test(href) ? `${href}/` : href);
const render = (element) => parseFragment(renderToStaticMarkup(element));

const tourCollections = load("lib/tourCollections.ts");
const { TourCollectionPage } = load("components/TourCollectionsPages.tsx");
const { HomegroundCompanyPage } = load("components/HomegroundCompanyPage.tsx");
const { getTourCollectionEditionCopy } = load("lib/tourCollectionsEditions.ts");
const { getHomegroundCompanyEditionCopy } = load("lib/homegroundCompanyEditions.ts");
const { getHomegroundCompanyCopy, getCompanyLanguagePaths } = load("lib/homegroundCompanyI18n.ts");
const { getPublishedPrivateTourCatalog } = load("lib/publishedPrivateTourCatalog.ts");
const metadata = load("lib/editionPageMetadata.ts");
const { buildTourCollectionMetadata } = load("lib/tourCollectionsMetadata.ts");
const catalogs = Object.fromEntries(editions.map((lang) => [lang, load(`components/${hubs[lang]}ToursHubPage.tsx`)[`get${hubs[lang]}PublishedTourCatalog`]()]));

function cardsOf(tree) {
  return elements(tree, (node) => node.tagName === "a" && hasClass(node, "tourCard")).map((card) => ({
    href: page(attr(card, "href")),
    title: clean(text(elements(card, (node) => node.tagName === "h4")[0])),
    prices: elements(card, (node) => node.tagName === "strong").map((node) => clean(text(node))),
  }));
}

test("sixteen pages: each edition's three collections and company page, in its own route group and language", () => {
  for (const lang of editions) {
    const group = `app/(${routeGroups[lang]})/${lang}`;
    const layout = source(`${group}/layout.tsx`);
    assert.match(layout, new RegExp(`<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}"`, "u"), `${lang}: layout language and direction`);
    for (const id of collections) {
      const route = source(`${group}/tours/${id}/page.tsx`);
      assert.match(route, new RegExp(`buildTourCollectionEditionMetadata\\("${id}", "${lang}"\\)`, "u"));
      assert.match(route, new RegExp(`<TourCollectionPage collectionId="${id}" editionLocale="${lang}" />`, "u"));
      // A static folder wins over the tour route, and no published tour is named like a collection.
      assert.ok(!catalogs[lang].some((tour) => tour.slug === id), `${lang}: ${id} is not a tour slug`);
    }
    const company = source(`${group}/company/page.tsx`);
    assert.match(company, new RegExp(`buildCompanyEditionMetadata\\("${lang}"\\)`, "u"));
    assert.match(company, new RegExp(`<HomegroundCompanyPage editionLocale="${lang}" />`, "u"));
  }
});

test("canonical and reciprocal hreflang: every copy names all seven, English, Chinese and Korean included", () => {
  for (const id of collections) {
    const languages = tourCollections.tourCollectionLanguagePaths(id);
    assert.deepEqual(languages, {
      en: `/tours/${id}/`, "zh-Hans": `/zh/tours/${id}/`, ko: `/ko/tours/${id}/`,
      fr: `/fr/tours/${id}/`, es: `/es/tours/${id}/`, de: `/de/tours/${id}/`, ar: `/ar/tours/${id}/`, "x-default": `/tours/${id}/`,
    });
    for (const locale of ["en", "zh", "ko"]) {
      const meta = buildTourCollectionMetadata(id, locale);
      assert.deepEqual(meta.alternates.languages, languages, `${locale} ${id}: alternates`);
      assert.equal(meta.alternates.canonical, tourCollections.tourCollectionPath(id, locale));
    }
    for (const lang of editions) {
      const meta = metadata.buildTourCollectionEditionMetadata(id, lang);
      assert.equal(meta.alternates.canonical, `/${lang}/tours/${id}/`);
      assert.deepEqual(meta.alternates.languages, languages, `${lang} ${id}: alternates`);
      assert.deepEqual(meta.robots, { index: true, follow: true });
      assert.match(meta.title.absolute, /Homeground China$/u);
      assert.ok(meta.description.length > 50);
    }
  }
  const company = getCompanyLanguagePaths();
  assert.deepEqual(company, {
    en: "/company/", "zh-Hans": "/zh/company/", ko: "/ko/company/",
    fr: "/fr/company/", es: "/es/company/", de: "/de/company/", ar: "/ar/company/", "x-default": "/company/",
  });
  for (const lang of editions) {
    const meta = metadata.buildCompanyEditionMetadata(lang);
    assert.equal(meta.alternates.canonical, `/${lang}/company/`);
    assert.equal(getHomegroundCompanyEditionCopy(lang).path, `/${lang}/company/`);
    assert.deepEqual(meta.alternates.languages, company);
    // A draft, as the English page: out of search until the owner approves the copy.
    assert.deepEqual(meta.robots, { index: false, follow: true });
    assert.match(meta.title.absolute, /Homeground China/u);
  }
  const sitemap = source("app/sitemap.ts");
  assert.match(sitemap, /tourCollectionEditionLocales\.flatMap\(language => tourCollectionIds\.map/u);
  assert.match(sitemap, /isTourCollectionId\(collectionId\) \? absoluteJaPilotAlternates\(tourCollectionLanguagePaths\(collectionId\)\)/u);
  assert.doesNotMatch(sitemap, /company\//u);
});

test("every tour card and table row shows the edition catalogue's name, price and link, in the English page's order", () => {
  const english = getPublishedPrivateTourCatalog("en");
  for (const id of collections) {
    const englishCards = cardsOf(render(React.createElement(TourCollectionPage, { collectionId: id, locale: "en" })));
    const englishSlugs = englishCards.map((card) => card.href.split("/").at(-2));
    assert.deepEqual(englishSlugs, tourCollections.getTourCollectionGroups(id, "en").flatMap((group) => group.tours.map((tour) => tour.slug)));
    for (const lang of editions) {
      const bySlug = new Map(catalogs[lang].map((tour) => [tour.slug, tour]));
      const tree = render(React.createElement(TourCollectionPage, { collectionId: id, editionLocale: lang }));
      const cards = cardsOf(tree);
      assert.deepEqual(cards.map((card) => card.href.split("/").at(-2)), englishSlugs, `${lang} ${id}: same tours, same order`);
      const words = getTourCollectionEditionCopy(lang).priceCopy;
      for (const card of cards) {
        const slug = card.href.split("/").at(-2);
        const tour = bySlug.get(slug);
        const source = english.find((item) => item.slug === slug);
        assert.equal(card.href, `/${lang}/tours/${slug}/`, `${lang} ${id}: ${slug} opens the edition's tour page`);
        assert.equal(page(tour.href), card.href);
        assert.equal(card.title, clean(tour.title), `${lang} ${id}: ${slug} name`);
        if (id !== "seasonal") {
          // As in English: the multi-city and region pages show no price; the tour page does.
          assert.deepEqual(card.prices, [], `${lang} ${id}: ${slug} has no price on the card`);
          continue;
        }
        const expected = !tour.startingPrice ? [words.quoteOnlyLabel]
          : tour.twoTravellerPrice ? [tour.twoTravellerPrice.formatted, tour.startingPrice.formatted]
            : [tour.startingPrice.formatted];
        assert.deepEqual(card.prices, expected.map(clean), `${lang} seasonal: ${slug} prices`);
        // The catalogue keeps the English amounts and currency: nothing is converted or recomputed.
        assert.equal(tour.startingPrice?.amount, source.startingPrice?.amount);
        assert.equal(tour.startingPrice?.currency, source.startingPrice?.currency);
        assert.equal(tour.twoTravellerPrice?.amount, source.twoTravellerPrice?.amount);
        assert.equal(tour.twoTravellerPrice?.currency, source.twoTravellerPrice?.currency);
      }
      if (id === "seasonal") {
        const rows = elements(tree, (node) => node.tagName === "tr" && elements(node, (child) => child.tagName === "a").length);
        assert.equal(rows.length, 5, `${lang}: five priced winter routes`);
        for (const row of rows) {
          const link = elements(row, (node) => node.tagName === "a")[0];
          const tour = bySlug.get(page(attr(link, "href")).split("/").at(-2));
          assert.equal(page(attr(link, "href")), page(tour.href));
          assert.equal(clean(text(link)), clean(tour.title));
          assert.equal(clean(text(elements(row, (node) => node.tagName === "strong")[0])), clean(tour.twoTravellerPrice.formatted));
        }
      }
    }
  }
});

test("links on the new pages open the edition's own pages, and English-only pages say so", () => {
  for (const lang of editions) {
    for (const id of collections) {
      const tree = render(React.createElement(TourCollectionPage, { collectionId: id, editionLocale: lang }));
      for (const link of elements(tree, (node) => node.tagName === "a")) {
        const href = attr(link, "href");
        if (/^(?:#|https?:)/u.test(href)) continue;
        assert.ok(page(href).startsWith(`/${lang}/`), `${lang} ${id}: ${href} is a ${lang} page`);
        assert.doesNotMatch(clean(text(link)), anyEnglishMarker, `${lang} ${id}: ${href}`);
      }
    }
    const company = render(React.createElement(HomegroundCompanyPage, { editionLocale: lang }));
    const links = elements(company, (node) => node.tagName === "a").map((node) => ({ href: page(attr(node, "href")), label: clean(text(node)) }));
    assert.ok(links.some((link) => link.href === `/${lang}/studio/`));
    assert.ok(links.some((link) => link.href === `/${lang}/business-information/`));
    for (const service of ["china-attraction-reservations", "private-english-speaking-guides", "full-trip-support"]) {
      assert.ok(links.some((link) => link.href === `/${lang}/services/${service}/`), `${lang}: ${service}`);
    }
    for (const link of links) {
      if (link.href.startsWith("#")) continue;
      if (link.href.startsWith(`/${lang}/`)) assert.doesNotMatch(link.label, anyEnglishMarker, `${lang} company: ${link.href}`);
      else if (link.href === "/zh/careers/") assert.match(link.label, /chinois|chino|Chinesisch|بالصينية/u);
      else assert.match(link.label, englishMarker[lang], `${lang} company: ${link.href} is English`);
    }
  }
});

test("the edition headers and footers open the four new pages, with no other change", () => {
  const ids = { "multi-city": "tours/multi-city/", regions: "tours/regions/", seasonal: "tours/seasonal/", company: "company/" };
  for (const lang of editions) {
    const header = source(`components/${headers[lang]}.tsx`);
    const chrome = source(`components/${chromes[lang]}.tsx`);
    const copy = getTourCollectionEditionCopy(lang);
    const entry = (id) => {
      const match = new RegExp(`'?${id}'?\\s*:\\s*\\{\\s*label\\s*:\\s*'([^']*)'\\s*,\\s*description\\s*:\\s*'([^']*)'\\s*,\\s*href\\s*:\\s*'([^']*)'\\s*\\}`, "u").exec(header);
      assert.ok(match, `${lang}: ${id} header entry`);
      return { label: match[1], description: match[2], href: match[3] };
    };
    for (const [id, suffix] of Object.entries(ids)) {
      const row = entry(id);
      assert.equal(row.href, `/${lang}/${suffix}`, `${lang} header: ${id}`);
      assert.doesNotMatch(row.label, anyEnglishMarker, `${lang} header: ${id} label`);
    }
    // The collection pages repeat the header's own menu rows and service rows word for word.
    for (const [id, row] of Object.entries(copy.tourMenu)) assert.deepEqual(row, entry(id), `${lang}: tour menu ${id}`);
    for (const [id, row] of Object.entries(copy.serviceMenu)) assert.deepEqual(row, entry(id), `${lang}: service ${id}`);
    assert.equal(getTourCollectionEditionCopy(lang).collections["multi-city"].name, entry("'multi-city'").label);
    assert.equal(getTourCollectionEditionCopy(lang).collections.regions.name, entry("regions").label);
    assert.equal(getTourCollectionEditionCopy(lang).collections.seasonal.name, entry("seasonal").label);
    const footer = /company:\s*\{\s*path:\s*['"]([^'"]+)['"],\s*navLabel:\s*['"]([^'"]+)['"]\s*\}/u.exec(chrome);
    assert.equal(footer?.[1], `/${lang}/company/`, `${lang} footer: company`);
    assert.doesNotMatch(footer[2], anyEnglishMarker, `${lang} footer: company label`);
    for (const file of [header, chrome]) {
      assert.doesNotMatch(file, /['"`]\/(?:tours\/(?:multi-city|regions|seasonal)|company)\/['"`]/u, `${lang}: no English link to the four pages is left`);
    }
  }
});

test("region names, price words and table headings are the edition catalogue's own", () => {
  for (const lang of editions) {
    const hub = source(`components/${hubs[lang]}ToursHubPage.tsx`);
    const copy = getTourCollectionEditionCopy(lang);
    const regions = /regionLabels:Record<string,string>=\{([^}]*)\}/u.exec(hub)?.[1];
    assert.ok(regions, `${lang}: hub region labels`);
    for (const [id, label] of Object.entries(copy.regionLabels)) assert.match(regions, new RegExp(`${id}:'${label}'`, "u"), `${lang}: region ${id}`);
    const hubWord = (key) => new RegExp(`${key}:'([^']*)'`, "u").exec(hub)?.[1];
    assert.equal(copy.priceCopy.startingPriceLabel, hubWord("startingPriceLabel"));
    assert.equal(copy.priceCopy.quoteOnlyLabel, hubWord("quoteOnlyLabel"));
    assert.equal(copy.priceCopy.quoteOnlyBody, hubWord("quoteOnlyBody"));
    assert.equal(copy.priceCopy.perPersonPriceNote, hubWord("perPersonPriceNote"));
    assert.equal(copy.priceCopy.partySize(2), `2 ${/partySize:\(n:number\)=>`\$\{n\} ([^`]*)`/u.exec(hub)?.[1]}`);
    // The table's "who it suits" and stay-and-pace columns show the catalogue's own lines, under the catalogue's own names.
    assert.equal(copy.winter.fit, hubWord("quickFitLabel"));
    assert.equal(copy.winter.travel, hubWord("quickMovementLabel"));
  }
});

test("the translations keep the English page's structure, groups and facts", () => {
  const englishCollections = load("lib/tourCollectionsI18n.ts").getTourCollectionsCopy("en");
  const { getNortheastWinterComparisonRows } = load("lib/northeastWinterComparison.ts");
  const winterSlugs = getNortheastWinterComparisonRows(tourCollections.getTourCollectionGroups("seasonal", "en").flatMap((group) => group.tours), "en").map((row) => row.tour.slug);
  const englishCompany = getHomegroundCompanyCopy("en");
  for (const lang of editions) {
    const copy = getTourCollectionEditionCopy(lang);
    for (const id of collections) {
      assert.deepEqual(Object.keys(copy.collections[id].groups), Object.keys(englishCollections.collections[id].groups), `${lang} ${id}: groups`);
      assert.equal(copy.collections[id].h1Lines.length, englishCollections.collections[id].h1Lines.length);
      assert.match(copy.collections[id].metadata.title, lang === "ar" ? /\p{Script=Arabic}/u : /\p{L}/u);
    }
    assert.deepEqual(Object.keys(copy.winter.routeNights).sort(), [...winterSlugs].sort(), `${lang}: one overnight plan per priced winter route`);
    assert.match(copy.collections.seasonal.metadata.title, /2026–(?:20)?27/u);
    assert.match(copy.winter.priceNote, /2026/u);
    assert.match(copy.winter.priceNote, /2027/u);
    for (const day of ["10", "19", "15"]) assert.match(copy.winter.priceNote, new RegExp(`\\b${day}\\b`, "u"));
    // Company: the same sections and items, the registered facts copied exactly.
    const company = getHomegroundCompanyEditionCopy(lang);
    assert.equal(company.reasons.items.length, englishCompany.reasons.items.length);
    assert.equal(company.why.values.length, englishCompany.why.values.length);
    assert.equal(company.timeline.items.length, englishCompany.timeline.items.length);
    const all = JSON.stringify(company);
    assert.equal(all.match(/盛世美达（北京）国际旅行社有限公司/gu)?.length, 2, `${lang}: registered name twice, as in English`);
    assert.equal(all.match(/L-BJ10587/gu)?.length, 3, `${lang}: licence number in the description, a reason and the timeline`);
    assert.match(company.reasons.items[5].body, /30 ?%/u);
    assert.match(company.metadata.description, /2003/u);
    company.timeline.items.forEach((item, index) => {
      assert.equal(item.date.match(/\d{4}/u)?.[0], englishCompany.timeline.items[index].date.match(/\d{4}/u)?.[0], `${lang}: timeline ${index}`);
    });
  }
});

test("the company page shows the English page's figures in every edition", () => {
  const figures = (tree) => elements(tree, (node) => node.tagName === "b").map((node) => clean(text(node)));
  const english = figures(render(React.createElement(HomegroundCompanyPage, { locale: "en" })));
  assert.equal(english.length, 4);
  for (const lang of editions) {
    assert.deepEqual(figures(render(React.createElement(HomegroundCompanyPage, { editionLocale: lang }))), english, lang);
  }
});
