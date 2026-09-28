# Homeground inquiry runbook

Status: owner authorised release of the locally reviewed enquiry workflow, 28 September 2026.

This is a small routine for a one- or two-person studio. The revised automatic
confirmation flow is not itself a record of a completed production rollout. Keep
`TRAVELLER_ACK_ENABLED=false` until the owner accepts the local result and the
mailbox, sender and reply commitment checks below are complete. The authorised
release preserves the existing 48-hour reply commitment. Record actual backend
and frontend deployment results separately from local validation.

## 1. The whole human handoff

```text
Email
  Traveller enters their own email in the website form
    → Supabase saves the enquiry and queues an internal notification
    → an eligible confirmation is queued separately when enabled
    → the person on duty sends a clean message from hello@homegroundchina.com

Direct email
  Traveller sends their own message to hello@homegroundchina.com
    → the person on duty replies to that actual traveller message

WhatsApp
  Traveller enters their own WhatsApp number in the same website form
    → Supabase saves the enquiry and Resend notifies Gmail
    → authorised staff open the staff-side WhatsApp link
    → the person on duty replies in that conversation
```

- Required customer-facing reply identity: `hello@homegroundchina.com`.
- The owner must verify that direct mail and confirmation replies to `hello@`
  reach an inbox checked by the person on duty. The historical internal
  notification recipient was `yangchunxuan1@gmail.com`; a document edit does
  not move that mailbox or prove `hello@` is monitored. Record the verified
  routing before enabling the revised flow.
- Gmail label: `Homeground inquiries`
- Handling labels: `Needs reply`, `Waiting for traveller`, `Done`.
- Monitored WhatsApp Business number: `+86 131 7421 5999`
- WhatsApp Business action label: `Follow up` (create or confirm it before
  WhatsApp intake is enabled)
- WhatsApp intake remains disabled until one external-number QA submission is
  saved, notified to Gmail and answered from this business inbox.

The website form, direct email and direct WhatsApp link are alternative contact
routes. Opening a mailto or WhatsApp link only opens a draft or conversation;
the traveller still has to send it. Direct messages must join the same handling
routine even when they have no website reference. Do not copy traveller details
into personal notes, analytics or a separate spreadsheet.

WhatsApp submissions use the same Inquiry API, outbox and Gmail notification
as Email submissions. The saved Inquiry is the technical receipt. The later
WhatsApp conversation is the handling record.

The notification also shows any traveller-stated rough budget per person,
with international flights excluded. This is context for the first human
reply, not a Homeground quote. Gmail and WhatsApp are connected to
SaleSmartly, so the notification or later conversation—including that budget—
may also appear in the authorised SaleSmartly project. SaleSmartly is a shared
working view of the same two reply channels, not a third customer contact
method and not a separate source of truth.

## 2. Gmail setup

Keep the existing internal-notification filter where its subject still matches:

```text
subject:"[Homeground]"
```

Apply the `Homeground inquiries` label without marking messages as read.
Also label genuine enquiries sent directly to `hello@homegroundchina.com` and
traveller replies to confirmations; these may have neither `[Homeground]` nor
a website reference. Verify the filter against the actual alias or forwarding
route, and check the inbox for messages missed by it. Do not treat a subject
line or sender filter as proof that a message is genuine.

Read/unread is a reading status, not a work status. Every open enquiry needs
one handling label and a named owner. Use `Needs reply` while Homeground owes
the next action, `Waiting for traveller` after a human response, and `Done`
when no follow-up remains.

Internal notifications are never the customer conversation. They do not set
the traveller as Reply-To. Use the separate clean write-to-traveller link,
verify the recipient and select `hello@homegroundchina.com` as the sender.
It opens a draft; check and send it yourself. Do not forward or quote the
internal notification. If the traveller already wrote or replied, answer that
actual traveller message instead. A matching subject does not guarantee mail
threading, and Resend-sent confirmations do not automatically appear in Gmail
Sent. The human Sent message or the actual traveller conversation is the
handling evidence.

