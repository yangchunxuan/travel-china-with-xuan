import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../../", import.meta.url);
const source = (relativePath) =>
  readFile(new URL(relativePath, projectRoot), "utf8");

const dataPath =
  "content/guides/first-trip-china-airport-station-stay-map/asset-data.en.json";
const filePrefix = "homeground-china-10-city-arrival-stay-departure-v1";
const downloadsRoot = "public/downloads/";
const imageRoot =
  "public/images/guides/first-trip-china-airport-station-stay-map/";

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function storedZipEntries(buffer) {
  const entries = new Map();
  let offset = 0;

  while (offset + 4 <= buffer.length) {
    const signature = buffer.readUInt32LE(offset);
    if (signature !== 0x04034b50) break;

    const compressionMethod = buffer.readUInt16LE(offset + 8);
    const compressedSize = buffer.readUInt32LE(offset + 18);
    const uncompressedSize = buffer.readUInt32LE(offset + 22);
    const fileNameLength = buffer.readUInt16LE(offset + 26);
    const extraFieldLength = buffer.readUInt16LE(offset + 28);
    const nameStart = offset + 30;
    const dataStart = nameStart + fileNameLength + extraFieldLength;
    const dataEnd = dataStart + compressedSize;

    assert.equal(compressionMethod, 0, "the deterministic package must use stored ZIP entries");
    assert.equal(compressedSize, uncompressedSize);
    assert.ok(dataEnd <= buffer.length, "ZIP entry must fit inside the archive");

    const name = buffer.subarray(nameStart, nameStart + fileNameLength).toString("utf8");
    assert.ok(!entries.has(name), `ZIP must not contain a duplicate entry: ${name}`);
    entries.set(name, buffer.subarray(dataStart, dataEnd));
    offset = dataEnd;
  }

  assert.ok(entries.size > 0, "ZIP must contain at least one local file entry");
  return entries;
}

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

