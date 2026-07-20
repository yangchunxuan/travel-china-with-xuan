# Homeground Inquiry backend deployment

Status: the production Supabase functions, private schema, Resend notification
path and 24-hour rate-limit cleanup are deployed for the `2026-07-20.1`
contact release. The optional-budget `2026-07-20.2` release must follow the
additive migration and overlapping rollout below before its static frontend is
published.

Current production configuration:

- Supabase project region: Seoul (`ap-northeast-2`).
- Resend notification region: Tokyo (`ap-northeast-1`).
- Monitored notification inbox: `yangchunxuan1@gmail.com`.
- Target frontend Privacy Notice version: `2026-07-20.2`.
- Transition form allow-list:
  `ALLOWED_FORM_VERSIONS=2026-07-18.1,2026-07-19.1,2026-07-20.1,2026-07-20.2`.
- Transition Privacy Notice allow-list:
  `ALLOWED_PRIVACY_NOTICE_VERSIONS=2026-07-19.1,2026-07-20.1,2026-07-20.2`.
  Keep the old versions accepted while the new static build and any in-flight
  retry are being verified.
- WhatsApp intake uses the same saved-enquiry path as Email and is controlled
  by independent frontend and server switches.
- A traveller may optionally submit a rough per-person budget for the China
  portion of the trip, excluding international flights. It is saved and shown
  to staff as traveller context, never as a Homeground quote.
- Gmail and WhatsApp are connected to SaleSmartly for the current studio
  workflow. A Gmail notification containing the optional budget may therefore
  be copied into that project; SaleSmartly access and retention must follow the
  controls below.
- Non-essential analytics and AI chat remain disabled.

The main website remains a GitHub Pages-compatible static export. Inquiry data
is handled by separate Supabase Edge Functions and private Postgres tables.

The independent outbox monitor added in this revision exists only as source
until migration `202607190001`, the `inquiry-health` function, matching
Edge/GitHub copies of `OUTBOX_MONITOR_SECRET` and the GitHub repository
variable are configured. Do not treat the workflow file alone as production
monitoring.

## What is included

- `supabase/functions/v1-inquiries`: public `POST` / `OPTIONS` handler.
- `supabase/functions/notify-inquiries`: authenticated outbox worker using
  Resend.
- `supabase/functions/inquiry-health`: read-only, independently authenticated
  aggregate outbox health endpoint.
- `supabase/migrations/202607180001_homeground_inquiries.sql`: private
  `inquiries`, `notification_outbox`, hashed rate-limit buckets, transaction
  RPCs, and deny-by-default RLS.
- `supabase/migrations/202607180002_homeground_notification_schedule.sql`:
  fail-closed Supabase Vault + `pg_cron` + `pg_net` worker schedule.
- `supabase/migrations/202607180003_homeground_rate_limit_retention.sql`:
  one-minute recurring deletion of secret-keyed rate-limit buckets after their
  24-hour window expires.
- `supabase/migrations/202607190001_homeground_outbox_health.sql`: service-role
  RPC returning only pending, processing, failed and stale outbox counts.
- `supabase/migrations/202607200001_homeground_contact_intake.sql`: optional
  departure-country storage plus versioned create/claim RPCs for saved
  WhatsApp enquiries.
- `supabase/migrations/202607200002_homeground_budget_intake.sql`: nullable
  rough-budget storage plus `create_homeground_destination_inquiry_v3` and
  `claim_homeground_notification_jobs_v3`, while keeping both older destination
  RPC generations available during static-page rollout.
- `.github/workflows/inquiry-health.yml`: independent 15-minute health check;
  an unhealthy outbox makes the workflow fail without using Resend.
- `lib/inquiryContract.ts`: runtime-neutral input validation,
  canonicalization, current route recomputation, and route-version checks.
- `tools/mock-inquiry-api.mjs`: local-only, in-memory API for browser E2E.

The public function does not send email itself. A successful response means
the Inquiry and its outbox row committed in the same database transaction.
Notification delivery is asynchronous and cannot delete or invalidate a saved
Inquiry.

## Required environment

No production inbox, project identifier, password or key is embedded in the
application bundle as a secret. Set only public launch switches and URLs
through repository variables; set private credentials only as server-side
Edge Function secrets. The studio WhatsApp number is not embedded in the
frontend. Never store a Gmail or WhatsApp password here.

### Static frontend build

