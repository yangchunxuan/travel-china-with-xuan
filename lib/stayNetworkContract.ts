/**
 * Stay-network data contract.
 *
 * This module is deliberately pure and disconnected from UI, API, content,
 * analytics, and Supabase code. It separates public area-level editorial
 * decisions from restricted traveller requirements, property verification,
 * and request-scoped quotes. Nothing here is a live inventory model.
 */

export const stayNetworkSchemaVersion = "1.0.0" as const;

export const stayCityIds = [
  "beijing",
  "shanghai",
  "xian",
  "chengdu",
  "guangzhou",
  "zhangjiajie",
  "hangzhou",
  "chongqing",
  "guilin",
  "shenzhen",
] as const;

export type StayCityId = (typeof stayCityIds)[number];

export const stayLocales = ["en", "zh-Hans", "ko"] as const;
export type StayLocale = (typeof stayLocales)[number];

export interface LocalizedStayText {
  en: string;
  "zh-Hans": string;
  ko: string;
}

export const stayDecisionJobIds = [
  "first-trip-base",
  "airport-last-night",
  "railway-arrival-departure",
  "attraction-access",
  "scenic-gateway",
  "evening-life",
  "family-trip",
  "older-traveller",
  "mobility-needs",
  "business-event",
  "short-stay",
] as const;

export type StayDecisionJobId = (typeof stayDecisionJobIds)[number];

export const stayFitLevels = [
  "strong",
  "conditional",
  "task-specific",
  "not-fit",
  "not-reviewed",
] as const;

export type StayFitLevel = (typeof stayFitLevels)[number];

export interface StayCanonicalOwner {
  route: string;
  disposition: "hub-section" | "existing-owner" | "faq" | "new-owner" | "hold";
  contentId: string;
}

export interface StayGatewayRelation {
  gatewayId: string;
  gatewayKind: "airport" | "railway-station" | "coach-station" | "scenic-gateway";
  relationship: "direct" | "one-transfer" | "multi-step" | "variable" | "not-reviewed";
  conditions: readonly LocalizedStayText[];
  sourceIds: readonly string[];
}

export interface StayAttractionClusterRelation {
  clusterId: string;
  relationship: "walkable-core" | "direct-transit" | "one-transfer" | "multi-step" | "variable" | "not-reviewed";
  conditions: readonly LocalizedStayText[];
  sourceIds: readonly string[];
}

export interface StayAreaAccessContext {
  terrain: "mostly-flat" | "mixed" | "steep" | "vertical" | "variable" | "not-reviewed";
  lastMile: "main-road" | "lane" | "pedestrian-zone" | "multi-level" | "variable" | "not-reviewed";
  vehicleAccess: "usually-door" | "designated-point" | "variable" | "not-reviewed";
  conditions: readonly LocalizedStayText[];
}

export interface StayTravellerFit {
  level: StayFitLevel;
  conditions: readonly LocalizedStayText[];
}

/**
 * The only public stay-network record. It describes an area and a decision
 * task, never a specific property, supplier, live price, inventory position,
 * foreign-guest acceptance, or accessibility guarantee.
 */
export interface StayAreaDecisionRecord {
  schemaVersion: typeof stayNetworkSchemaVersion;
  recordKind: "stay-area-decision";
  cityId: StayCityId;
  areaId: string;
  names: LocalizedStayText;
  canonicalOwner: StayCanonicalOwner;
  decisionJobs: readonly StayDecisionJobId[];
  gatewayRelations: readonly StayGatewayRelation[];
  attractionClusterRelations: readonly StayAttractionClusterRelation[];
  accessContext: StayAreaAccessContext;
  travellerFit: {
    firstTime: StayTravellerFit;
    family: StayTravellerFit;
    olderTravellers: StayTravellerFit;
    mobilityNeeds: StayTravellerFit;
  };
  tradeoffs: readonly LocalizedStayText[];
  sourceIds: readonly string[];
  sourceReviewedDate: string;
  recheckTriggers: readonly LocalizedStayText[];
  imageAssetIds: readonly string[];
  status: "draft" | "reviewed" | "published" | "recheck-required";
}

export const stayNeedIds = [
  "step-free-route",
  "roll-in-shower",
  "shower-seat",
  "grab-bars",
  "lift",
  "wide-door",
  "vehicle-to-door",
  "quiet-room",
  "connecting-rooms",
  "cot",
  "kitchen",
  "laundry",
  "staffed-front-desk",
  "late-arrival",
  "luggage-storage",
  "foreign-passport-registration",
  "non-smoking-room",
  "refrigerator",
] as const;

export type StayNeedId = (typeof stayNeedIds)[number];

export interface SupplierSharingPreference {
  authorized: boolean;
  allowedRecipientKinds: readonly ("property" | "dmc")[];
  allowedFieldGroups: readonly ("trip-logistics" | "party" | "room-needs" | "mobility-needs" | "budget")[];
  purpose: "quote-request" | "room-verification" | "recovery" | null;
  consentAt: string | null;
}

