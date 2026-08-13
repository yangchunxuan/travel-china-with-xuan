import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "중국 국가박물관은 톈안먼광장을 걷다가 즉흥적으로 들어가는 곳이 아니라 예약·입구·관람 범위를 미리 정해야 하는 박물관입니다. 당일 지참할 신분증으로 무료 기본 관람을 예약하고, 지정 시간에 북문 관람객 입구로 가세요. 안에서는 핵심 전시 하나와 보조 주제 하나만 고르는 편이 좋습니다. 건물 전체를 한 번에 보려는 계획은 실용적이지 않으며, 박물관 예약이 톈안먼 주변의 다른 시설 예약까지 대신하지도 않습니다." },
    { id: "booking-heading", type: "heading", level: 2, text: "박물관 자체를 먼저 예약하세요" },
    { id: "booking-rules", type: "table", caption: "2026년 8월 12일 확인한 현행 규정", columns: ["단계", "공식 규정", "여행자에게 미치는 영향"], rows: [
      ["예약", "무료 기본 관람은 방문일 기준 7일 이내에 공식 웹사이트와 공식 위챗 채널에서 실명 예약합니다.", "검색 광고나 톈안먼 관련 대행 페이지가 아니라 박물관 공식 영문 예약 페이지를 사용하세요."],
      ["표 공개", "신규 예약분은 매일 베이징 시간 17:00에 열리며 입장은 세 시간대로 나뉩니다.", "날짜가 고정됐다면 공개 시간에 맞춰 준비하고 당일 잔여분을 기대하지 마세요."],
      ["신분증", "유효한 신분증으로 실명 인증하며, 입장 때 예약에 사용한 원본을 확인합니다.", "여권 정보를 인쇄된 그대로 입력하고 같은 여권 원본을 가져가세요."],
      ["입구", "예약 시간 안에 북문 관람객 입구로 입장합니다.", "사진에 자주 나오는 서쪽 정면을 일반 관람객 입구로 착각하지 마세요."],
      ["월요일", "법정 공휴일의 별도 공지가 없는 한 보통 월요일 휴관입니다.", "공휴일 월요일은 추측하지 말고 그 주의 날짜가 적힌 공지를 확인하세요."],
    ] },
    { id: "separate-systems", type: "callout", title: "박물관과 톈안먼 예약은 하나가 아닙니다", body: "중국 국가박물관은 자체 예약과 북문 입장을 운영합니다. 톈안먼광장과 주변 기념 시설은 별도 출입·보안 규정을 쓸 수 있습니다. 박물관 확인서는 박물관만 보장하므로 다른 장소는 각각 공식 채널을 확인하고 광장 주변 보안 동선에도 시간을 남겨 두세요.", tone: "warning" },
    { id: "time-heading", type: "heading", level: 2, text: "전시보다 먼저 관람 시간을 정하세요" },
    { id: "time-options", type: "comparison", columns: [
      { heading: "약 2시간", body: "고대 중국 기본 전시 또는 정말 보고 싶은 현재 특별전 중 하나만 중심으로 삼습니다. 보안 검색, 길 찾기, 퇴장 시간까지 포함하고 다른 대형 박물관을 덧붙이지 마세요." },
      { heading: "약 3시간", body: "큰 전시 하나를 보고 제대로 쉬었다가 작은 주제 하나를 더합니다. 오후나 저녁 일정이 있는 첫 방문자에게 가장 균형 잡힌 구성입니다." },
      { heading: "4시간 이상", body: "박물관 자체가 여행의 우선순위일 때만 두 번째 큰 주제를 더하세요. 이때는 폐관 시간보다 피로와 건물 내부 거리가 더 큰 제약이 됩니다." },
    ] },
    { id: "route-heading", type: "heading", level: 2, text: "박물관의 규모를 인정하는 관람 동선" },
    { id: "route-list", type: "list", items: [
      "보안 검색 뒤 당일 층별 지도를 먼저 확인하세요. 특별전과 전시실 운영은 바뀔 수 있습니다.",
      "중국사의 시간축이 필요하다면 고대 중국 기본 전시를 중심으로 보되, 모든 진열장을 읽으려 하지 마세요.",
      "초기 문명 유물 하나, 제국 시대 유물군 하나, 이번 여행의 다른 도시와 연결되는 유물 하나처럼 세 가지 관람 포인트를 미리 정하세요.",
      "두 번째 주제로 가기 전에 앉아서 쉬세요. 10분의 회복이 급히 한 전시실을 더 보는 것보다 집중력을 지켜 줍니다.",
      "남은 시간에는 현재 특별전 하나나 근현대 주제 하나만 더 보고, 공식 폐관 시각보다 일찍 출구로 움직이세요.",
    ] },
    { id: "paid-exhibitions", type: "callout", title: "무료 입장과 유료 특별전은 다릅니다", body: "기본 관람은 무료 예약이지만 일부 특별전은 별도 요금과 구매 규정이 있습니다. 해당 전시의 공식 공지를 읽으세요. 기본 관람에 유료 입장권이 필요하다고 오해하거나 무료 예약에 모든 특별전이 포함된다고 가정해서는 안 됩니다.", tone: "neutral" },
    { id: "hours-heading", type: "heading", level: 2, text: "계절과 특별 날짜에 달라지는 것" },
    { id: "hours", type: "paragraph", text: "상시 규정은 09:00~17:00 운영, 16:00 입장 마감입니다. 현재는 6월 1일부터 10월 31일까지 17:30 폐관, 16:30 입장 마감으로 연장합니다. 날짜가 명시된 공지는 월요일 휴관이나 공휴일 운영을 바꿀 수 있습니다. 이는 이번 원고에서 확인한 2026년 사실이지 이후 여행의 보장이 아니므로 출발 전 공식 Visit 페이지와 최신 공지를 다시 확인해야 합니다." },
    { id: "practical-heading", type: "heading", level: 2, text: "예약을 헛되게 만들지 않는 작은 결정" },
    { id: "practical", type: "list", items: [
      "예약 성공 메시지를 오프라인으로 저장하고 각 여행자가 예약에 쓴 신분증 원본을 직접 보관하세요.",
      "예약 시간대는 호텔 출발 시간이 아니라 입구에서 확인받아야 하는 시간입니다.",
      "짐은 가볍게 하세요. 보안과 보관도 과정이며 전시 공간에서는 셀카봉과 삼각대 등이 제한됩니다.",
      "60세 이상 동행자의 우선 통로도 예약, 예약 신분증 원본, 자격 증빙이 필요합니다.",
      "일정이 바뀌면 공식 마감 전에 취소하세요. 예약 횟수 제한과 반복 노쇼 제재가 있습니다.",
    ] },
    { id: "final-check", type: "callout", title: "전날 밤 다섯 가지만 확인하세요", body: "예약 날짜와 시간대, 여권 표기, 북문, 당일 운영 공지, 하나의 핵심 전시입니다. 이 다섯 가지가 명확하면 방문은 실행 가능해집니다. 불명확하다면 전시실 이름을 더 붙여도 해결되지 않습니다.", tone: "decision" },
    { id: "internal-links", type: "internal-links", title: "베이징 일정에 연결하기", items: [
      { label: "첫 베이징 여행 숙소 지역", href: "/ko/guides/beijing-where-to-stay-first-trip/", description: "한 명소가 아니라 전체 일정에 맞춰 숙소 지역을 고릅니다." },
      { label: "외국인을 위한 자금성 방문 안내", href: "/ko/guides/forbidden-city-for-foreign-visitors/", description: "고궁박물원의 입장권과 입구 절차를 중국 국가박물관 예약과 분리합니다." },
      { label: "부모님과 함께하는 중국 여행", href: "/ko/guides/china-itinerary-with-older-parents/", description: "큰 실내 박물관을 걷기와 회복 시간에 맞춥니다." },
      { label: "중국 일정이 너무 빠듯한지 확인하기", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "베이징의 주요 명소를 지친 하루에 몰아넣지 않습니다." },
      { label: "중국 관광지 입장권 확인하기", href: "/ko/guides/official-or-reseller-china-tickets/", description: "관광지의 실제 발권 주체를 찾고 재판매처의 지원·재고·실명 정보·환불 조건을 비교한 뒤 입장 가능한 예약인지 확인하세요." },
    ] },
    { id: "consultation", type: "callout", title: "베이징 하루를 실제 순서로 점검해야 하나요?", body: "박물관 뒤에 또 다른 시간 지정 예약, 부모님의 보행 속도, 당일 역 이동이 이어진다면 Homeground의 여행 상담가가 실제 순서와 여유 시간을 검토할 수 있습니다. 확정된 예약 시간과 숙소 지역을 먼저 알려 주세요.", tone: "neutral" },
    { id: "sources", type: "sources", title: "확인한 공식·이미지 출처", items: [
      { label: "관람: 운영시간, 예약 시간대, 북문과 입장 규정", url: "https://en.chnmuseum.cn/visit_692/", publisher: "National Museum of China", reviewedAt: "2026-08-12" },
      { label: "공식 영문 예약 시스템", url: "https://pcticket.chnmuseum.cn/museum-en/", publisher: "National Museum of China", reviewedAt: "2026-08-12" },
      { label: "상시 달력을 변경하는 날짜별 임시 개관 공지 사례", url: "https://en.chnmuseum.cn/home_527/news/202607/t20260723_280196.html", publisher: "National Museum of China", reviewedAt: "2026-08-12" },
      { label: "대표 사진: Daniel Case의 중국 국가박물관 서쪽 정면, CC BY-SA 3.0, 크롭 및 WebP 변환", url: "https://commons.wikimedia.org/wiki/File:National_Museum_of_China_west_facade,_straight_view.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    ] },
  ],
};

export default body;
