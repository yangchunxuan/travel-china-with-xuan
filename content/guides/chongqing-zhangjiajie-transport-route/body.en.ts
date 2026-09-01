import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "Treat Chongqing–Zhangjiajie as an address-to-address execution chain, not one generic train ride. For Chongqing → Zhangjiajie, start from the exact Chongqing station characters printed on the live 12306 booking, travel to 张家界西站, then continue to the exact hotel address you chose before travel. For the reverse direction, build and verify the chain again; do not assume the same service pattern or last-mile option works backwards.",
    },
    {
      id: "scope",
      type: "callout",
      tone: "neutral",
      title: "One task, three fixed endpoints",
      body: "This page executes the corridor between the ticketed Chongqing node, Zhangjiajie West, and an already-selected hotel address. It does not decide which Chongqing station is best, whether to stay in Zhangjiajie city or Wulingyuan, or how China's railway booking and boarding system works nationwide.",
    },
    {
      id: "before-booking-heading",
      type: "heading",
      level: 2,
      text: "Fix the address before you build the chain",
    },
    {
      id: "first-steps",
      type: "list",
      ordered: true,
      items: [
        "Choose your Zhangjiajie base on the dedicated city-versus-Wulingyuan guide. Then save the hotel's full Chinese name, exact street address, map pin and contact channel; a district name alone is not an endpoint.",
        "Search the live 12306 platform for your actual date and direction. Copy the complete Chongqing station name from the selected service and keep 张家界西站 distinct from 张家界站.",
        "Build the Chongqing ground leg to the station on the ticket, using current navigation and the station selector for geography. Do not route toward a familiar Chongqing station by habit.",
        "Ask the selected hotel for its current arrival instructions, including the address drivers should use and any agreed pickup meeting point. If the hotel offers no transfer, verify an on-the-day option through station signage or staffed information after arrival.",
        "Write down a fallback before departure: who to contact, where to wait inside the staffed station area, and which separately bookable address can receive you if the planned final leg fails.",
      ],
    },
    {
      id: "chain-heading",
      type: "heading",
      level: 2,
      text: "The corridor, stage by stage",
    },
    {
      id: "chain-table",
      type: "table",
      caption: "What must be exact at each handoff",
      columns: ["Stage", "Decision to lock", "Evidence to carry"],
      rows: [
        [
          "Chongqing ground leg",
          "The precise station printed on the active ticket",
          "Station characters, live route and booking details",
        ],
        [
          "Rail handoff",
          "The service currently shown for this date and direction",
          "Live 12306 order and station display",
        ],
        [
          "Zhangjiajie West arrival",
          "The station-posted exit or an agreed meeting point",
          "Hotel message, driver details if supplied, and address pin",
        ],
        [
          "Final road leg",
          "One verified method to the already-chosen property",
          "Full Chinese hotel name and exact street address",
        ],
        [
          "Hotel door",
          "Correct property and check-in contact, not merely the right district",
          "Reservation name and written arrival arrangement",
        ],
      ],
    },
    {
      id: "directions-heading",
      type: "heading",
      level: 2,
      text: "Build each direction separately",
    },
    {
      id: "directions-table",
      type: "table",
      caption:
        "Plan both directions separately; do not assume the operations are symmetric",
      columns: ["Direction", "Chain", "Do not assume"],
      rows: [
        [
          "Chongqing → Zhangjiajie",
          "Origin address → ticketed Chongqing station → 张家界西站 → chosen hotel address",
          "That a service or final-leg option seen on another date still operates",
        ],
        [
          "Zhangjiajie → Chongqing",
          "Chosen hotel address → 张家界西站 → ticketed Chongqing arrival station → destination address",
          "That reversing the outbound arrows reproduces the return timetable, pickup or city transfer",
        ],
      ],
    },
    {
      id: "evidence-heading",
      type: "heading",
      level: 2,
      text: "Why this page does not freeze a timetable",
    },
    {
      id: "evidence-para",
      type: "paragraph",
      text: "A Chongqing government notice dated 22 January 2026 recorded a new Zhangjiajie West–Chongqing East service in that timetable adjustment, and explicitly directed readers to 12306 for subsequent details. A China Railway notice dated 10 July 2026 documented temporary extra services, showing that operating patterns can change at short notice. These notices prove dated changes, not today's train, fare, station or departure time. The live 12306 result for the travel date remains the operational check.",
    },
    {
      id: "luggage-heading",
      type: "heading",
      level: 2,
      text: "Make luggage part of the booking",
    },
    {
      id: "luggage-list",
      type: "list",
      ordered: false,
      items: [
        "Tell any hotel or transport provider the real party size and luggage count before accepting a pickup; a vehicle label alone does not prove capacity.",
        "Keep passports, medication, charging access and the hotel address with you rather than in a bag you may need to store or transfer.",
        "Ask where the vehicle can legally meet you and whether the property entrance involves stairs, a slope or a second walking leg. Confirm the exact entrance, not a general neighbourhood.",
        "For the reverse direction, settle luggage pickup and departure instructions with the hotel before travel day, then recheck them against the live train booking.",
      ],
    },
    {
      id: "late-heading",
      type: "heading",
      level: 2,
      text: "Late arrival and interruption recovery",
    },
    {
      id: "failure-table",
      type: "table",
      caption:
        "Recover the next verified handoff, not the original plan at any cost",
      columns: ["Failure", "First move", "Safe recovery boundary"],
      rows: [
        [
          "Wrong Chongqing station in your mental plan",
          "Read the active ticket again and compare the actual station with your current location",
          "If the boarding node is no longer reachable, use the current railway handling options instead of racing across the city",
        ],
        [
          "Service changed, delayed or cancelled",
          "Use 12306 and station staff for the live railway status",
          "Rebuild the remaining chain and tell the hotel the revised arrival before committing to a road transfer",
        ],
        [
          "Planned pickup cannot be found",
          "Return to a staffed, signed station area and contact the hotel or named provider",
          "Do not follow an unverified solicitor; use a station-posted channel or another independently verified option",
        ],
        [
          "Late arrival breaks the final leg",
          "Confirm whether the chosen property can still receive you and whether the transfer is actually operating",
          "If either answer is missing, use the written fallback address and reconnect to the original hotel later",
        ],
        [
          "Luggage no longer fits the planned vehicle",
          "Do not split people and bags without a named meeting plan",
          "Change the vehicle arrangement or make a documented second movement while keeping essentials with the traveller",
        ],
      ],
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "A five-line recovery protocol",
    },
    {
      id: "recovery-list",
      type: "list",
      ordered: true,
      items: [
        "Stop and identify the last confirmed node: ticketed station, train, 张家界西站, or hotel address.",
        "Check the railway segment only through live 12306 information or station staff.",
        "Tell the receiving hotel what changed and ask for a written, current arrival instruction.",
        "Accept the next transfer only when its meeting point and destination address are clear.",
        "Update the next person in the chain; do not let a silent delay turn into a failed check-in or missed return train.",
      ],
    },
    {
      id: "mistakes-heading",
      type: "heading",
      level: 2,
      text: "Five mistakes to remove before travel day",
    },
    {
      id: "mistakes-list",
      type: "list",
      ordered: true,
      items: [
        "Saving only the city name instead of the full Chongqing station characters.",
        "Arriving at Zhangjiajie West with a district choice but no exact hotel address.",
        "Using an old screenshot, article example or dated government notice as today's timetable.",
        "Assuming an outbound train or last-mile arrangement will exist in reverse.",
        "Treating the mountain hero photograph as evidence of any station, bus, taxi or transfer operation.",
      ],
    },
    {
      id: "handoffs-heading",
      type: "heading",
      level: 2,
      text: "Finish the earlier choices before building this leg",
    },
    {
      id: "handoffs-para",
      type: "paragraph",
      text: "If you are still comparing Chongqing stations, stop here and use the Chongqing station selector. If you have not chosen between a Zhangjiajie city or Wulingyuan base, settle that with the hotel-base guide before constructing the final leg. Use the first-time high-speed rail guide for passport booking, security, gates and nationwide railway rules. Once those choices are made, continue here until the route reaches the exact booked address.",
    },
    {
      id: "dynamic-boundary",
      type: "callout",
      tone: "warning",
      title: "Live check required",
      body: "No departure time, fare, distance, journey duration, road-transfer time, bus schedule, taxi availability or hotel reception rule is frozen here. Search the live 12306 platform for the travel date and direction, and confirm the final leg and check-in directly for the exact property before departure.",
    },
    {
      id: "more-planning",
      type: "internal-links",
      title: "Complete the decisions around this corridor",
      items: [
        {
          label: "Choose the three-city order first",
          href: "/guides/chengdu-chongqing-zhangjiajie-route-order/",
          description:
            "Decide whether all three cities fit and which direction protects the usable days.",
        },
        {
          label: "Settle the Chengdu–Chongqing station pair",
          href: "/guides/chengdu-chongqing-station-pair/",
          description:
            "Choose the preceding station pair first when the trip also includes Chengdu.",
        },
        {
          label: "Choose the correct Chongqing railway station",
          href: "/guides/chongqing-railway-station-selector/",
          description:
            "Compare Chongqing's station geography before you select a ticketed node.",
        },
        {
          label: "Choose Zhangjiajie city or Wulingyuan as your base",
          href: "/guides/zhangjiajie-city-or-wulingyuan-hotel-base/",
          description:
            "Make the overnight-base decision before this page builds the last mile.",
        },
        {
          label: "First-time China high-speed rail guide",
          href: "/guides/china-high-speed-train-first-time-guide/",
          description:
            "Check booking documents, station entry, gates and boarding for China rail travel.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources reviewed",
      items: [
        {
          label:
            "China Railway 12306 — official live booking and service platform",
          url: "https://www.12306.cn/index/",
          publisher: "China State Railway Group",
          reviewedAt: "2026-09-01",
        },
        {
          label: "Chongqing timetable-adjustment notice dated 22 January 2026",
          url: "https://www.cq.gov.cn/ywdt/jrcq/202601/t20260122_15343341.html",
          publisher: "Chongqing Municipal People's Government",
          reviewedAt: "2026-09-01",
        },
        {
          label:
            "China Railway temporary extra-service notice dated 10 July 2026",
          url: "https://kyfw.12306.cn/mormhweb/zxdt_news/202607/t20260710_46062.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-09-01",
        },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
