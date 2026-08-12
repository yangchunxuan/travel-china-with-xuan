import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "배와 다리 교통은 같은 문에서 시작하거나 끝나지 않는다. 홍콩 호텔에서 정확한 터미널 또는 홍콩 포트, 출입경, 바다 횡단, 마카오 포트나 배 터미널에서 호텔까지 비교한다." },
  { id: "answer", type: "callout", title: "두 호텔 위치로 후보를 고른다", tone: "decision", body: "당일 배가 편리한 터미널을 잇는다면 먼저 확인한다. HZMB 셔틀은 포트 사이 서비스여서 양쪽에 현지 교통을 더한다. 허가된 직행버스는 정확한 날짜의 승하차가 맞을 때만 환승을 줄인다." },
  { id: "matrix-heading", type: "heading", level: 2, text: "서로 다른 세 국경 상품" },
  { id: "matrix", type: "table", caption: "바다를 건너는 시간은 문 앞 전체 시간이 아니다", columns: ["선택", "잘 맞음", "숨은 일", "확인"], rows: [
    ["국경 통과 배", "홍콩과 마카오 터미널이 호텔에 편리", "수속, 바다 상태, 짐과 후속 이동", "운영사, 터미널, 편, 짐과 중단 규정"],
    ["HZMB 셔틀버스", "홍콩 포트와 마카오 포트 연결이 좋음", "양쪽 현지 이동과 출입경", "포트 접근, 실시간 운영, 결제와 마카오 마지막 구간"],
    ["허가 직행버스", "확인된 정류장이 현지 환승을 줄임", "운영사 노선, 중간 절차와 도로 지연", "허가 운영사, 승하차, 검문과 변경"],
  ]},
  { id: "warning", type: "callout", title: "다리 셔틀은 호텔로 데리러 오지 않는다", tone: "warning", body: "HZMB 공식 안내는 현지 교통으로 홍콩 포트에 가고 셔틀로 마카오 포트에 간 뒤 다시 현지 교통을 이용하는 과정을 설명한다. 차량 세 번의 다리 이동을 가운데 구간만으로 배와 비교하지 않는다." },
  { id: "clock-heading", type: "heading", level: 2, text: "여섯 구간을 만든다" },
  { id: "clock", type: "list", ordered: true, items: ["호텔에서 터미널 또는 홍콩 포트.", "수속, 대기와 출경.", "배, 셔틀 또는 직행버스.", "입경과 짐 찾기.", "마카오 터미널이나 포트에서 정확한 호텔.", "귀환 좌석과 바다/도로 대안."] },
  { id: "groups", type: "comparison", title: "선택을 바꾸는 조건", columns: [
    { heading: "홍콩섬 숙박", items: ["성완 배 좌석 확인", "호텔에서 포트 도로도 비교", "다리 대안 유지"] },
    { heading: "공항 또는 란타우", items: ["HZMB 홍콩 포트가 나을 수 있음", "공항 내부 환승이라 가정하지 않기", "출입경과 짐 시간"] },
    { heading: "가족 또는 여러 가방", items: ["적은 환승이 유리", "모든 서비스의 짐 규정 확인", "출입경에서 일행 유지"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "배나 도로 계획이 실패하면" },
  { id: "recovery", type: "table", caption: "현재 터미널에서 다시 계산", columns: ["실패", "대응"], rows: [
    ["배 취소", "운영사 공지를 보고 전체 HZMB 연결 시간과 비용 계산"],
    ["잘못된 배 터미널", "홍콩을 가로지르기 전에 해당 터미널의 실시간 출발 확인"],
    ["다리 포트에 늦게 도착", "탑승 전에 마카오 후속 이동과 호텔 접수 확인"],
    ["직행버스 정류장 변경", "허가 운영사에 연락하고 비공식 대체 차량 피하기"],
  ]},
  { id: "facts", type: "callout", title: "동적 교통 정보 확인일: 2026년 8월 12일", tone: "neutral", body: "홍콩 해사처는 현재 홍콩-마카오 배 터미널과 국경 배 운영사를 안내한다. HZMB 공식 안내는 셔틀, 국경 직행버스와 허가 차량을 설명한다. 배편, 다리 교통, 요금, 터미널 시간, 짐과 입국 조건은 바뀔 수 있어 날짜별 확인이 필요하다." },
  { id: "help", type: "callout", title: "전체 국경 이동을 비교할까요?", tone: "decision", body: "날짜, 양쪽 호텔, 인원, 짐과 고정 항공편이나 공연을 보내 주세요. Homeground는 환승과 복구를 비교할 수 있지만 실시간 국경이나 운행을 보장하지 않습니다." },
  { id: "links", type: "internal-links", title: "계속 계획하기", items: [
    { label: "선전-홍콩 검문소 선택", href: "/ko/guides/shenzhen-hong-kong-transport-route/", description: "다른 중국 본토 국경 결정에 이용합니다." },
    { label: "국제선 전 중국에서의 마지막 밤", href: "/ko/guides/china-last-night-before-international-flight/", description: "국경 귀환을 보호합니다." },
    { label: "중국 일정이 너무 빠듯한가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "출입경과 터미널 접근을 계산합니다." },
    { label: "중국 여행자 결제", href: "/ko/guides/how-to-pay-in-china-as-a-tourist/", description: "중국 본토 구간이 생기면 결제를 준비합니다." },
  ]},
  { id: "sources", type: "sources", title: "공식 출처와 사진 표기", items: [
    { label: "홍콩 국경 여객 배 터미널", url: "https://www.mardep.gov.hk/en/public-services/port-services/terminal/index.html", publisher: "홍콩 해사처", reviewedAt: "2026-08-12" },
    { label: "국경 배 운항 자료", url: "https://crossboundaryferryservices.mardep.gov.hk/en/", publisher: "홍콩 해사처", reviewedAt: "2026-08-12" },
    { label: "HZMB 대중교통", url: "https://www.hzmb.gov.hk/en/transport.html", publisher: "HZMB 홍콩 사업 관리처", reviewedAt: "2026-08-12" },
    { label: "대표 사진: N509FZ의 강주아오대교, CC BY-SA 4.0, 일부 자름", url: "https://commons.wikimedia.org/wiki/File:Hong_Kong-Zhuhai-Macau_Bridge_at_Sha_Lo_Wan_(20180918131126).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
