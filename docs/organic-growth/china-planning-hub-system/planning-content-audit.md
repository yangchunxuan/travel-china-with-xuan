# China planning content audit

Status: internal editorial audit; no public implementation authorization

Reviewed: 2026-08-20 (Asia/Shanghai)

Repository baseline: `origin/main` at `ef1898745a3c7a6e7cd308aa341c352f24fe9d01`

PR status included in this snapshot: PR #74 merged 2026-08-20; PR #32 remains a topic map rather than writing authorization

This audit assigns the existing planning estate to four actions: **Update existing**, **Link-only**, **Merge-retire-noindex**, and **Keep independent**. It covers the repository state, not a live-deployment crawl. “Published/indexable” therefore means the current repository metadata and approved search-platform state; production availability still needs release verification.

## Canonical decision

The two national intents already have suitable owners. Reuse them rather than create synonymous routes:

- **China Travel Guide**: `system-guides` at `/guides/`, `/zh/guides/`, and `/ko/guides/`. This is the national discovery and orientation owner.
- **China Itinerary / First Trip to China**: `hub-plan` at `/plan/`, `/zh/plan/`, and `/ko/plan/`. This is the itinerary-construction and first-trip decision owner.

The intended user path is:

`/guides/` → destination, entry, timing, transport, stay, and ticket owners → `/plan/` → route-shape, traveller-fit, pace, and validation owners → `/china-itinerary-review/` → Route Review, Route Build, or Full Trip Planning & Ground Support.

`/china-itinerary-review/` remains the commercial service owner. It must not replace either informational Hub. The unpublished Route Reality Checker must not acquire a route, index URL, public UI, or claims of approved calculation logic in this batch.

## Status notation

| Code | Meaning |
|---|---|
| T-P-I | English, Simplified Chinese, and Korean; repository-published and indexable |
| EN-P-I | English only; repository-published and indexable |
| T-R-N | Trilingual; review/noindex |
| EN-R-N | English only; review/noindex |
| H | Held or deferred; no public page owner |

Locale paths follow `/guides/<slug>/`, `/zh/guides/<slug>/`, and `/ko/guides/<slug>/` unless a row gives another route.

## Post-merge baseline and Search Map drift

PR #74 is no longer pending. It merged into `origin/main` as `ef1898745a3c7a6e7cd308aa341c352f24fe9d01` and added or strengthened relevant owners, including:

- `china-online-arrival-card`;
- `chongqing-railway-station-selector`;
- `zhangjiajie-national-forest-park-tickets-and-entrances`;
- the Hangzhou and Zhangjiajie destination Hubs;
- the title/H1 boundary for `is-your-china-itinerary-too-rushed` (“5 checks before booking”);
- supporting hotel, transport, and destination-owner changes.

Do not label those items “remote pending” in this package. Deployment was not checked, so do not claim that they are live.

The prose Search Map is now stale relative to merged code:

- it still describes 173 guide identities, while the post-merge registry has 176 guide identities;
- it still describes five destination Hubs, while current `origin/main` has seven: Beijing, Shanghai, Xi’an, Chengdu, Guangzhou, Hangzhou, and Zhangjiajie;
- it still describes PR #74 content as unpublished;
- it describes only six section Hubs as published and treats `when-to-go`, `culture`, and `tools` together as review/noindex, while the current `approvedSearchHubIds` set approves eight section Hubs: `explore`, `plan`, `transport`, `when-to-go`, `stay`, `essentials`, `culture`, and `services`. Only `tools` remains outside that approved set.

Repository inventory at this snapshot is 157 independent guide directories plus 19 legacy guide identities, producing 176 guide identities and 522 locale guide URLs. Seven destination Hubs add 21 locale URLs, and the system entry-requirements owner adds one English URL. That is 184 editorial-detail identities / 544 URLs before counting the `/guides/` directory owner itself. These counts should replace older planning assumptions, but this audit does not edit the central Search Map.

## Update existing

These owners should be strengthened in place as part of the Hub system. Updating means boundary, navigation, handoff, and CTA work—not absorbing the full body of narrower guides.

