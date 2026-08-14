import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const reviewedGuideIds = [
  "china-15-minute-neighbourhoods",
  "china-24-solar-terms-weather-food-daily-life",
  "china-community-canteens-explained",
  "desert-restoration-travellers-can-see",
  "guizhou-village-basketball-culture",
  "how-to-read-a-chinese-sponge-city",
  "how-to-visit-an-archaeological-site-museum",
  "lunar-new-year-customs-for-visitors",
  "qingdao-brands-built-an-industrial-city",
  "qinling-huaihe-transition-zone",
  "shanghai-24-hour-parks-reality-check",
  "shenzhen-low-altitude-city-infrastructure",
  "when-metro-construction-meets-archaeology",
  "why-china-museums-have-stamps",
  "yangshan-automated-port-explained",
  "yunnan-coffee-from-cherry-to-cup",
  "zhenjiang-vinegar-living-fermentation",
];

test("the reviewed 17-guide release exports localized search language", async () => {
  const adapterSource = await readFile(
    path.join(projectRoot, "lib/searchPlatformContentAdapter.ts"),
    "utf8",
  );
  assert.match(
    adapterSource,
    /searchTerms:\s*guide\.searchTerms\?\.\[siteLocale as keyof typeof guide\.searchTerms\]\s*\?\?\s*\[\]/,
    "search-platform adapter must export locale-specific guide search terms",
  );

  const generatedSource = await readFile(
    path.join(projectRoot, "lib/generated/guideRegistry.generated.ts"),
    "utf8",
  );
  const searchMap = JSON.parse(
    await readFile(
      path.join(projectRoot, "docs/organic-growth/search-map.json"),
      "utf8",
    ),
  );

  for (const guideId of reviewedGuideIds) {
    const metadata = JSON.parse(
      await readFile(
        path.join(projectRoot, "content/guides", guideId, "metadata.json"),
        "utf8",
      ),
    );
    for (const runtimeLocale of ["en", "zh", "ko"]) {
      const terms = metadata.searchTerms?.[runtimeLocale];
      assert.ok(Array.isArray(terms) && terms.length >= 3, `${guideId}/${runtimeLocale}`);
      assert.equal(new Set(terms).size, terms.length, `${guideId}/${runtimeLocale}: duplicate term`);
      for (const term of terms) {
        assert.ok(
          generatedSource.includes(JSON.stringify(term)),
          `${guideId}/${runtimeLocale}: generated registry omitted ${term}`,
        );
      }
    }

    const owners = searchMap.coverage.published.filter(
      (entry) => entry.id === guideId,
    );
    assert.equal(owners.length, 1, `${guideId}: expected one published Search Map owner`);
    assert.equal(owners[0].title, metadata.locales.en.title, `${guideId}: Search Map title drift`);
    assert.equal(owners[0].pageFamily, metadata.search.family, `${guideId}: Search Map family drift`);
    assert.equal(
      owners[0].targetIntent,
      metadata.search.primaryIntent,
      `${guideId}: Search Map intent drift`,
    );
  }
});
