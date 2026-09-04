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
    stay: 26,
    "high-intent-transport": 25,
    plan: 22,
    "purchase-ticket": 2,
  });
  assert.equal(report.uniqueContentIds, 75);
  assert.equal(report.authorizedExistingService, 20);
  assert.equal(report.authorizedGenericConversation, 2);
  assert.equal(report.blockedPendingAuthorization, 53);
  assert.equal(registry.publicCtaChangesAuthorized, false);
  assert.equal(registry.publicServiceLaunchAuthorized, false);
});

test("the central batch records every new stay and plan owner, not just aggregate counts", () => {
  const expectedOwners = {
    "beijing-datong-pingyao-xian-route-order": "plan",
    "beijing-xian-guilin-shanghai-route-order": "plan",
    "beijing-xian-shanghai-route-order": "plan",
    "china-itinerary-booking-dependency-order": "plan",
    "shanghai-hangzhou-huangshan-route-order": "plan",
    "canton-fair-pazhou-tianhe-yuexiu-hotel-base": "stay",
    "daocheng-yading-village-or-shangri-la-town-hotel-base": "stay",
    "downtown-dunhuang-or-mingsha-mountain-hotel-base": "stay",
    "jiuzhaigou-entrance-or-huanglongjiuzhai-station-hotel-base": "stay",
    "wuzhen-west-scenic-area-inside-or-outside-hotel-base": "stay",
    "xian-or-huayin-mount-hua-hotel-base": "stay",
  };

  for (const [contentId, ownerClass] of Object.entries(expectedOwners)) {
    const entry = registry.entries.find((candidate) => candidate.contentId === contentId);
    assert.ok(entry, `missing CTA owner ${contentId}`);
    assert.equal(entry.ownerClass, ownerClass, contentId);
    assert.equal(entry.originContentId, contentId, contentId);
    if (ownerClass === "stay") {
      assert.equal(entry.authorizationStatus, "blocked-pending-central-authorization", contentId);
      assert.equal(entry.targetServiceId, null, contentId);
    } else {
      assert.equal(entry.authorizationStatus, "authorized-existing-service", contentId);
      assert.equal(entry.targetServiceId, "itinerary-review", contentId);
    }
  }
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