export function createDefaultSupplierSharingPreference(): SupplierSharingPreference {
  return {
    authorized: false,
    allowedRecipientKinds: [],
    allowedFieldGroups: [],
    purpose: null,
    consentAt: null,
  };
}

export interface StayRequirement {
  schemaVersion: typeof stayNetworkSchemaVersion;
  recordKind: "stay-requirement";
  requestKind: "area-advice" | "room-verification" | "quote-request" | "booking-recovery";
  cityIds: readonly StayCityId[];
  stayWindows: readonly {
    cityId: StayCityId;
    checkInDate: string | null;
    checkOutDate: string | null;
  }[];
  arrival: {
    nodeKind: "airport" | "railway-station" | "coach-station" | "other";
    nodeId: string | null;
    timeBand: "early" | "morning" | "daytime" | "evening" | "late" | "unknown";
  } | null;
  departure: {
    nodeKind: "airport" | "railway-station" | "coach-station" | "other";
    nodeId: string | null;
    timeBand: "early" | "morning" | "daytime" | "evening" | "late" | "unknown";
  } | null;
  party: {
    adults: number;
    childrenAgesAtTravel: readonly number[];
    roomCount: number;
  };
  roomNeeds: {
    bedConfiguration: "one-bed" | "two-beds" | "multiple-beds" | "flexible" | "not-stated";
    connectingRooms: "required" | "preferred" | "not-needed" | "not-stated";
    needIds: readonly StayNeedId[];
  };
  mobility: {
    stepFreeRequired: boolean;
    mobilityAid: "none" | "cane" | "walker" | "manual-wheelchair" | "power-wheelchair" | "other" | "not-stated";
    maxContinuousWalkMeters: number | null;
    minimumDoorWidthMm: number | null;
  };
  luggage: "light" | "standard" | "large" | "oversize" | "not-stated";
  travelDocumentClass: "foreign-passport" | "mainland-id" | "other-travel-document" | "not-stated";
  budget: {
    currency: string;
    minimumPerRoomNight: number | null;
    maximumPerRoomNight: number | null;
  } | null;
  recovery: {
    hasExistingBooking: boolean;
    bookingChannel: "property-direct" | "online-platform" | "travel-agent" | "unknown" | "none";
    problem: "foreign-guest-refusal" | "registration-failure" | "room-mismatch" | "access-route-failure" | "other" | "none";
    evidenceHeld: readonly ("platform-chat" | "property-message" | "cancellation-record" | "payment-record" | "none")[];
  };
  originContentId: string;
  locale: "en" | "zh" | "ko";
  replyContact: {
    channel: "email" | "phone" | "whatsapp" | "wechat";
    value: string;
  };
  supplierSharing: SupplierSharingPreference;
}

export interface PropertyVerificationSnapshot {
  schemaVersion: typeof stayNetworkSchemaVersion;
  recordKind: "property-verification";
  requestRef: string;
  internalPropertyRef: string;
  internalSupplierRef: string | null;
  foreignGuestHandling: {
    legalRule: {
      sourceId: string;
      reviewedAt: string;
      scope: "national" | "local";
    };
    platformDisplay: {
      status: "shown-compatible" | "shown-incompatible" | "not-shown" | "not-checked";
      platformRef: string | null;
      observedAt: string | null;
    };
    propertyConfirmation: {
      status: "confirmed" | "declined" | "unable-to-confirm" | "not-asked";
      channel: "phone" | "email" | "platform-message" | "official-chat" | "other" | null;
      checkedAt: string | null;
      expiresAt: string | null;
    };
  };
  accessChain: readonly {
    segment: "street-to-entrance" | "entrance-to-front-desk" | "front-desk-to-lift" | "lift-to-room" | "room-door" | "bathroom";
    status: "verified" | "partly-verified" | "failed" | "not-checked";
    evidenceRefIds: readonly string[];
  }[];
  verifiedAt: string;
  expiresAt: string;
  sourceRefIds: readonly string[];
}

export interface StayQuoteSnapshot {
  schemaVersion: typeof stayNetworkSchemaVersion;
  recordKind: "stay-quote";
  requestRef: string;
  internalPropertyRef: string;
  internalSupplierRef: string;
  roomCategoryRef: string;
  currency: string;
  amount: number;
  taxAndFeeStatus: "included" | "excluded" | "partly-included" | "unknown";
  breakfastStatus: "included" | "excluded" | "optional" | "unknown";
  cancellationSummary: string;
  requestScopedAvailability: "confirmed-at-check" | "not-confirmed" | "unavailable" | "unknown";
  receivedAt: string;
  validUntil: string;
}

export type StayValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; issues: readonly string[] };

const publicTopLevelKeys = new Set([
  "schemaVersion",
  "recordKind",
  "cityId",
  "areaId",
  "names",
  "canonicalOwner",
  "decisionJobs",
  "gatewayRelations",
  "attractionClusterRelations",
  "accessContext",
  "travellerFit",
  "tradeoffs",
  "sourceIds",
  "sourceReviewedDate",
  "recheckTriggers",
  "imageAssetIds",
  "status",
]);

