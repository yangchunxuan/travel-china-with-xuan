# Correcting a submitted enquiry's email

## Interaction decision

The existing receipt's correction link opened a mail draft. It now opens an inline, prefilled email field with Save and Cancel, keeping the original enquiry visible. This follows [GOV.UK's email-address guidance](https://design-system.service.gov.uk/patterns/email-addresses/) and [change-answer pattern](https://design-system.service.gov.uk/patterns/check-answers/): let users check and change a value without entering everything again. Eventbrite's [wrong-address process](https://www.eventbrite.com/help/en-us/articles/642937/) can require organizer assistance; this no-payment travel enquiry can support an immediate same-browser correction without adding account registration.

Local browser checks used only the in-memory mock (no real email): English homepage; Chinese six-person Jiangnan quote; Korean homepage; Japanese consultation dialog. Verified prefilled input, format errors, cancel, keyboard submission, updated address, retained quote/deadline, and phone/tablet/desktop layouts. The feature does not recover correction credentials after refreshing or closing the page; those users retain direct email and WhatsApp support.

This change lets the browser that submitted an email enquiry correct its contact address for 30 minutes. The enquiry keeps its public reference, trip context, requested party size, original payload hash, received time and response deadline. It permits at most three actual email changes and ten accepted correction requests (including no-ops). There is no public-reference-only lookup or update.

## Browser API

`POST /functions/v1/v1-inquiry-email-corrections`

- `Content-Type: application/json`
- `Inquiry-Access-Key`: the original submission's random UUID v4 `Idempotency-Key`, kept only in browser memory. Do not put this bearer credential in URLs, analytics, logs or persistent browser storage.
- `Idempotency-Key`: a new UUID v4 for this correction attempt. Keep this key and the exact request body for network/uncertain retries.
- Body: `{ "email": "correct@example.com", "expectedRevision": 0 }`. Use the latest successful `contactRevision` for subsequent changes.

A 200 response contains `state: "corrected"`, the same `publicReference`, current `contactEmail`, current `contactRevision`, original `firstResponseDueAt`, `ackQueued`, `ackStatus`, `duplicate`, `changed`, and `requestId`. A same-address no-op does not enqueue mail or consume a change revision. A correction replay returns the **current** contact address/revision even if another successful correction followed it. The original intake/replay response also returns current `contactEmail` and `contactRevision` when the contact-state read succeeds. When corrections are enabled, a replay whose current-contact read fails returns a retryable unknown result rather than redisplaying the old browser address. Existing response fields and legacy clients remain compatible.

Errors use the existing `{ error: { code, retryable, persistenceState, requestId } }` envelope:

| HTTP | Code | Browser behavior |
| --- | --- | --- |
| 422 | `invalid_email` / `invalid_correction` | Keep the input open and show validation feedback. |
| 403 | `correction_unavailable` | Authorization is missing/invalid, the window expired, the enquiry is not email based, or the feature is disabled. Offer the existing contact route. |
| 409 | `correction_busy` | An original or correction mail job has an active sending lease. Retry the same correction request after 5 seconds (`Retry-After` and `error.retryAfter`). |
| 409 | `correction_conflict` | Another correction changed the revision. Do not overwrite it from stale browser state. |
| 409 | `idempotency_conflict` | The correction key was reused for different input. Do not automatically generate another request. |
| 409 | `correction_limit` | The bounded correction limit was reached. Offer the existing contact route. |
| 503 | `correction_unavailable`, retryable, persistenceState `unknown` | The write may have succeeded. Retry the same correction key/body; do not submit a new enquiry. |

Do not label `queued` or provider acceptance as delivery. The UI must say earlier emails may already have been sent and cannot be recalled. No request sends to the corrected address synchronously.

## Atomic persistence and delivery

Migration `202609290002_inquiry_email_corrections.sql` adds a contact revision to the existing enquiry and both outboxes, plus a private correction audit/idempotency table. Each change atomically updates only contact fields and inserts a new traveller acknowledgement job and a new internal correction notice. Each job has its own immutable recipient snapshot and provider key. Already-frozen messages, accepted provider IDs and original provider keys are never rewritten.

The transaction locks the enquiry and its queued jobs. An active worker lease returns `correction_busy`. Pending/expired-lease traveller confirmations for older addresses become `suppressed/contact_corrected`; accepted or historical failed jobs keep their evidence. An already sent or in-flight message cannot be recalled. Accepted internal notices remain intact. Pending/expired-lease internal notices become `superseded/contact_corrected`, preserving their frozen envelopes while preventing a stale email-action link from being sent on retry; this intentional terminal state is not counted as a failed queue job. The independent correction notice includes the complete original enquiry context, which address changed, and the unchanged response deadline.

The current receipt/staff-contact read uses the current contact revision. Historical failed acknowledgements still show their actual recipient snapshot, so an old-address bounce is not mislabelled as a failure of the corrected address. Existing signed webhook verification, event deduplication, provider idempotency, retry policy, address cooldown and persistent bounced/complained/suppressed/not-me restrictions apply to each new acknowledgement job. Correcting an address does not remove any restriction. Legacy disclosures can correct the saved address but do not gain newly authorized automatic confirmation mail.

The original notification RPC chain v1/v2/v3 only claims revision-zero jobs during rolling deployment. The new v4 worker claims both originals and correction notices, labels correction notices explicitly, withholds contact actions on superseded revisions, and uses a new provider idempotency key for every correction notice. Original notification provider keys remain enquiry IDs. New correction notices expire after 23 hours if still pending/uncertain, avoiding retries beyond provider idempotency retention. Existing aggregate queue monitoring counts the added jobs; private correction records and snapshots follow the enquiry's existing cascade retention.

## Release order (not deployed by this change)

1. Apply the **new** migration after the existing acknowledgement migrations. Do not edit or replay a previously applied migration.
2. Deploy `notify-inquiries` with v4 claiming and the updated `v1-inquiries` receipt fields. The existing `traveller-ack-events` endpoint and signed webhook remain in use.
3. Deploy `v1-inquiry-email-corrections` with `verify_jwt=false` as configured. It authorizes using the original browser key, not a Supabase browser JWT. Keep `INQUIRY_EMAIL_CORRECTION_ENABLED=false` until worker/dependency readiness is verified.
4. Enable `INQUIRY_EMAIL_CORRECTION_ENABLED=true`. Keep the existing `IDEMPOTENCY_HASH_SECRET` unchanged. The existing `TRAVELLER_ACK_ENABLED` still independently governs whether new confirmations queue for sending.
5. Release the matching frontend. Verify a controlled, explicitly authorized correction with one original enquiry and a different test mailbox; separately verify the saved contact, new internal notice, signed delivery events and actual recipient receipt.

Rollback: disable only `INQUIRY_EMAIL_CORRECTION_ENABLED` to stop new changes while the v4 worker drains committed correction jobs. Do not roll the notification worker back to v3 while correction jobs remain, delete correction/outbox rows, or reset provider keys to resend uncertain mail.

## Local validation

- `node --experimental-strip-types --test supabase/tests/inquiry-email-correction.test.mjs` mocks every network call and tests bearer authorization, bounded schema, CORS, uncertain retry, distinct internal-notice keys and frozen payloads.
- `HOMEGROUND_PGLITE_PACKAGE_PATH=<existing PGlite package> node --experimental-strip-types tools/verify-inquiry-email-correction-sql.mjs` runs the prerequisite/new migrations and actual intake/correction handlers against a disposable local PostgreSQL WASM database. No network or production credentials are used. It applies all 37 migrations through this release, including the deployed retention rules. It verifies same-record/15-person quote preservation, atomic queue-failure rollback, both replay types, leases, revision conflicts, caps, expiry, old/new workers, the original 72-hour retry deadline, the correction 23-hour deadline, recipient restrictions and old-address bounce isolation.
