/** Internal measurement contract only. This module is not wired to GA4 or production. */

export const FUNNEL_EVENT_TYPES = Object.freeze([
  "organic_landing_session",
  "consultation_cta_started",
  "inquiry_persisted",
  "purchase_status_changed",
]);

const EVENT_KEYS = Object.freeze({
  organic_landing_session: new Set([
    "contractVersion", "eventId", "eventType", "occurredAt", "sourceSystem",
    "sessionId", "contentId", "canonicalPath", "locale", "sourceClass",
  ]),
  consultation_cta_started: new Set([
    "contractVersion", "eventId", "eventType", "occurredAt", "sourceSystem",
    "sessionId", "contentId", "canonicalPath", "locale", "ctaId",
    "ctaPosition", "intentCode",
  ]),
  inquiry_persisted: new Set([
    "contractVersion", "eventId", "eventType", "occurredAt", "sourceSystem",
    "sessionId", "inquiryId", "ctaEventId", "isVerifiedTest",
  ]),
  purchase_status_changed: new Set([
    "contractVersion", "eventId", "eventType", "occurredAt", "sourceSystem",
    "inquiryId", "purchaseId", "productCode", "currency", "amountMinor", "status",
  ]),
});

const REGISTRY_KEYS = Object.freeze([
  "contentIds",
  "canonicalPaths",
  "ctaIds",
  "ctaPositions",
  "intentCodes",
  "productCodes",
  "landingSourceSystems",
  "ctaSourceSystems",
  "inquirySourceSystems",
  "purchaseSourceSystems",
]);

const frozenList = (...values) => Object.freeze(values);

/**
 * Deliberately small reference values for internal tests only. A later approved
 * integration must inject centrally owned registries instead of extending
 * these lists ad hoc.
 */
export const DEFAULT_FUNNEL_REGISTRIES = Object.freeze({
  contentIds: frozenList("guide:beijing:001"),
  canonicalPaths: frozenList("/guides/beijing-example/"),
  ctaIds: frozenList("cta:trip-brief"),
  ctaPositions: frozenList("guide-footer"),
  intentCodes: frozenList("hotel_fit", "ticket_workflow", "route_shape"),
  productCodes: frozenList("product:route-review"),
  landingSourceSystems: frozenList("first-party-attribution"),
  ctaSourceSystems: frozenList("first-party-events"),
  inquirySourceSystems: frozenList("inquiry-server"),
  purchaseSourceSystems: frozenList("central-order-ledger"),
});

const FORBIDDEN_KEYS = /(?:email|phone|name|passport|document|address|referrer|query|note|message|cookie|ipaddress)/iu;
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;
const CONTROLLED_VALUE = /^[a-z0-9][a-z0-9._:-]{0,127}$/u;
const PATH_PATTERN = /^\/(?:[A-Za-z0-9_-]+\/)*$/u;
const LOCALES = new Set(["en", "zh", "ko"]);
const SOURCE_CLASSES = new Set([
  "organic_search_verified",
  "paid_search_verified",
  "referral_verified",
  "owned_verified",
  "direct_or_unknown",
]);
const PURCHASE_STATUSES = new Set(["confirmed", "refunded", "voided"]);
const WINDOW_KEYS = new Set(["cohortStart", "cohortEndExclusive", "observationCutoff"]);

function fail(code, detail) {
  const error = new TypeError(`${code}${detail ? `: ${detail}` : ""}`);
  error.code = code;
  throw error;
}

function isPlainObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function assertExactKeys(value, expected, field) {
  if (!isPlainObject(value)) fail("INVALID_OBJECT", field);
  for (const key of Object.keys(value)) {
    if (!expected.has(key)) fail("UNKNOWN_FIELD", `${field}.${key}`);
  }
  for (const key of expected) {
    if (!(key in value)) fail("MISSING_FIELD", `${field}.${key}`);
  }
}

function assertIsoInstant(value, field) {
  if (typeof value !== "string") fail("INVALID_TIMESTAMP", field);
  const parsed = new Date(value);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString() !== value) {
    fail("INVALID_TIMESTAMP", field);
  }
  return parsed.valueOf();
}

