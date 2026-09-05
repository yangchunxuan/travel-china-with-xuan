# Commercial search page changes — 5 September 2026

This change makes six existing page identities easier to evaluate before contacting Homeground. It does not create new landing pages or alter products, prices, inquiry names, canonical URLs, or language ownership.

## Evidence and limits

Same-day Search Console observations cover the displayed three-month selection, with actual data from 9 July through 2 September 2026. The property showed 145 clicks and 11,123 impressions. Page-row totals use a different aggregation and must not be substituted for property totals. English `/tours/` had 9 impressions and no clicks; the English Guilin product had 5 impressions and no clicks. The query `guilin private tour` had one impression and no clicks. These small samples support a cautious starting point, not a claim that copy caused low exposure.

English `/china-itinerary-review/` had 111 impressions, no clicks and an average position of 7.5. Its route-review purpose and paid service scope remain intact. Only its introduction changes to explain deliverables more directly.

The existing Semrush Position Tracking campaign was reread on 5 September: South Korea / Google / Korean / Desktop, nine existing informational queries. Its history and settings remain intact. A fresh US/Desktop Keyword Overview request for `guilin private tour` displayed “무료 요청 10개를 모두 사용했습니다” (all ten free requests used). No usable new volume or difficulty figures were retrieved; N/A is not zero. An attempted eight-term bulk lookup did not yield a result. No trial, paid upgrade, replacement target or competitor configuration was saved in this sprint.

Public search and competing operators' pages were used to inspect search intent and product presentation. The research tool did not supply a verifiable Google US/English/Desktop ranking environment. Result order is not reported as rank, and competitors' service claims are not adopted as Homeground facts.

## Page ownership and changes

| Existing English owner | Query intent | Change, applied consistently in English, Chinese and Korean |
| --- | --- | --- |
| `/tours/` | private China tours; custom China tours as a related intent | Search title and introduction explain itinerary, starting-price and inclusion comparison. The final prompt explains that adjustments and a written quote need confirmation; fixed routes retain their scope. |
| `/tours/beijing-highlights-5-day-private-tour/` | 5 day Beijing private tour; Beijing private tour | Search title specifies Badaling and the Forbidden City. The introduction distinguishes three touring days from the five-day stay. Three short questions explain guide options, Great Wall transport exclusions and reservation conditions. |
| `/tours/guilin-yangshuo-5-day-private-tour/` | Guilin private tour; Guilin Yangshuo 5 day private tour | Keep the existing title. The description emphasizes the Li River cruise and two consecutive Yangshuo nights. Three questions explain luggage, the omission of Longji, and the separate bamboo-raft upgrade and either/or Guilin attraction choice. |
| `/tours/zhangjiajie-4-day-private-tour/` | Zhangjiajie private tour; 4 day Zhangjiajie private tour | Keep the established English search title and existing route comparison/FAQ. The introduction states arrival on Day 1, sightseeing on Days 2–4, and the departure-time check. Korean metadata uses natural duration wording. |
| `/tours/zhangjiajie-forest-4-day-private-tour/` | Zhangjiajie National Forest Park private tour | Distinct search title and description identify the fixed walking route, two park days, one villa base, and no cable cars or elevators. The controlled product name and existing comparison link remain unchanged. |
| `/china-itinerary-review/` | China itinerary review; route-planning service | The introduction states the review's city-order, transfer, hotel-base and pacing checks, and distinguishes reviewing a plan from building a route. Existing pricing and service boundaries remain unchanged. |

The optional product FAQ is server-rendered only where there are entries: Beijing and Guilin, three languages each. It adds no `FAQPage` schema. Search metadata overrides are independent of the controlled product title and inquiry name. Modification dates advance only for these six changed identities; existing full-review dates are not fabricated.

## Source pages

- [The China Guide](https://www.thechinaguide.com/) and [HelloChinaTrip custom inquiry](https://hellochinatrip.com/custom): example routes and custom-trip inquiry structure.
- [ChinaTours Beijing five-day product](https://www.chinatours.com/destination-tour/beijing-4n5d-tour/): explicit Great Wall section, arrival/departure days and included services.
- [Wendy Wei Tours Guilin](https://www.wendyweitours.com/guilin-tours/): separation of day tours and multi-day options.
- [EastChinaTrip Guilin five-day product](https://www.eastchinatrip.com/tours/guilin-li-river-yangshuo-longji-5-day-private-tour/): title explicitly includes Longji; no unverified detail or price copied.
- [TravelChinaGuide Zhangjiajie four-day product](https://www.travelchinaguide.com/package/zhangjiajie/4-days.htm): arrival plus sightseeing-day presentation and final-day logistics.

## Pre-release verification

- Existing inquiry/regression suite: 754 passed; guide search: 7 passed; type check passed.
- Production build, CJK font coverage, search-platform export, ten-day guide export and 12 priority indexable targets passed. Production dependency audit found zero vulnerabilities.
- Rendered HTML for all 18 changed language URLs was checked for metadata, one H1, self canonical, four language alternates, indexability, localized consultation links and a 5 September sitemap modification date. The two FAQ-bearing products each render three questions per language.
- Independent content review found no material errors and verified unchanged product identities, itineraries, inclusions and price tiers.
- Actual browser inspection included desktop, 390px and 320px views. An independent reviewer saw only screenshots and viewport dimensions, then passed the ten captured views for clipping, overlap and readability within visible areas.
- Local browser selection of Beijing / no on-site guide / four travellers carried the exact selection into the Chinese contact section. No inquiry was submitted and no external messaging link was opened.

## Measurement handoff

After deployment, use the release date as an annotation and compare equivalent complete GSC windows, separating page and query dimensions. Track impressions and clicks to each canonical English owner, relevant non-brand commercial queries, and existing inquiry-start/selection events. Low sample counts and an incomplete recent-data window do not demonstrate improvement or decline. Local validation, deployment, crawling, indexing, rankings and inquiries are separate outcomes.

Candidate English tracking terms: `private China tours`, `custom China tours`, `Beijing private tour`, `5 day Beijing private tour`, `Guilin private tour`, `Guilin Yangshuo 5 day private tour`, `Zhangjiajie private tour`, `4 day Zhangjiajie private tour`, `China itinerary review`. These are a prepared list, not an active Semrush campaign. Confirm any target change and history loss immediately before a destructive replacement. No scheduled follow-up or indexing request is created by this document.

Raw account observations, research notes and validation logs are saved locally under the user's Desktop `Homeground-SEO` folder, including `commercial-sprint-2026-09-05`. The release record should state the actual PR, deployment result and live readback; this document alone is not deployment evidence.
