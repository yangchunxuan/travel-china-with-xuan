import type { CorporateLocale, CorporateTripSlug } from "./corporateTravelTypes";

export type CorporatePurpose = "company-trip" | "incentive" | "meeting" | "undecided";

/** The words of the company brief form and of the message it prepares, per page language. */
export interface CorporateEnquiryCopy {
  eyebrow: string; title: string; intro: string; emailAside: string;
  optional: string;
  labels: { company: string; name: string; email: string; people: string; timing: string; purpose: string; trip: string; budget: string; notes: string };
  placeholders: { people: string; timing: string; budget: string; notes: string };
  purposes: Record<CorporatePurpose, string>;
  trips: Record<CorporateTripSlug | "undecided", string>;
  submit: string; notice: string; privacy: string;
  reviewTitle: string; reviewNotSent: string; openEmail: string; openWhatsApp: string; /** Korean only: KakaoTalk copies the brief and shows the number to add. */ openKakao?: string; copy: string; copied: string;
  copiedStatus: string; readyStatus: string; copyFailed: string; fallbackError: string;
  errors: { company: string; people: string; timing: string; purpose: string; trip: string };
  message: {
    greeting: string; company: string; contact: string; email: string; purpose: string; group: (people: number) => string;
    timing: string; trip: string; open: string; budget: string; notes: string; closing: string; reference: string; subject: string;
  };
}

const en: CorporateEnquiryCopy = {
  eyebrow: "Start with your team",
  title: "Tell us about your team.",
  intro: "Team size, month and purpose are enough to start. Dates can still be open; we reply with questions or a first proposal.",
  emailAside: "Already have a written brief? Email it to",
  optional: "(optional)",
  labels: { company: "Company name", name: "Your name", email: "Work email", people: "Group size", timing: "When, and for how long?", purpose: "What the trip is for", trip: "Starting point", budget: "Budget and currency", notes: "Anything we should plan around?" },
  placeholders: { people: "e.g. 18", timing: "e.g. May 2027, 4 days, or dates still open", budget: "e.g. USD 15,000 in total, excluding international flights", notes: "Single or shared rooms, a meeting, food needs, different arrival flights…" },
  purposes: { "company-trip": "Company trip & team building", incentive: "Incentive travel", meeting: "Small meeting & team retreat", undecided: "Help us choose the right format" },
  trips: { "zhangjiajie-4-day-team-trip": "Zhangjiajie · 4 days / 3 nights", "shanghai-suzhou-4-day-company-retreat": "Shanghai & Suzhou · 4 days / 3 nights", undecided: "Help us choose" },
  submit: "Prepare my enquiry",
  notice: "You review the message, then send it by email or WhatsApp. Nothing is booked until you confirm a written quote.",
  privacy: "Privacy notice",
  reviewTitle: "Your enquiry is ready",
  reviewNotSent: "It has not been sent yet. Open email or WhatsApp to send it.",
  openEmail: "Open email draft",
  openWhatsApp: "Open WhatsApp draft",
  copy: "Copy enquiry",
  copied: "Copied",
  copiedStatus: "Your enquiry has been copied. It has not been sent.",
  readyStatus: "The email or WhatsApp message you send is the enquiry we receive.",
  copyFailed: "Copy is unavailable here. Select the message below, or open it in your email app.",
  fallbackError: "Please check your details.",
  errors: {
    company: "Please enter your company name.",
    people: "Please enter an estimated group size between 1 and 9,999.",
    timing: "Please share a month or say that your dates are still open.",
    purpose: "Please choose the purpose of your trip.",
    trip: "Please choose a sample itinerary or ask us to suggest one.",
  },
  message: {
    greeting: "Hi Homeground, we’d like to discuss a company trip to China.",
    company: "Company", contact: "Contact", email: "Reply email", purpose: "Purpose",
    group: (people) => `Estimated group: ${people} people`,
    timing: "Dates / duration", trip: "Starting idea", open: "Open to suggestions",
    budget: "Budget & currency", notes: "Other arrangements",
    closing: "Please help us shape the programme and confirm the arrangements, availability and written quotation before we book.",
    reference: "Reference",
    subject: "Company trip enquiry",
  },
};

