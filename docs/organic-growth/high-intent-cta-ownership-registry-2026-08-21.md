# High-intent CTA ownership registry — phase 1

Status: `internal-only`

Baseline: `origin/main@3112cc762123cddbeb20d8bdca349356d481f1ad`

Last inventory sync: `2026-10-18` (English reservation body offers; original planning/footer ownership retained)

This remains a fail-closed ownership ledger. The 2026-09-04 update authorizes ten public guide-footer CTAs to already published planning services; it does not launch a service, add a URL or authorize hotel, ticket or transfer sales claims. The machine-readable source of truth is `high-intent-cta-ownership-registry.json` in this directory, including the exact public allowlist, service targets, target anchors and reviewed trilingual CTA copy. The checker locks the reviewed copy digest and each public owner's complete forbidden-claim set, so any wording or boundary change requires a deliberate central review.

## Authorized reservation body offers — 18 October 2026

The owner explicitly authorized promoting the existing attraction reservation service in six popular English guides, including the packing and hotel-base guides, and authorized the PR #393 corrections and release. `guideReservationOffers` records the five added body placements below; the Li River guide only rewords its existing reservation card, as does the existing first card on the Forbidden City guide. This is not a new service launch.

| English content ID | After body block | Presentation | Action target |
| --- | --- | --- | --- |
| `food-plants-and-animal-products-into-china` | `before-list` | Card | Existing attraction reservation service |
| `yangshuo-town-or-yulong-river-where-to-stay` | `scope-boundary` | Card | Li River cruise preselected |
| `shanghai-where-to-stay-first-trip` | `evenings-copy` | Card | Existing attraction reservation service |
| `tianmen-mountain-tickets-and-routes` | `entry-copy` | Card | Existing attraction reservation service, for other cities |
| `forbidden-city-for-foreign-visitors` | `email-boundary` | Inline sentence | Forbidden City preselected |

Each record fixes the English locale, exact body anchor, card/line variant, existing service, action URL and allowed example/preselected attraction IDs. All named attractions must remain `offered` in the service data. Prices and the existing eight-day guarantee remain owned by that data; this authorization does not change them. The Yangshuo offer is the Li River cruise ticket only, excluding hotel transfers and Yulong River rafts. Tianmen Mountain and Zhangjiajie National Forest Park remain outside the reservation service; the Tianmen card promotes only the listed attractions elsewhere.

These are supplementary exceptions for the named body placements, not replacements for `entries` or `guideInlineSalesCards`. The original planning/footer owners, their forbidden claims, the Shanghai full-trip-support footer, and the generic footer status of Yangshuo and Tianmen remain intact. The older blocked status does not revoke this separately recorded body-offer authorization or authorize any other specialized offer. No further user confirmation is required for these already authorized placements.

The checker compares the registry bidirectionally with the actual `getGuideReservationOffers` output, including locale, anchor, variant, destination and attraction IDs, and loads the English bodies to require one matching anchor. Missing, duplicate, stale or expanded placements fail. Registry tests cover mismatched implementations and unsupported destinations; the existing offer tests retain the service-specific wording boundaries. Future changes to these placements or service targets must update the explicit records and checks together.

## Coverage

| Owner class | Identities | Specialized mapping |
| --- | ---: | --- |
| Stay | 20 | 6 scoped to existing full-trip planning; 14 blocked |
| High-intent transport | 25 | 4 scoped to existing itinerary review; 21 blocked |
| Plan | 17 | Mapped explicitly to an existing planning service or the generic conversation |
| Purchase ticket | 2 | Blocked pending an approved ticket-assistance service ID |
| Unique content identities | 64 | One owner per identity |

The 25 transport identities are the current `transport` guides whose primary intent is `plan`, `compare` or `execute`. Informational transport identities with `understand` intent remain outside this high-intent cohort.

## Public anchor boundary

- `/tours/` means the published private-tour inventory. A guide links here only when the user needs to compare complete routes; it must not imply that Homeground offers a standalone transfer, hotel or ticket service.
- `/services/` is the directory of currently published service pathways, not a product-detail or checkout destination.
- `/studio/` explains Homeground's planning method and evidence standard. Use it for trust or process context, not a paid-service CTA.
- `/china-itinerary-review/` owns the scope of Review My Route, Build My Route and Full Trip Planning & Ground Support. Specialized guide CTAs link to the named section on this page and inherit its written-scope, timing and payment boundaries.

## Newly authorized existing-service CTAs

| Guide class | Content IDs | Existing target |
| --- | --- | --- |
| Stay decision | `beijing-courtyard-hotel-or-modern-hotel`, `beijing-where-to-stay-first-trip`, `chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba`, `shanghai-where-to-stay-first-trip`, `xian-where-to-stay-city-wall-or-dayanta`, `zhangjiajie-city-or-wulingyuan-hotel-base` | `full-trip-support` |
| Connection decision | `beijing-south-station-to-capital-or-daxing-airport`, `chongqing-railway-station-selector`, `guilin-airport-or-railway-station-arrival-guide`, `shanghai-hangzhou-transport-route` | `itinerary-review` |

The stay CTA discusses hotel choice only inside a written full-trip scope and custom quote. It does not claim live room inventory, a fixed hotel price, accessibility or foreign-guest acceptance. The connection CTA reviews an existing day-by-day route; it does not book transport, provide a vehicle or guarantee a pickup, ticket or timetable.

