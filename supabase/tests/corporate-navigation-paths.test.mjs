import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getCorporateTravelNavigation } from "../../lib/corporateTravelNavigation.ts";

const languages = ["en", "zh", "ko", "ja", "es", "fr", "de", "ar"];
const purposeIds = ["company-trips", "incentive-travel", "meetings-retreats"];
const labels = ["For Companies", "企业旅行", "기업 여행", "企業向け旅行", "Empresas", "Entreprises", "Firmenreisen", "رحلات الشركات"];

test("all eight languages expose an independent corporate item and the three purchasing purposes", () => {
  languages.forEach((language, index) => {
    const navigation = getCorporateTravelNavigation(language);
    assert.equal(navigation.item.id, "corporate");
    assert.equal(navigation.item.label, labels[index]);
    assert.deepEqual(navigation.menu.entries.map(entry => entry.id), purposeIds);
    assert.ok(navigation.menu.toggle.trim());
    for (const entry of navigation.menu.entries) assert.ok(entry.label.trim());
  });
});

test("all eight editions open their own company pages", () => {
  const hubCopy = readFileSync(new URL("../../lib/corporateTravelHub.ts", import.meta.url), "utf8");
  for (const id of purposeIds) assert.ok(hubCopy.includes(`id: "${id}"`), `${id} must exist in the corporate hub`);
  const pages = readFileSync(new URL("../../components/CorporateTravelPages.tsx", import.meta.url), "utf8");
  assert.match(pages, /id=\{purpose\.id\}/);
  for (const language of languages) {
    const { item, menu } = getCorporateTravelNavigation(language);
    const hub = language === "en" ? "/corporate-travel/" : `/${language}/corporate-travel/`;
    assert.equal(item.href, hub);
    assert.equal(item.pathSegment, "corporate-travel/");
    for (const entry of menu.entries) {
      const target = new URL(entry.href, "https://homegroundchina.com");
      assert.equal(target.pathname, hub);
      assert.equal(target.hash, `#${entry.id}`);
      assert.equal(target.search, "");
    }
  }
});

test("translated corporate menus no longer announce an English destination", () => {
  const disclosures = { ja: "英語ページ", es: "página en inglés", fr: "page en anglais", de: "Seite auf Englisch", ar: "صفحة باللغة الإنجليزية" };
  for (const [language, disclosure] of Object.entries(disclosures)) {
    const { item, menu } = getCorporateTravelNavigation(language);
    for (const entry of [item, ...menu.entries]) assert.ok(!entry.description.includes(disclosure), `${language}/${entry.id} opens a native-language page`);
  }
  for (const language of ["zh", "ko"]) {
    const { item, menu } = getCorporateTravelNavigation(language);
    for (const entry of [item, ...menu.entries]) assert.doesNotMatch(entry.description, /英语页面|영어 페이지/u);
  }
});

test("HTML language tags resolve to the native labels while unsupported languages fall back to English", () => {
  for (const [tag, language] of [["en-GB", "en"], ["zh-Hans", "zh"], ["ko-KR", "ko"], ["ja-JP", "ja"], ["es-ES", "es"], ["fr-FR", "fr"], ["de-DE", "de"], ["ar-SA", "ar"], ["ar_AE", "ar"], [" AR ", "ar"]]) {
    assert.deepEqual(getCorporateTravelNavigation(tag), getCorporateTravelNavigation(language));
  }
  for (const language of ["", "it", "constructor", "toString"]) assert.deepEqual(getCorporateTravelNavigation(language), getCorporateTravelNavigation("en"));
});

test("a consumer cannot change another header's navigation by mutating its returned objects", () => {
  const snapshot = getCorporateTravelNavigation("ar");
  const changed = getCorporateTravelNavigation("ar");
  changed.item.label = "Changed";
  changed.menu.entries[0].href = "/changed/";
  changed.menu.entries.pop();
  assert.deepEqual(getCorporateTravelNavigation("ar"), snapshot);
});
