import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "활자는 등장하자마자 목판을 쓸모없게 만들지 않았습니다. 판각·선자, 조판, 교정, 인쇄, 보관, 재인쇄의 작업 흐름을 비교해야 합니다."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "승자보다 작업 비교",
      "body": "목판은 안정된 한 페이지를 반복 인쇄하고 활자는 문자를 재조합하지만 큰 활자고와 정교한 조판이 필요합니다.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "승자보다 작업 비교",
      "columns": [
        "결정",
        "목판",
        "활자"
      ],
      "rows": [
        [
          "준비",
          "한 면 판각",
          "글자 선별·조판"
        ],
        [
          "교정",
          "파내거나 재각",
          "활자 교체·재조판"
        ],
        [
          "보관",
          "면 단위 판 보관",
          "활자 분류 보관"
        ],
        [
          "재인쇄",
          "같은 판 재사용",
          "해판 후 재조판"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "실물 판목이나 활자함을 찾습니다.",
        "원품·복제품·시연품을 구분합니다.",
        "텍스트에서 인쇄물까지 순서를 봅니다.",
        "어떤 책과 기록을 위한 것인지 묻습니다.",
        "단순 대체 연표를 만들지 않습니다."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "살아 있는 전승과 전체 역사는 다릅니다",
      "body": "UNESCO의 루이안 목활자는 현재의 족보 인쇄 전승이며 역사상 모든 작업장의 도구와 순서를 증명하지 않습니다.",
      "tone": "warning"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "날짜와 장소를 보내면 현지 담당자가 현재 운영·전시·프로그램을 확인합니다.",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "여행 이어가기",
      "items": [
        {
          "label": "광저우 아침 차 이해",
          "href": "/ko/guides/how-guangzhou-morning-tea-works/"
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
          "label": "Wooden movable type printing of China",
          "url": "https://ich.unesco.org/en/usl/wooden-movable-type-printing-of-china-00322",
          "publisher": "UNESCO Intangible Cultural Heritage",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "China Printing Museum introduction",
          "url": "https://english.visitbeijing.com.cn/article/47OMvX0dE0F",
          "publisher": "Beijing Municipal Culture and Tourism Bureau",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: wooden movable types by Popolon, CC BY-SA 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Beijing_printing_museum.wooden_movable_types.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