| Slug / owner | Paths | Language / status | Why update | Incoming or outgoing Hub link |
|---|---|---|---|---|
| `system-guides` | `/guides/`; `/zh/guides/`; `/ko/guides/` | T-P-I | Exact existing owner for the broad “China Travel Guides” intent. Turn it into the national inspiration and orientation entrance without creating `/china-travel-guide/`. | Primary **China Travel Guide** Hub; send itinerary construction to `/plan/`. |
| `hub-plan` | `/plan/`; `/zh/plan/`; `/ko/plan/` | T-P-I | Existing owner for trip length, city count/order, traveller fit, budget, and pace. Expand its decision journey rather than create `/china-itinerary/` or `/first-trip-to-china/`. | Primary **China Itinerary / First Trip** Hub; receive qualified traffic from `/guides/`, then send validation/service intent onward. |
| `system-china-itinerary-review` | `/china-itinerary-review/`; locale equivalents | T-P-I | Preserve the purchase-intent boundary and make the difference between Review, Build, and custom full-trip support explicit. It is not an informational itinerary Hub. | Link only after `/plan/` and validation content have helped the reader form a real decision. |
| `is-your-china-itinerary-too-rushed` | `/guides/is-your-china-itinerary-too-rushed/`; locale equivalents | T-P-I | PR #74 has narrowed the page to five pre-booking checks. Add clear parent/back links, but keep it as the public overload-validation owner rather than a second first-trip Hub. | `/plan/` → this checker article → `/china-itinerary-review/` when human review is needed. |
| destination owners: `beijing`, `shanghai`, `xian`, `chengdu`, `guangzhou`, `hangzhou`, `zhangjiajie` | `/destinations/<city>/`; locale equivalents | T-P-I | Each owns broad city-level planning. Their national “what comes next?” and first-trip handoffs should point to `/plan/`, not restate national route design. Hangzhou and Zhangjiajie arrived in merged PR #74. | `/guides/` → destination Hub; destination Hub → `/plan/` for multi-city uncertainty. |
| `hub-services` | `/services/`; `/zh/services/`; `/ko/services/` | T-P-I | Keep the service directory, but make `/china-itinerary-review/` the single owner for whole-route planning offers. | Both Hubs may link to `/services/` for browsing; route-intent CTA should land on `/china-itinerary-review/`. |

## Link-only

These pages already own useful subproblems. The new Hubs should route readers to them and should not copy their detailed answers. Unless stated otherwise, each is T-P-I and has all three locale paths.

### Itinerary examples and city order

| Slug | Path | Why link-only | Link from |
|---|---|---|---|
| `zhangjiajie-itinerary` | `/guides/zhangjiajie-itinerary/` | Destination-specific itinerary owner; not a national day template. | `/plan/`, Zhangjiajie destination Hub |
| `beijing-zhangjiajie-shanghai-10-days` | `/guides/beijing-zhangjiajie-shanghai-10-days/` | A specific three-city case; must not define the broad China itinerary intent. | `/plan/` as one worked example only |
| `beijing-xian-chengdu-route-order` | `/guides/beijing-xian-chengdu-route-order/` | Owns one three-city order and gateway decision. | `/plan/`, relevant destination Hubs |
| `guangzhou-shenzhen-hong-kong-route-order` | `/guides/guangzhou-shenzhen-hong-kong-route-order/` | Owns one Greater Bay Area order problem. | `/plan/`, Guangzhou destination Hub |
| `kunming-dali-lijiang-shangri-la-route-order` | `/guides/kunming-dali-lijiang-shangri-la-route-order/` | Owns one Yunnan route-order problem. | `/plan/` |
| `shanghai-suzhou-hangzhou-nanjing-route-order` | `/guides/shanghai-suzhou-hangzhou-nanjing-route-order/` | Owns one lower-Yangtze route-order problem. | `/plan/`, Shanghai/Hangzhou destination Hubs |

### Route architecture, transfer tax, and recovery

