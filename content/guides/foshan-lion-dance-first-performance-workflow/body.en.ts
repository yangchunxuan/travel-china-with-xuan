import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "A famous Foshan venue does not guarantee a show. Programmes change, outdoor performances depend on conditions, and high poles are only one form."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "Verify before crossing the city",
      "body": "Confirm venue, date, session, admission and weather policy on an official channel. Old videos prove a past show, not today's schedule.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "Verify before crossing the city",
      "columns": [
        "Check",
        "Why",
        "Recovery"
      ],
      "rows": [
        [
          "Venue",
          "Zumiao, memorial halls and schools differ",
          "Ask the official desk"
        ],
        [
          "Format",
          "Ground, parade and poles need different space",
          "Accept a changed programme"
        ],
        [
          "Weather",
          "Wet or windy conditions affect apparatus",
          "Keep a museum alternative"
        ],
        [
          "Viewpoint",
          "Front rows may hide the pole line",
          "See performers and musicians"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Find the head and rear performers under one costume.",
        "Watch eye, mouth and head movements.",
        "Match drum, gong and cymbal cues to pauses and landings.",
        "On poles, watch distance testing and weight transfer.",
        "Stay outside barriers."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "High poles are not a visitor activity",
      "body": "Pole height, spacing and safety belong to trained teams. This guide explains viewing, not imitation.",
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
          "label": "Lion dance (Guangdong awakening lion)",
          "url": "https://www.ihchina.cn/project_details/12870",
          "publisher": "China Intangible Cultural Heritage",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Foshan Ancestral Temple Museum",
          "url": "https://www.fszumiao.cn/",
          "publisher": "Foshan Ancestral Temple Museum",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Foshan lion-dance show by Lukwo RuoShuma Simonz, CC BY-SA 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:GD_%E5%BB%A3%E6%9D%B1_Guangdong_FS_%E4%BD%9B%E5%B1%B1_Foshan_%E5%8D%97%E6%B5%B7%E5%8D%80_Nanhai_%E8%A5%BF%E6%A8%B5%E5%B1%B1_Xiqiao_Mountain_%E9%BB%83%E9%A3%9B%E9%B4%BB%E7%8D%85%E8%97%9D%E6%AD%A6%E8%A1%93%E9%A4%A8_Wong_Fei-hong_Lion_Dance_%26_Martial_Arts_School_%E6%93%8D%E5%A0%B4_playground_square_red_%E8%A1%A8%E6%BC%94_show_time_June_2023_Px3_26.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

