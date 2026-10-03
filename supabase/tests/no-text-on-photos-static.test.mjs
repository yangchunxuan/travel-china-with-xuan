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
