# Stay network data dictionary

Status: architecture contract only; not connected to public UI, an API, analytics, Supabase, a supplier, or a live inventory feed.

Review baseline: 2026-08-21 on `origin/main` `ef189874` after PR #74. Central
integration must compare this dictionary with the then-current inquiry,
privacy, content and destination schemas and rerun the contract tests.

## Purpose and non-goals

The stay network needs two different kinds of information:

1. Durable, source-backed editorial decisions that may be published: which area fits a defined trip task, which gateway or attraction cluster it relates to, and which trade-offs change the conclusion.
2. Request-specific operational information that must remain restricted: a traveller's requirements, a property's current confirmation, and a time-limited quote.

The contract keeps those categories separate. It is not a hotel directory, property catalogue, supplier ranking, booking engine, availability cache, public price feed, or guarantee that a hotel will accept a guest or meet an accessibility need.

The executable source of truth is [`lib/stayNetworkContract.ts`](../../lib/stayNetworkContract.ts). This document explains the editorial and privacy meaning of its fields.

## Exact city identity

Stay records use exact city IDs, independent of the broader trip-planner destination groups:

| Stay city ID | English label | Scope note |
| --- | --- | --- |
| `beijing` | Beijing | Municipality |
| `shanghai` | Shanghai | Municipality |
| `xian` | Xi'an | City, not the whole Shaanxi route |
| `chengdu` | Chengdu | City, not the whole Sichuan route |
| `guangzhou` | Guangzhou | Separate from Shenzhen |
| `zhangjiajie` | Zhangjiajie | City plus explicitly named scenic gateways in relations |
| `hangzhou` | Hangzhou | Separate from Suzhou |
| `chongqing` | Chongqing | Municipality; area records must state the actual urban/scenic scope |
| `guilin` | Guilin | Separate from Yangshuo; a Yangshuo owner needs its own future decision |
| `shenzhen` | Shenzhen | Separate from Guangzhou |

Grouped planner IDs such as `guilin-yangshuo`, `hangzhou-suzhou`, and `guangzhou-shenzhen` must not be used for lodging decisions. They erase the exact gateway, last-mile, and municipal context that changes a stay recommendation.

## Layer A: public area-decision record

`StayAreaDecisionRecord` is the only record intended to become public. Every record owns one area-level decision, not a property.

| Field | Meaning | Publication rule |
| --- | --- | --- |
| `schemaVersion` | Contract version | Must equal the current contract version |
| `recordKind` | Always `stay-area-decision` | Prevents accidental mixing with restricted records |
| `cityId` | One exact stay city | Must be in the ten-city list |
| `areaId` | Stable area slug | Editorial identity, not a platform neighbourhood tag |
| `names` | English, Simplified Chinese, and Korean area names | All three are required and independently edited |
| `canonicalOwner` | Route, content ID, and disposition | Records whether the decision belongs in a Hub, owner, FAQ, new owner, or hold queue |
| `decisionJobs` | The traveller tasks this area comparison answers | At least one; a generic city description is insufficient |
| `gatewayRelations` | Area relationship to an airport, railway/coach station, or scenic gateway | Describe topology (`direct`, `one-transfer`, and so on), conditions, and source IDs; do not promise a journey time |
| `attractionClusterRelations` | Relationship to a durable attraction cluster | Use a cluster ID and sourced conditions, not a hotel-to-attraction sales claim |
| `accessContext` | Area-level terrain, last mile, and typical vehicle access | This is context for choosing an area, never proof that a room or route is accessible |
| `travellerFit` | Conditional fit for first-time, family, older, and mobility-needs travellers | Every fit includes conditions; `task-specific` and `not-reviewed` are valid conclusions |
| `tradeoffs` | Costs of choosing the area | Must explain what the traveller gives up, in three languages |
| `sourceIds` | References to the source ledger | At least one; dynamic facts also need a current review date |
| `sourceReviewedDate` | Date sources were last checked | `YYYY-MM-DD`; not the article publish date unless actually rechecked then |
| `recheckTriggers` | Events that can invalidate the conclusion | Examples: station/line changes, access restrictions, construction, or gateway changes |
| `imageAssetIds` | References to cleared real-scene assets | Empty is allowed for a draft; publication QA must then fail until assets are supplied |
| `status` | Draft/review lifecycle | `recheck-required` blocks a stale conclusion from being treated as current |

### Public forbidden fields

The public validator recursively blocks fields that imply:

- a named or identified property/hotel;
- a supplier or commercial source;
- a room rate, quote, inventory, availability, or current bookability;
- foreign-guest acceptance or an accessibility guarantee;
- a passport, booking/order reference, room/key-card number, payment credential, guest name, email, phone, or date of birth.

