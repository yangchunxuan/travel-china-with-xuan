import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const migrationPath =
  "supabase/migrations/202607180001_homeground_inquiries.sql";
const publicFunctionPath = "supabase/functions/v1-inquiries/index.ts";
const workerPath = "supabase/functions/notify-inquiries/index.ts";
const runtimePath = "supabase/functions/_shared/runtime.ts";
const scheduleMigrationPath =
  "supabase/migrations/202607180002_homeground_notification_schedule.sql";
const rateLimitRetentionMigrationPath =
  "supabase/migrations/202607180003_homeground_rate_limit_retention.sql";
const outboxHealthMigrationPath =
  "supabase/migrations/202607190001_homeground_outbox_health.sql";
const healthFunctionPath = "supabase/functions/inquiry-health/index.ts";
const supabaseConfigPath = "supabase/config.toml";
const envExamplePath = ".env.example";
const deployWorkflowPath = ".github/workflows/deploy.yml";
const healthWorkflowPath = ".github/workflows/inquiry-health.yml";
const handoffCopyPath = "lib/homegroundI18n.ts";
const studioRunbookPath = "docs/studio-inquiry-runbook.md";
const plannerHandoffPath = "components/PlannerHandoff.tsx";
const homePagePath = "components/HomegroundHomePage.tsx";
const headerPath = "components/HomegroundHeader.tsx";
const privacyCopyPath = "lib/homegroundPrivacyI18n.ts";
const inquiryVersionsPath = "lib/inquiryVersions.ts";
const defaultPrivacyPagePath = "app/(default)/privacy/page.tsx";
const localizedPrivacyPagePath =
  "app/(localized)/[locale]/privacy/page.tsx";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("migration makes persistence and outbox creation one RPC transaction", async () => {
  const sql = await source(migrationPath);
  const rpcStart = sql.indexOf(
    "create or replace function public.create_homeground_inquiry",
  );
  const rpcEnd = sql.indexOf(
    "create or replace function public.claim_homeground_notification_jobs",
  );
  const rpc = sql.slice(rpcStart, rpcEnd);
  assert.match(rpc, /insert into homeground_private\.inquiries/);
  assert.match(rpc, /insert into homeground_private\.notification_outbox/);
  assert.match(rpc, /pg_advisory_xact_lock/);
  assert.match(rpc, /idempotency_conflict/);
});

test("idempotent replay is resolved before rate limiting in the persistence transaction", async () => {
  const sql = await source(migrationPath);
  const rpcStart = sql.indexOf(
    "create or replace function public.create_homeground_inquiry",
  );
  const rpcEnd = sql.indexOf(
    "create or replace function public.claim_homeground_notification_jobs",
  );
  const rpc = sql.slice(rpcStart, rpcEnd);
  const replayCheck = rpc.indexOf("if found then");
  const rateLimitCall = rpc.indexOf(
    "homeground_private.consume_inquiry_rate_limit",
  );
  assert.ok(replayCheck >= 0);
  assert.ok(rateLimitCall > replayCheck);

  const edge = await source(publicFunctionPath);
  assert.doesNotMatch(edge, /consume_homeground_inquiry_rate_limit/);
  assert.match(
    edge,
    /429,\s*"rate_limited",\s*true,\s*"unknown"/,
  );
});

test("private tables have RLS and no anonymous table grants", async () => {
  const sql = await source(migrationPath);
  for (const table of [
    "inquiries",
    "notification_outbox",
    "inquiry_rate_limit_buckets",
  ]) {
    assert.match(
      sql,
      new RegExp(
        `alter table homeground_private\\.${table} enable row level security`,
      ),
    );
    assert.match(
      sql,
      new RegExp(
        `alter table homeground_private\\.${table} force row level security`,
      ),
    );
  }
  assert.match(
    sql,
    /revoke all on all tables in schema homeground_private\s+from public, anon, authenticated/,
  );
});

