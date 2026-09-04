# Source log

**Initial research/content capture:** 2026-09-01 (Asia/Shanghai)

**Full source and current-channel recheck:** 2026-09-04 (Asia/Shanghai)

**Baseline audited:** `origin/main@c13d83e1abc8f5f25ee2250de11eed8c424a0196`

## Search-demand observation

Google was observed read-only on 2026-09-01 with personalization disabled (`pws=0`) in English (`stay in Xi'an or Huayin before Mount Hua`), Simplified Chinese (`华山前一晚住西安还是华阴`) and Korean (`중국 화산 여행 전날 시안에 묵을까 화인에 묵을까`). Location reporting was inconsistent: English and Chinese footer location was unknown, the English results box referenced Xi’an, and Korean localized results reported Paju, Korea. Conclusions therefore apply only to these query sets and observation windows; no search volume, click or conversion estimate is claimed.

- **English:** an AI summary and a few exact or adjacent results discussed Huayin versus a Xi’an day trip. PAA contained only broad itinerary questions—days in Xi’an, whether Mount Hua is worth visiting and how to reach it. Exact results tended to recommend a place or property without joining the booked entry, complete descent, baggage custody and failed-return recovery.
- **Chinese:** no observed PAA or related-search module. The first page was dominated by broad route articles, accommodation listings and short “day return or stay once” advice. No observed owner organized the decision by ropeway versus walking check-in, last descent-to-bed chain and luggage.
- **Korean:** an AI summary gave a coarse two-choice answer, while natural results were mostly irrelevant or route-led; no observed PAA or related-search module and no independent first-entry/last-exit accommodation owner was found.
- **Gap:** the information gain is a four-pattern sleep decision—Xi’an both sides, Huayin pre-night, Huayin post-night, or Huayin both sides—anchored to current official entry and operation facts. It is not “more hotels”.

## Traveller-question discovery

