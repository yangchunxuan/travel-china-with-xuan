import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "For most one-way trips, the cleanest order follows the map: Guangzhou–Shenzhen–Hong Kong, or the reverse. But that does not automatically justify sleeping in Shenzhen. Start with your international gateways and the one Shenzhen experience you would protect; then test whether a hotel change and border move buy enough usable time."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "Three questions decide the route",
      "columns": [
        {
          "heading": "Gateway",
          "body": "Enter at one end and leave at the other when fares and entry documents work."
        },
        {
          "heading": "Shenzhen purpose",
          "body": "Keep an overnight only for a named priority that cannot sensibly fit around the crossing."
        },
        {
          "heading": "Border day",
          "body": "Treat immigration, station access and luggage handling as a transfer block, not a full sightseeing day."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "The border changes the value of a short distance"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "Official sources show several control points and a cross-boundary high-speed rail system. That choice affects where you surface in Hong Kong or Shenzhen, how much local travel remains, and which documents must be ready. The route decision therefore begins with endpoints, not a claim that one train is always fastest."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "When each route shape is defensible",
      "columns": [
        "Route shape",
        "Works when",
        "Weakens when"
      ],
      "rows": [
        [
          "Guangzhou → Shenzhen → Hong Kong",
          "Arrival is nearer Guangzhou and departure is from Hong Kong.",
          "You must return to a mainland airport."
        ],
        [
          "Hong Kong → Shenzhen → Guangzhou",
          "The trip starts in Hong Kong and continues north or west.",
          "A fixed Hong Kong departure forces a long return."
        ],
        [
          "Guangzhou ↔ Hong Kong with Shenzhen as a day visit",
          "Shenzhen has one compact priority and luggage can stay put.",
          "The chosen checkpoint creates excessive local travel."
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "Do not count a border move as a normal city hop",
      "body": "Live operating hours, eligibility and train inventory can change. Check the named checkpoint or West Kowloon process and leave recovery time before a fixed booking."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "Make the decision without copying an itinerary"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "Write down the exact arrival and departure airport or rail gateway.",
        "Name the one Guangzhou, Shenzhen and Hong Kong priority that would survive cuts.",
        "Choose the crossing that fits both hotels, not only the shortest rail segment.",
        "Count every hotel move and border process as lost usable time.",
        "Drop the Shenzhen overnight if it exists only to make the city list longer."
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "The first thing to cut"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "Cut a one-night Shenzhen stop with no protected anchor. A direct Guangzhou–Hong Kong move plus a deliberate day visit is usually easier to recover than three hotels used as geographical punctuation."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "What this guide does not give you",
      "body": "It does not assign nights, check visas, or choose a live train. Those depend on dates, passports, hotels and the activities you value."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "Want a human route check?",
      "body": "Leave your dates, number of travellers, approximate budget and arrival/departure gateways. A planner can flag the border-sensitive parts without promising live inventory."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "Compare Guangzhou–Hong Kong transport",
          "href": "/guides/guangzhou-hong-kong-transport-route/",
          "description": "Choose stations and mode after the route order is fixed."
        },
        {
          "label": "Choose a Shenzhen–Hong Kong crossing",
          "href": "/guides/shenzhen-hong-kong-transport-route/",
          "description": "Match the checkpoint to your hotels and onward plan."
        },
        {
          "label": "Test an open-jaw flight",
          "href": "/guides/china-open-jaw-flights-route-planning/",
          "description": "See whether different arrival and departure cities remove backtracking."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources reviewed",
      "items": [
        {
          "label": "Cross-boundary high-speed rail trip planner",
          "url": "https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html",
          "publisher": "MTR High Speed Rail",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Control-point information",
          "url": "https://www.sb.gov.hk/eng/special/bound/control.html",
          "publisher": "Hong Kong Security Bureau",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
