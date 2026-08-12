import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "여행 당일 실제로 들고 갈 여권의 신원을 사용하세요. 항공권과 실명제 철도 승차권은 여행에 쓰는 유효 문서와 일치해야 합니다. 호텔과 앱은 입력란을 다르게 표시할 수 있지만 별명이나 다른 문서를 써도 된다는 뜻은 아닙니다. 여권을 기준으로 하나의 원본 기록을 만들고 플랫폼마다 입력한 형태를 보관하세요."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "한 신원, 서로 다른 양식",
      "columns": [
        "상황",
        "경로",
        "행동"
      ],
      "rows": [
        [
          "항공권",
          "이름과 유효 신분증 일치",
          "항공사 여권 이름 지침을 따르고 발권 직후 확인."
        ],
        [
          "중국철도 12306",
          "문서 종류·이름·번호 정확히",
          "예약에 쓴 여권 원본으로 탑승."
        ],
        [
          "호텔",
          "여권 신원 사용, 표시 문제는 숙소에 알림",
          "확인서와 여권 원본 보관."
        ],
        [
          "앱 필드가 짧거나 분리",
          "플랫폼 공식 형식 지침",
          "입력 화면을 저장하고 임의 축약 금지."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "여권 신원 원본 만들기"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "사진면에서 성, 이름, 여권번호, 국적, 생년월일과 만료일을 옮깁니다. MRZ는 구두점과 순서를 판단하는 데 도움되지만 예약사 필드 설명이 우선입니다.",
        "하이픈, 공백, 아포스트로피와 여러 이름은 발권 후 다르게 보일 수 있습니다. 외관 변화가 자동 오류는 아니지만 수용 여부는 제공자만 확인할 수 있습니다.",
        "옛 여권번호와 새 여권 이름을 섞거나 한 예약의 체류증이 다른 예약에서 여권을 대신할 것이라 가정하지 마세요.",
        "중국 국내 시스템은 라틴 문자를 대문자로 바꾸거나 공백을 제거할 수 있습니다. 결과가 모호하면 확인 화면을 보존하고 지원팀에 묻습니다."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "취소보다 수정 우선"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "여행일에 유효한 여권으로 신원을 입력합니다.",
        "결제 전 모든 문자, 문서 종류와 번호를 비교합니다.",
        "발권 직후 입력 양식이 아니라 실제 발행 표·주문을 확인합니다.",
        "불일치 시 취소 전에 항공사, 12306, 대행사 또는 호텔 공식 채널에서 수정·재발행·새 예약 중 무엇이 필요한지 묻습니다.",
        "여권 원본과 승인된 형식·문서 변경의 서면 확인을 휴대합니다."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "예약 후 여권을 갱신했다면",
      "body": "각 제공자에게 별도로 연락하세요. 항공사, 철도와 호텔은 하나의 갱신 절차를 공유하지 않습니다. 적법하게 신·구 여권 정보와 갱신 증빙을 보관하되 옛 여권을 같이 들고 가면 자동 해결된다고 가정하지 말고 제공자가 수정 또는 재발행을 정하게 하세요.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "적용 범위와 최신 규정",
      "body": "특정 축약이나 누락 문자가 허용될지는 이 글이 결정할 수 없습니다. 항공사, 중국철도, 호텔과 국경기관은 각 시스템으로 실명을 확인합니다. 출발 전 공식 지원을 이용하고 제3자 포럼의 형식 보장을 믿지 마세요.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "계속 계획하기",
      "items": [
        {
          "label": "첫 중국 고속철도",
          "href": "/ko/guides/china-high-speed-train-first-time-guide/",
          "description": "역에서 같은 여권을 사용하세요."
        },
        {
          "label": "여권 분실 복구",
          "href": "/ko/guides/lost-passport-in-china-exit-recovery/",
          "description": "문서 교체 후 예약을 고치세요."
        },
        {
          "label": "중국 입국 요건",
          "href": "/guides/china-entry-requirements/",
          "description": "여행문서와 입국허가를 일치시키세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "검토한 공식 출처",
      "items": [
        {
          "label": "China guide for business expatriates (real-name rail travel)",
          "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          "publisher": "State Council of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "12306 real-name ticket information",
          "url": "https://kyfw.12306.cn/mormhweb/zxdt/201401/t20140117_1318.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "12306 real-name ticket FAQ",
          "url": "https://kyfw.12306.cn/otn/gonggao/realNameTicket.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "CAAC air travel ID and ticket guidance",
          "url": "https://www.caac.gov.cn/big5/www.caac.gov.cn/INDEX/HLFW/HKLXCS/",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
