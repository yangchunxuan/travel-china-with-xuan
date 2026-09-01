# Deferred owner specifications

These are design specifications, not start authorization. Exactly five Wave 1 owners remain `PROPOSED / DEFER`; Wave 2 remains `HOLD / DEFER`. This live sync does not authorize an article body, branch, Issue, Registry entry, internal link, public selector, API, timetable database or data page.

## Shared article contract

### EN/ZH/KO structure

Any later authorized editorial owner uses the same **information contract**, but not the same prose or visual template. Block IDs/types/order, decision rows, numbers, proper nouns, exceptions, negative conclusions, recovery steps, internal links, and Sources must match across English, natural Simplified Chinese, and natural Korean.

Minimum decision sequence:

1. `direct-answer` — what controls the choice; if already ticketed, the exact ticket wins;
2. `exact-names` — codes and full Chinese/English node names that prevent map errors;
3. `decision-matrix` — a glanceable choice table, explicitly not a live tool;
4. `scenario-a` and `scenario-b` — at least two genuinely different traveller chains;
5. `door-to-door-chain` — access, terminal/station process, line haul, arrival-side transfer, hotel/base;
6. `stay-interaction` — how the hotel/base changes friction without redoing the stay owner;
7. `late-luggage-mobility` — early/late, luggage, children/older parents and step-free uncertainty;
8. `wrong-node-recovery` — identify, verify, compare against hard deadline, change/rebook/overnight;
9. `answer-changes-when` — conditions that reverse the recommendation;
10. `final-recheck` — exact official checks on the traveller's date;
11. `internal-links` — city Hub plus 2–4 live related owners;
12. `consultation` — lightweight help brief;
13. `sources` — default-collapsed, locale-aligned official sources.

The writer may split or combine presentation blocks to suit the task, but the three locales must remain structurally identical. A route owner can foreground a chain diagram; a station owner can foreground a matrix; a gate owner can foreground a destination card.

### Dynamic-fact record

For every terminal assignment, station role, route example, metro/airport link, port hour, attraction gate, road control, price, timetable, booking or weather-sensitive statement, record:

| Field | Requirement |
|---|---|
| `claim` | Conservative wording used in copy |
| `source` | Current official/first-party URL; 12306 live result where applicable |
| `checked_at` | Actual final review date and timezone |
| `scope` | Node, line, direction, date and traveller/product type covered |
| `exception` | What the source does not prove |
| `recheck_trigger` | New railway diagram, terminal notice, operator change, road/park notice, border notice, or release day |
| `owner` | Person/role responsible for release-day confirmation |

Examples are labelled as dated samples, never presented as permanent service. If official sources conflict, copy states the conflict and tells the reader which live evidence controls; it does not choose silently.

### Real-image and provenance contract

- AI-generated and AI-assisted documentary images: `0`.
- Hero: one exact node or transfer environment central to the decision; skyline/scenery cannot substitute for a station, airport, port or gate.
- Optional body images: only when they distinguish another node or a physical transfer friction.
- Record original path/file page, direct source URL, author, licence name and direct licence URL, capture date, exact location, crop box, original SHA-256, derivative SHA-256, dimensions and reuse check.
- Do not hotlink. Download only after rights/location review. If no accurate rights-clear image exists, mark `ASSETS NEEDED`; do not use another city or generic travel scene.
- Maps/flow diagrams may be Homeground-original and non-documentary, but must not invent routes, times, prices or service status.

### Internal-link and service contract

- Link back to a live city Hub when it exists; reserve but do not pre-link a held or remote-only Hub.
- Link 2–4 live execution owners, chosen for the next actual decision rather than SEO density.
- Each live Hub must later link back in the matching transport module; shared Hub-file changes are a separate central task.
- CTA asks for travel date, party size, exact flight/train, hotel/base, luggage or mobility needs, and the next fixed booking. It may offer a human chain check; it must not mention $69/$129, guarantee a transfer, or make legal/service promises.

## Wave 0 — live-owner maintenance and completed status sync

### W0-A — `beijing-zhangjiajie-shanghai-transport`

**Purpose:** strengthen the existing exposed corridor owner without creating a synonym.

