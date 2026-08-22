import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "The train between Shanghai and Suzhou is one of the shortest intercity rides in China, and the ride itself is rarely the problem. What decides whether the day feels easy or exhausting is the station pairing on both ends and the last mile after each platform. For most first-time visitors the easiest combination is the Shanghai station closest to your hotel — Hongqiao for the west side and airport areas, Shanghai Station for People's Square and the Bund — paired with Suzhou Station for the Old City gardens, Suzhou Industrial Park station for Jinji Lake, and Suzhou North only when your onward plan already points that way.",
    },
    {
      id: "first-steps",
      type: "list",
      ordered: true,
      items: [
        "Mark your two hotels on a map: the Shanghai one decides your departure station; the Suzhou one decides your arrival station.",
        "Match the Suzhou station to the day's goal: Old City gardens → Suzhou Station; Jinji Lake and the modern east → Suzhou Industrial Park station; onward north by rail → Suzhou North.",
        "Check trains between those exact stations in 12306 or your ticketing app, not between city codes — different stations mean different timetables.",
        "Budget door-to-door time: roughly 30–45 minutes hotel-to-station in Shanghai at busy hours, 40–60 minutes of buffer before departure for security and gates, 23–30 minutes onboard on the fastest Hongqiao–Suzhou services (example timings reviewed August 2026), then metro or taxi to the door.",
        "If you are doing gardens plus Jinji Lake in one day, consider arriving at one Suzhou station and leaving from another — through tickets can be bought separately.",
        "Keep the return flexible: buy a later train than you think you need, because same-day changes after gate entry follow railway rules rather than goodwill.",
        "Save each station's Chinese name (苏州站, 苏州北站, 苏州园区站) in your notes app — taxi drivers and metro staff match characters faster than pinyin.",
      ],
    },
    {
      id: "matrix-heading",
      type: "heading",
      level: 2,
      text: "Base-matching matrix: which pair fits which plan",
    },
    {
      id: "base-matrix",
      type: "table",
      caption: "Match both ends before buying anything",
      columns: ["Your Shanghai base", "Your Suzhou focus", "Easier pairing", "Why"],
      rows: [
        [
          "West side (Hongqiao, Gubei, Qibao) or flying out of Hongqiao airport later",
          "Old City gardens, Pingjiang Road, museums",
          "Hongqiao → Suzhou Station",
          "Fastest frequent services; Suzhou Station sits inside the Old City with metro Lines 2/4 underneath",
        ],
        [
          "People's Square, Bund, Yu Garden area",
          "Old City gardens",
          "Shanghai Station → Suzhou Station",
          "Metro Lines 1/3/4 reach Shanghai Station directly; slower than Hongqiao departures but no cross-city trek",
        ],
        [
          "Any base",
          "Jinji Lake, Suzhou Center mall, modern east",
          "Either Shanghai station → Suzhou Industrial Park station",
          "Arrive already east of downtown; fewer transfers if Line 1 or a short ride covers the rest",
        ],
        [
          "Any base",
          "Overnight in Suzhou, next stop north (Wuxi, Nanjing)",
          "Pair via Suzhou Station; use Suzhou North only when the next leg departs there",
          "Suzhou North is far north of everything most itineraries touch; going there just to change again costs an hour or more",
        ],
        [
          "Southwest bases (Xujiahui southwards)",
          "Old City with light luggage",
          "Shanghai South or Songjiang departures where timetables allow",
          "Fewer trains run from the southern stations; treat them as opportunistic, not default",
        ],
      ],
    },
    {
      id: "inventory-heading",
      type: "heading",
      level: 2,
      text: "Station inventory and the Chinese-name check card",
    },
    {
      id: "inventory-note",
      type: "paragraph",
      text: "Four names exist on each side and they are not interchangeable. The single most common expensive mistake is booking to “Suzhou North” while thinking of the garden district, then spending 40+ extra minutes on Metro Line 2. Confirm the exact Chinese characters every time you buy, and again when you tell a driver where to go.",
    },
    {
      id: "inventory-table",
      type: "table",
      caption: "Name card: check these characters, not the English",
      columns: ["Station", "Chinese", "District / position", "Rail-side note"],
      rows: [
        ["Shanghai Station", "上海站", "Jing'an, north of People's Square; Metro 1/3/4", "Conventional line plus some D/G services toward Suzhou"],
        ["Shanghai Hongqiao Railway Station", "上海虹桥站", "West; Metro 2/10/17 under the complex; linked to Hongqiao Airport T2", "Main high-speed gateway; most Shanghai–Suzhou G-trains"],
        ["Shanghai South Railway Station", "上海南站", "Southwest; Metro 1/3/15", "Mostly conventional and regional services; fewest Suzhou options"],
        ["Shanghai Songjiang Station", "上海松江站", "Far southwest suburban", "Occasional services; only useful when staying nearby"],
        ["Suzhou Station", "苏州站", "Gusu District — the Old City itself; Metro 2/4 beneath", "Closest to gardens and Pingjiang Road; direct no-rescreen passage into the metro"],
        ["Suzhou North Railway Station", "苏州北站", "Xiangcheng District, far north; Metro Line 2 terminus area", "High-speed corridor station; wrong choice for garden days"],
        ["Suzhou New District Station", "苏州新区站", "West (New District / Huqiu side)", "Convenient only for west-side stays"],
        ["Suzhou Industrial Park Station", "苏州园区站", "East (SIP), practical for Jinji Lake", "Small station; check late-evening last trains carefully"],
      ],
    },
    {
      id: "doortodoor-heading",
      type: "heading",
      level: 2,
      text: "The door-to-door ledger: where the day actually goes",
    },
    {
      id: "doortodoor-note",
      type: "paragraph",
      text: "A 23-minute train does not make a 23-minute trip. Count all seven stages below and the honest total for an Old City garden day from central Shanghai is usually three hours each way including a taxi or metro at both ends — which is exactly why pairing the right stations matters more than shaving five minutes off the onboard time.",
    },
    {
      id: "doortodoor-table",
      type: "table",
      caption: "Seven stages of the Shanghai–Suzhou day (example timings, reviewed August 2026)",
      columns: ["Stage", "Typical cost", "What moves it"],
      rows: [
        ["Hotel to departure station", "15–45 min by metro or taxi", "Rush hour on Line 2; luggage slows metro transfers"],
        ["Entry security and real-name checks", "5–20 min", "Holiday peaks; passport lanes can be slower than ID lanes"],
        ["Waiting at the gate", "10–40 min", "Arrive early anyway; gates close before departure"],
        ["Train ride", "23–30 min fastest Hongqiao–Suzhou examples; 40–60+ min from Shanghai Station", "Service you chose; express versus stopping patterns"],
        ["Exit and station navigation", "5–15 min", "Suzhou Station's metro passage avoids re-screening"],
        ["Last mile in Suzhou", "5–25 min", "Metro Line 2/4 versus taxi queue versus walk from SIP station"],
        ["Finding the ticket gate or garden entrance", "5–15 min", "Garden security queues mid-morning"],
      ],
    },
    {
      id: "routemap-heading",
      type: "heading",
      level: 2,
      text: "One route map, both directions",
    },
    {
      id: "routemap-callout",
      type: "callout",
      tone: "neutral",
      title: "The chain looks the same backwards",
      body: "Shanghai hotel → Shanghai-side station (metro/taxi) → security + gate → train (23–60 min by service) → Suzhou arrival station → last mile (Line 2/4, taxi or walk) → Suzhou destination. Reverse every arrow for the return. Because the corridor is symmetric, buy each direction as its own decision: the best morning pair is not automatically the best evening pair once your evening plans move to a different district.",
    },
    {
      id: "daytrip-heading",
      type: "heading",
      level: 2,
      text: "Day trip or overnight: what each choice costs",
    },
    {
      id: "daytrip-list",
      type: "list",
      items: [
        "Same-day round trip: six-plus door-to-door hours leaves roughly four to five usable hours for one garden cluster plus Pingjiang Road. Choosing two far-apart Suzhou stations for arrival and return can add back an hour — do it only when the plan genuinely spans east and west.",
        "Overnight in Suzhou: the transport penalty disappears and early-morning gardens become realistic before tour groups arrive. The next morning you simply start from whichever Suzhou station suits the onward city.",
        "Gardens first, Jinji Lake dinner after: arrive Suzhou Station, spend the middle in the Old City, then Metro Line 1 east or a taxi to SIP; depart from Suzhou Industrial Park station if its evening timetable still shows workable trains.",
        "Late-evening returns: check the actual last train time on your date rather than assuming; if it lands near your dinner reservation, either move dinner east or accept a later departure.",
      ],
    },
    {
      id: "constraints-heading",
      type: "heading",
      level: 2,
      text: "Luggage, children, mobility and late-arrival risks",
    },
    {
      id: "constraints-list",
      type: "list",
      items: [
        "Large suitcases are legal on these trains but change everything: taxis beat metro for the first stage, and Suzhou Station's step-free route into Line 2/4 matters more than raw distance.",
        "With children or limited mobility, minimise transfers over minimising minutes: Hongqiao is huge — allow longer inside the building even though trains are faster.",
        "Passengers travelling on foreign passports use their passports as the travel document end to end; keep the same document for booking, gates and any manual channel.",
        "Arriving after roughly 21:00, assume metro frequency has dropped and taxi queues lengthen; Suzhou Industrial Park station's late services are thinner than Suzhou Station's — verify on your date.",
        "Public left-luggage exists at major stations but availability and hours change; do not build the plan around storing bags unless you have confirmed it that week.",
      ],
    },
    {
      id: "mistakes-heading",
      type: "heading",
      level: 2,
      text: "Four mistakes that quietly cost an hour",
    },
    {
      id: "mistakes",
      type: "list",
      ordered: true,
      items: [
        "Searching city-to-city instead of station-to-station, then discovering the arrival platform is forty minutes from your goal.",
        "Treating Suzhou North as the main Suzhou station — for garden days it is the farthest practical choice.",
        "Buying a fixed cheap return before knowing when dinner actually ends; same-day flexibility is worth a few yuan on this corridor.",
        "Leaving the metro-versus-taxi decision until arrival: at Suzhou Station the no-rescreen metro passage wins in daylight, while with luggage or late at night the taxi queue usually does.",
      ],
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "When something goes wrong: recovery paths",
    },
    {
      id: "recovery-table",
      type: "table",
      caption: "Fix the day without losing it",
      columns: ["Problem", "Do first", "Then"],
      rows: [
        [
          "Booked to Suzhou North but meant the Old City",
          "Before boarding: switch to a service calling at Suzhou Station if your fare rules allow the change",
          "Already arrived: ride Line 2 south and accept the extra 40-plus minutes; do not also swap gardens out of the day",
        ],
        [
          "Missed the reserved train after gate entry",
          "Go to the ticket window or app immediately — late-change rules on missed trains follow railway policy for your fare, not goodwill; ask what rebooking is possible today",
          "If nothing same-day suits, buy the next available service as a fresh ticket and seek any refund separately through your original channel",
        ],
        [
          "Train cancelled or heavily delayed mid-day",
          "Check the next departures from BOTH your arrival options (Suzhou and Suzhou Industrial Park often share corridor services)",
          "Rebuild around the district you are already in rather than crossing the city twice",
        ],
        [
          "Arrived at a station whose last metro has gone",
          "Use the official taxi queue outside the station rather than ride-hail pins at confusing pickup zones",
          "Keep the hotel's Chinese address ready; short rides inside Gusu are usually quick even late",
        ],
        [
          "Bought tickets between the wrong Shanghai pair",
          "Same fix both directions: change before travel if rules allow, else board toward the right side and adjust the last mile",
          "Record which pairing actually failed so the return uses the other station",
        ],
      ],
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Three composite scenarios",
    },
    {
      id: "scenario-a-heading",
      type: "heading",
      level: 3,
      text: "Bund hotel, one garden day",
    },
    {
      id: "scenario-a",
      type: "paragraph",
      text: "A couple staying near the Bund wants Humble Administrator's Garden and Pingjiang Road. Shanghai Station is a ten-minute metro ride away and serves Suzhou directly, so the tempting plan is Shanghai Station out and back. The better version: take Shanghai Station → Suzhou Station in the morning while energy is high, then return in the evening from the same station only if dinner stays in the Old City; if they decide on Jinji Lake for the evening, Metro Line 1 east and a departure from Suzhou Industrial Park station keeps the night from doubling back. Total door-to-door still lands near six hours — the pairing choice protects roughly forty minutes of it.",
    },
    {
      id: "scenario-b-heading",
      type: "heading",
      level: 3,
      text: "Family with suitcases, two nights by Jinji Lake",
    },
    {
      id: "scenario-b",
      type: "paragraph",
      text: "A family of four with two large cases is sleeping in Suzhou Center for two nights. With luggage, metro transfers at both ends are the painful part. Hongqiao → Suzhou Industrial Park station puts them fifteen minutes from the hotel by taxi; Suzhou Station would mean Line 1 with cases. On the return they can reverse freely because the corridor's frequency makes both stations workable in daylight. This is the clearest case where the arrival station should be chosen for the hotel, not for the gardens.",
    },
    {
      id: "scenario-c-heading",
      type: "heading",
      level: 3,
      text: "Landed late at Hongqiao, Suzhou tonight",
    },
    {
      id: "scenario-c",
      type: "paragraph",
      text: "A solo traveller lands at Hongqiao airport at 19:40 aiming to sleep in Suzhou. Because the rail complex and Terminal 2 share a building, the realistic question is not which Shanghai station but whether a comfortable same-evening service still runs. Walking upstairs beats any taxi across the city; buying the next flexible departure beats a fixed cheap fare; and choosing Suzhou Station over Suzhou North keeps the midnight taxi short. If services have thinned past feasibility, the honest fallback is an airport-side hotel in Shanghai and a first-thing-morning train — planned in advance as option B rather than discovered at midnight.",
    },

    {
      id: "dynamic-boundary",
      type: "callout",
      tone: "warning",
      title: "Timetables move; stations do not",
      body: "Service counts, fastest journey examples and last-train times cited here were reviewed in August 2026 and shift with schedules and seasons. Station locations, districts and metro connections are stable facts. Always check live times for your date in 12306 or your ticketing app, and confirm construction impacts such as the Suzhou North hub works before relying on specific entrances.",
    },
    {
      id: "scope",
      type: "callout",
      tone: "neutral",
      title: "What this guide covers",
      body: "One task: choosing the Shanghai–Suzhou station pairing and running the door-to-door chain in either direction. It does not rank Shanghai's stations in isolation, choose Suzhou hotels, plan garden tickets, sequence the wider Yangtze delta, or replace the general first-time rail tutorial.",
    },
    {
      id: "more-planning",
      type: "internal-links",
      title: "Related planning guides",
      items: [
        {
          label: "Riding China high-speed rail for the first time",
          href: "/guides/china-high-speed-train-first-time-guide/",
          description: "Passport booking, security, gates and onboard basics this route assumes.",
        },
        {
          label: "Ordering the Yangtze delta cities",
          href: "/guides/shanghai-suzhou-hangzhou-nanjing-route-order/",
          description: "Where Suzhou sits when Hangzhou and Nanjing join the itinerary.",
        },
        {
          label: "Using a passport as your ticket to the gate",
          href: "/guides/china-passport-as-ticket-booking-to-gate/",
          description: "How foreign-passport e-tickets work end to end.",
        },
        {
          label: "Rail-only route design",
          href: "/guides/china-rail-only-route/",
          description: "Building longer corridors on rails when the trip grows beyond a day hop.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources reviewed",
      items: [
        {
          label: "China Railway 12306 — official ticketing and station information platform",
          url: "https://www.12306.cn/index/",
          publisher: "China State Railway Group",
          reviewedAt: "2026-08-22",
        },
        {
          label: "Suzhou Rail Transit — 苏州火车站 metro interchange (Lines 2/4) and transfer passage",
          url: "https://zh.wikipedia.org/wiki/%E8%8B%8F%E5%B7%9E%E7%81%AB%E8%BD%A6%E7%AB%99_(%E5%9C%B0%E9%93%81)",
          publisher: "Suzhou Rail Transit details compiled on Wikimedia (citing official notices)",
          reviewedAt: "2026-08-22",
        },
        {
          label: "Suzhou North hub expansion notice — temporary exit closures Feb 2025 – Nov 2027",
          url: "https://zh.wikipedia.org/wiki/%E9%AB%98%E9%93%81%E8%8B%8F%E5%B7%9E%E5%8C%97%E7%AB%99_(%E5%9C%B0%E9%93%81)",
          publisher: "Suzhou Rail Transit details compiled on Wikimedia (citing official notices)",
          reviewedAt: "2026-08-22",
        },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
