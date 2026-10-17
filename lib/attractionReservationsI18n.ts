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
  en: `Guaranteed booking: send your request and payment at least ${days} days before your visit and we guarantee the reservation. If we ever miss one, you get a full refund of that attraction's service fee and ticket money.`,
  zh: `预约保证：在参观日前至少 ${days} 天提交需求并完成付款，我们保证约到；万一没约到，全额退还该景点的服务费和门票款。`,
  ko: `예약 보장: 방문일 최소 ${days}일 전까지 요청과 결제를 마치시면 예약을 보장합니다. 만약 예약하지 못하면 해당 관광지의 수수료와 입장료를 전액 환불해 드립니다.`,
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
  /** A guide referral starts with its already-selected attraction; the full list opens from "add". */
  selectedAttractions: string;
  addAttractions: string;
  removeAttraction: string;
  removeLabel: string;
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
  heroPain: string;
  /** Attraction release windows stay separate from the guarantee lead time. */
  heroUrgency: string;
  heroFacts: readonly { label: string; value: string }[];
  guaranteeTitle: string;
  /** The booking guarantee and full-refund terms. */
  guarantee: string;
  /** The rule for requests later than the guarantee lead time. */
  guaranteeLate: string;
  heroCta: string;
  /** One consistent next step after each sales section. */
  sectionCta: string;
  tableCta: string;
  timingTitle: string;
  timingRows: readonly { title: string; body: string }[];
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
    /** Beside the large per-person fee: "per person, plus the official ticket price". */
    feeUnit: string;
    /** For an attraction whose guide confirms the official system accepts passports. */
    body: string;
    /** For an attraction whose passport handling online is not confirmed. */
    bodyPassportUnchecked: string;
    action: string;
  };
  hubLink: string;
}