- Direct answer: for a short first trip, a sensible nonstop Beijing→Zhangjiajie flight often protects usable time; Zhangjiajie→Shanghai must be judged separately by the actual departure node, arrival node, hotel and operating day.
- Keep both directions and both modes in this one owner. Do not create new leg pages.
- Recheck: live 12306 samples for both rail legs; current official airport/route notices; PEK versus PKX; DYG versus Zhangjiajie West; Shanghai arrival airport/station; operating day; hotel-side transfer.
- Recovery: wrong Beijing airport/station, changed or missed flight/train, late Zhangjiajie arrival, and lost onward Shanghai connection. The page should protect the next hotel/park booking rather than force the original mode.
- Official source set: `COMMON-RAIL-1`, `BJ-1`, `ZJJ-1`, `ZJJ-2`, `SH-1`, plus the operating airline/airport notice for each dated flight example.
- Links: published `destination-beijing`, `destination-zhangjiajie` and `destination-shanghai`; `which-beijing-railway-station`; `zhangjiajie-city-or-wulingyuan-hotel-base`; `shanghai-where-to-stay-first-trip`; `china-high-speed-train-first-time-guide`.
- Images: preserve verified existing provenance only after duplicate-use review. A three-node sequence may use exact Beijing West, Zhangjiajie West and Shanghai arrival-node photos. A Zhangjiajie landscape is not a transport-node substitute.
- Measurement: Registry and Search Map titles matched on 2026-08-21. Record page-level GSC clicks/impressions/CTR/position when available; current property-level numbers cannot establish page performance.
- Gate: release-day facts, locale parity, live/deployed URL, and same-URL measurement plan.

### W0-B — `guangzhou-baiyun-airport-t2-t3`

**Purpose:** preserve the current owner and recheck dynamic facts on its next publication date. It already covers the 7 May 2026 cessation of T1 passenger operations, T2/T3 choice, Metro Airport South and intercity Baiyun Airport South not stopping, and wrong-terminal recovery.

- Direct answer: use the terminal printed by the airline/airport for the actual flight. T1's former passenger role is historical context, not a current choice.
- Recheck: whether T1 and both Airport South stops remain suspended, current passenger terminals, airline/flight assignment, metro/intercity/road access, inter-terminal movement, early/late constraints and construction notices.
- Recovery: at the wrong terminal, confirm the flight first, use the current official transfer path, and compare it against check-in/boarding deadlines. Provide rebook/airline-assistance escalation when transfer is no longer defensible.
- Official source set: `GZ-1`, `GZ-1B`, `GZ-1C`, `GZ-1D` and the current Baiyun Airport flight/terminal lookup.
- Links: `destination-guangzhou`; `guangzhou-hong-kong-transport-route`; `guangzhou-macau-transport-route`; `china-last-night-before-international-flight`; add the Guangzhou rail selector only after it is live.
- Images: exact current T2/T3 signage/access; no T1 hero and no generic aircraft. Preserve capture date because wayfinding changes.
- Gate: publication-day official recheck only. Do not characterize the existing owner as stale unless a newer official notice actually changes its facts.

### W0-C — completed PR #74 live-state reconciliation

This is completed governance readback, not a new article.

1. On 2026-08-21, EN/ZH/KO GET requests for Zhangjiajie Hub, Zhangjiajie park workflow, Chongqing railway selector and Hangzhou Hub returned HTTP 200.
2. Every one of those 12 locale URLs appeared in the live sitemap, so the four network identities are `PUBLISHED`.
3. The fifth PR #74 identity, `china-online-arrival-card`, also returned EN/ZH/KO HTTP 200 and appeared in the live sitemap; it remains outside this transport network.
4. Search Map status backfill remains shared governance work. It does not reopen canonical ownership or authorize a replacement owner.

## Wave 1 — proposed/deferred specifications; no writing authorization

### W1-A — `hg-topic-0881` / `xian-railway-station-selector`

**Status:** `PROPOSED / DEFER — NO WRITING AUTHORIZATION`.

**Decision:** Which exact station matches the already selected train, hotel/base, arrival-side plan and next fixed booking?

