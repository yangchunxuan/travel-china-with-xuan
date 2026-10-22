import type { EntryRequirementsEditionCopy } from "./entryRequirementsEditionTypes.ts";

/** Korean translation of /guides/china-entry-requirements/. */
export const koreanEntryRequirementsCopy: EntryRequirementsEditionCopy = {
  dateLocale: "ko-KR",
  openGraphLocale: "ko_KR",
  metadata: {
    title: "중국 입국 가이드: 여권·경로별 무비자 규정",
    description:
      "여권, 방문 목적, 경로별 현행 중국 입국 규정. 2026년 영국 국민 무비자 입국, 미국 여권 비자 안내, 240시간 경유 무비자 경로 확인을 함께 다룹니다.",
    socialImageAlt: "베이징 근교 산등성이를 따라 이어진 만리장성.",
  },
  skipLink: "입국 가이드로 바로 가기",
  breadcrumb: { label: "탐색 경로", home: "홈", guides: "가이드", current: "중국 입국 가이드" },
  hero: {
    eyebrow: "Homeground 입국 정보",
    title: "중국 입국 가이드",
    lead:
      "여권, 여행 목적, 정확한 경로에 따른 현행 입국 규정입니다. 먼저 내 여행에 적용되는 규정을 확인한 뒤, 그 범위 안에서 일정을 짜세요.",
    boundary:
      "공식 출처에 근거한 여행 정보만 제공합니다. Homeground는 비자 신청을 대행하지 않고, 개인의 자격 여부를 판단하지 않으며, 여권 업로드를 요청하지 않습니다.",
  },
  checks: {
    label: "입국 전 세 가지 확인",
    intro: "먼저 세 가지를 확인하세요",
    items: [
      { title: "여권", detail: "국적과 정확한 여권 종류" },
      { title: "목적", detail: "관광, 경유, 취업 또는 기타" },
      { title: "경로", detail: "어디로 입국하고 다음에 어디로 가는지" },
    ],
  },
  collection: {
    eyebrow: "현행 입국 가이드",
    title: "실제로 가진 여권과 실제 경로를 기준으로 고르세요.",
    body: "이 페이지들은 공식 발표된 사실과 일정 계획상의 해석을 구분하고, 확인 날짜를 표시합니다.",
    latestReview: "최근 출처 확인",
    checked: "{date} 확인",
    readEnglishGuide: "가이드 읽기(영어)",
    readGuide: "가이드 읽기",
  },
  ruleTypes: {
    eyebrow: "경로가 중요한 이유",
    title: "‘무비자’는 전혀 다른 두 가지 입국 방식을 뜻할 수 있습니다.",
    items: [
      {
        marker: "A",
        title: "여권 기준 무비자",
        body: "공표된 규정은 국적, 여권 종류, 방문 목적, 체류 기간에서 출발합니다. 현재의 영국 국민 가이드가 그 예입니다.",
      },
      {
        marker: "B",
        title: "경로 기준 경유",
        body:
          "확정된 다음 목적지 국가나 지역에 따라 경유 무비자 적용 여부가 달라질 수 있습니다. 240시간 경유 경로 확인 가이드는 왕복 여정과 제3국으로 이어지는 여정이 왜 다른지 보여 줍니다.",
      },
    ],
  },
  protocol: {
    eyebrow: "발행 원칙",
    title: "정책 페이지는 정기적으로 다시 확인해야 합니다.",
    items: [
      "정부와 대사관의 공식 출처를 먼저 사용합니다.",
      "출처를 확인한 날짜를 표시합니다.",
      "공표된 규정과 경로 계획상의 해석을 구분합니다.",
      "특수한 여권이나 법적 사안은 관할 기관의 판단에 맡깁니다.",
    ],
  },
  cta: {
    eyebrow: "입국 문제가 정리되면",
    title: "이제 서류가 아니라 여행을 계획하세요.",
    body:
      "여행 날짜와 가고 싶은 곳, 이미 정한 경로를 알려 주세요. 유료 작업을 시작하기 전에 Homeground 플래너가 알맞은 계획 범위를 함께 정해 드립니다.",
    action: "여행 플래너에게 문의",
  },
  guides: {
    "do-us-citizens-need-visa-china-2026": {
      label: "미국 여권 가이드",
      headline: "2026년, 미국 여권으로 중국에 가려면 비자가 필요할까요?",
      description:
        "미국 여권의 일반적인 중국 본토 여행에는 대체로 L 비자가 필요합니다. 240시간 무비자 환승, 하이난 30일 지역 무비자와 일반 왕복 일정을 비교합니다.",
      imageAlt: "상하이 푸둥 국제공항 도착층, 머리 위로 안내 표지판이 보인다.",
    },
    "china-240-hour-visa-free-transit-route-check": {
      label: "경유 경로 가이드",
      headline: "중국 240시간 무비자 환승: 내 경로는 조건을 만족할까요?",
      description:
        "A–중국–C 경로, 대상국 일반 여권, 확정된 다음 구간 항공권, 지정 출입국장과 허용 체류 지역을 함께 확인하세요.",
      imageAlt: "환승 규칙 다이어그램: 국가 또는 지역 A, 중국 본토, 그리고 다른 국가 또는 지역 C.",
    },
    "do-singaporeans-need-visa-china": {
      label: "싱가포르 여권 가이드",
      headline: "중국 비자는 필요 없습니다. 더 어려운 질문은 따로 있습니다.",
      description:
        "싱가포르 일반 여권은 중국 본토에 30일까지 무비자로 입국할 수 있습니다. 입국 규정과 입국카드 작성 방법, 실제 가능한 중국 동선을 함께 확인하세요.",
      imageAlt: "장가계 국가삼림공원의 짙푸른 계곡 위로 겹겹이 솟은 사암 기둥.",
    },
    "china-visa-free-uk-citizens-2026": {
      label: "영국 여권 가이드",
      headline: "2026년 영국 국민 중국 무비자: 그래도 비자가 필요한 경우는?",
      description:
        "2026년 영국 국민의 중국 30일 무비자 입국 실전 가이드: 여권 종류, 체류일 계산, 홍콩 경유 재입국, 그리고 여전히 비자가 필요한 경우.",
      imageAlt: "봄날 베이징 근교 산등성이를 따라 이어진 만리장성.",
    },
    "china-visa-free-canadian-citizens-2026": {
      label: "캐나다 여권 가이드",
      headline: "2026년 캐나다 국민 중국 무비자: 그래도 비자가 필요한 경우는?",
      description:
        "2026년 캐나다 국민의 중국 30일 무비자 입국 실전 가이드: 여권 종류, 체류일 계산, 홍콩 경유 재입국, 그리고 여전히 비자가 필요한 경우.",
      imageAlt: "맑은 낮의 베이징 현대식 스카이라인, CITIC 타워(중국존)가 보인다.",
    },
    "china-visa-free-new-zealand-citizens-2026": {
      label: "뉴질랜드 여권 가이드",
      headline: "2026년 뉴질랜드 국민 중국 무비자: 그래도 비자가 필요한 경우는?",
      description:
        "2026년 뉴질랜드 국민의 중국 30일 무비자 입국 실전 가이드: 여권 종류, 체류일 계산, 홍콩 경유 재입국, 그리고 여전히 비자가 필요한 경우.",
      imageAlt: "편집용 타임라인 도표: 뉴질랜드 국민 중국 무비자 정책 기간, 2024년 11월 30일부터 2026년 12월 31일까지.",
    },
  },
};
