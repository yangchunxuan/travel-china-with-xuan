import assert from "node:assert/strict";
import test from "node:test";
import {
  canonicalizeJson,
  computeCanonicalRouteSnapshot,
  currentDestinationInquiryFormVersion,
  currentInquiryFormVersion,
  currentRouteRuleVersion,
  destinationInquirySchemaVersion,
  destinationTimingRuleVersion,
  inquirySchemaVersion,
  semanticInquiryPayload,
  travelPartyIds,
  travelStyleIds,
  tripNightsIds,
  tripPaceIds,
  validateAndNormalizeInquiry,
} from "../../lib/inquiryContract.ts";

const validationConfig = {
  allowedFormVersions: [
    currentInquiryFormVersion,
    currentDestinationInquiryFormVersion,
  ],
  allowedPrivacyNoticeVersions: ["test-privacy-v1"],
  whatsappEnabled: false,
};

function validPayload() {
  const answers = {
    party: "couple",
    travelStyle: "classic",
    nights: "14",
    pace: "balanced",
  };
  const route = computeCanonicalRouteSnapshot(answers);
  return {
    schemaVersion: inquirySchemaVersion,
    formVersion: currentInquiryFormVersion,
    entryPath: "generated_route",
    locale: "en",
    journey: {
      journeyId: "6cf3c986-1713-4bc7-b3dd-2a1f5c00e995",
      revision: 1,
      answers,
      routeId: route.routeId,
      ruleVersion: currentRouteRuleVersion,
    },
    contact: {
      channel: "email",
      email: "Traveller@Example.COM",
    },
    note: "Flights are already booked.",
    privacyNoticeVersion: "test-privacy-v1",
    attribution: {
      landingPath: "/",
      utmSource: "youtube",
      utmMedium: "video",
      utmCampaign: "first-china-trip",
    },
    experiment: null,
    antiAbuse: {
      companyWebsite: "",
    },
  };
}

function validDestinationPayload() {
  return {
    schemaVersion: destinationInquirySchemaVersion,
    formVersion: currentDestinationInquiryFormVersion,
    entryPath: "destination_timing",
    locale: "en",
    journey: {
      journeyId: "7aa3c986-1713-4bc7-b3dd-2a1f5c00e995",
      revision: 1,
      answers: {
        destinationMode: "wishlist",
        destinationIds: [
          "beijing-great-wall",
          "shanghai",
          "xian",
          "zhangjiajie",
        ],
        otherPlace: null,
        totalNights: 9,
        party: "two-adults",
        pace: "classic",
        mustSeeIds: ["beijing-great-wall", "shanghai"],
      },
      routeId: "destination-timing",
      ruleVersion: destinationTimingRuleVersion,
    },
    contact: {
      channel: "email",
      email: "Traveller@Example.COM",
    },
    note: "Please keep every selected place in the planner handoff.",
    privacyNoticeVersion: "test-privacy-v1",
    attribution: {
      landingPath: "/?utm_source=youtube",
      utmSource: "youtube",
      utmMedium: "video",
      utmCampaign: "wish-list",
    },
    experiment: null,
    antiAbuse: {
      companyWebsite: "",
    },
  };
}

test("normalizes a valid email Inquiry and recomputes its route", () => {
  const result = validateAndNormalizeInquiry(
    validPayload(),
    validationConfig,
  );
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.value.contact, {
    channel: "email",
    email: "Traveller@example.com",
  });
  assert.equal(result.value.routeSnapshot.routeId, "classic-14-standard");
  assert.equal(result.value.routeSnapshot.totalNights, 14);
});

test("rejects ambiguous or non-routable email addresses", () => {
  for (const email of [
    "a,b@example.com",
    "<x>@example.com",
    "a..b@example.com",
    ".ab@example.com",
    "ab.@example.com",
    "traveller@localhost",
  ]) {
    const payload = validPayload();
    payload.contact.email = email;
    const result = validateAndNormalizeInquiry(payload, validationConfig);
    assert.equal(result.ok, false, email);
    if (result.ok) continue;
    assert.equal(result.fieldErrors["contact.email"], "invalid", email);
  }
});

test("rejects unknown fields at every structured boundary", () => {
  const payload = validPayload();
  payload.cityChoices = ["Beijing"];
  payload.journey.answers.extra = true;
  const result = validateAndNormalizeInquiry(payload, validationConfig);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.fieldErrors.cityChoices, "unknown");
  assert.equal(result.fieldErrors["journey.answers.extra"], "unknown");
});

test("rejects a forged route ID", () => {
  const payload = validPayload();
  payload.journey.routeId = "food-14-standard";
  const result = validateAndNormalizeInquiry(payload, validationConfig);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.code, "route_mismatch");
});