- Roster: determine on release day from 12306 and current municipal/rail evidence. Do not reuse the stale “Xi'an West” title. Xi'an East's 30 June 2026 opening must be reflected without implying that every route uses it.
- Matrix rows: exact ticket name; current role only as a dated orientation; hotel-side friction; luggage/mobility friction; next-leg use; “do not choose it because…”; recovery.
- Scenarios: a first-night City Wall stay after an evening arrival; a family/older-parent chain involving Dayanta or the Terracotta Warriors and a hard next train.
- Recovery: compare ticket change/refund eligibility with verified cross-city travel and boarding cutoff. Never tell a traveller to race based on straight-line distance.
- Official source set: `COMMON-RAIL-1`, `XA-1`, `XA-2`, `XA-3`, plus release-day station/metro notices.
- Links: Xi'an Hub, Xi'an stay owner, Terracotta Warriors owner, national rail guide and the current route-order owner.
- Images: commissioned/current rights-clear Xi'an East station-sign hero is preferred because it corrects the stale mental model; body image can distinguish Xi'an North or Xi'an station. Record exact platform/building identity. If Xi'an East rights are unavailable, use another exact principal station and mark the missing comparison asset.
- Dynamic triggers: new national railway diagram, station opening/closure, metro access, construction/entrance changes.
- Deferred prerequisites only: later central reassignment, current station roster and real image rights. None is granted by this package.

### W1-B — `hg-topic-0858` / `chengdu-ctu-or-tfu-airport`

**Status:** `PROPOSED / DEFER — NO WRITING AUTHORIZATION`.

**Decision:** Before booking, which airport produces the safer complete trip; after booking, how should the traveller confirm and recover?

- Matrix: actual available flight; airport code/terminal; hotel area; railway connection; Jiuzhaigou/panda/onward plan; first/last-night risk; luggage/mobility; answer-changing conditions.
- Scenarios: an international/regional arrival followed by a central Chengdu stay; an early departure or same-day railway/onward connection. Avoid assuming a flight type determines the airport.
- Recovery: confirm code and terminal, compare current cross-airport/road options with airline deadline, then choose transfer, flight change or overnight. No guaranteed cross-airport time.
- Official source set: `CD-1`, `CD-2`, `CD-3`, current CTU/TFU flight lookup, and `COMMON-RAIL-1` when rail is part of the chain.
- Links: Chengdu Hub, Jiuzhaigou owner, panda-site owner, route-order owner and last-night-before-flight guide.
- Images: exact CTU and TFU terminal/ground-transport signs; both airports need place-accurate coverage. Do not use generic Chengdu skyline or an aircraft.
- Dynamic triggers: airline/airport reassignment, terminal change, metro/coach/rail access, construction, seasonal route operation.
- Deferred prerequisites only: later editorial reassignment and a current two-airport photo/source pack.

### W1-C — `hg-topic-0864` / `guangzhou-railway-hub-selector`

**Status:** `PROPOSED / DEFER — NO WRITING AUTHORIZATION`.

**Decision:** Match the full ticketed station to the hotel/base and onward Guangdong/Hong Kong/Macau chain.

- Candidate roster: Guangzhou South, East, Guangzhou, Guangzhou Baiyun and North, but every row is conditional on release-day 12306 relevance.
- Explain the 26 January 2026 Guangzhou/Guangzhou Baiyun role change as a dated current baseline, not a permanent direction guarantee.
- Scenarios: luggage-heavy arrival to a central hotel; a traveller connecting to Hong Kong/Macau/another Guangdong city from the wrong Guangzhou side.
- Recovery: first determine ticket change/refund feasibility; then compare a verified metro/road transfer with boarding cutoff. “Change the train” is a valid safer answer.
- Official source set: `COMMON-RAIL-1`, `GZ-2`, `GZ-3`, `GZ-4` and current station notices.
- Links: Guangzhou Hub; Hong Kong owner; Macau owner; airport owner; national rail guide. The regional route-order owner remains available from the Hub rather than adding a fifth execution link here.
- Images: exact five-hub signage is ideal; at minimum hero plus one contrasting station. The Guangzhou South Commons candidate must pass file-page/licence/location/reuse review; it cannot stand in for all five.
- Dynamic triggers: national railway diagram, station-role adjustment, metro/intercity link and access construction.
- Deferred prerequisites only: later editorial reassignment, a current five-hub roster and image coverage.

