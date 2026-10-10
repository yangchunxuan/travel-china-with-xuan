import type { HomegroundLocale } from "./homegroundI18n";
import type { PrivateGuideCity } from "./privateGuideServices";

export interface PrivateGuideServiceCopy {
  metadata: { title: string; description: string };
  h1: string;
  eyebrow: string;
  lede: string;
  services: string;
  breadcrumb: string;
  ask: string;
  facts: readonly string[];
  citiesTitle: string;
  citiesBody: string;
  standard: string;
  peak: string;
  unit: string;
  priceNote: string;
  cities: Record<PrivateGuideCity, { name: string; description: string }>;
  zhangjiajieRoutes: { note: string; action: string };
  scopeTitle: string;
  includedTitle: string;
  included: readonly string[];
  separateTitle: string;
  separate: readonly string[];
  scopeNote: string;
  faqTitle: string;
  faq: readonly { question: string; answer: string }[];
  enquiry: {
    title: string; body: string; city: string; chooseCity: string; date: string;
    undecided: string; travellers: string; route: string; placeholder: string;
    optional: string; whatsapp: string; email: string; privacy: string; draftNote: string;
    message: { opening: string; service: string; serviceValue: string; city: string; date: string;
      travellers: string; route: string; rate: string; rateNote: string; none: string; subject: string };
  };
}

