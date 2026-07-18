import assert from "node:assert/strict";
import { once } from "node:events";
import { spawn } from "node:child_process";
import test from "node:test";
import {
  currentInquiryFormVersion,
  currentPrivacyNoticeVersion,
  inquirySchemaVersion,
} from "../../lib/inquiryVersions.ts";

const hostname = "127.0.0.1";
const port = 19_000 + Math.floor(Math.random() * 1_000);
const origin = "http://localhost:3000";
const endpoint = `http://${hostname}:${port}/v1/inquiries`;
const idempotencyKey = "38cfb926-9c7e-4f64-8e86-b9d47b655197";

function payload(note = "A test note") {
  return {
    schemaVersion: inquirySchemaVersion,
    formVersion: currentInquiryFormVersion,
    entryPath: "generated_route",
    locale: "en",
    journey: {
      journeyId: "6cf3c986-1713-4bc7-b3dd-2a1f5c00e995",
      revision: 1,
      answers: {
        party: "couple",
        travelStyle: "classic",
        nights: "14",
        pace: "balanced",
      },
      routeId: "classic-14-standard",
      ruleVersion: "2026-07-17.1",
    },
    contact: {
      channel: "email",
      email: "traveller@example.com",
    },
    note,
    privacyNoticeVersion: currentPrivacyNoticeVersion,
    attribution: {
      landingPath: "/",
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
    },
    experiment: null,
    antiAbuse: {
      companyWebsite: "",
    },
  };
}

async function waitUntilReady(child) {
  let output = "";
  child.stdout.setEncoding("utf8");
  child.stdout.on("data", (chunk) => {
    output += chunk;
  });
  const deadline = Date.now() + 5_000;
  while (!output.includes("Mock Inquiry API listening")) {
    if (child.exitCode !== null) {
      throw new Error(`Mock exited early with code ${child.exitCode}`);
    }
    if (Date.now() > deadline) throw new Error("Mock startup timed out.");
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
}

test("development mock enforces CORS and idempotent POST behavior", async (t) => {
  const child = spawn(
    process.execPath,
    ["--experimental-strip-types", "tools/mock-inquiry-api.mjs"],
    {
      cwd: new URL("../..", import.meta.url),
      env: {
        ...process.env,
        MOCK_INQUIRY_HOST: hostname,
        MOCK_INQUIRY_PORT: String(port),
        MOCK_INQUIRY_ALLOWED_ORIGINS: origin,
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  t.after(async () => {
    if (child.exitCode === null) {
      child.kill("SIGTERM");
      await once(child, "exit");
    }
  });
  await waitUntilReady(child);

  const preflight = await fetch(endpoint, {
    method: "OPTIONS",
    headers: {
      Origin: origin,
      "Access-Control-Request-Method": "POST",
      "Access-Control-Request-Headers": "content-type, idempotency-key",
    },
  });
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get("access-control-allow-origin"), origin);

  const first = await fetch(endpoint, {
    method: "POST",
    headers: {
      Origin: origin,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(payload()),
  });
  assert.equal(first.status, 201);
  const firstBody = await first.json();
  assert.equal(firstBody.duplicate, false);
  assert.match(firstBody.publicReference, /^HG-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/);

  const replay = await fetch(endpoint, {
    method: "POST",
    headers: {
      Origin: origin,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(payload()),
  });
  assert.equal(replay.status, 200);
  const replayBody = await replay.json();
  assert.equal(replayBody.duplicate, true);
  assert.equal(replayBody.inquiryId, firstBody.inquiryId);

  const conflict = await fetch(endpoint, {
    method: "POST",
    headers: {
      Origin: origin,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(payload("Changed after first request")),
  });
  assert.equal(conflict.status, 409);
  assert.equal((await conflict.json()).error.code, "idempotency_conflict");

  const forbidden = await fetch(endpoint, {
    method: "POST",
    headers: {
      Origin: "https://not-allowed.example",
      "Content-Type": "application/json",
      "Idempotency-Key": "8919f5b2-0f4a-4c19-9606-f04a2c51a91a",
    },
    body: JSON.stringify(payload()),
  });
  assert.equal(forbidden.status, 403);
  assert.equal(forbidden.headers.get("access-control-allow-origin"), null);
});