## 3. Daily handling

1. Name one person on duty for each stated time block.
2. Check both Gmail and WhatsApp Business at least once in the morning and
   once in the evening.
3. In Gmail, review `Needs reply`, including messages already read, and then
   check new direct messages and confirmation replies. For Email, use a clean
   message from `hello@` or reply to an actual traveller message. For WhatsApp,
   use the staff-side link and verify the number before sending.
4. In WhatsApp Business, start with unread conversations and keep the original
   Gmail notification until the first reply has been sent.
5. If working from SaleSmartly, verify the selected outbound channel and
   Homeground account before sending, and check Gmail or WhatsApp first so two
   team members do not send duplicate replies.
6. If you cannot reply immediately, leave `Needs reply` in place and name the
   owner. Use the WhatsApp Business `Follow up` label for the same situation.
7. After a human reply, change the email label to `Waiting for traveller` and
   remove the WhatsApp `Follow up` label. An automatic confirmation does not
   count as the human reply or stop the first-response clock.
8. Apply `Done` only when no follow-up remains. Archive as needed, but do not
   delete conversations as a way to mark work complete.

If both team members are working, the person who starts a reply sends one
short message in the team chat: “I’m handling HG-…” or “I’m handling the
WhatsApp conversation ending 1234”. At handover, name the `Needs reply` Email
threads and `Follow up` WhatsApp conversations that still need action.

### Daily missed-enquiry check

The named technical owner performs the saved-enquiry delivery checks once
every day. The person on duty also checks WhatsApp Business for conversations
that need a reply.

1. In Gmail, run:

   ```text
   label:"Needs reply"
   ```

   Compare each enquiry's receipt time with the owner-approved reply deadline,
   including read messages. Review the inbox for direct enquiries without a
   handling label. Verify the actual Sent message before deciding that a
   response is overdue; answer or hand it to the person on duty immediately.
   Do not hard-code 24 or 48 hours into this check until the owner selects the
   public commitment. The local backend default is 24 hours and is configurable;
   it is not evidence of current staffing or a verified production setting.

2. In the Supabase SQL editor, run the non-PII aggregate query:

   ```sql
   select *
   from public.get_homeground_outbox_health();
   ```

   `failed_count`, `overdue_pending_count` and
   `expired_processing_count` must all be zero. `pending_count` or
   `processing_count` may briefly be non-zero while a notification is being
   delivered; recheck after five minutes. Compare
   `created_last_10_minutes`, `created_last_1_hour` and
   `created_last_24_hours` with the pilot traffic thresholds below. The query
   returns counts only—never Inquiry IDs, contact details or notes.

   These are raw operational intake counts and include verified QA records.
   For business reporting, use only the private non-test reporting source or
   the aggregate classification summary described in
   `inquiry-deployment.md`; never subtract an informal test count by hand.

3. In WhatsApp Business, check unread conversations and the `Follow up` label.
   Cross-check any unhandled WhatsApp Gmail notification before closing it.

4. When traveller confirmations are enabled, review their separate queue and
   failure states as well. A saved enquiry, an internal notification, a
   confirmation and a human response are four different records. A failure to
   send the confirmation must not hide the enquiry from the person on duty.

The GitHub Actions workflow named `Inquiry outbox health` runs the same health
check every 15 minutes through an independently authenticated endpoint. Its
failure is the operational alert when the outbox reaches terminal failure or
the worker/scheduler leaves a job stale. The technical owner must enable
GitHub Actions failure notifications and investigate a red run; do not paste
its secret or response into team chat.

If an internal-notification failure count remains non-zero, or its health
check stays red, follow the incident steps below. For a confirmation-only
failure, use the narrower response in the following subsection instead:

1. stop the API immediately by setting the Supabase Edge Function secret
   `INQUIRY_ACCEPTING_SUBMISSIONS=false`; confirm a valid production-origin
   POST receives `503` with `intake_paused`;
