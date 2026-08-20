# China Travel Guide source log

**Review date:** 2026-08-20

**Scope:** source and ownership record for an evergreen navigation Hub, not a current-rule article

## Internal authority and implementation evidence

| Source | What it establishes | Use in draft |
|---|---|---|
| `app/(default)/guides/guidesHubI18n.ts` | Existing EN/ZH/KO `/guides/` paths, H1, metadata and human-planner CTA | Establishes `system-guides` as the existing Hub to update |
| `lib/searchPlatformI18n.ts` | Current Explore, Plan, Transport, Timing, Stay, Essentials, Culture, Tools and Services section identities | Establishes the nine-part taxonomy; current main approves eight public section Hubs and keeps Tools outside that approved set |
| `docs/organic-growth/search-map.json` | Published owners and collision decisions | Prevents a new China Travel Guide URL and preserves child ownership |
| `docs/organic-growth/do-not-repeat.md` | Do-not-split rules for itinerary pace, duration templates and Route Reality | Supports exclusions and no combination URLs |
| `docs/paid-service-pathways-spec.md` | Shared brief, human triage, service confirmation and off-site payment sequence | Supports the final CTA without promising an automatic or free deliverable |
| PR #74 merged in current main as `ef1898745a3c7a6e7cd308aa341c352f24fe9d01` | Current merged Search Map collision decisions, deferred first-24-hours item and non-public tool boundary | Used as merged-main ownership evidence; the former PR branch was not cherry-picked and production deployment was not independently asserted |

## External official sources to retain at implementation

The Hub deliberately makes no passport-specific, timetable-specific, venue-specific or price claim. These official sources define the current facts that child owners must verify.

| Authority | URL | Fact class | Hub treatment |
|---|---|---|---|
| National Immigration Administration | https://en.nia.gov.cn/ | Entry and transit notices | Route to the exact entry guide; warn that nationality, purpose and route matter |
| China Railway 12306 | https://www.12306.cn/en/index.html | Railway stations, ticketing and passenger process | Route to transport/rail owners; do not publish live inventory here |
| State Council of the PRC | https://english.www.gov.cn/ | Annual public-holiday notices and national policy releases | Route to the annual holiday owner; “not yet published” when absent |
| Civil Aviation Administration of China | https://www.caac.gov.cn/ | National civil-aviation authority and public notices | Use for aviation context; exact operation remains with carrier/airport |
| Individual attraction and venue operators | exact official page recorded by child owner | Opening, booking, identity, refund and closure rules | Venue notice is the last operational check |
| Individual hotel/property | direct written confirmation | Passport acceptance, check-in hours and access details | Never generalize one property confirmation into a national rule |

## Claim policy

- Evergreen reasoning such as “count door-to-door movement” is editorial method, not a promised duration.
- No live fare, inventory, opening hour, ticket-release window, visa eligibility or crowd score belongs in the Hub.
- Child owners retain their `sourceReviewedDate`; the Hub must display or preserve an update signal when those cards are rendered.
- At implementation, central must rerun the owner/URL audit against the latest main and merged Search Map before wiring links.
