import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { ticketReleaseRules, type TicketReleaseToolAttractionId } from "./ticketReleaseTimes.ts";

/**
 * Copy for the ticket-release tool. `{placeholders}` are filled by
 * fillTicketReleaseCopy. Facts (days, times, fees, check dates) are never
 * typed here: they come from ticketReleaseRules and attractionReservationRules.
 */
export interface TicketReleaseCalculatorCopy {
  attraction: string;
  attractionNames: Record<TicketReleaseToolAttractionId, string>;
  visitDate: string;
  timeZone: string;
  detected: string;
  /** The China zone's name in "{zone} time" phrases. */
  chinaZone: string;
  /** Big line: the release in the chosen zone. */
  leadUpcoming: string;
  leadOnSale: string;
  /** Small line under it, in China time (hidden when the chosen zone is China). */
  chinaLine: string;
  tooLate: Record<TicketReleaseToolAttractionId, string>;
  countdown: string;
  closedDay: string;
  officialLink: string;
  reminder: string;
  googleCalendar: string;
  reminderNote: string;
  reminderTitle: string;
  reminderDescription: string;
  /** The rule in one sentence, under the tool, for the selected attraction. */
  rule: string;
  units: { days: string; hours: string; minutes: string };
  invalidDate: string;
  zones: Record<string, string>;
}

export interface TicketReleaseTimeCopy {
  metadata: { title: string; description: string };
  breadcrumb: string;
  home: string;
  tools: string;
  name: string;
  eyebrow: string;
  h1: string;
  lede: string;
  facts: { release: string; noSameDay: string; checked: string };
  calculator: TicketReleaseCalculatorCopy;
  stepsTitle: string;
  stepsBody: string;
  steps: string[];
  portalLink: string;
  guideLink: string;
  serviceLabel: string;
  serviceTitle: string;
  serviceBody: string;
  serviceAction: string;
  othersTitle: string;
  othersBody: string;
  othersColumns: { attraction: string; release: string; checked: string };
  faqTitle: string;
  faq: { question: string; answer: string }[];
}

