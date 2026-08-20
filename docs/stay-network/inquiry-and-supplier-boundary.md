# Stay inquiry and supplier boundary

Status: proposed privacy and operating boundary only. No form, API, database migration, supplier connection, hotel inventory, quote publication, or analytics event is implemented by this package.

Review baseline: 2026-08-21 on `origin/main` `ef189874` after PR #74. Re-run
the privacy and inquiry contract review against the then-current main before
wiring anything described here.

## Safe flow

```text
public stay owner / city Hub
        |
        | source content ID + traveller-initiated handoff
        v
private Homeground inquiry
        |
        | human triage; no supplier share by default
        v
private stay requirement
        |
        | explicit, purpose-limited share authorization
        v
selected property or DMC contact
        |
        | written, request-scoped response
        v
private verification / quote + expiry
        |
        | human explanation of conditions and alternatives
        v
traveller reply
```

Only the first box is public. The traveller's requirements, contact, property/supplier references, verification evidence, and quote are restricted workflow data.

## Existing repository handoff

At the audit baseline, the general inquiry route already provided a destination/timing/party/budget/contact submission with strict unknown-field rejection, private Supabase access, idempotency/outbox handling, and a stated retention period. A planner handoff encoded some service context into a free-text note.

That existing flow is not yet a safe stay procurement system because:

- broad destination groups are not exact lodging cities;
- it does not express a street-to-room functional access chain;
- it does not preserve legal rule, platform display, and property execution as separate evidence;
- it has no explicit, purpose-limited supplier-sharing authorization;
- it has no restricted property verification or expiring quote record;
- free-text notes can over-collect sensitive data and cannot enforce field-level sharing.

The current contract therefore remains disconnected. Central should reconcile it with the latest inquiry and privacy changes before implementation.

Until that end-to-end work ships, the existing general planner is a first-contact
channel only. It is not a `StayHandoff`, structured accommodation intake,
property-verification workflow or supplier-consent interface. This package does
not add any of those runtime capabilities.

### Minimum initial submission

Public stay CTAs may ask the traveller to submit only the minimum non-sensitive
information needed to request a human conversation:

- travel dates;
- the city or public areas being compared;
- traveller and room counts;
- an approximate accommodation budget, when useful;
- a statement that family or accessibility arrangements should be discussed in
  a later human follow-up, without the underlying details.

The initial general form must not ask for or invite:

- children's specific ages;
- mobility, medical or accessibility details;
- passport or other identity-document information;
- booking/order or payment records;
- identifiable material intended to be forwarded to a hotel, DMC or another
  supplier.

Those details may be discussed only in a separate, appropriate human workflow
after the purpose and handling are clear. Supplier sharing requires a separate,
purpose-specific affirmative consent; submitting the initial form is never that
consent.

## Public-to-private handoff

A public page may pass only non-sensitive context into a traveller-initiated inquiry:

- canonical content ID;
- exact stay city ID(s);
- decision job (for example first-trip base, airport last night, room verification, or refusal recovery);
- page language;
- optionally, a public area ID the traveller is comparing.

Do not place any of the following in a query string, URL fragment, analytics event, client log, or public content object:

- name, email, phone, messaging handle, nationality, or document class;
- dates combined with identity/contact;
- passport/document number or image;
- booking/order reference, room number, key-card number, payment credential, or QR code;
- a property/supplier reference, property confirmation, quote, or verification evidence;
- mobility details or children's ages.

The public CTA should identify the minimum initial fields, tell the traveller not
to submit the excluded details above, and explain that a human can arrange a
later conversation. It must not claim that submitting the form guarantees a
suitable room, current availability, a price, foreign-guest acceptance, or
successful recovery.

## Private intake: minimum necessary fields

`StayRequirement` describes a possible later restricted workflow; it is not the
payload accepted by the current public planner. If central later implements that
workflow, use controlled fields before adding free text. For early area advice,
dates, budget, mobility measurements, and travel-document class may remain
uncollected if they do not affect the answer.

When details are needed:

- collect children's ages at travel, not names or birth dates;
- collect a functional mobility requirement, not a diagnosis;
- collect a travel-document class, never its number or image;
- record which evidence category the traveller holds, not raw booking/payment evidence in this contract;
- collect only one reply channel needed to respond;
- use exact cities rather than grouped route destinations;
- keep budget private and label it as a planning constraint, not a market rate.

If a traveller voluntarily sends sensitive free text or an attachment, the operator needs a separate documented handling/deletion process. That is outside this contract and must not be inferred from an accepted inquiry.

## Supplier sharing: deny by default

`createDefaultSupplierSharingPreference()` returns:

```json
{
  "authorized": false,
  "allowedRecipientKinds": [],
  "allowedFieldGroups": [],
  "purpose": null,
  "consentAt": null
}
```

No property, hotel group, DMC, ground operator, platform, or other supplier receives traveller data under that state.

