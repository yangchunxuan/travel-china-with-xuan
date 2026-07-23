import assert from "node:assert/strict";
import test from "node:test";

const adminUserId = "f56bd2f4-546f-4ef4-8bbc-269e4283047b";
let environment = new Map();

globalThis.Deno = {
  env: {
    get(name) {
      return environment.get(name);
    },
  },
};

const { authorizeAdminRequest } = await import(
  "../functions/_shared/admin-auth.ts"
);

function configure(overrides = {}) {
  environment = new Map(Object.entries({
    ADMIN_ALLOWED_ORIGIN: "https://admin.example.test",
    ADMIN_API_ENABLED: "true",
    ADMIN_ALLOWED_USER_IDS: adminUserId,
    ADMIN_MAX_TOKEN_LIFETIME_SECONDS: "3600",
    SUPABASE_URL: "https://project-ref.supabase.co",
    SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test-placeholder",
    ...overrides,
  }));
}

function jwt(aal = "aal2") {
  const now = Math.floor(Date.now() / 1000);
  const encode = (value) =>
    Buffer.from(JSON.stringify(value))
      .toString("base64url");
  return [
    encode({ alg: "ES256", typ: "JWT" }),
    encode({
      sub: adminUserId,
      iss: "https://project-ref.supabase.co/auth/v1",
      aud: "authenticated",
      iat: now - 10,
      exp: now + 3500,
      aal,
    }),
    "signature-placeholder",
  ].join(".");
}

function adminRequest(token = jwt()) {
  return new Request(
    "https://project-ref.supabase.co/functions/v1/admin-insights",
    {
      method: "GET",
      headers: {
        origin: "https://admin.example.test",
        apikey: "sb_publishable_test-placeholder",
        authorization: `Bearer ${token}`,
      },
    },
  );
}

test("exact-origin preflight works while the Admin data kill switch is off", async () => {
  configure({ ADMIN_API_ENABLED: "false" });
  const result = await authorizeAdminRequest(new Request(
    "https://project-ref.supabase.co/functions/v1/admin-insights",
    {
      method: "OPTIONS",
      headers: {
        origin: "https://admin.example.test",
        "access-control-request-method": "GET",
        "access-control-request-headers":
          "authorization, apikey, x-client-info",
      },
    },
  ));
  assert.equal(result.response?.status, 204);
  assert.equal(
    result.response?.headers.get("access-control-allow-origin"),
    "https://admin.example.test",
  );
  assert.equal(result.response?.headers.get("cache-control"), "no-store");
});

test("disabled Admin GET fails before Auth is called", async () => {
  configure({ ADMIN_API_ENABLED: "false" });
  const originalFetch = globalThis.fetch;
  let fetchCalled = false;
  globalThis.fetch = async () => {
    fetchCalled = true;
    throw new Error("must not be called");
  };
  try {
    const result = await authorizeAdminRequest(adminRequest());
    assert.equal(result.response?.status, 503);
    assert.equal(fetchCalled, false);
    assert.equal(
      (await result.response?.json()).error.code,
      "admin_disabled",
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("aal2 token is checked through Auth user and then allowed by UUID", async () => {
  configure();
  const originalFetch = globalThis.fetch;
  const token = jwt();
  let calledUrl = "";
  globalThis.fetch = async (url, init) => {
    calledUrl = String(url);
    assert.equal(
      new Headers(init?.headers).get("authorization"),
      `Bearer ${token}`,
    );
    return new Response(JSON.stringify({ id: adminUserId }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };
  try {
    const request = adminRequest(token);
    const result = await authorizeAdminRequest(request);
    assert.equal(result.response, null);
    assert.equal(result.admin?.userId, adminUserId);
    assert.equal(
      calledUrl,
      "https://project-ref.supabase.co/auth/v1/user",
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("valid Auth user with aal1 still receives an MFA-required denial", async () => {
  configure();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ id: adminUserId }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  try {
    const result = await authorizeAdminRequest(adminRequest(jwt("aal1")));
    assert.equal(result.response?.status, 403);
    assert.equal(
      (await result.response?.json()).error.code,
      "mfa_required",
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("an authenticated aal2 user outside the UUID allowlist is denied", async () => {
  configure({
    ADMIN_ALLOWED_USER_IDS:
      "76d087e9-c7d7-47d0-83ee-ec9016e25295",
  });
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ id: adminUserId }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  try {
    const result = await authorizeAdminRequest(adminRequest());
    assert.equal(result.response?.status, 403);
    assert.equal(
      (await result.response?.json()).error.code,
      "admin_forbidden",
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