| Slug | Path | Why link-only | Link from |
|---|---|---|---|
| `china-hub-and-spoke-or-multi-base-route` | `/guides/china-hub-and-spoke-or-multi-base-route/` | Owns base count and hotel-change trade-offs. | `/plan/` |
| `china-open-jaw-flights-route-planning` | `/guides/china-open-jaw-flights-route-planning/` | Owns open-jaw versus return-airport route geometry. | `/plan/` |
| `china-rail-only-route` | `/guides/china-rail-only-route/` | Owns the feasibility boundary for rail-only travel. | `/plan/`, `/transport/` |
| `china-arrival-day-booked-anchor-or-flexible-block` | `/guides/china-arrival-day-booked-anchor-or-flexible-block/` | Owns arrival-chain risk and whether day one can hold a fixed booking. | `/plan/` |
| `china-last-night-before-international-flight` | `/guides/china-last-night-before-international-flight/` | Owns final-night airport buffer and missed-flight consequences. | `/plan/`, `/transport/` |
| `china-night-train-or-daytime-high-speed-rail` | `/guides/china-night-train-or-daytime-high-speed-rail/` | Owns the sleep/transfer/daylight trade-off. | `/plan/`, `/transport/` |
| `china-private-transfer-or-public-transport` | `/guides/china-private-transfer-or-public-transport/` | Owns one high-friction arrival/departure decision; not a provider ranking. | `/plan/`, `/transport/` |
| `china-separate-flight-tickets-self-transfer-risk` | `/guides/china-separate-flight-tickets-self-transfer-risk/` | Owns self-transfer and misconnection risk. | `/plan/`, `/transport/` |
| `china-domestic-flight-fare-bundle-baggage` | `/guides/china-domestic-flight-fare-bundle-baggage/` | Owns fare-bundle and baggage comparison, not real-time pricing. | `/plan/`, `/transport/` |

### Traveller fit, access, and theme

| Slug | Path | Why link-only | Link from |
|---|---|---|---|
| `zhangjiajie-from-malaysia` | `/guides/zhangjiajie-from-malaysia/` | Market- and destination-specific planning owner. | `/plan/`, Zhangjiajie destination Hub |
| `zhangjiajie-older-travellers` | `/guides/zhangjiajie-older-travellers/` | Destination-specific mobility/pace owner. | `/plan/`, Zhangjiajie destination Hub |
| `china-itinerary-with-older-parents` | `/guides/china-itinerary-with-older-parents/` | Owns whole-chain family pace and recovery for older parents. | `/plan/` |
| `china-itinerary-with-young-children` | `/guides/china-itinerary-with-young-children/` | Owns child-specific pacing and failure recovery. | `/plan/` |
| `wheelchair-accessible-china-route-planning` | `/guides/wheelchair-accessible-china-route-planning/` | Owns the end-to-end access chain; the Hub must not imply verified accessibility. | `/plan/`, `/essentials/` |
| `china-regional-food-route` | `/guides/china-regional-food-route/` | Owns a geographically coherent food-route method rather than fragile restaurant rankings. | `/plan/` |

### Cost, pace, and timing

| Slug | Path | Why link-only | Link from |
|---|---|---|---|
| `how-much-does-a-china-trip-cost` | `/guides/how-much-does-a-china-trip-cost/` | National cost owner; the Hubs should not invent savings or quote unstable totals. | `/plan/`, `/guides/` |
| `china-climate-regions-for-trip-timing` | `/guides/china-climate-regions-for-trip-timing/` | Owns regional climate logic rather than city-by-month permutations. | `/guides/`, `/when-to-go/`, `/plan/` |
| `china-public-holidays-travel-calendar` | `/guides/china-public-holidays-travel-calendar/` | Single evergreen annual public-holiday owner, including official dates and adjusted workdays. | `/guides/`, `/when-to-go/`, `/plan/` |
| `china-in-october-golden-week-or-later` | `/guides/china-in-october-golden-week-or-later/` | Owns October route/weather decisions; it must not duplicate the national annual calendar. | `/when-to-go/`, `/plan/` |
| `china-shoulder-season-value-tradeoff` | `/guides/china-shoulder-season-value-tradeoff/` | Owns the value-versus-conditions choice without an invented crowd index. | `/when-to-go/`, `/plan/` |

### National transport and gateway decisions

| Slug | Path | Why link-only | Link from |
|---|---|---|---|
| `china-high-speed-train-first-time-guide` | `/guides/china-high-speed-train-first-time-guide/` | Owns first-time rail execution. | `/guides/`, `/transport/`, `/plan/` |
| `why-china-high-speed-stations-are-far-away` | `/guides/why-china-high-speed-stations-are-far-away/` | Explains station geography and door-to-door time. | `/transport/`, `/plan/` |
| `which-beijing-railway-station` | `/guides/which-beijing-railway-station/` | Beijing station-selector owner. | `/transport/`, Beijing destination Hub |
| `shanghai-pudong-or-hongqiao-airport` | `/guides/shanghai-pudong-or-hongqiao-airport/` | Shanghai airport-selector owner. | `/transport/`, Shanghai destination Hub |
| `guangzhou-baiyun-airport-t2-t3` | `/guides/guangzhou-baiyun-airport-t2-t3/` | Terminal-specific owner. | `/transport/`, Guangzhou destination Hub |
| `guiyang-airport-and-rail-hubs` | `/guides/guiyang-airport-and-rail-hubs/` | Guiyang gateway-selector owner. | `/transport/` |
| `chongqing-railway-station-selector` | `/guides/chongqing-railway-station-selector/` | PR #74 merged this current station-selector owner. | `/transport/`, `/plan/` |

