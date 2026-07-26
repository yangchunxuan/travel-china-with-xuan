import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import test from "node:test";

const canaryWorkflowPath = ".github/workflows/inquiry-intake-canary.yml";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

/**
 * On 2026-07-23 the published site moved to form/privacy version 2026-07-25.1
 * while production still accepted only 2026-07-21.1. Every submission was
 * refused with 422 for two and a half days. Nothing detected it, because the
 * outbox monitor only watches notifications for enquiries that were saved —
 * and none were. These tests describe the check that closes that gap, so a
 * later edit cannot quietly remove the part that makes it a canary.
 */
test("the intake canary reads the version from the live site, not the repo", async () => {
  const workflow = await source(canaryWorkflowPath);

  // Reading lib/inquiryVersions.ts would only prove the repo agrees with
  // itself. The failure being caught is a disagreement between what is
  // deployed to the site and what is deployed to the Edge Function.
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
    /sort -V \| tail -1/,
    "older supported versions ship alongside the current one; the highest is the submitted one",
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

test("the intake canary cannot store an inquiry", async () => {
  const workflow = await source(canaryWorkflowPath);
  const bodyStart = workflow.indexOf('body="$(');
  const bodyEnd = workflow.indexOf(
    'response_file="${workdir}/response-${locale}.json"',
    bodyStart,
  );
  const bodyBuilder = workflow.slice(bodyStart, bodyEnd);
  assert.ok(bodyStart >= 0 && bodyEnd > bodyStart);

  // The probe omits journey, contact and antiAbuse, so a healthy
  // endpoint rejects it before persistence. If that ever stops being true the
  // check would be writing a row into production every fifteen minutes.
  assert.match(
    workflow,
    /schemaVersion: 2,[\s\S]*formVersion: \$v,[\s\S]*privacyNoticeVersion: \$v,[\s\S]*entryPath: "destination_timing"/,
    "the probe payload must stay deliberately incomplete",
  );
  assert.doesNotMatch(
    bodyBuilder,
    /\b(?:journey|contact|antiAbuse)\s*:|contact_email/,
    "the probe must never carry the fields that would make it persistable",
  );
  assert.match(
    workflow,
    /fieldErrors\.journey == "required"[\s\S]*fieldErrors\.contact == "required"[\s\S]*fieldErrors\.antiAbuse == "required"/,
    "an accepted probe means it may have stored a row, and must fail the run",
  );
});

test("the intake canary covers cached UTM payloads on every locale", async () => {
  const workflow = await source(canaryWorkflowPath);

  assert.match(workflow, /"en:\/" "zh:\/zh\/" "ko:\/ko\/"/);
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

test("the intake canary jq filter returns contract field names", async () => {
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

  assert.match(workflow, /cron: "\*\/15 \* \* \* \*"/);
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