const zh: CorporateEnquiryCopy = {
  eyebrow: "从团队开始",
  title: "说说你们的团队。",
  intro: "人数、月份和目的就够我们开始了。日期还没定也没关系，我们会回复问题或第一版方案。",
  emailAside: "已经有书面需求？直接发邮件到",
  optional: "（选填）",
  labels: { company: "公司名称", name: "你的名字", email: "工作邮箱", people: "人数", timing: "什么时候，去几天？", purpose: "旅行目的", trip: "参考行程", budget: "预算和币种", notes: "还有什么需要我们考虑的？" },
  placeholders: { people: "例如 18", timing: "例如 2027 年 5 月，4 天；或日期未定", budget: "例如总预算 5 万令吉，不含国际机票", notes: "单人房还是双人房、开会、饮食要求、不同的抵达航班……" },
  purposes: { "company-trip": "公司旅游与团建", incentive: "奖励旅游", meeting: "小型会议与团队相聚", undecided: "帮我们选合适的形式" },
  trips: { "zhangjiajie-4-day-team-trip": "张家界 · 四天三晚", "shanghai-suzhou-4-day-company-retreat": "上海苏州 · 四天三晚", undecided: "帮我们推荐" },
  submit: "生成需求消息",
  notice: "先看一遍消息，再用邮件或 WhatsApp 发给我们。确认书面报价之前，不会预订任何东西。",
  privacy: "隐私说明",
  reviewTitle: "需求消息已经生成",
  reviewNotSent: "还没有发出。打开邮件或 WhatsApp 就可以发送。",
  openEmail: "打开邮件草稿",
  openWhatsApp: "打开 WhatsApp 草稿",
  copy: "复制消息",
  copied: "已复制",
  copiedStatus: "消息已复制，还没有发出。",
  readyStatus: "你发出的邮件或 WhatsApp 消息，就是我们收到的需求。",
  copyFailed: "这里无法复制。可以手动选中下面的消息，或用邮件打开。",
  fallbackError: "请检查填写的内容。",
  errors: {
    company: "请填写公司名称。",
    people: "请填写 1 到 9999 之间的大概人数。",
    timing: "请填写月份，或写明日期未定。",
    purpose: "请选择旅行目的。",
    trip: "请选择一条参考行程，或让我们推荐。",
  },
  message: {
    greeting: "你好，我们公司想安排一趟中国团队旅行，想跟你们商量一下。",
    company: "公司", contact: "联系人", email: "回复邮箱", purpose: "目的",
    group: (people) => `大概人数：${people} 人`,
    timing: "日期 / 天数", trip: "参考行程", open: "请帮我们推荐",
    budget: "预算和币种", notes: "其他安排",
    closing: "请帮我们规划行程，预订前请先确认安排、名额和书面报价。",
    reference: "参考页面",
    subject: "公司旅游咨询",
  },
};

const ko: CorporateEnquiryCopy = {
  eyebrow: "단체 소개부터",
  title: "어떤 팀인지 알려 주세요.",
  intro: "인원, 희망 월, 목적만 있으면 시작할 수 있습니다. 날짜가 정해지지 않아도 괜찮습니다. 질문이나 첫 제안서로 답변드립니다.",
  emailAside: "이미 작성한 요청서가 있으면 이메일로 보내 주세요:",
  optional: "(선택)",
  labels: { company: "회사명", name: "담당자 이름", email: "업무용 이메일", people: "인원", timing: "언제, 며칠 일정인가요?", purpose: "여행 목적", trip: "참고 일정", budget: "예산과 통화", notes: "고려해야 할 사항이 있나요?" },
  placeholders: { people: "예: 18", timing: "예: 2027년 5월, 4일 또는 날짜 미정", budget: "예: 총 2,000만 원, 국제선 항공권 제외", notes: "1인실·2인실, 회의, 식사 조건, 도착 항공편이 다른 경우…" },
  purposes: { "company-trip": "기업 단체여행·팀 빌딩", incentive: "포상여행", meeting: "소규모 워크숍·회의", undecided: "알맞은 형태를 추천해 주세요" },
  trips: { "zhangjiajie-4-day-team-trip": "장가계 · 3박 4일", "shanghai-suzhou-4-day-company-retreat": "상하이·쑤저우 · 3박 4일", undecided: "추천해 주세요" },
  submit: "요청 메시지 만들기",
  notice: "메시지를 확인한 뒤 이메일, 카카오톡이나 WhatsApp으로 보내 주세요. 서면 견적을 확정하기 전에는 아무것도 예약되지 않습니다.",
  privacy: "개인정보 안내",
  reviewTitle: "요청 메시지가 준비되었습니다",
  reviewNotSent: "아직 보내지 않았습니다. 이메일, 카카오톡이나 WhatsApp으로 보내 주세요.",
  openEmail: "이메일 초안 열기",
  openWhatsApp: "WhatsApp 초안 열기",
  openKakao: "카카오톡으로 보내기",
  copy: "메시지 복사",
  copied: "복사됨",
  copiedStatus: "메시지를 복사했습니다. 아직 보내지 않았습니다.",
  readyStatus: "보내 주신 이메일이나 메시지가 저희가 받는 요청입니다.",
  copyFailed: "여기서는 복사할 수 없습니다. 아래 메시지를 직접 선택하거나 이메일로 열어 주세요.",
  fallbackError: "입력한 내용을 확인해 주세요.",
  errors: {
    company: "회사명을 입력해 주세요.",
    people: "1명에서 9,999명 사이의 예상 인원을 입력해 주세요.",
    timing: "희망 월을 적거나 날짜 미정이라고 적어 주세요.",
    purpose: "여행 목적을 선택해 주세요.",
    trip: "참고 일정을 고르거나 추천을 요청해 주세요.",
  },
  message: {
    greeting: "안녕하세요, 저희 회사 중국 단체여행을 상담하고 싶습니다.",
    company: "회사", contact: "담당자", email: "회신 이메일", purpose: "목적",
    group: (people) => `예상 인원: ${people}명`,
    timing: "날짜 / 일정", trip: "참고 일정", open: "추천 부탁드립니다",
    budget: "예산과 통화", notes: "기타 사항",
    closing: "일정을 함께 짜 주시고, 예약 전에 준비 내용, 가능 여부, 서면 견적을 확인해 주세요.",
    reference: "참고 페이지",
    subject: "기업 단체여행 문의",
  },
};