### City-pair transport

| Slug | Path | Why link-only | Link from |
|---|---|---|---|
| `beijing-zhangjiajie-shanghai-transport` | `/guides/beijing-zhangjiajie-shanghai-transport/` | Specific intercity transport chain. | `/transport/`, `/plan/` |
| `chengdu-jiuzhaigou-transport-route` | `/guides/chengdu-jiuzhaigou-transport-route/` | Specific city/park corridor. | `/transport/`, Chengdu destination Hub |
| `guangzhou-hong-kong-transport-route` | `/guides/guangzhou-hong-kong-transport-route/` | Specific cross-boundary corridor. | `/transport/`, Guangzhou destination Hub |
| `guangzhou-macau-transport-route` | `/guides/guangzhou-macau-transport-route/` | Specific cross-boundary corridor. | `/transport/`, Guangzhou destination Hub |
| `guilin-yangshuo-transport-route` | `/guides/guilin-yangshuo-transport-route/` | Specific Guilin–Yangshuo execution owner. | `/transport/` |
| `hong-kong-macau-transport-route` | `/guides/hong-kong-macau-transport-route/` | Specific cross-boundary corridor. | `/transport/` |
| `lijiang-shangri-la-transport-route` | `/guides/lijiang-shangri-la-transport-route/` | Specific Yunnan corridor. | `/transport/`, `/plan/` |
| `shanghai-hangzhou-transport-route` | `/guides/shanghai-hangzhou-transport-route/` | Specific lower-Yangtze corridor. | `/transport/`, Shanghai/Hangzhou destination Hubs |
| `shenzhen-hong-kong-transport-route` | `/guides/shenzhen-hong-kong-transport-route/` | Specific cross-boundary corridor. | `/transport/` |

### Last-mile transfers

| Slug | Path | Why link-only | Link from |
|---|---|---|---|
| `beijing-south-station-to-capital-or-daxing-airport` | `/guides/beijing-south-station-to-capital-or-daxing-airport/` | One rail-to-air transfer chain. | `/transport/`, Beijing destination Hub |
| `beijing-to-badaling-great-wall-transfer` | `/guides/beijing-to-badaling-great-wall-transfer/` | Destination-specific last mile. | `/transport/`, Beijing destination Hub |
| `beijing-to-mutianyu-great-wall-transfer` | `/guides/beijing-to-mutianyu-great-wall-transfer/` | Destination-specific last mile. | `/transport/`, Beijing destination Hub |
| `changbai-mountain-hubs-to-park-gates` | `/guides/changbai-mountain-hubs-to-park-gates/` | Gateway-to-park execution owner. | `/transport/` |
| `dali-station-to-old-town` | `/guides/dali-station-to-old-town/` | One station-to-base transfer. | `/transport/` |
| `pudong-airport-to-shanghai-disneyland` | `/guides/pudong-airport-to-shanghai-disneyland/` | One airport-to-attraction transfer. | `/transport/`, Shanghai destination Hub |
| `xiamen-hubs-to-gulangyu-ferry-terminal` | `/guides/xiamen-hubs-to-gulangyu-ferry-terminal/` | Gateway-to-ferry execution owner. | `/transport/` |

### Stay decisions

