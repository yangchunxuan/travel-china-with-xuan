import assert from "node:assert/strict";
import test from "node:test";

import {
  createInternalConsultationStub,
  validateConsultationRequest,
} from "../../tools/internal/consultation-intake-contract.mjs";

const base = {
  contractVersion: 1,
  requestId: "00000000-0000-4000-8000-000000000001",
  locale: "en",
  intentCode: "hotel_fit",
  source: {
    contentId: "guide:beijing:001",
    canonicalPath: "/guides/beijing-example/",
    ctaId: "cta:hotel-fit",
    entityIds: ["city-beijing"],
  },
  travelWindow: {
    precision: "exact",
    startDate: "2026-10-01",
    endDate: "2026-10-05",
  },
  partyCounts: { adults: 2, children: 0 },
  context: {
    placeEntityId: "city-beijing",
    manualPlaceCode: null,
    nights: 4,
    rooms: 1,
    budgetBand: "mid",
    areaPriorityCodes: ["central"],
    facilityPriorityCodes: ["lift"],
  },
  privacyNoticeVersion: "2026-08-20",
};

test("hotel, ticket and route requests use exact controlled unions", () => {
  assert.equal(validateConsultationRequest(base).code, "validated");
  assert.equal(validateConsultationRequest({
    ...base,
    intentCode: "ticket_workflow",
    source: { ...base.source, ctaId: "cta:ticket-workflow" },
    context: {
      attractionEntityId: "attraction-forbidden-city",
      manualAttractionCode: null,
      visitDate: "2026-10-02",
      timeWindowCode: "morning",
      travellerCount: 2,
      documentCategoryCode: "passport",
      reservationStateCode: "not-started",
    },
  }).code, "validated");
  assert.equal(validateConsultationRequest({
    ...base,
    intentCode: "route_shape",
    source: { ...base.source, ctaId: "cta:route-shape" },
    context: {
      placeEntityIds: ["city-beijing", "city-xian"],
      totalNights: 7,
      arrivalWindow: "after_18",
      departureWindow: "before_09",
      travellerPace: "balanced",
      crossCityMoves: 1,
      hotelChanges: 1,
    },
  }).code, "validated");
});

test("nested unknown, PII-like, inventory and free-text values fail closed", () => {
  const cases = [
    { ...base, partyCounts: { ...base.partyCounts, privateNote: "medical detail" } },
    { ...base, travelWindow: { ...base.travelWindow, givenName: "Alice" } },
    { ...base, privacyNoticeVersion: { givenName: "Alice" } },
    { ...base, context: { ...base.context, livePrice: 100 } },
    { ...base, context: { ...base.context, budgetBand: "traveller@example.com" } },
    { ...base, context: { ...base.context, areaPriorityCodes: ["221B Baker Street"] } },
    { ...base, context: { ...base.context, facilityPriorityCodes: ["medical diagnosis"] } },
  ];
  for (const request of cases) {
    assert.equal(validateConsultationRequest(request).code, "invalid");
  }
});

test("all required nested fields and source bindings are enforced", () => {
  assert.equal(validateConsultationRequest({
    ...base,
    source: { contentId: base.source.contentId, canonicalPath: base.source.canonicalPath },
  }).code, "invalid");
  assert.equal(validateConsultationRequest({
    ...base,
    source: { ...base.source, canonicalPath: "/wrong/" },
  }).code, "invalid");
  assert.equal(validateConsultationRequest({
    ...base,
    context: {
      placeEntityId: "city-beijing",
      manualPlaceCode: null,
      nights: 4,
      rooms: 1,
    },
  }).code, "invalid");
});

test("unknown entities require a controlled manual mapping code and are never guessed", () => {
  assert.equal(validateConsultationRequest({
    ...base,
    context: { ...base.context, placeEntityId: null, manualPlaceCode: null },
  }).code, "manual_entity_mapping_required");
  assert.equal(validateConsultationRequest({
    ...base,
    context: { ...base.context, placeEntityId: "city-not-registered" },
  }).code, "unknown_entity");
  assert.equal(validateConsultationRequest({
    ...base,
    context: {
      ...base.context,
      placeEntityId: null,
      manualPlaceCode: "free-form-place-name",
    },
  }).code, "invalid");
  assert.equal(validateConsultationRequest({
    ...base,
    context: {
      ...base.context,
      placeEntityId: null,
      manualPlaceCode: "manual-place-review-required",
    },
  }).code, "validated");
});

test("the internal stub validates only and never claims persistence", () => {
  assert.deepEqual(createInternalConsultationStub(base), {
    ok: true,
    code: "validated",
    requestId: base.requestId,
    persistenceStatus: "not-attempted",
    meaning: "request schema validated; no persistence was attempted",
    inventoryStatus: "not-checked",
    priceStatus: "not-quoted",
    bookingStatus: "not-promised",
  });
});

test("failure codes distinguish malformed input from excessive size", () => {
  assert.equal(validateConsultationRequest({ ...base, contractVersion: 2 }).code, "unsupported_contract_version");
  assert.equal(validateConsultationRequest({
    ...base,
    partyCounts: { adults: -1, children: 0 },
  }).code, "invalid");
  assert.equal(validateConsultationRequest({
    ...base,
    partyCounts: { adults: 31, children: 0 },
  }).code, "request_too_large");
  assert.equal(validateConsultationRequest({
    ...base,
    context: { ...base.context, nights: 0 },
  }).code, "invalid");
  assert.equal(validateConsultationRequest({
    ...base,
    context: { ...base.context, nights: 31 },
  }).code, "request_too_large");
});

test("travel-window precision is an exact discriminated union", () => {
  assert.equal(validateConsultationRequest({
    ...base,
    travelWindow: { precision: "unknown", startDate: null, endDate: null },
  }).code, "validated");
  assert.equal(validateConsultationRequest({
    ...base,
    travelWindow: { precision: "unknown", startDate: "2026-10-01", endDate: null },
  }).code, "invalid");
  assert.equal(validateConsultationRequest({
    ...base,
    travelWindow: { precision: "month", startDate: "2026-10-01", endDate: null },
  }).code, "validated");
  assert.equal(validateConsultationRequest({
    ...base,
    travelWindow: { precision: "month", startDate: "2026-10-02", endDate: null },
  }).code, "invalid");
  assert.equal(validateConsultationRequest({
    ...base,
    travelWindow: { precision: "exact", startDate: "2026-02-30", endDate: "2026-03-01" },
  }).code, "invalid");
});

test("route consultation context stays separate from the blocked Route Checker model", () => {
  const result = validateConsultationRequest({
    ...base,
    intentCode: "route_shape",
    source: { ...base.source, ctaId: "cta:route-shape" },
    context: {
      placeEntityIds: ["city-beijing"],
      totalNights: 1,
      arrivalWindow: "after_18",
      departureWindow: "before_09",
      travellerPace: "balanced",
      crossCityMoves: 2,
      hotelChanges: 2,
    },
  });
  assert.equal(result.code, "validated");
});
