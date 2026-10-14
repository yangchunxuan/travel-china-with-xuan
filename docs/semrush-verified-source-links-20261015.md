# Verified source-link repairs after the 15 October Semrush audit

## Scope

Based on main `2c3646de3635feb799c0491f3c42395aeca74b5c`. Seven URL-only replacements repair three destinations used by nine EN/ZH/KO pages. No visible copy, prices, routes, service facts, source labels/publishers, reviewed dates, image credits, inquiry UI or crawler settings change. Historical source logs remain intact.

| Pages | Failed destination (ordinary GET) | Verified replacement | Reason |
| --- | --- | --- | --- |
| Do you need a tour guide? (EN/ZH/KO, one shared constant) | `https://intl.dpm.org.cn/ticket_details.html` (404) | [Archived official ticketing page](https://web.archive.org/web/20260411020859/https://intl.dpm.org.cn/ticket_details.html) (200) | The original official article, including reservation, identity-document and ticket-agent statements. This is a historical citation, not a live booking destination or a fresh validation of museum rules. Current `visit.html` returns 200 but does not contain the complete ticket-agent statement, so it is not substituted as if it did. |
| Hostel or budget hotel in China (EN/ZH/KO) | The `20250905070908` Wayback snapshot of `gov.cn/hudong/202405/content_6952770.htm` (404) | [Hua County official republication](https://caizhengju.hnhx.gov.cn/portal/zmhd/hygq/webinfo/2024/05/1718255213106456.htm) (200) | Same central-government response about refusal based on lack of a foreign-related qualification and lawful accommodation registration. The page expressly credits 中国政府网; original publisher attribution remains accurate. The republication date does not replace the original response/review dates. |
| Jingxian Xuan Paper Museum/workshop choice (EN/ZH/KO) | `https://www.ahjx.gov.cn/About/show/33534.html` (404) | [Current Jing County venue article](https://www.ahjx.gov.cn/Content/show/1561353.html) (200) | Same official venue description confirms the museum, production workshop and experience garden. It does not establish today's workshop/collection availability. |

Ordinary public GETs were checked on 15 October 2026 KST with normal TLS validation. Cached search results are not counted as live HTTP evidence. Before/after statuses describe these observations, not a guarantee of future availability.

## Completed audit and triage

The crawl completed with 1,278 pages (limit 5,000), desktop, JavaScript rendering disabled. Invalid structured data fell from 893 to **0**, with 4,880 passing items and zero hidden items. The health score is 83 (previous 90); the new report has 77 errors and 3,116 warnings. The earlier report had a settings-changed banner, so identical page counts alone do not establish complete comparability. No checks or warnings were hidden/excluded by this repair.

The 1,815 external-link warnings contain 1,453 `wa.me` rows. A report-only filter exposed the other 362 rows, which deduplicate to 112 targets: 88 returned 200, four returned 404, and 20 returned access/network failures. A 200 status alone is not a content-equivalence check; replacement content was independently inspected. No WhatsApp/contact link is removed because of crawler 429 responses. Mastercard/ScamShield 403 responses and similar restrictions are retained for investigation.

The remaining confirmed 404 is the [2025 Yuanyang/Laohuzui traffic-management response](https://www.hhyy.gov.cn/info/3161/397061.htm), used on three guide pages. Search cache can still read the original reply, but direct requests return 404. No matching live official republication was verified; a different road-safety notice or a generic government homepage would not be an equivalent citation. This link is explicitly unresolved, not silently removed or declared repaired.

The 38 reported internal-link failures and 11 hreflang failures point to the same four reported 503 pages, all now rechecked as 200. The 15 internal-image failures point to one Guangzhou image, now 200 with `image/webp`. Both reported CSS/JavaScript resources now return 200 with the proper content type and are still referenced by their current pages. These observations do not establish the cause of the earlier 503s or prove permanent resolution. No good internal link is changed to mask a failed crawl. The four sitemap errors likewise name the same four now-200 pages. In total, 74 error rows are tied to seven reported 503 targets (four pages, one image and two script/style resources), now rechecked as 200. The remaining three error rows are slow-page measurements of 3.20, 3.98 and 4.71 seconds; they are a separate performance investigation, not dead links or proof of visitor Core Web Vitals.

The 100 external-image warning rows consist of 98 Wikimedia 429 responses and the two old wetland citation spellings already corrected by PR #372. Those two old citations are absent from current production. Image-credit provenance and working images are preserved.

## Evidence

Local evidence directory: `/Users/yangchunxuan/Desktop/Homeground-SEO/company-schema-20261014/release/`.

- `semrush-final-results-20261015.json`, completed overview/issues and structured-data-zero screenshots/text.
- `external-nonwa-records.json`, `external-recheck.json`: all 362 observed report rows and 112 deduplicated ordinary GET results.
- `verified-source-replacements.json`: independent content/provenance review of the Jingxian, hotel and unresolved Yuanyang sources.
- `palace-archive.html`, `palace-source-check.json`: archived original and current live alternatives.
- `source-link-diff-review.json`: independent confirmation that seven source substitutions are the entire code diff.
- `five-recheck.json`, `guangzhou-hero-recheck.json`, `internal-resource-recheck.json`: current page/image/resource evidence.

This follow-up is a draft for review. It is not merged, deployed, re-crawled or proven indexed. PR #372's production/standby acceptance is recorded separately under `release/pr372/`.

## Verification

- Guide registry/content manifest consistency and whitespace checks passed.
- Five affected existing tour-guide decision/static price tests passed; no new tests were added for URL-only substitutions.
- Complete production build and all postbuild checks passed with the current workflow's 33 public build settings.
- TypeScript, indexable-export and ten-day-guide-export checks passed.
- All nine changed static exports were compared against the verified PR #372 baseline. After normalizing only the expected URLs, text, all anchor attributes, image attributes, canonical and parsed JSON-LD match exactly. No visual/interaction redesign occurred.
- Independent diff/provenance review found no blockers. No real inquiry or customer email was submitted.
