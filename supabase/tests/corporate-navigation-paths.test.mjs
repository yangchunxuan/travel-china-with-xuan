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

test("every destination uses the real English hub and its existing purpose anchors", () => {
  const hubSource = readFileSync(new URL("../../components/CorporateTravelPages.tsx", import.meta.url), "utf8");
  for (const id of purposeIds) assert.ok(hubSource.includes(`id: "${id}"`), `${id} must exist in the corporate hub`);
  assert.match(hubSource, /id=\{purpose\.id\}/);
  for (const language of languages) {
    const { item, menu } = getCorporateTravelNavigation(language);
    assert.equal(item.href, "/corporate-travel/");
    assert.equal(item.pathSegment, "corporate-travel/");
    for (const entry of menu.entries) {
      const target = new URL(entry.href, "https://homegroundchina.com");
      assert.equal(target.pathname, "/corporate-travel/", "do not invent translated corporate routes");
      assert.equal(target.hash, `#${entry.id}`);
      assert.equal(target.search, "");
      assert.equal(`/${entry.pathSegment}`, entry.href);
    }
  }
});

test("each non-English description explicitly identifies the destination as an English page", () => {
  const disclosures = { zh: "英语页面", ko: "영어 페이지", ja: "英語ページ", es: "página en inglés", fr: "page en anglais", de: "Seite auf Englisch", ar: "صفحة باللغة الإنجليزية" };
  for (const [language, disclosure] of Object.entries(disclosures)) {
    const { item, menu } = getCorporateTravelNavigation(language);
    for (const entry of [item, ...menu.entries]) assert.ok(entry.description.includes(disclosure), `${language}/${entry.id} must disclose the English destination`);
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
