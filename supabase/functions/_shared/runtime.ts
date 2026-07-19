declare const Deno: {
  env: {
    get(name: string): string | undefined;
  };
};

export interface RpcResult<T> {
  ok: boolean;
  status: number;
  data: T | null;
}

interface SupabaseAdminCredential {
  key: string;
  usesLegacyAuthorization: boolean;
}

export const SUPABASE_RPC_TIMEOUT_MILLISECONDS = 10_000;

export function optionalEnv(name: string): string | undefined {
  const value = Deno.env.get(name)?.trim();
  return value ? value : undefined;
}

export function requiredEnv(name: string): string {
  const value = optionalEnv(name);
  if (!value) throw new Error(`missing_env:${name}`);
  return value;
}

export function commaSeparatedEnv(name: string): string[] {
  return (optionalEnv(name) ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

export function positiveIntegerEnv(
  name: string,
  fallback: number,
  minimum: number,
  maximum: number,
): number {
  const raw = optionalEnv(name);
  if (!raw) return fallback;
  const value = Number(raw);
  if (
    !Number.isSafeInteger(value) ||
    value < minimum ||
    value > maximum
  ) {
    throw new Error(`invalid_env:${name}`);
  }
  return value;
}

export function booleanEnv(name: string, fallback = false): boolean {
  const raw = optionalEnv(name);
  if (!raw) return fallback;
  if (raw === "true") return true;
  if (raw === "false") return false;
  throw new Error(`invalid_env:${name}`);
}

export function jsonResponse(
  status: number,
  body: unknown,
  headers: HeadersInit = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    },
  });
}

export async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return bytesToHex(new Uint8Array(digest));
}

export async function hmacSha256Hex(
  secret: string,
  value: string,
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );
  return bytesToHex(new Uint8Array(signature));
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

export function constantTimeEqual(left: string, right: string): boolean {
  const leftBytes = new TextEncoder().encode(left);
  const rightBytes = new TextEncoder().encode(right);
  const length = Math.max(leftBytes.length, rightBytes.length);
  let difference = leftBytes.length ^ rightBytes.length;

  for (let index = 0; index < length; index += 1) {
    difference |=
      (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }
  return difference === 0;
}

function supabaseAdminCredential(): SupabaseAdminCredential {
  const secretKeysJson = optionalEnv("SUPABASE_SECRET_KEYS");
  if (secretKeysJson) {
    let secretKeys: unknown;
    try {
      secretKeys = JSON.parse(secretKeysJson);
    } catch {
      throw new Error("invalid_env:SUPABASE_SECRET_KEYS");
    }

    if (
      typeof secretKeys !== "object" ||
      secretKeys === null ||
      Array.isArray(secretKeys) ||
      !("default" in secretKeys) ||
      typeof secretKeys.default !== "string" ||
      !secretKeys.default.trim()
    ) {
      throw new Error("invalid_env:SUPABASE_SECRET_KEYS");
    }

    return {
      key: secretKeys.default.trim(),
      usesLegacyAuthorization: false,
    };
  }

  return {
    key: requiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    usesLegacyAuthorization: true,
  };
}

export async function callSupabaseRpc<T>(
  rpcName: string,
  argumentsObject: Record<string, unknown>,
): Promise<RpcResult<T>> {
  const supabaseUrl = requiredEnv("SUPABASE_URL").replace(/\/+$/, "");
  const adminCredential = supabaseAdminCredential();
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(
    () => timeoutController.abort(),
    SUPABASE_RPC_TIMEOUT_MILLISECONDS,
  );

  let response: Response;
  try {
    response = await fetch(
      `${supabaseUrl}/rest/v1/rpc/${encodeURIComponent(rpcName)}`,
      {
        method: "POST",
        headers: {
          apikey: adminCredential.key,
          ...(adminCredential.usesLegacyAuthorization
            ? { Authorization: `Bearer ${adminCredential.key}` }
            : {}),
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(argumentsObject),
        signal: timeoutController.signal,
      },
    );
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    // Never return or log the PostgREST response body: it may include details
    // derived from values that are intentionally kept out of telemetry.
    await response.body?.cancel();
    return { ok: false, status: response.status, data: null };
  }

  return {
    ok: true,
    status: response.status,
    data: (await response.json()) as T,
  };
}

export function requestIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = normalizedIpAddress(forwarded.split(",")[0] ?? null);
    if (first) return first;
  }

  const cloudflareIp = normalizedIpAddress(
    request.headers.get("cf-connecting-ip"),
  );
  if (cloudflareIp) return cloudflareIp;

  // Supabase documents X-Forwarded-For as the client-IP source. If the
  // gateway supplies neither documented XFF nor a Cloudflare fallback, use
  // one shared conservative bucket instead of disabling rate limiting.
  return "missing-client-ip";
}

function normalizedIpAddress(value: string | null): string | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (
    normalized.length < 2 ||
    normalized.length > 45 ||
    !/^[0-9a-f:.]+$/i.test(normalized) ||
    (!normalized.includes(".") && !normalized.includes(":"))
  ) {
    return null;
  }
  return normalized;
}

export function safeRequestId(): string {
  return crypto.randomUUID();
}
