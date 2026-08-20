/** Internal consultation interface and validation stub. No persistence, inventory lookup or public promise. */

export const CONSULTATION_INTENTS = Object.freeze([
  "hotel_fit",
  "ticket_workflow",
  "route_shape",
]);

export const CONSULTATION_FAILURES = Object.freeze([
  "invalid",
  "unsupported_contract_version",
  "unknown_entity",
  "manual_entity_mapping_required",
  "request_too_large",
  "rate_limited",
  "service_unavailable",
  "not_persisted",
  "persistence_unknown",
]);

const BASE_KEYS = new Set([
  "contractVersion", "requestId", "locale", "intentCode", "source",
  "travelWindow", "partyCounts", "context", "privacyNoticeVersion",
]);
const SOURCE_KEYS = new Set(["contentId", "canonicalPath", "ctaId", "entityIds"]);
const TRAVEL_WINDOW_KEYS = new Set(["precision", "startDate", "endDate"]);
const PARTY_COUNT_KEYS = new Set(["adults", "children"]);
const CONTEXT_KEYS = Object.freeze({
  hotel_fit: new Set([
    "placeEntityId", "manualPlaceCode", "nights", "rooms", "budgetBand",
    "areaPriorityCodes", "facilityPriorityCodes",
  ]),
  ticket_workflow: new Set([
    "attractionEntityId", "manualAttractionCode", "visitDate", "timeWindowCode",
    "travellerCount", "documentCategoryCode", "reservationStateCode",
  ]),
  route_shape: new Set([
    "placeEntityIds", "totalNights", "arrivalWindow", "departureWindow",
    "travellerPace", "crossCityMoves", "hotelChanges",
  ]),
});
const REGISTRY_KEYS = new Set([
  "contentPaths",
  "ctaIntentBindings",
  "placeEntityIds",
  "attractionEntityIds",
  "manualPlaceCodes",
  "manualAttractionCodes",
  "privacyNoticeVersions",
  "budgetBands",
  "areaPriorityCodes",
  "facilityPriorityCodes",
  "ticketTimeWindowCodes",
  "documentCategoryCodes",
  "reservationStateCodes",
]);

const frozenList = (...values) => Object.freeze(values);
const frozenRecord = (value) => Object.freeze(value);

/** Reference-only values. A future approved persistence owner must inject its registries. */
export const DEFAULT_CONSULTATION_REGISTRIES = Object.freeze({
  contentPaths: frozenList(frozenRecord({
    contentId: "guide:beijing:001",
    canonicalPath: "/guides/beijing-example/",
  })),
  ctaIntentBindings: frozenList(
    frozenRecord({ ctaId: "cta:hotel-fit", intentCode: "hotel_fit" }),
    frozenRecord({ ctaId: "cta:ticket-workflow", intentCode: "ticket_workflow" }),
    frozenRecord({ ctaId: "cta:route-shape", intentCode: "route_shape" }),
  ),
  placeEntityIds: frozenList("city-beijing", "city-xian"),
  attractionEntityIds: frozenList("attraction-forbidden-city"),
  manualPlaceCodes: frozenList("manual-place-review-required"),
  manualAttractionCodes: frozenList("manual-attraction-review-required"),
  privacyNoticeVersions: frozenList("2026-08-20"),
  budgetBands: frozenList("budget", "mid", "premium", "unknown"),
  areaPriorityCodes: frozenList("central", "quiet", "transit"),
  facilityPriorityCodes: frozenList("lift", "step-free-access", "family-room"),
  ticketTimeWindowCodes: frozenList("morning", "afternoon", "evening", "unknown"),
  documentCategoryCodes: frozenList("passport", "other-supported", "unknown"),
  reservationStateCodes: frozenList("not-started", "in-progress", "completed", "unknown"),
});

