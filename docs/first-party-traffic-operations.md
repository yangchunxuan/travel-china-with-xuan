# Homeground first-party traffic operations

Status: operational release contract. This document does not assert that the
collector, database migrations, cron jobs, repository variables or secrets are
deployed in any environment. Record separate read-back evidence for each
environment.

This runbook covers only the consented, bounded first-party traffic collector
at `v1-traffic-events`, its inquiry-attribution bridge, its retention jobs and
the fail-closed deployment posture of the companion `admin-traffic` Edge
Function. It does not authorize GA4, Meta Pixel or activation of the private
Admin traffic page. The limited rate-limit wording must match deployed behavior;
any privacy notice-version or consent-lifecycle change remains a separate
decision.

## Safety model and activation gates

Collection has two independent gates:

1. `TRAFFIC_EVENTS_ENABLED` is the immediate server-side kill switch. Missing,
   malformed or false returns `503 collection_paused` or
   `503 service_not_configured` before a request body is parsed or persisted.
2. `NEXT_PUBLIC_HOMEGROUND_ANALYTICS_ENABLED` is compiled into the static
   frontend. It must equal the exact string `true`, a valid
   `NEXT_PUBLIC_HOMEGROUND_WEB_EVENTS_URL` must be present, and the visitor must
   grant analytics consent before the browser calls the collector.

The server switch is the emergency control. Changing a GitHub repository
variable does not change an already deployed static bundle; a frontend rebuild
and deployment are required.

The checked-in `.env.example`, PR workflow and Pages deployment workflow must
remain fail-closed:

- the shared public switch defaults to `false`;
- the GA4 ID, Meta Pixel ID and first-party endpoint have no workflow fallback;
- the example contains no live measurement destination;
- the Edge switch defaults to `false` in the function implementation.

For a first-party-only release, leave the GA4 and Meta repository variables
unset. Enabling the shared public switch is not authorization to configure
either third-party destination.

Activation requires all of the following evidence:

- the exact privacy notice version `2026-07-31.1` is approved and reachable in
  English, Chinese and Korean;
- grant, refusal, withdrawal and re-grant have passed browser network tests;
- the linked Supabase project and migration history have been read back;
- the migration plan has been reviewed and a recoverable database backup or
  point-in-time recovery window has been confirmed;
- the four traffic secrets are independent, at least 32 characters, stored in
  the environment's secret manager and absent from source, logs and command
  transcripts;
- the exact production Origin and rate limits are approved;
- every cron job below exists, is active and has a successful recent run;
- staging has passed disabled, malformed-request, accepted-event, replay,
  rate-limit, retention and inquiry-attribution checks;
- an owner, rollback operator and observation window are recorded.

If any gate is missing, leave both public and server switches false.

## Data boundary

The collector accepts only the fixed contract and event enum in
`supabase/functions/_shared/traffic-contracts.ts`. The database stores HMAC
session and rate-limit subjects, not raw browser tokens or raw IP addresses.
It does not store User-Agent, referrer, query string, email, phone, note or
free text. Campaign labels contribute only when a link signature validates;
otherwise attribution becomes Unknown.

Traffic events and sessions have a 30-day TTL. After 30 days, the reversible
session association on an inquiry snapshot is cleared. The controlled
first-touch snapshot follows the inquiry's separately approved retention and
deletion lifecycle. Disabling or rolling back collection must not delete
traffic, inquiry or operational evidence.

## Configuration inventory

### Public GitHub repository variables

These values are embedded in the public static bundle and are not secrets.

| Variable | First-party rule |
|---|---|
| `NEXT_PUBLIC_HOMEGROUND_ANALYTICS_ENABLED` | Keep `false` until the final frontend activation; only exact `true` enables the shared measurement layer. |
| `NEXT_PUBLIC_HOMEGROUND_WEB_EVENTS_URL` | Exact HTTPS URL ending in `/functions/v1/v1-traffic-events`; no query, fragment, credentials or alternate origin. |
| `NEXT_PUBLIC_HOMEGROUND_GA4_MEASUREMENT_ID` | Leave unset for a first-party-only rollout. |
| `NEXT_PUBLIC_HOMEGROUND_META_PIXEL_ID` | Leave unset for a first-party-only rollout. |

### Supabase server configuration

Supabase-hosted `SUPABASE_URL` and secret-key dictionaries are platform values;
do not copy them into GitHub variables or try to replace them.