test("the asset builder derives review text from data and normalizes cross-platform text inputs", async () => {
  const builder = await source("tools/build-first-trip-ten-city-assets.mjs");

  assert.match(builder, /const reviewMatch = [\s\S]*?assetData\.reviewedAt/);
  assert.match(builder, /const reviewLabel = `\$\{reviewDay\} \$\{reviewMonthLabel\} \$\{reviewYear\}`/);
  assert.doesNotMatch(builder, /23 Aug 2026/);
  assert.match(builder, /function normalizeLf\(value\)/);
  assert.match(builder, /replace\(\/\\r\\n\?\/gu, "\\n"\)/);
  assert.match(builder, /const stableTextSources = \[/);
  assert.match(builder, /\.\.\.\[\.\.\.originalCityCards\]\.map/);
  assert.match(builder, /const packageNames = \[[\s\S]*?\]\.sort\(\)/);
  assert.match(builder, /storedZip\(packageEntries\)/);
});

test("all ten city cards and the national downloads exist as self-contained licensed assets", async () => {
  const data = JSON.parse(await source(dataPath));
  const nationalFiles = [
    `${downloadsRoot}${filePrefix}.svg`,
    `${downloadsRoot}${filePrefix}.png`,
    `${downloadsRoot}${filePrefix}@2x.png`,
    `${downloadsRoot}${filePrefix}.csv`,
    `${imageRoot}hero-1600.webp`,
  ];
  const cityFiles = data.cities.flatMap((city) => [
    `${downloadsRoot}homeground-china-${city.id}-arrive-stay-depart-v1.svg`,
    `${downloadsRoot}homeground-china-${city.id}-arrive-stay-depart-v1.png`,
    `${imageRoot}${city.id}-card-1200.webp`,
  ]);
  const files = [...nationalFiles, ...cityFiles];

  await Promise.all(files.map((file) => access(new URL(file, projectRoot))));

  const svgFiles = [
    nationalFiles[0],
    ...data.cities.map(
      (city) =>
        `${downloadsRoot}homeground-china-${city.id}-arrive-stay-depart-v1.svg`,
    ),
  ];
  for (const file of svgFiles) {
    const svg = await source(file);
    assert.doesNotMatch(svg, /<script\b/i, `${file} must not contain scripts`);
    assert.doesNotMatch(svg, /\bon[a-z]+\s*=/i, `${file} must not contain event handlers`);
    assert.doesNotMatch(
      svg,
      /(?:href|src)\s*=\s*["']https?:/i,
      `${file} must not load a remote asset`,
    );
    assert.match(svg, /CC BY 4\.0/i, `${file} must carry the visible reuse licence`);
  }

  const cityCardNumbers = new Set();
  for (const [index, city] of data.cities.entries()) {
    const svg = await source(
      `${downloadsRoot}homeground-china-${city.id}-arrive-stay-depart-v1.svg`,
    );
    const expectedNumber = String(index + 1).padStart(2, "0");
    assert.match(
      svg,
      new RegExp(`CITY CARD ${expectedNumber}`),
      `${city.name} must carry city-card number ${expectedNumber}`,
    );
    cityCardNumbers.add(expectedNumber);
  }
  assert.equal(cityCardNumbers.size, 10, "all ten city-card numbers must be unique");

  assert.match(await source(nationalFiles[0]), /SCHEMATIC CORRIDOR VIEW · NOT TO SCALE/);
});

test("the complete downloadable pack is deterministic, checksummed and contains every promised file", async () => {
  const data = JSON.parse(await source(dataPath));
  const jsonName = `${filePrefix}.json`;
  const readmeName = `${filePrefix}-README.txt`;
  const licenceName = `${filePrefix}-LICENSE.txt`;
  const attributionName = `${filePrefix}-ATTRIBUTION-AND-EMBED.txt`;
  const sourcesName = `${filePrefix}-SOURCES.txt`;
  const checksumsName = `${filePrefix}-SHA256SUMS.txt`;
  const expectedEntries = [
    `${filePrefix}.svg`,
    `${filePrefix}.png`,
    `${filePrefix}@2x.png`,
    `${filePrefix}.csv`,
    jsonName,
    ...data.cities.flatMap((city) => [
      `homeground-china-${city.id}-arrive-stay-depart-v1.svg`,
      `homeground-china-${city.id}-arrive-stay-depart-v1.png`,
    ]),
    readmeName,
    licenceName,
    attributionName,
    sourcesName,
    checksumsName,
  ].sort();
  const zipPath = `${downloadsRoot}${filePrefix}.zip`;
  const zip = await readFile(new URL(zipPath, projectRoot));

  assert.equal(zip.readUInt32LE(0), 0x04034b50, "asset pack must start with ZIP local-header magic");
  const zipEntries = storedZipEntries(zip);
  assert.deepEqual([...zipEntries.keys()].sort(), expectedEntries);

  const checksumText = await source(`${downloadsRoot}${checksumsName}`);
  const checksumRows = checksumText
    .trim()
    .split(/\r?\n/u)
    .map((row) => {
      const match = row.match(/^([a-f0-9]{64})  (.+)$/u);
      assert.ok(match, `invalid checksum row: ${row}`);
      return { digest: match[1], name: match[2] };
    });
  assert.deepEqual(
    checksumRows.map((row) => row.name).sort(),
    expectedEntries.filter((name) => name !== checksumsName),
  );

  for (const row of checksumRows) {
    const file = await readFile(new URL(`${downloadsRoot}${row.name}`, projectRoot));
    assert.equal(sha256(file), row.digest, `${row.name} checksum must match disk`);
    assert.deepEqual(zipEntries.get(row.name), file, `${row.name} ZIP payload must match disk`);
  }
  assert.deepEqual(
    zipEntries.get(checksumsName),
    Buffer.from(checksumText, "utf8"),
    "ZIP checksum ledger must match the published ledger",
  );

  const publishedJson = JSON.parse(
    await source(`${downloadsRoot}${jsonName}`),
  );
  const {
    canonicalUrl,
    license,
    creditText,
    copyrightNotice,
    ...publishedData
  } = publishedJson;
  assert.deepEqual(
    publishedData,
    data,
    "published JSON must preserve the complete reviewed source dataset",
  );
  assert.equal(
    canonicalUrl,
    "https://homegroundchina.com/guides/first-trip-china-airport-station-stay-map/",
  );
  assert.equal(
    license,
    "https://creativecommons.org/licenses/by/4.0/",
  );
  assert.match(creditText, /Homeground China[\s\S]*CC BY 4\.0/);
  assert.match(
    copyrightNotice,
    /张家界市永定区本境文化交流工作室（个体工商户）[\s\S]*Homeground China/,
  );
});

test("the reuse pack explains attribution, adaptation and third-party exclusions", async () => {
  const [readme, licence, attribution, sources] = await Promise.all([
    source(`${downloadsRoot}${filePrefix}-README.txt`),
    source(`${downloadsRoot}${filePrefix}-LICENSE.txt`),
    source(`${downloadsRoot}${filePrefix}-ATTRIBUTION-AND-EMBED.txt`),
    source(`${downloadsRoot}${filePrefix}-SOURCES.txt`),
  ]);

  assert.match(readme, /schematic, not a geographic map/i);
  assert.match(
    readme,
    /confirm the exact ticketed terminal, station or\s+port/i,
  );
  assert.match(licence, /Creative Commons Attribution 4\.0 International \(CC BY 4\.0\)/i);
  assert.match(licence, /any purpose, including commercially/i);
  assert.match(licence, /credit Homeground China/i);
  assert.match(licence, /state whether you changed/i);
  assert.match(licence, /do not imply that Homeground China endorses/i);
  assert.match(licence, /does not relicense third-party/i);
  assert.match(
    licence,
    /Licence summary\/deed: https:\/\/creativecommons\.org\/licenses\/by\/4\.0\//i,
  );
  assert.match(
    licence,
    /Legal code: https:\/\/creativecommons\.org\/licenses\/by\/4\.0\/legalcode/i,
  );
  assert.match(attribution, /href="https:\/\/creativecommons\.org\/licenses\/by\/4\.0\/">CC BY 4\.0<\/a>/i);
  assert.doesNotMatch(attribution, /rel="license"/i);
  assert.match(attribution, /changes were made/i);
  assert.match(sources, /SOURCE AND METHOD INDEX/i);
  assert.match(sources, /Facts reviewed: 2026-08-23/i);
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
  assert.ok(component.includes("data.cities.map"));
  for (const city of data.cities) {
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

test("the page emits linked Article, Dataset and licensed downloadable-asset schema", async () => {
  const [component, actions, analytics, i18n] = await Promise.all([
    source("components/FirstTripTenCityMapPage.tsx"),
    source("components/LinkableAssetActions.tsx"),
    source("lib/analytics.ts"),
    source("lib/firstTripTenCityMapI18n.ts"),
  ]);
  const visibleCopy = `${component}\n${i18n}`;

  assert.match(component, /"@type": "Article"/);
  assert.match(component, /"@type": "Dataset"/);
  assert.match(component, /"@type": "DataDownload"/);
  assert.match(component, /license:/);
  assert.match(component, /acquireLicensePage:/);
  assert.match(component, /creditText:/);
  assert.match(component, /copyrightNotice:/);
  assert.match(component, /editorialWebsiteSchema\(\)/);
  assert.match(component, /editorialOrganizationSchema\(\)/);
  assert.match(
    component,
    /isPartOf: \{ "@id": EDITORIAL_WEBSITE_ID \}/,
  );
  assert.match(component, /<GuideCtaLink/);
  assert.match(i18n, /US\$69 human route review/);
  assert.match(component, new RegExp(`${filePrefix}\\.zip`));
  assert.match(component, new RegExp(`${filePrefix}\\.json`));
  assert.match(component, new RegExp(`${filePrefix}-LICENSE\\.txt`));
  assert.match(component, /if \(href\.endsWith\("\.zip"\)\) return "application\/zip"/);
  assert.match(component, /if \(href\.endsWith\("\.json"\)\) return "application\/json"/);
  assert.match(component, /if \(href\.endsWith\("\.txt"\)\) return "text\/plain"/);
  assert.doesNotMatch(component, /rel="license"/);
  assert.match(component, /CC BY 4\.0/);

  const articleStart = component.indexOf('"@type": "Article"');
  const imageStart = component.indexOf('"@type": "ImageObject"');
  const datasetStart = component.indexOf('"@type": "Dataset"');
  const breadcrumbStart = component.indexOf('"@type": "BreadcrumbList"');
  assert.ok(articleStart >= 0 && imageStart > articleStart);
  assert.ok(datasetStart > imageStart && breadcrumbStart > datasetStart);
  assert.doesNotMatch(
    component.slice(articleStart, imageStart),
    /\blicense:/,
    "CC BY must apply to the original asset, not silently relicense the entire article",
  );
  for (const schemaSlice of [
    component.slice(imageStart, datasetStart),
    component.slice(datasetStart, breadcrumbStart),
  ]) {
    for (const field of [
      "license: ASSET_LICENCE_URL",
      "acquireLicensePage: guide.canonicalUrl",
      "creditText: ASSET_CREDIT_TEXT",
      "copyrightNotice: ASSET_COPYRIGHT_NOTICE",
    ]) {
      assert.ok(schemaSlice.includes(field), `licensed asset schema must include ${field}`);
    }
  }
  assert.equal(
    [...component.matchAll(/\blicense: ASSET_LICENCE_URL/g)].length,
    3,
    "ImageObject, Dataset and the DataDownload template each need a licence",
  );

  const downloadSection = component.indexOf('id="downloads"');
  const commercialCta = component.indexOf("<GuideCtaLink href={ctaHref}");
  assert.ok(downloadSection >= 0 && commercialCta >= 0);
  assert.ok(
    downloadSection < commercialCta,
    "free reuse terms and downloads must be visible before the commercial route-review CTA",
  );
  assert.match(component, /id="licence"/);
  assert.match(visibleCopy, /including commercially/);
  assert.match(visibleCopy, /do not imply endorsement/);
  assert.match(visibleCopy, /Third-party names, trademarks, source pages and facts are not relicensed/);
  assert.match(actions, /download/);
  assert.match(actions, /page_language: locale/);
  assert.match(actions, /linkable_asset_download_clicked/);
  assert.match(actions, /linkable_asset_citation_copied/);
  assert.match(analytics, /\| "linkable_asset_download_clicked"/);
  assert.match(analytics, /\| "linkable_asset_citation_copied"/);
});

test("the bespoke map publishes full ZH and KO equivalents with localized graphics", async () => {
  const [metadataSource, zhSource, koSource, route, component, i18n, builder, registry] =
    await Promise.all([
      source("content/guides/first-trip-china-airport-station-stay-map/metadata.json"),
      source("content/guides/first-trip-china-airport-station-stay-map/asset-copy.zh.json"),
      source("content/guides/first-trip-china-airport-station-stay-map/asset-copy.ko.json"),
      source("app/(localized)/[locale]/guides/first-trip-china-airport-station-stay-map/page.tsx"),
      source("components/FirstTripTenCityMapPage.tsx"),
      source("lib/firstTripTenCityMapI18n.ts"),
      source("tools/build-first-trip-ten-city-assets.mjs"),
      source("lib/guideRegistry.ts"),
    ]);
  const metadata = JSON.parse(metadataSource);
  const en = JSON.parse(await source(dataPath));
  const zh = JSON.parse(zhSource);
  const ko = JSON.parse(koSource);

  assert.deepEqual(Object.keys(metadata.locales), ["en", "zh", "ko"]);
  assert.equal(metadata.locales.zh.path, "/zh/guides/first-trip-china-airport-station-stay-map/");
  assert.equal(metadata.locales.ko.path, "/ko/guides/first-trip-china-airport-station-stay-map/");
  assert.match(metadata.locales.zh.description, /机场|火车站|住宿区域/u);
  assert.match(metadata.locales.ko.description, /공항|기차역|숙박/u);
  assert.deepEqual(zh.cities.map((city) => city.id), en.cities.map((city) => city.id));
  assert.deepEqual(ko.cities.map((city) => city.id), en.cities.map((city) => city.id));
  assert.deepEqual(zh.sources.map((item) => item.id), en.sources.map((item) => item.id));
  assert.deepEqual(ko.sources.map((item) => item.id), en.sources.map((item) => item.id));
  assert.match(route, /localizedLocale/);
  assert.match(route, /FirstTripTenCityMapPage locale=\{locale\}/);
  assert.match(route, /hero-1600\.\$\{locale\}\.webp/);
  assert.match(route, /openGraph:[\s\S]*images:[\s\S]*localizedHero/);
  assert.match(route, /twitter:[\s\S]*images:[\s\S]*localizedHero/);
  assert.match(component, /getGuideLanguagePaths\(guide\.id\)/);
  assert.match(component, /getGuideEntry\(FIRST_TRIP_TEN_CITY_GUIDE_ID, locale\)/);
  assert.match(component, /heroImagePath\(locale\)/);
  assert.match(component, /spotlightImagePath\(spotlightIds\[index\], locale\)/);
  assert.match(i18n, /不要只看到城市名就决定住哪里/u);
  assert.match(i18n, /도시 이름만 보고 중국 숙소를 고르지 마세요/u);
  assert.match(builder, /localizedNationalMap/);
  assert.match(builder, /localizedCityCard/);
  assert.match(builder, /descriptionLines\s*=\s*wrapLocalizedText/);
  assert.match(builder, /svgTextLines\(descriptionLines,\s*198,\s*descriptionY,\s*22\)/);
  assert.match(registry, /localizedTenCityMapHero/);
  assert.match(registry, /hero-1600\.\$\{locale\}\.webp/);
  assert.match(
    registry,
    /const cardImagePath\s*=\s*localizedTenCityMapHero\s*\?\?/u,
  );
  assert.match(registry, /return \{[\s\S]*\n\s*cardImagePath,/u);

  const localizedImages = ["zh", "ko"].flatMap((locale) => [
    `${imageRoot}hero-1600.${locale}.webp`,
    ...["beijing", "shanghai", "zhangjiajie"].map(
      (city) => `${imageRoot}${city}-card-1200.${locale}.webp`,
    ),
  ]);
  await Promise.all(localizedImages.map((file) => access(new URL(file, projectRoot))));
});

test("the reusable map feature is wired into every homepage and the indexed transport article", async () => {
  const [feature, homepage, transport] = await Promise.all([
    source("components/TenCityMapFeature.tsx"),
    source("components/HomegroundHomePage.tsx"),
    source("components/TransportGuidePage.tsx"),
  ]);

  assert.match(feature, new RegExp(`/guides/first-trip-china-airport-station-stay-map/`));
  assert.match(feature, new RegExp(`/downloads/${filePrefix}\\.zip`));
  assert.doesNotMatch(feature, /rel="license"/);
  assert.match(feature, /CC BY 4\.0/);
  assert.match(homepage, /<TenCityMapFeature[\s\S]*?locale=\{locale\}[\s\S]*?placement="homepage"/);
  assert.match(transport, /<TenCityMapFeature[\s\S]*?locale=\{locale\}[\s\S]*?placement="article"/);
});
