# Source log — Chengdu, Chongqing and Zhangjiajie itinerary

Reviewed: 2026-09-08. Status: local content and source review; not a published page or a confirmed customer itinerary.

## Search evidence and editorial purpose

The root task supplied the Semrush US related-keyword table for `zhangjiajie itinerary`: `chengdu chongqing zhangjiajie itinerary`, monthly volume 50, KD 7. This is a related-keyword-table observation, not an independently opened Keyword Overview, confirmed ranking or traffic forecast. The guide serves a global English planning intent; Chinese and Korean versions preserve its scope.

Current content was checked before writing. Chengdu destination copy mentions the Chengdu–Chongqing pairing; Chongqing destination copy separately discusses Chengdu and onward Zhangjiajie travel. Neither provides this three-city itinerary. The existing Zhangjiajie 2/3/4-full-day guide keeps ownership of local sightseeing-day choices. This article owns a specific multi-city sequence, its 12-day calendar and shorter-trip sacrifices.

## Official sources read for this article

1. [Hunan Provincial Government: operating Chongqing–Zhangjiajie connection, 18 April 2026](https://www.enghunan.gov.cn/hneng/News/Localnews/202604/t20260418_33957885.html).
   - Supports the existence of the operating corridor involving Chongqing East and Zhangjiajie.
   - The article reports dated fastest journey figures. This guide deliberately does not republish a minute count, train number, frequency, fare or availability promise.
   - Exact service, station and date remain a current booking decision.
2. [China Railway 12306 English FAQ](https://www.12306.cn/en/faq.html).
   - Read the real-name ticketing, identity-document and boarding sections. They support using the passenger's correct identity/document details and the valid document used to purchase the ticket.
   - No child-fare, refund-window or presale rules are repeated here.
3. [Xinhua / Belt and Road Portal: Chengdu–Chongqing Central Line construction, 21 August 2026](https://eng.yidaiyilu.gov.cn/p/05BGIF9S.html).
   - Confirms the new central line was still under construction in the dated report.
   - Not a basis for current services or any future 50-minute journey claim.
4. [Chongqing Municipal Government: Liziba staged works, 13 June 2026](https://www.cq.gov.cn/ywdt/jrcq/202606/t20260613_15751500_app.html).
   - Read the staged closures and passenger diversions. The article advises planning the approach around current access; it does not assert one exit is currently available or promise a train-viewing platform.

## Existing Homeground source of local activities and service scope

All paths below are relative to the worktree.
- `lib/privateTourProducts.ts`: `chengdu-pandas-sanxingdui-5-day-private-tour` (starts around line 723). Five days/four Chengdu nights: arrival; Panda Base and People's Park; Sanxingdui; Dujiangyan and Guanxian Ancient Town; departure. English-guided touring on local Days 2–4, with the published arrival/departure assistance. No Mount Qingcheng addition.
- Same file: `chongqing-wulong-5-day-private-tour` (around line 1200). Five days/four nights: Chongqing arrival; city touring; Wulong Three Natural Bridges and Wulong night; either Fairy Mountain or Furong Cave and return to Chongqing; departure. Three Chongqing nights plus one Wulong night. Never replace the return with an assumed Wulong-to-Zhangjiajie handoff.
- Same file: `zhangjiajie-forest-4-day-private-tour` (around line 2552). Four days/three nights in the same designated Country Garden family villa. Two walking touring days, scenic shuttles included, no cable cars/elevators or Ten-Mile Gallery mini-train. Highland day approximately 10–11 hours door to door and 4–7 km walking. English guide on the full local Day 2 and daytime local Day 3 only; Seventy-Two Wonder Tower evening is self-guided with private transfers and remote assistance. No Tianmen Mountain or Glass Bridge.
- `content/destinations/chengdu/body.en.ts`, `content/destinations/chongqing/body.en.ts`: the city-pair relationship, terrain and onward-journey context.
- `content/guides/chongqing-railway-station-selector/body.en.ts`: distinct Chongqing East, North, West and Shapingba stations; follow the actual ticket and hotel-to-hotel journey.
- `lib/zhangjiajieGuideI18n.ts`: distinguish complete sightseeing days from arrival/departure calendar days.

The attraction choices and service inclusion statements are current repository product facts, not a new independent inventory or timetable check. No new hotel, guide, vehicle, attraction inclusion, child rate or price was created.

## Calendar and boundary checks

- 5 Chengdu days + 5 Chongqing/Wulong days + 4 forest days − 2 shared local departure/arrival days = 12 calendar days.
- Nights: Chengdu D1–D4 = 4; Chongqing D5/D6/D8 = 3; Wulong D7 = 1; villa D9–D11 = 3. Total 11.
- D5 and D9 are separate whole intercity-transfer days; D1 and D12 hold no fixed sightseeing. The 12 days use a wrapping list after mobile review found the wide table required horizontal reading.
- The 11-day alternative drops Dujiangyan. The 10-day example drops the whole Wulong extension. Both are revised planning examples, not unchanged published local products.
- Reversing the cities depends on flights and connections; it does not automatically reverse a fixed local itinerary.
- Three local product links are distributed beside their relevant segments. Their prices are not added; intercity tickets, handovers and any combination require separate written confirmation. No through-guide promise.
- English, Chinese and Korean use matching block IDs, day/night counts and limits.

## Image evidence

See `image-plan.md`. The existing Chongqing real-photo derivative was opened visually, its 1600 × 1000 dimensions measured, and its SHA-256 matched the existing provenance record. No image was generated, altered or copied.

## Local validation completed

- Existing guide-metadata validator passed without writing global generated files.
- All three bodies passed `assertStructuredPageBody`, with matching 29-block IDs and 12-row calendars.
- English visible body text: 1,250 whitespace-delimited words, including table cells, link labels and source labels.
- Each locale has exactly three direct product links, and all internal links use the matching language prefix.
- TypeScript passed for the three new body files with strict mode and no output. Full-site generation, build and rendered desktop/mobile QA remain the root task's integration work.
