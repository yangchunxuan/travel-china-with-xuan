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

test("legacy pages enter the manifest through adapters without changing GuideId", async () => {
  const [registry, adapter, manifest, systemAdapter, baselineSource] = await Promise.all([
    source("lib/guideRegistry.ts"),
    source("lib/searchPlatformContentAdapter.ts"),
    source("lib/searchPlatformManifest.ts"),
    source("lib/legacySystemContentAdapter.ts"),
    source("content/legacy-indexable-path-baseline.json"),
  ]);

  const guideIdBlock = registry.match(/export const guideIds = \[([\s\S]*?)\] as const/);
  assert.ok(guideIdBlock);
  const guideIds = [...guideIdBlock[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
  assert.equal(guideIds.length, 19);
  for (const guideId of guideIds) assert.match(adapter, new RegExp(`"${guideId}"`));
  assert.match(manifest, /LEGACY_INDEXABLE_URL_BASELINE = 76/);
  assert.match(manifest, /buildLegacyGuideContentNodes/);
  assert.match(manifest, /buildLegacySystemContentNodes/);
  assert.match(systemAdapter, /id: "entry-requirements"/);
  assert.equal(JSON.parse(baselineSource).length, 76);
  assert.match(manifest, /JSON\.stringify\(actualLegacyPaths\)/);
});

test("sitemap, language navigation and compatibility aliases consume platform data", async () => {
  const [sitemap, header, aliases] = await Promise.all([
    source("app/sitemap.ts"),
    source("components/HomegroundHeader.tsx"),
    source("lib/searchPlatformAliases.ts"),
  ]);

  assert.match(sitemap, /getIndexableManifestEntries\(searchPlatformManifest\)/);
  assert.match(sitemap, /absoluteManifestAlternates/);
  assert.match(header, /languagePaths\?: Partial<Record<HomegroundLocale, string>>/);
  assert.match(aliases, /mode: "canonical-shell"/);
  assert.match(aliases, /china-visa-free-uk-canada/);
});

test("new structured content uses a finite semantic page-family renderer", async () => {
  const [renderer, bodySchema] = await Promise.all([
    source("components/content/PageFamilyRenderer.tsx"),
    source("lib/content-system/page-body.ts"),
  ]);

  assert.match(renderer, /case "comparison"/);
  assert.match(renderer, /<caption>/);
  assert.match(renderer, /scope="col"/);
  assert.match(renderer, /case "sources"/);
  assert.match(bodySchema, /assertStructuredPageBody/);
});