const copy: Record<HomegroundLocale, AttractionReservationCopy> = {
  en: {
    metadata: {
      title: "China Attraction Ticket Booking Service for Foreigners",
      description:
        "China's hard-to-book tickets, arranged for you. {fee} per person per attraction, plus face-value tickets. Written confirmation before payment.",
    },
    breadcrumb: "Breadcrumb",
    home: "Home",
    services: "All services",
    navLabel: "Attraction reservations",
    eyebrow: "Beijing · Shanghai · Suzhou · Hangzhou · Xi'an · Chengdu · Guilin · Lijiang · Datong",
    h1: "China's hardest tickets, booked for you",
    lede:
      "Keep your China itinerary on track. We book the Forbidden City, museums and other attractions in your own passport name.",
    heroPain: "No Chinese phone number, no WeChat, no racing the 20:00 release.",
    heroUrgency: `Book as soon as your dates are set. The Forbidden City opens tickets only 7 days ahead, at 20:00 China time, and popular dates go fast. Contact us less than a week before and tickets for your day may already be gone. For our booking guarantee, request and pay at least ${days} days ahead.`,
    heroFacts: [
      { label: "Service fee", value: "{fee} per person per attraction" },
      { label: "Tickets", value: "Official face value, no mark-up" },
    ],
    guaranteeTitle: "Guaranteed, or your money back",
    guarantee: guarantee.en,
    guaranteeLate: guaranteeLate.en,
    heroCta: "Send us your dates on WhatsApp",
    sectionCta: "Send us your dates on WhatsApp",
    tableCta: "See when tickets open",
    timingTitle: "When to contact us",
    timingRows: [
      { title: "As soon as your dates are fixed", body: "We prepare your request before tickets open, ready to book when they are released." },
      { title: `At least ${days} days before your visit`, body: guarantee.en },
      { title: `Less than ${days} days before your visit`, body: `The release for your date may have passed. ${guaranteeLate.en}` },
    ],
    whatTitle: "Why these tickets are hard to book",
    whatBody: [
      "Some booking systems need a Chinese phone number or WeChat account. Chinese-only apps and real-name passport details add more steps before you can reserve.",
      "Tickets open at fixed Beijing-time releases, and popular dates go fast. Waiting until you arrive can mean missing the attraction you came to see.",
      "Send us your dates early. We handle the booking system, passport details and release time for you.",
    ],
    forTitle: "Keep your plans. Leave the booking to us.",
    forItems: [
      "A licensed Beijing travel agency handles your booking: licence L-BJ10587.",
      "Your reservation goes through the attraction's own booking channel, in each traveller's own passport name.",
      "You pay the ticket's face value, with no mark-up or resale.",
      "You receive the booking details and full price in writing before you pay.",
    ],
    stepsTitle: "How it works",
    steps: [
      { title: "1. Send your dates", body: "Tell us your attractions, visit dates and number of travellers on WhatsApp or email. Keep passport details out of the first message." },
      { title: "2. Get your written quote", body: "We check the booking window and availability, then confirm your booking plan, service fee, face-value tickets and payment instructions in writing." },
      { title: "3. Pay, then leave it to us", body: "After payment, we collect the passport details, submit your reservations and send the booking records. Bring the same original passports on the day." },
    ],
    pricingTitle: "A small fee to keep a big day on track",
    pricingLead: "CNY 45 per person per attraction, plus the ticket's face value. Plan the booking before a missed release costs you your Forbidden City visit or a day of your trip. You pay only after our written confirmation.",
    pricing: [
      { title: "{fee} per person per attraction", body: "The service fee for each traveller at each attraction we reserve. A free-admission museum still carries the fee, because the work is the reservation." },
      { title: "Tickets at official face value", body: "Admission is charged at the attraction's own price with no mark-up and paid together with the fee. Where the table shows no price, it is confirmed when you enquire." },
      { title: "Included for private-tour guests", body: "If you book a Homeground private tour, reservations for the attractions in that itinerary are included at no extra fee." },
    ],
    currencyNote: "The fee is shown in USD, converted from CNY 45. We confirm the payment currency, exchange rate and total in your written confirmation before you pay.",
    limitsTitle: "Your booking guarantee and refund terms",
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
    rulesTitle: "Know when your tickets open",
    rulesIntro:
      "Start with the release time, then send us your visit date. The rules below come from our dated source guides where listed. We recheck the current rule for your dates before the written confirmation.",
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
    notChecked: "We confirm the rule for your date",
    yes: "Yes",
    no: "No",
    free: "Free, reservation required",
    freeWalkIn: "Free, no reservation",
    sourceLabel: "Source guide",
    scrollHint: "Scroll the table sideways to see every column.",
    reserveThis: "Book this attraction with us",
    unknownLegend: "A dash (—) in the table means we check that rule for your travel dates when you contact us.",
    attractionCount: { one: "{count} attraction", other: "{count} attractions" },
    faqTitle: "Before you book",
    faqs: [
      { question: "How much does it cost?", answer: "{fee} per person per attraction, plus face-value tickets with no mark-up. Pay both together after written confirmation. Attractions in a Homeground private-tour itinerary carry no extra service fee. Send us your dates for a quote." },
      { question: "Can you book the Forbidden City?", answer: "Yes, in your own passport name through the Palace Museum's booking channel. Tickets open 7 days ahead at 20:00 China time; there are no same-day tickets. Send us your visit date before tickets open." },
      { question: "Can you book the Shaanxi History Museum?", answer: "Yes, through its WeChat system in your own passport name. Basic admission is free; our service fee applies. The Tang mural gallery costs extra at face value. A no-show brings a 180-day booking restriction. Send us your date and the galleries you want." },
      { question: "Is my booking guaranteed?", answer: `${guarantee.en} ${guaranteeLate.en} Send us your dates to check the timing.` },
      { question: "When do I send passport details?", answer: "After you accept our written confirmation. We use them only for the reservation and delete them after your trip. Send us your dates first; no passport number is needed in the form." },
      { question: "Can I cancel after tickets are issued?", answer: "Changes and cancellations follow the attraction's rules. The service fee for an issued ticket is not refundable. Some attractions restrict future bookings after a no-show. Tell us as soon as your plans change." },
      { question: "What do I bring on the day?", answer: "Bring the original passport used for the booking. A photo or copy cannot replace it at real-name entry checks. Send us your dates and we will confirm the entry details with your booking." },
    ],
    enquiry: {
      eyebrow: "Reservation request",
      title: "Let's get your tickets arranged",
      intro: "Choose your attractions and dates, then send us the request. We check your booking plan and quote before you pay. Nothing is sent until you press send in WhatsApp or email.",
      attractions: "Attractions",
      attractionsHint: "Choose as many as you like; you will pick a date for each one below.",
      selectedAttractions: "Your tickets",
      addAttractions: "Add another attraction",
      removeAttraction: "Remove {name}",
      removeLabel: "Remove",
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
        opening: "Hi Homeground, I'd like you to book these attraction tickets for my trip. Please check my dates and send me the booking details and total price.",
        service: "Service",
        serviceValue: "Attraction reservation",
        city: "City",
        attractions: "Attractions",
        datesUndecided: "not decided yet",
        travellers: "Travellers",
        note: "Note",
        none: "not chosen yet",
        subject: "Please arrange my China attraction tickets",
      },
    },
    guideCta: {
      label: "Attraction reservation service",
      title: "Get {attraction} booked for your trip",
      feeUnit: "per person, plus the official ticket price",
      body: `Send your dates before tickets open. We book in your own passport name and confirm the details in writing before you pay. Request and pay at least ${days} days ahead for a guaranteed booking.`,
      bodyPassportUnchecked: `Send your dates early. We check passport acceptance and the booking rule, then confirm in writing before you pay. Request and pay at least ${days} days ahead for a guaranteed booking.`,
      action: "Send us your dates",
    },
    hubLink: "Attraction reservations in {city}",
  },
  zh: {
    metadata: {
      title: "外国游客代预约故宫、兵马俑与博物馆门票",
      description:
        `中国难约的景点门票，Homeground 用你本人的护照实名预约。每人每个景点服务费 {fee}，另付票面价门票。在参观日前至少 ${days} 天提交需求并付款，即享预约保证。`,
    },
    breadcrumb: "当前位置",
    home: "首页",
    services: "服务总览",
    navLabel: "景点代预约",
    eyebrow: "北京 · 上海 · 苏州 · 杭州 · 西安 · 成都 · 桂林 · 丽江 · 大同",
    h1: "中国难约的景点门票，交给我们来订",
    lede:
      "让中国行程按计划走。故宫、博物馆和其他景点，我们用你本人的护照实名预约。",
    heroPain: "不用中国手机号，不用微信，也不用守着 20:00 放票。",
    heroUrgency: `日期一定就来订。故宫只提前 7 天、北京时间 20:00 放票，热门日期很快就没了。离参观不到一周才找我们，你那天的票可能已经没有了。想享受预约保证，请在参观日前至少 ${days} 天提交需求并完成付款。`,
    heroFacts: [
      { label: "服务费", value: "每人每个景点 {fee}" },
      { label: "门票", value: "按官方票面价，不加价" },
    ],
    guaranteeTitle: "保证约到，约不到就全额退款",
    guarantee: guarantee.zh,
    guaranteeLate: guaranteeLate.zh,
    heroCta: "通过 WhatsApp 告诉我们日期",
    sectionCta: "通过 WhatsApp 告诉我们日期",
    tableCta: "查看各景点放票时间",
    timingTitle: "什么时候联系我们",
    timingRows: [
      { title: "日期一确定就联系", body: "我们在放票前准备好预约资料，等名额开放就可以提交。" },
      { title: `距参观日至少 ${days} 天`, body: guarantee.zh },
      { title: `距参观日不足 ${days} 天`, body: `你参观那天的放票时间可能已过。${guaranteeLate.zh}` },
    ],
    whatTitle: "这些门票为什么难订",
    whatBody: [
      "有些预约系统需要中国手机号或微信账号。只有中文的应用，加上护照实名登记，让预约多了好几道步骤。",
      "景点按固定的北京时间放票，热门日期很快就没了。等到抵达中国再订，可能就去不成原本想看的景点。",
      "尽早把日期告诉我们，预约系统、护照信息和放票时间都由我们来处理。",
    ],
    forTitle: "行程照你的计划，预约交给我们",
    forItems: [
      "由持证北京旅行社为你办理，旅行社许可证号 L-BJ10587。",
      "通过景点自己公布的预约渠道，用每位游客本人的护照实名预约。",
      "门票按票面价收取，不加价、不转售。",
      "付款前收到书面预约方案和完整报价，确认清楚再付款。",
    ],
    stepsTitle: "流程",
    steps: [
      { title: "1. 告诉我们日期", body: "通过 WhatsApp 或邮件，把景点、参观日期和人数发给我们。第一条消息不用提供护照信息。" },
      { title: "2. 收到书面报价", body: "我们核实预约时间和余量，书面确认预约方案、服务费、票面价和付款方式。" },
      { title: "3. 付款后交给我们", body: "收款后再收集护照信息，提交预约，并把预约记录发给你。当天携带预约所用的护照原件。" },
    ],
    pricingTitle: "花一笔服务费，提前安排好重要的一天",
    pricingLead: "每人每个景点人民币 45 元，另付票面价门票。提前安排预约，别让错过放票打乱故宫之行或一天的行程。收到我们的书面确认后才付款。",
    pricing: [
      { title: "每人每个景点 {fee}", body: "我们为每位游客预约每个景点收取的服务费。免费预约的博物馆同样收取服务费，因为我们提供的是预约服务。" },
      { title: "门票按官方票面价", body: "门票按景点官方价格收取，不加价，与服务费一起支付。表中未列价格的，在你咨询时确认。" },
      { title: "私家团客人免服务费", body: "预订 Homeground 私家团的客人，行程内景点的预约不另收服务费。" },
    ],
    currencyNote: "服务费以人民币计；如需以其他币种付款，币种与汇率在付款前的书面确认中说明。",
    limitsTitle: "你的预约保证与退款规则",
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
    rulesTitle: "先看你的门票何时开订",
    rulesIntro:
      "先看放票时间，再把参观日期发给我们。列出来源攻略的规则来自该攻略注明日期时的核实结果；书面确认前，我们会按你的日期重新核实。",
    columns: {
      attraction: "景点",
      channel: "官方渠道",
      passport: "可用护照",
      release: "何时放票",
      realName: "实名",
      price: "票面价",
      notes: "说明",
      verified: "核实日期",
    },
    status: {
      offered: "可代预约",
      "not-needed": "无需预约",
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
    cities: { beijing: "北京", shanghai: "上海", suzhou: "苏州", hangzhou: "杭州", xian: "西安", chengdu: "成都", guilin: "桂林", lijiang: "丽江", datong: "大同" },
    unknown: "咨询时确认",
    notApplicable: "不适用：免预约入馆",
    notChecked: "按你的日期核实规则",
    yes: "是",
    no: "否",
    free: "免费，需预约",
    freeWalkIn: "免费，无需预约",
    sourceLabel: "来源攻略",
    scrollHint: "左右滑动表格可查看全部列。",
    reserveThis: "请我们预约这个景点",
    unknownLegend: "表中以 — 标出的项目，会在你咨询时按出行日期确认。",
    attractionCount: { one: "{count} 个景点", other: "{count} 个景点" },
    faqTitle: "预约前想了解的事",
    faqs: [
      { question: "怎么收费？", answer: "每人每个景点服务费 {fee}，另付票面价门票，不加价。两项费用在书面确认后一起支付。Homeground 私家团行程内的景点免预约服务费。把日期发给我们，获取报价。" },
      { question: "可以代约故宫吗？", answer: "可以，通过故宫自己的预约渠道，用你本人的护照实名预约。故宫提前 7 天、北京时间 20:00 放票，不售当日票。请在放票前把参观日期发给我们。" },
      { question: "可以代约陕西历史博物馆吗？", answer: "可以，通过博物馆微信系统，用你本人的护照实名预约。基本陈列免费，收取预约服务费；唐代壁画珍品馆另按票面价收费。爽约会被限制预约 180 天。请告诉我们参观日期和想看的展馆。" },
      { question: "预约有保证吗？", answer: `${guarantee.zh}${guaranteeLate.zh}把日期发给我们，先确认是否来得及。` },
      { question: "什么时候提供护照信息？", answer: "接受书面确认后再提供。信息只用于预约，行程结束后删除。先把日期发给我们，表单里不用填护照号码。" },
      { question: "出票后还能取消吗？", answer: "改期和退票按景点自己的规则处理，已出票门票的服务费不予退还。有些景点对爽约会限制之后的预约。行程有变，请尽早告诉我们。" },
      { question: "参观当天要带什么？", answer: "带上预约所用的护照原件。实名入园不能用护照照片或复印件代替。把日期发给我们，我们会随预约一起确认入园要求。" },
    ],
    enquiry: {
      eyebrow: "代预约需求",
      title: "把门票提前安排好",
      intro: "选好景点和日期，把需求发给我们。我们先核实预约方案和报价，你确认后再付款。在 WhatsApp 或邮件里按下发送前，什么都不会发出。",
      attractions: "景点",
      attractionsHint: "可多选。选好后，在下方为每个景点选日期。",
      selectedAttractions: "已选门票",
      addAttractions: "再加一个景点",
      removeAttraction: "移除{name}",
      removeLabel: "移除",
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
        opening: "你好 Homeground，我想请你们安排这趟旅行的景点门票。请核实以下日期，并发给我预约方案和总报价。",
        service: "服务",
        serviceValue: "景点代预约",
        city: "城市",
        attractions: "景点",
        datesUndecided: "还没确定",
        travellers: "人数",
        note: "备注",
        none: "尚未选择",
        subject: "请安排我的中国景点门票",
      },
    },
    guideCta: {
      label: "景点代预约服务",
      title: "把{attraction}的门票提前订好",
      feeUnit: "/人，另付官方票价",
      body: `放票前把日期发给我们。我们用你本人的护照实名预约，付款前书面确认。参观日前至少 ${days} 天提交需求并付款，保证约到。`,
      bodyPassportUnchecked: `尽早把日期发给我们。我们核实护照能否使用及预约规则，付款前书面确认。参观日前至少 ${days} 天提交需求并付款，保证约到。`,
      action: "告诉我们参观日期",
    },
    hubLink: "{city}景点代预约",
  },
  ko: {
    metadata: {
      title: "외국인 자금성·병마용·중국 박물관 예약 대행",
      description:
        `예약하기 까다로운 중국 관광지 입장권을 본인 여권 실명으로 예약해 드립니다. 관광지당 1인 {fee}와 입장권 정가. 방문일 최소 ${days}일 전까지 요청과 결제를 마치시면 예약을 보장합니다.`,
    },
    breadcrumb: "현재 위치",
    home: "홈",
    services: "전체 서비스",
    navLabel: "관광지 예약 대행",
    eyebrow: "베이징 · 상하이 · 쑤저우 · 항저우 · 시안 · 청두 · 계림 · 리장 · 다퉁",
    h1: "예약하기 까다로운 중국 입장권, 저희가 예약해 드립니다",
    lede:
      "중국 여행을 계획대로 즐기세요. 자금성, 박물관과 다른 관광지 입장권을 여행자 본인의 여권 실명으로 예약해 드립니다.",
    heroPain: "중국 전화번호도, 위챗도, 20:00 오픈 시간에 맞춰 기다릴 필요도 없습니다.",
    heroUrgency: `날짜가 정해지면 바로 예약을 맡겨 주세요. 자금성은 방문 7일 전 중국 시간 20:00에 예약이 열리고, 인기 날짜는 빠르게 마감됩니다. 방문까지 일주일도 남지 않았을 때 연락하시면 그날 입장권이 이미 없을 수 있습니다. 예약 보장을 받으려면 방문일 최소 ${days}일 전까지 요청과 결제를 마쳐 주세요.`,
    heroFacts: [
      { label: "수수료", value: "관광지당 1인 {fee}" },
      { label: "입장료", value: "공식 가격 그대로, 추가 금액 없음" },
    ],
    guaranteeTitle: "예약 보장, 못 구하면 전액 환불",
    guarantee: guarantee.ko,
    guaranteeLate: guaranteeLate.ko,
    heroCta: "WhatsApp으로 날짜 보내기",
    sectionCta: "WhatsApp으로 날짜 보내기",
    tableCta: "입장권 오픈 일정 보기",
    timingTitle: "언제 연락하면 되나요?",
    timingRows: [
      { title: "날짜가 정해지는 즉시", body: "예약이 열리기 전에 필요한 내용을 준비해, 오픈할 때 바로 신청할 수 있도록 합니다." },
      { title: `방문일 최소 ${days}일 전`, body: guarantee.ko },
      { title: `방문까지 ${days}일 미만`, body: `방문 날짜의 예약 오픈이 이미 지났을 수 있습니다. ${guaranteeLate.ko}` },
    ],
    whatTitle: "중국 입장권, 왜 예약이 어려울까요?",
    whatBody: [
      "일부 예약 시스템은 중국 전화번호나 위챗 계정을 요구합니다. 중국어로만 된 앱과 여권 실명 등록까지, 예약 전에 거쳐야 할 단계가 많습니다.",
      "예약은 정해진 베이징 시간에 열리고 인기 날짜는 빠르게 마감됩니다. 중국에 도착한 뒤 예약하려다 꼭 가고 싶던 곳을 놓칠 수 있습니다.",
      "날짜를 일찍 보내 주세요. 예약 시스템, 여권 정보와 오픈 시간은 저희가 챙깁니다.",
    ],
    forTitle: "일정은 원하는 대로, 예약은 저희에게",
    forItems: [
      "베이징의 허가받은 여행사가 예약을 맡습니다. 여행업 허가번호 L-BJ10587.",
      "관광지가 직접 안내한 예약 채널에서 일행 각자의 여권 실명으로 예약합니다.",
      "입장권은 정가 그대로이며, 추가 금액을 붙이거나 되팔지 않습니다.",
      "결제 전에 예약 내용과 전체 가격을 서면으로 받아 확인할 수 있습니다.",
    ],
    stepsTitle: "진행 방식",
    steps: [
      { title: "1. 날짜 보내기", body: "관광지, 방문일, 인원을 카카오톡, WhatsApp 또는 이메일로 보내 주세요. 첫 메시지에는 여권 정보를 보내지 마세요." },
      { title: "2. 서면 견적 확인", body: "예약 가능 기간과 잔여분을 확인한 뒤, 예약 계획, 수수료, 입장권 정가와 결제 방법을 서면으로 안내합니다." },
      { title: "3. 결제 후 맡기기", body: "결제 후 여권 정보를 받아 예약을 신청하고 예약 기록을 보내 드립니다. 방문 당일에는 예약에 쓴 여권 원본을 지참하세요." },
    ],
    pricingTitle: "중요한 하루를 위한 작은 예약 수수료",
    pricingLead: "관광지당 1인 45위안과 입장권 정가입니다. 예약 오픈을 놓쳐 자금성 방문이나 하루 일정을 포기하지 않도록 미리 준비하세요. 서면 확인을 받은 뒤에만 결제합니다.",
    pricing: [
      { title: "관광지당 1인 {fee}", body: "예약하는 관광지마다 여행자 1인당 받는 수수료입니다. 무료 예약 박물관도 예약 업무이므로 수수료가 있습니다." },
      { title: "입장료는 공식 가격 그대로", body: "입장료는 관광지 공식 가격 그대로 받으며 추가 금액이 없고, 수수료와 함께 결제합니다. 표에 가격이 없는 곳은 문의 시 확인합니다." },
      { title: "프라이빗 투어 고객은 무료", body: "Homeground 프라이빗 투어를 예약하시면 일정에 포함된 관광지 예약은 수수료 없이 진행합니다." },
    ],
    currencyNote: "원화 금액은 45위안을 환산한 참고 금액입니다. 결제 통화와 적용 환율은 결제 전 서면 확인에서 확정합니다.",
    limitsTitle: "예약 보장과 환불 조건",
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
    rulesTitle: "입장권이 언제 열리는지 확인하세요",
    rulesIntro:
      "오픈 시간을 먼저 확인한 뒤 방문일을 보내 주세요. 출처 가이드가 있는 규칙은 해당 가이드에 적힌 확인일 기준입니다. 서면 확인 전에 여행 날짜에 맞는 현재 규칙을 다시 확인합니다.",
    columns: {
      attraction: "관광지",
      channel: "공식 채널",
      passport: "여권 사용",
      release: "입장권 오픈 시간",
      realName: "실명",
      price: "입장료",
      notes: "참고",
      verified: "확인일",
    },
    status: {
      offered: "예약 가능",
      "not-needed": "예약 불필요",
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
    cities: { beijing: "베이징", shanghai: "상하이", suzhou: "쑤저우", hangzhou: "항저우", xian: "시안", chengdu: "청두", guilin: "계림", lijiang: "리장", datong: "다퉁" },
    unknown: "문의 시 확인",
    notApplicable: "해당 없음: 예약 없이 입장",
    notChecked: "방문 날짜에 맞춰 확인해 드립니다",
    yes: "예",
    no: "아니요",
    free: "무료, 예약 필요",
    freeWalkIn: "무료, 예약 불필요",
    sourceLabel: "출처 가이드",
    scrollHint: "표를 옆으로 밀어 모든 열을 확인하세요.",
    reserveThis: "이 관광지 예약 맡기기",
    unknownLegend: "표에서 —로 표시된 항목은 문의하실 때 여행 날짜 기준으로 확인합니다.",
    attractionCount: { one: "관광지 {count}곳", other: "관광지 {count}곳" },
    faqTitle: "예약 전에 궁금한 점",
    faqs: [
      { question: "비용은 얼마인가요?", answer: "관광지당 1인 {fee}와 입장권 정가이며, 입장료에 금액을 더하지 않습니다. 서면 확인 후 함께 결제합니다. Homeground 프라이빗 투어 일정의 관광지는 예약 수수료가 없습니다. 날짜를 보내 주시면 견적을 안내해 드립니다." },
      { question: "자금성도 예약해 주나요?", answer: "네. 고궁박물원 예약 채널에서 본인 여권 실명으로 예약합니다. 방문 7일 전 중국 시간 20:00에 열리며 당일권은 없습니다. 예약이 열리기 전에 방문일을 보내 주세요." },
      { question: "산시역사박물관도 예약해 주나요?", answer: "네. 박물관 위챗 시스템에서 본인 여권 실명으로 예약합니다. 기본 관람은 무료이며 예약 수수료가 있고, 당대 벽화관은 입장권 정가가 추가됩니다. 노쇼 시 180일간 예약이 제한됩니다. 방문일과 보고 싶은 전시관을 알려 주세요." },
      { question: "예약이 보장되나요?", answer: `${guarantee.ko} ${guaranteeLate.ko} 날짜를 보내 주시면 예약 시점을 확인해 드립니다.` },
      { question: "여권 정보는 언제 보내나요?", answer: "서면 확인을 수락하신 뒤에 보내시면 됩니다. 예약에만 사용하고 여행이 끝나면 삭제합니다. 날짜부터 보내 주세요. 요청 양식에는 여권 번호가 필요 없습니다." },
      { question: "발권 후에도 취소할 수 있나요?", answer: "변경과 취소는 관광지 규칙을 따르며, 발권된 티켓의 수수료는 환불되지 않습니다. 노쇼 시 이후 예약을 제한하는 관광지도 있습니다. 일정이 바뀌면 바로 알려 주세요." },
      { question: "방문 당일에는 무엇을 가져가나요?", answer: "예약에 쓴 여권 원본을 지참하세요. 실명 입장 확인 시 사진이나 사본으로 대신할 수 없습니다. 날짜를 보내 주시면 예약과 함께 입장 안내를 확인해 드립니다." },
    ],
    enquiry: {
      eyebrow: "예약 요청",
      title: "입장권 예약을 미리 준비하세요",
      intro: "관광지와 날짜를 고른 뒤 요청을 보내 주세요. 예약 계획과 견적을 확인한 뒤 결제합니다. 카카오톡, WhatsApp, 이메일에서 보내기를 누르기 전에는 전송되지 않습니다.",
      attractions: "관광지",
      attractionsHint: "여러 곳을 고를 수 있어요. 고른 뒤 아래에서 관광지마다 날짜를 정해 주세요.",
      selectedAttractions: "선택한 입장권",
      addAttractions: "관광지 추가",
      removeAttraction: "{name} 빼기",
      removeLabel: "빼기",
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
        opening: "안녕하세요, Homeground. 이번 여행의 관광지 입장권 예약을 부탁드립니다. 아래 날짜를 확인하시고 예약 내용과 총금액을 안내해 주세요.",
        service: "서비스",
        serviceValue: "관광지 예약 대행",
        city: "도시",
        attractions: "관광지",
        datesUndecided: "미정",
        travellers: "인원",
        note: "메모",
        none: "아직 선택하지 않음",
        subject: "중국 관광지 입장권 예약을 부탁드립니다",
      },
    },
    guideCta: {
      label: "관광지 예약 대행",
      title: "{attraction} 입장권, 미리 예약하세요",
      feeUnit: "1인당 · 공식 입장료 별도",
      body: `예약이 열리기 전에 날짜를 보내 주세요. 본인 여권 실명으로 예약하며, 결제 전에 서면으로 확인합니다. 방문일 최소 ${days}일 전까지 요청과 결제를 마치시면 예약을 보장합니다.`,
      bodyPassportUnchecked: `날짜를 일찍 보내 주세요. 여권 사용 여부와 예약 규칙을 확인하고, 결제 전에 서면으로 안내합니다. 방문일 최소 ${days}일 전까지 요청과 결제를 마치시면 예약을 보장합니다.`,
      action: "방문 날짜 보내기",
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