const publicForbiddenNormalizedKeys = new Set([
  "property",
  "propertyid",
  "propertyref",
  "propertyname",
  "hotel",
  "hotelid",
  "hotelref",
  "hotelname",
  "supplier",
  "supplierid",
  "supplierref",
  "suppliername",
  "roomrate",
  "rate",
  "price",
  "quote",
  "inventory",
  "availability",
  "available",
  "acceptsforeigners",
  "foreignguestaccepted",
  "foreignguestacceptance",
  "guarantee",
  "guaranteed",
  "guaranteedaccessible",
  "passportnumber",
  "passportimage",
  "passportphoto",
  "ordernumber",
  "bookingreference",
  "bookingnumber",
  "roomnumber",
  "keycard",
  "cardnumber",
  "paymentqr",
  "email",
  "phone",
  "fullname",
  "guestname",
  "dateofbirth",
]);

const positiveGuaranteePatterns = [
  /(?<!not )\bguaranteed?\s+(?:accessible|availability|available|acceptance|foreign-guest|room|price)/iu,
  /\ball\s+foreign(?:ers|\s+guests)\s+(?:can|will|are\s+able\s+to)\s+(?:stay|book|check\s+in)/iu,
  /(?<!不)(?:保证|确保|一定).{0,12}(?:无障碍|有房|接待外宾|接待外国|价格)/u,
  /(?:항상|반드시).{0,12}(?:접근|객실|외국인|가격).{0,12}(?:보장|가능)/u,
];

function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function isIsoDateTime(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isMember<T extends readonly string[]>(values: T, value: unknown): value is T[number] {
  return typeof value === "string" && values.includes(value as T[number]);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isIntegerInRange(value: unknown, minimum: number, maximum: number): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= minimum && value <= maximum;
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: ReadonlySet<string>, path: string, issues: string[]): void {
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) issues.push(`${path}.${key}: unknown field`);
  }
}

function validateLocalizedText(value: unknown, path: string, issues: string[]): void {
  if (!isRecord(value)) {
    issues.push(`${path}: expected localized text`);
    return;
  }
  hasOnlyKeys(value, new Set(stayLocales), path, issues);
  for (const locale of stayLocales) {
    if (!isNonEmptyString(value[locale])) issues.push(`${path}.${locale}: required`);
  }
}

function validateLocalizedArray(value: unknown, path: string, issues: string[]): void {
  if (!Array.isArray(value)) {
    issues.push(`${path}: expected array`);
    return;
  }
  value.forEach((item, index) => validateLocalizedText(item, `${path}[${index}]`, issues));
}

function validateStringArray(value: unknown, path: string, issues: string[], minimum = 0): void {
  if (!Array.isArray(value) || value.length < minimum || value.some((item) => !isNonEmptyString(item))) {
    issues.push(`${path}: expected ${minimum ? `at least ${minimum} ` : ""}non-empty string array`);
  }
}

function collectForbiddenPublicFields(value: unknown, path: string, findings: string[]): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectForbiddenPublicFields(item, `${path}[${index}]`, findings));
    return;
  }
  if (!isRecord(value)) return;
  for (const [key, nested] of Object.entries(value)) {
    const nestedPath = path ? `${path}.${key}` : key;
    if (publicForbiddenNormalizedKeys.has(normalizeKey(key))) findings.push(nestedPath);
    collectForbiddenPublicFields(nested, nestedPath, findings);
  }
}

function collectPositiveGuaranteeClaims(value: unknown, path: string, findings: string[]): void {
  if (typeof value === "string") {
    if (positiveGuaranteePatterns.some((pattern) => pattern.test(value))) findings.push(path);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectPositiveGuaranteeClaims(item, `${path}[${index}]`, findings));
    return;
  }
  if (!isRecord(value)) return;
  for (const [key, nested] of Object.entries(value)) {
    collectPositiveGuaranteeClaims(nested, path ? `${path}.${key}` : key, findings);
  }
}

export function findForbiddenPublicStayFields(value: unknown): readonly string[] {
  const findings: string[] = [];
  collectForbiddenPublicFields(value, "", findings);
  return findings;
}

export function findForbiddenPublicStayGuaranteeClaims(value: unknown): readonly string[] {
  const findings: string[] = [];
  collectPositiveGuaranteeClaims(value, "", findings);
  return findings;
}

function validateFit(value: unknown, path: string, issues: string[]): void {
  if (!isRecord(value)) {
    issues.push(`${path}: expected fit object`);
    return;
  }
  hasOnlyKeys(value, new Set(["level", "conditions"]), path, issues);
  if (!isMember(stayFitLevels, value.level)) issues.push(`${path}.level: invalid fit level`);
  validateLocalizedArray(value.conditions, `${path}.conditions`, issues);
}