test("pilot schema does not invent a database CRM workflow", async () => {
  const sql = await source(migrationPath);
  for (const unusedField of [
    "assigned_to",
    "qualified_at",
    "qualification_reason",
    "duplicate_of_inquiry_id",
    "experiment_subject_id",
    "contact_fingerprint_hmac",
    "claim_due_at",
    "first_replied_at",
  ]) {
    assert.doesNotMatch(sql, new RegExp(`\\b${unusedField}\\b`));
  }
  assert.doesNotMatch(sql, /create table homeground_private\.inquiry_events/);
});

test("public function is fail-closed and configuration-driven", async () => {
  const code = await source(publicFunctionPath);
  const runtime = await source(runtimePath);
  assert.match(code, /ALLOWED_ORIGINS/);
  assert.match(code, /WHATSAPP_ENABLED/);
  assert.match(runtime, /SUPABASE_SECRET_KEYS/);
  assert.match(runtime, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(runtime, /usesLegacyAuthorization/);
  assert.match(
    runtime,
    /adminCredential\.usesLegacyAuthorization[\s\S]*Authorization/,
  );
  assert.match(code, /IDEMPOTENCY_HASH_SECRET/);
  assert.match(code, /RATE_LIMIT_HASH_SECRET/);
  assert.match(runtime, /missing-client-ip/);
  assert.match(code, /request_too_large/);
  assert.match(code, /origin_not_allowed/);
  assert.doesNotMatch(code, /@gmail\.com/i);
  assert.doesNotMatch(code, /(?:\+?86)?1[3-9][0-9]{9}/);
});

test("notification worker gives the monitored inbox a complete human handoff", async () => {
  const code = await source(workerPath);
  assert.match(code, /public_reference/);
  assert.match(code, /route_id/);
  assert.match(code, /job\.answers/);
  assert.match(code, /route_snapshot/);
  assert.match(code, /reply_channel/);
  assert.match(code, /contact_email/);
  assert.match(code, /contact_phone_e164/);
  assert.match(code, /job\.note/);
  assert.match(code, /reply_to/);
  assert.match(code, /BRAND_NOTIFICATION_EMAIL/);
  assert.match(code, /RESEND_API_KEY/);
  assert.match(code, /NOTIFICATION_PROVIDER_TIMEOUT_SECONDS/);
  assert.match(code, /signal: timeoutController\.signal/);
  assert.match(code, /worstCaseBatchMilliseconds/);
  assert.doesNotMatch(code, /OPS_INQUIRY_URL_BASE/);
  assert.doesNotMatch(code, /console\.(?:log|info|warn|error)/);
  assert.doesNotMatch(code, /@gmail\.com/i);
  assert.doesNotMatch(code, /(?:\+?86)?1[3-9][0-9]{9}/);
  assert.doesNotMatch(code, /Claimed|Replied|Closed/);
  assert.match(code, /Reply-To is already set to the traveller/);
  assert.match(code, /Gmail thread and its Sent message/);
  for (const answerField of ["party", "travelStyle", "nights", "pace"]) {
    assert.match(code, new RegExp(`key: "${answerField}"`));
  }

  const migration = await source(migrationPath);
  const claimStart = migration.indexOf(
    "create or replace function public.claim_homeground_notification_jobs",
  );
  const claimEnd = migration.indexOf(
    "create or replace function public.finish_homeground_notification_job",
  );
  const claimRpc = migration.slice(claimStart, claimEnd);
  assert.match(claimRpc, /answers jsonb/);
  assert.match(claimRpc, /inquiry\.answers_json/);

  const configurationCheck = code.indexOf("config = notificationConfig()");
  const outboxClaim = code.indexOf('"claim_homeground_notification_jobs"');
  assert.ok(configurationCheck >= 0);
  assert.ok(outboxClaim > configurationCheck);
});

test("notification schedule is Vault-backed, fail-closed, and cron-driven", async () => {
  const sql = await source(scheduleMigrationPath);
  assert.match(sql, /create extension if not exists pg_cron/);
  assert.match(sql, /create extension if not exists pg_net/);
  assert.match(sql, /vault\.decrypted_secrets/);
  assert.match(sql, /homeground_notification_worker_url/);
  assert.match(sql, /homeground_notification_worker_secret/);
  assert.match(sql, /x-worker-secret/);
  assert.match(sql, /net\.http_post/);
  assert.match(sql, /cron\.schedule/);
  assert.match(sql, /'\* \* \* \* \*'/);

  const configFunction = sql.slice(
    sql.indexOf(
      "create or replace function homeground_private.configure_notification_schedule",
    ),
  );
  const assertion = configFunction.indexOf(
    "assert_notification_worker_configuration",
  );
  const schedule = configFunction.indexOf("cron.schedule");
  assert.ok(assertion >= 0);
  assert.ok(schedule > assertion);
  assert.doesNotMatch(sql, /https:\/\/[a-z0-9-]+\.supabase\.co/);
});

test("outbox health RPC returns only aggregate non-PII counts", async () => {
  const sql = await source(outboxHealthMigrationPath);
  assert.match(
    sql,
    /create or replace function public\.get_homeground_outbox_health\(\)/,
  );
  for (const count of [
    "pending_count",
    "processing_count",
    "failed_count",
    "overdue_pending_count",
    "expired_processing_count",
  ]) {
    assert.match(sql, new RegExp(`\\b${count}\\b`));
  }
  assert.match(
    sql,
    /from homeground_private\.notification_outbox outbox/,
  );
  assert.match(sql, /now\(\) - interval '5 minutes'/);
  assert.match(
    sql,
    /revoke all on function public\.get_homeground_outbox_health\(\)[\s\S]*from public, anon, authenticated/,
  );
  assert.match(
    sql,
    /grant execute on function public\.get_homeground_outbox_health\(\)[\s\S]*to service_role/,
  );
  assert.doesNotMatch(
    sql,
    /contact_email|contact_phone|public_reference|route_snapshot|answers_json|\bnote\b/,
  );
});

test("independent health function is secret-protected and fails on unhealthy counts", async () => {
  const code = await source(healthFunctionPath);
  const config = await source(supabaseConfigPath);
  assert.match(code, /OUTBOX_MONITOR_SECRET/);
  assert.match(code, /x-monitor-secret/);
  assert.match(code, /constantTimeEqual/);
  assert.match(code, /request\.method !== "GET"/);
  assert.match(code, /"get_homeground_outbox_health"/);
  assert.match(
    code,
    /counts\.failed === 0[\s\S]*counts\.overduePending === 0[\s\S]*counts\.expiredProcessing === 0/,
  );
  assert.match(code, /return jsonResponse\(healthy \? 200 : 503/);
  assert.doesNotMatch(code, /console\.(?:log|info|warn|error)/);
  assert.doesNotMatch(
    code,
    /contact_email|contact_phone|public_reference|route_snapshot|answers_json|\bnote\b/,
  );
  assert.match(
    config,
    /\[functions\.inquiry-health\][\s\S]*verify_jwt = false/,
  );
});

test("GitHub Actions checks outbox health every fifteen minutes without Resend", async () => {
  const workflow = await source(healthWorkflowPath);
  const runbook = await source(studioRunbookPath);
  assert.match(workflow, /cron: "\*\/15 \* \* \* \*"/);
  assert.match(
    workflow,
    /OUTBOX_HEALTH_URL: \$\{\{ vars\.OUTBOX_HEALTH_URL \}\}/,
  );
  assert.match(
    workflow,
    /OUTBOX_MONITOR_SECRET: \$\{\{ secrets\.OUTBOX_MONITOR_SECRET \}\}/,
  );
  assert.match(workflow, /x-monitor-secret/);
  assert.match(workflow, /http_status/);
  assert.match(workflow, /\.counts\.failed == 0/);
  assert.doesNotMatch(
    workflow,
    /RESEND_API_KEY|NOTIFICATION_WORKER_SECRET|BRAND_NOTIFICATION_EMAIL/,
  );
  assert.doesNotMatch(workflow, /cat\s+["']?\$\{?response_file/);
  assert.match(
    runbook,
    /label:"Homeground inquiries" is:unread older:2d/,
  );
  assert.match(runbook, /public\.get_homeground_outbox_health\(\)/);
  assert.match(
    runbook,
    /failed_count[\s\S]*overdue_pending_count[\s\S]*expired_processing_count/,
  );
});

test("hashed rate-limit buckets have an independent 24-hour purge", async () => {
  const sql = await source(rateLimitRetentionMigrationPath);
  const consumeStart = sql.indexOf(
    "create or replace function homeground_private.consume_inquiry_rate_limit",
  );
  const consumeEnd = sql.indexOf("\n$$;", consumeStart) + 4;
  const consumeFunction = sql.slice(consumeStart, consumeEnd);
  assert.ok(consumeStart >= 0);
  assert.ok(consumeEnd > consumeStart);
  assert.match(
    consumeFunction,
    /observed_at timestamptz := clock_timestamp\(\)/,
  );
  assert.doesNotMatch(consumeFunction, /\bcurrent_time\b/i);
  assert.equal(
    consumeFunction.match(/updated_at = observed_at/g)?.length,
    2,
  );
  assert.match(
    consumeFunction,
    /updated_at <= observed_at - interval '24 hours'/,
  );
  assert.match(
    sql,
    /revoke all on function homeground_private\.consume_inquiry_rate_limit/,
  );
  assert.match(sql, /do \$rate_limit_regression\$/);
  assert.equal(
    sql.match(
      /first_result := homeground_private\.consume_inquiry_rate_limit/g,
    )?.length,
    1,
  );
  assert.equal(
    sql.match(
      /second_result := homeground_private\.consume_inquiry_rate_limit/g,
    )?.length,
    1,
  );
  assert.match(sql, /request_count <> 2/);
  assert.match(
    sql,
    /homeground_private\.purge_expired_inquiry_rate_limit_buckets/,
  );
  assert.match(sql, /updated_at <= now\(\) - interval '24 hours'/);
  assert.match(sql, /homeground-purge-rate-limit-buckets/);
  assert.match(sql, /cron\.schedule/);
  assert.match(sql, /'\* \* \* \* \*'/);
  assert.match(
    sql,
    /from public, anon, authenticated, service_role/,
  );
});

test("published privacy copy reflects the production data path", async () => {
  const copy = await source(privacyCopyPath);
  const versions = await source(inquiryVersionsPath);
  const defaultPage = await source(defaultPrivacyPagePath);
  const localizedPage = await source(localizedPrivacyPagePath);
  assert.match(copy, /Seoul \(ap-northeast-2\)/);
  assert.match(copy, /首尔（ap-northeast-2）/);
  assert.match(copy, /서울\(ap-northeast-2\)/);
  assert.match(copy, /Tokyo \(ap-northeast-1\)/);
  assert.match(copy, /东京（ap-northeast-1）/);
  assert.match(copy, /도쿄\(ap-northeast-1\)/);
  assert.match(copy, /no more than 12 months/);
  assert.match(copy, /最多 12 个月/);
  assert.match(copy, /최대 12개월/);
  assert.match(copy, /within 30 days/);
  assert.match(copy, /30 天内/);
  assert.match(copy, /30일 이내/);
  assert.match(
    versions,
    /currentPrivacyNoticeVersion = "2026-07-18\.2"/,
  );
  assert.doesNotMatch(defaultPage, /index:\s*false|follow:\s*false/);
  assert.doesNotMatch(localizedPage, /index:\s*false|follow:\s*false/);
  assert.doesNotMatch(
    copy,
    /Pre-launch|not live yet|not connected|sender not yet verified/,
  );
  assert.doesNotMatch(copy, /尚未开放|尚未连接|发件地址尚未验证|等待正式/);
  assert.doesNotMatch(copy, /공개 전|미연결|발신자 미인증|설정 대기/);
});

test("backend sources contain no hardcoded personal contact or secret", async () => {
  const combined = (
    await Promise.all([
      source(migrationPath),
      source(publicFunctionPath),
      source(workerPath),
      source(runtimePath),
      source(scheduleMigrationPath),
      source(rateLimitRetentionMigrationPath),
      source(outboxHealthMigrationPath),
      source(healthFunctionPath),
      source(healthWorkflowPath),
    ])
  ).join("\n");
  assert.doesNotMatch(combined, /defaultContactEmail|defaultWhatsAppNumber/);
  assert.doesNotMatch(combined, /(?:\+?86)?1[3-9][0-9]{9}/);
  assert.doesNotMatch(combined, /@gmail\.com/i);
  assert.doesNotMatch(combined, /re_[A-Za-z0-9]{16,}/);
});

test("environment template covers the public form and server functions", async () => {
  const example = await source(envExamplePath);
  for (const variable of [
    "NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED",
    "NEXT_PUBLIC_HOMEGROUND_INQUIRY_API_URL",
    "NEXT_PUBLIC_HOMEGROUND_BRAND_EMAIL",
    "NEXT_PUBLIC_HOMEGROUND_PRIVACY_READY",
    "NEXT_PUBLIC_HOMEGROUND_PRIVACY_NOTICE_URL",
    "NEXT_PUBLIC_HOMEGROUND_REPLY_SLA_EN",
    "NEXT_PUBLIC_HOMEGROUND_REPLY_SLA_ZH",
    "NEXT_PUBLIC_HOMEGROUND_REPLY_SLA_KO",
    "NEXT_PUBLIC_HOMEGROUND_WHATSAPP_ENABLED",
    "SUPABASE_URL",
    "SUPABASE_SECRET_KEYS",
    "SUPABASE_SERVICE_ROLE_KEY",
    "ALLOWED_ORIGINS",
    "ALLOWED_FORM_VERSIONS",
    "ALLOWED_PRIVACY_NOTICE_VERSIONS",
    "WHATSAPP_ENABLED",
    "IDEMPOTENCY_HASH_SECRET",
    "RATE_LIMIT_HASH_SECRET",
    "RATE_LIMIT_10_MINUTES",
    "RATE_LIMIT_24_HOURS",
    "REPLY_SLA_HOURS",
    "NOTIFICATION_WORKER_SECRET",
    "RESEND_API_KEY",
    "RESEND_FROM_EMAIL",
    "BRAND_NOTIFICATION_EMAIL",
    "NOTIFICATION_BATCH_SIZE",
    "NOTIFICATION_LEASE_SECONDS",
    "NOTIFICATION_PROVIDER_TIMEOUT_SECONDS",
    "OUTBOX_MONITOR_SECRET",
    "OUTBOX_HEALTH_URL",
  ]) {
    assert.match(example, new RegExp(`^${variable}=`, "m"));
  }
  assert.match(
    example,
    /^NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED=false$/m,
  );
  assert.match(example, /^NEXT_PUBLIC_HOMEGROUND_PRIVACY_READY=false$/m);
  assert.match(
    example,
    /^NEXT_PUBLIC_HOMEGROUND_WHATSAPP_ENABLED=false$/m,
  );
  assert.doesNotMatch(example, /@gmail\.com/i);
  assert.doesNotMatch(example, /(?:\+?86)?1[3-9][0-9]{9}/);
  assert.doesNotMatch(example, /re_[A-Za-z0-9]{16,}/);
});

test("GitHub Pages build receives only explicit public Inquiry variables", async () => {
  const workflow = await source(deployWorkflowPath);
  for (const variable of [
    "NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED",
    "NEXT_PUBLIC_HOMEGROUND_INQUIRY_API_URL",
    "NEXT_PUBLIC_HOMEGROUND_BRAND_EMAIL",
    "NEXT_PUBLIC_HOMEGROUND_PRIVACY_READY",
    "NEXT_PUBLIC_HOMEGROUND_PRIVACY_NOTICE_URL_EN",
    "NEXT_PUBLIC_HOMEGROUND_PRIVACY_NOTICE_URL_ZH",
    "NEXT_PUBLIC_HOMEGROUND_PRIVACY_NOTICE_URL_KO",
    "NEXT_PUBLIC_HOMEGROUND_REPLY_SLA_EN",
    "NEXT_PUBLIC_HOMEGROUND_REPLY_SLA_ZH",
    "NEXT_PUBLIC_HOMEGROUND_REPLY_SLA_KO",
    "NEXT_PUBLIC_HOMEGROUND_WHATSAPP_ENABLED",
  ]) {
    assert.match(
      workflow,
      new RegExp(`${variable}: \\$\\{\\{ vars\\.${variable} \\}\\}`),
    );
  }
  assert.doesNotMatch(
    workflow,
    /SUPABASE_SECRET_KEYS|SUPABASE_SERVICE_ROLE_KEY|RESEND_API_KEY/,
  );
});

test("fallback email enters the same monitored Gmail workflow", async () => {
  const copy = await source(handoffCopyPath);
  const runbook = await source(studioRunbookPath);
  assert.equal(
    copy.match(/\[Homeground\]\[Fallback\]/g)?.length,
    3,
  );
  assert.match(runbook, /\[Homeground\]\[Fallback\]/);
  assert.match(runbook, /same\s+monitored inbox/);
  assert.match(runbook, /Homeground inquiries/);
  assert.doesNotMatch(runbook, /New → Claimed → Replied → Closed/);
});

test("frontend launch gates and permanent privacy entry stay connected", async () => {
  const planner = await source(plannerHandoffPath);
  const homePage = await source(homePagePath);
  const readinessStart = planner.indexOf("const configurationReady");
  const readinessEnd = planner.indexOf("const [status", readinessStart);
  const readiness = planner.slice(readinessStart, readinessEnd);
  const disabledStart = planner.indexOf('{status === "disabled"');
  const disabledEnd = planner.indexOf('{status === "success"', disabledStart);
  const disabledState = planner.slice(disabledStart, disabledEnd);
  const failureStart = planner.indexOf('{status === "failed"');
  const failureEnd = planner.indexOf(
    "{allowsImmediateRetry",
    failureStart,
  );
  const failedState = planner.slice(failureStart, failureEnd);
  assert.match(
    readiness,
    /inquiryEnabled[\s\S]*apiUrl[\s\S]*privacyReady[\s\S]*privacyNoticeUrl[\s\S]*replySla/,
  );
  assert.doesNotMatch(readiness, /brandEmailReady/);
  assert.doesNotMatch(disabledState, /fallbackMailto|mailto:/);
  assert.match(failedState, /allowsFallbackEmail[\s\S]*fallbackMailto/);
  assert.match(planner, /\{brandEmail\}/);
  assert.match(homePage, /copy\.footer\.privacy/);
  assert.match(homePage, /privacyPath/);
});

test("language changes do not silently discard a customer contact draft", async () => {
  const planner = await source(plannerHandoffPath);
  const homePage = await source(homePagePath);
  const header = await source(headerPath);
  const copy = await source(handoffCopyPath);

  assert.match(planner, /hasUnsavedContactDraft/);
  assert.match(planner, /onDirtyChange\?\.\(hasUnsavedContactDraft\)/);
  assert.match(homePage, /handoffDirty=\{handoffDirty\}/);
  assert.match(header, /handoffDirty[\s\S]*window\.confirm/);
  assert.match(header, /event\.preventDefault\(\)/);
  assert.equal(
    copy.match(/languageChangeWarning:/g)?.length,
    4,
  );
});
