import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { arabicSitePagePathByEnglishPath } from "../../lib/arabicEditionIndex.ts";
import {
  EDITORIAL_AUTHOR_EDITION_PATHS,
  ENGLISH_AUTHOR_PATH,
  editionAuthorComponentStrings,
  editionAuthorLanguages,
  editionAuthorProfileCopy,
} from "../../lib/editionAuthorCopy.ts";
import { frenchSitePagePathByEnglishPath } from "../../lib/frenchEditionIndex.ts";
import { germanSitePagePathByEnglishPath } from "../../lib/germanEditionIndex.ts";
import { homegroundBusiness } from "../../lib/homegroundBusiness.ts";
import { spanishSitePagePathByEnglishPath } from "../../lib/spanishEditionIndex.ts";

const require = createRequire(import.meta.url);
const source = (path) => readFile(new URL(`../../${path}`, import.meta.url), "utf8");

/** Runs a TypeScript module with only the listed dependencies (the site's imports omit extensions). */
async function load(path, dependencies = {}) {
  const code = ts.transpileModule(await source(path), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    process,
    require(id) {
      if (id === "react/jsx-runtime") return require(id);
      assert.ok(id in dependencies, `Unexpected dependency ${id} in ${path}`);
      return dependencies[id];
    },
  }, { filename: path });
  return module.exports;
}

const evanImage = { src: "/images/studio/evan-bookshop.jpg", width: 1200, height: 1600, smallSrc: "/images/studio/evan-bookshop-small.jpg", smallWidth: 750, smallHeight: 1000, alt: "Evan reading in a bookshop", position: "50% 46%" };
const englishStudio = { members: [{ id: "evan", name: "Evan", role: "Lead & Cross-cultural Trip Planner", bio: "English bio", tags: ["English"], image: evanImage }] };
const studioI18n = { getHomegroundStudioCopy: () => englishStudio };
const identity = await load("lib/editorialIdentity.ts", {
  "./homegroundStudioI18n": studioI18n,
  "./homegroundI18n": { HOMEGROUND_BRAND_NAME: "Homeground China", HOMEGROUND_BRAND_SLOGAN: "" },
  "./homegroundSocial": { getHomegroundSocialProfileUrls: () => [] },
  "./homegroundBusiness": { homegroundBusiness },
  "./editionAuthorCopy": { EDITORIAL_AUTHOR_EDITION_PATHS },
});
const japaneseSite = await load("lib/japaneseSite.ts", {
  "./arabicEditionIndex": { arabicSitePagePathByEnglishPath },
  "./homegroundBusiness": { homegroundBusiness },
  "./germanEditionIndex": { germanSitePagePathByEnglishPath },
  "./frenchEditionIndex": { frenchSitePagePathByEnglishPath },
  "./spanishEditionIndex": { spanishSitePagePathByEnglishPath },
});
// The edition studio copies are loaded for real: role, bio and photo text must come from them.
const studioCopies = Object.fromEntries(await Promise.all([
  ["fr", "lib/frenchStudioCopy.ts", "./frenchSite", "frenchGuideLanguageNote"],
  ["de", "lib/germanStudioCopy.ts", "./germanSite", "germanGuideLanguageNote"],
  ["es", "lib/spanishStudioCopy.ts", "./spanishSite", "spanishGuideLanguageNote"],
  ["ar", "lib/arabicStudioCopy.ts", "./arabicSite", "arabicGuideLanguageNote"],
].map(async ([language, path, site, note]) => [language, await load(path, { "./homegroundStudioI18n": studioI18n, [site]: { [note]: "" } })])));
const editionAuthor = await load("lib/editionAuthor.ts", {
  "./arabicStudioCopy": studioCopies.ar,
  "./editionAuthorCopy": { EDITORIAL_AUTHOR_EDITION_PATHS, ENGLISH_AUTHOR_PATH, editionAuthorComponentStrings, editionAuthorProfileCopy },
  "./editorialIdentity": identity,
  "./frenchStudioCopy": studioCopies.fr,
  "./germanStudioCopy": studioCopies.de,
  "./spanishStudioCopy": studioCopies.es,
});

