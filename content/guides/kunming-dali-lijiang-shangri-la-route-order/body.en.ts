import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "The defensible default is a one-way corridor: Kunming–Dali–Lijiang–Shangri-La, or the reverse. It reduces backtracking, but it is not a promise that all four belong in your trip. Your flights may make Kunming only a gateway, while Shangri-La adds a higher-elevation recovery question that cannot be solved by copying a night count."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "Give each stop a job",
      "columns": [
        {
          "heading": "Kunming",
          "body": "International or domestic gateway; keep it only if it has its own priority."
        },
        {
          "heading": "Dali and Lijiang",
          "body": "Two different bases, but compare what you will actually do before keeping both."
        },
        {
          "heading": "Shangri-La",
          "body": "A deliberate higher-elevation extension, not a free fourth city."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "The railway improves continuity, not personal capacity"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "The official Lijiang–Shangri-La railway makes a north–south chain more practical. It does not remove station access, hotel changes, weather, or the need to see how each traveller responds at higher elevation. Route feasibility and route comfort remain separate decisions."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "Which direction fits which gateway",
      "columns": [
        "Shape",
        "Use it when",
        "Main risk"
      ],
      "rows": [
        [
          "Kunming → north",
          "You arrive in Kunming and can depart from the north or continue onward.",
          "Adding every stop because it is on the line."
        ],
        [
          "Shangri-La → south",
          "You can reach Shangri-La first and prefer to descend.",
          "A demanding first arrival with little recovery."
        ],
        [
          "Kunming return loop",
          "The same-city flight is materially better and time is ample.",
          "Paying for the same corridor twice."
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "Do not make health promises from a route map",
      "body": "Higher elevation affects people differently. This guide offers pacing logic, not medical clearance. Travellers with health concerns should seek appropriate professional advice and keep the first high-elevation day flexible."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "Build the route in five decisions"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "Fix the actual arrival and departure airports first.",
        "Give every stop one non-substitutable reason to stay.",
        "Check whether Dali and Lijiang duplicate your desired pace or experience.",
        "Place Shangri-La only if recovery and an exit plan are credible.",
        "Cut the weakest stop before shortening every stop."
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "The clean cut is usually a whole stop"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "Do not save the city list by turning four places into four rushed check-ins. If Kunming is only an air gateway, pass through; if Shangri-La is only a famous name, leave it for a trip with proper margin."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "No free private itinerary",
      "body": "There is no night allocation or attraction schedule here. Live transport, season, health, luggage and flight details can change the answer."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "Need the corridor checked?",
      "body": "Leave your dates, traveller count, approximate budget and flight gateways. A planner can identify the weak link without promising live seats."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "Choose Lijiang Old Town or Shuhe",
          "href": "/guides/lijiang-old-town-or-shuhe-where-to-stay/",
          "description": "Place the hotel after deciding Lijiang's role."
        },
        {
          "label": "Prepare for China rail",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "Check the passenger process separately from route design."
        },
        {
          "label": "Test whether the route is too rushed",
          "href": "/guides/is-your-china-itinerary-too-rushed/",
          "description": "Count usable days after transfers and recovery."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources reviewed",
      "items": [
        {
          "label": "Lijiang–Shangri-La railway opening",
          "url": "https://www.nra.gov.cn/xwzx/tpsp/tpxx/202312/t20231229_344290.shtml",
          "publisher": "National Railway Administration",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Yunnan transport network update",
          "url": "https://jtyst.yn.gov.cn/html/2025/xingyexinwen_0218/3133736.html",
          "publisher": "Yunnan Department of Transport",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
