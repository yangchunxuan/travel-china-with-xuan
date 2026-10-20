// The city pages and the destinations hub in the French, German, Spanish,
// Arabic and Japanese editions (lib/destinationEditions.ts): the routing and
// data contract (a content file is all a city page needs), the completeness
// of every translated entry, the paths and hreflang, and the links that switch
// to the local pages.
import assert from "node:assert/strict";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

// Some modules here import their neighbours without an extension, as Next resolves them.
registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith(".") && context.parentURL?.startsWith("file:")) {
      const base = path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier);
      if (!existsSync(base) || !/\.[a-z]+$/iu.test(base)) {
        for (const candidate of [`${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")]) {
          if (existsSync(candidate)) return next(pathToFileURL(candidate).href, context);
        }
      }
    }
    return next(specifier, context);
  },
});

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) => readFileSync(path.join(projectRoot, relativePath), "utf8");
const editions = ["fr", "de", "es", "ar", "ja"];
const hubEditions = ["fr", "de", "es", "ar"];
const routeGroup = { fr: "(french)", de: "(german)", es: "(spanish)", ar: "(arabic)", ja: "(japanese)" };
const marker = { fr: "(en anglais)", de: "(Englisch)", es: "(en inglés)", ar: "(بالإنجليزية)", ja: "（英語）" };

const generator = await import("../../tools/generate-destination-edition-registry.mjs");
const editionsModule = await import("../../lib/destinationEditions.ts");
const { assertDestinationEditionCityContent, destinationEditionCityShape } = await import("../../lib/destinationEditionContent.ts");
const { getDestinationEditionUi, withEditionEnglishMarker } = await import("../../lib/destinationEditionUi.ts");
const { getDestinationsHubEditionCopy } = await import("../../lib/destinationsHubEditions.ts");
const hubs = await import("../../lib/destinationHubs.ts");
const { getCityOverviewCards, getCityOpening } = await import("../../lib/cityOverview.ts");
const { projectDestinationStayExample } = await import("../../lib/destinationOverviewProjection.ts");
const { getGuideEntry, getGuideLanguagePaths } = await import("../../lib/guideRegistry.ts");
const { getDestinationsHubCopy } = await import("../../lib/destinationsHubI18n.ts");
const { getSearchPlatformCopy } = await import("../../lib/searchPlatformI18n.ts");
const { searchCollections } = await import("../../lib/searchCollectionI18n.ts");
const { getSightsEditionCopy } = await import("../../lib/sightsEditions.ts");
const { destinationEditionNavigation } = await import("../../lib/destinationEditionNavigation.ts");
const { japaneseAlternates } = await import("../../lib/japaneseSite.ts");

const englishBody = async (city) => (await import(`../../content/destinations/${city}/body.en.ts`)).default;
const editionContent = async (city, language) => (await import(`../../content/destinations/${city}/edition.${language}.ts`)).default;

/*
 * Every number the English states is stated in the translation, and the
 * translation states no number the English does not (in digits or in words).
 * Thousands may be grouped the language's way; Arabic may say one and two in
 * words (a singular, a dual).
 */
const englishWords = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, fifteen: 15, sixty: 60, first: 1, second: 2, third: 3, fourth: 4, fifth: 5, seventh: 7, century: 100, hundreds: 100, thousands: 1000 };
const digitsOf = (text) => (text.replace(/(\d)[\s  ,.](?=\d{3}\b)/gu, "$1").match(/\d+/gu) ?? []);
function assertSameNumbers(english, translated, where, language) {
  const englishNumbers = digitsOf(english);
  const translatedNumbers = digitsOf(translated);
  for (const number of englishNumbers) {
    const arabicWord = language === "ar" && ((number === "2" && /ليلتان|ليلتين|يومان|يومين|دليلا مدينتين/u.test(translated)) || (number === "1" && /واحد/u.test(translated)));
    assert.ok(translatedNumbers.includes(number) || arabicWord, `${where}: states ${number} (${translated})`);
  }
  const englishSpelled = new Set([...englishNumbers, ...(english.toLowerCase().match(/[a-z]+/gu) ?? []).flatMap((word) => (englishWords[word] ? [String(englishWords[word])] : []))]);
  for (const number of translatedNumbers) assert.ok(englishSpelled.has(number), `${where}: adds ${number} (${translated})`);
}

/** Walks an English value and its translation together: the same shape, every text filled, the same numbers. */
function assertTranslated(english, translated, where, language) {
  if (typeof english === "function") {
    assert.equal(typeof translated, "function", `${where}: a function`);
    for (const args of [[1], [3], [8]]) assertTranslated(english(...args), translated(...args), `${where}(${args})`, language);
    return;
  }
  if (typeof english === "number" || typeof english === "boolean") {
    assert.equal(translated, english, `${where}: as in English`);
    return;
  }
  if (typeof english === "string") {
    assert.equal(typeof translated, "string", `${where}: text`);
    assert.ok(translated.trim() && translated === translated.trim(), `${where}: filled, no stray spaces`);
    assertSameNumbers(english, translated, where, language);
    return;
  }
  if (Array.isArray(english)) {
    assert.ok(Array.isArray(translated) && translated.length === english.length, `${where}: ${english.length} items`);
    english.forEach((item, index) => assertTranslated(item, translated[index], `${where}[${index}]`, language));
    return;
  }
  assert.ok(translated && typeof translated === "object", `${where}: an object`);
  assert.deepEqual(Object.keys(translated).sort(), Object.keys(english).sort(), `${where}: the same fields`);
  for (const key of Object.keys(english)) assertTranslated(english[key], translated[key], `${where}.${key}`, language);
}

test("a city page in an edition language is published by its content file alone", () => {
  // The written index, loaders and routes are what the content files on disk give (npm run guide:check runs the same check).
  const { cities, files } = generator.destinationEditionOutputs(projectRoot);
  for (const [filePath, expected] of files) {
    const current = existsSync(filePath) ? readFileSync(filePath, "utf8") : null;
    assert.equal(current, expected, `${path.relative(projectRoot, filePath)} is stale: run npm run guide:generate`);
  }
  for (const language of editions) {
    assert.deepEqual([...editionsModule.destinationEditionCityIds(language)], cities[language], `${language}: the published cities are the content files`);
    for (const city of hubs.destinationHubIds) {
      assert.equal(editionsModule.hasDestinationEditionCity(language, city), existsSync(path.join(projectRoot, `content/destinations/${city}/edition.${language}.ts`)), `${language}/${city}`);
    }
  }
  // This task publishes all eight cities in French and German; Spanish, Arabic and Japanese have no city content yet.
  assert.deepEqual(cities.fr, [...hubs.destinationHubIds]);
  assert.deepEqual(cities.de, [...hubs.destinationHubIds]);
  assert.deepEqual([cities.es, cities.ar, cities.ja], [[], [], []]);
  assert.deepEqual([...editionsModule.destinationEditionCityOrder], [...hubs.destinationHubIds]);

  // In a copy of the project, adding one Spanish content file adds the Spanish route, index entry and loader; removing it takes them away.
  const sandbox = mkdtempSync(path.join(tmpdir(), "destination-editions-"));
  try {
    mkdirSync(path.join(sandbox, "lib"), { recursive: true });
    cpSync(path.join(projectRoot, "lib/destinationHubs.ts"), path.join(sandbox, "lib/destinationHubs.ts"));
    for (const city of hubs.destinationHubIds) {
      mkdirSync(path.join(sandbox, "content/destinations", city), { recursive: true });
      writeFileSync(path.join(sandbox, "content/destinations", city, "body.en.ts"), "");
    }
    const before = generator.destinationEditionOutputs(sandbox);
    assert.deepEqual(before.cities.es, []);
    assert.equal(before.files.find(([file]) => file === generator.destinationEditionRoutePath(sandbox, "es"))[1], null, "no Spanish route without content");
    writeFileSync(path.join(sandbox, "content/destinations/xian/edition.es.ts"), "");
    const after = generator.destinationEditionOutputs(sandbox);
    assert.deepEqual(after.cities.es, ["xian"]);
    const files = new Map(after.files);
    assert.match(files.get(generator.destinationEditionRoutePath(sandbox, "es")), /destinationEditionCityParams\("es"\)[\s\S]*language="es"/u);
    assert.match(files.get(path.join(sandbox, "lib/destinationEditionCities.generated.ts")), /es: \["xian"\]/u);
    assert.match(files.get(path.join(sandbox, "lib/destinationEditionLoaders.generated.ts")), /es: \{\n {4}xian: \(\) => import\("\.\.\/content\/destinations\/xian\/edition\.es"\)/u);
    assert.equal(generator.destinationEditionRoutePath(sandbox, "es"), path.join(sandbox, "app/(spanish)/es/destinations/[city]/page.tsx"));
    // A misnamed edition file is refused, not silently skipped.
    writeFileSync(path.join(sandbox, "content/destinations/xian/edition.pt.ts"), "");
    assert.throws(() => generator.destinationEditionOutputs(sandbox), /edition\.<fr\|de\|es\|ar\|ja>\.ts/u);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }

  // Each language with content has its generated route, under the edition's route group; the others have none.
  for (const language of editions) {
    const route = `app/${routeGroup[language]}/${language}/destinations/[city]/page.tsx`;
    assert.equal(existsSync(path.join(projectRoot, route)), cities[language].length > 0, route);
  }
  assert.match(source("package.json"), /"guide:generate": "node tools\/generate-guide-registry\.mjs && node tools\/generate-destination-edition-registry\.mjs"/u);
  assert.match(source("package.json"), /"guide:check": "[^"]*node tools\/generate-destination-edition-registry\.mjs --check"/u);
});

test("every French and German city entry is complete and states the English numbers, no more", async () => {
  for (const language of ["fr", "de"]) {
    for (const city of editionsModule.destinationEditionCityIds(language)) {
      const where = `${language}/${city}`;
      const body = await englishBody(city);
      const hub = hubs.getDestinationHub(city);
      const shape = destinationEditionCityShape(hub, projectDestinationStayExample(body, city), body, city);
      const content = assertDestinationEditionCityContent(await editionContent(city, language), shape, where);
      const english = hub.locales.en;
      for (const key of ["title", "h1", "description", "summary", "heroAlt", "heroCaption"]) assertTranslated(english[key], content[key], `${where}.${key}`, language);
      assertTranslated(english.geography, content.geography, `${where}.geography`, language);
      assertTranslated(getCityOverviewCards(city, "en"), content.overview, `${where}.overview`, language);
      assertTranslated(getCityOpening(city, "en"), content.opening, `${where}.opening`, language);
      // The stay example and the day-trip links, block for block (ids, types and links stay the English ones).
      assertTranslated(shape.stayExample, content.stayExample ?? [], `${where}.stayExample`, language);
      if (shape.dayTripLinks) {
        assertTranslated(
          { title: shape.dayTripLinks.title, items: shape.dayTripLinks.items.map(({ label, description }) => ({ label, description })) },
          content.dayTripLinks,
          `${where}.dayTripLinks`,
          language,
        );
      }
      const sources = Object.fromEntries(body.blocks.flatMap((block) => (block.type === "sources" ? block.items : [])).map((item) => [item.url, item]));
      for (const url of shape.sourceUrls) {
        assertTranslated({ label: sources[url].label, ...(sources[url].publisher ? { publisher: sources[url].publisher } : {}) }, content.sources[url], `${where}.sources ${url}`, language);
      }
      for (const guideId of shape.guideIds) assertTranslated(getGuideEntry(guideId, "en").navTitle, content.guides[guideId], `${where}.guides.${guideId}`, language);
      // A guide with its own page in the language is named as that page names it.
      const local = getGuideLanguagePaths("shanghai-where-to-stay-first-trip")[language];
      if (city === "shanghai" && local) {
        const edition = JSON.parse(source(`lib/reservation-guide-editions/${language}/shanghai-where-to-stay-first-trip.json`));
        assert.equal(content.guides["shanghai-where-to-stay-first-trip"], edition.navTitle, `${where}: the local guide's title`);
      }
      // The same guide keeps one title on every city page of the language.
      for (const other of editionsModule.destinationEditionCityIds(language)) {
        const otherContent = await editionContent(other, language);
        for (const [guideId, title] of Object.entries(otherContent.guides)) {
          if (content.guides[guideId]) assert.equal(content.guides[guideId], title, `${language}: ${guideId} on ${city} and ${other}`);
        }
      }
      assert.doesNotMatch(JSON.stringify(content), /[¥$₩€]\s?\d|\d+\s*(?:元|USD|CNY|EUR)/u, `${where}: no price`);
    }
  }
});