It also blocks common positive guarantee claims such as “guaranteed accessible room” or “all foreigners can check in.” A carefully worded limitation such as “an area-level fit does not guarantee an accessible room” is allowed.

Public content can explain a verification procedure and uncertainty. It cannot serialize the result of a property-specific check.

## Layer B: restricted traveller requirement

`StayRequirement` represents what a human operator needs to understand a request. It is restricted PII-bearing workflow data, never article content or analytics payload.

| Group | Fields | Data-minimisation rule |
| --- | --- | --- |
| Request scope | `requestKind`, exact `cityIds`, `stayWindows` | Collect only cities/dates needed for the requested work; dates may remain null during early area advice |
| Gateways | `arrival`, `departure` | Store node and time band; avoid ticket/order numbers |
| Party | adults, children's ages at travel, room count | Ages at travel support occupancy checks; do not collect children's names or birth dates |
| Room | bed/connecting-room preference and controlled `needIds` | Use functional needs rather than a free-text medical history |
| Mobility | step-free need, aid category, walking limit, door-width requirement | Describe the route/room task; do not request diagnosis or medical records |
| Luggage | controlled size category | Enough to assess last mile and transfers; no bag tags |
| Document class | passport/ID/travel-document category | Never a document number or image |
| Budget | optional currency and range | A private planning constraint, not a public market price |
| Recovery | booking channel, problem class, evidence types held | Record that evidence exists, not the booking reference or document itself in this contract |
| Origin | content ID and language | Used for operator context, not behavioural profiling |
| Reply contact | one channel and value | Restricted PII; never copied to content or analytics |
| Supplier sharing | explicit authorization, recipients, field groups, purpose, timestamp | Defaults to false and empty; purpose-limited consent is required before any external share |

The contract intentionally does not accept passport numbers/images, room numbers, key-card details, payment-card data, or raw medical notes.

## Layer C: restricted property verification

`PropertyVerificationSnapshot` is request-scoped and time-bounded. It uses opaque internal references rather than publishing a property directory.

Foreign-guest handling has three mandatory, independent layers:

| Layer | What it records | What it does not prove |
| --- | --- | --- |
| `legalRule` | The official national/local source, scope, and review date | It does not prove a platform label or a front desk's current execution |
| `platformDisplay` | What a platform displayed and when | A platform label is not law and does not guarantee check-in |
| `propertyConfirmation` | What the specific property confirmed/declined/could not confirm, by channel and time | It is not permanent; it may expire and should not be generalized to a brand or city |

The three layers are allowed to conflict. A record can correctly show a permissive official rule, a compatible platform label, and an operator who is unable to confirm the front desk's execution. The workflow must preserve that conflict instead of collapsing it into `acceptsForeigners: true/false`.

`accessChain` records separately checked segments from street to bathroom. “Verified” applies only to the named segment and evidence. A missing or failed segment prevents an end-to-end accessibility conclusion.

Every snapshot has `verifiedAt`, `expiresAt`, and source references. Expiry is a prompt to recheck, not an automatic negative conclusion.

## Layer D: restricted request-scoped quote

`StayQuoteSnapshot` records a written response for one request and one room-category reference. It includes currency, amount, tax/fee and breakfast treatment, cancellation summary, current request-scoped availability, receipt time, and expiry.

Rules:

- Never publish a quote as durable editorial data.
- Never convert `confirmed-at-check` into a promise of future inventory.
- Never generalize a supplier's response to a brand, city, nationality, or room label.
- Reconfirm after `validUntil`, before payment, and when dates/party/room needs change.
- Keep the supplier and property references opaque and restricted.

## Runtime boundaries

The pure validators return either `{ ok: true, value }` or `{ ok: false, issues }`. The public validator combines a strict top-level shape check, nested shape checks, city/enum/date checks, recursive forbidden-field detection, and a narrow positive-guarantee copy guard.

The contract deliberately has no network calls, storage functions, React imports, route handlers, analytics events, or database types. A future implementation needs a separate privacy/security review and must not simply import restricted types into a client bundle.

## Change control

Any field addition requires answers to these questions:

1. Is it public area-level editorial evidence or restricted request-specific operations data?
2. Does it identify a property, supplier, traveller, booking, room, or payment?
3. Can it become stale, and what review date/expiry/recheck trigger is required?
4. Can a platform display be mistaken for a legal rule or property confirmation?
5. Can the field imply inventory, price, acceptance, accessibility, or another guarantee?
6. Is the same decision represented by an existing owner/Hub/FAQ?
7. Do three-language labels and conditions carry the same decision information?
8. Do the contract and boundary tests fail safely when the field is misplaced?
