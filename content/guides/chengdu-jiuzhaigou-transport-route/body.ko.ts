import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "청두 출발 열차는 도로 이동을 크게 줄이지만 주자이거우 계곡에 바로 내려 주지 않는다. 실제 이동은 열차, 이름이 명확한 역-계곡 환승, 같은 날짜에 가능한 귀환의 조합이다." },
  { id: "answer", type: "callout", title: "환승과 귀환도 노선과 함께 예약한다", tone: "decision", body: "황룽주자이역 열차를 먼저 보고 공식 또는 이름이 확인된 후속 이동을 찾는다. 쑹판역은 해당 날짜의 계곡 연결이 확인될 때만 대안으로 검색한다. 항공이나 전 구간 차량은 일행, 날씨 여유와 청두 양쪽 위치에 더 맞을 때 비교한다." },
  { id: "matrix-heading", type: "heading", level: 2, text: "교통수단은 실제로 연결 과정이다" },
  { id: "matrix", type: "table", caption: "주자이거우 마지막 구간 없이는 완성되지 않는다", columns: ["연결", "잘 맞는 경우", "숨은 부담", "확인"], rows: [
    ["청두 열차→황룽주자이→계곡", "같은 날짜에 열차와 역 환승이 맞음", "정확한 청두역, 산길 마지막 구간과 시간 연결", "열차, 역, 합법 환승, 하차와 귀환"],
    ["청두 열차→쑹판→계곡", "좌석과 확인된 후속편이 있음", "다른 역과 도로 환승이며 자동 대체가 아님", "정확한 승차와 숙소까지 가는지"],
    ["항공→공항 이동", "항공과 공항 양쪽이 전체를 줄임", "공항 접근, 날씨, 짐과 남은 도로", "공항, 항공편, 픽업과 중단 규정"],
    ["전 구간 차량", "한 번의 승차를 중시하는 일행", "긴 산길, 기사 휴식과 날씨", "합법 차량, 기사, 정차, 좌석 안전 장치와 취소"],
  ]},
  { id: "warning", type: "callout", title: "황룽주자이는 기차역이지 계곡 입구가 아니다", tone: "warning", body: "기차역, 주자이거우 숙소, 이용할 관광지 입구 세 위치를 저장한다. 한 곳에 도착하는 셔틀표가 다른 두 곳까지 보장하지는 않는다." },
  { id: "steps-heading", type: "heading", level: 2, text: "이 순서로 예약을 만든다" },
  { id: "steps", type: "list", ordered: true, items: ["주자이거우 숙소와 도착 마감을 선택한다.", "날짜와 하차 지점이 정확한 역 또는 공항 환승을 찾는다.", "안전한 연결 시간을 남기는 열차나 항공편을 고른다.", "가는 편 확정 전에 반대 방향 귀환도 만든다.", "산악 날씨와 운행 중단 복구를 더한다."] },
  { id: "groups", type: "comparison", title: "답을 바꾸는 조건", columns: [
    { heading: "가볍고 독립적", items: ["열차와 버스 조합 가능", "중국어 승차 정보 저장", "음식과 전원 준비"] },
    { heading: "가족 또는 부모님", items: ["도로변 환승 줄이기", "고도와 휴식 여유, 의료 판단은 별도", "숙소 접수 시간 확인"] },
    { heading: "겨울 또는 고정 항공편", items: ["더 큰 중단 여유", "보호 없는 분리 표 피하기", "청두나 현지 숙박 대안"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "한 구간이 실패하면" },
  { id: "recovery", type: "table", caption: "다음 안전한 장소부터 보호한다", columns: ["실패", "복구"], rows: [
    ["열차 지연으로 셔틀 위험", "도착 전 지정 환승사에 연락하고 서면 규정 확인"],
    ["잘못된 역", "멈추고 표의 역을 읽은 뒤 현재 위치의 공식 좌석 확인"],
    ["산길 중단", "교통, 관광과 운영사 공지를 따르고 확인 안 된 길가 차량 피하기"],
    ["귀환 좌석 없음", "새 연결을 만들기 전에 숙소와 다음 항공편 보호"],
  ]},
  { id: "facts", type: "callout", title: "동적 교통 정보 확인일: 2026년 8월 12일", tone: "neutral", body: "쓰촨 공식 자료는 황룽주자이역에서 주자이거우 방향 여객 환승과 이후 황룽주자이·쑹판 수송 확대를 설명한다. 열차 좌석, 환승 출발, 도로, 항공과 관광지 접근은 날짜별로 달라지며 이 글은 시간이나 요금을 약속하지 않는다." },
  { id: "help", type: "callout", title: "철도와 도로 연결을 확인할까요?", tone: "decision", body: "날짜, 청두 숙소, 주자이거우 숙소, 인원, 짐과 고정 항공편을 보내 주세요. Homeground는 연결과 보수적 여유를 표시할 수 있으며 실시간 운행은 운영사가 결정합니다." },
  { id: "links", type: "internal-links", title: "계속 계획하기", items: [
    { label: "중국 고속철도 첫 이용 안내", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "정확한 역 조합을 고른 뒤 이용합니다." },
    { label: "야간열차 또는 주간 고속철도", href: "/ko/guides/china-night-train-or-daytime-high-speed-rail/", description: "시간보다 일정 모양을 비교합니다." },
    { label: "중국 일정이 너무 빠듯한가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "산악 환승에 실제 여유를 둡니다." },
    { label: "중국 여행자 결제", href: "/ko/guides/how-to-pay-in-china-as-a-tourist/", description: "각 구간의 결제 대안을 준비합니다." },
  ]},
  { id: "sources", type: "sources", title: "공식 출처와 사진 표기", items: [
    { label: "황룽주자이역 환승 운영", url: "https://wlt.sc.gov.cn/scwlt/hydt/2024/8/30/5008ba73ea8b45b6bf1d9fedf998f465.shtml", publisher: "쓰촨성 문화관광청", reviewedAt: "2026-08-12" },
    { label: "황룽주자이와 쑹판 수송 확대", url: "https://gzw.sc.gov.cn/scsgzw/CU230505/2025/10/23/f65a8a3aaf9948b9908811db46f92f8b.shtml", publisher: "쓰촨성 국자위", reviewedAt: "2026-08-12" },
    { label: "철도 공식 예매 채널", url: "https://www.12306.cn/en/index.html", publisher: "중국철도 12306", reviewedAt: "2026-08-12" },
    { label: "대표 사진: Chensiyuan의 주자이거우, CC BY-SA 4.0, 일부 자름", url: "https://commons.wikimedia.org/wiki/File:1_jiuzhaigou_valley_wu_hua_hai_2011b.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
