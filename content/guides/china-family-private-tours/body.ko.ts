import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "Homeground의 중국 가족 투어는 프라이빗 투어입니다. 도시마다 영어 가이드 한 명과 차량 한 대가 우리 가족만 맡고, 코스와 속도는 아이에게 맞춰 정합니다. 공개 가격은 8일 베이징·시안·상하이 코스에서 성인 6명이 트윈룸을 2명씩 사용하는 기준으로 성인 1인 ₩1,670,000부터입니다. 8~12명 단체는 1인 요금이 훨씬 낮아지며 단체 기준으로 견적합니다. 어린이는 따로 견적하므로 아이의 나이를 알려 주시면, 결제 전에 전체 일정과 가족 총액을 서면으로 받으실 수 있습니다." },
    { id: "included-heading", type: "heading", level: 2, text: "가족이 받는 것" },
    { id: "included-list", type: "list", items: [
      "전담 가이드와 전용 차량. 관광일에는 영어 현지 가이드와 차량이 우리 일행만 맡으며, 예약 전에 쉬어 갈 곳과 꼭 보고 싶은 곳을 상의할 수 있습니다.",
      "매일 조식이 포함된 호텔. 객실 유형과 어린이 침구는 결제 전에 서면으로 확정합니다.",
      "도시 간 장거리 이동은 미리 예약됩니다. 고속철도와 국내선 항공이 요금에 포함되고, 출발지에서 기사가 배웅하고 도착지에서 다른 기사가 맞이합니다.",
      "입장권 준비. 코스에 명시된 첫 입장권이 포함되며, 일정에 있는 관광지 예약에는 추가 수수료가 없습니다.",
      "서면 계획이 먼저입니다. 코스와 호텔, 총액을 먼저 보고 결정합니다."
    ] },
    { id: "limits", type: "callout", tone: "neutral", title: "문의 전에 알아 둘 점", body: "가이드는 도시별로 바뀌며 처음부터 끝까지 동행하지는 않습니다. 공개 가격은 성인 2명, 4명 또는 6명이 2인 1실을 쓰는 기준입니다. 7~12명 단체, 3인이나 5인 가족, 그리고 모든 어린이는 따로 견적합니다. 주요 관광지는 걷고 계단을 오르는 구간이 많고 만리장성과 장가계가 특히 그렇습니다. 일행 각자가 편하게 걸을 수 있는 시간을 알려 주세요." },
    { id: "routes-heading", type: "heading", level: 2, text: "가족이 가장 많이 묻는 다섯 코스" },
    { id: "routes-table", type: "table", caption: "가족에게 맞는 프라이빗 코스와 성인 1인 가격(영어 가이드 포함)", columns: ["코스", "일수", "가족이 고르는 이유", "성인 6명 기준·성인 1인"], rows: [
      ["베이징·시안·상하이", "8", "무톈위 만리장성, 자금성, 병마용을 가장 짧게 둘러봅니다. 시안에서 상하이는 6시간 기차 대신 항공으로 이동합니다. 쉬는 날은 없습니다.", "₩1,670,000"],
      ["베이징·시안·구이린·상하이", "10", "리강 유람선으로 양숴까지 가는 일정이 더해져, 대도시 뒤에 분위기가 바뀝니다.", "₩2,340,000"],
      ["베이징·항저우·쑤저우·상하이", "11", "국내선 항공 없이 기차와 전용 차량만 이용합니다. 서호 유람선, 차 마을, 쑤저우 정원, 운하 수향 마을을 봅니다.", "₩2,160,000"],
      ["베이징·시안·청두·구이린·상하이", "14", "판다 코스입니다. 판다가 대체로 활발한 개장 직후에 청두 판다 기지를 방문하고, 리강 유람선과 위룽강 대나무 뗏목도 탑니다.", "₩3,300,000"],
      ["베이징·시안·장가계·구이린·상하이", "14", "조금 큰 아이에게 맞습니다. 장가계의 아바타 봉우리와 천문산을 봅니다. 엘리베이터와 케이블카를 타도 산책로와 계단을 몇 시간 걸어야 합니다.", "₩3,400,000"]
    ] },
    { id: "routes-copy", type: "paragraph", text: "위 금액은 성인 6명이 트윈룸을 2명씩 사용하는 기준의 성인 1인 공개 가격입니다. 두 가족이 함께 가거나 8~12명 단체라면 1인 요금이 훨씬 낮아집니다. 인원을 알려 주시면 단체 기준으로 견적합니다. 성인 4명이 트윈룸을 2명씩 사용하면 8일 코스의 공개 가격은 성인 1인 ₩1,830,000입니다. 성인 2명과 어린이 2명이라면 아이의 나이와 객실 구성을 알려 주세요. 가족 전체의 총액을 따로 서면으로 안내합니다. 쉬는 날을 넣고 싶다면 8일·10일 코스보다 14일 코스가 여유가 있습니다. 실제 견적은 여행 날짜와 선택한 호텔, 아이의 나이에 따라 달라집니다." },
    { id: "children-heading", type: "heading", level: 2, text: "어린이 요금은 어떻게 정하나요" },
    { id: "children-copy", type: "paragraph", text: "어린이는 정해진 요금표가 없습니다. 아이마다 나이와 여행 중 필요한 것을 기준으로 따로 견적하며, 2인·4인·6인이 아닌 가족도 따로 견적합니다. 문의할 때 아이의 나이와 필요한 객실을 함께 알려 주시면, 성인만이 아니라 가족 전체를 포함한 서면 견적을 드립니다." },
    { id: "booking-heading", type: "heading", level: 2, text: "예약 방법" },
    { id: "booking-list", type: "list", ordered: true, items: [
      "여행할 달, 아이의 나이, 원하는 코스나 대략의 일수를 알려 주세요.",
      "플래너가 해당 날짜의 호텔, 가이드, 입장권을 확인한 뒤 총액이 적힌 서면 계획을 보내 드립니다.",
      "결정은 고객님이 하십니다. 포함 내역이 적힌 서면 확인을 받은 뒤에만 결제합니다."
    ] },
    { id: "tours", type: "internal-links", title: "코스 자세히 보기", items: [
      { label: "베이징·시안·상하이 8일 프라이빗 투어", href: "/ko/tours/beijing-xian-shanghai-8-day-private-tour/" },
      { label: "베이징·시안·구이린·상하이 10일 프라이빗 투어", href: "/ko/tours/beijing-xian-guilin-shanghai-10-day-private-tour/" },
      { label: "베이징·항저우·쑤저우·상하이 11일 프라이빗 투어", href: "/ko/tours/beijing-hangzhou-suzhou-shanghai-11-day-private-tour/" },
      { label: "베이징·시안·청두·구이린·상하이 14일 프라이빗 투어", href: "/ko/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/" },
      { label: "베이징·시안·장가계·구이린·상하이 14일 프라이빗 투어", href: "/ko/tours/beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour/" },
      { label: "어린 자녀와 중국 일정 짜기", href: "/ko/guides/china-itinerary-with-young-children/" },
      { label: "프라이빗 투어 공개 가격 전체", href: "/ko/guides/china-private-tour-prices/" }
    ] },
    { id: "faq", type: "faq", title: "가족이 자주 묻는 질문", items: [
      { question: "중국 가족 투어 비용은 얼마인가요?", answer: "Homeground의 프라이빗 투어 공개 가격은 성인 6명이 트윈룸을 2명씩 사용하는 기준으로 8일 베이징·시안·상하이 코스는 성인 1인 ₩1,670,000부터이고, 청두 판다가 포함된 14일 코스는 성인 1인 ₩3,300,000입니다. 성인 4명이 트윈룸을 2명씩 사용하면 같은 코스는 성인 1인 ₩1,830,000과 ₩3,670,000입니다. 어린이가 있는 가족은 아이의 나이와 객실 구성에 따라 가족 전체 총액을 따로 서면으로 확인합니다. 8~12명 단체는 1인 요금이 더 낮으며 따로 견적합니다. 조식 포함 호텔, 관광일의 전담 가이드와 차량, 명시된 입장권, 도시 간 기차와 항공이 포함됩니다. 어린이는 따로 견적합니다." },
      { question: "아이와 함께라면 어떤 중국 투어가 가장 좋을까요?", answer: "여행 일수와 아이의 나이에 따라 다릅니다. 14일이라면 베이징·시안·청두·구이린·상하이 코스에 판다 기지와 강 유람 하루가 더해집니다. 8일이라면 베이징·시안·상하이 코스로 만리장성, 자금성, 병마용을 봅니다. 국내선 항공을 피하려면 기차와 전용 차량만 이용하는 11일 베이징·항저우·쑤저우·상하이 코스가 있습니다." },
      { question: "프라이빗 투어에 어린이 할인이 있나요?", answer: "공개 가격표에는 정해진 어린이 요금이 없습니다. 아이마다 나이와 여행 중 필요한 것을 기준으로 따로 견적하므로, 문의할 때 나이를 알려 주시면 가족 전체를 포함한 서면 견적을 드립니다." },
      { question: "가족에게는 단체 투어보다 프라이빗 투어가 나은가요?", answer: "프라이빗 투어는 가이드와 차량이 우리 가족만 맡으므로 속도와 쉬는 곳, 출발 시간을 직접 정할 수 있습니다. 예산이 더 중요하다면 14일 코스 두 가지는 소그룹 출발로도 운영하며 1인 ₩3,000,000부터입니다." },
      { question: "가족 여행에는 며칠이 필요한가요?", answer: "베이징·시안·상하이를 도는 가장 짧은 공개 코스는 8일이며 쉬는 날이 없습니다. 아이와 함께라면 10~14일이 더 편합니다. 14일 코스는 쉬는 날을 넣을 여유가 있고 판다나 리강이 더해집니다." },
      { question: "조부모님도 함께 갈 수 있나요?", answer: "가능합니다. 일행의 나이, 필요한 객실, 각자가 편하게 걸을 수 있는 시간을 알려 주세요. 정원과 사찰, 만리장성, 장가계에는 모두 계단과 고르지 않은 길이 있어, 예약 전에 이를 기준으로 계획을 확인합니다." },
      { question: "가족 투어의 관광지 입장권도 예약해 주나요?", answer: "네. 코스에 명시된 첫 입장권은 요금에 포함되며, 일정에 있는 관광지 예약은 추가 수수료 없이 저희가 진행합니다." },
    ] },
    { id: "sources", type: "sources", title: "가격, 포함 내역, 사진", items: [
      { label: "공개 가격과 포함 내역: 베이징·시안·상하이 8일 프라이빗 투어", url: "https://homegroundchina.com/ko/tours/beijing-xian-shanghai-8-day-private-tour/", publisher: "Homeground China", reviewedAt: "2026-10-11" },
      { label: "공개 가격과 포함 내역: 청두 포함 14일 프라이빗 투어", url: "https://homegroundchina.com/ko/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/", publisher: "Homeground China", reviewedAt: "2026-10-11" },
      { label: "프라이빗 투어 공개 가격 전체", url: "https://homegroundchina.com/ko/guides/china-private-tour-prices/", publisher: "Homeground China", reviewedAt: "2026-10-11" },
      { label: "대표 사진: George Lu가 촬영한 청두 판다 기지의 판다, CC BY 2.0, 크기 조정", url: "https://commons.wikimedia.org/wiki/File:Panda_in_Chengdu_Research_Base_of_Giant_Panda_Breeding_-_7708872342.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-10-11" },
      { label: "대표 사진 라이선스: CC BY 2.0", url: "https://creativecommons.org/licenses/by/2.0/", publisher: "Creative Commons", reviewedAt: "2026-10-11" }
    ] }
  ]
} satisfies StructuredPageBody;

export default body;
