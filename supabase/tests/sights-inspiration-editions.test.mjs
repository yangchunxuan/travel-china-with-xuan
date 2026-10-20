import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) => readFile(path.join(projectRoot, relativePath), "utf8");

const sightsModule = await import("../../lib/sights.ts");
const inspirationModule = await import("../../lib/travelInspiration.ts");
const { getSightsCopy } = await import("../../lib/sightsI18n.ts");
const { getSightsEditionCopy, sightsHubEditionLocales } = await import("../../lib/sightsEditions.ts");
const { getTravelInspirationCopy } = await import("../../lib/travelInspirationI18n.ts");
const { getTravelInspirationEditionCopy } = await import("../../lib/travelInspirationEditions.ts");
const { editionEnglishMarker } = await import("../../lib/editionEnglishMarker.ts");
const { destinationEditionNavigation } = await import("../../lib/destinationEditionNavigation.ts");

const editions = ["fr", "es", "de", "ar", "ja"];
const hubEditions = ["fr", "es", "de", "ar"];
const routeGroup = { fr: "french", es: "spanish", de: "german", ar: "arabic" };
const header = { fr: "components/FrenchHeader.tsx", es: "components/SpanishHeader.tsx", de: "components/GermanHeader.tsx", ar: "components/ArabicHeader.tsx" };
/** An edition's "(in English)" marker ending a label (the Arabic header wrote it without brackets). */
const englishMarkerAtEnd = /(?:\((?:en anglais|en inglés|Englisch|بالإنجليزية)\)|\sبالإنجليزية|（英語）)$/u;

/** Every leaf of `english` exists in `edition` as a non-empty string (functions are called with sample counts). */
function assertSameShape(english, edition, where) {
  if (typeof english === "function") {
    assert.equal(typeof edition, "function", `${where}: a function`);
    for (const args of [[1], [3], [8, 5, 14]]) {
      const value = edition(...args);
      assert.ok(typeof value === "string" && value.trim(), `${where}(${args}): text`);
    }
    return;
  }
  if (typeof english === "string") {
    assert.equal(typeof edition, "string", `${where}: text`);
    assert.ok(edition.trim(), `${where}: not empty`);
    assert.equal(edition, edition.trim(), `${where}: no stray spaces`);
    // Placeholders the components fill ({fee}, {count}, {total}, {city}) stay as they are.
    assert.deepEqual([...edition.matchAll(/\{\w+\}/gu)].map((m) => m[0]).sort(), [...english.matchAll(/\{\w+\}/gu)].map((m) => m[0]).sort(), `${where}: placeholders`);
    // Every number the English states (71 metres, the 118th floor, 1,700 years…) is stated too;
    // a century may be written the language's way (XXe siècle, القرن العشرين).
    const digits = (text) => text.replace(/(\d)[\s  ,.](?=\d{3}\b)/gu, "$1").replace(/\d+(?:st|nd|rd|th)-century/gu, "");
    for (const number of digits(english).match(/\d+/gu) ?? []) assert.match(digits(edition), new RegExp(`(?<!\\d)${number}(?!\\d)`, "u"), `${where}: states ${number}`);
    return;
  }
  if (Array.isArray(english)) {
    assert.ok(Array.isArray(edition) && edition.length === english.length, `${where}: ${english.length} items`);
    english.forEach((item, index) => assertSameShape(item, edition[index], `${where}[${index}]`));
    return;
  }
  assert.ok(edition && typeof edition === "object", `${where}: an object`);
  assert.deepEqual(Object.keys(edition).sort(), Object.keys(english).sort(), `${where}: the same fields`);
  for (const key of Object.keys(english)) assertSameShape(english[key], edition[key], `${where}.${key}`);
}

