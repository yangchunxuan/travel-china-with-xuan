import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "페리와 다리 교통은 같은 곳에서 시작하거나 끝나지 않는다. 홍콩 호텔에서 정확한 페리 터미널 또는 홍콩 출입경 시설까지, 출입경과 바다 횡단을 거쳐 마카오 출입경 시설이나 페리 터미널에서 호텔까지의 전체 동선을 비교해야 한다." },
  { id: "answer", type: "callout", title: "두 호텔의 위치로 후보를 고른다", tone: "decision", body: "당일 페리가 양쪽 호텔과 가까운 터미널을 잇는다면 먼저 확인한다. HZMB 셔틀버스는 출입경 시설 사이만 오가므로 양쪽에 현지 교통을 더해야 한다. 허가된 국경 간 버스는 정확한 날짜의 승하차 지점이 맞을 때만 환승을 줄인다." },
  { id: "matrix-heading", type: "heading", level: 2, text: "국경을 넘는 세 가지 이동 방식" },
  { id: "matrix", type: "table", caption: "바다를 건너는 시간만으로 전체 이동을 판단하지 않는다", columns: ["선택", "잘 맞음", "숨은 일", "확인"], rows: [
    ["국경 간 페리", "홍콩과 마카오 터미널이 호텔에 편리", "수속, 바다 상태, 짐과 후속 이동", "운영사, 터미널, 편명, 짐과 운항 중단 규정"],
    ["HZMB 셔틀버스", "홍콩과 마카오의 출입경 시설 연결이 좋음", "양쪽 현지 이동과 출입경", "시설 접근, 실시간 운영, 결제와 마카오 마지막 구간"],
    ["허가된 국경 간 버스", "확인된 정류장이 현지 환승을 줄임", "운영사 노선, 중간 절차와 도로 지연", "정식 운영사, 승하차 지점, 출입경과 변경 규정"],
  ]},
  { id: "warning", type: "callout", title: "다리 셔틀은 호텔로 데리러 오지 않는다", tone: "warning", body: "HZMB 공식 안내는 현지 교통으로 홍콩 출입경 시설에 가고 셔틀로 마카오 출입경 시설에 간 뒤 다시 현지 교통을 이용하는 과정을 설명한다. 세 구간으로 이어지는 이동을 가운데 셔틀 구간만 보고 페리와 비교하지 않는다." },
  { id: "clock-heading", type: "heading", level: 2, text: "전체 이동을 여섯 구간으로 나눠 계산한다" },
  { id: "clock", type: "list", ordered: true, items: ["호텔에서 페리 터미널 또는 홍콩 출입경 시설까지.", "수속, 대기와 출경.", "페리, 셔틀 또는 직행버스.", "입경과 짐 찾기.", "마카오 터미널이나 출입경 시설에서 정확한 호텔까지.", "돌아오는 편과 바다·도로 운행 중단에 대비한 대안."] },
  { id: "groups", type: "comparison", title: "선택을 바꾸는 조건", columns: [
    { heading: "홍콩섬 숙박", items: ["성완 출발 페리 좌석 확인", "호텔에서 홍콩 출입경 시설까지의 도로 이동도 비교", "다리 경로도 대안으로 준비"] },
    { heading: "공항 또는 란타우", items: ["HZMB 홍콩 출입경 시설이 나을 수 있음", "공항 내부 환승이라고 가정하지 않기", "출입경과 짐 처리 시간"] },
    { heading: "가족 또는 여러 가방", items: ["적은 환승이 유리", "모든 서비스의 짐 규정 확인", "출입경에서 일행 유지"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "배나 도로 계획이 실패하면" },
  { id: "recovery", type: "table", caption: "현재 터미널에서 다시 계산", columns: ["실패", "대응"], rows: [
    ["페리 취소", "운영사 공지를 보고 전체 HZMB 이동 시간과 비용 계산"],
    ["잘못된 페리 터미널", "홍콩을 가로지르기 전에 해당 터미널의 실시간 출발 확인"],
    ["다리 출입경 시설에 늦게 도착", "탑승 전에 마카오 후속 이동과 호텔 접수 확인"],
    ["직행버스 정류장 변경", "정식 운영사에 연락하고 비공식 대체 차량 피하기"],
  ]},
  { id: "facts", type: "callout", title: "동적 교통 정보 확인일: 2026년 8월 13일", tone: "neutral", body: "홍콩 해사처는 현재 홍콩-마카오 페리 터미널과 국경 간 페리 운영사를 안내한다. HZMB 공식 안내는 셔틀버스, 국경 간 버스와 허가된 국경 간 전세 차량을 각각 설명한다. 페리 운항, 다리 교통, 요금, 터미널 운영 시간, 짐과 입국 조건은 바뀔 수 있어 날짜별 확인이 필요하다." },
  { id: "help", type: "callout", title: "전체 국경 이동을 비교할까요?", tone: "decision", body: "날짜, 양쪽 호텔, 인원, 짐과 고정 항공편이나 공연을 보내 주세요. Homeground는 환승과 운행 중단 시의 대안을 비교할 수 있지만 실시간 출입경이나 운행을 보장하지 않습니다." },
  { id: "links", type: "internal-links", title: "계속 계획하기", items: [
    { label: "선전-홍콩 출입경 지점 선택", href: "/ko/guides/shenzhen-hong-kong-transport-route/", description: "다른 중국 본토 출입경 경로를 정할 때 참고합니다." },
    { label: "국제선 전 중국에서의 마지막 밤", href: "/ko/guides/china-last-night-before-international-flight/", description: "출입경 이동 때문에 귀국편이 위험해지지 않게 합니다." },
    { label: "중국 일정이 너무 빠듯한가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "출입경과 터미널 접근을 계산합니다." },
    { label: "중국 여행자 결제", href: "/ko/guides/how-to-pay-in-china-as-a-tourist/", description: "중국 본토 구간이 생기면 결제를 준비합니다." },
  ]},
  { id: "sources", type: "sources", title: "공식 출처와 사진 표기", items: [
    { label: "홍콩 국경 간 여객 페리 터미널", url: "https://www.mardep.gov.hk/en/public-services/port-services/terminal/index.html", publisher: "홍콩 해사처", reviewedAt: "2026-08-12" },
    { label: "국경 간 페리 운항 자료", url: "https://crossboundaryferryservices.mardep.gov.hk/en/", publisher: "홍콩 해사처", reviewedAt: "2026-08-12" },
    { label: "HZMB 대중교통", url: "https://www.hzmb.gov.hk/en/transport.html", publisher: "HZMB 홍콩 사업 관리처", reviewedAt: "2026-08-12" },
    { label: "HZMB 국경 간 교통 분류", url: "https://www.hzmb.gov.hk/en/cross-boundary.html", publisher: "HZMB 홍콩 사업 관리처", reviewedAt: "2026-08-13" },
    { label: "대표 사진: N509FZ의 강주아오대교, CC BY-SA 4.0, 크롭 편집", url: "https://commons.wikimedia.org/wiki/File:Hong_Kong-Zhuhai-Macau_Bridge_at_Sha_Lo_Wan_(20180918131126).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "대표 사진 편집본 라이선스: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