| Slug | Path | Why link-only | Link from |
|---|---|---|---|
| `why-are-hotels-in-china-so-cheap` | `/guides/why-are-hotels-in-china-so-cheap/` | National hotel-value explainer. | `/guides/`, `/stay/` |
| `china-hotel-near-metro` | `/guides/china-hotel-near-metro/` | Owns metro-proximity trade-offs. | `/stay/`, `/plan/` |
| `foreigners-china-hotel` | `/guides/foreigners-china-hotel/` | Owns foreign-guest acceptance and verification. | `/guides/`, `/stay/`, `/essentials/` |
| `china-accessible-hotel-room-verification` | `/guides/china-accessible-hotel-room-verification/` | Owns room-level access verification. | `/stay/`, `/plan/` |
| `international-chain-or-local-hotel-china` | `/guides/international-chain-or-local-hotel-china/` | Hotel-type decision owner. | `/stay/` |
| `minsu-homestay-or-hotel-china` | `/guides/minsu-homestay-or-hotel-china/` | Accommodation-type decision owner. | `/stay/` |
| `serviced-apartment-or-hotel-china` | `/guides/serviced-apartment-or-hotel-china/` | Accommodation-type decision owner. | `/stay/` |
| `commercial-aparthotel-or-residential-rental-china` | `/guides/commercial-aparthotel-or-residential-rental-china/` | Owns the legal/operational distinction. | `/stay/` |
| `china-hotel-emergency-exit-fire-safety-check` | `/guides/china-hotel-emergency-exit-fire-safety-check/` | Owns safety verification; do not compress into a generic Hub tip. | `/stay/`, `/essentials/` |
| `beijing-where-to-stay-first-trip` | `/guides/beijing-where-to-stay-first-trip/` | Beijing base selector. | `/stay/`, Beijing destination Hub |
| `beijing-courtyard-hotel-or-modern-hotel` | `/guides/beijing-courtyard-hotel-or-modern-hotel/` | Beijing hotel-type decision. | `/stay/`, Beijing destination Hub |
| `shanghai-where-to-stay-first-trip` | `/guides/shanghai-where-to-stay-first-trip/` | Shanghai base selector. | `/stay/`, Shanghai destination Hub |
| `chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba` | `/guides/chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba/` | Chongqing base selector. | `/stay/`, `/plan/` |
| `shenzhen-where-to-stay-futian-luohu-nanshan` | `/guides/shenzhen-where-to-stay-futian-luohu-nanshan/` | Shenzhen base selector. | `/stay/` |
| `xiamen-where-to-stay-zhongshan-gulangyu-zengcuoan` | `/guides/xiamen-where-to-stay-zhongshan-gulangyu-zengcuoan/` | Xiamen base selector. | `/stay/` |
| `xian-where-to-stay-city-wall-or-dayanta` | `/guides/xian-where-to-stay-city-wall-or-dayanta/` | Xi’an base selector. | `/stay/`, Xi’an destination Hub |
| `huangshan-summit-or-gateway-base` | `/guides/huangshan-summit-or-gateway-base/` | Scenic-area base decision. | `/stay/`, `/plan/` |
| `zhangjiajie-city-or-wulingyuan-hotel-base` | `/guides/zhangjiajie-city-or-wulingyuan-hotel-base/` | Zhangjiajie base decision. | `/stay/`, Zhangjiajie destination Hub |
| `lijiang-old-town-or-shuhe-where-to-stay` | `/guides/lijiang-old-town-or-shuhe-where-to-stay/` | Lijiang base decision. | `/stay/`, `/plan/` |

### Entry, payment, connectivity, and booking identity

