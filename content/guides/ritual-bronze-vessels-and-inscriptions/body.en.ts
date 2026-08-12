import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "A ritual bronze is not just an ornate container. Form, handles, feet, decoration, casting and inscription can point to service, ceremony, lineage memory and events—but only when labels and scholarship support the link."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "Use four passes",
      "body": "Name the form, infer its likely task, map decoration, then read the institution's inscription translation. Visual resemblance cannot replace provenance or palaeography.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "Use four passes",
      "columns": [
        "Pass",
        "Question",
        "Limit"
      ],
      "rows": [
        [
          "Form",
          "Ding, gui, jue, zun or another family?",
          "Individual date and use still vary"
        ],
        [
          "Function",
          "Food, liquid, heating or presentation?",
          "Ritual and burial use may overlap"
        ],
        [
          "Decoration",
          "Where are masks, animals and flanges?",
          "Modern motif names are not ancient explanations"
        ],
        [
          "Inscription",
          "Where is it and what is translated?",
          "Clan marks and long records are different evidence"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Read the full label and date range.",
        "Walk around if permitted.",
        "Find openings, handles and feet before decoration.",
        "Compare the rubbing with the translation.",
        "Contrast one different vessel form."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "A beautiful surface is not provenance",
      "body": "Auction captions and unverified posts cannot establish excavation context, authenticity or inscription reading.",
      "tone": "warning"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "Share the places you plan to visit. A local human can connect current displays and visible evidence without inventing certainty.",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "Read more heritage",
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
          "label": "Ancient Chinese bronzes",
          "url": "https://www.shanghaimuseum.cn/mu/frontend/pg/article/id/RI00004046",
          "publisher": "Shanghai Museum",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Bronze civilization exhibition",
          "url": "https://en.chnmuseum.cn/exhibition/traveling_exhibitions/202112/t20211230_253354.html",
          "publisher": "National Museum of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Early Western Zhou Bronze Gui by Gary Todd, CC0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Early_Western_Zhou_Bronze_Gui_(47409866492).jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

