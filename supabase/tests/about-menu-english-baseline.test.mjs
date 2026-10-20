import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { siteLanguageTags } from "../../lib/editionLanguagePaths.ts";

const source = (path) => readFile(new URL(`../../${path}`, import.meta.url), "utf8");
const editions = { fr: "French", de: "German", es: "Spanish", ar: "Arabic" };
const href = (block, id) => new RegExp(`\\b${id}:\\s*\\{[^}]*href:\\s*'([^']+)'`, "u").exec(block)?.[1];

test("the English About item opens /company/, with mission, planning and licences under it", async () => {
  const model = await source("lib/homegroundNavigationModel.ts");
  const english = model.slice(model.indexOf("en: {"), model.indexOf("zh: {"));
  assert.match(english, /studio: \{\s*label: "About Us",[^}]*pathSegment: "company\/"/u);
  assert.match(english, /about: \{\s*company: \{[^}]*pathSegment: "company\/"[^}]*\},\s*planning: \{[^}]*pathSegment: "studio\/"[^}]*\},\s*credentials: \{[^}]*pathSegment: "business-information\/"/u);
});

for (const [lang, name] of Object.entries(editions)) {
  test(`the ${name} About item follows English`, async () => {
    const header = await source(`components/${name}Header.tsx`);
    assert.equal(href(header, "studio"), `/${lang}/company/`, "About opens the company page, as in English");
    assert.equal(href(header, "company"), `/${lang}/company/`);
    assert.equal(href(header, "planning"), `/${lang}/studio/`);
    assert.equal(href(header, "credentials"), `/${lang}/business-information/`);
    assert.match(header, new RegExp(`currentPath\\s*===\\s*'/${lang}/company/'\\s*\\?\\s*'company'`, "u"), "the company page marks About as the current page");

    const footer = await source(`components/${name}Chrome.tsx`);
    assert.match(footer, new RegExp(`currentPath\\s*===\\s*["']/${lang}/company/["']\\s*\\?\\s*["']company["']`, "u"), "the footer marks the company link as current");
    assert.match(footer, new RegExp(`company:\\s*\\{\\s*path:\\s*["']/${lang}/company/["']`, "u"));
  });
}

test("the company page counts every language the site is published in", async () => {
  assert.deepEqual(siteLanguageTags, ["en", "zh-Hans", "ko", "ja", "fr", "es", "de", "ar"]);
  const page = await source("components/HomegroundCompanyPage.tsx");
  assert.match(page, /\{ value: siteLanguageTags\.length, label: copy\.proof\.languages \}/u);
  assert.doesNotMatch(page, /homegroundLocales\.length/u);
});
