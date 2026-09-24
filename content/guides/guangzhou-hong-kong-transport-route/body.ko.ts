import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "decision-lead", type: "lead", text: "광저우와 홍콩은 가까워서 고속철도가 당연한 선택처럼 보입니다. 하지만 실제 선택은 광저우 숙소가 표에 적힌 출발역과 맞는지, 철도 이동과 출입경 절차까지 따졌을 때 홍콩서카오룽이 최종 주소와 맞는지에 달려 있습니다." },
    { id: "quick-answer", type: "callout", title: "정답을 정하기 전에 전체 동선부터 비교하기", tone: "decision", body: "광저우남역과 홍콩서카오룽이 모두 동선에 맞으면 직통 고속철도부터 확인하세요. 광저우동역도 정확한 날짜로 따로 검색하세요. 현재 12306의 국경 간 상품에는 광저우남역과 광저우동역이 모두 나오지만, 모든 날짜에 모든 역 조합의 좌석이 있는 것은 아닙니다. 정식 국경 간 버스는 확정된 승하차 지점 덕분에 환승이 충분히 줄어 도로와 국경의 변수를 감수할 만할 때만 비교하세요." },
    { id: "matrix-heading", type: "heading", level: 2, text: "출발지와 목적지를 제대로 잇는 경로 고르기" },
    { id: "decision-matrix", type: "table", caption: "승차 시간이 짧아도 이동 일정은 길어질 수 있다", columns: ["선택", "잘 맞는 경우", "현실적인 단점", "구매 전 확인"], rows: [
      ["광저우남역 고속철도", "판위, 광저우 남부, 철도 연계 이동 또는 서카오룽과 가까운 홍콩 목적지", "큰 역 접근, 보안검색, 출입경과 홍콩 마지막 구간", "정확한 열차편, 출발역, 도착 시각"],
      ["광저우동역 직통 열차", "해당 날짜 직통편이 있어 시내를 가로지르는 긴 이동을 줄일 때", "날짜마다 다른 좌석 현황, 날짜와 맞지 않는 시간표", "해당 날짜 열차편과 표에 적힌 전체 역명"],
      ["국경 간 직통버스", "해당 날짜 정식 운행편이 있고 호텔이나 원하는 지역 근처에서 타고 내릴 때", "도로 정체, 중간 출입경 절차, 짐 처리, 운영사마다 다른 정류장", "운영사, 출입경 지점, 양쪽 정류장, 변경·환불 규정"],
      ["선전 경유", "직통 좌석이 없거나 선전이 실제 일정에 포함될 때", "표 한 장 추가, 역·국경 환승, 연결을 놓칠 위험 증가", "전체 이동이 다음 직통편보다 나은지"],
    ]},
    { id: "station-warning", type: "callout", title: "광저우남역은 광저우 전체를 뜻하지 않는다", tone: "warning", body: "광저우에는 여객역이 여러 곳 있습니다. 검색 결과에 ‘광저우’만 표시되면 역까지 가는 긴 첫 이동이 가려질 수 있습니다. 열차 소요 시간을 비교하기 전에 표에 적힌 전체 역명이 숙소 위치와 맞는지 먼저 확인하세요." },
    { id: "time-heading", type: "heading", level: 2, text: "출발지부터 최종 목적지까지 전체 이동 시간 계산하기" },
    { id: "time-steps", type: "list", ordered: true, items: ["숙소에서 올바른 역 입구나 버스 정류장까지.", "역 내부 도보, 보안검색과 운영사가 요구하는 여유 시간.", "전체 이동 시간이 아닌, 시간표상 열차·도로 이동 시간.", "지정 역이나 도로 출입경 지점의 출입경 수속.", "도착 홀에서 홍콩 최종 주소까지.", "다음 고정 예약을 지킬 수 있는 지연 대비 여유 시간."] },
    { id: "west-kowloon-heading", type: "heading", level: 2, text: "서카오룽역이 편한지는 홍콩 숙소 위치에 따라 다르다" },
    { id: "west-kowloon-copy", type: "paragraph", text: "서카오룽은 카오룽 지역으로 가기에 편리하고 홍콩 시내 교통망과도 이어지지만, 넓은 역사를 빠져나와 걷는 시간도 무시할 수 없습니다. 센트럴, 코즈웨이베이, 공항 쪽, 신계에 있는 주소라면 마지막 구간을 따로 계산하세요. 열차 도착 시각을 곧바로 호텔 체크인 시각으로 여기지 마세요." },
    { id: "people-heading", type: "heading", level: 2, text: "일행에 따라 달라지는 환승 부담" },
    { id: "people-comparison", type: "comparison", title: "짧은 승차 시간보다 편한 이동이 더 중요할 때", columns: [
      { heading: "혼자, 가벼운 짐", items: ["더 많은 역 선택 가능", "지하철 환승도 괜찮을 수 있음", "직통 열차 대안 확보"] },
      { heading: "가족 또는 부모님", items: ["알기 쉬운 역 한 곳, 층 이동이 적은 동선 우선", "화장실 이용과 일행이 다시 모일 시간 확보", "서류를 여러 가방에 나누지 않기"] },
      { heading: "큰 짐 또는 고정 일정", items: ["역 통로와 출입경 이동까지 계산", "체크인이나 항공편을 놓치지 않을 여유 확보", "약간의 시간 절약보다 바꾸기 쉬운 선택 우선"] },
    ]},
    { id: "late-heading", type: "heading", level: 2, text: "늦은 시간 열차·버스라면 도착 후 계획까지" },
    { id: "late-table", type: "table", caption: "도착 후 이어질 교통편까지 확인하기", columns: ["위험", "먼저 물을 것", "안전한 대응"], rows: [
      ["서카오룽에 늦게 도착", "출입경 수속 후에도 시내 교통편이 남아 있는가", "출발 전 공식 택시 승차장과 예상 비용 확인"],
      ["버스 지연", "후속 예약을 놓치지 않을 시간 여유가 있는가", "항공편이나 환불 불가 행사와 가깝게 연결하지 않기"],
      ["광저우 출발역 착각", "출발 전에 표를 변경할 수 있는가", "잘못된 역으로 계속 가지 말고 공식 채널 사용"],
      ["직통 열차 매진", "다른 출발역이 출발지부터 목적지까지 정말 더 빠른가", "모든 환승 위험까지 따져 더 늦은 직통편과 선전 경유 비교"],
    ]},
    { id: "recovery-heading", type: "heading", level: 2, text: "환승에 차질이 생겼을 때" },
    { id: "recovery-list", type: "list", ordered: true, items: ["기억에 의존하지 말고 예약 내역에서 전체 역명이나 정류장명을 확인하세요.", "항공편, 체크인 마감, 행사 중 놓쳤을 때 손실이 가장 큰 일정부터 챙기세요.", "철도나 버스 운영사의 공식 채널에서 실시간 좌석과 변경 가능 여부를 확인하세요.", "선전을 거친다면 출입경 지점 한 곳을 정하고, 이동하기 전에 양쪽 연결을 확인하세요.", "늦게 도착할 것 같으면 숙소에 알리세요."] },
    { id: "fact-check", type: "callout", title: "수시로 바뀌는 교통 정보 확인일: 2026년 8월 13일", tone: "neutral", body: "현재 MTR 고속철도 여정 검색에서는 홍콩 쪽 역이 홍콩서카오룽으로 정해져 있고, 중국 본토 역은 날짜별로 따로 검색합니다. 직통편, 요금, 정차역, 버스 정류장, 출입경 운영 시간과 입국 조건은 바뀔 수 있습니다. 이 글은 고정 시간표나 요금을 싣지 않습니다." },
    { id: "help-callout", type: "callout", title: "출발지와 목적지 동선을 담당자가 직접 확인해 드릴까요?", tone: "decision", body: "이동 날짜, 광저우와 홍콩의 정확한 주소, 인원, 짐, 다음 고정 예약을 보내 주세요. Homeground가 전체 이동을 비교하고 다시 확인할 사항을 정리해 드릴 수 있습니다. 다만 표를 판매하거나 실시간 운행을 보장하지는 않습니다." },
    { id: "faq", type: "faq", title: "광저우–홍콩 자주 묻는 질문", items: [
      { question: "광저우에서 홍콩까지 가장 좋은 방법은 무엇인가요?", answer: "광저우남역과 홍콩서카오룽이 일정에 맞으면 직통 고속철도부터 확인하고, 정확한 날짜로 광저우동역도 따로 검색하세요. 12306의 국경 간 상품에는 두 역이 모두 나오지만 모든 역 조합에 매일 좌석이 있지는 않습니다. 정식 국경 간 버스는 확정된 승하차 지점 덕분에 환승이 충분히 줄어 도로와 국경의 변수를 감수할 만할 때만 비교하세요." },
      { question: "홍콩행 열차는 광저우동역과 광저우남역 중 어디서 출발하나요?", answer: "두 역 모두 12306의 국경 간 상품에 나오지만 직통 좌석은 날짜마다 다릅니다. 광저우남역은 판위, 광저우 남부, 철도 연계 이동에 맞고, 광저우동역은 해당 날짜에 직통 열차가 있으면 시내를 가로지르는 긴 이동을 줄여 줍니다. 열차 시간을 비교하기 전에 표에 적힌 전체 역명이 호텔 위치와 맞는지 확인하세요." },
      { question: "광저우–홍콩 이동은 실제로 얼마나 걸리나요?", answer: "시간표상 승차 시간보다 깁니다. 호텔 체크아웃 후 정확한 역 입구까지 가는 시간, 역 안 도보·보안검색과 운영사가 요구하는 출발 전 여유 시간, 열차나 도로 이동 시간, 역이나 출입경 지점의 출입경 수속, 도착 홀 도보와 홍콩 내 마지막 MTR·택시·버스 이동, 다음 고정 예약을 지킬 지연 여유까지 모두 더하세요. 이 글은 고정 시간표나 요금을 싣지 않습니다." },
      { question: "서카오룽역은 모든 홍콩 호텔에 편리한가요?", answer: "아닙니다. 서카오룽은 카오룽 지역으로 가기에 편리하고 홍콩 시내 교통망과도 이어지지만, 넓은 역사를 빠져나와 걷는 시간도 무시할 수 없습니다. 센트럴, 코즈웨이베이, 공항 쪽, 신계에 있는 주소라면 마지막 구간을 따로 계산해야 합니다." },
      { question: "직통 열차 대신 선전을 거쳐 가야 하나요?", answer: "직통 좌석이 없거나 선전이 실제 일정에 포함될 때만 고려하세요. 선전을 거치면 표가 한 장 더 필요하고 역이나 국경 환승이 추가되며 연결을 놓칠 가능성도 커집니다. 그렇게 간다면 출입경 지점 한 곳을 정하고 이동하기 전에 양쪽 연결을 확인하세요." },
    ] },
    { id: "internal-links", type: "internal-links", title: "필요한 다음 단계로", items: [
      { label: "중국 고속철도 첫 이용 안내", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "노선을 고른 뒤 표, 여권, 보안검색과 승차를 준비합니다." },
      { label: "선전-홍콩 출입경 지점 선택", href: "/ko/guides/shenzhen-hong-kong-transport-route/", description: "선전이 실제 환승 지점일 때만 이어서 봅니다." },
      { label: "중국 일정이 너무 빠듯한가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "국경과 큰 역에서 실제로 드는 시간을 일정에 반영합니다." },
      { label: "국제선 탑승 전 중국에서 보내는 마지막 밤", href: "/ko/guides/china-last-night-before-international-flight/", description: "국경 지연으로 최종 출국을 놓치지 않게 합니다." },
      { label: "마카오행 주하이·헝친 경로 비교", href: "/ko/guides/guangzhou-macau-transport-route/", description: "광저우남역에서 주하이역·궁베이 또는 헝친역·헝친통상구로 가는 전체 동선을 출입경 운영, 짐, 늦은 도착 후 숙박 대안까지 비교합니다." },
    ]},
    { id: "sources", type: "sources", title: "공식 출처와 사진 표기", items: [
      { label: "고속철도 여정 검색 방식", url: "https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html", publisher: "MTR", reviewedAt: "2026-08-12" },
      { label: "12306 국경 간 상품의 역 목록", url: "https://mobile.12306.cn/otsmobile/h5/otsbussiness/newTicketRule/newTicketRule-GuangShenGangThirtyDay.html", publisher: "중국철도 12306", reviewedAt: "2026-08-12" },
      { label: "출입경 시설 명칭과 유형", url: "https://www.sb.gov.hk/eng/special/bound/control.html", publisher: "홍콩 보안국", reviewedAt: "2026-08-12" },
      { label: "정식 국경 간 버스 문의", url: "https://www.td.gov.hk/en/transport_in_hong_kong/land_based_cross_boundary_transport/enquiries/index.html", publisher: "홍콩 운수부", reviewedAt: "2026-08-12" },
      { label: "대표 사진: Rc1959의 광저우남역, CC BY-SA 4.0, 크롭 편집", url: "https://commons.wikimedia.org/wiki/File:Guangzhou_South_railway_station_(85213).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
      { label: "대표 사진 편집본 라이선스: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
    ]},
  ],
} as const satisfies StructuredPageBody;

export default body;
