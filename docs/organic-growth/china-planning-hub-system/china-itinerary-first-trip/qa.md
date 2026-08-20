# China Itinerary / First Trip Hub — QA record

**Draft state:** central review required

**Implementation action:** update existing `/plan/` locale Hubs; no new canonical URL

## Scope checks

- [x] Existing canonical owner used in all three locales.
- [x] No `/china-itinerary/`, `/first-trip-to-china/` or combination-index page proposed.
- [x] Ten main H2s retained in the same order in English, Chinese and Korean.
- [x] The opening gives a direct first-trip planning answer before describing the system.
- [x] More than half of the draft serves route choice, usable-day accounting, transfer handling, constraint placement, validation and recovery.
- [x] The Hub does not reproduce a named city route or personalized day-by-day itinerary.
- [x] Route-reality concepts are used only as a non-public editorial method and no result is calculated.

## Trilingual parity matrix

| Module | EN | ZH | KO |
|---|---:|---:|---:|
| Six starting decisions | 6 | 6 | 6 |
| Day classifications | 4 | 4 | 4 |
| City roles | 5 | 5 | 5 |
| Door-to-door transfer components | 6 | 6 | 6 |
| Route geometries | 3 | 3 | 3 |
| Constraint placement order | 5 | 5 | 5 |
| Traveller examples | 3 | 3 | 3 |
| Validation steps | 7 | 7 | 7 |
| Recovery actions | 5 | 5 | 5 |
| Human-help states | 3 | 3 | 3 |

The locale drafts use natural phrasing rather than sentence-by-sentence literal translation. Names, numbers, warning strength, link roles and service boundaries remain equivalent.

## Fact and commercial checks

- [x] No live transport inventory, fare, timetable, opening hour or availability claim.
- [x] No personal entry-eligibility conclusion.
- [x] No universal city maximum, time saving or budget saving is invented.
- [x] Public-holiday content routes to the confirmed annual owner and does not guess a future calendar.
- [x] Route Review, Route Build and custom support are differentiated by traveller state.
- [x] The Hub does not lead with US$69/US$129 or copy the full service offer.
- [x] Enquiry, scope confirmation, payment instruction and start of paid work remain separate.
- [x] No online checkout or automatic route is implied.

## Image checks

- [x] Original decision graphic recommended for the hero.
- [x] Documentary candidates identify an actual place or node.
- [x] Every photograph has an evidence-boundary note.
- [x] No AI documentary photo, undated crowd claim or misleading city comparison is proposed.
- [ ] Central must choose final assets and complete the publication rights ledger.
- [ ] Central must produce and visually review the original hero.

## Integration checks still required

- Confirm every locale link is still published and indexable when implemented.
- Confirm live metadata length and SERP differentiation from `/guides/` and `/china-itinerary-review/`.
- Confirm breadcrumbs remain `system-guides` → `hub-plan` and no collection is elevated.
- Run accessibility checks on the rendered tables, cards, headings and diagram alternative.
- Rebuild any shared font subset only in the central integration branch if new glyphs require it; this docs-only branch must not commit shared fonts.
- Update the Search Map inventory drift created by the PR #74 merge in central governance work, not in this article branch.
