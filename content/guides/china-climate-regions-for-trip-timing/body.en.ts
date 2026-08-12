import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "There is no single best-weather month for all of China. A route can cross humid subtropical cities, a dry northern interior and a high-elevation region in one trip. Start with the stop where weather most limits the experience, then see whether the remaining regions are acceptable—not perfect—on the same dates."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "Three layers, not one average",
      "columns": [
        {
          "heading": "Regional climate",
          "body": "Latitude and monsoon exposure shape heat, rain and seasonal transitions."
        },
        {
          "heading": "Elevation",
          "body": "Higher terrain can change temperature and recovery needs over a short map distance."
        },
        {
          "heading": "Trip activity",
          "body": "A museum route and a mountain route tolerate weather differently."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "Official climate categories support regional planning"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "China Meteorological Administration material describes varied climate types shaped by monsoon influence, latitude and topography. Those categories are useful for screening a route, but historical climate is not a forecast. Check current forecasts close to travel."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "Screen the route by its hardest exposure",
      "columns": [
        "Route element",
        "Question",
        "Planning response"
      ],
      "rows": [
        [
          "Outdoor landscape",
          "Would rain, heat, cold or low visibility remove the main value?",
          "Give this stop first claim on the date window."
        ],
        [
          "High-elevation extension",
          "Can the group absorb colder conditions and slower recovery?",
          "Protect flexibility; do not stack a fixed transfer."
        ],
        [
          "Large city indoors/outdoors mix",
          "Are there meaningful indoor alternatives?",
          "Use it as the more weather-tolerant part of the route."
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "Climate is not a forecast",
      "body": "A long-term pattern cannot promise one week's rain, visibility or temperature. Recheck official forecasts and local operating notices near travel."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "Choose dates for a mixed route"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "List the activity most vulnerable to weather.",
        "Assign every stop a climate and elevation exposure.",
        "Find the window that protects the hardest stop.",
        "Test whether the other stops remain acceptable.",
        "Separate the public-holiday decision from the climate decision."
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "When no month fits every stop"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "Remove the climate outlier or change the activity, rather than claiming one month is ideal nationwide. A route can be seasonally coherent without every stop having its peak weather."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "No city-by-month index",
      "body": "This evergreen framework does not create forecast pages or city × month URLs. Named dates require current official data."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "Need a climate-screened route?",
      "body": "Leave dates, travellers, approximate budget, cities and the outdoor experience you most want to protect."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "Make the October timing decision",
          "href": "/guides/china-in-october-golden-week-or-later/",
          "description": "Use the month-specific guide for National Day and regional weather."
        },
        {
          "label": "Check the official holiday calendar",
          "href": "/guides/china-public-holidays-travel-calendar/",
          "description": "Climate suitability does not remove holiday pressure."
        },
        {
          "label": "Compare shoulder-season value",
          "href": "/guides/china-shoulder-season-value-tradeoff/",
          "description": "Add price, daylight and operating limits after the climate screen."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources reviewed",
      "items": [
        {
          "label": "China climate types and characteristics",
          "url": "https://www.cma.gov.cn/2011xzt/2017zt/20170720/2017072004/201707200101/202111/t20211103_4148108.html",
          "publisher": "China Meteorological Administration",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "China climate overview",
          "url": "https://www.cma.gov.cn/2011xzt/2012zhuant/20120302/2012030205/201203020501/201103/t20110314_3096052.html",
          "publisher": "China Meteorological Administration",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