test("the sights words, city names and photo descriptions are complete in French, Spanish, German, Arabic and Japanese", () => {
  const english = getSightsCopy("en");
  const ownPhotos = sightsModule.sights.filter((sight) => sight.image).map((sight) => sight.id).sort();
  for (const language of editions) {
    const { cities, imageAlt, ...copy } = getSightsEditionCopy(language);
    assertSameShape(english, copy, `sights ${language}`);
    for (const city of [...sightsModule.sightCityIds, ...sightsModule.sights.map((sight) => sight.city)]) {
      assert.ok(cities[city]?.trim(), `sights ${language}: city ${city}`);
    }
    assert.deepEqual(Object.keys(imageAlt).sort(), ownPhotos, `sights ${language}: one alt text per own photo`);
    for (const id of ownPhotos) {
      assert.ok(imageAlt[id].trim(), `sights ${language}: ${id} alt`);
      // An alt text names no number the English one does not (the English spells its numbers out).
      const spelled = { two: "2", three: "3", twentieth: "20" };
      const englishAlt = sightsModule.getSight(id).image.alt.en.replace(/\b(two|three|twentieth)\b/giu, (word) => spelled[word.toLowerCase()]);
      for (const number of imageAlt[id].match(/\d+/gu) ?? []) assert.ok(englishAlt.includes(number), `sights ${language}: ${id} alt adds ${number}`);
    }
    // As in English: the fee is filled in by the formatter, never typed, and no train tickets are sold.
    const all = JSON.stringify(getSightsEditionCopy(language));
    assert.doesNotMatch(all, /[¥$₩€]\s?\d|\d+\s*(?:元|円|USD|CNY|EUR)/u, `sights ${language}: no typed price`);
    assert.doesNotMatch(all, /train ticket|billet de train|Zugticket|billete de tren|تذكرة قطار|乗車券|12306/iu, `sights ${language}: no train tickets`);
  }
  // Names follow each edition's reservation page where both name the place.
  assert.equal(getSightsEditionCopy("fr").sights["xian-city-wall"].name, "Remparts de Xi’an");
  assert.equal(getSightsEditionCopy("de").sights["humble-administrators-garden"].name, "Garten des bescheidenen Beamten");
  assert.equal(getSightsEditionCopy("ja").sights["humble-administrators-garden"].name, "拙政園");
});

test("the travel inspiration words are complete in French, Spanish, German, Arabic and Japanese", () => {
  const english = getTravelInspirationCopy("en");
  for (const language of editions) {
    const { destinations, ...copy } = getTravelInspirationEditionCopy(language);
    assert.ok(destinations.trim(), `inspiration ${language}: the Destinations step`);
    assertSameShape(english, copy, `inspiration ${language}`);
    for (const theme of inspirationModule.travelInspirationThemes) {
      for (const group of theme.tourGroups) assert.ok(copy.themes[theme.id].groups[group.id]?.title, `inspiration ${language}: ${theme.id} ${group.id}`);
    }
    const all = JSON.stringify(copy);
    assert.doesNotMatch(all, /[¥$₩€]\s?\d|\d+\s*(?:元|円|USD|CNY|EUR)/u, `inspiration ${language}: no price`);
  }
});

