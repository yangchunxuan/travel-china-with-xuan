import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("guides hub is registry-driven and exposes all nineteen current guides", async () => {
  const hub = await source("components/GuidesHubPage.tsx");
  const registry = await source("lib/guideRegistry.ts");

  assert.equal((registry.match(/\n    id: "/g) ?? []).length, 19);
  assert.match(hub, /const guides = getAllGuides\(locale\)/);
  assert.match(hub, /planningGuides\.map\(\(guide, index\) =>/);
  assert.match(hub, /entryGuides\.map\(\(guide, index\) =>/);
  assert.match(hub, /getGuidesByPillar\("entry-rules", locale\)/);
  assert.doesNotMatch(hub, /getGuideEntry\("(?:zhangjiajie|beijing|is-your)/);
  assert.match(registry, /format: "itinerary"/);
  assert.match(registry, /pillar: "entry-rules"/);
  assert.match(registry, /audienceMarkets: \["uk"\]/);
  assert.match(registry, /audienceMarkets: \["us"\]/);
  assert.match(
    registry,
    /id: "zhangjiajie-from-malaysia"[\s\S]*?audienceMarkets: \["malaysia"\]/,
  );
  assert.match(
    registry,
    /id: "china-240-hour-visa-free-transit-route-check"[\s\S]*?pillar: "entry-rules"[\s\S]*?audienceMarkets: \["global"\]/,
  );
  assert.match(registry, /topics: \["itinerary-design"/);
  assert.match(
    registry,
    /destinations: \["beijing", "zhangjiajie", "shanghai"\]/,
  );
});

test("homepage guide rail exposes the tour and complete localized guide catalog", async () => {
  const [
    homepage,
    homepageRoute,
    editorial,
    rail,
    railCss,
    englishIndex,
    localizedIndex,
  ] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("app/(default)/page.tsx"),
    source("lib/homepageEditorial.ts"),
    source("components/HomepageGuideRail.tsx"),
    source("components/HomepageGuideRail.module.css"),
    source("app/(default)/guides/homepage-guide-index.json/route.ts"),
    source("app/(localized)/[locale]/guides/homepage-guide-index.json/route.ts"),
  ]);

  assert.match(editorial, /const allGuides = getAllGuides\(locale\)/);
  assert.match(editorial, /kind: "tour"/);
  assert.match(editorial, /\.\.\.orderedGuides\.map\(\(guide\) => guideRailItem\(guide, locale\)\)/);
  assert.match(editorial, /src: guide\.cardImagePath/);
  assert.match(editorial, /alt: guide\.cardImageAlt/);
  assert.match(editorial, /width: guide\.cardImageWidth/);
  assert.match(editorial, /height: guide\.cardImageHeight/);
  assert.match(homepageRoute, /getHomepageGuideRailItems\("en"\)\.slice\(0, 18\)/);
  assert.match(homepage, /catalogUrl=\{guideRailCatalogPath\}/);
  assert.match(homepage, /<HomepageGuideRail/);
  assert.match(englishIndex, /getHomepageGuideRailItems\("en"\)/);
  assert.match(localizedIndex, /getHomepageGuideRailItems\(locale\)/);
  assert.match(localizedIndex, /value === "zh" \|\| value === "ko"/);
  assert.match(rail, /fetch\(catalogUrl/);
  assert.match(rail, /<ol[\s\S]*?<li[\s\S]*?<a/);
  assert.match(rail, /data-category=\{item\.category\}/);
  assert.match(rail, /data-kind=\{item\.kind\}/);
  assert.match(railCss, /scroll-snap-type:\s*x mandatory/);
  assert.doesNotMatch(rail, /arrowButton|scrollList|scrollBy/);
  assert.match(rail, /className=\{styles\.actions\}/);
  assert.match(railCss, /flex-basis:\s*calc\(\(100% - var\(--rail-gap\)\) \/ 2\)/);
  assert.match(railCss, /\) \/ 4\s*\);/);
  assert.match(railCss, /@media \(prefers-reduced-motion: reduce\)/);

  const guidesSectionIndex = homepage.indexOf("<HomepageGuideRail");
  const proofSectionIndex = homepage.indexOf("<PlanningScopeSection locale={locale} />");
  assert.ok(
    guidesSectionIndex >= 0 && guidesSectionIndex < proofSectionIndex,
    "the complete travel-guide rail must appear before the planning-proof section",
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

test("the existing guides owner acts as the country-level China travel guide", async () => {
  const hub = await source("components/GuidesHubPage.tsx");
  const copy = await source("app/(default)/guides/guidesHubI18n.ts");
  const css = await source("components/GuidesHubPage.module.css");

  assert.match(copy, /export const guidesHubDecisionSections = \[[\s\S]*?"explore"[\s\S]*?"plan"[\s\S]*?"when-to-go"[\s\S]*?"transport"[\s\S]*?"stay"[\s\S]*?"essentials"[\s\S]*?"culture"[\s\S]*?\] as const/);
  assert.match(hub, /guidesHubDecisionSections\.map\(\(section, index\) =>/);
  assert.match(hub, /copy\.countryGuide\.decisions\[section\]/);
  assert.match(hub, /getSearchSectionPath\(section, locale\)/);
  assert.match(hub, /id="china-travel-guide-title"/);
  assert.match(copy, /title: "Start with the decision that changes the trip\."/);
  assert.match(copy, /title: "先找到真正会改变行程的决定。"/);
  assert.match(copy, /title: "여행을 바꾸는 결정부터 시작하세요\."/);
  assert.doesNotMatch(hub, /\/china-travel-guide\//);
  assert.doesNotMatch(copy, /\/china-travel-guide\//);
  assert.doesNotMatch(hub, /\/china-itinerary-review\//);
  assert.match(css, /\.decisionGrid li:first-child\s*\{[\s\S]*?grid-column: span 8;/);
  assert.match(css, /@media \(max-width: 48rem\)[\s\S]*?\.decisionGrid li:last-child[\s\S]*?grid-column: span 12;/);
});

test("hub output is semantic, dated, image-sized and structured", async () => {
  const hub = await source("components/GuidesHubPage.tsx");
  const css = await source("components/GuidesHubPage.module.css");

  assert.doesNotMatch(hub, /^"use client";/);
  assert.match(hub, /<main id="guides-main" tabIndex=\{-1\}>/);
  assert.match(hub, /className=\{styles\.guideGrid\}/);
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
  assert.match(hub, /const tailRemainder = tailCount % 3/);
  assert.match(hub, /styles\.guideSlotHalf/);
  assert.match(hub, /planningGuides\.length % 2 === 1/);
  assert.match(hub, /className=\{styles\.entryAction\}/);
  assert.match(hub, /href="\/guides\/china-entry-requirements\/"/);
  assert.match(css, /\.entryGuideSlot\s*\{[\s\S]*?grid-column: span 4;/);
  assert.match(css, /\.guideSlotHalf\s*\{[\s\S]*?grid-column: span 6;/);
  assert.match(
    css,
    /\.guideGrid\[data-odd-count="true"\] \.guideSlot:last-child\s*\{[\s\S]*?grid-column: span 12;/,
  );
});

test("each guide identity owns a distinct card and social cover", async () => {
  const registrySources = [
    await source("lib/guideRegistry.ts"),
    await source("lib/generated/guideRegistry.generated.ts"),
  ].join("\n");

  for (const field of ["cardImagePath", "heroImagePath"]) {
    const paths = [
      ...registrySources.matchAll(
        new RegExp(`${field}:\\s*\"([^\"]+)\"`, "g"),
      ),
    ].map((match) => match[1]);
    const duplicatePaths = paths.filter(
      (path, index) => paths.indexOf(path) !== index,
    );

    assert.deepEqual(
      [...new Set(duplicatePaths)],
      [],
      `${field} must not be shared by different guide identities`,
    );

    const imageHashes = await Promise.all(
      paths.map(async (path) => {
        const bytes = await readFile(
          new URL(`../../public${path}`, import.meta.url),
        );
        return createHash("sha256").update(bytes).digest("hex");
      }),
    );
    const duplicateHashes = imageHashes.filter(
      (hash, index) => imageHashes.indexOf(hash) !== index,
    );

    assert.deepEqual(
      [...new Set(duplicateHashes)],
      [],
      `${field} files must not be byte-identical across guide identities`,
    );
  }
});

test("hub has direct planner contact and stays usable from 320px to wide screens", async () => {
  const hub = await source("components/GuidesHubPage.tsx");
  const copy = await source("app/(default)/guides/guidesHubI18n.ts");
  const css = await source("components/GuidesHubPage.module.css");

  assert.match(hub, /href=\{getGuidesHubPlannerHref\(locale\)\}/);
  assert.match(copy, /utm_campaign: "trip-conversation"/);
  assert.match(copy, /#planner-contact/);
  assert.match(copy, /action: "Talk to a China trip planner"/);
  assert.match(copy, /action: "联系旅行规划师"/);
  assert.match(copy, /action: "중국 여행 플래너와 상담하기"/);
  assert.doesNotMatch(copy, /planner=destinations|free-brief/);
  assert.match(css, /@media \(max-width: 22rem\)/);
  assert.match(css, /\.guideSlotWide \{[\s\S]*?grid-column: span 12;/);
  assert.doesNotMatch(css, /\.heroInner,\s*\.catalog,\s*\.ctaInner/);
  assert.match(css, /\.catalog \{[\s\S]*?calc\(\(100vw - 1380px\) \/ 2\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /:focus-visible/);
});
