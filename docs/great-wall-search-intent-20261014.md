# Great Wall search-intent follow-up — 14 October 2026

## Evidence and scope

Read Semrush Keyword Magic Tool in Chrome for `great wall tour`, broad match, separately in the United States, Australia and Canada on 14 October 2026 (KST). The figures below are displayed estimated monthly search volumes, not visits, inquiries or orders. The visible metric update ages ranged from one day to one month; today's observation is not a claim that every metric was refreshed today.

| English query | US volume / KD | AU volume / KD | CA volume / KD |
| --- | --- | --- | --- |
| great wall tour | 880 / 32 | 480 / 20 | 320 / 23 |
| beijing great wall tours | 1,600 / 42 | 590 / 20 | 320 / 29 |
| mutianyu great wall tour | Not in inspected result slice | 70 / 19 | 40 / 32 |
| beijing great wall day tour | 110 / 30 | 20 / unavailable | 20 / unavailable |

Semrush labels the US `great wall tour` and `beijing great wall day tour` rows commercial. The other fully populated rows above are informational. The Australian and Canadian day-tour rows lack intent and KD; these values were not guessed. Similar queries overlap, so their volumes must not be summed.

The four private-tour terms supplied in the user's bulk report had already been researched across these three markets on 13 October. Today's Australian readback matched that snapshot; no metric refresh was requested for those four terms. Existing Korean tracking and other project configuration were left untouched. No export restriction was bypassed, no subscription was upgraded, and no paid add-on was used.

Sources: [Semrush Keyword Magic Tool](https://zh.semrush.com/analytics/keywordmagic/), [Semrush Keyword Overview](https://zh.semrush.com/analytics/keywordoverview/). Native accessibility snapshots and structured observations are retained in the local `semrush-next-20261014` research directory, separate from the repository.

## Query → existing page → action

| Query/reader need | Existing page | Change | Priority |
| --- | --- | --- | --- |
| Great Wall tour; deciding which section | `great-wall-section-selector-from-beijing` | Explain that the five-day Beijing product visits Badaling; add the existing eight-day Beijing–Xi'an–Shanghai route and identify its Mutianyu visit. | P1 |
| Mutianyu tour; transport from Beijing | `beijing-to-mutianyu-great-wall-transfer` | Replace the generic fallback tour recommendation with the actual Mutianyu-containing eight-day route. Clearly identify it as a three-city trip and retain the separately quoted private-car enquiry for a one-day visit. | P1 |
| Mutianyu tickets; considering a longer itinerary | `mutianyu-great-wall-tickets` | Keep the recently reviewed five-day Badaling card. Add a clearly labelled eight-day Mutianyu route to the related published itineraries. | P2 |
| Standalone private Great Wall day tour | Existing private-car and guide services | Retain separate quotation; do not create an uncosted day-tour package or describe the eight-day product as one. Supplier costs and inclusions remain unverified. | Deferred |

This is an intent-match and internal-link correction, not evidence of a ranking increase. Broad terms support investigating the topic; they do not establish incremental demand for this business. Assess later using Search Console page/query clicks and impressions, and the existing CTA/inquiry measurements. No new tracking events are added.

## Fact and collaboration boundaries

- Base: `c24baea46ec7b39c81ed5e293dca43e337ad491d`, verified against GitHub main before editing.
- The Beijing five-day product remains a Badaling route. The eight-day Beijing–Xi'an–Shanghai product's Great Wall day is Mutianyu, confirmed in `lib/privateTourLongHaulProducts.ts`.
- Product prices, inclusions, itineraries, availability and supplier claims are unchanged.
- Article bodies, metadata, reservation rules, private-car service copy and Claude's article/service work are untouched.
- English is the research priority; Chinese and Korean link/card wording is aligned because these shared components render all three languages.
- This branch is for a draft PR only. Production publication is a separate step.
