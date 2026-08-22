import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../../", import.meta.url);
const source = (relativePath) =>
  readFile(new URL(relativePath, projectRoot), "utf8");

const dataPath =
  "content/guides/first-trip-china-airport-station-stay-map/asset-data.en.json";

test("the linkable asset has ten unique cities, 54 gateways and 39 stay areas", async () => {
  const data = JSON.parse(await source(dataPath));
  const cityIds = data.cities.map((city) => city.id);
  const gatewayIds = data.cities.flatMap((city) => city.gatewayNodes);
  const stayAreaIds = data.cities.flatMap((city) => city.stayAreas);

  assert.equal(data.cities.length, 10);
  assert.equal(new Set(cityIds).size, 10);
  assert.equal(gatewayIds.length, 54);
  assert.equal(new Set(gatewayIds).size, 54);
  assert.equal(stayAreaIds.length, 39);
  assert.equal(new Set(stayAreaIds).size, 39);
  assert.equal(data.reviewedGatewayNodeCount, 54);
  assert.equal(data.reviewedStayAreaCount, 39);
  assert.equal(data.reviewedAt, "2026-08-23");
});

test("Guilin and Shenzhen use live guide owners instead of missing destination hubs", async () => {
  const data = JSON.parse(await source(dataPath));
  const guilin = data.cities.find((city) => city.id === "guilin-yangshuo");
  const shenzhen = data.cities.find((city) => city.id === "shenzhen");

  assert.equal(
    guilin.guidePath,
    "/guides/guilin-airport-or-railway-station-arrival-guide/",
  );
  assert.equal(
    shenzhen.guidePath,
    "/guides/shenzhen-airport-railway-station-border-port-selector/",
  );
  assert.ok(!JSON.stringify(data).includes("/destinations/guilin/"));
  assert.ok(!JSON.stringify(data).includes("/destinations/shenzhen/"));
});

test("all published download files exist and the national SVG is self-contained", async () => {
  const files = [
    "public/downloads/homeground-china-10-city-arrival-stay-departure-v1.svg",
    "public/downloads/homeground-china-10-city-arrival-stay-departure-v1.png",
    "public/downloads/homeground-china-10-city-arrival-stay-departure-v1@2x.png",
    "public/downloads/homeground-china-10-city-arrival-stay-departure-v1.csv",
    "public/downloads/homeground-china-beijing-arrive-stay-depart-v1.svg",
    "public/downloads/homeground-china-beijing-arrive-stay-depart-v1.png",
    "public/downloads/homeground-china-shanghai-arrive-stay-depart-v1.svg",
    "public/downloads/homeground-china-shanghai-arrive-stay-depart-v1.png",
    "public/downloads/homeground-china-zhangjiajie-arrive-stay-depart-v1.svg",
    "public/downloads/homeground-china-zhangjiajie-arrive-stay-depart-v1.png",
    "public/images/guides/first-trip-china-airport-station-stay-map/hero-1600.webp",
  ];

  await Promise.all(files.map((file) => access(new URL(file, projectRoot))));

  const svg = await source(files[0]);
  assert.doesNotMatch(svg, /<script\b/i);
  assert.doesNotMatch(svg, /\bon[a-z]+\s*=/i);
  assert.doesNotMatch(svg, /(?:href|src)\s*=\s*["']https?:/i);
  assert.match(svg, /SCHEMATIC CORRIDOR VIEW · NOT TO SCALE/);
});

test("the CSV and visible matrix carry every city", async () => {
  const [dataSource, csv, component] = await Promise.all([
    source(dataPath),
    source(
      "public/downloads/homeground-china-10-city-arrival-stay-departure-v1.csv",
    ),
    source("components/FirstTripTenCityMapPage.tsx"),
  ]);
  const data = JSON.parse(dataSource);
  const csvRows = csv.trim().split(/\r?\n/u);

  assert.equal(csvRows.length, 11);
  for (const city of data.cities) {
    assert.ok(component.includes("assetData.cities.map"));
    assert.ok(
      csv.includes(city.name.split(" /")[0]),
      `CSV must include ${city.name}`,
    );
  }
  assert.match(component, /<caption>/);
  assert.match(component, /scope="col"/);
  assert.match(component, /scope="row"/);
  assert.match(component, /tabIndex=\{0\}/);
});

test("the page emits linked Article, Dataset and DataDownload schema", async () => {
  const [component, actions, analytics] = await Promise.all([
    source("components/FirstTripTenCityMapPage.tsx"),
    source("components/LinkableAssetActions.tsx"),
    source("lib/analytics.ts"),
  ]);

  assert.match(component, /"@type": "Article"/);
  assert.match(component, /"@type": "Dataset"/);
  assert.match(component, /"@type": "DataDownload"/);
  assert.match(component, /editorialWebsiteSchema\(\)/);
  assert.match(component, /editorialOrganizationSchema\(\)/);
  assert.match(
    component,
    /isPartOf: \{ "@id": EDITORIAL_WEBSITE_ID \}/,
  );
  assert.match(component, /<GuideCtaLink/);
  assert.match(component, /US\$69 human route review/);
  assert.match(actions, /download/);
  assert.match(actions, /linkable_asset_download_clicked/);
  assert.match(actions, /linkable_asset_citation_copied/);
  assert.match(analytics, /\| "linkable_asset_download_clicked"/);
  assert.match(analytics, /\| "linkable_asset_citation_copied"/);
});
