export const trafficEventsContractVersion =
  "homeground-traffic-events.v1" as const;
export const trafficEventsNoticeVersion = "2026-07-31.1" as const;
export const trafficSessionStartRequestType = "start_session" as const;
export const trafficEventBatchRequestType = "events" as const;

export const trafficEventTypes = [
  "page_view",
  "contact_options_viewed",
  "contact_channel_clicked",
  "email_form_started",
] as const;

export const trafficContactActionCodes = [
  "email",
  "whatsapp",
  "messenger",
] as const;

const trafficLocales = ["en", "zh", "ko"] as const;
const uuidV4Pattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const hmacSha256Pattern = /^[0-9a-f]{64}$/i;
const sessionCredentialPattern = /^v1\.[0-9]{10}\.[0-9a-f]{64}$/i;
const controlledUtmPattern = /^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/;
const controlledPathPattern = /^\/[A-Za-z0-9/_-]*$/;

type TrafficLocale = (typeof trafficLocales)[number];
type TrafficEventType = (typeof trafficEventTypes)[number];
type TrafficContactActionCode =
  (typeof trafficContactActionCodes)[number];

export interface NormalizedTrafficAttribution {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
}

export interface NormalizedTrafficEvent {
  eventId: string;
  type: TrafficEventType;
  pagePath: string;
  actionCode: TrafficContactActionCode | null;
}

export interface NormalizedTrafficEventBatch {
  requestType: typeof trafficEventBatchRequestType;
  contractVersion: typeof trafficEventsContractVersion;
  noticeVersion: typeof trafficEventsNoticeVersion;
  sessionToken: string;
  sessionCredential: string;
  locale: TrafficLocale;
  entryPath: string;
  attribution: NormalizedTrafficAttribution;
  attributionSignature: string | null;
  events: NormalizedTrafficEvent[];
}

export interface NormalizedTrafficSessionStart {
  requestType: typeof trafficSessionStartRequestType;
  contractVersion: typeof trafficEventsContractVersion;
  noticeVersion: typeof trafficEventsNoticeVersion;
  sessionToken: string;
  locale: TrafficLocale;
  entryPath: string;
  attribution: NormalizedTrafficAttribution;
  attributionSignature: string | null;
}

export type TrafficValidationResult =
  | { ok: true; value: NormalizedTrafficEventBatch }
  | {
      ok: false;
      code: "validation_failed" | "unsupported_contract";
      fieldErrors: Record<string, string>;
    };

export type TrafficSessionStartValidationResult =
  | { ok: true; value: NormalizedTrafficSessionStart }
  | {
      ok: false;
      code: "validation_failed" | "unsupported_contract";
      fieldErrors: Record<string, string>;
    };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function hasOnlyKeys(
  value: Record<string, unknown>,
  allowedKeys: readonly string[],
  prefix: string,
  fieldErrors: Record<string, string>,
): void {
  const allowed = new Set(allowedKeys);
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) {
      fieldErrors[prefix ? `${prefix}.${key}` : key] = "unexpected";
    }
  }
}

function isOneOf<T extends string>(
  value: unknown,
  allowed: readonly T[],
): value is T {
  return typeof value === "string" && allowed.includes(value as T);
}

function normalizeControlledPath(value: unknown): string | null {
  if (
    typeof value !== "string" ||
    value.length < 1 ||
    value.length > 180 ||
    value !== value.trim() ||
    !controlledPathPattern.test(value) ||
    value.includes("//") ||
    value.includes("..")
  ) {
    return null;
  }
  return value;
}

function normalizeControlledUtm(
  value: unknown,
  maximumLength: number,
): string | null | undefined {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value !== "string") return undefined;

  const normalized = value.normalize("NFKC").trim().toLowerCase();
  if (
    normalized.length < 1 ||
    normalized.length > maximumLength ||
    !controlledUtmPattern.test(normalized)
  ) {
    // An untrusted or malformed value becomes Unknown rather than being
    // persisted as arbitrary free text.
    return null;
  }
  return normalized;
}

