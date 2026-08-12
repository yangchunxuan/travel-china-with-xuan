import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "중국 전원은 220V, 50Hz입니다. 플러그 어댑터는 모양만 바꾸고 전압은 바꾸지 않습니다. INPUT 100–240V, 50/60Hz라고 적힌 현대 휴대전화·노트북 충전기는 보통 모양 어댑터만 필요합니다. 110–120V 전용 제품은 실제 변압기가 필요하거나 가져가지 않는 편이 안전합니다."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "어댑터인가 변압기인가",
      "columns": [
        "상황",
        "경로",
        "행동"
      ],
      "rows": [
        [
          "INPUT 100–240V, 50/60Hz",
          "플러그 어댑터만",
          "단단히 연결되는지 확인 후 사용."
        ],
        [
          "110V 또는 120V만 표시",
          "변압기 또는 다른 기기",
          "220V에 직접 연결 금지."
        ],
        [
          "220–240V 표시",
          "대체로 전압 호환",
          "모양 어댑터는 필요할 수 있음."
        ],
        [
          "전기 라벨을 읽을 수 없음",
          "추측 금지",
          "제조사 사양 확인 또는 교체."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "소켓 모양의 현실"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "상하이 공식 안내는 A·C·I형을 설명합니다. 호텔·열차·공항의 실제 콘센트는 다르고 느슨한 멀티 소켓은 무거운 충전기를 잡지 못할 수 있습니다.",
        "신뢰할 제조사의 정격이 충분한 접지 어댑터와 여러 기기가 쓸 멀티포트 USB 충전기를 준비하세요.",
        "2핀 어댑터는 3핀 기기에 접지를 만들어주지 않습니다. 고전력·접지 장비는 올바른 정격과 접지 솔루션이 필요합니다.",
        "헤어드라이어, 고데기, 주전자와 발열도구가 흔한 함정입니다. 단일 전압이고 작은 여행 변압기 용량을 넘는 경우가 많습니다."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "60초 충전기 라벨 점검"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "USB 포트의 OUTPUT이 아니라 충전기·기기의 INPUT을 찾습니다.",
        "전압 범위에 220V, 주파수에 50Hz가 포함되는지 확인합니다.",
        "어댑터의 최대 전압·전류·와트가 기기 요구보다 높은지 봅니다.",
        "어댑터는 기내 수하물에 넣고 느슨하게 여러 개를 겹치지 않습니다.",
        "도착 후 콘센트를 점검하고 불꽃·헐거움·과열·냄새가 나면 중단합니다."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "플러그는 맞는데 충전이 안 되면",
      "body": "분리한 뒤 원래 충전기를 호텔의 정상 콘센트에서 시험하고, 저전력 범용전압 기기로 어댑터를 따로 확인하세요. 핀을 억지로 누르지 말고 호텔에 문의합니다. 들어맞는다고 전압·접지·전기 상태가 맞는 것은 아닙니다.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "적용 범위와 최신 규정",
      "body": "소켓은 건물과 콘센트마다 다릅니다. 공식 자료는 220V/50Hz와 흔한 플러그를 설명하지만 특정 객실의 소켓은 보장하지 않습니다. 고전력·의료·전문 장비는 제조사와 숙소에 미리 확인하세요.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "계속 계획하기",
      "items": [
        {
          "label": "보조배터리 운송 규정",
          "href": "/ko/guides/china-power-bank-rules-flights-trains/",
          "description": "예비 배터리가 이동 가능한지 확인하세요."
        },
        {
          "label": "중국 eSIM 또는 현지 SIM",
          "href": "/ko/guides/china-esim-vs-local-sim/",
          "description": "휴대전화를 충전하고 연결하세요."
        },
        {
          "label": "국제선 전 마지막 밤",
          "href": "/ko/guides/china-last-night-before-international-flight/",
          "description": "필수 충전기를 기내 수하물에 넣으세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "검토한 공식 출처",
      "items": [
        {
          "label": "Electricity in China",
          "url": "https://www.caac.gov.cn/ZTZL/RDZT/YTHYWZ/CHRY/SHZN/Electricity/index.html",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Beijing pre-departure travel tips",
          "url": "https://english.beijing.gov.cn/travellinginbeijing/quickguideontravelservices/traveltips/202108/t20210811_2466837.html",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Shanghai electricity FAQ",
          "url": "https://english.shanghai.gov.cn/en-FAQs-StudyinShanghai/20250924/e961a223e45a4adca7969b3f7691132b.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