test("the city page's words are complete in all five edition languages", () => {
  const french = getDestinationEditionUi("fr");
  for (const language of editions) {
    const ui = getDestinationEditionUi(language);
    assert.deepEqual(Object.keys(ui).sort(), Object.keys(french).sort(), `${language}: the same fields`);
    for (const [key, value] of Object.entries(ui)) {
      if (typeof value === "function") assert.ok(value("Xi’an").includes("Xi’an"), `${language}.${key}: names the city or theme`);
      else if (typeof value === "string") assert.ok(value.trim(), `${language}.${key}`);
      else for (const [part, text] of Object.entries(value)) assert.ok(text.trim(), `${language}.${key}.${part}`);
    }
    assert.ok(new Intl.DateTimeFormat(ui.dateLocale).format(new Date("2026-08-22T00:00:00Z")).includes("2026"), `${language}: dates in Gregorian years with Latin digits`);
    assert.ok(withEditionEnglishMarker(language, "X").endsWith(marker[language]), `${language}: the marker ends a label`);
    // The service rows: every service, the edition's own pages.
    const services = destinationEditionNavigation[language].services;
    assert.deepEqual(Object.keys(services).sort(), ["attraction-tickets", "english-guides", "private-car", "trip-support"]);
    for (const item of Object.values(services)) assert.ok(item.href.startsWith(`/${language}/services/`) && item.label.trim() && item.description.trim(), `${language}: ${item.href}`);
    assert.equal(destinationEditionNavigation[language].destinationsHref, editionsModule.destinationsHubEditionPath[language]);
  }
  // Japanese words stay in a Japanese-only file, out of the Chinese serif font corpus.
  assert.match(source("lib/destinationEditionUi.ts"), /import \{ japaneseDestinationEditionUi \} from "\.\/japaneseDestinationEditionUi\.ts"/u);
  assert.doesNotMatch(source("lib/destinationEditionUi.ts"), /[\p{Script=Hiragana}\p{Script=Katakana}]/u);
});

