# Homeground inquiry runbook

Status: pilot workflow for a one- or two-person studio.

This is deliberately a mailbox routine, not a CRM. The complete research spec
remains in `homeground-v1-inquiry-handoff-spec.md`; this file describes only
what the studio actually does today.

## 1. The whole human handoff

```text
Traveller enters their own email in the website form
  → Supabase saves the enquiry and Resend notifies Gmail
  → Gmail applies “Homeground inquiries”
  → the person on duty replies in the same thread
  → Sent mail is the reply record
  → archive the thread when no studio action remains
```

- Current monitored inbox: `yangchunxuan1@gmail.com`
- Gmail label: `Homeground inquiries`
- WhatsApp intake: disabled until a real international send-and-receive test
- AI chat, CRM, assignment states and a second tracking sheet: not used

The saved Inquiry form is the normal customer path. A prepared email is only
shown after the service definitively confirms that an enquiry was not saved;
it must reach this same monitored inbox. Do not copy traveller details into
personal notes, analytics or a separate spreadsheet.

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

1. One person is on duty for a stated block of time.
2. Open the `Homeground inquiries` label and start with unread threads.
3. Reply directly in Gmail. Form notifications set `Reply-To` to the
   traveller; verify the recipient before sending.
4. Leave a thread unread until the first reply has actually been sent.
5. Add a star only when Homeground owes a later follow-up.
6. Archive the thread when no immediate studio action remains.

If both team members are working, the person who starts a reply sends one
short message in the team chat: “I’m handling HG-…”. No mailbox claim label is
needed. At a shift handover, say which starred threads still need action.

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

## 5. Receipt test before enabling the saved form

Use external test accounts, not the studio Gmail:

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

## 6. Add complexity only when the volume proves it is needed

Move to Gmail delegation or Google Workspace when more people need separate
accounts. Add a second status or CRM only when the inbox volume makes it
impossible to see what needs action. Do not add AI chat, Gmail API integration
or automated sales qualification before real enquiries show a clear need.
