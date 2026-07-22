import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("pace article gives a server-readable answer without inventing a city limit", async () => {
  const article = await source("components/ChinaItineraryTooRushedPage.tsx");

  assert.match(
    article,
    /<main id="itinerary-article-content" tabIndex=\{-1\}>/,
  );
  assert.equal(article.match(/<h1>/g)?.length, 1);
  assert.match(article, /<h1>Is Your China Itinerary Too Rushed\?<\/h1>/);
  assert.match(
    article,
    /There is no fixed city count that makes a China trip rushed/,
  );
  assert.match(
    article,
    /How many cities can you realistically visit in China\?/,
  );
  assert.match(article, /Neither style is automatically better/);
  assert.match(article, /<table className=\{styles\.paceTable\}>/);
  assert.match(article, /<th scope="col">A compact route<\/th>/);
  assert.match(article, /two “yes” answers—or one high-consequence conflict/);
  assert.match(article, /non-refundable booking/);
  assert.doesNotMatch(article, /universal city limit of|exactly [0-9]+ cities/);
});

test("illustrative example stays inside the fixed-price service boundary", async () => {
  const article = await source("components/ChinaItineraryTooRushedPage.tsx");
  const service = await source("components/ChinaItineraryReviewPage.tsx");

  for (const page of [article, service]) {
    assert.match(
      page,
      /ten travel days, four hotel bases and three\s+intercity moves/i,
    );
    assert.doesNotMatch(page, /ten nights, five hotel bases and four intercity moves/i);
  }
  assert.match(article, /Illustrative example — not a client trip/);
});

test("article separates two paid services from the automated free finder", async () => {
  const article = await source("components/ChinaItineraryTooRushedPage.tsx");

  assert.match(article, /href="\/china-itinerary-review\/#review-my-route"/);
  assert.match(article, /Review My Route — US\$69/);
  assert.match(article, /href="\/china-itinerary-review\/#build-my-route"/);
  assert.match(article, /Build My Route — US\$129/);
  assert.match(article, /Use the free Route Finder/);
  assert.match(article, /No human review is included/);
  assert.match(article, /utm_source=china-itinerary-too-rushed/);
  assert.match(article, /utm_campaign=article-to-route-finder/);
  assert.doesNotMatch(article, /free (?:human )?(?:route|itinerary) review/i);
  assert.doesNotMatch(article, /Start a free route check/);
});

test("article has visible FAQs and only Article plus BreadcrumbList schema", async () => {
  const article = await source("components/ChinaItineraryTooRushedPage.tsx");

  assert.equal((article.match(/question:/g) ?? []).length, 5);
  assert.match(article, /<details key=\{item\.question\}>/);
  assert.match(article, /<summary>\{item\.question\}<\/summary>/);
  assert.match(article, /"@type": "Article"/);
  assert.match(article, /"@type": "BreadcrumbList"/);
  assert.doesNotMatch(article, /FAQPage/);
  assert.match(article, /Homeground Editorial Team/);
  assert.match(article, /<Link href="\/studio\/">Homeground Editorial Team<\/Link>/);
  assert.match(article, /datePublished: "2026-07-22"/);
  assert.match(article, /dateModified: "2026-07-22"/);
});

test("metadata, sitemap and contextual links expose the English article", async () => {
  const route = await source(
    "app/(default)/guides/is-your-china-itinerary-too-rushed/page.tsx",
  );
  const article = await source("components/ChinaItineraryTooRushedPage.tsx");
  const sitemap = await source("app/sitemap.ts");
  const service = await source("components/ChinaItineraryReviewPage.tsx");
  const productionExport = await source("tools/prune-production-export.mjs");

  assert.match(
    route,
    /const title = "China Itinerary Too Rushed\? A Practical Check"/,
  );
  assert.match(route, /card: "summary_large_image"/);
  assert.match(route, /transfer-platform-soft-focus-1200\.webp/);
  assert.match(
    article,
    /href="\/guides\/beijing-zhangjiajie-shanghai-transport\/"/,
  );
  assert.match(article, /https:\/\/www\.12306\.cn\/en\/faq\.html\?item=1/);
  assert.match(article, /https:\/\/intl\.dpm\.org\.cn\/visit\.html/);
  assert.match(article, /https:\/\/en\.chnmuseum\.cn\/visit_692\//);
  assert.doesNotMatch(article, /\bF\d+\b/);
  assert.match(
    sitemap,
    /url: `\$\{base\}\/guides\/is-your-china-itinerary-too-rushed\/`,[\s\S]*?priority: 0\.7/,
  );
  assert.match(
    service,
    /href="\/guides\/is-your-china-itinerary-too-rushed\/"/,
  );
  assert.match(
    productionExport,
    /guides\/is-your-china-itinerary-too-rushed\/index\.html/,
  );
  assert.match(productionExport, /train-cabin-soft-focus-1200\.webp/);
  assert.match(productionExport, /airport-waiting-soft-focus-1200\.webp/);
});

test("pace article publishes only responsive WebP derivatives with provenance", async () => {
  const article = await source("components/ChinaItineraryTooRushedPage.tsx");
  const provenance = await source("docs/homeground-photo-provenance.md");
  const imageDirectory =
    "../../public/images/guides/china-itinerary-reality/";
  const imageVariants = [
    "transfer-platform-soft-focus-480.webp",
    "transfer-platform-soft-focus-768.webp",
    "transfer-platform-soft-focus-1200.webp",
    "train-cabin-soft-focus-480.webp",
    "train-cabin-soft-focus-768.webp",
    "train-cabin-soft-focus-1200.webp",
    "airport-waiting-soft-focus-480.webp",
    "airport-waiting-soft-focus-768.webp",
    "airport-waiting-soft-focus-1200.webp",
  ];

  assert.match(article, /<picture>/);
  assert.match(article, /type="image\/webp"/);
  assert.match(article, /loading="lazy"/);
  assert.match(article, /width=\{768\}/);
  assert.match(article, /height=\{512\}/);
  assert.doesNotMatch(article, /\.png/);

  for (const image of imageVariants) {
    const imageStat = await stat(
      new URL(`${imageDirectory}${image}`, import.meta.url),
    );
    assert.ok(imageStat.size > 0, `${image} must not be empty`);
  }

  assert.match(provenance, /transfer-platform-soft-focus-\*/);
  assert.match(provenance, /train-cabin-soft-focus-\*/);
  assert.match(provenance, /airport-waiting-soft-focus-\*/);
  assert.match(provenance, /R0000928\.JPG/);
  assert.match(provenance, /R0000924\.JPG/);
  assert.match(provenance, /R0001989\.JPG/);
});
