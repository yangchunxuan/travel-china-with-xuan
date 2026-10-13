# Google Ads consultation and first-payment measurement

## Current release boundary — 2026-10-13

The website and private administrator workflow can ship independently of Google account setup. The billing entity has not been decided; no Google Ads customer/action IDs or OAuth credentials are assumed. No campaign is activated, no budget is changed, and the deployment must keep `GOOGLE_ADS_UPLOAD_ENABLED=false` and `GOOGLE_ADS_VALIDATE_ONLY=true`. A recorded payment is not evidence that Google received, attributed, or reported a conversion.

The browser collects an eligible Google click only after the 2026-10-13.1 marketing measurement consent and the configured production Ads gate. It preserves exact click-ID case for up to 90 days and sends `adAttribution` as auxiliary inquiry metadata. There is no browser Google Ads conversion event and no parallel CSV upload path.

## Storage and operator behavior

- `inquiry_ad_attribution` stores one immutable click association per inquiry, plus consent version/time and a hashed withdrawal bearer token. It never enters public receipts, email notifications, or aggregate analytics.
- `inquiry_ad_conversion_events` contains `inquiry_received` after the inquiry actually commits and `payment_received` after an administrator explicitly confirms first funds received. The latter means the first actual amount received, including a deposit; it does not mean quoted trip value or a second full-payment conversion.
- Each `(inquiry_id,event_kind)` is unique. An exact payment retry returns the same record; a different amount, currency, or time returns a conflict. Refunds/corrections require handling the original conversion separately. This release does not silently restate or delete a payment.
- Admin lookup takes an `HG-…` reference and exposes no contact details or raw click IDs. Origin, Supabase Auth, aal2 MFA, user allowlist, master admin switch, and `ADMIN_CONVERSIONS_ENABLED` all apply. A body-free audit accompanies lookup/record operations.
- A payment without an eligible click still saves, with `missing_ad_attribution`. With a click and disabled upload it displays “已保存，等待开通回传”. Only a successful server readback displays payment success.
- Queue states are `pending`, `processing`, `submitted`, `accepted`, `failed`, and `blocked`. `submitted` requires a provider request ID. `accepted` requires Data Manager `requestStatus:retrieve` success for the exact account/action; it still does not prove attribution or Google Ads reporting.

## Consent and retention

The front end keeps a random UUID withdrawal token for one continuous consent period. Withdrawal deletes all matching raw click associations and cancels pending/leased work. A 90-day hashed tombstone blocks an inquiry arriving after its withdrawal request. The public withdrawal endpoint is bounded, exact-Origin, token-based, IP-rate-limited, and returns generic 204 responses for successful processing.

The worker checks eligibility on claim and immediately before dispatch. Withdrawal cannot retract a request already dispatched to Google; submitted/accepted status remains an accurate history. No raw click survives the daily 90-day pruning job, and all local ad records follow existing inquiry deletion cascades. Measurement consent sets `adUserData=CONSENT_GRANTED` and `adPersonalization=CONSENT_DENIED`; this release does not authorize personalized advertising or upload customer email/phone data.

## Deployment order and verification

