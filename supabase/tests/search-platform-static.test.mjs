import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) =>
  readFile(path.join(projectRoot, relativePath), "utf8");

const sections = [
  "explore",
  "plan",
  "transport",
  "when-to-go",
  "stay",
  "essentials",
  "culture",
  "tools",
  "services",
];

test("search platform keeps the explicit nine-section taxonomy and thin routes", async () => {
  const i18n = await source("lib/searchPlatformI18n.ts");
  for (const section of sections) {
    assert.match(i18n, new RegExp(`"${section}"`));
    for (const route of [
      `app/(default)/${section}/page.tsx`,
      `app/(localized)/[locale]/${section}/page.tsx`,
    ]) {
      assert.equal((await stat(path.join(projectRoot, route))).isFile(), true, route);
    }
  }
});

test("legacy pages stay protected while independent guides can be added", async () => {
  const [
    registry,
    adapter,
    manifest,
    systemAdapter,
    baselineSource,
    phase0BaselineSource,
  ] = await Promise.all([
    source("lib/guideRegistry.ts"),
    source("lib/searchPlatformContentAdapter.ts"),
    source("lib/searchPlatformManifest.ts"),
    source("lib/legacySystemContentAdapter.ts"),
    source("content/legacy-indexable-path-baseline.json"),
    source("content/phase0-indexable-path-baseline.json"),
  ]);

  const guideIdBlock = registry.match(/export const legacyGuideIds = \[([\s\S]*?)\] as const/);
  assert.ok(guideIdBlock);
  const guideIds = [...guideIdBlock[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
  assert.equal(guideIds.length, 19);
  for (const guideId of guideIds) assert.match(adapter, new RegExp(`"${guideId}"`));
  assert.match(manifest, /LEGACY_INDEXABLE_URL_BASELINE = 76/);
  assert.match(manifest, /buildLegacyGuideContentNodes/);
  assert.match(manifest, /buildLegacySystemContentNodes/);
  assert.match(systemAdapter, /id: "entry-requirements"/);
  assert.equal(JSON.parse(baselineSource).length, 76);
  assert.match(manifest, /missingLegacyPaths/);
  assert.match(manifest, /Additive guide paths are allowed/);

  const phase0Baseline = JSON.parse(phase0BaselineSource);
  assert.equal(
    phase0Baseline.sourceCommit,
    "4e18043a3dd69d0050034bdd92ade40246bc6fc9",
  );
  assert.equal(phase0Baseline.entryCount, 103);
  assert.equal(phase0Baseline.entries.length, 103);
  assert.equal(phase0Baseline.indexablePathCount, 94);
  assert.equal(
    phase0Baseline.entries.filter(
      (entry) => entry.status === "published" && entry.indexability.index,
    ).length,
    94,
  );
  assert.equal(
    phase0Baseline.entries.filter((entry) => !entry.indexability.index).length,
    9,
  );
  assert.match(manifest, /PHASE0_SEARCH_PLATFORM_SOURCE_COMMIT/);
  assert.match(manifest, /changedPhase0Entries/);
  assert.match(manifest, /New article entries are allowed/);
});

test("every independent guide resolves to a collection in its declared section", async () => {
  const collectionModule = await import("../../lib/searchCollectionI18n.ts");
  assert.equal(collectionModule.searchCollections.length, 27);

  const guideRoot = path.join(projectRoot, "content/guides");
  const guideDirectories = (await readdir(guideRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  assert.ok(guideDirectories.length > 0);

  for (const directory of guideDirectories) {
    const metadata = JSON.parse(
      await readFile(path.join(guideRoot, directory, "metadata.json"), "utf8"),
    );
    const collectionId = collectionModule.getGuideCollectionId(metadata);
    const collection = collectionModule.getSearchCollection(collectionId);
    assert.equal(
      collection.section,
      metadata.search.section,
      `${metadata.id}: ${metadata.search.section} != ${collectionId}/${collection.section}`,
    );
  }

  const sample = JSON.parse(
    await readFile(
      path.join(guideRoot, guideDirectories[0], "metadata.json"),
      "utf8",
    ),
  );
  const originalCollection = collectionModule.getSearchCollection(
    collectionModule.getGuideCollectionId(sample),
  );
  const wrongSection = sections.find(
    (section) => section !== originalCollection.section,
  );
  assert.ok(wrongSection);
  assert.throws(
    () => collectionModule.getGuideCollectionId({
      ...sample,
      search: { ...sample.search, section: wrongSection },
    }),
    new RegExp(`${sample.id}.*${wrongSection}.*${originalCollection.id}.*${originalCollection.section}`),
  );

  assert.equal(
    collectionModule.getGuideCollectionId({
      id: "zhangjiajie-itinerary",
      pillar: "routes-and-pace",
    }),
    "plan-trip-length-city-order",
  );
});

test("guide entities and freshness use the current metadata vocabulary", async () => {
  const [adapter, policy, entitySource] = await Promise.all([
    source("lib/searchPlatformContentAdapter.ts"),
    source("lib/searchPlatformGuidePolicy.ts"),
    source("content/entities/core-places.json"),
  ]);
  const entityIds = new Set(
    JSON.parse(entitySource).map((record) => record.data.id),
  );

  for (const [slug, entityId] of [
    ["guangzhou", "city-guangzhou"],
    ["zhangjiajie", "city-zhangjiajie"],
    ["hangzhou", "city-hangzhou"],
    ["chongqing", "city-chongqing"],
    ["shenzhen", "city-shenzhen"],
  ]) {
    assert.match(policy, new RegExp(`${slug}: "${entityId}"`));
    assert.ok(entityIds.has(entityId), entityId);
  }

  assert.match(
    policy,
    /criticalFreshnessPillars[\s\S]*?"entry-rules"[\s\S]*?"entry-practicalities"/,
  );
  for (const dynamicPillar of [
    "essentials-payments-connectivity",
    "timing-holidays-crowds",
    "transport-airports-rail-hubs",
    "transport-city-pair-routes",
    "transport-last-mile-transfers",
  ]) {
    assert.match(policy, new RegExp(`"${dynamicPillar}"`));
  }
  assert.match(policy, /dynamicTicketTopicFragments[\s\S]*?"booking"/);
  assert.match(policy, /dynamicTicketTopicFragments[\s\S]*?"ticket"/);
  assert.match(policy, /function guideUpdatePolicy/);
  assert.match(policy, /function resolveGuideEntities/);
  assert.match(adapter, /from "\.\/searchPlatformGuidePolicy"/);
  assert.match(adapter, /updatePolicy: guideUpdatePolicy\(guide\)/);
  assert.match(adapter, /resolveGuideEntities\(guide\.destinations\)\.entityIds/);
  assert.doesNotMatch(policy, /guide\.pillar === "entry-rules"/);
});

test("sitemap, language navigation and compatibility aliases consume platform data", async () => {
  const [sitemap, header, aliases, hubPage, adapter] = await Promise.all([
    source("app/sitemap.ts"),
    source("components/HomegroundHeader.tsx"),
    source("lib/searchPlatformAliases.ts"),
    source("components/SearchPlatformHubPage.tsx"),
    source("lib/searchPlatformContentAdapter.ts"),
  ]);

  assert.match(sitemap, /getIndexableManifestEntries\(searchPlatformManifest\)/);
  assert.match(sitemap, /absoluteManifestAlternates/);
  assert.match(header, /HomegroundLanguagePathKey = HomegroundLocale \| "zh-Hans"/);
  assert.match(header, /languagePaths\?: Partial<Record<HomegroundLanguagePathKey, string>>/);
  assert.match(header, /targetLocale === "zh" \? languagePaths\?\.\["zh-Hans"\]/);
  assert.match(header, /Boolean\(overriddenLanguagePathFor\(targetLocale\)\)/);
  assert.match(aliases, /mode: "canonical-shell"/);
  assert.match(aliases, /china-visa-free-uk-canada/);
  assert.match(adapter, /parentContentId: "system-guides"/);
  assert.match(adapter, /const dateModified = sectionGuides\.reduce/);
  assert.match(adapter, /const approvedSearchHubIds = new Set<SearchSectionId>/);
  assert.match(adapter, /approvedSearchHubIds\.has\(section\)/);
  assert.doesNotMatch(adapter, /hasPublishedChildren \? "published"/);
  assert.match(hubPage, /section === "explore"/);
  assert.match(hubPage, /\? "destinations"/);
  assert.match(hubPage, /section === "plan"[\s\S]*?\? "plan"/);
  assert.match(hubPage, /section === "services"[\s\S]*?\? "services"/);
  assert.match(hubPage, /pageContext=\{pageContext\}/);
  assert.match(hubPage, /position: 3/);
  assert.match(hubPage, /loading="lazy"/);
  assert.match(hubPage, /fetchPriority="auto"/);
  assert.doesNotMatch(hubPage, /loading=\{index === 0 \? "eager"/);
});

test("new structured content uses a finite semantic page-family renderer", async () => {
  const [renderer, bodySchema, rendererStyles, guideStyles] = await Promise.all([
    source("components/content/PageFamilyRenderer.tsx"),
    source("lib/content-system/page-body.ts"),
    source("components/content/PageFamilyRenderer.module.css"),
    source("components/content/EditorialGuidePage.module.css"),
  ]);

  assert.match(renderer, /case "comparison"/);
  assert.match(renderer, /<caption>/);
  assert.match(renderer, /scope="col"/);
  assert.match(renderer, /case "sources"/);
  assert.match(renderer, /<details className=\{styles\.sources\}>/);
  assert.doesNotMatch(renderer, /<details[^>]*\sopen(?:=|\s|>)/);
  assert.match(rendererStyles, /\.sources\[open\] summary::after/);
  assert.match(guideStyles, /--hg-editorial: var\(--serif\)/);
  assert.match(bodySchema, /assertStructuredPageBody/);
});
