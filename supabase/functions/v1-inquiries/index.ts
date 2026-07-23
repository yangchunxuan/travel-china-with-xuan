import {
  budgetDestinationInquiryFormVersion,
  canonicalizeJson,
  currentDestinationInquiryFormVersion,
  destinationInquirySchemaVersion,
  legacyDestinationInquiryFormVersion,
  previousDestinationInquiryFormVersion,
  semanticInquiryPayload,
  validateAndNormalizeInquiry,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "../../../lib/inquiryContract.ts";
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
    persistenceResult = await callSupabaseRpc<CreateInquiryRpcResponse>(
      isCurrentDestinationInquiry
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
            isBudgetDestinationInquiry ||
            isPreviousDestinationInquiry
          ? { p_departure_country: payload.departureCountry }
          : {}),
        ...(isCurrentDestinationInquiry || isBudgetDestinationInquiry
          ? {
              p_rough_budget_per_person:
                payload.roughBudgetPerPerson,
            }
          : {}),
        p_note: payload.note,
        p_privacy_notice_version: payload.privacyNoticeVersion,
        p_landing_path: payload.attribution.landingPath,
        p_attribution: {
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
