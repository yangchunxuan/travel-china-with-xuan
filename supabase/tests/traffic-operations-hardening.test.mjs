import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const repositoryRoot = new URL("../../", import.meta.url);
const hardeningMigrationPath =
  "supabase/migrations/202608230001_homeground_traffic_operations_hardening.sql";
const originalTrafficMigrationPath =
  "supabase/migrations/202607310001_homeground_traffic_attribution.sql";

async function source(path) {
  return readFile(new URL(path, repositoryRoot), "utf8").then((contents) =>
    contents.replace(/\r\n?/gu, "\n"),
  );
}

test("valid session bootstrap is limited before credential issuance", async () => {
  const [endpoint, environment] = await Promise.all([
    source("supabase/functions/v1-traffic-events/index.ts"),
    source(".env.example"),
  ]);
  const validation = endpoint.indexOf(
    "validateAndNormalizeTrafficSessionStart(rawPayload)",
  );
  const limiter = endpoint.indexOf(
    '"consume_homeground_traffic_session_start_rate_limit_v1"',
    validation,
  );
  const credential = endpoint.indexOf(
    "const issued = await issueSessionCredential",
    validation,
  );

  assert.ok(validation >= 0);
  assert.ok(limiter > validation);
  assert.ok(credential > limiter);
  assert.match(
    endpoint,
    /`session-start-ip:v1:\$\{requestIp\(request\)\}`/u,
  );
  assert.match(endpoint, /"session-start-global:v1"/u);
  for (const [name, value] of [
    ["TRAFFIC_SESSION_START_IP_RATE_LIMIT_10_MINUTES", "30"],
    ["TRAFFIC_SESSION_START_IP_RATE_LIMIT_24_HOURS", "120"],
    ["TRAFFIC_SESSION_START_GLOBAL_RATE_LIMIT_10_MINUTES", "200"],
    ["TRAFFIC_SESSION_START_GLOBAL_RATE_LIMIT_24_HOURS", "2000"],
  ]) {
    assert.match(endpoint, new RegExp(name, "u"));
    assert.match(
      environment,
      new RegExp(`^${name}=${value}$`, "mu"),
    );
  }
  assert.match(
    environment,
    /Valid credential-bootstrap requests count as HTTP requests/u,
  );
  assert.match(
    endpoint,
    /p_ip_rate_limit_subject_hash: ipRateLimitSubjectHash/u,
  );
  assert.doesNotMatch(endpoint, /p_(?:raw_)?ip(?:_address)?:/u);
});

test("checked-in traffic secret sentinels are rejected before any RPC", async () => {
  const [endpoint, environment] = await Promise.all([
    source("supabase/functions/v1-traffic-events/index.ts"),
    source(".env.example"),
  ]);

  for (const name of [
    "TRAFFIC_SESSION_HASH_SECRET",
    "TRAFFIC_RATE_LIMIT_HASH_SECRET",
    "TRAFFIC_SESSION_CREDENTIAL_SECRET",
    "TRAFFIC_ATTRIBUTION_LINK_SIGNING_SECRET",
  ]) {
    assert.match(environment, new RegExp(`^${name}=CHANGE_ME$`, "mu"));
  }
  assert.ok(endpoint.includes("function trafficSecretIsValid"));
  assert.ok(endpoint.includes("value.length >= 32"));
  assert.ok(endpoint.includes("!/[\\s<>]/u.test(value)"));
  assert.ok(endpoint.includes("change[_-]?me"));
  assert.ok(endpoint.includes("const rawValue = Deno.env.get(name)"));
  assert.ok(endpoint.includes("if (rawValue !== value)"));
  const secretValidation = endpoint.indexOf(
    "validateIndependentTrafficSecrets();",
  );
  const firstRpc = endpoint.indexOf(
    '"consume_homeground_traffic_session_start_rate_limit_v1"',
    secretValidation,
  );
  assert.ok(secretValidation >= 0 && firstRpc > secretValidation);
});

