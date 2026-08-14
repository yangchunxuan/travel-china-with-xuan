import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
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
  const guidesRoot = path.join(projectRoot, "content/guides");
  const guideDirectories = (
    await readdir(guidesRoot, { withFileTypes: true })
  )
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

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

    const inboundOwners = [];
    for (const ownerId of guideDirectories) {
      if (ownerId === guideId) continue;
      const ownerRoot = path.join(guidesRoot, ownerId);
      const localizedPaths = {
        en: `/guides/${guideId}/`,
        zh: `/zh/guides/${guideId}/`,
        ko: `/ko/guides/${guideId}/`,
      };
      const enBody = await readFile(path.join(ownerRoot, "body.en.ts"), "utf8").catch(
        () => "",
      );
      if (!enBody.includes(localizedPaths.en)) continue;
      for (const locale of ["zh", "ko"]) {
        const body = await readFile(
          path.join(ownerRoot, `body.${locale}.ts`),
          "utf8",
        );
        assert.ok(
          body.includes(localizedPaths[locale]),
          `${ownerId} -> ${guideId}: missing ${locale} inbound-link parity`,
        );
      }
      inboundOwners.push(ownerId);
    }

    assert.ok(inboundOwners.length >= 2, `${guideId}: needs at least two inbound owners`);
    const brief = await readFile(path.join(guidesRoot, guideId, "seo-brief.md"), "utf8");
    const clusterSection = brief.match(
      /## Cluster, hub[^\n]*\n([\s\S]*?)\n## Unique asset plan/,
    )?.[1];
    assert.ok(clusterSection, `${guideId}: missing cluster and inbound evidence section`);
    const section = metadata.search.section;
    const collectionPath = `/${section}/${metadata.pillar.replace(`${section}-`, "")}/`;
    assert.ok(
      clusterSection.includes(
        `Runtime section: \`${section}\`; indexable collection: \`${metadata.pillar}\` at \`${collectionPath}\`.`,
      ),
      `${guideId}: runtime collection evidence drift`,
    );
    assert.match(
      clusterSection,
      /Implemented and verified \d{4}-\d{2}-\d{2}:/,
      `${guideId}: missing implementation date`,
    );
    const implementedLine = clusterSection
      .split("\n")
      .find((line) => line.startsWith("- Implemented and verified "));
    const documentedOwners = [...(implementedLine?.matchAll(/`([^`]+)`/g) ?? [])]
      .map((match) => match[1])
      .sort();
    assert.deepEqual(
      documentedOwners,
      [...inboundOwners].sort(),
      `${guideId}: documented inbound-owner set drift`,
    );
    for (const ownerId of inboundOwners) {
      assert.ok(
        clusterSection.includes(`\`${ownerId}\``),
        `${guideId}: brief omitted implemented inbound owner ${ownerId}`,
      );
    }
    assert.ok(
      clusterSection.includes(
        `Current trilingual body-level inbound-owner count: **${inboundOwners.length}**.`,
      ),
      `${guideId}: inbound-owner count drift`,
    );
    assert.doesNotMatch(
      clusterSection,
      /suggested inbound|recommendations only|does not modify old owners|old pages are unchanged|later central edit/i,
      `${guideId}: stale proposed-only language remains`,
    );
  }
});