function normalizeAttribution(
  input: Record<string, unknown>,
  fieldErrors: Record<string, string>,
): NormalizedTrafficAttribution {
  const normalizedAttribution: NormalizedTrafficAttribution = {
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
    utmContent: null,
  };
  if (!isPlainObject(input.attribution)) {
    fieldErrors.attribution = "required";
    return normalizedAttribution;
  }

  hasOnlyKeys(
    input.attribution,
    ["utmSource", "utmMedium", "utmCampaign", "utmContent"],
    "attribution",
    fieldErrors,
  );
  for (const [key, maximumLength] of [
    ["utmSource", 64],
    ["utmMedium", 64],
    ["utmCampaign", 96],
    ["utmContent", 96],
  ] as const) {
    const normalized = normalizeControlledUtm(
      input.attribution[key],
      maximumLength,
    );
    if (normalized === undefined) {
      fieldErrors[`attribution.${key}`] = "invalid";
    } else {
      normalizedAttribution[key] = normalized;
    }
  }
  return normalizedAttribution;
}

function normalizeAttributionSignature(
  value: unknown,
  fieldErrors: Record<string, string>,
): string | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value !== "string" || !hmacSha256Pattern.test(value)) {
    fieldErrors.attributionSignature = "invalid";
    return null;
  }
  return value.toLowerCase();
}

function validateSharedSessionFields(
  input: Record<string, unknown>,
  fieldErrors: Record<string, string>,
) {
  if (input.contractVersion !== trafficEventsContractVersion) {
    fieldErrors.contractVersion = "unsupported";
  }
  if (input.noticeVersion !== trafficEventsNoticeVersion) {
    fieldErrors.noticeVersion = "unsupported";
  }
  if (
    typeof input.sessionToken !== "string" ||
    !uuidV4Pattern.test(input.sessionToken)
  ) {
    fieldErrors.sessionToken = "invalid";
  }
  if (!isOneOf(input.locale, trafficLocales)) {
    fieldErrors.locale = "invalid";
  }
  const entryPath = normalizeControlledPath(input.entryPath);
  if (entryPath === null) fieldErrors.entryPath = "invalid";
  return entryPath;
}

export function validateAndNormalizeTrafficSessionStart(
  input: unknown,
): TrafficSessionStartValidationResult {
  const fieldErrors: Record<string, string> = {};
  if (!isPlainObject(input)) {
    return {
      ok: false,
      code: "validation_failed",
      fieldErrors: { request: "invalid" },
    };
  }

  hasOnlyKeys(
    input,
    [
      "requestType",
      "contractVersion",
      "noticeVersion",
      "sessionToken",
      "locale",
      "entryPath",
      "attribution",
      "attributionSignature",
    ],
    "",
    fieldErrors,
  );
  if (input.requestType !== trafficSessionStartRequestType) {
    fieldErrors.requestType = "invalid";
  }
  const entryPath = validateSharedSessionFields(input, fieldErrors);
  const attribution = normalizeAttribution(input, fieldErrors);
  const attributionSignature = normalizeAttributionSignature(
    input.attributionSignature,
    fieldErrors,
  );

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      code:
        fieldErrors.contractVersion === "unsupported"
          ? "unsupported_contract"
          : "validation_failed",
      fieldErrors,
    };
  }

  return {
    ok: true,
    value: {
      requestType: trafficSessionStartRequestType,
      contractVersion: trafficEventsContractVersion,
      noticeVersion: trafficEventsNoticeVersion,
      sessionToken: (input.sessionToken as string).toLowerCase(),
      locale: input.locale as TrafficLocale,
      entryPath: entryPath as string,
      attribution,
      attributionSignature,
    },
  };
}