export function validatePublicStayAreaDecision(value: unknown): StayValidationResult<StayAreaDecisionRecord> {
  const issues: string[] = [];
  if (!isRecord(value)) return { ok: false, issues: ["record: expected object"] };

  for (const path of findForbiddenPublicStayFields(value)) issues.push(`${path}: forbidden in public stay data`);
  for (const path of findForbiddenPublicStayGuaranteeClaims(value)) issues.push(`${path}: unsupported guarantee claim`);
  hasOnlyKeys(value, publicTopLevelKeys, "record", issues);

  if (value.schemaVersion !== stayNetworkSchemaVersion) issues.push("schemaVersion: unsupported");
  if (value.recordKind !== "stay-area-decision") issues.push("recordKind: expected stay-area-decision");
  if (!isMember(stayCityIds, value.cityId)) issues.push("cityId: must be one of the exact ten stay-city IDs");
  if (!isNonEmptyString(value.areaId) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.areaId)) issues.push("areaId: invalid slug");
  validateLocalizedText(value.names, "names", issues);

  if (!isRecord(value.canonicalOwner)) {
    issues.push("canonicalOwner: expected object");
  } else {
    hasOnlyKeys(value.canonicalOwner, new Set(["route", "disposition", "contentId"]), "canonicalOwner", issues);
    if (!isNonEmptyString(value.canonicalOwner.route) || !value.canonicalOwner.route.startsWith("/")) issues.push("canonicalOwner.route: invalid route");
    if (!["hub-section", "existing-owner", "faq", "new-owner", "hold"].includes(String(value.canonicalOwner.disposition))) issues.push("canonicalOwner.disposition: invalid");
    if (!isNonEmptyString(value.canonicalOwner.contentId)) issues.push("canonicalOwner.contentId: required");
  }

  if (!Array.isArray(value.decisionJobs) || value.decisionJobs.length === 0 || value.decisionJobs.some((job) => !isMember(stayDecisionJobIds, job))) {
    issues.push("decisionJobs: expected one or more known decision jobs");
  }

  if (!Array.isArray(value.gatewayRelations)) {
    issues.push("gatewayRelations: expected array");
  } else {
    value.gatewayRelations.forEach((relation, index) => {
      const path = `gatewayRelations[${index}]`;
      if (!isRecord(relation)) {
        issues.push(`${path}: expected object`);
        return;
      }
      hasOnlyKeys(relation, new Set(["gatewayId", "gatewayKind", "relationship", "conditions", "sourceIds"]), path, issues);
      if (!isNonEmptyString(relation.gatewayId)) issues.push(`${path}.gatewayId: required`);
      if (!["airport", "railway-station", "coach-station", "scenic-gateway"].includes(String(relation.gatewayKind))) issues.push(`${path}.gatewayKind: invalid`);
      if (!["direct", "one-transfer", "multi-step", "variable", "not-reviewed"].includes(String(relation.relationship))) issues.push(`${path}.relationship: invalid`);
      validateLocalizedArray(relation.conditions, `${path}.conditions`, issues);
      validateStringArray(relation.sourceIds, `${path}.sourceIds`, issues, 1);
    });
  }

  if (!Array.isArray(value.attractionClusterRelations)) {
    issues.push("attractionClusterRelations: expected array");
  } else {
    value.attractionClusterRelations.forEach((relation, index) => {
      const path = `attractionClusterRelations[${index}]`;
      if (!isRecord(relation)) {
        issues.push(`${path}: expected object`);
        return;
      }
      hasOnlyKeys(relation, new Set(["clusterId", "relationship", "conditions", "sourceIds"]), path, issues);
      if (!isNonEmptyString(relation.clusterId)) issues.push(`${path}.clusterId: required`);
      if (!["walkable-core", "direct-transit", "one-transfer", "multi-step", "variable", "not-reviewed"].includes(String(relation.relationship))) issues.push(`${path}.relationship: invalid`);
      validateLocalizedArray(relation.conditions, `${path}.conditions`, issues);
      validateStringArray(relation.sourceIds, `${path}.sourceIds`, issues, 1);
    });
  }

  if (!isRecord(value.accessContext)) {
    issues.push("accessContext: expected object");
  } else {
    hasOnlyKeys(value.accessContext, new Set(["terrain", "lastMile", "vehicleAccess", "conditions"]), "accessContext", issues);
    if (!["mostly-flat", "mixed", "steep", "vertical", "variable", "not-reviewed"].includes(String(value.accessContext.terrain))) issues.push("accessContext.terrain: invalid");
    if (!["main-road", "lane", "pedestrian-zone", "multi-level", "variable", "not-reviewed"].includes(String(value.accessContext.lastMile))) issues.push("accessContext.lastMile: invalid");
    if (!["usually-door", "designated-point", "variable", "not-reviewed"].includes(String(value.accessContext.vehicleAccess))) issues.push("accessContext.vehicleAccess: invalid");
    validateLocalizedArray(value.accessContext.conditions, "accessContext.conditions", issues);
  }

  if (!isRecord(value.travellerFit)) {
    issues.push("travellerFit: expected object");
  } else {
    hasOnlyKeys(value.travellerFit, new Set(["firstTime", "family", "olderTravellers", "mobilityNeeds"]), "travellerFit", issues);
    validateFit(value.travellerFit.firstTime, "travellerFit.firstTime", issues);
    validateFit(value.travellerFit.family, "travellerFit.family", issues);
    validateFit(value.travellerFit.olderTravellers, "travellerFit.olderTravellers", issues);
    validateFit(value.travellerFit.mobilityNeeds, "travellerFit.mobilityNeeds", issues);
  }

  validateLocalizedArray(value.tradeoffs, "tradeoffs", issues);
  validateStringArray(value.sourceIds, "sourceIds", issues, 1);
  if (!isIsoDate(value.sourceReviewedDate)) issues.push("sourceReviewedDate: expected YYYY-MM-DD");
  validateLocalizedArray(value.recheckTriggers, "recheckTriggers", issues);
  validateStringArray(value.imageAssetIds, "imageAssetIds", issues);
  if (!["draft", "reviewed", "published", "recheck-required"].includes(String(value.status))) issues.push("status: invalid");

  return issues.length ? { ok: false, issues } : { ok: true, value: value as unknown as StayAreaDecisionRecord };
}

