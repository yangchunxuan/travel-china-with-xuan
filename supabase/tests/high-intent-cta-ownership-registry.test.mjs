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
const singaporeVisaSource = await readFile(
  new URL("../../lib/singaporeChinaVisaI18n.ts", import.meta.url),
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
    "high-intent-transport": 26,
    plan: 25,
    "purchase-ticket": 3,
  });
  assert.equal(report.uniqueContentIds, 74);
  assert.equal(report.authorizedExistingService, 25);
  assert.equal(report.authorizedGenericConversation, 11);
  assert.equal(report.authorizedPublicCtas, 10);
  assert.equal(report.guideInlineSalesCards, 6);
  assert.equal(report.blockedPendingAuthorization, 38);
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

test("commercial links keep the approved 8 hub, 31 guide and 11 product owners", () => {
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
      "best-zhangjiajie-night-show",
      "border-town-fenghuang-chadong-shen-congwen",
      "chengdu-panda-base-or-dujiangyan-panda-valley",
      "chengdu-zhangjiajie-itinerary",
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
      "singapore-to-zhangjiajie-itinerary",
      "temple-of-heaven-gates-and-ritual-sequence",
      "tianmen-mountain-tickets-and-routes",
      "xian-where-to-stay-city-wall-or-dayanta",
      "yangshuo-town-or-yulong-river-where-to-stay",
      "zhangjiajie-arrival-departure-stations",
      "zhangjiajie-city-or-wulingyuan-hotel-base",
      "zhangjiajie-from-malaysia",
      "zhangjiajie-furong-fenghuang-route-order",
      "zhangjiajie-glass-bridge-vs-skywalk",
      "zhangjiajie-itinerary",
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
      "zhangjiajie-furong-fenghuang-7-day-private-tour",
    ],
  );
});

