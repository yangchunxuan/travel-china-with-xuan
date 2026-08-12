import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "A Hongshan jade object is easiest to misunderstand when its silhouette is treated as a complete explanation. Shape matters, but excavation place, burial position, associated objects and the museum's degree of certainty matter more."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "Read from evidence outward",
      "body": "Begin with the label and provenance, then describe material and form, then ask what the archaeological context supports. Leave modern names such as “pig-dragon” and broad symbolism until the end.",
      "tone": "decision"
    },
    {
      "id": "passes-heading",
      "type": "heading",
      "level": 2,
      "text": "Four passes around one object"
    },
    {
      "id": "passes",
      "type": "table",
      "caption": "Four passes around one object",
      "columns": [
        "Pass",
        "Look for",
        "What it supports"
      ],
      "rows": [
        [
          "Identity",
          "Museum name, date range, findspot, collection number",
          "Which object and attribution the institution presents"
        ],
        [
          "Form",
          "Opening, curve, suspension hole, edge and polish",
          "How the object was made to be seen or suspended"
        ],
        [
          "Context",
          "Tomb, body position and associated finds",
          "A bounded claim about deposition and social difference"
        ],
        [
          "Comparison",
          "Similar securely excavated pieces",
          "A pattern, not one fixed meaning"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Record the complete label before zooming in.",
        "Mark whether it was excavated, acquired, donated or lacks a findspot.",
        "Describe only what is visible before reading interpretation.",
        "Compare objects from different contexts.",
        "Keep unanswered questions."
      ]
    },
    {
      "id": "status",
      "type": "callout",
      "title": "Tentative List is not inscription",
      "body": "The UNESCO page is China's 2013 World Heritage Tentative List submission. It is not a World Heritage inscription, and its value argument remains the submitting State Party's case.",
      "tone": "warning"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "Tell Homeground which museum and archaeological interests matter. A local human can build a route around current labelled objects without inventing certainty.",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "Continue reading China carefully",
      "items": [
        {
          "label": "Read a Suzhou garden",
          "href": "/guides/how-to-read-a-suzhou-garden/"
        },
        {
          "label": "Visit the Terracotta Army independently",
          "href": "/guides/terracotta-warriors-without-tour/"
        },
        {
          "label": "Do you need a guide in China?",
          "href": "/guides/do-you-need-a-tour-guide-in-china/"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Institutional sources and image credit",
      "items": [
        {
          "label": "Sites of Hongshan Culture tentative-list entry",
          "url": "https://whc.unesco.org/en/tentativelists/5804/",
          "publisher": "UNESCO World Heritage Centre",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hongshan culture exhibition",
          "url": "https://en.chnmuseum.cn/exhibition/exhibition_series/temporary_exhibitions/selected_historical_artifacts_exhibitions/202010/t20201016_247873.html",
          "publisher": "National Museum of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Hongshan Jade Dragon 2 by Gary Todd, CC0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Hongshan_Jade_Dragon_2.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