| Variable | Rule |
|---|---|
| `TRAFFIC_EVENTS_ENABLED` | Keep `false` during migration, function deployment, rotation and rollback; use exact `true` only for the bounded activation. |
| `ALLOWED_ORIGINS` | Comma-separated exact HTTPS origins; production steady state should contain only the canonical website origin. |
| `TRAFFIC_SESSION_HASH_SECRET` | At least 32 characters; shared by `v1-traffic-events` and `v1-inquiries`; independent from every other secret. |
| `TRAFFIC_RATE_LIMIT_HASH_SECRET` | At least 32 characters; only for HMAC rate-limit subjects. |
| `TRAFFIC_SESSION_CREDENTIAL_SECRET` | At least 32 characters; signs short-lived session credentials; never reuse the session-hash secret. |
| `TRAFFIC_ATTRIBUTION_LINK_SIGNING_SECRET` | At least 32 characters; signs controlled campaign links and is also used only in the server-side link-signing tool. |
| `TRAFFIC_SESSION_CREDENTIAL_TTL_SECONDS` | 300–7200; approved default 1800. |
| `TRAFFIC_SESSION_START_IP_RATE_LIMIT_10_MINUTES` | 30 format-valid `start_session` bootstrap requests per client-IP HMAC subject; this counts bootstrap requests, not traffic events. |
| `TRAFFIC_SESSION_START_IP_RATE_LIMIT_24_HOURS` | 120 format-valid `start_session` bootstrap requests per client-IP HMAC subject; this counts bootstrap requests, not traffic events. |
| `TRAFFIC_SESSION_START_GLOBAL_RATE_LIMIT_10_MINUTES` | 200 format-valid `start_session` bootstrap requests across the site; this counts bootstrap requests, not traffic events. |
| `TRAFFIC_SESSION_START_GLOBAL_RATE_LIMIT_24_HOURS` | 2000 format-valid `start_session` bootstrap requests across the site; this counts bootstrap requests, not traffic events. |
| `TRAFFIC_SESSION_RATE_LIMIT_10_MINUTES` | Approved initial value 30 accepted events. |
| `TRAFFIC_SESSION_RATE_LIMIT_24_HOURS` | Approved initial value 120 accepted events. |
| `TRAFFIC_IP_RATE_LIMIT_10_MINUTES` | Approved initial value 60 accepted events. |
| `TRAFFIC_IP_RATE_LIMIT_24_HOURS` | Approved initial value 300 accepted events. |
| `TRAFFIC_GLOBAL_RATE_LIMIT_10_MINUTES` | Approved initial value 200 accepted events. |
| `TRAFFIC_GLOBAL_RATE_LIMIT_24_HOURS` | Approved initial value 2000 accepted events. |
| `ADMIN_TRAFFIC_API_ENABLED` | Independent Admin traffic read kill switch; missing or false keeps only `admin-traffic` disabled. It never overrides the separate `ADMIN_API_ENABLED` master gate. This runbook does not authorize setting it true. |

The private Admin endpoint requires both `ADMIN_API_ENABLED=true` and
`ADMIN_TRAFFIC_API_ENABLED=true` before it can read its fixed aggregate RPC.
It also retains the normal JWT gateway, handler-side Auth verification, aal2,
UUID allow-list and exact-Origin controls. The global Admin master switch may
be enabled only under `docs/admin-insights-deployment.md`; this traffic runbook
must not enable it as a shortcut for testing.

Store secrets through the Supabase dashboard or `supabase secrets set
--env-file <protected-path> --project-ref <project-ref>`. The protected env
file must be outside the repository, excluded from backups and shell history,
permission-restricted and removed through the organization's secure-file
procedure after read-back. Never put secret values directly in a copied CLI
command, pull request, ticket or release evidence.

## Preflight

Run from the exact release SHA with a clean working tree:

```bash
git status --short
git rev-parse HEAD
npm ci
npm run test:traffic-ops
npm run test:inquiry
npx tsc --noEmit
npm audit --omit=dev
```

Link staging deliberately and read back the target before any write:

```bash
supabase link --project-ref <staging-project-ref>
supabase projects list
supabase migration list --linked
supabase db push --dry-run
```

Stop if the linked project, pending migration set or migration ledger differs
from the reviewed evidence. Do not mark a migration as applied merely to make
the lists agree.

The traffic release depends on the inquiry tables and RPCs created by earlier
migrations. The traffic-specific sequence in this repository is:

1. `202607310001_homeground_traffic_attribution.sql`;
2. `202607310002_homeground_admin_traffic_read_model.sql`;
3. `202607310003_homeground_atomic_inquiry_attribution.sql`;
4. `202608230001_homeground_traffic_operations_hardening.sql`.

