import type { HomegroundLocale } from "./homegroundI18n";
import type {
  AttractionReservationChannelType,
  AttractionReservationCityId,
  AttractionReservationStatus,
} from "./attractionReservations";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS } from "./attractionReservationGuarantee.ts";

/**
 * Words for /services/china-attraction-reservations/ in English, Simplified
 * Chinese and Korean. Prices are placed with {fee}; the page fills them from
 * formatAttractionReservationFee so each language shows one currency.
 *
 * Every mention of the booking guarantee takes its lead time from
 * ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS. China's Advertising Law bans
 * absolute terms, so the copy never says "100%", "absolutely", "绝对" or
 * "零风险". The copy says only what Homeground does (official system, the
 * traveller's own name, no resale or mark-up, face value); it never quotes
 * operators' statements about third parties and never claims to be an
 * authorised seller, agent or partner of an attraction.
 */

const days = ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS;

/** The guarantee as published, one sentence pair per language. */
const guarantee = {
  en: `Guaranteed booking: send your request and payment at least ${days} days before your visit and we guarantee the reservation, except at an attraction marked “best effort”. If we ever miss one, you get a full refund of that attraction's service fee and ticket money.`,
  zh: `预约保证：在参观日前至少 ${days} 天提交需求并完成付款，我们保证约到（标注“尽力预约”的景点除外）；万一没约到，全额退还该景点的服务费和门票款。`,
  ko: `예약 보장: 방문일 최소 ${days}일 전까지 요청과 결제를 마치시면 예약을 보장합니다(‘최선 시도’로 표시된 관광지는 제외). 만약 예약하지 못하면 해당 관광지의 수수료와 입장료를 전액 환불해 드립니다.`,
} as const satisfies Record<HomegroundLocale, string>;

/** What happens to a request or payment made later than the guarantee lead time. */
const guaranteeLate = {
  en: `A request or payment made later than ${days} days before your visit is not guaranteed, but we still try. If we cannot secure it, that attraction's service fee is refunded in full, together with any ticket money not spent.`,
  zh: `距参观日不足 ${days} 天才提交需求或付款的，我们仍会尽力预约，但不作保证；如未能约到，全额退还该景点的服务费及未使用的门票款。`,
  ko: `방문일 ${days}일 전보다 늦게 요청하거나 결제하시면 예약을 시도하되 보장하지는 않습니다. 예약하지 못하면 해당 관광지 수수료 전액과 사용하지 않은 입장료를 환불합니다.`,
} as const satisfies Record<HomegroundLocale, string>;

export interface AttractionReservationFaq {
  question: string;
  answer: string;
}

