# Homeground inquiry runbook

Status: pilot workflow for a one- or two-person studio.

This is deliberately a small two-channel routine. The complete research spec remains
in `homeground-v1-inquiry-handoff-spec.md`; this file describes only what the
studio actually does today.

## 1. The whole human handoff

```text
Email
  Traveller enters their own email in the website form
    → Supabase saves the enquiry and Resend notifies Gmail
    → Gmail applies “Homeground inquiries”
    → the person on duty replies in the same thread

WhatsApp
  Traveller enters their own WhatsApp number in the same website form
    → Supabase saves the enquiry and Resend notifies Gmail
    → authorised staff open the staff-side WhatsApp link
    → the person on duty replies in that conversation
```

- Monitored Email inbox: `yangchunxuan1@gmail.com`
- Gmail label: `Homeground inquiries`
- Monitored WhatsApp Business number: `+86 131 7421 5999`
- WhatsApp Business action label: `Follow up` (create or confirm it before
  WhatsApp intake is enabled)
- WhatsApp intake remains disabled until one external-number QA submission is
  saved, notified to Gmail and answered from this business inbox.

The saved Inquiry form is the normal customer path. A prepared email is only
shown after the service definitively confirms that an enquiry was not saved;
it must reach this same monitored inbox. Do not copy traveller details into
personal notes, analytics or a separate spreadsheet.

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

Create one filter with this search:

```text
subject:"[Homeground]"
```

Apply the `Homeground inquiries` label. Do not make the filter mark messages
as read: an unread thread means no one has handled it yet.

Both form notifications (`[Homeground][New]`) and rare failure fallbacks
(`[Homeground][Fallback]`) therefore arrive in the same place.

## 3. Daily handling

1. Name one person on duty for each stated time block.
2. Check both Gmail and WhatsApp Business at least once in the morning and
   once in the evening.
3. In Gmail, open the `Homeground inquiries` label and start with unread
   threads. For Email, reply directly after verifying the recipient. For
   WhatsApp, use the staff-side link and verify the number before sending.
4. In WhatsApp Business, start with unread conversations and keep the original
   Gmail notification until the first reply has been sent.
5. If working from SaleSmartly, verify the selected outbound channel and
   Homeground account before sending, and check Gmail or WhatsApp first so two
   team members do not send duplicate replies.
6. Opening a thread may mark it as read. If you cannot reply immediately,
   mark it unread again and add a Gmail star or the WhatsApp Business
   `Follow up` label before leaving the conversation.
7. Keep a Gmail star or the WhatsApp Business `Follow up` label only when the
   next action belongs to Homeground. Remove it when waiting for the customer.
8. Archive the Gmail thread when no immediate studio action remains. Do not
   delete WhatsApp conversations as a way to mark work complete.

If both team members are working, the person who starts a reply sends one
short message in the team chat: “I’m handling HG-…” or “I’m handling the
WhatsApp conversation ending 1234”. No additional assignment label is needed.
At handover, name only the starred Email threads and `Follow up` WhatsApp
conversations that still need action.

### Daily missed-enquiry check

The named technical owner performs the saved-enquiry delivery checks once
every day. The person on duty also checks WhatsApp Business for conversations
that need a reply.

1. In Gmail, run:

   ```text
   label:"Homeground inquiries" is:unread older:2d
   ```

   Any result is already outside the current 48-hour reply commitment. Verify
   that no reply was sent, then answer or hand it to the person on duty
   immediately. Keep the existing Gmail thread as the handling record.

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

3. In WhatsApp Business, check unread conversations and the `Follow up` label.
   Cross-check any unhandled WhatsApp Gmail notification before closing it.

The GitHub Actions workflow named `Inquiry outbox health` runs the same health
check every 15 minutes through an independently authenticated endpoint. Its
failure is the operational alert when the outbox reaches terminal failure or
the worker/scheduler leaves a job stale. The technical owner must enable
GitHub Actions failure notifications and investigate a red run; do not paste
its secret or response into team chat.

If any failure count remains non-zero, or the workflow stays red:

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

1. Find Homeground-controlled enquiry, notification and conversation records
   whose last substantive contact was more than 12 months ago.
2. Delete those records from Gmail, Supabase, WhatsApp Business and SaleSmartly
   unless the traveller became a client, a contract or legal duty requires
   retention, or a dispute/security hold applies. Handling labels and
   synchronised copies are not reasons to keep an otherwise expired record.
3. For an access, correction or deletion request received at the privacy
   email, verify the requester reasonably, then search both Email records and
   WhatsApp Business and SaleSmartly using the verified email address, public
   reference or WhatsApp number. Complete the applicable action within 30
   days.
4. Keep the completion reply in the privacy-email thread. Do not create a
   separate spreadsheet containing the traveller's details.

## 4. What the first reply asks

Ask only for facts needed to make the next planning decision:

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

## 5. Receipt tests before enabling a channel

Use external test accounts, not the studio Gmail:

### Email

1. Submit one saved enquiry from the English, Chinese and Korean pages using
   external traveller email addresses.
2. Confirm Gmail applies `Homeground inquiries` to all three.
3. Confirm each notification contains the route, traveller answers, email,
   optional departure country, any legacy note, and either the exact optional
   budget or “Not provided”. Confirm the budget label excludes international
   flights and says that it is traveller context, not a Homeground quote.
4. Reply from Gmail and confirm `Reply-To` sends the response to the external
   traveller address.
5. Confirm the notification is delivered once and a forced Resend failure can
   be recovered.

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

## 6. Keep the pilot routine small

Use only the two inboxes and the duty rules above while one or two people can
see every open conversation. Add separate staff accounts or more handling
states only after the actual volume makes the current handover unsafe.