The GitHub Pages workflow maps the public `NEXT_PUBLIC_HOMEGROUND_*` values
from GitHub Actions **repository variables** into `npm run build`. Configure
the values listed in `.env.example` under the repository's
Settings → Secrets and variables → Actions → Variables. They are public
build-time configuration, never Edge Function secrets.

Keep `NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED`,
`NEXT_PUBLIC_HOMEGROUND_PRIVACY_READY` and
`NEXT_PUBLIC_HOMEGROUND_WHATSAPP_INTAKE_ENABLED` `false` until their matching
acceptance checks are complete. The Email form remains disabled when any
required URL, notice, monitored inbox or localized reply commitment is absent.
`NEXT_PUBLIC_HOMEGROUND_BRAND_EMAIL` must reach the same monitored inbox as
`BRAND_NOTIFICATION_EMAIL`; this keeps the API notification and
`[Homeground][Fallback]` mailto path in one Email queue.

Set this WhatsApp intake repository variable only after the saved-enquiry and
staff reply test passes:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_HOMEGROUND_WHATSAPP_INTAKE_ENABLED` | Public build-time switch that reveals the explicit Email/WhatsApp reply-method choice; default `false` |

The server-only `WHATSAPP_ENABLED` variable below independently authorises
phone-number submission at the API. Both switches must be true for the channel
to work.

Repository-variable changes do not alter the already published static files.
After changing the WhatsApp intake variable, run the
`Deploy to GitHub Pages` workflow again (or push the intended commit to
`main`) and verify the resulting production page. A variable edit without a
new successful deployment has no effect on the website.

### Public `v1-inquiries` function

| Variable | Purpose |
|---|---|
| `SUPABASE_URL` | Project URL; normally injected by Supabase |
| `SUPABASE_SECRET_KEYS` | New server-only secret-key JSON dictionary, normally injected by Supabase; the function uses its `default` key |
| `SUPABASE_SERVICE_ROLE_KEY` | Legacy server-only fallback while Supabase still injects it; never expose either key type to the static site |
| `ALLOWED_ORIGINS` | Comma-separated exact origins, with no paths or wildcards |
| `ALLOWED_FORM_VERSIONS` | Accepted form versions |
| `ALLOWED_PRIVACY_NOTICE_VERSIONS` | Comma-separated accepted published Privacy Notice versions |
| `INQUIRY_ACCEPTING_SUBMISSIONS` | Emergency server-side intake switch; defaults to `true`. Set `false` to return `503 intake_paused` before reading a POST body |
| `WHATSAPP_ENABLED` | Server-side switch for saving a traveller-provided WhatsApp number; default `false` |
| `IDEMPOTENCY_HASH_SECRET` | High-entropy HMAC secret for idempotency-key storage |
| `RATE_LIMIT_HASH_SECRET` | Separate HMAC secret for ephemeral IP buckets |
| `RATE_LIMIT_10_MINUTES` | Optional; defaults to `5` |
| `RATE_LIMIT_24_HOURS` | Optional; defaults to `20` |
| `REPLY_SLA_HOURS` | Real public reply commitment; pilot default is `48` |

Production origins must use HTTPS. The handler accepts HTTP only for an
explicit `localhost` development origin.

`NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED` and
`INQUIRY_ACCEPTING_SUBMISSIONS` solve different problems. The public variable
controls what the next static-site deployment displays. The server variable
stops callers that already know the API URL, so it is the first switch to use
during malicious traffic or an Email delivery incident. After changing it,
verify the live endpoint returns the expected status; if the hosted worker has
not picked up the new secret, redeploy `v1-inquiries`.

### `notify-inquiries` worker

| Variable | Purpose |
|---|---|
| `SUPABASE_URL` | Project URL |
| `SUPABASE_SECRET_KEYS` | Preferred server-only RPC credential dictionary |
| `SUPABASE_SERVICE_ROLE_KEY` | Legacy server-only RPC fallback |
| `NOTIFICATION_WORKER_SECRET` | High-entropy scheduler authentication secret |
| `NOTIFICATION_PROCESSING_ENABLED` | Emergency worker switch; defaults to `true`. Set `false` to keep queued evidence without sending more Gmail notifications |
| `RESEND_API_KEY` | Server-only Resend API key |
| `RESEND_FROM_EMAIL` | Verified brand-domain sender |
| `BRAND_NOTIFICATION_EMAIL` | Monitored studio inbox; for the current pilot this may be the Gmail account the two-person team already checks |
| `NOTIFICATION_BATCH_SIZE` | Optional; defaults to `1` for the pilot, maximum `50` |
| `NOTIFICATION_LEASE_SECONDS` | Optional; defaults to `90` |
| `NOTIFICATION_PROVIDER_TIMEOUT_SECONDS` | Optional; defaults to `15`, must be shorter than the lease |

The worker sends a claimed batch sequentially. Configuration fails closed
unless the lease is longer than the worst-case batch provider time plus a
five-second per-job finishing allowance. Keep the pilot batch at `1`; increase
it only after measuring real provider and database latency.

### `inquiry-health` monitor

| Variable | Purpose |
|---|---|
| `SUPABASE_URL` | Project URL |
| `SUPABASE_SECRET_KEYS` | Preferred server-only RPC credential dictionary |
| `SUPABASE_SERVICE_ROLE_KEY` | Legacy server-only RPC fallback |
| `OUTBOX_MONITOR_SECRET` | High-entropy monitor authentication secret; it must differ from the notification worker secret and Resend key |
| `INQUIRY_ALERT_10_MINUTES` | Optional non-PII volume threshold; defaults to `10` |
| `INQUIRY_ALERT_1_HOUR` | Optional non-PII volume threshold; defaults to `30` |
| `INQUIRY_ALERT_24_HOURS` | Optional non-PII volume threshold; defaults to `100` |

The monitor accepts only `GET` with the `x-monitor-secret` header. It returns
aggregate outbox and rolling intake counts, never Inquiry IDs, routes, contact
details or notes. It returns HTTP `503` whenever a terminal failure exists, a
due pending job is more than five minutes late, an expired processing lease is
more than five minutes stale, a configured intake-volume threshold is reached,
or the health query itself is unavailable.

GitHub Actions needs:

- repository variable `OUTBOX_HEALTH_URL` set to
  `https://<project-ref>.supabase.co/functions/v1/inquiry-health`;
