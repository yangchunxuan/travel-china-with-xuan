import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "A rail-only China trip works when the railway forms the spine of the places you actually value—not when every destination is forced to fit a slogan. Test each stop from hotel door to hotel door. A city with a station may still require a long road transfer, while one flight at the edge of the route may save a full usable day."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "Three rail-only tests",
      "columns": [
        {
          "heading": "Spine",
          "body": "The next valued stop lies forward on a connected rail corridor."
        },
        {
          "heading": "Daylight",
          "body": "The full transfer block does not consume the sightseeing time you meant to protect."
        },
        {
          "heading": "Last mile",
          "body": "Station access and the final road leg are acceptable for the group and luggage."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "Official inventory is date-specific"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "12306 is the official passenger service for current trains and rules. A network map proves infrastructure, not that a useful departure, seat or station pair exists on your date. Build the concept first, then verify every leg in the real booking window."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "Keep or break the rail-only rule",
      "columns": [
        "Situation",
        "Decision",
        "Reason"
      ],
      "rows": [
        [
          "Major cities on one corridor",
          "Keep rail as the spine.",
          "Central arrival and fewer airport processes may help."
        ],
        [
          "Remote scenic area after a rail hub",
          "Allow a road last mile.",
          "The railway does not reach the attraction gate."
        ],
        [
          "Long cross-country jump",
          "Compare one flight.",
          "A purity rule may spend a full day or add a poor night."
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "Rail-only never means transfer-free",
      "body": "Stations can be far from hotels, cities can have several stations, and scenic areas often need buses or cars. Count those legs explicitly."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "Design the route"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "List only the places with a protected reason to visit.",
        "Draw one forward rail spine between gateways.",
        "Add hotel-to-station and station-to-hotel time.",
        "Mark road-only last miles and test them against the group.",
        "Break the rail-only rule where it saves a whole usable block."
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "What to cut first"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "Remove the branch that requires a long out-and-back for one weak priority. Do not shorten every main stop merely to preserve a remote pin on the map."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "No live train plan",
      "body": "This page does not select trains, promise seats or produce a city-by-day route. Those require dates and current 12306 checks."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "Need a rail-spine review?",
      "body": "Leave dates, travellers, approximate budget and candidate cities. A planner can identify the leg where rail stops being the sensible constraint."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "Take high-speed rail for the first time",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "Use this after the route passes the rail test."
        },
        {
          "label": "Compare a night train with daytime rail",
          "href": "/guides/china-night-train-or-daytime-high-speed-rail/",
          "description": "Protect either sleep quality or a sightseeing day deliberately."
        },
        {
          "label": "Use flights only at the route ends",
          "href": "/guides/china-open-jaw-flights-route-planning/",
          "description": "An open-jaw gateway can preserve a rail spine without backtracking."
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
