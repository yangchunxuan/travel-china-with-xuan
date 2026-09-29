import type { HomegroundLocale } from "./homegroundI18n";
import type {
  AttractionReservationChannelType,
  AttractionReservationCityId,
  AttractionReservationStatus,
} from "./attractionReservations";

/**
 * Words for /services/china-attraction-reservations/ in English, Simplified
 * Chinese and Korean. Prices are placed with {fee}; the page fills them from
 * formatAttractionReservationFee so each language shows one currency.
 */

export interface AttractionReservationFaq {
  question: string;
  answer: string;
}

export interface AttractionReservationEnquiryCopy {
  eyebrow: string;
  title: string;
  intro: string;
  cities: string;
  attractions: string;
  attractionsHint: string;
  askGroup: string;
  from: string;
  to: string;
  undecided: string;
  travellers: string;
  note: string;
  optional: string;
  notePlaceholder: string;
  noteHint: string;
  send: string;
  whatsapp: string;
  email: string;
  emailAddress: string;
  noneSelected: string;
  privacy: string;
  message: {
    opening: string;
    service: string;
    serviceValue: string;
    city: string;
    attractions: string;
    dates: string;
    datesUndecided: string;
    travellers: string;
    note: string;
    none: string;
    subject: string;
  };
}

export interface AttractionReservationCopy {
  metadata: { title: string; description: string };
  breadcrumb: string;
  home: string;
  services: string;
  navLabel: string;
  eyebrow: string;
  h1: string;
  lede: string;
  heroFacts: readonly { label: string; value: string }[];
  heroCta: string;
  tableCta: string;
  whatTitle: string;
  whatBody: readonly string[];
  forTitle: string;
  forItems: readonly string[];
  stepsTitle: string;
  steps: readonly { title: string; body: string }[];
  pricingTitle: string;
  pricingLead: string;
  pricing: readonly { title: string; body: string }[];
  currencyNote: string;
  limitsTitle: string;
  limits: readonly string[];
  complianceTitle: string;
  compliance: readonly string[];
  passportTitle: string;
  passportBody: string;
  privacyLink: string;
  termsLink: string;
  refundLink: string;
  rulesTitle: string;
  rulesIntro: string;
  rulesCaption: string;
  columns: {
    attraction: string;
    status: string;
    channel: string;
    passport: string;
    release: string;
    realName: string;
    price: string;
    notes: string;
    verified: string;
  };
  status: Record<AttractionReservationStatus, string>;
  channel: Record<AttractionReservationChannelType, string>;
  cities: Record<AttractionReservationCityId, string>;
  unknown: string;
  yes: string;
  no: string;
  free: string;
  freeWalkIn: string;
  sourceLabel: string;
  scrollHint: string;
  faqTitle: string;
  faqs: readonly AttractionReservationFaq[];
  enquiry: AttractionReservationEnquiryCopy;
  guideCta: {
    label: string;
    title: string;
    body: string;
    action: string;
  };
  hubLink: string;
}

