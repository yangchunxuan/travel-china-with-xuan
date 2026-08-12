import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "Shoulder season is not a fixed pair of months across China. It is a deal only when the lower total cost still buys the experience you came for. A mountain route, garden city and tropical coast can enter different operating and weather transitions on the same date."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "Value has three sides",
      "columns": [
        {
          "heading": "Saving",
          "body": "Use the final route total, not one discounted hotel."
        },
        {
          "heading": "Experience",
          "body": "Identify the outdoor access, visibility or event that must remain."
        },
        {
          "heading": "Flexibility",
          "body": "Decide whether closures or poor weather can be replaced without resentment."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "Regional variation defeats a national label"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "China Meteorological Administration describes strong regional differences shaped by latitude, monsoon and topography. The official public-holiday calendar adds a separate demand layer. A date can be climatically transitional in one region and a concentrated travel period nationwide."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "When shoulder timing creates value",
      "columns": [
        "Condition",
        "Good value",
        "False economy"
      ],
      "rows": [
        [
          "Core activity operates",
          "The saving funds a better location or more flexibility.",
          "The trip loses its main reason for going."
        ],
        [
          "Weather has alternatives",
          "Indoor and outdoor priorities can swap.",
          "Every valued activity needs one weather condition."
        ],
        [
          "Holiday screen is clear",
          "Lower-demand dates remain plausible.",
          "A national or local event invalidates the label."
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "Never promise fewer crowds",
      "body": "Demand varies by city, weekday, event and exact attraction. Use official dates and current booking conditions; do not invent a crowd index."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "Test a shoulder-season offer"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "Name the one experience the trip must deliver.",
        "Check its official seasonal operation and access rules.",
        "Screen regional climate and daylight needs.",
        "Overlay official holidays without predicting future dates.",
        "Compare the full saving with the cost of substitution or cancellation."
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "When to pay more or change the route"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "Move the dates when the signature experience has no acceptable substitute. Change the route when another region offers the same travel purpose with fewer operating constraints. Keep the saving only when neither sacrifice matters to you."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "No universal shoulder months",
      "body": "This page does not quote live prices, predict crowds or publish city-by-month variants. Exact operators and dates must be rechecked."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "Need a value tradeoff checked?",
      "body": "Leave dates, travellers, approximate budget, candidate regions and the one experience you will not trade away."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "Screen the route by climate region",
          "href": "/guides/china-climate-regions-for-trip-timing/",
          "description": "Check whether one date window fits the hardest stop."
        },
        {
          "label": "Check official public holidays",
          "href": "/guides/china-public-holidays-travel-calendar/",
          "description": "A low-season label can be overturned by a national holiday."
        },
        {
          "label": "Place timing inside the full budget",
          "href": "/guides/how-much-does-a-china-trip-cost/",
          "description": "Compare transport, hotels and flexibility together."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources reviewed",
      "items": [
        {
          "label": "China climate overview",
          "url": "https://www.cma.gov.cn/2011xzt/2012zhuant/20120302/2012030205/201203020501/201103/t20110314_3096052.html",
          "publisher": "China Meteorological Administration",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "China public-holiday schedule owner",
          "url": "https://www.gov.cn/zhengce/zhengceku/202511/content_7047091.htm",
          "publisher": "State Council / Homeground source record",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
