# Homeground inquiry runbook

Status: pilot workflow for a one- or two-person studio.

This is deliberately a two-inbox routine. The complete research spec remains
in `homeground-v1-inquiry-handoff-spec.md`; this file describes only what the
studio actually does today.

## 1. The whole human handoff

```text
Email
  Traveller enters their own email in the website form
    → Supabase saves the enquiry and Resend notifies Gmail
    → Gmail applies “Homeground inquiries”
    → the person on duty replies in the same thread

Direct WhatsApp
  Traveller opens the prefilled Homeground link
    → traveller taps Send in WhatsApp
    → the message appears in the studio WhatsApp Business inbox
    → the person on duty replies in that conversation
```

- Monitored Email inbox: `yangchunxuan1@gmail.com`
- Gmail label: `Homeground inquiries`
- Monitored WhatsApp Business number: `+86 131 7421 5999`
- WhatsApp Business action label: `Follow up` (create or confirm it before
  Direct WhatsApp is enabled)
- Direct WhatsApp remains disabled until a real external account has sent a
  message and this business inbox has received it.

The saved Inquiry form is the normal customer path. A prepared email is only
shown after the service definitively confirms that an enquiry was not saved;
it must reach this same monitored inbox. Do not copy traveller details into
personal notes, analytics or a separate spreadsheet.

Direct WhatsApp does not submit to the Inquiry API, save an Inquiry or outbox
row, or notify Gmail. Opening WhatsApp is not a received enquiry. Only a
message visibly received in the studio WhatsApp Business inbox enters the
work queue.

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
   threads. Reply directly; form notifications set `Reply-To` to the
   traveller, but verify the recipient before sending.
4. In WhatsApp Business, start with unread incoming conversations. Confirm
   that the customer actually sent the prefilled route before treating it as
   an enquiry.
5. Opening a thread may mark it as read. If you cannot reply immediately,
   mark it unread again and add a Gmail star or the WhatsApp Business
   `Follow up` label before leaving the conversation.
6. Keep a Gmail star or the WhatsApp Business `Follow up` label only when the
   next action belongs to Homeground. Remove it when waiting for the customer.
7. Archive the Gmail thread when no immediate studio action remains. Do not
   delete WhatsApp conversations as a way to mark work complete.

If both team members are working, the person who starts a reply sends one
short message in the team chat: “I’m handling HG-…” or “I’m handling the
WhatsApp conversation ending 1234”. No additional assignment label is needed.
At handover, name only the starred Email threads and `Follow up` WhatsApp
conversations that still need action.

### Daily missed-enquiry check

The named technical owner performs the Email delivery checks once every day.
The person on duty separately checks WhatsApp Business because direct
WhatsApp has no database or Gmail failure signal.

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
   delivered; recheck after five minutes. The query returns counts only—never
   Inquiry IDs, contact details or notes.

3. In WhatsApp Business, check unread conversations and the `Follow up` label.
   Because a direct WhatsApp click never reaches Homeground's API, no Supabase
   query or Gmail alert can reveal a missed WhatsApp conversation.

The GitHub Actions workflow named `Inquiry outbox health` runs the same health
check every 15 minutes through an independently authenticated endpoint. Its
failure is the operational alert when the outbox reaches terminal failure or
the worker/scheduler leaves a job stale. The technical owner must enable
GitHub Actions failure notifications and investigate a red run; do not paste
its secret or response into team chat.

If any failure count remains non-zero, or the workflow stays red:

1. stop new public submissions by disabling
   `NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED` in the next deployment;
2. check the notification schedule, Edge Function and Resend configuration
   using `inquiry-deployment.md`;
3. restore the cause before retrying failed jobs;
4. repeat the aggregate query and confirm the workflow returns green.

### Monthly retention and privacy-request check

Once each month, the named owner checks both `Homeground inquiries` in Gmail
and the WhatsApp Business inbox:

1. Find Homeground-controlled enquiry, notification and conversation records
   whose last substantive contact was more than 12 months ago.
2. Delete those records from Gmail, Supabase and WhatsApp Business unless the
   traveller became a client, a contract or legal duty requires retention, or
   a dispute/security hold applies. Handling labels are not a reason to keep
   an otherwise expired record.
3. For an access, correction or deletion request received at the privacy
   email, verify the requester reasonably, then search both Email records and
   WhatsApp Business using the verified email address, public reference or
   WhatsApp number. Complete the applicable action within 30 days.
4. Keep the completion reply in the privacy-email thread. Do not create a
   separate spreadsheet containing the traveller's details.

## 4. What the first reply asks

Ask only for facts needed to make the next planning decision:

1. travel dates and flexibility;
2. arrival and departure cities, plus transport already booked;
3. adults, children and children’s ages;
4. preferred communication or guide language;
5. hotel comfort, room setup and a rough budget range;
6. fixed cities, must-do experiences, walking limits or things to avoid.

Do not promise a price, inventory, booking or local operator until a person
has checked the real trip conditions.

## 5. Receipt tests before enabling a channel

Use external test accounts, not the studio Gmail:

### Email

1. Submit one saved enquiry from the English, Chinese and Korean pages using
   external traveller email addresses.
2. Confirm Gmail applies `Homeground inquiries` to all three.
3. Confirm each notification contains the route, four answers, traveller
   email and optional note.
4. Reply from Gmail and confirm `Reply-To` sends the response to the external
   traveller address.
5. Confirm the notification is delivered once and a forced Resend failure can
   be recovered.

If the form can save inquiries but Gmail notifications are not visible,
disable `NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED` in the next deployment. Use
`inquiry-deployment.md` for the Supabase, Resend and scheduler recovery steps.

### Direct WhatsApp

1. Keep `NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED=false` while the new
   Privacy Notice versions and business number are being configured.
2. From an external WhatsApp account, test the English, Chinese and Korean
   route links on a real phone. Tap Send; merely seeing WhatsApp open does not
   pass the test.
3. Confirm the studio WhatsApp Business inbox receives the correct route
   summary from the external account.
4. Confirm the test creates no Supabase Inquiry/outbox row and no Gmail
   notification.
5. Set the GitHub repository variables to the verified number and `true`, then
   run a new successful `Deploy to GitHub Pages` workflow. Repository-variable
   edits do not change the already deployed static site.
6. On production, send one message marked `QA` from the external account and
   confirm the person on duty can reply from WhatsApp Business.

If WhatsApp fails, set
`NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED=false`, redeploy, and leave
the Email route running. The server-only `WHATSAPP_ENABLED` value remains
`false`.

## 6. Keep the pilot routine small

Use only the two inboxes and the duty rules above while one or two people can
see every open conversation. Add separate staff accounts or more handling
states only after the actual volume makes the current handover unsafe.
