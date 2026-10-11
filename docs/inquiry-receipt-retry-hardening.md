# Enquiry receipt and notification retry hardening

Migration: `202610110002_inquiry_receipt_and_retry_hardening.sql`.
Deploy the migration before the updated `v1-inquiries` Edge Function. The
notification worker needs no transport or response-contract change.

## Receipt admission

Current-disclosure requests call the service-role-only
`create_homeground_inquiry_with_receipt_v1` RPC. It statically dispatches to the
existing typed intake functions, keeping their validation, rate limits,
idempotency and traffic attribution. Receipt intent stays in transaction-local
state; the deferred insert trigger enrolls only a successfully saved enquiry.
There is no separate database allocation before rate limiting and no global
intent capacity that can block other travellers' confirmations. Per-recipient
suppression, the 24-hour confirmation limit and disclosure checks remain active.

The old preparation RPC remains callable but cannot create new rows. During a
migration-first rollout, an older Edge bundle still saves enquiries and sends
the normal internal notification. Its optional confirmation may be disabled
with `intent_unavailable`; existing in-flight preparation rows remain usable.
Deploy the updated Edge bundle promptly. Do not backfill confirmations for this
interval. An Edge rollback to the old bundle has the same safe degradation.

Do not deploy the new Edge bundle before the migration: a missing atomic RPC
returns an unavailable/uncertain save result; the handler deliberately does not
attempt another persistence RPC after an ambiguous write. Older privacy notices
continue through their existing typed intake path and do not gain new consent.

## Provider retry boundary

Internal notification jobs gain `first_provider_attempt_at`, first set by the
message-freeze RPC immediately before sending. Every retry must pass the
23-hour guard measured from that timestamp, retaining one hour of margin below
[Resend's 24-hour idempotency window](https://resend.com/docs/dashboard/emails/idempotency-keys).
The same guard is enforced by claim, freeze and manual requeue, so an older
worker cannot bypass it. The frozen body, provider key and original timestamp
are never renewed by retries. Corrections keep their additional 23-hour
creation-time limit; all jobs retain the absolute 72-hour creation deadline.

For existing jobs with a recorded attempt or frozen body, the migration uses
`created_at` as the conservative first-attempt lower bound. Their exact old
provider-attempt timestamp was not recorded. This can stop an older job earlier
than necessary, but cannot falsely extend its provider deduplication window.
Never-attempted backlog has no first-attempt timestamp and can still be claimed
within the existing 72-hour deadline.

An expired uncertain job becomes failed with
`provider_retry_window_expired`. The enquiry remains saved and visible to staff;
the failed-outbox health check remains actionable. Confirm its provider history
before sending any manual follow-up. Do not clear this timestamp, change the
provider key, recreate the outbox row or blindly resend the backlog.

## Evidence and release checks

- `inquiry-hardening-sql.test.mjs` runs all migrations on isolated PostgreSQL,
  verifies rate-limit rejection and 5,000 old intents cannot starve valid new
  receipts, deferred multi-enquiry transactions, rollback, service-only access,
  expired/recent retry boundaries, and actual Edge homepage/destination/quote
  writes with and without traffic attribution.
- `backup-recovery-integration.test.mjs` runs the actual TLS encrypted backup,
  decrypts and restores it, compares private and recovery data plus permissions,
  imports tombstones recorded after the snapshot, replays deletions and verifies
  both rights deletion and retention cleanup on the restored database.
- Confirm the applied migration and deployed Edge version on production before
  declaring the fix live. Inspect aggregate enquiry/outbox health and any
  pre-existing failed jobs. Local tests do not prove production configuration,
  provider acceptance or inbox placement; no real email is sent by these tests.

## Recovery prerequisite

New encrypted archives include `homeground_recovery` with its deletion ledger
and recovery functions. The archived ledger is only a snapshot. A restored
database must receive the **latest independently maintained deletion tombstone
ledger**, including deletions after the backup, then replay those deletions
before returning to service. The backup manifest marks this prerequisite as
`latestIndependentDeletionTombstonesRequired: true`. Inclusion of the recovery
schema does not replace the independent ledger or prove that it is maintained.
See the [stability runbook](site-stability-runbook.md) for the restore procedure.
