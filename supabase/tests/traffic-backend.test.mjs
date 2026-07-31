import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  trafficEventBatchRequestType,
  trafficEventsContractVersion,
  trafficEventsNoticeVersion,
  trafficSessionStartRequestType,
  validateAndNormalizeTrafficEventBatch,
  validateAndNormalizeTrafficSessionStart,
} from "../functions/_shared/traffic-contracts.ts";

const repositoryRoot = new URL("../../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, repositoryRoot), "utf8");
}

function validBatch() {
  return {
    requestType: trafficEventBatchRequestType,
    contractVersion: trafficEventsContractVersion,
    noticeVersion: trafficEventsNoticeVersion,
    sessionToken: "00fe38bc-91a2-4e5e-8c13-32a49abfa095",
    sessionCredential:
      "v1.9999999999.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    locale: "en",
    entryPath: "/guides/beijing-zhangjiajie-shanghai-10-days/",
    attribution: {
      utmSource: "facebook",
      utmMedium: "social",
      utmCampaign: "beijing_route_2026",
      utmContent: null,
    },
    attributionSignature:
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    events: [
      {
        eventId: "286f3e1f-b988-4d20-b4aa-af47dde79708",
        type: "page_view",
        pagePath: "/guides/beijing-zhangjiajie-shanghai-10-days/",
        actionCode: null,
      },
      {
        eventId: "37f2f676-9afc-474d-a025-2aa8518c6b1c",
        type: "contact_channel_clicked",
        pagePath: "/",
        actionCode: "whatsapp",
      },
    ],
  };
}

function validSessionStart() {
  const batch = validBatch();
  return {
    requestType: trafficSessionStartRequestType,
    contractVersion: batch.contractVersion,
    noticeVersion: batch.noticeVersion,
    sessionToken: batch.sessionToken,
    locale: batch.locale,
    entryPath: batch.entryPath,
    attribution: batch.attribution,
    attributionSignature: batch.attributionSignature,
  };
}

test("session bootstrap contract accepts only controlled, signed-link inputs", () => {
  let result = validateAndNormalizeTrafficSessionStart(
    validSessionStart(),
  );
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.value.requestType, "start_session");
    assert.match(
      result.value.attributionSignature ?? "",
      /^[0-9a-f]{64}$/u,
    );
  }

  const arbitrary = validSessionStart();
  arbitrary.attributionSignature = "visitor-chosen-label";
  result = validateAndNormalizeTrafficSessionStart(arbitrary);
  assert.equal(result.ok, false);
});

test("traffic contract keeps only bounded product events and controlled attribution", () => {
  const result = validateAndNormalizeTrafficEventBatch(validBatch());
  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.deepEqual(result.value.attribution, {
    utmSource: "facebook",
    utmMedium: "social",
    utmCampaign: "beijing_route_2026",
    utmContent: null,
  });
  assert.deepEqual(Object.keys(result.value.events[0]).sort(), [
    "actionCode",
    "eventId",
    "pagePath",
    "type",
  ]);
  assert.equal(result.value.events[1].actionCode, "whatsapp");
  assert.equal(
    JSON.stringify(result.value).includes("Traveller@Example.com"),
    false,
  );
});

test("controlled campaign codes normalize while malformed values become Unknown before signature verification", () => {
  const payload = validBatch();
  payload.attribution.utmSource = "New_Network.2026";
  payload.attribution.utmCampaign = "someone@example.com";
  payload.attribution.utmContent = "post/with/query?customer=1";

  const result = validateAndNormalizeTrafficEventBatch(payload);
  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.equal(result.value.attribution.utmSource, "new_network.2026");
  assert.equal(result.value.attribution.utmCampaign, null);
  assert.equal(result.value.attribution.utmContent, null);
});

