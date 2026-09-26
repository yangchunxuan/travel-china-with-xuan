import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
// @ts-ignore Node runs repository TypeScript via --experimental-strip-types.
import { jaPilot, jaPilotGuideAlternates, jaPilotTourAlternates } from "../lib/jaPilot.ts";
// @ts-ignore Node runs repository TypeScript via --experimental-strip-types.
import { getPrivateTourProduct } from "../lib/privateTourProducts.ts";

const site = "https://homegroundchina.com";
const output = join(process.cwd(), "out");

async function page(path) {
  return readFile(join(output, path.replace(/^\//u, ""), "index.html"), "utf8");
}

function hasTag(html, tag) {
  assert.ok(html.includes(tag), `Missing ${tag}`);
}

for (const [path, alternates] of [
  [jaPilot.guide, jaPilotGuideAlternates()],
  [jaPilot.tour, jaPilotTourAlternates()],
]) {
  const html = await page(path);
  hasTag(html, '<html lang="ja"');
  hasTag(html, `<link rel="canonical" href="${site}${path}"/>`);
  assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+noindex/u);
  for (const [language, target] of Object.entries(alternates)) {
    hasTag(html, `<link rel="alternate" hrefLang="${language}" href="${site}${target}"/>`);
  }
  for (const existingPath of new Set([alternates.en, alternates["zh-Hans"], alternates.ko])) {
    const existingHtml = await page(existingPath);
    hasTag(existingHtml, `<link rel="alternate" hrefLang="ja" href="${site}${path}"/>`);
    // Product language links may carry the selected group size in the query.
    hasTag(existingHtml, `href="${path}`);
  }
}

const sitemap = await readFile(join(output, "sitemap.xml"), "utf8");
hasTag(sitemap, `<loc>${site}${jaPilot.guide}</loc>`);
hasTag(sitemap, `<loc>${site}${jaPilot.tour}</loc>`);
assert.ok(!sitemap.includes(`<loc>${site}${jaPilot.home}</loc>`));

const home = await page(jaPilot.home);
const privacy = await page(jaPilot.privacy);
hasTag(home, '<html lang="ja"');
assert.match(home, /name="robots"[^>]+noindex/u);
assert.match(privacy, /name="robots"[^>]+noindex/u);

const tour = await page(jaPilot.tour);
const visibleTourText = tour
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gu, "")
  .replace(/<!--.*?-->/gsu, "")
  .replace(/<[^>]+>/gu, "");
const product = getPrivateTourProduct(jaPilot.tourSlug);
assert.ok(product, "Japanese tour has a matching published product");
const prices = product.packages.find((item) => item.id === "standard-guided")?.prices;
assert.equal(prices?.length, 3);
for (const price of prices) {
  assert.ok(visibleTourText.includes(`CNY ${new Intl.NumberFormat("ja-JP").format(price.cnyPerPerson)}`));
}
assert.match(visibleTourText, /日本語ガイド込み/u);
assert.doesNotMatch(visibleTourText, /英語ガイド/u);
assert.match(tour, /https:\/\/wa\.me\/\d+\?text=/u);
assert.match(tour, /mailto:hello@homegroundchina\.com/u);
assert.match(tour, /href="\/ja\/privacy\/"/u);

const guide = await page(jaPilot.guide);
hasTag(guide, `href="${jaPilot.tour}"`);
hasTag(guide, 'href="#contact"');
assert.match(guide, /https:\/\/www\.12306\.cn\/en\/index\.html/u);
const whatsappHref = tour.match(/https:\/\/wa\.me\/\d+\?text=[^"<]+/u)?.[0];
assert.ok(whatsappHref, "Japanese tour has a WhatsApp link");
const whatsappMessage = new URL(whatsappHref.replaceAll("&amp;", "&")).searchParams.get("text");
assert.match(whatsappMessage ?? "", /日本語ガイド：含まれています/u);

console.log("✓ Japanese pilot exports two indexable reciprocal pages, live-model prices, Japanese guide terms and working contact paths.");
