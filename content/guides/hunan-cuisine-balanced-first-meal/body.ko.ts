import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "후난 요리는 매운맛으로 소개되지만 첫 공동 식사는 생고추, 신맛과 절임, 훈연, 찜, 채소가 대비될 때 더 좋습니다."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "고추 열 가지보다 대비 주문",
      "body": "3~4명이면 대표 단백질 하나, 찜·조림 하나, 채소·두부 하나와 밥으로 시작하고 모두 원할 때 훈연·신맛 요리를 더합니다.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "고추 열 가지보다 대비 주문",
      "columns": [
        "자리",
        "방향",
        "균형 질문"
      ],
      "rows": [
        [
          "생고추 매움",
          "고추 고기·생선",
          "한 요리만 주된 매움을 맡을까?"
        ],
        [
          "신맛·절임",
          "절임 고추·채소",
          "짠맛도 강한가?"
        ],
        [
          "훈연·절임육",
          "훈연 고기",
          "가벼운 요리와 조합"
        ],
        [
          "완충",
          "계란찜·두부·채소",
          "고추를 줄일 수 있나?"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "매운맛을 못 먹는 사람을 분명히 말합니다.",
        "微辣·少放辣椒·完全不辣를 쓰되 주방 차이를 예상합니다.",
        "알레르기는 별도로 말하며 안 매움이 알레르기 대응은 아닙니다.",
        "첫 주문에 밥과 채소를 넣습니다.",
        "모두 맛본 뒤 추가합니다."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "모든 후난 음식이 같은 맵기는 아닙니다",
      "body": "지역, 가정, 식당, 조리자마다 다릅니다. 덜 맵게는 무고추·기름 접촉 없음·알레르기 분리를 보장하지 않습니다.",
      "tone": "warning"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "날짜, 인원, 제한을 보내면 현지 담당자가 한 장소를 전국 규칙으로 만들지 않고 실용 계획을 확인합니다.",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "여행 이어가기",
      "items": [
        {
          "label": "중국의 첫 공동 식사",
          "href": "/ko/guides/first-shared-meal-in-china/"
        },
        {
          "label": "중국 여행 결제",
          "href": "/ko/guides/how-to-pay-in-china-as-a-tourist/"
        },
        {
          "label": "일정이 너무 바쁜가",
          "href": "/ko/guides/is-your-china-itinerary-too-rushed/"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "공식 자료와 이미지 크레디트",
      "items": [
        {
          "label": "Hunan cuisine traditions",
          "url": "https://hunan.gov.cn/topic/ccjhl/djz/202107/t20210716_19935053.html",
          "publisher": "Hunan Provincial Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hunan delicacies and methods",
          "url": "https://whhlyt.hunan.gov.cn/whhlyt/english/Culture/Delicacies/202403/t20240315_33249620.html",
          "publisher": "Hunan Provincial Department of Culture and Tourism",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Hunan home-style fried tofu by Huangdan2060, CC BY 3.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Hunan_cuisine,_Fried_Tofu,_Home_Style.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

