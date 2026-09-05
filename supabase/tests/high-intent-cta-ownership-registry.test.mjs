import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { historicalRouteServiceIds as routeServiceIds } from "../../lib/routeServiceInterest.ts";
import {
  loadGuideMetadata,
  loadHighIntentCtaOwnershipRegistry,
  validateHighIntentCtaOwnershipRegistry,
} from "../../tools/check-high-intent-cta-ownership.mjs";

const [registry, guides] = await Promise.all([
  loadHighIntentCtaOwnershipRegistry(),
  loadGuideMetadata(),
]);
const commercialLinkSource = await readFile(
  new URL("../../lib/existingContentCommercialLinks.ts", import.meta.url),
  "utf8",
);
const itineraryReviewSource = await readFile(
  new URL("../../components/ChinaItineraryReviewPage.tsx", import.meta.url),
  "utf8",
);

const expectedPublicCtaContentIds = [
  "beijing-courtyard-hotel-or-modern-hotel",
  "beijing-south-station-to-capital-or-daxing-airport",
  "beijing-where-to-stay-first-trip",
  "chongqing-railway-station-selector",
  "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba",
  "guilin-airport-or-railway-station-arrival-guide",
  "shanghai-hangzhou-transport-route",
  "shanghai-where-to-stay-first-trip",
  "xian-where-to-stay-city-wall-or-dayanta",
  "zhangjiajie-city-or-wulingyuan-hotel-base",
];

function keysFromCommercialBlock(startMarker, endMarker, pattern) {
  const start = commercialLinkSource.indexOf(startMarker);
  const end = commercialLinkSource.indexOf(endMarker, start);
  assert.notEqual(start, -1, `missing ${startMarker}`);
  assert.notEqual(end, -1, `missing ${endMarker}`);
  return [...commercialLinkSource.slice(start, end).matchAll(pattern)]
    .map((match) => match[1])
    .sort();
}

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
  assert.equal(report.authorizedExistingService, 25);
  assert.equal(report.authorizedGenericConversation, 2);
  assert.equal(report.authorizedPublicCtas, 10);
  assert.equal(report.blockedPendingAuthorization, 37);
  assert.equal(registry.publicCtaChangesAuthorized, true);
  assert.equal(registry.publicServiceLaunchAuthorized, false);
  assert.deepEqual(
    [...registry.authorizedPublicCtaContentIds].sort(),
    expectedPublicCtaContentIds,
  );
  assert.equal(registry.requiredPublicCtaCount, 10);
  assert.deepEqual(registry.publicCtaTargetAnchors, {
    "itinerary-review": "review-my-route",
    "full-trip-support": "full-trip-support",
  });
  assert.match(commercialLinkSource, /import ctaOwnershipRegistry from/u);
  assert.doesNotMatch(commercialLinkSource, /const authorizedServiceCtas/u);
  assert.doesNotMatch(commercialLinkSource, /const serviceCtaCopy/u);
  assert.match(
    commercialLinkSource,
    /service=full-trip-support#planner-contact/u,
  );
  assert.match(commercialLinkSource, /entry.targetServiceId === "itinerary-review"\) return null/u);
  assert.doesNotMatch(itineraryReviewSource, /id: "review-my-route"|"@type": "Offer"/u);
});