| Slug | Path | Language / status | Why link-only | Link from |
|---|---|---|---|---|
| `system-entry-requirements` | `/guides/china-entry-requirements/` | EN-P-I | Broad entry-requirements owner, but there is no localized twin. ZH/KO Hubs must not link to invented locale routes. | EN `/guides/`; ZH/KO use their locale `/essentials/` Hub or a trilingual specific guide. |
| `do-us-citizens-need-visa-china-2026` | `/guides/do-us-citizens-need-visa-china-2026/` | T-P-I | Nationality-specific entry owner. | `/guides/`, `/essentials/` |
| `do-singaporeans-need-visa-china` | `/guides/do-singaporeans-need-visa-china/` | T-P-I | Nationality-specific entry owner. | `/guides/`, `/essentials/` |
| `china-240-hour-visa-free-transit-route-check` | `/guides/china-240-hour-visa-free-transit-route-check/` | T-P-I | Owns transit-route eligibility logic. | `/guides/`, `/essentials/`, `/plan/` |
| `china-online-arrival-card` | `/guides/china-online-arrival-card/` | T-P-I | Current owner merged in PR #74. | `/guides/`, `/essentials/` |
| `china-customs-red-green-channels` | `/guides/china-customs-red-green-channels/` | T-P-I | Customs execution owner. | `/guides/`, `/essentials/` |
| `china-passport-validity-and-blank-pages` | `/guides/china-passport-validity-and-blank-pages/` | T-P-I | Passport-document owner. | `/guides/`, `/essentials/` |
| `food-plants-and-animal-products-into-china` | `/guides/food-plants-and-animal-products-into-china/` | T-P-I | Customs restriction owner. | `/guides/`, `/essentials/` |
| `hong-kong-macau-mainland-reentry-count` | `/guides/hong-kong-macau-mainland-reentry-count/` | T-P-I | Owns re-entry counting for route design. | `/essentials/`, `/plan/` |
| `lost-passport-in-china-exit-recovery` | `/guides/lost-passport-in-china-exit-recovery/` | T-P-I | Owns emergency recovery. | `/guides/`, `/essentials/` |
| UK, Canada, and New Zealand nationality entry guides | their existing `/guides/<nationality-slug>/` routes | EN-P-I | Keep as English nationality owners until independent localization is approved; do not fabricate locale paths. | EN `/guides/` and `/essentials/` only |
| `how-to-pay-in-china-as-a-tourist` | `/guides/how-to-pay-in-china-as-a-tourist/` | T-P-I | Payment execution owner. | `/guides/`, `/essentials/` |
| `china-esim-vs-local-sim` | `/guides/china-esim-vs-local-sim/` | T-P-I | Connectivity decision owner. | `/guides/`, `/essentials/` |
| `official-or-reseller-china-tickets` | `/guides/official-or-reseller-china-tickets/` | T-P-I | Owns ticket-channel choice. | `/guides/`, `/essentials/`, `/plan/` |
| `passport-name-across-china-bookings` | `/guides/passport-name-across-china-bookings/` | T-P-I | Owns identity consistency across tickets and hotels. | `/guides/`, `/essentials/`, `/plan/` |
| `china-booking-dispute-evidence-pack` | `/guides/china-booking-dispute-evidence-pack/` | T-P-I | Owns booking-failure evidence and recovery. | `/essentials/`, `/plan/` |

### Attraction reservations and ticket execution

| Slug | Path | Why link-only | Link from |
|---|---|---|---|
| `forbidden-city-for-foreign-visitors` | `/guides/forbidden-city-for-foreign-visitors/` | Attraction booking owner. | `/guides/`, Beijing destination Hub |
| `mogao-caves-independent-visit-workflow` | `/guides/mogao-caves-independent-visit-workflow/` | Reservation and independent-visit owner. | `/guides/`, `/plan/` |
| `national-museum-of-china-booking-and-route` | `/guides/national-museum-of-china-booking-and-route/` | Booking and on-site route owner. | `/guides/`, Beijing destination Hub |
| `sanxingdui-museum-booking-and-gallery-order` | `/guides/sanxingdui-museum-booking-and-gallery-order/` | Booking and gallery-order owner. | `/guides/`, Chengdu destination Hub |
| `shaanxi-history-museum-booking-and-collection-plan` | `/guides/shaanxi-history-museum-booking-and-collection-plan/` | Booking and collection-plan owner. | `/guides/`, Xi’an destination Hub |
| `terracotta-warriors-without-tour` | `/guides/terracotta-warriors-without-tour/` | Independent-visit execution owner. | `/guides/`, Xi’an destination Hub |
| `yungang-grottoes-cave-order-and-museum` | `/guides/yungang-grottoes-cave-order-and-museum/` | Cave-order and museum owner. | `/guides/`, `/plan/` |
| `zhangjiajie-national-forest-park-tickets-and-entrances` | `/guides/zhangjiajie-national-forest-park-tickets-and-entrances/` | Current ticket/entrance owner merged in PR #74. | `/guides/`, Zhangjiajie destination Hub |

## Merge-retire-noindex

These are conflicts, held concepts, or noindex structures. They must not become another indexable owner for the same query.

