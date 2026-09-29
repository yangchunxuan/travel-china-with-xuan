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
successful body-free access audit. Its report RPCs are executable by service_role only.
There are no arbitrary SQL parameters, per-person timelines, contact details,
raw query strings or session labels in the contact report.

The contact report deliberately provides exact owner-only aggregate counts,
including small counts. The legacy website-traffic summary retains its existing
minimum-five suppression rules. The dashboard explains this precision difference.
No raw events or identifiers are exported to the client for calculating charts.

## Initial contact-report rollout and rollback (2026-09-13)

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
validator and a new `get_homeground_admin_traffic_v4()` RPC with a fifth `kakao`
slice). The existing `get_homeground_admin_traffic_v3()` remains unchanged:
its four slices and all-channel contact aggregates exclude KakaoTalk. The v4 RPC
aggregates all four contact channels before session deduplication and dimension
ranking; it retains the `homeground-admin-traffic.v3` response contract.

The new traffic client explicitly opts in with the existing allowed header
`X-Client-Info: homeground-private-admin/kakao-contacts-v1`. Only that exact value
makes `admin-traffic` call v4; absent or unrecognized values keep calling v3.
Both responses pass the strict parser. Authorization and CORS are unchanged.
The Edge does not subtract Kakao from an aggregate, because distinct session
counts and top-20 dimension rows cannot be reconstructed that way.

Release order:

1. Deploy `v1-traffic-events` and `admin-traffic`. The new admin parser accepts
   four or five slices; old admin requests still use v3 and the old site never
   sends `kakao`.
2. Apply the migration, verify v3 is unchanged, and check v4's service-role-only
   execution and aggregate reconciliation.
3. Deploy the site. Its new admin requests opt in to v4; old open admin pages
   continue receiving the compatible four-channel v3 report throughout rollout.

If the site ships before the migration, Kakao clicks fail at the database
validator (503, retried then dropped) and are not counted. If the new Edge is
already deployed, opted-in admin requests also fail until v4 exists. Do not
publish the opt-in client before the migration. Rolling back `admin-traffic`
to its previous v3-only bundle leaves the new parser able to read the legacy
four-channel report; keep the additive v4 function and visitor records in place.

## Validation

`admin-contact-analytics.test.mjs` exercises strict client/Edge parsing,
reconciliation, duplicate/malformed fields, forbidden raw values, v2 fallback,
and exact-header opt-in with legacy-default RPC selection.
`admin-contact-compat-sql.test.mjs` verifies the unchanged v3 function and contact
aggregates, v4 cross-channel session deduplication, and both RPCs' privileges in
disposable PostgreSQL.
The SQL fixture is disposable and must never run against a project database.
Execute the migration against that fixture in isolated PostgreSQL/PGlite to test
session deduplication, Shanghai midnight, exact cutoffs, test/contract exclusions,
empty results, top-20 overflow and service-role-only execution.

UI checks use synthetic fixtures only. No production visitor extracts or admin
screenshots belong in this public repository.
