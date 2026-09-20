import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "Start a Zhangjiajie private tour from the exact airport or railway station on your ticket: usually Zhangjiajie Hehua International Airport (DYG) or Zhangjiajie West Railway Station. A seven-day route through Furong Town and Fenghuang normally finishes at Fenghuang Ancient City Railway Station (凤凰古城站); a Zhangjiajie-only route normally returns to a confirmed Zhangjiajie departure point. Do not book the final ticket until the written itinerary names that point."
    },
    {
      "id": "names-heading",
      "type": "heading",
      "level": 2,
      "text": "Four names that should not be shortened too early"
    },
    {
      "id": "names-table",
      "type": "table",
      "caption": "Official node, what it serves and what remains after arrival",
      "columns": [
        "Node",
        "Use it for",
        "What remains"
      ],
      "rows": [
        [
          "Zhangjiajie Hehua International Airport (DYG)",
          "Flights arriving in Zhangjiajie",
          "A road transfer to the confirmed city or Wulingyuan hotel."
        ],
        [
          "Zhangjiajie West Railway Station",
          "Most high-speed-rail arrivals used by these routes",
          "A road transfer; it is not Zhangjiajie Railway Station and not a park gate."
        ],
        [
          "Furong Town Railway Station",
          "Rail access to the Furong Town area",
          "The station is about 2.5 km from the scenic area, so a ground connection remains."
        ],
        [
          "Fenghuang Ancient City Railway Station",
          "Rail access for Fenghuang Ancient Town and the standard end of the seven-day route",
          "The station is outside the old-town walking streets; local ground transport is still required."
        ]
      ]
    },
    {
      "id": "name-warning",
      "type": "callout",
      "title": "Search the Chinese station name on 12306",
      "body": "For the final ticket, search 张家界西, 芙蓉镇 or 凤凰古城. “Zhangjiajie Station” and Zhangjiajie West are different stations. A travel plan that says only “Zhangjiajie train station” is not ready to book.",
      "tone": "warning"
    },
    {
      "id": "arrival-heading",
      "type": "heading",
      "level": 2,
      "text": "Airport or Zhangjiajie West: both still need the hotel transfer"
    },
    {
      "id": "arrival-copy",
      "type": "paragraph",
      "text": "The first question is not which arrival point is universally better. It is which flight or train gets the group into Zhangjiajie at a workable hour, with enough time for the complete road journey to the confirmed hotel. A Wulingyuan stay protects the forest-park days, but it is not beside either transport hub. Share the arrival number, date, time and luggage count before a pickup is confirmed."
    },
    {
      "id": "arrival-figure",
      "type": "figure",
      "src": "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/zhangjiajie-hehua-airport-1600.webp",
      "alt": "Zhangjiajie Hehua International Airport with Tianmen Mountain behind the terminal",
      "width": 1600,
      "height": 1000,
      "caption": "The airport is one arrival node; the hotel transfer is a separate leg of the journey."
    },
    {
      "id": "route-heading",
      "type": "heading",
      "level": 2,
      "text": "The four-day and seven-day routes finish differently"
    },
    {
      "id": "route-compare",
      "type": "comparison",
      "columns": [
        {
          "heading": "Zhangjiajie-only route",
          "body": "The final transfer returns to the exact Zhangjiajie airport or railway station agreed in writing. This is the cleaner pattern when the next flight or train leaves from Zhangjiajie."
        },
        {
          "heading": "Zhangjiajie–Furong–Fenghuang route",
          "body": "The standard route keeps moving south and ends at Fenghuang Ancient City Railway Station. Returning to Zhangjiajie is possible only when the extra road transfer and price are confirmed."
        }
      ]
    },
    {
      "id": "furong-heading",
      "type": "heading",
      "level": 2,
      "text": "A station name is not a hotel or scenic-area entrance"
    },
    {
      "id": "last-mile-copy",
      "type": "paragraph",
      "text": "Furong Town station is reported by the Hunan government as roughly 2.5 km from the scenic area. Fenghuang Ancient City station is roughly 10 km from the main old-town area. Those distances explain why a “direct train” is not the whole transfer. Do not turn them into a promised driving time: traffic, the exact hotel, pedestrian controls, operating services and luggage all affect the last leg."
    },
    {
      "id": "booking-heading",
      "type": "heading",
      "level": 2,
      "text": "Confirm these five items before buying the final ticket"
    },
    {
      "id": "booking-list",
      "type": "list",
      "ordered": true,
      "items": [
        "The exact Chinese airport or station name, not just the destination city.",
        "The train or flight number, date and scheduled departure time.",
        "The hotel address and where a vehicle can legally stop.",
        "The number and size of suitcases, plus any mobility equipment.",
        "Whether the final written itinerary ends in Fenghuang or returns to Zhangjiajie."
      ]
    },
    {
      "id": "dynamic-note",
      "type": "callout",
      "title": "Timetables are date-specific",
      "body": "Train services, stops, fares and seat availability vary by timetable and travel date. Check the exact date on China Railway 12306. Homeground confirms the pickup and drop-off points in the final written itinerary.",
      "tone": "neutral"
    },
    {
      "id": "faq",
      "type": "faq",
      "title": "Station questions",
      "items": [
        {
          "question": "Is Zhangjiajie West the same as Zhangjiajie Railway Station?",
          "answer": "No. They are different railway stations. Match the Chinese name and station on the ticket before arranging the vehicle."
        },
        {
          "question": "Can the driver collect us from either the airport or Zhangjiajie West?",
          "answer": "The published routes allow a pickup from the confirmed Zhangjiajie airport or railway station. The exact point, arrival and luggage must be written into the final confirmation."
        },
        {
          "question": "Does the seven-day tour return to Zhangjiajie on Day 7?",
          "answer": "Not by default. Its standard finish is Fenghuang Ancient City Railway Station. A return to Zhangjiajie requires a different transfer plan and price agreed before payment."
        },
        {
          "question": "Should we buy the train ticket before asking for a quote?",
          "answer": "Share the likely ticket first, but wait for the route and transfer point to be checked before making a non-changeable booking. The final ticket can alter the last hotel night and the Day 7 transfer."
        }
      ]
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "Choose the route after fixing the endpoints",
      "items": [
        {
          "label": "7-day Zhangjiajie, Furong Town & Fenghuang private tour",
          "href": "/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/",
          "description": "The standard route starts in Zhangjiajie and finishes at Fenghuang Ancient City Railway Station."
        },
        {
          "label": "4-day Zhangjiajie private tour",
          "href": "/tours/zhangjiajie-forest-4-day-private-tour/",
          "description": "A Zhangjiajie-focused route with the final transfer matched to the confirmed local departure."
        },
        {
          "label": "Why the seven-day route uses this order",
          "href": "/guides/zhangjiajie-furong-fenghuang-route-order/",
          "description": "See the 3+1+2-night hotel plan, luggage logic and no-backtracking route."
        },
        {
          "label": "Choose Zhangjiajie city or Wulingyuan as a hotel base",
          "href": "/guides/zhangjiajie-city-or-wulingyuan-hotel-base/",
          "description": "Protect the park days before choosing a hotel from the station map alone."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official transport references",
      "items": [
        {
          "label": "China Railway 12306 station-name data",
          "url": "https://kyfw.12306.cn/otn/resources/js/framework/station_name.js",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-09-20"
        },
        {
          "label": "Zhangjiajie–Jishou–Huaihua railway station order",
          "url": "https://www.mct.gov.cn/whzx/qgwhxxlb/hn_7731/202112/t20211207_929617.htm",
          "publisher": "Ministry of Culture and Tourism of China",
          "reviewedAt": "2026-09-20"
        },
        {
          "label": "Hunan railway stations and official English names",
          "url": "https://www.enghunan.gov.cn/hneng/Services/Live/Transportation/RailwayStations/202607/t20260703_34019377.html",
          "publisher": "The People’s Government of Hunan Province",
          "reviewedAt": "2026-09-20"
        },
        {
          "label": "Zhangjiajie Hehua International Airport",
          "url": "https://enghunan.gov.cn/hneng/Services/Live/Transportation/Airports/202606/t20260604_33993921.html",
          "publisher": "The People’s Government of Hunan Province",
          "reviewedAt": "2026-09-20"
        },
        {
          "label": "Rail connections and the distance from Fenghuang station to the old town",
          "url": "https://www.hunan.gov.cn/hnszf/hnyw/zwdt/202112/t20211206_21247807.html",
          "publisher": "The People’s Government of Hunan Province",
          "reviewedAt": "2026-09-20"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