const allLanguages = {
  en: "/studio/evan/",
  "zh-Hans": "/zh/studio/evan/",
  ko: "/ko/studio/evan/",
  ja: "/ja/studio/evan/",
  fr: "/fr/studio/evan/",
  es: "/es/studio/evan/",
  de: "/de/studio/evan/",
  ar: "/ar/studio/evan/",
};
const allAlternates = { ...allLanguages, "x-default": "/studio/evan/" };
const routes = {
  fr: "app/(french)/fr/studio/evan/page.tsx",
  de: "app/(german)/de/studio/evan/page.tsx",
  es: "app/(spanish)/es/studio/evan/page.tsx",
  ar: "app/(arabic)/ar/studio/evan/page.tsx",
};
const englishMarker = { fr: /\(en anglais\)$/u, es: /\(en inglés\)$/u, de: /\(Englisch\)$/u, ar: /\(بالإنجليزية\)$/u };
const normal = (value) => JSON.parse(JSON.stringify(value));

test("the four edition author pages exist with their canonical, eight-language hreflang and the shared Person", async () => {
  assert.deepEqual([...editionAuthorLanguages].sort(), ["ar", "de", "es", "fr"]);
  for (const language of editionAuthorLanguages) {
    const route = await source(routes[language]);
    assert.match(route, new RegExp(`export const metadata: Metadata = editionAuthorMetadata\\("${language}"\\);`, "u"), language);
    assert.match(route, new RegExp(`<EditionAuthorPage language="${language}" />`, "u"), language);

    const metadata = normal(editionAuthor.editionAuthorMetadata(language));
    assert.equal(metadata.alternates.canonical, `/${language}/studio/evan/`, language);
    assert.deepEqual(metadata.alternates.languages, allAlternates, `${language} hreflang`);
    assert.equal(Object.keys(metadata.alternates.languages).length, 9, `${language}: eight languages and x-default`);
    assert.equal(metadata.title.absolute, editionAuthorProfileCopy[language].title);
    assert.match(metadata.title.absolute, /\| Homeground China$/u);
    assert.equal(metadata.description, editionAuthorProfileCopy[language].introduction);
    assert.ok(metadata.description.length > 50, `${language} description`);
    assert.deepEqual(metadata.robots, { index: true, follow: true });
    assert.equal(metadata.openGraph.type, "profile");
    assert.equal(metadata.openGraph.url, `/${language}/studio/evan/`);
    assert.equal(metadata.openGraph.images[0].url, `https://homegroundchina.com${evanImage.src}`);

    const author = editionAuthor.getEditionEditorialAuthor(language);
    const member = studioCopies[language][Object.keys(studioCopies[language]).find((key) => key.endsWith("StudioCopy"))].members.find((candidate) => candidate.id === "evan");
    assert.equal(author.name, "Evan");
    assert.equal(author.path, `/${language}/studio/evan/`);
    assert.equal(author.role, member.role, `${language}: role from the edition studio page`);
    assert.equal(author.bio, member.bio, `${language}: bio from the edition studio page`);
    assert.equal(author.image.src, evanImage.src);
    assert.notEqual(author.image.alt, evanImage.alt, `${language}: translated photo description`);
  }

  // One Person for every language version, as on the English, Chinese, Korean and Japanese pages.
  assert.equal(identity.EDITORIAL_PERSON_ID, "https://homegroundchina.com/studio/evan/#person");
  assert.equal(identity.editorialPersonSchema("en")["@id"], identity.EDITORIAL_PERSON_ID);
  const page = await source("components/EditionAuthorPage.tsx");
  assert.match(page, /editorialPersonSchema\("en"\)/u);
  assert.match(page, /"@type": "ProfilePage"[\s\S]*?mainEntity: \{ "@id": EDITORIAL_PERSON_ID \}/u);
  assert.match(page, /dir=\{strings\.dir\}/u);
  assert.equal(editionAuthorComponentStrings.ar.dir, "rtl");
  for (const language of ["fr", "de", "es"]) assert.equal(editionAuthorComponentStrings[language].dir, "ltr");
  for (const language of editionAuthorLanguages) assert.equal(editionAuthorComponentStrings[language].htmlLang, language);
});