export function assertPublicStayAreaDecision(value: unknown): asserts value is StayAreaDecisionRecord {
  const result = validatePublicStayAreaDecision(value);
  if (result.ok === false) throw new Error(`Invalid public stay-area decision:\n${result.issues.join("\n")}`);
}

function validateSupplierSharing(value: unknown, path: string, issues: string[]): void {
  if (!isRecord(value)) {
    issues.push(`${path}: expected object`);
    return;
  }
  hasOnlyKeys(value, new Set(["authorized", "allowedRecipientKinds", "allowedFieldGroups", "purpose", "consentAt"]), path, issues);
  if (typeof value.authorized !== "boolean") issues.push(`${path}.authorized: expected boolean`);
  const recipientKinds = value.allowedRecipientKinds;
  const fieldGroups = value.allowedFieldGroups;
  if (!Array.isArray(recipientKinds) || recipientKinds.some((item) => !["property", "dmc"].includes(String(item)))) issues.push(`${path}.allowedRecipientKinds: invalid`);
  if (!Array.isArray(fieldGroups) || fieldGroups.some((item) => !["trip-logistics", "party", "room-needs", "mobility-needs", "budget"].includes(String(item)))) issues.push(`${path}.allowedFieldGroups: invalid`);

  if (value.authorized === false) {
    if (Array.isArray(recipientKinds) && recipientKinds.length) issues.push(`${path}.allowedRecipientKinds: must be empty until consent`);
    if (Array.isArray(fieldGroups) && fieldGroups.length) issues.push(`${path}.allowedFieldGroups: must be empty until consent`);
    if (value.purpose !== null) issues.push(`${path}.purpose: must be null until consent`);
    if (value.consentAt !== null) issues.push(`${path}.consentAt: must be null until consent`);
  } else if (value.authorized === true) {
    if (!Array.isArray(recipientKinds) || recipientKinds.length === 0) issues.push(`${path}.allowedRecipientKinds: required after consent`);
    if (!Array.isArray(fieldGroups) || fieldGroups.length === 0) issues.push(`${path}.allowedFieldGroups: required after consent`);
    if (!["quote-request", "room-verification", "recovery"].includes(String(value.purpose))) issues.push(`${path}.purpose: required after consent`);
    if (!isIsoDateTime(value.consentAt)) issues.push(`${path}.consentAt: valid timestamp required after consent`);
  }
}

