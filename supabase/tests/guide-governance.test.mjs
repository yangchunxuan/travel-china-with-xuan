import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import {
  buildContentManifest,
  getIndexableManifestEntries,
} from "../../lib/content-system/manifest.ts";
import { validateContentNode } from "../../lib/content-system/validators.ts";
import { evaluateGuideIndexGate } from "../../lib/guideIndexGate.mjs";
import { searchCollectionIds } from "../../lib/searchCollectionI18n.ts";
import { buildGuideCoverageInventory } from "../../tools/generate-guide-coverage-inventory.mjs";

const projectRoot = path.resolve(import.meta.dirname, "../..");

function validGuideNode() {
  return {
    id: "guide-test-guide",
    family: "task",
    section: "explore",
    primaryIntent: "execute",
    entityIds: ["city-test", "country-china"],
    relationIds: [],
    parentContentId: "collection-explore-cities-neighborhoods",
    status: "review",
    indexability: { index: false, follow: true, blockReason: "Awaiting approval." },
    locales: {
      en: {
        path: "/guides/test-guide/",
        title: "Test guide",
        description: "Test guide description.",
        h1: "Test guide",
        bodyResource: "guide:test-guide",
        localizationStatus: "source",
      },
    },
    sourceIds: [],
    updatePolicy: { volatility: "high", refreshCadence: "on-source-change" },
    dates: {
      datePublished: "2026-09-04",
      dateModified: "2026-09-04",
      lastReviewed: "2026-09-04",
    },
    candidateId: "test-candidate-01",
    editorialStatus: "provisional",
    primaryCollectionId: "explore-cities-neighborhoods",
    primaryEntityId: "city-test",
    secondaryEntityIds: ["country-china"],
    freshnessClass: "high",
    lastVerified: "2026-09-04",
    indexApproved: false,
  };
}

function issueCodes(node) {
  const result = validateContentNode(node);
  return result.ok ? [] : result.issues.map((issue) => issue.code);
}

test("content-node guide governance rejects every cross-field bypass", async (t) => {
  const cases = [
    ["incomplete bundle", (node) => { delete node.candidateId; }, "incomplete_guide_governance"],
    ["editorial bypass", (node) => { node.indexApproved = true; }, "index_approval_without_editorial_approval"],
    ["primary entity drift", (node) => { node.primaryEntityId = "city-other"; }, "primary_entity_not_in_entity_ids"],
    ["secondary entity drift", (node) => { node.secondaryEntityIds = ["city-other"]; }, "secondary_entity_not_in_entity_ids"],
    ["collection parent drift", (node) => { node.parentContentId = "collection-explore-attractions-nature-heritage"; }, "collection_parent_mismatch"],
    ["collection section drift", (node) => { node.section = "stay"; }, "collection_section_mismatch"],
    ["verification date drift", (node) => { node.lastVerified = "2026-09-03"; }, "verification_date_mismatch"],
    ["freshness policy drift", (node) => { node.freshnessClass = "low"; }, "freshness_policy_mismatch"],
    ["modified before published", (node) => { node.dates.dateModified = "2026-09-03"; }, "date_order_invalid"],
    ["future published date", (node) => {
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      node.dates.datePublished = tomorrow;
      node.dates.dateModified = tomorrow;
    }, "future_content_date"],
    ["future modified date", (node) => {
      node.dates.dateModified = new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
    }, "future_content_date"],
    ["manifest gate bypass", (node) => {
      node.editorialStatus = "approved";
      node.status = "published";
      node.indexability = { index: true, follow: true };
    }, "guide_index_gate_bypass"],
  ];
  for (const [name, mutate, expectedCode] of cases) {
    await t.test(name, () => {
      const node = structuredClone(validGuideNode());
      mutate(node);
      assert.ok(issueCodes(node).includes(expectedCode), `${name}: ${issueCodes(node)}`);
    });
  }
});