An `authorized: true` supplier-sharing record belongs only to the later
restricted workflow after a separate affirmative choice. It must never be
constructed from the initial general-planner submission or inferred from a
request for human help.

Before sharing, obtain an affirmative choice that records:

1. recipient kind (`property` and/or `dmc`);
2. the smallest field groups needed;
3. one purpose (`quote-request`, `room-verification`, or `recovery`);
4. a consent timestamp.

Authorization for one request is not permission to market, build a reusable guest profile, contact unrelated suppliers, or share additional field groups. A supplier must not receive the traveller's reply contact unless direct contact is necessary and separately disclosed; Homeground can relay a response by default.

Never send passport images/numbers, payment credentials, room/key-card numbers, raw medical details, or unrelated trip data through this contract. If law or a confirmed booking workflow later requires identity documents, that needs a separate high-risk design, storage policy, access control, retention schedule, and explicit consent.

## Verification boundary

Property verification must be a dated request, not a durable property badge.

For foreign-guest handling, operators record:

- the official legal source and review date;
- the platform's displayed status and observation time, if checked;
- the property's own confirmation status, channel, time, and expiry.

Do not resolve disagreement by choosing the most convenient layer. Tell the traveller what each layer says and retain a fallback plan. A platform label is not law; an official rule does not by itself prove a particular front desk's execution; one property's response does not describe a whole brand.

For accessibility, request measurements/photos for each needed segment and record segment-level results. Do not turn a platform “accessible room” label, one bathroom photo, or a lobby ramp into an end-to-end guarantee.

For international-flight, early-train, or scenic-gateway requests, verify the actual route and operating window separately. A nearby map pin is not proof that the transfer works at the traveller's time.

## Quote boundary

A quote is restricted and request-scoped. Store the supplied currency/amount, tax/fee and breakfast treatment, cancellation summary, room-category reference, response time, expiry, and the availability status at the time checked.

Required traveller-facing wording should make clear that:

- availability and price can change until the booking is accepted/confirmed;
- a quote expires and must be rechecked after material request changes;
- tax/fee, meal, occupancy, bed, and cancellation terms need written confirmation;
- a quote does not prove accessibility or foreign-guest handling unless those were separately verified.

Do not place quote data into a Guide, Destination Hub, metadata, structured SEO data, analytics, or a public “from” price.

## Refusal and registration-failure recovery

The recovery workflow should preserve facts without over-collecting identity documents:

1. Ask the front desk to identify the exact issue and request a manager/check-in procedure review.
2. Keep legal rule, platform display, and front-desk execution as separate notes.
3. Ask the booking platform or agent to record the refusal and assist with a replacement/refund under the applicable booking terms.
4. Preserve timestamped messages, cancellation/payment records, and the name or role of the contacted channel; redact passport, order, room, and payment identifiers from editorial use.
5. Search for an alternative against the actual constraints, then reconfirm with that property; do not rely on a generic platform badge.
6. If sharing needs with a replacement property/DMC, obtain fresh purpose-limited authorization when the recipient or field groups change.
7. Explain that Homeground cannot guarantee a regulatory outcome, refund, room, price, or check-in.

Any escalation to an official channel must use the current official route for the relevant jurisdiction and issue. Do not hard-code a volatile phone number into the contract.

## Storage, access, and retention requirements for future wiring

Future implementation should meet all of these before launch:

- server-only ingestion and reads; no restricted object in client state persistence;
- private tables with deny-by-default row-level access and least-privilege service roles;
- separate public area records from restricted inquiry/verification/quote records;
- encrypted transport and provider-appropriate encryption at rest;
- auditable supplier-share events that store recipient, purpose, field groups, authorization time, and operator;
- idempotency and an outbox/retry model that does not duplicate supplier messages;
- a deletion/retention schedule aligned with the public privacy notice, including downstream supplier limitations;
- redacted logs and error reporting; never log contact, document, booking, property evidence, or quote payloads;
- role-based evidence access and a way to revoke/expire stale verification and quotes;
- a data-subject request workflow and a supplier correction/deletion process;
- no analytics export of private requirements, property/supplier IDs, or outcomes tied to a person.

Do not create a public inventory table and then rely on row-level security to make it “private.” The storage purpose, API surface, and bundle boundary must all be private by design.

## Implementation gate

Before wiring this contract, central must approve a single end-to-end change covering:

- updated privacy copy and retention/subprocessor consequences;
- exact schema and migrations;
- server validation and authorization;
- supplier-consent UX;
- redaction/logging rules;
- operator runbook and fallback;
- tests for denial, expiry, duplicate delivery, withdrawal, and data deletion;
- reconciliation with PR 74 / `origin/main` `ef189874`.

Partial implementation is unsafe: collecting extra stay needs without the sharing boundary, or adding supplier messages without audit/consent/retention, must not ship.