export function validateStayRequirement(value: unknown): StayValidationResult<StayRequirement> {
  const issues: string[] = [];
  if (!isRecord(value)) return { ok: false, issues: ["record: expected object"] };
  hasOnlyKeys(value, new Set([
    "schemaVersion", "recordKind", "requestKind", "cityIds", "stayWindows", "arrival", "departure", "party", "roomNeeds", "mobility", "luggage", "travelDocumentClass", "budget", "recovery", "originContentId", "locale", "replyContact", "supplierSharing",
  ]), "record", issues);
  if (value.schemaVersion !== stayNetworkSchemaVersion) issues.push("schemaVersion: unsupported");
  if (value.recordKind !== "stay-requirement") issues.push("recordKind: expected stay-requirement");
  if (!["area-advice", "room-verification", "quote-request", "booking-recovery"].includes(String(value.requestKind))) issues.push("requestKind: invalid");
  if (!Array.isArray(value.cityIds) || value.cityIds.length === 0 || value.cityIds.some((city) => !isMember(stayCityIds, city))) issues.push("cityIds: expected one or more exact stay-city IDs");
  if (!Array.isArray(value.stayWindows)) {
    issues.push("stayWindows: expected array");
  } else {
    value.stayWindows.forEach((window, index) => {
      const path = `stayWindows[${index}]`;
      if (!isRecord(window)) {
        issues.push(`${path}: expected object`);
        return;
      }
      hasOnlyKeys(window, new Set(["cityId", "checkInDate", "checkOutDate"]), path, issues);
      if (!isMember(stayCityIds, window.cityId)) issues.push(`${path}.cityId: invalid`);
      if (window.checkInDate !== null && !isIsoDate(window.checkInDate)) issues.push(`${path}.checkInDate: expected date or null`);
      if (window.checkOutDate !== null && !isIsoDate(window.checkOutDate)) issues.push(`${path}.checkOutDate: expected date or null`);
      if (isIsoDate(window.checkInDate) && isIsoDate(window.checkOutDate) && window.checkOutDate <= window.checkInDate) issues.push(`${path}: check-out must follow check-in`);
    });
  }

  for (const direction of ["arrival", "departure"] as const) {
    const item = value[direction];
    if (item === null) continue;
    if (!isRecord(item)) {
      issues.push(`${direction}: expected object or null`);
      continue;
    }
    hasOnlyKeys(item, new Set(["nodeKind", "nodeId", "timeBand"]), direction, issues);
    if (!["airport", "railway-station", "coach-station", "other"].includes(String(item.nodeKind))) issues.push(`${direction}.nodeKind: invalid`);
    if (item.nodeId !== null && !isNonEmptyString(item.nodeId)) issues.push(`${direction}.nodeId: invalid`);
    if (!["early", "morning", "daytime", "evening", "late", "unknown"].includes(String(item.timeBand))) issues.push(`${direction}.timeBand: invalid`);
  }

  if (!isRecord(value.party)) {
    issues.push("party: expected object");
  } else {
    hasOnlyKeys(value.party, new Set(["adults", "childrenAgesAtTravel", "roomCount"]), "party", issues);
    if (!isIntegerInRange(value.party.adults, 1, 20)) issues.push("party.adults: expected integer 1-20");
    if (!Array.isArray(value.party.childrenAgesAtTravel) || value.party.childrenAgesAtTravel.some((age) => !isIntegerInRange(age, 0, 17))) issues.push("party.childrenAgesAtTravel: expected ages 0-17");
    if (!isIntegerInRange(value.party.roomCount, 1, 10)) issues.push("party.roomCount: expected integer 1-10");
  }

  if (!isRecord(value.roomNeeds)) {
    issues.push("roomNeeds: expected object");
  } else {
    hasOnlyKeys(value.roomNeeds, new Set(["bedConfiguration", "connectingRooms", "needIds"]), "roomNeeds", issues);
    if (!["one-bed", "two-beds", "multiple-beds", "flexible", "not-stated"].includes(String(value.roomNeeds.bedConfiguration))) issues.push("roomNeeds.bedConfiguration: invalid");
    if (!["required", "preferred", "not-needed", "not-stated"].includes(String(value.roomNeeds.connectingRooms))) issues.push("roomNeeds.connectingRooms: invalid");
    if (!Array.isArray(value.roomNeeds.needIds) || value.roomNeeds.needIds.some((need) => !isMember(stayNeedIds, need))) issues.push("roomNeeds.needIds: invalid");
  }

  if (!isRecord(value.mobility)) {
    issues.push("mobility: expected object");
  } else {
    hasOnlyKeys(value.mobility, new Set(["stepFreeRequired", "mobilityAid", "maxContinuousWalkMeters", "minimumDoorWidthMm"]), "mobility", issues);
    if (typeof value.mobility.stepFreeRequired !== "boolean") issues.push("mobility.stepFreeRequired: expected boolean");
    if (!["none", "cane", "walker", "manual-wheelchair", "power-wheelchair", "other", "not-stated"].includes(String(value.mobility.mobilityAid))) issues.push("mobility.mobilityAid: invalid");
    if (value.mobility.maxContinuousWalkMeters !== null && (!isFiniteNumber(value.mobility.maxContinuousWalkMeters) || value.mobility.maxContinuousWalkMeters < 0)) issues.push("mobility.maxContinuousWalkMeters: invalid");
    if (value.mobility.minimumDoorWidthMm !== null && (!isFiniteNumber(value.mobility.minimumDoorWidthMm) || value.mobility.minimumDoorWidthMm < 0)) issues.push("mobility.minimumDoorWidthMm: invalid");
  }

  if (!["light", "standard", "large", "oversize", "not-stated"].includes(String(value.luggage))) issues.push("luggage: invalid");
  if (!["foreign-passport", "mainland-id", "other-travel-document", "not-stated"].includes(String(value.travelDocumentClass))) issues.push("travelDocumentClass: invalid");

  if (value.budget !== null) {
    if (!isRecord(value.budget)) {
      issues.push("budget: expected object or null");
    } else {
      hasOnlyKeys(value.budget, new Set(["currency", "minimumPerRoomNight", "maximumPerRoomNight"]), "budget", issues);
      if (!isNonEmptyString(value.budget.currency) || !/^[A-Z]{3}$/.test(value.budget.currency)) issues.push("budget.currency: expected ISO-style uppercase code");
      for (const key of ["minimumPerRoomNight", "maximumPerRoomNight"] as const) {
        if (value.budget[key] !== null && (!isFiniteNumber(value.budget[key]) || value.budget[key] < 0)) issues.push(`budget.${key}: invalid`);
      }
      if (typeof value.budget.minimumPerRoomNight === "number" && typeof value.budget.maximumPerRoomNight === "number" && value.budget.minimumPerRoomNight > value.budget.maximumPerRoomNight) issues.push("budget: minimum exceeds maximum");
    }
  }

  if (!isRecord(value.recovery)) {
    issues.push("recovery: expected object");
  } else {
    hasOnlyKeys(value.recovery, new Set(["hasExistingBooking", "bookingChannel", "problem", "evidenceHeld"]), "recovery", issues);
    if (typeof value.recovery.hasExistingBooking !== "boolean") issues.push("recovery.hasExistingBooking: expected boolean");
    if (!["property-direct", "online-platform", "travel-agent", "unknown", "none"].includes(String(value.recovery.bookingChannel))) issues.push("recovery.bookingChannel: invalid");
    if (!["foreign-guest-refusal", "registration-failure", "room-mismatch", "access-route-failure", "other", "none"].includes(String(value.recovery.problem))) issues.push("recovery.problem: invalid");
    if (!Array.isArray(value.recovery.evidenceHeld) || value.recovery.evidenceHeld.some((item) => !["platform-chat", "property-message", "cancellation-record", "payment-record", "none"].includes(String(item)))) issues.push("recovery.evidenceHeld: invalid");
  }

  if (!isNonEmptyString(value.originContentId)) issues.push("originContentId: required");
  if (!["en", "zh", "ko"].includes(String(value.locale))) issues.push("locale: invalid");
  if (!isRecord(value.replyContact)) {
    issues.push("replyContact: expected object");
  } else {
    hasOnlyKeys(value.replyContact, new Set(["channel", "value"]), "replyContact", issues);
    if (!["email", "phone", "whatsapp", "wechat"].includes(String(value.replyContact.channel))) issues.push("replyContact.channel: invalid");
    if (!isNonEmptyString(value.replyContact.value) || value.replyContact.value.length > 320) issues.push("replyContact.value: invalid");
  }
  validateSupplierSharing(value.supplierSharing, "supplierSharing", issues);

  return issues.length ? { ok: false, issues } : { ok: true, value: value as unknown as StayRequirement };
}

