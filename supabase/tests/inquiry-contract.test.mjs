import assert from "node:assert/strict";
import test from "node:test";
import {
  canonicalizeJson,
  computeCanonicalRouteSnapshot,
  currentInquiryFormVersion,
  currentRouteRuleVersion,
  inquirySchemaVersion,
  semanticInquiryPayload,
  travelPartyIds,
  travelStyleIds,
  tripNightsIds,
  tripPaceIds,
  validateAndNormalizeInquiry,
} from "../../lib/inquiryContract.ts";

const validationConfig = {
  allowedFormVersions: [currentInquiryFormVersion],
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

test("rejects control characters and overlong attribution", () => {
  const payload = validPayload();
  payload.note = "normal\u0000hidden";
  payload.attribution.utmCampaign = "x".repeat(101);
  const result = validateAndNormalizeInquiry(payload, validationConfig);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.fieldErrors.note, "invalid_control_character");
  assert.equal(result.fieldErrors["attribution.utmCampaign"], "invalid");
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