test("manifest index selection independently requires the explicit guide approval field", () => {
  const pending = validGuideNode();
  const pendingManifest = buildContentManifest([
    { schemaVersion: "1.0.0", recordType: "content-node", data: pending },
  ], { validateReferences: false });
  assert.equal(getIndexableManifestEntries(pendingManifest).length, 0);

  const approved = structuredClone(pending);
  approved.editorialStatus = "approved";
  approved.status = "published";
  approved.indexApproved = true;
  approved.indexability = { index: true, follow: true };
  const approvedManifest = buildContentManifest([
    { schemaVersion: "1.0.0", recordType: "content-node", data: approved },
  ], { validateReferences: false });
  assert.equal(getIndexableManifestEntries(approvedManifest).length, 1);
});

test("governance controlled collections exactly match the runtime registry", async () => {
  const governance = JSON.parse(
    await readFile(path.join(projectRoot, "content", "guide-governance.json"), "utf8"),
  );
  assert.deepEqual(
    [...governance.controlledValues.collectionIds].sort(),
    [...searchCollectionIds].sort(),
  );
});

test("release gate requires an exact central date and preserves baseline without a candidate", () => {
  assert.equal(evaluateGuideIndexGate({ isBaseline: true, candidate: null, metadata: null }), true);
  const metadata = {
    editorialStatus: "approved",
    indexApproved: true,
    datePublished: "2026-09-04",
  };
  const candidate = {
    centralDecision: "approved",
    approvedReleaseDate: "2026-09-04",
  };
  assert.equal(evaluateGuideIndexGate({ isBaseline: false, candidate, metadata }), true);
  assert.equal(
    evaluateGuideIndexGate({
      isBaseline: false,
      candidate: { ...candidate, approvedReleaseDate: "2026-09-03" },
      metadata,
    }),
    false,
  );

  const updateMetadata = {
    editorialStatus: "approved",
    indexApproved: true,
    datePublished: "2026-08-12",
    dateModified: "2026-09-04",
  };
  const updateCandidate = {
    candidateAction: "update-existing",
    centralDecision: "approved",
    baselinePublishedDate: "2026-08-12",
    approvedReleaseDate: "2026-09-04",
  };
  assert.equal(
    evaluateGuideIndexGate({
      isBaseline: true,
      candidate: updateCandidate,
      metadata: updateMetadata,
      frozenBaselinePublishedDate: "2026-08-12",
    }),
    true,
  );
  assert.equal(
    evaluateGuideIndexGate({
      isBaseline: true,
      candidate: updateCandidate,
      metadata: { ...updateMetadata, datePublished: "2025-01-01" },
      frozenBaselinePublishedDate: "2026-08-12",
    }),
    false,
  );
});

