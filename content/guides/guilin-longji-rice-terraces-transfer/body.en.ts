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
      "title": "What this page owns",
      "tone": "neutral",
      "body": "This page owns the exact Guilin-origin-to-Longji-village transport handoff in either direction. It does not decide day trip versus overnight, compare village experiences in depth, choose a Guilin arrival airport/station, sell tours or freeze coach times and pickup points."
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "Screenshot the exact Guilin airport/station/hotel origin and named Longji village for offline use; never replace it with a map shorthand.",
        "Write the first door as KWL, a full Guilin station name or the exact city hotel and the last door as Ping'an, Jinkeng/Dazhai or Ancient Zhuang Village property handoff.",
        "Mark the hard cutoff—scenic access, hotel reception and any same-day return—and the latest safe abandonment point.",
        "Count rural roads, weather, luggage carrying and the final village walk segment by segment instead of copying the main-leg duration.",
        "Save a current verification path through Longji scenic management, the exact property and current transport operator, plus return to a confirmed staffed handoff or revise the village booking if it fails."
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
      "title": "Do not turn today's operating pattern into a permanent rule",
      "tone": "warning",
      "body": "Ping'an, Jinkeng/Dazhai and the Ancient Zhuang Village use different branches and final walks. Scenic access, shared transfers and road conditions change, so recheck the exact property and never publish a generic 'Longji pickup' as if it served every valley."
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
      "text": "Build the door-to-door chain"
    },
    {
      "id": "door-to-door-chain",
      "type": "comparison",
      "title": "the exact Guilin airport/station/hotel origin and named Longji village is only the middle of the journey",
      "columns": [
        {
          "heading": "Leave from KWL, a full Guilin station name or the exact city hotel",
          "items": [
            "Confirm checkout or arrival before navigating away from KWL, a full Guilin station name or the exact city hotel.",
            "Move rural roads, weather, luggage carrying and the final village walk through a legal, signed access path.",
            "Reach the printed node early enough to protect scenic access, hotel reception and any same-day return."
          ]
        },
        {
          "heading": "Read the exact Guilin airport/station/hotel origin and named Longji village literally",
          "items": [
            "Save the exact Guilin airport/station/hotel origin and named Longji village with the live order status.",
            "Ask Longji scenic management, the exact property and current transport operator about a live exception, not a remembered pattern.",
            "Never replace the active record with a city-level map pin."
          ]
        },
        {
          "heading": "Finish at Ping'an, Jinkeng/Dazhai or Ancient Zhuang Village property handoff",
          "items": [
            "Use the current signed exit, legal pickup or verified local connection.",
            "Confirm that Ping'an, Jinkeng/Dazhai or Ancient Zhuang Village property handoff is still reachable with the bags and remaining margin.",
            "If that handoff fails, use return to a confirmed staffed handoff or revise the village booking instead of improvising."
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
          "rural roads, weather, luggage carrying and the final village walk",
          "Count every queue, lift, vehicle change and final walk between KWL, a full Guilin station name or the exact city hotel and Ping'an, Jinkeng/Dazhai or Ancient Zhuang Village property handoff; prefer fewer uncertain handoffs.",
          "A transport icon proves Ping'an, Jinkeng/Dazhai or Ancient Zhuang Village property handoff is step-free."
        ],
        [
          "Arrival threatens scenic access, hotel reception and any same-day return",
          "Notify the destination, consult Longji scenic management, the exact property and current transport operator, and switch to return to a confirmed staffed handoff or revise the village booking when the final handoff cannot be verified.",
          "A daytime connection to Ping'an, Jinkeng/Dazhai or Ancient Zhuang Village property handoff remains available after a delay."
        ],
        [
          "A separate booking after Ping'an, Jinkeng/Dazhai or Ancient Zhuang Village property handoff",
          "Add the exact exit, local handoff and processing time before scenic access, hotel reception and any same-day return; change the booking when that margin is weak.",
          "One itinerary document makes the next operator protect the exact Guilin airport/station/hotel origin and named Longji village."
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
        "Stop moving and reopen the exact Guilin airport/station/hotel origin and named Longji village; compare it character by character with the sign in front of you.",
        "Ask Longji scenic management, the exact property and current transport operator whether the error concerns an entrance, a local branch or an entirely different node.",
        "Before paying to cross the area, check the live change, refund or rebooking path tied to the exact Guilin airport/station/hotel origin and named Longji village; promise no outcome.",
        "If a transfer is still defensible, navigate to Ping'an, Jinkeng/Dazhai or Ancient Zhuang Village property handoff and compare verified arrival with scenic access, hotel reception and any same-day return.",
        "Tell the destination exactly what happened to KWL, a full Guilin station name or the exact city hotel, the node you will now reach, and which booking must change.",
        "When the margin is gone, keep the group and luggage together and use return to a confirmed staffed handoff or revise the village booking with staffed help."
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
      "text": "Final booking and release-day checklist"
    },
    {
      "id": "final-checklist",
      "type": "list",
      "ordered": false,
      "items": [
        "Re-search the exact Guilin airport/station/hotel origin and named Longji village for the traveller's real date.",
        "Save the exact Chinese names needed between KWL, a full Guilin station name or the exact city hotel and Ping'an, Jinkeng/Dazhai or Ancient Zhuang Village property handoff.",
        "Record the contact and operating window for Ping'an, Jinkeng/Dazhai or Ancient Zhuang Village property handoff.",
        "Confirm current legal access through Longji scenic management, the exact property and current transport operator.",
        "Recount rural roads, weather, luggage carrying and the final village walk for this group, not an average traveller.",
        "Write the abandonment point before scenic access, hotel reception and any same-day return.",
        "Reopen the official sources in release week; if the chain fails, replace it with return to a confirmed staffed handoff or revise the village booking."
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
      "title": "Continue the correct part of the plan",
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