1. Read back current migration/schema and function status without selecting customer bodies. Check required intake/receipt RPCs, `pgcrypto` in `extensions`, test-marker tables, and `pg_cron` availability. Do not assume an existing migration was applied from repository state alone.
2. Apply `supabase/migrations/202610130003_homeground_ads_conversions.sql`. New tables use forced RLS; only server-role RPCs expose the intended operations. The migration adds only a local daily retention schedule; it does not schedule uploads or call Google.
3. Deploy `v1-inquiries`, `admin-conversions`, `v1-ad-attribution-consent`, and `upload-ad-conversions`, with the repository `supabase/config.toml` gateway settings. Retain existing intake/admin secrets. Set `ADMIN_CONVERSIONS_ENABLED=true`, `GOOGLE_ADS_UPLOAD_ENABLED=false`, and `GOOGLE_ADS_VALIDATE_ONLY=true`. Do not insert placeholder Google IDs or credentials.
4. Publish the front end after the backend exists. Existing forms without ad metadata retain the original RPC path. Verify consent decline, accept, withdraw, desktop/mobile, and the signed-in admin entry. Do not submit a real inquiry or claim a live Google conversion as part of this release.
5. The optional database acceptance script `supabase/tests/ad-conversions-rollback.sql` creates only synthetic `example.invalid` inquiry/payment rows inside one transaction. It exercises the real RPCs and always ends with `ROLLBACK`. It calls no notification worker, no HTTP function, and no Google endpoint. Ordinary notification workers cannot see its uncommitted outbox rows. Execute it unmodified, then read back aggregate counts to confirm no fixture persisted.
6. Confirm the retention job and new RPC privileges, deployed function versions, disabled uploader, and unchanged production customer/outbox counts. Public canaries may test CORS or malformed input only; no valid inquiry submission is needed.

## Later Google connection

Use distinct real offline `UPLOAD_CLICKS` actions for inquiry and first payment. Set their primary/secondary optimization roles deliberately to avoid counting both funnel steps as the same bidding goal. No action IDs are fabricated in this release.

Server-only configuration:

| Variable | Meaning |
| --- | --- |
| `GOOGLE_ADS_CUSTOMER_ID` | Ten digits, no hyphens; owner of the conversion actions |
| `GOOGLE_ADS_LOGIN_CUSTOMER_ID` | Optional Google Ads login/manager account; defaults to customer ID |
| `GOOGLE_ADS_INQUIRY_ACTION_ID` | Real offline inquiry action ID |
| `GOOGLE_ADS_PAYMENT_ACTION_ID` | Different real offline first-payment action ID |
| `GOOGLE_ADS_OAUTH_CLIENT_ID` | OAuth client ID |
| `GOOGLE_ADS_OAUTH_CLIENT_SECRET` | Server-only OAuth client secret |
| `GOOGLE_ADS_OAUTH_REFRESH_TOKEN` | Server-only refresh token authorized for `https://www.googleapis.com/auth/datamanager` |
| `GOOGLE_ADS_WORKER_SECRET` | Separate random server-only secret of at least 32 characters |
| `GOOGLE_ADS_UPLOAD_ENABLED` | Default `false`; no uploads or OAuth calls when disabled |
| `GOOGLE_ADS_VALIDATE_ONLY` | Default `true`; successful validation stays pending, never submitted/accepted |

`POST /functions/v1/upload-ad-conversions` requires `x-worker-secret` and rejects browser Origin. Once the real account/actions/OAuth are ready, validate first and inspect diagnostics. Only an explicitly approved later connection should change `GOOGLE_ADS_VALIDATE_ONLY=false` and schedule worker calls. The queue freezes transaction IDs and destination account/action on first claim. Retries reuse them, leases prevent concurrent sends, and failed/uncertain requests back off with bounded attempts. Unknown provider outcomes must be investigated rather than claimed as success.

## Local evidence

`supabase/tests/ad-conversions.test.mjs` uses fresh socket-only PostgreSQL, applies all migrations, executes actual intake/admin/withdrawal handlers, and mocks every Google response. No production database or external network is available to the fixture. It verifies immutable attribution, payment confirmation/deduplication, safe responses, forced RLS, validation-only behavior, asynchronous acceptance, withdrawal/late-request handling, retention, and test-marker exclusions.

Official references checked 2026-10-13: [Data Manager offline events](https://developers.google.com/data-manager/api/devguides/events/google-ads/offline/send-events), [Destination](https://developers.google.com/data-manager/api/reference/rest/v1/Destination), [request status](https://developers.google.com/data-manager/api/reference/rest/v1/requestStatus/retrieve), and [GCLID setup](https://support.google.com/google-ads/answer/7012522?hl=en). Actual provider/account setup remains pending.