function assertUuid(value, field) {
  if (typeof value !== "string" || !UUID_V4.test(value)) fail("INVALID_OPAQUE_ID", field);
}

function normalizeRegistries(registries = DEFAULT_FUNNEL_REGISTRIES) {
  if (!isPlainObject(registries)) fail("INVALID_REGISTRY", "registries");
  const keys = new Set(REGISTRY_KEYS);
  for (const key of Object.keys(registries)) {
    if (!keys.has(key)) fail("INVALID_REGISTRY", `unknown registry: ${key}`);
  }
  const normalized = {};
  for (const key of REGISTRY_KEYS) {
    const values = registries[key];
    if (!Array.isArray(values) || values.length === 0) fail("INVALID_REGISTRY", key);
    const unique = new Set();
    for (const value of values) {
      const valid = key === "canonicalPaths"
        ? typeof value === "string" && PATH_PATTERN.test(value)
        : typeof value === "string" && CONTROLLED_VALUE.test(value);
      if (!valid) fail("INVALID_REGISTRY", `${key} value`);
      if (unique.has(value)) fail("INVALID_REGISTRY", `${key} duplicate`);
      unique.add(value);
    }
    normalized[key] = unique;
  }
  return normalized;
}

function assertRegistered(value, registry, field) {
  if (typeof value !== "string" || !registry.has(value)) fail("UNREGISTERED_VALUE", field);
}

function eventSourceRegistry(eventType, registries) {
  if (eventType === "organic_landing_session") return registries.landingSourceSystems;
  if (eventType === "consultation_cta_started") return registries.ctaSourceSystems;
  if (eventType === "inquiry_persisted") return registries.inquirySourceSystems;
  return registries.purchaseSourceSystems;
}

export function validateFunnelEvent(event, { registries: registryInput } = {}) {
  if (!isPlainObject(event)) fail("INVALID_EVENT");
  const allowed = EVENT_KEYS[event.eventType];
  if (!allowed) fail("UNKNOWN_EVENT_TYPE", String(event.eventType));
  for (const key of Object.keys(event)) {
    if (FORBIDDEN_KEYS.test(key)) fail("PII_FIELD_FORBIDDEN", key);
    if (!allowed.has(key)) fail("UNKNOWN_FIELD", key);
  }
  for (const key of allowed) {
    if (!(key in event)) fail("MISSING_FIELD", key);
  }

  const registries = normalizeRegistries(registryInput);
  if (event.contractVersion !== 1) fail("UNSUPPORTED_CONTRACT_VERSION");
  assertUuid(event.eventId, "eventId");
  assertIsoInstant(event.occurredAt, "occurredAt");
  assertRegistered(event.sourceSystem, eventSourceRegistry(event.eventType, registries), "sourceSystem");

  if (event.eventType !== "purchase_status_changed") assertUuid(event.sessionId, "sessionId");
  if (event.eventType === "organic_landing_session" || event.eventType === "consultation_cta_started") {
    assertRegistered(event.contentId, registries.contentIds, "contentId");
    assertRegistered(event.canonicalPath, registries.canonicalPaths, "canonicalPath");
    if (!LOCALES.has(event.locale)) fail("INVALID_LOCALE");
  }
  if (event.eventType === "organic_landing_session" && !SOURCE_CLASSES.has(event.sourceClass)) {
    fail("INVALID_SOURCE_CLASS");
  }
  if (event.eventType === "consultation_cta_started") {
    assertRegistered(event.ctaId, registries.ctaIds, "ctaId");
    assertRegistered(event.ctaPosition, registries.ctaPositions, "ctaPosition");
    assertRegistered(event.intentCode, registries.intentCodes, "intentCode");
  }
  if (event.eventType === "inquiry_persisted") {
    assertUuid(event.inquiryId, "inquiryId");
    if (event.ctaEventId !== null) assertUuid(event.ctaEventId, "ctaEventId");
    if (typeof event.isVerifiedTest !== "boolean") fail("INVALID_TEST_MARKER");
  }
  if (event.eventType === "purchase_status_changed") {
    assertUuid(event.inquiryId, "inquiryId");
    assertUuid(event.purchaseId, "purchaseId");
    assertRegistered(event.productCode, registries.productCodes, "productCode");
    if (!/^[A-Z]{3}$/u.test(event.currency)) fail("INVALID_CURRENCY");
    if (!Number.isSafeInteger(event.amountMinor) || event.amountMinor < 0) fail("INVALID_AMOUNT");
    if (!PURCHASE_STATUSES.has(event.status)) fail("INVALID_PURCHASE_STATUS");
  }
  return event;
}

