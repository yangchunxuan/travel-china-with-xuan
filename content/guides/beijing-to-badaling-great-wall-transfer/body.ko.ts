import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "바다링에는 여러 대중교통이 있지만 서로 다른 베이징 지점에서 출발하고 같은 곳에 내리지도 않는다. 가장 짧은 승차 시간보다 호텔에서 출발 지점까지와 귀환 좌석을 먼저 본다." },
  { id: "answer", type: "callout", title: "노선 이름은 답의 절반", tone: "decision", body: "칭허 또는 베이징북역이 편하고 날짜에 맞는 열차가 있으면 고속철도를 확인한다. S2 교외철도는 현재의 별도 출발역을 사용한다. 더성먼이 편하면 877번 버스를 비교한다. 공항 직행은 공항이 실제 출발 또는 도착일 때만 의미가 있다." },
  { id: "matrix-heading", type: "heading", level: 2, text: "네 노선과 서로 다른 첫 구간" },
  { id: "matrix", type: "table", caption: "여행 날짜에 모든 터미널 이름을 확인한다", columns: ["노선", "좋은 출발 조건", "부담", "가정하지 말 것"], rows: [
    ["고속철도", "칭허나 베이징북역이 편하고 열차가 맞을 때", "예약 좌석, 보안검색, 큰 역과 긴 출구 이동", "모든 열차가 같은 베이징역을 사용"],
    ["S2 교외철도", "현재 베이징 쪽 역과 시간표가 맞을 때", "별도 역, 날짜별 제한된 편수와 대기", "오래된 글의 출발역이 지금도 동일"],
    ["877번 버스", "더성먼 접근이 쉽고 도로 변동을 감수할 때", "공식 정류장 찾기, 대기, 정체와 귀환 마감", "근처 비슷한 표지의 버스가 공식 노선"],
    ["공항 직행버스", "서우두공항이 실제 출발 또는 도착일 때", "날짜별 시간, 터미널과 관광지 운영일", "영구 매일 운행하거나 다싱공항도 이용"],
  ]},
  { id: "names", type: "callout", title: "전체 이름 저장하기", tone: "warning", body: "바다링 만리장성역, S2 바다링 정차 지점과 도로 버스 도착지는 같은 이름이 아니다. 베이징에서는 칭허, 베이징북, 황투뎬, 더성먼을 선택한 노선과 함께 중국어로 저장하고 당일 확인한다." },
  { id: "clock-heading", type: "heading", level: 2, text: "양방향 이동을 계산한다" },
  { id: "clock", type: "list", ordered: true, items: ["호텔이나 공항에서 올바른 터미널까지.", "대기, 보안검색과 줄 여유.", "예정 승차 시간과 지연 위험.", "도착 지점에서 선택한 입구와 오르막 이동.", "하산, 일행 모으기와 마지막 안전 귀환."] },
  { id: "groups", type: "comparison", title: "어떤 부담이 가장 중요한가?", columns: [
    { heading: "가볍고 유연함", items: ["현재 모든 대중교통 비교", "두 번째 귀환 보관", "중국어 명칭 준비"] },
    { heading: "가족 또는 부모님", items: ["터미널 불확실성 줄이기", "가파른 도보와 승강기 고려", "마지막 편 전에 출발"] },
    { heading: "공항 또는 열차 연결", items: ["날짜가 확인된 공식 연결만 사용", "짐과 수속 시간 보호", "같은 날 빠듯한 연결 피하기"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "출발지를 틀리거나 편을 놓쳤다면" },
  { id: "recovery", type: "table", caption: "더 이동하기 전에 복구한다", columns: ["문제", "행동"], rows: [
    ["잘못된 베이징 기차역", "공식 변경과 현재 역의 노선을 확인하고 추측으로 도시를 가로지르지 않기"],
    ["S2 시간이 맞지 않음", "현재 위치에서 877번과 당일 고속철도 좌석 비교"],
    ["버스 정류장이 불명확", "직원에게 묻고 전체 노선과 중국어 목적지 확인"],
    ["귀환 실패 위험", "관광지를 나와 다음 확인된 교통을 잡고 호텔이나 후속 운영사에 알리기"],
  ]},
  { id: "facts", type: "callout", title: "동적 교통 정보 확인일: 2026년 8월 12일", tone: "neutral", body: "베이징 공식 정보는 현재 877번, S2 교외철도와 고속철도를 별도 노선으로 설명한다. 2026년에는 서우두공항과 바다링 직행 노선도 날짜와 함께 발표됐다. 터미널, 시간, 요금, 관광지 접근과 운영일은 바뀔 수 있어 출발 전 다시 확인한다." },
  { id: "help", type: "callout", title: "호텔에 맞는 노선을 확인할까요?", tone: "decision", body: "날짜, 베이징 호텔 또는 공항 터미널, 인원, 이동 요구와 저녁 고정 일정을 보내 주세요. Homeground는 전체 이동과 복구 지점을 비교할 수 있지만 실시간 좌석을 보장하지 않습니다." },
  { id: "links", type: "internal-links", title: "계속 계획하기", items: [
    { label: "어느 베이징 기차역인가요?", href: "/ko/guides/which-beijing-railway-station/", description: "칭허, 베이징북과 다른 주요 터미널을 구분합니다." },
    { label: "첫 베이징 여행 숙소 지역", href: "/ko/guides/beijing-where-to-stay-first-trip/", description: "숙소 지역이 첫 구간을 바꿉니다." },
    { label: "베이징에서 무톈위까지", href: "/ko/guides/beijing-to-mutianyu-great-wall-transfer/", description: "무톈위를 정한 뒤에만 이용합니다." },
    { label: "중국 일정이 너무 빠듯한가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "긴 이동이 있는 하루를 보호합니다." },
  ]},
  { id: "sources", type: "sources", title: "공식 출처와 사진 표기", items: [
    { label: "바다링 대중교통 노선", url: "https://english.beijing.gov.cn/latest/news/202406/t20240624_3725018.html", publisher: "베이징시 정부", reviewedAt: "2026-08-12" },
    { label: "877번 방문 안내", url: "https://english.beijing.gov.cn/latest/news/202407/t20240728_3760871.html", publisher: "베이징시 정부", reviewedAt: "2026-08-12" },
    { label: "2026년 서우두공항 직행", url: "https://english.beijing.gov.cn/livinginbeijing/transportation/bus/202602/t20260211_4507827.html", publisher: "베이징시 정부", reviewedAt: "2026-08-12" },
    { label: "대표 사진: N509FZ의 바다링역, CC BY-SA 4.0, 일부 자름", url: "https://commons.wikimedia.org/wiki/File:Exterior_of_Badaling_Great_Wall_Railway_Station_(20220109161541).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
