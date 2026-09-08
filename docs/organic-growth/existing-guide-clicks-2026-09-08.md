# Existing guide click-through improvements — 8 September 2026

The owner requested existing articles receive click-through improvements before expanding topic coverage. This change uses the saved Search Console snapshot read on 8 September: Web search, 9 August–5 September 2026, all countries and devices. These are exact English-page totals, not counts of English-speaking people or inquiries. No new Search Console fetch or query-by-page report is claimed.

| Existing English guide | Clicks | Impressions | CTR | Average position | Change |
| --- | ---: | ---: | ---: | ---: | --- |
| Forbidden City for foreign visitors | 2 | 189 | 1.1% | 8.4 | Put passport-based ticket booking and entry in the preview; replace vague recovery language with a direct first answer. |
| How to read a Suzhou garden | 0 | 139 | 0% | 6.8 | Explain which of the four already-compared gardens to choose and what to notice; move that existing comparison before the detailed cultural interpretation. |
| Guangzhou to Macau | 0 | 132 | 0% | 9.3 | Name the directional journey and the Gongbei/Hengqin choice; explain Macau Peninsula versus Cotai without implying a through train across the border. |
| Guangzhou–Shenzhen–Hong Kong route order | 0 | 95 | 0% | 9.1 | Retain the already descriptive search title; replace abstract preview/headline wording with trip direction, Shenzhen overnight choice and hotel-to-border planning. |
| Beijing South to Capital or Daxing Airport | 0 | 90 | 0% | 10.6 | Put airport names alongside their codes and summarize the existing rail/bus/taxi choices before the connection checklist. |

The page snapshot is `Desktop/Homeground-SEO/refresh-2026-09-08/gsc-28d-pages-top100.json` on the owner's computer. It preserves 100 of the report's 586 page rows. The global query snapshot preserves 500 of 960 rows. Related visible queries such as “guangzhou to macau” and “beijing south railway station to daxing airport” are intent clues, not confirmed queries for these exact pages. The observation window predates this release; low CTR alone does not establish that wording caused the result.

## Scope and checks

Five existing English articles are edited. Canonical URLs, language alternatives, publication dates, factual review dates, images, product prices, shared conversion UI and the underlying detailed travel facts remain unchanged. The editorial modification date is 8 September. Chinese and Korean copy is retained. Existing contract checks are updated to preserve the separate modification/review dates and Tiananmen access coverage.

The Shanghai-airport and Zhangjiajie-night-show pages were changed earlier on 8 September and are left to accumulate later evidence. The custom Beijing–Zhangjiajie–Shanghai transport page already has an answer-first title and lead from `lib/beijingZhangjiajieShanghaiTransportI18n.ts`; its older registry label is not mistaken for the actual rendered metadata. No duplicate guide is created.

The owner's additional suggestion to use Xiaohongshu is appropriate for finding traveler questions and practical experiences. Public searches in this pass have not yielded directly readable original comments. No third-party summary, repost or search snippet is attributed to a verified Xiaohongshu commenter, and none is used to establish ticketing, transport or entry rules in this release.

Google's [title guidance](https://developers.google.com/search/docs/appearance/title-link) and [snippet guidance](https://developers.google.com/search/docs/appearance/snippet) support specific, descriptive previews that match the page. Google may choose a different title or snippet, and must reprocess changes before its results reflect them. The current [Palace Museum visit page](https://intl.dpm.org.cn/visit.html) was reopened for the limited advance-ticket/passport points, and [Beijing's July airport-bus notice](https://english.beijing.gov.cn/livinginbeijing/transportation/bus/202607/t20260727_4792045.html) for the limited directional bus context; this is not a fresh review of every rule or service in either guide.

## Local validation

Type checking, the 834-test inquiry/content contract suite and the production static build passed. A final browser pass checked 25 page/locale/viewport combinations: English at 320, 390 and 1440 pixels, and Chinese/Korean at 390 pixels for all five guides. Titles, descriptions, headlines, canonicals, language alternatives, image loading, in-page anchors and page-width bounds passed. A separate reviewer inspected five mobile/desktop hero screenshots with no blocking visual findings; the moved Suzhou comparison was also inspected on desktop and mobile. Its existing wide table uses horizontal scrolling on mobile. No shared presentation component was changed.

Evidence is saved under `Desktop/Homeground-SEO/existing-clicks-2026-09-08/`: build/test logs, before-after metadata and local browser results/screenshots. These are local checks; production verification is recorded separately after deployment.

## Measurement after publication

Record the deployed commit and verify the live titles, descriptions, leading answers, internal links, canonicals and mobile/desktop rendering. After search engines reprocess the pages, compare the same exact URLs and query/device/country segments across comparable windows. Track impressions, clicks, CTR and position together; a changing query mix can change aggregate CTR. Product visits and saved non-test inquiries are separate downstream measures. This release is an implementation, not evidence of increased clicks.