test("the eight hubs have their routes, canonical paths, seven-language hreflang and sitemap entries", async () => {
  assert.deepEqual([...sightsHubEditionLocales], hubEditions);
  assert.deepEqual(sightsModule.sightsEditionPath, { fr: "/fr/sights/", es: "/es/sights/", de: "/de/sights/", ar: "/ar/sights/" });
  assert.deepEqual(inspirationModule.travelInspirationEditionPath, { fr: "/fr/inspiration/", es: "/es/inspiration/", de: "/de/inspiration/", ar: "/ar/inspiration/" });
  // The Spanish edition index defines no section path of its own for these, so Spanish uses /es/sights/ and /es/inspiration/.
  const spanishIndex = await source("lib/spanishEditionIndex.ts");
  assert.doesNotMatch(spanishIndex, /\/sights\/|\/inspiration\//u);
  for (const [hub, languages] of [["sights", sightsModule.sightsHubLanguagePaths()], ["inspiration", inspirationModule.travelInspirationHubLanguagePaths()]]) {
    assert.deepEqual(languages, {
      en: `/${hub}/`, "zh-Hans": `/zh/${hub}/`, ko: `/ko/${hub}/`,
      fr: `/fr/${hub}/`, es: `/es/${hub}/`, de: `/de/${hub}/`, ar: `/ar/${hub}/`, "x-default": `/${hub}/`,
    });
  }
  for (const language of hubEditions) {
    const sightsRoute = `app/(${routeGroup[language]})/${language}/sights/page.tsx`;
    const inspirationRoute = `app/(${routeGroup[language]})/${language}/inspiration/page.tsx`;
    await access(path.join(projectRoot, sightsRoute));
    await access(path.join(projectRoot, inspirationRoute));
    assert.match(await source(sightsRoute), new RegExp(`buildSightsEditionMetadata\\("${language}"\\)[\\s\\S]*<SightsHubPage editionLocale="${language}" />`, "u"));
    assert.match(await source(inspirationRoute), new RegExp(`buildTravelInspirationEditionMetadata\\("${language}"\\)[\\s\\S]*<TravelInspirationHubPage editionLocale="${language}" />`, "u"));
  }
  // Canonical is the edition's own path; hreflang is the hub's seven languages on every hub, the English, Chinese and Korean ones included.
  const [sightsMetadata, inspirationMetadata, sitemap, postbuild] = await Promise.all([
    source("lib/sightsMetadata.ts"), source("lib/travelInspirationMetadata.ts"), source("app/sitemap.ts"), source("package.json"),
  ]);
  assert.match(sightsMetadata, /alternates: \{ canonical: sightsPath\[locale\], languages: sightsHubLanguagePaths\(\) \}/u);
  assert.match(sightsMetadata, /build\(meta\.title, meta\.description, sightsEditionPath\[language\], sightsHubLanguagePaths\(\)\)/u);
  assert.match(inspirationMetadata, /travelInspirationPath, travelInspirationHubLanguagePaths\(\)\)/u);
  assert.match(inspirationMetadata, /travelInspirationEditionPath\[language\], travelInspirationHubLanguagePaths\(\)\)/u);
  // A sight or theme page is still in three languages only.
  assert.match(sightsMetadata, /alternates: alternates\(paths, locale\)/u);
  assert.match(sitemap, /url: `\$\{base\}\$\{sightsEditionPath\[language\]\}`/u);
  assert.match(sitemap, /url: `\$\{base\}\$\{travelInspirationEditionPath\[language\]\}`/u);
  assert.match(sitemap, /destinationHubAlternatesByPath\.has\(entry\.canonicalPath\)/u);
  assert.match(postbuild, /node tools\/check-destination-edition-hubs-export\.mjs/u);
});

test("the edition headers link the local hubs, with no English marker; nothing else in their menus changed", async () => {
  for (const language of hubEditions) {
    const file = await source(header[language]);
    for (const hub of ["sights", "inspiration"]) {
      const entry = file.match(new RegExp(`\\b${hub}:\\s*\\{\\s*label:\\s*'([^']*)',\\s*description:\\s*'([^']*)',\\s*href:\\s*'([^']*)'`, "u"));
      assert.ok(entry, `${language} header: ${hub} entry`);
      assert.equal(entry[3], `/${language}/${hub}/`, `${language} header: ${hub} opens the local hub`);
      assert.doesNotMatch(entry[1], englishMarkerAtEnd, `${language} header: ${hub} is not marked English`);
    }
    // No other link to the English hubs is left in the edition's header.
    assert.doesNotMatch(file, /href:\s*'\/(?:sights|inspiration)\/'/u, `${language} header`);
    // The Destinations item opens the edition's own destinations hub (supabase/tests/destination-editions.test.mjs).
    assert.match(file, new RegExp(`destinations:\\s*\\{\\s*label:\\s*'[^']*',[^}]*href:\\s*destinationsHubEditionPath\\.${language}\\s*\\}`, "u"), `${language} header: Destinations opens the local hub`);
    // The hubs' service rows say exactly what the edition's Services menu says.
    for (const [id, item] of Object.entries(destinationEditionNavigation[language].services)) {
      const entry = file.match(new RegExp(`'${id}':\\s*\\{\\s*label:\\s*'([^']*)',\\s*description:\\s*'([^']*)',\\s*href:\\s*'([^']*)'`, "u"));
      assert.ok(entry, `${language} header: ${id}`);
      assert.deepEqual({ label: entry[1], description: entry[2], href: entry[3] }, item, `${language}: ${id} service row`);
    }
  }
});

