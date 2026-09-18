import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { resolvePageTitle } from "../../lib/pageTitle.ts";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("resolvePageTitle keeps the template only when the complete search title fits", () => {
  const englishAtLimit = "a".repeat(41);
  const englishOverLimit = ` ${"a".repeat(42)} `;
  const cjkAtLimit = "中".repeat(20);
  const cjkOverLimit = ` ${"中".repeat(21)} `;

  assert.equal(resolvePageTitle(englishAtLimit, "en"), englishAtLimit);
  assert.deepEqual(resolvePageTitle(englishOverLimit, "en"), { absolute: "a".repeat(42) });
  assert.equal(resolvePageTitle(cjkAtLimit, "zh"), cjkAtLimit);
  assert.deepEqual(resolvePageTitle(cjkOverLimit, "zh"), { absolute: "中".repeat(21) });
  assert.equal(resolvePageTitle(cjkAtLimit, "ko"), cjkAtLimit);
});

test("bespoke guide metadata routes call resolvePageTitle in default and localized pages", async () => {
  const [defaultRoute, localizedRoute] = await Promise.all([
    source("app/(default)/guides/is-your-china-itinerary-too-rushed/page.tsx"),
    source("app/(localized)/[locale]/guides/is-your-china-itinerary-too-rushed/page.tsx"),
  ]);

  assert.match(defaultRoute, /title: resolvePageTitle\(copy\.metadata\.title, "en"\)/u);
  assert.match(localizedRoute, /title: resolvePageTitle\(copy\.metadata\.title, locale\)/u);
});