const copy: Record<HomegroundLocale, TicketReleaseTimeCopy> = {
  en: {
    metadata: {
      title: "Forbidden City Ticket Release Time in Your Time Zone",
      description: "Forbidden City tickets go on sale at {time} China time, {days} days before your visit. Pick a date to see that moment in your own time zone and set a reminder.",
    },
    breadcrumb: "Breadcrumb",
    home: "Home",
    tools: "Tools",
    name: "Ticket release time",
    eyebrow: "Free tool · Attraction tickets",
    h1: "Forbidden City ticket release time, in your own time zone",
    lede: "Palace Museum tickets go on sale at {time} China time, {days} days before the visit, and there are no same-day tickets. Choose your date: the tool shows that moment in your time zone and can put a reminder in your calendar.",
    facts: {
      release: "On sale {days} days before, {time} China time",
      noSameDay: "No same-day tickets",
      checked: "Rule checked {date}",
    },
    calculator: {
      attraction: "Attraction",
      attractionNames: { "forbidden-city": "Forbidden City (Beijing)", "shaanxi-history-museum": "Shaanxi History Museum (Xi’an)" },
      visitDate: "Visit date",
      timeZone: "Your time zone",
      detected: "this device",
      chinaZone: "China",
      leadUpcoming: "Tickets for {visit} go on sale on {date} at {time} {zone} time.",
      leadOnSale: "Tickets for {visit} went on sale on {date} at {time} {zone} time and may already be fully booked.",
      chinaLine: "That is {date} at {time} China time.",
      tooLate: {
        "forbidden-city": "Tickets for {visit} can no longer be booked: the Palace Museum sells no same-day tickets.",
        "shaanxi-history-museum": "In China, {visit} is today or already past. Check the museum’s official WeChat booking to see whether any places remain.",
      },
      countdown: "Opens in {countdown}.",
      closedDay: "That day is a Monday, when the Palace Museum normally closes except on public holidays. Check the official calendar before you book.",
      officialLink: "Official booking page",
      reminder: "Add a reminder to my calendar",
      googleCalendar: "Add to Google Calendar instead",
      reminderNote: "Your calendar will alert you 10 minutes before tickets open.",
      reminderTitle: "{attraction} tickets open for {visit}",
      reminderDescription: "Tickets for {visit} open at {time} China time. Book only on the official channel: {url}",
      rule: "Tickets for any date go on sale at {time} China time (UTC+8), {days} days earlier. China does not change its clocks, so the time is the same all year.",
      units: { days: "{n} d", hours: "{n} h", minutes: "{n} min" },
      invalidDate: "Choose a valid date.",
      zones: {
        "America/Los_Angeles": "Los Angeles", "America/Chicago": "Chicago", "America/New_York": "New York",
        "America/Toronto": "Toronto", "Europe/London": "London", "Europe/Paris": "Paris", "Asia/Dubai": "Dubai",
        "Asia/Jakarta": "Jakarta", "Asia/Singapore": "Singapore",
        "Asia/Kuala_Lumpur": "Kuala Lumpur", "Asia/Hong_Kong": "Hong Kong", "Asia/Taipei": "Taipei",
        "Asia/Seoul": "Seoul", "Asia/Tokyo": "Tokyo", "Australia/Melbourne": "Melbourne",
        "Australia/Sydney": "Sydney", "Pacific/Auckland": "Auckland",
      },
    },
    stepsTitle: "Be ready when tickets open",
    stepsBody: "Popular dates can go within minutes of release. The booking is real-name, so prepare everything before {time} China time.",
    steps: [
      "Before release day, register on the Palace Museum’s official ticket portal and check that you can sign in.",
      "Have every visitor’s passport details ready, exactly as printed. Each person needs their own reservation, children included.",
      "Sign in a few minutes before {time} China time, then choose your date and the morning or afternoon period.",
      "Save the confirmation for every visitor and carry the same original passports on the day.",
    ],
    portalLink: "Palace Museum official ticket portal",
    guideLink: "Read the full Forbidden City booking guide",
    serviceLabel: "Attraction reservation service",
    serviceTitle: "Can’t be online when tickets open?",
    serviceBody: "We book it for you on the official system in each traveller’s own passport name: {fee} per person per attraction, plus the ticket’s face value with no mark-up. Request and pay at least {leadDays} days before your visit and we guarantee the booking; if we can’t get it, we refund that attraction’s service fee and ticket price in full.",
    serviceAction: "Ask us to book it",
    othersTitle: "Other release times we have checked",
    othersBody: "Release rules change. Recheck the official channel the day before tickets open.",
    othersColumns: { attraction: "Attraction", release: "When tickets open", checked: "Checked" },
    faqTitle: "Forbidden City ticket release questions",
    faq: [
      { question: "What time are Forbidden City tickets released?", answer: "At {time} China time (UTC+8), {days} days before the visit date. Tickets for a Saturday visit, for example, open at {time} on the Saturday before. China does not use daylight saving time, so the release time is the same all year." },
      { question: "Can I buy Forbidden City tickets on the day?", answer: "No. The Palace Museum does not sell same-day tickets, so a visitor without a confirmed reservation cannot enter." },
      { question: "What if tickets for my date are already sold out?", answer: "Look at the other period (morning or afternoon) and at other dates, and plan your Beijing days so the Forbidden City can move. Do not build a day around a ticket you have not confirmed." },
      { question: "Is the Forbidden City open on Mondays?", answer: "It normally closes on Mondays, except on public holidays. Check the official calendar for your date." },
      { question: "Do I need a passport to book?", answer: "Yes. The booking is real-name: enter each visitor’s passport details exactly as printed, and carry the same original passport on the day." },
    ],
  },
  zh: {
    metadata: {
      title: "故宫几点放票？换算成你所在时区的时间",
      description: "故宫门票在参观日前 {days} 天北京时间 {time} 放票。选择参观日期，即可看到对应的本地时间，并把提醒加入日历。",
    },
    breadcrumb: "面包屑导航",
    home: "首页",
    tools: "工具",
    name: "放票时间",
    eyebrow: "免费工具 · 景点门票",
    h1: "故宫放票时间，换算成你所在的时区",
    lede: "故宫博物院门票在参观日前 {days} 天北京时间 {time} 放票，不售当日票。选好日期，工具会显示放票时刻在你所在时区是几点，并可把提醒加入日历。",
    facts: {
      release: "提前 {days} 天，北京时间 {time} 放票",
      noSameDay: "不售当日票",
      checked: "规则核实：{date}",
    },
    calculator: {
      attraction: "景点",
      attractionNames: { "forbidden-city": "故宫博物院（北京）", "shaanxi-history-museum": "陕西历史博物馆（西安）" },
      visitDate: "参观日期",
      timeZone: "你所在的时区",
      detected: "本设备",
      chinaZone: "北京",
      leadUpcoming: "{visit}的门票将于{zone}时间 {date} {time} 开放预约。",
      leadOnSale: "{visit}的门票已于{zone}时间 {date} {time} 开放预约，可能已经约满。",
      chinaLine: "即北京时间 {date} {time}。",
      tooLate: {
        "forbidden-city": "{visit}的门票已无法预约：故宫博物院不售当日票。",
        "shaanxi-history-museum": "按北京时间，{visit}已是今天或已过去。当天是否还有名额，请在陕西历史博物馆官方微信预约系统查看。",
      },
      countdown: "距离放票还有 {countdown}。",
      closedDay: "这天是星期一，故宫博物院通常闭馆（法定节假日除外）。预约前请先查看官方日历。",
      officialLink: "官方预约页面",
      reminder: "把提醒加入日历",
      googleCalendar: "或添加到 Google 日历",
      reminderNote: "日历会在放票前 10 分钟提醒你。",
      reminderTitle: "{attraction}：{visit}的门票即将放出",
      reminderDescription: "{visit}的门票于北京时间 {time} 放出。请只在官方渠道预约：{url}",
      rule: "任一日期的门票都在提前 {days} 天的北京时间 {time}（UTC+8）放出。中国不实行夏令时，全年放票时刻不变。",
      units: { days: "{n} 天", hours: "{n} 小时", minutes: "{n} 分钟" },
      invalidDate: "请选择有效日期。",
      zones: {
        "America/Los_Angeles": "洛杉矶", "America/Chicago": "芝加哥", "America/New_York": "纽约",
        "America/Toronto": "多伦多", "Europe/London": "伦敦", "Europe/Paris": "巴黎", "Asia/Dubai": "迪拜",
        "Asia/Jakarta": "雅加达", "Asia/Singapore": "新加坡",
        "Asia/Kuala_Lumpur": "吉隆坡", "Asia/Hong_Kong": "香港", "Asia/Taipei": "台北",
        "Asia/Seoul": "首尔", "Asia/Tokyo": "东京", "Australia/Melbourne": "墨尔本",
        "Australia/Sydney": "悉尼", "Pacific/Auckland": "奥克兰",
      },
    },
    stepsTitle: "放票前做好准备",
    stepsBody: "热门日期可能在放票后几分钟内约满。预约实行实名制，请在北京时间 {time} 前准备好一切。",
    steps: [
      "放票日之前，在故宫博物院官方票务网站注册，确认能正常登录。",
      "准备好每位游客的护照信息，确保与护照上印的完全一致。每个人都要单独预约，儿童也一样。",
      "北京时间 {time} 前几分钟登录，选择日期和上午或下午时段。",
      "保存每位游客的预约确认，当天携带同一本护照原件。",
    ],
    portalLink: "故宫博物院官方票务网站",
    guideLink: "阅读完整的故宫预约攻略",
    serviceLabel: "景点代预约服务",
    serviceTitle: "放票时没空守着？",
    serviceBody: "我们用每位游客本人的护照信息，在官方系统为你预约：服务费每人每个景点 {fee}，门票按原价，不加价。参观日前至少 {leadDays} 天提交需求并付款，保证约到；万一没约到，全额退还该景点的服务费和门票款。",
    serviceAction: "请我们代约",
    othersTitle: "我们核对过的其他放票时间",
    othersBody: "放票规则会变，请在放票前一天再到官方渠道确认一次。",
    othersColumns: { attraction: "景点", release: "放票规则", checked: "核实日期" },
    faqTitle: "故宫放票常见问题",
    faq: [
      { question: "故宫几点放票？", answer: "参观日前 {days} 天的北京时间 {time}（UTC+8）。例如周六参观，门票在前一个周六 {time} 放出。中国不实行夏令时，全年放票时刻相同。" },
      { question: "故宫能买当天的票吗？", answer: "不能。故宫博物院不售当日门票，没有成功预约就无法进入故宫参观。" },
      { question: "想去的日期已经约满怎么办？", answer: "换个时段（上午或下午）或换个日期看看。北京的行程尽量留出余地，让故宫可以改到别的日子；不要把一整天的安排押在还没约到的门票上。" },
      { question: "故宫周一开放吗？", answer: "除法定节假日外，通常周一闭馆。请查看官方日历确认你的日期。" },
      { question: "预约需要护照吗？", answer: "需要。预约实行实名制：按证件原样填写每位游客的护照信息，当天携带同一本护照原件。" },
    ],
  },
  ko: {
    metadata: {
      title: "자금성 티켓 오픈 시간, 내 시간대로 확인",
      description: "자금성 티켓은 방문 {days}일 전 중국 시간 {time}에 열립니다. 날짜를 고르면 내 시간대의 오픈 시각을 보여 주고 캘린더 알림도 추가할 수 있습니다.",
    },
    breadcrumb: "현재 위치",
    home: "홈",
    tools: "도구",
    name: "티켓 오픈 시간",
    eyebrow: "무료 도구 · 명소 티켓",
    h1: "자금성 티켓 오픈 시간, 내 시간대로 확인",
    lede: "고궁박물원 티켓은 방문 {days}일 전 중국 시간 {time}에 열리며 당일 티켓은 판매하지 않습니다. 날짜를 고르면 그 시각을 내 시간대로 보여 주고 캘린더 알림도 추가할 수 있습니다.",
    facts: {
      release: "{days}일 전 중국 시간 {time} 오픈",
      noSameDay: "당일 티켓 없음",
      checked: "규칙 확인 {date}",
    },
    calculator: {
      attraction: "명소",
      attractionNames: { "forbidden-city": "자금성(베이징)", "shaanxi-history-museum": "산시역사박물관(시안)" },
      visitDate: "방문 날짜",
      timeZone: "내 시간대",
      detected: "이 기기",
      chinaZone: "중국",
      leadUpcoming: "{visit} 티켓은 {zone} 시간 {date} {time}에 열립니다.",
      leadOnSale: "{visit} 티켓은 {zone} 시간 {date} {time}에 이미 열렸으며 마감됐을 수 있습니다.",
      chinaLine: "중국 시간으로는 {date} {time}입니다.",
      tooLate: {
        "forbidden-city": "{visit} 티켓은 더 이상 예약할 수 없습니다. 고궁박물원은 당일 티켓을 판매하지 않습니다.",
        "shaanxi-history-museum": "중국 기준으로 {visit}은 오늘이거나 이미 지났습니다. 남은 자리가 있는지는 박물관 공식 위챗 예약에서 확인하세요.",
      },
      countdown: "오픈까지 {countdown} 남았습니다.",
      closedDay: "이날은 월요일로, 고궁박물원은 공휴일을 제외하고 보통 휴관합니다. 예약 전에 공식 일정을 확인하세요.",
      officialLink: "공식 예약 페이지",
      reminder: "캘린더에 알림 추가",
      googleCalendar: "또는 Google 캘린더에 추가",
      reminderNote: "티켓 오픈 10분 전에 캘린더 알림이 울립니다.",
      reminderTitle: "{attraction} {visit} 티켓 오픈",
      reminderDescription: "{visit} 티켓은 중국 시간 {time}에 열립니다. 공식 채널에서만 예약하세요: {url}",
      rule: "모든 날짜의 티켓은 {days}일 전 중국 시간 {time}(UTC+8)에 열립니다. 중국은 서머타임이 없어 오픈 시각이 일 년 내내 같습니다.",
      units: { days: "{n}일", hours: "{n}시간", minutes: "{n}분" },
      invalidDate: "올바른 날짜를 선택하세요.",
      zones: {
        "America/Los_Angeles": "로스앤젤레스", "America/Chicago": "시카고", "America/New_York": "뉴욕",
        "America/Toronto": "토론토", "Europe/London": "런던", "Europe/Paris": "파리", "Asia/Dubai": "두바이",
        "Asia/Jakarta": "자카르타", "Asia/Singapore": "싱가포르",
        "Asia/Kuala_Lumpur": "쿠알라룸푸르", "Asia/Hong_Kong": "홍콩", "Asia/Taipei": "타이베이",
        "Asia/Seoul": "서울", "Asia/Tokyo": "도쿄", "Australia/Melbourne": "멜버른",
        "Australia/Sydney": "시드니", "Pacific/Auckland": "오클랜드",
      },
    },
    stepsTitle: "티켓이 열리기 전에 준비하세요",
    stepsBody: "인기 날짜는 오픈 후 몇 분 만에 마감될 수 있습니다. 실명 예약이므로 중국 시간 {time} 전에 모든 준비를 마치세요.",
    steps: [
      "티켓 오픈일 전에 고궁박물원 공식 티켓 사이트에 가입하고 로그인되는지 확인하세요.",
      "모든 방문자의 여권 정보를 여권에 적힌 그대로 준비하세요. 어린이를 포함해 한 사람씩 따로 예약해야 합니다.",
      "중국 시간 {time} 몇 분 전에 로그인한 뒤 날짜와 오전 또는 오후 시간대를 고르세요.",
      "모든 방문자의 예약 확인을 저장하고, 방문 당일 같은 여권 원본을 지참하세요.",
    ],
    portalLink: "고궁박물원 공식 티켓 사이트",
    guideLink: "자금성 예약 가이드 전체 보기",
    serviceLabel: "명소 예약 대행",
    serviceTitle: "티켓이 열릴 때 접속하기 어렵나요?",
    serviceBody: "각 여행자 본인의 여권 정보로 공식 시스템에서 대신 예약합니다. 수수료는 명소 1곳당 1인 {fee}이며 티켓은 정가 그대로입니다. 방문 {leadDays}일 전까지 요청하고 결제하면 예약을 보장하며, 예약하지 못하면 해당 명소의 수수료와 티켓 금액을 전액 환불합니다.",
    serviceAction: "예약 대행 요청",
    othersTitle: "확인한 다른 명소의 오픈 시간",
    othersBody: "오픈 규칙은 바뀔 수 있습니다. 티켓이 열리기 전날 공식 채널에서 다시 확인하세요.",
    othersColumns: { attraction: "명소", release: "오픈 규칙", checked: "확인일" },
    faqTitle: "자금성 티켓 오픈 자주 묻는 질문",
    faq: [
      { question: "자금성 티켓은 몇 시에 열리나요?", answer: "방문일 {days}일 전 중국 시간 {time}(UTC+8)입니다. 예를 들어 토요일 방문 티켓은 그 전 토요일 {time}에 열립니다. 중국은 서머타임이 없어 일 년 내내 같은 시각입니다." },
      { question: "자금성 티켓을 당일에 살 수 있나요?", answer: "아니요. 고궁박물원은 당일 티켓을 판매하지 않으므로 예약이 확정되지 않으면 입장할 수 없습니다." },
      { question: "원하는 날짜가 이미 매진됐다면요?", answer: "다른 시간대(오전 또는 오후)와 다른 날짜를 확인하고, 자금성 일정을 옮길 수 있도록 베이징 일정을 짜세요. 확정되지 않은 티켓에 하루 일정을 걸지 마세요." },
      { question: "자금성은 월요일에 여나요?", answer: "공휴일을 제외하고 보통 월요일에 휴관합니다. 방문 날짜의 공식 일정을 확인하세요." },
      { question: "예약에 여권이 필요한가요?", answer: "네. 실명 예약이므로 각 방문자의 여권 정보를 여권에 적힌 그대로 입력하고, 당일 같은 여권 원본을 지참하세요." },
    ],
  },
};

export function getTicketReleaseTimeCopy(locale: HomegroundLocale): TicketReleaseTimeCopy {
  return copy[locale];
}

/** Title and description with the Forbidden City rule filled in, for metadata, the sitemap manifest and JSON-LD. */
export function getTicketReleaseMetadataCopy(locale: HomegroundLocale): { title: string; description: string } {
  const rule = ticketReleaseRules["forbidden-city"];
  const values = { days: rule.daysBefore, time: rule.chinaTime };
  const { title, description } = copy[locale].metadata;
  return { title: fillTicketReleaseCopy(title, values), description: fillTicketReleaseCopy(description, values) };
}

export function fillTicketReleaseCopy(template: string, values: Readonly<Record<string, string | number>>): string {
  return template.replace(/\{(\w+)\}/gu, (match, key: string) => (key in values ? String(values[key]) : match));
}
