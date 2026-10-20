import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { editionLanguagePaths } from "../../lib/editionLanguagePaths.ts";

const projectRoot = path.resolve(import.meta.dirname, "../..");

test("the language switch lists only languages that have the page, in the site's order", () => {
  assert.deepEqual(editionLanguagePaths({ fr: "/fr/x/", en: "/x/", ar: "/ar/x/", "x-default": "/x/" }), [
    { lang: "en", path: "/x/", label: "EN" },
    { lang: "fr", path: "/fr/x/", label: "FR" },
    { lang: "ar", path: "/ar/x/", label: "العربية" },
  ]);
  assert.deepEqual(editionLanguagePaths({}), []);
});

test("one shared header and footer choice covers all five editions", async () => {
  const chrome = await readFile(path.join(projectRoot, "components/EditionSiteChrome.tsx"), "utf8");
  for (const name of ["Japanese", "French", "Spanish", "German", "Arabic"]) {
    assert.match(chrome, new RegExp(`<${name}SiteHeader `, "u"), name);
    assert.match(chrome, new RegExp(`<${name}SiteFooter `, "u"), name);
  }
});
