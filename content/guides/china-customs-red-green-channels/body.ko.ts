import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "신고 대상이 있거나 확실하지 않으면 적색 통로를 선택하세요. 신고할 물품이 전혀 없을 때만 녹색 통로입니다. 2025년 중국 해관 규정은 해당 시 종이 또는 전자 휴대품 신고서를 작성하도록 하며 녹색 통로 선택 자체가 신고품이 없다는 표시입니다."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "통로 판단",
      "columns": [
        "상황",
        "경로",
        "행동"
      ],
      "rows": [
        [
          "제한·통제 물품",
          "적색",
          "개인용이어도 검사 전에 신고."
        ],
        [
          "동식물 및 관련 제품",
          "적색 / 검역",
          "포장·조리·진공 상태만으로 허용되지 않음."
        ],
        [
          "통화·상업용·초과 수량",
          "적색",
          "한도와 허가는 물품과 여정별."
        ],
        [
          "신고 없는 일반 개인용품",
          "녹색",
          "질문에 대비해 영수증이나 설명 준비."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "통로 표지에 닿기 전"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "금지·제한품, 동식물과 그 제품, 지정 통화·유가증권, 상업용 물품 등 열거된 범주가 있으면 신고서를 작성합니다.",
        "의약품은 원래 포장과 필요 시 처방전·의사 소견을 준비합니다. 통제 약물과 많은 수량은 품목별 확인이 필요합니다.",
        "수량이나 가치를 숨기려고 동행자에게 나누지 마세요. 녹색 통로 수하물도 검사할 수 있습니다.",
        "전자 양식, 현장 표지와 이해가 다르면 통로를 고르기 전에 세관 직원에게 묻습니다."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "도착 전 5분 점검"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "식품, 의약품, 현금, 고가 장비, 선물과 대리 운반품 목록을 만듭니다.",
        "공항·방향·정확한 품목으로 최신 세관·검역 목록을 대조합니다.",
        "허가서, 처방전, 영수증과 제품 라벨을 오프라인 저장합니다.",
        "신고 대상이거나 불확실하면 신고서를 작성하고 적색 통로로 갑니다.",
        "정확히 답하고 과세·임시 반입·포기·유치 물품의 공식 서류를 보관합니다."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "녹색 통로를 택한 뒤 생각났다면",
      "body": "통제구역을 나가기 전에 멈추고 직원에게 알리세요. 자진 설명이 은폐나 폐기보다 안전합니다. 물품이 유치되면 서면 증명과 공식 후속 절차를 받고 비공식 중개인에게 돈을 내지 마세요.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "적용 범위와 최신 규정",
      "body": "면세 수량과 제한 목록은 변하며 품목별입니다. 이 글은 가치·주류·담배·의약품·통화의 통합 한도를 제시하지 않습니다. 여행 주에 최신 신고서와 정확한 품목 규정을 확인하세요.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "계속 계획하기",
      "items": [
        {
          "label": "식품·식물·동물 제품 반입",
          "href": "/ko/guides/food-plants-animal-products-into-china/",
          "description": "짐을 싸기 전 검역을 확인하세요."
        },
        {
          "label": "중국 입국 요건",
          "href": "/guides/china-entry-requirements/",
          "description": "출입국 심사와 세관 업무를 구분하세요."
        },
        {
          "label": "보조배터리 항공·철도 규정",
          "href": "/ko/guides/china-power-bank-rules-flights-trains/",
          "description": "운송 안전 제한도 확인하세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "검토한 공식 출처",
      "items": [
        {
          "label": "Customs Announcement No. 43 of 2025",
          "url": "https://app.www.gov.cn/govdata/gov/202504/05/526129/article.html",
          "publisher": "General Administration of Customs / State Council",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Customs clearance guide",
          "url": "https://english.customs.gov.cn/statics/88707c1e-aa4e-40ca-a968-bdbdbb565e4f.html",
          "publisher": "General Administration of Customs",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Red and green baggage channels",
          "url": "https://english.customs.gov.cn/statics/3a12c746-51e1-4d94-8fc1-44a573fad090.html",
          "publisher": "General Administration of Customs",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
