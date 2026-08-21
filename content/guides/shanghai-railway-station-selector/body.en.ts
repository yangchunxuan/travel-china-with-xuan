import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "Shanghai, Shanghai Hongqiao, Shanghai South and Shanghai Songjiang are four different major passenger stations. The issued Chinese station name is fixed. Before booking, compare live trains and the complete chain to the actual hotel, SHA/PVG flight or next city—not an old rule about which direction uses which station."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "Hongqiao is useful for some chains, not the default for Shanghai",
      "tone": "decision",
      "body": "Hongqiao's rail–airport complex can reduce a real SHA connection; Shanghai Station can serve central districts; South can suit southern Xuhui-side tasks; Songjiang can change a southwest or regional chain. The official Shanghai guide treats all four as major stations, but the actual dated train and final door decide."
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "What this page owns",
      "tone": "neutral",
      "body": "This page owns the four-station decision, Hongqiao rail–airport handoff boundary and wrong-station recovery. It does not compare PVG and SHA, repeat the Shanghai–Hangzhou corridor, choose a hotel area or publish per-station and direction pages."
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "Screenshot the printed 上海 / 上海虹桥 / 上海南 / 上海松江 station for offline use; never replace it with a map shorthand.",
        "Write the first door as the Shanghai hotel, PVG/SHA flight or suburban address and the last door as the correct station entrance and the next airport, hotel or city.",
        "Mark the hard cutoff—rail security plus an airport or separate-ticket cutoff—and the latest safe abandonment point.",
        "Count Hongqiao's integrated hub, central-city transfers and Songjiang distance segment by segment instead of copying the main-leg duration.",
        "Save a current verification path through 12306, Shanghai Railway and current Shanghai transport notices, plus change the ticket before a cross-city run or protect an airport/station-side night if it fails."
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
          "Shanghai Railway Station / 上海站",
          "A live train and a central Jing'an or nearby hotel chain make it the practical node.",
          "Does the central transfer outweigh a materially better train elsewhere?",
          "上海站 means one station, not any station in Shanghai."
        ],
        [
          "Shanghai Hongqiao / 上海虹桥站",
          "The live train is strong, a west-side hotel fits, or a verified SHA connection benefits from the integrated hub.",
          "Is the traveller connecting to the railway station or airport terminal, and is the terminal/deadline verified?",
          "Hongqiao Railway Station and Hongqiao Airport are connected but not the same check-in point."
        ],
        [
          "Shanghai South / 上海南站",
          "The actual train uses South and a Xuhui/southern-city or regional onward chain works.",
          "Does its southern position reduce the real last mile without sacrificing the train?",
          "South is not the south entrance of Shanghai Station."
        ],
        [
          "Shanghai Songjiang / 上海松江站",
          "A live train uses Songjiang and a southwest hotel, attraction or regional chain benefits.",
          "Is the traveller actually going to Songjiang or merely choosing it because the train is fast?",
          "A major new station is not automatically convenient for the Bund or central hotel."
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "Do not turn today's operating pattern into a permanent rule",
      "tone": "warning",
      "body": "Shanghai and Shanghai Songjiang are not interchangeable, and Hongqiao's rail–airport convenience depends on the real terminal and time. Reopen 12306 and Shanghai operator notices before release; do not freeze station-by-direction rules or airport-line hours."
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
          "Rail to a Hongqiao flight",
          "Confirm SHA, terminal, airline deadline and the actual train station. Add rail exit, walking/transfer, airport security and disruption buffer; do not treat the shared place name as a protected connection.",
          "The traveller reaches Hongqiao rail on time but misses an airport-terminal deadline."
        ],
        [
          "Late train to a central hotel",
          "Compare the real train with current after-hours local transport, hotel branch and reception. A central Shanghai Station arrival can reduce risk; a late Hongqiao/South/Songjiang arrival needs a verified road fallback.",
          "A metro route used in planning has stopped, leaving luggage and an unstaffed final walk."
        ],
        [
          "Regional train and a southwest Shanghai task",
          "Songjiang or South enters the shortlist only when the train and exact southwest door benefit together. Keep Shanghai–Hangzhou station-pair execution in its existing owner.",
          "A faster line-haul leaves the traveller far from the hotel or next departure."
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
      "title": "the printed 上海 / 上海虹桥 / 上海南 / 上海松江 station is only the middle of the journey",
      "columns": [
        {
          "heading": "Leave from the Shanghai hotel, PVG/SHA flight or suburban address",
          "items": [
            "Confirm checkout or arrival before navigating away from the Shanghai hotel, PVG/SHA flight or suburban address.",
            "Move Hongqiao's integrated hub, central-city transfers and Songjiang distance through a legal, signed access path.",
            "Reach the printed node early enough to protect rail security plus an airport or separate-ticket cutoff."
          ]
        },
        {
          "heading": "Read the printed 上海 / 上海虹桥 / 上海南 / 上海松江 station literally",
          "items": [
            "Save the printed 上海 / 上海虹桥 / 上海南 / 上海松江 station with the live order status.",
            "Ask 12306, Shanghai Railway and current Shanghai transport notices about a live exception, not a remembered pattern.",
            "Never replace the active record with a city-level map pin."
          ]
        },
        {
          "heading": "Finish at the correct station entrance and the next airport, hotel or city",
          "items": [
            "Use the current signed exit, legal pickup or verified local connection.",
            "Confirm that the correct station entrance and the next airport, hotel or city is still reachable with the bags and remaining margin.",
            "If that handoff fails, use change the ticket before a cross-city run or protect an airport/station-side night instead of improvising."
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
          "Hongqiao's integrated hub, central-city transfers and Songjiang distance",
          "Count every queue, lift, vehicle change and final walk between the Shanghai hotel, PVG/SHA flight or suburban address and the correct station entrance and the next airport, hotel or city; prefer fewer uncertain handoffs.",
          "A transport icon proves the correct station entrance and the next airport, hotel or city is step-free."
        ],
        [
          "Arrival threatens rail security plus an airport or separate-ticket cutoff",
          "Notify the destination, consult 12306, Shanghai Railway and current Shanghai transport notices, and switch to change the ticket before a cross-city run or protect an airport/station-side night when the final handoff cannot be verified.",
          "A daytime connection to the correct station entrance and the next airport, hotel or city remains available after a delay."
        ],
        [
          "A separate booking after the correct station entrance and the next airport, hotel or city",
          "Add the exact exit, local handoff and processing time before rail security plus an airport or separate-ticket cutoff; change the booking when that margin is weak.",
          "One itinerary document makes the next operator protect the printed 上海 / 上海虹桥 / 上海南 / 上海松江 station."
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
        "Stop moving and reopen the printed 上海 / 上海虹桥 / 上海南 / 上海松江 station; compare it character by character with the sign in front of you.",
        "Ask 12306, Shanghai Railway and current Shanghai transport notices whether the error concerns an entrance, a local branch or an entirely different node.",
        "Before paying to cross the area, check the live change, refund or rebooking path tied to the printed 上海 / 上海虹桥 / 上海南 / 上海松江 station; promise no outcome.",
        "If a transfer is still defensible, navigate to the correct station entrance and the next airport, hotel or city and compare verified arrival with rail security plus an airport or separate-ticket cutoff.",
        "Tell the destination exactly what happened to the Shanghai hotel, PVG/SHA flight or suburban address, the node you will now reach, and which booking must change.",
        "When the margin is gone, keep the group and luggage together and use change the ticket before a cross-city run or protect an airport/station-side night with staffed help."
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
        "The live train uses another of the four major stations.",
        "The hotel moves between central, west, south or Songjiang-side Shanghai.",
        "A SHA or PVG flight becomes the controlling deadline.",
        "Airport Link, metro, taxi or construction access changes.",
        "Late arrival removes the last verified local connection."
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
        "Re-search the printed 上海 / 上海虹桥 / 上海南 / 上海松江 station for the traveller's real date.",
        "Save the exact Chinese names needed between the Shanghai hotel, PVG/SHA flight or suburban address and the correct station entrance and the next airport, hotel or city.",
        "Record the contact and operating window for the correct station entrance and the next airport, hotel or city.",
        "Confirm current legal access through 12306, Shanghai Railway and current Shanghai transport notices.",
        "Recount Hongqiao's integrated hub, central-city transfers and Songjiang distance for this group, not an average traveller.",
        "Write the abandonment point before rail security plus an airport or separate-ticket cutoff.",
        "Reopen the official sources in release week; if the chain fails, replace it with change the ticket before a cross-city run or protect an airport/station-side night."
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
      "text": "Are Shanghai Station and Hongqiao Station the same?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "No. 上海站 and 上海虹桥站 are separate stations in different parts of the city."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "Is Hongqiao Railway Station inside the airport?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "They form a connected hub, but railway arrival and airport check-in are different processes and points. Confirm the flight terminal and allow transfer, security and airline deadlines."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "Should I use Songjiang for central Shanghai?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "Only if a suitable train and the complete transfer beat the alternatives. A fast train to Songjiang does not erase the southwest-to-centre last mile."
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "What if I go to the wrong Shanghai station?"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "Read the full active ticket, ask railway staff about changes, and compare verified arrival at the correct entrance with boarding time. Rebook when the margin is weak."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue the correct part of the plan",
      "items": [
        {
          "label": "Start with the Shanghai city guide",
          "href": "/destinations/shanghai/",
          "description": "Place the station inside the complete city plan."
        },
        {
          "label": "Choose a Shanghai hotel area",
          "href": "/guides/shanghai-where-to-stay-first-trip/",
          "description": "Let the actual hotel supply the final door."
        },
        {
          "label": "Choose PVG or SHA",
          "href": "/guides/shanghai-pudong-or-hongqiao-airport/",
          "description": "Keep the airport decision separate from the railway-station choice."
        },
        {
          "label": "Travel between Shanghai and Hangzhou",
          "href": "/guides/shanghai-hangzhou-transport-route/",
          "description": "Use the existing bidirectional station-pair owner for that corridor."
        },
        {
          "label": "Use a China train for the first time",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "Continue with passports, station entry and boarding."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources and image credit",
      "items": [
        {
          "label": "Live train and station search",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Official guide to Shanghai railway stations",
          "url": "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2026 evidence for four major railway hubs",
          "url": "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260214/9d1620c5ff0841b881409229fd1ec219.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2026 station-area access inspection",
          "url": "https://www.shanghai.gov.cn/nw31406/20260224/bf18a9f6bfa9420f89b83b44c4a3b043.html",
          "publisher": "Shanghai Transport Commission",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Hero: Shanghai Hongqiao Railway Station platform",
          "url": "https://commons.wikimedia.org/wiki/File%3AShanghai_Hongqiao_Station-20150519-RM-110424.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