test("the destinations hub's words are complete in French, German, Spanish and Arabic", async () => {
  const english = getDestinationsHubCopy("en");
  const section = getSearchPlatformCopy("en").sections.explore;
  const collections = Object.fromEntries(searchCollections.filter((item) => item.section === "explore").map((item) => [item.id, { label: item.locales.en.label, description: item.locales.en.description }]));
  for (const language of hubEditions) {
    const copy = getDestinationsHubEditionCopy(language);
    assertTranslated(
      {
        metadata: { title: section.metadataTitle },
        section: { eyebrow: section.eyebrow, title: section.title, description: section.description, scopeTitle: section.scopeTitle, scope: section.scope },
        cityEyebrow: english.cityEyebrow, cityTitle: english.cityTitle, cityIntroduction: english.cityIntroduction, cityCount: english.cityCount,
        bestForLabel: english.bestForLabel, stayLabel: english.stayLabel, routeRoleLabel: english.routeRoleLabel,
        cityComparisons: english.cityComparisons,
        cityImageAlt: Object.fromEntries(hubs.destinationHubIds.map((city) => [city, hubs.getDestinationHub(city).locales.en.heroAlt])),
        openCity: english.openCity, winterGuideLabel: english.winterGuideLabel,
        scaleEyebrow: english.scaleEyebrow, scaleTitle: english.scaleTitle, scaleIntroduction: english.scaleIntroduction, openScale: english.openScale,
        collections,
        handoffEyebrow: english.handoffEyebrow, handoffTitle: english.handoffTitle, handoffBody: english.handoffBody,
        guidesAction: english.guidesAction, toursAction: english.toursAction,
      },
      copy,
      `hub ${language}`,
      language,
    );
    assert.ok(copy.section.description.length > 50, `hub ${language}: a real meta description`);
    // Where the language has the city page, the hub's photo text is the page's own.
    for (const city of editionsModule.destinationEditionCityIds(language)) {
      assert.equal(copy.cityImageAlt[city], (await editionContent(city, language)).heroAlt, `hub ${language}: ${city} alt`);
    }
  }
});

