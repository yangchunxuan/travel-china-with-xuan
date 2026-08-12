import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "If you can enter at one end and leave at the other, the clean rail chain is Nanjing–Suzhou–Shanghai–Hangzhou, or reverse. If both international flights use Shanghai, one base can be calmer—but only after you count repeated station trips. The fastest train segment is not the same as the shortest travel day."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "Choose the architecture first",
      "columns": [
        {
          "heading": "One-way chain",
          "body": "Best when different gateways remove the return to Shanghai."
        },
        {
          "heading": "Shanghai base",
          "body": "Best when avoiding hotel moves matters more than station commuting."
        },
        {
          "heading": "Hybrid",
          "body": "Move once, then use one deliberate day trip rather than commuting everywhere."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "Station geography changes the answer"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "Shanghai has several major railway stations, and the correct one depends on the service and hotel location. Suzhou also has multiple rail access points. A route that looks compact on a national map can still lose hours to local transfers, so compare door-to-door blocks rather than headline rail times."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "Route shapes and their hidden cost",
      "columns": [
        "Shape",
        "Strength",
        "Hidden cost"
      ],
      "rows": [
        [
          "Nanjing → Suzhou → Shanghai → Hangzhou",
          "No corridor backtrack with suitable open-jaw gateways.",
          "Three hotel moves if every city becomes a base."
        ],
        [
          "Shanghai base",
          "One hotel and simpler luggage handling.",
          "Repeated station access and fixed return trains."
        ],
        [
          "Two bases",
          "Balances luggage stability and regional reach.",
          "Requires a clear dividing point, not arbitrary equal nights."
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "Do not turn four station names into four sightseeing days",
      "body": "Live train patterns and station assignments change. Confirm the exact origin and destination station in 12306; then add hotel-to-station time at both ends."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "A practical route test"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "Fix the actual Shanghai airport and any alternative gateway.",
        "Place Nanjing and Hangzhou at opposite ends of the corridor.",
        "Decide whether Suzhou needs a night or a focused visit.",
        "Price each hotel move in time, not only money.",
        "Keep the structure with fewer forced returns before assigning nights."
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "What to remove when the plan is full"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "Cut the weakest overnight, not the city with the longest name recognition. Suzhou can sometimes be a focused visit; Nanjing or Hangzhou may need a base if your priorities are dispersed. The correct cut follows activities and gateways."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "This is a route framework",
      "body": "It does not provide a four-city schedule, live train times or a universal day-trip rule."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "Need the geometry checked?",
      "body": "Leave dates, traveller count, approximate budget, hotel preferences and flight airports for a human route review."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "Plan Shanghai–Hangzhou transport",
          "href": "/guides/shanghai-hangzhou-transport-route/",
          "description": "Choose stations after the city order."
        },
        {
          "label": "Understand a Suzhou garden visit",
          "href": "/guides/how-to-read-a-suzhou-garden/",
          "description": "Give Suzhou a purpose before adding a hotel."
        },
        {
          "label": "Choose Pudong or Hongqiao",
          "href": "/guides/shanghai-pudong-or-hongqiao-airport/",
          "description": "The flight airport can reverse the best route."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources reviewed",
      "items": [
        {
          "label": "Shanghai railway-station guide",
          "url": "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Suzhou rail-network update",
          "url": "https://jtj.suzhou.gov.cn/szjt/tjgl/202501/4cbd95cd41d747d98bc277a1916c1ad7.shtml",
          "publisher": "Suzhou Transport Bureau",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
