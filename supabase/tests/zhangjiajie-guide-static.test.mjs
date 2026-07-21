import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("Zhangjiajie guide keeps one server-readable decision path", async () => {
  const guide = await source("components/ZhangjiajieGuidePage.tsx");
  const copy = await source("lib/zhangjiajieGuideI18n.ts");

  assert.match(guide, /<main id="guide-content" tabIndex=\{-1\}>/);
  assert.equal(guide.match(/<h1>/g)?.length, 1);
  for (const id of [
    "quick-answer",
    "route-logic",
    "itinerary-2-days",
    "itinerary-3-days",
    "itinerary-4-days",
    "combination-rules",
    "evidence",
    "faq",
    "sources",
  ]) {
    assert.match(guide, new RegExp(`id="${id}"`));
  }
  assert.match(guide, /copy\.threeDay\.backLink/);
  assert.match(guide, /copy\.fourDay\.backLink/);
  assert.match(guide, /copy\.faq\.items\.map/);
  assert.match(guide, /ZHANGJIAJIE_GUIDE_SOURCES\.map/);
  assert.match(copy, /Back to 2, 3 or 4-day choices/);
  assert.match(copy, /返回 2、3、4 天方案选择/);
  assert.match(copy, /2·3·4일 선택으로 돌아가기/);
});

