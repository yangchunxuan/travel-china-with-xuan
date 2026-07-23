import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("pace article gives a server-readable answer without inventing a city limit", async () => {
  const article = await source("components/ChinaItineraryTooRushedPage.tsx");
  const copy = await source("lib/chinaItineraryTooRushedI18n.ts");

  assert.match(
    article,
    /<main id="itinerary-article-content" tabIndex=\{-1\}>/,
  );
  assert.equal(article.match(/<h1>/g)?.length, 1);
  assert.match(article, /<h1>\{copy\.metadata\.headline\}<\/h1>/);
  assert.match(
    copy,
    /There is no fixed city count that makes a China trip rushed/,
  );
  assert.match(
    copy,
    /How many cities can you realistically visit in China\?/,
  );
  assert.match(copy, /Neither style is automatically better/);
  assert.match(article, /<table className=\{styles\.paceTable\}>/);
  assert.match(article, /<th scope="col">\{copy\.pace\.compactHeading\}<\/th>/);
  assert.match(copy, /two “yes” answers—or one high-consequence conflict/);
  assert.match(copy, /non-refundable booking/);
  assert.doesNotMatch(copy, /universal city limit of|exactly [0-9]+ cities/);
});

test("illustrative example stays inside the fixed-price service boundary", async () => {
  const article = await source("components/ChinaItineraryTooRushedPage.tsx");
  const copy = await source("lib/chinaItineraryTooRushedI18n.ts");
  const service = await source("lib/chinaItineraryReviewI18n.ts");

  for (const page of [copy, service]) {
    assert.match(
      page,
      /ten travel days, four hotel bases and three\s+intercity moves/i,
    );
    assert.doesNotMatch(page, /ten nights, five hotel bases and four intercity moves/i);
  }
  assert.match(copy, /Illustrative example — not a client trip/);
  assert.match(article, /copy\.workedExample\.options\.map/);
});

test("article separates two paid services from the automated free finder", async () => {
  const article = await source("components/ChinaItineraryTooRushedPage.tsx");
  const copy = await source("lib/chinaItineraryTooRushedI18n.ts");

  assert.match(article, /href=\{`\$\{copy\.servicePath\}#review-my-route`\}/);
  assert.match(copy, /Review My Route — US\$69/);
  assert.match(article, /href=\{`\$\{copy\.servicePath\}#build-my-route`\}/);
  assert.match(copy, /Build My Route — US\$129/);
  assert.match(copy, /Use the free Route Finder/);
  assert.match(copy, /No human review is included/);
  assert.match(article, /utm_source=china-itinerary-too-rushed/);
  assert.match(article, /utm_campaign=article-to-route-finder/);
  assert.doesNotMatch(copy, /free (?:human )?(?:route|itinerary) review/i);
  assert.doesNotMatch(copy, /Start a free route check/);
});

test("article has visible FAQs and only Article plus BreadcrumbList schema", async () => {
  const article = await source("components/ChinaItineraryTooRushedPage.tsx");
  const copy = await source("lib/chinaItineraryTooRushedI18n.ts");

  assert.equal((copy.match(/question: "/g) ?? []).length, 15);
  assert.match(article, /<details key=\{item\.question\}>/);
  assert.match(article, /<summary>\{item\.question\}<\/summary>/);
  assert.match(article, /"@type": "Article"/);
  assert.match(article, /"@type": "BreadcrumbList"/);
  assert.doesNotMatch(article, /FAQPage/);
  assert.match(copy, /Homeground Editorial Team/);
  assert.match(article, /<Link href=\{copy\.studioPath\}>\{copy\.authorLabel\}<\/Link>/);
  assert.match(article, /datePublished: "2026-07-22"/);
  assert.match(article, /dateModified: "2026-07-22"/);
});

test("metadata, sitemap and contextual links expose the English article", async () => {
  const route = await source(
    "app/(default)/guides/is-your-china-itinerary-too-rushed/page.tsx",
  );
  const localizedRoute = await source(
    "app/(localized)/[locale]/guides/is-your-china-itinerary-too-rushed/page.tsx",
  );
  const article = await source("components/ChinaItineraryTooRushedPage.tsx");
  const sitemap = await source("app/sitemap.ts");
  const registry = await source("lib/guideRegistry.ts");
  const service = await source("components/ChinaItineraryReviewPage.tsx");
  const productionExport = await source("tools/prune-production-export.mjs");

  assert.match(
    registry,
    /title: "China Itinerary Too Rushed\? A Practical Check"/,
  );
  assert.match(route, /card: "summary_large_image"/);
  assert.match(route, /getGuideLanguagePaths\(guide\.id\)/);
  assert.match(localizedRoute, /getGuideLanguagePaths\(guide\.id\)/);
  assert.match(registry, /transfer-platform-soft-focus-1200\.webp/);
  assert.match(
    article,
    /href=\{copy\.transportGuidePath\}/,
  );
  assert.match(article, /https:\/\/www\.12306\.cn\/en\/faq\.html\?item=1/);
  assert.match(article, /https:\/\/intl\.dpm\.org\.cn\/visit\.html/);
  assert.match(article, /https:\/\/en\.chnmuseum\.cn\/visit_692\//);
  assert.doesNotMatch(article, /\bF\d+\b/);
  assert.match(
    sitemap,
    /const guideEntries = guideIds\.flatMap/,
  );
  assert.match(
    service,
    /const rushGuideHref = `\$\{homeCopy\.path\}guides\/is-your-china-itinerary-too-rushed\/`/,
  );
  assert.match(
    productionExport,
    /guides\/is-your-china-itinerary-too-rushed\/index\.html/,
  );
  assert.match(
    productionExport,
    /zh\/guides\/is-your-china-itinerary-too-rushed\/index\.html/,
  );
  assert.match(
    productionExport,
    /ko\/guides\/is-your-china-itinerary-too-rushed\/index\.html/,
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
