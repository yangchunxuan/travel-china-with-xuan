import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "The cheapest displayed domestic fare may not be the cheapest usable ticket. CAAC guidance tells passengers to read refund, change and baggage conditions because products differ. Compare the same basket for every option: traveller, bag, seat need, payment total and the cost of changing when later bookings depend on arrival."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "Use one comparison basket",
      "columns": [
        {
          "heading": "Must-have",
          "body": "The exact checked and cabin baggage your group will carry."
        },
        {
          "heading": "Risk",
          "body": "Refund and change conditions at realistic decision times."
        },
        {
          "heading": "Dependency",
          "body": "Hotel, train or attraction value attached to on-time arrival."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "The product conditions are part of the price"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "Chinese passenger-service rules require carriers to publish transport conditions covering ticket changes, refunds and baggage. They do not establish one free allowance for every airline or fare. Record the conditions shown for the exact product and date instead of copying a carrier-wide summary."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "A fair fare comparison",
      "columns": [
        "Line item",
        "Record",
        "Do not assume"
      ],
      "rows": [
        [
          "Base and taxes",
          "Final payable amount in the same currency.",
          "The search-card number is final."
        ],
        [
          "Baggage and seat",
          "What this fare includes for this passenger.",
          "Every economy fare has the same allowance."
        ],
        [
          "Change or refund",
          "Fee and fare difference at relevant time bands.",
          "A flexible label means free changes."
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "Screenshots age quickly",
      "body": "Keep a dated screenshot for your own booking decision, but do not turn it into a permanent public fare table. Products and conditions change."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "Compare before paying"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "Open the exact product conditions, not only search results.",
        "Add bags, seats and payment fees for all travellers.",
        "Read change and refund terms at likely decision times.",
        "Add the value of bookings dependent on arrival.",
        "Choose the lowest total risk-adjusted cost, not the lowest label."
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "Where to save safely"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "Remove an optional seat or unnecessary bag before buying an inflexible fare that endangers a costly route. If no later booking depends on arrival, flexibility may be worth less; that is a trip fact, not an airline ranking."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "No live fare table",
      "body": "This guide does not quote current prices, rank airlines or promise an allowance. Recheck the exact checkout conditions."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "Want a fare comparison checked?",
      "body": "Leave dates, travellers, approximate budget, baggage and anonymised product terms."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "Check separate-ticket risk",
          "href": "/guides/china-separate-flight-tickets-self-transfer-risk/",
          "description": "A cheap bundle can still expose the onward trip."
        },
        {
          "label": "Understand China trip costs",
          "href": "/guides/how-much-does-a-china-trip-cost/",
          "description": "Place the flight decision inside the whole budget."
        },
        {
          "label": "Compare route-shaping flights",
          "href": "/guides/china-open-jaw-flights-route-planning/",
          "description": "A higher fare may remove a costly return journey."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources reviewed",
      "items": [
        {
          "label": "Air-travel ticket guidance",
          "url": "https://app.caac.gov.cn/INDEX/HLFW/HKLXCS/",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Notice on airline ticket services",
          "url": "https://www.caac.gov.cn/XXGK/XXGK/ZFGW/201807/t20180717_189399.html",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
