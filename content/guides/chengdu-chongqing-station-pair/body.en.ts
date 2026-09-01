import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "decision-lead",
      type: "lead",
      text: "A Chengdu–Chongqing ticket is not just a fast line between two cities. It is a pair of exact Chinese station names joined to two hotel doors. Search the real date in 12306 first, then compare hotel-to-station access, the rail segment, exit and the final Chongqing vertical-city transfer. After purchase, the printed pair controls in either direction.",
    },
    {
      id: "quick-answer",
      type: "callout",
      title: "The right pair beats the fastest rail segment",
      tone: "decision",
      body: "Chengdu East and Chongqing North are common search anchors, but they are not a permanent universal answer. Search the live results for the exact date and direction. Only the two endpoints shown on the same train in 12306 form a verified pair; then let both hotel addresses decide whether that pair works.",
    },
    {
      id: "scope-boundary",
      type: "callout",
      title: "The Chengdu–Chongqing station-pair decision",
      tone: "neutral",
      body: "Use this guide to choose the dated Chengdu–Chongqing station pair in either direction and connect it from one hotel door to the other. Use the linked guides for the three-city route decision, Chongqing station geography, national ticket buying, hotel-area choice and the Chongqing–Zhangjiajie leg.",
    },
    {
      id: "before-booking",
      type: "list",
      ordered: true,
      items: [
        "Save both Chinese endpoints from the dated 12306 order; 成都东–重庆北 and another pair are not interchangeable versions of one route.",
        "Pin the Chengdu lobby, its departure entrance, the Chongqing exit and the hillside hotel door as four separate handoffs.",
        "Give station entry, reception and any next booking their own closing times; use the first one that can no longer be met as the recovery trigger.",
        "Compare the two city transfers, Chongqing elevation changes and suitcase handling alongside—not inside—the train time.",
        "Ask staff at the printed station about the active order; if the pair no longer works, alter it before crossing town or protect the Chongqing arrival night.",
      ],
    },
    {
      id: "matrix-heading",
      type: "heading",
      level: 2,
      text: "Verify one live train before treating two stations as a pair",
    },
    {
      id: "decision-matrix",
      type: "table",
      caption:
        "Verify the real date and both hotel addresses instead of preserving a default pair",
      columns: [
        "Check before ticketing",
        "What to verify in 12306",
        "Pass condition",
        "Shortcut to reject",
      ],
      rows: [
        [
          "Find one sellable train",
          "Search the exact date and direction, open one train result, and save both full Chinese endpoints from that same result.",
          "Both endpoints appear on that same train and seats can be purchased for the travel date.",
          "Do not join two station names merely because they appear in separate searches.",
        ],
        [
          "Test both hotel transfers",
          "Use only the endpoints on that train to map the Chengdu hotel to the departure entrance and the Chongqing exit to the exact hotel door.",
          "A slightly longer rail segment can still win if it removes a long city transfer or difficult change.",
          "Do not assume a station suffix such as East, West or North describes its distance from every hotel or attraction.",
        ],
        [
          "Recheck before purchase and travel",
          "Confirm that the same dated train still shows both saved endpoints; if either end changes, rebuild the door-to-door comparison.",
          "The current train still calls at both saved endpoints and both exact entrances remain workable.",
          "Do not mirror a direction, preserve an old pair or infer a direct service from station names alone.",
        ],
      ],
    },
    {
      id: "dynamic-warning",
      type: "callout",
      title: "Live stops can change the best Chengdu–Chongqing station pair",
      tone: "warning",
      body: "Train listings and calling patterns can change. Search the exact date and direction; do not preserve one fastest pair, infer a direct service from station names or assume the return journey uses the same endpoints.",
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Three corridor trips that reward different station pairs",
    },
    {
      id: "scenario-table",
      type: "table",
      caption: "Measure from the Chengdu door to the Chongqing door",
      columns: [
        "Corridor journey",
        "How to test the pair",
        "Two-city connection at risk",
      ],
      rows: [
        [
          "Central Chengdu hotel to Jiefangbei",
          "Compare checkout-to-platform and Chongqing exit-to-lobby, including the correct square, gradients and luggage. A slightly slower train may win by avoiding one long city transfer.",
          "The fastest train arrives at the wrong side of Chongqing for the hotel and a timed evening booking.",
        ],
        [
          "Family with luggage going west or south",
          "Count taxi legality, lift availability, station walking and one fewer transfer. Do not turn a short rail segment into a staircase relay.",
          "A cheap pair creates two difficult changes and separates the group in a large station.",
        ],
        [
          "Late arrival with a separate evening booking",
          "Verify the current local-transport window, hotel reception and abandonment point. Protect a staffed night before relying on the last unprotected handoff.",
          "A minor train delay removes the planned final metro or check-in window.",
        ],
      ],
    },
    {
      id: "chain-heading",
      type: "heading",
      level: 2,
      text: "Join the Chengdu origin, both station doors and the Chongqing address",
    },
    {
      id: "door-to-door-chain",
      type: "comparison",
      title:
        "A fast train works only when both city-side station transfers work",
      columns: [
        {
          heading:
            "Leave from the Chengdu hotel door and exact departure entrance",
          items: [
            "Confirm checkout and the vehicle-accessible entrance of the ticketed Chengdu station with the hotel before departure morning.",
            "Judge the first transfer by road or metro changes with the party's cases, not by the station's distance from a city-centre pin.",
            "Keep an ordinary security and boarding margin even when the intercity train itself is frequent.",
          ],
        },
        {
          heading:
            "Read the live Chengdu–Chongqing pair printed by 12306 literally",
          items: [
            "Keep the train number and both Chinese station names together; changing one endpoint creates a new door-to-door comparison.",
            "Use 12306 for the active service and ask staff at the actual departure station about that order, not about a general corridor rule.",
            "Keep both full Chinese station names on the 12306 order; city-only pins erase the transfers that decide this corridor.",
          ],
        },
        {
          heading:
            "Finish at the Chongqing exit/square and final vertical-city hotel door",
          items: [
            "Leave through the signed exit at the booked Chongqing station and use the verified connection to the final vertical-city address.",
            "Test the Chongqing exit against the hotel's level, road access and reception time; a nearby map pin can sit far above or below the vehicle stop.",
            "If the final address cannot receive the arrival, choose another live station pair before boarding or keep the first Chongqing night simple.",
          ],
        },
      ],
    },
    {
      id: "late-heading",
      type: "heading",
      level: 2,
      text: "Suitcases and Chongqing's vertical last mile can defeat the fastest train",
    },
    {
      id: "late-table",
      type: "table",
      caption:
        "Protect both station transfers before saving minutes on the rail leg",
      columns: [
        "Corridor constraint",
        "More resilient station pair",
        "Two-city shortcut to reject",
      ],
      rows: [
        [
          "two station choices, Chongqing gradients and cases",
          "With cases, compare Chengdu platform access and the Chongqing exit-to-vehicle route together. One extra lift or steep final approach can erase a shorter train.",
          "A metro interchange symbol does not describe Chongqing's elevation, road side or the hotel's actual lobby level.",
        ],
        [
          "Arrival threatens station entry, hotel reception and the next separate booking",
          "Check later options in 12306, confirm which Chongqing arrival station the hotel can still receive, then recalculate the complete door-to-door chain before changing.",
          "A daytime ride from a Chongqing station should not be assumed available with the same entrance and route late at night.",
        ],
        [
          "A separate booking after the Chongqing exit/square and final vertical-city hotel door",
          "When another ticket follows, budget the Chongqing exit, the vertical road transfer and a new entry process at the onward node before buying it.",
          "Two reservations displayed in one trip plan do not create a protected Chengdu–Chongqing connection.",
        ],
      ],
    },
    {
      id: "corridor-mismatch",
      type: "callout",
      title:
        "If the issued pair is wrong for the plan, stop before crossing the city",
      tone: "warning",
      body: "For Chongqing station choice or wrong-station recovery, use the Chongqing railway station selector linked below; this guide only recalculates the Chengdu–Chongqing door-to-door chain.",
    },
    {
      id: "changes-heading",
      type: "heading",
      level: 2,
      text: "Choose a different Chengdu–Chongqing pair when…",
    },
    {
      id: "answer-changes",
      type: "list",
      ordered: false,
      items: [
        "12306 changes the live station pair or inventory.",
        "The Chengdu or Chongqing hotel branch changes.",
        "A station entrance, square or local-transport operation changes.",
        "Luggage, mobility or a late arrival makes a transfer fragile.",
        "A separate-ticket deadline becomes more important than line-haul speed.",
      ],
    },
    {
      id: "checklist-heading",
      type: "heading",
      level: 2,
      text: "Two-city station-pair check before travel",
    },
    {
      id: "final-checklist",
      type: "list",
      ordered: false,
      items: [
        "Search the exact date and retain both station suffixes with the train number.",
        "Pin the Chengdu entrance, Chongqing exit and hotel vehicle stop separately.",
        "Confirm the Chongqing branch's reception time and road-side access.",
        "Review the active order in 12306 rather than relying on corridor frequency.",
        "Recalculate lifts, gradients and bags for the actual travellers.",
        "Set a no-cross-city point before the Chengdu boarding margin is consumed.",
        "In release week, rerun the pair; if either city transfer fails, select another live pairing or move the arrival night.",
      ],
    },
    {
      id: "faq-heading",
      type: "heading",
      level: 2,
      text: "Frequently asked questions",
    },
    {
      id: "faq-1-question",
      type: "heading",
      level: 3,
      text: "Is Chengdu East to Chongqing North always best?",
    },
    {
      id: "faq-1-answer",
      type: "paragraph",
      text: "No. It is a common pair, but the live service and both exact addresses can make another pair better.",
    },
    {
      id: "faq-2-question",
      type: "heading",
      level: 3,
      text: "Should I choose the shortest train time?",
    },
    {
      id: "faq-2-answer",
      type: "paragraph",
      text: "Compare checkout-to-lobby time, changes, luggage and recoverability. The shortest train can create the longest total journey.",
    },
    {
      id: "faq-3-question",
      type: "heading",
      level: 3,
      text: "Does this page work in the reverse direction?",
    },
    {
      id: "faq-3-answer",
      type: "paragraph",
      text: "Yes. Reverse both address chains, then verify the real ticket pair for that travel date and direction.",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue after locking the corridor station pair",
      items: [
        {
          label: "Decide whether all three cities fit",
          href: "/guides/chengdu-chongqing-zhangjiajie-route-order/",
          description:
            "Set the city order, night allocation and which stop to remove before choosing this rail leg.",
        },
        {
          label: "Plan the Chengdu side",
          href: "/destinations/chengdu/",
          description: "Place the station inside the complete city stay.",
        },
        {
          label: "Continue from Chongqing to Zhangjiajie",
          href: "/guides/chongqing-zhangjiajie-transport-route/",
          description:
            "Build the next hotel-to-hotel rail leg after the Chengdu–Chongqing pair is settled.",
        },
        {
          label: "Plan the Chongqing side",
          href: "/destinations/chongqing/",
          description:
            "Match the arrival to the real district and vertical-city route.",
        },
        {
          label: "Understand Chongqing railway stations",
          href: "/guides/chongqing-railway-station-selector/",
          description:
            "Compare Chongqing's stations when the station name or location is unclear.",
        },
        {
          label: "Read Chongqing's upper/lower-city orientation",
          href: "/guides/chongqing-upper-lower-city-orientation/",
          description:
            "The final kilometre can include real vertical movement.",
        },
        {
          label: "Prepare for a first China high-speed train",
          href: "/guides/china-high-speed-train-first-time-guide/",
          description:
            "Check the national booking, station-entry and boarding procedure.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources and image credit",
      items: [
        {
          label: "Official live rail search",
          url: "https://www.12306.cn/en/index.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-09-01",
        },
        {
          label:
            "Temporary Chengdu East–Chongqing North additions, 28–30 August 2026 (notice covers 26 August–30 September 2026)",
          url: "https://www.12306.cn/mormhweb/zxdt_news/202608/t20260825_46254.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-09-01",
        },
        {
          label:
            "Temporary Chengdu and Chongqing services, 11 July–14 August 2026",
          url: "https://www.12306.cn/mormhweb/zxdt_news/202607/t20260710_46062.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-09-01",
        },
        {
          label: "Chongqing timetable adjustment from 26 January 2026",
          url: "https://www.cq.gov.cn/ywdt/jrcq/202601/t20260122_15343341.html",
          publisher: "Chongqing Municipal Government",
          reviewedAt: "2026-09-01",
        },
        {
          label: "Hero: Chengdu East Railway Station",
          url: "https://commons.wikimedia.org/wiki/File%3AChengdu_East_Railway_Station.JPG",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-09-01",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
