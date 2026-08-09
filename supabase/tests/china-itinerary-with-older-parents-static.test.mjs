import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("older-parents guide is registered as a localized planning guide", async () => {
  const [registry, hubCopy] = await Promise.all([
    source("lib/guideRegistry.ts"),
    source("app/(default)/guides/guidesHubI18n.ts"),
  ]);
  const entry =
    registry.match(
      /id: "china-itinerary-with-older-parents"[\s\S]*?(?=\n  \{\n    id: "do-us-citizens)/,
    )?.[0] ?? "";

  assert.ok(entry, "the older-parents registry entry must exist");
  assert.match(entry, /type: "planning"/);
  assert.match(entry, /featured: false/);
  assert.match(entry, /pillar: "routes-and-pace"/);
  assert.match(entry, /audienceMarkets: \["global"\]/);
  assert.match(entry, /format: "planning-guide"/);
  assert.match(
    entry,
    /destinations: \["beijing", "xian", "zhangjiajie", "shanghai"\]/,
  );
  assert.match(
    entry,
    /route-comparison-og-1200\.jpg/,
  );
  assert.match(entry, /imageWidth: 1200/);
  assert.match(entry, /imageHeight: 630/);
  assert.equal((entry.match(/2026-07-31/g) ?? []).length, 3);

  for (const path of [
    "/guides/china-itinerary-with-older-parents/",
    "/zh/guides/china-itinerary-with-older-parents/",
    "/ko/guides/china-itinerary-with-older-parents/",
  ]) {
    assert.match(entry, new RegExp(`path: "${path}"`));
  }
  for (const locale of ["en_US", "zh_CN", "ko_KR"]) {
    assert.match(entry, new RegExp(`openGraphLocale: "${locale}"`));
  }
  assert.match(hubCopy, /xian: "Xi’an"/);
  assert.match(hubCopy, /xian: "西安"/);
  assert.match(hubCopy, /xian: "시안"/);
});

test("older-parents routes publish self-canonical metadata and reciprocal languages", async () => {
  const [defaultRoute, localizedRoute] = await Promise.all([
    source(
      "app/(default)/guides/china-itinerary-with-older-parents/page.tsx",
    ),
    source(
      "app/(localized)/[locale]/guides/china-itinerary-with-older-parents/page.tsx",
    ),
  ]);

  for (const route of [defaultRoute, localizedRoute]) {
    assert.match(route, /ChinaItineraryWithOlderParentsPage/);
    assert.match(route, /getGuideLanguagePaths\(guide\.id\)/);
    assert.match(route, /canonical: guide\.canonicalPath/);
    assert.match(route, /"max-image-preview": "large"/);
    assert.match(route, /type: "article"/);
    assert.match(route, /width: guide\.imageWidth/);
    assert.match(route, /height: guide\.imageHeight/);
    assert.match(route, /card: "summary_large_image"/);
  }
  assert.match(defaultRoute, /locale="en"/);
  assert.match(localizedRoute, /value === "zh" \|\| value === "ko"/);
  assert.match(
    localizedRoute,
    /getGuideEntry\("china-itinerary-with-older-parents", locale\)/,
  );
});

test("registry-driven sitemap will publish all three older-parents URLs", async () => {
  const [registry, sitemap] = await Promise.all([
    source("lib/guideRegistry.ts"),
    source("app/sitemap.ts"),
  ]);

  assert.match(
    registry,
    /export const guideIds = \[[\s\S]*?"china-itinerary-with-older-parents"/,
  );
  assert.match(sitemap, /getIndexableManifestEntries\(searchPlatformManifest\)/);
  assert.match(sitemap, /absoluteManifestAlternates/);
  assert.doesNotMatch(
    sitemap,
    /url: `\$\{base\}\/guides\/china-itinerary-with-older-parents\//,
  );
});
