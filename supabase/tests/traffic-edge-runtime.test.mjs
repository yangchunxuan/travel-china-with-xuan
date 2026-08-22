import assert from "node:assert/strict";
import test from "node:test";
import {
  trafficEventBatchRequestType,
  trafficEventsContractVersion,
  trafficEventsNoticeVersion,
  trafficSessionStartRequestType,
} from "../functions/_shared/traffic-contracts.ts";

const endpointUrl =
  "https://project.supabase.co/functions/v1/v1-traffic-events";
const publicOrigin = "https://homegroundchina.com";
const adminUserId = "4dc94f12-a9e8-46bf-b7ad-925ffc768d3d";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function request(body, headers = {}) {
  return new Request(endpointUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: publicOrigin,
      "X-Forwarded-For": "203.0.113.42",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

function validSessionStart() {
  return {
    requestType: trafficSessionStartRequestType,
    contractVersion: trafficEventsContractVersion,
    noticeVersion: trafficEventsNoticeVersion,
    sessionToken: "00fe38bc-91a2-4e5e-8c13-32a49abfa095",
    locale: "en",
    entryPath: "/guides/",
    attribution: {
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
    },
    attributionSignature: null,
  };
}

function validEventBatch(sessionCredential) {
  const start = validSessionStart();
  return {
    requestType: trafficEventBatchRequestType,
    contractVersion: start.contractVersion,
    noticeVersion: start.noticeVersion,
    sessionToken: start.sessionToken,
    sessionCredential,
    locale: start.locale,
    entryPath: start.entryPath,
    attribution: start.attribution,
    attributionSignature: start.attributionSignature,
    events: [
      {
        eventId: "286f3e1f-b988-4d20-b4aa-af47dde79708",
        type: "page_view",
        pagePath: "/guides/",
        actionCode: null,
      },
    ],
  };
}

function rpcName(input) {
  const pathname = new URL(String(input)).pathname;
  return decodeURIComponent(pathname.slice(pathname.lastIndexOf("/") + 1));
}

function base64Url(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function unsignedAdminTestToken(nowInSeconds) {
  return [
    base64Url({ alg: "none", typ: "JWT" }),
    base64Url({
      sub: adminUserId,
      iss: "https://project.supabase.co/auth/v1",
      aud: "authenticated",
      iat: nowInSeconds - 30,
      exp: nowInSeconds + 900,
      aal: "aal2",
    }),
    "unit-test-signature",
  ].join(".");
}

test("traffic Edge runtime enforces bootstrap limits and preserves event idempotency", async (t) => {
  const originalDeno = globalThis.Deno;
  const originalFetch = globalThis.fetch;
  const originalWarn = console.warn;
  const env = new Map([
    ["ALLOWED_ORIGINS", publicOrigin],
    ["TRAFFIC_EVENTS_ENABLED", "true"],
    ["SUPABASE_URL", "https://project.supabase.co"],
    ["SUPABASE_SECRET_KEYS", JSON.stringify({ default: "server-test-key" })],
    ["TRAFFIC_SESSION_HASH_SECRET", "session-hash-secret-000000000000000001"],
    ["TRAFFIC_RATE_LIMIT_HASH_SECRET", "rate-limit-secret-000000000000000002"],
    ["TRAFFIC_SESSION_CREDENTIAL_SECRET", "credential-secret-000000000000000003"],
    ["TRAFFIC_ATTRIBUTION_LINK_SIGNING_SECRET", "attribution-secret-00000000000000004"],
    ["TRAFFIC_SESSION_CREDENTIAL_TTL_SECONDS", "1800"],
  ]);
  let capturedHandler;
  const warnings = [];
  const rpcCalls = [];
  const rpcReplies = [];

  globalThis.Deno = {
    env: { get: (name) => env.get(name) },
    serve: (handler) => {
      capturedHandler = handler;
    },
  };
  console.warn = (value) => warnings.push(String(value));
  globalThis.fetch = async (input, init) => {
    const name = rpcName(input);
    const argumentsObject = JSON.parse(String(init?.body ?? "{}"));
    rpcCalls.push({ name, argumentsObject });
    const next = rpcReplies.shift();
    assert.ok(next, `unexpected RPC call: ${name}`);
    assert.equal(next.name, name);
    return jsonResponse(next.body, next.status ?? 200);
  };

  try {
    await import(
      new URL(
        `../functions/v1-traffic-events/index.ts?runtime=${Date.now()}`,
        import.meta.url,
      )
    );
    assert.equal(typeof capturedHandler, "function");

    await t.test("pre-parse operational failures use the unknown request type", async () => {
      env.set("TRAFFIC_EVENTS_ENABLED", "false");
      try {
        const response = await capturedHandler(request(validSessionStart()));
        const body = await response.json();
        assert.equal(response.status, 503);
        assert.equal(body.error.code, "collection_paused");
        assert.equal(rpcCalls.length, 0);
        assert.equal(
          JSON.parse(warnings.at(-1)).requestType,
          "unknown",
        );
      } finally {
        env.set("TRAFFIC_EVENTS_ENABLED", "true");
      }
    });

    await t.test("CORS never substitutes for the application rate limit", async () => {
      rpcReplies.push({
        name: "consume_homeground_traffic_session_start_rate_limit_v1",
        body: { outcome: "rate_limited", retryAfter: 900_000 },
      });
      const response = await capturedHandler(request(validSessionStart()));
      const body = await response.json();

      assert.equal(response.status, 429);
      assert.equal(response.headers.get("Retry-After"), "86400");
      assert.equal(body.error.retryAfter, 86_400);
      assert.equal("sessionCredential" in body, false);
      assert.equal(rpcCalls.at(-1).name, "consume_homeground_traffic_session_start_rate_limit_v1");
      assert.equal(
        JSON.stringify(rpcCalls.at(-1).argumentsObject).includes("203.0.113.42"),
        false,
        "the database call receives only secret-keyed subject hashes",
      );
      assert.equal(
        JSON.stringify(rpcCalls.at(-1).argumentsObject).includes(
          validSessionStart().sessionToken,
        ),
        false,
      );
      assert.deepEqual(
        {
          ipShort:
            rpcCalls.at(-1).argumentsObject.p_ip_short_rate_limit,
          ipDaily:
            rpcCalls.at(-1).argumentsObject.p_ip_daily_rate_limit,
          globalShort:
            rpcCalls.at(-1).argumentsObject.p_global_short_rate_limit,
          globalDaily:
            rpcCalls.at(-1).argumentsObject.p_global_daily_rate_limit,
        },
        { ipShort: 30, ipDaily: 120, globalShort: 200, globalDaily: 2_000 },
        "runtime defaults must match the checked-in operations contract",
      );
    });

    let credential;
    await t.test("an allowed bootstrap receives a short-lived credential", async () => {
      rpcReplies.push({
        name: "consume_homeground_traffic_session_start_rate_limit_v1",
        body: { outcome: "allowed", retryAfter: 0 },
      });
      const response = await capturedHandler(request(validSessionStart()));
      const body = await response.json();

      assert.equal(response.status, 201);
      assert.equal(body.state, "session_ready");
      assert.match(body.sessionCredential, /^v1\.\d+\.[0-9a-f]{64}$/u);
      assert.ok(Date.parse(body.expiresAt) > Date.now());
      credential = body.sessionCredential;
    });

    await t.test("the same event id is safe to replay", async () => {
      const batch = validEventBatch(credential);
      rpcReplies.push(
        {
          name: "record_homeground_traffic_events_v1",
          body: { outcome: "created", acceptedCount: 1, replayedCount: 0 },
        },
        {
          name: "record_homeground_traffic_events_v1",
          body: { outcome: "replay", acceptedCount: 0, replayedCount: 1 },
        },
      );
      const firstResponse = await capturedHandler(request(batch));
      const replayResponse = await capturedHandler(request(batch));
      const first = await firstResponse.json();
      const replay = await replayResponse.json();

      assert.equal(firstResponse.status, 202);
      assert.equal(first.duplicate, false);
      assert.equal(replayResponse.status, 200);
      assert.equal(replay.duplicate, true);
      const eventCalls = rpcCalls.filter(
        (call) => call.name === "record_homeground_traffic_events_v1",
      );
      assert.equal(eventCalls.length, 2);
      assert.deepEqual(
        eventCalls[0].argumentsObject.p_events,
        eventCalls[1].argumentsObject.p_events,
      );
    });

    await t.test("401 rejects a bad credential without persistence", async () => {
      const before = rpcCalls.length;
      const invalidCredential = `${credential.slice(0, -1)}${
        credential.endsWith("0") ? "1" : "0"
      }`;
      const response = await capturedHandler(
        request(validEventBatch(invalidCredential)),
      );
      const body = await response.json();

      assert.equal(response.status, 401);
      assert.equal(body.error.code, "invalid_session_credential");
      assert.equal(body.error.retryable, false);
      assert.equal(rpcCalls.length, before);
    });

    await t.test("429 and 503 remain bounded and observable", async () => {
      rpcReplies.push({
        name: "record_homeground_traffic_events_v1",
        body: { outcome: "rate_limited", retryAfter: 7.2 },
      });
      let response = await capturedHandler(
        request(validEventBatch(credential)),
      );
      let body = await response.json();
      assert.equal(response.status, 429);
      assert.equal(response.headers.get("Retry-After"), "8");
      assert.equal(body.error.retryAfter, 8);

      rpcReplies.push({
        name: "consume_homeground_traffic_session_start_rate_limit_v1",
        body: { ignored: true },
        status: 503,
      });
      response = await capturedHandler(request(validSessionStart()));
      body = await response.json();
      assert.equal(response.status, 503);
      assert.equal(body.error.code, "persistence_unavailable");
      assert.equal(body.error.retryable, true);

      const operationalWarnings = warnings.map((entry) => JSON.parse(entry));
      assert.ok(operationalWarnings.some((entry) => entry.status === 401));
      assert.ok(operationalWarnings.some((entry) =>
        entry.status === 429 &&
        entry.requestType === trafficSessionStartRequestType
      ));
      assert.ok(operationalWarnings.some((entry) =>
        entry.status === 429 &&
        entry.requestType === trafficEventBatchRequestType
      ));
      assert.ok(operationalWarnings.some((entry) =>
        entry.status === 503 &&
        entry.requestType === trafficSessionStartRequestType
      ));
      assert.ok(operationalWarnings.some((entry) =>
        entry.status === 401 &&
        entry.requestType === trafficEventBatchRequestType
      ));
      for (const entry of operationalWarnings) {
        assert.deepEqual(
          Object.keys(entry).sort(),
          ["code", "event", "requestId", "requestType", "status"],
        );
        assert.ok(
          [
            "unknown",
            trafficSessionStartRequestType,
            trafficEventBatchRequestType,
          ].includes(
            entry.requestType,
          ),
        );
      }
      assert.equal(warnings.join("\n").includes("203.0.113.42"), false);
      assert.equal(warnings.join("\n").includes(validSessionStart().sessionToken), false);
    });

    assert.equal(rpcReplies.length, 0);
  } finally {
    globalThis.Deno = originalDeno;
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
  }
});

test("admin traffic has a second fail-closed runtime kill switch", async () => {
  const originalDeno = globalThis.Deno;
  const originalFetch = globalThis.fetch;
  const originalWarn = console.warn;
  const nowInSeconds = Math.floor(Date.now() / 1_000);
  const publishableKey = "sb_publishable_runtime_test";
  const env = new Map([
    ["ADMIN_ALLOWED_ORIGIN", publicOrigin],
    ["ADMIN_API_ENABLED", "true"],
    ["ADMIN_TRAFFIC_API_ENABLED", "false"],
    ["ADMIN_ALLOWED_USER_IDS", adminUserId],
    ["ADMIN_MAX_TOKEN_LIFETIME_SECONDS", "3600"],
    ["SUPABASE_URL", "https://project.supabase.co"],
    ["SUPABASE_PUBLISHABLE_KEYS", JSON.stringify({ default: publishableKey })],
    ["SUPABASE_SECRET_KEYS", JSON.stringify({ default: "server-test-key" })],
  ]);
  let capturedHandler;
  const calls = [];
  const warnings = [];

  globalThis.Deno = {
    env: { get: (name) => env.get(name) },
    serve: (handler) => {
      capturedHandler = handler;
    },
  };
  console.warn = (value) => warnings.push(String(value));
  globalThis.fetch = async (input) => {
    const url = String(input);
    calls.push(url);
    if (url.endsWith("/auth/v1/user")) {
      return jsonResponse({ id: adminUserId });
    }
    assert.fail(`kill switch allowed an unexpected backend call: ${url}`);
  };

  try {
    await import(
      new URL(
        `../functions/admin-traffic/index.ts?runtime=${Date.now()}`,
        import.meta.url,
      )
    );
    assert.equal(typeof capturedHandler, "function");
    const response = await capturedHandler(
      new Request(
        "https://project.supabase.co/functions/v1/admin-traffic",
        {
          method: "GET",
          headers: {
            Origin: publicOrigin,
            apikey: publishableKey,
            Authorization: `Bearer ${unsignedAdminTestToken(nowInSeconds)}`,
          },
        },
      ),
    );
    const body = await response.json();

    assert.equal(response.status, 503);
    assert.equal(body.error.code, "traffic_disabled");
    assert.equal(calls.length, 1, "only Auth verification may run while traffic is off");
    assert.ok(calls[0].endsWith("/auth/v1/user"));
    assert.equal(
      warnings.length,
      0,
      "Admin handlers preserve the body-free audit path and do not console-log",
    );
  } finally {
    globalThis.Deno = originalDeno;
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
  }
});
