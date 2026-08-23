import assert from "node:assert/strict";
import test from "node:test";

import { routeServiceIds } from "../../lib/routeServiceInterest.ts";
import {
  loadGuideMetadata,
  loadHighIntentCtaOwnershipRegistry,
  validateHighIntentCtaOwnershipRegistry,
} from "../../tools/check-high-intent-cta-ownership.mjs";

const [registry, guides] = await Promise.all([
  loadHighIntentCtaOwnershipRegistry(),
  loadGuideMetadata(),
]);

function mutateRegistry(mutator) {
  const copy = structuredClone(registry);
  mutator(copy);
  return copy;
}

test("phase-one CTA ownership covers the exact high-intent inventory", () => {
  const report = validateHighIntentCtaOwnershipRegistry(
    registry,
    guides,
    routeServiceIds,
  );

  assert.deepEqual(report.counts, {
    stay: 20,
    "high-intent-transport": 25,
    plan: 17,
    "purchase-ticket": 2,
  });
  assert.equal(report.uniqueContentIds, 64);
  assert.equal(report.authorizedExistingService, 15);
  assert.equal(report.authorizedGenericConversation, 2);
  assert.equal(report.blockedPendingAuthorization, 47);
  assert.equal(registry.publicCtaChangesAuthorized, false);
  assert.equal(registry.publicServiceLaunchAuthorized, false);
});

test("duplicate CTA owners fail closed", () => {
  const duplicate = mutateRegistry((copy) => {
    copy.entries.push(structuredClone(copy.entries[0]));
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(duplicate, guides),
    /DUPLICATE_CTA_OWNER/u,
  );
});

test("unknown content identities fail closed", () => {
  const unknownContent = mutateRegistry((copy) => {
    copy.entries[0].contentId = "not-a-canonical-guide";
    copy.entries[0].originContentId = "not-a-canonical-guide";
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(unknownContent, guides),
    /UNKNOWN_CONTENT_ID/u,
  );
});

test("unknown service identities fail closed", () => {
  const unknownService = mutateRegistry((copy) => {
    const entry = copy.entries.find((candidate) => candidate.ownerClass === "plan");
    entry.targetServiceId = "ticket-booking";
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(unknownService, guides),
    /UNKNOWN_SERVICE_ID/u,
  );
});

test("blocked stay, ticket or transfer intents cannot acquire a service mapping", () => {
  const unauthorized = mutateRegistry((copy) => {
    const entry = copy.entries.find((candidate) => candidate.ownerClass === "stay");
    entry.targetServiceId = "route-build";
    entry.authorizationStatus = "authorized-existing-service";
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(unauthorized, guides),
    /UNAUTHORIZED_SERVICE_MAPPING/u,
  );
});

test("a missing high-intent owner fails closed", () => {
  const missing = mutateRegistry((copy) => {
    copy.entries = copy.entries.slice(1);
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(missing, guides),
    /MISSING_HIGH_INTENT_OWNER/u,
  );
});
