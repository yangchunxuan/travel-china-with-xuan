import assert from "node:assert/strict";
import test from "node:test";

let environment = new Map();

globalThis.Deno = {
  env: {
    get(name) {
      return environment.get(name);
    },
  },
};

const { callSupabaseRpc } = await import(
  "../functions/_shared/runtime.ts"
);

async function captureRpcHeaders(values) {
  environment = new Map(Object.entries(values));
  const originalFetch = globalThis.fetch;
  let capturedHeaders;

  globalThis.fetch = async (_url, init) => {
    capturedHeaders = new Headers(init?.headers);
    return new Response(JSON.stringify({ outcome: "test" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await callSupabaseRpc("test_rpc", {});
    assert.equal(result.ok, true);
    return capturedHeaders;
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("RPC prefers the injected Supabase secret-key dictionary", async () => {
  const headers = await captureRpcHeaders({
    SUPABASE_URL: "https://project-ref.supabase.co",
    SUPABASE_SECRET_KEYS: JSON.stringify({
      default: "sb_secret_test-placeholder",
    }),
    SUPABASE_SERVICE_ROLE_KEY: "legacy-test-placeholder",
  });

  assert.equal(headers.get("apikey"), "sb_secret_test-placeholder");
  assert.equal(headers.get("authorization"), null);
});

test("RPC keeps the legacy service-role key as a compatibility fallback", async () => {
  const headers = await captureRpcHeaders({
    SUPABASE_URL: "https://project-ref.supabase.co",
    SUPABASE_SERVICE_ROLE_KEY: "legacy-test-placeholder",
  });

  assert.equal(headers.get("apikey"), "legacy-test-placeholder");
  assert.equal(
    headers.get("authorization"),
    "Bearer legacy-test-placeholder",
  );
});

test("malformed new-key configuration fails closed", async () => {
  environment = new Map([
    ["SUPABASE_URL", "https://project-ref.supabase.co"],
    ["SUPABASE_SECRET_KEYS", "{}"],
    ["SUPABASE_SERVICE_ROLE_KEY", "legacy-test-placeholder"],
  ]);

  await assert.rejects(
    callSupabaseRpc("test_rpc", {}),
    /invalid_env:SUPABASE_SECRET_KEYS/,
  );
});
