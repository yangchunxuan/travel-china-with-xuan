import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("section navigator distinguishes destinations from the complete guide library", async () => {
  const [navigator, model] = await Promise.all([
    source("components/SearchSectionNavigator.tsx"),
    source("lib/searchSectionNavigation.ts"),
  ]);

  assert.match(model, /title: "Destinations"/);
  assert.match(model, /title: "All Guides"/);
  assert.match(model, /title: "目的地"/);
  assert.match(model, /title: "全部指南"/);
  assert.match(model, /title: "여행지"/);
  assert.match(model, /title: "전체 가이드"/);
  assert.match(model, /regions, cities and sights/);
  assert.match(model, /完整的文章与实用答案库/);
  assert.match(model, /모든 글과 실용 답변/);
  assert.match(navigator, /href=\{getAllGuidesPath\(locale\)\}/);
  assert.match(navigator, /href=\{getSearchSectionPath\("explore", locale\)\}/);
});

test("section navigator gives knowledge, utility and assistance distinct weight", async () => {
  const [navigator, model, css] = await Promise.all([
    source("components/SearchSectionNavigator.tsx"),
    source("lib/searchSectionNavigation.ts"),
    source("components/SearchSectionNavigator.module.css"),
  ]);

  for (const section of [
    "explore",
    "plan",
    "transport",
    "when-to-go",
    "stay",
    "essentials",
    "culture",
  ]) {
    assert.match(model, new RegExp(`"${section}"`));
  }
  assert.match(model, /searchUtilitySectionId = "tools"/);
  assert.match(model, /"services" as const satisfies SearchSectionId/);
  assert.match(navigator, /className=\{styles\.knowledge\}/);
  assert.match(navigator, /className=\{styles\.sideRail\}/);
  assert.match(css, /grid-template-columns: minmax\(0, 1fr\) minmax\(16\.5rem, 0\.3fr\)/);
  assert.match(css, /@media \(max-width: 48rem\)[\s\S]*?grid-template-columns: 1fr/);
  assert.doesNotMatch(css, /overflow-x|scroll-snap|min-width:\s*7[26]rem/);
});

test("whole navigation cards expose current page and keyboard focus", async () => {
  const [navigator, css] = await Promise.all([
    source("components/SearchSectionNavigator.tsx"),
    source("components/SearchSectionNavigator.module.css"),
  ]);

  assert.match(navigator, /currentSection\?: SearchSectionId/);
  assert.match(navigator, /aria-current=\{destinationIsCurrent \? "page" : undefined\}/);
  assert.match(navigator, /aria-current=\{isCurrent \? "page" : undefined\}/);
  assert.match(navigator, /<Link[\s\S]*?<strong>[\s\S]*?<\/Link>/);
  assert.match(css, /\.gateway:focus-visible/);
  assert.match(css, /outline: 3px solid var\(--section-nav-accent\)/);
});

test("both hub families use the same grouped navigator", async () => {
  const [platformHub, guidesHub, platformCss, guidesCss, navigator] = await Promise.all([
    source("components/SearchPlatformHubPage.tsx"),
    source("components/GuidesHubPage.tsx"),
    source("components/SearchPlatformHubPage.module.css"),
    source("components/GuidesHubPage.module.css"),
    source("components/SearchSectionNavigator.tsx"),
  ]);

  assert.match(platformHub, /<SearchSectionNavigator currentSection=\{section\} locale=\{locale\} \/>/);
  assert.match(
    guidesHub,
    /<SearchSectionNavigator id="browse-topics" locale=\{locale\} \/>/,
  );
  assert.match(navigator, /id=\{id\}/);
  assert.doesNotMatch(platformHub, /className=\{styles\.sectionIndex\}/);
  assert.doesNotMatch(guidesHub, /className=\{styles\.collectionNav\}/);
  assert.doesNotMatch(platformCss, /\.sectionIndex/);
  assert.doesNotMatch(guidesCss, /\.collectionNav/);
});
