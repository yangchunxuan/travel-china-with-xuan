# Beijing and Guilin public price adjustment — 2026-09-06

The owner requested public selling prices USD20 per person below the previously reviewed TravelChinaGuide four-star, same-party-size table. This is an owner-set selling-price decision, not a supplier cost or margin certification, and not a claim that the itineraries are identical.

## Approved prices

| Product / service | Party size | TCG USD/person | Homeground USD/person | CNY/person | KRW/person |
|---|---:|---:|---:|---:|---:|
| Beijing 5D4N / English guide D2–4 | 2 | 859 | 839 | 5453 | 1180000 |
| Beijing 5D4N / English guide D2–4 | 4 | 689 | 669 | 4348 | 940000 |
| Guilin & Yangshuo 5D4N / standard guided | 2 | 789 | 769 | 4998 | 1080000 |
| Guilin & Yangshuo 5D4N / standard guided | 4 | 649 | 629 | 4088 | 880000 |

Sales pages rechecked 2026-09-06:

- Beijing BJ06: https://www.travelchinaguide.com/package/beijing/11d.htm
- Guilin GL09: https://www.travelchinaguide.com/package/guilin5.htm

Both source pages label the table 2026 & 2027, per person on twin sharing, 2–3 and 4–5 travelers. Homeground continues to publish only its existing 2- and 4-traveler choices. No common departure date or availability was confirmed. Beijing guide days and hotel specifications differ; Guilin GL09 includes Longji and rafting while Homeground retains its existing river-cruise itinerary. No competitor-comparison advertising claim is added to customer pages.

## Currency and display behavior

These four rows have explicit whole-dollar USD amounts so the normal USD10 upward rounding cannot turn the approved numbers into USD840/670/770/630. CNY is the whole-yuan floor of the approved USD price times the site's existing 6.5 pricing conversion. KRW follows the existing CNY×215, rounded upward to KRW10,000. These are configured selling-price conversions, not newly checked live FX rates.

All localized row consumers use the same price formatter. Explicit USD amounts must remain positive whole dollars and may not convert back below the CNY row. Default conversion is unchanged for all other rows. Beijing no-on-site-guide prices and all itinerary, service, reservation and exclusion terms remain as before.

## Scope and release evidence

Zhangjiajie classic pricing is outside this change pending clarification; its English-guide inclusion and legacy per-group pricing model require separate treatment. Tests cover exact USD amounts, CNY/KRW values, starting-price service identity, homepage/catalog propagation and invalid overrides. Record the PR, deployment and live verification separately after release.

Local preflight: 782 inquiry/traffic/product tests passed; production build, type checking, font coverage and export checks passed. All six EN/ZH/KO product AggregateOffer ranges match the localized price rows. A structured comparison against origin/main confirmed seven other products unchanged and no itinerary/service/package/selection changes to the two adjusted products. Independent code review found no blocking issues.
