import assert from "node:assert/strict";
import test from "node:test";
import { completeHeaderLanguagePaths, headerLanguageEditions, isEquivalentTourLanguagePath } from "../../lib/headerLanguagePaths.ts";

const languages = ["en", "zh-Hans", "ko", "ja", "es", "fr", "de", "ar"];
const labels = ["English", "中文", "한국어", "日本語", "Español", "Français", "Deutsch", "العربية"];
const homes = ["/", "/zh/", "/ko/", "/ja/", "/es/", "/fr/", "/de/", "/ar/"];

test("tour choices transfer only to the same translated product, never edition homes or another trip", () => {
  const slug = "zhangjiajie-4-day-private-tour";
  for (const home of homes) {
    assert.equal(isEquivalentTourLanguagePath(`${home}tours/${slug}/?utm_source=language#price`, slug), true);
    assert.equal(isEquivalentTourLanguagePath(home, slug), false);
    assert.equal(isEquivalentTourLanguagePath(`${home}tours/`, slug), false);
    assert.equal(isEquivalentTourLanguagePath(`${home}tours/another-trip/`, slug), false);
  }
});

test("every header gets eight editions in the approved order and endonyms", () => {
  const result = completeHeaderLanguagePaths({ de: "/de/services/", en: "/services/" });
  assert.deepEqual(result.map(({ lang }) => lang), languages);
  assert.deepEqual(result.map(({ label }) => label), labels);
  assert.equal(new Set(result.map(({ lang }) => lang)).size, 8);
});

test("an empty translation map points each edition to its own homepage", () => {
  assert.deepEqual(completeHeaderLanguagePaths({}).map(({ path }) => path), homes);
});

test("existing page destinations retain their exact query strings and fragments", () => {
  const paths = Object.fromEntries(languages.map((lang, index) => [
    lang,
    `${homes[index]}tours/example/?travelers=4&packageId=comfort#contact`,
  ]));
  assert.deepEqual(
    completeHeaderLanguagePaths(paths).map(({ lang, path }) => [lang, path]),
    languages.map((lang) => [lang, paths[lang]]),
  );
});

test("only missing or empty destinations fall back to edition homepages", () => {
  const result = completeHeaderLanguagePaths({ en: "/corporate-travel/", ja: "", fr: "/fr/services/#contact" });
  assert.deepEqual(result.map(({ path }) => path), [
    "/corporate-travel/", "/zh/", "/ko/", "/ja/", "/es/", "/fr/services/#contact", "/de/", "/ar/",
  ]);
});

test("the zh alias supplies Chinese while an explicit zh-Hans destination takes precedence", () => {
  assert.equal(completeHeaderLanguagePaths({ zh: "/zh/guides/" })[1].path, "/zh/guides/");
  assert.equal(completeHeaderLanguagePaths({ zh: "/zh/old/", "zh-Hans": "/zh/exact/" })[1].path, "/zh/exact/");
  assert.equal(completeHeaderLanguagePaths({ zh: "/zh/guides/", "zh-Hans": "" })[1].path, "/zh/guides/");
});

test("completing UI links neither mutates source alternates nor shares output records", () => {
  const paths = Object.freeze({ en: "/guides/example/", zh: "/zh/guides/example/" });
  const snapshot = { ...paths };
  const editionSnapshot = headerLanguageEditions.map((edition) => ({ ...edition }));
  const first = completeHeaderLanguagePaths(paths);
  first[0].path = "/changed/";
  first[1].label = "Changed";
  assert.deepEqual(paths, snapshot);
  assert.deepEqual(headerLanguageEditions, editionSnapshot);
  assert.equal(completeHeaderLanguagePaths(paths)[0].path, paths.en);
  assert.equal(completeHeaderLanguagePaths(paths)[1].label, "中文");
  assert.deepEqual(Object.keys(paths), ["en", "zh"], "homepage fallbacks must not enter source metadata maps");
});
