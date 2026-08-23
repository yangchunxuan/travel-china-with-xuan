import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  getSearchCollectionPath,
  searchCollections,
} from "../../lib/searchCollectionI18n.ts";

const projectRoot = new URL("../../", import.meta.url);
const source = (relativePath) =>
  readFile(new URL(relativePath, projectRoot), "utf8");
const locales = ["en", "zh", "ko"];

test("the 390px collection-hub cohort covers every approved locale route", () => {
  const routes = searchCollections.flatMap((collection) =>
    locales.map((locale) => getSearchCollectionPath(collection, locale)),
  );

  assert.equal(routes.length, searchCollections.length * locales.length);
  assert.equal(new Set(routes).size, routes.length);
  assert.equal(routes.length, 81);
  assert.ok(routes.includes("/essentials/payments-connectivity/"));
  assert.ok(routes.includes("/zh/transport/last-mile-transfers/"));
  assert.ok(routes.includes("/ko/culture/regional-food/"));
});

test("collection heroes cannot retain a min-content width at phone breakpoints", async () => {
  const css = await source("components/SearchPlatformHubPage.module.css");

  assert.match(
    css,
    /\.heroInner\s*>\s*\*\s*\{[^}]*max-width:\s*100%;[^}]*min-width:\s*0;/s,
  );
  assert.match(
    css,
    /@media \(max-width: 980px\)[\s\S]*?\.heroInner,[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\);/,
  );
});

test("390px Chinese collection titles and ledes keep readable wrap fallbacks", async () => {
  const css = await source("components/SearchPlatformHubPage.module.css");
  const phoneStart = css.indexOf("@media (max-width: 680px)");
  const phoneEnd = css.indexOf("@media (prefers-reduced-motion", phoneStart);
  const phoneRules = css.slice(phoneStart, phoneEnd);

  assert.notEqual(phoneStart, -1, "phone layout rules must exist");
  assert.notEqual(phoneEnd, -1, "phone layout rules must have a stable boundary");
  assert.match(
    phoneRules,
    /\.hero h1,\s*\.lede\s*\{[^}]*max-width:\s*100%;[^}]*overflow-wrap:\s*anywhere;/s,
  );
  assert.match(
    phoneRules,
    /\.hubPage\[data-homeground-locale="zh"\] \.hero h1\s*\{[^}]*word-break:\s*normal;/s,
  );
  assert.match(
    phoneRules,
    /\.hubPage\[data-homeground-locale="zh"\] \.hero h1\.segmentedTitle\s*\{[^}]*word-break:\s*normal;/s,
  );
  assert.doesNotMatch(phoneRules, /word-break:\s*keep-all/);
});
