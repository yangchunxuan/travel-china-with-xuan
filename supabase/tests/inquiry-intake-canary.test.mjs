import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import test from "node:test";

const canaryWorkflowPath = ".github/workflows/inquiry-intake-canary.yml";

async function source(path) {
  return (await readFile(new URL(`../../${path}`, import.meta.url), "utf8"))
    .replace(/\r\n?/gu, "\n");
}

/**
 * On 2026-07-23 the published site moved to form/privacy version 2026-07-25.1
 * while production still accepted only 2026-07-21.1. Every submission was
 * refused with 422 for two and a half days. Nothing detected it, because the
 * outbox monitor only watches notifications for enquiries that were saved —
 * and none were. These tests describe the check that closes that gap, so a
 * later edit cannot quietly remove the part that makes it a canary.
 */
test("the intake canary verifies both public contracts from the live site", async () => {
  const workflow = await source(canaryWorkflowPath);

  // Reading lib/inquiryVersions.ts would only prove the repo agrees with
  // itself. Each expected version has to be present in the deployed bundle.
  assert.doesNotMatch(
    workflow,
    /inquiryVersions|currentDestinationInquiryFormVersion/,
    "the canary must not take the version from the repository",
  );
  assert.match(
    workflow,
    /_next\/static\/chunks/,
    "the version has to come out of the deployed JavaScript",
  );
  assert.match(
    workflow,
    /destination_version="2026-07-21\.1"/,
    "the destination contract must be probed independently",
  );
  assert.match(
    workflow,
    /homepage_email_version="2026-07-26\.1"/,
    "the homepage email contract must be probed independently",
  );
  assert.doesNotMatch(
    workflow,
    /sort -V \| tail -1/,
    "the highest version cannot identify which schema it belongs to",
  );
  assert.match(
    workflow,
    /grep -oE 'https:\/\/\[a-z0-9\]\+\\\.supabase\\\.co\/functions\/v1\/v1-inquiries'/,
    "the endpoint must also come from the deployed site, so a site pointed at nothing fails too",
  );
});

test("the intake canary fails loudly on the exact outage it exists for", async () => {
  const workflow = await source(canaryWorkflowPath);

  assert.match(
    workflow,
    /error_code\}" != "validation_failed"/,
    "anything except the one safe validation response must fail",
  );
  assert.match(
    workflow,
    /::error::Intake is DOWN/,
    "a red run has to say what broke without anyone reading the log",
  );
  assert.match(
    workflow,
    /form\/privacy[\s\S]{0,100}allow-lists/,
    "the error must direct the operator to both version allow-lists",
  );

  // Every branch that concludes something is wrong has to end the run.
  const exits = workflow.match(/exit 1/g) ?? [];
  assert.ok(
    exits.length >= 5,
    `every failure branch must exit non-zero; found ${exits.length}`,
  );
});

test("neither intake canary probe can store an inquiry", async () => {
  const workflow = await source(canaryWorkflowPath);

  // Both probes omit contact and antiAbuse; the destination probe also omits
  // journey. If that changes the scheduled check could create production rows.
  assert.match(
    workflow,
    /schemaVersion: 2,[\s\S]*entryPath: "destination_timing"/,
    "the destination probe must stay deliberately incomplete",
  );
  assert.match(
    workflow,
    /schemaVersion: 3,[\s\S]*entryPath: "homepage_email"/,
    "the homepage email probe must stay deliberately incomplete",
  );
  const bodies = [...workflow.matchAll(/body="\$\(([\s\S]*?)\n\s*\)"/g)]
    .map((match) => match[1])
    .join("\n");
  assert.doesNotMatch(
    bodies,
    /\b(?:journey|contact|antiAbuse)\s*:|contact_email/,
    "the probes must never carry fields that could make them persistable",
  );
  assert.match(
    workflow,
    /fieldErrors\.journey == "required"[\s\S]*fieldErrors\.contact == "required"[\s\S]*fieldErrors\.antiAbuse == "required"/,
    "the destination probe must require every persistence-critical field",
  );
  assert.match(
    workflow,
    /fieldErrors\.contact == "required"[\s\S]*fieldErrors\.antiAbuse == "required"[\s\S]*fieldErrors\.journey \/\/ null\) == null/,
    "the homepage email probe must require contact and anti-abuse but no journey",
  );
});

test("the intake canary covers cached UTM payloads on every locale", async () => {
  const workflow = await source(canaryWorkflowPath);

  assert.match(workflow, /"en:\/" "zh:\/zh\/" "ko:\/ko\/"/);
  assert.match(workflow, /"destination" "homepage-email"/);
  assert.match(workflow, /utmSource: "canary"/);
  assert.match(workflow, /utmMedium: "scheduled_probe"/);
  assert.match(workflow, /utmCampaign: "utm-contract"/);
  assert.match(
    workflow,
    /startswith\("attribution\."\)/,
    "a UTM contract error must fail even when the endpoint returns validation_failed",
  );
  assert.match(workflow, /persistence_state\}" != "not_persisted"/);
});

test("the intake canary jq filter returns contract field names", async (t) => {
  const workflow = await source(canaryWorkflowPath);
  const filterMatch = workflow.match(
    /contract_errors="\$\(\s*jq -r '([\s\S]*?)'\s*"\$\{response_file\}"/,
  );
  assert.ok(filterMatch, "the contract-error jq filter must be extractable");

  const result = spawnSync("jq", ["-r", filterMatch[1]], {
    encoding: "utf8",
    input: JSON.stringify({
      error: {
        fieldErrors: {
          journey: "required",
          formVersion: "unsupported",
          "attribution.utmSource": "unknown",
        },
      },
    }),
  });

  if (result.error?.code === "ENOENT") {
    t.skip("jq is not installed in this Windows environment; CI must execute this assertion");
    return;
  }

  assert.equal(result.status, 0, result.stderr);
  assert.equal(
    result.stdout.trim(),
    "attribution.utmSource,formVersion",
  );
});

test("the intake canary distinguishes a broken site from broken intake", async () => {
  const workflow = await source(canaryWorkflowPath);

  // An alert that cannot tell "the site is down" from "submissions are
  // refused" gets ignored, which is the same as having no alert.
  assert.match(workflow, /did not serve its home page/);
  assert.match(workflow, /may be unreachable; intake was not \\\n {10}tested/);
  assert.match(
    workflow,
    /fetched=\$\(\(fetched \+ 1\)\)/,
    "a single timed-out chunk must not be reported as an outage",
  );
});

test("the intake canary runs on a schedule and needs no credentials", async () => {
  const workflow = await source(canaryWorkflowPath);

  assert.match(workflow, /cron: "7,22,37,52 \* \* \* \*"/);
  assert.match(workflow, /workflow_dispatch:/, "it must be runnable by hand after a deploy");
  assert.match(workflow, /permissions:\s*\n\s*contents: read/);

  // Everything it reads is already public in the deployed page. Keeping it
  // credential-free means it still runs when secrets rotate, and it can never
  // be the thing that leaks one.
  assert.doesNotMatch(
    workflow,
    /secrets\.|SERVICE_ROLE|MONITOR_SECRET|SUPABASE_SECRET/,
    "the canary must not require or reference any secret",
  );
});