`supabase db push` applies every pending migration in timestamp order; it is
not permission to cherry-pick these files around other pending migrations.
Migration 002 does not authorize the private Admin traffic API: keep
`ADMIN_TRAFFIC_API_ENABLED=false` unless its separate release gates pass.

## Staging deployment

1. Confirm the public repository switch is false or unset.
2. Set the staging server configuration, with
   `TRAFFIC_EVENTS_ENABLED=false`, and read back only secret names/status—not
   values.
3. Apply the reviewed migration set:

   ```bash
   supabase db push
   supabase migration list --linked
   ```

   Confirm the hardening migration's credential-bootstrap limiter RPC exists
   before deploying the matching collector revision:

   ```sql
   select to_regprocedure(
     'public.consume_homeground_traffic_session_start_rate_limit_v1(text,text,integer,integer,integer,integer)'
   ) is not null as bootstrap_limit_rpc_ready;
   ```

   The result must be true. Deploying the new Edge revision before migration
   `202608230001_homeground_traffic_operations_hardening.sql` would make every
   valid `start_session` fail with `503 persistence_unavailable`.

4. Deploy the public collector while the server gate is false. It intentionally
   has no browser JWT. Exact Origin supplies a browser CORS boundary only; a
   non-browser caller can forge it, so it is not authentication. The real
   application controls are the default-off switch, bounded schema, bootstrap
   IP/global limits, short-lived signed credential, HMAC subjects and separate
   session/IP/global event limits:

   ```bash
   supabase functions deploy v1-traffic-events \
     --project-ref <staging-project-ref> --no-verify-jwt
   ```

5. Keep `ADMIN_TRAFFIC_API_ENABLED=false` and deploy the companion private
   endpoint with its normal JWT gateway. **Never** pass `--no-verify-jwt` to
   this command:

   ```bash
   supabase functions deploy admin-traffic \
     --project-ref <staging-project-ref>
   ```

   In staging where the separate Admin master gate is already approved and
   enabled, an exact-Origin, allow-listed aal2 administrator must receive
   `503 traffic_disabled`. No traffic RPC may run. If the master Admin release
   is not approved, keep `ADMIN_API_ENABLED=false`, record the independent-gate
   authenticated check as blocked and do not enable it for this test.
6. Migration 003 changes the atomic inquiry-attribution RPC contract. Deploy
   the matching `v1-inquiries` revision only through the Inquiry runbook and
   repeat its saved-reference and monitored-inbox canary. Traffic attribution
   is optional and must never make an Inquiry fail.
7. With the correct allowed Origin, a POST while disabled must return
   `503 collection_paused`; a wrong or missing Origin must return 403 and no
   usable CORS header. A minimal disabled probe must not contain visitor data:

   ```bash
   curl -i -X POST '<staging-traffic-url>' \
     -H 'Origin: https://<staging-origin>' \
     -H 'Content-Type: application/json' \
     --data '{}'
   ```

8. Set only the server switch to exact `true`. Repeat the same empty-body probe;
   it must now return `422 validation_failed`, proving that the contract gate is
   reached without creating a session or event.
9. Use a dedicated staging browser and a synthetic UUID—not a customer session—
   to test `start_session`, one controlled `page_view`, exact replay and an
   Event-ID payload conflict. Verify 201 session-ready, 202 created, 200 replay
   and 409 conflict respectively. Inspect request URL/body and the aggregate
   database result; do not paste the temporary credential into evidence.
10. Verify refusal produces no request, withdrawal stops requests, and re-grant
   creates at most the approved current-page event. Clear the staging browser
   state when complete.
11. Run the cron and retention checks below. Leave the public switch false
    until all staging evidence is approved.

This staging sequence deploys `admin-traffic` only to prove its disabled
posture. Do not set `ADMIN_TRAFFIC_API_ENABLED=true` unless the private Admin
traffic product has passed its own privacy, authorization, suppression,
security-header and operational gates.

## Cron inventory and verification

The migrations own four database jobs:

| Job | Schedule in database cron timezone | Command | Purpose |
|---|---|---|---|
| `homeground-purge-traffic-rate-limit-buckets` | `* * * * *` | `select homeground_private.purge_expired_traffic_rate_limit_buckets_v1();` | Remove rate-limit buckets older than 24 hours. |
| `homeground-purge-traffic-hourly` | `17 * * * *` | `select homeground_private.purge_expired_homeground_traffic_v1();` | Clear 30-day inquiry/session associations, events and sessions. |
| `homeground-resolve-inquiry-traffic-attribution` | `* * * * *` | `select homeground_private.process_pending_inquiry_traffic_attribution_v1(100);` | Resolve bounded pending inquiry-attribution jobs, up to 100 per run. |
| `homeground-purge-inquiry-traffic-attribution-outbox` | `10 19 * * *` | `select homeground_private.purge_expired_inquiry_traffic_outbox_v1();` | Expire pending jobs and clear resolved session associations after 30 days. |

Do not assume the scheduler uses an operator's local timezone. Read the
database timezone before translating a schedule:

```sql
select current_setting('TimeZone') as database_timezone,
       current_setting('cron.timezone', true) as cron_timezone;
```

Read back exact job definitions and activation state:

```sql
select jobname, schedule, command, active
from cron.job
where jobname in (
  'homeground-purge-traffic-rate-limit-buckets',
  'homeground-purge-traffic-hourly',
  'homeground-resolve-inquiry-traffic-attribution',
  'homeground-purge-inquiry-traffic-attribution-outbox'
)
order by jobname;
```

Inspect recent outcomes without selecting traffic rows:

```sql
select j.jobname, r.status, r.start_time, r.end_time, r.return_message
from cron.job_run_details as r
join cron.job as j on j.jobid = r.jobid
where j.jobname in (
  'homeground-purge-traffic-rate-limit-buckets',
  'homeground-purge-traffic-hourly',
  'homeground-resolve-inquiry-traffic-attribution',
  'homeground-purge-inquiry-traffic-attribution-outbox'
)
order by r.start_time desc
limit 40;
```

Read the bounded attribution queue health as the database owner or an approved
service-only operator:

```sql
select public.get_homeground_traffic_attribution_health_v1();
```

The health result must not be called from a public browser. Investigate any
`overduePending`, increasing `internalErrors`, old `oldestPendingAt` or repeated
cron failure before activation. Confirm retention with aggregate counts only:

```sql
select
  (select count(*) from homeground_private.traffic_events
    where received_at <= clock_timestamp() - interval '30 days')
      as expired_events,
  (select count(*) from homeground_private.traffic_sessions
    where first_seen_at <= clock_timestamp() - interval '30 days')
      as expired_sessions,
  (select count(*) from homeground_private.traffic_rate_limit_buckets
    where updated_at <= clock_timestamp() - interval '24 hours')
      as expired_rate_buckets,
  (select count(*) from homeground_private.inquiry_traffic_attribution
    where session_hash is not null
      and linked_at <= clock_timestamp() - interval '30 days')
      as expired_inquiry_session_links;
```

All four values should return to zero after the relevant successful jobs. A
temporary non-zero value before the next scheduled run is not itself a failure;
record the next run and verify convergence.

## Production release order

Repeat the staging process against a newly verified production project; do not
reuse a terminal that is still linked to staging without reading the target
back.

1. Record release SHA, operator, project reference, backup/PITR evidence,
   approved notice version, rollback owner and observation window.
2. Keep `TRAFFIC_EVENTS_ENABLED=false` and the public repository switch false.
3. Apply migrations, read back their ledger and verify all four cron jobs.
4. Deploy `v1-traffic-events` and, under the Inquiry runbook, the matching
   `v1-inquiries`; pass disabled and existing Inquiry regression checks.
5. Keep `ADMIN_TRAFFIC_API_ENABLED=false` and deploy `admin-traffic` with the
   normal JWT gateway:

   ```bash
   supabase functions deploy admin-traffic \
     --project-ref <production-project-ref>
   ```

   Never use `--no-verify-jwt`. Where the separately approved Admin master is
   active, an allow-listed aal2 administrator must receive
   `503 traffic_disabled`, with no traffic RPC. This release does not authorize
   changing the independent switch to true.
6. Set `NEXT_PUBLIC_HOMEGROUND_WEB_EVENTS_URL` to the exact production Edge URL.
   Leave GA4 and Meta variables unset for a first-party-only release.
7. Set the server switch true and run the non-persisting malformed-body probe.
8. Set `NEXT_PUBLIC_HOMEGROUND_ANALYTICS_ENABLED=true`, build and deploy the
   exact approved SHA. Confirm the exported bundle contains the expected public
   endpoint and no server secret.
9. In a fresh browser, verify no request before consent, one synthetic event
   after consent, no request after withdrawal and a bounded re-grant. Confirm
   aggregate persistence and cron health without exposing a token or raw row.