test("session bootstrap limiter is atomic, private and charges denied attempts", async () => {
  const migration = await source(hardeningMigrationPath);

  assert.match(
    migration,
    /create or replace function[\s\S]{0,100}public\.consume_homeground_traffic_session_start_rate_limit_v1\(/u,
  );
  assert.match(migration, /security definer/u);
  assert.match(
    migration,
    /consume_traffic_rate_limit\([\s\S]{0,220}p_ip_rate_limit_subject_hash[\s\S]{0,220}\b1\s*\)[\s\S]+consume_traffic_rate_limit\([\s\S]{0,220}p_global_rate_limit_subject_hash[\s\S]{0,220}\b1\s*\)/u,
  );
  assert.match(
    migration,
    /revoke all on function[\s\S]{0,180}consume_homeground_traffic_session_start_rate_limit_v1[\s\S]{0,240}from public, anon, authenticated;/u,
  );
  assert.match(
    migration,
    /grant execute on function[\s\S]{0,180}consume_homeground_traffic_session_start_rate_limit_v1[\s\S]{0,220}to service_role;/u,
  );
  assert.match(
    migration,
    /first_result[\s\S]+second_result[\s\S]+request_count <> 2[\s\S]+updated_at < test_started_at/u,
  );
  assert.match(
    migration,
    /second_result ->> 'outcome' <> 'rate_limited'/u,
  );
});

test("rate buckets and raw traffic retain distinct documented boundaries", async () => {
  const [hardening, original] = await Promise.all([
    source(hardeningMigrationPath),
    source(originalTrafficMigrationPath),
  ]);

  assert.match(
    original,
    /do update set[\s\S]{0,180}request_count[\s\S]{0,120}\+ p_event_count,[\s\S]{0,80}updated_at = observed_at/u,
  );
  assert.match(
    original,
    /updated_at <= clock_timestamp\(\) - interval '24 hours'/u,
  );
  assert.match(
    original,
    /received_at <= clock_timestamp\(\) - interval '30 days'/u,
  );
  assert.match(
    original,
    /first_seen_at <= clock_timestamp\(\) - interval '30 days'/u,
  );
  assert.match(
    original,
    /linked_at <= clock_timestamp\(\) - interval '30 days'/u,
  );
  assert.match(
    hardening,
    /'24 hours'[\s\S]{0,180}purge_expired_traffic_rate_limit_buckets_v1/u,
  );
  assert.match(
    hardening,
    /'30 days'[\s\S]{0,180}purge_expired_homeground_traffic_v1/u,
  );
});

test("operational failures return bounded metadata and log no request data", async () => {
  const endpoint = await source(
    "supabase/functions/v1-traffic-events/index.ts",
  );
  const responseStart = endpoint.indexOf("function errorResponse(");
  const responseEnd = endpoint.indexOf(
    "async function readLimitedBody(",
    responseStart,
  );
  const responseSource = endpoint.slice(responseStart, responseEnd);

  assert.match(
    endpoint,
    /observableOperationalStatuses = new Set\(\[401, 429, 503\]\)/u,
  );
  assert.match(
    responseSource,
    /homeground_traffic_operational_response[\s\S]{0,180}requestId[\s\S]{0,80}status[\s\S]{0,80}code[\s\S]{0,80}requestType/u,
  );
  const logStart = responseSource.indexOf("console.warn(JSON.stringify({");
  const logEnd = responseSource.indexOf("}));", logStart);
  const logSource = responseSource.slice(logStart, logEnd);
  for (const forbidden of [
    "sessionToken",
    "sessionCredential",
    "attribution",
    "requestIp",
    "payload",
  ]) {
    assert.equal(logSource.includes(forbidden), false);
  }
  assert.match(
    endpoint,
    /type ObservableTrafficRequestType =[\s\S]{0,120}"unknown"[\s\S]{0,100}trafficSessionStartRequestType[\s\S]{0,100}trafficEventBatchRequestType/u,
  );
  assert.match(
    endpoint,
    /401,[\s\S]{0,80}"invalid_session_credential"[\s\S]{0,180}trafficEventBatchRequestType/u,
  );
  assert.match(
    endpoint,
    /Math\.min\(86_400, Math\.max\(1, Math\.ceil\(value\)\)\)/u,
  );
  assert.match(
    endpoint,
    /401,[\s\S]{0,80}"invalid_session_credential"/u,
  );
  assert.match(
    endpoint,
    /429,[\s\S]{0,80}"rate_limited"[\s\S]{0,180}"Retry-After"/u,
  );
  assert.match(
    endpoint,
    /503,[\s\S]{0,80}"persistence_unavailable"/u,
  );
});

test("Admin traffic has a second default-off kill switch", async () => {
  const endpoint = await source(
    "supabase/functions/admin-traffic/index.ts",
  );
  const authorization = endpoint.indexOf("authorizeAdminRequest(request)");
  const trafficSwitch = endpoint.indexOf(
    'booleanEnv(\n      "ADMIN_TRAFFIC_API_ENABLED",\n      false,',
  );
  const trafficRpc = endpoint.indexOf('"get_homeground_admin_traffic"');

  assert.ok(authorization >= 0);
  assert.ok(trafficSwitch > authorization);
  assert.ok(trafficRpc > trafficSwitch);
  assert.match(endpoint, /"traffic_disabled"/u);
  assert.match(endpoint, /"traffic_not_configured"/u);
  assert.doesNotMatch(
    endpoint,
    /console\.(?:log|info|warn|error)/u,
  );
});

test("three-language privacy copy distinguishes bootstrap and event counting", async () => {
  const privacy = await source("lib/homegroundPrivacyI18n.ts");

  assert.match(privacy, /Valid credential-bootstrap requests/u);
  assert.match(
    privacy,
    /newly accepted events—not by event-batch HTTP requests or idempotent replays/u,
  );
  assert.match(privacy, /通过格式验证的凭据启动请求按请求数/u);
  assert.match(privacy, /事件批次则另按新接受的事件数/u);
  assert.match(privacy, /형식 검증을 통과한 자격 증명 시작 요청/u);
  assert.match(privacy, /이벤트 배치는 별도로 새로 수락된 이벤트 수/u);
  assert.match(privacy, /last updated_at value is 24 hours old/u);
  assert.match(privacy, /原始事件与匿名会话 · 30 天滚动窗口/u);
  assert.match(privacy, /원본 이벤트와 익명 세션 · 30일 이동식 보관 기간/u);
});

test("CORS origin is documented as a boundary rather than authentication", async () => {
  const config = await source("supabase/config.toml");
  const start = config.indexOf("[functions.v1-traffic-events]");
  const end = config.indexOf("\n[functions.", start + 1);
  const trafficSection = config.slice(start, end);

  assert.match(trafficSection, /CORS boundary, not authentication/u);
  assert.match(
    trafficSection,
    /application-level IP\/global bootstrap[\s\S]{0,20}limits/u,
  );
  assert.match(trafficSection, /short-lived[\s\S]{0,40}credentials/u);
  assert.match(trafficSection, /IP\/session\/global event limits/u);

  const adminStart = config.indexOf("[functions.admin-traffic]");
  const adminSection = config.slice(adminStart);
  assert.match(adminSection, /master kill switch/u);
  assert.match(
    adminSection,
    /independent default-off traffic kill switch/u,
  );
});
