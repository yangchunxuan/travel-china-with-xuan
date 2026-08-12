import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "Nanhai No. 1 is a shipwreck site, an assemblage of cargo and life aboard, and a continuing conservation project. A treasure count hides the relationships that make it historical evidence."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "Read relationships, not a number",
      "body": "Connect discovery and whole-caisson salvage with hull position, cargo groups, personal objects and conservation. Date any published count.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "Read relationships, not a number",
      "columns": [
        "Layer",
        "Ask",
        "Do not infer"
      ],
      "rows": [
        [
          "Ship",
          "What hull and spatial evidence survives?",
          "A complete ship frozen in time"
        ],
        [
          "Cargo",
          "Which ceramics, metals and goods occur together?",
          "Every object had the same destination"
        ],
        [
          "People",
          "What personal and working objects remain?",
          "Names or identities without evidence"
        ],
        [
          "Conservation",
          "What is exposed, treated or monitored now?",
          "Condition is permanent"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Read the museum's current exhibition notice.",
        "Locate the ship and conservation space.",
        "Compare cargo by position, not beauty.",
        "Separate trade goods from equipment and personal items.",
        "Check the date attached to any total."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "Conservation is dynamic",
      "body": "Excavation, desalination, stabilization, research and display decisions evolve. A 2019 collection figure is historical, not an automatic current total.",
      "tone": "warning"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "Send the date and place. A local human can check current access, displays or programmes without promising unverified conditions.",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "How Guangzhou morning tea works",
          "href": "/guides/how-guangzhou-morning-tea-works/"
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
          "label": "Nanhai No. 1 Maritime Silk Road Museum",
          "url": "https://www.yangjiang.gov.cn/yjsywb/tourism/nanhaino1maritimesilkroadmuseum/",
          "publisher": "Yangjiang Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Nanhai No. 1 exhibition and research",
          "url": "https://www.gdmuseum.com/cn/col48/15353",
          "publisher": "Guangdong Museum",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Maritime Silk Road Museum by WKDx417, CC BY-SA 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Maritime_Silk_Road_Museum_of_Guangdong.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