export function validateAndNormalizeTrafficEventBatch(
  input: unknown,
): TrafficValidationResult {
  const fieldErrors: Record<string, string> = {};
  if (!isPlainObject(input)) {
    return {
      ok: false,
      code: "validation_failed",
      fieldErrors: { request: "invalid" },
    };
  }

  hasOnlyKeys(
    input,
    [
      "requestType",
      "contractVersion",
      "noticeVersion",
      "sessionToken",
      "sessionCredential",
      "locale",
      "entryPath",
      "attribution",
      "attributionSignature",
      "events",
    ],
    "",
    fieldErrors,
  );

  if (input.requestType !== trafficEventBatchRequestType) {
    fieldErrors.requestType = "invalid";
  }
  const entryPath = validateSharedSessionFields(input, fieldErrors);
  if (
    typeof input.sessionCredential !== "string" ||
    !sessionCredentialPattern.test(input.sessionCredential)
  ) {
    fieldErrors.sessionCredential = "invalid";
  }
  const normalizedAttribution = normalizeAttribution(input, fieldErrors);
  const attributionSignature = normalizeAttributionSignature(
    input.attributionSignature,
    fieldErrors,
  );

  const normalizedEvents: NormalizedTrafficEvent[] = [];
  const eventIds = new Set<string>();
  if (
    !Array.isArray(input.events) ||
    input.events.length < 1 ||
    input.events.length > 20
  ) {
    fieldErrors.events = "invalid";
  } else {
    input.events.forEach((candidate, index) => {
      const prefix = `events.${index}`;
      if (!isPlainObject(candidate)) {
        fieldErrors[prefix] = "invalid";
        return;
      }
      hasOnlyKeys(
        candidate,
        ["eventId", "type", "pagePath", "actionCode"],
        prefix,
        fieldErrors,
      );

      if (
        typeof candidate.eventId !== "string" ||
        !uuidV4Pattern.test(candidate.eventId)
      ) {
        fieldErrors[`${prefix}.eventId`] = "invalid";
      } else if (eventIds.has(candidate.eventId.toLowerCase())) {
        fieldErrors[`${prefix}.eventId`] = "duplicate";
      } else {
        eventIds.add(candidate.eventId.toLowerCase());
      }

      if (!isOneOf(candidate.type, trafficEventTypes)) {
        fieldErrors[`${prefix}.type`] = "invalid";
      }

      const pagePath = normalizeControlledPath(candidate.pagePath);
      if (pagePath === null) {
        fieldErrors[`${prefix}.pagePath`] = "invalid";
      }

      let actionCode: TrafficContactActionCode | null = null;
      if (candidate.type === "contact_channel_clicked") {
        if (!isOneOf(candidate.actionCode, trafficContactActionCodes)) {
          fieldErrors[`${prefix}.actionCode`] = "invalid";
        } else {
          actionCode = candidate.actionCode;
        }
      } else if (
        candidate.actionCode !== null &&
        candidate.actionCode !== undefined
      ) {
        fieldErrors[`${prefix}.actionCode`] = "not_allowed";
      }

      if (
        typeof candidate.eventId === "string" &&
        uuidV4Pattern.test(candidate.eventId) &&
        isOneOf(candidate.type, trafficEventTypes) &&
        pagePath !== null &&
        !(`${prefix}.eventId` in fieldErrors) &&
        !(`${prefix}.type` in fieldErrors) &&
        !(`${prefix}.pagePath` in fieldErrors) &&
        !(`${prefix}.actionCode` in fieldErrors)
      ) {
        normalizedEvents.push({
          eventId: candidate.eventId.toLowerCase(),
          type: candidate.type,
          pagePath,
          actionCode,
        });
      }
    });
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      code:
        fieldErrors.contractVersion === "unsupported"
          ? "unsupported_contract"
          : "validation_failed",
      fieldErrors,
    };
  }

  return {
    ok: true,
    value: {
      requestType: trafficEventBatchRequestType,
      contractVersion: trafficEventsContractVersion,
      noticeVersion: trafficEventsNoticeVersion,
      sessionToken: (input.sessionToken as string).toLowerCase(),
      sessionCredential: (input.sessionCredential as string).toLowerCase(),
      locale: input.locale as TrafficLocale,
      entryPath: entryPath as string,
      attribution: normalizedAttribution,
      attributionSignature,
      events: normalizedEvents,
    },
  };
}
