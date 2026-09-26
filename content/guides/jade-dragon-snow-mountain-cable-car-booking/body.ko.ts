import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "위룽쉐산에 갈 때는 산 입장권과 케이블카 표를 따로 확인해야 합니다. 2026년 공지 요금은 입장권 100위안, 친환경 셔틀 20위안이며, 빙천공원 케이블카는 120위안, 윈산핑 케이블카는 40위안입니다. 개인 입장권은 ‘玉龙雪山服务’, 케이블카는 ‘丽江旅游集团’ 위챗 미니프로그램에서 확인합니다. 묶음 상품도 있으니 결제 전에 포함 항목을 보세요." },
    { id: "tickets-heading", type: "heading", level: 2, text: "같은 산에 들어가도 표는 서로 다릅니다" },
    { id: "tickets-table", type: "table", caption: "2026년 공개된 1인당 요금, 2026년 9월 26일 확인", columns: ["항목", "공개 요금", "개인 예약 채널"], rows: [
      ["산 입장권", "100위안", "‘玉龙雪山服务’ 위챗 미니프로그램"],
      ["친환경 셔틀", "20위안", "예약하려는 입장 상품의 포함 항목 확인"],
      ["빙천공원 케이블카", "120위안", "‘丽江旅游集团’ 위챗 미니프로그램"],
      ["윈산핑 케이블카", "40위안", "‘丽江旅游集团’ 위챗 미니프로그램"]
    ] },
    { id: "release-heading", type: "heading", level: 2, text: "케이블카 두 노선의 예매 시작 시각이 다릅니다" },
    { id: "release", type: "paragraph", text: "운영사가 발표한 규칙에 따르면 빙천공원은 매일 20:00, 윈산핑은 매일 21:00에 앞으로 7일치 표가 열립니다. 산 입장권 역시 최대 7일 전에 별도 채널에서 살 수 있습니다. 입장권 구매만으로 케이블카 자리가 확보되지는 않습니다. 여행 날짜가 가까워지면 두 운영 채널의 공지를 다시 확인하세요." },
    { id: "yak", type: "callout", tone: "warning", title: "야크 메도 케이블카는 현재 선택할 수 없습니다", body: "牦牛坪 케이블카는 재건 공사로 2026년 3월 4일부터 운행을 중단했습니다. 2028년 무렵이라는 전망은 확정된 재개 날짜가 아닙니다. 예전 일정표에 남아 있다면 그대로 예약하지 마세요." },
    { id: "choice-heading", type: "heading", level: 2, text: "빙천공원과 윈산핑 중 어디로 갈까요?" },
    { id: "choice", type: "comparison", title: "가고 싶은 곳에 맞는 표를 고르세요", columns: [
      { heading: "빙천공원", body: "상부 케이블카 구간으로 일일 정원이 더 제한되고 날씨의 영향도 받습니다. 케이블카 120위안만 전체 방문 비용이라고 생각하지 말고 입장권과 셔틀, 예약 상품의 내용을 함께 보세요." },
      { heading: "윈산핑", body: "별도의 낮은 구역으로 가는 케이블카이며 공개 요금은 40위안입니다. 윈산핑 표로 빙천공원에 갈 수는 없습니다. 저희가 공개한 윈난 8일 일정에는 윈산핑과 블루문밸리가 들어가며, 최종 내용은 서면 확인을 따릅니다." }
    ] },
    { id: "workflow-heading", type: "heading", level: 2, text: "결제 전에 이 순서로 살펴보세요" },
    { id: "workflow", type: "list", ordered: true, items: [
      "산에서 가장 보고 싶은 곳이 빙천공원인지 윈산핑인지 먼저 정하고, 방문 날짜의 운영 여부를 확인합니다.",
      "‘玉龙雪山服务’에서 입장 상품을, ‘丽江旅游集团’에서 케이블카 상품을 각각 봅니다. 케이블카 개인 예약에는 실명 및 얼굴 인증 절차가 있습니다.",
      "구매가 완료되면 날짜, 케이블카 이름, 탑승 시간과 신분증 정보를 주문별로 확인하고 예약에 사용한 신분증 원본을 지참합니다.",
      "바람이나 날씨로 운행이 중단되면 해당 주문의 변경·환불 안내를 따릅니다. 다른 케이블카로 자동 교체된다고 생각하면 안 됩니다."
    ] },
    { id: "passport", type: "callout", tone: "neutral", title: "외국 여권을 사용할 때", body: "운영사의 이전 안내는 외국 여권 소지자가 중국 주민신분증 소지자와 따로 케이블카를 예약해야 한다고 설명합니다. 현재 미니프로그램의 자세한 여권 입력 방법은 확인되지 않았습니다. 결제 전에 공식 판매처에 예약·확인 방법을 묻고, 확정된 주문에 사용한 신분증 원본을 가져오세요." },
    { id: "faq", type: "faq", title: "위룽쉐산 예약에서 많이 묻는 것", items: [
      { question: "빙천공원 케이블카 표는 언제 열리나요?", answer: "운영사 발표 규칙은 ‘丽江旅游集团’에서 매일 20:00에 앞으로 7일치 표를 여는 것입니다. 당일 운영과 남은 수량은 별도로 확인해야 합니다." },
      { question: "윈산핑 케이블카는 몇 시에 예약하나요?", answer: "발표된 시각은 매일 21:00이며 앞으로 7일치가 열립니다. 빙천공원과는 별도 상품입니다." },
      { question: "입장권 하나로 케이블카까지 탈 수 있나요?", answer: "그렇게 가정하면 안 됩니다. 2026년 공지에는 입장권 100위안, 셔틀 20위안, 케이블카 요금이 각각 적혀 있습니다. 묶음 상품은 실제 주문에 포함된 항목을 확인하세요." },
      { question: "牦牛坪 케이블카는 2026년에 운행하나요?", answer: "아니요. 2026년 3월 4일부터 재건 공사로 운행을 중단했으며, 재개 날짜는 확정되지 않았습니다." },
      { question: "날씨 때문에 케이블카가 멈추면 어떻게 하나요?", answer: "운영사는 영향을 받은 빙천공원 주문의 변경 및 날씨 우선 재예약 규칙을 발표했습니다. 적용 여부와 절차는 현재 공지 및 본인의 주문에서 확인하세요." },
      { question: "Homeground 윈난 8일 투어에 빙천공원 케이블카가 포함되나요?", answer: "공개된 일정에는 윈산핑과 블루문밸리가 적혀 있으며 빙천공원 예약은 약속하지 않습니다. 빙천공원이 우선이라면 날짜별 가능 여부와 별도 견적을 요청해 주세요." }
    ] },
    { id: "internal-links", type: "internal-links", title: "리장 일정과 함께 보기", items: [
      { label: "쿤밍·다리·리장 8일 프라이빗 투어", href: "/ko/tours/kunming-dali-lijiang-8-day-private-tour/", description: "공개된 윈산핑과 블루문밸리 일정을 보고 빙천공원 추가는 따로 문의하세요." },
      { label: "리장에서 샹그릴라까지 이동 순서", href: "/ko/guides/lijiang-shangri-la-transport-route/", description: "산 방문일을 정하기 전에 전체 여행 동선을 살펴보세요." }
    ] },
    { id: "sources", type: "sources", title: "공식 기관 및 운영사 자료", items: [
      { label: "2026년 입장권·케이블카 가격", url: "https://www.lijiang.cn/article/175988.html", publisher: "위룽쉐산 관리기관 공지 / 리장시 매체", reviewedAt: "2026-09-26" },
      { label: "현재 입장권 미니프로그램과 7일 예약 기간", url: "https://www.lijiang.cn/article/181225.html", publisher: "위룽쉐산 관리기관 설명 / 리장시 매체", reviewedAt: "2026-09-26" },
      { label: "바이사 방문객센터 이전 공지", url: "https://www.lijiang.cn/article/164510.html", publisher: "위룽쉐산 관리기관 공지 / 리장시 매체", reviewedAt: "2026-09-26" },
      { label: "케이블카 예약·날씨 규칙", url: "https://www.ctnews.com.cn/dongtai/content/2025-06/25/content_175505.html", publisher: "운영사를 인용한 중국관광보", reviewedAt: "2026-09-26" },
      { label: "외국 여권 예약에 관한 이전 안내", url: "https://www.lijiang.cn/article/133126.html", publisher: "리장 케이블카 운영사 / 리장시 매체", reviewedAt: "2026-09-26" },
      { label: "牦牛坪 케이블카 중단 공시", url: "https://static.cninfo.com.cn/finalpage/2026-03-03/1224991096.PDF", publisher: "리장 관광 운영사 증권거래소 공시", reviewedAt: "2026-09-26" },
      { label: "산 사진과 이용 허가", url: "https://commons.wikimedia.org/wiki/File:Jade_Dragon_Snow_Mountain,_Yunnan.jpg", publisher: "Wikimedia Commons / 钉钉", reviewedAt: "2026-09-26" }
    ] }
  ]
} as const satisfies StructuredPageBody;

export default body;
