import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "DYG, 张家界站 and 张家界西 are different arrival records. After booking, obey the code or full Chinese station name. Before booking, compare only live flights or trains, then complete the journey to the exact downtown or Wulingyuan hotel and the booked attraction entrance—not merely to a pin labelled Zhangjiajie."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "The base and booked entrance matter after the ticket",
      "tone": "decision",
      "body": "DYG and Zhangjiajie Station sit on the central-city/Tianmen side; Zhangjiajie West is a separate current high-speed node. None is the park entrance and none is automatically Wulingyuan. Use the separate stay owner to choose downtown or Wulingyuan, then use this page to connect the booked node to that exact property."
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "The Zhangjiajie arrival handoff this guide resolves",
      "tone": "neutral",
      "body": "This page owns DYG, central Zhangjiajie Station and Zhangjiajie West identity, their interaction with an already chosen base, late/luggage handling and wrong-node recovery. It does not choose downtown versus Wulingyuan, repeat Forest Park ticket and entrance workflow, or freeze flights, trains, coaches and taxi times."
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "Carry the booked DYG, 张家界站 or 张家界西 record offline, including arrival time and service number; a single Zhangjiajie map result is not enough.",
        "Write the exit where the flight or train ends and the full branch name of the downtown, Yongding or Wulingyuan property that must receive the group.",
        "Rank reception closure, Tianmen admission and Forest Park entry by time; the earliest one becomes the stop-or-replan point.",
        "Add weather-sensitive road time, case loading and the separate drive to each possible base before judging the main transport leg.",
        "Confirm the handoff with the hotel and the live carrier record; if park-side arrival breaks, preserve a staffed downtown room rather than forcing the mountain transfer."
      ]
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "Choose the arrival that serves Zhangjiajie city or Wulingyuan"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "The flight or rail record must match the first Zhangjiajie base",
      "columns": [
        "Zhangjiajie arrival",
        "When it serves the first base",
        "Base-side question",
        "Arrival mix-up to prevent"
      ],
      "rows": [
        [
          "Zhangjiajie Hehua International Airport / 张家界荷花国际机场 / DYG",
          "The actual flight uses DYG and the complete airport-to-property chain works at the landing hour.",
          "After baggage claim, can current authorised transport reach the exact hotel, reception and next booking?",
          "A flight arrival is not arrival at Wulingyuan or a park gate."
        ],
        [
          "Zhangjiajie Railway Station / 张家界站",
          "A live train uses the central station and a downtown, Tianmen or central-coach-area chain benefits.",
          "Does the actual train compensate for its service pattern and the later move to the booked base?",
          "Do not call every Zhangjiajie rail arrival the central station."
        ],
        [
          "Zhangjiajie West Railway Station / 张家界西站",
          "The live high-speed product uses West and the road chain to the actual city or Wulingyuan property is verified.",
          "Which signed pickup, public service or property transfer completes the final leg, especially after dark?",
          "West Station is not Wulingyuan and is not interchangeable with the older central station."
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "Do not freeze Zhangjiajie's live rail and flight pattern",
      "tone": "warning",
      "body": "DYG, Zhangjiajie Station and Zhangjiajie West lead to different first road legs, while tourist transport changes with season, weather and crowd control. Verify the live arrival and hotel-side handoff; never call a rail station a Forest Park entrance."
    },
    {
      "id": "scenarios-heading",
      "type": "heading",
      "level": 2,
      "text": "Park-side, city-side and late arrivals need different handoffs"
    },
    {
      "id": "scenario-table",
      "type": "table",
      "caption": "Start with the booked service and finish at the exact hotel base",
      "columns": [
        "First-night pattern",
        "How to build the arrival",
        "Base handoff to protect"
      ],
      "rows": [
        [
          "Evening DYG arrival to Wulingyuan",
          "Confirm the hotel branch and reception, current airport pickup, full road leg and a cutoff for sleeping in the city if the long handoff fails. Do not protect the next morning's park slot with an unverified late-night ride.",
          "The flight lands, but the Wulingyuan property no longer receives the group."
        ],
        [
          "West Station arrival with a downtown/Tianmen plan",
          "Share 张家界西 with the hotel or authorised pickup, add station exit and road time, and keep the Tianmen ticket/route with its attraction owner. A central-city hotel can be a useful handoff without making West the wrong train.",
          "The pickup waits at 张家界站 while the traveller exits 张家界西."
        ],
        [
          "Morning park booking after a late train",
          "Protect sleep and the booked base before preserving a fragile late transfer. The park owner controls entrance and slot; this page decides whether the arrival-side handoff remains verifiable or needs a staffed urban overnight.",
          "A missed late coach causes both an unsafe curbside ride and a failed morning entry."
        ]
      ]
    },
    {
      "id": "chain-heading",
      "type": "heading",
      "level": 2,
      "text": "Connect DYG or the rail station to the named first-night base"
    },
    {
      "id": "door-to-door-chain",
      "type": "comparison",
      "title": "Arrival is complete only when the correct Zhangjiajie base receives you",
      "columns": [
        {
          "heading": "Leave from the inbound flight/train and its real exit",
          "items": [
        "At DYG, central station or West, identify the physical exit before contacting the hotel; a carrier's arrival time is not a pickup time.",
        "Tell the property how many cases must move and whether the group is bound for Yongding or Wulingyuan.",
        "If reception, Tianmen or a park gate closes first, make that booking—not the flight or train duration—the controlling clock."
          ]
        },
        {
          "heading": "Read the DYG, 张家界站 or 张家界西 ticketed arrival literally",
          "items": [
            "Pair DYG or the Chinese rail name with the service number and actual arrival time shown by the carrier.",
            "Ask the named hotel which exit and vehicle they can presently serve; do not inherit a pickup instruction from another base.",
            "Do not collapse DYG, 张家界站 and 张家界西 into one Zhangjiajie pin; each creates a different first-night handoff."
          ]
        },
        {
          "heading": "Finish at the booked downtown/Yongding or Wulingyuan hotel branch",
          "items": [
            "Leave through the signed airport or station exit and use the transfer verified for the downtown or Wulingyuan property.",
        "After baggage collection or station exit, ask whether the confirmed vehicle can still reach the exact branch before its desk closes.",
        "When Wulingyuan is no longer realistic, move the first night to an attended downtown property and shift the park plan deliberately."
          ]
        }
      ]
    },
    {
      "id": "late-heading",
      "type": "heading",
      "level": 2,
      "text": "Mountain-bound luggage and late arrivals decide where the first night belongs"
    },
    {
      "id": "late-table",
      "type": "table",
      "caption": "Protect the city-to-park transfer before choosing the quickest arrival",
      "columns": [
        "Zhangjiajie arrival risk",
        "Safer first-night response",
        "Park-transfer assumption to avoid"
      ],
      "rows": [
        [
          "mountain weather, road handoff, cases and different bases",
        "A party with large cases should compare vehicle loading, the distance from exit to pickup and any uphill property approach, not just city-versus-park kilometres.",
        "A hotel pin in Wulingyuan says nothing about stairs between the road and reception."
        ],
        [
          "Arrival threatens hotel reception, Tianmen booking or Forest Park entry",
        "Send the delay and actual arrival node to the property. If it cannot name a late vehicle or reception process, reserve a staffed Yongding fallback before leaving the terminal.",
        "A coach or hotel pickup advertised for daylight should not be projected into a rainy late evening."
        ],
        [
          "A separate booking after the booked downtown/Yongding or Wulingyuan hotel branch",
        "Keep Tianmen and Forest Park admissions separate from the arrival day: include the road to the chosen base, check-in and sleep before protecting a morning gate.",
        "An attraction reservation does not require an airline, railway or hotel driver to absorb a late arrival."
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "At the wrong Zhangjiajie arrival point: protect the first night first"
    },
    {
      "id": "recovery-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Check the carrier record for DYG, 张家界站 or 张家界西 and tell the hotel the place where the group is physically standing.",
        "Have airport or railway staff confirm whether the problem is a different exit or a different arrival facility.",
        "Ask the carrier what can still be changed on the active booking before buying a road transfer to another node.",
        "Call the exact hotel branch; continue only if it confirms a vehicle, reception and an arrival time that still work.",
        "Move any Tianmen or Forest Park booking whose cutoff is now impossible instead of asking a driver to race mountain roads.",
        "If no verified Wulingyuan handoff remains, take the group to an attended downtown bed and rebuild the park morning from there."
      ]
    },
    {
      "id": "changes-heading",
      "type": "heading",
      "level": 2,
      "text": "Move the Zhangjiajie arrival plan when…"
    },
    {
      "id": "answer-changes",
      "type": "list",
      "ordered": false,
      "items": [
        "The live ticket changes between DYG, 张家界站 and 张家界西.",
        "The booked base changes between downtown and Wulingyuan.",
        "The park entrance, slot or first attraction becomes the controlling deadline.",
        "Weather, road or tourist-coach operation changes.",
        "Late arrival or luggage removes the final verified handoff."
      ]
    },
    {
      "id": "checklist-heading",
      "type": "heading",
      "level": 2,
      "text": "Zhangjiajie arrival-to-base check"
    },
    {
      "id": "final-checklist",
      "type": "list",
      "ordered": false,
      "items": [
        "Verify the dated flight or train and its exact Zhangjiajie arrival label.",
        "Send the property the service number, expected exit and number of bags.",
        "Confirm the branch's late reception and named pickup method in writing.",
        "Check current road or local-transport notices for downtown and Wulingyuan.",
        "Use the forecast and actual group mobility to choose the first-night base.",
        "Decide when a park-side arrival must convert to a downtown overnight.",
        "In release week, retest the handoff; if the property cannot receive it, move the room and the park slot together."
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
      "text": "Is Zhangjiajie West in Wulingyuan?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "No. It is a separate railway node and still needs a road chain to the exact Wulingyuan property or park-side destination."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "Is DYG next to the Forest Park entrance?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "No. The airport is on the central-city/Tianmen side; a Forest Park visit still needs the booked base and exact entrance chain."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "Which arrival is best for a city hotel?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "Start with the live flight or train, then compare the complete transfer. DYG or the central station can reduce some city-side travel, but a much better West Station train may still win."
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "What if my driver is at the wrong Zhangjiajie station?"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "Send the full Chinese station name and live arrival update. Use current signed transport or a rebooked pickup; do not accept an unknown curbside vehicle to recover the mistake."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue from the confirmed Zhangjiajie arrival",
      "items": [
        {
          "label": "Start with the Zhangjiajie city guide",
          "href": "/destinations/zhangjiajie/",
          "description": "Place the arrival node inside the complete destination plan."
        },
        {
          "label": "Choose downtown or Wulingyuan for the hotel base",
          "href": "/guides/zhangjiajie-city-or-wulingyuan-hotel-base/",
          "description": "Choose the base before completing its arrival chain."
        },
        {
          "label": "Use the correct Forest Park ticket and entrance",
          "href": "/guides/zhangjiajie-national-forest-park-tickets-and-entrances/",
          "description": "Hand attraction-side slots and gates to their current owner."
        },
        {
          "label": "Compare a night train with daytime high-speed rail",
          "href": "/guides/china-night-train-or-daytime-high-speed-rail/",
          "description": "Choose the wider rail mode before matching the Zhangjiajie arrival node."
        },
        {
          "label": "Use a China train for the first time",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "Continue with passport, station entry and boarding workflow."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources and image credit",
      "items": [
        {
          "label": "Zhangjiajie Hehua International Airport official page",
          "url": "https://www.hunanairport.cn/content/zjjAirPort.html",
          "publisher": "Hunan Airport Group",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Live railway journey and station search",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2026 Zhangjiajie West passenger activity",
          "url": "https://jtt.hunan.gov.cn/jtt/xxgk/gzdt/szdt1/202602/t20260227_33922205.html",
          "publisher": "Hunan Department of Transportation",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Dated city-to-scenic-area passenger links",
          "url": "https://jtt.hunan.gov.cn/xxgk/gzdt/szdt1/202506/t20250610_33706126.html",
          "publisher": "Hunan Department of Transportation",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Official park ticket and entrance recheck",
          "url": "https://www.hnzjj.com/index.php/Ticket/show/2.html",
          "publisher": "Zhangjiajie Scenic Area",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Hero: Zhangjiajie Hehua International Airport",
          "url": "https://commons.wikimedia.org/wiki/File%3AZhangjiajie_Airport_(27796134377).jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
