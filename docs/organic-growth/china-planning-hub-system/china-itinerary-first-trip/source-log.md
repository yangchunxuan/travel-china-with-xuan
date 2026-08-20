# China Itinerary / First Trip Hub — source and fact plan

**Review date:** 2026-08-20

**Dynamic-fact rule:** the Hub states planning method, not current schedules, inventory, fares, opening times or personal eligibility. Those facts are rechecked on the traveller’s date by the relevant official source and child owner.

## Repository and governance evidence

| ID | Source | Supports | Result |
|---|---|---|---|
| R01 | `docs/organic-growth/search-map.json` on the latest main | Published Hub identity, candidate collisions and canonical owners | `hub-plan` remains the generic first-trip and itinerary owner |
| R02 | `lib/searchPlatformI18n.ts` | Existing locale scope for trip length, order, traveller fit, pace and budget | Draft extends the existing task; no new collection is proposed |
| R03 | `lib/searchCollectionI18n.ts` | The three approved plan collections | They remain narrow browsing layers under `/plan/` |
| R04 | `docs/organic-growth/do-not-repeat.md` | Anti-cannibalization rules | No generic duration template, pace collection or combination-index pages |
| R05 | `lib/chinaItineraryTooRushedI18n.ts` | Published editorial validation owner | Hub summarizes the checkpoint and links; it does not reproduce the diagnostic |
| R06 | `docs/paid-service-pathways-spec.md` and `lib/chinaItineraryReviewI18n.ts` | Human handoff, service boundaries and payment sequence | Editorial answer comes first; service details stay on their owner |
| R07 | `docs/homeground-photo-provenance.md` | Existing image origin, rights and evidence boundaries | Only assets with complete rights review may be reused |
| R08 | PR #74 merged as `ef1898745a3c7a6e7cd308aa341c352f24fe9d01` | Current Search Map and rushed-itinerary strengthening | Used as current-main evidence after rebase; not treated as a separate live deployment claim |

## Official-source routing plan

| Fact class | Primary authority or first-party evidence | Hub usage |
|---|---|---|
| Entry and transit | National Immigration Administration and the relevant Chinese embassy/consulate | Never summarized as personal eligibility here; route to the current entry owner |
| Civil aviation | CAAC, the operating airport and the operating airline | Used by child owners for airport, terminal, disruption and baggage facts |
| Rail | China Railway 12306 and the actual ticket | Exact train, station, time and inventory remain outside the Hub |
| Public holidays and adjusted workdays | General Office of the State Council notice for the confirmed year | Annual dates remain with `china-public-holidays-travel-calendar`; never predict an unpublished year |
| Attraction tickets and opening | The operating venue’s official booking channel and notice page | The Hub uses only the rule “verify the actual date” |
| Hotel operation and cancellation | The exact property plus the contracted booking channel | No national acceptance, room, access or cancellation guarantee is made |

## Homeground editorial judgments

The following are explicitly editorial methods, not government facts or measured universal constants:

- use hotel nights and a date ledger before choosing a route label;
- assign each overnight base a distinct role;
- count transfers from hotel door to hotel door;
- place high-consequence constraints before flexible activities;
- repair overload by removing a dependency or weak base before compressing every visit;
- name the first item to drop in a failure plan.

These judgments should be reviewed against real route examples during editorial QA, but they must not be presented as guaranteed time savings or a universal city limit.

## Post-merge drift to resolve centrally

The Search Map narrative counts lag the state produced by the PR #74 merge: its top summary still contains pre-merge guide/Hub counts and a “not published” note, while repository main contains the merged owners. This does not change the canonical decision, but central should refresh the inventory before using the counts in public or governance copy.
