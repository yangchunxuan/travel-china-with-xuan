import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { getGuideLanguagePaths, guideRegistry } from "../../lib/guideRegistry.ts";
import { attractionReservationEditionLocalSourceLabel, getAttractionReservationEditionCopy } from "../../lib/attractionReservationEditions.ts";
import { attractionReservationRules } from "../../lib/attractionReservations.ts";
import { spanishGuides } from "../../lib/spanishGuides.ts";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const editions = ["fr", "es", "de", "ar", "ja"];
/** How each edition tells the reader a link opens an English page. */
const englishMarker = { fr: /\(en anglais\)$/u, es: /\(en inglés\)$/u, de: /\(Englisch\)$/u, ar: /\(بالإنجليزية\)$/u, ja: /（英語）$/u };
const guideIds = new Set(guideRegistry.map((guide) => guide.id));

/** The guide's page in this language, when a link points to an English guide that has one. */
function localGuidePathFor(href, language) {
  const id = href.match(/^\/guides\/([^/]+)\/$/u)?.[1];
  return id && guideIds.has(id) ? getGuideLanguagePaths(id)[language] : undefined;
}

function assertLink(language, where, { href, label }) {
  const local = localGuidePathFor(href, language);
  assert.equal(local, undefined, `${language} ${where}: ${href} has a ${language} page at ${local}`);
  if (href.startsWith(`/${language}/`)) assert.doesNotMatch(label, englishMarker[language], `${language} ${where}: ${href} is not English`);
  else if (href.startsWith("/guides/")) assert.match(label, englishMarker[language], `${language} ${where}: ${href} is English`);
}

test("corporate trip pages link a guide in their own language once it is published", async () => {
  for (const language of editions) {
    const module = await import(`../../lib/corporateTravel.${language}.ts`);
    const trips = Object.values(module).find(Array.isArray);
    assert.ok(trips?.length, language);
    for (const trip of trips) for (const link of trip.relatedGuides) assertLink(language, trip.slug, link);
  }
});

test("Spanish guides link the Spanish edition of a guide once it is published", () => {
  for (const guide of spanishGuides) {
    for (const block of guide.body.blocks) {
      if (block.type !== "internal-links") continue;
      for (const item of block.items) assertLink("es", guide.slug, item);
    }
  }
});

test("the reservation service page links each source guide in the edition's language when there is one", async () => {
  const page = await readFile(path.join(projectRoot, "components/AttractionReservationsPage.tsx"), "utf8");
  assert.match(page, /getGuideLanguagePaths\(rule\.source\)\[editionLocale\]/u);
  assert.match(page, /href=\{localGuidePath \?\? guide\.canonicalPath\}/u);
  assert.match(page, /localGuidePath && editionLocale \? attractionReservationEditionLocalSourceLabel\[editionLocale\] : copy\.sourceLabel/u);

  const expected = {
    fr: ["forbidden-city", "li-river-cruise", "tiananmen-square"],
    de: ["forbidden-city", "li-river-cruise", "tiananmen-square"],
    ar: ["forbidden-city", "li-river-cruise", "tiananmen-square"],
    ja: ["forbidden-city", "li-river-cruise", "tiananmen-square"],
    es: ["chengdu-panda-base", "forbidden-city", "li-river-cruise", "terracotta-warriors", "tiananmen-square"],
  };
  for (const language of editions) {
    // At least these rows; another guide published in the language adds its row without a test change.
    const local = new Set(attractionReservationRules.filter((rule) => rule.source && getGuideLanguagePaths(rule.source)[language]).map((rule) => rule.id));
    for (const id of expected[language]) assert.ok(local.has(id), `${language}: ${id} has no ${language} guide`);
    // The English label keeps saying so; the local one does not.
    assert.match(getAttractionReservationEditionCopy(language).sourceLabel, /anglais|inglés|Englisch|الإنجليزية|英語/u, language);
    assert.doesNotMatch(attractionReservationEditionLocalSourceLabel[language], /anglais|inglés|Englisch|الإنجليزية|英語/u, language);
  }
});
