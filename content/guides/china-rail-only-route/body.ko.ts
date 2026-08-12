import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "철도가 실제로 가치 있는 장소를 잇는 중심축일 때만 철도 전용 여행이 성립합니다. 구호에 맞추려고 모든 목적지를 억지로 넣지 마세요. 숙소 문에서 다음 숙소 문까지 검사해야 합니다. 역이 있어도 긴 도로 이동이 남을 수 있고, 동선 끝의 항공편 하나가 온전한 하루를 살릴 수 있습니다."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "세 가지 검사",
      "columns": [
        {
          "heading": "중심축",
          "body": "다음 핵심 장소가 앞으로 이어지는 철도 회랑에 있습니다."
        },
        {
          "heading": "낮 시간",
          "body": "전체 이동 블록이 지키려던 관광 시간을 먹지 않습니다."
        },
        {
          "heading": "마지막 구간",
          "body": "역 접근과 도로 이동이 일행과 짐에 적합합니다."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "공식 좌석은 날짜별로 확인해야 합니다"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "12306은 현재 열차와 규정을 확인하는 공식 서비스입니다. 노선도는 인프라만 증명하며 특정 날짜의 편한 출발, 좌석, 역 조합을 보장하지 않습니다. 개념 동선을 만든 뒤 실제 판매 기간에 각 구간을 검증하세요."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "철도 원칙 유지 또는 예외",
      "columns": [
        "상황",
        "결정",
        "이유"
      ],
      "rows": [
        [
          "한 회랑의 주요 도시",
          "철도를 중심축으로 유지.",
          "도심 도착과 적은 공항 절차가 유리할 수 있습니다."
        ],
        [
          "철도 관문 뒤 외곽 명소",
          "도로 마지막 구간 허용.",
          "철도는 명소 입구까지 가지 않습니다."
        ],
        [
          "긴 대륙 횡단",
          "항공편 하나 비교.",
          "순수성 때문에 온전한 하루를 잃을 수 있습니다."
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "철도 전용은 환승 없음이 아닙니다",
      "body": "역은 숙소와 멀 수 있고 한 도시에 여러 역이 있으며 명소까지 버스나 차가 필요할 수 있습니다. 모두 계산하세요."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "철도 동선 설계"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "지킬 이유가 있는 장소만 적습니다.",
        "관문 사이에 한 방향 철도 축을 그립니다.",
        "숙소와 역 사이 시간을 더합니다.",
        "도로만 가능한 구간과 일행 제한을 표시합니다.",
        "온전한 시간을 살리는 곳에서는 철도 원칙을 깹니다."
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "먼저 뺄 것"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "약한 목적 하나를 위해 긴 왕복이 필요한 가지를 뺍니다. 멀리 있는 점을 지키려고 핵심 도시를 모두 압축하지 마세요."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "실시간 열차 일정은 아닙니다",
      "body": "열차 선택, 좌석 보장, 도시별 일정을 제공하지 않습니다. 날짜와 12306 확인이 필요합니다."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "철도 중심축을 검토받고 싶나요?",
      "body": "날짜, 인원, 대략적인 예산과 후보 도시를 남겨 주세요."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "다음 계획",
      "items": [
        {
          "label": "중국 고속철도 첫 이용",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "동선이 철도 검사를 통과한 뒤 승차 절차를 확인하세요."
        },
        {
          "label": "야간열차와 주간 고속철도 비교",
          "href": "/guides/china-night-train-or-daytime-high-speed-rail/",
          "description": "수면과 관광일 중 무엇을 지킬지 정하세요."
        },
        {
          "label": "동선 양끝 항공편 검토",
          "href": "/guides/china-open-jaw-flights-route-planning/",
          "description": "오픈조 관문은 철도 축의 왕복을 줄일 수 있습니다."
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
