import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "좋은 저우청 공방은 예쁜 파란 무늬보다 직접 완성하는 과정으로 판단합니다. 누가 각 단계를 하고 어떤 염료를 쓰며 언제 천을 받는지 물으세요."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "무늬보다 과정 선택",
      "body": "설계, 봉제·묶기 방염, 염색, 공기 산화, 세척, 풀기가 핵심입니다. 짧은 체험은 일부를 준비하거나 생략할 수 있으나 미리 밝혀야 합니다.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "무늬보다 과정 선택",
      "columns": [
        "확인",
        "질문",
        "이유"
      ],
      "rows": [
        [
          "참여",
          "내가 직접 하는 단계는?",
          "시연과 제작 구분"
        ],
        [
          "염료",
          "천연 쪽·합성·혼합인가?",
          "파란색만으로 재료 추정 금지"
        ],
        [
          "횟수",
          "침염·산화를 몇 번 하나?",
          "색 깊이는 과정과 관련"
        ],
        [
          "수령",
          "오늘 세척·건조 가능한가?",
          "다음 일정 보호"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "결제 전 시간과 수령을 확인합니다.",
        "완성 가능한 크기를 고릅니다.",
        "염색 전 묶인 상태를 찍습니다.",
        "장갑·염색조 규칙을 따릅니다.",
        "세탁법을 묻습니다."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "전통은 하나의 배합이 아닙니다",
      "body": "바이족 홀치기염색은 기록된 유산이지만 공방, 염료, 무늬, 체험 형식은 다르며 인테리어만으로 진위를 매기지 않습니다.",
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