- Actions secret `OUTBOX_MONITOR_SECRET` set to the same independent value as
  the Edge Function secret.

Assign a technical owner and enable GitHub Actions failure notifications. The
scheduled workflow is the independent signal; it does not call Resend and
does not print the response body or secret.

The Resend message contains the public reference, language, route summary,
the route answers, selected contact, optional departure country, optional
traveller-stated rough budget, any legacy note and timestamps. The budget
label explicitly says that international flights are excluded and that the
value is traveller context, not a Homeground quote. It is not placed in the
message subject or a URL. For Email, the traveller address is the message
`Reply-To`. For WhatsApp, the notification contains a staff-side link to the
submitted number; the customer-facing website never creates a `wa.me` link.

Because Gmail and WhatsApp are connected to SaleSmartly, the notification and
later conversation—including a budget when the traveller provided one—may be
synchronised into the SaleSmartly project. Configure that project to retain
Homeground enquiry and conversation data for no more than 12 months after the
last substantive contact, unless a client relationship, legal duty, dispute or
security hold requires longer. Give each operator a separate member account,
grant only the channels and permissions needed for their work, require
two-factor authentication where supported, and never share the Gmail main
password. Review Google OAuth access, Gmail forwarding and filter rules,
SaleSmartly members, and WhatsApp linked devices regularly and after any
unfamiliar login.

The pilot has one saved-enquiry intake and two reply channels. Every Email or
WhatsApp submission creates an Inquiry and Gmail notification. Staff reply
from Gmail for Email enquiries and from the studio WhatsApp account for
WhatsApp enquiries. The database is the technical receipt record; Gmail or the
WhatsApp conversation is the human handling record. See
`docs/studio-inquiry-runbook.md`.

The published Privacy Notice names the configured providers and primary
regions, the monitored privacy contact, the optional departure and budget
fields, the 12-month enquiry rule, the 24-hour hashed rate-limit window and
scheduled-deletion rule, and the verified-request procedure. The WhatsApp
release must also explain that the submitted number is saved for this enquiry
and that Meta/WhatsApp handles the later conversation. The notice and the
studio's processor register must remain accurate for the active SaleSmartly
connection before the budget form is published.

Form and Privacy Notice versions must overlap during deployment so an already
open static page does not start receiving `unsupported_form_version`,
`unsupported_privacy_notice` or `whatsapp_disabled` while the new page is
rolling out:

1. Start a controlled maintenance window. Set
   `INQUIRY_ACCEPTING_SUBMISSIONS=false` and
   `NOTIFICATION_PROCESSING_ENABLED=false`, then verify a valid
   production-origin POST returns `503 intake_paused`. Keep the saved outbox
   intact; pausing the worker must not delete or manually retry jobs.
