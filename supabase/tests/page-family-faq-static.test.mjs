import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parse } from "parse5";
import ts from "typescript";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) =>
  readFile(path.join(projectRoot, relativePath), "utf8");

test("FAQ heading aliases stay unique and keep existing fragments and section labels", async () => {
  const require = createRequire(import.meta.url);
  const code = ts.transpileModule(await source("components/content/PageFamilyRenderer.tsx"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const exports = {};
  new Function("require", "exports", code)(specifier => {
    if (specifier.endsWith(".module.css")) return { __esModule: true, default: new Proxy({}, { get: (_, key) => key }) };
    if (specifier === "next/image") return () => null;
    if (specifier === "next/link") return ({ href, children }) => React.createElement("a", { href }, children);
    if (specifier.endsWith("/privateTourInquiryContext")) return { isPrivateTourInquirySlug: () => false };
    if (specifier.endsWith("/GuideCtaLink")) return { GuideCtaLink: () => null };
    return require(specifier);
  }, exports);
  const nodes = node => [node, ...(node.childNodes ?? []).flatMap(nodes)];
  const attr = (node, key) => node.attrs?.find(item => item.name === key)?.value;
  const faq = { id: "faq", type: "faq", title: "Questions about this route", items: [{ id: "question-one", question: "Can dates change?", answer: "We confirm the dates with you." }] };
  for (const authoredHeading of [false, true]) {
    const body = { schemaVersion: "1.0.0", blocks: [faq, ...(authoredHeading ? [{ id: "faq-heading", type: "heading", level: 2, text: "Questions before you book" }] : [])] };
    const rendered = nodes(parse(renderToStaticMarkup(React.createElement(exports.PageFamilyRenderer, { body }))));
    const aliases = rendered.filter(node => attr(node, "id") === "faq-heading");
    assert.equal(aliases.length, 1, `exactly one historical fragment (authored=${authoredHeading})`);
    assert.equal(aliases[0].tagName, authoredHeading ? "h2" : "span");
    const section = rendered.find(node => node.tagName === "section" && attr(node, "aria-labelledby") === "faq");
    assert.ok(section);
    const heading = rendered.filter(node => attr(node, "id") === attr(section, "aria-labelledby"));
    assert.equal(heading.length, 1);
    assert.equal(heading[0].tagName, "h2");
  }
});

test("page-family FAQ renders visible native details from the validated items", async () => {
  const renderer = await source("components/content/PageFamilyRenderer.tsx");

  assert.match(renderer, /case "faq":/u);
  assert.match(renderer, /item\.legacyIds\?\.map/u);
  assert.match(renderer, /data-faq-disclosure=\{item\.id\}/u);
  assert.match(renderer, /<details className=\{styles\.faqItem\} id=\{item\.id\}>/u);
  assert.match(renderer, /<summary>\{item\.question\}<\/summary>/u);
  assert.match(renderer, /<p>\{item\.answer\}<\/p>/u);
});

test("migrated FAQs retain both their old question and answer fragments", async () => {
  const localeFiles = ["en", "zh", "ko"];
  for (const locale of localeFiles) {
    const [guilin, yangshuo] = await Promise.all([
      source(`content/guides/guilin-airport-or-railway-station-arrival-guide/body.${locale}.ts`),
      source(`content/guides/yangshuo-town-or-yulong-river-where-to-stay/body.${locale}.ts`),
    ]);
    for (const id of [
      "faq-central-answer",
      "faq-north-answer",
      "faq-west-street-answer",
      "faq-yangshuo-answer",
      "faq-late-answer",
    ]) {
      assert.match(guilin, new RegExp(`legacyIds: \\["${id}"\\]`, "u"));
    }
    for (const id of [
      "faq-short",
      "faq-west-street",
      "faq-split",
      "faq-raft",
      "faq-xingping",
      "faq-quiet",
      "faq-family",
    ]) {
      assert.match(yangshuo, new RegExp(`legacyIds: \\["${id}"\\]`, "u"));
    }
  }
});

test("guide FAQ schema uses the same visible question and answer collection", async () => {
  const guidePage = await source("components/content/EditorialGuidePage.tsx");

  assert.match(
    guidePage,
    /block\.type === "faq" \? block\.items : \[\]/u,
  );
  assert.match(guidePage, /\.\.\.\(faqItems\.length > 0/u);
  assert.match(guidePage, /"@type": "FAQPage"/u);
  assert.match(guidePage, /name: item\.question/u);
  assert.match(
    guidePage,
    /acceptedAnswer: \{ "@type": "Answer", text: item\.answer \}/u,
  );
});

test("destination and product pages emit FAQ schema only when visible FAQ data exists", async () => {
  const [destinationPage, productPage] = await Promise.all([
    source("components/content/DestinationHubPage.tsx"),
    source("components/ShanghaiJiangnanImaginePage.tsx"),
  ]);

  assert.match(destinationPage, /\.\.\.\(faqItems\.length > 0/u);
  assert.match(destinationPage, /"@type": "FAQPage"/u);
  assert.match(productPage, /\.\.\.\(localized\.faq\?\.length/u);
  assert.match(productPage, /"@type": "FAQPage"/u);
});
