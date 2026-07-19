# Homeground Inquiry backend deployment

Status: the production Supabase functions, private schema, Resend notification
path and 24-hour rate-limit cleanup are deployed. Real English, Chinese and
Korean receipt tests passed, so the public frontend switches are enabled for
the production website release.

Current production configuration:

- Supabase project region: Seoul (`ap-northeast-2`).
- Resend notification region: Tokyo (`ap-northeast-1`).
- Monitored notification inbox: `yangchunxuan1@gmail.com`.
- Frontend Privacy Notice version in this release: `2026-07-19.1`.
- Transition allow-list:
  `ALLOWED_PRIVACY_NOTICE_VERSIONS=2026-07-18.2,2026-07-19.1`. Keep both
  versions accepted while the new static build and any in-flight retry are
  being verified.
- Saved-phone WhatsApp intake and non-essential analytics: disabled.
- Direct WhatsApp is a separate public frontend link. Keep it disabled until
  the updated Privacy Notice is accepted and a real external-account test has
  reached the studio WhatsApp Business inbox.

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
application bundle as a secret. Set production addresses and the public
WhatsApp Business number through repository variables; set private credentials
only as server-side Edge Function secrets. The WhatsApp number is public
build-time configuration. Never store a Gmail or WhatsApp password here.

### Static frontend build

The GitHub Pages workflow maps the public `NEXT_PUBLIC_HOMEGROUND_*` values
from GitHub Actions **repository variables** into `npm run build`. Configure
the values listed in `.env.example` under the repository's
Settings → Secrets and variables → Actions → Variables. They are public
build-time configuration, never Edge Function secrets.

Keep `NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED`,
`NEXT_PUBLIC_HOMEGROUND_PRIVACY_READY` and
`NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED` `false` until their matching
acceptance checks are complete. The Email form remains disabled when any
required URL, notice, monitored inbox or localized reply commitment is absent.
`NEXT_PUBLIC_HOMEGROUND_BRAND_EMAIL` must reach the same monitored inbox as
`BRAND_NOTIFICATION_EMAIL`; this keeps the API notification and
`[Homeground][Fallback]` mailto path in one Email queue.

Set these direct-chat repository variables only after the external WhatsApp
test passes:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED` | Public build-time switch for the customer-initiated `wa.me` link; default `false` |
| `NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER` | Studio WhatsApp Business number as international digits only, for example `8613174215999` |

The server-only `WHATSAPP_ENABLED` variable below is a different, legacy
saved-phone intake switch and remains `false`; changing the public direct-chat
variables must not change it.

Repository-variable changes do not alter the already published static files.
After adding, changing or disabling either direct-chat variable, run the
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
| `WHATSAPP_ENABLED` | Legacy API mode that saves a traveller-provided WhatsApp number; keep `false` for the direct-chat release |
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
the four route answers, traveller email, note and timestamps. The traveller
address is also the message `Reply-To`, so the studio operator can click Reply
in the monitored Gmail inbox and answer from that account.

Direct WhatsApp is deliberately outside this pipeline:

```text
customer opens the prefilled wa.me link
  → customer taps Send in WhatsApp
  → the message appears in the studio WhatsApp Business inbox
```

Opening the link does not call `v1-inquiries`, write an Inquiry or outbox row,
or send a Resend/Gmail notification. It also cannot prove that the customer
tapped Send. Only a visible incoming message in WhatsApp Business is a
WhatsApp enquiry.

The pilot therefore has two human inboxes: Gmail for saved Email inquiries
and WhatsApp Business for customer-initiated direct conversations. The
database remains the technical record only for saved Email submissions and
outbox delivery. Gmail unread/sent/star state and WhatsApp unread/Follow up
state are the handling records; see `docs/studio-inquiry-runbook.md`.

The published Privacy Notice names the configured providers and primary
regions, the monitored privacy contact, the 12-month enquiry rule, the
24-hour hashed rate-limit window and scheduled-deletion rule, and the
verified-request procedure. A direct WhatsApp release also needs the notice
to explain that the customer leaves Homeground, that no WhatsApp number or
message is saved by the Homeground Email Inquiry API, and that Meta/WhatsApp
handles the conversation after the customer taps Send.

Privacy versions must overlap during deployment so the old static page does
not start receiving `unsupported_privacy_notice_version` while the new page
is rolling out:

1. Before publishing any new static page, set the `v1-inquiries` secret to
   `ALLOWED_PRIVACY_NOTICE_VERSIONS=2026-07-18.2,2026-07-19.1`. Redeploy the
   function only if required by the Supabase environment.
2. Confirm a request carrying the currently published `2026-07-18.2` version
   still succeeds.
3. Publish the English, Chinese and Korean Privacy Notice plus the Email form
   that carries `2026-07-19.1`. Keep
   `NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED=false` for this deployment.
4. Confirm a production Email enquiry carrying `2026-07-19.1` is saved,
   notified to Gmail and replyable.
5. Complete the external-account WhatsApp send/receive test. Only then set the
   verified public WhatsApp number and change the Direct WhatsApp flag to
   `true`; run another successful GitHub Pages deployment.
6. After the new build is live and the old build/retry window is over, remove
   `2026-07-18.2` from the server allow-list.

Never remove the old version before the new static build is live. Keep
`NEXT_PUBLIC_HOMEGROUND_PRIVACY_READY=false` until the corresponding data
flow, migration and real English, Chinese and Korean acceptance checks pass.

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
  2026-07-18.2
saved-phone API WhatsApp:
  disabled
direct frontend WhatsApp:
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
  not log request bodies, contacts, notes or provider response bodies.

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
   reaches the monitored inbox with the expected contact, note and `Reply-To`.
4. Confirm every enabled locale preserves Unicode through Postgres.
5. Confirm the legacy saved-phone API path stays unavailable while
   server-only `WHATSAPP_ENABLED` is unset or `false`.
6. Inspect Edge logs and verify they contain no email, phone, note, request
   body, or provider response body.
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
12. With `NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED=false`, confirm the
    direct option is absent and the Email path remains usable.
13. Before enabling direct WhatsApp, build with the exact public business
    number, open each locale from a mobile device and desktop, and use an
    external WhatsApp account to tap Send. Confirm the incoming message and
    route summary appear in the studio WhatsApp Business inbox. Confirm the
    click created no Inquiry/outbox row and no Gmail notification.

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

If only direct WhatsApp has a number, device, staffing or delivery problem,
set repository variable
`NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED=false` and run a new GitHub
Pages deployment. Do not change server-only `WHATSAPP_ENABLED`, the Email API,
the database or the outbox. Remove the Facebook Page WhatsApp action button
until the same external-account receipt test passes again.