const FORBIDDEN_KEY = /(?:email|phone|name|passportnumber|passportimage|documentnumber|documentimage|cardnumber|cvv|address|birth|nationality|note|message|cookie|ipaddress|referrer|query|inventory|availability|liveprice|guarantee)/iu;
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;
const CODE = /^[a-z0-9][a-z0-9._:-]{0,127}$/u;
const PATH = /^\/(?:[A-Za-z0-9_-]+\/)*$/u;
const DATE = /^\d{4}-\d{2}-\d{2}$/u;
const LOCALES = new Set(["en", "zh", "ko"]);
const ROUTE_TIME_WINDOWS = new Set(["before_09", "09_12", "12_15", "15_18", "after_18", "unknown"]);
const PACE_CODES = new Set(["fast", "balanced", "slow", "unknown"]);

function reject(code, detail) {
  return { ok: false, code, detail: detail ?? null };
}

function registryFail(detail) {
  const error = new TypeError(`INVALID_REGISTRY: ${detail}`);
  error.code = "INVALID_REGISTRY";
  throw error;
}

function isPlainObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function exactKeyFailure(value, expected, field) {
  if (!isPlainObject(value)) return reject("invalid", field);
  for (const key of Object.keys(value)) {
    if (FORBIDDEN_KEY.test(key)) return reject("invalid", `forbidden field: ${field}.${key}`);
    if (!expected.has(key)) return reject("invalid", `unknown field: ${field}.${key}`);
  }
  for (const key of expected) {
    if (!(key in value)) return reject("invalid", `missing field: ${field}.${key}`);
  }
  return null;
}

