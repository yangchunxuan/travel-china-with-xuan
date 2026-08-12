import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "한 숙소가 반드시 느린 것도, 계속 앞으로 가는 것이 반드시 효율적인 것도 아닙니다. 거점형은 짐과 체크인을 줄이지만 역까지 왕복합니다. 다거점형은 지리적 왕복을 줄이는 대신 짐, 체크아웃 공백과 실패 지점을 늘립니다. 문에서 문까지의 전체 블록을 비교하세요."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "세 가지 구조",
      "columns": [
        {
          "heading": "한 거점",
          "body": "방문지가 모여 있고 역 접근이 좋으며 숙소 안정이 중요합니다."
        },
        {
          "heading": "여러 거점",
          "body": "앞으로 이어지는 회랑에서 각 이동이 여러 목표를 가능하게 합니다."
        },
        {
          "heading": "혼합형",
          "body": "안정적인 지역 거점 뒤 다음 회랑으로 한 번 이동합니다."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "전국 공통 당일치기 반경은 없습니다"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "날짜와 역이 정해져야 12306에서 현재 열차를 확인할 수 있습니다. 짧은 열차도 긴 지하철과 외곽 도착이 붙을 수 있습니다. 당일 방문은 킬로미터가 아니라 숙소 출발, 고정 귀환과 실제 관광 시간으로 정의하세요."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "시간이 사라지는 곳",
      "columns": [
        "비용",
        "거점형",
        "다거점형"
      ],
      "rows": [
        [
          "숙소 마찰",
          "낮음",
          "체크아웃과 짐 이동마다 증가"
        ],
        [
          "반복 지상 이동",
          "높을 수 있음",
          "앞으로 이동하면 낮음"
        ],
        [
          "문제 회복",
          "방이 안정적",
          "다음 숙소와 열차가 연쇄 영향"
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "열차 시간만 비교하지 마세요",
      "body": "역 접근, 대기, 도착 이동과 귀환 의무를 더하세요. 40분 열차도 긴 하루가 됩니다."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "구조 선택"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "우선순위를 실제 지리로 묶습니다.",
        "각 왕복을 문에서 문까지 계산합니다.",
        "숙소 이동과 짐을 들 손을 셉니다.",
        "각 거점이 둘 이상의 목적을 여는지 봅니다.",
        "한 번 이동이 여러 왕복을 없애면 혼합형을 씁니다."
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "삭제 규칙"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "약한 목표 하나만 위한 거점이나 긴 역 접근을 반복하는 가지를 제외합니다. 짐을 줄이는 장점과 선형 모양을 동시에 지키려 하지 마세요."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "일정이 아닌 구조",
      "body": "도시, 숙박 수, 당일 방문을 정하지 않습니다. 날짜, 숙소와 현재 교통이 최종 형태를 결정합니다."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "반복 이동을 검토받고 싶나요?",
      "body": "날짜, 인원, 예산, 짐 제한과 후보 거점을 남겨 주세요."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "다음 계획",
      "items": [
        {
          "label": "일정 과부하 확인",
          "href": "/guides/is-your-china-itinerary-too-rushed/",
          "description": "실제 관광일로 최종 구조를 검사하세요."
        },
        {
          "label": "교통이 실제로 편한 숙소",
          "href": "/guides/china-hotel-near-metro/",
          "description": "매일 출발이 쉬워야 거점이 작동합니다."
        },
        {
          "label": "다른 입출국 도시 검토",
          "href": "/guides/china-open-jaw-flights-route-planning/",
          "description": "오픈조 관문은 왕복을 전진형 동선으로 바꿀 수 있습니다."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "검토한 공식 출처",
      "items": [
        {
          "label": "중국 철도 공식 여객 서비스",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
