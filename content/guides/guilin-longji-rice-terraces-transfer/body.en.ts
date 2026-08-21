import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "'Longji' is not one hotel door. Ping'an, Jinkeng/Dazhai and the Ancient Zhuang Village are separate visitor areas with different road branches and final walks. Choose the actual village and property first; only then compare a transfer from Guilin airport, a named railway station or a city hotel."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "The village name is the first transport decision",
      "tone": "decision",
      "body": "Use Ping'an for a Ping'an booking, Jinkeng/Dazhai for that valley and its cable-car-side environment, and the Ancient Zhuang Village only for a booking there. A driver, coach or map pin saying only 'Longji Rice Terraces' is incomplete. Confirm the scenic-area access rule, luggage handoff and exact property contact for the travel day."
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "The Guilin-to-Longji village transfer this page owns",
      "tone": "neutral",
      "body": "This page owns the exact Guilin-origin-to-Longji-village transport handoff in either direction. It does not decide day trip versus overnight, compare village experiences in depth, choose a Guilin arrival airport/station, sell tours or freeze coach times and pickup points."
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "Keep written proof of the Guilin pickup and whether the booking says Ping'an, Jinkeng/Dazhai or Ancient Zhuang Village; 'Longji' alone cannot direct a driver.",
        "Describe the start as KWL, the complete railway-station name or a hotel branch, and finish at the property's agreed vehicle-to-foot handover.",
        "Find the earliest limit among scenic access, reception and a same-day return, then tell the operator when the group must turn back.",
        "Allow separately for rural traffic, rain or heat, unloading cases and the uphill walk that begins after the vehicle stops.",
        "Have the property confirm the operator and meeting point; if they cannot, retreat to a staffed checkpoint and revise the village night."
      ]
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "Choose Ping'an or Dazhai before choosing the vehicle"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "The named Longji village and property handoff control the transfer",
      "columns": [
        "Longji transfer chain",
        "When this village route fits",
        "Property-handoff question",
        "Village mix-up to prevent"
      ],
      "rows": [
        [
          "Ping'an Zhuang Village / 平安壮族梯田观景区",
          "The exact hotel or day plan is in Ping'an and its current access branch is confirmed.",
          "Where does the vehicle stop, who receives the luggage and how long is the final walk?",
          "Do not send a Ping'an booking to Dazhai because both appear under Longji."
        ],
        [
          "Jinkeng/Dazhai / 金坑大寨红瑶梯田观景区",
          "The booking names Dazhai/Jinkeng or a property in that valley.",
          "Is the agreed handoff the parking/coach area, a cable-car-side point or a named property meeting place?",
          "Do not treat the cable car as a guaranteed hotel or luggage transfer."
        ],
        [
          "Longji Ancient Zhuang Village / 龙脊古壮寨",
          "The booked experience or property explicitly names this village.",
          "Which current scenic-area checkpoint and final walking handoff apply?",
          "Do not use a generic Longji destination pin as proof of the right road branch."
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "Seasonal roads and village handoffs must be confirmed for Longji",
      "tone": "warning",
      "body": "Ping'an, Jinkeng/Dazhai and the Ancient Zhuang Village use different branches and final walks. Scenic access, shared transfers and road conditions change, so recheck the exact property and never publish a generic 'Longji pickup' as if it served every valley."
    },
    {
      "id": "scenarios-heading",
      "type": "heading",
      "level": 2,
      "text": "Airport, railway and Guilin-hotel starts lead to different village transfers"
    },
    {
      "id": "scenario-table",
      "type": "table",
      "caption": "Measure from the Guilin pickup to the named terrace village property",
      "columns": [
        "Guilin pickup pattern",
        "How to verify the village handoff",
        "Mountain transfer failure"
      ],
      "rows": [
        [
          "Guilin hotel to an overnight property",
          "Send the driver/operator the Chinese village, property name, contact and agreed meeting point. Count checkout, road conditions, scenic-area access and the final luggage walk.",
          "The vehicle reaches a Longji checkpoint but the hotel is in another valley."
        ],
        [
          "KWL or a Guilin railway station to Longji",
          "Use the arrival-node owner first, then make the rural transfer begin at the exact terminal/station exit. Add flight/train delay and do not promise a shared coach waits.",
          "The booking says Guilin station generically and the pickup waits at another node."
        ],
        [
          "Longji back to a same-day departure",
          "Reverse the exact village chain, include weather/road delay and the full station/airport processing margin. Leave early enough to protect the hard booking, not a map estimate.",
          "Rain or a village-road delay removes an unprotected train or flight connection."
        ]
      ]
    },
    {
      "id": "chain-heading",
      "type": "heading",
      "level": 2,
      "text": "Join the Guilin pickup, mountain vehicle and village property handoff"
    },
    {
      "id": "door-to-door-chain",
      "type": "comparison",
      "title": "A Longji transfer succeeds at the village handover, not at the Guilin pickup",
      "columns": [
        {
          "heading": "Leave from KWL, a full Guilin station name or the exact city hotel",
          "items": [
        "Give the operator the complete KWL, railway-station or hotel-branch pickup and wait only at the point it confirms.",
        "Ask which vehicle can pass the current mountain checkpoint and where cases must transfer to a smaller vehicle or porter arrangement.",
        "For a day return, agree the village departure time before going uphill; for an overnight, protect reception and the final footpath in daylight."
          ]
        },
        {
          "heading": "Read the exact Guilin airport/station/hotel origin and named Longji village literally",
          "items": [
            "Keep the Guilin pickup and exact village in the same written confirmation from the operator or property.",
            "Use scenic management for access conditions and the hotel for its last handover; neither can verify the other's vehicle.",
            "Keep the Guilin pickup point and Ping'an, Jinkeng/Dazhai or Ancient Zhuang Village in writing; a Longji pin cannot identify the handoff."
          ]
        },
        {
          "heading": "Finish at Ping'an, Jinkeng/Dazhai or Ancient Zhuang Village property handoff",
          "items": [
            "Meet at the Guilin exit or hotel point confirmed by the operator, then follow the property-approved handoff for the named village.",
        "At the village transfer point, verify the remaining stairs or path and who is meeting the luggage before releasing the first vehicle.",
        "If the property cannot receive the group, stay at the last staffed checkpoint or return to Guilin rather than accept an unknown mountain ride."
          ]
        }
      ]
    },
    {
      "id": "late-heading",
      "type": "heading",
      "level": 2,
      "text": "Mountain steps, cases and daylight decide which Longji handoff is workable"
    },
    {
      "id": "late-table",
      "type": "table",
      "caption": "Protect the village property handoff before chasing the shortest drive",
      "columns": [
        "Longji constraint",
        "Safer village arrangement",
        "Mountain shortcut to reject"
      ],
      "rows": [
        [
          "rural roads, weather, luggage carrying and the final village walk",
        "For heavy luggage, ask exactly where the road ends in the selected village and how many metres or stairs remain to the room. Pack one night separately if needed.",
        "A vehicle marker in Ping'an or Dazhai does not mean a car reaches the guesthouse door."
        ],
        [
          "Arrival threatens scenic access, hotel reception and any same-day return",
        "Call the property before the vehicle leaves Guilin. If weather or delay removes the confirmed village handover, cancel that climb and retain a staffed lowland fallback.",
        "A shuttle or porter arrangement quoted for daylight cannot be projected into a dark or rain-affected arrival."
        ],
        [
          "A separate booking after Ping'an, Jinkeng/Dazhai or Ancient Zhuang Village property handoff",
        "A same-day Guilin return needs a pre-agreed pickup inside the chosen village plus reserve road time; sunset photographs are not a transport plan.",
        "Listing a transfer and hotel together does not make the driver responsible for the property's uphill path or closing time."
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "At the wrong Longji handoff: stop before taking an unverified mountain road"
    },
    {
      "id": "recovery-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Stop at the staffed pickup or checkpoint and read the written village name: Ping'an, Jinkeng/Dazhai and Ancient Zhuang Village lead to different roads.",
        "Call the booked property and describe the landmark where the vehicle is waiting; let it identify the correct handover.",
        "Ask the operator whether the present transfer can be changed or returned before paying another driver; do not assume refund rights.",
        "Continue uphill only when the property confirms road access, reception and a luggage plan for the remaining daylight.",
        "Tell the Guilin hotel or onward driver whether the night or return has moved and which village pickup is cancelled.",
        "If no accountable handover exists, keep everyone and every case at the staffed point and move the booking rather than divide the group."
      ]
    },
    {
      "id": "changes-heading",
      "type": "heading",
      "level": 2,
      "text": "Change the Longji transfer when…"
    },
    {
      "id": "answer-changes",
      "type": "list",
      "ordered": false,
      "items": [
        "The selected village or property changes.",
        "Scenic-area access, checkpoint or local road operation changes.",
        "Weather changes the rural-road or walking handoff.",
        "The Guilin origin changes among airport, stations and hotel.",
        "A same-day departure creates a hard deadline."
      ]
    },
    {
      "id": "checklist-heading",
      "type": "heading",
      "level": 2,
      "text": "Longji village and property-handoff check"
    },
    {
      "id": "final-checklist",
      "type": "list",
      "ordered": false,
      "items": [
        "Confirm the dated Guilin pickup and write the selected village without abbreviating Longji.",
        "Save the property branch, mountain meeting landmark and operator contact in Chinese.",
        "Ask who receives the group after the main vehicle stops and until what time.",
        "Check scenic access and road notices for the weather expected that day.",
        "Reduce baggage or arrange lawful help for the known final stairs.",
        "Set a daylight turnaround point for a day trip and a reception cutoff for an overnight.",
        "In release week, reconfirm the property handover; cancel the mountain leg if no named person or vehicle remains accountable."
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
      "text": "Are Ping'an and Dazhai the same place?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "No. They are different Longji visitor areas with different road branches and final handoffs. Use the name on the property booking."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "Can a car drive to every Longji hotel?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "Do not assume so. Confirm the current stopping point, luggage handoff and final walk with the exact property."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "Does this guide choose day trip or overnight?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "No. Use the existing duration owner, then return here for the exact transfer."
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "Can I go straight from Guilin airport?"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "A legal private or current shared option may be possible, but it must name KWL, the exact village and a recoverable delay plan. No transfer is assumed to wait for a flight."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue after the Longji transfer is fixed",
      "items": [
        {
          "label": "Choose day trip or overnight first",
          "href": "/guides/longji-rice-terraces-day-trip-or-overnight/",
          "description": "Keep duration and village-experience choice with its owner."
        },
        {
          "label": "Choose the Guilin arrival node",
          "href": "/guides/guilin-airport-or-railway-station-arrival-guide/",
          "description": "Name KWL or the exact railway station before the rural handoff."
        },
        {
          "label": "Plan Guilin–Yangshuo transport",
          "href": "/guides/guilin-yangshuo-transport-route/",
          "description": "Keep the separate Yangshuo corridor with its owner."
        },
        {
          "label": "Compare private and public transport",
          "href": "/guides/china-private-transfer-or-public-transport/",
          "description": "Choose the mode after the exact village is known."
        },
        {
          "label": "Understand why rural stays work differently",
          "href": "/guides/china-hotel-near-metro/",
          "description": "A metro-distance rule cannot describe a terraced-village handoff."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources and image credit",
      "items": [
        {
          "label": "Official scenic-area overview",
          "url": "https://wp.longjitour.com/index.php/about/",
          "publisher": "Longji Rice Terraces Scenic Area",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Official access-management notice",
          "url": "https://wp.longjitour.com/index.php/2025/07/04/%E9%BE%99%E8%84%8A%E6%A2%AF%E7%94%B0%E6%99%AF%E5%8C%BA%E5%BC%80%E6%94%BE%E7%AE%A1%E7%90%86%E6%83%85%E5%86%B5/",
          "publisher": "Longji Rice Terraces Scenic Area",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2026 official tourism plan",
          "url": "https://wlt.gxzf.gov.cn/zfxxgk/fdzdgknr/ghjh/zcqgh/P020260402608874093379.pdf",
          "publisher": "Guangxi Department of Culture and Tourism",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "KWL official ground-transport entry",
          "url": "https://gl.airport.gx.cn/html/jiaotongxinxi/jiaotonggongju/",
          "publisher": "Guilin Liangjiang International Airport",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Official Guilin rail-node search",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Hero: cable car in Longji",
          "url": "https://commons.wikimedia.org/wiki/File%3ACable_car_in_Longji_01.JPG",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