export function validatePropertyVerificationSnapshot(value: unknown): StayValidationResult<PropertyVerificationSnapshot> {
  const issues: string[] = [];
  if (!isRecord(value)) return { ok: false, issues: ["record: expected object"] };
  hasOnlyKeys(value, new Set(["schemaVersion", "recordKind", "requestRef", "internalPropertyRef", "internalSupplierRef", "foreignGuestHandling", "accessChain", "verifiedAt", "expiresAt", "sourceRefIds"]), "record", issues);
  if (value.schemaVersion !== stayNetworkSchemaVersion) issues.push("schemaVersion: unsupported");
  if (value.recordKind !== "property-verification") issues.push("recordKind: expected property-verification");
  if (!isNonEmptyString(value.requestRef)) issues.push("requestRef: required");
  if (!isNonEmptyString(value.internalPropertyRef)) issues.push("internalPropertyRef: required");
  if (value.internalSupplierRef !== null && !isNonEmptyString(value.internalSupplierRef)) issues.push("internalSupplierRef: invalid");

  if (!isRecord(value.foreignGuestHandling)) {
    issues.push("foreignGuestHandling: expected separate legal, platform, and property layers");
  } else {
    hasOnlyKeys(value.foreignGuestHandling, new Set(["legalRule", "platformDisplay", "propertyConfirmation"]), "foreignGuestHandling", issues);
    const legal = value.foreignGuestHandling.legalRule;
    if (!isRecord(legal)) {
      issues.push("foreignGuestHandling.legalRule: required");
    } else {
      hasOnlyKeys(legal, new Set(["sourceId", "reviewedAt", "scope"]), "foreignGuestHandling.legalRule", issues);
      if (!isNonEmptyString(legal.sourceId)) issues.push("foreignGuestHandling.legalRule.sourceId: required");
      if (!isIsoDate(legal.reviewedAt)) issues.push("foreignGuestHandling.legalRule.reviewedAt: expected date");
      if (!["national", "local"].includes(String(legal.scope))) issues.push("foreignGuestHandling.legalRule.scope: invalid");
    }
    const platform = value.foreignGuestHandling.platformDisplay;
    if (!isRecord(platform)) {
      issues.push("foreignGuestHandling.platformDisplay: required");
    } else {
      hasOnlyKeys(platform, new Set(["status", "platformRef", "observedAt"]), "foreignGuestHandling.platformDisplay", issues);
      if (!["shown-compatible", "shown-incompatible", "not-shown", "not-checked"].includes(String(platform.status))) issues.push("foreignGuestHandling.platformDisplay.status: invalid");
      if (platform.platformRef !== null && !isNonEmptyString(platform.platformRef)) issues.push("foreignGuestHandling.platformDisplay.platformRef: invalid");
      if (platform.observedAt !== null && !isIsoDateTime(platform.observedAt)) issues.push("foreignGuestHandling.platformDisplay.observedAt: invalid");
    }
    const property = value.foreignGuestHandling.propertyConfirmation;
    if (!isRecord(property)) {
      issues.push("foreignGuestHandling.propertyConfirmation: required");
    } else {
      hasOnlyKeys(property, new Set(["status", "channel", "checkedAt", "expiresAt"]), "foreignGuestHandling.propertyConfirmation", issues);
      if (!["confirmed", "declined", "unable-to-confirm", "not-asked"].includes(String(property.status))) issues.push("foreignGuestHandling.propertyConfirmation.status: invalid");
      if (property.channel !== null && !["phone", "email", "platform-message", "official-chat", "other"].includes(String(property.channel))) issues.push("foreignGuestHandling.propertyConfirmation.channel: invalid");
      if (property.checkedAt !== null && !isIsoDateTime(property.checkedAt)) issues.push("foreignGuestHandling.propertyConfirmation.checkedAt: invalid");
      if (property.expiresAt !== null && !isIsoDateTime(property.expiresAt)) issues.push("foreignGuestHandling.propertyConfirmation.expiresAt: invalid");
    }
  }

  if (!Array.isArray(value.accessChain)) {
    issues.push("accessChain: expected array");
  } else {
    value.accessChain.forEach((segment, index) => {
      const path = `accessChain[${index}]`;
      if (!isRecord(segment)) {
        issues.push(`${path}: expected object`);
        return;
      }
      hasOnlyKeys(segment, new Set(["segment", "status", "evidenceRefIds"]), path, issues);
      if (!["street-to-entrance", "entrance-to-front-desk", "front-desk-to-lift", "lift-to-room", "room-door", "bathroom"].includes(String(segment.segment))) issues.push(`${path}.segment: invalid`);
      if (!["verified", "partly-verified", "failed", "not-checked"].includes(String(segment.status))) issues.push(`${path}.status: invalid`);
      validateStringArray(segment.evidenceRefIds, `${path}.evidenceRefIds`, issues);
    });
  }
  if (!isIsoDateTime(value.verifiedAt)) issues.push("verifiedAt: invalid");
  if (!isIsoDateTime(value.expiresAt)) issues.push("expiresAt: invalid");
  if (isIsoDateTime(value.verifiedAt) && isIsoDateTime(value.expiresAt) && Date.parse(String(value.expiresAt)) <= Date.parse(String(value.verifiedAt))) issues.push("expiresAt: must follow verifiedAt");
  validateStringArray(value.sourceRefIds, "sourceRefIds", issues, 1);

  return issues.length ? { ok: false, issues } : { ok: true, value: value as unknown as PropertyVerificationSnapshot };
}

