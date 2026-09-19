# Meta-description rewrite — page-one guides with no clicks — 2026-09-19

Search Console, web search, last 28 days (2026-08-22 → 2026-09-18). All pages below rank on page one and received zero or almost zero clicks. Titles for most of them were already rewritten (#176); this pass rewrites only the English `description` (the snippet under the title), leading with the answer instead of "Compare…".

| Page | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| `/guides/food-plants-and-animal-products-into-china/` | 8 | 516 | 1.6% | 5.5 |
| `/guides/guangzhou-macau-transport-route/` | 0 | 197 | 0% | 8.6 |
| `/guides/how-to-read-a-suzhou-garden/` | 0 | 182 | 0% | 6.8 |
| `/guides/guangzhou-shenzhen-hong-kong-route-order/` | 0 | 126 | 0% | 8.6 |
| `/guides/how-food-reaches-your-seat-on-china-train/` | 0 | 118 | 0% | 7.2 |
| `/guides/woodblock-and-movable-type-printing-decisions/` | 0 | 105 | 0% | 7.7 |
| `/guides/beijing-zhangjiajie-shanghai-transport/` | 0 | 94 | 0% | 7.8 |
| `/guides/qinling-huaihe-transition-zone/` | 0 | 86 | 0% | 6.7 |
| `/guides/wukong-nezha-games-animation-myth-guide/` | 0 | 68 | 0% | 8.4 |
| `/guides/china-robotaxi-zones-explained/` | 0 | 58 | 0% | 5.9 |
| `/guides/shanghai-suzhou-hangzhou-nanjing-route-order/` | 0 | 52 | 0% | 7.1 |

Deliberately excluded although they qualify: `beijing-south-station-to-capital-or-daxing-airport`, `first-shared-meal-in-china`, `forbidden-city-for-foreign-visitors`, `shanghai-where-to-stay-first-trip`. Their descriptions are rendered as card copy on the homepage editorial rail (`lib/homepageEditorial.ts`), and the homepage must not change visibly.

Scope: English `description` only (110–158 characters, every claim taken from the page body). Chinese and Korean descriptions, titles, headlines and bodies are untouched. `beijing-zhangjiajie-shanghai-transport` serves its meta description from `lib/beijingZhangjiajieShanghaiTransportI18n.ts`; the registry copy used by listings was aligned to the same text.