test("rejects an unsupported rule version", () => {
  const payload = validPayload();
  payload.journey.ruleVersion = "2099-01-01.1";
  const result = validateAndNormalizeInquiry(payload, validationConfig);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.code, "unsupported_rule_version");
});

test("keeps WhatsApp disabled unless explicitly enabled", () => {
  const payload = validPayload();
  payload.contact = {
    channel: "whatsapp",
    phoneRaw: "+44 7700 900123",
  };
  const result = validateAndNormalizeInquiry(payload, validationConfig);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.code, "whatsapp_disabled");
});

test("rejects control characters while dropping invalid attribution", () => {
  const payload = validPayload();
  payload.note = "normal\u0000hidden";
  payload.attribution.utmCampaign = "x".repeat(101);
  const result = validateAndNormalizeInquiry(payload, validationConfig);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.fieldErrors.note, "invalid_control_character");
  assert.equal(result.fieldErrors["attribution.utmCampaign"], undefined);
});

test("invalid UTM labels never block an otherwise valid inquiry", () => {
  const payload = validDestinationPayload();
  payload.attribution.utmSource = "youtube\u202ehidden";
  payload.attribution.utmMedium = { unexpected: true };
  payload.attribution.utmCampaign = "x".repeat(101);
  const result = validateAndNormalizeInquiry(payload, validationConfig);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.value.attribution.utmSource, null);
  assert.equal(result.value.attribution.utmMedium, null);
  assert.equal(result.value.attribution.utmCampaign, null);
});

test("V1 also drops invalid UTM labels without blocking an inquiry", () => {
  const payload = validPayload();
  payload.attribution.utmSource = "reddit\u200fhidden";
  payload.attribution.utmMedium = { unexpected: true };
  payload.attribution.utmCampaign = "x".repeat(101);
  const result = validateAndNormalizeInquiry(payload, validationConfig);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.value.attribution.utmSource, null);
  assert.equal(result.value.attribution.utmMedium, null);
  assert.equal(result.value.attribution.utmCampaign, null);
});

test("rejects bidirectional text controls in traveller-provided copy", () => {
  const payload = validDestinationPayload();
  payload.journey.answers.otherPlace = "Shanghai\u200fexample.com";
  payload.note = "Please open\u061c this link";
  const result = validateAndNormalizeInquiry(payload, validationConfig);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.fieldErrors["journey.answers.otherPlace"], "invalid");
  assert.equal(result.fieldErrors.note, "invalid_control_character");
});

test("canonical JSON is stable across input key order", () => {
  assert.equal(
    canonicalizeJson({ z: 2, a: { y: true, x: null } }),
    canonicalizeJson({ a: { x: null, y: true }, z: 2 }),
  );
});

test("all 300 answer combinations produce valid current routes", () => {
  const routeIds = new Set();
  for (const party of travelPartyIds) {
    for (const travelStyle of travelStyleIds) {
      for (const nights of tripNightsIds) {
        for (const pace of tripPaceIds) {
          const snapshot = computeCanonicalRouteSnapshot({
            party,
            travelStyle,
            nights,
            pace,
          });
          assert.equal(snapshot.ruleVersion, currentRouteRuleVersion);
          assert.equal(snapshot.totalNights, Number(nights));
          assert.equal(
            snapshot.betweenCityMoves,
            snapshot.cityNights.length - 1,
          );
          routeIds.add(snapshot.routeId);
        }
      }
    }
  }
  assert.equal(routeIds.size, 28);
});

test("semantic payload excludes the honeypot", () => {
  const result = validateAndNormalizeInquiry(
    validPayload(),
    validationConfig,
  );
  assert.equal(result.ok, true);
  if (!result.ok) return;
  const canonical = canonicalizeJson(semanticInquiryPayload(result.value));
  assert.equal(canonical.includes("companyWebsite"), false);
  assert.equal(canonical.includes("antiAbuse"), false);
});

test("V3 preserves the complete wish list and recomputes timing on the server", () => {
  const payload = validDestinationPayload();
  const result = validateAndNormalizeInquiry(payload, validationConfig);
  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.equal(result.value.schemaVersion, destinationInquirySchemaVersion);
  assert.deepEqual(
    result.value.journey.answers.destinationIds,
    payload.journey.answers.destinationIds,
  );
  assert.deepEqual(result.value.journey.answers.mustSeeIds, [
    "beijing-great-wall",
    "shanghai",
  ]);
  assert.equal(result.value.routeSnapshot.essentialsMinimumNights, 10);
  assert.deepEqual(result.value.routeSnapshot.selectedPaceRange, {
    minNights: 11,
    maxNights: 14,
  });
  assert.equal(result.value.routeSnapshot.status, "needs_prioritization");
  assert.equal(result.value.routeSnapshot.routeFeasibility, "unverified");
});

