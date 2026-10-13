import { booleanEnv, constantTimeEqual, jsonResponse, requiredEnv } from "../_shared/runtime.ts";
import { adConversionConfiguration, runAdConversionWorker } from "../_shared/ad-conversion-worker.ts";
declare const Deno: { serve(handler: (request: Request) => Promise<Response>): void };
export async function handleAdConversionUpload(request: Request): Promise<Response> {
  try {
    if (request.method !== "POST" || new URL(request.url).search || request.headers.has("origin")) return jsonResponse(405, { error: "method_not_allowed" });
    const secret = requiredEnv("GOOGLE_ADS_WORKER_SECRET");
    if (secret.length < 32 || !constantTimeEqual(request.headers.get("x-worker-secret") ?? "", secret)) return jsonResponse(401, { error: "unauthorized" });
    if (!booleanEnv("GOOGLE_ADS_UPLOAD_ENABLED", false)) return jsonResponse(200, { status: "disabled" });
    return jsonResponse(200, await runAdConversionWorker(adConversionConfiguration()));
  } catch { return jsonResponse(503, { error: "conversion_worker_unavailable" }); }
}
Deno.serve(handleAdConversionUpload);
