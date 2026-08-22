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
    stay: 28,
    "high-intent-transport": 34,
    plan: 26,
    "purchase-ticket": 2,
  });
  assert.equal(report.uniqueContentIds, 90);
  assert.equal(report.authorizedExistingService, 15);
  assert.equal(report.authorizedGenericConversation, 11);
  assert.equal(report.blockedPendingAuthorization, 64);
  assert.equal(registry.publicCtaChangesAuthorized, false);
  assert.equal(registry.publicServiceLaunchAuthorized, false);
});

test("the content-scale batch adds no paid-service mappings", () => {
  const contentScaleIds = new Set([
    "beijing-capital-or-daxing-airport",
    "changsha-zhangjiajie-transport-route",
    "chengdu-chongqing-station-pair",
    "chengdu-shuangliu-or-tianfu-airport",
    "guangzhou-railway-station-selector",
    "guilin-longji-rice-terraces-transfer",
    "kunming-stone-forest-transport",
    "shanghai-railway-station-selector",
    "xian-railway-station-selector",
    "zhangjiajie-airport-or-railway-station-arrival",
    "chengdu-jiuzhaigou-huanglong-route-order",
    "china-archaeology-ancient-capitals-route",
    "china-buddhist-heritage-route",
    "chinese-gardens-water-towns-complementary-stops",
    "first-solo-trip-china-recoverable-route",
    "guilin-yangshuo-longji-route-order",
    "mainland-china-hong-kong-macao-route-order",
    "north-or-south-china-first-trip",
    "remote-china-attraction-group-tour-private-car-or-diy",
    "xiamen-quanzhou-fujian-tulou-route-order",
    "chengdu-where-to-stay-chunxi-wenshu-kuanzhai",
    "china-hotel-left-item-recovery",
    "china-hotel-room-does-not-match-booking",
    "dali-where-to-stay-old-town-xiaguan-erhai-village",
    "fujian-tulou-stay-inside-or-nearby-hotel",
    "guangzhou-where-to-stay-beijing-road-liwan-tianhe",
    "hangzhou-where-to-stay-hubin-wulin-east-station",
    "pingyao-stay-inside-or-outside-old-city",
    "sanya-where-to-stay-four-bays",
    "suzhou-where-to-stay-old-city-shantang-jinji-lake",
  ]);
  const additions = registry.entries.filter((entry) =>
    contentScaleIds.has(entry.contentId)
  );

  assert.equal(additions.length, 30);
  assert.ok(additions.every((entry) => entry.targetServiceId === null));
  assert.equal(
    additions.filter((entry) =>
      entry.authorizationStatus === "authorized-generic-conversation"
    ).length,
    10,
  );
  assert.equal(
    additions.filter((entry) =>
      entry.authorizationStatus === "blocked-pending-central-authorization"
    ).length,
    20,
  );
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
