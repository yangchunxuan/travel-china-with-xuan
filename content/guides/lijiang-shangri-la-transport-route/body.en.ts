import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "The train is the usual starting point for a direct move from Lijiang to Shangri-La: it reduces time on mountain roads and makes the intercity leg straightforward. A licensed private vehicle can be better when the journey deliberately includes an intermediate stop or offers a clear door-to-door advantage for the exact hotel. The decision does not end at Shangri-La Station. The station elevation rises from about 2,400 metres in Lijiang to about 3,274 metres in Shangri-La, so the hotel transfer and a restful first night are part of the transport plan." },
  { id: "direct-answer", type: "callout", title: "Plan the arrival, not only the vehicle", tone: "decision", body: "For a direct city-to-city move, search 12306 for the travel date, confirm the hotel transfer and keep the first evening quiet. Choose the road only for a genuine door-to-door benefit or a planned intermediate stop. If health, weather or transport makes the original plan unrealistic, remove the evening activity, delay the next excursion or remain at a lower-altitude base rather than forcing the schedule." },
  { id: "mode-heading", type: "heading", level: 2, text: "Rail and road solve different trips" },
  { id: "mode-matrix", type: "table", caption: "No live frequency or road duration is promised", columns: ["Mode", "Best fit", "Main difficulty", "Condition that changes the answer"], rows: [
    ["Dated train: 丽江站 → 香格里拉站", "Direct hotel change, families and travellers who want a straightforward intercity trip", "Station access at both ends, luggage and a rapid altitude gain", "No workable seats, a major disruption or a required intermediate stop"],
    ["Licensed private road transfer", "Exact hotel-to-hotel move or a deliberately planned stop with enough daylight", "Mountain-road weather, traffic, driver quality and longer sitting", "Road alert, darkness, motion sensitivity or an unverified operator"],
    ["Current authorised coach", "Budget-led trip when the dated official route and boarding point fit", "Terminal access, baggage handling and changing operations", "An old timetable is the only evidence, or the arrival misses the hotel transfer"],
    ["Stay in Lijiang and move later", "Traveller who is unwell, exhausted, weather-blocked or not ready for the higher base", "Uses a night and may require ticket changes", "It is the safer choice when continuing is no longer realistic"]
  ]},
  { id: "altitude-heading", type: "heading", level: 2, text: "The railway arrival is also an altitude change" },
  { id: "altitude", type: "comparison", title: "Keep the first night simple", columns: [
    { heading: "Before boarding", items: ["Know the 2,400 m to 3,274 m station change", "Keep hotel contact and health information accessible", "Do not arrive already dehydrated or exhausted by avoidable scheduling"] },
    { heading: "After arrival", items: ["Use a confirmed vehicle to the exact lodging", "Reduce activity intensity while adapting", "Keep warm, eat simply and avoid alcohol as advised by NHC experts"] },
    { heading: "Escalation", items: ["Do not diagnose yourself from a travel article", "Severe breathing difficulty, severe headache or altered consciousness requires urgent medical care", "Follow clinicians and descend/change the route when they advise it"] }
  ]},
  { id: "base-heading", type: "heading", level: 2, text: "Name the Shangri-La base before leaving Lijiang" },
  { id: "base", type: "table", caption: "‘Shangri-La hotel’ is not a pickup instruction", columns: ["Base type", "Transfer instruction", "First-night implication"], rows: [
    ["Dukezong Old Town area", "Send the full Chinese hotel name, gate/roadside meeting point and phone; do not assume a car reaches a pedestrian lane", "Finish at the room and keep the evening local"],
    ["Songzanlin/northern city side", "Use the exact pin and ask which entrance a vehicle can legally reach", "Do not add an old-town detour merely because it is famous"],
    ["Resort or rural property outside the urban core", "Require written pickup coverage, vehicle identity, luggage capacity and late-arrival rule", "The final road leg may be the least recoverable part of the day"],
    ["Next-day scenic departure point", "Confirm it separately from the station transfer and hotel address", "Do not turn the arrival vehicle into an assumed next-morning tour"]
  ]},
  { id: "chain-heading", type: "heading", level: 2, text: "Plan each part of the journey" },
  { id: "rail-chain", type: "list", ordered: true, items: [
    "Confirm the exact travel-date train in 12306 and copy 丽江站 and 香格里拉站.",
    "Ask the Lijiang hotel when to leave for the station; include road traffic, station entry and luggage.",
    "Send the Shangri-La hotel the train record, group size, luggage and a reachable phone number.",
    "At Shangri-La Station, use the official pickup/taxi area and match the vehicle before loading.",
    "Go to the exact lodging entrance or agreed roadside point, not a generic old-town map pin.",
    "Make check-in and rest the priorities; treat dinner or sightseeing as optional."
  ]},
  { id: "scenarios-heading", type: "heading", level: 2, text: "Traveller situations that change the plan" },
  { id: "scenarios", type: "table", caption: "The same train can produce a different first night", columns: ["Traveller", "Working plan", "Avoid"], rows: [
    ["First China trip, no recent high-altitude stay", "Daylight rail if available, confirmed pickup, quiet evening and a flexible next morning", "Arrival plus a long scenic outing and late dinner"],
    ["Family travelling with an older parent", "Choose the route with the fewest uncertain transfers, keep bags with the vehicle, and request room-access details", "Assuming 'old town' means door access or level walking"],
    ["Traveller intentionally stopping at Tiger Leaping Gorge", "Plan a licensed road journey separately, with weather and daylight checks plus a named final pickup", "Calling an improvised roadside stop a transfer benefit"],
    ["Late rail arrival after a tiring Lijiang day", "Hotel direct, simple food, no optional evening programme", "Using the time saved by rail to add more activity"]
  ]},
  { id: "weather", type: "callout", title: "Weather controls both the road alternative and the final transfer", tone: "warning", body: "Check the China Meteorological Administration forecast and warnings for both cities and the road corridor on the travel date. Rain, snow, ice or low visibility can alter road safety and authorised transport. Railway operation must still be checked in 12306. A weather app screenshot from days earlier is not operating evidence." },
  { id: "downgrade-heading", type: "heading", level: 2, text: "Safer alternatives when the original plan no longer works" },
  { id: "downgrade", type: "list", ordered: true, items: [
    "Remove the optional arrival-evening activity but keep the confirmed hotel transfer.",
    "Move the next-morning excursion later and reassess after rest.",
    "If the rail or road leg is disrupted, keep the Lijiang room or stay another night at a lower-altitude base.",
    "If concerning symptoms appear, stop sightseeing and seek medical assessment; use emergency services for severe signs.",
    "If clinicians advise descent or the group cannot continue safely, change the route and return/remain lower rather than preserving prepaid plans."
  ]},
  { id: "verify-heading", type: "heading", level: 2, text: "Final verification before leaving Lijiang" },
  { id: "verify", type: "list", items: [
    "12306 or the current official road operator confirms the dated transport.",
    "Both station names and the Shangri-La lodging address are saved in Chinese.",
    "The final vehicle, meeting point, luggage capacity and late-arrival rule are confirmed.",
    "The group understands the 2,400 m to 3,274 m station elevation change.",
    "CMA forecasts/warnings and any road or rail disruption have been checked today.",
    "The first evening is optional except for transfer, check-in, food and rest.",
    "A lower-base stay and a medical escalation plan exist if the journey cannot continue."
  ]},
  { id: "help", type: "callout", title: "Need the train, hotel and first night checked together?", tone: "decision", body: "Send Homeground the date, Lijiang starting point, Shangri-La hotel, group size, luggage and broad comfort needs. We can review the transfers and spare time. For individual health advice, speak with a clinician; transport and weather operations remain with official providers." },
  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "Homeground transport and planning guides", href: "/guides/", description: "Return to the parent guide collection." },
    { label: "Kunming, Dali, Lijiang and Shangri-La route order", href: "/guides/kunming-dali-lijiang-shangri-la-route-order/", description: "Decide whether Shangri-La belongs in the wider Yunnan sequence." },
    { label: "Lijiang Old Town or Shuhe: where to stay", href: "/guides/lijiang-old-town-or-shuhe-where-to-stay/", description: "Choose the Lijiang departure base before this transfer." },
    { label: "China night train or daytime high-speed rail", href: "/guides/china-night-train-or-daytime-high-speed-rail/", description: "Use the broader mode framework for other China legs." },
    { label: "Is your China itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Leave enough time to rest on the first night." }
  ]},
  { id: "sources", type: "sources", title: "Official and authoritative sources", items: [
    { label: "Lijiang–Shangri-La railway opening and station elevations", url: "https://jtyst.yn.gov.cn/html/2023/xingyexinwen_1127/130663.html", publisher: "Yunnan Department of Transport", reviewedAt: "2026-08-13" },
    { label: "Railway anniversary and station-to-scenic connections", url: "https://jtyst.yn.gov.cn/html/2024/jiaotongyaowen_1128/3133261.html", publisher: "Yunnan Department of Transport", reviewedAt: "2026-08-13" },
    { label: "Shangri-La official scenic direct-service information", url: "https://www.diqing.gov.cn/xwzx/xsqkx/202408/20240830_215419.html", publisher: "Diqing Prefecture Government", reviewedAt: "2026-08-13" },
    { label: "NHC high-altitude travel expert guidance", url: "https://www.nhc.gov.cn/xcs/c100122/202507/7dfe2bbc60604ed2bd15bec34f7ada64.shtml", publisher: "National Health Commission", reviewedAt: "2026-08-13" },
    { label: "Shangri-La forecast", url: "https://www.weather.com.cn/weather/101291301.shtml", publisher: "China Weather / CMA", reviewedAt: "2026-08-13" },
    { label: "China Railway live journey search", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-08-13" },
    { label: "Hero photograph: Shangri-La Railway Station at night — 祝鱼贵 (CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:20260224_Shangri-La_Railway_Station_02.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13" },
    { label: "Hero photograph licence: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0", publisher: "Creative Commons", reviewedAt: "2026-08-13" }
  ]}
] } as const satisfies StructuredPageBody;

export default body;