const copies: Record<HomegroundLocale, PrivateGuideServiceCopy> = {
  en: {
    metadata: {
      title: "Private English-Speaking Guides in China | 8-Hour Day & Prices",
      description: "Hire a private English-speaking guide in Shanghai or Beijing from CNY 1,200, or Xi’an or Zhangjiajie from CNY 900 per guide per 8-hour day. Request a quote for your dates and group.",
    },
    h1: "Your day, with a local English-speaking guide.",
    eyebrow: "Private guide · Shanghai, Beijing, Xi’an & Zhangjiajie",
    lede: "Already arranged your hotels and transport? Add an English-speaking guide for the sightseeing days where you want local help. Tell us what you want to see and the pace that suits you.",
    services: "All services", breadcrumb: "Breadcrumb", ask: "Ask about your guide",
    facts: ["One guide, just for your party", "Up to 8 hours per day", "Group size confirmed with your quote"],
    citiesTitle: "Choose your city.",
    citiesBody: "These are guide-only reference rates, charged per guide, per day. We confirm the applicable rate, group size and route before you book.",
    standard: "Standard rate", peak: "Peak-season rate", unit: "per guide / up to 8 hours", priceNote: "Prices are in Chinese yuan (CNY). Send us your date to confirm which rate applies.",
    cities: {
      shanghai: { name: "Shanghai", description: "Explore the Bund, Yu Garden or the neighborhoods that interest you. Tell us your preferred stops so we can plan a day at your pace." },
      beijing: { name: "Beijing", description: "Plan a day in central Beijing or a Great Wall visit. Your starting point and chosen sights help us check the timing and any transport you need." },
      xian: { name: "Xi’an", description: "Visit the Terracotta Army or explore the historic city. Share the places you want to see so we can review the route and travel time." },
      zhangjiajie: { name: "Zhangjiajie", description: "Get help navigating Zhangjiajie National Forest Park or planning a Tianmen Mountain day. Tell us your starting point and preferred walking pace." },
    },
    zhangjiajieRoutes: {
      note: "Need hotels and a private vehicle as well? Guide-only days and complete tour packages are quoted separately.",
      action: "Compare Zhangjiajie private tours",
    },
    scopeTitle: "A guide for the day you have in mind.", includedTitle: "Guide service", separateTitle: "Confirmed separately",
    included: ["A private, licensed English-speaking guide for up to 8 hours", "A sightseeing route discussed around your interests and pace", "Local explanations and help navigating your chosen stops"],
    separate: ["Your transport, including a car and driver if needed", "Guest admission tickets and meals", "Longer days, special routes and group arrangements"],
    scopeNote: "Your written quote sets out the full inclusions and any additional costs before booking, including any guide-related expenses. A guide request does not reserve attraction admission.",
    faqTitle: "Before you enquire.",
    faq: [
      { question: "Are these prices per person?", answer: "No. They are per guide, per day of up to 8 hours. Tell us your group size so we can confirm suitable arrangements and the total quote." },
      { question: "Are your guides licensed?", answer: "Yes. Homeground guides hold a Chinese tour-guide licence (导游证)." },
      { question: "Can I book only a guide?", answer: "Yes. This service is for a separate English-speaking guide. You can keep your own hotel and transport arrangements, or ask us to quote transport separately." },
      { question: "What is included in the price?", answer: "The listed rate covers English-speaking guide service. Transport, guest tickets and meals are confirmed separately. Your written quote explains the full inclusions and any guide-related expenses before booking." },
      { question: "How are the eight hours scheduled?", answer: "We agree the meeting point, starting and finishing times, and break arrangements with your itinerary before booking." },
      { question: "When do peak-season prices apply?", answer: "Send us your travel date. We confirm the applicable rate and guide availability for that date before you book." },
      { question: "Can I request a longer day or a larger group?", answer: "Yes, you can enquire. Tell us the timing, group size and route you need; we check availability and quote any extra arrangements before booking." },
      { question: "What should I send to request a quote?", answer: "Your city, travel date, number of travelers and preferred sights. Your meeting location and preferred start time also help us review the day." },
    ],
    enquiry: {
      title: "Tell us about your day.", body: "Choose a city, add your date and group size, and tell us what you would like to see. We will check the arrangements and reply with a quote.",
      city: "City", chooseCity: "Choose a city", date: "Guide service date", undecided: "Date not decided yet", travellers: "Number of travelers", route: "Preferred sights and meeting location", placeholder: "For example: the Bund and Yu Garden, starting from our central Shanghai hotel…", optional: "Optional", whatsapp: "Ask on WhatsApp", email: "Prepare an email", privacy: "Privacy notice", draftNote: "These details prepare your message. Nothing is sent until you send it in WhatsApp or email; this is not a confirmed booking.",
      message: { opening: "Hi Homeground, I’d like a quote for a private English-speaking guide.", service: "Service", serviceValue: "One English-speaking guide, up to 8 hours", city: "City", date: "Service date", travellers: "Travelers", route: "Sights / meeting point / notes", rate: "Published standard reference", rateNote: "Please confirm the applicable rate, group arrangements and full inclusions for my date.", none: "To be confirmed", subject: "Private English-speaking guide enquiry" },
    },
  },
  zh: {
    metadata: { title: "中国单日私人英文导游｜上海、北京、西安、张家界价格", description: "上海、北京私人英文导游人民币1,200元起，西安、张家界900元起，按位导游每天最多8小时收费。告诉我们日期、人数和想去的景点，确认专属报价。" },
    h1: "按你的节奏，与英文导游一起游览。", eyebrow: "私人英文导游 · 上海、北京、西安、张家界",
    lede: "已经安排好酒店和交通？在需要本地协助的游览日，单独配一位英文导游。告诉我们想去哪里、希望走得快还是慢，我们一起安排这一天。",
    services: "服务总览", breadcrumb: "当前位置", ask: "咨询英文导游",
    facts: ["一位导游，只服务你们一行人", "每天最多8小时", "人数和安排在报价时确认"],
    citiesTitle: "选择你的城市。", citiesBody: "以下为单独英文导游的参考价，按位导游每天收费。适用价格、人数及路线会在预订前确认。",
    standard: "常规参考价", peak: "旺季参考价", unit: "每位导游／每天最多8小时", priceNote: "价格以人民币（CNY）计。告诉我们出行日期，我们为你确认适用价格。",
    cities: {
      shanghai: { name: "上海", description: "游览外滩、豫园，或走走你感兴趣的街区。告诉我们想去的地方，按你的节奏安排一天。" },
      beijing: { name: "北京", description: "安排北京市区游览，或去长城。根据你的出发地点和想去的景点，核实一天的时间和交通安排。" },
      xian: { name: "西安", description: "参观兵马俑，或探索古城里的历史景点。告诉我们你的选择，我们一起核对路线及路途时间。" },
      zhangjiajie: { name: "张家界", description: "游览张家界国家森林公园，或安排天门山一天。告诉我们你的出发地点、想去的区域和能接受的步行强度。" },
    },
    zhangjiajieRoutes: {
      note: "还需要住宿与专车一起安排？单日导游服务与完整旅游套餐分别报价。",
      action: "比较张家界私家路线",
    },
    scopeTitle: "为你想游览的这一天，安排导游。", includedTitle: "导游服务", separateTitle: "另外确认的安排",
    included: ["一位持证的私人英文导游，每天最多8小时", "根据兴趣和节奏一起商定游览路线", "景点讲解及游览路线上的本地协助"],
    separate: ["交通；需要的话可另报专车及司机", "客人的景区门票和餐食", "超过8小时、特殊路线及具体人数安排"],
    scopeNote: "预订前的书面报价会列明包含项及额外费用，包括可能产生的导游相关费用。咨询导游服务不代表已预约景区入场。",
    faqTitle: "咨询前，你可能想了解。",
    faq: [
      { question: "这些价格是按每位游客收费吗？", answer: "不是。按每位导游每天最多8小时收费。告诉我们同行人数，我们会确认合适的安排及总报价。" },
      { question: "你们的导游持证吗？", answer: "持证。Homeground 的导游持有中国导游证。" },
      { question: "可以只订导游吗？", answer: "可以。这是单独的英文导游服务。你可以保留自己安排的酒店和交通，也可以让我们另报交通费用。" },
      { question: "价格包含哪些内容？", answer: "标价为英文导游服务费。交通、客人的门票及餐食另行确认。预订前的书面报价会说明完整包含项及可能产生的导游相关费用。" },
      { question: "8小时如何安排？", answer: "预订前根据路线商定见面地点、开始及结束时间，以及休息安排。" },
      { question: "什么时候适用旺季价格？", answer: "请告诉我们出行日期，我们会在预订前确认当天适用的价格及导游档期。" },
      { question: "超过8小时或人数较多可以安排吗？", answer: "可以咨询。告诉我们需要的时间、人数和路线，我们核实能否安排，并在预订前报价。" },
      { question: "询价需要提供什么？", answer: "城市、日期、同行人数和想去的景点。见面地点及希望几点开始，也有助于我们安排这一天。" },
    ],
    enquiry: { title: "告诉我们，你想怎么游览。", body: "选择城市，填写日期和人数，再告诉我们想去哪里。我们核实安排后回复报价。", city: "城市", chooseCity: "选择城市", date: "导游服务日期", undecided: "日期还没确定", travellers: "同行人数", route: "想去的景点和见面地点", placeholder: "例如：外滩和豫园，从我们在上海市区的酒店出发……", optional: "选填", whatsapp: "通过 WhatsApp 咨询", email: "准备询价邮件", privacy: "隐私说明", draftNote: "填写内容只用于准备消息，需要你在 WhatsApp 或邮箱中自行发送；这不是已确认的预订。", message: { opening: "你好 Homeground，我想咨询私人英文导游报价。", service: "服务", serviceValue: "一位英文导游，每天最多8小时", city: "城市", date: "服务日期", travellers: "同行人数", route: "景点／见面地点／补充说明", rate: "公开常规参考价", rateNote: "请根据我的日期确认适用价格、人数安排和完整包含项。", none: "待确认", subject: "私人英文导游询价" } },
  },
  ko: {
    metadata: { title: "중국 프라이빗 한국어 가이드｜8시간 이용 및 요금", description: "상하이·베이징 한국어 가이드 CNY 1,200부터, 시안·장가계 CNY 900부터. 가이드 1명당 하루 최대 8시간 요금이며 날짜와 인원에 맞춰 견적을 확인합니다." },
    h1: "나의 속도로, 현지 한국어 가이드와 함께.", eyebrow: "프라이빗 한국어 가이드 · 상하이·베이징·시안·장가계",
    lede: "숙소와 교통은 이미 준비하셨나요? 현지 도움이 필요한 관광일에 한국어 가이드를 따로 예약할 수 있습니다. 가고 싶은 곳과 원하는 여행 속도를 알려 주세요.",
    services: "전체 서비스", breadcrumb: "현재 위치", ask: "한국어 가이드 문의",
    facts: ["우리 일행만을 위한 가이드 1명", "하루 최대 8시간", "인원과 진행 방식은 견적 시 확인"],
    citiesTitle: "도시를 선택하세요.", citiesBody: "한국어 가이드만 제공하는 서비스의 참고 요금이며 가이드 1명당 하루 기준입니다. 적용 요금, 인원과 동선은 예약 전에 확인합니다.",
    standard: "일반 참고 요금", peak: "성수기 참고 요금", unit: "가이드 1명 / 하루 최대 8시간", priceNote: "요금은 중국 위안(CNY) 기준입니다. 여행 날짜를 알려주시면 적용 요금을 확인해 드립니다.",
    cities: {
      shanghai: { name: "상하이", description: "와이탄, 예원 또는 관심 있는 동네를 둘러보세요. 원하는 장소를 알려주시면 여행 속도에 맞춰 하루 동선을 상의합니다." },
      beijing: { name: "베이징", description: "베이징 시내나 만리장성 방문을 계획해 보세요. 출발 장소와 희망 관광지를 바탕으로 소요 시간과 필요한 교통을 확인합니다." },
      xian: { name: "시안", description: "병마용을 방문하거나 역사적인 시내를 둘러보세요. 원하는 장소를 알려주시면 동선과 이동 시간을 확인합니다." },
      zhangjiajie: { name: "장가계", description: "장가계 국가삼림공원 이동을 돕거나 천문산 하루 일정을 상의합니다. 출발 장소, 방문 구역과 원하는 도보 강도를 알려 주세요." },
    },
    zhangjiajieRoutes: {
      note: "숙소와 전용 차량도 함께 필요하신가요? 하루 가이드 서비스와 전체 투어 패키지는 따로 견적을 안내합니다.",
      action: "장가계 프라이빗 투어 비교하기",
    },
    scopeTitle: "원하는 관광일에 필요한 가이드를.", includedTitle: "가이드 서비스", separateTitle: "별도 확인 사항",
    included: ["하루 최대 8시간의 자격증 보유 프라이빗 한국어 가이드 1명", "관심사와 여행 속도에 맞춰 상의한 관광 동선", "현지 설명과 방문 장소 이동에 필요한 도움"],
    separate: ["교통편; 필요하면 전용 차량과 기사 별도 견적", "여행자의 입장권과 식사", "8시간 초과, 특별 동선과 인원별 진행 방식"],
    scopeNote: "예약 전 서면 견적에 포함 사항과 가이드 관련 비용을 포함한 추가 비용을 안내합니다. 가이드 문의만으로 관광지 입장이 예약되는 것은 아닙니다.",
    faqTitle: "문의 전에 알아두세요.",
    faq: [
      { question: "요금은 여행자 1인 기준인가요?", answer: "아니요. 가이드 1명당 하루 최대 8시간 기준입니다. 여행 인원을 알려주시면 진행 방식과 전체 견적을 확인해 드립니다." },
      { question: "가이드는 자격증을 보유하고 있나요?", answer: "네. Homeground 가이드는 중국 관광 가이드 자격증(导游证)을 보유하고 있습니다." },
      { question: "가이드만 예약할 수 있나요?", answer: "네. 한국어 가이드를 따로 제공하는 서비스입니다. 숙소와 교통은 직접 준비한 것을 이용하거나 교통을 별도로 견적 요청할 수 있습니다." },
      { question: "요금에는 무엇이 포함되나요?", answer: "표시 요금은 한국어 가이드 서비스 비용입니다. 교통, 여행자 입장권과 식사는 별도 확인하며 가이드 관련 비용을 포함한 전체 내용은 예약 전 서면 견적으로 안내합니다." },
      { question: "8시간은 어떻게 진행되나요?", answer: "예약 전에 동선에 맞춰 만나는 장소, 시작·종료 시간과 휴식 시간을 상의합니다." },
      { question: "성수기 요금은 언제 적용되나요?", answer: "여행 날짜를 알려 주세요. 예약 전에 해당 날짜의 적용 요금과 가이드 가능 여부를 확인합니다." },
      { question: "8시간 이상이나 많은 인원도 가능한가요?", answer: "문의할 수 있습니다. 필요한 시간, 인원과 동선을 알려주시면 가능 여부를 확인하고 예약 전에 추가 준비를 견적에 반영합니다." },
      { question: "견적 문의에 무엇을 보내야 하나요?", answer: "도시, 여행 날짜, 인원과 원하는 관광지를 보내 주세요. 만나는 장소와 희망 시작 시간도 알려주시면 도움이 됩니다." },
    ],
    enquiry: { title: "관광일 계획을 알려 주세요.", body: "도시, 날짜와 인원을 선택하고 가고 싶은 곳을 알려 주세요. 준비 사항을 확인한 뒤 견적을 안내합니다.", city: "도시", chooseCity: "도시 선택", date: "가이드 이용 날짜", undecided: "날짜는 아직 미정이에요", travellers: "여행 인원", route: "희망 관광지와 만나는 장소", placeholder: "예: 와이탄과 예원, 상하이 시내 호텔에서 출발…", optional: "선택", whatsapp: "WhatsApp으로 문의", email: "문의 이메일 준비", privacy: "개인정보 안내", draftNote: "입력 내용은 메시지 초안에만 사용됩니다. WhatsApp이나 이메일에서 직접 전송해야 하며 예약 확정이 아닙니다.", message: { opening: "안녕하세요 Homeground. 프라이빗 한국어 가이드 견적을 문의합니다.", service: "서비스", serviceValue: "한국어 가이드 1명, 하루 최대 8시간", city: "도시", date: "이용 날짜", travellers: "여행 인원", route: "관광지 / 만나는 장소 / 추가 사항", rate: "공개된 일반 참고 요금", rateNote: "제 날짜에 적용되는 요금, 인원별 준비와 전체 포함 사항을 확인해 주세요.", none: "확인 예정", subject: "프라이빗 한국어 가이드 견적 문의" } },
  },
};

export function getPrivateGuideServiceCopy(locale: HomegroundLocale) { return copies[locale]; }
