import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "A self-transfer is not cheap merely because the two fares add to a smaller number. CAAC guidance says non-interline segments are independently ticketed and follow their own conditions. Compare the saving with what you could lose if the first flight moves: the onward ticket, hotel, attraction and international departure."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "Price three layers",
      "columns": [
        {
          "heading": "Cash saving",
          "body": "Use the final payable amount, including baggage and seats."
        },
        {
          "heading": "Failure exposure",
          "body": "Add the non-refundable value that depends on making flight two."
        },
        {
          "heading": "Recovery time",
          "body": "Ask whether a later flight or overnight exists within your route."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "The protection gap is explicit"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "CAAC tells passengers that separately issued non-interline flights commonly create two or more transport contracts; a change to one does not automatically change the other. Carrier conditions govern each ticket. That supports a conservative planning range, not a universal connection-time number."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "When the saving is real",
      "columns": [
        "Situation",
        "Default view",
        "Why"
      ],
      "rows": [
        [
          "Same airport, carry-on, flexible next day",
          "May be defensible.",
          "Fewer failure steps and lower exposed value."
        ],
        [
          "Checked bag or terminal uncertainty",
          "Needs a wide buffer.",
          "Collection, recheck and cutoff rules add dependencies."
        ],
        [
          "Different airport or final international flight",
          "Prefer overnight or protected ticket.",
          "Road traffic and a high loss ceiling make recovery weak."
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "Never borrow an airline's minimum connection time",
      "body": "A published minimum may apply to a protected itinerary and specific terminal flow. It is not evidence that two separate tickets are safe."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "Run the self-transfer test"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "Confirm whether the flights share one ticket number and itinerary.",
        "Map baggage collection, entry rules, terminals and airport changes.",
        "Add the value of every booking that fails with flight two.",
        "Find the last acceptable recovery flight, not only the planned one.",
        "Choose an overnight when the loss ceiling exceeds the saving."
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "What to cut"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "Cut the self-transfer before cutting the international-departure buffer. A modest fare saving does not justify putting the whole trip behind one unprotected arrival."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "No universal safe buffer",
      "body": "The range depends on airport, baggage, passport, terminal, carrier and date. This page does not read live flights or issue legal advice."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "Want the exposure checked?",
      "body": "Leave dates, travellers, approximate budget, airports, baggage and ticket screenshots with personal details removed."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "Protect the last night before departure",
          "href": "/guides/china-last-night-before-international-flight/",
          "description": "Avoid making the self-transfer the final single point of failure."
        },
        {
          "label": "Check the exact Shanghai airport",
          "href": "/guides/shanghai-pudong-or-hongqiao-airport/",
          "description": "An airport change is not a connection."
        },
        {
          "label": "Compare flight fare bundles",
          "href": "/guides/china-domestic-flight-fare-bundle-baggage/",
          "description": "Price baggage and change conditions before declaring a ticket cheap."
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
          "label": "Public air passenger service rules",
          "url": "https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202103/t20210315_206814.html",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
