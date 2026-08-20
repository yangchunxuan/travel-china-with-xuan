import assert from "node:assert/strict";
import test from "node:test";

import {
  computeOrganicFunnel,
  validateFunnelEvent,
} from "../../tools/internal/organic-funnel-contract.mjs";

const uuid = (value) => `00000000-0000-4000-8000-${String(value).padStart(12, "0")}`;
const measurementWindow = {
  cohortStart: "2026-08-20T00:00:00.000Z",
  cohortEndExclusive: "2026-08-21T00:00:00.000Z",
  observationCutoff: "2026-08-22T00:00:00.000Z",
};
const options = (purchaseSourceStatus = "available") => ({
  purchaseSourceStatus,
  measurementWindow,
});

const landing = {
  contractVersion: 1,
  eventId: uuid(1),
  eventType: "organic_landing_session",
  occurredAt: "2026-08-20T12:00:00.000Z",
  sourceSystem: "first-party-attribution",
  sessionId: uuid(101),
  contentId: "guide:beijing:001",
  canonicalPath: "/guides/beijing-example/",
  locale: "en",
  sourceClass: "organic_search_verified",
};

const cta = {
  contractVersion: 1,
  eventId: uuid(2),
  eventType: "consultation_cta_started",
  occurredAt: "2026-08-20T12:05:00.000Z",
  sourceSystem: "first-party-events",
  sessionId: landing.sessionId,
  contentId: landing.contentId,
  canonicalPath: landing.canonicalPath,
  locale: "en",
  ctaId: "cta:trip-brief",
  ctaPosition: "guide-footer",
  intentCode: "route_shape",
};

const inquiry = {
  contractVersion: 1,
  eventId: uuid(3),
  eventType: "inquiry_persisted",
  occurredAt: "2026-08-20T12:10:00.000Z",
  sourceSystem: "inquiry-server",
  sessionId: landing.sessionId,
  inquiryId: uuid(201),
  ctaEventId: cta.eventId,
  isVerifiedTest: false,
};

const purchase = {
  contractVersion: 1,
  eventId: uuid(4),
  eventType: "purchase_status_changed",
  occurredAt: "2026-08-20T12:20:00.000Z",
  sourceSystem: "central-order-ledger",
  inquiryId: inquiry.inquiryId,
  purchaseId: uuid(301),
  productCode: "product:route-review",
  currency: "USD",
  amountMinor: 25000,
  status: "confirmed",
};

test("four-stage events accept only closed, controlled, non-PII fields", () => {
  for (const event of [landing, cta, inquiry, purchase]) {
    assert.equal(validateFunnelEvent(structuredClone(event)).eventType, event.eventType);
  }
  assert.throws(
    () => validateFunnelEvent({ ...landing, email: "traveller@example.com" }),
    /PII_FIELD_FORBIDDEN/u,
  );
  assert.throws(
    () => validateFunnelEvent({ ...purchase, sourceSystem: "spreadsheet" }),
    /UNREGISTERED_VALUE: sourceSystem/u,
  );
  assert.throws(
    () => validateFunnelEvent({ ...cta, intentCode: "free-form-intent" }),
    /UNREGISTERED_VALUE: intentCode/u,
  );
  assert.throws(
    () => validateFunnelEvent({ ...landing, occurredAt: "2026-08-20" }),
    /INVALID_TIMESTAMP/u,
  );
});

test("purchase is null, never zero, while the authoritative source is unavailable", () => {
  const result = computeOrganicFunnel([landing, cta, inquiry], options("source-unavailable"));
  assert.equal(result.organicLandingSessions, 1);
  assert.equal(result.ctaStartedSessions, 1);
  assert.equal(result.persistedInquiries, 1);
  assert.equal(result.inquirySessions, 1);
  assert.equal(result.confirmedPurchases, null);
  assert.equal(result.purchasingSessions, null);
  assert.equal(result.purchaseRate, null);
  assert.equal(result.inquiryToPurchaseRate, null);
  assert.equal(result.purchaseMetricStatus, "source-unavailable");
});

