# Arabic core edition — Saudi Arabia and UAE

Status: review draft; not authorized for production publication by this task.
Date: 17 October 2026. Baseline: `c896104fea8d3f3b188a71228d91b31cda6a9153` (German edition).

## Search rationale and limits

The saved 17 October Semrush visible-UI observations give Saudi estimated monthly volumes of 210 for `السياحة في الصين`, 40 for `السفر إلى الصين`, 20 for `برنامج سياحي في الصين`, 20 for `رحلات سياحية الى الصين`, and 10 for `عروض رحلات سياحية الى الصين`. The UAE family-tourism variant `السياحة في الصين للعوائل` has an estimated 30. These are overlapping search phrases, not unique travellers or orders. Missing private/family/two-week metrics remain unavailable, not zero.

The saved Search Console country export covers Web searches on 17 September–14 October 2026, all site queries: Saudi Arabia 49 impressions/1 click; UAE 164 impressions/0 clicks. Country does not identify language, citizenship, spending power or buying intent. The export predates Arabic publication and is not a forecast. German has since launched; the older export's note saying no German edition is stale.

This task attempted the Saudi keyword page in Chrome; Semrush displayed its active-session warning. No new metrics were obtained. No subscription upgrade, export restriction workaround, private API, or session-limit bypass was used. The earlier evidence is reused with its date and limitations.

Directly read public competitors on 17 October:

- [JawlatPro Saudi](https://shop.jawlat-pro.sa/ar): private/family coordination, tickets and transfers. Evidence of offer language, not verified traffic, capabilities or orders.
- [NCT Arabic services](https://nihaochinatour.com/ar/services): custom private China journeys and transfers. Its advertised guides, reviews and service guarantees are not Homeground facts.

These pages support clear Arabic descriptions of real products. They do not establish Saudi-local search positions. No new country-specific visa claim, guaranteed Arabic guide, halal guarantee, international airfare inclusion or luxury certification is added.

## Query-to-page ownership

| Query family | Primary Arabic URL | Specific treatment | Priority / verification |
| --- | --- | --- | --- |
| `رحلات سياحية الى الصين` and private-tour variants | `/ar/tours/` | One comparison owner with route, nights, source prices and inclusions; no duplicate Saudi/UAE landing pages | P1: indexation, Arabic non-brand queries and the page Google selects |
| `برنامج سياحي في الصين` | `/ar/tours/` and actual duration-specific products | Hub comparison, then 8/12/13/14-day routes matching their real schedules | P1: query/page relevance and product-page impressions |
| `عروض رحلات سياحية الى الصين` | `/ar/tours/` | Published group-size prices remain USD/CNY; quote-only products stay quote-only; international flights excluded | P1: relevant impressions, no invented discount/airfare offer |
| `السياحة في الصين للعوائل` | `/ar/` then relevant existing products | Explain private-party travel and needs to discuss; no unsupported child discount or family package | P2: Saudi/UAE country + Arabic query cross-check after enough data |
| broad China tourism / preparation | `/ar/guides/` | Arabic directory and explicit English-article/search disclosure; no fabricated Arabic article URLs | P2: relevant non-brand visits and correct landing page |
| attraction ticket booking / private guide / car | Four `/ar/services/<service>/` pages | Full Arabic descriptions of the current service scope, rates, reservation exceptions and language limits | P1: indexed service pages and query/page relevance |

The scope is the existing French/German 71-page core: 55 structured tours, the classic Zhangjiajie four-day and Terracotta half-day products, ten core pages (including contact), and four service details. Detailed guide articles, destination collections and subsequent guide-library pages remain English and are labelled accordingly.

## Implementation boundaries

- English product objects continue to own all numerical prices, currencies, party-size rows, package IDs, transport/service policy, day ordering, route/media assets and published/preview status. Arabic adapters supply display text only.
- No SAR/AED conversion. International flights are excluded. Included guide/driver-host languages remain product-specific; Arabic-speaking guide availability and separate price are unconfirmed until written confirmation.
- Existing inquiry flow and accepted English intake contract are preserved. Source-language marker and translated interface are supplied by the edition adapter; automatic receipt email remains English and is disclosed. No conversion redesign, customer submission, email or WhatsApp send.
- `lang="ar"`, `dir="rtl"`; local OFL Noto Sans Arabic variable font, no new dependency or images. Word-level hero animation preserves joining. Marked Arabic currency strings are isolated left-to-right so numbers and ISO codes cannot reverse.
- Date formatting explicitly uses the Gregorian calendar and Latin digits (`ar-SA-u-ca-gregory-nu-latn`); the calendar uses the installed Arabic locale and RTL direction. Travel date ISO values stay unchanged.
- Canonical, reciprocal hreflang, sitemap and actual language-switch destinations include only existing equivalents. The half-day product has no Japanese equivalent. No Arabic detailed-guide hreflang is invented.

## Acceptance and measurement

Local evidence: `~/Desktop/Homeground-SEO/arabic-core-edition-20261017/` (logs, market baseline, review records and screenshots). Final results are recorded in `acceptance.json`; build/CI are separate from production.

After a future approved deployment: verify release SHA and live 71 pages before claiming launch. Then establish Search Console indexation and query/page/country baselines. Review crawl/indexation first after 7–14 days; assess comparable 28-day non-brand Arabic impressions/clicks and landing-page relevance after sufficient data. Low volumes can require longer. Do not infer SEO impact from inquiries alone or promise rankings/orders. No ads, paid upgrades, Search Console requests or IndexNow submission are part of this draft task.
