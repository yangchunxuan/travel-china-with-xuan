import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "decision-lead", type: "lead", text: "지도에서 가장 빨라 보이는 국경검문소가 선전과 홍콩 사이의 가장 빠른 문 앞 이동을 보장하지는 않는다. 양쪽의 실제 지역, 운영 시간, 출입경 절차, 짐과 통과 뒤의 교통을 함께 봐야 한다." },
    { id: "quick-answer", type: "callout", title: "양쪽 문부터 정확히 적기", tone: "decision", body: "선전북역이나 푸톈에서 카오룽·홍콩 도심으로 갈 때는 고속철도를 먼저 비교한다. 뤄후와 홍콩 동철선이 동선에 놓이면 로우, 푸톈 쪽 지하철과 동철선을 잇는다면 록마차우 지선, 난산과 선전 서부 또는 도로 목적지가 중요하면 선전만을 먼저 살핀다. 항공편, 숙소와 시간대에 따라 답은 달라진다." },
    { id: "matrix-heading", type: "heading", level: 2, text: "같은 두 도시 사이에도 국경 이동 조합이 여러 개다" },
    { id: "decision-matrix", type: "table", caption: "국경 구간만이 아니라 전체 연결 비교", columns: ["경로", "먼저 비교할 상황", "놓치기 쉬운 부담", "가정하면 안 되는 것"], rows: [
      ["고속철도: 홍콩서카오룽 ↔ 선전북·푸톈", "정해진 열차가 카오룽·도심·푸톈·선전북과 잘 맞을 때", "역 접근, 열차 선택, 보안검색, 출입경과 큰 역 안 도보", "모든 열차가 두 선전역에 정차한다는 가정"],
      ["로우 ↔ 뤄후", "뤄후나 홍콩 동철선이 원래 동선에 있을 때", "두 철도망, 대기와 짐을 들고 검문소를 통과하는 과정", "로우와 록마차우가 같은 역이라는 생각"],
      ["록마차우 지선 ↔ 푸톈 검문소", "푸톈 지하철과 동철선 연결이 자연스러울 때", "도로 록마차우·황강 검문소와 다른 장소", "푸톈이라는 말만으로 정확한 종점이 정해진다는 생각"],
      ["선전만", "난산·선전 서부나 도로 이동이 더 나을 때", "양쪽 버스·차량과 전체 출입경 절차", "일반 택시가 별도 준비 없이 국경을 통과한다는 가정"],
      ["황강 또는 다른 도로 검문소", "특정 버스·차량·심야 경로를 당일 기준으로 확인했을 때", "비슷한 명칭과 변하는 대중교통", "과거의 24시간·연장 운영 정보가 계속 맞다는 가정"],
    ]},
    { id: "names-warning", type: "callout", title: "록마차우는 서로 다른 두 종점을 가리킬 수 있다", tone: "warning", body: "록마차우 지선은 푸톈 검문소와 이어지는 철도 통과 지점이다. 도로 록마차우 검문소는 황강과 연결된다. ‘록마차우’나 ‘푸톈’만 저장하지 말고 전체 영문·중문 명칭을 보관한다." },
    { id: "door-heading", type: "heading", level: 2, text: "실제 문에서 실제 문까지 계산하기" },
    { id: "door-steps", type: "list", ordered: true, items: ["선전 쪽 숙소 출입구, 공항 터미널 또는 철도역을 정확히 표시한다.", "홍콩 쪽 목적지와 실제로 쓸 MTR역 또는 도로 하차점을 표시한다.", "국경 전 교통, 검문소, 출입경·세관과 국경 뒤 교통을 별도 구간으로 적는다.", "검문소 운영 시간과 양쪽의 마지막 연결편을 확인한다.", "역 안 도보, 대기, 화장실, 표 수령과 복구 여유를 더한다."] },
    { id: "rail-heading", type: "heading", level: 2, text: "고속철도는 선택한 역 조합이 맞을 때만 빠르다" },
    { id: "rail-copy", type: "paragraph", text: "홍콩서카오룽역은 철도와 국경 절차를 한 복합역에 모으지만, 고속철도는 지하철처럼 아무 때나 타는 교통이 아니다. 날짜별로 푸톈과 선전북을 각각 검색한다. 푸톈은 선전 중심부에 유리할 수 있고 선전북은 열차와 연결망이 다를 수 있다. 승차 시간보다 숙소에서 승강장, 도착 홀에서 최종 목적지까지를 비교한다." },
    { id: "people-heading", type: "heading", level: 2, text: "짐과 동행인이 최적의 검문소를 바꾼다" },
    { id: "people-comparison", type: "comparison", title: "조건별로 달라지는 선택", columns: [
      { heading: "가벼운 짐과 유연한 시간", items: ["철도 검문소를 우선 비교", "지하철 한 번 환승은 감수 가능", "두 번째로 쓸 수 있는 검문소 확보"] },
      { heading: "아이·부모님 동행", items: ["엘리베이터와 환승·대기 횟수 줄이기", "출입경 중 일행을 나누지 않기", "도움이 필요한 여행자와 서류를 함께 두기"] },
      { heading: "큰 가방 여러 개", items: ["통로와 검사 과정을 모두 계산", "직행 국경버스가 여러 열차보다 나을 수 있음", "차량의 정확한 종점 확인"] },
    ]},
    { id: "late-heading", type: "heading", level: 2, text: "심야에는 경로보다 검문소 시간이 먼저다" },
    { id: "late-table", type: "table", caption: "이른 시간·심야·운행 중단 때 확인할 것", columns: ["상황", "먼저 확인", "대안"], rows: [
      ["선전 공항 심야 도착", "실제 공항 출구 시간, 검문소와 홍콩 교통 운영", "공항 근처 숙박 또는 확인된 도로 검문소"],
      ["홍콩 막차가 위험", "검문소와 현지 연결편이 모두 열려 있는지", "국경 뒤 이동이 끊겼다면 통과 전 멈추기"],
      ["연휴·대형 행사", "공식 임시 운영 시간과 교통 공지", "양쪽 연결이 모두 성립할 때만 다른 검문소 사용"],
      ["철도 장애", "MTR·고속철도·검문소 공지", "현재 위치에서 다시 계산하고 무조건 이동하지 않기"],
    ]},
    { id: "recovery-heading", type: "heading", level: 2, text: "잘못된 검문소에 도착했을 때" },
    { id: "recovery-list", type: "list", ordered: true, items: ["제한 구역이나 출입경 줄에 들어가기 전 전체 명칭을 확인한다.", "현재 여행자와 서류·짐이 이곳을 이용할 수 있는지 확인한다.", "그대로 통과하는 방법과 가까운 환승점으로 돌아가는 방법을 비교한다.", "통과 후 선전 또는 홍콩 교통을 다시 확인한다.", "연결이 무너졌다면 다른 검문소로 가기 전에 숙소·항공편·열차부터 보호한다."] },
    { id: "fact-check", type: "callout", title: "동적 교통 정보 확인일: 2026년 8월 12일", tone: "neutral", body: "홍콩 공식 체계는 현재 홍콩서카오룽 고속철도, 로우와 록마차우 지선을 철도 여객 통과 지점으로 구분하고 선전만과 록마차우·황강 등 도로 검문소를 별도로 안내한다. 열차, 요금, 운영 시간, 연휴 연장, 버스 정류장과 입국 요건은 날짜별 확인 대상이다." },
    { id: "help-callout", type: "callout", title: "전체 국경 이동을 사람이 확인해야 하나요?", tone: "decision", body: "여행일, 선전과 홍콩의 정확한 양쪽 목적지, 인원, 짐과 고정 항공편·열차를 보내 주세요. Homeground가 어떤 환승과 검문소 가정을 확인해야 하는지 짚어 드릴 수 있으며, 실시간 운행과 입국 허가는 날짜별로 다시 확인해야 합니다." },
    { id: "internal-links", type: "internal-links", title: "이 페이지가 맡지 않는 다음 단계", items: [
      { label: "중국 고속철도 첫 이용 준비", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "철도를 고른 뒤 표, 여권, 보안검색과 탑승을 준비하세요." },
      { label: "일정이 너무 빠듯한지 확인", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "국경 대기와 역 이동도 여행 시간에 넣으세요." },
      { label: "국제선 전 마지막 밤 보호", href: "/ko/guides/china-last-night-before-international-flight/", description: "출국 전 보호되지 않은 국경 이동을 피하세요." },
      { label: "중국 결제 실패 대안 준비", href: "/ko/guides/how-to-pay-in-china-as-a-tourist/", description: "중국 본토 교통비를 낼 방법을 둘 이상 준비하세요." },
    ]},
    { id: "sources", type: "sources", title: "공식 출처와 이미지 표시", items: [
      { label: "국경검문소 체계와 명칭", url: "https://www.sb.gov.hk/eng/special/bound/control.html", publisher: "홍콩 보안국", reviewedAt: "2026-08-12" },
      { label: "육로 국경 교통", url: "https://www.td.gov.hk/en/transport_in_hong_kong/land_based_cross_boundary_transport/index_t.html", publisher: "홍콩 운수서", reviewedAt: "2026-08-12" },
      { label: "고속철도 여정 검색 방법", url: "https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html", publisher: "MTR Corporation", reviewedAt: "2026-08-12" },
      { label: "Hero: Baycrest의 록마차우 지선 사진, CC BY-SA 2.5, 크롭", url: "https://commons.wikimedia.org/wiki/File:Lok_Ma_Chau_Spur_Line_02.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    ]},
  ],
} as const satisfies StructuredPageBody;

export default body;