test("paths, hreflang and the sitemap follow the content", () => {
  for (const city of hubs.destinationHubIds) {
    const languages = editionsModule.destinationCityLanguagePaths(city);
    assert.deepEqual(languages, {
      en: `/destinations/${city}/`, "zh-Hans": `/zh/destinations/${city}/`, ko: `/ko/destinations/${city}/`,
      fr: `/fr/destinations/${city}/`, de: `/de/destinations/${city}/`, "x-default": `/destinations/${city}/`,
    }, `${city}: hreflang`);
    // The English, Chinese and Korean switchers open the French and German pages, and never derive an Arabic path from the German one.
    assert.deepEqual(editionsModule.destinationCityHeaderLanguagePaths(city), {
      en: `/destinations/${city}/`, zh: `/zh/destinations/${city}/`, ko: `/ko/destinations/${city}/`,
      fr: `/fr/destinations/${city}/`, de: `/de/destinations/${city}/`, es: "/es/", ar: "/ar/",
    });
  }
  // The hub: every edition index lists its local hub, so all eight languages name each other.
  assert.deepEqual(editionsModule.destinationsHubEditionPath, { fr: "/fr/explore/", de: "/de/explore/", es: "/es/explore/", ar: "/ar/explore/", ja: "/ja/explore/" });
  assert.deepEqual(japaneseAlternates("/explore/", "/ja/explore/"), {
    en: "/explore/", "zh-Hans": "/zh/explore/", ko: "/ko/explore/", ja: "/ja/explore/",
    es: "/es/explore/", fr: "/fr/explore/", de: "/de/explore/", ar: "/ar/explore/", "x-default": "/explore/",
  });
  for (const [language, file] of [["fr", "lib/frenchEditionIndex.ts"], ["de", "lib/germanEditionIndex.ts"], ["ar", "lib/arabicEditionIndex.ts"]]) {
    assert.match(source(file), new RegExp(`'/explore/': '/${language}/explore/'`, "u"), file);
  }
  assert.match(source("lib/spanishEditionIndex.ts"), /"\/explore\/": "\/es\/explore\/"/u);
  for (const language of hubEditions) {
    const route = source(`app/${routeGroup[language]}/${language}/explore/page.tsx`);
    assert.match(route, new RegExp(`buildDestinationsHubEditionMetadata\\("${language}"\\)[\\s\\S]*<DestinationsHubPage editionLocale="${language}" />`, "u"));
  }
  // English, Chinese and Korean pages add the edition alternates and switcher targets, nothing else.
  assert.match(source("lib/searchPlatformManifest.ts"), /languages: \{ \.\.\.entry\.alternates, \.\.\.destinationCityEditionAlternates\(hubId\) \}/u);
  assert.match(source("lib/searchPlatformManifest.ts"), /if \(section === "explore"\) Object\.assign\(paths, \{ fr: destinationsHubEditionPath\.fr, de: destinationsHubEditionPath\.de, es: destinationsHubEditionPath\.es, ar: destinationsHubEditionPath\.ar \}\)/u);
  assert.match(source("components/content/DestinationHubPage.tsx"), /languagePaths=\{destinationCityHeaderLanguagePaths\(hubId\)\}/u);
  const sitemap = source("app/sitemap.ts");
  assert.match(sitemap, /destinationHubIds\.map\(destinationCityLanguagePaths\)/u);
  assert.match(sitemap, /destinationEditionLocales\.flatMap\(\(language\) => destinationEditionCityIds\(language\)\.map/u);
});

test("French and German link their own city pages and every edition its own destinations hub; nothing else in the chrome moved", () => {
  const names = { fr: getSightsEditionCopy("fr").cities, de: getSightsEditionCopy("de").cities, es: getSightsEditionCopy("es").cities, ar: getSightsEditionCopy("ar").cities };
  for (const language of ["fr", "de"]) {
    for (const link of editionsModule.destinationEditionFooterCityLinks(language, names[language])) {
      assert.equal(link.href, `/${language}/destinations/${link.id}/`, `${language} footer: ${link.id}`);
      assert.equal(link.label, names[language][link.id]);
    }
    assert.ok(editionsModule.hasAllDestinationEditionCities(language));
  }
  for (const language of ["es", "ar"]) {
    for (const link of editionsModule.destinationEditionFooterCityLinks(language, names[language])) assert.equal(link.href, `/destinations/${link.id}/`, `${language} footer stays English: ${link.id}`);
    assert.ok(!editionsModule.hasAllDestinationEditionCities(language));
  }
  const chrome = { fr: "components/FrenchChrome.tsx", de: "components/GermanChrome.tsx", es: "components/SpanishChrome.tsx", ar: "components/ArabicChrome.tsx" };
  const header = { fr: "components/FrenchHeader.tsx", de: "components/GermanHeader.tsx", es: "components/SpanishHeader.tsx", ar: "components/ArabicHeader.tsx" };
  for (const language of hubEditions) {
    const footer = source(chrome[language]);
    // The same eight city links and "all destinations" item; only their targets (and the "in English" words) follow the content.
    assert.match(footer, new RegExp(`cityLinks: ?destinationEditionFooterCityLinks\\(['"]${language}['"], ?names\\)`, "u"), `${language} footer: city links`);
    assert.match(footer, new RegExp(`destinations: ?destinationsHubEditionPath\\.${language}`, "u"), `${language} footer: hub`);
    assert.doesNotMatch(footer, /footerDestinationLinks|['"]\/explore\/['"]/u, `${language} footer: no English city list or hub left`);
    assert.doesNotMatch(footer.match(/allDestinations: ?['"]([^'"]*)['"]/u)[1], /anglais|inglés|Englisch|بالإنجليزية/u, `${language} footer: all destinations is local`);
    const file = source(header[language]);
    assert.doesNotMatch(file, /href: ?'\/explore\/'/u, `${language} header: no English hub left`);
    for (const id of ["destinations", "cities"]) {
      const entry = file.match(new RegExp(`\\b${id}:\\s*\\{\\s*label:\\s*'([^']*)',[^}]*href:\\s*destinationsHubEditionPath\\.${language}\\s*\\}`, "u"));
      assert.ok(entry, `${language} header: ${id} opens the local hub`);
      assert.doesNotMatch(entry[1], /anglais|inglés|Englisch|بالإنجليزية/u, `${language} header: ${id} label has no marker`);
    }
    // The homepage's "discover the destinations" link opens the local hub.
    assert.match(source(`components/${{ fr: "French", de: "German", es: "Spanish", ar: "Arabic" }[language]}HomePageClient.tsx`), new RegExp(`destinations: destinationsHubEditionPath\\.${language}`, "u"));
  }
  // French and German headers and footers stop saying the city guides are English; Spanish and Arabic keep saying it until their cities exist.
  assert.match(source("components/FrenchChrome.tsx"), /destinationsHeading: localCities \? "Destinations" : "Destinations · en anglais"/u);
  assert.match(source("components/GermanChrome.tsx"), /destinationsHeading: localCities \? "Reiseziele" : "Reiseziele · Englisch"/u);
  // Other edition pages: the legacy Zhangjiajie tour, the reservation guides' related cities and body links.
  for (const name of ["French", "German", "Spanish", "Arabic"]) assert.match(source(`components/${name}LegacyTours.tsx`), /href:zhangjiajieCity\.href/u);
  assert.match(source("components/ReservationGuideEditionPage.tsx"), /const local=hasDestinationEditionCity\(language,destination\.id\)/u);
  assert.match(source("lib/reservationGuideEditions.ts"), /if \(city && hasDestinationEditionCity\(language, city\)\) return \{href:destinationEditionCityPath\(language, city\)\+suffix, english:false\}/u);
});
