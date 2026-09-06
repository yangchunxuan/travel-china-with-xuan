# Newsletter subscription deployment

This is an independent email subscription workflow. The existing enquiry API,
enquiry statistics and enquiry notification worker are unchanged. No campaign
editor, campaign send endpoint, bulk export or automatic import of enquiry
addresses is included. Source and local tests do not establish live deployment
or real email receipt.

## Website presentation

The existing article product entry remains and still leads to the localized
homepage's `#travel-products` section. The newsletter is a separate, non-modal
80% opaque light-gray card with background blur, one email field, an adjacent
submit button and a 44-pixel close target. At 390×844 the initial English card
is about 201 pixels high; smaller screens may wrap the permission notice.
There is no page backdrop or automatic focus change, and reduced-motion and
reduced-transparency preferences are respected.

Only an explicit Cookie choice starts the 10-second countdown: both accepting
all and choosing necessary-only do so. Reading previously stored Cookie
preferences never starts it. The countdown follows same-tab navigation and
the automatic prompt appears at most once in that tab's visit. Menus, privacy
preferences, other dialogs, background tabs and typing elsewhere defer it.
The footer can reopen it deliberately. A successful pending request suppresses
later automatic prompts using a boolean browser preference, without saving
the email in browser storage. Cookie permission never grants email permission.

The display flag can be disabled independently of the configured API endpoint:
existing confirmation and withdrawal pages remain usable while the popup is
disabled. The administrator section follows the display flag, and the public
privacy notice remains available while the endpoint is configured.

## Public contract

`POST /functions/v1/v1-newsletter`, `Content-Type: application/json`, from an
exact configured site Origin. No public Supabase credential is required.

```json
{
  "action": "subscribe",
  "requestId": "e402d49b-488c-4a6b-a055-a61585a3bd0d",
  "email": "traveller@example.com",
  "firstName": "",
  "locale": "en",
  "sourcePath": "/guides/",
  "consent": true,
  "consentVersion": "2026-09-06.1",
  "website": ""
}
```

- `requestId`: UUID v4, retained for retries of the same submission. Changing the
  semantic payload requires a new request ID. Replay protection lasts 24 hours.
- `email`: maximum 254 characters, validated and normalized to lowercase.
- `firstName`: optional, maximum 80 characters. It is not inserted into mail
  headers or the confirmation email.
- `locale`: `en`, `zh` or `ko`.
- `sourcePath`: current pathname only, up to 240 ASCII letters, digits, `/`, `_`
  and `-`, beginning with `/`; no doubled slash, query, fragment or URL.
- `consent: true`: the explicit newsletter submission. Cookie choices and
  existing enquiries cannot supply this permission. The button and nearby
  notice must explain Homeground China travel ideas, local advice and private journeys by email.
- `website`: empty honeypot; unknown fields and oversized bodies are rejected.

A successful subscribe response is always HTTP `202`, `{"status":"pending"}`,
including already subscribed, duplicate and address-throttled cases. Do not
claim active subscription or email delivery from this response. Existing active
subscribers are never downgraded or edited by an anonymous signup request.

Confirmation and unsubscribe use:

```json
{
  "action": "confirm",
  "requestId": "d9187dfc-dde5-40d0-84d7-dfe9548fab42",
  "token": "<64 lowercase hexadecimal characters>"
}
```

`action: "unsubscribe"` uses the same shape. Success is HTTP `200` with
`{"status":"active"}` or `{"status":"unsubscribed"}`. Every failure body is
`{"error":{"code":"request_failed"}}`; HTTP `422` means invalid request or
unusable token, `429` means client rate limit, and `503` means unavailable or
disabled. No error echoes an address, raw token, provider message or database
error. GET never changes subscription state.

Links are generated from one trusted site origin and one of these page paths:

