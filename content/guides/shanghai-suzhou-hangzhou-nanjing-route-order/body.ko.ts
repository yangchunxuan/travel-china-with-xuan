import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "한쪽 끝으로 들어가 반대쪽으로 나갈 수 있다면 난징–쑤저우–상하이–항저우 또는 역방향이 깔끔합니다. 국제선이 모두 상하이라면 한 숙소가 편할 수 있지만 반복되는 역 이동을 계산해야 합니다. 가장 짧은 열차 구간이 가장 짧은 여행일은 아닙니다."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "먼저 구조를 고르세요",
      "columns": [
        {
          "heading": "일방향 연결",
          "body": "서로 다른 관문이 상하이 복귀를 없앨 때 좋습니다."
        },
        {
          "heading": "상하이 거점",
          "body": "숙소 이동을 줄이는 가치가 역 왕복보다 클 때 좋습니다."
        },
        {
          "heading": "두 거점",
          "body": "한 번만 이동하고 목적 있는 당일 방문 하나를 둡니다."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "역의 위치가 답을 바꿉니다"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "상하이에는 여러 주요 철도역이 있고 열차와 숙소 위치에 따라 맞는 역이 달라집니다. 쑤저우도 철도 도착 지점이 하나가 아닙니다. 지도상 가까워도 시내 이동으로 시간이 줄어드니 열차 시간만 보지 말고 문에서 문까지 계산하세요."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "구조별 숨은 비용",
      "columns": [
        "구조",
        "장점",
        "숨은 비용"
      ],
      "rows": [
        [
          "난징 → 쑤저우 → 상하이 → 항저우",
          "관문이 맞으면 되돌아가지 않습니다.",
          "모든 도시에 숙박하면 세 번 이동합니다."
        ],
        [
          "상하이 거점",
          "한 숙소와 단순한 짐 관리.",
          "반복되는 역 이동과 귀환 열차 제약."
        ],
        [
          "두 거점",
          "짐 안정과 지역 접근의 균형.",
          "기계적인 숙박 분할이 아닌 명확한 경계가 필요합니다."
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "네 개 역 이름을 네 개 관광일로 세지 마세요",
      "body": "열차와 정차역은 달라질 수 있습니다. 12306에서 정확한 출발·도착역을 확인하고 양쪽 숙소 이동을 더하세요."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "다섯 단계 동선 검사"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "실제 상하이 공항과 다른 관문을 고정합니다.",
        "난징과 항저우를 회랑의 양끝에 놓습니다.",
        "쑤저우가 숙박인지 집중 방문인지 정합니다.",
        "숙소 이동을 돈뿐 아니라 시간으로 계산합니다.",
        "숙박 수를 정하기 전에 강제 왕복이 적은 구조를 남깁니다."
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "일정이 복잡할 때 제외할 것"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "인지도가 낮은 도시가 아니라 숙박 이유가 가장 약한 곳을 제외합니다. 쑤저우는 집중 방문이 가능할 수 있고, 난징이나 항저우의 목표가 흩어져 있다면 거점이 더 필요합니다."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "동선 판단 틀입니다",
      "body": "네 도시의 일별 일정, 실시간 열차, 고정된 당일치기 규칙은 제공하지 않습니다."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "동선 구조를 검토받고 싶나요?",
      "body": "날짜, 인원, 대략적인 예산, 숙소 취향과 공항을 남겨 주세요."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "다음 계획",
      "items": [
        {
          "label": "상하이–항저우 교통 계획",
          "href": "/guides/shanghai-hangzhou-transport-route/",
          "description": "도시 순서 뒤에 역을 고르세요."
        },
        {
          "label": "쑤저우 정원 관람법",
          "href": "/guides/how-to-read-a-suzhou-garden/",
          "description": "숙박을 추가하기 전에 쑤저우의 목적을 정하세요."
        },
        {
          "label": "푸둥·훙차오 공항 선택",
          "href": "/guides/shanghai-pudong-or-hongqiao-airport/",
          "description": "공항에 따라 최적 방향이 바뀔 수 있습니다."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "검토한 공식 출처",
      "items": [
        {
          "label": "상하이 철도역 안내",
          "url": "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "쑤저우 철도망 자료",
          "url": "https://jtj.suzhou.gov.cn/szjt/tjgl/202501/4cbd95cd41d747d98bc277a1916c1ad7.shtml",
          "publisher": "Suzhou Transport Bureau",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
