import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { legacySystemContentIds } from "../../lib/legacySystemContentLifecycle.ts";
import { resolveGuideEntities } from "../../lib/searchPlatformGuidePolicy.ts";

const projectRoot = path.resolve(import.meta.dirname, "../..");

async function loadSearchMap() {
  return JSON.parse(await readFile(
    path.join(projectRoot, "docs/organic-growth/search-map.json"),
    "utf8",
  ));
}

async function loadJson(relativePath) {
  return JSON.parse(await readFile(path.join(projectRoot, relativePath), "utf8"));
}

test("the Search Map complete inventory covers every current guide directory", async () => {
  const searchMap = await loadSearchMap();
  const guideDirectories = (await readdir(
    path.join(projectRoot, "content/guides"),
    { withFileTypes: true },
  ))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const inventory = searchMap.coverage.publishedInventory;
  const inventoryIds = new Set(inventory.identityIds);

  assert.equal(searchMap.snapshotDate, "2026-08-23");
  assert.equal(
    inventory.baseCommit,
    "5bd15583c7c03dadc819d19bb4fc2c7f3ceb1b9e",
  );
  assert.equal(inventory.generatedIdentityCount, guideDirectories.length);
  assert.equal(inventory.generatedIdentityCount, 163);
  assert.equal(inventory.protectedLegacyIdentityCount, 19);
  assert.equal(inventory.identityCount, 182);
  assert.equal(inventory.localeUrlCount, 540);
  assert.equal(inventory.identityIds.length, inventory.identityCount);
  assert.equal(inventoryIds.size, inventory.identityCount);
  assert.deepEqual(
    inventory.identityIds,
    [...inventory.identityIds].sort((left, right) => left.localeCompare(right, "en")),
    "the complete inventory must remain deterministically sorted",
  );
  assert.deepEqual(
    guideDirectories.filter((id) => !inventoryIds.has(id)),
    [],
    "every current guide directory must be in the complete Search Map inventory",
  );
  assert.equal(
    inventory.identityIds.filter((id) => !guideDirectories.includes(id)).length,
    inventory.protectedLegacyIdentityCount,
  );
});

test("all eight destination Hubs are published and the old PR 74 queue is empty", async () => {
  const searchMap = await loadSearchMap();
  const hubIds = searchMap.coverage.hubsAndDirectories
    .filter((entry) => entry.role === "destination-hub")
    .map((entry) => entry.id)
    .sort();

  assert.deepEqual(hubIds, [
    "destination-beijing",
    "destination-chengdu",
    "destination-chongqing",
    "destination-guangzhou",
    "destination-hangzhou",
    "destination-shanghai",
    "destination-xian",
    "destination-zhangjiajie",
  ]);
  assert.equal(
    searchMap.inputAudit.currentRepositoryInventory
      .publishedDestinationHubIdentities,
    8,
  );
  assert.deepEqual(searchMap.coverage.inProduction, []);
  assert.equal(
    searchMap.currentBatchExecutionControl.releaseStatus,
    "release-completed-published-live-verified",
  );
  assert.equal(searchMap.currentBatchExecutionControl.authorizationConsumed, true);
  assert.equal(searchMap.currentBatchExecutionControl.newMergeAuthorized, false);
  assert.equal(searchMap.currentBatchExecutionControl.newDeploymentAuthorized, false);

  const inventoryWork = new Map(
    searchMap.currentBatchExecutionControl.inventoryWork
      .map((entry) => [entry.contentId, entry]),
  );
  for (const id of ["chongqing-railway-station-selector", "destination-hangzhou"]) {
    assert.equal(inventoryWork.get(id)?.publicationStatus, "published", id);
    assert.equal(inventoryWork.get(id)?.liveUrls?.length, 3, id);
  }
});

test("published PR 74 candidates and the durable First 24 Hours draft stay distinct", async () => {
  const searchMap = await loadSearchMap();
  const candidates = new Map(
    searchMap.coverage.candidates.map((entry) => [entry.candidateId, entry]),
  );

  for (const id of [
    "destination-20260820-zhangjiajie-city-hub",
    "essentials-20260820-china-online-arrival-card",
    "destination-20260820-zhangjiajie-forest-park-workflow",
  ]) {
    assert.equal(candidates.get(id)?.executionStatus, "release-completed", id);
    assert.equal(candidates.get(id)?.publicationStatus, "published", id);
    assert.equal(candidates.get(id)?.liveUrls?.length, 3, id);
  }

  const deferred = candidates.get("planning-20260820-first-24-hours");
  assert.equal(deferred?.centralDecision, "pending-review");
  assert.equal(deferred?.executionStatus, "draft-submitted");
  assert.equal(deferred?.publicationStatus, "not-published");
  assert.equal(deferred?.durableArtifact, true);
  assert.equal(deferred?.publicImplementationAuthorized, false);
  assert.equal(deferred?.indexablePageAuthorized, false);
  assert.equal(deferred?.publishingAuthorized, false);
  assert.equal(deferred?.draftArtifactPaths?.length, 3);
  for (const artifactPath of deferred.draftArtifactPaths) {
    await access(path.join(projectRoot, artifactPath));
  }
});

