import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "A useful Zhoucheng workshop is defined by the process you actually complete, not only by a photogenic blue pattern. Ask who does each step, what dye is used and when the cloth is ready."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "Choose the process",
      "body": "A meaningful sequence includes designing, stitching or binding resist areas, dyeing, exposure to air, rinsing and opening the ties. Short sessions may pre-prepare or skip stages; that is acceptable when disclosed.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "Choose the process",
      "columns": [
        "Check",
        "Good question",
        "Why"
      ],
      "rows": [
        [
          "Participation",
          "Which steps do I do myself?",
          "Separates demonstration from making"
        ],
        [
          "Dye",
          "Natural indigo, synthetic dye or a mix?",
          "Do not infer material from blue colour"
        ],
        [
          "Cycles",
          "How many dips and oxidations fit?",
          "Depth changes with process"
        ],
        [
          "Collection",
          "Can it be rinsed and dried today?",
          "Protects the onward schedule"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Confirm duration and final pickup before paying.",
        "Choose a cloth size you can finish.",
        "Photograph the bound state before dyeing.",
        "Follow gloves and vat rules.",
        "Ask how to wash the finished cloth."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "Tradition does not guarantee one recipe",
      "body": "Bai tie-dye is a documented heritage practice, but workshops, dyestuffs, motifs and visitor formats vary. Do not rank authenticity from décor alone.",
      "tone": "warning"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "Share the date, group and constraints. A local human can help verify a practical food or craft plan without turning one venue into a national rule.",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "Your first shared meal",
          "href": "/guides/first-shared-meal-in-china/"
        },
        {
          "label": "How to pay in China",
          "href": "/guides/how-to-pay-in-china-as-a-tourist/"
        },
        {
          "label": "Is your itinerary too rushed?",
          "href": "/guides/is-your-china-itinerary-too-rushed/"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources and image credit",
      "items": [
        {
          "label": "Bai tie-dye technique",
          "url": "https://www.ihchina.cn/project_details/14304.html",
          "publisher": "China Intangible Cultural Heritage",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Bai tie-dye context",
          "url": "https://www.ynich.cn/item/91.html",
          "publisher": "Yunnan Intangible Cultural Heritage Protection Centre",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero still: China News Service Zhoucheng tie-dye video, CC BY 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:2020%E5%B9%B45%E6%9C%885%E6%97%A5_%E6%9C%80%E7%88%B1%E5%A4%A7%E7%90%86%E7%9A%84%E9%82%A3%E2%80%9C%E4%B8%80%E6%8A%B9%E8%93%9D%E2%80%9D_%E6%9D%A5%E7%9C%8B%E7%99%BD%E6%97%8F%E6%89%8E%E6%9F%93%E5%A6%82%E4%BD%95%E5%88%B6%E6%88%90.webm",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

