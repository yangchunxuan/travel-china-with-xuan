# Source log

**Research and full source review:** 2026-09-04 (Asia/Shanghai)

**Baseline audited:** `origin/main@c13d83e1abc8f5f25ee2250de11eed8c424a0196`

## Search-demand observation

Google was observed read-only on 2026-09-04 for two English query variants (`Wuzhen inside scenic area or outside hotel`; `Wuzhen hotel ticket re-entry luggage check-in`), two Simplified Chinese variants (`乌镇西栅住景区内还是景区外`; `乌镇西栅景区内住宿 门票 行李 办理入住`) and one Korean variant (`우전 서책 관광지 안 숙박 밖 숙박`). The observed Google footer location was Korea and `hl` was switched between language views. Results can vary by location, language, personalization and date, so this is a query-window observation only. No search volume, click, booking or conversion estimate is claimed.

- **English:** exact and near-exact results mostly collapsed the choice into atmosphere/convenience versus cost, or returned property/listing pages. People Also Ask was broad—such as how many days or where to stay—rather than the identity → admission → re-entry → check-in → luggage → late-arrival chain. No exact-chain PAA answer was observed.
- **Chinese:** results included official booking/property pages and general stay advice. Observed PAA/adjacent questions focused on admission cost and whether early check-in was possible, not on reconciling operator identity, ticket quantity, re-entry proof and centralized handoff.
- **Korean:** no PAA module was observed for the tested inside/outside query; results did not provide an independent, current entitlement-verification workflow.
- **Related-search pattern:** related and adjacent results clustered around West Scenic Area accommodation, tickets, staying inside the scenic area and check-in. They did not resolve the conflicting official terms for one exact product.
- **Gap:** existing results tend to answer “experience versus price.” This owner adds a reproducible chain: verify property identity, exact admission quantity, first-entry rule, re-entry method, check-in point, luggage custody and late-arrival fallback before choosing inside or outside.

## Traveller-question discovery

The following forum pages were used only to establish what travellers ask and where wording is confusing:

- Reddit: https://www.reddit.com/r/chinatravel/comments/1tnw3mm/
- Reddit: https://www.reddit.com/r/chinatravel/comments/1ub1ku8/
- Tripadvisor property-location FAQ: https://www.tripadvisor.com/FAQ_Answers-g659921-d799251-t4414858-Hi_May_I_know_which_hotel_is_Xi_Cha_are.html
- Tripadvisor overnight thread: https://www.tripadvisor.com/ShowTopic-g294211-i642-k14916651-Overnight_in_WuZhen-China.html

They are demand evidence only. Forum posts, replies and travel-site summaries do not establish admission, re-entry, hotel identity, luggage service, check-in location, policy, price, inventory or accessibility. Their dates and advice are not treated as current operational evidence.

## Canonical audit

The audit covered 177 baseline guide directories and 182 `origin/article/*` plus `origin/codex/*` ref tips. No published owner covered the complete inside/outside West Scenic Area accommodation workflow. The adjacent `shanghai-water-town-zhujiajiao-tongli-wuzhen` identity owns water-town selection and broad “worth overnight” intent. `chinese-gardens-water-towns-complementary-stops` owns the complementary-stop and broad day-versus-overnight frame. This page starts only after West Scenic Area is selected and therefore must not compare towns or decide whether Wuzhen deserves a night.

## Official / primary fact sources

1. **Wuzhen official booking hotel catalogue** — https://www.ewuzhen.com/hotel/list
   Reviewed 2026-09-04. The official interface exposes separate `景区内`, `景区外` and `乌村` location filters, hotel types and a `旗下酒店` attribute. It also displays live commercial information, including prices and ratings, which is excluded from evergreen copy.
2. **2025 West Scenic Area accommodation admission announcement** — https://www.wuzhen.com.cn/web/event/newDetails?id=2115
   Dated 2025-03-16; reviewed 2026-09-04. Describes West Scenic Area hotels/homestays providing West Scenic Area admission according to actual registered occupancy and names an exclusion. It is treated as a dated programme statement, not proof for every product/date.