test("the 60-guide remote batch is reserved but excluded from published inventory", async () => {
  const searchMap = await loadSearchMap();
  assert.equal(searchMap.remoteDurableDraftBatches.length, 1);
  const batch = searchMap.remoteDurableDraftBatches[0];
  const idsByPool = Object.values(batch.identityIdsByPool);
  const allIds = idsByPool.flat();
  const uniqueIds = new Set(allIds);

  assert.equal(batch.batchId, "content-scale-20260822");
  assert.equal(batch.identityCount, 60);
  assert.equal(batch.localeUrlCount, 180);
  assert.equal(idsByPool.length, 6);
  assert.ok(idsByPool.every((ids) => ids.length === 10));
  assert.equal(uniqueIds.size, 60);
  assert.equal(batch.workerDeliveries.length, 6);
  assert.ok(batch.workerDeliveries.every((delivery) =>
    delivery.identityCount === 10 &&
    delivery.localeUrlCount === 30 &&
    delivery.publicationStatus === "not-published"
  ));
  assert.equal(batch.releaseAuthorization.releaseAuthorized, false);
  assert.equal(batch.releaseAuthorization.mergeAuthorized, false);
  assert.equal(batch.releaseAuthorization.deploymentAuthorized, false);
  assert.equal(batch.draftProductionAuthorization.authorizationConsumed, true);
  assert.equal(batch.draftProductionAuthorization.newIdentityOrAdditionalWorkAuthorized, false);
  assert.equal(batch.integrationReview.pr.endsWith("/pull/84"), true);
  assert.equal(batch.integrationReview.isDraft, true);
  assert.equal(batch.integrationReview.state, "open");
  assert.equal(batch.integrationReview.mergeCommit, null);
  assert.equal(batch.integrationReview.mergeability, "conflicting-with-current-main");

  const employee3 = batch.workerDeliveries.find(
    (delivery) => delivery.ownerPool === "employee-3-culture",
  );
  assert.equal(
    employee3?.publicationGate,
    "HOLD-central-publication-and-date-review-required",
  );
  assert.equal(employee3?.additionalTopicAuthorized, false);
  assert.equal(employee3?.draftDatePlaceholder, "2026-08-20");

  const publishedIds = new Set(searchMap.coverage.publishedInventory.identityIds);
  assert.deepEqual(allIds.filter((id) => publishedIds.has(id)), []);
  const currentGuideDirectories = new Set((await readdir(
    path.join(projectRoot, "content/guides"),
    { withFileTypes: true },
  )).filter((entry) => entry.isDirectory()).map((entry) => entry.name));
  assert.deepEqual(allIds.filter((id) => currentGuideDirectories.has(id)), []);
  assert.deepEqual(searchMap.currentUnpublishedInventorySummary, {
    checkedAt: "2026-08-23",
    remoteDurableGuideDraftIdentities: 60,
    remoteDurableGuideDraftLocaleUrls: 180,
    internalCollectionDraftIdentities: 1,
    releaseAuthorizedProductionQueueIdentities: 0,
    internalNonIdentitySpecifications: 1,
    interpretation: searchMap.currentUnpublishedInventorySummary.interpretation,
  });
});

test("entity evidence and detailed published assignments match current repository sources", async () => {
  const searchMap = await loadSearchMap();
  const assignments = searchMap.taxonomy.entityAssignments;
  const entityRecords = await loadJson("content/entities/core-places.json");
  assert.deepEqual(
    assignments.repositoryEntityIds,
    entityRecords.map((record) => record.data.id),
  );

  for (const evidencePaths of Object.values(assignments.repositoryEntityEvidence)) {
    for (const evidencePath of evidencePaths) {
      await access(path.join(projectRoot, evidencePath));
    }
  }

  const detailedIds = searchMap.coverage.published.map((entry) => entry.id).sort();
  assert.deepEqual(Object.keys(assignments.publishedRepositoryEntityIds).sort(), detailedIds);
  const generatedDirectories = new Set((await readdir(
    path.join(projectRoot, "content/guides"),
    { withFileTypes: true },
  )).filter((entry) => entry.isDirectory()).map((entry) => entry.name));
  const knownNonGeneratedIds = new Set([
    ...searchMap.coverage.publishedInventory.identityIds
      .filter((id) => !generatedDirectories.has(id)),
    "system-entry-requirements",
  ]);
  for (const id of detailedIds) {
    const metadataPath = path.join(projectRoot, "content/guides", id, "metadata.json");
    try {
      const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
      assert.deepEqual(
        [...assignments.publishedRepositoryEntityIds[id]].sort(),
        [...resolveGuideEntities(metadata.destinations).entityIds].sort(),
        id,
      );
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
      assert.equal(knownNonGeneratedIds.has(id), true, id);
    }
  }

  const expectedNonEditorial = legacySystemContentIds.filter(
    (id) => !["guides", "entry-requirements"].includes(id),
  );
  assert.equal(searchMap.coverage.nonEditorialSystemPages.identityCount, 9);
  assert.equal(expectedNonEditorial.length, 9);
  for (const id of expectedNonEditorial) {
    assert.match(searchMap.coverage.nonEditorialSystemPages.scope, new RegExp(id));
  }
});

