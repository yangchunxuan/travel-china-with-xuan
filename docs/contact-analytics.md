# Private contact analytics

The admin dashboard offers WhatsApp, email, Messenger, KakaoTalk and all-channel
contact reports for rolling 7- and 30-day windows. It reuses the existing consented
first-party records; this release does not collect new visitor data.

## Definitions

- A click is a saved `contact_channel_clicked` event with an allowed action code.
  `contact_channel_selected` and form submissions are separate events.
- Anonymous sessions are distinct session hashes within the selected channel
  and period. Hashes are used only inside SQL and never returned in this report.
- Session click rate divides those sessions by compatible, non-test sessions
  first recorded in the same period. It is neither a people count nor a sales rate.
- Both session first-seen time and event received time must lie inside the window.
  Daily groups use Asia/Shanghai; the first and last calendar days are partial.
- Sources are existing recorded campaign-source labels. Unknown must not be
  relabeled Direct or Organic. Missing historical attribution cannot be restored.
- Page, entry-page, source, product and surface dimensions are separate marginal
  aggregates. A session can appear in multiple rows; never sum row session counts.
- Each dimension returns at most 20 groups plus the omitted click count. Daily
  rows include explicit zeros. An unavailable report is never displayed as zero.
- Internal test markers are excluded. Unmarked historic tests, consent refusals,
  blocked collection and failed uploads limit coverage. Raw records expire after
  30 days. WhatsApp sending, recipient identity and sales are not connected.

## Access and precision

Only the existing admin-traffic endpoint can expose this report after Auth/user,
MFA, fixed administrator allowlist, exact Origin, both API kill switches and a
successful body-free access audit. Its new RPC is executable by service_role only.
There are no arbitrary SQL parameters, per-person timelines, contact details,
raw query strings or session labels in the contact report.

The contact report deliberately provides exact owner-only aggregate counts,
including small counts. The legacy website-traffic summary retains its existing
minimum-five suppression rules. The dashboard explains this precision difference.
No raw events or identifiers are exported to the client for calculating charts.

## Rollout and rollback

1. Apply `202609130001_homeground_contact_analytics.sql`. It adds v3 without
   altering collection tables or the v2 function. Verify privileges and read it.
2. Ship the frontend accepting v1/v2/v3. Older responses show an unavailable
   detail state, not made-up contact counts.
3. Deploy only `admin-traffic`, retaining JWT verification. It calls v3 and
   validates the complete response before returning it.
4. In the authenticated production UI verify channel switching, both windows,
   at least one detail table, and the generation timestamp. Compare the all-channel
   click total with a read-only aggregate. Never create real customer enquiries
   or send WhatsApp messages as a test.

To roll back the Edge change, deploy the previous admin-traffic bundle calling
v2. The new client remains compatible. Leave the additive v3 function in place
unless removal is separately needed; never delete visitor records for rollback.

## KakaoTalk channel (2026-09-29)

Korean pages offer "카카오톡으로 문의". KakaoTalk has no public web link that
opens a chat by phone number, so the button copies the prepared inquiry text and
shows the owner's number with steps to add it; it is recorded as the v2 action
code `kakao` (v1 keeps email/whatsapp/messenger). A click proves neither a
friend request nor a sent message.

Apply `202609290001_homeground_kakao_contact_channel.sql` (table check, v2 event
validator and a fifth `kakao` slice in the v3 report). Release order:

1. Deploy `v1-traffic-events` and `admin-traffic`. The new admin parser accepts
   reports with or without the `kakao` slice; the old site never sends `kakao`.
2. Apply the migration.
3. Deploy the site promptly: the previously deployed admin page expects exactly
   four channels, so its contact detail is unavailable between steps 2 and 3.

If the site ships before the migration, Kakao clicks fail at the database
validator (503, retried then dropped) and are not counted.

## Validation

`admin-contact-analytics.test.mjs` exercises strict client/Edge parsing,
reconciliation, duplicate/malformed fields, forbidden raw values and v2 fallback.
The SQL fixture is disposable and must never run against a project database.
Execute the migration against that fixture in isolated PostgreSQL/PGlite to test
session deduplication, Shanghai midnight, exact cutoffs, test/contract exclusions,
empty results, top-20 overflow and service-role-only execution.

UI checks use synthetic fixtures only. No production visitor extracts or admin
screenshots belong in this public repository.
