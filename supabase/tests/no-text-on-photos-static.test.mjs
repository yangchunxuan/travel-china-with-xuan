import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) => readFile(path.join(projectRoot, relativePath), "utf8");

// The owner's rule: nothing is written or stamped on a photo, in any corner.
// Facts, numbers and credits go in the text beside or below it.

test("the visa-free guides carry no policy stamp, and their photo credit sits below the photo", async () => {
  for (const country of ["Canada", "Nz", "Uk"]) {
    const [page, styles] = await Promise.all([
      source(`components/${country}VisaFreeGuidePage.tsx`),
      source(`components/${country}VisaFreeGuidePage.module.css`),
    ]);
    assert.doesNotMatch(page, /policyStamp/u, `${country}: no stamp on the hero photo`);
    assert.doesNotMatch(styles, /policyStamp/u, `${country}: no stamp styles left`);
    const caption = styles.match(/\.heroVisual figcaption \{([^}]*)\}/u)?.[1] ?? "";
    assert.ok(caption, `${country}: the caption is styled`);
    assert.doesNotMatch(caption, /position:\s*absolute/u, `${country}: the caption is not laid over the photo`);
    // The 30 days and the entry deadline the stamp carried are in the direct answer.
    assert.match(page, /for no more than 30\s+days/u, `${country}: the direct answer gives the 30 days`);
    assert.match(page, /31\s+December\s+2026/u, `${country}: the direct answer gives the deadline`);
  }
});

test("the services hub cards carry no number on the photo", async () => {
  const [hub, japanese, styles] = await Promise.all([
    source("components/TravelServicesHubPage.tsx"),
    source("components/JapaneseServicesPage.tsx"),
    source("components/TravelServicesHubPage.module.css"),
  ]);
  for (const page of [hub, japanese]) {
    assert.doesNotMatch(page, /styles\.number/u);
    assert.doesNotMatch(page, /padStart\(2, "0"\)/u);
  }
  assert.doesNotMatch(styles, /\.number\b/u);
});

test("the homepage sample route photo carries no badge", async () => {
  const [page, styles, copy] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/HomegroundHomePage.module.css"),
    source("lib/homegroundI18n.ts"),
  ]);
  assert.doesNotMatch(page, /imageBadge/u);
  assert.doesNotMatch(copy, /imageBadge/u);
  assert.doesNotMatch(styles, /\.sampleRouteImage (span|::after)|\.sampleRouteImage::after/u);
});

// Every openly licensed photo shown carries its credit, on a line under it (never on it).
// A table row is one line; a bullet or paragraph runs to the next blank line, bullet or heading.
const provenanceBlock = (doc, file) => {
  const lines = doc.split("\n");
  const index = lines.findIndex((line) => line.includes(file));
  if (index < 0) return "";
  if (lines[index].trim().startsWith("|")) return lines[index];
  const block = [lines[index]];
  for (let next = index + 1; next < lines.length && next < index + 12; next += 1) {
    if (!lines[next].trim() || /^\s*(- |#|\|)/u.test(lines[next])) break;
    block.push(lines[next]);
  }
  return block.join(" ");
};

test("every sight photo and city hero under an attribution licence has a credit", async () => {
  const doc = await source("docs/homeground-photo-provenance.md");
  const { sights } = await import("../../lib/sights.ts");
  const hubsSource = await source("lib/destinationHubs.ts");
  const registry = await source("lib/generated/guideRegistry.generated.ts");
  for (const sight of sights) {
    const src = sight.image?.src ?? (() => {
      const at = registry.indexOf(`"id": "${sight.guideId}"`);
      const match = registry.slice(at).match(/"heroImagePath": "([^"]+)"/u);
      return match?.[1];
    })();
    assert.ok(src, `${sight.id}: photo found`);
    const block = provenanceBlock(doc, src.replace(/^\//u, ""));
    if (/CC BY/u.test(block)) {
      const credit = sight.image ? sight.image.credit : sight.photoCredit;
      assert.ok(credit?.author && credit?.license && credit?.sourceUrl && credit?.licenseUrl, `${sight.id}: ${src} is CC BY and needs a credit`);
    }
  }
  for (const match of hubsSource.matchAll(/heroImagePath: "([^"]+)",\n(\s+heroCredit: \{)?/gu)) {
    const block = provenanceBlock(doc, match[1].replace(/^\//u, ""));
    if (/CC BY/u.test(block)) assert.ok(match[2], `${match[1]} is CC BY and needs a heroCredit`);
  }
});

test("every tour card photo under an attribution licence has a credit for the rows that show it", async () => {
  const { tourCardCredits } = await import("../../lib/photoCredits.ts");
  const ledger = JSON.parse(await source("docs/homeground-private-tour-card-derivatives.json")).records;
  for (const record of ledger) {
    if (!/^Wikimedia Commons, .+ CC BY/u.test(record.rightsBasis)) continue;
    const credit = tourCardCredits[record.productId];
    assert.ok(credit?.author && credit?.license && credit?.sourceUrl && credit?.licenseUrl, `${record.productId}: card photo needs a credit`);
  }
  // Every page that renders tour cards also renders their credits.
  for (const file of ["components/content/DestinationHubPage.tsx", "components/SightsPages.tsx", "components/TravelInspirationPages.tsx", "components/TourCollectionsPages.tsx"]) {
    const page = await source(file);
    assert.match(page, /<TourPhotoCredits /u, `${file} credits its tour cards`);
  }
});