- `/newsletter/confirm/#token=…` and `/newsletter/unsubscribe/#token=…`
- `/zh/newsletter/confirm/#token=…` and `/zh/newsletter/unsubscribe/#token=…`
- `/ko/newsletter/confirm/#token=…` and `/ko/newsletter/unsubscribe/#token=…`

The pages must be noindex, suppress analytics/vendor scripts, use a no-referrer
policy, keep the token in memory and a URL fragment only, and POST only after
the visitor presses the relevant button. Never put tokens in query strings,
page telemetry, local/session storage or automatically mutate on page load.
Disable email click/open tracking for this stream: tracking redirects or link
rewriting must not receive these bearer links.

## Lifecycle and safeguards

The database transaction saves explicit request evidence, a pending subscriber,
hashed confirmation/withdrawal tokens and one durable confirmation job. The
Edge Function starts that job with `EdgeRuntime.waitUntil` after returning the
same public response shape, and the authenticated retry worker recovers missed
background work. Production must configure the retry schedule before enabling
the form; background execution alone is not the retry mechanism.

The confirmation token expires after 24 hours. An already-confirmed token can
report its existing active state again; it cannot reactivate a withdrawn or
replaced subscription. A new explicit signup after withdrawal creates a new
generation and requires a new confirmation. Superseded tokens cannot act on
the new generation. Every confirmation email includes a cancellation/withdrawal
link; a wrong recipient can cancel before confirming. Withdrawal links remain
usable for their current generation and are not 24-hour confirmation links.

Email resends have a 10-minute cooldown and a three-request daily address cap.
Intake also has five requests per 10-minute IP bucket, 30 per daily IP bucket,
and 500 daily requests globally. Mutation endpoints have 30 requests per
10-minute IP bucket. These are fixed windows; bucket-boundary bursts are
possible. Buckets use secret-keyed hashes, with no raw IP storage. A missing
gateway IP joins one conservative shared bucket. Origin checks are a browser
boundary, not user authentication.