function validateMeasurementWindow(window) {
  assertExactKeys(window, WINDOW_KEYS, "measurementWindow");
  const cohortStart = assertIsoInstant(window.cohortStart, "measurementWindow.cohortStart");
  const cohortEndExclusive = assertIsoInstant(
    window.cohortEndExclusive,
    "measurementWindow.cohortEndExclusive",
  );
  const observationCutoff = assertIsoInstant(
    window.observationCutoff,
    "measurementWindow.observationCutoff",
  );
  if (!(cohortStart < cohortEndExclusive && cohortEndExclusive <= observationCutoff)) {
    fail("INVALID_MEASUREMENT_WINDOW");
  }
  return { cohortStart, cohortEndExclusive, observationCutoff };
}

function assertNotBefore(event, prior, relationship) {
  if (Date.parse(event.occurredAt) < Date.parse(prior.occurredAt)) {
    fail("EVENT_ORDER_VIOLATION", relationship);
  }
}

function resolveTerminalPurchases(purchaseEvents, inquiryById) {
  const groups = new Map();
  for (const event of purchaseEvents) {
    const inquiry = inquiryById.get(event.inquiryId);
    if (!inquiry) fail("PURCHASE_WITHOUT_INQUIRY", event.purchaseId);
    assertNotBefore(event, inquiry, "purchase before inquiry");
    const group = groups.get(event.purchaseId) ?? [];
    group.push(event);
    groups.set(event.purchaseId, group);
  }

  const terminal = [];
  for (const [purchaseId, states] of groups) {
    const identity = states[0];
    for (const state of states.slice(1)) {
      for (const field of ["inquiryId", "productCode", "currency", "amountMinor", "sourceSystem"]) {
        if (state[field] !== identity[field]) fail("PURCHASE_IDENTITY_CONFLICT", `${purchaseId}.${field}`);
      }
    }
    states.sort((left, right) => Date.parse(left.occurredAt) - Date.parse(right.occurredAt));
    for (let index = 1; index < states.length; index += 1) {
      if (states[index].occurredAt === states[index - 1].occurredAt) {
        fail("AMBIGUOUS_PURCHASE_STATE", purchaseId);
      }
    }
    terminal.push(states.at(-1));
  }
  return terminal;
}

