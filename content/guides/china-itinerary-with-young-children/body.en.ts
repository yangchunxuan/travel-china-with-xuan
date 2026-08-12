import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "A child-friendly China route is not an adult itinerary with earlier dinners. Build it around the hardest hour: the post-arrival nap, the long station walk, the toilet emergency or the final transfer while carrying a sleeping child. Fewer bases and protected recovery blocks usually matter more than adding one more headline city."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "Protect three family systems",
      "columns": [
        {
          "heading": "Sleep",
          "body": "Keep arrival and transfer days free of irreplaceable anchors."
        },
        {
          "heading": "Movement",
          "body": "Count stairs, station size, stroller folding and the adult carrying the bags."
        },
        {
          "heading": "Food and toilets",
          "body": "Put predictable options near the hotel and before long queues."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "Ticket rules are only one layer"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "12306 publishes age-based child-ticket rules, including when a child may travel free without a separate seat and when a child ticket applies. A legal ticket choice is not automatically a comfortable seat plan. Check the current rule, passport details and whether the family needs a dedicated seat."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "Family constraints and route responses",
      "columns": [
        "Constraint",
        "Route response",
        "Bad shortcut"
      ],
      "rows": [
        [
          "Nap-dependent child",
          "One major anchor plus nearby optional time.",
          "Fixed booking immediately after arrival."
        ],
        [
          "Stroller and luggage",
          "Fewer hotel changes; door-to-door transfer where it solves a real barrier.",
          "Assuming every station path is step-free."
        ],
        [
          "Two children or one adult",
          "Reduce simultaneous bags, hands and tickets.",
          "Adding a city because the train is short."
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "Accessibility must be checked, not assumed",
      "body": "Facilities differ by station, entrance, attraction and temporary works. Confirm the exact place and keep a carrying fallback; do not publish a nationwide stroller-access promise."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "Build the family route"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "Write the child's non-negotiable sleep and meal windows.",
        "Count adults, bags, stroller and free hands for every transfer.",
        "Choose hotels by daily friction, not only landmark distance.",
        "Keep one flexible recovery block after each major move.",
        "Remove a base before compressing every day."
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "Cut the move, not the rest"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "When the plan is overloaded, delete the city that adds a hotel change for only one activity. Do not protect every city by taking away naps, meals and the buffer before departure."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "No universal age template",
      "body": "Children of the same age travel differently. This framework needs your child's routines, mobility and current ticket rules; it does not output a copied family itinerary."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "Want a family route check?",
      "body": "Leave dates, number and ages of travellers, approximate budget and the cities under consideration."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "Prepare for a first high-speed train",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "Handle passports, tickets and stations after choosing the route."
        },
        {
          "label": "Choose a hotel near useful transport",
          "href": "/guides/china-hotel-near-metro/",
          "description": "Reduce daily walking and transfers, not just map distance."
        },
        {
          "label": "Check the usable sightseeing days",
          "href": "/guides/is-your-china-itinerary-too-rushed/",
          "description": "Count arrival, transfer and recovery time honestly."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official source reviewed",
      "items": [
        {
          "label": "Railway child-ticket rules",
          "url": "https://kyfw.12306.cn/otn/gonggao/children.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
