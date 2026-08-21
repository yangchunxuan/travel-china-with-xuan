import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "Start with the exact hotel base, not the word Zhangjiajie. Downtown/Yongding and Wulingyuan are different final doors; the national-rail station is only an arrival node. Search the real date in 12306, read the full Chinese names at both ends, then add station exit, current road transport, luggage and hotel reception."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "Choose the base before judging the train",
      "tone": "decision",
      "body": "A live Changsha or Changsha South departure to Zhangjiajie West can work well, but it does not deposit every traveller at the park. Downtown/Tianmen travellers and Wulingyuan/Forest Park travellers need different last legs. Do not route via an announced or under-construction station; the sellable 12306 record controls."
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "The Changsha-to-Zhangjiajie handoff this route owns",
      "tone": "neutral",
      "body": "This page owns the bidirectional Changsha–Zhangjiajie corridor, exact rail nodes and handoff to an already chosen base. It does not choose downtown versus Wulingyuan, select a Forest Park gate, repeat park tickets/routes or freeze trains and tourist coaches."
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "Screenshot the exact Changsha/Changsha South–Zhangjiajie West live train for offline use; never replace it with a map shorthand.",
        "Write the first door as the Changsha hotel and printed departure station and the last door as the selected downtown/Yongding or Wulingyuan property.",
        "Mark the hard cutoff—station entry, hotel reception and any timed park gate—and the latest safe abandonment point.",
        "Count large cases, mountain weather and the road after Zhangjiajie West segment by segment instead of copying the main-leg duration.",
        "Save a current verification path through 12306, Hunan transport notices and the exact Zhangjiajie hotel, plus a staffed Zhangjiajie downtown night or a moved park booking if it fails."
      ]
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "Choose the Changsha origin and Zhangjiajie arrival together"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "The printed Hunan stations must support the selected first-night base",
      "columns": [
        "Hunan route option",
        "When this chain works",
        "First-night test",
        "Route assumption to prevent"
      ],
      "rows": [
        [
          "Live Changsha or Changsha South departure",
          "12306 sells the exact service and the hotel-to-station leg is defensible.",
          "Which full Chinese station name is on the ticket, and can all luggage reach its entrance?",
          "Do not substitute Changsha South for Changsha or assume a future Changsha West service."
        ],
        [
          "Zhangjiajie West → downtown/Yongding",
          "The chosen hotel, Tianmen plan or next transport is downtown-side.",
          "Which legal exit-to-hotel route remains available at the real arrival hour?",
          "Do not continue automatically to Wulingyuan because Zhangjiajie is known for the park."
        ],
        [
          "Zhangjiajie West → Wulingyuan/park-side hotel",
          "The base owner has already selected Wulingyuan or a named park-side property.",
          "Does a current legal transfer reach the exact hotel before reception and the next booked park task?",
          "Do not call a station–Wulingyuan journey a direct park entrance transfer."
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "Changsha and Zhangjiajie stopping patterns require a live search",
      "tone": "warning",
      "body": "Only sellable 12306 origins count; an announced or construction-stage Changsha node does not. Zhangjiajie West is a rail station, not a park gate, and the final road transfer must be rechecked for season, weather and the chosen base."
    },
    {
      "id": "scenarios-heading",
      "type": "heading",
      "level": 2,
      "text": "Airport arrivals, South-station starts and park nights split the route"
    },
    {
      "id": "scenario-table",
      "type": "table",
      "caption": "Measure from the Changsha origin to the downtown or Wulingyuan bed",
      "columns": [
        "Hunan travel day",
        "How to assemble the route",
        "Arrival-base failure to avoid"
      ],
      "rows": [
        [
          "Changsha hotel to a downtown Zhangjiajie first night",
          "Choose the sellable origin, preserve station-entry time, then connect Zhangjiajie West to the exact downtown branch and reception. Keep Tianmen tickets with their owner.",
          "The traveller follows a park-bound transfer and ends far from the booked downtown hotel."
        ],
        [
          "Changsha to Wulingyuan with large cases",
          "Compare one legal road handoff after Zhangjiajie West with multi-change public transport, including loading, queues, weather and the final hotel entrance.",
          "The apparent cheap option strands luggage at an interchange after the useful connection window."
        ],
        [
          "Same-day arrival and timed park booking",
          "Treat this as a fragile separate-booking chain. Add train delay, exit, road handoff, hotel baggage and gate processing; move the park task when the margin is not robust.",
          "A small railway delay causes a missed gate window that the train ticket does not protect."
        ]
      ]
    },
    {
      "id": "chain-heading",
      "type": "heading",
      "level": 2,
      "text": "Connect the Changsha departure to Zhangjiajie West and the first bed"
    },
    {
      "id": "door-to-door-chain",
      "type": "comparison",
      "title": "the exact Changsha/Changsha South–Zhangjiajie West live train is only the middle of the journey",
      "columns": [
        {
          "heading": "Leave from the Changsha hotel and printed departure station",
          "items": [
            "Confirm checkout or arrival before navigating away from the Changsha hotel and printed departure station.",
            "Move large cases, mountain weather and the road after Zhangjiajie West through a legal, signed access path.",
            "Reach the printed node early enough to protect station entry, hotel reception and any timed park gate."
          ]
        },
        {
          "heading": "Read the exact Changsha/Changsha South–Zhangjiajie West live train literally",
          "items": [
            "Save the exact Changsha/Changsha South–Zhangjiajie West live train with the live order status.",
            "Ask 12306, Hunan transport notices and the exact Zhangjiajie hotel about a live exception, not a remembered pattern.",
            "Retain 长沙 or 长沙南 and 张家界西 in the live record; Hunan city pins hide the transfers that consume the day."
          ]
        },
        {
          "heading": "Finish at the selected downtown/Yongding or Wulingyuan property",
          "items": [
            "Leave Zhangjiajie West through the exit agreed with the hotel and use the verified downtown or Wulingyuan transfer.",
            "Confirm that the selected downtown/Yongding or Wulingyuan property is still reachable with the bags and remaining margin.",
            "If that handoff fails, use a staffed Zhangjiajie downtown night or a moved park booking instead of improvising."
          ]
        }
      ]
    },
    {
      "id": "late-heading",
      "type": "heading",
      "level": 2,
      "text": "A late train and park-bound cases can move the first night downtown"
    },
    {
      "id": "late-table",
      "type": "table",
      "caption": "Protect the Zhangjiajie West-to-bed handoff before choosing speed",
      "columns": [
        "Route-day constraint",
        "Safer Hunan handoff",
        "Park-side shortcut to reject"
      ],
      "rows": [
        [
          "large cases, mountain weather and the road after Zhangjiajie West",
          "Count every queue, lift, vehicle change and final walk between the Changsha hotel and printed departure station and the selected downtown/Yongding or Wulingyuan property; prefer fewer uncertain handoffs.",
          "A transport icon proves the selected downtown/Yongding or Wulingyuan property is step-free."
        ],
        [
          "Arrival threatens station entry, hotel reception and any timed park gate",
          "Notify the destination, consult 12306, Hunan transport notices and the exact Zhangjiajie hotel, and switch to a staffed Zhangjiajie downtown night or a moved park booking when the final handoff cannot be verified.",
          "A daytime connection to the selected downtown/Yongding or Wulingyuan property remains available after a delay."
        ],
        [
          "A separate booking after the selected downtown/Yongding or Wulingyuan property",
          "Add the exact exit, local handoff and processing time before station entry, hotel reception and any timed park gate; change the booking when that margin is weak.",
          "One itinerary document makes the next operator protect the exact Changsha/Changsha South–Zhangjiajie West live train."
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "At the wrong Hunan station: save the Zhangjiajie arrival night"
    },
    {
      "id": "recovery-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Stop moving and reopen the exact Changsha/Changsha South–Zhangjiajie West live train; compare it character by character with the sign in front of you.",
        "Ask 12306, Hunan transport notices and the exact Zhangjiajie hotel whether the error concerns an entrance, a local branch or an entirely different node.",
        "Before paying to cross the area, check the live change, refund or rebooking path tied to the exact Changsha/Changsha South–Zhangjiajie West live train; promise no outcome.",
        "If a transfer is still defensible, navigate to the selected downtown/Yongding or Wulingyuan property and compare verified arrival with station entry, hotel reception and any timed park gate.",
        "Tell the destination exactly what happened to the Changsha hotel and printed departure station, the node you will now reach, and which booking must change.",
        "When the margin is gone, keep the group and luggage together and use a staffed Zhangjiajie downtown night or a moved park booking with staffed help."
      ]
    },
    {
      "id": "changes-heading",
      "type": "heading",
      "level": 2,
      "text": "Rebuild the Changsha–Zhangjiajie chain when…"
    },
    {
      "id": "answer-changes",
      "type": "list",
      "ordered": false,
      "items": [
        "12306 changes the available Changsha origin or Zhangjiajie service.",
        "The traveller changes between downtown and Wulingyuan base.",
        "Local road, coach, weather or pickup operation changes.",
        "A timed park ticket becomes a hard separate-booking deadline.",
        "Luggage or late arrival removes a multi-change option."
      ]
    },
    {
      "id": "checklist-heading",
      "type": "heading",
      "level": 2,
      "text": "Changsha origin and Zhangjiajie base check"
    },
    {
      "id": "final-checklist",
      "type": "list",
      "ordered": false,
      "items": [
        "Re-search the exact Changsha/Changsha South–Zhangjiajie West live train for the traveller's real date.",
        "Save the exact Chinese names needed between the Changsha hotel and printed departure station and the selected downtown/Yongding or Wulingyuan property.",
        "Record the contact and operating window for the selected downtown/Yongding or Wulingyuan property.",
        "Confirm current legal access through 12306, Hunan transport notices and the exact Zhangjiajie hotel.",
        "Recount large cases, mountain weather and the road after Zhangjiajie West for this group, not an average traveller.",
        "Write the abandonment point before station entry, hotel reception and any timed park gate.",
        "Reopen the official sources in release week; if the chain fails, replace it with a staffed Zhangjiajie downtown night or a moved park booking."
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
      "text": "Which Changsha station goes to Zhangjiajie?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "Search the real date in 12306. Do not replace the printed Changsha or Changsha South name, and do not assume an announced future station is active."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "Is Zhangjiajie West inside the national park?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "No. It is a rail arrival node. Downtown and Wulingyuan/park-side hotels require different onward road chains."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "Should I stay downtown or Wulingyuan?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "Use the existing base-choice owner. This page starts after that decision and executes the arrival handoff."
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "Can I visit the park on arrival day?"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "Only if the complete verified chain leaves a robust margin. A separate park booking is not protected by the train."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue after fixing the Hunan handoff",
      "items": [
        {
          "label": "Start with the Zhangjiajie city guide",
          "href": "/destinations/zhangjiajie/",
          "description": "Place the corridor inside the full stay."
        },
        {
          "label": "Choose downtown or Wulingyuan",
          "href": "/guides/zhangjiajie-city-or-wulingyuan-hotel-base/",
          "description": "Let the base owner define the final door."
        },
        {
          "label": "Choose the correct Forest Park entrance",
          "href": "/guides/zhangjiajie-national-forest-park-tickets-and-entrances/",
          "description": "Keep gate and in-park execution separate from the city corridor."
        },
        {
          "label": "Compare night and daytime rail",
          "href": "/guides/china-night-train-or-daytime-high-speed-rail/",
          "description": "Use the mode owner before selecting the live corridor service."
        },
        {
          "label": "Prepare for a first China train",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "Keep booking and boarding mechanics with the national owner."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources and image credit",
      "items": [
        {
          "label": "Official live railway search",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Zhangjiajie West passenger context",
          "url": "https://jtt.hunan.gov.cn/jtt/xxgk/gzdt/szdt1/202602/t20260227_33922205.html",
          "publisher": "Hunan Department of Transport",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Dated Changsha South–Zhangjiajie West example",
          "url": "https://jtt.hunan.gov.cn/xxgk/gzdt/szdt1/202501/t20250108_33557644.html",
          "publisher": "Hunan Department of Transport",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2026 Hunan holiday transport evidence",
          "url": "https://jtt.hunan.gov.cn/jtt/jjzdgz/2026cyzl/cyjb2026/202603/t20260325_33940867.html",
          "publisher": "Hunan Department of Transport",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Official park-side information entry",
          "url": "https://www.zjjpark.com/",
          "publisher": "Zhangjiajie National Forest Park",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Hero: Changsha South Railway Station",
          "url": "https://commons.wikimedia.org/wiki/File%3AChangsha_South_Railway_Station.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
