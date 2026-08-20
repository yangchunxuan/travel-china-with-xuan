# Internal Hotel, Ticket and Route Consultation Data Contracts

Status: **INTERNAL INTERFACE DESIGN — NO INVENTORY OR PUBLIC TOOL AUTHORIZED**

As-of date: 2026-08-21

## Boundary

These contracts validate a traveller's controlled consultation intent before a
separate, future human-workflow persistence step. They do not persist a lead,
expose hotel inventory, check ticket availability, quote live prices, guarantee
a booking, guarantee route safety or make an automatic recommendation.

The finite intent codes are:

```text
hotel_fit
ticket_workflow
route_shape
```

They are separate from paid route-service product IDs and from public SEO
entities. A private hotel property reference must never be added to the public
entity graph merely to support an inquiry.

## Closed envelope and registries

The request, every nested object and every intent context use exact keys. Extra
or missing keys fail. The common envelope is:

```text
contractVersion = 1
requestId = opaque UUIDv4 idempotency key
locale = en | zh | ko
intentCode
source.contentId
source.canonicalPath
source.ctaId
source.entityIds[]
travelWindow.precision
travelWindow.startDate
travelWindow.endDate
partyCounts.adults
partyCounts.children
context
privacyNoticeVersion
```

The internal module contains small frozen test registries for content/path
bindings, CTA/intent bindings, place entities, attraction entities, manual
mapping codes, privacy-notice versions and every option code. They are not
production registries. A later approved integration must inject centrally
owned registries; an unknown value fails and cannot extend a registry at
runtime.

`contentId` must resolve to the supplied canonical path and `ctaId` must resolve
to the request intent. Canonical paths are internal, slash-terminated paths with
no scheme, host, query, hash or traversal. Source entity IDs are deduplicated
controlled IDs.

Email, phone, names, addresses, passport/document numbers or images, payment
data, private notes, message text, raw referrer/query/cookie/IP values, live
prices, inventory and guarantees are not fields in this contract. Opaque IDs
and controlled codes must not encode those values. Free text is not accepted.

## Travel-window union

The three shapes are mutually exclusive:

```text
exact   → valid startDate and endDate; startDate <= endDate
month   → startDate is the first calendar day of the month; endDate = null
unknown → startDate = null; endDate = null
```

Contradictory combinations fail. `privacyNoticeVersion` records which approved
notice version was presented; it is not, by itself, proof of legal consent.

## Intent contexts

### `hotel_fit`

Every field is required:

```text
placeEntityId XOR manualPlaceCode
nights                    // integer 1–30
rooms                     // integer 1–10
budgetBand                // registered code
areaPriorityCodes[]       // registered, unique, at most 5
facilityPriorityCodes[]   // registered, unique, at most 5
```

Manual mapping is an opaque registry-issued review code, never raw place text.
Facility codes describe requested property features only; they must not contain
or be used to infer diagnoses, disability, health or other sensitive traits.

No availability, live rate, supplier state or guaranteed room type is accepted
or returned.

### `ticket_workflow`

Every field is required:

```text
attractionEntityId XOR manualAttractionCode
visitDate
timeWindowCode
travellerCount            // integer 1–30
documentCategoryCode
reservationStateCode
```

The last three codes come from closed registries. Document category may say
`passport`; passport number, document image, payment data and unmasked order
numbers remain forbidden.

### `route_shape`

Every field is required:

```text
placeEntityIds[]           // registered, unique, 1–10
totalNights                // integer 1–30
arrivalWindow
departureWindow
travellerPace
crossCityMoves             // integer 0–30
hotelChanges               // integer 0–30
```

This is descriptive human-consultation context only. It does not apply
cross-field capacity formulas and must not invoke or imitate the Route Reality
Checker until that specification's B01–B10 defects are resolved. In particular,
this validator does not claim that moves or hotel changes above the night count
are physically valid or invalid; a human may clarify them.

## Validation, persistence and commercial semantics

The internal stub can return only:

```text
code = validated
persistenceStatus = not-attempted
```

`validated` means only that the request matches this internal schema. It never
means persisted, accepted by staff, available, quoted, booked, paid, safe or
guaranteed. The stub also returns the explicit negative statements:

```text
inventoryStatus = not-checked
priceStatus = not-quoted
bookingStatus = not-promised
```

Only a future approved persistence owner may return `accepted`, and only after
an idempotent database transaction succeeds. That layer must use:

```text
not_persisted       // confirmed failure; retry policy may apply
persistence_unknown // outcome ambiguous; retry with the same requestId
```

Transport owns `rate_limited` and `service_unavailable`. Validation owns:

```text
invalid
unsupported_contract_version
unknown_entity
manual_entity_mapping_required
request_too_large
```

Malformed, missing, negative or unsupported values are `invalid`; values above
an explicit maximum are `request_too_large`. Missing entity selection requires
manual mapping, while an unregistered entity ID is `unknown_entity`.

## Internal executable contract

`tools/internal/consultation-intake-contract.mjs` validates the three exact
unions and produces the validation-only stub response. It has no network,
database, app route, API route, public registry, metadata, schema or sitemap
integration.

Tests cover exact nested keys, PII/free-text rejection, content/path and
CTA/intent bindings, controlled option registries, entity/manual-code handling,
travel-window unions, malformed-versus-too-large failures and the rule that the
stub never claims persistence or a commercial outcome.

## Central decisions

Before any production use, approve:

1. persistence owner and idempotency store;
2. controlled content/CTA/entity/manual/option registries;
3. intent and failure-code localization;
4. privacy-notice, consent, retention and deletion policy;
5. abuse/rate-limit and payload-size policy;
6. staff workflow and response SLA wording;
7. whether any intent becomes a paid service.

## Authorization

- persistence or staff queue: **false**
- real inventory connection: **false**
- public API or page: **false**
- indexable tool/page: **false**
- commercial availability promise: **false**
- deployment: **false**
