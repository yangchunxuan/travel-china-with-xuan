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
        "Export the dated order with 长沙 or 长沙南 and 张家界西 visible; keep it separate from announcements about future stations.",
        "Identify the Changsha hotel pickup, the correct departure forecourt and the precise downtown or Wulingyuan property receiving the traveller.",
        "Set the rail-entry limit first, then compare it with reception and any timed park gate to find the day's true hard stop.",
        "Budget for heavy cases, weather on the western-Hunan road and the post–Zhangjiajie West vehicle leg outside the timetable.",
        "Reconfirm the dated train and hotel pickup; if the park-side drive is no longer defensible, arrange a staffed downtown night and move the park booking."
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
      "title": "The Hunan rail leg ends before the Zhangjiajie base begins",
      "columns": [
        {
          "heading": "Leave from the Changsha hotel and printed departure station",
          "items": [
        "Have the Changsha hotel confirm whether the vehicle should serve 长沙 or 长沙南 and which entrance is practical with luggage.",
        "Build ordinary station-entry time around the actual departure, then reserve the remaining daylight for western Hunan's road leg.",
        "Do not make a same-day park gate the reason to compress the Changsha checkout or rail boarding margin."
          ]
        },
        {
          "heading": "Read the exact Changsha/Changsha South–Zhangjiajie West live train literally",
          "items": [
            "Keep 长沙 or 长沙南, 张家界西 and the train number visible in the dated order.",
            "Use 12306 to verify the train, Hunan notices for current transport conditions and the property for its own pickup; each answers a different question.",
            "Retain 长沙 or 长沙南 and 张家界西 in the live record; Hunan city pins hide the transfers that consume the day."
          ]
        },
        {
          "heading": "Finish at the selected downtown/Yongding or Wulingyuan property",
          "items": [
            "Leave Zhangjiajie West through the exit agreed with the hotel and use the verified downtown or Wulingyuan transfer.",
        "At West station, ask whether the promised vehicle still reaches the named downtown or Wulingyuan branch before reception closes.",
        "If weather or delay breaks the park-side drive, secure an attended Yongding room and move the park booking rather than forcing the road."
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
        "A large-case group should compare the Changsha pickup, station concourse, West-station loading and property approach as four physical movements.",
        "A hotel marker near the park does not show steps from the road or whether a late driver can reach reception."
        ],
        [
          "Arrival threatens station entry, hotel reception and any timed park gate",
        "Send the revised train arrival to the Zhangjiajie property while still on the rail side. Without a confirmed pickup and reception, shift the first night downtown.",
        "A park-bound vehicle offered in daylight should not be assumed to run after the final train or during mountain-weather disruption."
        ],
        [
          "A separate booking after the selected downtown/Yongding or Wulingyuan property",
        "Place any timed attraction on the following day unless the rail arrival, West-station pickup, hotel check-in and rest all have independent slack.",
        "A park ticket does not compel the railway, driver or property to absorb a late Changsha departure."
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
        "Read 长沙 or 长沙南 from the active order and ask Changsha railway staff whether the group is at that station or only at a wrong entrance.",
        "Check what the live order permits before buying a cross-city ride between Changsha stations.",
        "Tell the Zhangjiajie hotel the train that will actually arrive at West and ask whether its pickup still operates.",
        "If normal rail entry can survive the transfer, navigate to the specified entrance; otherwise use the change offered by railway staff.",
        "Cancel or move a timed park gate as soon as the first-night transfer no longer leaves sleep and check-in time.",
        "When no verified park-side arrival remains, keep the party at a staffed Zhangjiajie downtown property and begin the mountain journey next morning."
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
        "Query the real date from the precise Changsha station to 张家界西.",
        "Save the Changsha entrance and full Zhangjiajie property branch in Chinese.",
        "Obtain a current reception and pickup window from that property.",
        "Review Hunan notices for the road beyond West station.",
        "Adjust the transfer for cases, forecast and the chosen first-night base.",
        "Decide when a Wulingyuan arrival must become a downtown night.",
        "Before publication, retest train and pickup together and move any park gate that no longer has a safe night before it."
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
