import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "Dougong is layered bracket work between columns and roof members in many Chinese timber buildings. It is one part of a frame—not a decorative logo or a magic device that makes every old building earthquake-proof."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "Trace a load path",
      "body": "Stand back to find the column grid, then follow columns into beams, bracket sets, purlins and roof. Return close to see joints without assuming every painted block carries the same load.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "Trace a load path",
      "columns": [
        "Member",
        "Ask",
        "Do not assume"
      ],
      "rows": [
        [
          "Platform and column",
          "Where does the bay grid begin?",
          "Walls carry the whole building"
        ],
        [
          "Beam and tie",
          "Which members connect columns?",
          "Every beam is original"
        ],
        [
          "Dougong",
          "How does it project or transfer load?",
          "All periods work identically"
        ],
        [
          "Purlin and rafter",
          "How is the roof carried?",
          "Dougong alone supports it"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Read construction and restoration labels.",
        "Photograph the whole façade.",
        "Trace one corner upward.",
        "Compare a central bay and corner.",
        "Ask what is original, repaired or reconstructed."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "Earthquake resistance needs boundaries",
      "body": "Flexible interlocking timber systems can contribute to resilience. This does not prove a particular building is safe today or that dougong alone creates the effect.",
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
      "title": "Read more built heritage",
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
          "label": "Chinese timber-framed architectural craftsmanship",
          "url": "https://ich.unesco.org/en/RL/chinese-traditional-architectural-craftsmanship-for-timber-framed-structures-00223?RL=00223",
          "publisher": "UNESCO Intangible Cultural Heritage",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Wooden Structures of Liao Dynasty tentative-list entry",
          "url": "https://whc.unesco.org/en/tentativelists/5803/",
          "publisher": "UNESCO World Heritage Centre",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Fogong temple corner dougong by Gisling, CC BY 3.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Fogong_temple_corner_dougong.JPG",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