test("guide itineraries use semantic editorial lists and sources stay quiet by default", async () => {
  const guide = await source("components/ZhangjiajieGuidePage.tsx");
  const styles = await source("components/ZhangjiajieGuidePage.module.css");
  const copy = await source("lib/zhangjiajieGuideI18n.ts");

  for (const className of [
    "timelineIndex",
    "timelineKicker",
    "routeZoneRail",
    "routeZoneNode",
    "sourceDisclosure",
  ]) {
    assert.match(guide, new RegExp(`styles\\.${className}`));
  }

  assert.match(
    guide,
    /<ol className=\{styles\.timeline\} aria-label=\{label\} role="list">/,
  );
  assert.match(guide, /<dl>/);
  assert.match(copy, /Days 3–4 · Choose one direction/);
  assert.match(guide, /role="group"\s+aria-labelledby="four-day-branch-choice"/);
  assert.doesNotMatch(guide, /timelineRail|timelineNode/);
  assert.doesNotMatch(guide, /timelineMarker/);
  assert.match(guide, /<details className=\{styles\.sourceDisclosure\}>/);
  assert.doesNotMatch(guide, /<details[^>]*\sopen(?:=|\s|>)/);
  assert.doesNotMatch(guide, /not a route signed off/i);
  assert.doesNotMatch(styles, /\.timelineRail|\.timelineNode/);
  assert.doesNotMatch(styles, /\.timeline > li\s*\{[^}]*border/s);
  assert.doesNotMatch(styles, /\.timelineContent dl > div\s*\{[^}]*border/s);
  assert.doesNotMatch(styles, /\.branchMarker::(?:before|after)/);
  assert.match(styles, /\.branchGrid\s*\{\s*align-items: start;/s);
});

test("guide answers full-day counting and park-order intent without inventing attribution", async () => {
  const guide = await source("components/ZhangjiajieGuidePage.tsx");
  const header = await source("components/HomegroundHeader.tsx");
  const copy = await source("lib/zhangjiajieGuideI18n.ts");
  const sources = await source("lib/zhangjiajieGuide.ts");

  assert.match(copy, /Arrive Monday evening and tour Tuesday plus Wednesday/);
  assert.match(copy, /East Gate → Tianzi Mountain → Yuanjiajie → Bailong Elevator/);
  assert.match(copy, /South Gate → Huangshi Village → Golden Whip Stream → East Gate/);
  assert.match(copy, /Conditional, not the default/);
  assert.match(copy, /local background: Xuan grew up in Zhangjiajie/);
  assert.match(sources, /zjjdaxiagu\.com\/guide\.html/);
  assert.match(guide, /"@type": "Person"/);
  assert.match(guide, /author: \{ "@id": "https:\/\/homegroundchina\.com\/#organization" \}/);
  assert.match(guide, /contributor: \{ "@id": "https:\/\/homegroundchina\.com\/#xuan" \}/);
  assert.match(guide, /\?planner=destinations#route-finder/);
  assert.match(header, /\?planner=destinations#route-finder/);
  assert.doesNotMatch(guide, /utm_(?:source|medium|campaign)/);
  assert.doesNotMatch(header, /utm_(?:source|medium|campaign)/);
});

test("guide metadata, sitemap and visible dates share one source", async () => {
  const page = await source(
    "app/(default)/guides/zhangjiajie-itinerary/page.tsx",
  );
  const localizedPage = await source(
    "app/(localized)/[locale]/guides/zhangjiajie-itinerary/page.tsx",
  );
  const guide = await source("components/ZhangjiajieGuidePage.tsx");
  const sitemap = await source("app/sitemap.ts");
  const registry = await source("lib/guideRegistry.ts");

  assert.match(page, /getGuideEntry\("zhangjiajie-itinerary", "en"\)/);
  assert.match(page, /getGuideLanguagePaths\("zhangjiajie-itinerary"\)/);
  assert.match(localizedPage, /getGuideEntry\("zhangjiajie-itinerary", locale\)/);
  assert.match(localizedPage, /getGuideLanguagePaths\("zhangjiajie-itinerary"\)/);
  assert.match(sitemap, /guideIds\.flatMap/);
  assert.match(sitemap, /getGuideLanguageUrls\(guideId\)/);
  assert.match(sitemap, /getGuideEntry\(guideId, locale\)/);
  assert.match(guide, /guide\.datePublished/);
  assert.match(guide, /guide\.dateModified/);
  assert.match(registry, /datePublished: "2026-07-20"/);
  assert.match(registry, /dateModified: "2026-07-21"/);
  assert.match(registry, /path: "\/guides\/zhangjiajie-itinerary\/"/);
  assert.match(registry, /path: "\/zh\/guides\/zhangjiajie-itinerary\/"/);
  assert.match(registry, /path: "\/ko\/guides\/zhangjiajie-itinerary\/"/);
});

test("public guide remains available to search, citation and training crawlers", async () => {
  const robots = await source("public/robots.txt");
  const page = await source(
    "app/(default)/guides/zhangjiajie-itinerary/page.tsx",
  );
  const guide = await source("components/ZhangjiajieGuidePage.tsx");
  const home = await source("components/HomegroundHomePage.tsx");
  const footer = await source("components/HomegroundFooter.tsx");
  const header = await source("components/HomegroundHeader.tsx");

  assert.match(robots, /User-agent: \*\s+Allow: \//);
  assert.match(robots, /Disallow: \/admin\//);
  assert.doesNotMatch(
    robots,
    /(?:GPTBot|ClaudeBot|Google-Extended)[\s\S]*Disallow:/,
  );
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);
  assert.doesNotMatch(guide, /FAQPage|HowTo|AggregateRating/);
  assert.match(home, /guide: featuredGuide/);
  assert.match(home, /href=\{guide\.canonicalPath\}/);
  assert.match(home, /guide\.featuredLinkLabel/);
  assert.match(footer, /href=\{guide\.canonicalPath\}/);
  assert.match(header, /getGuideEntry\([\s\S]*targetLocale[\s\S]*\)\.canonicalPath/);
});

test("guide locales have independent URLs, copy and language metadata", async () => {
  const registry = await source("lib/guideRegistry.ts");
  const copy = await source("lib/zhangjiajieGuideI18n.ts");
  const sitemap = await source("app/sitemap.ts");

  assert.match(registry, /"zh-Hans": zh/);
  assert.match(registry, /"x-default": en/);
  assert.match(copy, /htmlLang: "zh-Hans"/);
  assert.match(copy, /htmlLang: "ko"/);
  assert.match(copy, /按真正完整的游览日来计算/);
  assert.match(copy, /온전히 관광할 수 있는 날짜로 계산하세요/);
  assert.match(registry, /张家界玩 2、3 或 4 天/);
  assert.match(registry, /장자제 2일, 3일, 4일/);
  assert.match(sitemap, /\.\.\.guideEntries/);
});

test("guide images have responsive sources and explicit fallback dimensions", async () => {
  const guide = await source("components/ZhangjiajieGuidePage.tsx");
  const productionPruner = await source(
    "tools/prune-production-export.mjs",
  );

  assert.match(guide, /hero-1600\.avif 1600w/);
  assert.match(guide, /tianmen-1200\.avif 1200w/);
  assert.doesNotMatch(guide, /tianmen-1600\.(?:avif|webp) 1600w/);
  assert.match(guide, /fenghuang-1200\.avif 1200w/);
  assert.match(guide, /width="1200"\s+height="780"/);
  assert.match(guide, /width="1200"\s+height="620"/);
  assert.equal(guide.match(/loading="lazy"/g)?.length, 2);
  assert.match(
    productionPruner,
    /images\/guides\/zhangjiajie\/restored/,
  );
});
