# Technical review disposition

Status: **V2 CONTRACT DISPOSITION READY — IMPLEMENTATION STILL BLOCKED**

Reviewed source: worker 8 technical review dated 2026-08-14

This ledger records how Route Reality v2 responds to B01–B10 and R01–R12. A
"resolved in contract" status means the ambiguity is removed from the written
model. It does not authorize an engine or approve any numerical policy.

## Blocking defects B01–B10

| Review item | v2 disposition | Evidence | Status |
|---|---|---|---|
| B01 — known, unknown and relational domains disagree | Counts have scalar limits plus the same concrete relational predicates for known and unknown states. `C + H <= N - 1`; `T <= N + 1`. Unknowns are filtered only inside joint tuples. | `rules.md` §§2, 4–5; fixtures `BND-*`, `UNK-*`, `REL-*` | Resolved in contract |
| B02 — independent unknown endpoints create impossible combinations | Unknown expansion is nested and correlated. Independent endpoint multiplication is prohibited. | `rules.md` §5; `UNK-02`, `UNK-03`, `PROP-05` | Resolved in contract |
| B03 — cross-city/hotel subtraction lacks stable overlap | `C` counts overnight-base-change days. `H` counts only extra accommodation-change days not represented by `C`. No subtraction is allowed. | `rules.md` §§3.2–3.3; `SEM-02`, `SEM-03` | Resolved in contract |
| B04 — marginal day ranges do not reconcile | Every concrete day receives exactly one class. Joint tuples must satisfy `F + G + U = calendarDays`; marginal ranges are marked non-additive. | `rules.md` §7; schema `JointDayClassification`; `PROP-01`, `REG-14` | Resolved in contract |
| B05 — gross burden treated as capacity consumed | Gross burden, applied tax and placement-derived net are separate. Net uses clamped per-day remaining capacity. | `rules.md` §6.3; `PROP-02` | Resolved in contract; numeric pack pending |
| B06 — unlimited same-day stacking | One accommodation-change event per transition day and one complex interchange per calendar day; at most one of each may share a slot. Known non-placeable counts are invalid. | `rules.md` §4; `REL-01`–`REL-05` | Resolved in contract |
| B07 — invalid result cannot be represented | Output is a discriminated union. Invalid output has ordered closed-code errors, `decisionUseful:false` and `result:null`. | `data-model.schema.json`; `rules.md` §§2.2, 8; `INV-*` | Resolved in contract |
| B08 — unknown extreme shown as confirmed | Alerts carry `confirmed` or `possible_unknown_extreme`; quantified definitions use all versus some feasible witnesses. | `rules.md` §9; `UNK-01`, `PROP-03` | Resolved in contract; alert triggers pending |
| B09 — unstable codes, assumptions and ordering | Codes and IDs are closed; error, alert, unknown and assumption order is normative; localized prose is outside the core; version and canonical serialization are fixed. | schema enums; `rules.md` §§2.2, 9–10; `PROP-04` | Resolved in contract |
| B10 — all-unknown buffer is not actionable | Unknown nights force `decisionUseful:false`, `suggestedBufferDays:null` and `bufferActionable:false`. | `rules.md` §§8, 11; `UNK-01` | Resolved in contract |

## Required revisions R01–R12

| Revision | Disposition | Status |
|---|---|---|
| R01 strict field validation and multi-error behaviour | Exact plain object, exactly seven keys, exact scalar domains and stable all-error order are specified. | Complete in contract |
| R02 unambiguous cross-city and hotel overlap plus examples | `C` and `H` semantics are non-overlapping; eight positive/negative examples are documented. | Complete in contract |
| R03 relational bounds consistent with unknown | The same concrete predicates define validation and unknown enumeration. | Complete in contract |
| R04 correlated nested expansion | Normative loop order and feasibility filtering are specified. | Complete in contract |
| R05 event placement, sharing and overflow | Slot sets and sharing limits are defined. Unsupported raw multi-event days are an explicit coverage limit. | Complete in contract |
| R06 mutually exclusive joint classifications | Joint tuple is source of truth; marginal ranges are non-additive. | Complete in contract |
| R07 placement-derived net and split burden/tax | Exact structural identities are specified; coefficient values await a policy pack. | Contract complete; policy pending |
| R08 discriminated union and closed validation codes | Implemented in target JSON Schema. | Complete in contract |
| R09 alert basis, precedence, order, deduplication | Quantified basis, severity precedence and closed serialization order are specified. | Contract complete; triggers pending |
| R10 stable IDs, version, localization and serialization | Schema and rules freeze identifiers/order and separate localization. Both output arms require `policyPackVersion:null` while policy is unapproved; any non-null pack requires a schema/model version bump. | Complete in contract |
| R11 non-actionable all-unknown state | `decisionUseful:false`, null buffer and no connection guarantee are mandatory. | Complete in contract |
| R12 correct named cases and add full matrix | `REG-12`, `REG-13`, `REG-14`, `REG-19`, `REG-20` encode corrected behaviour; 41 total internal scenarios/properties cover the wider matrix, including three non-calculable handoff cases. | Complete at contract-fixture level; golden numerics pending |

## Named-case correction notes

- Former T12: v2 does not preserve an incomplete expected alert list. If the
  approved trigger finds no guaranteed full day, that alert must appear with
  the correctly quantified basis.
- Former T13: invalid topology short-circuits every score and alert. It cannot
  return a tax range alongside `invalid`.
- Former T14: joint tuples reconcile. Marginal endpoints are explicitly
  non-additive, and no old confidence label is carried forward.
- Former T19/T20: both are representable by the invalid arm with closed codes
  and `result:null`.

## Still-open implementation gates

The contract fixes ambiguity but deliberately leaves these gates open:

1. approve a versioned numeric `PolicyPack`;
2. add exact golden numeric outputs for all applicable fixtures;
3. independently review the DP/oracle equivalence and performance ceiling;
4. add EN/ZH/KO assumption and alert dictionaries with parity tests;
5. conduct privacy, security, accessibility, product-value and search reviews;
6. obtain separate authorization before any public surface or telemetry; and
7. reconfirm that the existing rushed-itinerary guide remains canonical.

Until all gates close, technical feasibility is **documented but not approved
for implementation**.