3. **Wuzhen scenic-area guest stay notice** — https://www.wuzhen.com.cn/crsykrz.htm
   Publication date not shown; reviewed 2026-09-04. Describes first-admission purchase except ticket-included room types, central check-in at the West Scenic Area Visitor Service Centre, temporary re-entry documentation, passports for foreign guests, luggage/check-in arrangements, room retention terms and stone-paving friction. Several items conflict with newer or product-specific material and are not published as fixed promises.
4. **Wuzhen visitor information** — https://www.wuzhen.com.cn/web/traver/info
   Publication date not shown; reviewed 2026-09-04. Describes ordinary ticket use and registered-guest sightseeing-vehicle evidence. Current eligibility, operating hours and accessibility require recheck.
5. **Dated official booking product sample** — https://www.ewuzhen.com/hotel/room?hotelId=215869424345858050&livesDate=2026-05-09&modelCode=HTRM-202505-6601&outDate=2026-05-10
   Reviewed 2026-09-04 solely to audit product-term structure. The same page showed a ticket-included room and generic first-purchase language, plus central check-in, luggage and passport instructions. Its date, price, availability and room entitlement are not reusable.
6. **2025 operator accommodation promotion** — https://www.wuzhen.com.cn/web/event/newDetails?id=2116
   Reviewed 2026-09-04. Used as evidence that morning/evening time and luggage handling are marketed benefits. It cannot prove current service execution for a named booking.
7. **Exit and Entry Administration Law of the People's Republic of China** — https://www.nia.gov.cn/n794014/n1050181/n1050479/c1013311/content.html
   National Immigration Administration copy; reviewed 2026-09-04. Article 39 assigns hotel accommodation registration to the hotel and distinguishes non-hotel accommodation.
8. **NIA interpretation of online registration outside hotels** — https://www.nia.gov.cn/n741440/n741577/c1771556/content.html
   Published 2026-03-20; reviewed 2026-09-04. Zhejiang is included in the online pilot for accommodation outside hotels. This does not replace registration by a hotel.
9. **State Council response on overseas guests being refused by hotels** — https://www.gov.cn/hudong/202405/content_6952770.htm
   Published 2024-05; reviewed 2026-09-04. Used with the seven-department notice to separate a supposed “foreign guest qualification” from hotel operational execution.
10. **Seven-department notice on facilitating accommodation for overseas visitors** — https://www.mofcom.gov.cn/xwfb/rcxwfb/art/2024/art_6e5fd351d24c460cad01512ce52d3f83.html
    Ministry of Commerce release dated 2024-07-25; reviewed 2026-09-04. Says local authorities/platforms should not use qualification requirements as an access threshold and that platforms/operators should not publish improper non-acceptance information; it also calls for better registration, communication and payment service.
11. **Wikimedia Commons Hero source** — https://commons.wikimedia.org/wiki/File:Night_in_Wuzhen_Xizha_(20171231174337).jpg
    Reviewed 2026-09-04. Creator, capture date, dimensions, licence, derivative hashes, visual/privacy inspection and truth boundaries are recorded in `image-plan.md`.

## Official-source conflict register

| Conflict | What the sources say | Safe editorial treatment |
|---|---|---|
| Admission inclusion | The 2025 notice describes admission for actual registered occupants; the older guest notice says guests buy first admission unless the room type includes it | Never say “inside includes tickets” without the exact product, date, occupants and written confirmation |
| Product versus boilerplate | A sampled official room is labelled ticket-included while the same page repeats generic first-purchase wording | Preserve screenshots/confirmation and ask the operator which clause controls the exact order |
| Ticket quantity | Programme wording uses actual occupancy while product/family-room configurations may enumerate different quantities | Confirm each named occupant and number/type of admissions; do not infer from room name |
| Re-entry identity | Operator wording references room cards/registration evidence and identity or face checks, but no reviewed page specifies the foreign-passport failure route | Ask for a manual fallback in writing; do not claim a domestic-ID workflow will work for every foreign passport |
| Luggage convenience | Marketing and stay instructions describe luggage handling, but custody limits and late-arrival execution are product/service dependent | Confirm handoff, cutoff, receipt, destination, bag limits and failure fallback |

## Claim-to-source map

