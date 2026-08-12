import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "두 운임의 합이 작다고 셀프 환승이 싼 것은 아닙니다. 중국 민항 당국은 비연결 구간이 별도로 발권되고 각 조건을 따른다고 안내합니다. 첫 항공편이 바뀌었을 때 잃을 수 있는 다음 항공권, 숙소, 입장권과 국제선 출국 일정을 절약액과 비교하세요."
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "세 층을 계산하세요",
      "columns": [
        {
          "heading": "현금 절약",
          "body": "수하물과 좌석을 포함한 최종 결제액을 씁니다."
        },
        {
          "heading": "실패 노출",
          "body": "두 번째 항공편에 달린 환불 불가 가치를 더합니다."
        },
        {
          "heading": "회복 시간",
          "body": "더 늦은 항공편이나 1박 대안이 있는지 봅니다."
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "보호의 틈은 명확합니다"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "민항 당국은 별도 발권된 비연결 항공편이 보통 둘 이상의 운송계약을 만들며 한 구간의 변경이 다른 구간을 자동으로 바꾸지 않는다고 설명합니다. 각 항공사의 조건을 따르므로 보수적으로 계획해야 하지만 전국 공통 안전 시간을 만들 수는 없습니다."
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "절약이 실제인 경우",
      "columns": [
        "상황",
        "기본 판단",
        "이유"
      ],
      "rows": [
        [
          "같은 공항, 기내 짐, 다음 날 유연",
          "가능할 수 있음.",
          "실패 단계와 노출 가치가 작습니다."
        ],
        [
          "위탁 수하물 또는 터미널 불확실",
          "넓은 여유 필요.",
          "수하물 수령과 재수속이 추가됩니다."
        ],
        [
          "공항 변경 또는 국제선 출국",
          "1박 또는 보호 항공권 우선.",
          "회복이 어렵고 손실이 큽니다."
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "항공사의 최소 연결 시간을 그대로 적용하지 마세요",
      "body": "그 시간은 보호된 연결과 특정 터미널 절차에만 적용될 수 있으며 별도 발권의 안전을 증명하지 않습니다."
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "셀프 환승 검사"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "두 구간이 하나의 항공권인지 확인합니다.",
        "수하물, 입국, 터미널, 공항 변경을 표시합니다.",
        "두 번째 편을 놓치면 잃는 예약을 합칩니다.",
        "계획편이 아닌 마지막 회복편을 찾습니다.",
        "손실 상한이 절약보다 크면 1박합니다."
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
      "text": "국제선 출국 여유보다 셀프 환승을 먼저 빼세요. 작은 절약 때문에 전체 여행을 보호 없는 도착에 걸지 마세요."
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "공통 안전 시간은 없습니다",
      "body": "공항, 짐, 여권, 터미널, 항공사와 날짜에 따라 다르며 실시간 항공편이나 법률 조언을 제공하지 않습니다."
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "위험 노출을 검토받고 싶나요?",
      "body": "날짜, 인원, 예산, 공항, 수하물과 개인정보를 가린 발권 화면을 남겨 주세요."
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "다음 계획",
      "items": [
        {
          "label": "국제선 출국 전 마지막 밤 보호",
          "href": "/ko/guides/china-last-night-before-international-flight/",
          "description": "셀프 환승이 마지막 단일 실패 지점이 되지 않게 하세요."
        },
        {
          "label": "상하이의 정확한 공항 확인",
          "href": "/ko/guides/shanghai-pudong-or-hongqiao-airport/",
          "description": "공항 변경은 일반 환승이 아닙니다."
        },
        {
          "label": "중국 국내선 운임 묶음 비교",
          "href": "/ko/guides/china-domestic-flight-fare-bundle-baggage/",
          "description": "수하물과 변경 조건을 넣은 뒤 가격을 비교하세요."
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
          "label": "공공 항공 여객 서비스 규정",
          "url": "https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202103/t20210315_206814.html",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
