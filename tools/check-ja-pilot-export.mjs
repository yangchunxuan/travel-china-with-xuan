import { reservationGuideEditionSlugs, reservationGuideEditionPath } from "../lib/reservationGuideEditionPaths.ts";
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
  ["/ja/guides/how-much-does-a-china-trip-cost/", {
    en: "/guides/how-much-does-a-china-trip-cost/",
    "zh-Hans": "/zh/guides/how-much-does-a-china-trip-cost/",
    ko: "/ko/guides/how-much-does-a-china-trip-cost/",
    ja: "/ja/guides/how-much-does-a-china-trip-cost/",
    "x-default": "/guides/how-much-does-a-china-trip-cost/",
  }],
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
hasTag(sitemap, `<loc>${site}/ja/guides/how-much-does-a-china-trip-cost/</loc>`);
hasTag(sitemap, `<loc>${site}${jaPilot.tour}</loc>`);
for (const path of [
  "/guides/how-much-does-a-china-trip-cost/",
  "/zh/guides/how-much-does-a-china-trip-cost/",
  "/ko/guides/how-much-does-a-china-trip-cost/",
  "/ja/guides/how-much-does-a-china-trip-cost/",
]) {
  const entry = sitemap.split(`<loc>${site}${path}</loc>`)[1]?.split("</url>")[0] ?? "";
  assert.ok(entry.includes(`hreflang="ja" href="${site}/ja/guides/how-much-does-a-china-trip-cost/"`), `${path} sitemap entry is missing its Japanese alternate`);
}

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
// The tour's own text: the shared header and footer (whose services menu names the English-speaking guide service) are left out.
const visibleTourText = tour
  .replace(/<header\b[\s\S]*?<\/header>/gu, "")
  .replace(/<footer\b[\s\S]*?<\/footer>/gu, "")
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
const costGuide = await page("/ja/guides/how-much-does-a-china-trip-cost/");
assert.match(costGuide, /中国旅行の費用はいくら？/u);
for (const price of ["US$1,462.71", "A$2,470", "A$5,130"]) {
  assert.ok(costGuide.includes(price), `Japanese cost guide is missing ${price}`);
}
assert.match(costGuide, /CNY[\s\u00a0]16,310/u);
hasTag(costGuide, 'id="contact"');
hasTag(costGuide, 'href="#contact"');
hasTag(costGuide, 'href="/ja/studio/evan/"');
assert.match(costGuide, /mailto:hello@homegroundchina\.com/u);
assert.match(costGuide, /https:\/\/wa\.me\/\d+\?text=/u);
// The Japanese guides hub is the English hub (/guides/) in Japanese, on the
// same GuidesHubPage as the French one: the English sections in the English
// order, with the Japanese articles after the hero where French lists its own.
const guidesHub = await page("/ja/guides/");
{
  const { parse } = await import("parse5");
  const { existsSync } = await import("node:fs");
  const attr = (node, name) => node?.attrs?.find((item) => item.name === name)?.value;
  const all = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => all(child, predicate))];
  const text = (node) => (node.nodeName === "#text" ? node.value : ["script", "style"].includes(node.tagName) ? "" : (node.childNodes ?? []).map(text).join(""));
  /** A link's words as read out: decorative arrows (aria-hidden) left out. */
  const label = (node) => (attr(node, "aria-hidden") === "true" ? "" : node.nodeName === "#text" ? node.value : (node.childNodes ?? []).map(label).join("")).replace(/\s+/gu, " ").trim();
  const mainOf = (html) => all(parse(html), (node) => node.tagName === "main")[0];
  /** The page's sections, by their heading id (the hero by its tag). */
  const sections = (main) => main.childNodes.filter((node) => node.tagName).map((node) => attr(node, "aria-labelledby") ?? node.tagName);
  const cards = (main) => all(main, (node) => attr(node, "data-guide-id")).map((node) => attr(node, "data-guide-id"));
  const main = mainOf(guidesHub);
  const englishMain = mainOf(await page("/guides/"));
  const frenchMain = mainOf(await page("/fr/guides/"));
  assert.match(text(all(main, (node) => node.tagName === "h1")[0]), /中国旅行の実用ガイド/u);
  const [hero, ...englishSections] = sections(englishMain);
  assert.deepEqual(sections(main), [hero, "translated-reservation-guides-title", ...englishSections], "Japanese guides hub has the English sections in the English order");
  assert.deepEqual(sections(main), sections(frenchMain), "Japanese guides hub has the French hub's sections");
  assert.deepEqual(cards(main), cards(englishMain), "Japanese guides hub lists the English hub's first-page guides in order");
  const japaneseArticles = [jaPilot.guide, "/ja/guides/how-much-does-a-china-trip-cost/", ...reservationGuideEditionSlugs.map((slug) => reservationGuideEditionPath("ja", slug))];
  const links = all(main, (node) => node.tagName === "a" && attr(node, "href"));
  const targets = new Set(links.map((node) => new URL(attr(node, "href"), site).pathname));
  for (const path of [...japaneseArticles, "/ja/guides/china-entry-requirements/", "/ja/explore/"]) {
    assert.ok(targets.has(path), `Japanese guides hub should link ${path}`);
  }
  // A Japanese page is never marked English; a page that stays English says （英語） and hreflang="en".
  const pagination = all(main, (node) => node.tagName === "nav" && /pagination/u.test(attr(node, "class") ?? ""))[0];
  const numberedPages = all(all(pagination, (node) => node.tagName === "ol")[0], (node) => node.tagName === "a");
  assert.ok(numberedPages.length > 0, "Japanese guides hub links the English hub's later pages");
  assert.match(text(all(pagination, (node) => node.tagName === "p")[0]), /2ページ目以降は英語/u, "the pagination says the later pages are English");
  let englishLinks = 0;
  for (const node of links) {
    const href = attr(node, "href");
    const target = new URL(href, site);
    if (target.origin !== site || href.startsWith("#")) continue;
    const words = label(node);
    assert.ok(existsSync(join(output, target.pathname.replace(/^\//u, ""), "index.html")), `/ja/guides/ link ${href} resolves`);
    if (target.pathname.startsWith("/ja/")) {
      assert.ok(!words.endsWith("（英語）") && !attr(node, "hreflang"), `/ja/guides/ link ${href} is Japanese`);
    } else if (numberedPages.includes(node)) {
      // The English hub's later pages: as short as the English numbers; the status line says they are English.
      assert.ok(/^\d+ページ$/u.test(words) && attr(node, "hreflang") === "en", `/ja/guides/ page link ${href} is hreflang="en"`);
      englishLinks++;
    } else {
      assert.ok(words.endsWith("（英語）") && attr(node, "hreflang") === "en", `/ja/guides/ link ${href} says （英語） and hreflang="en"`);
      englishLinks++;
    }
  }
  assert.ok(englishLinks > 0, "Japanese guides hub links the English guides");
  // The closing action opens the Japanese inquiry dialog; without it, the Japanese home page's contact section.
  const cta = all(main, (node) => attr(node, "aria-labelledby") === "guides-cta-title")[0];
  assert.deepEqual(all(cta, (node) => node.tagName === "a").map((node) => attr(node, "href")), ["/ja/#planner-contact"]);
  // The structured list names every Japanese article once and counts what it lists.
  const itemList = JSON.parse(all(parse(guidesHub), (node) => node.tagName === "script" && attr(node, "type") === "application/ld+json").map((node) => (node.childNodes ?? []).map((child) => child.value ?? "").join("")).find((json) => json.includes('"ItemList"')))["@graph"].find((node) => node["@type"] === "ItemList");
  const listed = itemList.itemListElement.map((item) => new URL(item.url).pathname);
  assert.equal(itemList.numberOfItems, listed.length);
  assert.equal(new Set(listed).size, listed.length, "Japanese guides hub lists each guide once");
  for (const path of japaneseArticles) assert.ok(listed.includes(path), `Japanese guides hub structured data lists ${path}`);
}
assert.deepEqual(
  // The hub's own list; the shared footer's entry-guide link is not one of its articles.
  [...new Set(guidesHub.replace(/<header\b[\s\S]*?<\/header>/gu, "").replace(/<footer\b[\s\S]*?<\/footer>/gu, "").match(/href="\/ja\/guides\/[^"#?]+\/"/gu) ?? [])].filter((href) => href !== 'href="/ja/guides/china-entry-requirements/"').sort(),
  [`href="${jaPilot.guide}"`, 'href="/ja/guides/how-much-does-a-china-trip-cost/"', ...reservationGuideEditionSlugs.map(slug => `href="${reservationGuideEditionPath("ja", slug)}"`)].sort(),
  "Japanese guides hub should list all eight published Japanese articles",
);
assert.match(guidesHub, /https:\/\/wa\.me\/\d+\?text=/u);
assert.match(guidesHub, /mailto:hello@homegroundchina\.com/u);
const whatsappHref = tour.match(/https:\/\/wa\.me\/\d+\?text=[^"<]+/u)?.[0];
assert.ok(whatsappHref, "Japanese tour has a WhatsApp link");
const whatsappMessage = new URL(whatsappHref.replaceAll("&amp;", "&")).searchParams.get("text");
assert.match(whatsappMessage ?? "", /日本語ガイド付きの公開料金/u);
assert.match(whatsappMessage ?? "", /参加人数：2名/u);

// Every Japanese tour page distinguishes the saved on-site form from an external draft.
// The tour collections (/ja/tours/multi-city/ and the others) are lists of tours, not tour pages.
const { readdir } = await import("node:fs/promises");
const tourCollectionFolders = new Set(["multi-city", "regions", "seasonal"]);
const tourSlugs = (await readdir(join(output, "ja", "tours"), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && !tourCollectionFolders.has(entry.name))
  .map((entry) => entry.name);
assert.ok(tourSlugs.length >= 48, `expected at least 48 Japanese tour pages, found ${tourSlugs.length}`);
for (const slug of tourSlugs) {
  const tourPage = await page(`/ja/tours/${slug}/`);
  if (slug === "xian-terracotta-warriors-half-day-private-tour") {
    assert.match(tourPage, /アプリで送信するまで.*届きません/u, "standalone half-day tour uses a direct-channel draft");
  } else {
    assert.match(tourPage, /受付番号/u, `/ja/tours/${slug}/ is missing the on-site inquiry notice`);
  }
}

// The tours hub offers WhatsApp and email, not an email link alone.
const toursHub = await page("/ja/tours/");
assert.match(toursHub, /https:\/\/wa\.me\/\d+\?text=/u);
assert.match(toursHub, /mailto:hello@homegroundchina\.com/u);

console.log(`✓ Japanese site exports ${japaneseSitePages.length} indexable site pages, two guides and tour pages with reciprocal hreflang, a noindex Japanese 404, live-model prices and working contact paths.`);
