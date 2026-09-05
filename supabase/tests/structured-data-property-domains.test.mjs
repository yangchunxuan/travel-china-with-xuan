import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const root = new URL("../../", import.meta.url);
const source = async (path) => ts.createSourceFile(
  path,
  await readFile(new URL(path, root), "utf8"),
  ts.ScriptTarget.Latest,
  true,
  path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
);
const descendants = (node) => {
  const result = [node];
  ts.forEachChild(node, (child) => { result.push(...descendants(child)); });
  return result;
};
const properties = (node) => new Map(node.properties
  .filter(ts.isPropertyAssignment)
  .map((property) => [property.name.text, property.initializer]));
const schemaType = (node) => properties(node).get("@type")?.text;

test("reviewedBy is attached only to WebPage, never to Article", async () => {
  // https://schema.org/reviewedBy has WebPage as its domain; Article is a sibling.
  const components = (await readdir(new URL("components/", root), { recursive: true }))
    .filter((path) => path.endsWith(".tsx"))
    .map((path) => `components/${path}`);
  for (const path of [...components, "lib/editorialIdentity.ts"]) {
    const tree = await source(path);
    for (const object of descendants(tree).filter(ts.isObjectLiteralExpression)) {
      if (!properties(object).has("reviewedBy")) continue;
      assert.equal(schemaType(object), "WebPage", `${path}: reviewedBy must describe a WebPage`);
    }
  }
});

test("homepage organization does not claim a content language; WebSite retains its languages", async () => {
  // https://schema.org/inLanguage applies to CreativeWork, not TravelAgency.
  const homepage = await source("components/HomegroundHomePage.tsx");
  const organization = descendants(homepage).find((node) =>
    ts.isVariableDeclaration(node) && node.name.getText(homepage) === "organizationSchema",
  )?.initializer;
  assert.ok(organization && ts.isObjectLiteralExpression(organization));
  assert.equal(properties(organization).has("inLanguage"), false);

  const identity = await source("lib/editorialIdentity.ts");
  const website = descendants(identity).find((node) =>
    ts.isObjectLiteralExpression(node) && schemaType(node) === "WebSite",
  );
  assert.deepEqual(properties(website).get("inLanguage").elements.map((node) => node.text), ["en", "zh-Hans", "ko"]);
});

test("reviewer stays linked to each localized canonical page through a valid WebPage value", async () => {
  const identity = await source("lib/editorialIdentity.ts");
  const nodes = descendants(identity);
  const reviewerId = nodes.find((node) => ts.isVariableDeclaration(node) && node.name.getText(identity) === "EDITORIAL_PERSON_ID");
  const pageFactory = nodes.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === "editorialReviewedPageSchema");
  assert.ok(reviewerId && pageFactory);
  const compiled = ts.transpileModule(
    `const ${reviewerId.getText(identity)};\n${pageFactory.getText(identity)}`,
    { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
  ).outputText;
  const exports = {};
  vm.runInNewContext(compiled, { exports });

  for (const path of ["/guides/example/", "/zh/guides/example/", "/ko/guides/example/"]) {
    const canonical = `https://homegroundchina.com${path}`;
    const page = JSON.parse(JSON.stringify(exports.editorialReviewedPageSchema(canonical)));
    assert.equal(page["@type"], "WebPage");
    assert.equal(page["@id"], canonical);
    assert.deepEqual(page.reviewedBy, { "@id": reviewerId.initializer.text });
    assert.equal("dateModified" in page, false, "moving the reviewer must not invent a new modification date");
  }
});