2. Wait for every invocation that started before the pause to finish. The wait
   must be at least the configured `NOTIFICATION_LEASE_SECONDS` plus the
   provider request timeout (the pilot lease defaults to 90 seconds). Confirm
   there is no job still in a live `processing` lease before changing the
   claim function. This removes the old-worker/new-row overlap window.
3. While intake remains paused, set the `v1-inquiries` secrets to
   `ALLOWED_FORM_VERSIONS=2026-07-18.1,2026-07-19.1,2026-07-20.1,2026-07-20.2`
   and
   `ALLOWED_PRIVACY_NOTICE_VERSIONS=2026-07-19.1,2026-07-20.1,2026-07-20.2`.
   Keep the current `WHATSAPP_ENABLED` state unchanged.
4. Deploy migration `202607200002`. It adds a nullable column and v3
   create/claim RPCs without removing the `2026-07-19.1` legacy RPC or the
   `2026-07-20.1` v2 RPC.
5. Deploy `notify-inquiries` first so every newly claimed job uses
   `claim_homeground_notification_jobs_v3` and includes the optional budget.
   Existing rows have `NULL` and remain valid. Keep
   `NOTIFICATION_PROCESSING_ENABLED=false` until the deployment is healthy.
6. Deploy `v1-inquiries` while intake is still paused. Confirm its explicit
   routing:
   `2026-07-19.1` → legacy destination RPC,
   `2026-07-20.1` → v2 RPC, and
   `2026-07-20.2` → v3 RPC. Do not collapse these to a current/old two-way
   branch; that could silently discard departure or budget data.
7. Restore `NOTIFICATION_PROCESSING_ENABLED=true`, verify the outbox health
   endpoint, then restore `INQUIRY_ACCEPTING_SUBMISSIONS=true`. Before changing
   the static site, submit Email and WhatsApp QA requests from
   the currently published `2026-07-20.1` page. Confirm both are still saved,
   notified to Gmail once and replyable.
8. Publish the English, Chinese and Korean Privacy Notice and form carrying
   `2026-07-20.2` in the same successful GitHub Pages deployment.
9. Submit a `2026-07-20.2` Email request with a budget, a WhatsApp request with
   a budget, and one request with the budget blank. Confirm the exact value or
   “Not provided” reaches Gmail, the notification calls it traveller context
   rather than a quote, Reply-To/WhatsApp routing still works, and SaleSmartly
   receives only the data its authorised project members should see.
10. Verify that an older form carrying the new budget field is rejected rather
   than accepted and silently stored without the value. Also confirm a changed
   budget under the same idempotency key returns `409`.
11. Keep `2026-07-20.1` and its Privacy Notice accepted until the static cache
   and browser retry window is over. Remove older values only after production
   logs show they are no longer needed; do not remove the legacy route version
   merely because the budget rollout succeeded.

Never remove an old version before the new static build is live. Keep
`NEXT_PUBLIC_HOMEGROUND_PRIVACY_READY=false` for a release whose notice,
storage, notification, SaleSmartly handling and real English, Chinese and
Korean acceptance checks have not all passed.

## Local validation

Run the pure contract, static security, and mock E2E tests:

```bash
npm run test:inquiry
```

Run the development-only mock:

```bash
npm run dev:inquiry-api
```

Defaults:

```text
http://127.0.0.1:8787/v1/inquiries
allowed browser origins:
  http://localhost:3000
  http://127.0.0.1:3000
  http://localhost:3001
  http://127.0.0.1:3001
privacy notice version:
  2026-07-20.2
saved-phone API WhatsApp:
  disabled
public frontend WhatsApp choice:
  disabled
```

Override these only with `MOCK_INQUIRY_*` environment variables. The mock is
in-memory, resets on restart, and must never be used as a production fallback.
If the production API URL is absent, the frontend must show the handoff as
disabled or use the approved non-persistence fallback; it must never silently
substitute the mock or display success.

## Supabase deployment and updates

Install and authenticate the Supabase CLI outside this repository, then link a
target project. Use a separate staging project when one is available; verify
the linked project reference before any production push:

```bash
supabase login
supabase link --project-ref <project-ref>
supabase db push
```

Set secrets with values for the linked environment. Do not commit an env file:

```bash
supabase secrets set --env-file <secure-staging-env-file>
```

