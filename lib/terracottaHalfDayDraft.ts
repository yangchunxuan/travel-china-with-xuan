import type { HomegroundLocale } from "./homegroundI18n";

// Owner-review copy only. This draft is not registered as a sellable tour.
export const terracottaHalfDaySlug = "xian-terracotta-warriors-half-day-private-tour";
export const terracottaHalfDayPreviewPaths = {
  en: `/preview/${terracottaHalfDaySlug}/`,
  zh: `/zh/preview/${terracottaHalfDaySlug}/`,
  ko: `/ko/preview/${terracottaHalfDaySlug}/`,
} as const;

export const terracottaHalfDayImage = {
  src: "/images/tours/photo-quality-20261004/terracotta.webp",
  width: 3200,
  height: 2133,
  author: "Gary Todd from Xinzheng, China",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Qin_Terracotta_Army,_Pit_1_(9895750725).jpg",
  license: "CC0 1.0",
  licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
} as const;

export interface TerracottaHalfDayCopy {
  title: string;
  description: string;
  draft: string;
  skip: string;
  home: string;
  eyebrow: string;
  promise: string;
  heroAlt: string;
  heroCaption: string;
  primaryCta: string;
  facts: readonly { label: string; value: string }[];
  priceTitle: string;
  priceBody: string;
  routeTitle: string;
  routeBody: string;
  stops: readonly { time: string; title: string; body: string }[];
  timingNote: string;
  scopeTitle: string;
  includedTitle: string;
  included: readonly string[];
  excludedTitle: string;
  excluded: readonly string[];
  bookingTitle: string;
  bookingBody: string;
  officialLink: string;
  faqTitle: string;
  faq: readonly { question: string; answer: string }[];
  enquiryDetails: readonly { title: string; body: string }[];
  enquiryNote: string;
  readTitle: string;
  readLinks: readonly { path: string; title: string; body: string }[];
  photoCredit: string;
}

