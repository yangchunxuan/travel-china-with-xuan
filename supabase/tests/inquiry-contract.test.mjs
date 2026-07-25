import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import {
  budgetDestinationInquiryFormVersion,
  budgetPrivacyNoticeVersion,
  canonicalizeJson,
  computeCanonicalRouteSnapshot,
  currentDestinationInquiryFormVersion,
  currentInquiryFormVersion,
  currentPrivacyNoticeVersion,
  currentRouteRuleVersion,
  destinationInquirySchemaVersion,
  destinationTimingRuleVersion,
  inquirySchemaVersion,
  inquirySubmitSurfaceByLocale,
  legacyDestinationInquiryFormVersion,
  legacyPrivacyNoticeVersion,
  previousDestinationInquiryFormVersion,
  previousPrivacyNoticeVersion,
  semanticInquiryPayload,
  submitSurfaceDestinationInquiryFormVersion,
  submitSurfacePrivacyNoticeVersion,
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
  allowedPrivacyNoticeVersions: [
    "test-privacy-v1",
    legacyPrivacyNoticeVersion,
    previousPrivacyNoticeVersion,
    budgetPrivacyNoticeVersion,
    submitSurfacePrivacyNoticeVersion,
    currentPrivacyNoticeVersion,
  ],
  whatsappEnabled: false,
};

function semanticHash(value) {
  return createHash("sha256")
    .update(canonicalizeJson(semanticInquiryPayload(value)))
    .digest("hex");
}

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
    departureCountry: null,
    roughBudgetPerPerson: null,
    note: "Please keep every selected place in the planner handoff.",
    privacyNoticeVersion: currentPrivacyNoticeVersion,
    attribution: {
      landingPath: inquirySubmitSurfaceByLocale.en,
      entryPath: "/guides/is-your-china-itinerary-too-rushed/",
      sourceGuide: "is-your-china-itinerary-too-rushed",
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
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

test("the fixed-submit-surface form rejects fields it never supported", () => {
  const payload = validDestinationPayload();
  payload.formVersion = submitSurfaceDestinationInquiryFormVersion;
  payload.privacyNoticeVersion = submitSurfacePrivacyNoticeVersion;
  payload.attribution = {
    landingPath: inquirySubmitSurfaceByLocale.en,
    utmSource: "youtube\u202ehidden",
    utmMedium: { unexpected: true },
    utmCampaign: "x".repeat(101),
  };
  const result = validateAndNormalizeInquiry(payload, {
    ...validationConfig,
    allowedFormVersions: [
      ...validationConfig.allowedFormVersions,
      submitSurfaceDestinationInquiryFormVersion,
    ],
  });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.fieldErrors["attribution.utmSource"], "unknown");
  assert.equal(result.fieldErrors["attribution.utmMedium"], "unknown");
  assert.equal(result.fieldErrors["attribution.utmCampaign"], "unknown");
});

test("current destination inquiries accept only the locale submit surface", () => {
  for (const [locale, landingPath] of Object.entries(
    inquirySubmitSurfaceByLocale,
  )) {
    const payload = validDestinationPayload();
    payload.locale = locale;
    payload.attribution.landingPath = landingPath;
    const result = validateAndNormalizeInquiry(payload, validationConfig);
    assert.equal(result.ok, true, locale);
    if (!result.ok) continue;
    assert.deepEqual(result.value.attribution, {
      landingPath,
      entryPath: "/guides/is-your-china-itinerary-too-rushed/",
      sourceGuide: "is-your-china-itinerary-too-rushed",
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
      gclid: null,
      fbclid: null,
      adClickAt: null,
    });
  }

  const forged = validDestinationPayload();
  forged.attribution.landingPath = "/guides/zhangjiajie/";
  const forgedResult = validateAndNormalizeInquiry(
    forged,
    validationConfig,
  );
  assert.equal(forgedResult.ok, false);
  if (!forgedResult.ok) {
    assert.equal(
      forgedResult.fieldErrors["attribution.landingPath"],
      "invalid",
    );
  }
});

