import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import {
  entryRequirementsAlternates,
  entryRequirementsEditionLocales,
  entryRequirementsEditionPath,
  entryRequirementsEnglishPath,
} from "../../lib/entryRequirementsEditionPaths.ts";
import { entryRequirementsEditionCopy, entryRequirementsEditionMetadata } from "../../lib/entryRequirementsEditions.ts";
import { entryRequirementsGuideIds } from "../../lib/entryRequirementsEditionTypes.ts";
import { getGuideEntry, getGuidesByPillar } from "../../lib/guideRegistry.ts";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "../..");
const source = (relative) => readFileSync(path.join(root, relative), "utf8");
const plain = (value) => JSON.parse(JSON.stringify(value));

const expectedPaths = {
  fr: "/fr/guides/china-entry-requirements/",
  de: "/de/guides/china-entry-requirements/",
  es: "/es/guias/china-entry-requirements/",
  ar: "/ar/guides/china-entry-requirements/",
  ja: "/ja/guides/china-entry-requirements/",
};
const routeFolders = { fr: "app/(french)", de: "app/(german)", es: "app/(spanish)", ar: "app/(arabic)", ja: "app/(japanese)" };
const expectedAlternates = {
  en: "/guides/china-entry-requirements/",
  ja: expectedPaths.ja,
  fr: expectedPaths.fr,
  es: expectedPaths.es,
  de: expectedPaths.de,
  ar: expectedPaths.ar,
  "x-default": "/guides/china-entry-requirements/",
};
/** How each edition tells the reader a link opens an English page (as in localized-guide-links). */
const englishMarker = { fr: /\(en anglais\)$/u, es: /\(en inglés\)$/u, de: /\(Englisch\)$/u, ar: /\(بالإنجليزية\)$/u, ja: /（英語）$/u };
const anyEnglishMarker = /anglais|inglés|Englisch|الإنجليزية|英語/u;