test("Zhangjiajie commercial routes and Singapore planning links stay distinct", () => {
  assert.match(
    commercialLinkSource,
    /"best-zhangjiajie-night-show": \[classicZhangjiajie\]/u,
  );
  assert.match(
    commercialLinkSource,
    /"zhangjiajie-glass-bridge-vs-skywalk": \[classicZhangjiajie\]/u,
  );
  assert.match(
    commercialLinkSource,
    /"zhangjiajie-itinerary": \[\s*p\("zhangjiajie-furong-fenghuang-7-day-private-tour"\),\s*classicZhangjiajie,\s*\]/u,
  );
  assert.equal(
    [...singaporeVisaSource.matchAll(/id: "singapore-to-zhangjiajie-itinerary"/gu)].length,
    3,
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

function inlineCard(copy, contentId) {
  return copy.guideInlineSalesCards.find((card) => card.contentId === contentId);
}

function ownerEntry(copy, contentId) {
  return copy.entries.find((entry) => entry.contentId === contentId);
}

test("inline sales cards record the six guide owners and their exact CTA kinds", () => {
  assert.deepEqual(
    registry.guideInlineSalesCards.map((card) => [
      card.contentId,
      card.ctaKind,
      card.ctaTarget,
      card.placement,
      card.image,
    ]),
    [
      ["zhangjiajie-older-travellers", "private-tour-product", "zhangjiajie-4-day-private-tour", "guide-inline", "product"],
      ["china-itinerary-with-older-parents", "private-tour-collection", "private-tours", "guide-inline", "beijing-tour-photo"],
      ["china-itinerary-with-young-children", "private-tour-collection", "private-tours", "guide-inline", "beijing-tour-photo"],
      ["do-singaporeans-need-visa-china", "private-tour-collection", "private-tours", "guide-inline", "beijing-tour-photo"],
      ["wheelchair-accessible-china-route-planning", "trip-consultation", "full-trip-support", "guide-inline", "wheelchair-guide-photo"],
      ["china-accessible-hotel-room-verification", "trip-consultation", "full-trip-support", "guide-inline", "hotel-guide-photo"],
    ],
  );
  for (const card of registry.guideInlineSalesCards) {
    assert.ok(card.forbiddenClaims.includes("fit-verification-claim"), card.contentId);
  }

  const hotel = ownerEntry(registry, "china-accessible-hotel-room-verification");
  assert.equal(hotel.ctaPlacement, "guide-inline-card");
  assert.equal(hotel.targetServiceId, "full-trip-support");
  assert.equal(hotel.authorizationStatus, "authorized-existing-service");
  for (const claim of [
    "hotel-real-time-availability",
    "hotel-guest-acceptance-guarantee",
    "hotel-price-room-guarantee",
    "sensitive-data-first-contact",
  ]) {
    assert.ok(hotel.forbiddenClaims.includes(claim), claim);
  }
  assert.ok(!registry.authorizedPublicCtaContentIds.includes(hotel.contentId));

  const wheelchair = ownerEntry(registry, "wheelchair-accessible-china-route-planning");
  assert.equal(wheelchair.ctaPlacement, "guide-inline-card");
  assert.equal(wheelchair.targetServiceId, "full-trip-support");

  const children = ownerEntry(registry, "china-itinerary-with-young-children");
  assert.equal(children.ctaPlacement, "guide-inline-card");
  assert.equal(children.targetServiceId, null);
  assert.equal(children.authorizationStatus, "authorized-generic-conversation");
});

test("an inline card cannot point at an unknown guide or kind", () => {
  const unknownGuide = mutateRegistry((copy) => {
    inlineCard(copy, "do-singaporeans-need-visa-china").contentId = "not-a-guide";
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(unknownGuide, guides),
    /UNKNOWN_GUIDE_INLINE_CONTENT_ID/u,
  );

  const unknownKind = mutateRegistry((copy) => {
    inlineCard(copy, "do-singaporeans-need-visa-china").ctaKind = "matching-product";
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(unknownKind, guides),
    /UNKNOWN_GUIDE_INLINE_CTA_KIND/u,
  );
});

test("a consultation card cannot be quietly turned into a product card", () => {
  const productOnAccessPage = mutateRegistry((copy) => {
    const card = inlineCard(copy, "wheelchair-accessible-china-route-planning");
    card.ctaKind = "private-tour-product";
    card.ctaTarget = "beijing-highlights-5-day-private-tour";
    card.image = "product";
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(productOnAccessPage, guides),
    /GUIDE_INLINE_SERVICE_MISMATCH/u,
  );

  const productOnHotelPage = mutateRegistry((copy) => {
    const card = inlineCard(copy, "china-accessible-hotel-room-verification");
    card.ctaKind = "private-tour-product";
    card.ctaTarget = "shanghai-suzhou-5-day-private-tour";
    card.image = "product";
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(productOnHotelPage, guides),
    /UNAUTHORIZED_SERVICE_MAPPING/u,
  );
});

test("inline cards cannot drop the fit-verification or hotel boundaries", () => {
  const noFitBoundary = mutateRegistry((copy) => {
    const card = inlineCard(copy, "china-itinerary-with-young-children");
    card.forbiddenClaims = card.forbiddenClaims.filter(
      (claim) => claim !== "fit-verification-claim",
    );
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(noFitBoundary, guides),
    /GUIDE_INLINE_FIT_CLAIM_BOUNDARY_MISSING/u,
  );

  const noRoomBoundary = mutateRegistry((copy) => {
    const entry = ownerEntry(copy, "china-accessible-hotel-room-verification");
    entry.forbiddenClaims = entry.forbiddenClaims.filter(
      (claim) => claim !== "hotel-price-room-guarantee",
    );
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(noRoomBoundary, guides),
    /PUBLIC_CTA_FORBIDDEN_CLAIMS_DRIFT/u,
  );
});

test("inline cards only use the reviewed non-generated photographs", () => {
  const newImage = mutateRegistry((copy) => {
    inlineCard(copy, "china-itinerary-with-older-parents").image = "ai-family-hero";
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(newImage, guides),
    /GUIDE_INLINE_IMAGE_NOT_ALLOWED/u,
  );
});

test("registry placement and inline cards must agree in both directions", () => {
  const cardWithoutOwner = mutateRegistry((copy) => {
    ownerEntry(copy, "china-itinerary-with-young-children").ctaPlacement = "existing-guide-footer";
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(cardWithoutOwner, guides),
    /GUIDE_INLINE_OWNER_PLACEMENT_MISMATCH/u,
  );

  const ownerWithoutCard = mutateRegistry((copy) => {
    copy.guideInlineSalesCards = copy.guideInlineSalesCards.filter(
      (card) => card.contentId !== "wheelchair-accessible-china-route-planning",
    );
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(ownerWithoutCard, guides),
    /GUIDE_INLINE_CARD_MISSING/u,
  );

  const duplicate = mutateRegistry((copy) => {
    copy.guideInlineSalesCards.push(structuredClone(copy.guideInlineSalesCards[0]));
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(duplicate, guides),
    /DUPLICATE_GUIDE_INLINE_SALES_CARD/u,
  );
});
