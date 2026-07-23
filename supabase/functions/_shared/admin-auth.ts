import {
  booleanEnv,
  commaSeparatedEnv,
  constantTimeEqual,
  jsonResponse,
  optionalEnv,
  positiveIntegerEnv,
  requiredEnv,
  safeRequestId,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "./runtime.ts";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const permittedRequestHeaders = new Set([
  "authorization",
  "apikey",
  "x-client-info",
]);

type JsonRecord = Record<string, unknown>;

interface PublishableKeyConfiguration {
  primary: string;
  accepted: readonly string[];
}

interface VerifiedAdmin {
  userId: string;
}

export interface AuthorizedAdminRequest {
  response: null;
  headers: HeadersInit;
  requestId: string;
  admin: VerifiedAdmin;
}

export interface RejectedAdminRequest {
  response: Response;
  headers: HeadersInit;
  requestId: string;
  admin: null;
}

export type AdminRequestResult =
  | AuthorizedAdminRequest
  | RejectedAdminRequest;

function isRecord(value: unknown): value is JsonRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function adminAllowedOrigin(): string {
  const value = requiredEnv("ADMIN_ALLOWED_ORIGIN");
  const parsed = new URL(value);
  if (
    parsed.origin !== value ||
    (
      parsed.protocol !== "https:" &&
      !(parsed.protocol === "http:" && parsed.hostname === "localhost")
    )
  ) {
    throw new Error("invalid_env:ADMIN_ALLOWED_ORIGIN");
  }
  return value;
}

function adminCorsHeaders(origin: string): HeadersInit {
  return {
    "Access-Control-Allow-Headers":
      "authorization, apikey, x-client-info",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Max-Age": "600",
    "Cache-Control": "no-store",
    Pragma: "no-cache",
    Vary: "Origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
  };
}

function adminErrorResponse(
  status: number,
  code: string,
  requestId: string,
  headers: HeadersInit,
): Response {
  return jsonResponse(
    status,
    { error: { code, requestId } },
    { ...headers, Pragma: "no-cache" },
  );
}

function publishableKeyConfiguration(): PublishableKeyConfiguration {
  const dictionaryJson = optionalEnv("SUPABASE_PUBLISHABLE_KEYS");
  if (dictionaryJson) {
    let dictionary: unknown;
    try {
      dictionary = JSON.parse(dictionaryJson);
    } catch {
      throw new Error("invalid_env:SUPABASE_PUBLISHABLE_KEYS");
    }
    if (!isRecord(dictionary)) {
      throw new Error("invalid_env:SUPABASE_PUBLISHABLE_KEYS");
    }

    const values = Object.values(dictionary).filter(
      (value): value is string =>
        typeof value === "string" && value.trim().length > 0,
    ).map((value) => value.trim());
    const primary = dictionary.default;
    if (
      typeof primary !== "string" ||
      !primary.trim() ||
      values.length === 0 ||
      values.some((value) =>
        value.length > 2_048 || /[\r\n]/u.test(value)
      )
    ) {
      throw new Error("invalid_env:SUPABASE_PUBLISHABLE_KEYS");
    }
    return {
      primary: primary.trim(),
      accepted: [...new Set(values)],
    };
  }

  const singleKey =
    optionalEnv("SUPABASE_PUBLISHABLE_KEY") ??
    optionalEnv("SUPABASE_ANON_KEY");
  if (
    !singleKey ||
    singleKey.length > 2_048 ||
    /[\r\n]/u.test(singleKey)
  ) {
    throw new Error("missing_env:SUPABASE_PUBLISHABLE_KEY");
  }
  return { primary: singleKey, accepted: [singleKey] };
}

function suppliedApiKeyIsAccepted(
  suppliedKey: string,
  configuration: PublishableKeyConfiguration,
): boolean {
  return configuration.accepted.some((allowedKey) =>
    constantTimeEqual(suppliedKey, allowedKey)
  );
}

function allowedAdminUserIds(): Set<string> {
  const values = commaSeparatedEnv("ADMIN_ALLOWED_USER_IDS").map(
    (value) => value.toLowerCase(),
  );
  if (
    values.length === 0 ||
    values.some((value) => !uuidPattern.test(value))
  ) {
    throw new Error("invalid_env:ADMIN_ALLOWED_USER_IDS");
  }
  return new Set(values);
}

function bearerToken(request: Request): string | null {
  const authorization = request.headers.get("authorization") ?? "";
  const match = authorization.match(/^Bearer ([^\s]+)$/u);
  if (!match) return null;
  const token = match[1];
  if (token.length < 20 || token.length > 8_192) return null;
  return token;
}

function decodeBase64UrlJson(value: string): unknown {
  if (!/^[A-Za-z0-9_-]+$/u.test(value)) {
    throw new Error("invalid_jwt");
  }
  const padded = value.replaceAll("-", "+").replaceAll("_", "/")
    .padEnd(Math.ceil(value.length / 4) * 4, "=");
  const decoded = atob(padded);
  const bytes = Uint8Array.from(decoded, (character) =>
    character.charCodeAt(0)
  );
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}

function jwtClaims(token: string): JsonRecord {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("invalid_jwt");
  const payload = decodeBase64UrlJson(parts[1]);
  if (!isRecord(payload)) throw new Error("invalid_jwt");
  return payload;
}

function hasAuthenticatedAudience(value: unknown): boolean {
  if (value === "authenticated") return true;
  return Array.isArray(value) &&
    value.some((audience) => audience === "authenticated");
}

async function userFromSupabaseAuth(
  token: string,
  configuration: PublishableKeyConfiguration,
): Promise<JsonRecord | null> {
  const supabaseUrl = requiredEnv("SUPABASE_URL").replace(/\/+$/u, "");
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => timeoutController.abort(), 5_000);

  let response: Response;
  try {
    response = await fetch(`${supabaseUrl}/auth/v1/user`, {
      method: "GET",
      headers: {
        apikey: configuration.primary,
        Authorization: `Bearer ${token}`,
      },
      redirect: "error",
      signal: timeoutController.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    await response.body?.cancel();
    return null;
  }

  const user = await response.json();
  return isRecord(user) ? user : null;
}

async function verifyAdmin(
  request: Request,
): Promise<
  | { ok: true; admin: VerifiedAdmin }
  | { ok: false; status: number; code: string }
> {
  let configuration: PublishableKeyConfiguration;
  let allowlist: Set<string>;
  let maximumTokenLifetime: number;
  let supabaseUrl: string;
  try {
    configuration = publishableKeyConfiguration();
    allowlist = allowedAdminUserIds();
    maximumTokenLifetime = positiveIntegerEnv(
      "ADMIN_MAX_TOKEN_LIFETIME_SECONDS",
      3_600,
      300,
      7_200,
    );
    supabaseUrl = requiredEnv("SUPABASE_URL").replace(/\/+$/u, "");
  } catch {
    return { ok: false, status: 503, code: "admin_not_configured" };
  }

  const suppliedApiKey = request.headers.get("apikey") ?? "";
  if (!suppliedApiKeyIsAccepted(suppliedApiKey, configuration)) {
    return { ok: false, status: 401, code: "unauthorized" };
  }

  const token = bearerToken(request);
  if (!token) return { ok: false, status: 401, code: "unauthorized" };

  let claims: JsonRecord;
  let user: JsonRecord | null;
  try {
    claims = jwtClaims(token);
    user = await userFromSupabaseAuth(token, configuration);
  } catch {
    return { ok: false, status: 401, code: "unauthorized" };
  }
  if (!user) return { ok: false, status: 401, code: "unauthorized" };

  const nowInSeconds = Math.floor(Date.now() / 1_000);
  const subject =
    typeof claims.sub === "string" ? claims.sub.toLowerCase() : "";
  const userId =
    typeof user.id === "string" ? user.id.toLowerCase() : "";
  const issuer = `${supabaseUrl}/auth/v1`;
  const expiry = claims.exp;
  const issuedAt = claims.iat;

  if (
    !uuidPattern.test(subject) ||
    userId !== subject ||
    claims.iss !== issuer ||
    !hasAuthenticatedAudience(claims.aud) ||
    typeof expiry !== "number" ||
    !Number.isSafeInteger(expiry) ||
    expiry <= nowInSeconds ||
    typeof issuedAt !== "number" ||
    !Number.isSafeInteger(issuedAt) ||
    issuedAt > nowInSeconds + 60 ||
    expiry - issuedAt > maximumTokenLifetime ||
    claims.aal !== "aal2"
  ) {
    return {
      ok: false,
      status: claims.aal === "aal1" ? 403 : 401,
      code: claims.aal === "aal1" ? "mfa_required" : "unauthorized",
    };
  }

  if (!allowlist.has(subject)) {
    return { ok: false, status: 403, code: "admin_forbidden" };
  }

  return { ok: true, admin: { userId: subject } };
}

function validPreflight(request: Request): boolean {
  const requestedMethod =
    request.headers.get("access-control-request-method")?.toUpperCase();
  const requestedHeaders = (
    request.headers.get("access-control-request-headers") ?? ""
  )
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return requestedMethod === "GET" &&
    requestedHeaders.every((header) =>
      permittedRequestHeaders.has(header)
    );
}

export async function authorizeAdminRequest(
  request: Request,
): Promise<AdminRequestResult> {
  const requestId = safeRequestId();
  let allowedOrigin: string;
  try {
    allowedOrigin = adminAllowedOrigin();
  } catch {
    return {
      response: adminErrorResponse(
        503,
        "admin_not_configured",
        requestId,
        {},
      ),
      headers: {},
      requestId,
      admin: null,
    };
  }

  const origin = request.headers.get("origin") ?? "";
  if (origin !== allowedOrigin) {
    return {
      response: adminErrorResponse(
        403,
        "origin_not_allowed",
        requestId,
        {},
      ),
      headers: {},
      requestId,
      admin: null,
    };
  }
  const headers = adminCorsHeaders(origin);

  if (request.method === "OPTIONS") {
    if (!validPreflight(request)) {
      return {
        response: adminErrorResponse(
          403,
          "preflight_not_allowed",
          requestId,
          headers,
        ),
        headers,
        requestId,
        admin: null,
      };
    }
    return {
      response: new Response(null, { status: 204, headers }),
      headers,
      requestId,
      admin: null,
    };
  }

  if (request.method !== "GET") {
    return {
      response: adminErrorResponse(
        405,
        "method_not_allowed",
        requestId,
        { ...headers, Allow: "GET, OPTIONS" },
      ),
      headers,
      requestId,
      admin: null,
    };
  }

  let enabled = false;
  try {
    enabled = booleanEnv("ADMIN_API_ENABLED", false);
  } catch {
    enabled = false;
  }
  if (!enabled) {
    return {
      response: adminErrorResponse(
        503,
        "admin_disabled",
        requestId,
        headers,
      ),
      headers,
      requestId,
      admin: null,
    };
  }

  if (new URL(request.url).search.length > 0) {
    return {
      response: adminErrorResponse(
        400,
        "query_not_allowed",
        requestId,
        headers,
      ),
      headers,
      requestId,
      admin: null,
    };
  }

  const verification = await verifyAdmin(request);
  if (verification.ok === false) {
    return {
      response: adminErrorResponse(
        verification.status,
        verification.code,
        requestId,
        headers,
      ),
      headers,
      requestId,
      admin: null,
    };
  }

  return {
    response: null,
    headers,
    requestId,
    admin: verification.admin,
  };
}

export function adminSuccessResponse(
  body: unknown,
  headers: HeadersInit,
): Response {
  return jsonResponse(200, body, { ...headers, Pragma: "no-cache" });
}

export function adminUnavailableResponse(
  code: string,
  requestId: string,
  headers: HeadersInit,
): Response {
  return adminErrorResponse(503, code, requestId, headers);
}