test("current destination attribution keeps bounded external labels and drops an invalid guide ID", () => {
  const payload = validDestinationPayload();
  payload.attribution = {
    landingPath: inquirySubmitSurfaceByLocale.en,
    entryPath: "/guides/china-visa-free-canadian-citizens-2026/",
    sourceGuide: "traveller@example.com",
    utmSource: "Google",
    utmMedium: "organic",
    utmCampaign: "加拿大免签",
    utmContent: "search-result",
    gclid: "Cj0KCQjw_-_ABhC-ARIsAAWQ9ZR3lm2Q",
    fbclid: "IwZXh0bgNhZW0BMAABHqK-3lm2Q_rTn0aZ",
  };
  const result = validateAndNormalizeInquiry(payload, validationConfig);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.value.attribution, {
    landingPath: inquirySubmitSurfaceByLocale.en,
    entryPath: "/guides/china-visa-free-canadian-citizens-2026/",
    sourceGuide: null,
    utmSource: "Google",
    utmMedium: "organic",
    utmCampaign: "加拿大免签",
    utmContent: "search-result",
    gclid: "Cj0KCQjw_-_ABhC-ARIsAAWQ9ZR3lm2Q",
    adClickAt: null,
    fbclid: "IwZXh0bgNhZW0BMAABHqK-3lm2Q_rTn0aZ",
  });
});

test("a forged click id carrying traveller text is dropped, not stored", () => {
  for (const key of ["gclid", "fbclid"]) {
    for (const clickId of [
      "traveller@example.com",
      "note about Alice",
      "+44 7700 900000",
      `${"x".repeat(513)}`,
    ]) {
      const payload = validDestinationPayload();
      payload.attribution[key] = clickId;
      const result = validateAndNormalizeInquiry(payload, validationConfig);
      assert.equal(result.ok, true, `${key}: ${clickId}`);
      if (!result.ok) continue;
      assert.equal(
        result.value.attribution[key],
        null,
        `${key}: ${clickId}`,
      );
    }
  }
});

test("current destination attribution requires a bounded first public entry path", () => {
  for (const entryPath of [
    "",
    "guides/zhangjiajie/",
    "//external.example/path",
    "https://external.example/path",
    "/guides/zhangjiajie/?email=traveller@example.com",
    "/guides/zhangjiajie/#private-note",
    "/traveller@example.com",
    "/guides/not-a-real-public-guide/",
    `/${"x".repeat(200)}`,
  ]) {
    const payload = validDestinationPayload();
    payload.attribution.entryPath = entryPath;
    const result = validateAndNormalizeInquiry(payload, validationConfig);
    assert.equal(result.ok, false, entryPath);
    if (result.ok) continue;
    assert.equal(
      result.fieldErrors["attribution.entryPath"],
      "invalid",
      entryPath,
    );
  }
});