const copies: Record<CorporateLocale, CorporateEnquiryCopy> = { en, zh, ko };
export function getCorporateEnquiryCopy(locale: CorporateLocale = "en"): CorporateEnquiryCopy { return copies[locale]; }

/** English labels, kept for callers that only need the source names. */
export const corporatePurposeLabels: Record<CorporatePurpose, string> = en.purposes;
export const corporateTripLabels: Record<CorporateTripSlug, string> = {
  "zhangjiajie-4-day-team-trip": en.trips["zhangjiajie-4-day-team-trip"],
  "shanghai-suzhou-4-day-company-retreat": en.trips["shanghai-suzhou-4-day-company-retreat"],
};
export interface CorporateEnquiryDraft {
  company: string;
  name: string;
  email: string;
  people: string;
  timing: string;
  purpose: CorporatePurpose;
  trip: CorporateTripSlug | "undecided";
  budget: string;
  notes: string;
}

function oneLine(value: string) { return value.replace(/[\r\n\t]+/g, " ").trim(); }
const separator = (locale: CorporateLocale) => locale === "zh" ? "：" : ": ";
const hubUrl = (locale: CorporateLocale) => `https://homegroundchina.com${locale === "en" ? "" : `/${locale}`}/corporate-travel/`;

/** Prepare a message only; never submit, send, book or calculate a price. */
export function buildCorporateEnquiryDraft(draft: CorporateEnquiryDraft, locale: CorporateLocale = "en") {
  const copy = copies[locale];
  const line = (label: string, value: string) => `${label}${separator(locale)}${value}`;
  const company = oneLine(draft.company);
  const people = oneLine(draft.people);
  if (!company) throw new Error(copy.errors.company);
  if (!/^\d{1,4}$/.test(people) || Number(people) < 1) throw new Error(copy.errors.people);
  if (!oneLine(draft.timing)) throw new Error(copy.errors.timing);
  if (!Object.prototype.hasOwnProperty.call(copy.purposes, draft.purpose)) throw new Error(copy.errors.purpose);
  if (draft.trip !== "undecided" && !Object.prototype.hasOwnProperty.call(corporateTripLabels, draft.trip)) throw new Error(copy.errors.trip);
  const selected = draft.trip === "undecided" ? copy.message.open : copy.trips[draft.trip];
  return [
    copy.message.greeting,
    "",
    line(copy.message.company, company),
    draft.name.trim() ? line(copy.message.contact, oneLine(draft.name)) : "",
    draft.email.trim() ? line(copy.message.email, oneLine(draft.email)) : "",
    line(copy.message.purpose, copy.purposes[draft.purpose]),
    copy.message.group(Number(people)),
    line(copy.message.timing, oneLine(draft.timing)),
    line(copy.message.trip, selected),
    draft.budget.trim() ? line(copy.message.budget, oneLine(draft.budget)) : "",
    draft.notes.trim() ? line(copy.message.notes, draft.notes.trim()) : "",
    "",
    copy.message.closing,
    line(copy.message.reference, `${hubUrl(locale)}${draft.trip === "undecided" ? "" : `${draft.trip}/`}`),
  ].filter((text, i, lines) => text !== "" || (i > 0 && lines[i - 1] !== "")).join("\n");
}

export function corporateEnquiryEmailHref(email: string, draft: CorporateEnquiryDraft, body: string, locale: CorporateLocale = "en") {
  return `mailto:${email}?subject=${encodeURIComponent(`${copies[locale].message.subject} — ${oneLine(draft.company)}`)}&body=${encodeURIComponent(body)}`;
}