### W1-D — `hg-topic-0875` / `shanghai-railway-station-selector`

**Status:** `PROPOSED / DEFER — NO WRITING AUTHORIZATION`.

**Decision:** Match Shanghai, Shanghai Hongqiao, Shanghai South or Shanghai Songjiang to the actual train, hotel and next transfer.

- Add a smaller station only if current 12306 evidence proves meaningful first-trip relevance. Do not build an encyclopedia.
- Scenarios: Hongqiao air/rail connection; central or southern/western hotel arrival with luggage and a late train.
- Recovery: read the full station name, check ticket changes, compare current cross-city access to cutoff, and protect the flight/hotel when the transfer is no longer safe.
- Official source set: `COMMON-RAIL-1`, `SH-1`, `SH-5`, `SH-6`, plus current Shanghai transport/station notices. `SH-2` and `SH-3` are added only when a scenario includes an airport connection.
- Links: Shanghai Hub, stay owner, PVG/SHA owner, Shanghai–Hangzhou owner, national rail guide.
- Images: exact current station signs/buildings; a Hongqiao hero should show the railway station rather than airport terminal. Add Shanghai Songjiang only with a current, rights-clear exact-location image.
- Dynamic triggers: railway diagram, station opening/role change, Airport Link/metro access, construction.
- Deferred prerequisites only: later editorial reassignment, a live roster and airport-owner boundary check.

### W1-E — `hg-topic-0265` / `zhangjiajie-airport-and-rail-hubs`

**Status:** `PROPOSED / DEFER — NO WRITING AUTHORIZATION`.

**Decision:** Given the actual ticket and booked base, identify whether Hehua Airport, the central rail/coach area or Zhangjiajie West is the usable arrival/departure node.

- Matrix: exact name/code; downtown or Wulingyuan interaction; Tianmen/Forest Park relationship only as routing; late arrival; luggage; onward node; wrong-node recovery.
- Scenarios: evening DYG arrival to Wulingyuan; Zhangjiajie West arrival with a city hotel/Tianmen plan and a hard next booking.
- Recovery: collect ticketed node, hotel Chinese name and booked attraction entrance/time. Decide whether to protect the attraction, change the base, or protect the next departure; do not promise a taxi duration.
- Official source set: `COMMON-RAIL-1`, `ZJJ-1`, `ZJJ-2`, `ZJJ-3`, `ZJJ-4` and current park/road notices where the chain reaches an entrance.
- Potential links after a future authorization: published Zhangjiajie Hub and park workflow; base owner; BJS corridor; national rail guide.
- Images: exact Zhangjiajie West and Hehua Airport/current central-node signage. A mountain or old station photo cannot substitute for Zhangjiajie West. If the rights-clear West Station hero is unavailable, status is `ASSETS NEEDED`.
- Dynamic triggers: railway diagram, airport ground transport, tourist-coach/road change, park/entrance/weather notice.
- Deferred prerequisites only: rights-clear West Station asset and current access evidence. PR #74 publication is already verified and does not activate this owner.

## Wave 2 — hold/defer inventory; no writing authorization

### W2-A — `hg-topic-0305` / `chengdu-chongqing-transport-route`

**Historical status (2026-08-20):** `HOLD / DEFER — NO WRITING AUTHORIZATION`.

**2026-09-01 central override:** the exact durable slug `chengdu-chongqing-station-pair` replaces this never-published proposed slug and may proceed only as part of the N=3 Southwest release candidate. Generic station selection/recovery remains with `chongqing-railway-station-selector`; the old slug must not become a route or redirect-only identity. This override does not activate any other Wave 2 package.

