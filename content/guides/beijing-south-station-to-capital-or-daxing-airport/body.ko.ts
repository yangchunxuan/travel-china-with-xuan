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
  {
    "id": "capital-rail-heading",
    "type": "heading",
    "level": 2,
    "text": "베이징남역에서 서우두공항(PEK)까지 가는 철도 경로"
  },
  {
    "id": "capital-rail-intro",
    "type": "paragraph",
    "text": "4호선 → 2호선 → 서우두공항선을 이용할 수 있습니다. 출발 전에 세 노선의 당일 운행 안내를 각각 확인하세요."
  },
  {
    "id": "capital-rail-steps",
    "type": "list",
    "ordered": true,
    "items": [
      "베이징남역(北京南站)에서 지하철 4호선 표지를 따라 안허차오베이(安河桥北) 방향에 탑니다. 타오란팅과 차이스커우를 지나 쉬안우먼(宣武门)에서 내리세요.",
      "2호선으로 갈아타고 다음 역이 허핑먼(和平门)인 방향을 선택합니다. 둥즈먼(东直门)까지 이동하세요.",
      "둥즈먼에서 서우두공항선(首都机场线) 표지를 따라 공항행 열차에 탑니다. 항공권에 적힌 3터미널(3号航站楼) 또는 2터미널(2号航站楼)에서 내리세요.",
      "공항 열차에서 내린 뒤 출발층과 항공사 표지를 따라갑니다. 환승 통로, 대기와 공항 수속 시간을 더하세요. 첫 지하철의 막차에 탔다고 다음 노선까지 연결되는 것은 아닙니다."
    ]
  },
  {
    "id": "capital-rail-official",
    "type": "sources",
    "title": "출발 전 노선 확인",
    "items": [
      {
        "label": "4호선 역 순서와 운행 시간",
        "url": "https://www.mtr.bj.cn/service/line/timetable/line-4"
      },
      {
        "label": "2호선 역 순서",
        "url": "https://www.mtr.bj.cn/service/line/timetable/line-2.html"
      },
      {
        "label": "서우두공항선 환승역과 터미널",
        "url": "https://zdzqgw.beijing.gov.cn/zqfw/bjsdgjjc/bjsdgjjcjb/202410/t20241012_3917833.html"
      }
    ]
  },
  {
    "id": "daxing-rail-heading",
    "type": "heading",
    "level": 2,
    "text": "베이징남역에서 다싱공항까지 가는 지하철 경로"
  },
  {
    "id": "daxing-rail-intro",
    "type": "paragraph",
    "text": "아래 역 이름을 표지판에서 확인하고, 도착 시간에 각 노선이 운행하는지 출발 전에 확인하세요."
  },
  {
    "id": "daxing-rail-steps",
    "type": "list",
    "ordered": true,
    "items": [
      "베이징남역(北京南站) 열차 승강장을 나온 뒤 지하철 4호선 표지판을 따르세요. 톈궁위안(天宫院) 방면을 타고 마자바오(马家堡)를 지나 자오먼시(角门西)에서 내립니다.",
      "자오먼시에서 10호선으로 갈아타세요. 다음 역이 차오차오(草桥)인 방향을 골라 한 정거장 이동합니다.",
      "환승 표지판을 따라 다싱공항선(大兴机场线)으로 이동해 다싱공항 방면 열차를 탑니다. 다싱신청(大兴新城)을 지나 공항까지 갑니다.",
      "공항에 도착하면 항공사 출발 구역을 확인하세요. 열차 탑승 시간 외에 역내 보행, 환승과 매번 열차를 기다리는 시간도 따로 계산해야 합니다."
    ]
  },
  { id: "warning", type: "callout", title: "‘베이징 공항’이라는 말만 따르지 않는다", tone: "warning", body: "기사에게 PEK 또는 PKX와 터미널을 보여 준다. 다싱은 서우두공항의 새 터미널이 아니고 서우두도 다싱의 터미널이 아니다. 잘못 가면 단순한 우회가 아니라 다른 공항으로 다시 이동해야 한다." },
  { id: "clock-heading", type: "heading", level: 2, text: "항공사 마감에서 거꾸로 계산" },
  {
    "id": "three-hour-gap",
    "type": "paragraph",
    "text": "열차 도착 예정 시각과 항공편 출발 사이의 3시간은 전체 연결 시간입니다. 공항에 도착한 뒤 3시간이 남는다는 뜻이 아닙니다. 해당 국내선 또는 국제선의 체크인·수하물 마감 시각을 확인하고, 역에서 나오는 시간, 모든 환승과 대기, 지연 여유 및 공항 내 보행을 포함해 판단하세요."
  },
  { id: "clock", type: "list", ordered: true, items: ["체크인·위탁 수하물과 탑승 마감.", "정확한 터미널 안 도보와 보안검색·출국 심사.", "도로 또는 철도 이동과 운행 중단에 대비한 여유.", "베이징남역 승강장에서 출구와 승차·환승 지점까지.", "열차 지연에 대비한 여유와 원래 연결을 포기할 결정 시점."] },
  { id: "groups", type: "comparison", title: "여행자 조건이 바꾸는 선택", columns: [
    { heading: "가볍고 주간", items: ["철도 구조가 비교적 예측 가능", "모든 환승명 저장", "마지막 편 확인"] },
    { heading: "가족 또는 여러 가방", items: ["승강기와 통로 이동 계산", "공항까지 바로 가는 차량이 더 단순할 수 있음", "아동 좌석 요구를 명확히"] },
    { heading: "늦은 도착 또는 국제선", items: ["훨씬 큰 여유", "실시간 버스/철도 마감 확인", "공항 근처 숙박이 더 안전할 수 있음"] },
  ]},
  { id: "station-heading", type: "heading", level: 2, text: "환승 시계는 철도역 출구 전부터 시작됩니다" },
  { id: "station-copy", type: "paragraph", text: "열차 도착 시각은 승강장에 닿는 시각이지 여행자가 택시나 공항철도에 타는 시각이 아닙니다. 객차에서 내리고, 가방을 챙기고, 정확한 출구를 따라 큰 대합실을 지나 픽업 지점이나 지하철 입구를 찾아야 합니다. 수단이 확정될 때까지 일행이 함께 움직이세요. 기사가 마중 나온다면 ‘베이징 남역’만 보내지 말고 열차 번호, 승객 이름, 실시간 지연, 표지판이 있는 정확한 만남 장소를 주고받습니다." },
  { id: "risk-heading", type: "heading", level: 2, text: "차량을 고르기 전에 연결 위험을 분류하세요" },
  { id: "risk-matrix", type: "table", caption: "같은 환승, 다른 결과", columns: ["연결", "계획 판단", "필요한 대응"], rows: [
    ["보호되는 한 예약의 국내선", "보호 여부는 항공사 규정에 따르지만 도시 이동은 여행자 책임입니다", "실제 운항사, 터미널, 마감 시각을 확인합니다"],
    ["별도 구매한 국제선", "열차나 도시 교통 실패의 결과가 가장 큽니다", "더 큰 여유를 두거나 공항 근처에서 숙박합니다"],
    ["심야 도착", "대중교통은 줄고 도로 수요는 늘 수 있습니다", "열차 탑승 전에 마지막 이용 가능 수단과 합법 택시 승강장을 확인합니다"],
    ["위탁 수하물이 있는 일행", "승강장 출구, 차량 크기, 수하물 위탁이 모두 더 걸립니다", "혼자 기내용 가방만 든 최단 사례로 계산하지 않습니다"],
  ]},
  { id: "road", type: "callout", title: "도로 차량은 환승을 줄일 뿐 불확실성을 없애지 않습니다", tone: "neutral", body: "교통 정체, 픽업 구역 규칙, 차량 찾기도 이동의 일부입니다. 공항 코드, 터미널, 항공편을 글로 확인하고 모든 승객과 가방이 들어가는지 확인하세요. 규정된 택시 승강장이나 앱에 표시된 합법적인 호출차 픽업을 이용하고 역 안의 호객 차량은 거절합니다. 도로 상황이 나빠지면 택시가 무조건 빠르다고 가정하지 말고 항공사 마감을 다시 계산하세요." },
  { id: "go-no-go-heading", type: "heading", level: 2, text: "열차가 베이징에 닿기 전에 진행·중단 기준을 정하세요" },
  { id: "go-no-go", type: "list", ordered: true, items: ["항공사 자체의 체크인, 수하물 위탁, 탑승 마감을 기록하고 일반적인 공항 권고로 바꾸지 않습니다.", "가장 이른 관련 마감에서 터미널 보안, 도시 이동, 철도역 출구 여유를 각각 뺍니다.", "정해 둔 열차 지연에 도달하면 항공사에 연락하고 즉시 수단을 바꾸는 기준을 만듭니다.", "항공 예약, 여권, 공항 코드, 터미널, 합법 픽업 안내를 오프라인으로 보관합니다.", "여행 전에 계산해도 방어 가능한 여유가 없다면 모든 구간이 최단으로 움직이길 기대하지 말고 열차를 바꾸거나 공항 숙박을 추가합니다."] },
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
