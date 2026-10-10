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
 *
 * The page speaks the mobile menu's language: large serif words on white,
 * hairlines, small grey notes. The brief under the headline is one sentence
 * with blanks (who, how long, what budget in any currency, leaving when, to
 * which cities, and anything else the traveller wants us to hear), sent
 * from a line with an arrow. Every blank may stay empty. This is full-trip planning, so nothing asks
 * which parts to hand over: the whole trip is ours to arrange. The page is
 * an entry, not a filter: it never weighs a budget against a published
 * tour price and names no minimum.
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
  /** The headline's lines, broken between phrases (never inside one). */
  h1Lines: readonly string[];
  lede: string;
  /** The brief under the headline: one sentence whose blanks the traveller types into. */
  brief: {
    /** Names the form for assistive technology. */
    title: string;
    /**
     * The sentence, a clause per line on a phone. Tokens: {travellers}, {days},
     * {basis}, {currency}, {amount}, {month}, {cities}, {note}. `lengthOne` is
     * the clause for exactly one day. The last two clauses end in a blank that
     * takes the rest of the line and grows with what is written.
     */
    clauses: { party: string; length: string; lengthOne?: string; budget: string; month: string; cities: string; note: string };
    /** True where the sentence supplies the word for month ("月", "월"), so a number is typed. */
    monthIsNumber: boolean;
    /** Accessible names of the blanks (the sentence around them is not a label). */
    travellersLabel: string;
    daysLabel: string;
    amountLabel: string;
    monthLabel: string;
    citiesLabel: string;
    noteLabel: string;
    /** Grey guidance inside the open blanks: what could go there, and that it may stay empty. */
    monthHint?: string;
    citiesHint: string;
    noteHint: string;
    currencyLabel: string;
    basisLabel: string;
    basis: { person: string; group: string };
    /** Small print: anything may stay blank, and what the budget leaves out. */
    note: string;
  };
  /** What the whole trip covers. Never a pick list. */
  handlesTitle: string;
  needs: Record<FullTripSupportNeed, { title: string; body: string }>;
  stepsTitle: string;
  steps: readonly { title: string; body: string }[];
  writtenTitle: string;
  /** The written-section heading in two lines, broken after the comma. */
  writtenTitleLines: readonly [string, string];
  writtenBody: string;
  written: readonly string[];
  noOnlinePayment: string;
  /** Closing note for visitors who do not need the whole trip arranged. */
  otherTitle: string;
  compare: {
    tours: { title: string; body: string; action: string };
    single: { title: string; body: string; tickets: string; guides: string };
  };
  faqTitle: string;
  faq: readonly { question: string; answer: string }[];
  enquiry: {
    /** The one way to send: a line with an arrow. */
    whatsapp: string;
    kakaoAction?: string;
    /** Small print beside it: sending is free; the other way to send; privacy. */
    free: string;
    email: string;
    privacy: string;
    message: {
      /** First line: names the service; what was said follows after `openingJoin`. */
      opening: string;
      openingJoin: string;
      sentenceEnd: string;
      party: string;
      partyOne: string;
      /** "about {days} days". */
      length: string;
      /** "leaving in {month}" and "to see {cities}", inside the first line. */
      month: string;
      cities: string;
      /** Labels the line with what else the traveller wanted to say. */
      noteLabel: string;
      /** The budget inside the sentence, and what stands for it when none is given. */
      budgetPart: string;
      budgetOpen: string;
      partSeparator: string;
      flights: string;
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
    services: "All services",
    name: "Full Trip Planning & Ground Support",
    eyebrow: "Custom-quoted service",
    h1: "Leave the whole China trip to us.",
    h1Lines: ["Leave the whole China trip to us."],
    lede: "No need to pick a tour first: a planner builds the whole trip around your budget.",
    brief: {
      title: "Your trip brief",
      clauses: {
        party: "A trip for {travellers},", length: "in China for {days} days,", lengthOne: "in China for {days} day,", budget: "on {currency} {amount} {basis},",
        month: "leaving in {month},", cities: "to see {cities}", note: "Also: {note}",
      },
      monthIsNumber: false,
      travellersLabel: "Travellers",
      daysLabel: "Days in China",
      amountLabel: "Budget amount",
      monthLabel: "Month you leave",
      citiesLabel: "Cities you want to see",
      noteLabel: "Anything else you want to tell us",
      monthHint: "month",
      citiesHint: "Beijing, Xi'an, Shanghai… or not sure yet",
      noteHint: "who is coming, must-sees, food needs",
      currencyLabel: "Currency",
      basisLabel: "Per person or in total",
      basis: { person: "per person", group: "in total" },
      note: "Leave blank whatever is undecided. Budget excludes international flights.",
    },
    handlesTitle: "The whole trip, arranged by us",
    needs: {
      route: { title: "Route planning", body: "City order, nights in each place and a realistic pace" },
      hotels: { title: "Hotels", body: "Places to stay chosen and booked to fit the route" },
      tickets: { title: "Attraction reservations", body: "Real-name, timed entry booked in your own passport name" },
      guides: { title: "Private English-speaking guides", body: "A guide on the days you want one" },
      transfers: { title: "Car and transfers", body: "Airport and station pick-ups and private car days" },
      ground: { title: "On-the-ground coordination", body: "The providers in your proposal, coordinated while you are in China" },
    },
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
    otherTitle: "Don't need the whole trip arranged?",
    compare: {
      tours: { title: "Private tours", body: "A route we have already designed, with public starting prices and a clear day-by-day plan.", action: "See private tours" },
      single: { title: "Single services", body: "You only need attraction reservations, a guide for a day or a private car and driver.", tickets: "Attraction reservations", guides: "Private English-speaking guides" },
    },
    faqTitle: "Questions about full-trip support",
    faq: [
      { question: "How is full-trip support priced?", answer: "It is quoted for your trip. Once a planner understands the route and the support you need, the written proposal states the total price, currency and payment recipient, and you pay only after confirming it." },
      { question: "Does sending a trip brief cost anything?", answer: "No. Sending a brief and the planner's first reply are free and create no booking." },
      { question: "Can you plan a China trip to a fixed budget?", answer: "Yes. Tell us the number, how many of you are travelling and roughly how long, and a planner works out a route to it: the cities, the hotel standard, the days with a guide and what the total covers. If you have no number yet, leave the budget blank and we reply with a realistic range." },
      { question: "My budget is lower than the prices on your tour pages. Should I still ask?", answer: "Yes. Each tour page prices one fixed arrangement: that route's hotel standard, with a private car and guide through the trip. A trip planned to your number can use a different hotel standard, fewer guided days or a different mix of cities. Send the number and we will show you what it can be." },
      { question: "Can I pay on the website?", answer: "No. The website has no online checkout. Please do not put card or bank details in a form or message." },
      { question: "Can I hand over only some parts?", answer: "Yes. Choose the parts you need; the proposal says what we are responsible for and what is outside the scope. If you only need attraction reservations or an English-speaking guide for a day, the single services may suit you better." },
      { question: "Who is responsible for the arrangements?", answer: "Homeground is operated by {operator}. The proposal names the responsible provider and the contracting party for each arrangement." },
    ],
    enquiry: {
      whatsapp: "Send on WhatsApp",
      free: "Free to send. No booking is made.",
      email: "Use email instead",
      privacy: "Privacy",
      message: {
        opening: "Hi, I'd like Homeground's full-trip planning and ground support",
        openingJoin: ": ",
        sentenceEnd: ".",
        party: "{count} travellers",
        partyOne: "{count} traveller",
        length: "about {days} days",
        month: "leaving in {month}",
        cities: "to see {cities}",
        noteLabel: "Also",
        budgetPart: "{budget} {basis}",
        budgetOpen: "budget open",
        partSeparator: ", ",
        flights: "The budget is for the trip in China, without international flights.",
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
    services: "服务总览",
    name: "全程规划与落地支持",
    eyebrow: "单独报价服务",
    h1: "整趟中国行交给我们",
    h1Lines: ["整趟中国行交给我们"],
    lede: "不用先挑线路，规划师按你的预算把整趟行程排出来。",
    brief: {
      title: "你的行程需求",
      clauses: {
        party: "我们 {travellers} 个人，", length: "在中国待 {days} 天，", budget: "预算{basis} {currency} {amount}，",
        month: "{month} 月出发，", cities: "想去 {cities}", note: "还想说 {note}",
      },
      monthIsNumber: true,
      travellersLabel: "几个人",
      daysLabel: "待几天",
      amountLabel: "预算金额",
      monthLabel: "几月出发",
      citiesLabel: "想去哪几座城市",
      noteLabel: "还想告诉我们的",
      citiesHint: "北京、西安、上海……没想好可以空着",
      noteHint: "同行的人、想看的、忌口，都可以写",
      currencyLabel: "币种",
      basisLabel: "每人还是全团合计",
      basis: { person: "每人", group: "全团合计" },
      note: "哪一项没想好，都可以空着。预算不含国际机票。",
    },
    handlesTitle: "整趟行程，都由我们安排",
    needs: {
      route: { title: "路线规划", body: "城市顺序、各住几晚、节奏是否合理" },
      hotels: { title: "酒店", body: "按路线挑选并预订住处" },
      tickets: { title: "景点代预约", body: "实名分时景点，用你本人护照预约" },
      guides: { title: "私人英文导游", body: "只在你需要的日子安排" },
      transfers: { title: "包车与接送", body: "机场、车站接送和包车出行" },
      ground: { title: "落地协调", body: "你在中国期间，协调方案里的各项安排" },
    },
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
    otherTitle: "不需要整趟安排？",
    compare: {
      tours: { title: "私家团", body: "我们已经设计好的路线，公开起价，每天怎么走写得清楚。", action: "查看私家团" },
      single: { title: "单项服务", body: "只需要景点代预约、一天的英文导游，或包车与接送。", tickets: "景点代预约", guides: "私人英文导游" },
    },
    faqTitle: "关于全程支持的问题",
    faq: [
      { question: "全程支持怎么收费？", answer: "按你的行程单独报价。规划师弄清路线和需要的支持后，会在书面方案里写明总价、币种和收款方，你确认后才付款。" },
      { question: "提交行程需求要付费吗？", answer: "不用。提交需求和规划师的初步回复都不收费，也不会产生预订。" },
      { question: "可以按固定预算安排中国行吗？", answer: "可以。告诉我们预算、几个人、大概几天，规划师会按这个数排出一条路线：去哪些城市、住什么标准的酒店、哪几天有导游，以及总价包含什么。还没想好数字的话，预算留空，我们会回复一个比较实际的范围。" },
      { question: "我的预算比线路页面上的价格低，还可以问吗？", answer: "可以。线路页面上的价格对应的是一种固定安排：那条线路的酒店标准，加上全程专车和导游。按你的预算来安排时，酒店标准、配导游的天数、城市的组合都可以不一样。把数字发过来，我们告诉你能安排成什么样。" },
      { question: "可以在网站上直接付款吗？", answer: "不可以。本网站不提供在线付款，请不要在表单或消息里填写银行卡或账户信息。" },
      { question: "可以只要其中几项吗？", answer: "可以。选你需要的部分即可，方案会写清哪些由我们负责、哪些不在范围内。如果只需要景点代预约或一天的英文导游，单项服务可能更合适。" },
      { question: "由谁负责这些安排？", answer: "Homeground 由{operator}运营。每项安排的负责方和签约方都会写在书面方案里。" },
    ],
    enquiry: {
      whatsapp: "用 WhatsApp 发给规划师",
      free: "提交免费，不产生预订。",
      email: "改用邮件",
      privacy: "隐私说明",
      message: {
        opening: "你好，我想咨询全程规划与落地支持",
        openingJoin: "：",
        sentenceEnd: "。",
        party: "{count} 人",
        partyOne: "{count} 人",
        length: "大约 {days} 天",
        month: "{month} 月出发",
        cities: "想去{cities}",
        noteLabel: "还想说",
        budgetPart: "{basis} {budget}",
        budgetOpen: "预算待定",
        partSeparator: "，",
        flights: "预算只算中国境内的花费，不含国际机票。",
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
    services: "전체 서비스",
    name: "전체 여행 설계 및 현지 지원",
    eyebrow: "맞춤 견적 서비스",
    h1: "중국 여행 전체를 맡겨 주세요",
    h1Lines: ["중국 여행 전체를 맡겨 주세요"],
    lede: "투어를 먼저 고를 필요 없이, 플래너가 예산에 맞춰 여행 전체 일정을 짭니다.",
    brief: {
      title: "여행 요청서",
      clauses: {
        party: "저희는 {travellers}명,", length: "중국에서 {days}일,", budget: "예산은 {basis} {currency} {amount},",
        month: "{month}월 출발,", cities: "희망 도시 {cities}", note: "더 전할 말 {note}",
      },
      monthIsNumber: true,
      travellersLabel: "인원",
      daysLabel: "여행 일수",
      amountLabel: "예산 금액",
      monthLabel: "출발하는 달",
      citiesLabel: "가고 싶은 도시",
      noteLabel: "더 전하고 싶은 말",
      citiesHint: "베이징, 시안, 상하이… 또는 미정",
      noteHint: "동행, 꼭 볼 곳, 음식 등",
      currencyLabel: "통화",
      basisLabel: "1인 기준 또는 일행 전체",
      basis: { person: "1인 기준", group: "일행 전체" },
      note: "정하지 못한 항목은 비워 두세요. 예산은 국제선 항공권 제외입니다.",
    },
    handlesTitle: "여행 전체를 저희가 준비합니다",
    needs: {
      route: { title: "동선 설계", body: "도시 순서, 도시별 숙박 일수, 무리 없는 일정" },
      hotels: { title: "숙소", body: "동선에 맞춰 숙소를 고르고 예약" },
      tickets: { title: "관광지 예약 대행", body: "실명·시간 지정 관광지를 본인 여권으로 예약" },
      guides: { title: "프라이빗 영어 가이드", body: "원하는 날에만 배정" },
      transfers: { title: "차량과 픽업", body: "공항·역 픽업과 전용 차량 이동" },
      ground: { title: "현지 일정 조율", body: "중국에 계시는 동안 제안서에 담긴 각 서비스를 조율" },
    },
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
    otherTitle: "여행 전체가 아니라 일부만 필요하세요?",
    compare: {
      tours: { title: "프라이빗 투어", body: "이미 설계된 일정으로, 공개 시작가와 일자별 계획이 정리되어 있습니다.", action: "프라이빗 투어 보기" },
      single: { title: "개별 서비스", body: "관광지 예약 대행, 하루 가이드 또는 차량·기사 서비스만 필요할 때 이용하세요.", tickets: "관광지 예약 대행", guides: "프라이빗 한국어 가이드" },
    },
    faqTitle: "전체 여행 지원, 자주 묻는 질문",
    faq: [
      { question: "전체 여행 지원 요금은 어떻게 정해지나요?", answer: "여행별로 견적을 드립니다. 플래너가 동선과 필요한 지원을 파악한 뒤 서면 제안서에 총액, 통화, 결제 수취인을 적고, 확인하신 후에만 결제합니다." },
      { question: "여행 요청을 보내는 데 비용이 드나요?", answer: "아니요. 요청과 플래너의 첫 답변은 무료이며, 보내셔도 예약은 진행되지 않습니다." },
      { question: "정해진 예산에 맞춰 중국 여행을 짤 수 있나요?", answer: "네. 예산과 인원, 대략의 기간을 알려 주시면 플래너가 그 금액에 맞춰 일정을 짭니다. 어느 도시를 가는지, 호텔 기준, 가이드가 함께하는 날, 총액에 포함되는 내용을 정리해 드립니다. 아직 금액을 정하지 못하셨다면 예산은 비워 두세요. 현실적인 범위를 답변드립니다." },
      { question: "제 예산이 투어 페이지의 요금보다 낮아도 문의해도 되나요?", answer: "네. 투어 페이지의 요금은 한 가지 정해진 구성의 가격입니다. 해당 일정의 호텔 기준에 전 일정 전용 차량과 가이드가 포함된 구성입니다. 예산에 맞춰 짜는 여행은 호텔 기준, 가이드가 함께하는 날, 도시 구성을 다르게 할 수 있습니다. 금액을 보내 주시면 어떤 여행이 가능한지 알려 드립니다." },
      { question: "웹사이트에서 바로 결제할 수 있나요?", answer: "아니요. 현재 웹사이트에는 온라인 결제가 없습니다. 양식이나 메시지에 카드나 계좌 정보를 적지 마세요." },
      { question: "일부만 맡길 수도 있나요?", answer: "네. 필요한 부분만 고르시면 됩니다. 제안서에 저희가 책임지는 부분과 범위 밖인 부분을 적어 드립니다. 관광지 예약 대행이나 하루 영어 가이드만 필요하다면 개별 서비스가 더 맞을 수 있습니다." },
      { question: "각 서비스는 누가 책임지나요?", answer: "Homeground는 {operator}가 운영합니다. 각 서비스의 책임 업체와 계약 당사자는 서면 제안서에 적어 드립니다." },
    ],
    enquiry: {
      whatsapp: "WhatsApp으로 보내기",
      kakaoAction: "카카오톡으로 보내기",
      free: "문의는 무료이며 예약이 생기지 않습니다.",
      email: "이메일로 보내기",
      privacy: "개인정보 처리 방식",
      message: {
        opening: "안녕하세요. Homeground에 전체 여행 설계 및 현지 지원을 요청합니다",
        openingJoin: ": ",
        sentenceEnd: ".",
        party: "{count}명",
        partyOne: "{count}명",
        length: "약 {days}일",
        month: "{month}월 출발",
        cities: "가고 싶은 곳: {cities}",
        noteLabel: "더 전할 말",
        budgetPart: "{basis} {budget}",
        budgetOpen: "예산 미정",
        partSeparator: ", ",
        flights: "예산은 중국 현지 일정 기준이며 국제선 항공권은 제외입니다.",
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
