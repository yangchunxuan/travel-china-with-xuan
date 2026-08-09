import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  buildContentManifest,
  getIndexableManifestEntries,
  getManifestEntriesByEntity,
  getManifestEntriesBySection,
  getManifestEntryByPath,
  normalizeContentPath,
  validateContentNode,
  validateContentRecord,
} from "../../lib/content-system/index.ts";
import {
  generateContentManifest,
  serializeContentManifest,
} from "../../tools/generate-content-manifest.mjs";

const source = {
  schemaVersion: "1.0.0",
  recordType: "source-snapshot",
  data: {
    id: "source-beijing-official",
    url: "https://example.gov.cn/beijing",
    title: "Beijing official source",
    publisher: "Example authority",
    sourceKind: "government",
    locale: "en",
    retrievedAt: "2026-08-09T00:00:00Z",
    contentHash: "sha256-source",
  },
};

const entity = {
  schemaVersion: "1.0.0",
  recordType: "entity",
  data: {
    id: "beijing",
    entityType: "city",
    names: {
      en: { name: "Beijing" },
      "zh-Hans": { name: "北京" },
      ko: { name: "베이징" },
    },
    sourceIds: ["source-beijing-official"],
    status: "published",
  },
};

const node = {
  schemaVersion: "1.0.0",
  recordType: "content-node",
  data: {
    id: "beijing-city-guide",
    family: "entity",
    section: "explore",
    primaryIntent: "understand",
    entityIds: ["beijing"],
    status: "published",
    indexability: { index: true, follow: true },
    locales: {
      en: {
        path: "/explore/cities/beijing/",
        title: "Beijing Travel Guide",
        description: "Understand Beijing before planning a visit.",
        h1: "Beijing",
        bodyResource: "content/beijing/en",
        searchTerms: ["beijing guide"],
        localizationStatus: "source",
      },
      "zh-Hans": {
        path: "/zh/explore/cities/beijing/",
        title: "北京旅行指南",
        description: "面向入境旅客的北京旅行指南。",
        h1: "北京",
        bodyResource: "content/beijing/zh",
        localizationStatus: "localized",
      },
      ko: {
        path: "/ko/explore/cities/beijing/",
        title: "베이징 여행 가이드",
        description: "중국을 방문하는 여행자를 위한 베이징 가이드입니다.",
        h1: "베이징",
        bodyResource: "content/beijing/ko",
        localizationStatus: "localized",
      },
    },
    sourceIds: ["source-beijing-official"],
    schemaTypes: ["Article"],
    legacyAliases: ["/guides/beijing/"],
    dates: {
      datePublished: "2026-08-09",
      dateModified: "2026-08-09",
      lastReviewed: "2026-08-09",
    },
    updatePolicy: {
      volatility: "low",
      refreshCadence: "quarterly",
      nextReviewAt: "2026-11-09",
    },
  },
};

test("content node validator enforces the explicit nine-section taxonomy", () => {
  const validation = validateContentNode(node.data);
  assert.equal(validation.ok, true);

  const withoutSection = structuredClone(node.data);
  delete withoutSection.section;
  const invalid = validateContentNode(withoutSection);
  assert.equal(invalid.ok, false);
  assert.ok(invalid.issues.some((item) => item.path === "$.section"));
});

test("locale paths preserve runtime zh and output zh-Hans semantics", () => {
  assert.equal(normalizeContentPath("en", "/en/explore/cities/beijing"), "/explore/cities/beijing/");
  assert.equal(normalizeContentPath("zh", "/explore/cities/beijing"), "/zh/explore/cities/beijing/");
  assert.equal(normalizeContentPath("ko", "/zh/explore/cities/beijing"), "/ko/explore/cities/beijing/");
});

