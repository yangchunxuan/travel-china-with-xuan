# Customer usage recording — 5 September 2026

This change records a bounded, consented anonymous website journey and separates it from saved enquiries. It does not create identified customer browsing timelines. Release and live-account verification are recorded separately; source code and local tests do not establish production activation.

## What each measure means

| Measure | Trigger / authority | Does not mean |
| --- | --- | --- |
| Product views | `page_view` on a published product, with allowlisted product slug | Unique customers |
| Product selections | An actual change to a valid published service option or 2/4-person choice | Default selection, final booking or questionnaire answers |
| Contact options viewed | Current contact area intersects the visible viewport after consent | Merely mounted or hidden form |
| Channel selected | Choose a reply method in the planner | An outbound link or message sent |
| Contact click | Open Email, WhatsApp or Messenger link | A saved enquiry |
| Email form started | First actual email-field interaction per eligible sink | The entered email value |
| Submit attempted | An observed submission or retry, including local validation/offline failure | A successful save or unique enquiry |
| Submit failed | Definite client validation, offline-before-dispatch or confirmed not-persisted result | A timeout after a possibly successful server save |
| Submit uncertain | Network/timeout/unknown response after dispatch | Definite failure |
| Attributed enquiries | Server-persisted attribution joined to non-test enquiries, excluding marked synthetic sessions | All enquiries, unique people, qualified leads, sales or platform conversion rate |

All traffic metrics cover only visitors who permit analytics and whose accepted events reach the service. Ad blockers, early tab closing and a bounded retry queue can leave gaps. Do not reconstruct pre-consent browsing, infer identity, or manufacture missing source labels.

## Data and consent boundaries

- Collector v2: `homeground-traffic-events.v2`; analytics notice `2026-09-05.1`. A previous notice version requires a fresh choice. v1 collector requests and original RPC/hash behavior remain accepted for older clients.
- First-party event fields are fixed: event ID, event type, bounded pathname, action code, client sequence, allowlisted product slug, valid package/group choice, fixed surface and fixed error code. No timestamp, URL, exception or arbitrary object is accepted from the client. Server receipt time is the time authority; client sequence tolerates out-of-order delivery and cloned tabs.
- Published service/group choices are first-party only. The new selection/submit-state events are first-party only. Trip questionnaire answers and derived trip-profile fields are removed from third-party payloads. No names, contact values, message text, original IP/UA/referrer or full URL is saved as an event. Existing server-only abuse prevention keeps its HMAC/rate-limit boundary.
- Analytics and marketing choices remain independent. Runtime collection is allowed only at `https://homegroundchina.com`. Local builds, preview hosts and other origins cannot initialize or emit to any production measurement sink.
- `/admin/` includes **本机内部检查**. It stores `homeground-internal-traffic=true` in that browser and site origin; it synchronously blocks measurement, clears optional queued/session data and listens for changes from other tabs. Configure each browser separately. It does not stop normal enquiries or grant account access.
- The event retry queue stays in memory: at most 40 entries, up to 120 seconds, at most three queue attempts, stable event ID/sequence, one credential refresh after 401, and Retry-After for 429/503. Withdrawal/internal mode clears pending work. A page closing may lose unsent optional events.
- An inquiry retry keeps its original business snapshot/idempotency key, but removes a no-longer-authorized or changed anonymous session token immediately before transmission. Analytics failure does not prevent inquiry saving.

## Storage and dashboard

Migration `202609050002_homeground_customer_journey.sql` adds v2 RPCs and nullable event columns to the existing private traffic schema. Existing v1 RPC definitions remain unchanged. Admin client understands v1 and v2; unavailable v2 measures under a v1 response show **尚未提供**, never invented zeroes.

Raw events, anonymous sessions, and reversible traffic associations retain the existing 30-day expiry and hourly cleanup. Counts 1–4 remain hidden. Recent summaries remain day-level, at most 12, only when at least five eligible sessions exist, excluding sessions linked to inquiries. No per-session event timeline or contact identifier is returned.

