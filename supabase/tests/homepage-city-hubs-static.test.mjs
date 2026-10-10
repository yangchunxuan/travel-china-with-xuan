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
  // The homepage passes the registry-built list; other pages fall back to the
  // light mirror in lib/footerDestinationLinks.ts (checked below).
  assert.match(
    footer,
    /destinationHubItems\.length > 0\s*\? destinationHubItems\s*: footerDestinationLinks\[locale\]/,
  );
  assert.match(footer, /cityLinks\.map\(\(city\) =>/);
  assert.match(footer, /<Link href=\{city\.href\}>\{city\.label\}<\/Link>/);
  assert.match(footer, /aria-label=\{copy\.cities\.listLabel\}/);
  assert.match(footer, /id=\{isHomepage \? "destinations" : undefined\}/);
  assert.match(footer, /id=\{isHomepage \? "homepage-city-hubs-title" : undefined\}/);
  assert.match(footer, /<li key=\{city\.id\}>/);
  assert.doesNotMatch(homepage, /destinations\/(?:guilin|shenzhen)/);
});

test("the footer on every other page links the same city hubs as the registry", async () => {
  // The footer is a client component on every page, so it reads a light list
  // instead of importing the destination catalogue. This keeps the two equal.
  const [registry, links, footer] = await Promise.all([
    source("lib/destinationHubs.ts"),
    source("lib/footerDestinationLinks.ts"),
    source("components/HomegroundFooter.tsx"),
  ]);

  const rows = [...links.matchAll(/\["([a-z]+)", "([^"]+)", "([^"]+)", "([^"]+)"\]/g)].map(
    ([, id, en, zh, ko]) => ({ id, en, zh, ko }),
  );
  assert.deepEqual(rows.map((row) => row.id), expectedHubIds);

  // The registry lists each hub's navTitle in the order en, zh, ko.
  const navTitles = [...registry.matchAll(/navTitle: "([^"]+)"/g)].map((match) => match[1]);
  assert.equal(navTitles.length, expectedHubIds.length * 3);
  rows.forEach((row, index) => {
    assert.deepEqual(
      [row.en, row.zh, row.ko],
      navTitles.slice(index * 3, index * 3 + 3),
      `${row.id}: footer labels must equal the registry's navTitle values`,
    );
  });

  // Same path rule as hubPath() in the registry.
  assert.match(registry, /locale === "en"\s*\? `\/destinations\/\$\{id\}\/`\s*: `\/\$\{locale\}\/destinations\/\$\{id\}\/`/);
  assert.match(links, /prefix[^=]*= \{ en: "", zh: "\/zh", ko: "\/ko" \}/);
  assert.match(links, /href: `\$\{prefix\[locale\]\}\/destinations\/\$\{city\[0\]\}\/`/);

  assert.match(footer, /from "\.\.\/lib\/footerDestinationLinks"/);
  assert.doesNotMatch(footer, /from "\.\.\/lib\/destinationHubs"/);
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
