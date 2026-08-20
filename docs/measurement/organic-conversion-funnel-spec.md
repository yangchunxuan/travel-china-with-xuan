# Organic Landing to Purchase Measurement Specification

Status: **DESIGN AND INTERNAL TEST CONTRACT ONLY — CENTRAL APPROVAL REQUIRED**

As-of date: 2026-08-21

## Outcome and current limit

The desired chain is:

```text
organic landing → consultation CTA started → inquiry persisted → purchase confirmed
```

The current production system cannot measure that complete chain. It can
persist an inquiry and attach limited first-party attribution, but the shared
structured-guide CTA is not recorded in the first-party event ledger and there
is no authoritative order or payment source. Until those owners exist,
purchase metrics are `source-unavailable`/`null`, never zero. When an inquiry
cannot be tied to a specific recorded CTA, CTA-to-inquiry is
`linkage-unavailable`/`null`; session coincidence is not treated as proof.

This document does not authorize a production analytics change.

## Current evidence

- `EditorialGuidePage` renders the shared bottom CTA as a normal link.
- Older bespoke pages can emit `guide_cta_clicked`, but the first-party event
  mapper does not persist that event.
- `enquiry_submitted` is a browser event; the authoritative success is the
  server-persisted inquiry and its returned reference.
- `inquiries.landing_path` is the submission surface, not the original organic
  landing. The attribution table is the relevant first-party source.
- The site currently does not take payment and has no authoritative purchase
  table or order-status history.
- Current first-party attribution stores UTM and landing path, but no controlled
  organic source classification. Ordinary Google organic visits may have no UTM.

## Authoritative stages

| Stage | Event | Authority | Required rule |
|---|---|---|---|
| Landing | `organic_landing_session` | approved first-party attribution classifier | Browser may provide evidence, but cannot assert `organic` without the approved classifier. |
| CTA | `consultation_cta_started` | consented first-party event endpoint | Must carry registered content, path, CTA, position and intent codes. |
| Inquiry | `inquiry_persisted` | inquiry server/database | Emit only after the inquiry transaction succeeds; include an opaque `ctaEventId` when the link is actually preserved, otherwise `null`. |
| Purchase status | `purchase_status_changed` | centrally approved order/finance ledger | Server-side, idempotent, linked to an inquiry, and able to record `confirmed`, `refunded` or `voided`. |

All events use contract version 1, canonical UTC millisecond timestamps and
UUIDv4 opaque event/session/inquiry/purchase IDs. Email, phone, name, passport
data, message text, full referrer, query string, IP and raw cookie values are
forbidden. Opaque IDs must not encode those values.

## Acquisition decision required

Central review must choose one source-classification design:

1. First-party classifier: derive a controlled enum from referrer evidence in
   the browser, immediately discard the raw referrer and send only the enum.
2. Approved analytics bridge: use GA4 source/medium with a documented anonymous
   join that does not expose identities.

Search Console cannot provide session-level attribution. Missing consent or
missing source evidence stays `direct_or_unknown`; it must not be reclassified
as direct or organic for reporting convenience.

## Closed registries and event shapes

The internal reference contract requires closed registries for:

```text
contentIds
canonicalPaths
ctaIds
ctaPositions
intentCodes
productCodes
landingSourceSystems
ctaSourceSystems
inquirySourceSystems
purchaseSourceSystems
```

The module contains a deliberately tiny frozen test registry. It is not a
production registry. Any later approved integration must inject centrally
owned lists; unknown values fail rather than extending a registry at runtime.

Landing and CTA events carry only registered dimensions. Inquiry adds opaque
`inquiryId`, nullable opaque `ctaEventId`, and the authoritative
`isVerifiedTest` marker. Purchase status adds:

```text
inquiryId
purchaseId
productCode
currency
amountMinor
status = confirmed | refunded | voided
```

`occurredAt` is the one status-event time. There is no second ambiguous
`confirmedAt` field. The browser cannot emit an authoritative inquiry or
purchase status.

## Cohort, ordering and terminal-state rules

Every calculation requires this exact measurement window:

```text
cohortStart
cohortEndExclusive
observationCutoff
```

All three are canonical UTC instants and must satisfy:

```text
cohortStart < cohortEndExclusive <= observationCutoff
```

Landing sessions enter the denominator only when their landing time is inside
the half-open cohort. Events after the observation cutoff are excluded and
reported as `lateEventsExcluded`; changing the cutoff therefore creates a new,
explicit as-of result rather than silently rewriting an old report.

Within an attributable organic session:

```text
landing time <= CTA time <= linked inquiry time <= purchase-status time
```

Out-of-order linked events fail. A session has at most one cohort landing and an
inquiry ID has at most one persisted event. Multiple CTA events are allowed.

Purchase input is an event stream. Events are grouped by `purchaseId`; identity
fields must remain stable and the latest status at the cutoff is terminal. A
later `refunded` or `voided` state removes the earlier conversion. Equal-time
states for one purchase are ambiguous and fail. A purchase without its inquiry
fails rather than being silently counted or discarded.

## KPI framework and denominator discipline

Primary outcome, available only after the purchase owner exists:

```text
unique organic sessions with at least one terminal confirmed purchase
÷ unique attributable verified-organic landing sessions
```

Drivers:

- CTA start rate = unique organic sessions with CTA start / unique organic sessions.
- Inquiry rate = unique organic sessions with a persisted non-test inquiry / unique organic sessions.
- CTA-to-inquiry rate = unique CTA sessions with a directly linked persisted non-test inquiry / unique CTA sessions.
- Inquiry-to-purchase rate = unique persisted non-test inquiries with at least one terminal confirmed purchase / unique persisted non-test inquiries.

All conversion-rate numerators use the same unit as their denominator and
cannot exceed one. Raw inquiry and confirmed-purchase counts are reported
separately. A zero denominator produces `null`, not an invented zero rate.

CTA-to-inquiry is `null` if any attributable inquiry lacks `ctaEventId`.
Purchase count and rates are `null` whenever the approved purchase source is
unavailable. Test inquiries never enter any numerator or denominator.

Guardrails to add beside any later production funnel include attribution
coverage, direct/unknown share, duplicate event attempts, test share, browser
success versus persisted inquiry discrepancy, orphan purchase rejection,
consent coverage and late-event age. Do not call inquiries unique customers.

## Internal executable contract

`tools/internal/organic-funnel-contract.mjs` is a reference validator and
calculator only. It has no network, storage, app route, API route, analytics
import, registry publication, metadata, schema or sitemap integration.

Tests cover:

- exact event shapes, controlled registries and PII-field rejection;
- approved server authority for landing, CTA, inquiry and purchase status;
- canonical timestamps, idempotent IDs and event ordering;
- unique-session denominators with multiple inquiries;
- explicit null for missing CTA linkage and purchase source;
- terminal confirmed-to-refunded handling;
- duplicate inquiry IDs and ambiguous purchase states;
- cohort cutoff and late-event exclusion;
- verified-test exclusion and unknown acquisition handling.

## Rollout gates

Before any production wiring, central review must approve:

1. organic source-classification method;
2. first-party event endpoint, consent and retention;
3. purchase source owner and terminal-status semantics;
4. controlled source/content/path/CTA/intent/product registries;
5. opaque linkage-token design and privacy review;
6. cohort maturity and reporting-cutoff policy;
7. backfill policy (recommended: no inferred historical funnel);
8. staging reconciliation test and rollback plan.

## Authorization

- modify GA4: **false**
- modify Cloudflare: **false**
- production event wiring: **false**
- browser purchase event: **false**
- inferred historical purchase: **false**
- public API or page: **false**
