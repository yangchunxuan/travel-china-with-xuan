import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "청두 출발 열차는 도로 이동을 크게 줄이지만 주자이거우 계곡에 바로 내려 주지 않는다. 실제 이동은 열차, 이름이 명확한 역-계곡 환승, 같은 날짜에 가능한 귀환의 조합이다." },
  { id: "answer", type: "callout", title: "환승과 귀환도 노선과 함께 예약한다", tone: "decision", body: "황룽주자이역 열차를 먼저 확인한 뒤 날짜가 지정된 ‘주뤼웨싱(九旅悦行)’ 후속 이동을 함께 예약한다. 쑹판역은 같은 공식 채널에서 해당 날짜의 연결편이 확인될 때만 대안으로 검색한다. 항공이나 전 구간 차량은 실제 항공편과 도착 뒤 이용할 교통이 모두 확인되고 전체 동선이 일행에게 더 맞을 때 비교한다." },
  { id: "matrix-heading", type: "heading", level: 2, text: "교통수단은 실제로 연결 과정이다" },
  { id: "matrix", type: "table", caption: "주자이거우 마지막 구간 없이는 완성되지 않는다", columns: ["연결", "잘 맞는 경우", "숨은 부담", "확인"], rows: [
    ["청두 열차→황룽주자이→계곡", "같은 날짜에 열차와 역 환승이 맞음", "정확한 청두역, 산길 마지막 구간과 시간 연결", "열차, 역, 정식 환승 교통, 하차와 귀환"],
    ["청두 열차→쑹판→계곡", "표를 사기 전에 주뤼웨싱에서 당일 연결편이 확인됨", "다른 역과 도로 환승이며 자동 대체가 아님", "실시간 승차·하차 지점과 숙소까지 가는지"],
    ["항공→공항 이동", "실제 항공편과 이름이 확인된 도착 뒤 교통이 전체를 줄임", "공항 접근, 날씨, 짐과 약 88km의 남은 도로", "날짜, 실제 청두 공항, 항공편, 픽업과 운항 중단 규정"],
    ["정기 버스 또는 사전 예약 차량", "현재 공식 채널에 쓸 수 있는 직행 버스가 있거나 일행이 한 번의 승차를 중시함", "긴 산길, 정확한 종점, 기사 휴식과 날씨", "공식 승차권 또는 정식 차량, 정확한 주자이거우 종점, 정차와 취소 규정"],
  ]},
  { id: "warning", type: "callout", title: "황룽주자이는 기차역이지 계곡 입구가 아니다", tone: "warning", body: "기차역, 주자이거우 숙소, 이용할 관광지 입구 세 위치를 저장한다. 한 곳에 도착하는 셔틀표가 다른 두 곳까지 보장하지는 않는다." },
  { id: "steps-heading", type: "heading", level: 2, text: "이 순서로 예약을 만든다" },
  { id: "steps", type: "list", ordered: true, items: ["주자이거우 숙소와 도착 마감을 선택한다.", "날짜와 하차 지점이 정확한 역 또는 공항 환승을 찾는다.", "안전한 연결 시간을 남기는 열차나 항공편을 고른다.", "가는 편을 확정하기 전에 돌아오는 교통도 함께 정한다.", "산악 날씨와 운행 중단에 대비한 대안을 더한다."] },
  { id: "groups", type: "comparison", title: "답을 바꾸는 조건", columns: [
    { heading: "가볍고 독립적", items: ["열차와 버스 조합 가능", "중국어 승차 정보 저장", "음식과 전원 준비"] },
    { heading: "가족 또는 부모님", items: ["도로변 환승 줄이기", "고도와 휴식 여유, 의료 판단은 별도", "숙소 접수 시간 확인"] },
    { heading: "겨울 또는 고정 항공편", items: ["운행 중단에 대비한 넉넉한 여유", "연결이 보장되지 않는 분리 발권 피하기", "청두나 현지 숙박 대안"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "한 구간이 실패하면" },
  { id: "recovery", type: "table", caption: "문제가 생기면 다음 안전한 지점부터 확보한다", columns: ["문제", "대응"], rows: [
    ["열차 지연으로 셔틀 위험", "도착 전 지정 환승사에 연락하고 서면 규정 확인"],
    ["잘못된 역", "멈추고 표의 역을 읽은 뒤 현재 위치의 공식 좌석 확인"],
    ["산길 중단", "교통, 관광과 운영사 공지를 따르고 확인 안 된 길가 차량 피하기"],
    ["귀환 좌석 없음", "새 연결을 만들기 전에 숙소와 다음 항공편 일정을 먼저 확보"],
  ]},
  { id: "facts", type: "callout", title: "동적 교통 정보 확인일: 2026년 8월 12일", tone: "neutral", body: "주자이거우의 2026년 7월 공지는 황룽주자이역 환승을 주뤼웨싱에서 미리 예약하도록 안내하며, 열차 도착에 맞춰 연결되고 관광지 입구까지 약 2시간 걸린다고 설명한다. 쑹판은 같은 채널에 해당 날짜 연결편이 있을 때만 대안이 된다. 공식 도착 안내에 따르면 주황공항은 계곡 입구에서 약 88km 떨어져 있어 항공편을 이용해도 도로 이동이 남는다. 쓰촨항공의 현재 시간표에는 청두–주자이거우 항공편이 일부 요일에만 표시되므로 실제 예약 화면에서 날짜와 청두 출발 공항을 다시 확인해야 한다." },
  { id: "help", type: "callout", title: "철도와 도로 연결을 확인할까요?", tone: "decision", body: "날짜, 청두 숙소, 주자이거우 숙소, 인원, 짐과 고정 항공편을 보내 주세요. Homeground는 연결과 보수적 여유를 표시할 수 있으며 실시간 운행은 운영사가 결정합니다." },
  { id: "links", type: "internal-links", title: "계속 계획하기", items: [
    { label: "중국 고속철도 첫 이용 안내", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "정확한 역 조합을 고른 뒤 이용합니다." },
    { label: "야간열차 또는 주간 고속철도", href: "/ko/guides/china-night-train-or-daytime-high-speed-rail/", description: "시간보다 일정 모양을 비교합니다." },
    { label: "중국 일정이 너무 빠듯한가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "산악 환승에 실제 여유를 둡니다." },
    { label: "중국 여행자 결제", href: "/ko/guides/how-to-pay-in-china-as-a-tourist/", description: "각 구간의 결제 대안을 준비합니다." },
  ]},
  { id: "sources", type: "sources", title: "공식 출처와 사진 표기", items: [
    { label: "2026년 7월 황룽주자이역 환승 안내", url: "https://www.jiuzhai.com/news/notice/11241-2026-07-08-03-30-49", publisher: "주자이거우 풍경명승구", reviewedAt: "2026-08-12" },
    { label: "2026년 황룽주자이·쑹판 및 청두 버스 예약 채널", url: "https://www.jiuzhai.com/news/notice/10929-2026-02-12-11-07-31", publisher: "주자이거우 풍경명승구", reviewedAt: "2026-08-12" },
    { label: "주황공항과 도로 이동 공식 안내", url: "https://www.jiuzhai.com/intelligent-service/arrival-mode", publisher: "주자이거우 풍경명승구", reviewedAt: "2026-08-12" },
    { label: "현재 청두–주자이거우 항공편 시간표", url: "https://flights.sichuanair.com/flight-schedule/1.html", publisher: "쓰촨항공", reviewedAt: "2026-08-12" },
    { label: "철도 공식 예매 채널", url: "https://www.12306.cn/en/index.html", publisher: "중국철도 12306", reviewedAt: "2026-08-12" },
    { label: "대표 사진: Chensiyuan의 주자이거우, CC BY-SA 4.0, 크롭 편집", url: "https://commons.wikimedia.org/wiki/File:1_jiuzhaigou_valley_wu_hua_hai_2011b.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "대표 사진 편집본 라이선스: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
