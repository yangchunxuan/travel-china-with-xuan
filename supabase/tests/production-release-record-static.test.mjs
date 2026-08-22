import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");

async function source(relativePath) {
  return readFile(path.join(projectRoot, relativePath), "utf8");
}

const releasePath =
  "docs/release-notes/search-analytics-privacy-production-release-20260823.md";

test("the current production record locks the exact PR 89 release evidence", async () => {
  const release = await source(releasePath);

  assert.match(release, /DEPLOYED AND LIVE-VERIFIED/u);
  assert.match(release, /pull\/89/u);
  assert.match(release, /5bd15583c7c03dadc819d19bb4fc2c7f3ceb1b9e/u);
  assert.match(release, /actions\/runs\/32589631161/u);
  assert.match(release, /New canonical identities in PR #89 \| `0`/u);
  assert.match(release, /670 `<loc>` values; 670 unique; 0 duplicates/u);
  assert.match(release, /already indexed by\s+Google/u);
  assert.match(release, /One homepage re-index request was accepted/u);
  assert.match(release, /do not claim that all 670 URLs are indexed/u);
});

test("the production record keeps optional traffic systems explicitly held", async () => {
  const release = await source(releasePath);

  assert.match(release, /NEXT_PUBLIC_HOMEGROUND_WEB_EVENTS_URL` is absent/u);
  assert.match(release, /first-party browser collector is therefore paused and fail-closed/u);
  assert.match(release, /admin-traffic` was not activated/u);
  assert.match(release, /Admin master and independent traffic\s+server-side gates/u);
  assert.match(release, /public URL\/static client presence\s+is not activation evidence/u);
  assert.match(release, /Route Reality's internal specification was merged via PR #75/u);
  assert.match(release, /remains `internal-only \/ not-published`/u);
  assert.match(release, /public product was subsequently rejected/u);
  assert.match(release, /Korea-office internal-traffic rule: \*\*Testing\*\*, not Active/u);
  assert.doesNotMatch(release, /180\.83\.133\.180/u);
});

test("the release handoff keeps the 60-guide Draft PR outside production", async () => {
  const release = await source(releasePath);

  assert.match(release, /Draft PR #84 separately holds 60 reserved trilingual guide drafts/u);
  assert.match(release, /open, still Draft, conflicting with current `main`/u);
  assert.match(release, /none of its 60 identities is published or authorized/u);
});

test("current operator docs point to the release and old snapshots stay historical", async () => {
  const [docsIndex, index, brand, traffic, admin, inquiry, seoReview] = await Promise.all([
    source("docs/README.md"),
    source("docs/release-notes/README.md"),
    source("docs/brand-entity-system.md"),
    source("docs/first-party-traffic-operations.md"),
    source("docs/admin-insights-deployment.md"),
    source("docs/inquiry-deployment.md"),
    source("docs/organic-growth/seo-technical-foundation-review.md"),
  ]);

  for (const text of [docsIndex, index, brand, traffic, admin, inquiry, seoReview]) {
    assert.match(
      text,
      /search-analytics-privacy-production-release-20260823\.md/u,
    );
  }
  assert.match(inquiry, /HISTORICAL 2026-07-20\.x INQUIRY DEPLOYMENT RECORD/u);
  assert.match(seoReview, /Historical-snapshot notice/u);
  assert.match(brand, /Do not repeatedly request\s+indexing for `\/`/u);
  assert.match(admin, /GET \/functions\/v1\/admin-traffic/u);
  assert.match(admin, /ADMIN_TRAFFIC_API_ENABLED/u);
  assert.match(admin, /not active in\s+production/u);
  assert.match(admin, /shared Admin authorization may run/u);
  assert.match(traffic, /Do not change the shared\s+`NEXT_PUBLIC_HOMEGROUND_ANALYTICS_ENABLED`/u);
  assert.match(docsIndex, /60 reserved trilingual guide drafts/u);
  assert.match(docsIndex, /public product was subsequently rejected/u);
  assert.match(docsIndex, /durable trilingual internal draft/u);
});

test("dated package records expose current decision overlays", async () => {
  const [arrival, arrivalGap, routeReadme, routeReview, cityHubs, photos] =
    await Promise.all([
      source("docs/organic-growth/arrival-system-draft/README.md"),
      source("docs/organic-growth/arrival-system-draft/gap-spec.md"),
      source("docs/organic-growth/china-planning-hub-system/route-reality/README.md"),
      source("docs/tools/china-route-reality-checker-v4-final-technical-review.md"),
      source("docs/organic-growth/city-hub-drafts/README.md"),
      source("docs/homeground-photo-provenance.md"),
    ]);

  assert.match(arrival, /Search Map now records all five PR #74\s+identities as published/u);
  assert.match(arrivalGap, /corrected in the 2026-08-23 Search Map/u);
  assert.match(routeReadme, /PUBLIC PRODUCT REJECTED \/ CLOSED/u);
  assert.doesNotMatch(routeReadme, /FINAL RE-REVIEW REQUIRED/u);
  assert.match(routeReview, /PUBLIC PRODUCT SUBSEQUENTLY REJECTED \/ CLOSED/u);
  assert.match(cityHubs, /all eight destination Hubs are\s+published, including Chongqing via PR #80/u);
  assert.doesNotMatch(cityHubs, /release candidate only until central merges/u);
  assert.match(photos, /Chongqing Destination Hub — published via PR #80/u);
});