test("the 20 July budget form remains replay-compatible", () => {
  const payload = validDestinationPayload();
  payload.formVersion = budgetDestinationInquiryFormVersion;
  payload.privacyNoticeVersion = budgetPrivacyNoticeVersion;
  payload.attribution = {
    landingPath: "/?utm_source=youtube",
    utmSource: "youtube",
    utmMedium: "video",
    utmCampaign: "wish-list",
  };
  const result = validateAndNormalizeInquiry(payload, {
    ...validationConfig,
    allowedFormVersions: [
      ...validationConfig.allowedFormVersions,
      budgetDestinationInquiryFormVersion,
    ],
    allowedPrivacyNoticeVersions: [
      ...validationConfig.allowedPrivacyNoticeVersions,
      budgetPrivacyNoticeVersion,
    ],
  });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.value.roughBudgetPerPerson, null);
  assert.deepEqual(result.value.attribution, payload.attribution);
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

test("current destination budget is an independent optional one-line field", () => {
  const empty = validDestinationPayload();
  empty.roughBudgetPerPerson = "   ";
  const emptyResult = validateAndNormalizeInquiry(
    empty,
    validationConfig,
  );
  assert.equal(emptyResult.ok, true);
  if (!emptyResult.ok) return;
  assert.equal(emptyResult.value.roughBudgetPerPerson, null);

  const accepted = validDestinationPayload();
  accepted.roughBudgetPerPerson = `  ${"😀".repeat(100)}  `;
  accepted.note = "Keep the walking days gentle.";
  const acceptedResult = validateAndNormalizeInquiry(
    accepted,
    validationConfig,
  );
  assert.equal(acceptedResult.ok, true);
  if (!acceptedResult.ok) return;
  assert.equal(
    acceptedResult.value.roughBudgetPerPerson,
    "😀".repeat(100),
  );
  assert.equal(
    acceptedResult.value.note,
    "Keep the walking days gentle.",
  );

  for (const invalidBudget of [
    "😀".repeat(101),
    "USD 2,000\nUSD 3,000",
    "USD 2,000\rUSD 3,000",
    "USD\t2,000",
    "USD\u20282,000",
    "USD\u20292,000",
    "USD\u00002,000",
    "USD\u00852,000",
    "USD\u202e2,000",
    "USD\ud8002,000",
  ]) {
    const rejected = validDestinationPayload();
    rejected.roughBudgetPerPerson = invalidBudget;
    const rejectedResult = validateAndNormalizeInquiry(
      rejected,
      validationConfig,
    );
    assert.equal(rejectedResult.ok, false, JSON.stringify(invalidBudget));
    if (rejectedResult.ok) continue;
    assert.equal(
      rejectedResult.fieldErrors.roughBudgetPerPerson,
      "invalid",
      JSON.stringify(invalidBudget),
    );
  }

  for (const invalidType of [2_000, ["USD 2,000"], { amount: 2_000 }]) {
    const rejected = validDestinationPayload();
    rejected.roughBudgetPerPerson = invalidType;
    const rejectedResult = validateAndNormalizeInquiry(
      rejected,
      validationConfig,
    );
    assert.equal(rejectedResult.ok, false);
    if (rejectedResult.ok) continue;
    assert.equal(
      rejectedResult.fieldErrors.roughBudgetPerPerson,
      "invalid",
    );
  }
});

test("destination form and privacy versions stay paired without changing old semantic hashes", () => {
  const legacyAttribution = {
    landingPath: "/?utm_source=youtube",
    utmSource: "youtube",
    utmMedium: "video",
    utmCampaign: "wish-list",
  };
  const versionConfig = {
    ...validationConfig,
    allowedFormVersions: [
      currentInquiryFormVersion,
      legacyDestinationInquiryFormVersion,
      previousDestinationInquiryFormVersion,
      budgetDestinationInquiryFormVersion,
      submitSurfaceDestinationInquiryFormVersion,
      currentDestinationInquiryFormVersion,
    ],
  };

  const submitSurface = validDestinationPayload();
  submitSurface.formVersion = submitSurfaceDestinationInquiryFormVersion;
  submitSurface.privacyNoticeVersion = submitSurfacePrivacyNoticeVersion;
  submitSurface.attribution = {
    landingPath: inquirySubmitSurfaceByLocale.en,
  };
  const submitSurfaceResult = validateAndNormalizeInquiry(
    submitSurface,
    versionConfig,
  );
  assert.equal(submitSurfaceResult.ok, true);
  if (!submitSurfaceResult.ok) return;
  const submitSurfaceSemantic = semanticInquiryPayload(
    submitSurfaceResult.value,
  );
  assert.equal(
    Object.hasOwn(submitSurfaceSemantic, "roughBudgetPerPerson"),
    true,
  );
  assert.deepEqual(submitSurfaceSemantic.attribution, {
    landingPath: inquirySubmitSurfaceByLocale.en,
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
  });
  assert.equal(
    semanticHash(submitSurfaceResult.value),
    "3aaf823945ca85d54e11e197708818f39961b046f682f2deee3b8afae2d0c907",
  );

  const budget = validDestinationPayload();
  budget.formVersion = budgetDestinationInquiryFormVersion;
  budget.privacyNoticeVersion = budgetPrivacyNoticeVersion;
  budget.attribution = structuredClone(legacyAttribution);
  const budgetResult = validateAndNormalizeInquiry(budget, versionConfig);
  assert.equal(budgetResult.ok, true);
  if (!budgetResult.ok) return;
  assert.equal(
    semanticHash(budgetResult.value),
    "cf0dad4fd3f9d08af9b58302e6b7467bf8298a604a309d32bdc982c40f75073d",
  );

  const previous = validDestinationPayload();
  previous.formVersion = previousDestinationInquiryFormVersion;
  previous.privacyNoticeVersion = previousPrivacyNoticeVersion;
  delete previous.roughBudgetPerPerson;
  previous.departureCountry = "Canada";
  previous.attribution = structuredClone(legacyAttribution);
  const previousResult = validateAndNormalizeInquiry(
    previous,
    versionConfig,
  );
  assert.equal(previousResult.ok, true);
  if (!previousResult.ok) return;
  const previousSemantic = semanticInquiryPayload(previousResult.value);
  assert.equal(
    Object.hasOwn(previousSemantic, "departureCountry"),
    true,
  );
  assert.equal(
    Object.hasOwn(previousSemantic, "roughBudgetPerPerson"),
    false,
  );
  assert.equal(
    semanticHash(previousResult.value),
    "d547aa3006993ccd87c68f65e63aca7748e48b3579c6c5fef311688a3920f1ef",
  );

  const legacy = validDestinationPayload();
  legacy.formVersion = legacyDestinationInquiryFormVersion;
  legacy.privacyNoticeVersion = legacyPrivacyNoticeVersion;
  delete legacy.departureCountry;
  delete legacy.roughBudgetPerPerson;
  legacy.attribution = structuredClone(legacyAttribution);
  const legacyResult = validateAndNormalizeInquiry(
    legacy,
    versionConfig,
  );
  assert.equal(legacyResult.ok, true);
  if (!legacyResult.ok) return;
  const legacySemantic = semanticInquiryPayload(legacyResult.value);
  assert.equal(Object.hasOwn(legacySemantic, "departureCountry"), false);
  assert.equal(
    Object.hasOwn(legacySemantic, "roughBudgetPerPerson"),
    false,
  );
  assert.equal(
    semanticHash(legacyResult.value),
    "4e7469beac5fffffe0b52bbffd32ba700a25f54e1aad1d4d848ac47d60837e27",
  );

  const changedOldPayload = structuredClone(previous);
  changedOldPayload.roughBudgetPerPerson = null;
  const changedOldResult = validateAndNormalizeInquiry(
    changedOldPayload,
    versionConfig,
  );
  assert.equal(changedOldResult.ok, false);
  if (!changedOldResult.ok) {
    assert.equal(
      changedOldResult.fieldErrors.roughBudgetPerPerson,
      "unsupported",
    );
  }

  for (const [formVersion, privacyNoticeVersion] of [
    [
      currentDestinationInquiryFormVersion,
      submitSurfacePrivacyNoticeVersion,
    ],
    [
      submitSurfaceDestinationInquiryFormVersion,
      currentPrivacyNoticeVersion,
    ],
    [
      currentDestinationInquiryFormVersion,
      previousPrivacyNoticeVersion,
    ],
    [
      previousDestinationInquiryFormVersion,
      currentPrivacyNoticeVersion,
    ],
  ]) {
    const mismatched = validDestinationPayload();
    mismatched.formVersion = formVersion;
    mismatched.privacyNoticeVersion = privacyNoticeVersion;
    if (formVersion === submitSurfaceDestinationInquiryFormVersion) {
      mismatched.attribution = {
        landingPath: inquirySubmitSurfaceByLocale.en,
      };
    } else if (formVersion !== currentDestinationInquiryFormVersion) {
      delete mismatched.roughBudgetPerPerson;
      mismatched.attribution = structuredClone(legacyAttribution);
    }
    const mismatchedResult = validateAndNormalizeInquiry(
      mismatched,
      versionConfig,
    );
    assert.equal(mismatchedResult.ok, false);
    if (mismatchedResult.ok) continue;
    assert.equal(mismatchedResult.code, "unsupported_privacy_notice");
    assert.equal(
      mismatchedResult.fieldErrors.privacyNoticeVersion,
      "unsupported",
    );
  }
});

test("the current destination semantic hash includes every limited source field", () => {
  const payload = validDestinationPayload();
  payload.attribution = {
    landingPath: inquirySubmitSurfaceByLocale.en,
    entryPath: "/guides/is-your-china-itinerary-too-rushed/",
    sourceGuide: "is-your-china-itinerary-too-rushed",
    utmSource: "newsletter",
    utmMedium: "email",
    utmCampaign: "july-guides",
    utmContent: "footer-planner-link",
    gclid: "Cj0KCQjw_-_ABhC-ARIsAAWQ9ZR3lm2Q",
    fbclid: "IwZXh0bgNhZW0BMAABHqK-3lm2Q_rTn0aZ",
    adClickAt: Date.UTC(2026, 6, 20),
  };
  const result = validateAndNormalizeInquiry(payload, validationConfig);
  assert.equal(result.ok, true);
  if (!result.ok) return;

  const semantic = semanticInquiryPayload(result.value);
  assert.deepEqual(semantic.attribution, payload.attribution);
  const canonical = canonicalizeJson(semantic);
  assert.equal(
    semanticHash(result.value),
    "d2e9b3315a12c25f37a6984d509673ed179339a30246f93169bf1c4829088012",
  );

  for (const [field, value] of [
    ["entryPath", "/guides/zhangjiajie-itinerary/"],
    ["sourceGuide", "zhangjiajie-itinerary"],
    ["utmSource", "search"],
    ["utmMedium", "organic"],
    ["utmCampaign", "visa-free"],
    ["utmContent", "header-planner-link"],
    ["gclid", "EAIaIQobChMI_DifferentPaidClick"],
    ["fbclid", "IwAR_DifferentMetaClick"],
    ["adClickAt", Date.UTC(2026, 6, 21)],
  ]) {
    const changed = structuredClone(payload);
    changed.attribution[field] = value;
    const changedResult = validateAndNormalizeInquiry(
      changed,
      validationConfig,
    );
    assert.equal(changedResult.ok, true, field);
    if (!changedResult.ok) continue;
    assert.notEqual(
      canonicalizeJson(semanticInquiryPayload(changedResult.value)),
      canonical,
      field,
    );
  }
});

test("current destination form accepts one normalized WhatsApp contact when enabled", () => {
  const payload = validDestinationPayload();
  payload.contact = {
    channel: "whatsapp",
    phoneRaw: "+44 7700 900123",
  };
  payload.privacyNoticeVersion = currentPrivacyNoticeVersion;
  payload.departureCountry = "  United Kingdom  ";
  const result = validateAndNormalizeInquiry(payload, {
    ...validationConfig,
    allowedPrivacyNoticeVersions: [
      "test-privacy-v1",
      currentPrivacyNoticeVersion,
    ],
    whatsappEnabled: true,
  });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.value.contact, {
    channel: "whatsapp",
    phoneE164: "+447700900123",
  });
  assert.equal(result.value.departureCountry, "United Kingdom");
});