test("on the hubs, a link to a page that stays English carries the edition's marker and hreflang; local pages do not", async () => {
  assert.deepEqual(editionEnglishMarker, { fr: "(en anglais)", es: "(en inglés)", de: "(Englisch)", ar: "(بالإنجليزية)", ja: "（英語）" });
  // The same convention supabase/tests/localized-guide-links.test.mjs holds the guide links to.
  const convention = await source("supabase/tests/localized-guide-links.test.mjs");
  for (const language of editions) assert.ok(convention.includes(editionEnglishMarker[language].replace(/[()]/gu, (c) => `\\${c}`)), `${language} marker`);
  const [sights, inspiration, parts] = await Promise.all([source("components/SightsPages.tsx"), source("components/TravelInspirationPages.tsx"), source("components/DestinationParts.tsx")]);
  // Sight cards: the English sight page, hreflang en, the marker last.
  assert.match(sights, /href=\{sightPath\(sight\.id, editionLocale \? "en" : locale\)\} hrefLang=\{editionLocale \? "en" : undefined\}/u);
  assert.match(sights, /\{editionLocale \? <small className=\{styles\.inEnglish\}>\{editionEnglishMarker\[editionLocale\]\}<\/small> : null\}\n\s*<\/span>\n\s*<\/Link>/u);
  // Theme cards and "compare cities": the English pages, hreflang en, the marker at the end of the link text.
  assert.match(inspiration, /href=\{travelInspirationThemePath\(theme\.id, editionLocale \? "en" : locale\)\} hrefLang=\{editionLocale \? "en" : undefined\}/u);
  assert.match(inspiration, /\$\{copy\.hub\.themeAction\} \$\{marker\}/u);
  // "Compare cities" opens the edition's own destinations hub, unmarked.
  assert.match(inspiration, /<Link className=\{styles\.textLink\} href=\{destinations\.href\}>\{copy\.hub\.allCities\}/u);
  // City rows: the edition's city page where it exists; otherwise the English one, hreflang en, the marker last.
  assert.match(parts, /<Link className=\{styles\.cityRow\} href=\{link\.href\} hrefLang=\{link\.english \? "en" : undefined\}>[\s\S]*?\{link\.english \? <small className=\{styles\.inEnglish\}>\{editionEnglishMarker\[editionLocale\]\}<\/small> : null\}\n\s*<\/span>\n\s*<\/Link>/u);
  // Tours and services: the edition's own pages.
  assert.match(sights, /tours: \{ href: serviceEditionPaths\(editionLocale\)\.tours \}/u);
  assert.match(inspiration, /tours: \{ href: serviceEditionPaths\(editionLocale\)\.tours \}/u);
  for (const language of hubEditions) {
    for (const item of Object.values(destinationEditionNavigation[language].services)) {
      assert.ok(item.href.startsWith(`/${language}/services/`), `${language}: ${item.href} is local`);
      assert.doesNotMatch(item.label, englishMarkerAtEnd, `${language}: ${item.label}`);
    }
    assert.equal(destinationEditionNavigation[language].destinationsHref, `/${language}/explore/`);
  }
  // The hubs take the shared edition header and footer.
  for (const page of [sights, inspiration]) {
    assert.match(page, /<EditionSiteHeader currentPath=\{path\} language=\{editionLocale\}/u);
    assert.match(page, /<EditionSiteFooter currentPath=\{path\} language=\{editionLocale\} \/>/u);
  }
});
