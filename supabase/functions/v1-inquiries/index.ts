import {
  budgetDestinationInquiryFormVersion,
  canonicalizeJson,
  currentDestinationInquiryFormVersion,
  destinationInquirySchemaVersion,
  legacyDestinationInquiryFormVersion,
  previousDestinationInquiryFormVersion,
  semanticInquiryPayload,
  submitSurfaceDestinationInquiryFormVersion,
  validateAndNormalizeInquiry,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "../../../lib/inquiryContract.ts";
import {
  allowedInquiryEntryPathSet,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "../../../lib/inquiryEntryPaths.ts";
import {
  booleanEnv,
  callSupabaseRpc,
  commaSeparatedEnv,
  hmacSha256Hex,
  jsonResponse,
  positiveIntegerEnv,
  requestIp,
  requiredEnv,
  safeRequestId,
  sha256Hex,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "../_shared/runtime.ts";

declare const Deno: {
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};

const maximumRequestBytes = 16 * 1024;
const uuidV4Pattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const guideSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const allowedSourceGuides = new Set([
  "beijing-zhangjiajie-shanghai-10-days",
  "beijing-zhangjiajie-shanghai-transport",
  "best-zhangjiajie-night-show",
  "china-240-hour-visa-free-transit-route-check",
  "china-entry-guides",
  "china-entry-requirements",
  "china-visa-free-canadian-citizens-2026",
  "china-visa-free-new-zealand-citizens-2026",
  "china-visa-free-uk-citizens-2026",
  "do-singaporeans-need-visa-china",
  "do-us-citizens-need-visa-china-2026",
  "guides-hub",
  "is-your-china-itinerary-too-rushed",
  "kevin-before-the-hotel-pickup",
  "visa-free-entry",
  "zhangjiajie-glass-bridge-vs-skywalk",
  "zhangjiajie-itinerary",
  "zhangjiajie-older-travellers",
]);
const disallowedAttributionCharacters =
  /[\u0000-\u001f\u007f-\u009f\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/u;
const allowedNormalizedAttributionKeys = new Set([
  "landingPath",
  "entryPath",
  "sourceGuide",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "utmContent",
  "gclid",
  "fbclid",
]);
const optionalAttributionKeys = [
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "utmContent",
] as const;
/**
 * Google's click id is an opaque URL-safe token it appends itself. Enforcing
 * that exact shape here, independently of the shared contract, keeps a crafted
 * `?gclid=` or `?fbclid=` from smuggling traveller text past the public
 * boundary. The bound covers Meta's much longer `fbclid`.
 */
const adClickIdPattern = /^[A-Za-z0-9._-]{1,512}$/u;
const adClickIdKeys = ["gclid", "fbclid"] as const;

type PersistedInquiryAttribution = {
  entryPath: string;
  sourceGuide?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
};

interface CreateInquiryRpcResponse {
  outcome:
    | "created"
    | "replay"
    | "idempotency_conflict"
    | "rate_limited";
  inquiryId?: string;
  publicReference?: string;
  receivedAt?: string;
  retryAfter?: number;
}

type PersistenceState = "not_persisted" | "unknown";

function unicodeLength(value: string): number {
  return Array.from(value).length;
}

function isBoundedPlainText(
  value: unknown,
  maximumLength: number,
): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    unicodeLength(value) <= maximumLength &&
    !disallowedAttributionCharacters.test(value)
  );
}

/**
 * Rebuild the storage object from an allowlist instead of forwarding a
 * browser-owned JSON object to the database. The shared Inquiry contract is
 * the first validation boundary; this is deliberate defense in depth at the
 * public Edge boundary.
 */
function persistedAttribution(
  value: unknown,
): PersistedInquiryAttribution | null {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  if (
    Object.keys(candidate).some(
      (key) => !allowedNormalizedAttributionKeys.has(key),
    )
  ) {
    return null;
  }

  const entryPath =
    candidate.entryPath === undefined || candidate.entryPath === null
      ? candidate.landingPath
      : candidate.entryPath;
  if (
    !isBoundedPlainText(entryPath, 200) ||
    !allowedInquiryEntryPathSet.has(entryPath) ||
    !entryPath.startsWith("/") ||
    entryPath.startsWith("//") ||
    entryPath.includes("://") ||
    entryPath.includes("?") ||
    entryPath.includes("#")
  ) {
    return null;
  }

  const result: PersistedInquiryAttribution = { entryPath };
  const sourceGuide = candidate.sourceGuide;
  if (sourceGuide !== undefined && sourceGuide !== null) {
    if (
      !isBoundedPlainText(sourceGuide, 100) ||
      !guideSlugPattern.test(sourceGuide) ||
      !allowedSourceGuides.has(sourceGuide)
    ) {
      return null;
    }
    result.sourceGuide = sourceGuide;
  }

  for (const key of optionalAttributionKeys) {
    const field = candidate[key];
    if (field === undefined || field === null) continue;
    if (!isBoundedPlainText(field, 100)) return null;
    result[key] = field;
  }

  for (const key of adClickIdKeys) {
    const clickId = candidate[key];
    if (clickId === undefined || clickId === null) continue;
    if (typeof clickId !== "string" || !adClickIdPattern.test(clickId)) {
      return null;
    }
    result[key] = clickId;
  }

  return result;
}

function requestsAttributionPersistence(value: unknown): boolean {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }
  const payload = value as Record<string, unknown>;
  const attribution = payload.attribution;
  return (
    typeof attribution === "object" &&
    attribution !== null &&
    !Array.isArray(attribution) &&
    Object.prototype.hasOwnProperty.call(attribution, "entryPath")
  );
}

function parseAllowedOrigins(): Set<string> {
  const configured = commaSeparatedEnv("ALLOWED_ORIGINS");
  if (configured.length === 0) throw new Error("missing_env:ALLOWED_ORIGINS");

  const origins = new Set<string>();
  for (const value of configured) {
    const parsed = new URL(value);
    if (
      parsed.origin !== value ||
      (parsed.protocol !== "https:" &&
        !(parsed.protocol === "http:" && parsed.hostname === "localhost"))
    ) {
      throw new Error("invalid_env:ALLOWED_ORIGINS");
    }
    origins.add(value);
  }
  return origins;
}

function corsHeaders(origin: string): HeadersInit {
  return {
    "Access-Control-Allow-Headers": "content-type, idempotency-key",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Max-Age": "600",
    Vary: "Origin",
  };
}

function errorResponse(
  status: number,
  code: string,
  retryable: boolean,
  persistenceState: PersistenceState,
  requestId: string,
  headers: HeadersInit,
  fieldErrors?: Record<string, string>,
  retryAfter?: number,
): Response {
  return jsonResponse(
    status,
    {
      error: {
        code,
        retryable,
        persistenceState,
        ...(fieldErrors ? { fieldErrors } : {}),
        ...(retryAfter !== undefined ? { retryAfter } : {}),
        requestId,
      },
    },
    headers,
  );
}

async function readLimitedBody(
  request: Request,
): Promise<{ tooLarge: boolean; text: string }> {
  const contentLength = request.headers.get("content-length");
  if (
    contentLength &&
    Number.isFinite(Number(contentLength)) &&
    Number(contentLength) > maximumRequestBytes
  ) {
    return { tooLarge: true, text: "" };
  }

  if (!request.body) return { tooLarge: false, text: "" };
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const result = await reader.read();
    if (result.done) break;
    totalBytes += result.value.byteLength;
    if (totalBytes > maximumRequestBytes) {
      await reader.cancel();
      return { tooLarge: true, text: "" };
    }
    chunks.push(result.value);
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return {
    tooLarge: false,
    text: new TextDecoder("utf-8", { fatal: true }).decode(bytes),
  };
}

async function handleRequest(request: Request): Promise<Response> {
  const requestId = safeRequestId();
  let allowedOrigins: Set<string>;
  try {
    allowedOrigins = parseAllowedOrigins();
  } catch {
    return errorResponse(
      503,
      "service_not_configured",
      false,
      "not_persisted",
      requestId,
      {},
    );
  }

  const origin = request.headers.get("origin") ?? "";
  if (!allowedOrigins.has(origin)) {
    return errorResponse(
      403,
      "origin_not_allowed",
      false,
      "not_persisted",
      requestId,
      {},
    );
  }
  const responseHeaders = corsHeaders(origin);

  if (request.method === "OPTIONS") {
    const requestedMethod =
      request.headers.get("access-control-request-method")?.toUpperCase();
    const requestedHeaders = (
      request.headers.get("access-control-request-headers") ?? ""
    )
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);
    const headersAllowed = requestedHeaders.every((header) =>
      ["content-type", "idempotency-key"].includes(header)
    );
    if (requestedMethod !== "POST" || !headersAllowed) {
      return errorResponse(
        403,
        "preflight_not_allowed",
        false,
        "not_persisted",
        requestId,
        responseHeaders,
      );
    }
    return new Response(null, { status: 204, headers: responseHeaders });
  }

  if (request.method !== "POST") {
    return errorResponse(
      405,
      "method_not_allowed",
      false,
      "not_persisted",
      requestId,
      { ...responseHeaders, Allow: "POST, OPTIONS" },
    );
  }

  let acceptingSubmissions: boolean;
  try {
    acceptingSubmissions = booleanEnv(
      "INQUIRY_ACCEPTING_SUBMISSIONS",
      true,
    );
  } catch {
    return errorResponse(
      503,
      "service_not_configured",
      false,
      "not_persisted",
      requestId,
      responseHeaders,
    );
  }
  if (!acceptingSubmissions) {
    return errorResponse(
      503,
      "intake_paused",
      false,
      "not_persisted",
      requestId,
      responseHeaders,
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!/^application\/json(?:\s*;\s*charset=utf-8)?$/i.test(contentType)) {
    return errorResponse(
      415,
      "unsupported_media_type",
      false,
      "not_persisted",
      requestId,
      responseHeaders,
    );
  }

  const idempotencyKey = request.headers.get("idempotency-key")?.trim() ?? "";
  if (!uuidV4Pattern.test(idempotencyKey)) {
    return errorResponse(
      400,
      "invalid_idempotency_key",
      false,
      "not_persisted",
      requestId,
      responseHeaders,
    );
  }

  let bodyText: string;
  try {
    const body = await readLimitedBody(request);
    if (body.tooLarge) {
      return errorResponse(
        413,
        "request_too_large",
        false,
        "not_persisted",
        requestId,
        responseHeaders,
      );
    }
    bodyText = body.text;
  } catch {
    return errorResponse(
      400,
      "malformed_json",
      false,
      "not_persisted",
      requestId,
      responseHeaders,
    );
  }

  let rawPayload: unknown;
  try {
    rawPayload = JSON.parse(bodyText);
  } catch {
    return errorResponse(
      400,
      "malformed_json",
      false,
      "not_persisted",
      requestId,
      responseHeaders,
    );
  }
  const attributionPersistenceRequested =
    requestsAttributionPersistence(rawPayload);

  let formVersions: string[];
  let privacyVersions: string[];
  let whatsappEnabled: boolean;
  try {
    formVersions = commaSeparatedEnv("ALLOWED_FORM_VERSIONS");
    privacyVersions = commaSeparatedEnv("ALLOWED_PRIVACY_NOTICE_VERSIONS");
    if (formVersions.length === 0 || privacyVersions.length === 0) {
      throw new Error("missing_version_configuration");
    }
    whatsappEnabled = booleanEnv("WHATSAPP_ENABLED", false);
  } catch {
    return errorResponse(
      503,
      "service_not_configured",
      false,
      "not_persisted",
      requestId,
      responseHeaders,
    );
  }

  const validation = validateAndNormalizeInquiry(rawPayload, {
    allowedFormVersions: formVersions,
    allowedPrivacyNoticeVersions: privacyVersions,
    whatsappEnabled,
  });
  if (validation.ok === false) {
    const status =
      validation.code === "route_mismatch" ||
      validation.code === "unsupported_rule_version"
        ? 409
        : 422;
    return errorResponse(
      status,
      validation.code,
      false,
      "not_persisted",
      requestId,
      responseHeaders,
      validation.fieldErrors,
    );
  }

  const payload = validation.value;
  const isCurrentDestinationInquiry =
    payload.schemaVersion === destinationInquirySchemaVersion &&
    payload.formVersion === currentDestinationInquiryFormVersion;
  const isPreviousDestinationInquiry =
    payload.schemaVersion === destinationInquirySchemaVersion &&
    payload.formVersion === previousDestinationInquiryFormVersion;
  const isBudgetDestinationInquiry =
    payload.schemaVersion === destinationInquirySchemaVersion &&
    payload.formVersion === budgetDestinationInquiryFormVersion;
  const isLegacyDestinationInquiry =
    payload.schemaVersion === destinationInquirySchemaVersion &&
    payload.formVersion === legacyDestinationInquiryFormVersion;
  const isSubmitSurfaceDestinationInquiry =
    payload.schemaVersion === destinationInquirySchemaVersion &&
    payload.formVersion === submitSurfaceDestinationInquiryFormVersion;
  const useCurrentAttributionRpc =
    isCurrentDestinationInquiry && attributionPersistenceRequested;
  if (isCurrentDestinationInquiry && !useCurrentAttributionRpc) {
    return errorResponse(
      422,
      "validation_failed",
      false,
      "not_persisted",
      requestId,
      responseHeaders,
      { "attribution.entryPath": "required" },
    );
  }
  const attributionForPersistence = isCurrentDestinationInquiry
    ? persistedAttribution(payload.attribution)
    : null;
  if (isCurrentDestinationInquiry && !attributionForPersistence) {
    return errorResponse(
      422,
      "validation_failed",
      false,
      "not_persisted",
      requestId,
      responseHeaders,
      { attribution: "invalid" },
    );
  }

  let idempotencyKeyHash: string;
  let payloadHash: string;
  let rateLimitSubjectHash: string;
  let shortRateLimit: number;
  let dailyRateLimit: number;
  let firstResponseDueAt: string;

  try {
    const semanticPayload = canonicalizeJson(
      semanticInquiryPayload(payload),
    );
    idempotencyKeyHash = await hmacSha256Hex(
      requiredEnv("IDEMPOTENCY_HASH_SECRET"),
      idempotencyKey.toLowerCase(),
    );
    payloadHash = await sha256Hex(semanticPayload);
    const ip = requestIp(request);
    rateLimitSubjectHash = await hmacSha256Hex(
      requiredEnv("RATE_LIMIT_HASH_SECRET"),
      ip,
    );
    shortRateLimit = positiveIntegerEnv(
      "RATE_LIMIT_10_MINUTES",
      5,
      1,
      100,
    );
    dailyRateLimit = positiveIntegerEnv(
      "RATE_LIMIT_24_HOURS",
      20,
      1,
      1_000,
    );
    const now = Date.now();
    firstResponseDueAt = new Date(
      now +
        positiveIntegerEnv("REPLY_SLA_HOURS", 24, 1, 720) * 3_600_000,
    ).toISOString();
  } catch {
    return errorResponse(
      503,
      "service_not_configured",
      false,
      "not_persisted",
      requestId,
      responseHeaders,
    );
  }

  let persistenceResult;
  try {
    persistenceResult = await callSupabaseRpc<CreateInquiryRpcResponse>(
      isCurrentDestinationInquiry
        ? "create_homeground_destination_inquiry_v5_attribution"
        : isSubmitSurfaceDestinationInquiry
          ? "create_homeground_destination_inquiry_v4"
          : isBudgetDestinationInquiry
            ? "create_homeground_destination_inquiry_v3"
            : isPreviousDestinationInquiry
              ? "create_homeground_destination_inquiry_v2"
              : isLegacyDestinationInquiry
                ? "create_homeground_destination_inquiry"
                : "create_homeground_inquiry",
      {
        p_schema_version: payload.schemaVersion,
        p_form_version: payload.formVersion,
        p_locale: payload.locale,
        p_journey_id: payload.journey.journeyId,
        p_journey_revision: payload.journey.revision,
        p_route_id: payload.journey.routeId,
        p_rule_version: payload.routeSnapshot.ruleVersion,
        p_answers: payload.journey.answers,
        p_route_snapshot: payload.routeSnapshot,
        p_contact_channel: payload.contact.channel,
        p_contact_email:
          payload.contact.channel === "email" ? payload.contact.email : null,
        p_contact_phone_e164:
          payload.contact.channel === "whatsapp"
            ? payload.contact.phoneE164
            : null,
        ...(
          isCurrentDestinationInquiry ||
            isSubmitSurfaceDestinationInquiry ||
            isBudgetDestinationInquiry ||
            isPreviousDestinationInquiry
          ? { p_departure_country: payload.departureCountry }
          : {}),
        ...(
          isCurrentDestinationInquiry ||
            isSubmitSurfaceDestinationInquiry ||
            isBudgetDestinationInquiry
          ? {
              p_rough_budget_per_person:
                payload.roughBudgetPerPerson,
            }
          : {}),
        p_note: payload.note,
        p_privacy_notice_version: payload.privacyNoticeVersion,
        p_landing_path: payload.attribution.landingPath,
        p_attribution: isCurrentDestinationInquiry
          ? attributionForPersistence
          : {
              utmSource: payload.attribution.utmSource,
              utmMedium: payload.attribution.utmMedium,
              utmCampaign: payload.attribution.utmCampaign,
            },
        p_idempotency_key_hash: idempotencyKeyHash,
        p_payload_hash: payloadHash,
        p_rate_limit_subject_hash: rateLimitSubjectHash,
        p_short_rate_limit: shortRateLimit,
        p_daily_rate_limit: dailyRateLimit,
        p_first_response_due_at: firstResponseDueAt,
      },
    );
  } catch {
    return errorResponse(
      503,
      "persistence_unavailable",
      true,
      "unknown",
      requestId,
      responseHeaders,
    );
  }

  if (!persistenceResult.ok || !persistenceResult.data) {
    return errorResponse(
      503,
      "persistence_unavailable",
      true,
      "unknown",
      requestId,
      responseHeaders,
    );
  }

  if (persistenceResult.data.outcome === "rate_limited") {
    const retryAfter = Math.max(
      1,
      Math.ceil(persistenceResult.data.retryAfter || 1),
    );
    return errorResponse(
      429,
      "rate_limited",
      true,
      "unknown",
      requestId,
      {
        ...responseHeaders,
        "Retry-After": String(retryAfter),
      },
      undefined,
      retryAfter,
    );
  }

  if (persistenceResult.data.outcome === "idempotency_conflict") {
    return errorResponse(
      409,
      "idempotency_conflict",
      false,
      "not_persisted",
      requestId,
      responseHeaders,
    );
  }

  const result = persistenceResult.data;
  if (!result.inquiryId || !result.publicReference || !result.receivedAt) {
    return errorResponse(
      503,
      "persistence_unavailable",
      true,
      "unknown",
      requestId,
      responseHeaders,
    );
  }

  return jsonResponse(
    result.outcome === "created" ? 201 : 200,
    {
      publicReference: result.publicReference,
      state: "submitted",
      receivedAt: result.receivedAt,
      duplicate: result.outcome === "replay",
      requestId,
    },
    responseHeaders,
  );
}

Deno.serve(handleRequest);