2. disable `NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED` and redeploy so customers
   no longer see a form that cannot be accepted;
3. check the notification schedule, Edge Function and Resend configuration
   using `inquiry-deployment.md`;
4. restore the cause before retrying failed jobs;
5. repeat the aggregate query and confirm the workflow returns green;
6. set `INQUIRY_ACCEPTING_SUBMISSIONS=true`, make one labelled QA submission,
   and only then re-enable and redeploy the public form.

### Automatic confirmations and delivery problems

- Confirmations are optional transaction receipts. They do not ask travellers
  to repeat known details, do not contain free-text notes or marketing, and
  do not require a reply before staff handle the enquiry. Only eligible
  enquiries submitted under the new notice may receive one; do not backfill
  historical enquiries when enabling the feature.
- `queued` means a sending job exists. Provider acceptance means delivery is
  being attempted; a delivered status means the receiving mail server accepted
  it. None of these proves inbox placement or reading. Never tell a traveller
  that the confirmation guarantees later replies will avoid Spam.
- Replaying one submission keeps the same enquiry. A second genuine enquiry
  may be saved while its extra confirmation is rate-limited. That is not a
  merge of the two enquiries. The person on duty still reviews both requests.
- Distinguish temporary delays, permanent delivery failures, configuration
  problems and spam complaints. Do not label every bounce as a mistyped
  address. Stop automatic retries to a permanently failing or complained-about
  recipient; investigate before any further contact. Do not bypass provider
  suppression by switching senders.
- If someone says “not me”, stop follow-up for that request, mark it for the
  technical owner and apply the verified privacy-request procedure as needed.
  Do not promise instant deletion before checking linked records. Preserve
  the minimum necessary stop-contact record under the applicable retention
  rules so an accidental resubmission does not restart contact.
- The separate recipient HMAC suppression record has no automatic expiry.
  It stores the reason and timestamps without trip notes and needs authorised
  review before removal. Deleting an enquiry must not silently remove this
  restriction. The owner must accept and disclose this separate retention
  policy before enabling confirmations. Confirmation preparation records become
  eligible for deletion after 48 hours and the daily cleanup removes them;
  confirmation jobs and events follow enquiry
  deletion. Resolving a delivery issue does not itself resend the message.
- For a wrong-address report, verify the requester and link the correction to
  the original reference. Stop using the old address. A public reference alone
  is not permission to disclose or change enquiry details. An already sent
  email cannot be recalled by editing the website record.
- If only the confirmation service fails, turn off `TRAVELLER_ACK_ENABLED`
  while investigating and continue human handling of saved enquiries through
  the healthy internal-notification path. Do not resend the whole backlog or
  pause a working form solely because optional confirmations are unavailable.
- `TRAVELLER_ACK_MONITOR_ENABLED` defaults to `false` for local review. Enable
  it with the later confirmation rollout and keep it `true` if sending is
  paused after an incident; otherwise old failed jobs and unresolved delivery
  issues could stop alerting when they still need attention.

Before enabling confirmations, the owner must accept the local preview,
confirm who checks `hello@` and uses it to reply, approve the actual public
reply time, verify the selected From address with the sending provider and
approve the release. Keep automated sending off while any gate is unresolved.
Local previews and test-provider events do not establish real inbox placement.

### Malicious traffic and account incident response

The static website can withstand much more traffic than the public Inquiry
API. CORS, the hidden honeypot and the visible form are not authentication:
a targeted script can call the API directly. Use these operating thresholds
for the pilot, then tune them after two weeks of real advertising traffic:

- 10 saved enquiries in 10 minutes: inspect the newest Gmail notifications
  for repeated text, addresses or impossible trips;
- 30 saved enquiries in one hour or 100 in one day: set
  `INQUIRY_ACCEPTING_SUBMISSIONS=false`, set
  `NOTIFICATION_PROCESSING_ENABLED=false` if Gmail is being flooded, and
  investigate before accepting or sending more;
