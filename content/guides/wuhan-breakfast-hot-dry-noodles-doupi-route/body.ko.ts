import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "‘궈짜오’는 우한의 일상적인 아침 방식이지 유명 간식을 한 번에 전부 먹는 과제가 아닙니다. 주식 하나, 나눌 곁들임 하나, 음료로 시작하세요."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "아침의 구조부터 고르기",
      "body": "러간몐은 참깨장 비빔면, 싼셴더우피는 콩·달걀 피와 찹쌀 소, 몐워는 쌀·콩 반죽 튀김입니다. 두 명이면 주식 하나씩과 추가 한 가지만 나눕니다.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "아침의 구조부터 고르기",
      "columns": [
        "음식",
        "역할",
        "질문"
      ],
      "rows": [
        [
          "러간몐",
          "주식 면",
          "바로 비비고 고추 확인"
        ],
        [
          "싼셴더우피",
          "묵직한 공유 음식",
          "가능하면 소량"
        ],
        [
          "몐워",
          "튀긴 대비",
          "갓 튀긴 것 하나"
        ],
        [
          "음료·맑은 국",
          "완충",
          "당 첨가 확인"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "아침에 가되 매진을 예상합니다.",
        "사진보다 음식명과 수량을 가리킵니다.",
        "고추 가능 여부를 말합니다.",
        "나눠 먹고 추가 주문합니다.",
        "가게명을 저장하고 결제 대안을 둡니다."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "공통 마감 시간은 없습니다",
      "body": "영업과 매진 시간은 가게와 날짜마다 다르며 지도 표시는 단서일 뿐입니다.",
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
          "label": "Wuhan breakfast culture",
          "url": "https://english.wuhan.gov.cn/H_1/NWP/202601/t20260128_2719906.shtml",
          "publisher": "Wuhan Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Wuhan food introduction",
          "url": "https://english.wuhan.gov.cn/H_1/NWP/202309/t20230921_2268292.shtml",
          "publisher": "Wuhan Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Hot Dry Noodles by ZhengZhou, CC BY-SA 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Hot_Dry_Noodles.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