export function validateStayQuoteSnapshot(value: unknown): StayValidationResult<StayQuoteSnapshot> {
  const issues: string[] = [];
  if (!isRecord(value)) return { ok: false, issues: ["record: expected object"] };
  hasOnlyKeys(value, new Set(["schemaVersion", "recordKind", "requestRef", "internalPropertyRef", "internalSupplierRef", "roomCategoryRef", "currency", "amount", "taxAndFeeStatus", "breakfastStatus", "cancellationSummary", "requestScopedAvailability", "receivedAt", "validUntil"]), "record", issues);
  if (value.schemaVersion !== stayNetworkSchemaVersion) issues.push("schemaVersion: unsupported");
  if (value.recordKind !== "stay-quote") issues.push("recordKind: expected stay-quote");
  for (const key of ["requestRef", "internalPropertyRef", "internalSupplierRef", "roomCategoryRef", "cancellationSummary"] as const) {
    if (!isNonEmptyString(value[key])) issues.push(`${key}: required`);
  }
  if (!isNonEmptyString(value.currency) || !/^[A-Z]{3}$/.test(value.currency)) issues.push("currency: expected ISO-style uppercase code");
  if (!isFiniteNumber(value.amount) || value.amount < 0) issues.push("amount: invalid");
  if (!["included", "excluded", "partly-included", "unknown"].includes(String(value.taxAndFeeStatus))) issues.push("taxAndFeeStatus: invalid");
  if (!["included", "excluded", "optional", "unknown"].includes(String(value.breakfastStatus))) issues.push("breakfastStatus: invalid");
  if (!["confirmed-at-check", "not-confirmed", "unavailable", "unknown"].includes(String(value.requestScopedAvailability))) issues.push("requestScopedAvailability: invalid");
  if (!isIsoDateTime(value.receivedAt)) issues.push("receivedAt: invalid");
  if (!isIsoDateTime(value.validUntil)) issues.push("validUntil: invalid");
  if (isIsoDateTime(value.receivedAt) && isIsoDateTime(value.validUntil) && Date.parse(String(value.validUntil)) <= Date.parse(String(value.receivedAt))) issues.push("validUntil: must follow receivedAt");
  return issues.length ? { ok: false, issues } : { ok: true, value: value as unknown as StayQuoteSnapshot };
}
