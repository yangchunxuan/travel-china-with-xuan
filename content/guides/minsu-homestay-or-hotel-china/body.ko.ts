import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "‘민수’는 흔히 홈스테이로 번역되지만 호스트 중심 시골 숙소, 전문 소형 숙박업소, 플랫폼 분류일 수 있습니다. 가족과 식사·교류·허가·등록·호텔 서비스를 자동으로 뜻하지 않습니다.",
    },
    {
      id: "answer",
      type: "callout",
      title: "빠른 선택",
      tone: "decision",
      body: "안정적인 프런트, 짐, 늦은 도착과 문제 발생 시 대응이 중요하면 호텔을 고르세요. 특정 장소·호스트 소통·지역 디자인이 여행 목적이고 운영자가 등록·출입·지원을 확인했을 때 민수가 맞습니다. ‘홈스테이’라는 영어만으로 가족과 산다고 추정하지 마세요.",
    },
    {
      id: "layers",
      type: "table",
      caption: "명칭 너머 보기",
      columns: ["질문", "호텔형 필요", "민수형 적합"],
      rows: [
        ["도착", "24시간 또는 명확한 데스크", "사전 호스트 인계 가능"],
        ["위치", "허브·차량 접근", "마을·옛거리·경승지가 목적"],
        ["서비스", "상시 데스크·정형화된 문제 대응", "숙소별 제한 서비스 수용"],
        ["증빙", "운영자·등록 확인", "운영자·출입·등록 각각 확인"],
      ],
    },
    {
      id: "verify",
      type: "callout",
      title: "공식 등급과 플랫폼 명칭은 다릅니다",
      tone: "warning",
      body: "중국에는 관광 민수 국가 표준과 A/B 등급 활동이 있지만 플랫폼의 ‘민수’가 자동으로 공식 등급은 아닙니다. 운영 주체, 주장하는 등급, 여권 등록, 직원 시간, 온도 조절과 짐 접근을 물으세요.",
    },
    {
      id: "facts",
      type: "callout",
      title: "정책 확인일: 2026년 8월 12일",
      tone: "neutral",
      body: "시장감독관리총국은 GB/T 41648-2022 관광 민수 기준을 등재하고 문화여유부는 공식 등급 공고를 냅니다. 이민관리국 등록 의무는 실제 숙박 형태에 따라 적용됩니다. 이 체계가 모든 플랫폼 명칭을 인증하지는 않습니다.",
    },
    {
      id: "links",
      type: "internal-links",
      title: "계속 계획하기",
      items: [
        {
          label: "베이징 사합원 호텔과 현대 호텔",
          href: "/ko/guides/beijing-courtyard-hotel-or-modern-hotel/",
          description: "전통 숙소를 낭만화하지 않고 봅니다.",
        },
        {
          label: "황산 숙박 거점",
          href: "/ko/guides/huangshan-summit-or-gateway-base/",
          description: "숙소 유형보다 환경을 먼저 고릅니다.",
        },
        {
          label: "상업형 아파트호텔과 임대",
          href: "/ko/guides/commercial-aparthotel-or-residential-rental-china/",
          description: "플랫폼 표시와 운영을 구분합니다.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "공식 출처",
      items: [
        {
          label: "GB/T 41648-2022 관광 민수 표준",
          url: "https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=2E96A4B6C7B13B97FC67FD71736EAF01",
          publisher: "국가시장감독관리총국",
          reviewedAt: "2026-08-12",
        },
        {
          label: "최신 A/B급 관광 민수 공식 공고",
          url: "https://zwgk.mct.gov.cn/zfxxgkml/scgl/202601/t20260126_964398.html",
          publisher: "문화여유부",
          reviewedAt: "2026-08-12",
        },
        {
          label: "외국인 숙박 등록 공식 해설",
          url: "https://s.nia.gov.cn/mps/zcjd/202601/t20260750_1012.html",
          publisher: "국가이민관리국",
          reviewedAt: "2026-08-12",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;
export default body;
