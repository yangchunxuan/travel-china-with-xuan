import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "decision-lead", type: "lead", text: "광저우와 홍콩은 가까워 고속철도가 당연해 보인다. 하지만 실제 선택은 광저우 숙소가 표에 적힌 출발역과 맞는지, 철도와 출입경 절차 뒤 홍콩서카오룽이 최종 주소와 맞는지에 달려 있다." },
    { id: "quick-answer", type: "callout", title: "정답보다 비교부터", tone: "decision", body: "광저우남역과 홍콩서카오룽이 모두 동선에 맞으면 직통 고속철도를 먼저 확인한다. 같은 날짜에 숙소와 가까운 다른 광저우역의 직통편도 검색한다. 도로 이동은 허가된 버스의 정확한 승하차 지점이 환승을 충분히 줄일 때만 최종 후보로 둔다." },
    { id: "matrix-heading", type: "heading", level: 2, text: "양쪽 문을 잇는 전체 이동을 고른다" },
    { id: "decision-matrix", type: "table", caption: "짧은 승차 시간이 짧은 이동일을 뜻하지는 않는다", columns: ["선택", "잘 맞는 경우", "놓치기 쉬운 부담", "구매 전 확인"], rows: [
      ["광저우남역 고속철도", "판위, 광저우 남부, 철도 환승 또는 서카오룽과 가까운 홍콩 목적지", "큰 역 접근, 보안검색, 출입경과 홍콩 마지막 구간", "정확한 열차, 출발역과 도착 시각"],
      ["다른 광저우역 직통 열차", "해당 날짜에 운행하며 시내 횡단을 줄일 때", "적은 편수와 맞지 않는 시간대", "표에 그 역과 홍콩서카오룽이 명시되는지"],
      ["국경 통과 버스", "날짜와 허가가 확인되고 승하차 지점이 유용할 때", "도로 정체, 검문소, 짐과 운영사별 정류장", "운영사, 검문소, 양쪽 정류장과 변경 규정"],
      ["선전 경유", "직통 좌석이 없거나 선전이 실제 일정에 포함될 때", "두 번째 표, 역 또는 국경 이동과 추가 실패 지점", "전체 이동이 다음 직통편보다 나은지"],
    ]},
    { id: "station-warning", type: "callout", title: "광저우남역은 광저우 전체를 뜻하지 않는다", tone: "warning", body: "광저우에는 여러 여객역이 있다. 도시 이름만 보이는 검색 결과에는 긴 첫 이동이 숨어 있을 수 있다. 열차 시간보다 먼저 표의 전체 역 이름과 숙소를 맞춘다." },
    { id: "time-heading", type: "heading", level: 2, text: "문 앞에서 문 앞까지 한 시계로 계산한다" },
    { id: "time-steps", type: "list", ordered: true, items: ["숙소에서 올바른 역 입구나 버스 정류장까지.", "역 내부 도보, 보안검색과 운영사가 요구하는 여유 시간.", "열차 또는 도로 이동 시간만 전체로 보지 않기.", "지정 역이나 검문소의 출입경 절차.", "도착 홀에서 홍콩 최종 주소까지.", "다음 고정 예약을 지킬 지연 여유."] },
    { id: "west-kowloon-heading", type: "heading", level: 2, text: "홍콩 숙소마다 서카오룽의 편의가 다르다" },
    { id: "west-kowloon-copy", type: "paragraph", text: "서카오룽은 카오룽에 편리하고 홍콩 도시 교통망과 이어지지만 큰 역사와 후속 도보가 사라지지는 않는다. 센트럴, 홍콩섬 동부, 공항 방향이나 신계 주소는 마지막 구간을 따로 계산한다. 열차 도착 시각을 호텔 도착 시각으로 바꾸지 않는다." },
    { id: "people-heading", type: "heading", level: 2, text: "동행인은 환승 비용을 키운다" },
    { id: "people-comparison", type: "comparison", title: "짧은 승차보다 편의가 중요한 때", columns: [
      { heading: "혼자, 가벼운 짐", items: ["더 많은 역 선택 가능", "도시철도 환승도 가능", "직통 대안 하나 보관"] },
      { heading: "가족 또는 부모님", items: ["한 역과 적은 층 이동 우선", "화장실과 재집결 시간 확보", "서류를 여러 가방에 나누지 않기"] },
      { heading: "큰 짐 또는 고정 일정", items: ["역 통로와 국경 이동까지 계산", "체크인이나 항공편 보호", "작은 절약보다 복구 가능성 선택"] },
    ]},
    { id: "late-heading", type: "heading", level: 2, text: "늦은 편은 도착 뒤 계획도 필요하다" },
    { id: "late-table", type: "table", caption: "이동 다음의 이동을 확인한다", columns: ["위험", "먼저 물을 것", "안전한 대응"], rows: [
      ["서카오룽 늦은 도착", "출입경 뒤 마지막 도시 교통이 남아 있는가", "출발 전 합법 택시 승차장과 예상 비용 확인"],
      ["버스 지연", "놓친 후속 예약을 보호하는가", "항공편이나 환불 불가 행사와 가깝게 연결하지 않기"],
      ["잘못된 광저우역", "출발 전 공식 변경이 가능한가", "잘못된 역으로 계속 가지 말고 공식 채널 사용"],
      ["직통 매진", "다른 출발역이 실제 문 앞 이동을 줄이는가", "늦은 직통과 선전 분리 이동의 모든 위험 비교"],
    ]},
    { id: "recovery-heading", type: "heading", level: 2, text: "계획이 끊어졌을 때" },
    { id: "recovery-list", type: "list", ordered: true, items: ["기억 대신 예약에서 전체 역명과 정류장명을 읽는다.", "항공편, 체크인 마감, 행사 중 가장 비싼 고정 항목을 먼저 보호한다.", "운영사 공식 채널로 좌석과 변경을 확인한다.", "선전을 거치면 한 검문소를 정하고 양쪽 연결을 확인한다.", "늦을 가능성이 생기면 숙소에 알린다."] },
    { id: "fact-check", type: "callout", title: "동적 교통 정보 확인일: 2026년 8월 12일", tone: "neutral", body: "MTR 고속철도 검색은 현재 홍콩서카오룽을 홍콩 쪽 끝점으로 두고 날짜와 중국 본토 역별로 조회한다. 직통편, 요금, 정차역, 버스 정류장, 국경 운영 시간과 입국 조건은 바뀔 수 있다. 이 글은 고정 시간표나 영구 요금을 제시하지 않는다." },
    { id: "help-callout", type: "callout", title: "양쪽 문을 사람이 확인해 드릴까요?", tone: "decision", body: "날짜, 광저우와 홍콩의 정확한 주소, 인원, 짐과 다음 고정 예약을 보내 주세요. Homeground는 환승 흐름과 다시 확인할 사실을 정리할 수 있지만 실시간 판매나 운행을 보장하지 않습니다." },
    { id: "internal-links", type: "internal-links", title: "필요한 다음 단계로", items: [
      { label: "중국 고속철도 첫 이용 안내", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "노선을 고른 뒤 표, 여권, 보안검색과 승차를 준비합니다." },
      { label: "선전-홍콩 검문소 선택", href: "/ko/guides/shenzhen-hong-kong-transport-route/", description: "선전이 실제 환승 지점일 때만 이어서 봅니다." },
      { label: "중국 일정이 너무 빠듯한가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "국경과 큰 역의 실제 시간을 일정에 넣습니다." },
      { label: "국제선 전 중국에서의 마지막 밤", href: "/ko/guides/china-last-night-before-international-flight/", description: "국경 지연으로 최종 출국을 놓치지 않게 합니다." },
    ]},
    { id: "sources", type: "sources", title: "공식 출처와 사진 표기", items: [
      { label: "고속철도 여정 검색 방식", url: "https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html", publisher: "MTR", reviewedAt: "2026-08-12" },
      { label: "국경 검문소 명칭과 유형", url: "https://www.sb.gov.hk/eng/special/bound/control.html", publisher: "홍콩 보안국", reviewedAt: "2026-08-12" },
      { label: "허가된 국경 통과 버스 문의", url: "https://www.td.gov.hk/en/transport_in_hong_kong/land_based_cross_boundary_transport/enquiries/index.html", publisher: "홍콩 운수서", reviewedAt: "2026-08-12" },
      { label: "대표 사진: Rc1959의 광저우남역, CC BY-SA 4.0, 일부 자름", url: "https://commons.wikimedia.org/wiki/File:Guangzhou_South_railway_station_(85213).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    ]},
  ],
} as const satisfies StructuredPageBody;

export default body;
