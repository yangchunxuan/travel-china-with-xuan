import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "One hotel is not automatically slower, and moving forward is not automatically efficient. A hub removes packing and check-in friction but repeats the trip to the station and back. Multiple bases reduce geographical returns but add luggage, checkout gaps and failure points. Compare total door-to-door blocks."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "Three defensible structures",
      "columns": [
        {
          "heading": "One hub",
          "body": "Compact excursions, excellent station access and a strong need for hotel stability."
        },
        {
          "heading": "Multiple bases",
          "body": "A forward corridor where each move unlocks several priorities."
        },
        {
          "heading": "Hybrid",
          "body": "One stable regional base plus one deliberate move to a new corridor."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "There is no national day-trip radius"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "12306 can confirm current station pairs only after dates and stations are known. A short rail ride may start with a long metro trip and end far from the attraction. Therefore, define a day trip by hotel-door departure, fixed return and usable time—not kilometres."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "Where the time goes",
      "columns": [
        "Cost",
        "Hub route",
        "Multi-base route"
      ],
      "rows": [
        [
          "Hotel friction",
          "Low",
          "Higher with every checkout and bag move"
        ],
        [
          "Repeated ground travel",
          "Potentially high",
          "Lower if the chain moves forward"
        ],
        [
          "Recovery from disruption",
          "Stable room helps",
          "Later hotel and train bookings can cascade"
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "Do not compare train time alone",
      "body": "Add access, waiting, arrival transfer and the fixed need to return. A 40-minute train can still create a long day."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "Choose the architecture"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "Group priorities into real geographic clusters.",
        "Measure each proposed spoke door to door.",
        "Count hotel changes and the hands needed for luggage.",
        "Mark whether every base unlocks at least two priorities.",
        "Use a hybrid when one move removes several repeated returns."
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "The cut rule"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "Remove a base that serves only one weak item, or remove a spoke that repeats a long station approach. Do not keep both just because one saves packing and the other looks linear."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "Architecture, not an itinerary",
      "body": "This page does not prescribe cities, nights or day trips. Dates, hotels and current transport decide the final shape."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "Need the returns counted?",
      "body": "Leave dates, traveller count, approximate budget, luggage limits and candidate bases."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "Check whether the route is too rushed",
          "href": "/guides/is-your-china-itinerary-too-rushed/",
          "description": "Test the final architecture against usable days."
        },
        {
          "label": "Choose a useful transport hotel",
          "href": "/guides/china-hotel-near-metro/",
          "description": "A hub works only if daily departures are easy."
        },
        {
          "label": "Test different entry and exit cities",
          "href": "/guides/china-open-jaw-flights-route-planning/",
          "description": "Open-jaw gateways can turn spokes into a forward chain."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official source reviewed",
      "items": [
        {
          "label": "Official railway passenger service",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
