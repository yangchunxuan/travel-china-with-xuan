import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "밀봉, 조리, 진공포장 또는 개인용이라는 말은 자동 허가가 아닙니다. 중국은 동식물과 관련 제품에 검역을 적용합니다. 육류, 여러 유제품·달걀 제품, 신선 농산물, 씨앗, 식물과 토양은 금지 또는 통제 범주에 있으며 예외와 허가는 품목별로 확인해야 합니다."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "포장 선별",
      "columns": [
        "상황",
        "경로",
        "행동"
      ],
      "rows": [
        [
          "육류·육가공품",
          "대체로 제외",
          "공식 금지 목록은 생·조리 육류와 내장을 포함."
        ],
        [
          "우유·유제품·달걀",
          "정확한 범주 확인",
          "여러 제품이 목록에 있고 영유아·특수용 예외는 제한적."
        ],
        [
          "신선 과일·채소·씨앗·식물·토양",
          "명확히 허용되지 않으면 제외",
          "선물이나 소량도 검역 위험."
        ],
        [
          "상온 밀봉 간식",
          "성분표 확인",
          "육류·유제품·달걀·씨앗 성분이 있을 수 있음."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "앞면이 아니라 성분을 읽으세요"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "육포, 소시지, 고기 분말, 육수 큐브와 속이 든 과자는 육류 제품일 수 있습니다.",
        "치즈, 분유, 발효유와 달걀 함유 식품은 모두 같은 규칙이 아닙니다. 최신 목록과 명시된 예외를 사용하세요.",
        "라운지·호텔·이전 국가에서 가져온 과일도 국경에서는 신선 과일입니다.",
        "씨앗, 구근, 삽수, 살아있는 식물, 배양토와 흙은 기념품이어도 검역 대상입니다.",
        "반려동물은 별도 공식 절차이며 일반 수하물 목록으로 추정할 수 없습니다."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "출국 전에 버릴지 결정하세요"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "불확실한 물품의 성분과 원산지 라벨을 촬영합니다.",
        "정확한 성분과 형태로 공식 금지 목록과 세관 지침을 찾습니다.",
        "필요한 검역증명·허가를 여행 전에 받습니다. 공항 설명은 사전 허가를 대신하지 못합니다.",
        "허용 물품은 원래 라벨 포장으로 꺼내기 쉽게 둡니다.",
        "통제 또는 불확실 물품은 신고하고 직원 지시를 따릅니다. 포기 시 공식 절차를 이용합니다."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "선물이거나 특별한 물건이라면",
      "body": "정서적·금전적 가치는 검역 상태를 바꾸지 않습니다. 보낸 사람에게 전체 성분과 정확한 상품명을 받고 출국 전 세관에 문의하세요. 증빙이 부족하면 합법 전문 배송을 쓰거나 두고 오세요.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "적용 범위와 최신 규정",
      "body": "질병 통제와 원산지 제한은 빠르게 바뀔 수 있습니다. 이 글은 선별 가이드이지 최종 통관 목록이 아닙니다. 여행 주에 최신 세관 목록, 원산지 공지와 허가 규정을 확인하세요.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "계속 계획하기",
      "items": [
        {
          "label": "중국 세관 통로",
          "href": "/ko/guides/china-customs-red-green-channels/",
          "description": "통제 또는 불확실 수하물을 신고하세요."
        },
        {
          "label": "중국 입국 요건",
          "href": "/guides/china-entry-requirements/",
          "description": "검역과 출입국 심사를 구분하세요."
        },
        {
          "label": "보조배터리 운송 규정",
          "href": "/ko/guides/china-power-bank-rules-flights-trains/",
          "description": "나머지 휴대 수하물도 확인하세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "검토한 공식 출처",
      "items": [
        {
          "label": "Customs FAQ: prohibited animals, plants and products",
          "url": "https://online.customs.gov.cn/ociswebserver/pages/jcjybcx/question.html",
          "publisher": "General Administration of Customs",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "List of animals, plants and products prohibited from being carried or mailed into China",
          "url": "https://www.moa.gov.cn/nybgb/2022/202202/202204/P020220401365957599038.pdf",
          "publisher": "Ministry of Agriculture and Rural Affairs / General Administration of Customs",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Customs Announcement No. 43 of 2025",
          "url": "https://app.www.gov.cn/govdata/gov/202504/05/526129/article.html",
          "publisher": "General Administration of Customs",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