Do not include `SUPABASE_URL`, `SUPABASE_SECRET_KEYS` or
`SUPABASE_SERVICE_ROLE_KEY` in that hosted secrets file. Supabase injects
those defaults. The runtime prefers the `default` entry in
`SUPABASE_SECRET_KEYS` and uses the legacy service-role key only when the new
dictionary is absent. New opaque secret keys are sent only in the `apikey`
header; the legacy JWT additionally uses `Authorization: Bearer`.

Deploy all three functions:

```bash
supabase functions deploy v1-inquiries --no-verify-jwt
supabase functions deploy notify-inquiries --no-verify-jwt
supabase functions deploy inquiry-health --no-verify-jwt
```

The native public URL is:

```text
https://<project-ref>.supabase.co/functions/v1/v1-inquiries
```

To expose the Spec URL, configure the production API gateway or custom domain
to proxy:

```text
POST /v1/inquiries
  → /functions/v1/v1-inquiries
OPTIONS /v1/inquiries
  → /functions/v1/v1-inquiries
```

Do not proxy any public `GET` Inquiry route.

## Notification schedule

The second migration installs a one-minute `pg_cron`/`pg_net` schedule but
does not activate it during migration. Activation fails closed until two
named Vault secrets exist. In the Supabase SQL editor, create them with the
same worker secret that was set on the Edge Function:

```sql
select vault.create_secret(
  'https://<project-ref>.supabase.co/functions/v1/notify-inquiries',
  'homeground_notification_worker_url',
  'Homeground notification worker URL'
);

select vault.create_secret(
  '<same-high-entropy-NOTIFICATION_WORKER_SECRET>',
  'homeground_notification_worker_secret',
  'Homeground notification worker authentication'
);

select homeground_private.configure_notification_schedule();
```

Do not put real values in a migration, shell history, browser bundle or
repository. If a named Vault secret already exists, update that secret rather
than creating another row. The cron command stores only a call to the private
dispatcher; the URL and header secret are read from Vault at invocation time.

Confirm the schedule exists:

```sql
select jobid, schedule, active
from cron.job
where jobname = 'homeground-notify-inquiries-every-minute';
```

One direct command verifies authentication, worker execution and its
machine-readable delivery summary without waiting for cron:

```bash
curl --fail-with-body --request POST \
  "$SUPABASE_URL/functions/v1/notify-inquiries" \
  --header "x-worker-secret: $NOTIFICATION_WORKER_SECRET"
```

The worker validates all required Resend/inbox configuration before
claiming any outbox row. Missing configuration therefore returns `503` and
leaves due rows pending instead of consuming retry attempts.

The worker atomically claims due rows with `FOR UPDATE SKIP LOCKED`, issues a
new lease token/version, and uses the Inquiry ID as the Resend idempotency key.
A stale worker cannot overwrite a reclaimed job. Retry intervals are one
minute, five minutes, thirty minutes, and two hours before terminal failure.

## Independent outbox health check

After migration `202607190001` and the `inquiry-health` function are deployed,
verify the endpoint without printing its response:

```bash
curl --fail --silent --show-error \
  --output /dev/null \
  --header "x-monitor-secret: $OUTBOX_MONITOR_SECRET" \
  "$OUTBOX_HEALTH_URL"
```

Run `.github/workflows/inquiry-health.yml` once with `workflow_dispatch`, then
confirm its 15-minute scheduled run is green. A `401` means the GitHub and
Edge secrets do not match; `503` means the monitor is unconfigured,
unavailable, or has detected a failed/stale outbox job. The daily manual
aggregate query and response actions are in `docs/studio-inquiry-runbook.md`.

## Database security

- All PII tables are in `homeground_private`.
- RLS is enabled and forced.
- `public`, `anon`, and `authenticated` have no direct table access.
- Only the service role can execute the public persistence/outbox RPCs.
- The static client receives no Supabase key.
- Raw IP addresses are never persisted; only a secret HMAC enters short-lived
  rate-limit buckets.
- Supabase's gateway `X-Forwarded-For` value supplies the normal client
  subject. If that header and the fallback platform header are both absent,
  requests share one conservative rate-limit bucket instead of bypassing the
  limit.
- Request bodies and provider error bodies are not logged.
- `public_reference` contains 60 random bits and grants no record access.
- The outbox claim exposes PII only to the service-role worker. The worker does
  not log request bodies, contacts, budgets, notes or provider response bodies.
- The rough budget is rendered only in the escaped Gmail body. It is not put
  into the subject, Reply-To, WhatsApp URL, monitor response or application
  logs.