test("V3 never accepts a client-authored timing snapshot", () => {
  const payload = validDestinationPayload();
  payload.timingSnapshot = {
    status: "within_reference_range",
    essentialsMinimumNights: 1,
  };
  const result = validateAndNormalizeInquiry(payload, validationConfig);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.fieldErrors.timingSnapshot, "unknown");
});

test("schema generations cannot borrow each other's form version", () => {
  const legacy = validPayload();
  legacy.formVersion = currentDestinationInquiryFormVersion;
  const legacyResult = validateAndNormalizeInquiry(
    legacy,
    validationConfig,
  );
  assert.equal(legacyResult.ok, false);
  if (!legacyResult.ok) {
    assert.equal(legacyResult.code, "unsupported_form_version");
  }

  const destination = validDestinationPayload();
  destination.formVersion = currentInquiryFormVersion;
  const destinationResult = validateAndNormalizeInquiry(
    destination,
    validationConfig,
  );
  assert.equal(destinationResult.ok, false);
  if (!destinationResult.ok) {
    assert.equal(destinationResult.code, "unsupported_form_version");
  }
});

test("V3 keeps Other outside the calculator and supports Other-only handoff", () => {
  const payload = validDestinationPayload();
  payload.journey.answers.destinationIds = [];
  payload.journey.answers.otherPlace = "  Huangshan Scenic Area  ";
  payload.journey.answers.mustSeeIds = [];
  const result = validateAndNormalizeInquiry(payload, validationConfig);
  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.equal(
    result.value.journey.answers.otherPlace,
    "Huangshan Scenic Area",
  );
  assert.equal(result.value.routeSnapshot.status, "manual_only");
  assert.equal(result.value.routeSnapshot.essentialsMinimumNights, null);
});

test("V3 uses Unicode code points consistently for Other length", () => {
  const accepted = validDestinationPayload();
  accepted.journey.answers.destinationIds = [];
  accepted.journey.answers.mustSeeIds = [];
  accepted.journey.answers.otherPlace = "🗺️".repeat(40);
  const acceptedResult = validateAndNormalizeInquiry(
    accepted,
    validationConfig,
  );
  assert.equal(acceptedResult.ok, true);

  const rejected = validDestinationPayload();
  rejected.journey.answers.destinationIds = [];
  rejected.journey.answers.mustSeeIds = [];
  rejected.journey.answers.otherPlace = "😀".repeat(121);
  const rejectedResult = validateAndNormalizeInquiry(
    rejected,
    validationConfig,
  );
  assert.equal(rejectedResult.ok, false);
  if (!rejectedResult.ok) {
    assert.equal(
      rejectedResult.fieldErrors["journey.answers.otherPlace"],
      "invalid",
    );
  }
});

test("V3 never stores a WhatsApp phone even when the V1 feature flag is enabled", () => {
  const payload = validDestinationPayload();
  payload.contact = {
    channel: "whatsapp",
    phoneRaw: "+44 7700 900123",
  };
  const result = validateAndNormalizeInquiry(payload, {
    ...validationConfig,
    whatsappEnabled: true,
  });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.code, "whatsapp_disabled");
});

test("V3 classic-start is an explicit manual-only placeholder, not a fake template", () => {
  const payload = validDestinationPayload();
  payload.journey.answers.destinationMode = "classic-start";
  payload.journey.answers.destinationIds = [];
  payload.journey.answers.mustSeeIds = [];
  const result = validateAndNormalizeInquiry(payload, validationConfig);
  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.equal(result.value.routeSnapshot.status, "manual_only");
  assert.equal(result.value.routeSnapshot.knownDestinationCount, 0);
  assert.equal(result.value.routeSnapshot.routeFeasibility, "unverified");
});

test("V3 must-see choices are only accepted for a real known-place conflict", () => {
  const payload = validDestinationPayload();
  payload.journey.answers.destinationIds = ["shanghai"];
  payload.journey.answers.totalNights = 3;
  payload.journey.answers.mustSeeIds = ["shanghai"];
  const result = validateAndNormalizeInquiry(payload, validationConfig);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(
    result.fieldErrors["journey.answers.mustSeeIds"],
    "not_applicable",
  );
});

test("V3 semantic hash includes every human-handoff answer", () => {
  const result = validateAndNormalizeInquiry(
    validDestinationPayload(),
    validationConfig,
  );
  assert.equal(result.ok, true);
  if (!result.ok) return;
  const canonical = canonicalizeJson(semanticInquiryPayload(result.value));

  for (const value of [
    "beijing-great-wall",
    "zhangjiajie",
    "two-adults",
    "classic",
    "Please keep every selected place in the planner handoff.",
  ]) {
    assert.equal(canonical.includes(value), true);
  }
  assert.equal(canonical.includes("routeSnapshot"), false);
});
