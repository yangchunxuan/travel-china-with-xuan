import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "Choose the red channel if you carry anything that must be declared—or if you are unsure. Choose green only when you have no declarable goods. China Customs' 2025 rules allow a paper or electronic passenger declaration where required; selecting green is itself a statement that your baggage contains nothing declarable."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "The channel test",
      "columns": [
        "Situation",
        "Route",
        "Action"
      ],
      "rows": [
        [
          "Restricted or controlled item",
          "Red",
          "Declare before inspection, even if the item is for personal use."
        ],
        [
          "Animal, plant or related product",
          "Red / quarantine review",
          "Do not assume packaged, cooked or vacuum-sealed means permitted."
        ],
        [
          "Currency, commercial goods or excess quantity",
          "Red",
          "Limits and permits depend on the item and journey."
        ],
        [
          "Ordinary personal effects with nothing declarable",
          "Green",
          "Keep receipts or explanations available if officers ask."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "Before you reach the signs"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "Complete the passenger baggage declaration when a listed category applies. The current rule covers prohibited or restricted articles, animals and plants and their products, specified currency or securities, commercial goods and other declarable baggage.",
        "Keep medicines in original packaging with a prescription or doctor's letter where appropriate. Controlled medicines and large quantities require item-specific checking.",
        "Do not split goods between companions to hide quantity or value. Customs can inspect green-channel baggage.",
        "If the electronic form, signage and your interpretation conflict, ask a customs officer before choosing a channel."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "A five-minute arrival check"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Make one list of food, medicines, cash, high-value equipment, gifts and items for another person.",
        "Match each item against the current Customs and quarantine lists for your port and travel direction.",
        "Save permits, prescriptions, invoices and product labels offline.",
        "If any item is declarable or uncertain, complete the declaration and take the red channel.",
        "Answer questions accurately and keep the customs receipt for any temporarily admitted, taxed, surrendered or detained item."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "If you already chose green and remember an item",
      "body": "Stop before leaving the controlled area and tell an officer. Voluntary clarification is safer than concealing or discarding an item. If an article is detained, ask for written documentation and the official next step; do not pay an unofficial intermediary.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "Scope and live-rule boundary",
      "body": "Allowances and restricted-item lists can change and are item-specific. This guide does not provide universal value, alcohol, tobacco, medicine or currency limits. Check China Customs' current declaration form and the rule for the exact item in the week of travel.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "Food and animal products into China",
          "href": "/guides/food-plants-animal-products-into-china/",
          "description": "Run the quarantine check before packing."
        },
        {
          "label": "China entry requirements",
          "href": "/guides/china-entry-requirements/",
          "description": "Keep immigration and customs tasks separate."
        },
        {
          "label": "Power bank rules",
          "href": "/guides/china-power-bank-rules-flights-trains/",
          "description": "Check transport safety limits after customs."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources reviewed",
      "items": [
        {
          "label": "Customs Announcement No. 43 of 2025",
          "url": "https://app.www.gov.cn/govdata/gov/202504/05/526129/article.html",
          "publisher": "General Administration of Customs / State Council",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Customs clearance guide",
          "url": "https://english.customs.gov.cn/statics/88707c1e-aa4e-40ca-a968-bdbdbb565e4f.html",
          "publisher": "General Administration of Customs",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Red and green baggage channels",
          "url": "https://english.customs.gov.cn/statics/3a12c746-51e1-4d94-8fc1-44a573fad090.html",
          "publisher": "General Administration of Customs",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
