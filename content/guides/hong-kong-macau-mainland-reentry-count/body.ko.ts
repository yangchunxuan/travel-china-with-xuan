import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "중국 본토 출입경 관리상 홍콩과 마카오는 별도의 국경 관할입니다. 본토에서 두 곳으로 가는 것은 본토 출국이고 돌아오는 것은 새 본토 입국입니다. 귀환 가능 여부는 여권, 비자 잔여 횟수, 무비자 정책과 정확한 경로에 달렸으며 짧은 당일치기라고 달라지지 않습니다."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "숙박일이 아니라 국경 통과를 세세요",
      "columns": [
        "상황",
        "경로",
        "행동"
      ],
      "rows": [
        [
          "본토 → 홍콩",
          "본토 출국 1회",
          "현재 본토 체류가 국경에서 종료."
        ],
        [
          "홍콩 → 본토",
          "새 본토 입국 1회",
          "그 입국에 유효한 허가 필요."
        ],
        [
          "본토 → 마카오 → 본토",
          "출국 + 새 입국",
          "당일 왕복도 두 출입국 심사를 통과."
        ],
        [
          "홍콩 → 마카오",
          "본토 입국 아님",
          "각 지역의 입경 규칙 적용."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "표를 사기 전에 경로를 그리세요"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "관할구역 순서로 적으세요. 상하이 → 홍콩 → 선전은 서로 다른 두 번의 본토 체류입니다.",
        "단수 본토 비자는 보통 첫 본토 입국 때 사용됩니다. 홍콩이나 마카오로 나가면 인쇄된 유효기간이 남아도 다시 살아나지 않습니다.",
        "2회 또는 복수 비자도 귀환일에 유효하고 미사용 횟수가 있어야 합니다. 체류기간과 비자 유효기간은 다른 항목입니다.",
        "무비자와 환승 무비자는 국적·항구·후속 항공권·허용 지역 조건이 따로 있으므로 확인 없이 여분의 입국으로 취급하지 마세요."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "안전한 예약 테스트"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "모든 본토 입국과 출국을 한 줄에 표시합니다.",
        "각 본토 도착마다 미사용 비자, 적용 가능한 무비자 또는 특정 환승 정책 중 법적 근거를 적습니다.",
        "홍콩과 마카오 입경 자격은 각각 공식 사이트에서 확인합니다.",
        "운송사와 국경 항구가 문서와 경로를 받아들이는지 확인합니다. 페리·철도·육로 절차는 다를 수 있습니다.",
        "후속 표와 숙박 증빙을 준비하되 입국 보장은 아니라는 점을 기억합니다."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "여행 중 횟수 문제를 발견했다면",
      "body": "짧은 외출이 허가를 초기화할 것이라 기대하며 국경으로 가지 마세요. 국가이민관리국 서비스, 가까운 본토 출입경 기관과 운송사에 연락하고 합법 체류 중 경로를 바꾸세요. 개인 법률 조언은 자격 있는 전문가나 자국 공관에 문의합니다.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "적용 범위와 최신 규정",
      "body": "이 글은 국경 횟수만 설명하며 개인 자격을 판정하지 않습니다. 국적별 비자, 일방 무비자와 환승 정책은 변합니다. 여행하는 주에 정확한 여권·날짜·항구·후속 일정으로 공식 규정을 다시 확인하세요.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "계속 계획하기",
      "items": [
        {
          "label": "중국 입국 요건",
          "href": "/guides/china-entry-requirements/",
          "description": "각 본토 도착의 근거를 확인하세요."
        },
        {
          "label": "선전–홍콩 교통",
          "href": "/ko/guides/shenzhen-hong-kong-transport-route/",
          "description": "자격 확인 후 국경을 선택하세요."
        },
        {
          "label": "홍콩–마카오 교통",
          "href": "/ko/guides/hong-kong-macau-transport-route/",
          "description": "비본토 구간을 별도로 계획하세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "검토한 공식 출처",
      "items": [
        {
          "label": "중화인민공화국 출입국관리법 공식 영문 전문",
          "url": "https://www.nia.gov.cn/n741440/n741547/c757592/content.html",
          "publisher": "중국 국가이민관리국",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Chinese visa FAQ explaining Hong Kong and Macao entries",
          "url": "https://sk.china-embassy.gov.cn/slo/consularaffairs/VISA/202005/P020210712030405067319.pdf",
          "publisher": "Embassy of China in Slovakia",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Border inspection for travel between mainland and Hong Kong/Macao",
          "url": "https://en.nia.gov.cn/n147413/c177654/content.html",
          "publisher": "National Immigration Administration",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
