import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "상하이박물관 동관은 현재 개인 방문객의 일반 입장이 무료이며 사전 예약이 필요 없으므로, 유효한 신분증 원본을 지참해 지하 1층 동쪽 입구에서 보안 검색과 신분증 확인을 받으세요. 고대문명 탐색관(古代文明探索宫)과 디지털관(数字馆)은 박물관 동관 예약 화면에서 ‘특별 예약’을 따로 해야 합니다." },
    { id: "booking-heading", type: "heading", level: 2, text: "일반 입장과 별도 예약 구역을 구분하세요" },
    { id: "booking-rules", type: "table", caption: "2026년 9월 26일 확인한 상하이박물관 공식 안내", columns: ["항목", "현재 규정", "준비할 일"], rows: [
      ["동관 일반 입장", "개인 방문객은 무료이며 사전 예약 기간이 없습니다.", "유효한 신분증 원본을 가지고 지하 1층 동쪽 입구로 가세요."],
      ["체험 구역 2곳", "고대문명 탐색관과 디지털관은 별도 사전 예약이 필요합니다.", "박물관 위챗 예약 서비스의 동관 ‘특별 예약’ 메뉴를 확인하세요."],
      ["외국 여권", "상하이시 방문 안내는 여권을 유효한 신분증 예시로 들지만, 박물관의 현행 동관 페이지는 게이트 확인 절차를 설명하지 않습니다.", "여권으로 방문한다면 박물관에 구체적인 입장 절차를 확인하세요: (021) 60226699."],
      ["유료 특별전", "유료 특별전이 열리면 별도 예매가 필요할 수 있습니다.", "전시별 안내를 확인하세요. 일반 입장권을 구매할 필요는 없습니다."],
    ] },
    { id: "mistakes", type: "callout", title: "헷갈리기 쉬운 세 가지", body: "‘예약 불필요’는 동관의 일반 입장에 관한 말입니다. 두 체험 구역은 따로 예약해야 합니다. 동관의 정기 휴관일은 월요일이 아닌 화요일이며, 인민광장관의 유료 전시 규정도 동관에 그대로 적용되지 않습니다.", tone: "warning" },
    { id: "options-heading", type: "heading", level: 2, text: "어느 건물을 방문할지 먼저 정하세요" },
    { id: "options", type: "comparison", columns: [
      { heading: "동관", body: "일반 박물관 관람은 무료이며 사전 예약이 필요 없습니다. 신분증 원본을 가지고 지하 1층 동쪽 입구로 가되, 체험 구역 2곳은 따로 예약하세요." },
      { heading: "인민광장관", body: "박물관 안내에 따르면 2026년 7월 9일부터 2027년 11월 14일까지 이 건물은 고대 아메리카 문명 특별전만 열며 일반 방문객은 입장권을 예약·구매해야 합니다. 가격과 면제 대상, 예매 규정은 해당 전시 공지를 확인하세요." },
    ] },
    { id: "route-heading", type: "heading", level: 2, text: "동관 방문 순서" },
    { id: "route-list", type: "list", items: [
      "박물관 공식 방문 안내에서 목적지가 동관인지 확인하고, 체험 구역 2곳 중 예약할 곳이 있는지 정하세요.",
      "동관에 도착하면 현장 표지에 따라 지하 1층 동쪽 입구로 가세요. 보안 검색과 신분증 확인 시간을 여유 있게 잡으세요.",
      "입장 후 최신 안내도를 보고 우선 볼 전시 한 곳을 고르세요. 전시실 운영은 현장 상황에 따라 달라질 수 있습니다.",
      "체험 구역을 예약했다면 예약 확인서에 적힌 시간에 맞추세요. 일반 입장만으로 해당 구역에 들어갈 수는 없습니다.",
    ] },
    { id: "hours-heading", type: "heading", level: 2, text: "운영시간과 휴관일" },
    { id: "hours", type: "paragraph", text: "동관의 기본 운영시간은 10:00~18:00이며 17:00에 입장을 마감합니다. 화요일은 정기 휴관일이지만 중국 국가 공휴일은 예외입니다. 2026년 9월 26일 확인한 내용이므로 방문일, 특히 연휴의 최신 공지를 다시 확인하세요." },
    { id: "practical-heading", type: "heading", level: 2, text: "출발 전 확인할 것" },
    { id: "practical", type: "list", items: [
      "공식 안내는 신분증 사진이 아닌 원본을 요구합니다.",
      "상하이시 방문 안내는 여권을 언급하지만 실제 게이트 확인 절차는 박물관에 문의하세요.",
      "사전 예약이 없어도 방문객이 많으면 대기하거나 입장이 제한될 수 있습니다.",
      "유료 특별전과 예약 구역 2곳의 예매 여부는 일반 입장과 별도로 확인하세요.",
    ] },
    { id: "final-check", type: "callout", title: "방문 전날 확인", body: "목적지가 동관인지, 방문일에 문을 여는지, 신분증 원본이 있는지, 체험 구역 예약이 실제로 확정됐는지 확인하세요. 외국 여권을 사용할 경우 입장 절차도 미리 박물관에 문의하세요.", tone: "decision" },
    { id: "faq", type: "faq", title: "상하이박물관 동관 자주 묻는 질문", items: [
      { question: "상하이박물관 동관은 예약해야 하나요?", answer: "상하이박물관 동관의 개인 방문객 일반 입장은 현재 무료이며 사전 예약이 필요 없습니다. 다만 고대문명 탐색관과 디지털관 2곳은 따로 예약해야 합니다." },
      { question: "상하이박물관 동관 입구는 어디인가요?", answer: "공식 안내에는 유효한 신분증 원본을 가지고 동관 지하 1층 동쪽 입구에서 보안 검색을 받은 뒤 신분증을 확인받으라고 적혀 있습니다. 현장 표지도 확인하세요." },
      { question: "외국 여권으로 상하이박물관 동관에 들어갈 수 있나요?", answer: "상하이시 방문 안내는 여권을 동관 입장에 사용할 수 있는 신분증 예시로 제시합니다. 박물관의 현행 동관 안내에는 여권의 게이트 확인 방법이 없으므로 (021) 60226699로 현재 절차를 문의하세요." },
      { question: "상하이박물관 동관은 월요일과 화요일 중 언제 쉬나요?", answer: "상하이박물관 동관은 보통 화요일에 휴관하며 국가 공휴일은 예외입니다. 운영시간은 10:00~18:00, 입장 마감은 17:00입니다." },
      { question: "동관이 무료라면 인민광장관도 무료인가요?", answer: "아닙니다. 박물관은 2026년 7월 9일부터 2027년 11월 14일까지 인민광장관에서 입장권이 필요한 특별전만 연다고 안내합니다. 가격과 면제 대상은 따로 확인해야 하며 동관의 일반 입장 규정과 다릅니다." },
      { question: "Homeground 상하이·쑤저우 5일 상품에 동관이 포함되나요?", answer: "아니요. 공개된 5일 일정의 박물관 선택지는 인민광장관과 관련되며 동관 방문은 포함되지 않습니다. 동관을 원한다면 날짜를 정하기 전에 일정 변경 가능 여부를 문의하세요." },
    ] },
    { id: "internal-links", type: "internal-links", title: "상하이 일정에 맞추기", items: [
      { label: "상하이·쑤저우 5일 프라이빗 투어", href: "/ko/tours/shanghai-suzhou-5-day-private-tour/", description: "공개 일정에는 인민광장관 관련 선택지가 있고 동관은 포함되지 않습니다. 별도 일정 변경을 문의하세요." },
      { label: "중국 관광지 입장권 확인법", href: "/ko/guides/official-or-reseller-china-tickets/", description: "공식 예매처와 실제 예약 완료 상태를 구분하세요." },
    ] },
    { id: "consultation", type: "callout", title: "동관을 상하이 일정에 넣고 싶나요?", body: "방문 날짜와 이미 정한 다른 일정의 시간을 알려주시면 Homeground 상담자가 동선과 현재 입장 규정을 함께 확인할 수 있습니다. 공개된 상하이·쑤저우 5일 상품에는 동관이 없으므로 별도 일정 변경으로 문의해 주세요.", tone: "neutral" },
    { id: "sources", type: "sources", title: "공식 자료: 2026년 9월 26일 확인", items: [
      { label: "동관 안내: 지하 1층 동쪽 입구, 화요일 휴관 및 별도 예약", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/service/visit-east", publisher: "상하이박물관", reviewedAt: "2026-09-26" },
      { label: "인민광장관 특별전 기간과 입장권 규정", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/service/visit-west", publisher: "상하이박물관", reviewedAt: "2026-09-26" },
      { label: "여권을 동관 유효 신분증 예시로 든 상하이시 방문 안내", url: "https://english.shanghai.gov.cn/en-MuseumsGalleries/20241205/756c96bd7dd940378b9ac056f11429e2.html", publisher: "상하이시 인민정부", reviewedAt: "2026-09-26" },
      { label: "상설 전시 무료 관람을 안내하는 상하이박물관 공식 홈페이지", url: "https://www.shanghaimuseum.cn/mu/frontend/pg/index", publisher: "상하이박물관", reviewedAt: "2026-09-26" },
    ] },
  ],
};

export default body;
