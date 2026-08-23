import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { getHomegroundCopy } from "../../lib/homegroundI18n.ts";

const projectRoot = new URL("../../", import.meta.url);
const source = (relativePath) =>
  readFile(new URL(relativePath, projectRoot), "utf8");

const expectedHubIds = [
  "beijing",
  "shanghai",
  "xian",
  "chengdu",
  "guangzhou",
  "hangzhou",
  "zhangjiajie",
  "chongqing",
];

test("the homepage footer consumes the complete published hub registry", async () => {
  const [homepage, footer, editorial, registry, englishPage, localizedPage, labPage] =
    await Promise.all([
      source("components/HomegroundHomePage.tsx"),
      source("components/HomegroundFooter.tsx"),
      source("lib/homepageEditorial.ts"),
      source("lib/destinationHubs.ts"),
      source("app/(default)/page.tsx"),
      source("app/(localized)/[locale]/page.tsx"),
      source("app/(lab)/planning-scope-lab/full/[locale]/page.lab.tsx"),
    ]);

  const idBlock = registry.match(
    /export const destinationHubIds = \[([\s\S]*?)\] as const/,
  );
  assert.ok(idBlock, "the destination registry must expose its reviewed IDs");
  assert.deepEqual(
    [...idBlock[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]),
    expectedHubIds,
  );

  assert.match(editorial, /destinationHubIds\.map\(\(id\) =>/);
  assert.match(editorial, /getDestinationHubEntry\(id, locale\)/);
  assert.match(editorial, /label: hub\.navTitle/);
  assert.match(editorial, /href: hub\.canonicalPath/);
  assert.doesNotMatch(
    editorial,
    /const\s+homepageDestinationHubIds\s*=/,
    "homepage discovery must not maintain a second city allow-list",
  );

  assert.match(
    englishPage,
    /destinationHubItems=\{getHomepageDestinationHubItems\("en"\)\}/,
  );
  assert.match(
    localizedPage,
    /destinationHubItems=\{getHomepageDestinationHubItems\(locale\)\}/,
  );
  assert.match(
    labPage,
    /destinationHubItems=\{getHomepageDestinationHubItems\(locale\)\}/,
  );
  assert.match(homepage, /destinationHubItems=\{destinationHubItems\}/);
  assert.match(homepage, /variant="homepage"/);
  assert.doesNotMatch(homepage, /destinationHubItems\.map\(\(city\) =>/);
  assert.doesNotMatch(homepage, /<section[\s\S]{0,160}id="destinations"/);
  assert.match(footer, /destinationHubItems\.map\(\(city\) =>/);
  assert.match(footer, /<a href=\{city\.href\}>\{city\.label\}<\/a>/);
  assert.match(footer, /aria-label=\{copy\.cities\.listLabel\}/);
  assert.match(footer, /id="destinations"/);
  assert.match(footer, /id="homepage-city-hubs-title"/);
  assert.match(footer, /<li key=\{city\.id\}>/);
  assert.doesNotMatch(homepage, /destinations\/(?:guilin|shenzhen)/);
});

test("homepage footer city discovery has localized labels and keyboard-visible links", async () => {
  const styles = await source("components/HomepageFooter.module.css");

  for (const locale of ["en", "zh", "ko"]) {
    const cities = getHomegroundCopy(locale).cities;
    assert.ok(cities.eyebrow.trim().length > 0);
    assert.ok(cities.title.trim().length > 0);
    assert.ok(cities.intro.trim().length > 0);
    assert.ok(cities.listLabel.trim().length > 0);
  }

  assert.match(styles, /\.navGrid ul,[\s\S]*?list-style:\s*none/);
  assert.match(styles, /\.navGrid a:focus-visible[\s\S]*?outline:/);
  assert.match(
    styles,
    /@media \(max-width: 39\.999rem\)[\s\S]*?\.navGrid\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\)/,
  );
  assert.match(styles, /\.navGrid a,[\s\S]*?overflow-wrap:\s*anywhere/);
});
