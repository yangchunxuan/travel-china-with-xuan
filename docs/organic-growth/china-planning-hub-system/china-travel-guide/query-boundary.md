# China Travel Guide query boundary

**Decision:** `UPDATE EXISTING HUB — NO NEW CANONICAL URL`

**Owner:** `system-guides`

**Locale paths:** `/guides/`, `/zh/guides/`, `/ko/guides/`

## Queries this Hub owns

| Locale | Head and close-intent queries |
|---|---|
| EN | `china travel guide`, `travel guide to china`, `china trip guide`, broad “how do I start planning China?” discovery intent |
| ZH | `中国旅行指南`, `中国旅游规划入门`, `去中国旅行先准备什么` when the intent is broad information navigation rather than a route |
| KO | `중국 여행 가이드`, `중국 여행 준비`, `중국 여행 준비는 어디서 시작할까` when the user needs the national information map rather than a route |

The answer is a decision-led directory covering entry, places, itinerary design, transport, accommodation, timing, tickets and practical setup. It is not a comprehensive encyclopedia.

## Queries routed elsewhere

| Intent | Canonical owner | Boundary |
|---|---|---|
| `china itinerary`, `first trip to china`, route-building method | `hub-plan` at `/plan/` | `/guides/` identifies itinerary planning as the next task; `/plan/` performs it |
| Is this route too rushed; generic duration pressure | `is-your-china-itinerary-too-rushed` | Owns public editorial diagnosis |
| Named city sequence or city pair | Exact route-order or transport owner | The Hub must not repeat the detailed answer |
| Passport or transit eligibility | Exact entry owner below `/essentials/` | No individual eligibility decision on the Hub |
| Live train, flight, hotel or ticket availability | Official operator/venue | No live inventory or schedule promise |
| Where to stay in a named city | Exact destination/stay owner | `/stay/` routes by base; city owner handles local geography |
| Attraction booking execution | Exact attraction/ticket owner | The Hub explains the verification step only |
| Paid route review/build/support | `/china-itinerary-review/` | Commercial intent and current scope belong to the service owner |

## Forbidden competing URLs

Do not create `/china-travel-guide/`, `/guides/china-travel-guide/`, `/travel-guide-to-china/` or translated equivalents. Do not create national synonyms such as “complete China guide” as separate pages.

Do not create city × month × days × traveller-type pages. A child URL requires a distinct, evidenced decision and a documented boundary against its parent and every existing owner.

## Route Reality boundary

The Hub may explain the concepts of whole-transfer time, hotel-change cost, fixed-booking conflict, recovery and buffer. It must link to the published rushed-itinerary guide for editorial validation. It must not expose the internal Route Reality Checker, imply an instant score, collect its inputs, serialize them into a URL, or offer a generated itinerary.

## Metadata and on-page guardrails

- Keep the canonical and hreflang set on the three existing locale paths.
- Use one H1 per locale; do not add a second “China Travel Guide” article below the catalogue.
- The first screen must explain the directory function and offer routes to inspiration, planning and practical preparation.
- Title/H1 testing must not move the owner or redirect a locale independently.
- Any year appears only in a child owner with a verified annual fact, never in this evergreen Hub title or path.