| Public claim group | Claim controlled | Primary evidence |
|---|---|---|
| `identity-ledger` | geographic inside/outside, operator listing and exact product are separate fields | official hotel catalogue; exact product page |
| `entitlement-warning`, `proof-checklist` | inclusion and quantity cannot be inferred; official pages conflict | 2025 admission announcement; legacy stay notice; exact product page |
| `entitlement-warning`, `proof-checklist` | ordinary ticket is single-entry; registered-stay re-entry uses separate evidence and needs a passport-compatible fallback | visitor information; stay notice; operator written confirmation for the booking |
| `arrival-ledger`, `proof-checklist` | check-in may begin at the visitor centre and luggage convenience requires a complete custody chain | stay notice; 2025 promotion; exact product terms |
| `failure-ledger` | hotel registration is the hotel's legal task; non-hotel online registration is not a hotel workaround | Exit and Entry Administration Law Article 39; 2026 NIA interpretation; national accommodation facilitation notice |
| `needs-table` | stone paving and multiple handoffs can reverse an inside-stay decision | stay notice for terrain warning; named-property route evidence for actual suitability |
| `failure-ledger` | a booking is usable only when its entitlement and handoff chain has an executable fallback | editorial inference from the verified official conflict register; exact written booking/operator evidence controls |

## Source exclusions and inference control

- Google snippets, AI summaries, OTA pins/tags, platform reviews and forum answers are not authority for law, operator identity or property execution.
- The official booking site's displayed prices, ratings, sales order and availability are deliberately excluded. This page owns neither price nor value.
- The dated 2026-05-09 product sample proves only that product-specific terms and boilerplate can coexist. It is not a current recommendation or bookable-room claim.
- “Inside is useful when it removes a boundary crossing” and “outside can be safer for a late arrival or simple departure” are editorial decisions derived from the verified chain. They are not operator recommendations.
- No reviewed official source makes every physical path, room, shuttle or luggage handoff accessible. Suitability requires named-property evidence.
- Wuzhen is in Tongxiang, Jiaxing. It is not treated as a Hangzhou urban attraction, even if a traveller reaches it from Hangzhou.

## Privacy boundary for any consultation CTA

The initial general form may collect only minimum non-sensitive information: dates, public base names, traveller and room counts, confirmed arrival/entry/checkout direction and a broad budget. A traveller may say they want a later family or accessibility discussion. They must not place children's exact ages, mobility/medical/accessibility details, passport or identity data, booking/payment records or identifiable supplier-sharing information in the initial form. Specific sensitive details may be discussed only in an appropriate human follow-up; supplier sharing requires separate consent.

The CTA is not live inventory, a booking channel or an operator. It cannot guarantee price, availability, foreign-guest acceptance, room type, accessibility, admission, re-entry, luggage handling, transfer or connection.

## Review and verification ledger

- Traveller blind review, 2026-09-04: initial result **5 P2 revisions required**; all five were revised and the same reviewer returned **TRAVELLER RE-REVIEW PASS**.
- SEO/technical adversarial review, 2026-09-04: initial result **1 P1 and 5 P2 revisions required**; subsequent room-location and test-gate findings were also revised, and the same reviewer returned **SEO/TECH RE-REVIEW PASS**.
- Same-reviewer P1/P2 re-review: both required reviewers passed the final revised copy and tests with no remaining P1/P2.
- Target static test: **6/6 passed** after the final review markers were recorded. The preceding 5/6 run's sole intentional failure was the not-yet-recorded review gate.
- Three-language parity and metadata/JSON assertions: **passed** inside the target static run on 2026-09-04; EN/ZH/KO block IDs, block types, list ordering, table shapes, links and source arrays matched.
- Article-branch checks: `guide:generate`, `guide:check`, planning-scope check and TypeScript `tsc --noEmit` passed; the then-current legacy entity audit resolved this guide to `country-china`. Central reconciliation on 2026-09-04 adds explicit governed West Scenic Area, Wuzhen, Tongxiang, Jiaxing and Zhejiang IDs for the pending candidate while preserving the frozen legacy resolver and published Search Map assignments. `git diff --check` passed before the article staging and is rerun for central integration.
- Production build: **not run for this article at this documentation step**.

This ledger must be updated only with commands or reviewer responses that actually completed against the final staged version.
