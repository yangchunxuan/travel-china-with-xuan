import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "Do not use “sealed,” “cooked,” “vacuum-packed” or “for personal use” as shortcuts. China applies quarantine controls to animals, plants and related products. Meat, many dairy and egg products, fresh produce, seeds, plants and soil appear in prohibited or controlled categories; exact exceptions and permits must be checked item by item."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "A packing screen",
      "columns": [
        "Situation",
        "Route",
        "Action"
      ],
      "rows": [
        [
          "Meat or meat product",
          "Usually leave it out",
          "The official prohibited list covers raw and cooked meat and organs."
        ],
        [
          "Milk, dairy or eggs",
          "Check the exact category",
          "Many products are listed; infant or special-use exceptions are narrow and conditional."
        ],
        [
          "Fresh fruit, vegetables, seeds, plants or soil",
          "Leave out unless clearly permitted",
          "Plant quarantine risk applies even to gifts and small amounts."
        ],
        [
          "Shelf-stable packaged snack",
          "Still check ingredients",
          "A sealed packet can contain meat, dairy, egg, seeds or other controlled material."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "Read ingredients, not the front label"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "Jerky, sausages, meat floss, stock cubes and filled pastries can still be meat products.",
        "Cheese, milk powder, yoghurt cultures and egg-containing products do not all share one rule. Use the current list and any stated exception rather than guessing.",
        "Fresh fruit from an airline lounge, hotel or previous country remains fresh fruit at the border.",
        "Seeds, bulbs, cuttings, living plants, growing media and soil are quarantine-sensitive even when sold as souvenirs.",
        "Pet travel is a separate formal process; do not infer pet rules from the general baggage list."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "Pack with a discard-before-departure rule"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Photograph the ingredient and origin labels of anything uncertain.",
        "Search the official prohibited list and Customs guidance for the exact ingredient and product form.",
        "Obtain any required quarantine certificate or permit before travel; an airport conversation cannot replace advance authorization.",
        "Keep acceptable products accessible and in original labelled packaging.",
        "Declare controlled or uncertain items and follow the officer's direction. If surrender is offered, use the official process."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "If the item is a gift or culturally important",
      "body": "Sentimental or expensive does not change quarantine status. Ask the sender for the full ingredient list and scientific or commercial product name, then contact Customs before travel. If proof is incomplete, ship only through a lawful specialist channel or leave the item behind.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "Scope and live-rule boundary",
      "body": "Disease controls and country-of-origin restrictions can change quickly. This is a screening guide, not a definitive clearance list. Check the current Customs list, origin-specific notices and permit rules during the week of travel.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "China customs channels",
          "href": "/guides/china-customs-red-green-channels/",
          "description": "Declare controlled or uncertain baggage."
        },
        {
          "label": "China entry requirements",
          "href": "/guides/china-entry-requirements/",
          "description": "Keep quarantine separate from immigration."
        },
        {
          "label": "Power bank transport rules",
          "href": "/guides/china-power-bank-rules-flights-trains/",
          "description": "Finish the rest of the carry-on check."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources reviewed",
      "items": [
        {
          "label": "Customs FAQ: prohibited animals, plants and products",
          "url": "https://online.customs.gov.cn/ociswebserver/pages/jcjybcx/question.html",
          "publisher": "General Administration of Customs",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "List of animals, plants and products prohibited from being carried or mailed into China",
          "url": "https://www.moa.gov.cn/nybgb/2022/202202/202204/P020220401365957599038.pdf",
          "publisher": "Ministry of Agriculture and Rural Affairs / General Administration of Customs",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Customs Announcement No. 43 of 2025",
          "url": "https://app.www.gov.cn/govdata/gov/202504/05/526129/article.html",
          "publisher": "General Administration of Customs",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
