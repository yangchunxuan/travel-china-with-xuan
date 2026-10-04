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

test("every sight names real reservation rules, a real guide or its own photo, published tours and copy in every language", async () => {
  const ruleIds = new Set(attractionReservationRules.map((rule) => rule.id));
  const seenRules = new Set();
  const componentGuides = await source("lib/guideRegistry.ts");
  const provenance = await source("docs/homeground-photo-provenance.md");
  const guideExists = (id) => access(path.join(projectRoot, "content/guides", id, "metadata.json")).then(() => true, () => componentGuides.includes(`id: "${id}"`));
  for (const sight of sightsModule.sights) {
    for (const id of sight.reservationIds) {
      assert.ok(ruleIds.has(id), `${sight.id}: reservation rule ${id} exists`);
      assert.ok(!seenRules.has(id), `${id} belongs to one sight only`);
      seenRules.add(id);
    }
    if (sight.guideId) assert.ok(await guideExists(sight.guideId), `${sight.id}: guide ${sight.guideId} exists`);
    // A sight without its own guide yet carries its own photo.
    else assert.ok(sight.image, `${sight.id}: no guide, so it carries its own photo`);
    if (sight.image) {
      await access(path.join(projectRoot, "public", sight.image.src));
      for (const locale of locales) assert.ok(sight.image.alt[locale], `${sight.id} (${locale}): photo alt`);
      // An openly licensed photo names its author, licence and source (shown under the photo).
      const credit = sight.image.credit;
      if (credit) for (const key of ["author", "license", "licenseUrl", "sourceUrl"]) assert.ok(credit[key], `${sight.id}: credit ${key}`);
    }
    // A guide photo under an attribution licence (per the provenance log) carries its credit onto every card.
    if (!sight.image && sight.guideId) {
      const logged = provenance.split("\n").find((line) => line.includes(`\`${sight.guideId}\``) && line.includes("commons.wikimedia.org"));
      if (logged && /CC BY/u.test(logged)) {
        for (const key of ["author", "license", "licenseUrl", "sourceUrl"]) assert.ok(sight.photoCredit?.[key], `${sight.id}: borrowed CC photo credit ${key}`);
      }
    }
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

test("a sight's own writing is complete in all three languages, dates slowly, and comes before the booking facts", async () => {
  const { sightStories } = await import("../../lib/sightStories.ts");
  const ids = new Set(sightsModule.sights.map((sight) => sight.id));
  for (const [id, byLocale] of Object.entries(sightStories)) {
    assert.ok(ids.has(id), `${id}: a story for an unknown sight`);
    for (const locale of locales) {
      const story = byLocale[locale];
      assert.ok(story, `${id}: ${locale} story`);
      assert.ok(story.description.length >= 40, `${id} ${locale}: a real search description`);
      assert.ok(story.why.length >= 2 && story.why.length <= 3, `${id} ${locale}: two or three paragraphs on why`);
      assert.equal(story.highlights.length, 3, `${id} ${locale}: three things not to miss`);
      for (const field of ["time", "when", "pair", "skip"]) assert.ok(story[field].trim(), `${id} ${locale}: ${field}`);
      // Hours, prices and booking steps belong to the reservation rules and the guides.
      const text = JSON.stringify(story);
      assert.doesNotMatch(text, /(¥|CNY|RMB|元\b|위안\s*\d|\d{1,2}:\d{2})/u, `${id} ${locale}: no prices or clock times`);
    }
    // The same three highlights, in the same order, in every language.
    assert.equal(new Set(locales.map((locale) => byLocale[locale].highlights.length)).size, 1);
  }
  // A sight is indexed only once its writing is in.
  for (const sight of sightsModule.sights) {
    if (sight.ready) assert.ok(sightStories[sight.id], `${sight.id} is ready but has no story`);
  }
  const page = await source("components/SightsPages.tsx");
  assert.ok(page.indexOf("<SightStorySections") < page.indexOf('id={bookingAnchor}'), "the story sits above the booking facts");
});

test("a story's FAQ and sources are complete, and the FAQ markup is the visible FAQ", async () => {
  const { sightStories, sightStoryMeta } = await import("../../lib/sightStories.ts");
  for (const [id, byLocale] of Object.entries(sightStories)) {
    const counts = locales.map((locale) => byLocale[locale].faq?.length ?? 0);
    assert.equal(new Set(counts).size, 1, `${id}: the same number of questions in every language`);
    if (counts[0]) {
      assert.ok(counts[0] >= 4 && counts[0] <= 6, `${id}: four to six questions`);
      for (const locale of locales) {
        for (const item of byLocale[locale].faq) {
          assert.match(item.question, /[?？]$/u, `${id} ${locale}: a question ends with a question mark`);
          assert.ok(item.answer.length >= 40, `${id} ${locale}: a real answer`);
        }
      }
      const meta = sightStoryMeta[id];
      assert.ok(meta, `${id}: a story with an FAQ also has its sources and review date`);
      assert.match(meta.reviewedAt, /^\d{4}-\d{2}-\d{2}$/u);
      assert.ok(meta.sources.length >= 3 && meta.sources.every((source) => /^https:\/\//u.test(source.url)), `${id}: three or more https sources`);
    }
  }
  const page = await source("components/SightsPages.tsx");
  // The FAQPage markup is built from the same story.faq the page renders.
  assert.match(page, /"@type": "FAQPage"[\s\S]{0,120}story\.faq\.map/u);
  assert.match(page, /story\.faq\.map\(\(item\) => \(\s*<details/u);
});
