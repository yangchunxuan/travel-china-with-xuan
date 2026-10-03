import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) => readFile(path.join(projectRoot, relativePath), "utf8");

const collections = await import("../../lib/tourCollections.ts");
const { getTourCollectionsCopy } = await import("../../lib/tourCollectionsI18n.ts");
const { getPublishedPrivateTourCatalog } = await import("../../lib/publishedPrivateTourCatalog.ts");
const locales = ["en", "zh", "ko"];

test("Private Tours opens a menu of three collections, each a page in three languages", async () => {
  assert.deepEqual([...collections.tourCollectionIds], ["multi-city", "regions", "seasonal"]);
  assert.equal(collections.tourCollectionPath("multi-city", "ko"), "/ko/tours/multi-city/");
  const [nav, header, registry, sitemap, exportCheck] = await Promise.all([
    source("lib/homegroundNavigationModel.ts"),
    source("components/HomegroundHeader.tsx"),
    source("lib/legacySystemContentAdapter.ts"),
    source("app/sitemap.ts"),
    source("tools/check-search-platform-export.mjs"),
  ]);
  // "All private tours" first: on touch the first tap opens the menu, so the catalogue needs its own row.
  assert.match(nav, /homegroundTourNavigationIds = \[\s*"all-tours",\s*"multi-city",\s*"regions",\s*"seasonal",\s*\]/);
  assert.match(exportCheck, /The season's pick ended on/);
  assert.match(exportCheck, /if \(daysLeft < -14\) throw new Error/);
  assert.match(nav, /pathSegment: "tours\/multi-city\/"/);
  // "Private Tours" itself still opens the full catalogue.
  assert.match(nav, /label: "私家团",[\s\S]{0,120}pathSegment: "tours\/"/);
  assert.match(header, /pageContext === "tours" \|\| pageContext === "tour" \|\| pageContext === "tour-collection"/);
  assert.match(registry, /inspirationNode\(`tour-collection-\$\{id\}`, "tour-hub"/);
  assert.match(sitemap, /entry\.contentId\.startsWith\("tour-collection-"\)/);
  assert.match(exportCheck, /tour collection is missing from sitemap\.xml/);
  for (const id of collections.tourCollectionIds) {
    await source(`app/(default)/tours/${id}/page.tsx`);
    await source(`app/(localized)/[locale]/tours/${id}/page.tsx`);
  }
});

test("multi-city and regions together hold every published tour exactly once; the season names published tours", () => {
  for (const locale of locales) {
    const catalog = getPublishedPrivateTourCatalog(locale);
    // A collection folder must never shadow a tour's own URL.
    for (const id of collections.tourCollectionIds) assert.ok(!catalog.some((tour) => tour.slug === id), `${id} is not a tour slug`);
    const multi = collections.getTourCollectionGroups("multi-city", locale).flatMap((group) => group.tours.map((tour) => tour.slug));
    const regions = collections.getTourCollectionGroups("regions", locale).flatMap((group) => group.tours.map((tour) => tour.slug));
    const all = [...multi, ...regions];
    assert.equal(new Set(all).size, all.length, `${locale}: no tour twice`);
    assert.deepEqual(new Set(all), new Set(catalog.map((tour) => tour.slug)), `${locale}: every tour once`);
    const season = collections.getTourCollectionGroups("seasonal", locale);
    assert.ok(season[0].tours.length > 0);
    const copy = getTourCollectionsCopy(locale);
    for (const group of collections.getTourCollectionGroups("multi-city", locale)) {
      assert.ok(copy.collections["multi-city"].groups[group.id]?.title, `${locale}: ${group.id} has a title`);
    }
    for (const group of collections.getTourCollectionGroups("regions", locale)) assert.ok(group.label, `${locale}: ${group.id} has a region name`);
    assert.ok(copy.collections.seasonal.groups[collections.currentSeason.id]?.title, `${locale}: season has a title`);
  }
});

test("collections publish no price and no train tickets, and small groups say so in their names", async () => {
  for (const locale of locales) {
    const all = JSON.stringify(getTourCollectionsCopy(locale));
    assert.doesNotMatch(all, /[¥$₩]\s?\d|\d+\s*(?:元|원|USD|CNY)/u, `${locale}: no price`);
    assert.doesNotMatch(all, /train ticket|火车票|高铁票|12306|기차표/iu, `${locale}: no train tickets`);
  }
  const [parts, pages] = await Promise.all([source("components/DestinationParts.tsx"), source("components/TourCollectionsPages.tsx")]);
  // Nothing is written on a photo; a small group says so in its own name.
  for (const locale of locales) {
    for (const tour of getPublishedPrivateTourCatalog(locale).filter((item) => item.tourFormat === "small-group")) {
      assert.match(tour.title, /Small-Group|小团|소규모 그룹/u, `${locale}: ${tour.slug} names itself a small group`);
    }
  }
  // Each collection links the other ways in (phones that hide the menu rows still reach them).
  assert.match(pages, /menus\.tours\?\.entries \?\? \[\]\)\.filter\(\(entry\) => entry\.id !== collectionId\)/);
  assert.match(pages, /pageContext="tour-collection"/);
  assert.doesNotMatch(pages, /priceSpecification|priceCurrency|startingPrice/);
});