test("commercial links keep the approved 8 hub, 21 guide and 10 product owners", () => {
  assert.deepEqual(
    keysFromCommercialBlock(
      "const destinationTargets = {",
      "} as const satisfies Record<DestinationHubId",
      /^  ([a-z][a-z0-9]*):/gmu,
    ),
    [
      "beijing",
      "chengdu",
      "chongqing",
      "guangzhou",
      "hangzhou",
      "shanghai",
      "xian",
      "zhangjiajie",
    ],
  );
  assert.deepEqual(
    keysFromCommercialBlock(
      "const guideTargets = {",
      "} as const satisfies Partial<Record<GuideId",
      /^  "([^"]+)":/gmu,
    ),
    [
      "beijing-courtyard-hotel-or-modern-hotel",
      "beijing-to-badaling-great-wall-transfer",
      "beijing-where-to-stay-first-trip",
      "chengdu-panda-base-or-dujiangyan-panda-valley",
      "china-climate-regions-for-trip-timing",
      "china-private-transfer-or-public-transport",
      "chongqing-railway-station-selector",
      "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba",
      "forbidden-city-for-foreign-visitors",
      "great-wall-section-selector-from-beijing",
      "guilin-airport-or-railway-station-arrival-guide",
      "guilin-yangshuo-transport-route",
      "how-to-read-a-suzhou-garden",
      "sanxingdui-museum-booking-and-gallery-order",
      "shanghai-hangzhou-transport-route",
      "shanghai-pudong-or-hongqiao-airport",
      "shanghai-where-to-stay-first-trip",
      "temple-of-heaven-gates-and-ritual-sequence",
      "xian-where-to-stay-city-wall-or-dayanta",
      "yangshuo-town-or-yulong-river-where-to-stay",
      "zhangjiajie-city-or-wulingyuan-hotel-base",
    ],
  );
  assert.deepEqual(
    keysFromCommercialBlock(
      "const productContexts = {",
      "} as const satisfies Record<string, ProductContextDefinition>",
      /^  "([^"]+)":/gmu,
    ),
    [
      "beijing-highlights-5-day-private-tour",
      "chengdu-pandas-sanxingdui-5-day-private-tour",
      "chongqing-wulong-5-day-private-tour",
      "guilin-yangshuo-5-day-private-tour",
      "harbin-winter-5-day-private-tour",
      "shanghai-suzhou-5-day-private-tour",
      "shanghai-suzhou-hangzhou-6-day-private-tour",
      "xian-terracotta-warriors-5-day-private-tour",
      "zhangjiajie-4-day-private-tour",
      "zhangjiajie-forest-4-day-private-tour",
    ],
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

test("an unlisted stay, ticket or transfer intent cannot acquire a service mapping", () => {
  const unauthorized = mutateRegistry((copy) => {
    const entry = copy.entries.find(
      (candidate) =>
        candidate.ownerClass === "stay"
        && candidate.authorizationStatus === "blocked-pending-central-authorization",
    );
    entry.targetServiceId = "route-build";
    entry.authorizationStatus = "authorized-existing-service";
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(unauthorized, guides),
    /UNAUTHORIZED_SERVICE_MAPPING/u,
  );
});

test("an explicitly authorized CTA cannot switch to a different service", () => {
  const mismatched = mutateRegistry((copy) => {
    const entry = copy.entries.find(
      (candidate) =>
        candidate.contentId === "beijing-courtyard-hotel-or-modern-hotel",
    );
    entry.targetServiceId = "route-build";
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(mismatched, guides),
    /AUTHORIZED_SERVICE_MAPPING_MISMATCH/u,
  );
});

test("public CTA copy cannot lose its written service boundaries", () => {
  const unsafeCopy = mutateRegistry((copy) => {
    copy.publicCtaCopy.zh["full-trip-support"].body =
      "我们会处理你的住宿选择。";
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(unsafeCopy, guides),
    /PUBLIC_CTA_SAFETY_BOUNDARY_MISSING/u,
  );
});

test("public CTA copy cannot add a promise outside the reviewed body", () => {
  const unsafeCopy = mutateRegistry((copy) => {
    copy.publicCtaCopy.en["itinerary-review"].title =
      "Guaranteed vehicle, pickup and ticket service";
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(unsafeCopy, guides),
    /PUBLIC_CTA_COPY_REVIEW_REQUIRED/u,
  );
});

test("public CTA owners cannot drop a forbidden-claim boundary", () => {
  const reducedBoundary = mutateRegistry((copy) => {
    const entry = copy.entries.find(
      (candidate) =>
        candidate.contentId === "beijing-courtyard-hotel-or-modern-hotel",
    );
    entry.forbiddenClaims = ["hotel-real-time-availability"];
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(reducedBoundary, guides),
    /PUBLIC_CTA_FORBIDDEN_CLAIMS_DRIFT/u,
  );
});

test("public CTA fragments cannot drift away from real service anchors", () => {
  const wrongAnchor = mutateRegistry((copy) => {
    copy.publicCtaTargetAnchors["itinerary-review"] = "missing-service";
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(wrongAnchor, guides),
    /PUBLIC_CTA_TARGET_ANCHOR_DRIFT/u,
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
