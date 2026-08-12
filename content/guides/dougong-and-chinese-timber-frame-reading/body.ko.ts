import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "두공은 많은 중국 목조건축에서 기둥과 지붕 사이에 층층이 짜인 공포입니다. 전체 골조의 한 부분이지 장식 로고나 모든 옛 건물을 완전 내진으로 만드는 장치가 아닙니다."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "하중의 길을 따라가기",
      "body": "멀리서 기둥 격자를 찾고 보, 두공, 도리, 지붕으로 시선을 올립니다. 가까이에서 이음을 보되 채색 부재가 같은 하중을 받는다고 보지 않습니다.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "하중의 길을 따라가기",
      "columns": [
        "부재",
        "질문",
        "단정 금지"
      ],
      "rows": [
        [
          "기단·기둥",
          "칸 격자가 어디서 시작하나?",
          "벽이 전체 하중을 받음"
        ],
        [
          "보·인방",
          "무엇이 기둥을 잇나?",
          "모든 보가 원재임"
        ],
        [
          "두공",
          "어떻게 돌출·전달하나?",
          "시대가 달라도 기능이 같음"
        ],
        [
          "도리·서까래",
          "지붕을 무엇이 받치나?",
          "두공만 지탱함"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "건립·수리 안내를 읽습니다.",
        "전체 입면을 찍습니다.",
        "모서리 하나를 위로 추적합니다.",
        "중앙과 모서리를 비교합니다.",
        "원재·수리·복원을 묻습니다."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "내진성에는 경계가 필요합니다",
      "body": "유연한 맞춤 목구조가 회복력에 기여할 수 있지만 특정 건물의 현재 안전이나 두공만의 효과를 증명하지 않습니다.",
      "tone": "warning"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "방문 장소를 Homeground에 보내면 현지 담당자가 현재 전시와 보이는 증거를 연결합니다.",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "건축유산 계속 읽기",
      "items": [
        {
          "label": "쑤저우 정원 읽기",
          "href": "/ko/guides/how-to-read-a-suzhou-garden/"
        },
        {
          "label": "병마용 자유 관람",
          "href": "/ko/guides/terracotta-warriors-without-tour/"
        },
        {
          "label": "중국 여행에 가이드가 필요할까",
          "href": "/ko/guides/do-you-need-a-tour-guide-in-china/"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "기관 자료와 이미지 크레디트",
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

