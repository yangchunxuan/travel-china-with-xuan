import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "상하이-항저우 열차는 많고 빠를 수 있지만 틀린 역 조합은 전체를 느리게 만든다. 표는 상하이 공항이나 호텔, 정확한 상하이역, 정확한 항저우역과 최종 호텔에 모두 맞아야 한다." },
  { id: "answer", type: "callout", title: "여러 역 조합을 검색하고 양쪽 주소를 비교", tone: "decision", body: "홍차오공항이나 상하이 서부에서 시작하면 상하이홍차오를 먼저 본다. 다른 시내 주소에는 쓸 수 있는 직통편이 있을 때 상하이역이나 상하이남역이 나을 수 있다. 항저우에서는 날짜별로 항저우동역·항저우역·항저우남역·항저우서역을 각각 검색하고, 12306에 실제 표시되는 역 조합만 비교한다." },
  { id: "matrix-heading", type: "heading", level: 2, text: "노선은 두 도시명이 아니라 역 조합이다" },
  { id: "matrix", type: "table", caption: "가장 짧은 열차에 가장 긴 접근이 붙을 수 있다", columns: ["역 선택", "잘 맞음", "부담", "확인"], rows: [
    ["상하이홍차오", "홍차오공항, 상하이 서부 또는 많은 고속철도 좌석", "큰 공항-철도 단지와 일부 지역에서 긴 시내 이동", "표에 상하이홍차오와 올바른 입구"],
    ["상하이역", "중심/북부와 날짜에 맞는 직통편", "다른 좌석 유형과 도시명 혼동", "전체 역명, 출발과 지하철 시간"],
    ["상하이남역", "상하이 남서부와 맞는 열차", "홍차오 또는 상하이역과 혼동", "날짜별 열차와 바뀐 시설"],
    ["항저우동·항저우역·항저우남·항저우서", "해당 날짜 열차가 있고 한 역의 호텔/관광지 마지막 구간이 더 좋음", "큰 역 출구, 서로 다른 시내 위치와 날짜별 좌석", "전체 도착역명, 출구, 현재 시내 연결편과 호텔 노선"],
  ]},
  { id: "warning", type: "callout", title: "검색 결과의 상하이는 역 확인이 아니다", tone: "warning", body: "상하이 공식 안내는 도시 곳곳의 여러 주요 및 소형 여객역을 나누고 역 확인을 강조한다. 차량을 부르기 전에 표의 전체 중국어와 영어 역명을 읽는다." },
  { id: "clock-heading", type: "heading", level: 2, text: "전체 이동 시간을 한 번에 계산한다" },
  { id: "clock", type: "list", ordered: true, items: ["상하이 호텔 또는 공항에서 올바른 역 입구.", "보안검색, 도보와 승차 여유.", "검색 요약이 아닌 예약 열차.", "항저우 도착 홀에서 정확한 출구.", "지하철/택시로 호텔과 늦은 교통 대안."] },
  { id: "groups", type: "comparison", title: "좋은 조합을 바꾸는 조건", columns: [
    { heading: "홍차오 항공 연결", items: ["홍차오 철도가 첫 구간을 줄일 수 있음", "짐과 터미널 이동 시간을 충분히 확보", "빠듯한 항공-철도 연결 피하기"] },
    { heading: "상하이 중심 호텔", items: ["상하이역 좌석 비교", "긴 열차가 시내 이동을 줄일 수 있음", "전체 역명 확인"] },
    { heading: "늦은 항저우 도착", items: ["호텔까지의 마지막 구간으로 역 선택", "마지막 지하철 별도 확인", "공식 택시 승강장과 호텔 늦은 체크인 대안"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "잘못된 역에 갔다면" },
  { id: "recovery", type: "table", caption: "도시를 가로지르기 전에 멈춘다", columns: ["문제", "대응"], rows: [
    ["잘못된 상하이 터미널", "공식 표 변경/좌석부터 보고 도시 횡단과 비교"],
    ["열차가 검색되지 않음", "날짜와 역 조합으로 12306 확인; 시간표는 변경됨"],
    ["예상 밖 항저우역 도착", "역을 나가기 전 출구 지도를 읽고 호텔 노선 재계산"],
    ["마지막 지하철 놓침", "공식 택시 줄과 호텔 연락을 사용하고 호객 피하기"],
  ]},
  { id: "facts", type: "callout", title: "동적 교통 정보 확인일: 2026년 8월 13일", tone: "neutral", body: "상하이 공식 안내는 상하이역, 상하이남역, 상하이홍차오역과 다른 역을 서로 다른 지하철 접근 지점으로 구분한다. 현재 항저우 철도 안내도 항저우역·항저우동역·항저우남역·항저우서역을 별도 여객역으로 안내하며 표에 적힌 역과 열차를 12306에서 확인하도록 한다. 좌석, 요금과 시내 마지막 교통은 날짜별로 달라진다." },
  { id: "help", type: "callout", title: "양쪽 호텔에 맞는 역을 확인할까요?", tone: "decision", body: "날짜, 상하이 출발지, 항저우 주소, 인원, 짐과 고정 항공편 또는 행사를 보내 주세요. Homeground는 전체 이동 시간과 문제가 생겼을 때의 대안을 비교할 수 있으며 실시간 좌석은 12306이 관리합니다." },
  { id: "links", type: "internal-links", title: "계속 계획하기", items: [
    { label: "상하이 푸둥 또는 홍차오공항", href: "/ko/guides/shanghai-pudong-or-hongqiao-airport/", description: "공항-철도 연결 전에 공항을 고릅니다." },
    { label: "중국 고속철도 첫 이용 안내", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "역 조합을 고른 뒤 표와 승차를 준비합니다." },
    { label: "야간열차 또는 주간 고속철도", href: "/ko/guides/china-night-train-or-daytime-high-speed-rail/", description: "더 먼 후속 이동의 일정 모양을 비교합니다." },
    { label: "중국 일정이 너무 빠듯한가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "큰 도시의 앞뒤 이동을 계산합니다." },
  ]},
  { id: "sources", type: "sources", title: "공식 출처와 사진 표기", items: [
    { label: "상하이 기차역 안내", url: "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html", publisher: "상하이시 정부", reviewedAt: "2026-08-12" },
    { label: "2026년 1월 장강삼각주 시간표 변경", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260120/4fefd5c7bcfd4ec0a45f6c882cfbbd9e.html", publisher: "상하이시 정부", reviewedAt: "2026-08-12" },
    { label: "현재 항저우 여객역과 시내 교통 안내", url: "https://hznews.hangzhou.com.cn/chengshi/content/2026-04/29/content_9214782.htm", publisher: "항저우닷컴·항저우역 안내", reviewedAt: "2026-08-12" },
    { label: "철도 공식 예매 채널", url: "https://www.12306.cn/en/index.html", publisher: "중국철도 12306", reviewedAt: "2026-08-12" },
    { label: "대표 사진: Staeiou의 항저우동역, CC BY-SA 4.0, 크롭 편집", url: "https://commons.wikimedia.org/wiki/File:Hangzhou_East_railway_station_interior.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "대표 사진 편집본 라이선스: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
