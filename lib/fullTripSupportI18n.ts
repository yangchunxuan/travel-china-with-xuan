import type { HomegroundLocale } from "./homegroundI18n";
import type { FullTripSupportNeed } from "./fullTripSupport";

/**
 * Copy for /services/full-trip-support/. Every claim comes from
 * docs/paid-service-pathways-spec.md and lib/homegroundLegalI18n.ts: the
 * first brief is free and creates no booking, a human planner clarifies the
 * route first, the written proposal names services, responsible provider,
 * contracting party, scope, price and payment recipient, nothing is paid
 * before written confirmation, and the website takes no payment. No price,
 * no response time and no train tickets are promised.
 */
export interface FullTripSupportCopy {
  metadata: { title: string; description: string };
  breadcrumb: string;
  home: string;
  services: string;
  /** The service's name (breadcrumb, Service schema). */
  name: string;
  /** Above the headline: the kind of service, not its name again. */
  eyebrow: string;
  h1: string;
  /** The headline in two lines, broken between phrases (never inside one). */
  h1Lines: readonly [string, string];
  lede: string;
  heroFacts: readonly { label: string; value: string }[];
  ask: string;
  howLink: string;
  /** The hero panel: what we can take on. */
  handlesTitle: string;
  needs: Record<FullTripSupportNeed, { title: string; body: string }>;
  pickTitle: string;
  pickBody: string;
  /** In the panel: jumps to "Which service fits?" for visitors after one service. */
  compareLink: string;
  stepsTitle: string;
  steps: readonly { title: string; body: string }[];
  writtenTitle: string;
  /** The written-section heading in two lines, broken after the comma. */
  writtenTitleLines: readonly [string, string];
  writtenBody: string;
  written: readonly string[];
  noOnlinePayment: string;
  compareTitle: string;
  compare: {
    tours: { title: string; body: string; action: string };
    single: { title: string; body: string; tickets: string; guides: string };
    full: { title: string; body: string; badge: string; action: string };
  };
  faqTitle: string;
  faq: readonly { question: string; answer: string }[];
  enquiry: {
    eyebrow: string;
    title: string;
    body: string;
    cities: string;
    citiesPlaceholder: string;
    from: string;
    to: string;
    undecided: string;
    travellers: string;
    needsLegend: string;
    needsHint: string;
    note: string;
    optional: string;
    notePlaceholder: string;
    noteHint: string;
    send: string;
    whatsapp: string;
    email: string;
    kakaoAction?: string;
    draftNote: string;
    planner: string;
    privacy: string;
    message: {
      opening: string;
      service: string;
      serviceValue: string;
      cities: string;
      dates: string;
      datesOpen: string;
      travellers: string;
      needs: string;
      note: string;
      none: string;
      listSeparator: string;
      subject: string;
      /** Between a label and its value: ": " or the Chinese full-width "：". */
      labelSeparator: string;
    };
  };
}