| Candidate / slug | Current or proposed path | Language / status | Required action | Canonical owner |
|---|---|---|---|---|
| proposed “China Travel Guide” synonyms | `/china-travel-guide/`, `/travel-guide-to-china/`, similar | Not created | Do not create. Merge any useful draft material into the existing directory Hub. | `/guides/` |
| proposed “China Itinerary / First Trip” synonyms | `/china-itinerary/`, `/first-trip-to-china/`, `/guides/first-china-trip-routes/`, similar | Not created | Do not create. Merge decision logic into the Plan Hub. | `/plan/` |
| `planning-20260811-03` / “First China Trip Routes by Pace” | no public route | H | Keep held/noindex. Only non-duplicative concepts may be folded into `/plan/`; do not revive as a second first-trip owner. | `/plan/` |
| `services-route-whole-trip` | `/services/route-whole-trip/`; locale equivalents | T-R-N | Keep noindex. If useful, consolidate unique service explanation into the commercial page rather than index this collection as a second service owner. | `/china-itinerary-review/` |
| `china-visa-free-uk-canada` | `/china-visa-free-uk-canada/` | EN-R-N | Keep as a noindex/canonical shell; do not let it compete with the entry collection and nationality owners. | `/guides/china-entry-requirements/` plus nationality-specific guides |
| `planning-20260820-first-24-hours` | no public route | H | Leave deferred. Arrival-day logic already has a narrower owner; no new page in this system. | `/guides/china-arrival-day-booked-anchor-or-flexible-block/` |
| PR #32 `hg-topic-0980`, “China Itinerary Review or Full Planning Service?” | no authorized public route | Topic-map only | If activated later, merge its distinction into the existing commercial page. PR #32 does not authorize writing. | `/china-itinerary-review/` |
| public Route Reality Checker or generated route-index URLs | no authorized route | Internal spec only | Do not implement, index, or generate city × month × duration × traveller URLs. Keep data model, rules, failure modes, internal examples, and handoff specification internal. | None until separate central approval |

### Route Reality review boundary

The internal source branch is `origin/article/worker-4-route-reality-checker-spec` at `1e131ff990b88c3759fb3d102f23e55aa8bbd0b0`, with status `SPEC REVIEW READY`. The technical review is `origin/review/worker-8-route-reality-checker-20260814` at `02cdf309cb49127601e80623f338a8fbfab80f7f`, with status `TECHNICAL REVIEW READY — BLOCKING SPEC REVISIONS REQUIRED`.

The latter records blockers B01–B10 and revisions R01–R12 and explicitly leaves `publicImplementationAuthorized=false` and `indexablePageAuthorized=false`. Therefore, this Hub package must not present the earlier coefficients, formulas, or scenario outcomes as approved calculation logic. It may only document input concepts such as door-to-door time, hotel-change cost, fixed-booking conflict, fatigue chain, buffer day, open-jaw geometry, and overload warnings for later handoff.

## Keep independent

These pages or collections have a distinct canonical job. “Independent” does not mean isolated: the two Hubs may link to them, but must not absorb or rename them.

| Owner | Paths | Language / status | Why independent | Relationship to the two Hubs |
|---|---|---|---|---|
| `hub-transport` | `/transport/`; locale equivalents | T-P-I | National transport directory and execution taxonomy. | `/guides/` links for transport discovery; `/plan/` links when a route choice becomes an execution problem. |
| `hub-stay` | `/stay/`; locale equivalents | T-P-I | National accommodation directory and base-selection taxonomy. | Both Hubs link; no hotel detail duplicated. |
| `hub-essentials` | `/essentials/`; locale equivalents | T-P-I | Entry, payment, connectivity, safety, and booking-preparation directory. | `/guides/` links early; `/plan/` links where a rule can invalidate a route. |
| `hub-when-to-go` | `/when-to-go/`; locale equivalents | T-P-I | Timing and season directory. | `/guides/` links during destination inspiration; `/plan/` links during route verification. |
| `hub-culture` | `/culture/`; locale equivalents | T-P-I | Cultural context owner, separate from travel logistics. | `/guides/` may route interest-led discovery here. |
| `hub-explore` | `/explore/`; locale equivalents | T-P-I | Attraction/destination exploration directory. | Primary discovery branch from `/guides/`. |
| `hub-services` | `/services/`; locale equivalents | T-P-I | Service browsing directory. | Preserve independently, with whole-route purchase intent handed to `/china-itinerary-review/`. |
| Plan collections | `/plan/trip-length-city-order/`, `/plan/traveller-theme-itineraries/`, `/plan/budget-pace-decisions/`; locale equivalents | T-P-I | These are valid sub-intent owners under `/plan/`, not competing national Hubs. | `/plan/` routes to the relevant collection. |
| Transport collections | `/transport/airports-rail-hubs/`, `/transport/city-pair-routes/`, `/transport/last-mile-transfers/`; locale equivalents | T-P-I | Stable execution sub-taxonomy. | `/guides/` and `/plan/` hand transport tasks here. |
| Stay collections: city areas and hotel types | `/stay/city-areas/`, `/stay/hotel-types-scenic-bases/`; locale equivalents | T-P-I | Stable accommodation sub-taxonomy. | Both Hubs may link by decision stage. |
| `stay-access-foreign-guests` | `/stay/access-foreign-guests/`; locale equivalents | T-R-N | A collection shell, not yet an approved indexable owner. Keep noindex while individual guides remain canonical. | Link directly to individual owners, not this collection, until approved. |
| Timing collections | `/when-to-go/months-seasons/`, `/when-to-go/holidays-crowds/`, `/when-to-go/events-natural-calendar/`; locale equivalents | T-R-N | Current section Hub is approved, but these collections remain noindex. | Link from Hubs to `/when-to-go/` or to individual timing guides. |
| `hub-tools` and tool collections | `/tools/` and child collection paths; locale equivalents | T-R-N | Tools are not in `approvedSearchHubIds`; Route Reality public implementation is explicitly unauthorized. | No public Route Reality CTA or indexed tool link. |
| service collections | `/services/guides-experiences/`, `/services/transfers-hotels-bookings/`, `/services/route-whole-trip/`; locale equivalents | T-R-N | Collection shells remain noindex. | Link to `/services/`, specific product/service owners, or `/china-itinerary-review/`. |
| Home page | `/`; `/zh/`; `/ko/` | T-P-I | Commercial landing page for planning with a real planner, not the broad informational China Travel Guide owner. | May point to both Hubs and to commercial services; do not change its canonical role. |
| Zhangjiajie private-tour product | `/tours/zhangjiajie-4-day-private-tour/`; locale equivalents | T-P-I | Specific product owner. | Surface only after a traveller chooses Zhangjiajie or enters explicit product intent. |
| Zhangjiajie product preview | `/preview/zhangjiajie-4-day-private-tour/`; locale equivalents | T-R-N / unavailable in production | Internal preview, not a Hub destination. | Never use as a public Hub link. |

