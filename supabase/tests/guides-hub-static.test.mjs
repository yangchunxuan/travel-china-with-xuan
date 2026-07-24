import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("guides hub is registry-driven and exposes all ten current guides", async () => {
  const hub = await source("components/GuidesHubPage.tsx");
  const registry = await source("lib/guideRegistry.ts");

  assert.equal((registry.match(/\n    id: "/g) ?? []).length, 10);
  assert.match(hub, /const guides = getAllGuides\(locale\)/);
  assert.match(hub, /guides\.map\(\(guide, index\) =>/);
  assert.doesNotMatch(
    hub,
    /getGuideEntry\("(?:zhangjiajie|beijing|is-your)/,
  );
  assert.match(registry, /format: "itinerary"/);
  assert.match(registry, /topics: \["itinerary-design"/);
  assert.match(registry, /destinations: \["beijing", "zhangjiajie", "shanghai"\]/);
});

test("homepage guide selection is explicit, ranked and stable", async () => {
  const homepage = await source("components/HomegroundHomePage.tsx");
  const homepageCss = await source("components/HomegroundHomePage.module.css");
  const registry = await source("lib/guideRegistry.ts");

  assert.match(
    registry,
    /id: "is-your-china-itinerary-too-rushed"[\s\S]*?homeFeaturedRank: 2/,
  );
  assert.match(
    registry,
    /id: "zhangjiajie-itinerary"[\s\S]*?homeFeaturedRank: 1/,
  );
  assert.match(
    registry,
    /id: "zhangjiajie-glass-bridge-vs-skywalk"[\s\S]*?homeFeaturedRank: 3/,
  );
  assert.match(registry, /export function getHomeFeaturedGuides/);
  assert.match(
    registry,
    /\.sort\(\(a, b\) => a\.homeFeaturedRank - b\.homeFeaturedRank\)/,
  );
  assert.match(
    registry,
    /cardImagePath:\s*"\/images\/guides\/tantan-zhangjiajie\/tantan-hero-1200\.jpg"/,
  );
  assert.match(
    registry,
    /id: "is-your-china-itinerary-too-rushed"[\s\S]*?cardImagePath:\s*"\/images\/guides\/china-itinerary-reality\/airport-apron-card-1200\.webp"/,
  );
  assert.match(registry, /const cardImagePath =/);
  assert.match(registry, /const cardImageAlt =/);
  assert.match(homepage, /src=\{guide\.cardImagePath\}/);
  assert.match(homepage, /alt=\{guide\.cardImageAlt\}/);
  assert.match(homepage, /data-guide-id=\{guide\.id\}/);
  assert.match(
    homepageCss,
    /\[data-guide-id="zhangjiajie-glass-bridge-vs-skywalk"\][\s\S]*?aspect-ratio: 1;/,
  );
});

test("three hub routes publish localized canonical and hreflang metadata", async () => {
  const route = await source("app/(default)/guides/page.tsx");
  const localizedRoute = await source(
    "app/(localized)/[locale]/guides/page.tsx",
  );
  const copy = await source("app/(default)/guides/guidesHubI18n.ts");

  assert.match(route, /canonical: copy\.path/);
  assert.match(route, /languages: getGuidesHubLanguagePaths\(\)/);
  assert.match(localizedRoute, /canonical: copy\.path/);
  assert.match(localizedRoute, /languages: getGuidesHubLanguagePaths\(\)/);
  assert.match(localizedRoute, /value === "zh" \|\| value === "ko"/);
  assert.match(copy, /title: "China Travel Guides"/);
  assert.match(copy, /title: "中国旅行指南"/);
  assert.match(copy, /title: "중국 여행 가이드"/);
  assert.match(copy, /path: "\/guides\/"/);
  assert.match(copy, /path: "\/zh\/guides\/"/);
  assert.match(copy, /path: "\/ko\/guides\/"/);
});

test("hub output is semantic, dated, image-sized and structured", async () => {
  const hub = await source("components/GuidesHubPage.tsx");
  const css = await source("components/GuidesHubPage.module.css");

  assert.doesNotMatch(hub, /^"use client";/);
  assert.match(hub, /<main id="guides-main" tabIndex=\{-1\}>/);
  assert.match(hub, /<ol className=\{styles\.guideGrid\}>/);
  assert.match(hub, /<article className=\{styles\.guideCard\}>/);
  assert.match(hub, /<time dateTime=\{guide\.dateModified\}>/);
  assert.match(hub, /src=\{guide\.cardImagePath\}/);
  assert.match(hub, /alt=\{guide\.cardImageAlt\}/);
  assert.match(hub, /width=\{guide\.cardImageWidth\}/);
  assert.match(hub, /height=\{guide\.cardImageHeight\}/);
  assert.match(hub, /data-guide-id=\{guide\.id\}/);
  assert.match(
    css,
    /\[data-guide-id="zhangjiajie-glass-bridge-vs-skywalk"\][\s\S]*?aspect-ratio: 3 \/ 2;/,
  );
  assert.match(hub, /"@type": "CollectionPage"/);
  assert.match(hub, /"@type": "ItemList"/);
  assert.match(hub, /numberOfItems: guides\.length/);
  assert.match(hub, /itemListElement: guides\.map/);
});

test("hub has a visible trip-brief CTA and stays usable from 320px to wide screens", async () => {
  const hub = await source("components/GuidesHubPage.tsx");
  const copy = await source("app/(default)/guides/guidesHubI18n.ts");
  const css = await source("components/GuidesHubPage.module.css");

  assert.match(hub, /href=\{getGuidesHubPlannerHref\(locale\)\}/);
  assert.match(copy, /utm_campaign: "trip-conversation"/);
  assert.match(copy, /action: "Start my free trip brief"/);
  assert.match(copy, /action: "免费提交旅行简报"/);
  assert.match(copy, /action: "무료 여행 브리프 시작하기"/);
  assert.match(css, /@media \(max-width: 22rem\)/);
  assert.match(
    css,
    /\.guideSlotWide \{[\s\S]*?grid-column: span 12;/,
  );
  assert.doesNotMatch(css, /\.heroInner,\s*\.catalog,\s*\.ctaInner/);
  assert.match(
    css,
    /\.catalog \{[\s\S]*?calc\(\(100vw - 1380px\) \/ 2\)/,
  );
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /:focus-visible/);
});