/** Transpiles a route or module so its exported metadata can be read; page components are stubbed. */
function loader(stubs = {}) {
  const cache = new Map();
  const load = (relative) => {
    const absolute = path.resolve(root, relative);
    const key = path.relative(root, absolute).replaceAll("\\", "/");
    if (key in stubs) return stubs[key];
    if (cache.has(absolute)) return cache.get(absolute).exports;
    if (absolute.endsWith(".json")) return JSON.parse(readFileSync(absolute, "utf8"));
    const module = { exports: {} };
    cache.set(absolute, module);
    const code = ts.transpileModule(readFileSync(absolute, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText;
    vm.runInNewContext(code, {
      module, exports: module.exports, process, URL,
      require(id) {
        if (!id.startsWith(".")) return require(id);
        const base = path.resolve(path.dirname(absolute), id);
        const resolved = [base, `${base}.ts`, `${base}.tsx`, `${base}.json`].find((candidate) => existsSync(candidate) && !candidate.endsWith("/"));
        assert.ok(resolved, `Cannot resolve ${id} from ${key}`);
        return load(resolved);
      },
    }, { filename: key });
    return module.exports;
  };
  return load;
}

function numbers(text) {
  return [...new Set(text.match(/\d+/gu) ?? [])].sort();
}

/** Every duration, year and day number in the English text appears in the translation (dates may add a month number). */
function assertSameFacts(translated, english, message) {
  const present = new Set(numbers(translated));
  for (const value of numbers(english)) assert.ok(present.has(value), `${message}: ${value} is missing`);
}

test("the five localized entry hubs have their own canonical URL and reciprocal hreflang", () => {
  assert.deepEqual([...entryRequirementsEditionLocales].sort(), Object.keys(expectedPaths).sort());
  assert.deepEqual(entryRequirementsAlternates(), expectedAlternates);
  // Chinese and Korean have no entry hub, so they are not alternates.
  assert.equal(existsSync(path.join(root, "app/(localized)/[locale]/guides/china-entry-requirements")), false);

  const stubs = { "components/ChinaEntryGuidesEditionPage.tsx": { ChinaEntryGuidesEditionPage: function ChinaEntryGuidesEditionPage() { return null; } } };
  const load = loader(stubs);
  for (const language of entryRequirementsEditionLocales) {
    const pagePath = expectedPaths[language];
    assert.equal(entryRequirementsEditionPath(language), pagePath, language);
    const routeFile = `${routeFolders[language]}${pagePath.replace(/\/$/u, "")}/page.tsx`;
    assert.ok(existsSync(path.join(root, routeFile)), `${routeFile} exists`);

    const route = load(routeFile);
    assert.equal(route.dynamic, "force-static", language);
    const metadata = plain(route.metadata);
    assert.deepEqual(metadata, plain(entryRequirementsEditionMetadata(language)), `${language}: route metadata`);
    assert.equal(metadata.alternates.canonical, pagePath, `${language}: canonical`);
    assert.deepEqual(metadata.alternates.languages, expectedAlternates, `${language}: hreflang`);
    assert.equal(metadata.openGraph.url, `https://homegroundchina.com${pagePath}`);
    assert.equal(metadata.openGraph.locale, entryRequirementsEditionCopy[language].openGraphLocale);
    assert.equal(metadata.robots.index, true);
    assert.match(metadata.title.absolute, / \| Homeground China$/u);
    const element = route.default();
    assert.equal(element.type, stubs["components/ChinaEntryGuidesEditionPage.tsx"].ChinaEntryGuidesEditionPage);
    assert.deepEqual(plain(element.props), { language });
  }
});

test("the English entry hub lists all five translations as alternates and in its language menu", () => {
  const load = loader({ "components/ChinaEntryGuidesPage.tsx": { ChinaEntryGuidesPage: () => null } });
  const route = load("app/(default)/guides/china-entry-requirements/page.tsx");
  assert.equal(route.metadata.alternates.canonical, entryRequirementsEnglishPath);
  assert.deepEqual(plain(route.metadata.alternates.languages), expectedAlternates);
  // English title and description are unchanged.
  assert.equal(route.metadata.description, "Current China entry rules by passport, purpose and route, including 2026 UK visa-free entry, US visa guidance and a 240-hour transit route check.");

  const page = source("components/ChinaEntryGuidesPage.tsx");
  for (const language of entryRequirementsEditionLocales) {
    assert.match(page, new RegExp(`${language}: entryRequirementsEditionPath\\("${language}"\\)`, "u"), `${language} language-menu target`);
  }

  const sitemap = source("app/sitemap.ts");
  assert.match(sitemap, /entry\.canonicalPath === entryRequirementsEnglishPath \? absoluteJaPilotAlternates\(entryRequirementsAlternates\(\)\)/u);
  assert.match(sitemap, /entryRequirementsEditionLocales\.map\(language => \(\{url: `\$\{base\}\$\{entryRequirementsEditionPath\(language\)\}`/u);
  assert.match(sitemap, /\.\.\.entryRequirementsEditionEntries/u);
});

test("each translation keeps the English sections, guide list and facts", () => {
  const englishGuides = getGuidesByPillar("entry-rules", "en");
  assert.deepEqual(englishGuides.map((guide) => guide.id).sort(), [...entryRequirementsGuideIds].sort());
  const englishDescription = "Current China entry rules by passport, purpose and route, including 2026 UK visa-free entry, US visa guidance and a 240-hour transit route check.";

  for (const language of entryRequirementsEditionLocales) {
    const copy = entryRequirementsEditionCopy[language];
    assertSameFacts(copy.metadata.description, englishDescription, `${language}: description facts`);
    assert.equal(copy.checks.items.length, 3, language);
    assert.deepEqual(copy.ruleTypes.items.map((item) => item.marker), ["A", "B"], language);
    assert.match(copy.ruleTypes.items[1].body, /240/u, `${language}: 240-hour route check`);
    assert.equal(copy.protocol.items.length, 4, language);
    assert.match(copy.collection.checked, /\{date\}/u, language);
    assert.match(copy.collection.readEnglishGuide, englishMarker[language], `${language}: cards open English guides`);
    for (const value of [copy.hero.title, copy.hero.lead, copy.hero.boundary, copy.cta.title, copy.cta.body, copy.cta.action]) {
      assert.ok(value.trim(), language);
      assert.doesNotMatch(value, anyEnglishMarker, `${language}: only links to English pages carry the marker`);
    }

    assert.deepEqual(Object.keys(copy.guides).sort(), [...entryRequirementsGuideIds].sort(), `${language}: one card per English guide`);
    for (const guide of englishGuides) {
      const card = copy.guides[guide.id];
      const english = getGuideEntry(guide.id, "en");
      for (const field of ["label", "headline", "description", "imageAlt"]) assert.ok(card[field]?.trim(), `${language}/${guide.id}/${field}`);
      assert.notEqual(card.headline, english.headline, `${language}/${guide.id}: translated headline`);
      // Durations, years and dates stay exactly as in English.
      assertSameFacts(`${card.headline} ${card.description}`, `${english.headline} ${english.description}`, `${language}/${guide.id}: facts`);
      assertSameFacts(card.imageAlt, english.heroAlt, `${language}/${guide.id}: image facts`);
    }
  }
});

test("edition links to the entry hub open the local page without an English marker", () => {
  const footer = source("components/HomegroundFooter.tsx");
  assert.match(footer, /const entryRequirementsPath = edition\?\.paths\.entry \?\? "\/guides\/china-entry-requirements\/";/u);

  const chrome = { fr: "components/FrenchChrome.tsx", de: "components/GermanChrome.tsx", es: "components/SpanishChrome.tsx", ar: "components/ArabicChrome.tsx" };
  for (const [language, file] of Object.entries(chrome)) {
    const text = source(file);
    assert.match(text, new RegExp(`entry: ?["']${expectedPaths[language].replaceAll("/", "\\/")}["']`, "u"), `${file}: footer entry path`);
    const visa = /visa: ?(["'])(.*?)\1/u.exec(text)?.[2];
    assert.ok(visa, `${file}: entry label`);
    assert.doesNotMatch(visa, anyEnglishMarker, `${file}: entry label no longer says English`);
  }

  const hubs = { fr: ["components/FrenchGuidesPage.tsx", "lib/frenchGuidesHubCopy.ts"], de: ["components/GermanGuidesPage.tsx", "lib/germanGuidesHubCopy.ts"], ar: ["components/ArabicGuidesPage.tsx", "lib/arabicGuidesHubCopy.ts"] };
  for (const [language, [page, copyFile]] of Object.entries(hubs)) {
    assert.match(source(page), new RegExp(`entryHref: '${expectedPaths[language].replaceAll("/", "\\/")}'`, "u"), `${page}: entryHref`);
    const action = /entrySection: ?\{[\s\S]*?action: ?'([^']*)'/u.exec(source(copyFile))?.[1];
    assert.ok(action, copyFile);
    assert.doesNotMatch(action, anyEnglishMarker, `${copyFile}: entry action`);
  }

  const toursHubs = { fr: "components/FrenchToursHubPage.tsx", de: "components/GermanToursHubPage.tsx", ar: "components/ArabicToursHubPage.tsx", ja: "lib/japaneseToursHubEdition.ts" };
  for (const [language, file] of Object.entries(toursHubs)) {
    const link = new RegExp(`href: ?["']${expectedPaths[language].replaceAll("/", "\\/")}["'], ?label: ?["']([^"']+)["']`, "u").exec(source(file));
    assert.ok(link, `${file}: arrival link opens the local hub`);
    assert.doesNotMatch(link[1], anyEnglishMarker, `${file}: arrival label`);
  }

  // Guide translations link the entry hub from their body; the link resolves to the local hub.
  const load = loader({
    "lib/guideRegistry.ts": { getGuideEntry: () => null, getGuideLanguagePaths: () => ({}) },
    "lib/privateTourProducts.ts": { privateTourProducts: [] },
  });
  const { getReservationGuideEdition } = load("lib/reservationGuideEditions.ts");
  for (const language of entryRequirementsEditionLocales) {
    const guide = getReservationGuideEdition(language, "food-plants-and-animal-products-into-china");
    const items = guide.body.blocks.flatMap((block) => block.type === "internal-links" ? block.items : []);
    assert.ok(!items.some((item) => item.href === entryRequirementsEnglishPath), `${language}: no English entry link left`);
    const local = items.find((item) => item.href === expectedPaths[language]);
    assert.ok(local, `${language}: body link opens the local hub`);
    assert.doesNotMatch(local.label, anyEnglishMarker, `${language}: body link label`);
  }

  // No edition source still sends readers to the English hub.
  const editionSource = /^(?:components\/(?:French|German|Spanish|Arabic|Japanese)[^/]*\.tsx|lib\/(?:french|german|spanish|arabic|japanese)[^/]*\.ts|lib\/[^/]+\.(?:fr|de|es|ar|ja)\.ts|lib\/(?:spanish-guides|spanish-tours|arabic-tours)\/.+\.ts|app\/\((?:french|german|spanish|arabic|japanese)\)\/.+\.tsx?)$/u;
  const walk = (directory) => readdirSync(path.join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const relative = `${directory}/${entry.name}`;
    return entry.isDirectory() ? walk(relative) : [relative];
  });
  const files = ["components", "lib", "app"].flatMap(walk).filter((file) => editionSource.test(file));
  assert.ok(files.length > 100, `scanned ${files.length} edition files`);
  for (const file of files) {
    assert.doesNotMatch(source(file), /["'`]\/guides\/china-entry-requirements\//u, `${file} still links the English entry hub`);
  }
});
