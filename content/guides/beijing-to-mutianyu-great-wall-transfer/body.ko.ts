import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "decision-lead", type: "lead", text: "무톈위는 모든 베이징 호텔에서 한 번에 갈 수 있는 곳이 아니다. 출발 지점까지, 화이러우 환승, 관광지 입구, 성벽에서 내려온 뒤에도 가능한 귀환을 모두 비교해야 한다." },
    { id: "quick-answer", type: "callout", title: "베이징을 떠나기 전에 돌아올 길부터", tone: "decision", body: "시간이 유연하고 짐이 가벼운 여행자는 공식 대중교통을 이용할 수 있다. 날짜가 정해진 관광 직행버스는 승하차 지점과 귀환 시각이 맞을 때 환승을 줄인다. 가족, 부모님, 빠듯한 일정이나 당일 항공편·열차가 있다면 전용차가 단순한 시간 절약 이상의 안전 여유를 줄 수 있다." },
    { id: "matrix-heading", type: "heading", level: 2, text: "한 성벽 구간으로 가는 세 가지 방법" },
    { id: "decision-matrix", type: "table", caption: "전체 이동과 마지막 안전 귀환을 비교한다", columns: ["선택", "맞는 경우", "부담", "반드시 확인"], rows: [
      ["대중교통 연결", "성인, 가벼운 짐, 유연한 시간과 낮 귀환", "도심 출발지, 화이러우 환승, 대기와 정류장 혼동", "현재 노선, 운영 시간과 마지막 가능한 귀환"],
      ["관광 직행버스", "해당 날짜의 승하차와 관람 시간이 맞을 때", "고정 출발지와 고정 귀환", "공식 운영사, 정확한 정류장, 포함 사항과 날짜"],
      ["미리 예약한 차량", "가족, 부모님, 시간 제한 또는 고정 후속 이동", "높은 비용과 기사 만남 절차", "정식 영업 차량, 승차 위치, 대기 조건과 아동 좌석"],
    ]},
    { id: "public-heading", type: "heading", level: 2, text: "공식 대중교통은 연결 과정이지 한 번의 약속이 아니다" },
    { id: "public-copy", type: "paragraph", text: "베이징 공식 관광 정보는 현재 둥즈먼에서 916 급행버스로 화이러우베이다제까지 간 뒤 무톈위 방향 H노선 버스로 갈아타는 방법을 안내한다. 노선, 정류장과 시간은 바뀔 수 있다. 중국어 정류장명을 저장하고 당일 귀환을 확인하며 화이러우에서 오래 기다릴 가능성을 둔다." },
    { id: "entrance-warning", type: "callout", title: "관광지 도착은 성벽 도착이 아니다", tone: "warning", body: "교통 하차 지점, 방문자 구역, 표 확인, 내부 셔틀이나 오르막 이동은 별도 단계다. 입장권과 케이블카는 이 교통 글의 범위가 아니다. 관광지 공식 정보로 확인한 뒤 남은 귀환 여유를 계산한다." },
    { id: "clock-heading", type: "heading", level: 2, text: "하루 이동을 다섯 구간으로 나눠 시간을 계산한다" },
    { id: "clock-list", type: "list", ordered: true, items: ["호텔에서 올바른 베이징 출발지까지.", "가는 차량과 모든 예정 환승.", "하차 지점에서 실제 성벽 접근 지점까지.", "성벽 관람, 하산과 일행 모으기.", "마지막 버스 한 대가 아닌 마지막 안전 귀환 전체."] },
    { id: "people-heading", type: "heading", level: 2, text: "이동 능력이 교통 답을 바꾼다" },
    { id: "people-comparison", type: "comparison", title: "동행에 맞는 연결 선택", columns: [
      { heading: "스스로 이동 가능한 성인", items: ["대중교통도 합리적", "충전된 전화와 중국어 정류장명 준비", "예상치 못한 환승에 대비한 시간 확보"] },
      { heading: "아이 또는 부모님", items: ["서서 기다리는 시간 줄이기", "환승 때 일행 유지", "화장실과 날씨 피할 곳 계획"] },
      { heading: "짐 또는 후속 열차", items: ["관광 이동에 여행 가방을 가져가지 않기", "출발 전 공식 보관소 확인", "같은 날 저녁의 빠듯한 연결 피하기"] },
    ]},
    { id: "late-heading", type: "heading", level: 2, text: "늦은 출발은 관람보다 선택지를 먼저 줄인다" },
    { id: "late-table", type: "table", caption: "문제가 생겼을 때의 판단", columns: ["문제", "첫 행동", "하지 말 것"], rows: [
      ["직행버스를 놓침", "공식 변경 규정과 현재 대중교통 확인", "이름 없는 차량을 권하는 호객을 따라가기"],
      ["잘못된 화이러우 정류장", "저장한 중국어 목적지를 직원에게 보여 주기", "방향 확인 없이 노선 번호만 보고 타기"],
      ["귀환편이 위험함", "관광지를 나와 다음 확인된 교통 확보", "대안 없이 마지막 버스를 기다리기"],
      ["심한 날씨나 폐쇄", "관광지와 베이징 공식 공지 확인", "교통표를 개장 증거로 보기"],
    ]},
    { id: "fact-check", type: "callout", title: "동적 교통 정보 확인일: 2026년 8월 13일", tone: "neutral", body: "베이징 공식 관광 페이지는 현재 둥즈먼, 화이러우, 무톈위 대중교통 연결을 설명한다. 노선 번호, 정류장, 운영 시간, 관광버스 상품, 관광지 시간과 야간 관람 날짜는 바뀔 수 있으므로 출발 전에 다시 확인한다." },
    { id: "help-callout", type: "callout", title: "베이징 하루 일정에 이동을 맞춰 볼까요?", tone: "decision", body: "날짜, 호텔, 인원, 이동 요구, 짐과 저녁의 고정 열차나 항공편을 보내 주세요. Homeground는 가능한 이동과 확인 지점을 찾을 수 있지만 실시간 도로나 개장을 보장하지 않습니다." },
    { id: "internal-links", type: "internal-links", title: "베이징 계획을 이어서", items: [
      { label: "첫 베이징 여행 숙소 지역", href: "/ko/guides/beijing-where-to-stay-first-trip/", description: "숙소 지역이 첫 이동과 귀환을 바꿉니다." },
      { label: "어느 베이징 기차역인가요?", href: "/ko/guides/which-beijing-railway-station/", description: "올바른 터미널로 후속 열차를 지킵니다." },
      { label: "외국인 여행자의 자금성", href: "/ko/guides/forbidden-city-for-foreign-visitors/", description: "또 다른 어려운 베이징 하루를 따로 준비합니다." },
      { label: "중국 일정이 너무 빠듯한가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "어려운 두 날을 불안한 일정 하나에 넣지 않습니다." },
    ]},
    { id: "sources", type: "sources", title: "공식 출처와 사진 표기", items: [
      { label: "무톈위 방문과 대중교통 정보", url: "https://english.beijing.gov.cn/travellinginbeijing/attractions/202603/t20260325_4566115.html", publisher: "베이징시 정부", reviewedAt: "2026-08-12" },
      { label: "2026년 무톈위 야간 관람 공지", url: "https://english.beijing.gov.cn/latest/news/202606/t20260630_4738683.html", publisher: "베이징시 정부", reviewedAt: "2026-08-12" },
      { label: "대표 사진: Lloyd Tudor의 무톈위, CC BY-SA 4.0, 크롭 편집", url: "https://commons.wikimedia.org/wiki/File:The_Mutianyu_section_of_the_Great_Wall_of_China.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
      { label: "대표 사진 편집본 라이선스: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
    ]},
  ],
} as const satisfies StructuredPageBody;

export default body;
