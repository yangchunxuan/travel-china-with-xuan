import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { getGuideLanguagePaths, guideRegistry } from "../../lib/guideRegistry.ts";
import { localizeSpanishPrivateTourProduct } from "../../lib/localizeSpanishPrivateTourProduct.ts";
import { getPrivateTourProduct, localizePrivateTourProduct } from "../../lib/privateTourProducts.ts";
import {
  spanishGuidePathBySourceId,
  spanishTourPagePath,
  spanishTourPageSlugs,
} from "../../lib/spanishEditionIndex.ts";
import { spanishGuidePath, spanishGuides } from "../../lib/spanishGuides.ts";
import { getSpanishTourCopy, spanishTourPath, spanishTourSlugs } from "../../lib/spanishTourCopy.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

function spanishTour(slug) {
  const product = getPrivateTourProduct(slug);
  assert.ok(product, `no source product for ${slug}`);
  return { product, source: localizePrivateTourProduct(product, "en"), spanish: localizeSpanishPrivateTourProduct(product) };
}

test("the Spanish page index matches the Spanish tour copy and the Spanish guides", () => {
  assert.deepEqual([...spanishTourPageSlugs], [...spanishTourSlugs]);
  assert.deepEqual(
    { ...spanishGuidePathBySourceId },
    Object.fromEntries(
      spanishGuides
        .filter((guide) => guide.sourceGuideId)
        .map((guide) => [guide.sourceGuideId, spanishGuidePath(guide.slug)]),
    ),
  );
  // The guide registry carries its own copy of the list for the hreflang link.
  const registryLinks = Object.fromEntries(
    [...new Set(guideRegistry.map((guide) => guide.id))]
      .map((id) => [id, getGuideLanguagePaths(id).es])
      .filter(([, path]) => path),
  );
  assert.deepEqual(registryLinks, { ...spanishGuidePathBySourceId });
  for (const slug of spanishTourSlugs) assert.equal(spanishTourPagePath(slug), spanishTourPath(slug));
  assert.equal(spanishTourPagePath("harbin-winter-5-day-private-tour"), undefined);
});

test("every Spanish tour keeps the source days, photographs, options and published prices", () => {
  for (const slug of spanishTourSlugs) {
    const { source, spanish } = spanishTour(slug);
    assert.equal(spanish.path, `/es/tours/${slug}/`);
    assert.equal(spanish.itinerary.length, source.itinerary.length, slug);
    assert.deepEqual(spanish.itinerary.map((day) => day.day), source.itinerary.map((day) => day.day), slug);
    assert.deepEqual(
      spanish.routeMedia.map((group) => group.variants.map((variant) => variant.image.src)),
      source.routeMedia.map((group) => group.variants.map((variant) => variant.image.src)),
      slug,
    );
    assert.deepEqual(
      spanish.packages.map((item) => item.rows.map((row) => [row.travelers, row.amount, row.currency])),
      source.packages.map((item) => item.rows.map((row) => [row.travelers, row.amount, row.currency])),
      slug,
    );
    for (const row of spanish.packages.flatMap((item) => item.rows)) {
      assert.match(row.formatted, /^\d{1,3}(?:\.\d{3})* USD$/, `${slug}: ${row.formatted}`);
    }
  }
});

test("Spanish tour text quotes only this tour's published prices", () => {
  for (const slug of spanishTourSlugs) {
    const { spanish } = spanishTour(slug);
    const rows = spanish.packages.flatMap((item) => item.rows);
    const allowed = new Set(rows.map((row) => row.amount));
    for (const row of rows) if (row.travelers === 2) allowed.add(row.amount * 2);
    const text = JSON.stringify(getSpanishTourCopy(slug));
    const quoted = [...text.matchAll(/(\d{1,3}(?:\.\d{3})*) USD/g)].map((match) => Number(match[1].replaceAll(".", "")));
    for (const amount of quoted) assert.ok(allowed.has(amount), `${slug} quotes ${amount} USD, which is not a published price`);
    assert.doesNotMatch(text, /USD \d/, `${slug} writes the currency before the amount`);
  }
});

