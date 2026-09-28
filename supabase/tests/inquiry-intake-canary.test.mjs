import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const canaryWorkflowPath = ".github/workflows/inquiry-intake-canary.yml";

async function source(path) {
  return (await readFile(new URL(`../../${path}`, import.meta.url), "utf8"))
    .replace(/\r\n?/gu, "\n");
}

// Execute the actual workflow script with every curl call intercepted. This
// exercises bundle discovery, payload creation and rejection checks without
// accessing production or creating an inquiry.
async function runCanaryFixture(t, { newPrivacyNotice = false, responseKind = "safe" } = {}) {
  for (const command of ["bash", "jq"]) {
    const available = spawnSync(command, ["--version"], { encoding: "utf8" });
    if (available.error?.code === "ENOENT") {
      t.skip(`${command} is unavailable; CI must execute the workflow fixture`);
      return null;
    }
    assert.equal(available.status, 0, available.stderr);
  }

  const workflow = await source(canaryWorkflowPath);
  const scriptMatch = workflow.match(/        run: \|\n([\s\S]*)$/);
  assert.ok(scriptMatch, "the canary's shell script must be extractable");
  const directory = await mkdtemp(join(tmpdir(), "inquiry-canary-test-"));
  const fixturePath = join(directory, "curl-fixture.mjs");
  const requestsPath = join(directory, "requests.jsonl");

  try {
    await writeFile(requestsPath, "");
    await writeFile(fixturePath, String.raw`
      import { appendFileSync, writeFileSync } from "node:fs";
      const args = process.argv.slice(2);
      const argument = (name) => args[args.indexOf(name) + 1];
      const url = args.at(-1);
      const origin = process.env.SITE_ORIGIN;
      const endpoint = "https://canaryfixture.supabase.co/functions/v1/v1-inquiries";
      let output;
      if (args.includes("--request")) {
        if (url !== endpoint) throw new Error("Unexpected endpoint: " + url);
        const body = JSON.parse(argument("--data"));
        appendFileSync(process.env.CANARY_REQUESTS, JSON.stringify(body) + "\n");
        const fieldErrors = { contact: "required", antiAbuse: "required" };
        if (body.entryPath === "destination_timing") fieldErrors.journey = "required";
        const kind = process.env.CANARY_RESPONSE_KIND;
        if (kind === "unsupported-privacy") fieldErrors.privacyNoticeVersion = "unsupported";
        if (kind === "missing-contact-error") delete fieldErrors.contact;
        if (kind === "missing-anti-abuse-error") delete fieldErrors.antiAbuse;
        output = JSON.stringify({ error: {
          code: "validation_failed",
          persistenceState: kind === "persisted" ? "persisted" : "not_persisted",
          fieldErrors,
        } });
        writeFileSync(argument("--output"), output);
        process.stdout.write(kind === "accepted" ? "200" : "422");
        process.exit(0);
      }
      if (url === origin + "/") {
        output = '<script src="/_next/static/chunks/canary-fixture.js"></script>';
      } else if (url === origin + "/_next/static/chunks/canary-fixture.js") {
        output = JSON.stringify([
          endpoint, "2026-07-21.1", "2026-07-26.1", "2099-01-01.1",
          ...(process.env.CANARY_NEW_PRIVACY === "true" ? ["2026-09-28.1"] : []),
        ]);
      } else {
        throw new Error("Unexpected download: " + url);
      }
      if (args.includes("--output")) writeFileSync(argument("--output"), output);
      else process.stdout.write(output);
    `);

    const result = spawnSync("bash", ["-c", `
      curl() { "$CANARY_NODE" "$CANARY_CURL_FIXTURE" "$@"; }
      # GitHub's Linux UUID source is replaced for portable, deterministic tests.
      cat() {
        if [[ "$1" == "/proc/sys/kernel/random/uuid" ]]; then
          printf '%s\\n' '00000000-0000-4000-8000-000000000001'
        else
          command cat "$@"
        fi
      }
      ${scriptMatch[1].replace(/^ {10}/gm, "")}
    `], {
      encoding: "utf8",
      timeout: 15_000,
      env: {
        ...process.env,
        SITE_ORIGIN: "https://canary.invalid",
        CANARY_NODE: process.execPath,
        CANARY_CURL_FIXTURE: fixturePath,
        CANARY_REQUESTS: requestsPath,
        CANARY_NEW_PRIVACY: String(newPrivacyNotice),
        CANARY_RESPONSE_KIND: responseKind,
      },
    });
    assert.ifError(result.error);
    const requests = (await readFile(requestsPath, "utf8"))
      .trim().split("\n").filter(Boolean).map((line) => JSON.parse(line));
    return { ...result, requests };
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

test("the intake canary selects privacy from the live bundle without changing form versions", async (t) => {
  for (const newPrivacyNotice of [false, true]) {
    await t.test(newPrivacyNotice ? "updated live notice" : "old live notice fallback", async (t) => {
      const result = await runCanaryFixture(t, { newPrivacyNotice });
      if (!result) return;
      assert.equal(result.status, 0, result.stdout + result.stderr);
      assert.equal(result.requests.length, 6, "both surfaces must be probed in all three locales");
      for (const body of result.requests) {
        const destination = body.entryPath === "destination_timing";
        const formVersion = destination ? "2026-07-21.1" : "2026-07-26.1";
        assert.equal(body.schemaVersion, destination ? 2 : 3);
        assert.equal(body.formVersion, formVersion);
        assert.equal(body.privacyNoticeVersion, newPrivacyNotice ? "2026-09-28.1" : formVersion);
        for (const forbidden of ["journey", "contact", "antiAbuse", "contact_email"]) {
          assert.equal(Object.hasOwn(body, forbidden), false, `probe must omit ${forbidden}`);
        }
      }
    });
  }
});

test("the intake canary fails if the new notice or safe rejection is not supported", async (t) => {
  for (const responseKind of [
    "unsupported-privacy", "accepted", "persisted", "missing-contact-error", "missing-anti-abuse-error",
  ]) {
    await t.test(responseKind, async (t) => {
      const result = await runCanaryFixture(t, { newPrivacyNotice: true, responseKind });
      if (!result) return;
      assert.equal(result.status, 1, result.stdout + result.stderr);
      assert.equal(result.requests.length, 1, "an unsafe response must stop further probes");
      assert.match(result.stdout, /::error::/);
      if (responseKind === "unsupported-privacy") {
        assert.match(result.stdout, /Intake rejects fields[\s\S]*privacyNoticeVersion/);
      }
    });
  }
});

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