test("Route Reality remains internal evidence after the public product rejection", async () => {
  const searchMap = await loadSearchMap();
  const routeId = "planning-20260811-01";
  const round = searchMap.roundExecutionControl.observedTicketStates
    .find((entry) => entry.candidateId === routeId);
  const candidate = searchMap.coverage.candidates
    .find((entry) => entry.candidateId === routeId);
  const pool = searchMap.poolDecisions
    .find((entry) => entry.selectedCandidateId === routeId);
  const gate = searchMap.roundExecutionControl.routeRealityCheckerReviewGate;
  const opportunity = searchMap.externalDemandResearch.opportunityClusters
    .find((entry) => entry.clusterId === "market-first-trip-route-reality");
  const ownership = searchMap.queryTaskOwnership
    .find((entry) => entry.cluster === "China itinerary pace and generic duration");
  const ownerUpdate = searchMap.queues.pendingUpdates
    .find((entry) => entry.owner === "is-your-china-itinerary-too-rushed");

  for (const record of [round, candidate, pool, gate]) {
    assert.equal(record?.centralDecision, "rejected");
    assert.equal(record?.decisionScope, "public-product-only-internal-specification-retained");
    assert.equal(record?.publicationStatus, "not-published");
  }
  assert.equal(round.executionStatus, "internal-specification-merged-public-product-closed");
  assert.equal(candidate.executionStatus, "internal-specification-merged-public-product-closed");
  assert.equal(gate.specIntegrationPr.endsWith("/pull/75"), true);
  assert.equal(gate.technicalReviewStatus, "TECHNICAL SPEC REVIEW PASSED");
  for (const field of [
    "publicImplementationAuthorized",
    "indexablePageAuthorized",
    "employee8ImplementationAuthorized",
    "employee8PageCreationAuthorized",
    "publicToolCreationAuthorized",
    "indexingAuthorized",
    "publishingAuthorized",
  ]) {
    assert.equal(gate[field], false, field);
  }
  assert.equal(candidate.publicImplementationAuthorized, false);
  assert.equal(candidate.publicToolCreationAuthorized, false);
  assert.equal(candidate.indexablePageAuthorized, false);
  assert.equal(
    opportunity.recommendedArtifact,
    "update-existing-owner-and-national-planning-hub",
  );
  assert.equal(opportunity.provisionalOwner, "is-your-china-itinerary-too-rushed");
  assert.equal(
    opportunity.status,
    "tool-rejected-route-to-existing-owner-no-new-ticket",
  );
  assert.equal(ownership.canonicalOwner, "is-your-china-itinerary-too-rushed");
  assert.equal(ownership.rejectedToolCandidate, routeId);
  assert.equal("toolOwnerIfApproved" in ownership, false);
  assert.match(ownership.boundary, /sole public owner/u);
  assert.match(ownerUpdate.change, /public product was rejected/u);
  assert.match(ownerUpdate.authorization, /tool ticket is closed/u);
  for (const adjacentId of ["planning-20260811-02", "planning-20260811-03"]) {
    const adjacent = searchMap.coverage.candidates
      .find((entry) => entry.candidateId === adjacentId);
    assert.equal(adjacent.suggestedInternalLinks.includes(routeId), false, adjacentId);
  }
  assert.doesNotMatch(
    searchMap.coverage.candidates
      .find((entry) => entry.candidateId === "planning-20260811-02")
      .sourceReadiness.missing,
    /approved route checker/u,
  );
  await access(path.join(projectRoot, gate.technicalReviewPath));
  await access(path.join(projectRoot, gate.currentSpecificationDirectory));
});

test("every repaired published owner keeps final release evidence", async () => {
  const searchMap = await loadSearchMap();
  const published = new Map(searchMap.coverage.published.map((entry) => [entry.id, entry]));
  const expected = new Map([
    ["forbidden-city-for-foreign-visitors", [24, 86]],
    ["lunar-new-year-customs-for-visitors", [56, 86]],
    ["kaifeng-song-dynasty-urban-landscape", [63]],
    ["shilin-ashima-landscape-story", [63]],
    ["how-to-read-heritage-sites-in-china", [65]],
    ["anshun-dixi-mask-performance-guide", [67]],
    ["liaozhai-zibo-former-residence-liqu-liaozhai-city", [67]],
    ["meizhou-mazu-ancestral-temple-reading-guide", [67]],
  ]);

  for (const [id, [releasePr, latestUpdatePr]] of expected) {
    const entry = published.get(id);
    assert.equal(entry?.status, "published-indexable", id);
    assert.equal(entry?.releasePr?.endsWith(`/pull/${releasePr}`), true, id);
    if (latestUpdatePr) {
      assert.equal(entry?.latestUpdatePr?.endsWith(`/pull/${latestUpdatePr}`), true, id);
    }
    assert.doesNotMatch(
      entry.stateTransition,
      /ready|not[- ]yet[- ]deployed|materialized-for-release|central-release-review|upgrade-prepared/u,
      id,
    );
  }
});