- Own one bidirectional hotel-to-hotel decision: exact Chengdu station, exact Chongqing station, rail leg, vertical Chongqing arrival, and next booking.
- Exclude the three-city route-order owner, standalone station comparisons, flights, fixed fares/times and reverse-page duplication.
- Recovery: wrong station on either end, missed train, late vertical last mile, luggage/step-free breakdown; choose change/rebook/overnight against the next hard deadline.
- Sources: `COMMON-RAIL-1`, `CD-5`, `CD-6`, `CQ-1`, `CQ-2`, `CQ-3`; add the exact release-day Chengdu and Chongqing station/12306 evidence. Airport archive `CD-3` is not railway-end evidence.
- Links: both Hubs when live; both rail selectors when live; Chongqing upper/lower orientation; national rail guide. The stay interaction belongs in the scenarios without adding a fifth execution link.
- Images: actual departure/arrival stations; Chongqing skyline is not acceptable. Existing Chongqing East imagery requires reuse review.
- Hold condition: the Chongqing selector is published; the independent Chongqing Hub routing decision remains unresolved.

### W2-B — `hg-topic-0856` / `beijing-pek-or-pkx-airport`

**Status:** `HOLD / DEFER — NO WRITING AUTHORIZATION`.

- Own the pre-book whole-trip airport decision and post-book confirmation, not “which is nearer?”
- Recovery: exact code/terminal → current cross-airport route → airline deadline → transfer/rebook/overnight.
- Sources: `BJ-2`, `BJ-3`, `BJ-4`, actual airport/airline lookup; `COMMON-RAIL-1` only for a rail connection.
- Links: Beijing Hub, stay owner, Beijing railway selector, South-to-airports owner, last-night guide.
- Images: current, exact PEK and PKX ground-transport/terminal context. Exterior architectural rights and location must be cleared; prefer Homeground/official-licensed/local assets.
- Gate: tool→editorial reassignment and proof it adds beyond the existing Beijing South transfer owner.

### W2-C — `hg-topic-0859` / `chengdu-railway-station-selector`

**Status:** `HOLD / DEFER — NO WRITING AUTHORIZATION`.

- Own current principal station identity, ticket/stay/onward-base fit and wrong-station recovery.
- Do not present central Chengdu Station as operating until official passenger-service evidence confirms it.
- Sources: `COMMON-RAIL-1`, `CD-5`, `CD-6`, current railway/local-government notices and live station roster. Airport source `CD-3` is not station-role evidence.
- Links: Chengdu Hub, CTU/TFU owner if live, Jiuzhaigou owner, panda owner, national rail guide.
- Images: exact East/South/West station identity; Chengdu East concourse Commons candidate requires full rights/reuse review and cannot represent all stations.
- Gate: tool→editorial reassignment, roster and current access evidence.

### W2-D — `hg-topic-0360` / `hangzhou-east-station-to-west-lake`

**Status:** `HOLD / DEFER — NO WRITING AUTHORIZATION`.

- Own East Station → confirmed hotel/gate/pier/road node, not an undefined “West Lake centre.”
- Include a trilingual destination card with the exact Chinese place name supplied by the hotel/booking.
- Recovery: wrong lake side/drop; stop carrying luggage across the lake, route first to hotel or verified storage, then salvage sightseeing.
- Sources: `COMMON-RAIL-1`, `HZ-2`, `HZ-3`, `HZ-6`, `HZ-7` and the current West Lake road/traffic notice. Airport source `HZ-1` is used only when the traveller's chain actually begins at HGH.
- Potential links after a future authorization: published Hangzhou Hub, Shanghai–Hangzhou owner, applicable stay owner when published, national rail guide.
- Images: Hangzhou East wayfinding plus an exact named West Lake access node, never generic lake scenery alone.
- Hold condition: stable destination-node framing; Hangzhou Hub publication is already verified and does not activate this owner.

### W2-E — `hg-topic-0347` / `guilin-to-longji-rice-terraces-transfer`

**Status:** `HOLD / DEFER — NO WRITING AUTHORIZATION`.