10. Observe endpoint status mix, aggregate accepted/replayed/rate-limited counts,
   attribution queue health and cron outcomes for the approved window. Do not
   describe an HTTP acceptance as a lead, inquiry or sale.

## Rollback and emergency pause

Use the narrowest reversible control and preserve evidence:

1. Before reverting or redeploying `admin-traffic`, set
   `ADMIN_TRAFFIC_API_ENABLED=false` and have an authorized, allow-listed aal2
   administrator confirm `503 traffic_disabled`. Redeploy the last known-good
   `admin-traffic` revision only with its normal JWT gateway. Do not disable the
   global Admin API unless the broader Admin incident procedure requires it.
2. Set `TRAFFIC_EVENTS_ENABLED=false` before any collector Edge rollback. Read
   back the setting and confirm an allowed-origin POST returns
   `503 collection_paused` before parsing.
3. Set the public repository switch false and deploy a new static build so new
   page loads stop attempting collection. Existing tabs may continue calling
   the endpoint, but the server gate must reject them.
4. If the regression is in the collector Edge revision, redeploy the last known-good
   function only while the server gate remains false. Repeat wrong-origin,
   disabled and contract checks before considering reactivation.
5. If a migration is implicated, do not run `db reset`, delete tables, truncate
   data or invent a down migration during the incident. Keep collection paused,
   preserve the database and logs, and use a separately reviewed forward repair
   or recovery plan.
6. If Inquiry intake was changed in the same release, follow
   `docs/inquiry-deployment.md`. Traffic failure must not cause deletion or
   rollback of a successfully saved Inquiry.
7. Rotate credentials only when exposure is plausible or rotation was already
   approved. Routine availability rollback does not require secret rotation.

Record the first failing signal, pause time, endpoint response, affected SHA,
last successful cron runs and recovery decision. Never attach raw event rows,
session credentials, browser tokens, IP addresses or secrets.

## Secret rotation

There is no dual-key overlap or hash-key-version migration in the current
runtime. Every traffic-secret rotation is therefore a planned, fail-closed
maintenance window.

1. Set the server switch false and verify `collection_paused`.
2. Set the public switch false and deploy it when the window is not strictly an
   emergency. Wait for the agreed static-cache/browser overlap window.
3. Generate independent high-entropy replacement values in the approved secret
   manager. Compare secret identifiers/fingerprints there; never print values.
4. Update all functions that read the shared project environment. In
   particular, `TRAFFIC_SESSION_HASH_SECRET` must be the same new value for
   `v1-traffic-events` and `v1-inquiries`.
5. Redeploy the affected functions while disabled and repeat negative tests.
6. Reactivate the server, run one staging-style synthetic session/event check,
   then reactivate and deploy the frontend.
7. Revoke/delete old values in the secret manager only after read-back and the
   approved rollback window. Record secret version identifiers, not values.

Expected consequences must be accepted before rotation:

| Secret | Rotation consequence |
|---|---|
| Session hash | Existing raw browser tokens hash differently; association continuity with pre-rotation session rows is lost. There is no v1/v2 overlap. |
| Rate-limit hash | Existing buckets no longer match new subjects, effectively resetting counters; monitor the first full 24-hour window. |
| Session credential | All outstanding credentials become invalid; an in-flight event may receive 401 and a later event must bootstrap a new credential. |
| Attribution link signing | Previously signed campaign links become Unknown until regenerated; inventory and replace approved links before reactivation. |

Do not rotate the four values as an undifferentiated bundle unless the impact
of every row above has been approved. Never reuse an Inquiry idempotency,
notification, Admin, Supabase or provider credential as a traffic secret.

## Release evidence template

Store the following without visitor data or credentials:

- environment, canonical Origin, release SHA and UTC timestamps;
- Supabase project reference and migration ledger read-back;
- names/status of configured variables and secret version identifiers;
- `ADMIN_TRAFFIC_API_ENABLED=false`, normal-JWT deployment evidence and the
  authorized `traffic_disabled` result where the Admin master is approved;
- disabled response, wrong-origin response and enabled validation response;
- synthetic event IDs and controlled expected outcomes only;
- aggregate before/after counts and attribution queue health;
- four cron definitions and recent success timestamps;
- frontend consent network matrix and exported-bundle secret scan;
- activation, observation and rollback owners;
- final decision: `HOLD`, `STAGING ONLY` or `PRODUCTION ACTIVE`.

Passing repository tests proves configuration contracts in source. It does not
prove that a remote environment, secret, cron job, consent runtime or production
deployment matches those contracts; remote read-back remains mandatory.
