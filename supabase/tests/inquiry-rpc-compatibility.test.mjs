import assert from "node:assert/strict";
import { createHmac, randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  computeCanonicalRouteSnapshot,
  currentRouteRuleVersion,
  destinationTimingRuleVersion,
} from "../../lib/inquiryContract.ts";

const publicOrigin = "https://homegroundchina.com";
const token = "00fe38bc-91a2-4e5e-8c13-32a49abfa095";
const trafficSecret = "test-only-traffic-session-secret";
const common = () => ({
  locale: "en",
  contact: { channel: "email", email: "traveller@example.com" },
  attribution: { landingPath: "/" },
  experiment: null,
  antiAbuse: { companyWebsite: "" },
});
function homepagePayload() {
  return {
    ...common(), schemaVersion: 3, formVersion: "2026-07-26.1",
    privacyNoticeVersion: "2026-07-26.1", entryPath: "homepage_email",
  };
}
function routePayload() {
  const answers = { party: "couple", travelStyle: "classic", nights: "14", pace: "balanced" };
  return {
    ...common(), schemaVersion: 1, formVersion: "2026-07-18.1",
    privacyNoticeVersion: "2026-07-19.1", entryPath: "generated_route", note: null,
    journey: {
      journeyId: randomUUID(), revision: 1, answers,
      routeId: computeCanonicalRouteSnapshot(answers).routeId,
      ruleVersion: currentRouteRuleVersion,
    },
  };
}
function destinationPayload(version) {
  return {
    ...common(), schemaVersion: 2, formVersion: version,
    privacyNoticeVersion: version, entryPath: "destination_timing", note: null,
    ...(version === "2026-07-19.1" ? {} : { departureCountry: "Canada" }),
    ...(["2026-07-20.2", "2026-07-21.1"].includes(version)
      ? { roughBudgetPerPerson: "USD 3,000" } : {}),
    journey: {
      journeyId: randomUUID(), revision: 1, routeId: "destination-timing",
      ruleVersion: destinationTimingRuleVersion,
      answers: {
        destinationMode: "wishlist", destinationIds: ["beijing-great-wall", "shanghai"],
        otherPlace: null, totalNights: 9, party: "two-adults", pace: "classic",
        mustSeeIds: [],
      },
    },
  };
}

const cases = [
  { name: "homepage", payload: homepagePayload, base: "create_homeground_homepage_email_v1", migration: "202609050001_homeground_private_tour_selection.sql", wrapper: "create_homeground_homepage_email_with_traffic_v1" },
  { name: "generated route", payload: routePayload, base: "create_homeground_inquiry", migration: "202607180001_homeground_inquiries.sql", wrapper: "create_homeground_inquiry_with_traffic_v1" },
  ...[
    ["2026-07-19.1", "create_homeground_destination_inquiry", "202607190002_homeground_destination_inquiries.sql"],
    ["2026-07-20.1", "create_homeground_destination_inquiry_v2", "202607200001_homeground_contact_intake.sql"],
    ["2026-07-20.2", "create_homeground_destination_inquiry_v3", "202607200002_homeground_budget_intake.sql"],
    ["2026-07-21.1", "create_homeground_destination_inquiry_v4", "202607210001_homeground_destination_intake_v4.sql"],
  ].map(([version, base, migration]) => ({
    name: `destination ${version}`, payload: () => destinationPayload(version),
    base, migration, wrapper: "create_homeground_destination_inquiry_with_traffic_v1",
  })),
];

async function sqlParameterKeys(file, name) {
  const sql = await readFile(new URL(`../migrations/${file}`, import.meta.url), "utf8");
  const signature = sql.match(new RegExp(`public\\.${name}\\(([\\s\\S]*?)\\)\\s*returns jsonb`, "u"))?.[1];
  assert.ok(signature, `missing SQL signature for ${name}`);
  return [...signature.matchAll(/\b(p_[a-z_0-9]+)\s+[a-z]/gu)].map((match) => match[1]).sort();
}