- Own Guilin node → confirmed Ping'an, Dazhai/Jinkeng or ancient Zhuang village/entrance, with luggage and walking/road handoff.
- Recovery: wrong village/entrance, road/weather disruption, missed local link; confirm hotel/park acceptance before changing villages.
- Sources: `GL-5`, `GL-6`, the current scenic-area/county road notice, and the current licensed road operator or booked-hotel/entrance confirmation; use `COMMON-RAIL-1` only for a rail arrival and `GL-1` only for an airport arrival. `GL-3`/`GL-4` describe the Li River/Yangshuo product and are not Longji-transfer evidence. Keep this package on hold if the two current road/operation sources cannot be secured.
- Links: Guilin Hub when live, Guilin–Yangshuo owner, stay owner when live, national transfer-choice guide.
- Images: exact village/entrance sign and real road/walking/luggage environment. A panoramic rice-terrace hero alone cannot identify the arrival chain.
- Gate: Guilin Hub decision, current access evidence and place-accurate entrance assets.

### W2-F — `hg-topic-0342` / `zhangjiajie-west-station-to-wulingyuan`

**Status:** `HOLD / DEFER — NO WRITING AUTHORIZATION`.

- Own the station-to-booked-Wulingyuan-hotel/entrance chain, late-arrival and luggage recovery.
- Exclude hub choice, city-vs-Wulingyuan stay choice, ticket/gate comparison and in-park itinerary.
- Sources: `COMMON-RAIL-1`, `ZJJ-2`, `ZJJ-3`, current local ground-transport/park notices.
- Potential links after a future authorization: published Zhangjiajie Hub and park workflow, base owner, and the airport/rail hub owner only if it is later published.
- Images: exact Zhangjiajie West access/transfer area plus exact Wulingyuan-side node. No mountain substitute.
- Gate: current official transfer evidence and rights-clear station image.

### W2-G — revised Shenzhen railway-hub owner

**Status:** `HOLD / DEFER — NO WRITING AUTHORIZATION`.

- Rename/rewrite `hg-topic-0876` so it owns mainland railway stations only: exact ticket, Shenzhen hotel area, mainland onward trip, and wrong-railway-station recovery.
- It must state that Futian railway station and Futian Checkpoint are different tasks. Port selection, border eligibility, crossing hours, Hong Kong landing and cross-border recovery remain in `shenzhen-hong-kong-transport-route`.
- Sources: `COMMON-RAIL-1`, `SZ-1`, `SZ-2`, `SZ-3`; border sources appear only in a handoff note, not as the station owner's rule set.
- Links: Shenzhen Hub when live, stay owner, Shenzhen–Hong Kong owner, regional route-order owner, national rail guide.
- Images: exact Shenzhen North and Futian railway-station signs; one body comparison may show a clearly labelled checkpoint solely to prevent confusion. Every image needs exact entity tagging.
- Gate: canonical rewrite/rename, tool→editorial reassignment, Shenzhen Hub decision and overlap review.

## HOLD packages and activation evidence

| Held item | Why held | Evidence needed for any later central review |
|---|---|---|
| `hg-topic-0867` Hangzhou railway selector | New Hub and Shanghai–Hangzhou owner may already solve the high-value station task | Query/user cases showing another station choice repeatedly changes a complete trip; current station-role sources and image pack |
| `hg-topic-0865` Guilin railway selector | Existing Guilin–Yangshuo owner covers the main visitor station/base choice; official stable station-direction descriptions are weak | Distinct Guilin-city-base intent, live Hub, 12306/official roster and three exact station images |
| `hg-topic-0354` Zhangjiajie city→Tianmen gate | Risk of becoming a thin attraction transfer or duplicating the ticket/route owner | Current official A/B/C route-to-entrance evidence, distinct recovery and exact entrance image |
| `hg-topic-0323` Hangzhou–Huangshan | Valuable but lower than unresolved Hangzhou local network | Current two-end station/gate evidence, independent SERP gap and two-node real images |
| `hg-topic-0312` Guangzhou–Shenzhen | May duplicate the current three-city route-order and Shenzhen–HK owner | Demonstrated two-city traveller task independent of Hong Kong; exact station-pair scenarios |
| `hg-topic-0314` / `0315` | Route-order owner already covers the sequence | Independent mode/station/base recovery not available in current owners |
| `hg-topic-0322` / `0325` / `0326` | Regional Hub/coverage and sources are not yet strong enough | Current official door-to-door chain, search evidence, image rights and clean Hub boundaries |

Activation evidence is required before an Issue, branch, slug, metadata file, Registry entry or internal link is created.
