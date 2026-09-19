# Answer-first opening rewrite — 20 September 2026

## Purpose and boundary

This release improves the opening answer on eleven existing guides where the page already contained a useful, sourced answer but did not state it early or precisely enough. It covers both requested groups: product-near Zhangjiajie/itinerary guidance and general China travel utility guidance.

The release does not add an AI-summary component, a visual card, new CSS, layout changes, animation, tour pricing or service promises. `dateModified` advances to 20 September 2026. Existing `sourceReviewedDate` values remain unchanged except for `china-240-hour-visa-free-transit-route-check`: its current National Immigration Administration policy page was rechecked on 20 September 2026, so that page's source-review date advances as well.

Most Search Console evidence comes from the Web report for 22 August–18 September 2026, all countries and devices, recorded in `zh-title-description-evidence-20260919.md` and `elderly-page-title-evidence-20260919.md`. The Beijing South row comes from the earlier 9 August–5 September 2026 snapshot in `existing-guide-clicks-2026-09-08.md`; that observation predates the 8 September opening rewrite and is not treated as the current opening's performance. These page totals show where an answer is already being surfaced; they do not prove that the opening rewrite will increase clicks or AI citations.

## Changed pages

| Guide | Observed page evidence | Opening gap repaired | Factual boundary |
| --- | ---: | --- | --- |
| `how-to-pay-in-china-as-a-tourist` | ZH: 1 click / 145 impressions / 0.7% CTR / position 6.2 | Answers immediately whether an eligible foreign card can be linked to Alipay or Weixin Pay, while retaining cash/card backups and platform limits. | Reorders distinctions already explained and sourced in the guide. |
| `sanxingdui-museum-booking-and-gallery-order` | ZH: 3 / 231 / 1.3% / 8.0 | States that real-name booking is required and that the booking data and original passport must match. | Uses the existing official-channel booking instructions; no new release time or availability promise. |
| `zhangjiajie-national-forest-park-tickets-and-entrances` | ZH: 1 / 73 / 1.4% / 7.7 | Puts the reviewed admission products, four-consecutive-day validity and separate paid lifts/cableways before the entrance decision. | Keeps the 20 August 2026 review date and tells readers to recheck the live order. |
| `guangzhou-baiyun-airport-t2-t3` | ZH: 3 / 227 / 1.3% / 6.9 | States the reviewed T2/T3 passenger state and T1 suspension before transport choices. | Terminal assignment is tied to the exact operating flight and date and may change. |
| `temple-of-heaven-gates-and-ritual-sequence` | ZH: 0 / 106 / 0% / 7.1 | Leads with passport booking/ticket handling, then explains the south-to-north gate sequence. | Moves existing page guidance forward; no new hours, price or inventory claim. |
| `shaanxi-history-museum-booking-and-collection-plan` | ZH: 1 / 75 / 1.3% / 6.1 | States that saved identity data is not a reservation, names the reviewed booking-release rule and distinguishes the Main Building. | The dated release rule remains explicitly review-bound and must be checked live. |
| `summer-palace-gates-route-and-boat-plan` | ZH: 0 / 54 / 0% / 6.7 | Puts passport booking, ticket choice and service-counter fallback before the gate and boat route. | Reorders existing guidance; no boat-operation guarantee. |
| `beijing-south-station-to-capital-or-daxing-airport` | EN: 0 / 90 / 0% / 10.6 in the 9 August–5 September snapshot; predates the 8 September opening rewrite | Gives the normal PKX rail sequence and explains why PEK needs a time-, terminal- and luggage-specific comparison. | Keeps live-service and airline-cutoff conditions; no guaranteed journey time. |
| `china-240-hour-visa-free-transit-route-check` | Critical factual correction after current official-source recheck | Separates the A–China–C route-direction test from full eligibility and states the passport, nationality, ticket, port and permitted-area conditions. | Rechecked against the National Immigration Administration's current 57-country, 65-port policy on 20 September 2026; airline and immigration retain final authority. |
| `zhangjiajie-older-travellers` | EN: 2 / 80 / 2.5% / 7.3 | Replaces the absolute “mostly ridden, not walked” claim with a mobility threshold and a route-dependent explanation of walking, steps, queues and weather exposure. | Does not claim Zhangjiajie is step-free or suitable for every older traveller. |
| `beijing-zhangjiajie-shanghai-10-days` | Critical semantic consistency repair | Distinguishes ten calendar days from ten hotel nights, so the opening now matches the page's 10-night worked example and seven-full-day metric. | No transport schedule or product promise added. |

All eleven opening changes are implemented in English, Chinese and Korean: 33 localized answers in total. Publication remains a separate release step.

The `zhangjiajie-older-travellers` repair also updates the matching hero captions, section copy and first FAQ in all three languages. Those lines previously repeated the absolute “mostly ridden, not walked” claim, so leaving them unchanged would have contradicted the corrected opening and its structured FAQ answer. This is a consistency cleanup inside the same guide, not a new design or service promise.

## Pages deliberately preserved

The following pages were audited and not rewritten in this release because their openings already answer the primary decision, or because the current evidence does not justify another edit:

- `forbidden-city-for-foreign-visitors`
- `beijing-zhangjiajie-shanghai-transport`
- `singapore-to-zhangjiajie-itinerary`
- `zhangjiajie-from-malaysia`
- `best-zhangjiajie-night-show`
- `zhangjiajie-itinerary`
- `china-entry-requirements`
- `china-online-arrival-card`
- `do-singaporeans-need-visa-china`
- `do-us-citizens-need-visa-china-2026`
- `china-visa-free-uk-citizens-2026`
- `china-visa-free-canadian-citizens-2026`
- `china-visa-free-new-zealand-citizens-2026`

This prevents answer-first work from becoming repeated paraphrasing or longer introductory copy.

## Measurement after release

Deployment, crawling, indexing, search clicks and AI citations are separate outcomes. After recrawl, compare the same canonical pages over equivalent complete windows. Track impressions, clicks, CTR and position together, then separately record verified AI-answer citations and downstream product/inquiry events. A citation or traffic increase must not be claimed from the local rewrite alone.