Outbox jobs have a 60-second lease, a 10-second provider timeout, exponential
retry delays starting at two minutes, and at most five delivery attempts.
Recovery reuses a deterministic message and the same Resend idempotency key.
Retries stop at 20 hours, within [Resend's documented 24-hour idempotency window](https://resend.com/docs/dashboard/emails/idempotency-keys).
Provider acceptance means the provider accepted the message, not inbox receipt.
Permanent rejection, exhausted attempts or a token-secret mismatch remain
visible as failed jobs for operator review. No raw confirmation/withdrawal token
is stored in Postgres; workers derive it from the secret and random job ID.

Maintenance removes request hashes after 24 hours, rate buckets after 25 hours,
and unconfirmed subscribers after seven days. It redacts email/name/source on
withdrawn records after 30 days, preserving the hash, state and consent trail.
Terminal outbox rows expire after 30 days; administrator access records after
90 days. Active subscriptions continue until withdrawal. Any public retention
copy must match these settings. Newsletter records are not subject to the
existing enquiry's separate 12-month cleanup rule.

## Configuration and deployment order

All secret configuration stays in Supabase Edge secrets or Vault. Never place
server credentials, worker secrets or token secrets in a `NEXT_PUBLIC_*` value.

| Name | Scope and purpose |
| --- | --- |
| `NEWSLETTER_ENABLED` | Server intake/background-mail switch; defaults to `false`. Confirmation and withdrawal remain available when it is false. |
| `ALLOWED_ORIGINS` | Existing exact HTTPS origins; an exact `http://localhost:…` origin is permitted for development. |
| `NEWSLETTER_SITE_ORIGIN` | One trusted origin for the six user-facing link pages; must also be in `ALLOWED_ORIGINS`. |
| `NEWSLETTER_TOKEN_SECRET` | New independent random secret, 32–512 characters; derives purpose-separated tokens. |
| `NEWSLETTER_WORKER_SECRET` | New independent random secret, 32–512 characters; authenticates retry. |
| `RATE_LIMIT_HASH_SECRET` | Existing server-only HMAC secret, 32–512 characters; newsletter inputs use distinct namespaces. |
| `RESEND_API_KEY` | Existing server-only Resend credential with permission to send from the chosen verified domain. |
| `RESEND_FROM_EMAIL` | Existing verified sender, optionally `Homeground China <address@verified-domain>`. |
| `SUPABASE_URL` and injected credential | Existing `SUPABASE_SECRET_KEYS.default` or legacy `SUPABASE_SERVICE_ROLE_KEY`. |
| `NEWSLETTER_ADMIN_ENABLED` | Defaults to `false`; enables the new read-only administrator endpoint after ordinary admin authorization. |

The token, rate and worker secrets must be distinct. Sending configuration is
validated before a pending record can be created. Confirmation/withdrawal only
need their database, Origin and rate-hash configuration; unavailable Resend or
token-generation secrets do not block withdrawal. Keep the token secret,
sender, site origin and message template unchanged while pending jobs drain,
or explicitly cancel old jobs before rotation; regenerating a token with a new
secret cannot match the stored old hash.

1. Apply `supabase/migrations/202609060001_homeground_newsletter.sql` to the
   intended project. It creates only newsletter tables/RPCs and grants public
   RPC execution only to `service_role`. Existing enquiry records are untouched.
2. Configure the secrets with `NEWSLETTER_ENABLED=false`. Add these entries to
   `supabase/config.toml` as part of integration:

   ```toml
   [functions.v1-newsletter]
   verify_jwt = false

   [functions.admin-newsletter]
   verify_jwt = true
   ```

3. Deploy `v1-newsletter` with gateway JWT verification disabled and
   `admin-newsletter` with gateway JWT verification enabled. Typical commands:

   ```sh
   supabase functions deploy v1-newsletter --project-ref "$NEWSLETTER_PROJECT_REF" --no-verify-jwt
   supabase functions deploy admin-newsletter --project-ref "$NEWSLETTER_PROJECT_REF"
   ```

4. Publish all six confirmation/withdrawal pages before sending confirmation
   mail. Deploy frontend variables `NEXT_PUBLIC_HOMEGROUND_NEWSLETTER_API_URL`
   and `NEXT_PUBLIC_HOMEGROUND_NEWSLETTER_ENABLED`; keep the display switch off
   until the configured workflow has been verified. This static website uses
   the existing GitHub Pages deploy workflow; Supabase deployment is separate.
5. Configure the authenticated retry schedule below, check its response and
   monitor failed jobs. Then enable backend intake and perform an explicitly
   authorized own-address test covering receipt, confirmation and withdrawal.
   Verify administrator counts and individual state. Only then enable the
   public popup/footer form in the static build.

## Retry schedule and operations

Create two **new** Vault entries using Supabase's normal secret interface:
`homeground_newsletter_worker_url` (the public function's HTTPS URL ending in
`/functions/v1/v1-newsletter`) and `homeground_newsletter_worker_secret` (the same
value as the new Edge secret). Do not change the existing enquiry-worker Vault
entries. Run this once in the intended database after validating both entries:

```sql
select cron.schedule(
  'homeground-newsletter-retry', '* * * * *',
  $job$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'homeground_newsletter_worker_url'),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-newsletter-worker-secret',
      (select decrypted_secret from vault.decrypted_secrets where name = 'homeground_newsletter_worker_secret')
    ),
    body := '{"action":"retry"}'::jsonb,
    timeout_milliseconds := 30000
  );
  $job$
);
```

The existing project already uses `pg_cron`, `pg_net` and Vault. Check for an
existing job named `homeground-newsletter-retry` before creating it; update it
instead of leaving duplicate schedules. The worker does maintenance and tries
at most one due email per call. When intake is disabled it still does
maintenance and does not send. Failure/retry limits make the initial pilot
bounded; this is not a bulk campaign worker.

An operator can retry one job without putting secrets in a shell argument or
printing request data. Set the URL and secret in the process environment via
the authorized secret interface, then run:

```sh
node --input-type=module <<'JS'
const response = await fetch(process.env.NEWSLETTER_WORKER_URL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json', 'x-newsletter-worker-secret': process.env.NEWSLETTER_WORKER_SECRET},
  body: JSON.stringify({action: 'retry'})
});
if (!response.ok) throw new Error(`Newsletter retry failed: HTTP ${response.status}`);
const result = await response.json();
console.log({processed: result.processed, outbox: result.outbox});
JS
```

Successful response: `{"processed":true|false,"outbox":{"pending":0,"processing":0,"failed":0}}`.
Counts describe the queue at maintenance, before this call's single send.
The secret-authenticated worker response contains no addresses or token data.
Review failures and confirm recent scheduled HTTP responses are 200, rather
than treating a cron dispatch as provider delivery. On a sending incident, set
`NEWSLETTER_ENABLED=false`; existing withdrawal continues to work. Fix the
underlying provider/configuration issue, then explicitly approve any manual
terminal-job recovery. Do not blindly reset attempt counts or replay a send
past the provider idempotency horizon.

Withdrawal cancels queued/leased work and invalidates activation immediately.
If a confirmation email is already in flight at the provider, it can still
arrive after withdrawal; it cannot reactivate that record. There is no campaign
sending in this implementation. Provider HTTP 408/409/425/429 and 5xx failures
retry under the same idempotency key; other rejections require operator review.

## Private administrator contract

`GET /functions/v1/admin-newsletter` uses the existing Supabase JWT, Auth-user
verification, `aal2` MFA, exact `ADMIN_ALLOWED_ORIGIN`, fixed
`ADMIN_ALLOWED_USER_IDS` allowlist and `ADMIN_API_ENABLED` switch, plus the new
`NEWSLETTER_ADMIN_ENABLED` switch. It writes a separate successful-access audit
before returning subscriber data; it changes no subscription state.

Optional query parameters are `status=pending|active|unsubscribed|suppressed`
and `cursor=<subscriber UUID from nextCursor>`. There are no export, mutation
or arbitrary limit parameters. Default/all-state pages contain at most 25
records, ordered by request time and ID, with an opaque UUID cursor.

```json
{
  "contractVersion": "homeground-newsletter-admin.v1",
  "counts": {"pending": 0, "active": 0, "unsubscribed": 0, "suppressed": 0},
  "subscribers": [{
    "id": "<UUID>", "email": "traveller@example.com", "firstName": "",
    "locale": "en", "sourcePath": "/guides/", "status": "pending",
    "consentVersion": "2026-09-06.1", "requestedAt": "<ISO timestamp>",
    "confirmedAt": null, "unsubscribedAt": null
  }],
  "nextCursor": null
}
```

`email` can be null after withdrawal redaction. Counts include all stored
statuses independently of the current filter. Suppression is reserved for
operator/provider handling; this task does not implement campaign sending or
bounce/complaint webhooks. Do not send future campaigns until provider
suppression, withdrawal enforcement and message-specific unsubscribe links
are integrated. The signup confirmation stream alone is implemented here.

## Local verification

```sh
node --experimental-strip-types --test supabase/tests/newsletter-backend.test.mjs
```

The suite uses only generated test addresses and stubbed provider requests. SQL
tests create an isolated Unix-socket-only PostgreSQL cluster, apply the actual
migration, exercise lifecycle/rate limits/retries/admin pagination, then stop
and remove that temporary cluster. They never read project database credentials.
`initdb`, `pg_ctl` and `psql` are required for SQL execution; if unavailable, the
SQL group reports skipped and must be rerun where those tools are available
before deploying the migration. Local passing tests are separate from hosted
configuration, real inbox receipt and public-page verification.