function validDate(value) {
  if (typeof value !== "string" || !DATE.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function normalizeRegistries(registries = DEFAULT_CONSULTATION_REGISTRIES) {
  if (!isPlainObject(registries)) registryFail("registries");
  for (const key of Object.keys(registries)) {
    if (!REGISTRY_KEYS.has(key)) registryFail(`unknown registry: ${key}`);
  }
  for (const key of REGISTRY_KEYS) {
    if (!(key in registries) || !Array.isArray(registries[key]) || registries[key].length === 0) {
      registryFail(key);
    }
  }

  const contentPaths = new Map();
  for (const binding of registries.contentPaths) {
    if (!isPlainObject(binding)
      || Object.keys(binding).length !== 2
      || typeof binding.contentId !== "string"
      || !CODE.test(binding.contentId)
      || typeof binding.canonicalPath !== "string"
      || !PATH.test(binding.canonicalPath)) {
      registryFail("contentPaths value");
    }
    if (contentPaths.has(binding.contentId)) registryFail("contentPaths duplicate contentId");
    contentPaths.set(binding.contentId, binding.canonicalPath);
  }

  const ctaIntentBindings = new Map();
  for (const binding of registries.ctaIntentBindings) {
    if (!isPlainObject(binding)
      || Object.keys(binding).length !== 2
      || typeof binding.ctaId !== "string"
      || !CODE.test(binding.ctaId)
      || !CONSULTATION_INTENTS.includes(binding.intentCode)) {
      registryFail("ctaIntentBindings value");
    }
    if (ctaIntentBindings.has(binding.ctaId)) registryFail("ctaIntentBindings duplicate ctaId");
    ctaIntentBindings.set(binding.ctaId, binding.intentCode);
  }

  const normalized = { contentPaths, ctaIntentBindings };
  for (const key of REGISTRY_KEYS) {
    if (key === "contentPaths" || key === "ctaIntentBindings") continue;
    const values = new Set();
    for (const value of registries[key]) {
      if (typeof value !== "string" || !CODE.test(value)) registryFail(`${key} value`);
      if (values.has(value)) registryFail(`${key} duplicate`);
      values.add(value);
    }
    normalized[key] = values;
  }
  return normalized;
}

function integerFailure(value, minimum, maximum, field) {
  if (!Number.isInteger(value) || value < minimum) return reject("invalid", field);
  if (value > maximum) return reject("request_too_large", field);
  return null;
}

function controlledArrayFailure(value, registry, field, maximum, unknownEntity = false) {
  if (!Array.isArray(value)) return reject("invalid", field);
  if (value.length > maximum) return reject("request_too_large", field);
  const seen = new Set();
  for (const item of value) {
    if (typeof item !== "string" || !registry.has(item)) {
      return reject(unknownEntity ? "unknown_entity" : "invalid", field);
    }
    if (seen.has(item)) return reject("invalid", `${field} duplicate`);
    seen.add(item);
  }
  return null;
}

function entityChoiceFailure({ entityId, manualCode, entityRegistry, manualRegistry, entityField, manualField }) {
  const hasEntity = entityId !== null;
  const hasManual = manualCode !== null;
  if (!hasEntity && !hasManual) return reject("manual_entity_mapping_required", manualField);
  if (hasEntity && hasManual) return reject("invalid", `${entityField}/${manualField}`);
  if (hasEntity) {
    if (typeof entityId !== "string" || !entityRegistry.has(entityId)) {
      return reject("unknown_entity", entityField);
    }
    return null;
  }
  if (typeof manualCode !== "string" || !manualRegistry.has(manualCode)) {
    return reject("invalid", manualField);
  }
  return null;
}

function travelWindowFailure(travelWindow) {
  const shape = exactKeyFailure(travelWindow, TRAVEL_WINDOW_KEYS, "travelWindow");
  if (shape) return shape;
  if (!new Set(["exact", "month", "unknown"]).has(travelWindow.precision)) {
    return reject("invalid", "travelWindow.precision");
  }
  if (travelWindow.precision === "exact") {
    if (!validDate(travelWindow.startDate) || !validDate(travelWindow.endDate)) {
      return reject("invalid", "exact travelWindow requires both dates");
    }
    if (travelWindow.startDate > travelWindow.endDate) {
      return reject("invalid", "travelWindow date order");
    }
    return null;
  }
  if (travelWindow.precision === "month") {
    if (!validDate(travelWindow.startDate)
      || !travelWindow.startDate.endsWith("-01")
      || travelWindow.endDate !== null) {
      return reject("invalid", "month travelWindow requires first day and null endDate");
    }
    return null;
  }
  if (travelWindow.startDate !== null || travelWindow.endDate !== null) {
    return reject("invalid", "unknown travelWindow requires null dates");
  }
  return null;
}

export function validateConsultationRequest(request, { registries: registryInput } = {}) {
  const registries = normalizeRegistries(registryInput);
  const baseShape = exactKeyFailure(request, BASE_KEYS, "request");
  if (baseShape) return baseShape;
  if (request.contractVersion !== 1) return reject("unsupported_contract_version");
  if (typeof request.requestId !== "string" || !UUID_V4.test(request.requestId)) {
    return reject("invalid", "requestId");
  }
  if (!LOCALES.has(request.locale)) return reject("invalid", "locale");
  if (!CONSULTATION_INTENTS.includes(request.intentCode)) return reject("invalid", "intentCode");
  if (typeof request.privacyNoticeVersion !== "string"
    || !registries.privacyNoticeVersions.has(request.privacyNoticeVersion)) {
    return reject("invalid", "privacyNoticeVersion");
  }

  const sourceShape = exactKeyFailure(request.source, SOURCE_KEYS, "source");
  if (sourceShape) return sourceShape;
  const expectedPath = registries.contentPaths.get(request.source.contentId);
  if (!expectedPath || request.source.canonicalPath !== expectedPath) {
    return reject("invalid", "source content/canonical binding");
  }
  if (registries.ctaIntentBindings.get(request.source.ctaId) !== request.intentCode) {
    return reject("invalid", "source CTA/intent binding");
  }
  const allEntityIds = new Set([
    ...registries.placeEntityIds,
    ...registries.attractionEntityIds,
  ]);
  const sourceEntities = controlledArrayFailure(
    request.source.entityIds,
    allEntityIds,
    "source.entityIds",
    10,
    true,
  );
  if (sourceEntities) return sourceEntities;

  const travelFailure = travelWindowFailure(request.travelWindow);
  if (travelFailure) return travelFailure;
  const partyShape = exactKeyFailure(request.partyCounts, PARTY_COUNT_KEYS, "partyCounts");
  if (partyShape) return partyShape;
  for (const field of ["adults", "children"]) {
    if (!Number.isInteger(request.partyCounts[field]) || request.partyCounts[field] < 0) {
      return reject("invalid", `partyCounts.${field}`);
    }
    if (request.partyCounts[field] > 30) return reject("request_too_large", "partyCounts");
  }
  const partyTotal = request.partyCounts.adults + request.partyCounts.children;
  if (partyTotal < 1) return reject("invalid", "partyCounts");
  if (partyTotal > 30) return reject("request_too_large", "partyCounts");

  const allowedContext = CONTEXT_KEYS[request.intentCode];
  const contextShape = exactKeyFailure(request.context, allowedContext, "context");
  if (contextShape) return contextShape;

  if (request.intentCode === "hotel_fit") {
    const entityFailure = entityChoiceFailure({
      entityId: request.context.placeEntityId,
      manualCode: request.context.manualPlaceCode,
      entityRegistry: registries.placeEntityIds,
      manualRegistry: registries.manualPlaceCodes,
      entityField: "context.placeEntityId",
      manualField: "context.manualPlaceCode",
    });
    if (entityFailure) return entityFailure;
    for (const [field, minimum, maximum] of [["nights", 1, 30], ["rooms", 1, 10]]) {
      const failure = integerFailure(request.context[field], minimum, maximum, `context.${field}`);
      if (failure) return failure;
    }
    if (!registries.budgetBands.has(request.context.budgetBand)) {
      return reject("invalid", "context.budgetBand");
    }
    const areaFailure = controlledArrayFailure(
      request.context.areaPriorityCodes,
      registries.areaPriorityCodes,
      "context.areaPriorityCodes",
      5,
    );
    if (areaFailure) return areaFailure;
    const facilityFailure = controlledArrayFailure(
      request.context.facilityPriorityCodes,
      registries.facilityPriorityCodes,
      "context.facilityPriorityCodes",
      5,
    );
    if (facilityFailure) return facilityFailure;
  }

  if (request.intentCode === "ticket_workflow") {
    const entityFailure = entityChoiceFailure({
      entityId: request.context.attractionEntityId,
      manualCode: request.context.manualAttractionCode,
      entityRegistry: registries.attractionEntityIds,
      manualRegistry: registries.manualAttractionCodes,
      entityField: "context.attractionEntityId",
      manualField: "context.manualAttractionCode",
    });
    if (entityFailure) return entityFailure;
    if (!validDate(request.context.visitDate)) return reject("invalid", "context.visitDate");
    const travellerFailure = integerFailure(
      request.context.travellerCount,
      1,
      30,
      "context.travellerCount",
    );
    if (travellerFailure) return travellerFailure;
    for (const [field, registry] of [
      ["timeWindowCode", registries.ticketTimeWindowCodes],
      ["documentCategoryCode", registries.documentCategoryCodes],
      ["reservationStateCode", registries.reservationStateCodes],
    ]) {
      if (!registry.has(request.context[field])) return reject("invalid", `context.${field}`);
    }
  }

  if (request.intentCode === "route_shape") {
    if (!Array.isArray(request.context.placeEntityIds) || request.context.placeEntityIds.length < 1) {
      return reject("invalid", "context.placeEntityIds");
    }
    const placesFailure = controlledArrayFailure(
      request.context.placeEntityIds,
      registries.placeEntityIds,
      "context.placeEntityIds",
      10,
      true,
    );
    if (placesFailure) return placesFailure;
    for (const [field, minimum, maximum] of [
      ["totalNights", 1, 30],
      ["crossCityMoves", 0, 30],
      ["hotelChanges", 0, 30],
    ]) {
      const failure = integerFailure(request.context[field], minimum, maximum, `context.${field}`);
      if (failure) return failure;
    }
    if (!ROUTE_TIME_WINDOWS.has(request.context.arrivalWindow)
      || !ROUTE_TIME_WINDOWS.has(request.context.departureWindow)
      || !PACE_CODES.has(request.context.travellerPace)) {
      return reject("invalid", "route enum");
    }
  }

  return { ok: true, code: "validated", normalized: structuredClone(request) };
}

export function createInternalConsultationStub(request, options) {
  const validation = validateConsultationRequest(request, options);
  if (!validation.ok) return validation;
  return {
    ok: true,
    code: "validated",
    requestId: request.requestId,
    persistenceStatus: "not-attempted",
    meaning: "request schema validated; no persistence was attempted",
    inventoryStatus: "not-checked",
    priceStatus: "not-quoted",
    bookingStatus: "not-promised",
  };
}
