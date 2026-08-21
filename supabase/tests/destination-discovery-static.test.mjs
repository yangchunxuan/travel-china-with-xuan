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

test("only the explore and cities-neighborhoods surfaces mount destination discovery", async () => {
  const [component, exploreSurface, collectionSurface] = await Promise.all([
    source("components/DestinationHubDiscovery.tsx"),
    source("components/SearchPlatformHubPage.tsx"),
    source("components/SearchCollectionHubPage.tsx"),
  ]);

  assert.match(component, /getSearchCollection\("explore-cities-neighborhoods"\)/);
  assert.match(component, /destinationHubRegistry\.map\(\(hub\) =>/);
  assert.match(component, /const hubCopy = hub\.locales\[locale\]/);
  assert.match(component, /<Link className=\{styles\.card\} href=\{hubCopy\.path\}>/);
  assert.match(component, /\{hubCopy\.navTitle\}/);
  assert.match(component, /\{hubCopy\.title\}/);
  assert.match(component, /\{hubCopy\.description\}/);
  assert.doesNotMatch(component, /const labels\s*=/);

  assert.match(exploreSurface, /section === "explore" \? \(/);
  assert.match(exploreSurface, /headingId="explore-destination-hubs-title"/);
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
  assert.match(
    collectionSurface,
    /headingId="collection-title"[\s\S]*?showIntro=\{false\}/,
  );
});

test("destination discovery is semantic, keyboard-visible and responsive", async () => {
  const [component, styles] = await Promise.all([
    source("components/DestinationHubDiscovery.tsx"),
    source("components/DestinationHubDiscovery.module.css"),
  ]);

  assert.match(component, /<section[\s\S]*?aria-labelledby=\{headingId\}/);
  assert.match(component, /<nav aria-labelledby=\{headingId\}>/);
  assert.match(component, /<ul className=\{styles\.grid\}>/);
  assert.match(component, /<li key=\{hub\.id\}>/);
  assert.match(component, /const HubTitle = showIntro \? "h3" : "h2"/);
  assert.match(component, /<HubTitle>\{hubCopy\.title\}<\/HubTitle>/);
  assert.match(styles, /\.card h2,\s*\.card h3/);
  assert.match(styles, /\.card:focus-visible\s*\{[\s\S]*?outline:\s*3px solid/);
  assert.match(styles, /grid-template-columns:\s*repeat\(5, minmax\(0, 1fr\)\)/);
  assert.match(styles, /@media \(max-width: 600px\)[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(styles, /overflow-wrap:\s*anywhere/);
});