export function computeOrganicFunnel(events, {
  purchaseSourceStatus,
  measurementWindow,
  registries: registryInput,
} = {}) {
  if (!Array.isArray(events)) fail("INVALID_EVENT_COLLECTION");
  if (!new Set(["available", "source-unavailable"]).has(purchaseSourceStatus)) {
    fail("INVALID_PURCHASE_SOURCE_STATUS");
  }
  const window = validateMeasurementWindow(measurementWindow);
  normalizeRegistries(registryInput);
  const unique = new Map();
  for (const event of events) {
    validateFunnelEvent(event, { registries: registryInput });
    if (unique.has(event.eventId)) fail("DUPLICATE_EVENT_ID", event.eventId);
    unique.set(event.eventId, event);
  }

  const allValues = [...unique.values()];
  const values = allValues.filter((event) => Date.parse(event.occurredAt) <= window.observationCutoff);
  const lateEventsExcluded = allValues.length - values.length;
  const landingBySession = new Map();
  for (const event of values) {
    if (event.eventType !== "organic_landing_session") continue;
    const time = Date.parse(event.occurredAt);
    if (time < window.cohortStart || time >= window.cohortEndExclusive) continue;
    if (landingBySession.has(event.sessionId)) fail("DUPLICATE_LANDING_SESSION", event.sessionId);
    landingBySession.set(event.sessionId, event);
  }
  const organicLandingBySession = new Map(
    [...landingBySession].filter(([, event]) => event.sourceClass === "organic_search_verified"),
  );

  const ctaByEventId = new Map();
  const ctaSessions = new Set();
  for (const event of values) {
    if (event.eventType !== "consultation_cta_started") continue;
    const landing = organicLandingBySession.get(event.sessionId);
    if (!landing) continue;
    assertNotBefore(event, landing, "CTA before organic landing");
    ctaByEventId.set(event.eventId, event);
    ctaSessions.add(event.sessionId);
  }

  const allInquiryById = new Map();
  for (const event of values) {
    if (event.eventType !== "inquiry_persisted") continue;
    if (allInquiryById.has(event.inquiryId)) fail("DUPLICATE_INQUIRY_ID", event.inquiryId);
    allInquiryById.set(event.inquiryId, event);
  }

  const inquiries = [];
  let ctaLinkageComplete = true;
  const linkedInquirySessions = new Set();
  for (const inquiry of allInquiryById.values()) {
    const landing = organicLandingBySession.get(inquiry.sessionId);
    if (!landing || inquiry.isVerifiedTest) continue;
    assertNotBefore(inquiry, landing, "inquiry before organic landing");
    inquiries.push(inquiry);
    if (inquiry.ctaEventId === null) {
      ctaLinkageComplete = false;
      continue;
    }
    const ctaEvent = ctaByEventId.get(inquiry.ctaEventId);
    if (!ctaEvent) fail("UNKNOWN_CTA_EVENT", inquiry.ctaEventId);
    if (ctaEvent.sessionId !== inquiry.sessionId) fail("CTA_SESSION_MISMATCH", inquiry.ctaEventId);
    assertNotBefore(inquiry, ctaEvent, "inquiry before CTA");
    linkedInquirySessions.add(inquiry.sessionId);
  }

  const purchaseEvents = values.filter((event) => event.eventType === "purchase_status_changed");
  const terminalPurchases = purchaseSourceStatus === "available"
    ? resolveTerminalPurchases(purchaseEvents, allInquiryById)
    : null;
  const eligibleInquiryById = new Map(inquiries.map((event) => [event.inquiryId, event]));
  const confirmedPurchases = terminalPurchases
    ? terminalPurchases.filter((event) => event.status === "confirmed" && eligibleInquiryById.has(event.inquiryId))
    : null;
  const convertedInquiryIds = confirmedPurchases
    ? new Set(confirmedPurchases.map((event) => event.inquiryId))
    : null;
  const purchasingSessions = convertedInquiryIds
    ? new Set([...convertedInquiryIds].map((inquiryId) => eligibleInquiryById.get(inquiryId).sessionId))
    : null;
  const inquirySessions = new Set(inquiries.map((event) => event.sessionId));
  const denominator = organicLandingBySession.size;
  const sessionRate = (numerator) => denominator === 0 ? null : numerator / denominator;
  const ratio = (numerator, ratioDenominator) => ratioDenominator === 0
    ? null
    : numerator / ratioDenominator;

  return {
    measurementWindow: {
      cohortStart: measurementWindow.cohortStart,
      cohortEndExclusive: measurementWindow.cohortEndExclusive,
      observationCutoff: measurementWindow.observationCutoff,
    },
    organicLandingSessions: denominator,
    ctaStartedSessions: ctaSessions.size,
    persistedInquiries: inquiries.length,
    inquirySessions: inquirySessions.size,
    confirmedPurchases: confirmedPurchases?.length ?? null,
    purchasingSessions: purchasingSessions?.size ?? null,
    ctaStartRate: sessionRate(ctaSessions.size),
    inquiryRate: sessionRate(inquirySessions.size),
    ctaToInquiryRate: ctaLinkageComplete
      ? ratio(linkedInquirySessions.size, ctaSessions.size)
      : null,
    inquiryToPurchaseRate: convertedInquiryIds
      ? ratio(convertedInquiryIds.size, inquiries.length)
      : null,
    purchaseRate: purchasingSessions ? sessionRate(purchasingSessions.size) : null,
    ctaToInquiryMetricStatus: ctaLinkageComplete ? "available" : "linkage-unavailable",
    purchaseMetricStatus: terminalPurchases ? "available" : "source-unavailable",
    lateEventsExcluded,
    registryMode: registryInput === undefined ? "default-reference" : "injected",
  };
}
