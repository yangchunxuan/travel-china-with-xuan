import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "상하이에서 쑤저우를 당일치기로 다녀올 수 있습니다. 다만 돌아올 열차와 역까지 갈 시간을 먼저 정해야 합니다. 열차 탑승 시간만 보지 말고 상하이 호텔에서 역까지, 승차 전 대기, 쑤저우 시내 이동, 상하이로 돌아온 뒤 호텔까지 모두 계산하세요. 첫 방문이라면 정원 한 곳과 핑장루부터 잡는 편이 긴 명소 목록보다 현실적입니다." },
    { id: "answer", type: "callout", tone: "decision", title: "돌아올 길을 먼저 정하세요", body: "가고 싶은 정원의 방문 규칙과 해당 날짜의 입장 마감 시간을 확인하세요. 그다음 맞는 쑤저우 역에 여유 있게 도착할 수 있는 돌아오는 열차를 고릅니다. 가능한 열차가 관광 시간을 지나치게 줄인다면 쑤저우에서 1박하는 편이 낫습니다." },
    { id: "stations-heading", type: "heading", level: 2, text: "상하이와 쑤저우에서 어느 역을 고를까요?" },
    { id: "stations", type: "table", caption: "왕복 승차권의 역 이름을 각각 확인하세요", columns: ["결정", "확인할 점"], rows: [
      ["상하이 출발", "상하이역과 상하이훙차오역 중 실제 호텔 또는 공항에서 닿기 좋은 곳을, 여행 날짜에 12306이 제공하는 열차와 함께 비교하세요. 두 역은 다릅니다."],
      ["쑤저우 도착", "쑤저우역은 옛 시가지 정원 방문에 유리할 수 있지만 쑤저우북역은 별도의 역입니다. 열차 시간만으로 고르지 말고 시내 이동을 더하세요."],
      ["상하이로 돌아갈 때", "쑤저우 출발역과 상하이 도착역을 따로 확인하세요. 늦은 밤 다른 상하이 역에 도착하면 열차에서 아낀 시간을 다시 쓸 수 있습니다."],
    ] },
    { id: "station-source", type: "paragraph", text: "쑤저우시 정부는 쑤저우역에서 졸정원 일대와 핑장루로 가는 지하철 연결을 안내합니다. 그래서 쑤저우역을 비교할 만하지만 모든 열차와 호텔에 대한 정답은 아닙니다. 예약 전 실제 날짜와 역 전체 이름을 12306에서 확인하세요." },
    { id: "clock-heading", type: "heading", level: 2, text: "열차가 아니라 하루 전체를 계산하세요" },
    { id: "clock", type: "list", ordered: true, items: ["상하이 호텔에서 정확한 출발역까지 이동합니다. 짐과 아침 혼잡을 감안하세요.", "역 출입, 보안 검색, 승차 대기와 예약한 열차를 더합니다.", "쑤저우 도착역에서 첫 명소까지 이동하고 정원 안의 걷기와 대기를 고려합니다.", "마지막 명소에서 정확한 쑤저우 출발역까지 돌아가 승차 여유를 둡니다.", "상하이 도착역에서 호텔까지의 마지막 이동도 확인합니다."] },
    { id: "day-heading", type: "heading", level: 2, text: "하루를 너무 빽빽하게 채우지 않는 동선" },
    { id: "day-plan", type: "paragraph", text: "먼저 졸정원 같은 정원 한 곳을 고르고 해당 정원의 입장 규칙과 입장 마감을 확인하세요. 이후 식사와 핑장루를 걸을 시간을 남깁니다. 한산사는 열차, 정원과 시내 이동에 여유가 있을 때만 추가하고 그렇지 않으면 뺍니다. 이는 계획 순서에 대한 제안이며 고정된 시간표나 입장권 확보를 뜻하지 않습니다." },
    { id: "day-tradeoff", type: "comparison", title: "두 가지 선택", columns: [
      { heading: "직접 준비하는 당일치기", body: "열차와 정원 입장을 직접 준비하고 정원 한 곳과 인근 핑장루를 둘러본 뒤 같은 상하이 호텔로 돌아갑니다." },
      { heading: "쑤저우에서 1박", body: "정원 한 곳을 더 보거나 저녁까지 여유를 갖고 싶다면 1박을 고려하세요. 쑤저우박물관 본관은 현재 시간대별 예약이 필요하지만 다른 관은 규정이 다를 수 있습니다. 방문 전 최신 공지를 확인하세요." },
    ] },
    { id: "products-heading", type: "heading", level: 2, text: "공개된 프라이빗 코스는 쑤저우를 어떻게 담나요?" },
    { id: "products", type: "paragraph", text: "Homeground의 5일 상하이·쑤저우 프라이빗 투어는 상하이의 같은 호텔에서 4박합니다. 쑤저우 하루에는 왕복 고속철도 2등석, 양쪽 도시의 전용 차량 연결, 가이드 관광, 졸정원·한산사·핑장루가 포함됩니다. 이는 전체 5일 상품이며 하루짜리 가격이 아닙니다. 6일 상하이·쑤저우·항저우 코스는 쑤저우에서 1박한 뒤 항저우로 이동하므로 교통과 관광 구성이 다릅니다. 가격을 비교하기 전에 날짜, 인원과 서면 포함 사항을 확인하세요." },
    { id: "product-links", type: "internal-links", title: "실제 판매 중인 두 코스 비교", items: [
      { label: "5일 상하이·쑤저우 프라이빗 투어", href: "/ko/tours/shanghai-suzhou-5-day-private-tour/", description: "상하이 4박 중 하루를 쑤저우에 다녀옵니다." },
      { label: "6일 상하이·쑤저우·항저우 프라이빗 투어", href: "/ko/tours/shanghai-suzhou-hangzhou-6-day-private-tour/", description: "쑤저우에서 1박한 뒤 항저우로 갑니다." },
      { label: "쑤저우 정원 한 곳 고르기", href: "/ko/guides/how-to-read-a-suzhou-garden/", description: "한정된 시간을 어디에 쓸지 결정하세요." },
    ] },
    { id: "faq", type: "faq", title: "열차를 예약하기 전에", items: [
      { question: "상하이에서 쑤저우까지 하루면 충분한가요?", answer: "목적이 분명한 첫 방문에는 가능하지만 주요 정원과 옛 거리를 모두 볼 시간은 아닙니다. 정원 한 곳과 핑장루를 먼저 놓고 전체 왕복 이동 시간을 따져 보세요." },
      { question: "쑤저우역과 쑤저우북역은 같은가요?", answer: "아닙니다. 승차권의 전체 역 이름이 중요합니다. 쑤저우역은 옛 시가지 명소로 가는 공식 지하철 안내가 있고 쑤저우북역에서는 시내 이동을 별도로 계산해야 합니다." },
      { question: "정원이나 박물관은 예약해야 하나요?", answer: "방문할 정원의 입장 규칙과 마감 시간을 확인하세요. 쑤저우박물관 본관은 현재 시간대별 예약이 필요하지만 다른 관은 규정이 다를 수 있으니 최신 공지를 확인하세요. 박물관은 공개된 Homeground 5일 일정에 포함되지 않습니다." },
      { question: "Homeground에서 쑤저우 하루만 판매하나요?", answer: "공개된 상품은 쑤저우 방문을 포함한 상하이 기반 5일 프라이빗 투어입니다. 하루만 별도로 요청한다면 범위와 견적을 새로 확인해야 하며 공개된 5일 가격을 하루 가격으로 볼 수 없습니다." },
    ] },
    { id: "sources", type: "sources", title: "공식 여행 자료와 사진 출처", items: [
      { label: "날짜별 열차와 전체 역 이름 검색", url: "https://www.12306.cn/en/index.html", publisher: "중국철도 12306", reviewedAt: "2026-09-23" },
      { label: "쑤저우역에서 시내로 가는 교통", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202604/568a4eac0636443c968cfc195b9a3e29.shtml", publisher: "쑤저우시 정부", reviewedAt: "2026-09-23" },
      { label: "정원별 입장 규칙", url: "https://ylj.suzhou.gov.cn/szsylj/ryxz/nav_list.shtml", publisher: "쑤저우시 원림녹화관리국", reviewedAt: "2026-09-23" },
      { label: "정원 개방 및 입장 마감 시간", url: "https://ylj.suzhou.gov.cn/szsylj/kfsj/wztt.shtml", publisher: "쑤저우시 원림녹화관리국", reviewedAt: "2026-09-23" },
      { label: "정원 날짜별 공지", url: "https://ylj.suzhou.gov.cn/szsylj/tzgg/list.shtml", publisher: "쑤저우시 원림녹화관리국", reviewedAt: "2026-09-23" },
      { label: "쑤저우박물관 관별 예약 안내", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202609/2d1a50ec4496485d9f5c332de585dfdc.shtml", publisher: "쑤저우시 정부", reviewedAt: "2026-09-23" },
      { label: "kevinmcgill의 핑장루 사진, CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:A_stone_arch_bridge_in_Pingjiang_Road,_Suzhou.jpg", publisher: "위키미디어 공용", reviewedAt: "2026-09-23" },
    ] },
  ],
} satisfies StructuredPageBody;

export default body;
