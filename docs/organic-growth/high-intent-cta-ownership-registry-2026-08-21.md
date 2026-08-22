# High-intent CTA ownership registry — phase 1

Status: `internal-only`

Baseline: `origin/main@72e5d161ed8af853fbf262e7c875f8fd748645e3`

Last inventory sync: `2026-08-22`

This phase creates a fail-closed ownership ledger. It does not change a public CTA, launch a service, add a URL or authorize hotel, ticket or transfer sales claims. The machine-readable source of truth is `high-intent-cta-ownership-registry.json` in this directory.

## Coverage

| Owner class | Identities | Specialized mapping |
| --- | ---: | --- |
| Stay | 28 | Blocked pending an approved stay service ID |
| High-intent transport | 34 | Blocked pending an approved transfer service ID |
| Plan | 26 | 15 mapped explicitly to an existing planning service; 11 remain generic conversation |
| Purchase ticket | 2 | Blocked pending an approved ticket-assistance service ID |
| Unique content identities | 90 | One owner per identity |

The 34 transport identities are the current `transport` guides whose primary intent is `plan`, `compare` or `execute`. Informational transport identities with `understand` intent remain outside this high-intent cohort.

## Explicit planning mappings

The registry does not derive a target from the `plan` section. Each identity is assigned deliberately. The ten guides added in the 2026-08-22 content-scale batch remain neutral generic conversations and add no paid-service mapping.

| Content ID | Controlled intent code | Existing target |
| --- | --- | --- |
| `beijing-xian-chengdu-route-order` | `route_shape` | `itinerary-review` |
| `chengdu-jiuzhaigou-huanglong-route-order` | `route_shape` | `null` (generic conversation) |
| `china-archaeology-ancient-capitals-route` | `route_shape` | `null` (generic conversation) |
| `china-arrival-day-booked-anchor-or-flexible-block` | `route_shape` | `itinerary-review` |
| `china-buddhist-heritage-route` | `route_shape` | `null` (generic conversation) |
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
| `chinese-gardens-water-towns-complementary-stops` | `route_shape` | `null` (generic conversation) |
| `first-solo-trip-china-recoverable-route` | `route_shape` | `null` (generic conversation) |
| `guangzhou-shenzhen-hong-kong-route-order` | `route_shape` | `itinerary-review` |
| `guilin-yangshuo-longji-route-order` | `route_shape` | `null` (generic conversation) |
| `kunming-dali-lijiang-shangri-la-route-order` | `route_shape` | `itinerary-review` |
| `mainland-china-hong-kong-macao-route-order` | `route_shape` | `null` (generic conversation) |
| `north-or-south-china-first-trip` | `route_shape` | `null` (generic conversation) |
| `remote-china-attraction-group-tour-private-car-or-diy` | `route_shape` | `null` (generic conversation) |
| `shanghai-suzhou-hangzhou-nanjing-route-order` | `route_shape` | `itinerary-review` |
| `wheelchair-accessible-china-route-planning` | `route_shape` | `route-build` |
| `xiamen-quanzhou-fujian-tulou-route-order` | `route_shape` | `null` (generic conversation) |

The 11 `null` planning rows remain generic conversations because no existing approved planning product is assigned to them. `china-private-transfer-or-public-transport` may point only to the already published, scoped `full-trip-support` planning path; it cannot promise a vehicle, driver, pickup or fixed transfer price.

## Blocked inventories

### Stay — 28

`beijing-courtyard-hotel-or-modern-hotel`, `beijing-where-to-stay-first-trip`, `chengdu-where-to-stay-chunxi-wenshu-kuanzhai`, `china-accessible-hotel-room-verification`, `china-hotel-emergency-exit-fire-safety-check`, `china-hotel-left-item-recovery`, `china-hotel-near-metro`, `china-hotel-room-does-not-match-booking`, `chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba`, `commercial-aparthotel-or-residential-rental-china`, `dali-where-to-stay-old-town-xiaguan-erhai-village`, `foreigners-china-hotel`, `fujian-tulou-stay-inside-or-nearby-hotel`, `guangzhou-where-to-stay-beijing-road-liwan-tianhe`, `hangzhou-where-to-stay-hubin-wulin-east-station`, `huangshan-summit-or-gateway-base`, `international-chain-or-local-hotel-china`, `minsu-homestay-or-hotel-china`, `pingyao-stay-inside-or-outside-old-city`, `sanya-where-to-stay-four-bays`, `serviced-apartment-or-hotel-china`, `shanghai-where-to-stay-first-trip`, `shenzhen-where-to-stay-futian-luohu-nanshan`, `suzhou-where-to-stay-old-city-shantang-jinji-lake`, `xiamen-where-to-stay-zhongshan-gulangyu-zengcuoan`, `xian-where-to-stay-city-wall-or-dayanta`, `yangshuo-town-or-yulong-river-where-to-stay`, `zhangjiajie-city-or-wulingyuan-hotel-base`.

### High-intent transport — 34

`beijing-capital-or-daxing-airport`, `beijing-south-station-to-capital-or-daxing-airport`, `beijing-to-badaling-great-wall-transfer`, `beijing-to-mutianyu-great-wall-transfer`, `changbai-mountain-hubs-to-park-gates`, `changsha-zhangjiajie-transport-route`, `chengdu-chongqing-station-pair`, `chengdu-jiuzhaigou-transport-route`, `chengdu-shuangliu-or-tianfu-airport`, `china-high-speed-train-first-time-guide`, `chongqing-railway-station-selector`, `dali-station-to-old-town`, `guangzhou-baiyun-airport-t2-t3`, `guangzhou-hong-kong-transport-route`, `guangzhou-macau-transport-route`, `guangzhou-railway-station-selector`, `guilin-airport-or-railway-station-arrival-guide`, `guilin-longji-rice-terraces-transfer`, `guilin-yangshuo-transport-route`, `guiyang-airport-and-rail-hubs`, `hong-kong-macau-transport-route`, `how-food-reaches-your-seat-on-china-train`, `kunming-stone-forest-transport`, `lijiang-shangri-la-transport-route`, `pudong-airport-to-shanghai-disneyland`, `shanghai-hangzhou-transport-route`, `shanghai-pudong-or-hongqiao-airport`, `shanghai-railway-station-selector`, `shenzhen-airport-railway-station-border-port-selector`, `shenzhen-hong-kong-transport-route`, `which-beijing-railway-station`, `xiamen-hubs-to-gulangyu-ferry-terminal`, `xian-railway-station-selector`, `zhangjiajie-airport-or-railway-station-arrival`.

### Purchase ticket — 2

`official-or-reseller-china-tickets`, `zhangjiajie-national-forest-park-tickets-and-entrances`.

For these 64 identities, `targetServiceId` remains `null` and `authorizationStatus` remains `blocked-pending-central-authorization`. Stay uses the existing internal `hotel_fit` intent, tickets use `ticket_workflow`, and transport uses `route_shape`; these intent codes validate context only and do not authorize a public or paid service. The existing generic guide-footer conversation can remain, but no specialized CTA may claim availability, price, booking success, guest acceptance, vehicle supply or entry.

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