- more than 10 pending notifications for five minutes, or any failed,
  overdue or expired notification for 15 minutes: pause the API;
- five obvious new WhatsApp spam contacts in 10 minutes or 10 in one hour:
  disable the public WhatsApp link in the next deployment, then block and
  report the senders in WhatsApp Business. Hiding the link does not make an
  already published phone number private.

During a pause, do not delete evidence or retry every notification at once.
Record the start time, check Supabase Function invocations, database counts,
Resend usage and Gmail delivery, and resume only after one controlled QA
submission reaches the correct inbox exactly once. Resume the notification
worker before reopening intake.

For Gmail, SaleSmartly and WhatsApp Business:

1. set the SaleSmartly Homeground project retention to no more than 12 months
   after the last substantive contact, subject to the same client, legal,
   dispute and security-hold exceptions as the source records;
2. each person uses a separate member account with only the channels and
   permissions needed for their work; never share the Gmail main password;
3. enable two-factor authentication and keep one recovery owner;
4. review Google OAuth grants, Gmail forwarding rules and filters,
   SaleSmartly members and roles, and WhatsApp linked devices weekly;
5. after an unfamiliar login, revoke the integration or session first, reset
   the affected password, inspect sent messages, OAuth access and forwarding
   rules, and reconnect only the required channel.

### Monthly retention and privacy-request check

Once each month, the named owner checks `Homeground inquiries` in Gmail, the
WhatsApp Business inbox and the connected SaleSmartly project:

1. Find website enquiry records approaching 12 months since they were saved,
   and separately review notification and conversation records whose last
   substantive contact was more than 12 months ago.
2. Delete the website enquiry copy no later than 12 months after saving; its
   confirmation jobs and events follow that deletion. Necessary client,
   contract, legal, dispute or security records belong in the separate
   applicable record system, not an extension of the website copy. Apply the
   disclosed business-record rules to Gmail, WhatsApp and SaleSmartly copies.
   Handling labels are not a reason to retain an otherwise expired record.
   Review the separate minimal recipient suppression record on its own terms;
   deleting an enquiry is not authorisation to contact that address again.
3. For an access, correction or deletion request received at the privacy
   email, verify the requester reasonably, then search both Email records and
   WhatsApp Business and SaleSmartly using the verified email address, public
   reference or WhatsApp number. Complete the applicable action within 30
   days.
4. Keep the completion reply in the privacy-email thread. Do not create a
   separate spreadsheet containing the traveller's details.

## 4. Lead matching and planning review

The lead planner is not a generic inbox owner. Match the lead to the traveller's
language, party, route complexity and destination focus. When a trip centres on
one destination, a planner with relevant local handling experience may lead it.
For a multi-city trip, choose the person best placed to integrate the complete
route and keep one shared planning record.

1. Before the route is finalised, the lead confirms the traveller's priorities,
   fixed dates, open questions and assumptions. A second planner reviews the
   whole journey for pace, transfers and easy-to-miss conflicts.
2. At local handover, a teammate or operating team with relevant handling
   experience confirms the current route, on-the-ground conditions, service
   scope, responsibilities and unresolved items. Keep changes in the same
   planning record.
3. Before departure, the lead checks the latest agreed arrangements, named
   contacts, handoff points and any still-open item. Escalate a conflict rather
   than silently changing the traveller's priorities.

This separates three jobs clearly: integrating the whole route, reviewing the
whole route, and validating local delivery. Do not promise zero errors, approval
by every studio member or knowledge of every city.

## 5. What the first reply asks

Start with the saved product, selected option, requested date and any actual
party details. A displayed “6-person price” selection is not confirmation that
six travellers are coming; a requested date is not a booking. Ask only for
missing facts needed to make the next planning decision, not every item below
in every first reply:

