import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "The Liye Qin slips make empire visible at county level: documents move, grain is counted and officials report. Their routine nature is their strength, but one archive cannot represent every Qin place or year."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "Read the archive before the empire",
      "body": "Identify document type, sender, recipient and action in Qianling County, then ask what practice it reveals before scaling up.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "Read the archive before the empire",
      "columns": [
        "Clue",
        "Action",
        "Limit"
      ],
      "rows": [
        [
          "Dispatch marks",
          "Track delivery",
          "One route is not the whole network"
        ],
        [
          "Accounts",
          "Count grain or goods",
          "Figures may be partial"
        ],
        [
          "Titles and places",
          "Show institutional relations",
          "Titles change"
        ],
        [
          "Corrections",
          "Show working paperwork",
          "One clerk is not every clerk"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Copy the museum object name and number.",
        "Use the institutional transcription.",
        "Find date, place, office and verb.",
        "State the narrow action.",
        "Add: at this place and time."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "The filename is not the scholarship",
      "body": "The hero filename says “Qing”, but Commons categorization and the display identify Liye Qin slips. The article follows institutional identification.",
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
          "label": "Story of a Small Town: Qin bamboo slips from Liye",
          "url": "https://en.chnmuseum.cn/exhibition/traveling_exhibitions/202104/t20210429_249982.html",
          "publisher": "National Museum of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Liye Qin Slips Museum context",
          "url": "https://www.enghunan.gov.cn/hneng/Services/Live/Community/LMEH/202510/t20251030_33836965.html",
          "publisher": "Hunan Provincial Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Liye Qin Slips by Ddayzzz, CC BY 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Liye_Qing_Slips,_containing_%22A_set_of_envelopes_were_delivered_from_Dongting_Commandery_to_Qianling_county%22.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