const copy: Record<HomegroundLocale, FullTripSupportCopy> = {
  en: {
    metadata: {
      title: "China Full Trip Planning & Ground Support",
      description: "Plan the whole China trip with Homeground: a free first brief, a planner who clarifies route and travellers, and a written scope, price and payment recipient before you pay.",
    },
    breadcrumb: "Breadcrumb",
    home: "Home",
    services: "Services",
    name: "Full Trip Planning & Ground Support",
    eyebrow: "Custom-quoted service",
    h1: "Plan the whole China trip with us",
    h1Lines: ["Plan the whole", "China trip with us"],
    lede: "Tell us where, who and what matters. A Homeground planner works through the route, hotels, reservations, guides and transfers with you, and every provider and price is written down before you pay.",
    heroFacts: [
      { label: "Price", value: "Quoted for your trip" },
      { label: "Payment", value: "Only after written confirmation" },
      { label: "First step", value: "Your trip brief is free" },
    ],
    ask: "Tell us about your trip",
    howLink: "How it works",
    handlesTitle: "What we can take on",
    needs: {
      route: { title: "Route planning", body: "City order, nights in each place and a realistic pace" },
      hotels: { title: "Hotels", body: "Places to stay chosen and booked to fit the route" },
      tickets: { title: "Attraction reservations", body: "Real-name, timed entry booked in your own passport name" },
      guides: { title: "Private English-speaking guides", body: "A guide on the days you want one" },
      transfers: { title: "Car and transfers", body: "Airport and station pick-ups and private car days" },
      ground: { title: "On-the-ground coordination", body: "The providers in your proposal, coordinated while you are in China" },
    },
    pickTitle: "Choose only the parts you need.",
    compareLink: "Only need tickets or a guide? Compare services",
    pickBody: "You do not have to hand over everything. Pick what you want help with and do the rest yourself; the proposal says what we are responsible for and what is outside the scope.",
    stepsTitle: "How it works",
    steps: [
      { title: "Send your trip brief", body: "Dates, who is travelling, where you want to go and the help you want. It creates no booking." },
      { title: "A planner works it through", body: "A real planner first clarifies the route, travellers, priorities and the support you need, then suggests a workable next step." },
      { title: "Written proposal and quote", body: "Everything is named before you pay (see below)." },
      { title: "Arrangements start after payment", body: "Bookings and arrangements start only after you confirm the proposal and pay." },
    ],
    writtenTitle: "Before you pay, everything is in writing",
    writtenTitleLines: ["Before you pay,", "everything is in writing"],
    writtenBody: "Every proposal confirms these points in writing before any payment.",
    written: [
      "The services included",
      "The responsible provider for each",
      "The contracting party",
      "Scope and exclusions",
      "Total price and currency",
      "Payment recipient and method",
      "Cancellation and refund terms",
    ],
    noOnlinePayment: "This website has no online checkout. Never send card or bank details in a message or form.",
    compareTitle: "Which service fits?",
    compare: {
      tours: { title: "Private tours", body: "A route we have already designed, with public starting prices and a clear day-by-day plan.", action: "See private tours" },
      single: { title: "Single services", body: "You only need attraction reservations or an English-speaking guide for a day.", tickets: "Attraction reservations", guides: "Private English-speaking guides" },
      full: { title: "Full Trip Planning & Ground Support", body: "Your dates and your route, with the services you choose, quoted for your trip.", badge: "This page", action: "Send your trip brief" },
    },
    faqTitle: "Questions about full-trip support",
    faq: [
      { question: "How is full-trip support priced?", answer: "It is quoted for your trip. Once a planner understands the route and the support you need, the written proposal states the total price, currency and payment recipient, and you pay only after confirming it." },
      { question: "Does sending a trip brief cost anything?", answer: "No. Sending a brief and the planner's first reply are free and create no booking." },
      { question: "Can I pay on the website?", answer: "No. The website has no online checkout. Please do not put card or bank details in a form or message." },
      { question: "Can I hand over only some parts?", answer: "Yes. Choose the parts you need; the proposal says what we are responsible for and what is outside the scope. If you only need attraction reservations or an English-speaking guide for a day, the single services may suit you better." },
      { question: "Who is responsible for the arrangements?", answer: "Homeground is operated by {operator}. The proposal names the responsible provider and the contracting party for each arrangement." },
    ],
    enquiry: {
      eyebrow: "Trip brief",
      title: "Tell us about your trip",
      body: "Your answers are written into one WhatsApp or email draft that you send yourself.",
      cities: "Where do you want to go?",
      citiesPlaceholder: "For example: Beijing, Xi'an, Shanghai",
      from: "Start date",
      to: "End date",
      undecided: "Dates not decided yet",
      travellers: "Travellers",
      needsLegend: "What should we take on?",
      needsHint: "Choose as many as you like.",
      note: "Anything else we should know?",
      optional: "Optional",
      notePlaceholder: "Older parents or children travelling, pace, a rough budget…",
      noteHint: "Do not enter passport numbers or payment details here.",
      send: "Send the brief",
      whatsapp: "Send on WhatsApp",
      email: "Send by email",
      draftNote: "The buttons only open WhatsApp or email with your answers filled in; nothing is sent until you send it there.",
      planner: "Or use the trip planner form",
      privacy: "How we handle your details",
      message: {
        opening: "Hi, I'd like Homeground's full-trip planning and ground support.",
        service: "Service",
        serviceValue: "Full Trip Planning & Ground Support",
        cities: "Places",
        dates: "Dates",
        datesOpen: "not decided yet",
        travellers: "Travellers",
        needs: "Help wanted",
        note: "Note",
        none: "not given yet",
        listSeparator: ", ",
        subject: "Full-trip support request",
        labelSeparator: ": ",
      },
    },
  },
  zh: {
    metadata: {
      title: "中国全程规划与落地支持：路线、酒店、景点预约、导游与接送",
      description: "和 Homeground 一起规划整趟中国旅行：免费提交行程需求，规划师先梳理路线与同行者，服务、负责方、价格和收款方书面写清后再付款。",
    },
    breadcrumb: "面包屑导航",
    home: "首页",
    services: "服务",
    name: "全程规划与落地支持",
    eyebrow: "单独报价服务",
    h1: "整趟中国旅行，和我们一起规划",
    h1Lines: ["整趟中国旅行，", "和我们一起规划"],
    lede: "告诉我们想去哪、和谁去、在意什么。路线、酒店、景点预约、导游和接送，Homeground 规划师会和你一起梳理；谁负责、多少钱、付给谁，都会在你付款前写清楚。",
    heroFacts: [
      { label: "费用", value: "按你的行程单独报价" },
      { label: "付款", value: "书面确认后再付" },
      { label: "第一步", value: "提交行程需求免费" },
    ],
    ask: "说说你的行程",
    howLink: "了解流程",
    handlesTitle: "我们能帮你安排的",
    needs: {
      route: { title: "路线规划", body: "城市顺序、各住几晚、节奏是否合理" },
      hotels: { title: "酒店", body: "按路线挑选并预订住处" },
      tickets: { title: "景点代预约", body: "实名分时景点，用你本人护照预约" },
      guides: { title: "私人英文导游", body: "只在你需要的日子安排" },
      transfers: { title: "包车与接送", body: "机场、车站接送和包车出行" },
      ground: { title: "落地协调", body: "你在中国期间，协调方案里的各项安排" },
    },
    pickTitle: "需要哪部分，就交哪部分。",
    compareLink: "只要门票或导游？比较各项服务",
    pickBody: "其余的你自己安排；方案里会写清哪些由我们负责、哪些不在范围内。",
    stepsTitle: "服务流程",
    steps: [
      { title: "免费提交行程需求", body: "日期、同行者、想去的地方和需要的帮助。不会产生任何预订。" },
      { title: "规划师先梳理", body: "规划师亲自确认路线、同行者、旅行重点和你需要的支持，再给出可行的下一步。" },
      { title: "书面方案与报价", body: "付款前，所有内容都会写明（见下方）。" },
      { title: "付款后才开始安排", body: "你确认方案并付款后，才开始预订和安排。" },
    ],
    writtenTitle: "付款前，先把一切写清楚",
    writtenTitleLines: ["付款前，", "先把一切写清楚"],
    writtenBody: "每份方案在你付款前都会书面写明这些内容。",
    written: [
      "服务内容",
      "每项的负责方",
      "签约方",
      "服务范围与不含项目",
      "总价与币种",
      "收款方与付款方式",
      "取消与退款规则",
    ],
    noOnlinePayment: "本网站不提供在线付款。请不要在消息或表单里发送银行卡或账户信息。",
    compareTitle: "该选哪一种？",
    compare: {
      tours: { title: "私家团", body: "我们已经设计好的路线，公开起价，每天怎么走写得清楚。", action: "查看私家团" },
      single: { title: "单项服务", body: "只需要景点代预约，或一天的英文导游。", tickets: "景点代预约", guides: "私人英文导游" },
      full: { title: "全程规划与落地支持", body: "你的日期、你的路线，按需组合服务，单独报价。", badge: "本页", action: "说说你的行程" },
    },
    faqTitle: "关于全程支持的问题",
    faq: [
      { question: "全程支持怎么收费？", answer: "按你的行程单独报价。规划师弄清路线和需要的支持后，会在书面方案里写明总价、币种和收款方，你确认后才付款。" },
      { question: "提交行程需求要付费吗？", answer: "不用。提交需求和规划师的初步回复都不收费，也不会产生预订。" },
      { question: "可以在网站上直接付款吗？", answer: "不可以。本网站不提供在线付款，请不要在表单或消息里填写银行卡或账户信息。" },
      { question: "可以只要其中几项吗？", answer: "可以。选你需要的部分即可，方案会写清哪些由我们负责、哪些不在范围内。如果只需要景点代预约或一天的英文导游，单项服务可能更合适。" },
      { question: "由谁负责这些安排？", answer: "Homeground 由{operator}运营。每项安排的负责方和签约方都会写在书面方案里。" },
    ],
    enquiry: {
      eyebrow: "行程需求",
      title: "说说你的行程",
      body: "你的回答会整理成一条 WhatsApp 或邮件草稿，由你自己确认发出。",
      cities: "想去哪些地方？",
      citiesPlaceholder: "例如：北京、西安、上海",
      from: "出发日期",
      to: "返程日期",
      undecided: "日期未定",
      travellers: "人数",
      needsLegend: "需要我们帮忙安排哪些？",
      needsHint: "可多选。",
      note: "还有什么想告诉我们？",
      optional: "选填",
      notePlaceholder: "老人或孩子同行、节奏、大概预算……",
      noteHint: "请不要在这里填写护照号码或付款信息。",
      send: "发送需求",
      whatsapp: "通过 WhatsApp 发送",
      email: "通过邮件发送",
      draftNote: "点按钮只会打开 WhatsApp 或邮件并填好内容，你确认后才会发出。",
      planner: "也可以用行程规划表提交",
      privacy: "我们如何处理你的信息",
      message: {
        opening: "你好，我想咨询全程规划与落地支持。",
        service: "服务",
        serviceValue: "全程规划与落地支持",
        cities: "想去的地方",
        dates: "日期",
        datesOpen: "未定",
        travellers: "人数",
        needs: "需要协助",
        note: "备注",
        none: "尚未填写",
        listSeparator: "、",
        subject: "全程规划与落地支持需求",
        labelSeparator: "：",
      },
    },
  },
  ko: {
    metadata: {
      title: "중국 전체 여행 설계 및 현지 지원: 동선, 숙소, 관광지 예약, 가이드, 이동",
      description: "중국 여행 전체를 Homeground 플래너와 함께 설계하세요. 여행 요청은 무료이고, 플래너가 먼저 동선과 일행을 정리하며, 서비스·책임 업체·가격·결제 수취인을 서면으로 확인한 뒤 결제합니다.",
    },
    breadcrumb: "이동 경로",
    home: "홈",
    services: "서비스",
    name: "전체 여행 설계 및 현지 지원",
    eyebrow: "맞춤 견적 서비스",
    h1: "중국 여행 전체를 함께 설계합니다",
    h1Lines: ["중국 여행 전체를", "함께 설계합니다"],
    lede: "가고 싶은 곳, 함께 가는 사람, 중요한 것을 알려 주세요. 동선, 숙소, 관광지 예약, 가이드와 이동을 Homeground 플래너가 함께 정리합니다. 누가 책임지는지, 얼마인지, 누구에게 내는지는 결제 전에 서면으로 확인해 드립니다.",
    heroFacts: [
      { label: "요금", value: "여행별 맞춤 견적" },
      { label: "결제", value: "서면 확인 후에만" },
      { label: "첫 단계", value: "여행 요청은 무료" },
    ],
    ask: "여행 요청 보내기",
    howLink: "진행 방식 보기",
    handlesTitle: "저희가 맡을 수 있는 일",
    needs: {
      route: { title: "동선 설계", body: "도시 순서, 도시별 숙박 일수, 무리 없는 일정" },
      hotels: { title: "숙소", body: "동선에 맞춰 숙소를 고르고 예약" },
      tickets: { title: "관광지 예약 대행", body: "실명·시간 지정 관광지를 본인 여권으로 예약" },
      guides: { title: "프라이빗 영어 가이드", body: "원하는 날에만 배정" },
      transfers: { title: "차량과 픽업", body: "공항·역 픽업과 전용 차량 이동" },
      ground: { title: "현지 일정 조율", body: "중국에 계시는 동안 제안서에 담긴 각 서비스를 조율" },
    },
    pickTitle: "필요한 부분만 맡기세요.",
    compareLink: "입장권이나 가이드만 필요하세요? 서비스 비교하기",
    pickBody: "전부 맡기지 않아도 됩니다. 도움이 필요한 부분만 고르고 나머지는 직접 준비하셔도 됩니다. 제안서에 저희가 책임지는 부분과 범위 밖인 부분을 적어 드립니다.",
    stepsTitle: "진행 방식",
    steps: [
      { title: "여행 요청 보내기", body: "날짜, 일행, 가고 싶은 곳과 필요한 도움을 알려 주세요. 무료이며, 보내셔도 예약은 진행되지 않습니다." },
      { title: "플래너가 먼저 정리", body: "담당 플래너가 직접 동선, 일행, 우선순위와 필요한 지원을 확인하고 가능한 다음 단계를 제안합니다." },
      { title: "서면 제안과 견적", body: "결제 전에 모든 내용을 서면으로 적어 드립니다(아래 참고)." },
      { title: "결제 후 준비 시작", body: "제안을 확인하고 결제하신 뒤에만 예약과 준비를 시작합니다." },
    ],
    writtenTitle: "결제 전에 모두 서면으로",
    writtenTitleLines: ["결제 전에", "모두 서면으로"],
    writtenBody: "모든 제안서에는 결제 전에 다음 내용이 서면으로 담깁니다.",
    written: [
      "서비스 내용",
      "항목별 책임 업체",
      "계약 당사자",
      "서비스 범위와 제외 항목",
      "총액과 통화",
      "결제 수취인과 결제 방법",
      "취소와 환불 조건",
    ],
    noOnlinePayment: "현재 웹사이트에는 온라인 결제가 없습니다. 메시지나 양식에 카드나 계좌 정보를 보내지 마세요.",
    compareTitle: "어떤 서비스가 맞을까요?",
    compare: {
      tours: { title: "프라이빗 투어", body: "이미 설계된 일정으로, 공개 시작가와 일자별 계획이 정리되어 있습니다.", action: "프라이빗 투어 보기" },
      single: { title: "개별 서비스", body: "관광지 예약 대행이나 하루 영어 가이드만 필요할 때 이용하세요.", tickets: "관광지 예약 대행", guides: "프라이빗 영어 가이드" },
      full: { title: "전체 여행 설계 및 현지 지원", body: "내 날짜와 동선에 필요한 서비스만 골라 맞춤 견적을 받습니다.", badge: "현재 페이지", action: "여행 요청 보내기" },
    },
    faqTitle: "전체 여행 지원, 자주 묻는 질문",
    faq: [
      { question: "전체 여행 지원 요금은 어떻게 정해지나요?", answer: "여행별로 견적을 드립니다. 플래너가 동선과 필요한 지원을 파악한 뒤 서면 제안서에 총액, 통화, 결제 수취인을 적고, 확인하신 후에만 결제합니다." },
      { question: "여행 요청을 보내는 데 비용이 드나요?", answer: "아니요. 요청과 플래너의 첫 답변은 무료이며, 보내셔도 예약은 진행되지 않습니다." },
      { question: "웹사이트에서 바로 결제할 수 있나요?", answer: "아니요. 현재 웹사이트에는 온라인 결제가 없습니다. 양식이나 메시지에 카드나 계좌 정보를 적지 마세요." },
      { question: "일부만 맡길 수도 있나요?", answer: "네. 필요한 부분만 고르시면 됩니다. 제안서에 저희가 책임지는 부분과 범위 밖인 부분을 적어 드립니다. 관광지 예약 대행이나 하루 영어 가이드만 필요하다면 개별 서비스가 더 맞을 수 있습니다." },
      { question: "각 서비스는 누가 책임지나요?", answer: "Homeground는 {operator}가 운영합니다. 각 서비스의 책임 업체와 계약 당사자는 서면 제안서에 적어 드립니다." },
    ],
    enquiry: {
      eyebrow: "여행 요청",
      title: "어떤 여행인지 알려 주세요",
      body: "답변은 카카오톡, WhatsApp 또는 이메일 메시지 초안으로 정리되며, 직접 보내셔야 전송됩니다.",
      cities: "어디에 가고 싶으세요?",
      citiesPlaceholder: "예: 베이징, 시안, 상하이",
      from: "출발일",
      to: "귀국일",
      undecided: "날짜 미정",
      travellers: "인원",
      needsLegend: "어떤 부분을 맡기시겠어요?",
      needsHint: "여러 개 선택할 수 있습니다.",
      note: "더 알려 주실 내용이 있나요?",
      optional: "선택 사항",
      notePlaceholder: "부모님이나 아이 동반, 여행 속도, 대략적인 예산…",
      noteHint: "여권 번호나 결제 정보는 여기에 적지 마세요.",
      send: "요청 보내기",
      whatsapp: "WhatsApp으로 보내기",
      email: "이메일로 보내기",
      kakaoAction: "카카오톡으로 보내기",
      draftNote: "버튼을 누르면 내용이 채워진 카카오톡, WhatsApp 또는 이메일만 열립니다. 직접 보내기 전에는 전송되지 않습니다.",
      planner: "여행 설계 양식으로 보내기",
      privacy: "개인정보 처리 방식",
      message: {
        opening: "안녕하세요. Homeground에 전체 여행 설계 및 현지 지원을 요청하고 싶습니다.",
        service: "서비스",
        serviceValue: "전체 여행 설계 및 현지 지원",
        cities: "여행지",
        dates: "날짜",
        datesOpen: "미정",
        travellers: "인원",
        needs: "필요한 지원",
        note: "메모",
        none: "아직 입력하지 않음",
        listSeparator: ", ",
        subject: "전체 여행 지원 요청",
        labelSeparator: ": ",
      },
    },
  },
};

export function getFullTripSupportCopy(locale: HomegroundLocale) {
  return copy[locale];
}

/** Fills {operator} with the registered operator's public name. */
export function fillFullTripSupportCopy(text: string, operator: string) {
  return text.replace("{operator}", operator);
}
