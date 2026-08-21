# High-intent CTA ownership registry — phase 1

Status: `internal-only`

Baseline: `origin/main@274d243afc9fcc2ac9abd51487d06c667019cc0a`

This phase creates a fail-closed ownership ledger. It does not change a public CTA, launch a service, add a URL or authorize hotel, ticket or transfer sales claims. The machine-readable source of truth is `high-intent-cta-ownership-registry.json` in this directory.

## Coverage

| Owner class | Identities | Specialized mapping |
| --- | ---: | --- |
| Stay | 17 | Blocked pending an approved stay service ID |
| High-intent transport | 22 | Blocked pending an approved transfer service ID |
| Plan | 16 | Mapped explicitly to an existing planning service or the generic conversation |
| Purchase ticket | 2 | Blocked pending an approved ticket-assistance service ID |
| Unique content identities | 57 | One owner per identity |

The 22 transport identities are the current `transport` guides whose primary intent is `plan`, `compare` or `execute`. Four informational transport identities with `understand` intent are deliberately outside this high-intent cohort.

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

### Stay — 17

`beijing-courtyard-hotel-or-modern-hotel`, `beijing-where-to-stay-first-trip`, `china-accessible-hotel-room-verification`, `china-hotel-emergency-exit-fire-safety-check`, `china-hotel-near-metro`, `chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba`, `commercial-aparthotel-or-residential-rental-china`, `foreigners-china-hotel`, `huangshan-summit-or-gateway-base`, `international-chain-or-local-hotel-china`, `minsu-homestay-or-hotel-china`, `serviced-apartment-or-hotel-china`, `shanghai-where-to-stay-first-trip`, `shenzhen-where-to-stay-futian-luohu-nanshan`, `xiamen-where-to-stay-zhongshan-gulangyu-zengcuoan`, `xian-where-to-stay-city-wall-or-dayanta`, `zhangjiajie-city-or-wulingyuan-hotel-base`.

### High-intent transport — 22

`beijing-south-station-to-capital-or-daxing-airport`, `beijing-to-badaling-great-wall-transfer`, `beijing-to-mutianyu-great-wall-transfer`, `changbai-mountain-hubs-to-park-gates`, `chengdu-jiuzhaigou-transport-route`, `china-high-speed-train-first-time-guide`, `chongqing-railway-station-selector`, `dali-station-to-old-town`, `guangzhou-baiyun-airport-t2-t3`, `guangzhou-hong-kong-transport-route`, `guangzhou-macau-transport-route`, `guilin-yangshuo-transport-route`, `guiyang-airport-and-rail-hubs`, `hong-kong-macau-transport-route`, `how-food-reaches-your-seat-on-china-train`, `lijiang-shangri-la-transport-route`, `pudong-airport-to-shanghai-disneyland`, `shanghai-hangzhou-transport-route`, `shanghai-pudong-or-hongqiao-airport`, `shenzhen-hong-kong-transport-route`, `which-beijing-railway-station`, `xiamen-hubs-to-gulangyu-ferry-terminal`.

### Purchase ticket — 2

`official-or-reseller-china-tickets`, `zhangjiajie-national-forest-park-tickets-and-entrances`.

For these 41 identities, `targetServiceId` remains `null` and `authorizationStatus` remains `blocked-pending-central-authorization`. Stay uses the existing internal `hotel_fit` intent, tickets use `ticket_workflow`, and transport uses `route_shape`; these intent codes validate context only and do not authorize a public or paid service. The existing generic guide-footer conversation can remain, but no specialized CTA may claim availability, price, booking success, guest acceptance, vehicle supply or entry.

## Fail-closed rules

The checker rejects:

- duplicate content owners;
- unknown canonical content IDs;
- unknown planning service IDs;
- any service mapping on a blocked stay, ticket or transport identity;
- missing ownership for any identity in the four controlled cohorts;
- registry coverage drift when content metadata changes;
- claims not present in the controlled forbidden-claim dictionary.

Run `npm run check:high-intent-cta-ownership` before any future CTA implementation. A public CTA implementation still requires a separate authorization and must not be inferred from this internal registry.