test("manifest is deterministic and supports path, section, entity, and index queries", () => {
  assert.equal(validateContentRecord(node).ok, true);
  const manifest = buildContentManifest([node, entity, source]);
  const reversed = buildContentManifest([source, entity, node]);
  assert.equal(serializeContentManifest(manifest), serializeContentManifest(reversed));
  assert.equal(manifest.entries.length, 3);

  const zhEntry = getManifestEntryByPath(
    manifest,
    "zh",
    "/zh/explore/cities/beijing/",
  );
  assert.equal(zhEntry?.schemaLocale, "zh-Hans");
  assert.equal(zhEntry?.hreflang, "zh-Hans");
  assert.equal(zhEntry?.alternates.en, "/explore/cities/beijing/");
  assert.equal(zhEntry?.alternates["x-default"], "/explore/cities/beijing/");
  assert.deepEqual(zhEntry?.legacyAliases, []);
  assert.deepEqual(
    getManifestEntryByPath(manifest, "en", "/explore/cities/beijing/")?.legacyAliases,
    ["/guides/beijing/"],
  );
  assert.equal(getManifestEntriesBySection(manifest, "explore", "ko").length, 1);
  assert.equal(getManifestEntriesByEntity(manifest, "beijing").length, 3);
  assert.equal(getIndexableManifestEntries(manifest).length, 3);
});

test("manifest rejects dangling entity and source references", () => {
  assert.throws(() => buildContentManifest([node]), /missing entity:beijing/);
});

test("validators reject impossible dates, unsafe paths, scalar attributes, and mismatched aliases", () => {
  const impossibleDate = structuredClone(node.data);
  impossibleDate.dates.dateModified = "2026-02-30";
  assert.equal(validateContentNode(impossibleDate).ok, false);

  const unsafePath = structuredClone(node.data);
  unsafePath.locales.en.path = "/explore/cities/foo/../beijing/";
  assert.equal(validateContentNode(unsafePath).ok, false);

  for (const path of [
    "/explore/cities/caf%C3%A9/",
    "/explore/cities/foo/%00bar/",
    "/explore/cities/cafe\u0301/",
    "/explore/cities/\uD800/",
  ]) {
    const nonCanonicalPath = structuredClone(node.data);
    nonCanonicalPath.locales.en.path = path;
    assert.equal(validateContentNode(nonCanonicalPath).ok, false);
  }

  const badAttributes = structuredClone(entity);
  badAttributes.data.attributes = null;
  assert.equal(validateContentRecord(badAttributes).ok, false);

  const mismatchedAlias = structuredClone(node.data);
  delete mismatchedAlias.locales["zh-Hans"];
  mismatchedAlias.legacyAliases = ["/zh/old-beijing/"];
  assert.equal(validateContentNode(mismatchedAlias).ok, false);
});

test("manifest rejects entity and content parent cycles", () => {
  const selfParentEntity = structuredClone(entity);
  selfParentEntity.data.parentEntityIds = ["beijing"];
  assert.throws(
    () => buildContentManifest([node, selfParentEntity, source]),
    /Parent graph contains a cycle/,
  );

  const selfParentNode = structuredClone(node);
  selfParentNode.data.parentContentId = "beijing-city-guide";
  assert.throws(
    () => buildContentManifest([selfParentNode, entity, source]),
    /Parent graph contains a cycle/,
  );
});

test("generator scans repository folders and writes stable output", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "homeground-content-"));
  await Promise.all(
    ["entities", "pages", "sources"].map((directory) =>
      mkdir(path.join(root, directory), { recursive: true }),
    ),
  );
  await Promise.all([
    writeFile(path.join(root, "entities/beijing.json"), JSON.stringify(entity), "utf8"),
    writeFile(path.join(root, "pages/beijing.json"), JSON.stringify(node), "utf8"),
    writeFile(path.join(root, "sources/beijing.json"), JSON.stringify(source), "utf8"),
  ]);

  const result = await generateContentManifest({ contentRoot: root });
  const output = await readFile(result.outputPath, "utf8");
  assert.equal(output, serializeContentManifest(result.manifest));
  assert.equal(result.manifest.entries.length, 3);

  const checked = await generateContentManifest({ contentRoot: root, check: true });
  assert.equal(checked.changed, false);
});