test("all eight language versions of Evan's page list each other", async () => {
  assert.deepEqual(normal(identity.getEditorialAuthorLanguagePaths()), allLanguages);
  // The Japanese page's hreflang comes from the edition indexes.
  assert.deepEqual(normal(japaneseSite.japaneseAlternates("/studio/evan/", "/ja/studio/evan/")), allAlternates);
  for (const [language, index] of Object.entries({ fr: frenchSitePagePathByEnglishPath, de: germanSitePagePathByEnglishPath, es: spanishSitePagePathByEnglishPath, ar: arabicSitePagePathByEnglishPath })) {
    assert.equal(index["/studio/evan/"], `/${language}/studio/evan/`, `${language} edition index`);
  }
  // English, Chinese and Korean spread the full list; Japanese uses japaneseAlternates above.
  for (const path of ["app/(default)/studio/evan/page.tsx", "app/(localized)/[locale]/studio/evan/page.tsx"]) {
    assert.match(await source(path), /languages: \{ \.\.\.getEditorialAuthorLanguagePaths\(\),[^}]*"x-default"/u, path);
  }
  assert.match(await source("app/(japanese)/ja/studio/evan/page.tsx"), /languages: japaneseAlternates\("\/studio\/evan\/", author\.path\)/u);
  assert.match(await source("components/EditorialAuthorPage.tsx"), /languagePaths=\{getEditorialAuthorLanguagePaths\(\)\}/u);
  assert.match(await source("components/EditionAuthorPage.tsx"), /Object\.entries\(getEditorialAuthorLanguagePaths\(\)\)/u);
  for (const language of editionAuthorLanguages) {
    await access(new URL(`../../${routes[language]}`, import.meta.url));
  }
});

test("French, German, Spanish and Arabic bylines link Evan's page in their own language", async () => {
  const reservationGuide = await source("components/ReservationGuideEditionPage.tsx");
  assert.match(reservationGuide, /const authorPath=getEditorialAuthorLanguagePaths\(\)\[language\];/u);
  assert.match(reservationGuide, /\{copy\.author\} <Link href=\{authorPath\} hrefLang=\{language\}>\{author\.name\}<\/Link>/u);
  assert.doesNotMatch(reservationGuide, /href=\{author\.path\}/u);
  const spanishGuide = await source("components/SpanishGuidePage.tsx");
  assert.match(spanishGuide, /Por <Link href=\{getEditorialAuthorLanguagePaths\(\)\.es\} hrefLang="es">\{author\.name\}<\/Link>/u);
  assert.doesNotMatch(spanishGuide, /href=\{author\.path\}/u);
  for (const language of [...editionAuthorLanguages, "ja"]) {
    assert.equal(identity.getEditorialAuthorLanguagePaths()[language], `/${language}/studio/evan/`, language);
  }
  // No French, German, Spanish or Arabic component links the English profile as Evan's byline.
  for (const path of ["FrenchChrome", "GermanChrome", "SpanishChrome", "ArabicChrome", "FrenchStudioPage", "GermanStudioPage", "SpanishStudioPage", "ArabicStudioPage", "SpanishGuidePage", "ReservationGuideEditionPage"]) {
    assert.doesNotMatch(await source(`components/${path}.tsx`), /["'`]\/studio\/evan\//u, path);
  }
});

test("links on the edition author pages stay in the edition, and the English profile is marked", async () => {
  const page = await source("components/EditionAuthorPage.tsx");
  assert.match(page, /path: reservationGuideEditionPath\(language, slug\)/u);
  assert.match(page, /<Link href=\{strings\.studioHref\}>/u);
  assert.match(page, /<a href=\{ENGLISH_AUTHOR_PATH\} hrefLang="en">\{strings\.englishProfileLabel\}<\/a>/u);
  assert.equal(ENGLISH_AUTHOR_PATH, "/studio/evan/");
  for (const language of editionAuthorLanguages) {
    const strings = editionAuthorComponentStrings[language];
    assert.equal(strings.studioHref, `/${language}/studio/`);
    assert.match(strings.englishProfileLabel, englishMarker[language], language);
    assert.doesNotMatch(editionAuthorProfileCopy[language].studioLink, englishMarker[language], language);
  }
});

test("each translation keeps the English profile's structure and adds no facts", () => {
  for (const language of editionAuthorLanguages) {
    const copy = editionAuthorProfileCopy[language];
    assert.deepEqual(Object.keys(copy).sort(), ["articlesTitle", "eyebrow", "focus", "focusTitle", "h1", "introduction", "method", "methodTitle", "studioLink", "title"]);
    assert.equal(copy.h1, "Evan");
    assert.equal(copy.method.length, 3, language);
    assert.equal(copy.focus.length, 4, language);
    const { openGraphLocale, studioHref, ...strings } = editionAuthorComponentStrings[language];
    const text = [...Object.values(copy), ...Object.values(strings)].flat().join("\n");
    // The English profile states no numbers, dates, licences or contact details; neither may a translation.
    assert.doesNotMatch(text, /\d|@|https?:|licen|Lizenz|ترخيص|WhatsApp/iu, language);
    assert.match(copy.introduction, /Evan/u);
    assert.match(copy.methodTitle, /Evan/u);
  }
});
