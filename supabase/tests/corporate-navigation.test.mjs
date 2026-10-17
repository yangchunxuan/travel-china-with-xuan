import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { getHomegroundNavigationModel } from "../../lib/homegroundNavigationModel.ts";

test("company travel is independent of the four customer services", () => {
  for (const locale of ["en", "zh", "ko"]) {
    const navigation = getHomegroundNavigationModel(locale, locale === "en" ? "/" : `/${locale}/`);
    assert.deepEqual(navigation.menus.services.entries.map((item) => item.id), [
      "attraction-tickets", "english-guides", "private-car", "trip-support",
    ]);
  }
});

test("untranslated navigation does not invent localised company-travel pages", () => {
  for (const locale of ["zh", "ko"]) {
    const navigation = getHomegroundNavigationModel(locale, `/${locale}/`);
    assert.equal(navigation.menus.services.entries.length, 4);
    assert.ok(navigation.menus.services.entries.every((item) => item.id !== "corporate-travel"));
    assert.ok(navigation.menus.services.entries.every((item) => item.href.startsWith(`/${locale}/services/`)));
  }
});

test("translated editions can reuse the English model without English-only entrances", () => {
  const navigation = getHomegroundNavigationModel("en", "/", { includeCorporateTravel: false });
  assert.equal(navigation.menus.services.entries.length, 4);
  assert.ok(navigation.menus.services.entries.every((item) => item.id !== "corporate-travel"));
});

test("French, Spanish and German header adapters opt out of English-only entrances", async () => {
  for (const language of ["French", "Spanish", "German"]) {
    const header = await readFile(new URL(`../../components/${language}Header.tsx`, import.meta.url), "utf8");
    assert.match(header, /getHomegroundNavigationModel\('en', '\/', \{ includeCorporateTravel: false \}\)/);
  }
});

test("company travel is a top-level desktop and mobile menu for every header edition", async () => {
  const header = await readFile(new URL("../../components/HomegroundHeader.tsx", import.meta.url), "utf8");
  assert.match(header, /getCorporateTravelNavigation\(currentLanguage\)/);
  assert.match(header, /item.id === "tours" \? \[item, corporateNavigation.item\]/);
  assert.match(header, /entries=\{corporateNavigation.menu.entries\}/);
  assert.doesNotMatch(header, /currentLanguage === "en" && \([\s\S]{0,420}href="\/corporate-travel\/"/);
  const japanese = await readFile(new URL("../../components/JapaneseTourChrome.tsx", import.meta.url), "utf8");
  assert.match(japanese, /getCorporateTravelNavigation\("ja"\)/);
  assert.match(japanese, /disclosure=\{\{ \.\.\.corporateNavigation.item, entries: corporateNavigation.menu.entries \}\}/);
});
