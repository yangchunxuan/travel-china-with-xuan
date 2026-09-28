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

function hasJapaneseLanguageChoice(html, target, source) {
  const navigation = html.match(/<nav(?=[^>]*HomegroundHeader_languageNav)[^>]*>[\s\S]*?<\/nav>/u)?.[0] ?? "";
  const mobileNavigation = html.match(/<div(?=[^>]*HomegroundHeader_mobileLanguageNav)[^>]*>[\s\S]*?<\/div>/u)?.[0] ?? "";
  for (const [surface, markup] of [["desktop", navigation], ["mobile", mobileNavigation]]) {
    assert.ok(markup.includes(`href="${target}`), `${source} ${surface} header is missing its Japanese page`);
    assert.match(markup, />日本語<\/a>/u, `${source} ${surface} header is missing the Japanese label`);
  }
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
    hasJapaneseLanguageChoice(existingHtml, path, existingPath);
  }
}

const sitemap = await readFile(join(output, "sitemap.xml"), "utf8");
hasTag(sitemap, `<loc>${site}${jaPilot.guide}</loc>`);
hasTag(sitemap, `<loc>${site}${jaPilot.tour}</loc>`);

// Japanese site pages: indexable, in the sitemap, reciprocal with EN/ZH/KO.
const japaneseSitePages = [
  ["/", "/ja/"],
  ["/guides/", "/ja/guides/"],
  ["/services/", "/ja/services/"],
  ["/explore/", "/ja/explore/"],
  ["/studio/", "/ja/studio/"],
  ["/studio/evan/", "/ja/studio/evan/"],
  ["/business-information/", "/ja/business-information/"],
  ["/terms/", "/ja/terms/"],
  ["/refund-delivery/", "/ja/refund-delivery/"],
  ["/privacy/", "/ja/privacy/"],
];
for (const [enPath, jaPath] of japaneseSitePages) {
  const suffix = enPath.replace(/^\//u, "");
  const alternates = { en: enPath, "zh-Hans": `/zh/${suffix}`, ko: `/ko/${suffix}`, ja: jaPath };
  const html = await page(jaPath);
  hasTag(html, '<html lang="ja"');
  hasTag(html, `<link rel="canonical" href="${site}${jaPath}"/>`);
  assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+noindex/u, `${jaPath} is indexable`);
  assert.match(html, /<title>[^<]+<\/title>/u, `${jaPath} has a title`);
  assert.match(html, /<meta name="description" content="[^"]+"/u, `${jaPath} has a description`);
  hasTag(sitemap, `<loc>${site}${jaPath}</loc>`);
  for (const [language, target] of Object.entries(alternates)) {
    hasTag(html, `<link rel="alternate" hrefLang="${language}" href="${site}${target}"/>`);
  }
  for (const existingPath of [alternates.en, alternates["zh-Hans"], alternates.ko]) {
    const existingHtml = await page(existingPath);
    hasTag(existingHtml, `<link rel="alternate" hrefLang="ja" href="${site}${jaPath}"/>`);
    hasJapaneseLanguageChoice(existingHtml, jaPath, existingPath);
  }
  // The Japanese footer keeps readers on the Japanese legal pages; no optional tracking loads.
  const footer = html.match(/<footer[\s\S]*?<\/footer>/u)?.[0] ?? "";
  assert.ok(footer.includes('href="/ja/business-information/"'), `${jaPath} footer lists business information`);
  for (const englishOnly of ["/business-information/", "/terms/", "/refund-delivery/", "/privacy/"]) {
    assert.ok(!footer.includes(`href="${englishOnly}"`), `${jaPath} footer links to English ${englishOnly}`);
  }
  assert.doesNotMatch(html, /googletagmanager|connect\.facebook\.net|fbevents/u, `${jaPath} loads tracking`);
}

const notFound = await page("/ja/404/");
hasTag(notFound, '<html lang="ja"');
assert.match(notFound, /<meta[^>]+name="robots"[^>]+noindex/u);
assert.ok(!sitemap.includes(`<loc>${site}/ja/404/</loc>`));
const rootNotFound = await readFile(join(output, "404.html"), "utf8");
assert.ok(rootNotFound.includes('location.replace(\"/ja/404/\")') || rootNotFound.includes('location.replace("/ja/404/")'), "root 404 sends /ja/ paths to the Japanese 404");
hasJapaneseLanguageChoice(rootNotFound, "/ja/", "/404/");

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
hasTag(tour, 'id="contact"');
assert.match(tour, /href="[^"]*#contact"/u);
assert.match(tour, /href="\/ja\/privacy\/"/u);

const guide = await page(jaPilot.guide);
hasTag(guide, `href="${jaPilot.tour}"`);
hasTag(guide, 'href="#contact"');
assert.match(guide, /https:\/\/www\.12306\.cn\/en\/index\.html/u);
const guidesHub = await page("/ja/guides/");
assert.match(guidesHub.match(/<h1[^>]*>[\s\S]*?<\/h1>/u)?.[0].replace(/<[^>]+>/gu, "") ?? "", /中国旅行の実用ガイド/u);
hasTag(guidesHub, `href="${jaPilot.guide}"`);
assert.match(guidesHub, /公開中：1本/u);
assert.deepEqual(
  [...new Set(guidesHub.match(/href="\/ja\/guides\/[^"#?]+\/"/gu) ?? [])],
  [`href="${jaPilot.guide}"`],
  "Japanese guides hub should list only published Japanese articles",
);
assert.match(guidesHub, /https:\/\/wa\.me\/\d+\?text=/u);
assert.match(guidesHub, /mailto:hello@homegroundchina\.com/u);
assert.match(guidesHub, /受付完了を表示/u);
const whatsappHref = tour.match(/https:\/\/wa\.me\/\d+\?text=[^"<]+/u)?.[0];
assert.ok(whatsappHref, "Japanese tour has a WhatsApp link");
const whatsappMessage = new URL(whatsappHref.replaceAll("&amp;", "&")).searchParams.get("text");
assert.match(whatsappMessage ?? "", /日本語ガイド付きの公開料金/u);
assert.match(whatsappMessage ?? "", /参加人数：2名/u);

// Every Japanese tour page distinguishes the saved on-site form from an external draft.
const { readdir } = await import("node:fs/promises");
const tourSlugs = (await readdir(join(output, "ja", "tours"), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
assert.ok(tourSlugs.length >= 48, `expected at least 48 Japanese tour pages, found ${tourSlugs.length}`);
for (const slug of tourSlugs) {
  const tourPage = await page(`/ja/tours/${slug}/`);
  assert.match(tourPage, /受付番号/u, `/ja/tours/${slug}/ is missing the on-site inquiry notice`);
}

// The tours hub offers WhatsApp and email, not an email link alone.
const toursHub = await page("/ja/tours/");
assert.match(toursHub, /https:\/\/wa\.me\/\d+\?text=/u);
assert.match(toursHub, /mailto:hello@homegroundchina\.com/u);

console.log(`✓ Japanese site exports ${japaneseSitePages.length} indexable site pages plus the guide and tour pages with reciprocal hreflang, a noindex Japanese 404, live-model prices and working contact paths.`);
