import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "구이린과 양숴는 각각 하나의 위치가 아니다. 구이린에는 공항과 여러 기차역이 있고 양숴역은 교통 지점이지 양숴 호텔이 아니다. 강 이동도 별도 선착장과 짐 연결이 있다." },
  { id: "answer", type: "callout", title: "양쪽 주소와 하루의 목적을 기준으로", tone: "decision", body: "공항이나 호텔 문과 짐이 중요하면 도로 이동을 비교한다. 정확한 역과 후속 차량이 깔끔하게 이어지면 열차를 쓴다. 리강 유람선은 일반 빠른 셔틀이 아니라 이동을 바꾸는 관광 하루로 본다." },
  { id: "matrix-heading", type: "heading", level: 2, text: "한 시간 숫자로 비교할 수 없는 세 상품" },
  { id: "matrix", type: "table", caption: "각 선택은 다른 곳에서 시작하고 끝난다", columns: ["선택", "잘 맞음", "빠진 구간", "확인"], rows: [
    ["양숴역 열차", "직통 열차나 편리한 구이린역과 연결", "양숴 쪽 역에서 호텔까지 도로 이동", "정확한 역, 당일 열차와 확인된 픽업"],
    ["도로 버스나 차량", "공항/호텔 양쪽, 가족이나 여러 가방", "도로, 정확한 승차와 여러 하차 지점", "합법 운영사, 양쪽 위치, 짐과 체크인 마감"],
    ["리강 유람선", "강 여행이 계획한 경험이며 방향이 맞음", "선착장 접근, 짐, 날씨와 호텔 이동", "공식 또는 허가 상품, 선착장, 날짜, 짐 규정과 도착"],
  ]},
  { id: "warning", type: "callout", title: "양숴역 표는 시제 도착 표가 아니다", tone: "warning", body: "구매 전에 역과 숙소를 따로 표시한다. 구이린 출발역이나 양숴 도로 환승이 틀리면 짧은 열차 구간의 장점이 사라진다." },
  { id: "direction-heading", type: "heading", level: 2, text: "강 관광은 방향이 중요하다" },
  { id: "direction", type: "paragraph", text: "관광 유람선을 대칭적인 왕복 교통으로 가정하지 않는다. 출발과 도착 선착장, 운영일, 짐 처리와 호텔 후속 이동을 확인한다. 귀환은 가는 편을 뒤집지 말고 별도로 만든다." },
  { id: "groups", type: "comparison", title: "여행자에 맞는 연결", columns: [
    { heading: "공항 도착", items: ["항공 지연 여유 보호", "도로가 두 번의 환승을 줄일 수 있음", "늦으면 호텔에 알리기"] },
    { heading: "철도 통과", items: ["정확한 양숴 정차 검색", "역 픽업 확인", "이유 없이 구이린 시내로 우회하지 않기"] },
    { heading: "풍경과 여유", items: ["강을 하루의 목적으로", "짐 이동 또는 보관을 계획", "날씨 대안 유지"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "양쪽 위치가 맞지 않을 때" },
  { id: "recovery", type: "list", ordered: true, items: ["예약의 전체 역, 선착장 또는 정류장명을 읽는다.", "정확한 호텔 위치를 허가된 운영사에 보낸다.", "교통을 바꾸기 전에 체크인과 다음 고정 열차를 보호한다.", "실시간 변경은 철도와 현지 교통 공식 공지로 확인한다.", "양숴라고 적힌 이름 없는 길가 차량을 타지 않는다."] },
  { id: "facts", type: "callout", title: "동적 교통 정보 확인일: 2026년 8월 12일", tone: "neutral", body: "광시 공식 계획은 공항, 기차역, 도로 교통과 주요 관광지를 별도 지점으로 보고 마지막 구간 연결을 요구한다. 열차, 도로 버스, 유람선, 선착장, 요금, 짐과 날씨 운영은 날짜별로 달라지며 고정 시간표를 제시하지 않는다." },
  { id: "help", type: "callout", title: "양쪽 목적지를 비교할까요?", tone: "decision", body: "날짜, 구이린 도착 지점, 양숴 호텔, 인원, 짐과 강 이동이 교통인지 경험인지 보내 주세요. Homeground는 환승과 다시 확인할 사실을 표시할 수 있습니다." },
  { id: "links", type: "internal-links", title: "계속 계획하기", items: [
    { label: "중국 고속철도 첫 이용 안내", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "역을 고른 뒤 철도를 준비합니다." },
    { label: "중국 일정이 너무 빠듯한가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "강이나 도로 하루에 충분한 공간을 둡니다." },
    { label: "중국 여행자 결제", href: "/ko/guides/how-to-pay-in-china-as-a-tourist/", description: "마지막 구간의 결제 대안을 둡니다." },
    { label: "중국 호텔과 지하철", href: "/ko/guides/china-hotel-near-metro/", description: "역 이름이 숙소에 언제 도움이 되는지 봅니다." },
  ]},
  { id: "sources", type: "sources", title: "공식 출처와 사진 표기", items: [
    { label: "구이린 교통과 마지막 구간 정책", url: "https://fgw.gxzf.gov.cn/zfxxgkzl/wjzx/tzgg/t2196037.shtml", publisher: "광시 발전개혁위원회", reviewedAt: "2026-08-12" },
    { label: "철도 운행 변경 안내", url: "https://jtt.gxzf.gov.cn/xwdt/tpxw/t8700434.shtml", publisher: "광시 교통운수청", reviewedAt: "2026-08-12" },
    { label: "철도 공식 예매 채널", url: "https://www.12306.cn/en/index.html", publisher: "중국철도 12306", reviewedAt: "2026-08-12" },
    { label: "대표 사진: Rat2의 양숴역, CC BY-SA 4.0, 일부 자름", url: "https://commons.wikimedia.org/wiki/File:Yangshuo_Railway_Station_202102.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
