import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) =>
  readFile(path.join(projectRoot, relativePath), "utf8");

test("page-family FAQ renders visible native details from the validated items", async () => {
  const renderer = await source("components/content/PageFamilyRenderer.tsx");

  assert.match(renderer, /case "faq":/u);
  assert.match(renderer, /<details className=\{styles\.faqItem\} id=\{item\.id\}/u);
  assert.match(renderer, /<summary>\{item\.question\}<\/summary>/u);
  assert.match(renderer, /<p>\{item\.answer\}<\/p>/u);
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
