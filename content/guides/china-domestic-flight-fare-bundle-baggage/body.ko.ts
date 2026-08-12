import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "검색 화면의 최저 국내선 운임이 실제로 가장 싼 표는 아닐 수 있습니다. 중국 민항 당국은 상품마다 환불, 변경, 수하물 조건이 다르므로 확인하라고 안내합니다. 모든 선택을 같은 바구니로 비교하세요. 여행자, 짐, 좌석, 최종 결제액과 도착에 달린 예약의 변경 비용입니다."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "같은 비교 바구니",
      "columns": [
        {
          "heading": "필수",
          "body": "일행이 실제로 가져갈 위탁·기내 수하물."
        },
        {
          "heading": "위험",
          "body": "현실적인 결정 시점의 환불·변경 조건."
        },
        {
          "heading": "의존성",
          "body": "정시 도착에 달린 숙소, 열차, 입장권 가치."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "상품 조건도 가격입니다"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "중국 여객 서비스 규정은 항공사가 변경, 환불, 수하물 운송 조건을 공개하도록 합니다. 모든 항공사와 운임에 같은 무료 허용량을 정하지는 않습니다. 항공사 전체 요약보다 특정 상품과 날짜에 표시된 조건을 기록하세요."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "공정한 운임 비교",
      "columns": [
        "항목",
        "기록할 것",
        "가정하지 말 것"
      ],
      "rows": [
        [
          "기본 운임과 세금",
          "같은 통화의 최종 결제액.",
          "검색 카드 숫자가 최종가."
        ],
        [
          "수하물과 좌석",
          "해당 승객의 상품에 포함된 것.",
          "모든 일반석 허용량이 같음."
        ],
        [
          "변경·환불",
          "관련 시간대의 수수료와 운임 차액.",
          "유연 상품은 변경이 무료."
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "캡처 화면은 빨리 낡습니다",
      "body": "개인 결정용으로 날짜와 함께 보관할 수 있지만 영구 공개 운임표로 만들지 마세요. 상품과 조건은 바뀝니다."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "결제 전 비교"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "검색 결과가 아니라 정확한 상품 조건을 확인합니다.",
        "모든 여행자의 짐, 좌석, 결제비를 더합니다.",
        "가능한 변경 시점의 규정을 읽습니다.",
        "도착에 의존하는 예약 가치를 더합니다.",
        "표시 최저가가 아닌 위험 조정 총비용을 고릅니다."
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "안전하게 절약할 곳"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "비싼 다음 일정을 위험에 놓는 경직된 운임보다 선택 좌석이나 불필요한 짐을 먼저 줄이세요. 도착 뒤 고정 예약이 없다면 유연성 가치는 낮을 수 있습니다."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "실시간 운임표가 아닙니다",
      "body": "현재 가격, 항공사 순위, 수하물 허용량을 약속하지 않습니다. 결제 단계의 조건을 다시 확인하세요."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "운임 비교를 검토받고 싶나요?",
      "body": "날짜, 인원, 예산, 수하물과 개인정보를 제거한 상품 조건을 남겨 주세요."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "다음 계획",
      "items": [
        {
          "label": "별도 발권 위험 확인",
          "href": "/guides/china-separate-flight-tickets-self-transfer-risk/",
          "description": "저렴한 묶음도 다음 여정을 위험에 둘 수 있습니다."
        },
        {
          "label": "중국 여행 비용 이해",
          "href": "/guides/how-much-does-a-china-trip-cost/",
          "description": "항공 선택을 전체 예산 안에서 보세요."
        },
        {
          "label": "동선을 바꾸는 항공편 비교",
          "href": "/guides/china-open-jaw-flights-route-planning/",
          "description": "더 비싼 표가 큰 왕복 비용을 없앨 수 있습니다."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "검토한 공식 출처",
      "items": [
        {
          "label": "항공권 구매 안내",
          "url": "https://app.caac.gov.cn/INDEX/HLFW/HKLXCS/",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "항공 발권 서비스 개선 통지",
          "url": "https://www.caac.gov.cn/XXGK/XXGK/ZFGW/201807/t20180717_189399.html",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