test("previous destination form keeps its matching WhatsApp consent pair", () => {
  const payload = validDestinationPayload();
  payload.formVersion = previousDestinationInquiryFormVersion;
  delete payload.roughBudgetPerPerson;
  payload.privacyNoticeVersion = previousPrivacyNoticeVersion;
  payload.attribution = {
    landingPath: "/?utm_source=youtube",
    utmSource: "youtube",
    utmMedium: "video",
    utmCampaign: "wish-list",
  };
  payload.contact = {
    channel: "whatsapp",
    phoneRaw: "+44 7700 900123",
  };
  const result = validateAndNormalizeInquiry(payload, {
    ...validationConfig,
    allowedFormVersions: [
      currentInquiryFormVersion,
      previousDestinationInquiryFormVersion,
      currentDestinationInquiryFormVersion,
    ],
    whatsappEnabled: true,
  });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.value.contact, {
    channel: "whatsapp",
    phoneE164: "+447700900123",
  });
});

test("current destination form rejects invalid WhatsApp and country input", () => {
  const payload = validDestinationPayload();
  payload.contact = {
    channel: "whatsapp",
    phoneRaw: "07700 900123",
  };
  payload.departureCountry = "x".repeat(81);
  payload.privacyNoticeVersion = currentPrivacyNoticeVersion;
  const result = validateAndNormalizeInquiry(payload, {
    ...validationConfig,
    allowedPrivacyNoticeVersions: [
      "test-privacy-v1",
      currentPrivacyNoticeVersion,
    ],
    whatsappEnabled: true,
  });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.fieldErrors["contact.phoneRaw"], "invalid");
  assert.equal(result.fieldErrors.departureCountry, "invalid");
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

test("destination semantic hash includes contact, country, and current budget", () => {
  const first = validDestinationPayload();
  first.departureCountry = "Canada";
  first.roughBudgetPerPerson = "USD 2,000–3,000";
  const firstResult = validateAndNormalizeInquiry(first, validationConfig);
  assert.equal(firstResult.ok, true);
  if (!firstResult.ok) return;

  const second = validDestinationPayload();
  second.departureCountry = "Canada";
  second.roughBudgetPerPerson = "USD 3,000–4,000";
  const secondResult = validateAndNormalizeInquiry(second, validationConfig);
  assert.equal(secondResult.ok, true);
  if (!secondResult.ok) return;

  const firstSemantic = semanticInquiryPayload(firstResult.value);
  const secondSemantic = semanticInquiryPayload(secondResult.value);
  assert.equal(
    firstSemantic.roughBudgetPerPerson,
    "USD 2,000–3,000",
  );
  assert.equal(
    secondSemantic.roughBudgetPerPerson,
    "USD 3,000–4,000",
  );
  assert.notEqual(
    canonicalizeJson(firstSemantic),
    canonicalizeJson(secondSemantic),
  );
});