export const terracottaHalfDayCopy: Readonly<Record<HomegroundLocale, TerracottaHalfDayCopy>> = {
  en: {
    title: "Xi’an Terracotta Warriors Private Half-Day Tour",
    description: "Plan a private Terracotta Warriors visit from Xi’an: hotel transfers, an English-speaking guide and admission arrangements. Proposed 5–6 hours; a party quote follows date and hotel checks.",
    draft: "Local draft for review · pricing and supplier arrangements to be confirmed · not on sale",
    skip: "Skip to the tour",
    home: "Home",
    eyebrow: "XI’AN · PRIVATE HALF-DAY",
    promise: "One remarkable visit. The rest of your trip stays yours.",
    heroAlt: "Terracotta warriors and horses on display in Pit 1",
    heroCaption: "The Terracotta Warriors · a visit worth understanding",
    primaryCta: "Plan my half-day",
    facts: [
      { label: "Door to door", value: "About 5–6 hours" },
      { label: "At the museum", value: "About 2.5–3 hours" },
      { label: "Your party", value: "Private car + separate driver" },
      { label: "Your guide", value: "English-speaking · private" },
    ],
    priceTitle: "Price to be confirmed",
    priceBody: "Your travel date, group size and hotel shape the quote. We will set out the whole-party total and exactly what it covers before you decide.",
    routeTitle: "From your hotel to the warriors, and back.",
    routeBody: "A focused museum visit, with time to ask questions and a private return transfer. No shopping stops are planned; extra attractions are agreed separately.",
    stops: [
      { time: "01 · PICKUP & DRIVE", title: "Start at your Xi’an hotel", body: "Meet at the agreed city-centre hotel and travel by private vehicle. Allow roughly an hour to the museum; the actual journey depends on your hotel and traffic. The pickup time and whether your guide joins at the hotel or museum are confirmed in writing." },
      { time: "02 · ABOUT 2.5–3 HOURS", title: "See the figures. Understand the story.", body: "Walk through the open pits and exhibition areas with your own English-speaking guide. Ask about the army, the excavation and the details that make each figure different. The order and pace adapt to access, crowds and your party." },
      { time: "03 · RETURN TRANSFER", title: "Back to your agreed hotel", body: "Leave the museum and return by private vehicle. Keep the rest of the day for your own plans. Tell us about any train, flight or timed activity before choosing a start time so we can assess the return buffer." },
    ],
    timingNote: "5–6 hours is a planning estimate, not a guaranteed return time. Hotel location, the entry slot, traffic, security checks and queues can change the duration. Morning or afternoon departures depend on availability and opening hours.",
    scopeTitle: "One museum visit, with the practical parts together.",
    includedTitle: "Proposed package",
    included: ["A private vehicle and separate driver for the agreed hotel–museum return journey", "A private English-speaking guide for the confirmed museum visit", "Museum admission and real-name reservation arrangements for the quoted guests", "Agreed pickup and drop-off, with vehicle tolls and parking stated in the quote"],
    excludedTitle: "Outside the base plan",
    excluded: ["Hotel accommodation, lunch, personal spending and optional tips", "Airport or railway-station transfers, unless separately agreed", "Huaqing Palace, a guided Lishan Garden visit and other attractions", "Extra vehicle or guide time outside the written plan"],
    bookingTitle: "Your admission, checked before you travel.",
    bookingBody: "The museum uses real-name reservations. Bring the original passport or other accepted document used for your booking. We check admission availability and confirm the arrangements; an enquiry alone does not reserve entry. Security and entrance queues may still apply.",
    officialLink: "Museum reservation and visitor guidance",
    faqTitle: "Before you choose your half-day",
    faq: [
      { question: "Is this really a half-day tour?", answer: "The proposed door-to-door duration is about 5–6 hours, including the return drive and about 2.5–3 hours at the museum. It is a focused visit rather than a full-day sightseeing circuit. Your hotel and available entry slot determine the actual timing." },
      { question: "Will we share the car or guide with another group?", answer: "The proposed service is private to your party, with a separate driver and English-speaking guide. Museum spaces remain shared with other visitors. Guide availability and meeting arrangements are checked for your date before confirmation." },
      { question: "Does the museum ticket include a visit to Lishan Garden?", answer: "Yes. The museum’s standard admission covers both the Terracotta Warriors site and Lishan Garden. The guided half-day itinerary concentrates on the warriors; it does not include guide or vehicle time for the second site. Tell us if you want it added so we can check extra time and the revised quote." },
      { question: "Can I just get help with tickets?", answer: "Yes. If you are happy to arrange transport and visit independently, use our existing attraction reservation service instead. This proposed tour is for travellers who also want private transfers and live English commentary." },
      { question: "Can children or visitors with limited mobility join?", answer: "Tell us children’s ages and any walking or accessibility needs. We need to confirm ticket eligibility, vehicle seating and a suitable museum route before quoting. Child discounts, child seats and step-free access are not assumed." },
      { question: "What happens if plans change or tickets are unavailable?", answer: "The written quote will set out the ticket, guide and vehicle cancellation conditions before payment. If suitable entry or service availability cannot be confirmed, we discuss a different date or plan before you commit. This draft does not offer a fixed refund promise or guaranteed admission." },
    ],
    enquiryDetails: [
      { title: "Date & start preference", body: "Your visit date, morning / afternoon / flexible, and any fixed plans later that day." },
      { title: "Adults & children", body: "The number of adults, children’s ages, luggage and any accessibility needs." },
      { title: "Hotel & return point", body: "Your exact Xi’an hotel or address, and whether pickup and return are at the same place." },
    ],
    enquiryNote: "Preview only: request submission is not enabled. Pricing, the pickup zone and supplier terms will be finalised before launch.",
    readTitle: "Still deciding how to visit?",
    readLinks: [
      { path: "/guides/terracotta-warriors-without-tour/", title: "Visit the Terracotta Warriors independently", body: "Compare the DIY option before choosing a private guide and car." },
      { path: "/services/china-attraction-reservations/?attraction=terracotta-warriors#reservation-enquiry", title: "Need reservation help only?", body: "Use the existing ticket-assistance service if you do not need a tour." },
      { path: "/tours/xian-terracotta-warriors-5-day-private-tour/", title: "Prefer a longer Xi’an trip?", body: "See the existing five-day route for a broader city stay." },
    ],
    photoCredit: "Photo: Terracotta Army, Pit 1",
  },
  zh: {
    title: "西安兵马俑半日私人游",
    description: "从西安市区酒店出发，私人往返用车、英语私人导游与兵马俑门票预约安排。拟定约5–6小时，按日期、人数和酒店核价后确认整单报价。",
    draft: "本地产品草稿 · 价格与供应安排待确认 · 尚未开售",
    skip: "跳至行程内容", home: "首页", eyebrow: "西安 · 半日私人游",
    promise: "专心看一次兵马俑，其他时间留给自己的旅行。",
    heroAlt: "兵马俑一号坑中展出的陶俑与陶马", heroCaption: "兵马俑 · 不只看见，也听懂它的故事",
    primaryCta: "安排我的半日游", facts: [{ label: "酒店往返", value: "拟定约5–6小时" }, { label: "馆内参观", value: "约2.5–3小时" }, { label: "私人用车", value: "独立车辆与司机" }, { label: "现场讲解", value: "英语私人导游" }],
    priceTitle: "价格待核定",
    priceBody: "告诉我们出行日期、同行人数和酒店位置。核对供应后，确认整单总价及具体包含项，再由你决定是否预订。",
    routeTitle: "从酒店到兵马俑，再送回酒店。",
    routeBody: "把时间留给馆内参观和提问，往返由私人车辆衔接。拟定路线没有购物停留，额外景点提前商量。",
    stops: [
      { time: "01 · 酒店接客与去程", title: "从你的西安酒店出发", body: "在约定的市区酒店会合，乘私人车辆前往博物馆。去程暂按约一小时预留，实际取决于酒店位置和路况。接客时间、导游在酒店还是馆区会合，都在确认单中写清。" },
      { time: "02 · 馆内约2.5–3小时", title: "看陶俑，也听懂它的故事", body: "英语私人导游陪同参观当天开放的俑坑与展厅。可以边看边问秦军、发掘和人物细节，按现场开放情况、人流与同行需求调整顺序和节奏。" },
      { time: "03 · 私人车辆返程", title: "送回约定的酒店", body: "参观结束后乘私人车辆返回，余下时间由你自由安排。如果当天还有火车、航班或限时活动，选出发时间前告诉我们，以便核对返程需要的缓冲。" },
    ],
    timingNote: "5–6小时是规划估计，不保证固定返程时间。酒店位置、入馆时段、路况、安检与排队都可能影响时长。上午或下午出发需按开放时间和供应确认。",
    scopeTitle: "一次博物馆参观，把接送和讲解一起安排。",
    includedTitle: "拟定套餐包含",
    included: ["按约定酒店至博物馆往返的私人车辆与独立司机", "确认的馆内参观时段由英语私人导游讲解", "报价所列游客的博物馆门票与实名预约安排", "约定接送点，以及报价注明的车辆过路费与停车费"],
    excludedTitle: "基础行程不包含",
    excluded: ["酒店住宿、午餐、个人消费与自愿小费", "未另行约定的机场或火车站接送", "华清宫、丽山园导览及其他景点", "书面行程之外的额外车辆或导游服务时间"],
    bookingTitle: "先确认预约，再安排出发。",
    bookingBody: "博物院实行实名预约，入馆需携带预约所用护照或其他认可证件原件。我们核对入馆名额并确认安排，询价本身不等于预约成功。安检和入馆仍可能需要排队。",
    officialLink: "博物院预约与参观须知",
    faqTitle: "决定之前，你可能想问",
    faq: [
      { question: "半日游实际需要多久？", answer: "拟定从酒店出发到返回共约5–6小时，其中馆内约2.5–3小时。这是一段集中看兵马俑的行程，酒店位置与可预约时段会影响实际安排。" },
      { question: "会与其他人拼车或共用导游吗？", answer: "拟定服务只为你的同行小组安排车辆、独立司机和英语私人导游。博物馆公共空间仍有其他游客，导游档期及会合方式需按日期核实后确认。" },
      { question: "门票是否还包含丽山园？", answer: "包含。博物院标准门票覆盖兵马俑馆区与丽山园两处，但这条半日路线集中参观兵马俑，不包含第二处的导游陪同或额外用车时间。想增加丽山园请提前说明，我们另外核对时间与调整后的报价。" },
      { question: "我只想预约门票，可以吗？", answer: "可以。如果你愿意自行安排交通与参观，可使用已有的景点代预约服务。这条拟定产品适合同时需要私人接送和现场英语讲解的人。" },
      { question: "儿童或行动不便的游客能参加吗？", answer: "请提供儿童年龄和步行、无障碍需求。报价前需要核实票务资格、车辆座位和合适的馆内路线，不默认儿童优惠、儿童座椅或全程无台阶。" },
      { question: "改期、取消或约不到票怎么办？", answer: "付款前的书面报价会分别说明门票、导游和用车的退改条件。如果无法确认合适的入馆名额或服务供应，会先与你商量日期或路线。本草稿没有承诺固定退款规则或保证入馆。" },
    ],
    enquiryDetails: [{ title: "日期与出发偏好", body: "参观日期、上午／下午／均可，以及当天后续的固定安排。" }, { title: "成人与儿童", body: "成人数量、儿童年龄、行李以及无障碍需求。" }, { title: "酒店与返程地点", body: "准确的西安酒店名称或地址，接客与返程是否在同一处。" }],
    enquiryNote: "仅供预览：询价提交暂未开启。价格、接送范围与供应退改条款将在开售前定稿。",
    readTitle: "还在比较怎么参观？",
    readLinks: [{ path: "/guides/terracotta-warriors-without-tour/", title: "自己去兵马俑怎么安排", body: "先了解自主游，再决定是否需要私人导游和用车。" }, { path: "/services/china-attraction-reservations/?attraction=terracotta-warriors#reservation-enquiry", title: "只需要门票预约协助？", body: "已有代预约服务适合无需整段行程的客人。" }, { path: "/tours/xian-terracotta-warriors-5-day-private-tour/", title: "想在西安多待几天？", body: "查看现有西安五日路线，比较更完整的城市行程。" }],
    photoCredit: "图片：兵马俑一号坑",
  },
  ko: {
    title: "시안 병마용 반일 프라이빗 투어",
    description: "시안 호텔 왕복 전용 차량, 영어 개인 가이드와 병마용 입장 예약을 함께 계획합니다. 약 5–6시간의 초안이며 날짜·인원·호텔 확인 후 일행 전체 견적을 정합니다.",
    draft: "로컬 검토용 초안 · 가격 및 공급 조건 확인 전 · 판매 전",
    skip: "일정으로 건너뛰기", home: "홈", eyebrow: "시안 · 반일 프라이빗 투어",
    promise: "병마용에 집중하고, 남은 여행은 자유롭게.",
    heroAlt: "병마용 1호갱에 전시된 병사와 말 도용", heroCaption: "병마용 · 보고, 그 이야기를 이해하는 시간",
    primaryCta: "내 반일 일정 준비", facts: [{ label: "호텔 왕복", value: "약 5–6시간 계획" }, { label: "박물관 관람", value: "약 2.5–3시간" }, { label: "전용 차량", value: "별도 운전기사" }, { label: "현장 해설", value: "영어 개인 가이드" }],
    priceTitle: "가격 확인 예정",
    priceBody: "날짜, 인원과 호텔 위치를 알려 주세요. 공급을 확인한 뒤 일행 전체 금액과 포함 사항을 정리해 드립니다.", routeTitle: "호텔에서 병마용으로, 다시 호텔로.",
    routeBody: "관람과 질문에 집중하고 이동은 전용 차량으로 연결합니다. 쇼핑 일정은 계획하지 않으며 추가 관광지는 미리 협의합니다.",
    stops: [
      { time: "01 · 호텔 픽업과 이동", title: "시안 호텔에서 출발", body: "협의한 시내 호텔에서 만나 전용 차량으로 이동합니다. 편도 약 한 시간을 예상하지만 호텔 위치와 교통에 따라 달라집니다. 픽업 시각과 가이드가 호텔 또는 박물관에서 합류하는지는 서면으로 확인합니다." },
      { time: "02 · 관람 약 2.5–3시간", title: "도용을 보고, 이야기를 듣고", body: "영어 개인 가이드와 당일 개방된 갱과 전시 공간을 관람합니다. 군대와 발굴, 인물의 세부 표현에 대해 질문할 수 있습니다. 개방 상황, 혼잡도와 일행에 맞춰 순서와 속도를 조정합니다." },
      { time: "03 · 전용 차량 복귀", title: "협의한 호텔로 돌아가기", body: "관람 후 전용 차량으로 돌아갑니다. 이후 시간은 자유롭게 계획하세요. 당일 기차, 항공편 또는 예약 일정이 있으면 출발 시각을 정하기 전에 알려 주셔야 복귀 여유를 검토할 수 있습니다." },
    ],
    timingNote: "5–6시간은 계획상 예상이며 정해진 복귀 시각을 보장하지 않습니다. 호텔, 입장 시간대, 교통, 보안 검색과 대기에 따라 달라집니다. 오전 또는 오후 출발은 운영 시간과 예약 가능 여부 확인이 필요합니다.",
    scopeTitle: "박물관 방문에 필요한 이동과 해설을 함께.",
    includedTitle: "포함 예정 사항", included: ["협의한 호텔–박물관 왕복 전용 차량과 별도 운전기사", "확인된 박물관 관람 시간의 영어 개인 가이드", "견적에 명시된 방문객의 입장권과 실명 예약 준비", "협의한 승하차 장소 및 견적에 명시된 통행료·주차료"],
    excludedTitle: "기본 일정 외 사항", excluded: ["숙박, 점심, 개인 비용과 선택적 팁", "별도 협의하지 않은 공항·기차역 이동", "화청궁, 리산원 가이드 관람과 다른 관광지", "서면 일정 외 차량·가이드 추가 시간"],
    bookingTitle: "입장 예약을 확인하고 출발을 준비합니다.",
    bookingBody: "박물관은 실명 예약을 사용합니다. 예약에 사용한 여권 또는 허용된 신분증 원본을 지참하세요. 입장 가능 여부와 준비를 확인하며 문의만으로 예약되지는 않습니다. 보안 검색과 입장 대기는 있을 수 있습니다.", officialLink: "박물관 예약·관람 안내",
    faqTitle: "선택하기 전에",
    faq: [
      { question: "반일 투어는 실제로 얼마나 걸리나요?", answer: "왕복 이동을 포함해 약 5–6시간을 계획하며 박물관 관람은 약 2.5–3시간입니다. 여러 관광지를 잇는 하루 투어보다 병마용에 집중합니다. 호텔과 가능한 입장 시간대에 따라 실제 일정이 달라집니다." },
      { question: "다른 일행과 차량이나 가이드를 공유하나요?", answer: "일행만을 위한 전용 차량, 별도 운전기사와 영어 개인 가이드를 계획합니다. 박물관 공용 공간에는 다른 관람객도 있습니다. 날짜별 가이드 가능 여부와 합류 장소를 확인합니다." },
      { question: "입장권에 리산원도 포함되나요?", answer: "네. 박물관 일반 입장권은 병마용 구역과 리산원 두 곳을 포함합니다. 다만 이 반일 일정은 병마용에 집중하며 두 번째 구역의 가이드·차량 시간은 포함하지 않습니다. 추가하려면 필요한 시간과 변경 견적을 미리 확인해야 합니다." },
      { question: "입장 예약만 도와주실 수 있나요?", answer: "네. 교통과 관람을 직접 준비할 수 있다면 기존 관광지 예약 지원 서비스를 이용하세요. 이 상품 초안은 전용 이동과 현장 영어 해설도 필요한 분을 위한 것입니다." },
      { question: "어린이나 이동이 불편한 방문객도 가능한가요?", answer: "어린이 나이와 보행·접근성 요구를 알려 주세요. 티켓 자격, 차량 좌석과 적절한 관람 동선을 견적 전에 확인해야 합니다. 어린이 할인, 아동용 좌석이나 전 구간 무단차 접근을 가정하지 않습니다." },
      { question: "변경·취소 또는 입장 예약 불가 시 어떻게 되나요?", answer: "결제 전 서면 견적에 입장권, 가이드와 차량의 취소·변경 조건을 각각 안내합니다. 입장이나 서비스 가능 여부를 확인할 수 없으면 먼저 날짜 또는 일정을 협의합니다. 이 초안은 정해진 환불 규칙이나 입장을 보장하지 않습니다." },
    ],
    enquiryDetails: [{ title: "날짜와 출발 선호", body: "관람 날짜, 오전 / 오후 / 유연한 출발, 당일 후속 예약 일정." }, { title: "성인과 어린이", body: "성인 수, 어린이 나이, 짐과 접근성 요구." }, { title: "호텔과 복귀 장소", body: "정확한 시안 호텔명 또는 주소, 픽업과 복귀 장소가 같은지 여부." }],
    enquiryNote: "미리보기 전용: 문의 제출은 아직 열리지 않았습니다. 가격, 픽업 범위와 공급자 취소 조건은 판매 전에 확정합니다.",
    readTitle: "관람 방법을 비교 중인가요?",
    readLinks: [{ path: "/guides/terracotta-warriors-without-tour/", title: "병마용 자유 관람 안내", body: "직접 방문하는 방법을 보고 전용 차량·가이드 여부를 결정하세요." }, { path: "/services/china-attraction-reservations/?attraction=terracotta-warriors#reservation-enquiry", title: "예약 지원만 필요하신가요?", body: "투어 없이 예약만 필요한 분을 위한 기존 서비스입니다." }, { path: "/tours/xian-terracotta-warriors-5-day-private-tour/", title: "시안에 더 오래 머무른다면", body: "기존 5일 일정에서 더 넓은 도시 여행을 확인하세요." }],
    photoCredit: "사진: 병마용 1호갱",
  },
};

export function terracottaHalfDayReadHref(path: string, locale: HomegroundLocale) {
  return locale === "en" ? path : `/${locale}${path}`;
}
