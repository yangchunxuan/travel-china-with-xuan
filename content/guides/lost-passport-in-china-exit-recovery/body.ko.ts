import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "여권 분실은 복구할 수 있지만 사본은 여행증명서가 아닙니다. 공식적인 핵심 순서는 현지 출입경 관리 증명, 자국 대사관·영사관의 새 여행증명서, 그리고 출국 전 필요한 중국 비자·체류 서류 재발급입니다. 즉시 시작하고 모든 접수증을 보관하세요."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "네 단계 복구 체인",
      "columns": [
        "상황",
        "경로",
        "행동"
      ],
      "rows": [
        [
          "1. 보호",
          "계정 보호와 안전한 수색",
          "시간과 장소를 기록하고 도난이면 경찰 신고."
        ],
        [
          "2. 증명",
          "현지 공안 출입경 관리기관",
          "여권 분실증명 또는 지정 서류 발급."
        ],
        [
          "3. 재발급",
          "자국 대사관·영사관",
          "긴급 여권 또는 여행증명서 절차 진행."
        ],
        [
          "4. 합법 출국",
          "필요 시 출입경 관리기관 재방문",
          "비자·체류·출국 문서 재발급."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "첫 한 시간에 할 일"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "도난이나 즉각적 위험이면 110에 신고합니다. 단순 분실이면 호텔이나 신뢰할 현지 연락처에 가까운 공안·출입경 창구를 물어보세요.",
        "여권과 함께 있던 계정을 보호하되 전체 여권 스캔을 공개하지 마세요. 사진면, 비자, 입국도장, 신고 기록, 예약 확인서를 통제된 폴더에 저장합니다.",
        "대사관·영사관 공식 웹사이트의 연락처만 사용하고 신원 증빙, 사진, 예약, 수수료와 필요한 현지 증명을 묻습니다.",
        "항공사·철도·호텔에 신분증이 바뀐다고 알리고 공식 수정 경로가 있다면 먼저 취소하지 마세요."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "문서를 순서대로 복구"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "현지 출입경 관리기관이 지시한 분실증명 등을 받습니다.",
        "자국 대사관·영사관에서 새 여권 또는 긴급 여행증명서를 신청합니다. 자격과 시간은 국가별입니다.",
        "새 문서와 분실 증명으로 현지 출입경 관리기관에 비자·체류·출국 문서 재발급 필요 여부를 확인합니다.",
        "항공·철도·호텔·보험의 이름과 문서 번호를 공식 경로로 수정합니다.",
        "원본과 사본을 들고 공항에 일찍 도착합니다. 출국 서류의 충분성은 국경검사가 판단합니다."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "출국일이 임박했다면",
      "body": "대사관의 긴급 여행증명서만으로 중국 측 절차가 끝난다고 가정하지 마세요. 현지 출입경 기관과 항공사에 즉시 연락하고 모든 지시를 기록한 뒤 발급 가능한 서류와 예상 소요 시간을 확인해 예약을 조정하세요. 체류기간 초과나 문서 문제는 공식 기관의 처리가 필요합니다.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "적용 범위와 최신 규정",
      "body": "대사관 절차, 지방 예약과 문서명은 다를 수 있습니다. 국가이민관리국은 핵심 순서를 안내하지만 자국 공관이 여행문서를 발급하고 현지 출입경 기관이 중국 측 비자·출국 문서를 결정합니다. 당일 발급이나 출국 허가는 보장할 수 없습니다.",
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
          "description": "복구할 문서의 역할을 이해하세요."
        },
        {
          "label": "국제선 전 마지막 밤",
          "href": "/ko/guides/china-last-night-before-international-flight/",
          "description": "서류와 공항 시간을 다시 확인하세요."
        },
        {
          "label": "오픈조 항공편 계획",
          "href": "/ko/guides/china-open-jaw-flights-route-planning/",
          "description": "출국 도시 변경 시 경로를 다시 설계하세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "검토한 공식 출처",
      "items": [
        {
          "label": "Lost or damaged foreign passport procedure",
          "url": "https://en.nia.gov.cn/n147428/n147498/n147780/n147970/c159250/content.html",
          "publisher": "National Immigration Administration",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Entry and stay rules for foreigners",
          "url": "https://en.nia.gov.cn/n147423/n147478/n147715/c158215/content.html",
          "publisher": "National Immigration Administration",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "China guide for business expatriates (emergency numbers)",
          "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          "publisher": "State Council of China",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