1. travel dates and flexibility;
2. arrival and departure cities, plus transport already booked;
3. adults, children and children’s ages;
4. preferred communication or guide language;
5. hotel comfort and room setup; ask about budget only when the website budget
   is absent or unclear;
6. fixed cities, must-do experiences, walking limits or things to avoid.

When a budget is present, keep the traveller's currency and range as entered.
Treat it as a rough per-person budget for the China portion of the trip with
international flights excluded. Clarify scope when necessary; never convert it
into a promised package price or describe it as a Homeground quote.

Do not promise a price, inventory, booking or local operator until a person
has checked the real trip conditions.

## 6. Local acceptance and later channel checks

For this revision, local acceptance uses rendered email previews, the local
mock or test-provider addresses, and simulated failure outcomes. Do not send
to travellers, change a mailbox or deploy while reviewing locally. Confirm
all four languages preserve the saved context, distinguish automatic from
human replies and retain the chosen marketing permissions. Actual delivery
remains unverified until a separately authorised controlled delivery check.

The following are later channel acceptance checks, not steps to execute in a
local review:

### Email

1. Submit one controlled saved enquiry from the English, Chinese, Korean and Japanese pages using
   external traveller email addresses.
2. Confirm Gmail applies `Homeground inquiries` to all four, and verify direct
   mail to `hello@` and replies to confirmations enter the same handling routine.
3. Confirm each notification contains the route, traveller answers, email,
   optional departure country, any legacy note, and either the exact optional
   budget or “Not provided”. Confirm the budget label excludes international
   flights and says that it is traveller context, not a Homeground quote.
4. Verify the internal notice has no traveller Reply-To. Open its clean reply
   draft, select the monitored `hello@` identity and confirm the recipient and
   content contain no quoted internal instructions. Also check replying to a
   real traveller message, which is a separate path.
5. Confirm the notification is delivered once and a forced Resend failure can
   be recovered. Test the confirmation switch off, eligible queued receipts,
   same-request replay, recipient cooldown and delivery failure. Internal
   notification and human handling must still work when confirmation fails.

If the form can save inquiries but Gmail notifications are not visible,
disable `NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED` in the next deployment. Use
`inquiry-deployment.md` for the Supabase, Resend and scheduler recovery steps.

### WhatsApp

1. Keep `NEXT_PUBLIC_HOMEGROUND_WHATSAPP_INTAKE_ENABLED=false` and
   server-only `WHATSAPP_ENABLED=false` while the new Privacy Notice, RPC and
   notification worker are being deployed.
2. Enable the server switch first. From an external number, submit one QA
   enquiry in English, Chinese and Korean with the public frontend still
   hidden.
3. Confirm each test creates exactly one Supabase Inquiry/outbox row and one
   Gmail notification with the correct trip brief, country, budget (or “Not
   provided”) and number.
4. Use the staff-side link in Gmail to start the correct conversation from
   the studio WhatsApp Business account. Confirm the external account receives
   the reply.
5. Set `NEXT_PUBLIC_HOMEGROUND_WHATSAPP_INTAKE_ENABLED=true`, then run a new
   successful `Deploy to GitHub Pages` workflow. Repository-variable edits do
   not change the already deployed static site.
6. On production, repeat one QA submission and confirm the person on duty can
   reply from WhatsApp Business.

For both channels, confirm the connected SaleSmartly project receives the
expected conversation without creating a duplicate outbound reply, and that
only authorised members can see the traveller contact and optional budget.

If WhatsApp fails, set server-only `WHATSAPP_ENABLED=false`, then set
`NEXT_PUBLIC_HOMEGROUND_WHATSAPP_INTAKE_ENABLED=false` and redeploy. Leave the
Email route running.

## 7. Keep the pilot routine small

Use only the two inboxes and the duty rules above while one or two people can
see every open conversation. Add separate staff accounts or more handling
states only after the actual volume makes the current handover unsafe.
