import assert from "node:assert/strict";
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
    /unsupported_form_version/,
    "the rejection code that ran for two and a half days must be asserted by name",
  );
  assert.match(
    workflow,
    /::error::Intake is DOWN/,
    "a red run has to say what broke without anyone reading the log",
  );
  assert.match(
    workflow,
    /ALLOWED_FORM_VERSIONS[\s\S]{0,200}ALLOWED_PRIVACY_NOTICE_VERSIONS/,
    "the error must name both allow-lists, because the versions are paired",
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

  // The probe omits journey, contact, attribution and antiAbuse, so a healthy
  // endpoint rejects it before persistence. If that ever stops being true the
  // check would be writing a row into production every fifteen minutes.
  assert.match(
    workflow,
    /schemaVersion: 2,\s*\n\s*formVersion: \$v,\s*\n\s*privacyNoticeVersion: \$v,\s*\n\s*locale: "en"/,
    "the probe payload must stay deliberately incomplete",
  );
  assert.doesNotMatch(
    workflow,
    /"journey"|"contact"|"antiAbuse"|contact_email/,
    "the probe must never carry the fields that would make it persistable",
  );
  assert.match(
    workflow,
    /if \[\[ -z "\$\{error_code\}" \]\]; then[\s\S]{0,400}exit 1/,
    "an accepted probe means it may have stored a row, and must fail the run",
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
