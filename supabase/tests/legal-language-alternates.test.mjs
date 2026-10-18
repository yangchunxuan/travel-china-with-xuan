import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const editions = { de: "German", ar: "Arabic" };
const languages = { en: "", "zh-Hans": "/zh", ko: "/ko", ja: "/ja", es: "/es", fr: "/fr", de: "/de", ar: "/ar" };
async function metadata(locale, page) {
  const name = editions[locale];
  const source = await readFile(new URL(`../../app/(${name.toLowerCase()})/${locale}/${page}/page.tsx`, import.meta.url), "utf8");
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  // Evaluate the route module's real metadata arguments, without rendering its legal content.
  new Function("require", "exports", code)(specifier => {
    if (specifier.endsWith(`/${name}LegalPage`)) return { [`${name}LegalPage`]: () => null };
    if (specifier.endsWith(`/${name.toLowerCase()}LegalCopy`)) return { [`get${name}LegalCopy`]: id => ({ pagePath: `/${locale}/${id}/`, metadata: { title: `${name} ${id}`, description: `${name} ${id} description` } }) };
    if (specifier.endsWith(`/${name.toLowerCase()}Site`)) return { [`build${name}Metadata`]: (title, description, canonical, alternates) => ({ title, description, canonical, alternates }) };
    return require(specifier);
  }, exports);
  return exports.metadata;
}

for (const page of ["privacy", "terms", "refund-delivery"]) test(`${page}: German and Arabic legal pages expose all eight equivalent editions reciprocally`, async () => {
  const german = await metadata("de", page), arabic = await metadata("ar", page);
  for (const [locale, current] of [["de", german], ["ar", arabic]]) {
    assert.equal(current.canonical, `/${locale}/${page}/`);
    assert.equal(current.title, `${editions[locale]} ${page}`);
    assert.equal(current.description, `${editions[locale]} ${page} description`);
    for (const [language, prefix] of Object.entries(languages)) assert.equal(current.alternates[language], `${prefix}/${page}/`);
    assert.equal(current.alternates["x-default"], `/${page}/`);
  }
  assert.equal(german.alternates.ar, arabic.canonical);
  assert.equal(arabic.alternates.de, german.canonical);
});
