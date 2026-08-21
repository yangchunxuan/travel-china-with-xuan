import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "A Chengdu–Chongqing ticket is not just a fast line between two cities. It is a pair of exact Chinese station names joined to two hotel doors. Search the real date in 12306 first, then compare hotel-to-station access, the rail segment, exit and the final Chongqing vertical-city transfer. After purchase, the printed pair controls in either direction."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "The right pair beats the fastest rail segment",
      "tone": "decision",
      "body": "Chengdu East and Chongqing North are common search anchors, but they are not a permanent universal answer. Chengdu South or West, Chongqing West, Shapingba or the operational Chongqing East may produce the stronger door-to-door chain on a particular date. Let live inventory and both addresses decide; never infer a station from the city name."
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "What this page owns",
      "tone": "neutral",
      "body": "This page owns the bidirectional Chengdu–Chongqing station-pair and hotel-to-hotel handoff. It does not redefine each Chongqing station, repeat national ticket buying, decide either city's hotel district, freeze trains or create reverse-direction pages."
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "Screenshot the live Chengdu–Chongqing pair printed by 12306 for offline use; never replace it with a map shorthand.",
        "Write the first door as the Chengdu hotel door and exact departure entrance and the last door as the Chongqing exit/square and final vertical-city hotel door.",
        "Mark the hard cutoff—station entry, hotel reception and the next separate booking—and the latest safe abandonment point.",
        "Count two station choices, Chongqing gradients and cases segment by segment instead of copying the main-leg duration.",
        "Save a current verification path through 12306 plus staff at the two printed stations, plus change the station pair before crossing either city or protect the arrival night if it fails."
      ]
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "Compare the complete trip, not the city label"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "The live ticket and exact destination overrule every shortcut",
      "columns": [
        "Node or chain",
        "When it enters the shortlist",
        "Question that decides it",
        "Mistake to prevent"
      ],
      "rows": [
        [
          "Chengdu East ↔ Chongqing North",
          "The live train uses this pair and both hotel-side transfers remain straightforward.",
          "Which Chongqing North square/entrance and final hotel branch are actually needed?",
          "Do not book from reputation alone; another live pair may remove a cross-city transfer."
        ],
        [
          "Chengdu East, South or West ↔ Chongqing West",
          "A real service and south/west-side address make the complete chain better.",
          "Does the saved city time exceed the extra rail time and transfer risk?",
          "Do not assume the word West means near every western attraction or hotel."
        ],
        [
          "Other live pairs: Shapingba or Chongqing East",
          "12306 sells the exact date and the named station meaningfully improves the final address chain.",
          "Is the station currently serving this train and can the traveller reach the exact entrance?",
          "Do not treat a newly opened or discussed station as serving every corridor train."
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "Do not turn today's operating pattern into a permanent rule",
      "tone": "warning",
      "body": "Chengdu and Chongqing train patterns now include evolving major nodes, including Chongqing East. Search the exact date; do not preserve one fastest pair, assume every train calls at a new station, or create a reverse-direction mirror."
    },
    {
      "id": "scenarios-heading",
      "type": "heading",
      "level": 2,
      "text": "Three journeys that produce different answers"
    },
    {
      "id": "scenario-table",
      "type": "table",
      "caption": "Start at the traveller's real first and last doors",
      "columns": [
        "Traveller chain",
        "Working method",
        "Failure to protect against"
      ],
      "rows": [
        [
          "Central Chengdu hotel to Jiefangbei",
          "Compare checkout-to-platform and Chongqing exit-to-lobby, including the correct square, gradients and luggage. A slightly slower train may win by avoiding one long city transfer.",
          "The fastest train arrives at the wrong side of Chongqing for the hotel and a timed evening booking."
        ],
        [
          "Family with luggage going west or south",
          "Count taxi legality, lift availability, station walking and one fewer transfer. Do not turn a short rail segment into a staircase relay.",
          "A cheap pair creates two difficult changes and separates the group in a large station."
        ],
        [
          "Late arrival with a separate evening booking",
          "Verify the current local-transport window, hotel reception and abandonment point. Protect a staffed night before relying on the last unprotected handoff.",
          "A minor train delay removes the planned final metro or check-in window."
        ]
      ]
    },
    {
      "id": "chain-heading",
      "type": "heading",
      "level": 2,
      "text": "Build the door-to-door chain"
    },
    {
      "id": "door-to-door-chain",
      "type": "comparison",
      "title": "the live Chengdu–Chongqing pair printed by 12306 is only the middle of the journey",
      "columns": [
        {
          "heading": "Leave from the Chengdu hotel door and exact departure entrance",
          "items": [
            "Confirm checkout or arrival before navigating away from the Chengdu hotel door and exact departure entrance.",
            "Move two station choices, Chongqing gradients and cases through a legal, signed access path.",
            "Reach the printed node early enough to protect station entry, hotel reception and the next separate booking."
          ]
        },
        {
          "heading": "Read the live Chengdu–Chongqing pair printed by 12306 literally",
          "items": [
            "Save the live Chengdu–Chongqing pair printed by 12306 with the live order status.",
            "Ask 12306 plus staff at the two printed stations about a live exception, not a remembered pattern.",
            "Never replace the active record with a city-level map pin."
          ]
        },
        {
          "heading": "Finish at the Chongqing exit/square and final vertical-city hotel door",
          "items": [
            "Use the current signed exit, legal pickup or verified local connection.",
            "Confirm that the Chongqing exit/square and final vertical-city hotel door is still reachable with the bags and remaining margin.",
            "If that handoff fails, use change the station pair before crossing either city or protect the arrival night instead of improvising."
          ]
        }
      ]
    },
    {
      "id": "late-heading",
      "type": "heading",
      "level": 2,
      "text": "Luggage, late arrival and mobility can reverse the choice"
    },
    {
      "id": "late-table",
      "type": "table",
      "caption": "Protect the weakest handoff, not the shortest line on a map",
      "columns": [
        "Constraint",
        "Safer working plan",
        "Do not assume"
      ],
      "rows": [
        [
          "two station choices, Chongqing gradients and cases",
          "Count every queue, lift, vehicle change and final walk between the Chengdu hotel door and exact departure entrance and the Chongqing exit/square and final vertical-city hotel door; prefer fewer uncertain handoffs.",
          "A transport icon proves the Chongqing exit/square and final vertical-city hotel door is step-free."
        ],
        [
          "Arrival threatens station entry, hotel reception and the next separate booking",
          "Notify the destination, consult 12306 plus staff at the two printed stations, and switch to change the station pair before crossing either city or protect the arrival night when the final handoff cannot be verified.",
          "A daytime connection to the Chongqing exit/square and final vertical-city hotel door remains available after a delay."
        ],
        [
          "A separate booking after the Chongqing exit/square and final vertical-city hotel door",
          "Add the exact exit, local handoff and processing time before station entry, hotel reception and the next separate booking; change the booking when that margin is weak.",
          "One itinerary document makes the next operator protect the live Chengdu–Chongqing pair printed by 12306."
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "Wrong node: recover in this order"
    },
    {
      "id": "recovery-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Stop moving and reopen the live Chengdu–Chongqing pair printed by 12306; compare it character by character with the sign in front of you.",
        "Ask 12306 plus staff at the two printed stations whether the error concerns an entrance, a local branch or an entirely different node.",
        "Before paying to cross the area, check the live change, refund or rebooking path tied to the live Chengdu–Chongqing pair printed by 12306; promise no outcome.",
        "If a transfer is still defensible, navigate to the Chongqing exit/square and final vertical-city hotel door and compare verified arrival with station entry, hotel reception and the next separate booking.",
        "Tell the destination exactly what happened to the Chengdu hotel door and exact departure entrance, the node you will now reach, and which booking must change.",
        "When the margin is gone, keep the group and luggage together and use change the station pair before crossing either city or protect the arrival night with staffed help."
      ]
    },
    {
      "id": "changes-heading",
      "type": "heading",
      "level": 2,
      "text": "The answer changes when…"
    },
    {
      "id": "answer-changes",
      "type": "list",
      "ordered": false,
      "items": [
        "12306 changes the live station pair or inventory.",
        "The Chengdu or Chongqing hotel branch changes.",
        "A station entrance, square or local-transport operation changes.",
        "Luggage, mobility or a late arrival makes a transfer fragile.",
        "A separate-ticket deadline becomes more important than line-haul speed."
      ]
    },
    {
      "id": "checklist-heading",
      "type": "heading",
      "level": 2,
      "text": "Final booking and release-day checklist"
    },
    {
      "id": "final-checklist",
      "type": "list",
      "ordered": false,
      "items": [
        "Re-search the live Chengdu–Chongqing pair printed by 12306 for the traveller's real date.",
        "Save the exact Chinese names needed between the Chengdu hotel door and exact departure entrance and the Chongqing exit/square and final vertical-city hotel door.",
        "Record the contact and operating window for the Chongqing exit/square and final vertical-city hotel door.",
        "Confirm current legal access through 12306 plus staff at the two printed stations.",
        "Recount two station choices, Chongqing gradients and cases for this group, not an average traveller.",
        "Write the abandonment point before station entry, hotel reception and the next separate booking.",
        "Reopen the official sources in release week; if the chain fails, replace it with change the station pair before crossing either city or protect the arrival night."
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "Frequently asked questions"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "Is Chengdu East to Chongqing North always best?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "No. It is a common pair, but the live service and both exact addresses can make another pair better."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "Should I choose the shortest train time?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "Compare checkout-to-lobby time, changes, luggage and recoverability. The shortest train can create the longest total journey."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "Does this page work in the reverse direction?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "Yes. The canonical is bidirectional: reverse both address chains, then verify the real ticket pair."
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "What if I reach the wrong Chongqing station?"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "Read the active ticket, confirm the exact error with staff, check change or refund options before a long transfer, and notify the hotel or next booking."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue the correct part of the plan",
      "items": [
        {
          "label": "Plan the Chengdu side",
          "href": "/destinations/chengdu/",
          "description": "Place the station inside the complete city stay."
        },
        {
          "label": "Plan the Chongqing side",
          "href": "/destinations/chongqing/",
          "description": "Match the arrival to the real district and vertical-city route."
        },
        {
          "label": "Understand Chongqing railway stations",
          "href": "/guides/chongqing-railway-station-selector/",
          "description": "Use the node owner when the station identity itself is unclear."
        },
        {
          "label": "Read Chongqing's upper/lower-city orientation",
          "href": "/guides/chongqing-upper-lower-city-orientation/",
          "description": "The final kilometre can include real vertical movement."
        },
        {
          "label": "Prepare for a first China high-speed train",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "Keep national booking and boarding mechanics with their owner."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources and image credit",
      "items": [
        {
          "label": "Official live rail search",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2026 Chengdu station operation notice",
          "url": "https://www.12306.cn/mormhweb/zxdt_news/202606/t20260615_45967.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Chengdu–Chongqing rail-corridor context",
          "url": "https://www.sc.gov.cn/10462/10464/10465/10595/2025/1/15/ca1e3502e04f4e3d9f072d46e471a05b.shtml",
          "publisher": "Sichuan Provincial Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Chongqing East station current context",
          "url": "https://www.cq.gov.cn/ywdt/jrcq/202606/t20260626_15778151.html",
          "publisher": "Chongqing Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Chongqing rail and local-handoff context",
          "url": "https://jtysw.cq.gov.cn/sy_240/bmdt/202602/t20260224_15449936.html",
          "publisher": "Chongqing Transport Bureau",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Hero: Chengdu East Railway Station",
          "url": "https://commons.wikimedia.org/wiki/File%3AChengdu_East_Railway_Station.JPG",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