test("coverage inventory reconciles the frozen baseline, 29 new guides and one update ticket", async () => {
  const inventory = await buildGuideCoverageInventory(projectRoot);
  assert.equal(inventory.guideIdentityCount, 221);
  assert.equal(inventory.frozenBaselineIdentityCount, 192);
  assert.equal(inventory.candidateTicketCount, 30);
  assert.equal(inventory.newCandidateIdentityCount, 29);
  assert.equal(inventory.updateCandidateIdentityCount, 1);
  assert.equal(inventory.localeUrlCount, 655);
  assert.equal(inventory.frozenBaselineLocaleUrlCount, 568);
  assert.equal(inventory.sitemapUrlCount, 568);

  const newRows = inventory.rows.filter((row) => row.candidateAction === "new");
  assert.equal(new Set(newRows.map((row) => row.contentId)).size, 29);
  assert.ok(newRows.every((row) => !row.indexApproved && !row.inSitemap));
  const updateRows = inventory.rows.filter((row) => row.candidateAction === "update-existing");
  assert.equal(new Set(updateRows.map((row) => row.contentId)).size, 1);
  assert.ok(updateRows.every((row) =>
    row.governanceSource === "candidate" &&
    row.centralDecision === "pending" &&
    row.status === "review" &&
    row.editorialStatus === "provisional" &&
    row.candidateEditorialStatus === "provisional" &&
    row.effectivePublishedVersion === "frozen-baseline" &&
    row.candidateLastVerified === row.lastVerified &&
    row.effectivePublishedLastVerified === null &&
    row.candidateVersionIndexApproved === false &&
    row.retainsFrozenBaseline === true &&
    row.deploymentBlocked === true &&
    row.candidateVersionInSitemap === false &&
    row.retainedBaselineInSitemap === true &&
    row.inSitemap === true
  ));
  const cantonMetadata = JSON.parse(await readFile(
    path.join(
      projectRoot,
      "content/guides/canton-fair-pazhou-tianhe-yuexiu-hotel-base/metadata.json",
    ),
    "utf8",
  ));
  const cantonRow = inventory.rows.find(
    (row) => row.contentId === "guide-canton-fair-pazhou-tianhe-yuexiu-hotel-base",
  );
  assert.deepEqual(
    cantonRow.entityIds,
    [cantonMetadata.primaryEntityId, ...cantonMetadata.secondaryEntityIds],
    "a governed candidate must use its reviewed primary/secondary entity contract exactly",
  );
  for (const row of inventory.rows) {
    for (const key of [
      "contentId", "locale", "status", "section", "primaryCollectionId",
      "primaryEntityId", "secondaryEntityIds", "path", "lastVerified",
      "freshnessClass", "indexApproved", "inSitemap", "governanceSource",
      "centralDecision", "candidateAction", "baselinePublishedDate",
      "candidateEditorialStatus", "effectivePublishedVersion",
      "candidateLastVerified", "effectivePublishedLastVerified",
      "candidateVersionInSitemap", "retainedBaselineInSitemap",
    ]) {
      assert.ok(key in row, `${row.contentId}/${row.locale} missing ${key}`);
    }
  }
});

test("all 29 pending new candidates remain outside public routes, search and sitemap", async () => {
  const inventory = await buildGuideCoverageInventory(projectRoot);
  const newRows = inventory.rows.filter((row) => row.candidateAction === "new");
  assert.equal(new Set(newRows.map((row) => row.contentId)).size, 29);
  assert.ok(newRows.every((row) =>
    row.centralDecision === "pending" &&
    row.indexApproved === false &&
    row.candidateVersionInSitemap === false &&
    row.inSitemap === false
  ));

  const [registry, routeRuntime, searchRuntime, adapter, sitemap] = await Promise.all([
    readFile(path.join(projectRoot, "lib/guideRegistry.ts"), "utf8"),
    readFile(path.join(projectRoot, "lib/editorialGuideRuntime.ts"), "utf8"),
    readFile(path.join(projectRoot, "lib/guideSearchRuntime.ts"), "utf8"),
    readFile(path.join(projectRoot, "lib/searchPlatformContentAdapter.ts"), "utf8"),
    readFile(path.join(projectRoot, "app/sitemap.ts"), "utf8"),
  ]);
  assert.match(
    registry,
    /export function getIndexApprovedGuides[\s\S]*?isGuideIndexApproved\(entry\)/u,
  );
  assert.match(
    routeRuntime,
    /getTemplateGuideBySlug[\s\S]*?getIndexApprovedGuides\(locale\)\.find/u,
  );
  assert.match(
    routeRuntime,
    /getTemplateGuideParams[\s\S]*?getIndexApprovedGuides\(locale\)\.flatMap/u,
  );
  assert.match(searchRuntime, /guideContentIds: getIndexApprovedGuides\(\)/u);
  assert.match(
    adapter,
    /indexability: governance\.indexApproved[\s\S]*?index: false/u,
  );
  assert.match(sitemap, /getIndexableManifestEntries\(searchPlatformManifest\)/u);
});
