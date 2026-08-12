import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "청동 예기는 화려한 그릇에 그치지 않습니다. 형태, 손잡이, 다리, 문양, 주조, 명문은 의례와 계보 기억을 가리킬 수 있지만 라벨과 연구가 뒷받침해야 합니다."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "네 번에 나누어 읽기",
      "body": "기형, 추정 기능, 문양 배치, 기관의 명문 번역 순서로 봅니다. 닮은 모양은 출처와 고문자 연구를 대신하지 못합니다.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "네 번에 나누어 읽기",
      "columns": [
        "단계",
        "질문",
        "한계"
      ],
      "rows": [
        [
          "형태",
          "정·궤·작·준 중 무엇인가?",
          "개별 연대와 쓰임은 다름"
        ],
        [
          "기능",
          "음식·액체·가열·진설 중 무엇인가?",
          "의례·부장 용도가 겹칠 수 있음"
        ],
        [
          "문양",
          "수면·동물·돌출부가 어디 있나?",
          "현대 명칭은 고대 설명이 아님"
        ],
        [
          "명문",
          "어디에 있고 번역은 무엇인가?",
          "씨족표지와 긴 기록은 다른 증거"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "라벨과 연대를 끝까지 읽습니다.",
        "허용되면 여러 각도에서 봅니다.",
        "문양보다 입구·손잡이·다리를 먼저 찾습니다.",
        "탁본과 번역을 대조합니다.",
        "다른 기형 한 점과 비교합니다."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "아름다운 표면은 출처가 아닙니다",
      "body": "경매 설명과 검증되지 않은 게시물은 출토 맥락, 진위, 명문 판독을 입증하지 못합니다.",
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
      "title": "문화유산 계속 읽기",
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