test("sequential linked funnel uses unique session denominators", () => {
  const secondInquiry = {
    ...inquiry,
    eventId: uuid(5),
    inquiryId: uuid(202),
    occurredAt: "2026-08-20T12:11:00.000Z",
  };
  const result = computeOrganicFunnel(
    [landing, cta, inquiry, secondInquiry, purchase],
    options(),
  );
  assert.equal(result.persistedInquiries, 2);
  assert.equal(result.inquirySessions, 1);
  assert.equal(result.inquiryRate, 1);
  assert.equal(result.ctaToInquiryRate, 1);
  assert.equal(result.confirmedPurchases, 1);
  assert.equal(result.inquiryToPurchaseRate, 0.5);
  assert.equal(result.purchaseRate, 1);
});

test("an unlinked inquiry cannot manufacture a CTA-to-inquiry metric", () => {
  const unlinked = { ...inquiry, ctaEventId: null };
  const result = computeOrganicFunnel([landing, unlinked], options("source-unavailable"));
  assert.equal(result.ctaStartedSessions, 0);
  assert.equal(result.inquiryRate, 1);
  assert.equal(result.ctaToInquiryRate, null);
  assert.equal(result.ctaToInquiryMetricStatus, "linkage-unavailable");
});

test("the latest purchase status is terminal, so a refund removes conversion", () => {
  const refunded = {
    ...purchase,
    eventId: uuid(6),
    occurredAt: "2026-08-20T12:30:00.000Z",
    status: "refunded",
  };
  const result = computeOrganicFunnel([landing, cta, inquiry, purchase, refunded], options());
  assert.equal(result.confirmedPurchases, 0);
  assert.equal(result.purchasingSessions, 0);
  assert.equal(result.inquiryToPurchaseRate, 0);
  assert.equal(result.purchaseRate, 0);
});

test("test inquiries and their purchases never enter the funnel", () => {
  const testInquiry = { ...inquiry, isVerifiedTest: true };
  const result = computeOrganicFunnel([landing, cta, testInquiry, purchase], options());
  assert.equal(result.persistedInquiries, 0);
  assert.equal(result.confirmedPurchases, 0);
});

test("event order, duplicate identities and ambiguous purchase state fail closed", () => {
  assert.throws(
    () => computeOrganicFunnel([
      landing,
      { ...cta, occurredAt: "2026-08-20T11:59:00.000Z" },
    ], options("source-unavailable")),
    /EVENT_ORDER_VIOLATION/u,
  );
  assert.throws(
    () => computeOrganicFunnel([
      landing,
      cta,
      inquiry,
      { ...inquiry, eventId: uuid(7) },
    ], options("source-unavailable")),
    /DUPLICATE_INQUIRY_ID/u,
  );
  assert.throws(
    () => computeOrganicFunnel([
      landing,
      cta,
      inquiry,
      purchase,
      { ...purchase, eventId: uuid(8), status: "voided" },
    ], options()),
    /AMBIGUOUS_PURCHASE_STATE/u,
  );
});

test("the observation cutoff excludes late terminal changes deterministically", () => {
  const lateRefund = {
    ...purchase,
    eventId: uuid(9),
    occurredAt: "2026-08-23T00:00:00.000Z",
    status: "refunded",
  };
  const result = computeOrganicFunnel([landing, cta, inquiry, purchase, lateRefund], options());
  assert.equal(result.confirmedPurchases, 1);
  assert.equal(result.lateEventsExcluded, 1);
});

test("unknown acquisition is not silently classified as organic", () => {
  const direct = { ...landing, sourceClass: "direct_or_unknown" };
  const result = computeOrganicFunnel([direct], options("source-unavailable"));
  assert.equal(result.organicLandingSessions, 0);
  assert.equal(result.inquiryRate, null);
});

test("event IDs are idempotency keys", () => {
  assert.throws(
    () => computeOrganicFunnel(
      [landing, structuredClone(landing)],
      options("source-unavailable"),
    ),
    /DUPLICATE_EVENT_ID/u,
  );
});
