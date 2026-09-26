import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "구이린에서 양숴로 가는 리강 유람선은 관광지 공식 위챗 서비스 계정 ‘漓江售票处’에서 날짜와 배를 먼저 확인하세요. 2026년 8월 공시 성인 요금은 3성 배 215위안, 4성 배 360위안이며 구이린 쪽 승선 선착장이 다릅니다. 평일 승선권이 언제, 몇 시에 일괄 열리는지는 공식 자료로 확인되지 않았습니다." },
    { id: "booking-heading", type: "heading", level: 2, text: "배 등급을 고르면 선착장도 달라집니다" },
    { id: "booking-rules", type: "table", caption: "2026년 9월 26일에 확인한 공시 성인 요금과 선착장", columns: ["배", "공시 성인 요금", "구이린 승선", "양숴 하선"], rows: [
      ["3성", "215위안", "모판산 여객항(磨盘山客运港)", "룽터우산 선착장(龙头山码头)"],
      ["4성", "360위안", "주장 선착장(竹江码头)", "룽터우산 선착장(龙头山码头)"]
    ] },
    { id: "release", type: "paragraph", text: "관광지의 2026년 국경절 공지는 구이린–양숴 전 구간 유람선을 15일 전에 예매할 수 있다고 안내합니다. 매일 11:00와 16:00는 남은 좌석 정보의 갱신 시각입니다. 이 규칙을 평소 모든 날짜의 발매 시각으로 받아들이지 말고, 본인 여행일의 최신 공지를 확인하세요." },
    { id: "mistakes", type: "callout", tone: "warning", title: "예약 뒤 가장 많이 틀리는 세 가지", body: "3성 배를 예약하고 4성 배의 주장 선착장으로 가는 일, 잔여 좌석 갱신 시각을 일반 발매 시각으로 오해하는 일, 외부 판매처의 문자나 QR만 들고 공식 키오스크에서 표를 받으려는 일입니다. 실제 결제한 판매처의 수령 안내와 주문서의 중국어 선착장 이름을 따르세요." },
    { id: "options-heading", type: "heading", level: 2, text: "3성과 4성, 145위안 차이가 필요할까요?" },
    { id: "options", type: "comparison", title: "같은 날짜의 상품 조건을 비교하세요", columns: [
      { heading: "3성: 215위안", body: "공시된 구이린–양숴 전 구간의 낮은 성인 요금입니다. 운영사의 선착장 안내는 모판산 출발로 구분합니다. 좌석과 식사는 예약하는 날짜의 상품 설명을 확인하세요." },
      { heading: "4성: 360위안", body: "주장 선착장에서 출발하는 별도의 배 등급입니다. 양숴에서 내린다는 점은 같으므로, 추가 비용을 내기 전에 그날의 객실·좌석·식사 조건을 비교하세요." }
    ] },
    { id: "route-heading", type: "heading", level: 2, text: "구이린에서 타고 양숴에서 내리는 날" },
    { id: "route-list", type: "list", ordered: true, items: [
      "결제 완료 화면에서 날짜, 3성·4성, 승선 선착장, 출항 시각을 함께 확인합니다. ‘리강 선착장’이라는 말만으로 모판산과 주장을 구분할 수 없습니다.",
      "구이린 숙소에서 해당 선착장까지 이동하고 실명 확인과 표 수령에 쓸 시간을 확보합니다. 관광지는 약 4시간의 강 여행을 소개하지만 실제 출항 시각은 주문서를 따릅니다.",
      "양숴 하선 후의 숙소와 차량을 미리 연결합니다. 짐이나 귀환 차량을 구이린 승선 선착장에 남겨 두지 마세요.",
      "장마철에는 대체 일정을 준비합니다. 2026년에도 수위 때문에 단기 운항 중단 공지가 나왔습니다."
    ] },
    { id: "hours-heading", type: "heading", level: 2, text: "선착장에는 몇 시에 도착해야 하나요?" },
    { id: "hours", type: "paragraph", text: "모든 날짜에 공통으로 적용되는 출항표 대신, 본인 주문서의 출항·표 수령·탑승 안내에서 거꾸로 시간을 계산하세요. 구이린 시내에서의 도로 이동과 신분 확인, 대기 시간을 빼놓으면 안 됩니다. 유람선은 관광이면서 양숴로 옮겨 가는 구간이기도 합니다." },
    { id: "practical-heading", type: "heading", level: 2, text: "외국 여권으로 예약한다면" },
    { id: "practical", type: "list", items: [
      "관광지는 실명 예약과 승객·표·신분증 정보의 일치를 요구합니다. 모든 동행자의 이름과 문서 번호를 예약 채널이 안내하는 방식대로 입력하세요.",
      "공식 웹페이지에는 ‘漓江售票处’에서 외국 여권을 입력하는 자세한 방법이 없습니다. 결제하기 전에 여권 사용 가능 여부와 표 수령 방법을 공식 판매처에 확인하세요.",
      "예약에 사용한 원본 신분증명서와 성공한 주문을 지참하고 주문 내역을 오프라인에도 보관하세요. 결제 화면만으로 탑승권을 대신할 수 없습니다.",
      "관광지 입장료 일부가 감면돼도 배 요금 전체가 같은 비율로 할인된다는 뜻은 아닙니다. 선택한 상품의 현재 조건을 확인하세요."
    ] },
    { id: "final-check", type: "callout", tone: "decision", title: "숙소를 나서기 전에", body: "날짜·배 등급·중국어 선착장 이름·출항 시각·표 수령 방법을 한 화면에서 다시 확인하세요. 수위와 날씨로 운항 변경 공지가 있는지도 보고, 기사에게 주문서의 선착장 이름을 보내 주세요." },
    { id: "faq", type: "faq", title: "리강 유람선 예약 전 자주 묻는 질문", items: [
      { question: "리강 유람선의 공식 예약 채널은 어디인가요?", answer: "리강 관광지의 2026년 9월 공지는 공식 위챗 서비스 계정 ‘漓江售票处’를 안내합니다. 실명으로 날짜와 배를 선택하고, 성공한 주문서에서 선착장과 표 수령 방법을 확인하세요." },
      { question: "리강 표는 언제나 5일 전 오전 9시에 열리나요?", answer: "공식 자료에서 그런 일반 규칙은 확인되지 않았습니다. 2026년 국경절 전 구간 유람선은 15일 전 예매였고 11:00·16:00는 잔여 좌석 정보 갱신 시각이었습니다. 여행 날짜의 최신 공지가 기준입니다." },
      { question: "리강 3성 배와 4성 배의 가격과 선착장은 어떻게 다른가요?", answer: "2026년 8월 공시 성인 요금은 3성 215위안, 4성 360위안입니다. 운영사 안내에 따르면 3성은 모판산, 4성은 주장 선착장에서 타고 둘 다 양숴에서 내립니다. 식사와 좌석은 실제 주문 조건을 비교하세요." },
      { question: "외국 여권으로 리강 유람선을 예약할 수 있나요?", answer: "관광지는 실명 예약을 요구하지만 공식 웹페이지는 외국 여권의 위챗 입력 절차를 자세히 설명하지 않습니다. 결제 전에 공식 판매처에 여권 예약과 표 수령 방식을 확인하고, 성공한 주문에 쓴 원본 문서를 지참하세요." },
      { question: "유람선이 양숴에 도착한 뒤 구이린으로 돌아오나요?", answer: "여기에서 비교한 구이린–양숴 전 구간은 양숴 하선이 기본입니다. 그곳의 숙소, 짐과 픽업을 계획하세요. 별도의 귀환 상품을 이용한다면 날짜와 운항편을 따로 예약해야 합니다." }
    ] },
    { id: "internal-links", type: "internal-links", title: "구이린 여행에 유람선 넣기", items: [
      { label: "구이린·양숴 5일 프라이빗 투어", href: "/ko/tours/guilin-yangshuo-5-day-private-tour/", description: "유람선과 호텔, 전용 차량을 어떻게 연결하는지 보세요." },
      { label: "구이린에서 양숴까지: 배·차·기차", href: "/ko/guides/guilin-yangshuo-transport-route/", description: "선착장 픽업을 정하기 전에 이동 방식을 선택하세요." },
      { label: "양숴 숙소는 시내와 위룽허 중 어디?", href: "/ko/guides/yangshuo-town-or-yulong-river-where-to-stay/", description: "하선 후 동선에 맞춰 숙소를 고르세요." }
    ] },
    { id: "consultation", type: "callout", tone: "neutral", title: "배와 차량을 한 동선으로 맞추고 싶다면", body: "여행 날짜와 인원을 알려 주세요. Homeground가 구이린 픽업, 확정한 배 등급, 양숴 이동을 한 일정에 맞춰 보고 실제 좌석과 포함 사항을 확인한 뒤 견적을 드립니다." },
    { id: "sources", type: "sources", title: "리강 관광지 공식 자료", items: [
      { label: "2026년 국경절 사전 예약 공지", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/264", publisher: "구이린 리강 관광지", reviewedAt: "2026-09-26" },
      { label: "유람선 공시 요금", url: "https://www.liriver.com.cn/page/article/lyfw.pwxx", publisher: "구이린 리강 관광지", reviewedAt: "2026-09-26" },
      { label: "선착장과 운항 구간 안내", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/130", publisher: "구이린 리강 관광지", reviewedAt: "2026-09-26" },
      { label: "표 수령과 외부 판매처 주문 안내", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/128", publisher: "구이린 리강 관광지", reviewedAt: "2026-09-26" }
    ] }
  ]
} as const satisfies StructuredPageBody;

export default body;
