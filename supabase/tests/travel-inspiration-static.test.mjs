import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) => readFile(path.join(projectRoot, relativePath), "utf8");

const inspiration = await import("../../lib/travelInspiration.ts");
const { getTravelInspirationCopy } = await import("../../lib/travelInspirationI18n.ts");
const { getPublishedPrivateTourCatalog } = await import("../../lib/publishedPrivateTourCatalog.ts");
// destinationHubs.ts imports values without the .ts suffix, so read its ids from source.
const destinationHubIds = [...(await readFile(path.join(projectRoot, "lib/destinationHubs.ts"), "utf8"))
  .match(/export const destinationHubIds = \[([\s\S]*?)\] as const;/)[1]
  .matchAll(/"([a-z-]+)"/g)].map((match) => match[1]);
const locales = ["en", "zh", "ko"];

test("travel inspiration has a hub and theme pages in three languages, wired into nav, registry, sitemap and export check", async () => {
  assert.deepEqual(inspiration.travelInspirationPath, { en: "/inspiration/", zh: "/zh/inspiration/", ko: "/ko/inspiration/" });
  assert.equal(inspiration.travelInspirationThemePath("first-time-in-china", "ko"), "/ko/inspiration/first-time-in-china/");
  const [nav, registry, sitemap, exportCheck, enHub, enTheme, localizedTheme] = await Promise.all([
    source("lib/homegroundNavigationModel.ts"),
    source("lib/legacySystemContentAdapter.ts"),
    source("app/sitemap.ts"),
    source("tools/check-search-platform-export.mjs"),
    source("app/(default)/inspiration/page.tsx"),
    source("app/(default)/inspiration/[theme]/page.tsx"),
    source("app/(localized)/[locale]/inspiration/[theme]/page.tsx"),
  ]);
  assert.match(nav, /inspiration: \{\s*label: "旅行灵感",[\s\S]{0,120}pathSegment: "inspiration\/"/);
  assert.match(registry, /inspirationNode\("travel-inspiration", "hub-explore"/);
  assert.match(sitemap, /entry\.contentId === "travel-inspiration"/);
  assert.match(exportCheck, /travel inspiration page is missing from sitemap\.xml/);
  assert.match(enHub, /<TravelInspirationHubPage locale="en" \/>/);
  assert.match(enTheme, /travelInspirationThemeIds\.map\(\(theme\) => \(\{ theme \}\)\)/);
  assert.match(localizedTheme, /dynamicParams = false/);
  // The city index links it too: phones under 650px tall hide the menu rows.
  assert.match(await source("components/DestinationsHubPage.tsx"), /<Link href=\{travelInspirationPath\[locale\]\}>/);
});

test("every theme names only published tours and real cities, with copy for each group in every language", () => {
  for (const locale of locales) {
    const published = new Set(getPublishedPrivateTourCatalog(locale).map((item) => item.slug));
    const copy = getTravelInspirationCopy(locale);
    for (const theme of inspiration.travelInspirationThemes) {
      assert.match(theme.image.src, /^\/images\/.+\.webp$/u, `${theme.id}: a local photo`);
      assert.ok(copy.themes[theme.id].imageAlt, `${theme.id} (${locale}): photo alt text`);
      const slugs = theme.tourGroups.flatMap((group) => group.tourSlugs);
      assert.equal(new Set(slugs).size, slugs.length, `${theme.id}: no tour is listed twice`);
      for (const slug of slugs) assert.ok(published.has(slug), `${theme.id} (${locale}): ${slug} is published`);
      for (const city of theme.cityIds) assert.ok(destinationHubIds.includes(city), `${theme.id}: ${city} has a city page`);
      const themeCopy = copy.themes[theme.id];
      for (const group of theme.tourGroups) {
        assert.ok(themeCopy.groups[group.id]?.title, `${theme.id} (${locale}): group "${group.id}" has a title`);
      }
    }
    for (const city of destinationHubIds) assert.ok(copy.cities[city], `${locale}: ${city} has a line`);
  }
});

test("inspiration copy publishes no price and sells no train tickets; prices stay on the tour pages", () => {
  for (const locale of locales) {
    const all = JSON.stringify(getTravelInspirationCopy(locale));
    assert.doesNotMatch(all, /\d+\s*(?:USD|CNY|元|위안|원)|[¥$₩]\s?\d/u, `${locale}: no price`);
    assert.doesNotMatch(all, /train ticket|火车票|高铁票|12306|기차표/iu, `${locale}: no train tickets`);
  }
});

test("the pages sit under Destinations, reveal once and keep prices out of their schema", async () => {
  const [pages, css] = await Promise.all([
    source("components/TravelInspirationPages.tsx"),
    source("components/TravelInspiration.module.css"),
  ]);
  assert.equal((pages.match(/pageContext="destination"/g) ?? []).length, 4, "header and footer on both pages");
  assert.match(pages, /<RevealOnce \/>/);
  assert.match(pages, /names an unpublished tour/);
  assert.doesNotMatch(pages, /priceSpecification|priceCurrency|startingPrice/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /\.page \[data-reveal="pending"\] li \{/);
});

test("nothing is written on a photo: tour, sight and theme cards hold the image alone", async () => {
  const [parts, sightsPage, inspirationPage, styles] = await Promise.all([
    readFile(path.join(projectRoot, "components/DestinationParts.tsx"), "utf8"),
    readFile(path.join(projectRoot, "components/SightsPages.tsx"), "utf8"),
    readFile(path.join(projectRoot, "components/TravelInspirationPages.tsx"), "utf8"),
    readFile(path.join(projectRoot, "components/TravelInspiration.module.css"), "utf8"),
  ]);
  const mediaHoldsOnlyTheImage = (source, mediaClass) => {
    const blocks = [...source.matchAll(new RegExp(`<span className=\\{\\w+\\.${mediaClass}\\}>([\\s\\S]*?)\\n\\s*</span>`, "gu"))];
    assert.ok(blocks.length > 0, `${mediaClass} is rendered`);
    for (const [, inner] of blocks) {
      assert.match(inner.trim(), /^<img[\s\S]*\/>$/u, `${mediaClass} holds an <img> and nothing else`);
    }
  };
  mediaHoldsOnlyTheImage(parts, "tourMedia");
  mediaHoldsOnlyTheImage(sightsPage, "sightMedia");
  mediaHoldsOnlyTheImage(inspirationPage, "themeMedia");
  assert.doesNotMatch(styles, /\.days|\.formatTag/u);
});