The candidate audit retained two direct Reddit permalinks observed on 2026-09-01: a [Huayin pre-night question](https://www.reddit.com/r/travelchina/comments/1u6clfm/) and a [night-climb/base question](https://www.reddit.com/r/travelchina/comments/1vofsty/). They establish only that travellers ask how the adjacent night changes; post replies do not establish a route, hotel practice, opening condition or safety fact. Forums were used only to discover unresolved questions, never as authority. A precise post timestamp was not retained, so no recency claim is made beyond the dated observation.

## Canonical audit

The audit covered 173 main guide metadata identities, 19 legacy registry identities and 181 `origin/article/*` plus `origin/codex/*` ref tips. No ref name, commit title or guide body/metadata contained a reserved Mount Hua, Huashan or Huayin accommodation owner. The published Xi’an destination Hub already owns whether Mount Hua justifies another day or nearby night; this page owns only the adjoining sleep placement after the visit is chosen. The published Xi’an area owner keeps the City Wall-versus-Dayanta decision.

## Official / primary fact sources

1. **Mount Hua official FAQ / reservation page** — https://www.chinahuashan.com/front/travelStrategy1.htm
   Page Q&A dated 2024-07-03; reviewed 2026-09-01. Supports separate visitor-centre ropeway and Yuquanyuan–Huashan Gate walking check-ins, timed real-name reservation and current operational examples. Displayed hours are dynamic and deliberately omitted from evergreen copy.
2. **Mount Hua official route and arrival strategy** — https://www.chinahuashan.com/front/touristviewArticle.htm?id=262147
   Published 2025-06-20; reviewed 2026-09-01. Supports Huashan North as a transfer node, the separate navigation targets and the need for a visitor-centre scenic shuttle. Route durations and relative-effort advice are not guarantees.
3. **Historical walking-access notice** — https://www.chinahuashan.com/front/notification.htm?id=983046
   Published 2021-03-15; reviewed 2026-09-01. It recorded a 24-hour walking-channel adjustment at that time. It is cited as a warning against treating old night-entry claims as current, not as proof that a night climb is available now.
4. **Mount Hua Visitor Centre page** — https://www.chinahuashan.com/front/viewtouristattractions.htm?id=33
   No publication date shown; reviewed 2026-09-01. Supports the visitor centre as a shuttle/service node for ropeway visitors. It does not confirm dependable large-bag storage.
5. **Mount Hua official transport page** — https://www.chinahuashan.com/front/wzhs.htm
   No publication date shown; reviewed 2026-09-01. Supports node separation between Huashan North and the scenic area. Its fixed-looking transfer time, bus number, fare and schedule details were treated as stale-risk information and excluded from evergreen claims.
6. **Shaanxi Mount Hua Scenic and Historic Interest Area Regulation** — https://www.shaanxi.gov.cn/zfxxgk/zcwjk/dfxfg/202402/W020240226372070395729.pdf
   Provincial archive dated 2024-02-26; reviewed 2026-09-01. Supports the authority to announce temporary closure or capacity action for ecological, forest-fire and safety needs. It does not establish the travel day's operating state.
7. **12306 Huashan North station page** — https://www.12306.cn/%2Fmormhweb/kyyyz/xian/201001/t20100124_1176.html
   Old official page; reviewed 2026-09-01. Used only for the stable station identity and Huayin address.
8. **12306 date-specific search** — https://www.12306.cn/index/
   Rechecked around 13:30 China Standard Time on 2026-09-04 for travel on 2026-09-05, in both Xi’an North→Huashan North and Huashan North→Xi’an North directions. Direct service appeared in both directions, demonstrating only current transport feasibility. The query URL cannot encode the live response, so the article publishes no sample train, time, availability or first/last-service claim.
9. **12306 luggage rules** — https://kyfw.12306.cn/otn/gonggao/luggage.html
   Reviewed 2026-09-01. Used only to require a current rail-baggage check; not evidence of scenic-area storage.
10. **12306 priority-traveller assistance** — https://kyfw.12306.cn/otn/view/icentre_qxyyInfo.html
    Reviewed 2026-09-01. Supports railway assistance availability and limits. It is not evidence that Mount Hua or a hotel is accessible.
11. **Wikimedia Commons Hero source** — https://commons.wikimedia.org/wiki/File:Mount_Hua,_shot_from_the_train_G1888_in_Huashanbei_Station.jpg
    Reviewed 2026-09-01. Creator, date, dimensions and CC BY-SA 4.0 rights recorded in `image-plan.md`.

## 2026-09-04 availability recheck

The five `chinahuashan.com` pages returned a TLS error over HTTPS and HTTP 503 during the recheck. Their content was last successfully read and captured on 2026-09-01; they are not described as successfully re-read on 2026-09-04. The 12306 station, query, luggage and assistance pages remained readable. A [2026-09-01 post from Mount Hua's verified official account](https://weibo.com/ttarticle/p/show?id=2309405338374721896472) remained readable and reiterated real-name timed booking, Yuquanyuan entry for the described walking activity, and possible gate closure in extreme weather. It is current corroboration, not a permanent night-entry or operating promise. No official reversal of the accommodation framework was found.

## Claim-to-source map

| Public block | Claim controlled | Primary evidence |
|---|---|---|
| `anchor-table`, `two-gates` | ropeway and walking tickets begin through different named check-in nodes; Huashan North is a Huayin rail gateway, not the gate | Mount Hua FAQ/strategy captured 2026-09-01; 12306 station page; verified official-account post rechecked 2026-09-04 |
| `anchor-table`, `luggage-matrix` | no reviewed official promise of dependable large-bag storage at the station or visitor centre | visitor-centre page captured 2026-09-01; absence rechecked across current official sources 2026-09-04; property confirmation remains required |
| `dynamic-callout` | timed entry and mountain operations are dynamic; old 24-hour notice is not evergreen | official FAQ and 2021 notice captured 2026-09-01; Shaanxi regulation; official-account weather warning rechecked 2026-09-04 |
| `failure-table` | a room is only a working fallback when its booking/late-arrival state is explicit | editorial recovery rule based on the verified chain; the named property and booking platform are the transaction-specific evidence |

## Source exclusions and inference control

- A July 2026 operating notice appeared only through a third-party reproduction; no official government or scenic-area permalink was verified, so it is excluded.
- Platform categories, property reviews, social posts and search summaries do not prove an entrance, current transport, room, price, foreign-guest acceptance, luggage custody or accessibility.
- “Stay in Huayin before an earliest useful entry” and “stay after an uncertain descent” are editorial decisions derived from the verified node chain. They are not official hotel recommendations.
- No source reviewed confirmed reliable large-bag storage at Huashan North or the visitor centre. The copy narrows the conclusion instead of guessing.
- No claim says that night climbing, a route, ropeway, shuttle, train, hotel or foreign-guest check-in will operate on a future date.

## Review ledger

- Traveller blind review, 2026-09-04: initial result **P1 PASS / P2 revisions required**. Fixes covered two-night AND logic, not-yet-on-sale planning, first/last mile, split-stay luggage, copyable Chinese nodes, executable fallback-room states and family/accessibility chains. Same-reviewer result after revision: **TRAVELLER RE-REVIEW PASS**.
- SEO/technical adversarial review, 2026-09-04: initial result **1 P1 and 5 P2 revisions required**. Fixes covered the public collection ID, explicit entity debt, source traceability, 2026-09-04 freshness, copyable nodes and test coverage. The Xi’an Hub and central entity graph remain documented central-integration items, not article-commit changes. Same-reviewer result after revision: **SEO/TECH RE-REVIEW PASS**.
