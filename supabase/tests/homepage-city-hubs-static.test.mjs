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

test("homepage city discovery consumes the complete published hub registry", async () => {
  const [homepage, editorial, registry, englishPage, localizedPage, labPage] =
    await Promise.all([
      source("components/HomegroundHomePage.tsx"),
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
  assert.match(homepage, /destinationHubItems\.map\(\(city\) =>/);
  assert.match(homepage, /<a[\s\S]*?href=\{city\.href\}/);
  assert.match(homepage, /<nav aria-label=\{copy\.cities\.listLabel\}>/);
  assert.match(homepage, /<ul className=\{styles\.cityHubList\}>/);
  assert.match(homepage, /<li key=\{city\.id\}>/);
  assert.doesNotMatch(homepage, /destinations\/(?:guilin|shenzhen)/);
});

test("homepage city discovery has useful copy and keyboard-visible links in every language", async () => {
  const styles = await source("components/HomegroundHomePage.module.css");

  for (const locale of ["en", "zh", "ko"]) {
    const cities = getHomegroundCopy(locale).cities;
    assert.ok(cities.eyebrow.trim().length > 0);
    assert.ok(cities.title.trim().length > 0);
    assert.ok(cities.intro.trim().length > 0);
    assert.ok(cities.listLabel.trim().length > 0);
  }

  assert.match(styles, /\.cityHubList\s*\{[\s\S]*?list-style:\s*none/);
  assert.match(styles, /\.cityHubLink:focus-visible\s*\{[\s\S]*?outline:/);
  assert.match(
    styles,
    /@media \(max-width: 820px\)[\s\S]*?\.cityHubList\s*\{[\s\S]*?repeat\(2, minmax\(0, 1fr\)\)/,
  );
  assert.match(styles, /\.cityHubLink span\s*\{[\s\S]*?overflow-wrap:\s*anywhere/);
});
