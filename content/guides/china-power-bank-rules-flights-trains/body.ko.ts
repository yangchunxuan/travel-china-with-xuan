import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "항공과 철도 규정은 서로 바꿔 쓸 수 없습니다. 2025년 6월 28일부터 중국 국내선에는 표시가 불명확하거나 CCC 표시가 없거나 리콜 모델인 보조배터리가 금지됐습니다. 항공은 기내 휴대와 Wh 한도도 적용합니다. 철도는 표시가 선명하고 100Wh 이하인 제품을 허용합니다."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "항공과 철도 비교",
      "columns": [
        "상황",
        "경로",
        "행동"
      ],
      "rows": [
        [
          "중국 국내선",
          "기내 휴대만; 용량과 CCC 표시 명확",
          "100Wh 이하는 보통 승인 불필요, 100–160Wh는 항공사 승인 및 최대 2개."
        ],
        [
          "중국 출발 국제선",
          "리튬배터리 규정 + 항공사·공항 점검",
          "2025 국내선 CCC 공지가 정확한 구간에 적용되는지 확인."
        ],
        [
          "고속·일반열차",
          "표시 명확, 정격 에너지 100Wh 이하",
          "단자 보호와 양호한 상태 유지."
        ],
        [
          "불명확·손상·리콜 제품",
          "휴대하지 않기",
          "읽을 수 없는 라벨은 설명으로 대체 불가."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "mAh만 말고 Wh를 보세요"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "Wh가 인쇄돼 있으면 그 값을 사용합니다. 전압과 Ah만 있으면 Wh = V × Ah이며 10,000mAh는 10Ah지만 정격 전압이 필요합니다.",
        "항공편에서는 보조배터리를 위탁하지 말고 기내 수하물에 넣습니다. 단락을 막고 CAAC 지침에 따라 비행 중 사용하지 않습니다.",
        "CE·FCC 표시는 중국 CCC 표시와 다릅니다. 라벨을 임의로 만들거나 붙이지 마세요.",
        "항공사, 보안과 리콜 공지는 일반 기준보다 엄격할 수 있으며 최종 판단은 현장 운영 규정에 따릅니다."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "포장 점검"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "밝은 곳에서 양면을 촬영하고 브랜드·모델·Wh·표시가 읽히는지 확인합니다.",
        "제조사와 규제기관에서 해당 모델 리콜을 검색합니다.",
        "중국 국내선은 진짜 CCC 표시를 확인하고 없거나 흐리면 다른 제품을 씁니다.",
        "기내 수하물에 넣고 단자를 보호하며 우발 작동을 막습니다.",
        "열차만 이용하면 정격 에너지가 100Wh 이하이며 선명히 인쇄됐는지 확인합니다."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "보안검색에서 거부되면",
      "body": "온라인 요약으로 다투거나 위탁수하물에 숨기지 마세요. 공식 포기, 체크인 구역 반환 등 허용 절차를 묻고 스마트 액세서리의 개인정보를 보호하며 가능한 경우 영수증을 받으세요.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "적용 범위와 최신 규정",
      "body": "100Wh와 160Wh는 일반 CAAC 항공 기준이고 2025 CCC 공지는 중국 국내선에 관한 것입니다. 국제 구간, 연결편, 항공사와 리콜은 여행 주에 확인해야 합니다. 철도는 최신 목록과 실제 기기 상태를 적용합니다.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "계속 계획하기",
      "items": [
        {
          "label": "중국 플러그·전압·어댑터",
          "href": "/ko/guides/china-power-plugs-voltage-and-adapters/",
          "description": "허용된 기기를 어떻게 충전할지 확인하세요."
        },
        {
          "label": "첫 중국 고속철도",
          "href": "/ko/guides/china-high-speed-train-first-time-guide/",
          "description": "역 보안검색과 탑승을 준비하세요."
        },
        {
          "label": "국제선 전 마지막 밤",
          "href": "/ko/guides/china-last-night-before-international-flight/",
          "description": "재포장 전 라벨을 확인하세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "검토한 공식 출처",
      "items": [
        {
          "label": "CAAC notice on CCC-marked power banks (2025)",
          "url": "https://www.caac.gov.cn/English/News/202507/t20250709_227894.html",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "CAAC lithium battery and power bank limits",
          "url": "https://www.caac.gov.cn/big5/www.caac.gov.cn/XXGK/XXGK/TZTG/201511/t20151105_11173.html",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Railway passenger prohibited and restricted items catalogue",
          "url": "https://www.gov.cn/zhengce/zhengceku/2022-05/31/content_5693212.htm",
          "publisher": "National Railway Administration / Ministry of Public Security",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