## Remote refs and pending-title review

- **PR #74**: merged; its relevant titles now belong to `origin/main`, not the pending exclusion list.
- **PR #32**: open Search Map/topic inventory. It records possible canonical topics but is not automatic writing authorization. Any exact or near-exact national Hub/service topic must be resolved to the owners above.
- **PR #30**: SEO decision/issue record, not a competing content owner.
- Other open PRs observed at the audit snapshot (#10 and #7) concern analytics and do not create planning-content canonicals.
- Raw remote research/article branches are not automatically pending public pages. Superseded or held branches must not override current `origin/main`; Route Reality branches remain internal-only as described above.

## Canonical conflict register

| Conflict | Risk | Resolution |
|---|---|---|
| `/guides/` versus a new `/china-travel-guide/` | Two broad discovery owners with the same intent and near-identical titles | Keep `/guides/` as the only national Travel Guide owner. |
| `/plan/` versus new “China Itinerary” or “First Trip to China” pages | Cannibalizes trip-length, city-order, traveller-fit, budget, and pace queries | Keep `/plan/` as the only national itinerary/first-trip owner. |
| `/plan/` versus `is-your-china-itinerary-too-rushed` | Validation article could drift into a full planning Hub | Keep `/plan/` for construction; keep the article for five overload checks before booking. |
| `/plan/` versus route-order articles | Specific examples can be mistaken for universal templates | Hub teaches the decision method; route articles retain their exact city combinations. |
| `/china-itinerary-review/` versus `/services/route-whole-trip/` and PR #32 `hg-topic-0980` | Multiple pages explain the same paid decision | Keep the commercial page as owner; leave the collection noindex and merge future unique copy into the owner. |
| national holiday calendar versus October Golden Week article | Annual calendar and one seasonal route decision overlap | Calendar owns official annual dates/adjusted workdays; October article owns October route/weather choice. |
| English entry collection versus nonexistent localized twins | Broken locale links and false trilingual parity | EN links the collection; ZH/KO link `/essentials/` or a real trilingual guide. |
| public Route Reality article/tool versus existing planning and validation pages | Unapproved logic plus a combinatorial URL system | Keep internal only; no public URL, calculator, API, or generated index pages. |
| Home page versus `/guides/` | Commercial landing could be miscast as the informational “China Travel Guide” owner | Keep home commercial; keep `/guides/` informational. |

## Editorial implementation rule

The new Hub drafts may summarize the decision a reader needs to make, but they should hand execution to the canonical page at the moment detail becomes necessary. They should not reproduce live transport schedules, hotel acceptance claims, visa outcomes, attraction ticket workflows, public-holiday dates, or full city-by-city itineraries. The commercial handoff appears after the reader has moved from inspiration to a route that can be validated—not as the opening answer.