Each dimension shows at most 30 buckets. Existing Unknown and true low-volume buckets reserve their slots; remaining visible labels sort by count descending, label ascending. Omitted high-volume labels are not described as suppressed. Full-window totals cannot be reconciled by summing only displayed buckets.

`mark_homeground_traffic_test_session_v1(p_event_id uuid)` is service-role only and accepts an event ID from a known synthetic verification. It marks the corresponding anonymous session with the fixed reason `synthetic_verification`, without deleting data or returning hashes. All v2 aggregates exclude those sessions. The marker expires by session cascade. Never use this to hide real visitor activity.

## Activation sequence

1. Sign into the existing Supabase project `xbymvlxethfzqcgyoieb` using the normal account flow. Confirm actual environment and project identity. Read schema/functions, migration ledger, existing function revisions, backup/recovery status, and the four traffic cleanup/attribution jobs with recent successful runs and actual database cron timezone. Prior manual deployments may not appear in the migration ledger; do not run blanket `db push` or invent historical ledger entries.
2. Save metadata-only readback and original function definitions privately for rollback. Inspect traffic secret names/status only; preserve existing independent keys shared with inquiry attribution. Do not print values or rotate unrelated secrets.
3. Keep the public web-event build endpoint unconfigured during preparation. Use the existing collector kill switch during backend mutation. Apply the tested additive v2 migration once against verified prerequisites. Re-read columns, constraints, service-only grants/RLS and exact v1/v2 RPC definitions. Do not drop tables or use a destructive down migration.
4. Deploy `v1-traffic-events` and its shared dependencies; public collector uses `verify_jwt=false` and its own bounded HMAC credential/rate limit checks. Deploy `admin-traffic` and its dependencies with normal JWT verification. Keep its existing Auth user verification, aal2/MFA, UUID allowlist, exact Origin, audit write, master switch and separate traffic switch intact.
5. Validate the v2 start/event contract with a small synthetic sequence and stable replay. Mark the synthetic session via its known event ID, confirm aggregate exclusion, and read back no raw tokens or customer rows. Verify v1 compatibility and current cleanup/attribution jobs. Do not trigger a production enquiry notification as part of anonymous traffic testing.
6. Enable the verified collector configuration, set the public repository variable `NEXT_PUBLIC_HOMEGROUND_WEB_EVENTS_URL` to the owned collector endpoint, and release the compatible frontend through the normal PR/Pages workflow. The user authorized this recording work; account login is authentication, not another release-permission request. If a prerequisite fails, record the failure and keep collection off until it is corrected.
7. Verify live consent choices, no-before-consent requests, internal exclusion, product choices and server persistence. Sign into `/admin/` using the normal authorized MFA flow to confirm the restricted v2 dashboard. Report actual saved/ingested results separately from source tests and successful HTTP validation.

Rollback: first remove/disable the browser event endpoint or turn the collector off; redeploy the prior Edge revision if required. The compatible v1 client read path can remain. Preserve the additive schema and retained data; use a reviewed forward fix, never delete event/customer history to roll back this release.

## Validation

- `npm run test:inquiry`, `npm run test:guide-search`, `npm run typecheck`, `npm run build` and required export checks.
- `tools/verify-customer-journey-sql.mjs` executes the target migration unchanged in PGlite/PostgreSQL with real pgcrypto, original traffic/write/read/outbox functions, a minimal inquiry table and cron metadata stubs. It manually runs actual cleanup functions. It checks v1/v2 persistence/replay/conflict, invalid-batch atomicity, out-of-order sequences, role grants/RLS, synthetic exclusion, inquiry filtering, low-count and 30-bucket boundaries, late attribution and TTL. It does not prove the production scheduler, complete intake or network deployment.
- Browser QA uses a local-only in-memory inquiry server and synthetic `example.com` contact data. The temporary visual fixture is removed before release. Desktop and mobile screenshots are reviewed independently before code review. These records contain no real customer submissions.
