import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "베이징의 두 주요 공항은 방향이 다르다. 베이징남역에서 항공편을 이을 때 공항 코드와 터미널부터 읽고 항공사 마감에서 역 출구, 시내 이동, 공항 도보와 수속을 거꾸로 계산한다." },
  { id: "answer", type: "callout", title: "PEK와 PKX는 서로 다른 공항이다", tone: "decision", body: "PKX는 지하철로 차오차오(草桥)에서 다싱공항선으로 갈아타는 방법과 도로 이동을 비교한다. PEK는 현재 베이징남역 공항버스, 지하철·공항철도와 도로 이동을 비교한다. 정확한 시각, 짐, 인원, 운행 중단에 대비한 여유에 따라 답이 달라진다." },
  { id: "matrix-heading", type: "heading", level: 2, text: "공항을 먼저 고르고 교통을 고른다" },
  { id: "matrix", type: "table", caption: "모든 선택은 열차에서 실제로 나온 뒤 시작한다", columns: ["연결", "잘 맞음", "부담", "확인"], rows: [
    ["베이징남→지하철→다싱공항선→PKX", "주간, 관리 가능한 짐과 철도 운영", "역 통로, 환승, 별도 공항철도와 터미널 도보", "현재 지하철, 마지막 편과 터미널"],
    ["베이징남→현재 공항버스→PEK", "날짜별 출발이 맞고 정류장이 명확", "대기, 도로, 중간 정류장과 터미널 순서", "공식 플랫폼, 승차, 출발과 서비스 터미널"],
    ["베이징남→지하철/공항철도→PEK", "철도가 운영하고 환승이 일행에 맞음", "도시 횡단 환승과 짐", "실시간 노선, 운영 시간과 터미널"],
    ["공식 택시/호출차→어느 공항", "여러 명, 큰 짐 또는 철도 운행 종료", "도로 정체, 승차 구역과 통행료", "공항 코드, 터미널, 정식 승차 지점과 시간 여유"],
  ]},
  { id: "warning", type: "callout", title: "‘베이징 공항’이라는 말만 따르지 않는다", tone: "warning", body: "기사에게 PEK 또는 PKX와 터미널을 보여 준다. 다싱은 서우두공항의 새 터미널이 아니고 서우두도 다싱의 터미널이 아니다. 잘못 가면 단순한 우회가 아니라 다른 공항으로 다시 이동해야 한다." },
  { id: "clock-heading", type: "heading", level: 2, text: "항공사 마감에서 거꾸로 계산" },
  { id: "clock", type: "list", ordered: true, items: ["체크인·위탁 수하물과 탑승 마감.", "정확한 터미널 안 도보와 보안검색·출국 심사.", "도로 또는 철도 이동과 운행 중단에 대비한 여유.", "베이징남역 승강장에서 출구와 승차·환승 지점까지.", "열차 지연에 대비한 여유와 원래 연결을 포기할 결정 시점."] },
  { id: "groups", type: "comparison", title: "여행자 조건이 바꾸는 선택", columns: [
    { heading: "가볍고 주간", items: ["철도 구조가 비교적 예측 가능", "모든 환승명 저장", "마지막 편 확인"] },
    { heading: "가족 또는 여러 가방", items: ["승강기와 통로 이동 계산", "공항까지 바로 가는 차량이 더 단순할 수 있음", "아동 좌석 요구를 명확히"] },
    { heading: "늦은 도착 또는 국제선", items: ["훨씬 큰 여유", "실시간 버스/철도 마감 확인", "공항 근처 숙박이 더 안전할 수 있음"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "잘못된 공항 또는 연결 실패" },
  { id: "recovery", type: "table", caption: "원래 계획보다 항공편을 먼저 지킨다", columns: ["문제", "대응"], rows: [
    ["열차 지연", "항공사 마감으로 다시 계산하고 확인된 더 빠른 연결만 선택"],
    ["잘못된 공항", "즉시 항공사에 연락한 뒤 현재 공식 공항 간 또는 도로 이동 사용"],
    ["오래된 글의 베이징남-다싱 직행", "의존하지 않기: 베이징남 다싱 야간 2선은 2026년 4월 7일부터 중단"],
    ["마지막 철도 놓침", "공식 공항버스 승차장 또는 정식 택시 승강장을 이용하고 호객을 피하기"],
  ]},
  { id: "facts", type: "callout", title: "동적 교통 정보 확인일: 2026년 8월 13일", tone: "neutral", body: "베이징의 2026년 4월 공지는 서우두공항-베이징남 버스를 조정해 유지하고 다싱공항-베이징남 야간 2선을 중단했다. 7월 공지는 서우두공항 노선의 늦은 시내 방향 운행을 연장했다. 지하철, 공항철도, 버스, 정류장과 시간은 날짜별로 달라진다." },
  { id: "help", type: "callout", title: "철도-항공 연결을 점검할까요?", tone: "decision", body: "날짜, 열차와 도착, 공항 코드와 터미널, 항공 시각, 인원과 짐을 보내 주세요. Homeground는 결정 시점과 대안을 찾을 수 있으며 실시간 서비스는 운영사가 결정합니다." },
  { id: "links", type: "internal-links", title: "전체 일정에 여유를 더하기", items: [
    { label: "어느 베이징 기차역인가요?", href: "/ko/guides/which-beijing-railway-station/", description: "열차가 실제 베이징남역에 오는지 확인합니다." },
    { label: "중국 고속철도 첫 이용 안내", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "공항 환승 전 철도 구간을 준비합니다." },
    { label: "국제선 전 중국에서의 마지막 밤", href: "/ko/guides/china-last-night-before-international-flight/", description: "같은 날 연결을 피할 때를 정합니다." },
    { label: "첫 베이징 여행 숙소 지역", href: "/ko/guides/beijing-where-to-stay-first-trip/", description: "연결이 안전하지 않으면 호텔 밤을 둡니다." },
  ]},
  { id: "sources", type: "sources", title: "공식 출처와 사진 표기", items: [
    { label: "2026년 4월 공항버스 변경", url: "https://english.beijing.gov.cn/latest/news/202603/t20260330_4569792.html", publisher: "베이징시 정부", reviewedAt: "2026-08-12" },
    { label: "2026년 7월 공항버스 변경", url: "https://english.beijing.gov.cn/livinginbeijing/transportation/bus/202607/t20260727_4792045.html", publisher: "베이징시 정부", reviewedAt: "2026-08-12" },
    { label: "기차역 일곱 곳과 공항 두 곳 철도 연결", url: "https://english.beijing.gov.cn/livinginbeijing/transportation/beijingsubway/202412/t20241216_3966828.html", publisher: "베이징시 정부", reviewedAt: "2026-08-12" },
    { label: "대표 사진: N509FZ의 베이징남역, CC BY-SA 4.0, 크롭 편집", url: "https://commons.wikimedia.org/wiki/File:North_square_of_Beijing_South_Railway_Station_(20180722170459).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "대표 사진 편집본 라이선스: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
