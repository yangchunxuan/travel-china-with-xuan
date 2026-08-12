import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "편도형 여행이라면 광저우–선전–홍콩 또는 그 반대가 대체로 자연스럽습니다. 그러나 선전에서 반드시 1박해야 한다는 뜻은 아닙니다. 국제선 관문을 먼저 고정하고 선전에서 꼭 지킬 한 가지를 정한 뒤, 호텔 이동과 출입경 절차가 실제 관광 시간을 늘리는지 확인하세요."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "세 가지 질문이 순서를 정합니다",
      "columns": [
        {
          "heading": "입출국 관문",
          "body": "운임과 입국 조건이 맞으면 한쪽으로 들어가 반대쪽으로 나갑니다."
        },
        {
          "heading": "선전의 목적",
          "body": "분명한 핵심 경험이 있을 때만 숙박 이동을 감수합니다."
        },
        {
          "heading": "국경 이동일",
          "body": "출입경, 역 접근, 짐 이동을 관광일이 아닌 이동 블록으로 계산합니다."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "가까운 거리도 국경을 만나면 비용이 달라집니다"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "공식 안내에는 여러 통제 지점과 홍콩 서구룡을 이용하는 광역 고속철도가 나옵니다. 선택에 따라 두 도시에서 도착하는 위치, 현지 이동, 필요한 서류 절차가 달라집니다. 따라서 열차 시간 하나가 아니라 양쪽 끝 지점을 먼저 비교해야 합니다."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "동선별 적합 조건",
      "columns": [
        "동선",
        "적합한 경우",
        "약해지는 경우"
      ],
      "rows": [
        [
          "광저우 → 선전 → 홍콩",
          "광저우 쪽으로 도착하고 홍콩에서 출국합니다.",
          "마지막에 중국 본토 공항으로 돌아가야 합니다."
        ],
        [
          "홍콩 → 선전 → 광저우",
          "홍콩에서 시작해 북쪽이나 서쪽으로 이어갑니다.",
          "홍콩 출국이 고정되어 긴 왕복이 생깁니다."
        ],
        [
          "광저우·홍콩 숙박 + 선전 당일 방문",
          "선전 목표가 하나로 모이고 짐을 두고 갈 수 있습니다.",
          "선택한 통제 지점의 시내 이동이 너무 깁니다."
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "국경 이동을 평범한 도시 이동으로 세지 마세요",
      "body": "운영시간, 입국 자격, 좌석은 달라질 수 있습니다. 특정 통제 지점이나 서구룡 절차를 확인하고 고정 예약 앞에는 여유를 두세요."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "완성 일정 없이도 판단하는 법"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "실제 도착·출발 공항 또는 철도 관문을 적습니다.",
        "세 도시에서 삭제할 수 없는 한 가지씩을 정합니다.",
        "열차 구간보다 양쪽 호텔에 맞는 통제 지점을 고릅니다.",
        "호텔 이동과 출입경 절차를 모두 사용 가능 시간에서 제외합니다.",
        "도시 수를 늘리기 위한 선전 1박이라면 삭제합니다."
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "가장 먼저 줄일 것"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "명확한 목적이 없는 선전 1박부터 줄이세요. 광저우와 홍콩 사이를 직접 이동하고 선전을 목적 있는 당일 방문으로 두는 편이 세 번의 호텔 체크인보다 회복하기 쉽습니다."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "이 글이 제공하지 않는 것",
      "body": "숙박 일수, 개인별 비자 판단, 실시간 열차 선택은 제공하지 않습니다. 날짜, 여권, 호텔, 우선순위가 있어야 결정할 수 있습니다."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "사람의 동선 검토가 필요하신가요?",
      "body": "날짜, 인원, 대략적인 예산, 실제 입출국 관문을 남기면 국경에 민감한 구간을 점검해 드릴 수 있습니다."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "다음 계획",
      "items": [
        {
          "label": "광저우–홍콩 교통 비교",
          "href": "/ko/guides/guangzhou-hong-kong-transport-route/",
          "description": "도시 순서를 정한 뒤 역과 교통수단을 고르세요."
        },
        {
          "label": "선전–홍콩 이동 방식 선택",
          "href": "/ko/guides/shenzhen-hong-kong-transport-route/",
          "description": "숙소와 다음 일정에 맞는 경로를 선택하세요."
        },
        {
          "label": "오픈조 항공권 검토",
          "href": "/ko/guides/china-open-jaw-flights-route-planning/",
          "description": "다른 도시로 입출국하면 되돌아가는 이동을 줄일 수 있는지 확인하세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "검토한 공식 출처",
      "items": [
        {
          "label": "광역 고속철도 여행 계획",
          "url": "https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html",
          "publisher": "MTR High Speed Rail",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "홍콩 출입경 통제 지점 안내",
          "url": "https://www.sb.gov.hk/eng/special/bound/control.html",
          "publisher": "Hong Kong Security Bureau",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