- SaleSmartly operators use individual accounts and least privilege; the Gmail
  password is not an integration credential and is never shared.

The migration intentionally does not grant studio operators direct table
access and does not expose claim/reply mutations. Operators work in the
monitored inbox. The technical owner handles verified privacy requests and
the 12-month enquiry review; migration `202607180003` separately purges
expired hashed rate-limit buckets every minute.

Confirm the rate-limit retention job after applying the latest migrations:

```sql
select jobid, schedule, active
from cron.job
where jobname = 'homeground-purge-rate-limit-buckets';
```

## Launch acceptance

Before enabling the public form:

1. Verify invalid Origin, method, content type, UUID, unknown fields, oversized
   bodies, forged route IDs, and unsupported rule versions are rejected.
2. Submit the same payload/key twice and confirm one Inquiry and one outbox
   row; submit a changed payload with that key and confirm `409`.
3. Force a Resend failure and confirm the Inquiry still returns success, the
   outbox retries, then restore Resend and confirm exactly one real message
   reaches the monitored inbox with the expected contact, optional departure,
   optional rough budget, any legacy note and `Reply-To`.
4. Confirm every enabled locale preserves ordinary Unicode through Postgres,
   while multiline input, over-100-character budget text, bidirectional
   controls and Unicode line separators are rejected.
5. Confirm WhatsApp submissions stay unavailable while server-only
   `WHATSAPP_ENABLED` is unset or `false`, and Email remains usable.
6. Inspect Edge logs and verify they contain no email, phone, budget, note,
   request body, or provider response body.
7. Perform a real monitored-inbox delivery test.
8. Confirm the technical owner can see pending/failed outbox counts with the
   runbook query and knows when to retry or disable the public form.
9. Confirm a staging request arrives with a gateway-provided
   `X-Forwarded-For` value, and confirm a request with neither supported IP
   header is still rate-limited through the shared fail-closed bucket.
10. Open the website's email fallback and confirm its
    `[Homeground][Fallback]` subject receives the `Homeground inquiries`
    label in the same monitored inbox as API notifications.
11. Run the `Inquiry outbox health` workflow manually, confirm it is green,
    then force a staging terminal/stale outbox count and confirm the workflow
    fails without sending through Resend.
12. With `NEXT_PUBLIC_HOMEGROUND_WHATSAPP_INTAKE_ENABLED=false`, confirm the
    WhatsApp switch is absent and the Email path remains usable.
13. Before enabling WhatsApp publicly, submit from each locale using an
    external number. Confirm one Inquiry/outbox row and one Gmail notification,
    then use the staff-side link to start the correct studio WhatsApp
    conversation.
14. Confirm all three destination generations still route to their matching
    legacy, v2 and v3 RPCs during the overlap window.
15. Submit the current form once with a traveller-stated budget and once
    without one. Confirm Gmail displays the preserved currency/range or
    “Not provided”, excludes the value from the subject and states that it is
    not a Homeground quote.
16. Confirm the connected SaleSmartly project has separate least-privilege
    members, two-factor authentication where supported, no shared Gmail main
    password, no unexpected OAuth access or forwarding rule, and a Homeground
    project retention setting of no more than 12 months.

## Rollback

Disabling the frontend form does not remove the API or saved records. During a
frontend rollback, keep the API available for same-key retries and keep the
outbox worker running. During a database, provider, or privacy incident, stop
new public POSTs and pause the worker, preserve records and audit evidence, and
rotate affected credentials. Do not rotate `IDEMPOTENCY_HASH_SECRET` as a
routine rollback step: changing it during the browser retry window can turn
the same retry key into a second Inquiry. Treat that secret as a controlled
data migration with an explicit retry-window plan. Never delete saved
Inquiries as a rollback shortcut.

If the budget release must be rolled back, republish the `2026-07-20.1`
frontend but leave the nullable budget column, v3 RPC, v3 claim worker and
`2026-07-20.2` allow-list entries available for saved requests and retries.
Do not roll the notification worker back to v2 while a v3 enquiry may still be
pending, because the older claim shape cannot include its budget in Gmail.

If WhatsApp has a number, device, staffing or delivery problem, first set
server-only `WHATSAPP_ENABLED=false`, then set repository variable
`NEXT_PUBLIC_HOMEGROUND_WHATSAPP_INTAKE_ENABLED=false` and run a new GitHub
Pages deployment. Keep the Email API, database and outbox running. Remove the
Facebook Page WhatsApp action button until the same external-account receipt
test passes again.
