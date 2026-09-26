import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "answer", type: "lead", text: "강 위에서 삼협을 보는 일이 이번 여행의 우선순위이고 충칭에서 배를 타 이창에서 다음 도시로 이동할 수 있다면 3박 크루즈를 고려해 보세요. 선실에서는 3박을 하지만 일정에서는 4일을 써야 합니다. 그 4일 때문에 더 가고 싶은 곳을 포기해야 한다면 육상 일정에 시간을 남기는 편이 낫습니다." },
  { id: "fit", type: "comparison", title: "먼저 이렇게 판단하세요", columns: [
    { heading: "크루즈를 넣을 때", body: "강에서 보내는 시간이 중요하고, 충칭 승선·이창 하선이 전체 동선에 맞으며, 확정된 운항일을 기준으로 앞뒤 이동을 잡을 수 있을 때." },
    { heading: "육상 일정에 시간을 쓸 때", body: "휴가가 짧거나 강 여행의 우선순위가 낮고, 정해진 운항일 때문에 관광이나 항공·열차 연결이 지나치게 빠듯해질 때." }
  ] },
  { id: "four-days-heading", type: "heading", level: 2, text: "배에서는 3박, 달력에서는 4일" },
  { id: "four-days", type: "table", caption: "크루즈 전후 시간까지 계산하세요", columns: ["날짜", "확보할 시간"], rows: [
    ["승선일", "충칭에 도착해 확정된 부두까지 가야 합니다. 하루 종일 시내를 볼 수 있다고 잡지 마세요."],
    ["선상 이틀", "확정된 항해와 육상 관광 일정에 따릅니다. 다른 도시의 자유 관광일이 아닙니다."],
    ["하선일", "하선, 포함된 방문 일정, 실제 종료 지점에서 공항이나 역까지 가는 시간을 남겨야 합니다."]
  ] },
  { id: "geometry-heading", type: "heading", level: 2, text: "운항일을 먼저 확인하고 양쪽 일정을 연결하세요" },
  { id: "geometry", type: "list", ordered: true, items: [
    "여행 날짜에 맞는 충칭 출발·이창 도착 하행편부터 확인하세요. 선박, 운항 방향과 부두는 실제 예약 내역을 기준으로 합니다.",
    "충칭에 들어오는 이동을 거꾸로 계획하세요. 전날 도착하면 지연에 대응할 여유가 늘고, 당일 비행기를 이용한다면 착륙부터 픽업·승선까지 충분한 시간을 확인해야 합니다.",
    "이창 이후 일정은 먼저 실제 하선 장소와 시간, 포함된 육상 관광을 확인한 뒤 항공편이나 열차를 고르세요.",
    "크루즈에 쓰는 4일과 그 대신 빠지는 도시 관광·휴식 시간을 비교하세요. 남은 일정이 너무 바빠진다면 좋은 선택이 아닙니다."
  ] },
  { id: "route-options-heading", type: "heading", level: 2, text: "기존 여행 세 가지는 배에 닿는 방식이 다릅니다" },
  { id: "route-options", type: "table", caption: "동선의 차이이며, 예약은 각각 확인해야 합니다", columns: ["Homeground 일정", "크루즈 연결"], rows: [
    ["충칭·삼협 6일", "충칭 호텔에서 2박한 뒤 크루즈에서 3박하고 이창에서 마칩니다."],
    ["베이징·시안·양쯔강·상하이 12일", "승선일에 시안에서 충칭으로 비행하므로 당일 이동 여유를 특히 확인해야 합니다."],
    ["베이징·시안·청두·양쯔강·상하이 17일", "승선 전 충칭에서 1박하고, 하선 후 이창에서 상하이로 이어집니다."]
  ] },
  { id: "service-heading", type: "heading", level: 2, text: "육상 프라이빗 투어와 크루즈 서비스는 다릅니다" },
  { id: "service", type: "callout", tone: "warning", title: "서비스 범위를 따로 읽어 보세요", body: "아래 Homeground 상품에서는 명시된 육상 관광일에 일행만을 위한 가이드와 차량이 제공됩니다. 크루즈는 다른 승객과 함께 타는 배이며 선사 직원과 프로그램을 이용합니다. 육상 가이드가 배에도 동행하거나 선상 해설이 원하는 언어로 제공된다고 가정하지 마세요. 결제 전 서면 확인서에서 해당 날짜의 선박, 객실, 부두, 포함된 식사·육상 관광, 추가 요금과 서비스 비용을 확인해야 합니다." },
  { id: "booking-heading", type: "heading", level: 2, text: "예약 전에 확인할 다섯 가지" },
  { id: "booking", type: "list", items: [
    "운항일, 방향, 선박, 승선 부두와 실제 하선 장소.",
    "객실 종류와 발코니 형태, 1인 객실을 쓸 경우의 추가금.",
    "포함된 식사·육상 관광과 별도로 내야 하는 항목.",
    "선상 해설 언어와 육상 프라이빗 서비스가 선사 서비스로 바뀌는 지점.",
    "승하선 양쪽 이동 여유와 선사의 변경·취소 조건."
  ] },
  { id: "dynamic", type: "callout", tone: "neutral", title: "세부 사항은 실제 운항편이 기준입니다", body: "이 글은 일정 선택을 돕는 안내이며 실시간 시간표가 아닙니다. 날씨, 수위와 항로 운영에 따라 부두·기항지·종료 시간이 바뀔 수 있습니다. 결제 전에 해당 선사의 현재 프로그램과 서면 계약 내용을 확인하고 여행 직전 다시 점검하세요." },
  { id: "faq", type: "faq", title: "크루즈를 넣기 전에 많이 묻는 질문", items: [
    { question: "3박 크루즈라면 여행 일정도 3일만 쓰나요?", answer: "아니요. 충칭에서 이창으로 가는 3박 항해에는 승선일, 선상 이틀, 하선일로 총 4일이 필요합니다. 이 날짜들을 다른 도시의 온전한 관광일로 중복 계산할 수 없습니다." },
    { question: "프라이빗 투어를 예약하면 배에서도 전용 가이드가 있나요?", answer: "그렇게 이해하면 안 됩니다. 전용 가이드와 차량은 상품에 명시된 육상 서비스에 적용됩니다. 배에서는 다른 승객과 함께하며, 선상 직원·해설 언어·객실·육상 관광은 실제 운항편별로 확인해야 합니다." },
    { question: "하선하는 날 이창에서 바로 비행기나 기차를 탈 수 있나요?", answer: "가능할 수 있지만 먼저 실제 하선 장소와 시간, 포함된 육상 관광, 정확한 공항이나 역까지의 이동을 확인하세요. 배에서 내리는 시간을 곧바로 시내 역에 도착하는 시간으로 잡으면 안 됩니다." },
    { question: "크루즈를 넣으니 나머지 일정이 너무 바빠집니다. 어떻게 할까요?", answer: "크루즈를 빼거나 여행 일수를 늘리세요. 강에서 보내는 시간이 포기해야 할 육상 일정만큼 중요할 때에만 4일을 쓰는 편이 좋습니다. 고정된 운항일에 맞추려고 중요한 도시나 이동 여유를 희생할 필요는 없습니다." }
  ] },
  { id: "links", type: "internal-links", title: "일정별로 살펴보기", items: [
    { label: "충칭·양쯔강 삼협 6일 프라이빗 투어", href: "/ko/tours/chongqing-yangtze-cruise-6-day-private-tour/", description: "충칭 2박 뒤 다른 승객과 함께 크루즈에서 3박합니다." },
    { label: "베이징·시안·양쯔강·상하이 12일", href: "/ko/tours/beijing-xian-yangtze-cruise-shanghai-12-day-private-tour/", description: "승선일에 시안에서 충칭으로 이동하는 다도시 일정입니다." },
    { label: "베이징·시안·청두·양쯔강·상하이 17일", href: "/ko/tours/beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour/", description: "승선 전에 충칭 호텔에서 하루를 보내는 더 긴 일정입니다." },
    { label: "중국 여행 일정이 너무 빠듯한지 확인하기", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "도시를 옮기는 날에 드는 전체 시간을 계산하세요." },
    { label: "중국 입출국 도시를 다르게 잡는 항공편 계획", href: "/ko/guides/china-open-jaw-flights-route-planning/", description: "여행 양쪽 끝에서 불필요한 역주행을 줄이세요." }
  ] },
  { id: "sources", type: "sources", title: "선사 및 사진 출처", items: [
    { label: "골드 크루즈 운영사와 삼협 크루즈 상품 소개", url: "https://www.ccqctg.com/col1916449.html", publisher: "충칭 문화관광그룹", reviewedAt: "2026-09-26" },
    { label: "다른 선사의 충칭→이창 3박 4일 사례이며 본 상품의 확정 운항편은 아님", url: "https://centurycruise.com/tours/yangtze-signature-downstream-cruise-3-night", publisher: "센추리 크루즈", reviewedAt: "2026-09-26" },
    { label: "대표 사진: Tan Wei Liang Byorn의 구당협 사진, CC BY 3.0", url: "https://commons.wikimedia.org/wiki/File:Qutang_Gorge_on_Changjiang.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-26" }
  ] }
] } satisfies StructuredPageBody;

export default body;