## Explicit planning mappings

The registry does not derive a target from the `plan` section. Each identity is assigned deliberately.

| Content ID | Controlled intent code | Existing target |
| --- | --- | --- |
| `beijing-xian-chengdu-route-order` | `route_shape` | `itinerary-review` |
| `china-arrival-day-booked-anchor-or-flexible-block` | `route_shape` | `itinerary-review` |
| `china-domestic-flight-fare-bundle-baggage` | `route_shape` | `null` (generic conversation) |
| `china-hub-and-spoke-or-multi-base-route` | `route_shape` | `itinerary-review` |
| `china-itinerary-with-young-children` | `route_shape` | `route-build` |
| `china-last-night-before-international-flight` | `route_shape` | `itinerary-review` |
| `china-night-train-or-daytime-high-speed-rail` | `route_shape` | `itinerary-review` |
| `china-open-jaw-flights-route-planning` | `route_shape` | `itinerary-review` |
| `china-private-transfer-or-public-transport` | `route_shape` | `full-trip-support` |
| `china-rail-only-route` | `route_shape` | `route-build` |
| `china-regional-food-route` | `route_shape` | `route-build` |
| `china-separate-flight-tickets-self-transfer-risk` | `route_shape` | `itinerary-review` |
| `guangzhou-shenzhen-hong-kong-route-order` | `route_shape` | `itinerary-review` |
| `kunming-dali-lijiang-shangri-la-route-order` | `route_shape` | `itinerary-review` |
| `shanghai-suzhou-hangzhou-nanjing-route-order` | `route_shape` | `itinerary-review` |
| `wheelchair-accessible-china-route-planning` | `route_shape` | `route-build` |

`china-domestic-flight-fare-bundle-baggage` remains a generic conversation because the current approved planning products do not authorize a flight-booking or fare-purchase service. `china-private-transfer-or-public-transport` may point only to the already published, scoped `full-trip-support` planning path; it cannot promise a vehicle, driver, pickup or fixed transfer price.

## Blocked inventories

### Stay — 14

`china-accessible-hotel-room-verification`, `china-hotel-emergency-exit-fire-safety-check`, `china-hotel-near-metro`, `commercial-aparthotel-or-residential-rental-china`, `foreigners-china-hotel`, `hostel-or-budget-hotel-china`, `huangshan-summit-or-gateway-base`, `international-chain-or-local-hotel-china`, `minsu-homestay-or-hotel-china`, `serviced-apartment-or-hotel-china`, `shenzhen-where-to-stay-futian-luohu-nanshan`, `wuhan-where-to-stay-hankou-wuchang-hanyang`, `xiamen-where-to-stay-zhongshan-gulangyu-zengcuoan`, `yangshuo-town-or-yulong-river-where-to-stay`.

### High-intent transport — 21

`beijing-to-badaling-great-wall-transfer`, `beijing-to-mutianyu-great-wall-transfer`, `changbai-mountain-hubs-to-park-gates`, `chengdu-jiuzhaigou-transport-route`, `china-high-speed-train-first-time-guide`, `dali-station-to-old-town`, `guangzhou-baiyun-airport-t2-t3`, `guangzhou-hong-kong-transport-route`, `guangzhou-macau-transport-route`, `guilin-yangshuo-transport-route`, `guiyang-airport-and-rail-hubs`, `hong-kong-macau-transport-route`, `how-food-reaches-your-seat-on-china-train`, `lijiang-shangri-la-transport-route`, `pudong-airport-to-shanghai-disneyland`, `shanghai-pudong-or-hongqiao-airport`, `shenzhen-airport-railway-station-border-port-selector`, `shenzhen-hong-kong-transport-route`, `which-beijing-railway-station`, `xiamen-hubs-to-gulangyu-ferry-terminal`, `xian-chengdu-transport-route`.

### Purchase ticket — 2

`official-or-reseller-china-tickets`, `zhangjiajie-national-forest-park-tickets-and-entrances`.

The historical blocked inventory above predates the separately recorded inline cards and the 18 October reservation body offers. For owners still marked blocked in the JSON `entries`, `targetServiceId` remains `null` and `authorizationStatus` remains `blocked-pending-central-authorization`; the named reservation body placements are the explicit exception described above. Stay uses the existing internal `hotel_fit` intent, tickets use `ticket_workflow`, and transport uses `route_shape`; these intent codes alone do not authorize a public or paid service. The existing generic guide-footer conversation can remain, but cannot inherit the reservation service's prices or booking guarantee.

## Fail-closed rules

The checker rejects:

- duplicate content owners;
- unknown canonical content IDs;
- unknown planning service IDs;
- any service mapping on a stay, ticket or transport identity outside the ten explicit allowlisted CTAs;
- any change to the reviewed trilingual public CTA copy or its two real target anchors;
- any reduction in a public owner's complete forbidden-claim boundary;
- missing ownership for any identity in the four controlled cohorts;
- registry coverage drift when content metadata changes;
- claims not present in the controlled forbidden-claim dictionary.
- missing, duplicate or stale reservation body offers, non-English placements, changed action targets or attraction lists, and missing body anchors.

Run `npm run check:high-intent-cta-ownership` before any future CTA implementation. Authorization is limited to the explicitly recorded footer, inline-card and reservation-offer scopes; no other CTA may be inferred from them.
