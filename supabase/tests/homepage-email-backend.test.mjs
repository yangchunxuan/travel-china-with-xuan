import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const repositoryRoot = new URL("../../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, repositoryRoot), "utf8");
}

test("homepage email has a dedicated private persistence path with no traveller facts", async () => {
  const [migration, endpoint] = await Promise.all([
    source(
      "supabase/migrations/202607270001_homeground_homepage_email.sql",
    ),
    source("supabase/functions/v1-inquiries/index.ts"),
  ]);

  assert.match(migration, /'homepage_email'/u);
  assert.match(
    migration,
    /create or replace function public\.create_homeground_homepage_email_v1\(/u,
  );
  assert.match(
    migration,
    /result := public\.create_homeground_inquiry\(/u,
    "email-only contact must inherit the existing atomic inquiry, rate-limit, idempotency and outbox transaction",
  );
  assert.match(
    migration,
    /jsonb_build_object\('informationStatus', 'not_provided'\)/u,
  );
  assert.match(
    migration,
    /entry_path = 'homepage_email'/u,
  );
  assert.match(
    migration,
    /revoke all on function public\.create_homeground_homepage_email_v1\([\s\S]+from public, anon, authenticated;/u,
  );
  assert.match(
    migration,
    /grant execute on function public\.create_homeground_homepage_email_v1\([\s\S]+to service_role;/u,
  );

  const branchStart = endpoint.indexOf(
    "if (payload.schemaVersion === homepageEmailInquirySchemaVersion)",
  );
  const branchEnd = endpoint.indexOf("} else {", branchStart);
  assert.ok(branchStart >= 0 && branchEnd > branchStart);
  const homepageBranch = endpoint.slice(branchStart, branchEnd);
  assert.match(
    homepageBranch,
    /"create_homeground_homepage_email_v1"/u,
  );
  assert.match(
    homepageBranch,
    /p_contact_email:\s*payload\.contact\.email/u,
  );
  assert.match(homepageBranch, /p_attribution:\s*\{\}/u);
  for (const forbidden of [
    /payload\.journey/u,
    /payload\.routeSnapshot/u,
    /payload\.note/u,
    /payload\.departureCountry/u,
    /payload\.roughBudgetPerPerson/u,
    /payload\.contact\.phone/u,
    /utmSource|utmMedium|utmCampaign/u,
  ]) {
    assert.doesNotMatch(homepageBranch, forbidden);
  }
});

test("homepage email reports success only after persistence returns a saved reference", async () => {
  const [endpoint, quickContact] = await Promise.all([
    source("supabase/functions/v1-inquiries/index.ts"),
    source("components/HomepageQuickContact.tsx"),
  ]);

  assert.match(
    endpoint,
    /if \(!persistenceResult\.ok \|\| !persistenceResult\.data\) \{[\s\S]{0,300}"persistence_unavailable"/u,
  );
  assert.match(
    endpoint,
    /if \(!result\.inquiryId \|\| !result\.publicReference \|\| !result\.receivedAt\) \{[\s\S]{0,300}"persistence_unavailable"/u,
  );
  assert.match(
    endpoint,
    /result\.outcome === "created" \? 201 : 200,[\s\S]{0,180}publicReference: result\.publicReference,[\s\S]{0,100}state: "submitted"/u,
  );
  assert.match(
    quickContact,
    /NEXT_PUBLIC_HOMEGROUND_HOMEPAGE_EMAIL_ENABLED === "true"[\s\S]{0,220}NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED === "true"/u,
    "the homepage email-only path must have an independent fail-closed release gate",
  );
  assert.match(
    quickContact,
    /success\?\.state === "submitted"[\s\S]{0,180}typeof success\.publicReference === "string"[\s\S]{0,220}setStatus\("success"\)/u,
  );
  assert.match(
    quickContact,
    /setStatus\("uncertain"\);\s*setError\(contactCopy\.uncertain\);\s*setShowRetry\(true\);\s*return;/u,
    "a 2xx response without the saved-submission envelope must not become success",
  );
});

test("homepage email notifications cannot silently acquire itinerary fields", async () => {
  const [worker, health] = await Promise.all([
    source("supabase/functions/notify-inquiries/index.ts"),
    source("supabase/functions/admin-health/index.ts"),
  ]);

  const branchStart = worker.indexOf(
    'if (job.route_id === "homepage-email")',
  );
  const branchEnd = worker.indexOf("} else {", branchStart);
  assert.ok(branchStart >= 0 && branchEnd > branchStart);
  const homepageBranch = worker.slice(branchStart, branchEnd);
  assert.match(homepageBranch, /job\.reply_channel !== "email"/u);
  assert.match(homepageBranch, /job\.departure_country !== null/u);
  assert.match(homepageBranch, /job\.rough_budget_per_person !== null/u);
  assert.match(homepageBranch, /job\.note !== null/u);
  assert.match(homepageBranch, /No itinerary[\s\S]+details were collected\./u);
  assert.doesNotMatch(homepageBranch, /routeSummary\(|routeAnswers\(/u);

  assert.match(
    health,
    /new Set\(\[\s*"2026-07-21\.1",\s*"2026-07-26\.1",?\s*\]\)/u,
  );
});