test("traffic contract rejects arbitrary keys, query strings and invalid event semantics", () => {
  const withFreeText = validBatch();
  withFreeText.events[0].customerNote = "Call this person";
  let result = validateAndNormalizeTrafficEventBatch(withFreeText);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.fieldErrors["events.0.customerNote"], "unexpected");
  }

  const withQuery = validBatch();
  withQuery.events[0].pagePath = "/?utm_source=facebook";
  result = validateAndNormalizeTrafficEventBatch(withQuery);
  assert.equal(result.ok, false);

  const wrongAction = validBatch();
  wrongAction.events[0].actionCode = "email";
  result = validateAndNormalizeTrafficEventBatch(wrongAction);
  assert.equal(result.ok, false);

  const duplicateId = validBatch();
  duplicateId.events[1].eventId = duplicateId.events[0].eventId;
  result = validateAndNormalizeTrafficEventBatch(duplicateId);
  assert.equal(result.ok, false);
});

test("traffic migration is private, idempotent and enforces thirty-day retention", async () => {
  const migration = await source(
    "supabase/migrations/202607310001_homeground_traffic_attribution.sql",
  );

  for (const table of [
    "traffic_sessions",
    "traffic_events",
    "traffic_rate_limit_buckets",
    "inquiry_traffic_attribution",
  ]) {
    assert.match(
      migration,
      new RegExp(
        `create table homeground_private\\.${table}\\b`,
        "u",
      ),
    );
    assert.match(
      migration,
      new RegExp(
        `alter table homeground_private\\.${table}[\\s\\S]{0,80}enable row level security;[\\s\\S]{0,100}alter table homeground_private\\.${table}[\\s\\S]{0,80}force row level security;`,
        "u",
      ),
    );
    assert.match(
      migration,
      new RegExp(
        `revoke all on table homeground_private\\.${table}[\\s\\S]{0,100}service_role;`,
        "u",
      ),
    );
  }

  assert.match(
    migration,
    /create or replace function public\.record_homeground_traffic_events_v1\(/u,
  );
  assert.match(
    migration,
    /create or replace function[\s\S]{0,80}public\.attach_homeground_inquiry_traffic_attribution_v1\(/u,
  );
  assert.match(
    migration,
    /grant execute on function public\.record_homeground_traffic_events_v1\([\s\S]+to service_role;/u,
  );
  assert.match(
    migration,
    /grant execute on function[\s\S]{0,100}public\.attach_homeground_inquiry_traffic_attribution_v1\(uuid, text\)[\s\S]{0,80}to service_role;/u,
  );
  assert.match(
    migration,
    /Event-ID locks are taken in stable order[\s\S]{0,450}pg_advisory_xact_lock/u,
  );
  assert.match(
    migration,
    /existing_event\.payload_hash <> \(candidate ->> 'payloadHash'\)[\s\S]{0,180}'idempotency_conflict'/u,
  );
  assert.match(
    migration,
    /new_event_count = 0[\s\S]{0,300}'outcome', 'replay'/u,
  );
  assert.match(
    migration,
    /received_at <= clock_timestamp\(\) - interval '30 days'/u,
  );
  assert.match(
    migration,
    /first_seen_at <= clock_timestamp\(\) - interval '30 days'/u,
  );
  assert.match(
    migration,
    /linked_at <= clock_timestamp\(\) - interval '30 days'/u,
  );
  assert.match(
    migration,
    /updated_at <= clock_timestamp\(\) - interval '24 hours'/u,
  );

  const eventTableStart = migration.indexOf(
    "create table homeground_private.traffic_events",
  );
  const eventTableEnd = migration.indexOf(
    "create index traffic_events_session_received_idx",
    eventTableStart,
  );
  const eventTable = migration.slice(eventTableStart, eventTableEnd);
  for (const forbiddenColumn of [
    /\braw_ip\s+text\b/u,
    /\bip_address\s+(?:text|inet)\b/u,
    /\buser_agent\s+text\b/u,
    /\breferrer\s+text\b/u,
    /\bemail\s+text\b/u,
    /\bphone\s+text\b/u,
    /\bnote\s+text\b/u,
    /\bfree_text\s+text\b/u,
  ]) {
    assert.doesNotMatch(eventTable, forbiddenColumn);
  }
});

test("public traffic endpoint is default-off, exact-origin and never persists raw browser tokens", async () => {
  const [endpoint, config] = await Promise.all([
    source("supabase/functions/v1-traffic-events/index.ts"),
    source("supabase/config.toml"),
  ]);

  assert.match(
    config,
    /\[functions\.v1-traffic-events\][\s\S]{0,220}verify_jwt = false/u,
  );
  assert.match(
    endpoint,
    /booleanEnv\("TRAFFIC_EVENTS_ENABLED", false\)/u,
  );
  assert.match(
    endpoint,
    /parsed\.origin !== value[\s\S]{0,240}origins\.add\(value\)/u,
  );
  assert.match(
    endpoint,
    /requiredEnv\("TRAFFIC_SESSION_HASH_SECRET"\)[\s\S]{0,100}payload\.sessionToken/u,
  );
  assert.match(
    endpoint,
    /TRAFFIC_RATE_LIMIT_HASH_SECRET[\s\S]{0,500}`ip:v1:\$\{requestIp\(request\)\}`/u,
  );
  assert.match(
    endpoint,
    /`session:v1:\$\{payload\.sessionToken\}`[\s\S]{0,220}"global:v1"/u,
  );
  assert.match(
    endpoint,
    /TRAFFIC_SESSION_CREDENTIAL_SECRET[\s\S]{0,900}constantTimeEqual/u,
  );
  assert.match(
    endpoint,
    /TRAFFIC_ATTRIBUTION_LINK_SIGNING_SECRET[\s\S]{0,500}constantTimeEqual/u,
  );
  assert.match(
    endpoint,
    /attributionHasLabels\(attribution\)[\s\S]{0,220}"unknown"/u,
  );
  assert.match(endpoint, /p_session_hash: sessionHash/u);
  assert.doesNotMatch(endpoint, /p_session_token/u);
  assert.doesNotMatch(endpoint, /request\.headers\.get\(["'](?:referer|user-agent)["']\)/u);
  assert.match(endpoint, /payloadHash: await sha256Hex/u);
});

test("traffic persistence counts new events across session, IP and whole-site limits", async () => {
  const [endpoint, migration] = await Promise.all([
    source("supabase/functions/v1-traffic-events/index.ts"),
    source(
      "supabase/migrations/202607310001_homeground_traffic_attribution.sql",
    ),
  ]);

  for (const name of [
    "TRAFFIC_SESSION_RATE_LIMIT_10_MINUTES",
    "TRAFFIC_SESSION_RATE_LIMIT_24_HOURS",
    "TRAFFIC_IP_RATE_LIMIT_10_MINUTES",
    "TRAFFIC_IP_RATE_LIMIT_24_HOURS",
    "TRAFFIC_GLOBAL_RATE_LIMIT_10_MINUTES",
    "TRAFFIC_GLOBAL_RATE_LIMIT_24_HOURS",
  ]) {
    assert.match(endpoint, new RegExp(name, "u"));
  }
  assert.match(
    migration,
    /p_event_count[\s\S]{0,900}request_count[\s\S]{0,120}\+ p_event_count/u,
  );
  assert.match(
    migration,
    /ip_rate_limit_result[\s\S]+session_rate_limit_result[\s\S]+global_rate_limit_result/u,
  );
  assert.match(
    migration,
    /consume_traffic_rate_limit\([\s\S]{0,220}new_event_count[\s\S]+consume_traffic_rate_limit\([\s\S]{0,220}new_event_count[\s\S]+consume_traffic_rate_limit\([\s\S]{0,220}new_event_count/u,
  );
});

test("deployment contract documents independent secrets and a managed campaign-link signer", async () => {
  const [endpoint, environment, signer, packageJson] =
    await Promise.all([
      source("supabase/functions/v1-traffic-events/index.ts"),
      source(".env.example"),
      source("tools/sign-traffic-link.mjs"),
      source("package.json"),
    ]);

  for (const name of [
    "TRAFFIC_SESSION_HASH_SECRET",
    "TRAFFIC_RATE_LIMIT_HASH_SECRET",
    "TRAFFIC_SESSION_CREDENTIAL_SECRET",
    "TRAFFIC_ATTRIBUTION_LINK_SIGNING_SECRET",
  ]) {
    assert.match(environment, new RegExp(`^${name}=`, "mu"));
  }
  assert.match(
    endpoint,
    /new Set\(values\)\.size !== values\.length/u,
  );
  assert.match(
    signer,
    /homeground-attribution-link\.v1[\s\S]{0,500}createHmac\("sha256", secret\)/u,
  );
  assert.match(signer, /url\.searchParams\.set\("hg_attribution_sig"/u);
  assert.match(packageJson, /"sign:traffic-link"/u);
});

test("link-preview bots cannot create events through a navigation request", async () => {
  const [endpoint, contract] = await Promise.all([
    source("supabase/functions/v1-traffic-events/index.ts"),
    source("supabase/functions/_shared/traffic-contracts.ts"),
  ]);

  assert.match(
    endpoint,
    /if \(request\.method !== "POST"\) \{[\s\S]{0,220}"method_not_allowed"/u,
  );
  assert.match(
    endpoint,
    /validateAndNormalizeTrafficEventBatch\(rawPayload\)/u,
  );
  assert.match(
    contract,
    /typeof input\.sessionCredential !== "string"[\s\S]{0,100}!sessionCredentialPattern\.test\(input\.sessionCredential\)/u,
  );
  assert.doesNotMatch(
    endpoint,
    /request\.headers\.get\(["'](?:referer|user-agent)["']\)/u,
    "preview suppression must not introduce raw referrer or user-agent collection",
  );
});

test("inquiry and attribution request use one RPC transaction", async () => {
  const [endpoint, migration] = await Promise.all([
    source("supabase/functions/v1-inquiries/index.ts"),
    source(
      "supabase/migrations/202607310003_homeground_atomic_inquiry_attribution.sql",
    ),
  ]);

  assert.match(
    endpoint,
    /delete payloadForValidation\.trafficSessionToken/u,
  );
  assert.match(
    endpoint,
    /A missing, stale or malformed browser token[\s\S]{0,180}trafficSessionToken:/u,
  );
  assert.match(
    endpoint,
    /requiredEnv\("TRAFFIC_SESSION_HASH_SECRET"\),[\s\S]{0,100}transportEnvelope\.trafficSessionToken/u,
  );
  assert.match(
    endpoint,
    /"create_homeground_homepage_email_with_traffic_v1"/u,
  );
  assert.match(
    endpoint,
    /"create_homeground_destination_inquiry_with_traffic_v1"/u,
  );
  assert.match(
    endpoint,
    /"create_homeground_inquiry_with_traffic_v1"/u,
  );
  assert.match(endpoint, /p_traffic_session_hash: trafficSessionHash/u);
  assert.doesNotMatch(
    endpoint,
    /callSupabaseRpc[\s\S]{0,120}"attach_homeground_inquiry_traffic_attribution_v1"/u,
  );

  for (const wrapper of [
    "create_homeground_homepage_email_with_traffic_v1",
    "create_homeground_destination_inquiry_with_traffic_v1",
    "create_homeground_inquiry_with_traffic_v1",
  ]) {
    const wrapperStart = migration.indexOf(
      `public.${wrapper}(`,
    );
    assert.ok(wrapperStart >= 0);
    const wrapperEnd = migration.indexOf("\n$$;", wrapperStart);
    const wrapperSql = migration.slice(wrapperStart, wrapperEnd);
    assert.match(
      wrapperSql,
      /enqueue_inquiry_traffic_attribution_v1/u,
    );
  }
  assert.match(
    migration,
    /insert into homeground_private\.inquiry_traffic_attribution_outbox[\s\S]{0,800}exception when others[\s\S]{0,500}last_result = 'internal_error'[\s\S]{0,180}'outcome', 'internal_error'/u,
    "the pending row must survive a snapshot-resolution failure",
  );
});

test("missing traffic session is durable pending work with bounded retry and health state", async () => {
  const migration = await source(
    "supabase/migrations/202607310003_homeground_atomic_inquiry_attribution.sql",
  );

  assert.match(
    migration,
    /create table homeground_private\.inquiry_traffic_attribution_outbox/u,
  );
  assert.match(
    migration,
    /requested_session_hash text[\s\S]{0,180}status text not null default 'pending'/u,
  );
  assert.doesNotMatch(
    migration.slice(
      migration.indexOf(
        "create table homeground_private.inquiry_traffic_attribution_outbox",
      ),
      migration.indexOf(
        "create index inquiry_traffic_attribution_outbox_claim_idx",
      ),
    ),
    /references homeground_private\.traffic_sessions/u,
  );
  assert.match(
    migration,
    /if not found then[\s\S]{0,700}last_result = 'waiting_for_session'[\s\S]{0,160}'outcome', 'pending'/u,
  );
  assert.match(
    migration,
    /process_pending_inquiry_traffic_attribution_v1/u,
  );
  assert.match(
    migration,
    /for update skip locked/u,
  );
  assert.match(
    migration,
    /homeground-resolve-inquiry-traffic-attribution[\s\S]{0,180}'\* \* \* \* \*'/u,
  );
  assert.match(
    migration,
    /get_homeground_traffic_attribution_health_v1/u,
  );
  for (const healthField of [
    "'pending'",
    "'overduePending'",
    "'attributed'",
    "'expired'",
    "'internalErrors'",
    "'conflictsObserved'",
  ]) {
    assert.match(migration, new RegExp(healthField, "u"));
  }
});

test("an inquiry cannot be rebound to a different traffic session", async () => {
  const migration = await source(
    "supabase/migrations/202607310003_homeground_atomic_inquiry_attribution.sql",
  );
  const enqueueStart = migration.indexOf(
    "homeground_private.enqueue_inquiry_traffic_attribution_v1(",
  );
  const enqueueEnd = migration.indexOf("\n$$;", enqueueStart);
  const enqueueSql = migration.slice(enqueueStart, enqueueEnd);

  assert.match(enqueueSql, /pg_advisory_xact_lock/u);
  assert.match(
    enqueueSql,
    /existing_job\.requested_session_hash <> p_session_hash[\s\S]{0,260}conflict_count = conflict_count \+ 1[\s\S]{0,220}'outcome', 'conflict'/u,
  );
  assert.match(
    enqueueSql,
    /existing_attribution\.session_hash is distinct from p_session_hash[\s\S]{0,900}'outcome', 'conflict'/u,
  );
  assert.doesNotMatch(
    enqueueSql,
    /update homeground_private\.inquiry_traffic_attribution[\s\S]{0,200}session_hash = p_session_hash/u,
  );
});

test("attribution retry state is private and session associations expire", async () => {
  const migration = await source(
    "supabase/migrations/202607310003_homeground_atomic_inquiry_attribution.sql",
  );

  assert.match(
    migration,
    /alter table homeground_private\.inquiry_traffic_attribution_outbox[\s\S]{0,100}enable row level security;[\s\S]{0,140}force row level security;/u,
  );
  assert.match(
    migration,
    /revoke all on table[\s\S]{0,100}inquiry_traffic_attribution_outbox[\s\S]{0,100}service_role;/u,
  );
  assert.match(
    migration,
    /created_at <= observed_at - interval '30 days'/u,
  );
  assert.match(
    migration,
    /status = 'attributed'[\s\S]{0,160}resolved_at <= observed_at - interval '30 days'/u,
  );
  assert.match(
    migration,
    /requested_session_hash = null/u,
  );
});
