import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../../", import.meta.url);
const source = (relativePath) =>
  readFile(new URL(relativePath, projectRoot), "utf8");

test("destination discovery consumes every reviewed hub in every locale", async () => {
  const [registry, collections] = await Promise.all([
    source("lib/destinationHubs.ts"),
    source("lib/searchCollectionI18n.ts"),
  ]);

  const idBlock = registry.match(
    /export const destinationHubIds = \[([\s\S]*?)\] as const/,
  );
  assert.ok(idBlock);

  assert.deepEqual(
    [...idBlock[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]),
    ["beijing", "shanghai", "xian", "chengdu", "guangzhou", "hangzhou", "zhangjiajie", "chongqing"],
  );
  assert.match(
    registry,
    /return locale === "en"\s*\? `\/destinations\/\$\{id\}\/`\s*: `\/\$\{locale\}\/destinations\/\$\{id\}\/`/,
  );

  const collectionBlock = collections.match(
    /localized\(\s*"explore-cities-neighborhoods"[\s\S]*?\),\s*localized\(/,
  );
  assert.ok(collectionBlock);
  assert.equal([...collectionBlock[0].matchAll(/label:/g)].length, 3);
  assert.equal([...collectionBlock[0].matchAll(/title:/g)].length, 3);
  assert.equal([...collectionBlock[0].matchAll(/description:/g)].length, 3);

  for (const locale of ["en", "zh", "ko"]) {
    for (const id of ["beijing", "shanghai", "xian", "chengdu", "guangzhou", "hangzhou", "zhangjiajie", "chongqing"]) {
      const marker = `path: hubPath("${id}", "${locale}")`;
      const start = registry.indexOf(marker);
      assert.notEqual(start, -1, marker);
      const end = registry.indexOf("openGraphLocale:", start);
      assert.notEqual(end, -1, `${marker} openGraphLocale`);
      const localeBlock = registry.slice(start, end);
      assert.match(localeBlock, /title:/);
      assert.match(localeBlock, /description:/);
      assert.match(localeBlock, /navTitle:/);
    }
  }
});

test("the destination index owns city hubs while the article collection only hands back to it", async () => {
  const [destinationIndex, platformSurface, collectionSurface] = await Promise.all([
    source("components/DestinationsHubPage.tsx"),
    source("components/SearchPlatformHubPage.tsx"),
    source("components/SearchCollectionHubPage.tsx"),
  ]);

  assert.match(destinationIndex, /destinationHubRegistry\.map\(\(hub, index\) =>/);
  assert.match(destinationIndex, /<h3>\{city\.navTitle\}<\/h3>/);
  assert.doesNotMatch(
    destinationIndex,
    /getSearchHubGuides|GuideSearchForm|SearchSectionNavigator/,
  );
  assert.match(
    platformSurface,
    /if \(section === "explore"\) \{[\s\S]*?<DestinationsHubPage locale=\{locale\} \/>/,
  );
  assert.doesNotMatch(platformSurface, /<DestinationHubDiscovery/);
  assert.match(
    collectionSurface,
    /collectionId === "explore-cities-neighborhoods" \? \(/,
  );
  assert.match(
    collectionSurface,
    /<h1[\s\S]*?id="collection-title"[\s\S]*?renderCollectionTitle\(collectionCopy\.title, locale\)[\s\S]*?<\/h1>/,
  );
  assert.match(
    collectionSurface,
    /const chineseCityCollectionTitleSegments = \[[\s\S]*?"从街道和"[\s\S]*?"日常空间"[\s\S]*?"理解一座"[\s\S]*?"中国城市"/,
  );
  assert.match(collectionSurface, /className=\{styles\.titleSegment\}/);
  assert.match(collectionSurface, /<wbr \/>/);
  assert.match(
    collectionSurface,
    /className=\{locale === "zh" \? styles\.segmentedTitle : undefined\}/,
  );
  assert.match(collectionSurface, /className=\{styles\.directoryHandoff\}/);
  assert.match(collectionSurface, /\{ui\.cityDirectoryTitle\}/);
  assert.match(collectionSurface, /getSearchSectionPath\("explore", locale\)/);
  assert.doesNotMatch(collectionSurface, /DestinationHubDiscovery/);
});

test("destination discovery is semantic, keyboard-visible and responsive", async () => {
  const [component, styles] = await Promise.all([
    source("components/DestinationsHubPage.tsx"),
    source("components/DestinationsHubPage.module.css"),
  ]);

  assert.match(component, /<section className=\{styles\.cities\} aria-labelledby="city-hubs-title">/);
  assert.match(component, /<ol className=\{styles\.cityGrid\}>/);
  assert.match(component, /<li key=\{hub\.id\}>/);
  assert.match(component, /<Link href=\{city\.path\}>/);
  assert.match(styles, /\.cityGrid a:focus-visible[\s\S]*?outline:\s*3px solid/);
  assert.match(styles, /grid-template-columns:\s*repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(styles, /@media \(max-width: 48rem\)[\s\S]*?\.cityGrid,[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(styles, /@media \(max-width: 48rem\)[\s\S]*?\.hero \{[\s\S]*?padding-block:\s*1\.25rem 1\.8rem/);
  assert.match(styles, /@media \(max-width: 48rem\)[\s\S]*?\.scope ul \{[\s\S]*?grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(styles, /@media \(max-width: 48rem\)[\s\S]*?\.sectionIntro \{[\s\S]*?margin-block-end:\s*1\.35rem/);
  assert.match(styles, /overflow-wrap:\s*anywhere/);
});