const copy: Record<HomegroundLocale, AttractionReservationCopy> = {
  en: {
    metadata: {
      title: "Book China Attraction Tickets as a Foreigner: Terracotta Warriors, Pandas, Museums",
      description:
        "Homeground reserves attraction tickets through official channels in your own passport name in Beijing, Shanghai, Xi'an, Chengdu and Hangzhou. {fee} per person per attraction plus official face value; dated booking rules for each site.",
    },
    breadcrumb: "Breadcrumb",
    home: "Home",
    services: "Services",
    navLabel: "Attraction reservations",
    eyebrow: "Beijing · Shanghai · Xi'an · Chengdu · Hangzhou",
    h1: "China attraction reservations for foreign travellers",
    lede:
      "Many Chinese museums and heritage sites need a real-name reservation made days ahead, often through a Chinese-language app. Tell us the attractions, dates and number of travellers. We check availability, confirm the price in writing and, after payment, book through each attraction's official channel in every traveller's own passport name.",
    heroFacts: [
      { label: "Service fee", value: "{fee} per person per attraction" },
      { label: "Tickets", value: "Official face value, no mark-up" },
      { label: "Not secured", value: "That attraction's fee refunded" },
    ],
    heroCta: "Start a reservation request",
    tableCta: "See the booking rules by city",
    whatTitle: "What we do",
    whatBody: [
      "Homeground China is operated by a licensed Beijing travel agency. For foreign independent travellers, we make attraction reservations that normally need a Chinese phone number, a WeChat account or fast action at a release time.",
      "We use only the channel the attraction itself names: its website, its WeChat account or mini-program, or a platform its own site links to. Every booking is made in the real name and passport of the person who will visit.",
    ],
    forTitle: "Who it is for",
    forItems: [
      "Independent travellers who want to keep their own route but secure timed, real-name entry.",
      "Families and groups where every traveller's passport details must match the booking.",
      "Travellers without a Chinese phone number or WeChat account, or who cannot be online at a Beijing-time release.",
    ],
    stepsTitle: "How it works",
    steps: [
      { title: "1. Send a request", body: "Choose the attractions, dates and number of travellers below and send the request by WhatsApp, email or KakaoTalk. Do not send passport details yet." },
      { title: "2. Written confirmation", body: "A planner checks the booking window and availability, then confirms in writing what we will try to book, the service fee, the face value and the payment instructions." },
      { title: "3. Payment, then booking", body: "After payment we ask for each traveller's passport details, book through the official channel and send you the confirmation record. Carry the same original passports on the day." },
    ],
    pricingTitle: "Price",
    pricingLead: "No online checkout. You pay only after the written confirmation.",
    pricing: [
      { title: "{fee} per person per attraction", body: "The service fee for each traveller at each attraction we reserve. A free-admission museum still carries the fee, because the work is the reservation." },
      { title: "Tickets at official face value", body: "Admission is charged at the attraction's own price with no mark-up and paid together with the fee. Where the table shows no price, it is confirmed when you enquire." },
      { title: "Included for private-tour guests", body: "If you book a Homeground private tour, reservations for the attractions in that itinerary are included at no extra fee." },
    ],
    currencyNote: "The fee is shown in USD, converted from CNY 45. We confirm the payment currency, exchange rate and total in your written confirmation before you pay.",
    limitsTitle: "What we cannot promise",
    limits: [
      "Availability is never certain. Popular sites sell out, and attractions can close or change their rules at short notice.",
      "If we cannot secure a slot, we refund that attraction's service fee in full, together with any ticket money not spent.",
      "Once a ticket has been issued, changes and cancellations follow the attraction's own rules, and the service fee for that ticket is not refundable.",
      "Entry still depends on the attraction: the original passport used for the booking, security checks and the reserved time slot.",
    ],
    complianceTitle: "How we book",
    compliance: [
      "Only through official channels named by the attraction.",
      "Only in each traveller's own real name and passport.",
      "No bots, no multiple accounts and no ticket hoarding.",
      "No resale and no mark-up on tickets.",
      "We do not book attractions whose operator says it has not authorised third parties.",
    ],
    passportTitle: "Passport details",
    passportBody:
      "The request form on this page never asks for passport numbers. We ask for passport details only after you accept the written confirmation, by email, WhatsApp or KakaoTalk. We use them only for the reservation, pass them only to the attraction's booking channel, and delete them after the trip.",
    privacyLink: "Privacy notice",
    termsLink: "Terms",
    refundLink: "Refund & delivery",
    rulesTitle: "Booking rules by attraction",
    rulesIntro:
      "Each row repeats what one of our dated guides found on the attraction's official source. Rules change: we recheck the live rule for your dates before confirming. Blank facts are confirmed when you enquire.",
    rulesCaption: "Attraction reservation rules in Beijing, Shanghai, Xi'an, Chengdu and Hangzhou, with the date each rule was checked",
    columns: {
      attraction: "Attraction",
      status: "Our service",
      channel: "Official channel",
      passport: "Passport accepted",
      release: "When tickets open",
      realName: "Real name",
      price: "Face value",
      notes: "Notes",
      verified: "Checked",
    },
    status: {
      offered: "We can book",
      "not-needed": "No booking needed",
      excluded: "Not offered",
      ask: "Ask us",
    },
    channel: {
      "official-website": "Official website",
      wechat: "Official WeChat account",
      "wechat-mini-program": "WeChat mini-program",
      "douyin-mini-program": "Douyin mini-program",
      meituan: "Meituan",
      "partner-platform": "Partner linked by the official site",
      "ticket-window": "Ticket window",
      email: "Official email",
    },
    cities: { beijing: "Beijing", shanghai: "Shanghai", xian: "Xi'an", chengdu: "Chengdu", hangzhou: "Hangzhou" },
    unknown: "Confirmed when you enquire",
    yes: "Yes",
    no: "No",
    free: "Free, reservation required",
    freeWalkIn: "Free, no reservation",
    sourceLabel: "Source guide",
    scrollHint: "Swipe the table sideways to see every column.",
    faqTitle: "Questions about the reservation service",
    faqs: [
      { question: "How much does the attraction reservation service cost?", answer: "{fee} per person per attraction, plus the attraction's official ticket price with no mark-up. Both are paid together after we confirm in writing. Reservations for attractions in a Homeground private-tour itinerary are included at no extra fee." },
      { question: "Can you book the Forbidden City?", answer: "No. The Palace Museum says it has not authorised third-party ticket agents, so we do not book it. Our Forbidden City guide explains the official booking steps you can follow yourself." },
      { question: "What happens if the attraction is sold out?", answer: "We tell you, and we refund that attraction's service fee in full together with any ticket money not spent. We cannot promise availability at any attraction." },
      { question: "Why don't you ask for my passport number in the form?", answer: "Because it is not needed to check availability. We ask for passport details only after you accept the written confirmation, use them only for the booking and delete them after the trip." },
      { question: "Can I cancel after the ticket is issued?", answer: "Cancellation and changes then follow the attraction's own rules, and the service fee for an issued ticket is not refundable. Some attractions also restrict future bookings after a no-show, so tell us early if plans change." },
      { question: "Do I still need my passport at the gate?", answer: "Yes. Real-name attractions check the original passport used for the booking. A photo or photocopy of the passport is not a substitute." },
    ],
    enquiry: {
      eyebrow: "Reservation request",
      title: "Tell us what to reserve",
      intro: "Nothing is sent until you choose WhatsApp, email or KakaoTalk. Your choices are written into the message so the planner sees them at once.",
      cities: "Cities",
      attractions: "Attractions",
      attractionsHint: "Attractions marked “ask us” have no verified booking rule yet; we check them first.",
      askGroup: "ask us",
      from: "First visit date",
      to: "Last visit date",
      undecided: "Dates not decided yet",
      travellers: "Number of travellers",
      note: "Anything else?",
      optional: "Optional",
      notePlaceholder: "Preferred time of day, a child's age, a private-tour booking…",
      noteHint: "Do not enter passport numbers or payment details here.",
      send: "Send the request",
      whatsapp: "Send on WhatsApp",
      email: "Send by email",
      emailAddress: "We reply from",
      noneSelected: "Choose at least one attraction so the planner knows what to check.",
      privacy: "How we handle your details",
      message: {
        opening: "Hi, I'd like Homeground to reserve attraction tickets in China.",
        service: "Service",
        serviceValue: "Attraction reservation",
        city: "City",
        attractions: "Attractions",
        dates: "Dates",
        datesUndecided: "not decided yet",
        travellers: "Travellers",
        note: "Note",
        none: "not chosen yet",
        subject: "Attraction reservation request",
      },
    },
    guideCta: {
      label: "Attraction reservation service",
      title: "We can book {attraction} for you",
      body: "Official channel, your own passport name, {fee} per person plus the official ticket price. Written confirmation before payment.",
      action: "See the reservation service",
    },
    hubLink: "Attraction reservations in {city}",
  },
  zh: {
    metadata: {
      title: "外国游客代预约中国景点门票：兵马俑、熊猫基地、国博",
      description:
        "Homeground 通过景区官方渠道、以游客本人护照实名，代外国游客预约北京、上海、西安、成都、杭州景点。每人每个景点服务费 {fee}，门票按官方票面价收取；附各景点预约规则与核实日期。",
    },
    breadcrumb: "当前位置",
    home: "首页",
    services: "服务",
    navLabel: "景点代预约",
    eyebrow: "北京 · 上海 · 西安 · 成都 · 杭州",
    h1: "外国游客中国景点代预约",
    lede:
      "中国不少博物馆和古迹需要提前数天实名预约，而且常常只能在中文应用里完成。告诉我们想去的景点、日期和人数，我们核实余量、书面确认价格，收款后通过各景点官方渠道、以每位游客本人的护照实名预约。",
    heroFacts: [
      { label: "服务费", value: "每人每个景点 {fee}" },
      { label: "门票", value: "按官方票面价，不加价" },
      { label: "未约到", value: "退还该景点服务费" },
    ],
    heroCta: "提交代预约需求",
    tableCta: "按城市查看预约规则",
    whatTitle: "我们做什么",
    whatBody: [
      "Homeground China 由持证的北京旅行社运营。我们为外国自由行游客预约那些通常需要中国手机号、微信账号，或必须在放票时刻抢先操作的景点。",
      "我们只使用景点自己公布的渠道：官网、官方微信公众号或小程序，或其官网链接的平台。每一笔预约都使用实际入园者本人的姓名和护照。",
    ],
    forTitle: "适合谁",
    forItems: [
      "想保留自己的路线，但需要确保实名分时入场的自由行游客。",
      "每位成员护照信息都必须与预约一致的家庭和团体。",
      "没有中国手机号或微信账号，或无法在北京时间放票时在线的游客。",
    ],
    stepsTitle: "流程",
    steps: [
      { title: "1. 发送需求", body: "在下方选择景点、日期和人数，通过 WhatsApp、邮件或 KakaoTalk 发给我们。此时不要发送护照信息。" },
      { title: "2. 书面确认", body: "规划师核实预约时间窗与余量，书面确认预约内容、服务费、票面价和付款方式。" },
      { title: "3. 付款后预约", body: "收款后我们再索取每位游客的护照信息，通过官方渠道预约，并把预约记录发给你。当天请携带同一本护照原件。" },
    ],
    pricingTitle: "价格",
    pricingLead: "网站不设在线收银台。书面确认后才需要付款。",
    pricing: [
      { title: "每人每个景点 {fee}", body: "我们为每位游客预约每个景点收取的服务费。免费预约的博物馆同样收取服务费，因为我们提供的是预约服务。" },
      { title: "门票按官方票面价", body: "门票按景点官方价格收取，不加价，与服务费一起支付。表中未列价格的，在你询问时确认。" },
      { title: "私家团客人免服务费", body: "预订 Homeground 私家团的客人，行程内景点的预约不另收服务费。" },
    ],
    currencyNote: "服务费以人民币计；如需以其他币种付款，币种与汇率在付款前的书面确认中说明。",
    limitsTitle: "我们无法承诺的事",
    limits: [
      "余量永远无法保证。热门景点会约满，景点也可能临时闭馆或调整规则。",
      "如果没能约到，我们全额退还该景点的服务费，以及未使用的门票款。",
      "门票出票后，改期和退票按景点自己的规则处理，该门票对应的服务费不予退还。",
      "能否入园仍由景点决定：须携带预约所用护照原件、通过安检，并在预约时段入场。",
    ],
    complianceTitle: "我们如何预约",
    compliance: [
      "只通过景点公布的官方渠道。",
      "只用每位游客本人的真实姓名和护照。",
      "不用抢票软件，不开多个账号，不大量占用名额。",
      "不转售门票，门票不加价。",
      "景点方表示未授权第三方的，我们不代订。",
    ],
    passportTitle: "护照信息",
    passportBody:
      "本页的需求表单从不索取护照号码。只有在你接受书面确认后，我们才会通过邮件、WhatsApp 或 KakaoTalk 索取护照信息；这些信息只用于预约，只提供给景点的预约渠道，并在行程结束后删除。",
    privacyLink: "隐私说明",
    termsLink: "服务条款",
    refundLink: "退款与交付",
    rulesTitle: "各景点预约规则",
    rulesIntro:
      "每一行都来自我们一篇注明日期的攻略，攻略依据的是景点官方来源。规则会变：确认前我们会按你的日期重新核实。空白项在你询问时确认。",
    rulesCaption: "北京、上海、西安、成都、杭州景点预约规则及各条规则的核实日期",
    columns: {
      attraction: "景点",
      status: "我们的服务",
      channel: "官方渠道",
      passport: "可用护照",
      release: "放票规则",
      realName: "实名",
      price: "票面价",
      notes: "说明",
      verified: "核实日期",
    },
    status: {
      offered: "可代预约",
      "not-needed": "无需预约",
      excluded: "不提供",
      ask: "可询问",
    },
    channel: {
      "official-website": "官网",
      wechat: "官方微信公众号",
      "wechat-mini-program": "微信小程序",
      "douyin-mini-program": "抖音小程序",
      meituan: "美团",
      "partner-platform": "官网链接的合作平台",
      "ticket-window": "售票窗口",
      email: "官方邮箱",
    },
    cities: { beijing: "北京", shanghai: "上海", xian: "西安", chengdu: "成都", hangzhou: "杭州" },
    unknown: "询问时确认",
    yes: "是",
    no: "否",
    free: "免费，需预约",
    freeWalkIn: "免费，无需预约",
    sourceLabel: "来源攻略",
    scrollHint: "左右滑动表格可查看全部列。",
    faqTitle: "关于景点代预约的问题",
    faqs: [
      { question: "景点代预约怎么收费？", answer: "每人每个景点服务费 {fee}，另加景点官方票价，门票不加价。两者在书面确认后一起支付。Homeground 私家团行程内的景点预约不另收服务费。" },
      { question: "可以代订故宫吗？", answer: "不可以。故宫博物院表示未授权第三方代理门票，因此我们不代订。我们的故宫攻略写明了可自行完成的官方预约步骤。" },
      { question: "景点约满了怎么办？", answer: "我们会告诉你，并全额退还该景点的服务费和未使用的门票款。任何景点我们都无法保证有余量。" },
      { question: "为什么表单里不填护照号码？", answer: "核实余量不需要护照号码。只有在你接受书面确认后，我们才索取护照信息，只用于预约，并在行程结束后删除。" },
      { question: "出票后还能取消吗？", answer: "出票后的取消和改期按景点自己的规则处理，已出票门票的服务费不予退还。有些景点对爽约会限制之后的预约，行程有变请尽早告诉我们。" },
      { question: "入园时还需要护照吗？", answer: "需要。实名景点会核验预约所用的护照原件，护照照片或复印件不能代替。" },
    ],
    enquiry: {
      eyebrow: "代预约需求",
      title: "告诉我们要预约什么",
      intro: "在你选择 WhatsApp、邮件或 KakaoTalk 之前，什么都不会发送。你的选择会写进消息，规划师一眼就能看到。",
      cities: "城市",
      attractions: "景点",
      attractionsHint: "标有“可询问”的景点尚无已核实的预约规则，我们会先核实。",
      askGroup: "可询问",
      from: "第一个参观日",
      to: "最后一个参观日",
      undecided: "日期还没确定",
      travellers: "人数",
      note: "还有其他要求吗？",
      optional: "选填",
      notePlaceholder: "希望的时段、孩子年龄、已预订的私家团……",
      noteHint: "请不要在这里填写护照号码或付款信息。",
      send: "发送需求",
      whatsapp: "通过 WhatsApp 发送",
      email: "通过邮件发送",
      emailAddress: "回复邮箱",
      noneSelected: "请至少选择一个景点，方便规划师核实。",
      privacy: "我们如何处理你的信息",
      message: {
        opening: "你好，我想请 Homeground 代预约中国景点门票。",
        service: "服务",
        serviceValue: "景点代预约",
        city: "城市",
        attractions: "景点",
        dates: "日期",
        datesUndecided: "还没确定",
        travellers: "人数",
        note: "备注",
        none: "尚未选择",
        subject: "景点代预约需求",
      },
    },
    guideCta: {
      label: "景点代预约服务",
      title: "我们可以帮你预约{attraction}",
      body: "官方渠道、本人护照实名，每人服务费 {fee}，另加官方票价。付款前先书面确认。",
      action: "查看代预约服务",
    },
    hubLink: "{city}景点代预约",
  },
  ko: {
    metadata: {
      title: "외국인 중국 관광지 예약 대행 — 병마용, 판다기지, 국가박물관",
      description:
        "Homeground가 공식 채널에서 본인 여권 실명으로 베이징·상하이·시안·청두·항저우 관광지를 예약해 드립니다. 관광지당 1인 {fee} 수수료와 공식 입장료, 관광지별 예약 규칙과 확인 날짜를 안내합니다.",
    },
    breadcrumb: "현재 위치",
    home: "홈",
    services: "서비스",
    navLabel: "관광지 예약 대행",
    eyebrow: "베이징 · 상하이 · 시안 · 청두 · 항저우",
    h1: "외국인을 위한 중국 관광지 예약 대행",
    lede:
      "중국의 많은 박물관과 유적지는 며칠 전에 실명 예약을 해야 하고, 대개 중국어 앱에서만 가능합니다. 가고 싶은 관광지, 날짜, 인원을 알려 주세요. 잔여분을 확인하고 가격을 서면으로 안내한 뒤, 결제 후 각 관광지의 공식 채널에서 여행자 본인의 여권 실명으로 예약합니다.",
    heroFacts: [
      { label: "수수료", value: "관광지당 1인 {fee}" },
      { label: "입장료", value: "공식 가격 그대로, 추가 금액 없음" },
      { label: "예약 실패 시", value: "해당 관광지 수수료 환불" },
    ],
    heroCta: "예약 요청 보내기",
    tableCta: "도시별 예약 규칙 보기",
    whatTitle: "하는 일",
    whatBody: [
      "Homeground China는 허가받은 베이징 여행사가 운영합니다. 중국 휴대폰 번호나 위챗 계정이 필요하거나, 오픈 시각에 맞춰 빠르게 신청해야 하는 관광지 예약을 외국인 자유여행객을 위해 대신합니다.",
      "관광지가 직접 안내하는 채널만 사용합니다. 공식 웹사이트, 공식 위챗 계정이나 미니프로그램, 또는 공식 사이트가 연결한 플랫폼입니다. 모든 예약은 실제로 방문할 사람의 실명과 여권으로 합니다.",
    ],
    forTitle: "이런 분께 맞습니다",
    forItems: [
      "일정은 직접 짜되 시간 지정 실명 입장은 확실히 해 두고 싶은 자유여행객.",
      "모든 일행의 여권 정보가 예약과 일치해야 하는 가족과 단체.",
      "중국 휴대폰 번호나 위챗 계정이 없거나, 베이징 시간 오픈에 맞춰 접속하기 어려운 분.",
    ],
    stepsTitle: "진행 방식",
    steps: [
      { title: "1. 요청 보내기", body: "아래에서 관광지, 날짜, 인원을 고르고 WhatsApp, 이메일 또는 카카오톡으로 보내 주세요. 여권 정보는 아직 보내지 마세요." },
      { title: "2. 서면 확인", body: "플래너가 예약 가능 기간과 잔여분을 확인하고, 예약할 내용, 수수료, 입장료, 결제 방법을 서면으로 안내합니다." },
      { title: "3. 결제 후 예약", body: "결제 후 각 여행자의 여권 정보를 받아 공식 채널에서 예약하고 예약 기록을 보내 드립니다. 당일에는 같은 여권 원본을 지참하세요." },
    ],
    pricingTitle: "가격",
    pricingLead: "온라인 결제는 없습니다. 서면 확인 후에만 결제합니다.",
    pricing: [
      { title: "관광지당 1인 {fee}", body: "예약하는 관광지마다 여행자 1인당 받는 수수료입니다. 무료 예약 박물관도 예약 업무이므로 수수료가 있습니다." },
      { title: "입장료는 공식 가격 그대로", body: "입장료는 관광지 공식 가격 그대로 받으며 추가 금액이 없고, 수수료와 함께 결제합니다. 표에 가격이 없는 곳은 문의 시 확인합니다." },
      { title: "프라이빗 투어 고객은 무료", body: "Homeground 프라이빗 투어를 예약하시면 일정에 포함된 관광지 예약은 수수료 없이 진행합니다." },
    ],
    currencyNote: "원화 금액은 45위안을 환산한 참고 금액입니다. 결제 통화와 적용 환율은 결제 전 서면 확인에서 확정합니다.",
    limitsTitle: "약속할 수 없는 것",
    limits: [
      "잔여분은 확실하지 않습니다. 인기 관광지는 매진되고, 관광지가 갑자기 문을 닫거나 규칙을 바꿀 수 있습니다.",
      "예약하지 못하면 해당 관광지 수수료 전액과 사용하지 않은 입장료를 환불합니다.",
      "티켓이 발권된 뒤의 변경과 취소는 관광지 자체 규칙을 따르며, 해당 티켓의 수수료는 환불되지 않습니다.",
      "입장 여부는 관광지가 정합니다. 예약에 쓴 여권 원본, 보안 검색, 예약 시간대가 필요합니다.",
    ],
    complianceTitle: "예약 원칙",
    compliance: [
      "관광지가 안내하는 공식 채널만 사용합니다.",
      "각 여행자 본인의 실명과 여권으로만 예약합니다.",
      "매크로, 여러 계정, 티켓 선점은 쓰지 않습니다.",
      "티켓을 되팔지 않으며 입장료에 금액을 더하지 않습니다.",
      "운영 기관이 제3자를 허가하지 않았다고 밝힌 관광지는 예약하지 않습니다.",
    ],
    passportTitle: "여권 정보",
    passportBody:
      "이 페이지의 요청 양식은 여권 번호를 묻지 않습니다. 서면 확인을 수락하신 뒤에만 이메일, WhatsApp 또는 카카오톡으로 여권 정보를 요청합니다. 예약에만 사용하고, 관광지의 예약 채널에만 전달하며, 여행이 끝나면 삭제합니다.",
    privacyLink: "개인정보 안내",
    termsLink: "이용약관",
    refundLink: "환불 및 제공",
    rulesTitle: "관광지별 예약 규칙",
    rulesIntro:
      "각 행은 날짜가 표시된 저희 가이드가 관광지 공식 자료에서 확인한 내용입니다. 규칙은 바뀌므로 확정 전에 여행 날짜 기준으로 다시 확인합니다. 빈 항목은 문의 시 확인합니다.",
    rulesCaption: "베이징·상하이·시안·청두·항저우 관광지 예약 규칙과 규칙별 확인 날짜",
    columns: {
      attraction: "관광지",
      status: "서비스",
      channel: "공식 채널",
      passport: "여권 사용",
      release: "예약 오픈",
      realName: "실명",
      price: "입장료",
      notes: "참고",
      verified: "확인일",
    },
    status: {
      offered: "예약 가능",
      "not-needed": "예약 불필요",
      excluded: "제공하지 않음",
      ask: "문의",
    },
    channel: {
      "official-website": "공식 웹사이트",
      wechat: "공식 위챗 계정",
      "wechat-mini-program": "위챗 미니프로그램",
      "douyin-mini-program": "더우인 미니프로그램",
      meituan: "메이퇀",
      "partner-platform": "공식 사이트가 연결한 제휴 플랫폼",
      "ticket-window": "매표 창구",
      email: "공식 이메일",
    },
    cities: { beijing: "베이징", shanghai: "상하이", xian: "시안", chengdu: "청두", hangzhou: "항저우" },
    unknown: "문의 시 확인",
    yes: "예",
    no: "아니요",
    free: "무료, 예약 필요",
    freeWalkIn: "무료, 예약 불필요",
    sourceLabel: "출처 가이드",
    scrollHint: "표를 옆으로 밀어 모든 열을 확인하세요.",
    faqTitle: "관광지 예약 대행 자주 묻는 질문",
    faqs: [
      { question: "관광지 예약 대행 비용은 얼마인가요?", answer: "관광지당 1인 {fee} 수수료와 관광지 공식 입장료입니다. 입장료에 금액을 더하지 않으며, 서면 확인 후 함께 결제합니다. Homeground 프라이빗 투어 일정의 관광지 예약은 수수료가 없습니다." },
      { question: "자금성도 예약해 주나요?", answer: "아니요. 고궁박물원은 제3자 티켓 대행을 허가하지 않았다고 밝혔으므로 예약하지 않습니다. 자금성 가이드에 직접 예약하는 공식 절차를 정리했습니다." },
      { question: "매진되면 어떻게 되나요?", answer: "바로 알려 드리고, 해당 관광지 수수료 전액과 사용하지 않은 입장료를 환불합니다. 어떤 관광지도 잔여분을 약속할 수는 없습니다." },
      { question: "왜 양식에 여권 번호를 적지 않나요?", answer: "잔여분 확인에는 여권 번호가 필요 없기 때문입니다. 서면 확인을 수락하신 뒤에만 여권 정보를 받고, 예약에만 쓰며, 여행이 끝나면 삭제합니다." },
      { question: "발권 후에도 취소할 수 있나요?", answer: "발권 후 취소와 변경은 관광지 자체 규칙을 따르고, 발권된 티켓의 수수료는 환불되지 않습니다. 노쇼 시 이후 예약을 제한하는 관광지도 있으니 일정이 바뀌면 빨리 알려 주세요." },
      { question: "입장할 때도 여권이 필요한가요?", answer: "네. 실명제 관광지는 예약에 쓴 여권 원본을 확인합니다. 여권 사진이나 사본으로는 대신할 수 없습니다." },
    ],
    enquiry: {
      eyebrow: "예약 요청",
      title: "예약할 내용을 알려 주세요",
      intro: "WhatsApp, 이메일, 카카오톡 중 하나를 고르기 전에는 아무것도 전송되지 않습니다. 선택한 내용이 메시지에 들어가 플래너가 바로 확인합니다.",
      cities: "도시",
      attractions: "관광지",
      attractionsHint: "‘문의’로 표시된 관광지는 확인된 예약 규칙이 아직 없어 먼저 확인합니다.",
      askGroup: "문의",
      from: "첫 방문일",
      to: "마지막 방문일",
      undecided: "날짜는 아직 미정이에요",
      travellers: "인원",
      note: "더 알려 주실 내용이 있나요?",
      optional: "선택",
      notePlaceholder: "원하는 시간대, 아이 나이, 예약한 프라이빗 투어…",
      noteHint: "여권 번호나 결제 정보는 여기에 적지 마세요.",
      send: "요청 보내기",
      whatsapp: "WhatsApp으로 보내기",
      email: "이메일로 보내기",
      emailAddress: "답장 주소",
      noneSelected: "플래너가 확인할 수 있도록 관광지를 하나 이상 골라 주세요.",
      privacy: "개인정보 처리 방식",
      message: {
        opening: "안녕하세요. Homeground에 중국 관광지 예약 대행을 요청하고 싶습니다.",
        service: "서비스",
        serviceValue: "관광지 예약 대행",
        city: "도시",
        attractions: "관광지",
        dates: "날짜",
        datesUndecided: "미정",
        travellers: "인원",
        note: "메모",
        none: "아직 선택하지 않음",
        subject: "관광지 예약 대행 요청",
      },
    },
    guideCta: {
      label: "관광지 예약 대행",
      title: "{attraction} 예약을 대신해 드립니다",
      body: "공식 채널, 본인 여권 실명, 1인 {fee} 수수료와 공식 입장료. 결제 전에 서면으로 확인합니다.",
      action: "예약 대행 서비스 보기",
    },
    hubLink: "{city} 관광지 예약 대행",
  },
};

export function getAttractionReservationCopy(locale: HomegroundLocale) {
  return copy[locale];
}

export function fillReservationCopy(text: string, values: Record<string, string>) {
  return text.replace(/\{(\w+)\}/gu, (match, key: string) => values[key] ?? match);
}
