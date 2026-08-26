import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { isIsoDateTimeWithTimezone } from "../../tools/lib/iso-date-time.mjs";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) =>
  readFile(path.join(projectRoot, relativePath), "utf8");

const expectedSystemIds = [
  "author-evan",
  "business-information",
  "entry-requirements",
  "guides",
  "home",
  "itinerary-review",
  "privacy",
  "refund-delivery",
  "studio",
  "terms",
  "zhangjiajie-4-day-private-tour",
];

const expectedModifiedDates = {
  "author-evan": "2026-08-22",
  "business-information": "2026-07-24",
  "entry-requirements": "2026-08-22",
  guides: "2026-08-22",
  home: "2026-08-22",
  "itinerary-review": "2026-08-22",
  privacy: "2026-08-23",
  "refund-delivery": "2026-07-24",
  studio: "2026-08-22",
  terms: "2026-07-24",
  "zhangjiajie-4-day-private-tour": "2026-08-22",
};

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const commitSha = /^[0-9a-f]{40}$/;

test("legacy system pages have a complete, evidenced lifecycle registry", async () => {
  const lifecycleModule = await import("../../lib/legacySystemContentLifecycle.ts");
  const records = lifecycleModule.legacySystemContentLifecycle;

  assert.deepEqual(Object.keys(records).sort(), expectedSystemIds);
  assert.deepEqual([...lifecycleModule.legacySystemContentIds].sort(), expectedSystemIds);

  for (const [id, record] of Object.entries(records)) {
    assert.match(record.datePublished, isoDate, `${id} datePublished`);
    assert.match(record.dateModified, isoDate, `${id} dateModified`);
    assert.match(record.lastReviewed, isoDate, `${id} lastReviewed`);
    assert.ok(
      record.datePublished <= record.dateModified,
      `${id}: publication cannot follow modification`,
    );
    assert.ok(
      record.datePublished <= record.lastReviewed,
      `${id}: review cannot predate publication`,
    );
    assert.match(record.evidence.commit, commitSha, `${id} evidence commit`);
    assert.match(record.evidence.changedAt, isoDate, `${id} evidence date`);
    assert.equal(
      record.dateModified,
      record.evidence.changedAt,
      `${id}: lastmod must equal the dated material-change evidence`,
    );
    assert.ok(record.evidence.summary.length >= 40, `${id} evidence summary`);
    assert.equal(
      record.dateModified,
      expectedModifiedDates[id],
      `${id}: audited material-change date`,
    );
  }

  assert.equal(records.privacy.lastReviewed, "2026-07-31");
  for (const id of ["business-information", "terms", "refund-delivery"]) {
    assert.equal(records[id].dateModified, "2026-07-24");
    assert.equal(records[id].lastReviewed, "2026-07-24");
    assert.equal(
      records[id].evidence.commit,
      "6c4295d77bce295a4a546d8c4dc6818e9626cf42",
    );
  }
  assert.ok(
    Object.values(records).some(
      (record) => record.lastReviewed !== record.dateModified,
    ),
    "A public modification must not automatically become a claimed full review",
  );
});

test("the author ProfilePage has one evidenced DateTime with a timezone", async () => {
  const [lifecycleModule, authorPage] = await Promise.all([
    import("../../lib/legacySystemContentLifecycle.ts"),
    source("components/EditorialAuthorPage.tsx"),
  ]);
  const modifiedAt = lifecycleModule.EDITORIAL_AUTHOR_PROFILE_MODIFIED_AT;
  const authorLifecycle =
    lifecycleModule.legacySystemContentLifecycle["author-evan"];

  assert.equal(modifiedAt, "2026-08-22T22:33:16+08:00");
  assert.equal(isIsoDateTimeWithTimezone(modifiedAt), true);
  for (const valid of [
    "2000-02-29T00:00:00Z",
    "2024-02-29T23:59:59.123+14:00",
    "2026-08-22T12:00:00-08:30",
  ]) {
    assert.equal(isIsoDateTimeWithTimezone(valid), true, valid);
  }
  for (const invalid of [
    "2026-08-22",
    "2026-08-22T12:00:00",
    "1900-02-29T12:00:00Z",
    "2026-02-30T12:00:00+08:00",
    "2026-13-01T12:00:00+08:00",
    "2026-08-00T12:00:00+08:00",
    "2026-08-22T24:00:00+08:00",
    "2026-08-22T12:60:00+08:00",
    "2026-08-22T12:00:60+08:00",
    "2026-08-22T12:00:00+14:01",
    "2026-08-22T12:00:00+23:59",
    "2026-08-22T12:00:00+08:60",
  ]) {
    assert.equal(isIsoDateTimeWithTimezone(invalid), false, invalid);
  }
  assert.equal(modifiedAt.slice(0, 10), authorLifecycle.dateModified);
  assert.equal(modifiedAt.slice(0, 10), authorLifecycle.evidence.changedAt);
  assert.match(authorPage, /dateModified: EDITORIAL_AUTHOR_PROFILE_MODIFIED_AT/);
  assert.doesNotMatch(
    authorPage,
    /dateModified:\s*["']\d{4}-\d{2}-\d{2}["']/,
  );
});

test("the legacy adapter consumes lifecycle records instead of cloning one date", async () => {
  const adapter = await source("lib/legacySystemContentAdapter.ts");

  assert.match(adapter, /getLegacySystemContentLifecycle/);
  assert.match(adapter, /datePublished: lifecycle\.datePublished/);
  assert.match(adapter, /dateModified: lifecycle\.dateModified/);
  assert.match(adapter, /lastReviewed: lifecycle\.lastReviewed/);
  assert.doesNotMatch(adapter, /dateModified:\s*"\d{4}-\d{2}-\d{2}"/);

  for (const id of expectedSystemIds.filter(
    (candidate) =>
      !["business-information", "terms", "refund-delivery"].includes(
        candidate,
      ),
  )) {
    assert.match(
      adapter,
      new RegExp(`getLegacySystemContentLifecycle\\(\\s*"${id}"`),
      id,
    );
  }
  assert.match(adapter, /for \(const pageId of homegroundLegalPageIds\)/);
  assert.match(adapter, /getLegacySystemContentLifecycle\(pageId\)/);
});

test("sitemap lastmod uses public lifecycle dates, never review or build time", async () => {
  const sitemap = await source("app/sitemap.ts");

  assert.match(
    sitemap,
    /entry\.dates\.dateModified \?\? entry\.dates\.datePublished \?\? undefined/,
  );
  assert.match(sitemap, /\.\.\.\(lastModified \? \{ lastModified \} : \{\}\)/);
  assert.doesNotMatch(sitemap, /entry\.dates\.lastReviewed/);
  assert.doesNotMatch(sitemap, /new Date\s*\(/);
  assert.match(sitemap, /getIndexableManifestEntries\(searchPlatformManifest\)/);
  assert.match(sitemap, /absoluteManifestAlternates/);
});
