# China Travel Guide internal-link plan

## Outbound decision map

| Hub stage | EN path | ZH path | KO path | Link job |
|---|---|---|---|---|
| Inspiration | `/explore/` | `/zh/explore/` | `/ko/explore/` | Choose place roles before route order |
| Cultural context | `/culture/` | `/zh/culture/` | `/ko/culture/` | Understand history, living practice, food and arts after choosing an interest |
| Choice | `/plan/` | `/zh/plan/` | `/ko/plan/` | Convert nights and priorities into a route skeleton |
| Entry/practical | `/essentials/` | `/zh/essentials/` | `/ko/essentials/` | Route to passport, payment, connectivity and booking owners |
| Transport | `/transport/` | `/zh/transport/` | `/ko/transport/` | Resolve airports, stations, city pairs and last mile |
| Stay | `/stay/` | `/zh/stay/` | `/ko/stay/` | Choose a repeat-use base before a property |
| Timing | `/when-to-go/` | `/zh/when-to-go/` | `/ko/when-to-go/` | Check weather, holidays and seasonal conditions |
| Validation | `/guides/is-your-china-itinerary-too-rushed/` | `/zh/guides/is-your-china-itinerary-too-rushed/` | `/ko/guides/is-your-china-itinerary-too-rushed/` | Public route-pressure diagnosis; never label it the private Checker |
| Human help | `/china-itinerary-review/` | `/zh/china-itinerary-review/` | `/ko/china-itinerary-review/` | Compare human Route Review, Route Build and separately scoped support |

## High-value child links in the draft

All paths below were present in the content baseline reviewed on 2026-08-20. Integration must recheck the registry after rebasing.

| Decision | Owner slug |
|---|---|
| Arrival-day timed anchor or flexible block | `china-arrival-day-booked-anchor-or-flexible-block` |
| Beijing–Xi’an–Chengdu order | `beijing-xian-chengdu-route-order` |
| Shanghai–Suzhou–Hangzhou–Nanjing order | `shanghai-suzhou-hangzhou-nanjing-route-order` |
| Open-jaw versus return gateway | `china-open-jaw-flights-route-planning` |
| Hub-and-spoke versus multi-base | `china-hub-and-spoke-or-multi-base-route` |
| First high-speed-rail trip | `china-high-speed-train-first-time-guide` |
| Night train versus daytime HSR | `china-night-train-or-daytime-high-speed-rail` |
| Private transfer versus public transport | `china-private-transfer-or-public-transport` |
| Hotel proximity to metro | `china-hotel-near-metro` |
| Wheelchair access chain | `wheelchair-accessible-china-route-planning` |
| Public holidays and compensatory workdays | `china-public-holidays-travel-calendar` |
| Official versus reseller tickets | `official-or-reseller-china-tickets` |
| Young children | `china-itinerary-with-young-children` |
| Older parents | `china-itinerary-with-older-parents` |
| Final night before an international flight | `china-last-night-before-international-flight` |

Construct locale links as `/guides/{slug}/`, `/zh/guides/{slug}/` and `/ko/guides/{slug}/`. Do not cross languages when the same-locale owner exists.

## Inbound links to request at implementation

| Source | Suggested anchor function |
|---|---|
| Home / primary navigation | Broad “China Travel Guides” discovery entry |
| `/explore/` | “Return to the complete planning library” after inspiration |
| `/plan/` | “Browse all China travel decisions” for non-itinerary questions |
| `/essentials/`, `/transport/`, `/stay/`, `/when-to-go/`, `/culture/` | Parent library breadcrumb or sibling navigation, not keyword-stuffed body copy |
| Destination Hubs | One return link for readers who need national practical preparation |
| Service page | Editorial self-planning path for visitors not ready for human work |

## Link QA

- Each body link must advance one decision; do not turn every noun into a link.
- Maintain the same decision and relative placement across EN/ZH/KO.
- Do not link to the internal Route Reality documents from public copy.
- Recheck generated locale paths with the registry before implementation.
- If a child owner is unpublished or noindex after rebase, route to its live parent instead of exposing a draft URL.
