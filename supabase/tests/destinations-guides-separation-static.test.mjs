import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../../", import.meta.url);
const source = (relativePath) =>
  readFile(new URL(relativePath, projectRoot), "utf8");

test("Destinations owns places and never renders the article library", async () => {
  const [page, route, localizedRoute] = await Promise.all([
    source("components/DestinationsHubPage.tsx"),
    source("app/(default)/explore/page.tsx"),
    source("app/(localized)/[locale]/explore/page.tsx"),
  ]);

  assert.match(route, /<DestinationsHubPage locale="en" \/>/);
  assert.match(localizedRoute, /<DestinationsHubPage locale=\{locale\} \/>/);
  assert.match(page, /destinationHubRegistry\.map\(\(hub, index\) =>/);
  assert.match(page, /searchCollections\.filter\(/);
  assert.doesNotMatch(
    page,
    /getSearchHubGuides|GuideSearchForm|GuideCard|SearchSectionNavigator/,
  );
  assert.doesNotMatch(page, /<article/);
  assert.match(page, /href=\{`\$\{home\.path\}guides\/`\}/);
});

test("Travel Advice owns searchable questions without a destination directory", async () => {
  const [page, copy] = await Promise.all([
    source("components/GuidesHubPage.tsx"),
    source("app/(default)/guides/guidesHubI18n.ts"),
  ]);

  assert.match(page, /<GuideSearchForm/);
  assert.match(page, /pageGuides\.map/);
  assert.doesNotMatch(
    page,
    /DestinationHubDiscovery|destinationHubRegistry|SearchSectionNavigator/,
  );
  const decisionIds = copy.match(
    /guidesHubDecisionSections = \[([\s\S]*?)\] as const/,
  )?.[1];
  assert.ok(decisionIds);
  assert.doesNotMatch(decisionIds, /"explore"/);
  assert.match(copy, /title: "Practical China Travel Guides"/);
  assert.match(copy, /title: "中国旅行实用指南"/);
  assert.match(copy, /title: "중국 여행 실용 가이드"/);
});

test("destination hierarchy never passes through the guide library", async () => {
  const [cityPage, collectionPage, adapter] = await Promise.all([
    source("components/content/DestinationHubPage.tsx"),
    source("components/SearchCollectionHubPage.tsx"),
    source("lib/searchPlatformContentAdapter.ts"),
  ]);

  assert.doesNotMatch(cityPage, /guidesPath|copy\.guides/);
  assert.match(
    cityPage,
    /position: 2,[\s\S]*?sections\.explore\.navLabel/,
  );
  assert.match(collectionPage, /collection\.section === "explore"/);
  assert.match(
    adapter,
    /section === "explore"[\s\S]*?"system-home"[\s\S]*?section === "services"[\s\S]*?"system-studio"[\s\S]*?"system-guides"/,
  );
});

test("city hubs are bounded overview projections rather than hidden mega guides", async () => {
  const [page, projection] = await Promise.all([
    source("components/content/DestinationHubPage.tsx"),
    source("lib/destinationOverviewProjection.ts"),
  ]);

  assert.match(page, /projectDestinationOverview\(body, hubId, locale\)/);
  assert.match(page, /projectDestinationOpening\(body, hubId\)/);
  assert.match(page, /hub\.supportGuideIds\.slice\(0, 6\)/);
  assert.match(page, /overviewSignals\.map/);
  assert.doesNotMatch(page, /<details\b/);
  assert.match(page, /<aside[\s\S]*?className=\{destinationStyles\.evidencePanel\}/);
  assert.match(page, /visibleSources = getVisibleHubSources\(body\)/);
  assert.match(page, /\.slice\(0, 4\)/);
  assert.doesNotMatch(page, /remainingBody|decisionSections/);
  assert.doesNotMatch(page, /body\.blocks\.slice\(splitIndex\)/);

  assert.match(projection, /DestinationOverviewSignalId/);
  assert.match(projection, /"nights"[\s\S]*"stay"[\s\S]*"gateway"[\s\S]*"next"/);
  assert.match(projection, /Execution tables, recovery workflows, FAQs and/);
  assert.match(projection, /rows: coarseTable\.rows\.slice\(0, 4\)/);
  assert.match(projection, /items: coarseList\.items\.slice\(0, 4\)/);
  assert.match(projection, /projectedSignalHeadingIds\.has\(heading\.id\)/);
  assert.match(
    projection,
    /evidence\.length > 0 \? \[projectedHeading, \.\.\.evidence\] : \[\]/,
  );
  assert.match(projection, /\.slice\(0, 2\)/);
  assert.doesNotMatch(projection, /PageFamilyRenderer/);
});

test("homepage keeps destination discovery distinct from private tours", async () => {
  const [homePage, copy] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("lib/homegroundI18n.ts"),
  ]);

  assert.match(homePage, /const destinationsIndexPath =/);
  assert.match(
    homePage,
    /className=\{showcaseStyles\.primaryAction\}[\s\S]{0,100}href=\{privateTourHubPaths\[locale\]\}/,
  );
  assert.match(
    homePage,
    /className=\{showcaseStyles\.heroDestinationPrompt\}[\s\S]{0,180}<a href=\{destinationsIndexPath\}>/,
  );
  assert.doesNotMatch(
    homePage,
    /href=\{"#destinations"\}/,
  );
  assert.match(copy, /eyebrow: "Travel answers"/);
  assert.match(copy, /eyebrow: "选择城市"/);
  assert.match(copy, /eyebrow: "도시 선택"/);
});