test("Spanish tours say which guide the price includes and never promise another language at the same price", () => {
  for (const slug of spanishTourSlugs) {
    const copy = getSpanishTourCopy(slug);
    assert.match(copy.serviceNote, /habla inglesa/, slug);
    assert.match(copy.serviceNote, /guía de habla hispana con suplemento/, slug);
    assert.doesNotMatch(JSON.stringify(copy), /coreano|Korean/i, slug);
  }
});

test("Spanish search titles and descriptions fit the result page", () => {
  for (const slug of spanishTourSlugs) {
    const copy = getSpanishTourCopy(slug);
    assert.ok(copy.metadataTitle.length <= 60, `${slug} title is ${copy.metadataTitle.length}`);
    assert.ok(copy.metadataDescription.length <= 160, `${slug} description is ${copy.metadataDescription.length}`);
  }
  for (const guide of spanishGuides) {
    assert.ok(guide.title.length <= 60, `${guide.slug} title is ${guide.title.length}`);
    assert.ok(guide.description.length <= 160, `${guide.slug} description is ${guide.description.length}`);
    assert.match(guide.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  }
});

test("Spanish guides link only to pages that exist and name their sources", () => {
  const spanishPaths = new Set([
    "/es/",
    "/es/tours/",
    "/es/guias/",
    ...spanishTourSlugs.map(spanishTourPath),
    ...spanishGuides.map((guide) => spanishGuidePath(guide.slug)),
  ]);
  for (const guide of spanishGuides) {
    assert.ok(guide.tourSlugs.length > 0, `${guide.slug} leads to no tour`);
    for (const slug of guide.tourSlugs) assert.ok(spanishTourSlugs.includes(slug), `${guide.slug} → ${slug}`);
    assert.ok(existsSync(resolve(root, "public", guide.heroImage.src.slice(1))), `${guide.slug} hero image`);
    const ids = guide.body.blocks.map((block) => block.id);
    assert.equal(new Set(ids).size, ids.length, `${guide.slug} repeats a block id`);
    assert.equal(guide.body.blocks[0].type, "lead");
    assert.ok(guide.body.blocks.some((block) => block.type === "faq"), `${guide.slug} has no FAQ`);
    const sources = guide.body.blocks.find((block) => block.type === "sources");
    assert.ok(sources && sources.items.length >= 3, `${guide.slug} has too few sources`);
    for (const block of guide.body.blocks) {
      if (block.type === "figure") {
        assert.ok(existsSync(resolve(root, "public", block.src.slice(1))), `${guide.slug}: ${block.src}`);
      }
      if (block.type !== "internal-links") continue;
      for (const item of block.items) {
        if (item.href.startsWith("/es/")) {
          assert.ok(spanishPaths.has(item.href), `${guide.slug} links a missing Spanish page: ${item.href}`);
        } else {
          // A link that leaves the Spanish pages says so.
          assert.match(item.label, /\(en inglés\)$/, `${guide.slug}: ${item.href}`);
        }
      }
    }
  }
});

test("the language switch offers Spanish on the home page, the lists, the guides with a Spanish page and every tour page", () => {
  const read = (file) => readFileSync(resolve(root, file), "utf8");
  const header = read("components/HomegroundHeader.tsx");
  // Once in the desktop switch and once in the mobile menu.
  assert.equal(header.match(/\{renderSpanishLanguageChoice\(\)\}/g)?.length, 2);
  assert.match(header, /const spanishLanguageHref = languagePaths\?\.es;/);
  assert.match(header, /hrefLang="es"\s+lang="es"/);
  assert.match(read("components/HomegroundHomePage.tsx"), /languagePaths=\{\{[^}]*es: "\/es\/"/);
  // A tour with a Spanish page opens it; any other tour opens the Spanish tour list.
  assert.match(
    read("components/ShanghaiJiangnanImaginePage.tsx"),
    /es: spanishTourPagePath\(product\.slug\) \?\? spanishSite\.tours,/,
  );
  const css = read("components/HomegroundHeader.module.css");
  assert.match(css, /\.mobileLanguageNav:has\(> a:nth-child\(5\)\)\s*\{\s*grid-template-columns: repeat\(5,/);
});
