import {
  type NormalizedTrafficAttribution,
  type NormalizedTrafficEventBatch,
  type NormalizedTrafficSessionStart,
  trafficEventBatchRequestType,
  trafficEventsContractVersion,
  trafficEventsNoticeVersion,
  trafficSessionStartRequestType,
  validateAndNormalizeTrafficEventBatch,
  validateAndNormalizeTrafficSessionStart,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "../_shared/traffic-contracts.ts";
import {
  booleanEnv,
  callSupabaseRpc,
  commaSeparatedEnv,
  constantTimeEqual,
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
const unknownAttribution: NormalizedTrafficAttribution = {
  utmSource: null,
  utmMedium: null,
  utmCampaign: null,
  utmContent: null,
};

interface RecordTrafficEventsRpcResponse {
  outcome:
    | "created"
    | "replay"
    | "idempotency_conflict"
    | "rate_limited";
  acceptedCount?: number;
  replayedCount?: number;
  retryAfter?: number;
}

interface ConsumeTrafficSessionStartRateLimitRpcResponse {
  outcome: "allowed" | "rate_limited";
  retryAfter?: number;
}

const observableOperationalStatuses = new Set([401, 429, 503]);
type ObservableTrafficRequestType =
  | "unknown"
  | typeof trafficSessionStartRequestType
  | typeof trafficEventBatchRequestType;

function validateIndependentTrafficSecrets(): void {
  const names = [
    "TRAFFIC_SESSION_HASH_SECRET",
    "TRAFFIC_RATE_LIMIT_HASH_SECRET",
    "TRAFFIC_SESSION_CREDENTIAL_SECRET",
    "TRAFFIC_ATTRIBUTION_LINK_SIGNING_SECRET",
  ] as const;
  const values = names.map((name) => requiredEnv(name));
  if (
    values.some((value) => value.length < 32) ||
    new Set(values).size !== values.length
  ) {
    throw new Error("invalid_traffic_secrets");
  }
}

function attributionMessage(
  entryPath: string,
  attribution: NormalizedTrafficAttribution,
): string {
  return [
    "homeground-attribution-link.v1",
    entryPath,
    attribution.utmSource ?? "",
    attribution.utmMedium ?? "",
    attribution.utmCampaign ?? "",
    attribution.utmContent ?? "",
  ].join("\n");
}

function attributionHasLabels(
  attribution: NormalizedTrafficAttribution,
): boolean {
  return Object.values(attribution).some((value) => value !== null);
}

async function acceptedAttribution({
  entryPath,
  attribution,
  attributionSignature,
}: {
  entryPath: string;
  attribution: NormalizedTrafficAttribution;
  attributionSignature: string | null;
}): Promise<NormalizedTrafficAttribution> {
  if (!attributionHasLabels(attribution)) return unknownAttribution;
  if (
    !attribution.utmSource ||
    !attribution.utmMedium ||
    !attribution.utmCampaign ||
    !attributionSignature
  ) {
    return unknownAttribution;
  }

  const expectedSignature = await hmacSha256Hex(
    requiredEnv("TRAFFIC_ATTRIBUTION_LINK_SIGNING_SECRET"),
    attributionMessage(entryPath, attribution),
  );
  return constantTimeEqual(expectedSignature, attributionSignature)
    ? attribution
    : unknownAttribution;
}

function credentialMessage({
  expiresAt,
  sessionToken,
  locale,
  entryPath,
  attribution,
}: {
  expiresAt: number;
  sessionToken: string;
  locale: string;
  entryPath: string;
  attribution: NormalizedTrafficAttribution;
}): string {
  return [
    "homeground-traffic-session.v1",
    trafficEventsContractVersion,
    trafficEventsNoticeVersion,
    String(expiresAt),
    sessionToken,
    locale,
    entryPath,
    attribution.utmSource ?? "",
    attribution.utmMedium ?? "",
    attribution.utmCampaign ?? "",
    attribution.utmContent ?? "",
  ].join("\n");
}

async function issueSessionCredential(
  payload: NormalizedTrafficSessionStart,
  attribution: NormalizedTrafficAttribution,
): Promise<{ credential: string; expiresAt: number }> {
  const ttlSeconds = positiveIntegerEnv(
    "TRAFFIC_SESSION_CREDENTIAL_TTL_SECONDS",
    1_800,
    300,
    7_200,
  );
  const expiresAt = Math.floor(Date.now() / 1_000) + ttlSeconds;
  const signature = await hmacSha256Hex(
    requiredEnv("TRAFFIC_SESSION_CREDENTIAL_SECRET"),
    credentialMessage({
      expiresAt,
      sessionToken: payload.sessionToken,
      locale: payload.locale,
      entryPath: payload.entryPath,
      attribution,
    }),
  );
  return {
    credential: `v1.${expiresAt}.${signature}`,
    expiresAt,
  };
}

async function validSessionCredential(
  payload: NormalizedTrafficEventBatch,
  attribution: NormalizedTrafficAttribution,
): Promise<boolean> {
  const match =
    /^v1\.([0-9]{10})\.([0-9a-f]{64})$/u.exec(
      payload.sessionCredential,
    );
  if (!match) return false;

  const expiresAt = Number(match[1]);
  const suppliedSignature = match[2] ?? "";
  const now = Math.floor(Date.now() / 1_000);
  const maximumTtl = positiveIntegerEnv(
    "TRAFFIC_SESSION_CREDENTIAL_TTL_SECONDS",
    1_800,
    300,
    7_200,
  );
  if (
    !Number.isSafeInteger(expiresAt) ||
    expiresAt <= now ||
    expiresAt > now + maximumTtl + 60
  ) {
    return false;
  }

  const expectedSignature = await hmacSha256Hex(
    requiredEnv("TRAFFIC_SESSION_CREDENTIAL_SECRET"),
    credentialMessage({
      expiresAt,
      sessionToken: payload.sessionToken,
      locale: payload.locale,
      entryPath: payload.entryPath,
      attribution,
    }),
  );
  return constantTimeEqual(expectedSignature, suppliedSignature);
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
    "Access-Control-Allow-Headers": "content-type",
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
  requestId: string,
  headers: HeadersInit,
  fieldErrors?: Record<string, string>,
  retryAfter?: number,
  requestType: ObservableTrafficRequestType = "unknown",
): Response {
  if (observableOperationalStatuses.has(status)) {
    try {
      // Keep operational failures discoverable without logging request bodies,
      // IP addresses, browser tokens, credentials or attribution labels.
      console.warn(JSON.stringify({
        event: "homeground_traffic_operational_response",
        requestId,
        status,
        code,
        requestType,
      }));
    } catch {
      // Observability must never change the public response path.
    }
  }
  return jsonResponse(
    status,
    {
      error: {
        code,
        retryable,
        ...(fieldErrors ? { fieldErrors } : {}),
        ...(retryAfter !== undefined ? { retryAfter } : {}),
        requestId,
      },
    },
    headers,
  );
}

function safeRetryAfter(value: unknown): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value <= 0
  ) {
    return 1;
  }
  return Math.min(86_400, Math.max(1, Math.ceil(value)));
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
    if (
      requestedMethod !== "POST" ||
      !requestedHeaders.every((header) => header === "content-type")
    ) {
      return errorResponse(
        403,
        "preflight_not_allowed",
        false,
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
      requestId,
      { ...responseHeaders, Allow: "POST, OPTIONS" },
    );
  }

  let collectionEnabled: boolean;
  try {
    // The endpoint remains dark until the release, notice and operational
    // gates are deliberately enabled in the server environment.
    collectionEnabled = booleanEnv("TRAFFIC_EVENTS_ENABLED", false);
  } catch {
    return errorResponse(
      503,
      "service_not_configured",
      false,
      requestId,
      responseHeaders,
    );
  }
  if (!collectionEnabled) {
    return errorResponse(
      503,
      "collection_paused",
      false,
      requestId,
      responseHeaders,
    );
  }
  try {
    validateIndependentTrafficSecrets();
  } catch {
    return errorResponse(
      503,
      "service_not_configured",
      false,
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
      requestId,
      responseHeaders,
    );
  }

  const requestType =
    typeof rawPayload === "object" &&
    rawPayload !== null &&
    !Array.isArray(rawPayload) &&
    "requestType" in rawPayload
      ? rawPayload.requestType
      : undefined;

  if (requestType === trafficSessionStartRequestType) {
    const validation =
      validateAndNormalizeTrafficSessionStart(rawPayload);
    if (validation.ok === false) {
      return errorResponse(
        validation.code === "unsupported_contract" ? 409 : 422,
        validation.code,
        false,
        requestId,
        responseHeaders,
        validation.fieldErrors,
      );
    }

    let ipRateLimitSubjectHash: string;
    let globalRateLimitSubjectHash: string;
    let ipShortRateLimit: number;
    let ipDailyRateLimit: number;
    let globalShortRateLimit: number;
    let globalDailyRateLimit: number;
    try {
      const rateLimitSecret = requiredEnv(
        "TRAFFIC_RATE_LIMIT_HASH_SECRET",
      );
      ipRateLimitSubjectHash = await hmacSha256Hex(
        rateLimitSecret,
        `session-start-ip:v1:${requestIp(request)}`,
      );
      globalRateLimitSubjectHash = await hmacSha256Hex(
        rateLimitSecret,
        "session-start-global:v1",
      );
      ipShortRateLimit = positiveIntegerEnv(
        "TRAFFIC_SESSION_START_IP_RATE_LIMIT_10_MINUTES",
        30,
        1,
        2_000,
      );
      ipDailyRateLimit = positiveIntegerEnv(
        "TRAFFIC_SESSION_START_IP_RATE_LIMIT_24_HOURS",
        120,
        1,
        20_000,
      );
      globalShortRateLimit = positiveIntegerEnv(
        "TRAFFIC_SESSION_START_GLOBAL_RATE_LIMIT_10_MINUTES",
        200,
        1,
        20_000,
      );
      globalDailyRateLimit = positiveIntegerEnv(
        "TRAFFIC_SESSION_START_GLOBAL_RATE_LIMIT_24_HOURS",
        2_000,
        1,
        100_000,
      );
    } catch {
      return errorResponse(
        503,
        "service_not_configured",
        false,
        requestId,
        responseHeaders,
        undefined,
        undefined,
        trafficSessionStartRequestType,
      );
    }

    let rateLimitResult;
    try {
      rateLimitResult =
        await callSupabaseRpc<
          ConsumeTrafficSessionStartRateLimitRpcResponse
        >(
          "consume_homeground_traffic_session_start_rate_limit_v1",
          {
            p_ip_rate_limit_subject_hash: ipRateLimitSubjectHash,
            p_global_rate_limit_subject_hash:
              globalRateLimitSubjectHash,
            p_ip_short_rate_limit: ipShortRateLimit,
            p_ip_daily_rate_limit: ipDailyRateLimit,
            p_global_short_rate_limit: globalShortRateLimit,
            p_global_daily_rate_limit: globalDailyRateLimit,
          },
        );
    } catch {
      return errorResponse(
        503,
        "persistence_unavailable",
        true,
        requestId,
        responseHeaders,
        undefined,
        undefined,
        trafficSessionStartRequestType,
      );
    }

    if (!rateLimitResult.ok || !rateLimitResult.data) {
      return errorResponse(
        503,
        "persistence_unavailable",
        true,
        requestId,
        responseHeaders,
        undefined,
        undefined,
        trafficSessionStartRequestType,
      );
    }
    if (rateLimitResult.data.outcome === "rate_limited") {
      const retryAfter = safeRetryAfter(
        rateLimitResult.data.retryAfter,
      );
      return errorResponse(
        429,
        "rate_limited",
        true,
        requestId,
        { ...responseHeaders, "Retry-After": String(retryAfter) },
        undefined,
        retryAfter,
        trafficSessionStartRequestType,
      );
    }
    if (rateLimitResult.data.outcome !== "allowed") {
      return errorResponse(
        503,
        "persistence_unavailable",
        true,
        requestId,
        responseHeaders,
        undefined,
        undefined,
        trafficSessionStartRequestType,
      );
    }

    try {
      const attribution = await acceptedAttribution(validation.value);
      const issued = await issueSessionCredential(
        validation.value,
        attribution,
      );
      return jsonResponse(
        201,
        {
          contractVersion: trafficEventsContractVersion,
          state: "session_ready",
          sessionCredential: issued.credential,
          expiresAt: new Date(issued.expiresAt * 1_000).toISOString(),
          attributionState: attributionHasLabels(attribution)
            ? "verified"
            : "unknown",
          requestId,
        },
        responseHeaders,
      );
    } catch {
      return errorResponse(
        503,
        "service_not_configured",
        false,
        requestId,
        responseHeaders,
        undefined,
        undefined,
        trafficSessionStartRequestType,
      );
    }
  }

  if (requestType !== trafficEventBatchRequestType) {
    return errorResponse(
      422,
      "validation_failed",
      false,
      requestId,
      responseHeaders,
      { requestType: "invalid" },
    );
  }

  const validation = validateAndNormalizeTrafficEventBatch(rawPayload);
  if (validation.ok === false) {
    return errorResponse(
      validation.code === "unsupported_contract" ? 409 : 422,
      validation.code,
      false,
      requestId,
      responseHeaders,
      validation.fieldErrors,
    );
  }
  const payload = validation.value;

  let sessionHash: string;
  let ipRateLimitSubjectHash: string;
  let sessionRateLimitSubjectHash: string;
  let globalRateLimitSubjectHash: string;
  let ipShortRateLimit: number;
  let ipDailyRateLimit: number;
  let sessionShortRateLimit: number;
  let sessionDailyRateLimit: number;
  let globalShortRateLimit: number;
  let globalDailyRateLimit: number;
  let attribution: NormalizedTrafficAttribution;
  let eventsForRpc: Array<Record<string, string | null>>;
  try {
    attribution = await acceptedAttribution(payload);
    if (!(await validSessionCredential(payload, attribution))) {
      return errorResponse(
        401,
        "invalid_session_credential",
        false,
        requestId,
        responseHeaders,
        undefined,
        undefined,
        trafficEventBatchRequestType,
      );
    }
    sessionHash = await hmacSha256Hex(
      requiredEnv("TRAFFIC_SESSION_HASH_SECRET"),
      payload.sessionToken,
    );
    const rateLimitSecret = requiredEnv(
      "TRAFFIC_RATE_LIMIT_HASH_SECRET",
    );
    ipRateLimitSubjectHash = await hmacSha256Hex(
      rateLimitSecret,
      `ip:v1:${requestIp(request)}`,
    );
    sessionRateLimitSubjectHash = await hmacSha256Hex(
      rateLimitSecret,
      `session:v1:${payload.sessionToken}`,
    );
    globalRateLimitSubjectHash = await hmacSha256Hex(
      rateLimitSecret,
      "global:v1",
    );
    ipShortRateLimit = positiveIntegerEnv(
      "TRAFFIC_IP_RATE_LIMIT_10_MINUTES",
      60,
      1,
      2_000,
    );
    ipDailyRateLimit = positiveIntegerEnv(
      "TRAFFIC_IP_RATE_LIMIT_24_HOURS",
      300,
      1,
      20_000,
    );
    sessionShortRateLimit = positiveIntegerEnv(
      "TRAFFIC_SESSION_RATE_LIMIT_10_MINUTES",
      30,
      1,
      2_000,
    );
    sessionDailyRateLimit = positiveIntegerEnv(
      "TRAFFIC_SESSION_RATE_LIMIT_24_HOURS",
      120,
      1,
      20_000,
    );
    globalShortRateLimit = positiveIntegerEnv(
      "TRAFFIC_GLOBAL_RATE_LIMIT_10_MINUTES",
      200,
      1,
      20_000,
    );
    globalDailyRateLimit = positiveIntegerEnv(
      "TRAFFIC_GLOBAL_RATE_LIMIT_24_HOURS",
      2_000,
      1,
      100_000,
    );
    eventsForRpc = await Promise.all(
      payload.events.map(async (event) => {
        const normalizedEvent = {
          eventId: event.eventId,
          type: event.type,
          pagePath: event.pagePath,
          actionCode: event.actionCode,
        };
        return {
          ...normalizedEvent,
          payloadHash: await sha256Hex(JSON.stringify(normalizedEvent)),
        };
      }),
    );
  } catch {
    return errorResponse(
      503,
      "service_not_configured",
      false,
      requestId,
      responseHeaders,
      undefined,
      undefined,
      trafficEventBatchRequestType,
    );
  }

  let persistenceResult;
  try {
    persistenceResult =
      await callSupabaseRpc<RecordTrafficEventsRpcResponse>(
        "record_homeground_traffic_events_v1",
        {
          p_contract_version: payload.contractVersion,
          p_notice_version: payload.noticeVersion,
          p_session_hash: sessionHash,
          p_locale: payload.locale,
          p_entry_path: payload.entryPath,
          p_utm_source: attribution.utmSource,
          p_utm_medium: attribution.utmMedium,
          p_utm_campaign: attribution.utmCampaign,
          p_utm_content: attribution.utmContent,
          p_events: eventsForRpc,
          p_ip_rate_limit_subject_hash: ipRateLimitSubjectHash,
          p_session_rate_limit_subject_hash:
            sessionRateLimitSubjectHash,
          p_global_rate_limit_subject_hash:
            globalRateLimitSubjectHash,
          p_ip_short_rate_limit: ipShortRateLimit,
          p_ip_daily_rate_limit: ipDailyRateLimit,
          p_session_short_rate_limit: sessionShortRateLimit,
          p_session_daily_rate_limit: sessionDailyRateLimit,
          p_global_short_rate_limit: globalShortRateLimit,
          p_global_daily_rate_limit: globalDailyRateLimit,
        },
      );
  } catch {
    return errorResponse(
      503,
      "persistence_unavailable",
      true,
      requestId,
      responseHeaders,
      undefined,
      undefined,
      trafficEventBatchRequestType,
    );
  }

  if (!persistenceResult.ok || !persistenceResult.data) {
    return errorResponse(
      503,
      "persistence_unavailable",
      true,
      requestId,
      responseHeaders,
      undefined,
      undefined,
      trafficEventBatchRequestType,
    );
  }

  const result = persistenceResult.data;
  if (result.outcome === "rate_limited") {
    const retryAfter = safeRetryAfter(result.retryAfter);
    return errorResponse(
      429,
      "rate_limited",
      true,
      requestId,
      { ...responseHeaders, "Retry-After": String(retryAfter) },
      undefined,
      retryAfter,
      trafficEventBatchRequestType,
    );
  }
  if (result.outcome === "idempotency_conflict") {
    return errorResponse(
      409,
      "idempotency_conflict",
      false,
      requestId,
      responseHeaders,
    );
  }
  if (
    !["created", "replay"].includes(result.outcome) ||
    !Number.isSafeInteger(result.acceptedCount) ||
    !Number.isSafeInteger(result.replayedCount)
  ) {
    return errorResponse(
      503,
      "persistence_unavailable",
      true,
      requestId,
      responseHeaders,
      undefined,
      undefined,
      trafficEventBatchRequestType,
    );
  }

  return jsonResponse(
    result.outcome === "created" ? 202 : 200,
    {
      contractVersion: trafficEventsContractVersion,
      state: "accepted",
      acceptedCount: result.acceptedCount,
      replayedCount: result.replayedCount,
      duplicate: result.outcome === "replay",
      requestId,
    },
    responseHeaders,
  );
}

Deno.serve(handleRequest);
