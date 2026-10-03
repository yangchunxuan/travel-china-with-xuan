import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) => readFile(path.join(projectRoot, relativePath), "utf8");

const sightsModule = await import("../../lib/sights.ts");
const { getSightsCopy } = await import("../../lib/sightsI18n.ts");
const { attractionReservationRules } = await import("../../lib/attractionReservations.ts");
const { getPublishedPrivateTourCatalog } = await import("../../lib/publishedPrivateTourCatalog.ts");
const locales = ["en", "zh", "ko"];

test("Must-see Sights is the Destinations menu's third row, with a hub and one page per sight in three languages", async () => {
  assert.deepEqual(sightsModule.sightsPath, { en: "/sights/", zh: "/zh/sights/", ko: "/ko/sights/" });
  assert.equal(sightsModule.sightPath("great-wall", "ko"), "/ko/sights/great-wall/");
  const [nav, registry, sitemap, exportCheck, route] = await Promise.all([
    source("lib/homegroundNavigationModel.ts"),
    source("lib/legacySystemContentAdapter.ts"),
    source("app/sitemap.ts"),
    source("tools/check-search-platform-export.mjs"),
    source("app/(localized)/[locale]/sights/[sight]/page.tsx"),
  ]);
  assert.match(nav, /sights: \{\s*label: "必去景点",[\s\S]{0,120}pathSegment: "sights\/"/);
  assert.match(registry, /inspirationNode\("must-see-sights", "hub-explore"/);
  assert.match(sitemap, /entry\.contentId === "must-see-sights"/);
  assert.match(exportCheck, /a sight page is either noindex or in the sitemap/);
  assert.match(route, /dynamicParams = false/);
});

test("every sight names real reservation rules, a guide with a folder, published tours and copy in every language", async () => {
  const ruleIds = new Set(attractionReservationRules.map((rule) => rule.id));
  const seenRules = new Set();
  for (const sight of sightsModule.sights) {
    for (const id of sight.reservationIds) {
      assert.ok(ruleIds.has(id), `${sight.id}: reservation rule ${id} exists`);
      assert.ok(!seenRules.has(id), `${id} belongs to one sight only`);
      seenRules.add(id);
    }
    await access(path.join(projectRoot, "content/guides", sight.guideId, "metadata.json"));
    assert.ok(sightsModule.sightCityIds.includes(sight.city), `${sight.id}: city is listed on the hub`);
    for (const locale of locales) {
      const published = new Set(getPublishedPrivateTourCatalog(locale).map((item) => item.slug));
      for (const slug of sight.tourSlugs) assert.ok(published.has(slug), `${sight.id} (${locale}): ${slug} is published`);
      const copy = getSightsCopy(locale).sights[sight.id];
      assert.ok(copy?.name && copy?.line, `${sight.id} (${locale}): name and line`);
    }
  }
  assert.deepEqual(sightsModule.sights.map((sight) => sight.id), [...sightsModule.sightIds]);
});

test("sight pages stay out of search until their writing is in, and the copy publishes no fixed fee or train tickets", async () => {
  const [metadata, registry] = await Promise.all([source("lib/sightsMetadata.ts"), source("lib/legacySystemContentAdapter.ts")]);
  assert.match(metadata, /robots: sight\?\.ready \? \{ index: true, follow: true \} : \{ index: false, follow: true \}/);
  assert.match(registry, /blockReason: "Framework page: indexed once the sight's own writing is added\."/);
  for (const locale of locales) {
    const all = JSON.stringify(getSightsCopy(locale));
    // The fee comes from the reservation service's own formatter, never typed into copy.
    assert.doesNotMatch(all, /[¥$₩]\s?\d|\d+\s*(?:元|원|USD|CNY)/u, `${locale}: no typed price`);
    assert.doesNotMatch(all, /train ticket|火车票|高铁票|12306|기차표/iu, `${locale}: no train tickets`);
  }
});

test("the pages reuse the Destinations parts and booking rules, and reveal once", async () => {
  const [pages, css] = await Promise.all([source("components/SightsPages.tsx"), source("components/SightsPages.module.css")]);
  assert.match(pages, /from "\.\/DestinationParts"/);
  // Each bookable rule books itself; the hero books directly only when there is one.
  assert.match(pages, /href=\{attractionReservationHref\(locale, rule\.id\)\}/);
  assert.match(pages, /offered\.length === 1\s*\? \{ href: attractionReservationHref\(locale, offered\[0\]\.id\)/);
  assert.match(pages, /lead="attraction-tickets"/);
  assert.match(pages, /omit=\{\["attraction-tickets"\]\}/);
  assert.match(pages, /names an unpublished tour/);
  assert.equal((pages.match(/pageContext="destination"/g) ?? []).length, 4);
  assert.match(pages, /<RevealOnce \/>/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});