test("intake selects one compatible RPC before writing, independently of optional traffic configuration", async (t) => {
  const originalDeno = globalThis.Deno;
  const originalFetch = globalThis.fetch;
  const env = new Map([
    ["ALLOWED_ORIGINS", publicOrigin],
    ["ALLOWED_FORM_VERSIONS", "2026-07-18.1,2026-07-19.1,2026-07-20.1,2026-07-20.2,2026-07-21.1,2026-07-26.1"],
    ["ALLOWED_PRIVACY_NOTICE_VERSIONS", "2026-07-19.1,2026-07-20.1,2026-07-20.2,2026-07-21.1,2026-07-26.1"],
    ["SUPABASE_URL", "https://project.supabase.co"],
    ["SUPABASE_SECRET_KEYS", JSON.stringify({ default: "test-server-key" })],
    ["IDEMPOTENCY_HASH_SECRET", "idempotency-test-secret"],
    ["RATE_LIMIT_HASH_SECRET", "rate-limit-test-secret"],
  ]);
  let handler;
  let mode = "created";
  const calls = [];
  globalThis.Deno = { env: { get: (name) => env.get(name) }, serve: (value) => { handler = value; } };
  globalThis.fetch = async (url, init) => {
    assert.equal(new URL(String(url)).origin, "https://project.supabase.co");
    calls.push({ name: new URL(String(url)).pathname.split("/").at(-1), args: JSON.parse(init.body) });
    if (mode === "throw") throw new Error("Simulated connection loss after unknown persistence");
    const body = mode === "missing-result" ? { outcome: "created" } : {
      outcome: mode === "replay" ? "replay" : "created",
      inquiryId: "66c78072-5792-4573-9668-93c8e2e88c89", publicReference: "HG-TEST",
      receivedAt: "2026-09-05T00:00:00Z",
    };
    return new Response(JSON.stringify(body), {
      status: mode === "rpc-missing" ? 404 : 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  const send = (body) => handler(new Request("https://project.supabase.co/functions/v1/v1-inquiries", {
    method: "POST", headers: {
      "Content-Type": "application/json", Origin: publicOrigin,
      "Idempotency-Key": randomUUID(), "X-Forwarded-For": "203.0.113.42",
    }, body: JSON.stringify(body),
  }));
  try {
    await import(new URL(`../functions/v1-inquiries/index.ts?rpc-compatibility=${Date.now()}`, import.meta.url));
    for (const item of cases) {
      const baseKeys = await sqlParameterKeys(item.migration, item.base);
      const wrapperKeys = await sqlParameterKeys("202607310003_homeground_atomic_inquiry_attribution.sql", item.wrapper);
      for (const scenario of ["omitted", "null", "malformed", "missing-secret", "attributed"]) {
        await t.test(`${item.name}: ${scenario}`, async () => {
          env.set("TRAFFIC_SESSION_HASH_SECRET", trafficSecret);
          const input = item.payload();
          if (scenario === "null") input.trafficSessionToken = null;
          if (scenario === "malformed") input.trafficSessionToken = "invalid-token";
          if (scenario === "missing-secret" || scenario === "attributed") input.trafficSessionToken = token;
          if (scenario === "missing-secret") env.delete("TRAFFIC_SESSION_HASH_SECRET");
          const before = calls.length;
          const response = await send(input);
          assert.equal(response.status, 201, JSON.stringify(await response.json()));
          assert.equal(calls.length, before + 1);
          const call = calls.at(-1);
          const attributed = scenario === "attributed";
          assert.equal(call.name, attributed ? item.wrapper : item.base);
          assert.deepEqual(Object.keys(call.args).sort(), attributed ? wrapperKeys : baseKeys);
          if (attributed) {
            assert.equal(call.args.p_traffic_session_hash, createHmac("sha256", trafficSecret).update(token).digest("hex"));
          } else {
            assert.equal(Object.hasOwn(call.args, "p_traffic_session_hash"), false);
          }
          for (const [key, field] of [["p_departure_country", "departureCountry"], ["p_rough_budget_per_person", "roughBudgetPerPerson"]]) {
            if (Object.hasOwn(call.args, key)) assert.equal(call.args[key], input[field] ?? null);
          }
        });
      }
      for (const attributed of [false, true]) {
        for (const failure of ["rpc-missing", "throw", "missing-result"]) {
          await t.test(`${item.name}: ${attributed ? "wrapper" : "base"} ${failure} never falls back`, async () => {
            env.set("TRAFFIC_SESSION_HASH_SECRET", trafficSecret);
            mode = failure;
            const before = calls.length;
            const response = await send({ ...item.payload(), ...(attributed ? { trafficSessionToken: token } : {}) });
            const body = await response.json();
            assert.equal(response.status, 503);
            assert.equal(body.error.code, "persistence_unavailable");
            assert.equal(calls.length, before + 1);
            assert.equal(calls.at(-1).name, attributed ? item.wrapper : item.base);
            mode = "created";
          });
        }
      }
    }
  } finally {
    globalThis.Deno = originalDeno;
    globalThis.fetch = originalFetch;
  }
});
