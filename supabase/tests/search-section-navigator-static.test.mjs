import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("primary navigation gives the four traveler tasks distinct names and destinations", async () => {
  const model = await source("lib/homegroundNavigationModel.ts");

  for (const [id, label, pathSegment] of [
    ["destinations", "Destinations", "explore/"],
    ["tours", "Private Tours", "tours/"],
    ["guides", "Travel Advice", "guides/"],
    ["studio", "How We Plan", "studio/"],
  ]) {
    assert.match(
      model,
      new RegExp(`${id}: \\{[\\s\\S]*?label: "${label}"[\\s\\S]*?pathSegment: "${pathSegment.replace("/", "\\/")}"`),
    );
  }

  assert.match(model, /label: "目的地"/);
  assert.match(model, /label: "实用指南"/);
  assert.match(model, /label: "私家团"/);
  assert.match(model, /label: "여행지"/);
  assert.match(model, /label: "실용 가이드"/);
  assert.match(model, /label: "프라이빗 투어"/);
});

test("each top-level task has one purpose-built landing page", async () => {
  const [platform, destinations, guides, services, tours] = await Promise.all([
    source("components/SearchPlatformHubPage.tsx"),
    source("components/DestinationsHubPage.tsx"),
    source("components/GuidesHubPage.tsx"),
    source("components/TravelServicesHubPage.tsx"),
    source("components/PrivateToursHubPage.tsx"),
  ]);

  assert.match(platform, /if \(section === "explore"\)[\s\S]*?<DestinationsHubPage/);
  assert.match(platform, /if \(section === "services"\)[\s\S]*?<TravelServicesHubPage/);
  assert.match(destinations, /destinationHubRegistry\.map/);
  assert.doesNotMatch(destinations, /GuideSearchForm|pageGuides\.map/);
  assert.match(guides, /<GuideSearchForm/);
  assert.match(guides, /pageGuides\.map/);
  assert.doesNotMatch(guides, /destinationHubRegistry/);
  assert.match(services, /copy\.cards\.map/);
  assert.match(services, /pageContext="services"/);
  assert.match(tours, /products\.map/);
});

test("the retired nine-card navigator cannot reappear on a public Hub", async () => {
  const pages = await Promise.all([
    source("components/SearchPlatformHubPage.tsx"),
    source("components/SearchCollectionHubPage.tsx"),
    source("components/DestinationsHubPage.tsx"),
    source("components/GuidesHubPage.tsx"),
    source("components/TravelServicesHubPage.tsx"),
  ]);

  for (const page of pages) {
    assert.doesNotMatch(page, /SearchSectionNavigator|sectionIndex|collectionNav/);
  }
});
