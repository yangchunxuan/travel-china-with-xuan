import { callSupabaseRpc, commaSeparatedEnv, hmacSha256Hex, requestIp, requiredEnv, sha256Hex } from "../_shared/runtime.ts";
declare const Deno: { serve(handler: (request: Request) => Promise<Response>): void };
export async function handleAdConsentWithdrawal(request: Request): Promise<Response> {
  const origin = request.headers.get("origin") ?? "";
  const headers = { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type", "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", Vary: "Origin" };
  try {
    if (!origin || !commaSeparatedEnv("ALLOWED_ORIGINS").includes(origin)) return new Response(null, { status: 403 });
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.method !== "POST") return new Response(null, { status: 405, headers });
    if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return new Response(null, { status: 400, headers });
    const reader = request.body?.getReader(); if (!reader) return new Response(null, { status: 400, headers });
    let text = "", size = 0; const decoder = new TextDecoder();
    for (;;) { const { value, done } = await reader.read(); if (done) break; size += value.byteLength;
      if (size > 128) { await reader.cancel(); return new Response(null, { status: 413, headers }); } text += decoder.decode(value, { stream: true }); }
    const value = JSON.parse(text + decoder.decode());
    if (!value || typeof value !== "object" || Object.keys(value).length !== 1 || typeof value.revocationToken !== "string" ||
      !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/iu.test(value.revocationToken)) return new Response(null, { status: 400, headers });
    const result = await callSupabaseRpc<boolean>("withdraw_homeground_ad_attribution_v1", {
      p_token_hash: await sha256Hex(value.revocationToken.toLowerCase()),
      p_rate_limit_subject_hash: await hmacSha256Hex(requiredEnv("RATE_LIMIT_HASH_SECRET"), `ad-consent:${requestIp(request) ?? "unavailable"}`),
    });
    return new Response(null, { status: !result.ok ? 503 : result.data === true ? 204 : 429, headers });
  } catch { return new Response(null, { status: 503, headers }); }
}
Deno.serve(handleAdConsentWithdrawal);
