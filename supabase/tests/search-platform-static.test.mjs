import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
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
  assert.match(header, /languagePaths\?: Partial<Record<HomegroundLocale, string>>/);
  assert.match(aliases, /mode: "canonical-shell"/);
  assert.match(aliases, /china-visa-free-uk-canada/);
  assert.match(adapter, /parentContentId: "system-guides"/);
  assert.match(adapter, /const dateModified = sectionGuides\.reduce/);
  assert.match(adapter, /const approvedSearchHubIds = new Set<SearchSectionId>/);
  assert.match(adapter, /approvedSearchHubIds\.has\(section\)/);
  assert.doesNotMatch(adapter, /hasPublishedChildren \? "published"/);
  assert.match(hubPage, /pageContext="guides"/);
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