export interface AttractionReservationEnquiryCopy {
  eyebrow: string;
  title: string;
  intro: string;
  attractions: string;
  attractionsHint: string;
  /** One date per chosen attraction: a ticket is for a single day. */
  visitDates: string;
  visitDatesHint: string;
  visitDatesEmpty: string;
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
  /** The running summary beside the form (below it on phones). */
  summaryTitle: string;
  summaryFee: string;
  summaryPickDate: string;
  /** Units in the fee formula: "{n}" is replaced; "one" is used for 1. */
  summaryPeople: { one: string; other: string };
  summaryAttractions: { one: string; other: string };
  summaryNote: string;
  /** Announced after a rule's "Request this attraction" link adds it; {name} is the attraction. */
  added: string;
  /** Korean only: the KakaoTalk button, worded like the WhatsApp and email buttons. */
  kakaoAction?: string;
  /** Korean only: WhatsApp and email side by side under KakaoTalk need short labels. */
  whatsappShort?: string;
  emailShort?: string;
  message: {
    opening: string;
    service: string;
    serviceValue: string;
    city: string;
    attractions: string;
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
  /** The booking guarantee, shown in the hero and repeated in the refund list. */
  guarantee: string;
  /** The rule for requests later than the guarantee lead time. */
  guaranteeLate: string;
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
  columns: {
    attraction: string;
    channel: string;
    passport: string;
    release: string;
    realName: string;
    price: string;
    notes: string;
    verified: string;
  };
  status: Record<AttractionReservationStatus, string>;
  /** Tag on an attraction outside the booking guarantee. */
  bestEffortTag: string;
  channel: Record<AttractionReservationChannelType, string>;
  cities: Record<AttractionReservationCityId, string>;
  unknown: string;
  /** A rule field that does not apply because entry is a free walk-in. */
  notApplicable: string;
  /** The checked-date cell of a row that no guide has checked yet. */
  notChecked: string;
  yes: string;
  no: string;
  free: string;
  freeWalkIn: string;
  sourceLabel: string;
  scrollHint: string;
  /** Shown above the rules: a dash in a cell means the rule is confirmed on enquiry. */
  unknownLegend: string;
  /** In each bookable rule: selects that attraction in the request form. */
  reserveThis: string;
  /** The count on each city's collapsed rules row, e.g. "{count} attractions". */
  attractionCount: { one: string; other: string };
  faqTitle: string;
  faqs: readonly AttractionReservationFaq[];
  enquiry: AttractionReservationEnquiryCopy;
  guideCta: {
    label: string;
    title: string;
    /** For an attraction whose guide confirms the official system accepts passports. */
    body: string;
    /** For an attraction whose passport handling online is not confirmed. */
    bodyPassportUnchecked: string;
    /** For an attraction outside the booking guarantee. */
    bodyBestEffort: string;
    action: string;
  };
  hubLink: string;
}

const copy: Record<HomegroundLocale, AttractionReservationCopy> = {
  en: {
    metadata: {
      title: "Book Forbidden City & China Museum Tickets as a Foreigner",
      description:
        "We reserve the Forbidden City, Terracotta Warriors and other museums on official systems in your own name: {fee} per person per attraction plus face value.",
    },
    breadcrumb: "Breadcrumb",
    home: "Home",
    services: "Services",
    navLabel: "Attraction reservations",
    eyebrow: "Beijing · Shanghai · Suzhou · Hangzhou · Xi'an · Chengdu · Guilin · Lijiang · Datong",
    h1: "Forbidden City and China attraction reservations for foreign travellers",
    lede:
      "The Forbidden City, the Terracotta Warriors and many other Chinese museums and heritage sites need a real-name reservation made days ahead, often through a Chinese-language app. Tell us the attractions, dates and number of travellers. We check availability, confirm the price in writing and, after payment, submit each reservation on the attraction's own official system in every traveller's own passport name.",
    heroFacts: [
      { label: "Service fee", value: "{fee} per person per attraction" },
      { label: "Tickets", value: "Official face value, no mark-up" },
    ],
    guarantee: guarantee.en,
    guaranteeLate: guaranteeLate.en,
    heroCta: "Start a reservation request",
    tableCta: "See the booking rules by city",
    whatTitle: "What we do",
    whatBody: [
      "Homeground China is operated by a licensed Beijing travel agency. For foreign independent travellers, we make attraction reservations that normally need a Chinese phone number, a WeChat account or fast action at a release time.",
      "We use only the channel the attraction itself names: its website, its official booking email, its WeChat account or mini-program, or a platform its own site links to. Every booking is made in the real name and passport of the person who will visit.",
      "We never resell tickets or add a mark-up: tickets are charged at the attraction's face value, and our fee is for the reservation work. You can always book yourself with our guides.",
    ],
    forTitle: "Who it is for",
    forItems: [
      "Independent travellers who want to keep their own route but secure timed, real-name entry.",
      "Families and groups where every traveller's passport details must match the booking.",
      "Travellers without a Chinese phone number or WeChat account, or who cannot be online at a Beijing-time release.",
    ],
    stepsTitle: "How it works",
    steps: [
      { title: "1. Send a request", body: `Choose the attractions, dates and number of travellers below and send the request by WhatsApp or email, at least ${days} days before your visit for a guaranteed booking. Do not send passport details yet.` },
      { title: "2. Written confirmation", body: "A planner checks the booking window and availability, then confirms in writing what we will book, the service fee, the face value and the payment instructions." },
      { title: "3. Payment, then booking", body: "After payment we ask for each traveller's passport details, book through the official channel and send you the confirmation record. Carry the same original passports on the day." },
    ],
    pricingTitle: "Price",
    pricingLead: `No online checkout. You pay only after the written confirmation; pay at least ${days} days before your visit for a guaranteed booking.`,
    pricing: [
      { title: "{fee} per person per attraction", body: "The service fee for each traveller at each attraction we reserve. A free-admission museum still carries the fee, because the work is the reservation." },
      { title: "Tickets at official face value", body: "Admission is charged at the attraction's own price with no mark-up and paid together with the fee. Where the table shows no price, it is confirmed when you enquire." },
      { title: "Included for private-tour guests", body: "If you book a Homeground private tour, reservations for the attractions in that itinerary are included at no extra fee." },
    ],
    currencyNote: "The fee is shown in USD, converted from CNY 45. We confirm the payment currency, exchange rate and total in your written confirmation before you pay.",
    limitsTitle: "Guarantee and refunds",
    limits: [
      guarantee.en,
      guaranteeLate.en,
      "Once a ticket has been issued, changes and cancellations follow the attraction's own rules, and the service fee for that ticket is not refundable.",
      "Entry still depends on the attraction: the original passport used for the booking, security checks and the reserved time slot.",
    ],
    complianceTitle: "How we book",
    compliance: [
      "Only through official channels named by the attraction.",
      "Only in each traveller's own real name and passport.",
      "No bots, no multiple accounts and no ticket hoarding.",
      "No resale and no mark-up on tickets.",
      "Tickets at the attraction's face value; each attraction's own real-name and cancellation rules apply.",
    ],
    passportTitle: "Passport details",
    passportBody:
      "The request form on this page never asks for passport numbers. We ask for passport details only after you accept the written confirmation, by email or WhatsApp. We use them only for the reservation, pass them only to the attraction's booking channel, and delete them after the trip.",
    privacyLink: "Privacy notice",
    termsLink: "Terms",
    refundLink: "Refund & delivery",
    rulesTitle: "Booking rules by attraction",
    rulesIntro:
      `Each row with a source guide repeats what that dated guide found on the attraction's official source; a row marked “not yet checked” has no guide behind it yet. Rules change: we recheck the live rule for your dates before confirming. The ${days}-day booking guarantee covers every attraction we book.`,
    columns: {
      attraction: "Attraction",
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
    },
    bestEffortTag: "Best effort, not guaranteed",
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
    cities: { beijing: "Beijing", shanghai: "Shanghai", suzhou: "Suzhou", hangzhou: "Hangzhou", xian: "Xi'an", chengdu: "Chengdu", guilin: "Guilin", lijiang: "Lijiang", datong: "Datong" },
    unknown: "Confirmed when you enquire",
    notApplicable: "Not applicable: walk-in entry",
    notChecked: "Not yet checked",
    yes: "Yes",
    no: "No",
    free: "Free, reservation required",
    freeWalkIn: "Free, no reservation",
    sourceLabel: "Source guide",
    scrollHint: "Scroll the table sideways to see every column.",
    reserveThis: "Request this attraction",
    unknownLegend: "A dash (—) in the table means we check that rule for your travel dates when you contact us.",
    attractionCount: { one: "{count} attraction", other: "{count} attractions" },
    faqTitle: "Questions about the reservation service",
    faqs: [
      { question: "How much does the attraction reservation service cost?", answer: "{fee} per person per attraction, plus the attraction's official ticket price with no mark-up. Both are paid together after we confirm in writing. Reservations for attractions in a Homeground private-tour itinerary are included at no extra fee." },
      { question: "Can you book the Forbidden City?", answer: `Yes. We submit the reservation on the Palace Museum's own official channel in each visitor's own passport name. Tickets open seven days ahead at 20:00 China time and there are no same-day tickets, so send your request early. Send your request and payment at least ${days} days before your visit and we guarantee the reservation; if we ever miss it, you get a full refund of the service fee and ticket money. We do not resell tickets or add a mark-up: tickets are charged at face value, and the museum's real-name and cancellation rules apply.` },
      { question: "Can you book the Shaanxi History Museum?", answer: "Yes, on the museum's official WeChat system in your own passport name. Basic admission is free, so you pay only our fee for the reservation work, plus the separate ticket at face value if you add the Tang mural gallery. We do not resell tickets, and you can also book it yourself with our guide. A no-show brings a 180-day booking restriction, so tell us early if plans change." },
      { question: "Is the reservation guaranteed?", answer: `Yes, if you send your request and payment at least ${days} days before your visit: we guarantee the reservation, and if we ever miss one, you get a full refund of that attraction's service fee and ticket money. Later than that, we still try but cannot guarantee it; if we cannot secure it, we refund that attraction's service fee in full together with any ticket money not spent.` },
      { question: "Why don't you ask for my passport number in the form?", answer: "Because it is not needed to check availability. We ask for passport details only after you accept the written confirmation, use them only for the booking and delete them after the trip." },
      { question: "Can I cancel after the ticket is issued?", answer: "Cancellation and changes then follow the attraction's own rules, and the service fee for an issued ticket is not refundable. Some attractions also restrict future bookings after a no-show, so tell us early if plans change." },
      { question: "Do I still need my passport at the gate?", answer: "Yes. Real-name attractions check the original passport used for the booking. A photo or photocopy of the passport is not a substitute." },
    ],
    enquiry: {
      eyebrow: "Reservation request",
      title: "Tell us what to reserve",
      intro: `Nothing is sent until you choose WhatsApp or email. Your choices are written into the message so the planner sees them at once. Send it and pay at least ${days} days before your first visit for a guaranteed booking.`,
      attractions: "Attractions",
      attractionsHint: "Choose as many as you like; you will pick a date for each one below.",
      visitDates: "Visit dates",
      visitDatesHint: "Each ticket is for one day. Pick the day you will visit each attraction.",
      visitDatesEmpty: "Choose an attraction above, then pick the day you will visit it.",
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
      summaryTitle: "Your request",
      summaryFee: "Service fee (estimate)",
      summaryPickDate: "Choose a date",
      summaryPeople: { one: "{n} traveller", other: "{n} travellers" },
      added: "Added to your request: {name}",
      summaryAttractions: { one: "{n} attraction", other: "{n} attractions" },
      summaryNote: "You pay only after our written confirmation. Attractions in a Homeground private tour carry no service fee.",
      message: {
        opening: "Hi, I'd like Homeground to reserve attraction tickets in China.",
        service: "Service",
        serviceValue: "Attraction reservation",
        city: "City",
        attractions: "Attractions",
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
      body: `We submit the reservation on the official system in your own passport name, not a resold ticket: {fee} per person plus the official ticket price, confirmed in writing before payment. Request and pay at least ${days} days before your visit and the booking is guaranteed.`,
      bodyPassportUnchecked: `Before payment we check whether the official system accepts your passport for your date and confirm in writing: {fee} per person plus the official ticket price, never a resold ticket. Request and pay at least ${days} days before your visit and the booking is guaranteed.`,
      bodyBestEffort: `This one is best effort, not guaranteed: we try through the official channels in your own name for {fee} per person plus the official ticket price, confirmed in writing before payment. If we cannot secure it, both are refunded in full.`,
      action: "See the reservation service",
    },
    hubLink: "Attraction reservations in {city}",
  },
  zh: {
    metadata: {
      title: "外国游客代预约故宫、兵马俑与博物馆门票",
      description:
        "Homeground 在各景点官方系统中、以游客本人护照实名，代外国游客预约故宫、兵马俑、陕西历史博物馆、漓江游船、玉龙雪山等北京、上海、苏州、杭州、西安、成都、桂林、丽江、大同景点。每人每个景点服务费 {fee}，门票按官方票面价收取，不加价。",
    },
    breadcrumb: "当前位置",
    home: "首页",
    services: "服务",
    navLabel: "景点代预约",
    eyebrow: "北京 · 上海 · 苏州 · 杭州 · 西安 · 成都 · 桂林 · 丽江 · 大同",
    h1: "为外国游客代预约故宫与中国景点",
    lede:
      "故宫、兵马俑和中国不少博物馆、古迹都需要提前数天实名预约，而且常常只能在中文应用里完成。告诉我们想去的景点、日期和人数，我们核实余量、书面确认价格，收款后在各景点自己的官方系统中、以每位游客本人的护照实名提交预约。",
    heroFacts: [
      { label: "服务费", value: "每人每个景点 {fee}" },
      { label: "门票", value: "按官方票面价，不加价" },
    ],
    guarantee: guarantee.zh,
    guaranteeLate: guaranteeLate.zh,
    heroCta: "填写代预约需求",
    tableCta: "按城市查看预约规则",
    whatTitle: "我们做什么",
    whatBody: [
      "Homeground China 由持证的北京旅行社运营。我们为外国自由行游客预约那些通常需要中国手机号、微信账号，或必须在放票时刻抢先操作的景点。",
      "我们只使用景点自己公布的渠道：官网、官方预约邮箱、官方微信公众号或小程序，或其官网链接的平台。每一笔预约都使用实际入园者本人的姓名和护照。",
      "我们从不转售门票，也不加价：门票按景点票面价收取，服务费是预约工作的费用。你也可以随时按我们的攻略自行预约。",
    ],
    forTitle: "适合谁",
    forItems: [
      "想保留自己的路线，但需要确保实名分时入场的自由行游客。",
      "每位成员护照信息都必须与预约一致的家庭和团体。",
      "没有中国手机号或微信账号，或无法在北京时间放票时在线的游客。",
    ],
    stepsTitle: "流程",
    steps: [
      { title: "1. 发送需求", body: `在下方选择景点、日期和人数，通过 WhatsApp 或邮件发给我们；在参观日前至少 ${days} 天发送，才能享受预约保证。此时不要发送护照信息。` },
      { title: "2. 书面确认", body: "规划师核实预约时间窗与余量，书面确认预约内容、服务费、票面价和付款方式。" },
      { title: "3. 付款后预约", body: "收款后我们再索取每位游客的护照信息，通过官方渠道预约，并把预约记录发给你。当天请携带同一本护照原件。" },
    ],
    pricingTitle: "价格",
    pricingLead: `网站不设在线收银台。书面确认后才需要付款；在参观日前至少 ${days} 天付款，即享预约保证。`,
    pricing: [
      { title: "每人每个景点 {fee}", body: "我们为每位游客预约每个景点收取的服务费。免费预约的博物馆同样收取服务费，因为我们提供的是预约服务。" },
      { title: "门票按官方票面价", body: "门票按景点官方价格收取，不加价，与服务费一起支付。表中未列价格的，在你咨询时确认。" },
      { title: "私家团客人免服务费", body: "预订 Homeground 私家团的客人，行程内景点的预约不另收服务费。" },
    ],
    currencyNote: "服务费以人民币计；如需以其他币种付款，币种与汇率在付款前的书面确认中说明。",
    limitsTitle: "预约保证与退款",
    limits: [
      guarantee.zh,
      guaranteeLate.zh,
      "门票出票后，改期和退票按景点自己的规则处理，该门票对应的服务费不予退还。",
      "能否入园仍由景点决定：须携带预约所用护照原件、通过安检，并在预约时段入场。",
    ],
    complianceTitle: "我们如何预约",
    compliance: [
      "只通过景点公布的官方渠道。",
      "只用每位游客本人的真实姓名和护照。",
      "不用抢票软件，不开多个账号，不大量占用名额。",
      "不转售门票，门票不加价。",
      "门票按景点票面价收取；景点自己的实名与退改规则照常适用。",
    ],
    passportTitle: "护照信息",
    passportBody:
      "本页的需求表单从不索取护照号码。只有在你接受书面确认后，我们才会通过邮件或 WhatsApp 索取护照信息；这些信息只用于预约，只提供给景点的预约渠道，并在行程结束后删除。",
    privacyLink: "隐私说明",
    termsLink: "服务条款",
    refundLink: "退款与交付",
    rulesTitle: "各景点预约规则",
    rulesIntro:
      `有来源攻略的每一行，都来自我们一篇注明日期、依据景点官方来源的攻略；标为“尚未核实”的行还没有攻略支撑。规则会变：确认前我们会按你的日期重新核实。提前 ${days} 天的预约保证适用于我们代约的每个景点。`,
    columns: {
      attraction: "景点",
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
    },
    bestEffortTag: "尽力预约，不作保证",
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
    cities: { beijing: "北京", shanghai: "上海", suzhou: "苏州", hangzhou: "杭州", xian: "西安", chengdu: "成都", guilin: "桂林", lijiang: "丽江", datong: "大同" },
    unknown: "咨询时确认",
    notApplicable: "不适用：免预约入馆",
    notChecked: "尚未核实",
    yes: "是",
    no: "否",
    free: "免费，需预约",
    freeWalkIn: "免费，无需预约",
    sourceLabel: "来源攻略",
    scrollHint: "左右滑动表格可查看全部列。",
    reserveThis: "预约这个景点",
    unknownLegend: "表中以 — 标出的项目，会在你咨询时按出行日期确认。",
    attractionCount: { one: "{count} 个景点", other: "{count} 个景点" },
    faqTitle: "关于景点代预约的问题",
    faqs: [
      { question: "景点代预约怎么收费？", answer: "每人每个景点服务费 {fee}，另加景点官方票价，门票不加价。两者在书面确认后一起支付。Homeground 私家团行程内的景点预约不另收服务费。" },
      { question: "可以代约故宫吗？", answer: `可以。我们在故宫官方渠道以每位游客本人的护照实名提交预约。故宫提前 7 天北京时间 20:00 开放预约，不售当日票，请尽早告诉我们。在参观日前至少 ${days} 天提交需求并完成付款，我们保证约到；万一没约到，全额退还服务费和门票款。我们不转售、不加价，门票按票面价收取；故宫的实名与退改规则照常适用。` },
      { question: "可以代约陕西历史博物馆吗？", answer: "可以，我们在博物馆官方微信系统以你本人的护照实名预约。基本陈列免费，所以你只需支付预约服务费；如加选唐代壁画珍品馆，另按票面价支付门票。我们不转售门票；你也可以按我们的攻略自行预约。爽约会被限制预约 180 天，行程有变请尽早告诉我们。" },
      { question: "预约有保证吗？", answer: `在参观日前至少 ${days} 天提交需求并完成付款，我们保证约到；万一没约到，全额退还该景点的服务费和门票款。晚于这个时间，我们仍会尽力预约，但不作保证；如未能约到，全额退还该景点的服务费及未使用的门票款。` },
      { question: "为什么表单里不填护照号码？", answer: "核实余量不需要护照号码。只有在你接受书面确认后，我们才索取护照信息，只用于预约，并在行程结束后删除。" },
      { question: "出票后还能取消吗？", answer: "出票后的取消和改期按景点自己的规则处理，已出票门票的服务费不予退还。有些景点对爽约会限制之后的预约，行程有变请尽早告诉我们。" },
      { question: "入园时还需要护照吗？", answer: "需要。实名景点会核验预约所用的护照原件，护照照片或复印件不能代替。" },
    ],
    enquiry: {
      eyebrow: "代预约需求",
      title: "告诉我们要预约什么",
      intro: `在你选择 WhatsApp 或邮件之前，什么都不会发送。你的选择会写进消息，规划师一眼就能看到。在第一个参观日前至少 ${days} 天发送并付款，即享预约保证。`,
      attractions: "景点",
      attractionsHint: "可多选。选好后，在下方为每个景点选日期。",
      visitDates: "参观日期",
      visitDatesHint: "门票按天预约，请为每个景点选一个参观日。",
      visitDatesEmpty: "先在上方选择景点，再为每个景点选日期。",
      undecided: "日期未定",
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
      summaryTitle: "你的需求",
      summaryFee: "服务费（预估）",
      summaryPickDate: "选择日期",
      summaryPeople: { one: "{n} 人", other: "{n} 人" },
      added: "已加入需求：{name}",
      summaryAttractions: { one: "{n} 个景点", other: "{n} 个景点" },
      summaryNote: "书面确认后才付款。Homeground 私家团行程内的景点免服务费。",
      message: {
        opening: "你好，我想请 Homeground 代预约中国景点门票。",
        service: "服务",
        serviceValue: "景点代预约",
        city: "城市",
        attractions: "景点",
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
      body: `在官方系统以你本人护照实名提交预约，不是转售门票：每人服务费 {fee}，另加官方票价，付款前先书面确认。在参观日前至少 ${days} 天提交需求并付款，我们保证约到。`,
      bodyPassportUnchecked: `付款前，我们会按你的日期核实官方系统是否接受你的护照，并书面确认每人服务费 {fee} 与官方票价；我们不经手转售门票。在参观日前至少 ${days} 天提交需求并付款，我们保证约到。`,
      bodyBestEffort: `这一项是尽力预约，不作保证：我们通过官方渠道以你本人名义尝试预约，每人服务费 {fee} 加官方票价，付款前书面确认；如未能约到，两者全额退还。`,
      action: "查看代预约服务",
    },
    hubLink: "{city}景点代预约",
  },
  ko: {
    metadata: {
      title: "외국인 자금성·병마용·중국 박물관 예약 대행",
      description:
        "Homeground가 각 관광지 공식 시스템에서 본인 여권 실명으로 자금성, 병마용, 산시역사박물관, 이강 유람선, 옥룡설산 등 베이징·상하이·쑤저우·항저우·시안·청두·계림·리장·다퉁 관광지를 예약해 드립니다. 관광지당 1인 {fee} 수수료와 공식 입장료(추가 금액 없음).",
    },
    breadcrumb: "현재 위치",
    home: "홈",
    services: "서비스",
    navLabel: "관광지 예약 대행",
    eyebrow: "베이징 · 상하이 · 쑤저우 · 항저우 · 시안 · 청두 · 계림 · 리장 · 다퉁",
    h1: "외국인을 위한 자금성·중국 관광지 예약 대행",
    lede:
      "자금성과 병마용을 비롯한 중국의 많은 박물관과 유적지는 며칠 전에 실명 예약을 해야 하고, 대개 중국어 앱에서만 가능합니다. 가고 싶은 관광지, 날짜, 인원을 알려 주세요. 잔여분을 확인하고 가격을 서면으로 안내한 뒤, 결제 후 각 관광지의 공식 시스템에서 여행자 본인의 여권 실명으로 예약을 제출합니다.",
    heroFacts: [
      { label: "수수료", value: "관광지당 1인 {fee}" },
      { label: "입장료", value: "공식 가격 그대로, 추가 금액 없음" },
    ],
    guarantee: guarantee.ko,
    guaranteeLate: guaranteeLate.ko,
    heroCta: "예약 요청 작성하기",
    tableCta: "도시별 예약 규칙 보기",
    whatTitle: "하는 일",
    whatBody: [
      "Homeground China는 허가받은 베이징 여행사가 운영합니다. 중국 휴대폰 번호나 위챗 계정이 필요하거나, 오픈 시각에 맞춰 빠르게 신청해야 하는 관광지 예약을 외국인 자유여행객을 위해 대신합니다.",
      "관광지가 직접 안내하는 채널만 사용합니다. 공식 웹사이트, 공식 예약 이메일, 공식 위챗 계정이나 미니프로그램, 또는 공식 사이트가 연결한 플랫폼입니다. 모든 예약은 실제로 방문할 사람의 실명과 여권으로 합니다.",
      "표를 되팔거나 금액을 더하지 않습니다. 입장료는 관광지 공식 가격 그대로 받고, 수수료는 예약 업무에 대한 것입니다. 가이드를 보고 언제든 직접 예약하셔도 됩니다.",
    ],
    forTitle: "이런 분께 맞습니다",
    forItems: [
      "일정은 직접 짜되 시간 지정 실명 입장은 확실히 해 두고 싶은 자유여행객.",
      "모든 일행의 여권 정보가 예약과 일치해야 하는 가족과 단체.",
      "중국 휴대폰 번호나 위챗 계정이 없거나, 베이징 시간 오픈에 맞춰 접속하기 어려운 분.",
    ],
    stepsTitle: "진행 방식",
    steps: [
      { title: "1. 요청 보내기", body: `아래에서 관광지, 날짜, 인원을 고르고 카카오톡, WhatsApp 또는 이메일로 보내 주세요. 예약 보장을 받으려면 방문일 최소 ${days}일 전까지 보내 주세요. 여권 정보는 아직 보내지 마세요.` },
      { title: "2. 서면 확인", body: "플래너가 예약 가능 기간과 잔여분을 확인하고, 예약할 내용, 수수료, 입장료, 결제 방법을 서면으로 안내합니다." },
      { title: "3. 결제 후 예약", body: "결제 후 각 여행자의 여권 정보를 받아 공식 채널에서 예약하고 예약 기록을 보내 드립니다. 당일에는 같은 여권 원본을 지참하세요." },
    ],
    pricingTitle: "가격",
    pricingLead: `온라인 결제는 없습니다. 서면 확인 후에만 결제하며, 방문일 최소 ${days}일 전까지 결제하시면 예약을 보장합니다.`,
    pricing: [
      { title: "관광지당 1인 {fee}", body: "예약하는 관광지마다 여행자 1인당 받는 수수료입니다. 무료 예약 박물관도 예약 업무이므로 수수료가 있습니다." },
      { title: "입장료는 공식 가격 그대로", body: "입장료는 관광지 공식 가격 그대로 받으며 추가 금액이 없고, 수수료와 함께 결제합니다. 표에 가격이 없는 곳은 문의 시 확인합니다." },
      { title: "프라이빗 투어 고객은 무료", body: "Homeground 프라이빗 투어를 예약하시면 일정에 포함된 관광지 예약은 수수료 없이 진행합니다." },
    ],
    currencyNote: "원화 금액은 45위안을 환산한 참고 금액입니다. 결제 통화와 적용 환율은 결제 전 서면 확인에서 확정합니다.",
    limitsTitle: "예약 보장과 환불",
    limits: [
      guarantee.ko,
      guaranteeLate.ko,
      "티켓이 발권된 뒤의 변경과 취소는 관광지 자체 규칙을 따르며, 해당 티켓의 수수료는 환불되지 않습니다.",
      "입장 여부는 관광지가 정합니다. 예약에 쓴 여권 원본, 보안 검색, 예약 시간대가 필요합니다.",
    ],
    complianceTitle: "예약 원칙",
    compliance: [
      "관광지가 안내하는 공식 채널만 사용합니다.",
      "각 여행자 본인의 실명과 여권으로만 예약합니다.",
      "매크로, 여러 계정, 티켓 선점은 쓰지 않습니다.",
      "티켓을 되팔지 않으며 입장료에 금액을 더하지 않습니다.",
      "입장료는 관광지 공식 가격 그대로 받으며, 관광지의 실명 확인과 취소 규칙이 그대로 적용됩니다.",
    ],
    passportTitle: "여권 정보",
    passportBody:
      "이 페이지의 요청 양식은 여권 번호를 묻지 않습니다. 서면 확인을 수락하신 뒤에만 이메일, WhatsApp 또는 카카오톡으로 여권 정보를 요청합니다. 예약에만 사용하고, 관광지의 예약 채널에만 전달하며, 여행이 끝나면 삭제합니다.",
    privacyLink: "개인정보 안내",
    termsLink: "이용약관",
    refundLink: "환불 및 제공",
    rulesTitle: "관광지별 예약 규칙",
    rulesIntro:
      `출처 가이드가 있는 행은 날짜가 표시된 저희 가이드가 관광지 공식 자료에서 확인한 내용이며, ‘미확인’으로 표시된 행은 아직 가이드가 없습니다. 규칙은 바뀌므로 확정 전에 여행 날짜 기준으로 다시 확인합니다. ${days}일 전 예약 보장은 저희가 예약하는 모든 관광지에 적용됩니다.`,
    columns: {
      attraction: "관광지",
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
    },
    bestEffortTag: "최선 시도, 보장 안 됨",
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
    cities: { beijing: "베이징", shanghai: "상하이", suzhou: "쑤저우", hangzhou: "항저우", xian: "시안", chengdu: "청두", guilin: "계림", lijiang: "리장", datong: "다퉁" },
    unknown: "문의 시 확인",
    notApplicable: "해당 없음: 예약 없이 입장",
    notChecked: "미확인",
    yes: "예",
    no: "아니요",
    free: "무료, 예약 필요",
    freeWalkIn: "무료, 예약 불필요",
    sourceLabel: "출처 가이드",
    scrollHint: "표를 옆으로 밀어 모든 열을 확인하세요.",
    reserveThis: "이 관광지 예약 요청",
    unknownLegend: "표에서 —로 표시된 항목은 문의하실 때 여행 날짜 기준으로 확인합니다.",
    attractionCount: { one: "관광지 {count}곳", other: "관광지 {count}곳" },
    faqTitle: "관광지 예약 대행 자주 묻는 질문",
    faqs: [
      { question: "관광지 예약 대행 비용은 얼마인가요?", answer: "관광지당 1인 {fee} 수수료와 관광지 공식 입장료입니다. 입장료에 금액을 더하지 않으며, 서면 확인 후 함께 결제합니다. Homeground 프라이빗 투어 일정의 관광지 예약은 수수료가 없습니다." },
      { question: "자금성도 예약해 주나요?", answer: `네. 고궁박물원 공식 채널에서 방문자 본인의 여권 실명으로 예약을 제출합니다. 예약은 7일 전 중국 시간 20:00에 열리고 당일권은 없으니 일찍 알려 주세요. 방문일 최소 ${days}일 전까지 요청과 결제를 마치시면 예약을 보장하며, 만약 예약하지 못하면 수수료와 입장료를 전액 환불해 드립니다. 표를 되팔거나 금액을 더하지 않고 입장료는 공식 가격 그대로 받으며, 박물원의 실명 확인과 취소 규칙이 그대로 적용됩니다.` },
      { question: "산시역사박물관도 예약해 주나요?", answer: "네. 박물관 공식 위챗 시스템에서 본인 여권 실명으로 예약합니다. 기본 관람은 무료이므로 예약 업무 수수료만 내시면 되고, 당대 벽화관을 더하면 그 입장권을 공식 가격으로 따로 냅니다. 저희는 표를 되팔지 않으며, 가이드를 보고 직접 예약하셔도 됩니다. 노쇼 시 180일 동안 예약이 제한되니 일정이 바뀌면 빨리 알려 주세요." },
      { question: "예약이 보장되나요?", answer: `방문일 최소 ${days}일 전까지 요청과 결제를 마치시면 예약을 보장합니다. 만약 예약하지 못하면 해당 관광지의 수수료와 입장료를 전액 환불해 드립니다. 그보다 늦으면 예약을 시도하되 보장하지는 않으며, 예약하지 못하면 해당 관광지 수수료 전액과 사용하지 않은 입장료를 환불합니다.` },
      { question: "왜 양식에 여권 번호를 적지 않나요?", answer: "잔여분 확인에는 여권 번호가 필요 없기 때문입니다. 서면 확인을 수락하신 뒤에만 여권 정보를 받고, 예약에만 쓰며, 여행이 끝나면 삭제합니다." },
      { question: "발권 후에도 취소할 수 있나요?", answer: "발권 후 취소와 변경은 관광지 자체 규칙을 따르고, 발권된 티켓의 수수료는 환불되지 않습니다. 노쇼 시 이후 예약을 제한하는 관광지도 있으니 일정이 바뀌면 빨리 알려 주세요." },
      { question: "입장할 때도 여권이 필요한가요?", answer: "네. 실명제 관광지는 예약에 쓴 여권 원본을 확인합니다. 여권 사진이나 사본으로는 대신할 수 없습니다." },
    ],
    enquiry: {
      eyebrow: "예약 요청",
      title: "예약할 내용을 알려 주세요",
      intro: `카카오톡, WhatsApp, 이메일 중 하나를 고르기 전에는 아무것도 전송되지 않습니다. 선택한 내용이 메시지에 들어가 플래너가 바로 확인합니다. 첫 방문일 최소 ${days}일 전까지 보내고 결제하시면 예약을 보장합니다.`,
      attractions: "관광지",
      attractionsHint: "여러 곳을 고를 수 있어요. 고른 뒤 아래에서 관광지마다 날짜를 정해 주세요.",
      visitDates: "방문일",
      visitDatesHint: "입장권은 하루 단위로 예약돼요. 관광지마다 방문할 날짜를 하나씩 골라 주세요.",
      visitDatesEmpty: "위에서 관광지를 고르면 방문일을 고를 수 있어요.",
      undecided: "날짜 미정",
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
      summaryTitle: "요청 내용",
      summaryFee: "예상 수수료",
      summaryPickDate: "날짜 고르기",
      summaryPeople: { one: "{n}명", other: "{n}명" },
      added: "요청에 추가했습니다: {name}",
      summaryAttractions: { one: "{n}곳", other: "{n}곳" },
      summaryNote: "서면 확인을 받은 뒤에만 결제합니다. Homeground 프라이빗 투어 일정의 관광지는 수수료가 없습니다.",
      kakaoAction: "카카오톡으로 보내기",
      whatsappShort: "WhatsApp",
      emailShort: "이메일",
      message: {
        opening: "안녕하세요. Homeground에 중국 관광지 예약 대행을 요청하고 싶습니다.",
        service: "서비스",
        serviceValue: "관광지 예약 대행",
        city: "도시",
        attractions: "관광지",
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
      body: `되판 표가 아니라 공식 시스템에서 본인 여권 실명으로 직접 예약을 제출합니다. 1인 {fee} 수수료와 공식 입장료는 결제 전에 서면으로 확인합니다. 방문일 최소 ${days}일 전까지 요청과 결제를 마치시면 예약을 보장합니다.`,
      bodyPassportUnchecked: `결제 전에 공식 시스템이 해당 날짜에 여권을 받는지 확인하고 서면으로 안내합니다. 되판 표는 다루지 않으며, 1인 {fee} 수수료와 공식 입장료가 듭니다. 방문일 최소 ${days}일 전까지 요청과 결제를 마치시면 예약을 보장합니다.`,
      bodyBestEffort: `이 항목은 최선 시도이며 보장하지 않습니다. 공식 채널에서 본인 명의로 시도하며 1인 {fee} 수수료와 공식 입장료가 들고 결제 전에 서면으로 확인합니다. 예약하지 못하면 둘 다 전액 환불합니다.`,
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
