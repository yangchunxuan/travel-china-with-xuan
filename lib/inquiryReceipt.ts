import { getPrivateTourInquiryContext, privateTourInquirySelectionLabel, type PrivateTourInquirySelection } from "./privateTourInquiryContext.ts";
import { safeInquiryDestinationNames, safeInquiryNights } from "./inquirySafeSummary.ts";

export type InquiryReceiptLocale = "en" | "zh" | "ko" | "ja";
export type InquiryAckStatus = "disabled" | "queued" | "suppressed" | "unavailable";
export interface InquiryReceiptData {
  publicReference: string;
  email: string | null;
  phone: string | null;
  ackStatus: InquiryAckStatus;
  firstResponseDueAt: string | null;
  topic: "homepage" | "tour" | "planner";
  productName: string | null;
  selectionLabel: string | null;
  requestedDateCollected: boolean;
  requestedDate: string | null;
  requestedTravelers: number | null;
  destinationNames: string[];
  nights: number | null;
  /** Starts at zero and advances only after a confirmed email correction. */
  contactRevision: number | null;
}

const record = (value: unknown): Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
const receiptAccessKeys = new WeakMap<InquiryReceiptData, string>();
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Keep the original submission credential in memory only, outside JSON and DOM props. */
export function inquiryReceiptAccessKey(receipt: InquiryReceiptData): string | null {
  return receiptAccessKeys.get(receipt) ?? null;
}

/** Reuse the same trusted intake host; never accept an arbitrary correction URL. */
export function inquiryEmailCorrectionApiUrl(inquiryApiUrl: string): string {
  if (!inquiryApiUrl) return "";
  try {
    const url = new URL(inquiryApiUrl);
    if (url.username || url.password || url.search || url.hash) return "";
    const path = url.pathname.replace(/\/+$/, "");
    if (url.protocol === "https:" && !url.port && url.hostname === "xbymvlxethfzqcgyoieb.supabase.co" && path === "/functions/v1/v1-inquiries")
      url.pathname = "/functions/v1/v1-inquiry-email-corrections";
    else if (process.env.NODE_ENV !== "production" && url.protocol === "http:" && ["127.0.0.1", "localhost"].includes(url.hostname) && path === "/v1/inquiries")
      url.pathname = "/v1/inquiry-email-corrections";
    else return "";
    return url.toString();
  } catch { return ""; }
}

/** Mirrors the intake address limits before sending; the server remains authoritative. */
export function normalizeCorrectionEmail(value: string): string | null {
  const email = value.normalize("NFC").trim();
  if (!email || email.length > 254 || /[\s\u0000-\u001f\u007f-\u009f\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069\ud800-\udfff]/u.test(email)) return null;
  const separator = email.lastIndexOf("@");
  if (separator < 1 || separator === email.length - 1) return null;
  const local = email.slice(0, separator);
  const domain = email.slice(separator + 1).toLowerCase();
  if (local.length > 64 || domain.length > 253 || !/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+$/i.test(local) ||
    local.startsWith(".") || local.endsWith(".") || local.includes("..") || !domain.includes(".")) return null;
  if (!domain.split(".").every((label) => label.length <= 63 && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label))) return null;
  return `${local}@${domain}`;
}

export interface InquiryEmailCorrectionSnapshot {
  readonly base: InquiryReceiptData;
  readonly email: string;
  readonly key: string;
  readonly accessKey: string;
  readonly body: string;
}

/** A retry passes the exact same snapshot, including its independent idempotency key. */
export async function sendInquiryEmailCorrection(
  snapshot: InquiryEmailCorrectionSnapshot,
  url: string,
  signal?: AbortSignal,
  request: typeof fetch = fetch,
): Promise<{ response: Response; result: unknown }> {
  const response = await request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Inquiry-Access-Key": snapshot.accessKey,
      "Idempotency-Key": snapshot.key,
    },
    body: snapshot.body,
    signal,
  });
  const result = await response.json().catch(() => null) as unknown;
  return { response, result };
}

/** A parent rerender with the original receipt must not restore the old address. */
export function displayedInquiryReceipt(original: InquiryReceiptData, corrected: InquiryReceiptData | null): InquiryReceiptData {
  return corrected?.publicReference === original.publicReference ? corrected : original;
}

/** Read the immutable submitted snapshot, never the form after a retry or navigation. */
export function createInquiryReceipt(response: unknown, submittedBody: string, locale: InquiryReceiptLocale, requestedTravelers?: number | null, submissionKey?: string): InquiryReceiptData | null {
  const result = record(response);
  if (result.state !== "submitted" || typeof result.publicReference !== "string" || !result.publicReference.trim()) return null;
  let payload: Record<string, unknown>;
  try { payload = record(JSON.parse(submittedBody)); } catch { return null; }
  const contact = record(payload.contact);
  const plannerAnswers = payload.entryPath === "destination_timing" ? record(record(payload.journey).answers) : {};
  const interest = record(payload.productInterest);
  const selected = record(interest.selection);
  const selection = typeof selected.packageId === "string" && typeof selected.travelers === "number"
    ? { packageId: selected.packageId, travelers: selected.travelers as PrivateTourInquirySelection["travelers"] }
    : undefined;
  // Regenerate names from the controlled catalogue, not arbitrary text or notes.
  const product = typeof interest.slug === "string" ? getPrivateTourInquiryContext(interest.slug, locale, selection) : null;
  const status = result.ackStatus;
  const ackStatus = status === "disabled" || status === "queued" || status === "suppressed" || status === "unavailable"
    ? status : result.ackQueued === true ? "queued" : "disabled";
  const deadline = typeof result.firstResponseDueAt === "string" && Number.isFinite(Date.parse(result.firstResponseDueAt))
    ? result.firstResponseDueAt : null;
  const authoritativeEmail = typeof result.contactEmail === "string" ? normalizeCorrectionEmail(result.contactEmail) : null;
  const contactRevision = typeof result.contactRevision === "number" && Number.isSafeInteger(result.contactRevision)
    && result.contactRevision >= 0 && result.contactRevision <= 3 ? result.contactRevision : null;
  const receipt: InquiryReceiptData = {
    publicReference: result.publicReference.trim(),
    email: contact.channel === "email" && typeof contact.email === "string" ? authoritativeEmail ?? contact.email.trim() : null,
    phone: contact.channel === "whatsapp" && typeof contact.phoneRaw === "string" ? contact.phoneRaw.trim() : null,
    ackStatus,
    firstResponseDueAt: deadline,
    topic: product ? "tour" : payload.entryPath === "homepage_email" ? "homepage" : "planner",
    productName: product?.name ?? null,
    selectionLabel: product ? privateTourInquirySelectionLabel(product, locale) : null,
    requestedDateCollected: payload.entryPath === "private_tour_quote",
    requestedDate: payload.entryPath === "private_tour_quote" && typeof payload.travelDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(payload.travelDate) ? payload.travelDate : null,
    // A published price tier is not the traveller's actual party size.
    requestedTravelers: Number.isInteger(requestedTravelers) && requestedTravelers! >= 1 && requestedTravelers! <= 99 ? requestedTravelers! : null,
    destinationNames: safeInquiryDestinationNames(plannerAnswers.destinationIds, locale),
    nights: safeInquiryNights(plannerAnswers.totalNights),
    contactRevision,
  };
  if (receipt.email && authoritativeEmail && contactRevision !== null && contactRevision < 3 && submissionKey && uuidPattern.test(submissionKey)) receiptAccessKeys.set(receipt, submissionKey);
  return receipt;
}

/** A language edition shows its own tour and option names; the saved enquiry and its correction key stay the same. */
export function relabelInquiryReceipt(receipt: InquiryReceiptData, labels: { productName: string | null; selectionLabel: string | null }): InquiryReceiptData {
  const relabelled: InquiryReceiptData = { ...receipt, productName: labels.productName, selectionLabel: labels.selectionLabel };
  const key = inquiryReceiptAccessKey(receipt);
  if (key) receiptAccessKeys.set(relabelled, key);
  return relabelled;
}

/** A confirmed correction changes only contact state; the saved itinerary and deadline survive. */
export function correctedInquiryReceipt(receipt: InquiryReceiptData, response: unknown): InquiryReceiptData | null {
  const result = record(response);
  const email = typeof result.contactEmail === "string" ? normalizeCorrectionEmail(result.contactEmail) : null;
  if (result.state !== "corrected" || result.publicReference !== receipt.publicReference || !email ||
    receipt.contactRevision === null || typeof result.contactRevision !== "number" || !Number.isSafeInteger(result.contactRevision) ||
    result.contactRevision < receipt.contactRevision || result.contactRevision > 3) return null;
  const status = result.ackStatus;
  if (status !== "queued" && status !== "suppressed" && status !== "disabled" && status !== "unavailable") return null;
  const corrected: InquiryReceiptData = {
    ...receipt,
    email,
    contactRevision: result.contactRevision,
    ackStatus: status,
    firstResponseDueAt: receipt.firstResponseDueAt ?? (typeof result.firstResponseDueAt === "string" && Number.isFinite(Date.parse(result.firstResponseDueAt))
      ? result.firstResponseDueAt : null),
  };
  const key = inquiryReceiptAccessKey(receipt);
  if (key) receiptAccessKeys.set(corrected, key);
  return corrected;
}

const commonDomainTypos: Readonly<Record<string, string>> = {
  "gmial.com": "gmail.com", "gamil.com": "gmail.com", "gmal.com": "gmail.com", "gmail.con": "gmail.com",
  "gmail.co": "gmail.com", "hotmial.com": "hotmail.com", "hotmal.com": "hotmail.com", "hotmail.con": "hotmail.com",
  "outlok.com": "outlook.com", "outlook.con": "outlook.com", "yaho.com": "yahoo.com", "yahoo.con": "yahoo.com",
};

/** Suggest only known common typos. Never change the address or block submission. */
export function emailTypoSuggestion(value: string): string | null {
  const match = /^([^\s@]+)@([^\s@]+\.[^\s@]+)$/.exec(value.trim());
  if (!match || value.trim().length > 254) return null;
  const domain = commonDomainTypos[match[2].toLowerCase()];
  return domain ? `${match[1]}@${domain}` : null;
}

export function inquiryCorrectionLinks(reference: string, locale: InquiryReceiptLocale, serviceEmail: string, phone: string, localizedCopy?: InquiryReceiptCopy) {
  const text = getInquiryReceiptCopy(locale, localizedCopy);
  const safeReference = reference.replace(/[\r\n]/g, " ").slice(0, 80);
  const body = [text.correctionBody, `${text.reference}: ${safeReference}`, text.correctionAddress].join("\r\n");
  return {
    email: `mailto:${serviceEmail}?subject=${encodeURIComponent(`${text.correctionSubject} — ${safeReference}`)}&body=${encodeURIComponent(body)}`,
    whatsapp: /^[1-9][0-9]{7,14}$/.test(phone) ? `https://wa.me/${phone}?text=${encodeURIComponent(body)}` : "",
  };
}

/** A voluntary channel switch carries the saved enquiry reference, not contact details or private notes. */
export function inquiryWhatsAppHref(receipt: InquiryReceiptData, locale: InquiryReceiptLocale, phone: string, localizedCopy?: InquiryReceiptCopy): string {
  if (!/^[1-9][0-9]{7,14}$/.test(phone)) return "";
  const copy = getInquiryReceiptCopy(locale, localizedCopy);
  const message = [copy.continuationGreeting, `${copy.reference}: ${receipt.publicReference}`,
    receipt.productName ? `${copy.tour}: ${receipt.productName}` : "",
    receipt.selectionLabel ? `${copy.selection}: ${receipt.selectionLabel}` : "",
    receipt.requestedDateCollected ? `${copy.date}: ${receipt.requestedDate || copy.undecided}` : "",
    receipt.requestedTravelers !== null ? `${copy.party}: ${receipt.requestedTravelers}` : "",
    receipt.destinationNames.length ? `${copy.destinations}: ${receipt.destinationNames.join(" · ")}` : "",
    receipt.nights !== null ? `${copy.nights}: ${receipt.nights}` : "",
  ].filter(Boolean).join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const inquiryReceiptCopy = {
  en: {
    correctionSubject: "Correct my enquiry email", correctionBody: "Hello Homeground, please help me correct the email address for this enquiry.", correctionAddress: "Correct email address: ", continuationGreeting: "Hello Homeground, I’ve submitted an enquiry and would like to continue here.",
    details: "View enquiry details", destinations: "Requested destinations", nights: "Trip length (nights)", suppressedNext: "Looking for an earlier confirmation? Check Spam or Junk and mark it ‘Not spam’. You can also email us directly at", directNext: "You can also email us directly at",
    title: "We’ve received your enquiry", reference: "Reference", email: "We’ll reply to", phone: "Reply via WhatsApp", homepage: "Homepage enquiry", planner: "Trip planning enquiry", tour: "Your tour", selection: "Price option", date: "Arrival date", undecided: "Dates not decided", party: "Travellers", boundary: "This is an enquiry, not a booking. We’ll confirm your group size and availability before sending a quote.",
    next: "Not in your inbox after a few minutes? Check Spam or Junk, mark it ‘Not spam’ and reply ‘Received’ — that helps our replies reach your inbox. Still missing? Email us at", whatsappNext: "The Homeground team will review your request and reply on WhatsApp.", due: "Reply by", zone: "China time (UTC+8)",
    queued: "A confirmation email is on its way. No need to submit again.", disabled: "A trip planner will reply by email. No need to submit again.", suppressed: "Your enquiry is saved — we won’t send another confirmation email this time. No need to submit again.", unavailable: "We couldn’t send the confirmation email, but your enquiry is saved and a trip planner will still reply.",
    correct: "Wrong address?", correction: "Contact us with this reference to request a correction.", emailAction: "Email us", whatsappAction: "WhatsApp", continueWhatsapp: "Continue on WhatsApp", typoEnd: "?", typo: "Did you mean", use: "Use this address",
    correctionLabel: "Correct email address", correctionHelp: "We’ll use the updated address for this enquiry. Your trip details stay the same.", correctionSave: "Save email", correctionCancel: "Cancel", correctionSaving: "Saving…", correctionSaved: "Email updated. A previous confirmation may already have gone to the old address.", correctionInvalid: "Enter a valid email address.", correctionFailed: "We couldn’t update the address. Please try again.", correctionUncertain: "We couldn’t confirm the update. Check and retry this same change.", correctionRetry: "Check and retry", correctionUnavailable: "Online correction is no longer available. Email us with your reference.", correctionConflict: "This address changed elsewhere. Email us with your reference before trying again.", correctionBusy: "A message is being sent. Wait a moment, then retry.", correctionSame: "This is already your reply address.",
  },
  zh: {
    correctionSubject: "更正咨询邮箱", correctionBody: "你好 Homeground，请帮我更正这条咨询的邮箱地址。", correctionAddress: "正确的邮箱地址：", continuationGreeting: "你好 Homeground，我已提交咨询，想在这里继续沟通。",
    details: "查看咨询内容", destinations: "希望游览的目的地", nights: "计划住宿晚数", suppressedNext: "在找之前的确认信？请查看垃圾邮件，并标记为“非垃圾邮件”。也可以直接发邮件给我们：", directNext: "也可以直接发邮件联系我们：",
    title: "我们已收到你的咨询", reference: "咨询编号", email: "回复发到", phone: "通过 WhatsApp 回复", homepage: "首页旅行咨询", planner: "旅行规划咨询", tour: "意向行程", selection: "价格方案", date: "抵达日期", undecided: "日期尚未确定", party: "同行人数", boundary: "这是咨询，还不是预订。我们会先确认人数和能否安排，再给你报价。",
    next: "几分钟后还没看到？请查看垃圾邮件，标记为“非垃圾邮件”并回复“已收到”，之后的回信更容易进收件箱。还是找不到，请直接发邮件：", whatsappNext: "Homeground 团队会查看你的需求，并通过 WhatsApp 回复。", due: "最晚回复", zone: "中国时间（UTC+8）",
    queued: "确认信正在发往你的邮箱，无需重复提交。", disabled: "旅行规划师会通过邮件回复你，无需重复提交。", suppressed: "你的咨询已保存，这次不再另发确认信，无需重复提交。", unavailable: "确认信暂时没能发出，但你的咨询已保存，旅行规划师仍会回复你。",
    correct: "填错了？", correction: "请带上咨询编号联系我们更正。", emailAction: "发邮件联系我们", whatsappAction: "WhatsApp 联系", continueWhatsapp: "通过 WhatsApp 继续聊", typoEnd: "吗？", typo: "你想填写的是", use: "使用这个地址",
    correctionLabel: "更正邮箱", correctionHelp: "我们会用新邮箱回复这条咨询，行程内容不变。", correctionSave: "保存邮箱", correctionCancel: "取消", correctionSaving: "正在保存……", correctionSaved: "邮箱已更新。之前的确认信可能已发往旧邮箱。", correctionInvalid: "请填写有效邮箱。", correctionFailed: "暂时没能更新邮箱，请重试。", correctionUncertain: "暂时无法确认是否更新成功。请用同一份更正检查并重试。", correctionRetry: "检查并重试", correctionUnavailable: "目前无法在线更正。请带咨询编号发邮件联系我们。", correctionConflict: "邮箱已在别处变更。请带咨询编号联系我们，再继续修改。", correctionBusy: "邮件正在发送，请稍后重试。", correctionSame: "这已经是当前回复邮箱。",
  },
  ko: {
    correctionSubject: "문의 이메일 주소 수정", correctionBody: "안녕하세요 Homeground, 아래 문의의 이메일 주소를 수정하고 싶습니다.", correctionAddress: "올바른 이메일 주소: ", continuationGreeting: "안녕하세요 Homeground, 문의를 제출했으며 여기에서 상담을 이어가고 싶습니다.",
    details: "문의 내용 보기", destinations: "희망 목적지", nights: "예정 숙박 일수", suppressedNext: "이전 확인 이메일을 찾고 계신가요? 스팸함을 확인하고 ‘스팸 아님’으로 표시해 주세요. 이메일로 직접 연락하셔도 됩니다:", directNext: "아래 주소로 직접 이메일을 보내셔도 됩니다:",
    title: "문의를 접수했습니다", reference: "문의 번호", email: "답변 받을 이메일", phone: "WhatsApp으로 답변", homepage: "여행 상담 문의", planner: "여행 계획 문의", tour: "문의한 여행", selection: "가격 옵션", date: "도착일", undecided: "날짜 미정", party: "여행 인원", boundary: "예약 확정이 아닌 문의입니다. 인원과 준비 가능 여부를 확인한 후 견적을 보내드립니다.",
    next: "몇 분이 지나도 보이지 않으면 스팸함을 확인해 주세요. ‘스팸 아님’으로 표시하고 ‘받았습니다’라고 답장해 주시면 이후 답변이 받은편지함에 더 잘 도착합니다. 그래도 없으면 이메일로 연락해 주세요:", whatsappNext: "Homeground 팀이 요청을 검토하고 WhatsApp으로 답변드립니다.", due: "답변 예정", zone: "중국 시간 (UTC+8)",
    queued: "확인 이메일을 보내드리고 있습니다. 다시 제출하실 필요는 없습니다.", disabled: "여행 플래너가 이메일로 답변드립니다. 다시 제출하실 필요는 없습니다.", suppressed: "문의가 저장되었습니다. 이번에는 확인 이메일을 다시 보내지 않습니다. 다시 제출하실 필요는 없습니다.", unavailable: "확인 이메일을 보내지 못했지만 문의는 저장되었으며, 여행 플래너가 답변드립니다.",
    correct: "잘못 입력하셨나요?", correction: "문의 번호와 함께 연락해 주시면 수정을 도와드립니다.", emailAction: "이메일로 연락", whatsappAction: "WhatsApp으로 연락", continueWhatsapp: "WhatsApp으로 상담 이어가기", typoEnd: " 주소인가요?", typo: "혹시", use: "이 주소 사용",
    correctionLabel: "이메일 주소 수정", correctionHelp: "이 문의의 답변 주소만 바뀝니다. 여행 내용은 그대로 유지됩니다.", correctionSave: "이메일 저장", correctionCancel: "취소", correctionSaving: "저장 중…", correctionSaved: "이메일이 수정되었습니다. 이전 확인 메일은 기존 주소로 이미 발송되었을 수 있습니다.", correctionInvalid: "올바른 이메일 주소를 입력해 주세요.", correctionFailed: "이메일을 수정하지 못했습니다. 다시 시도해 주세요.", correctionUncertain: "수정 여부를 확인하지 못했습니다. 같은 요청으로 확인하고 다시 시도해 주세요.", correctionRetry: "확인 후 재시도", correctionUnavailable: "온라인 수정이 더 이상 가능하지 않습니다. 문의 번호를 적어 이메일로 연락해 주세요.", correctionConflict: "주소가 다른 곳에서 변경되었습니다. 다시 수정하기 전에 문의 번호와 함께 연락해 주세요.", correctionBusy: "메일을 보내는 중입니다. 잠시 후 다시 시도해 주세요.", correctionSame: "현재 답변 주소와 같습니다.",
  },
} as const;

export type InquiryReceiptCopy = { readonly [Key in keyof typeof inquiryReceiptCopy.en]: string };

/** Japanese-only callers supply their copy, keeping it out of EN/ZH/KO bundles. */
export function getInquiryReceiptCopy(locale: InquiryReceiptLocale, localizedCopy?: InquiryReceiptCopy): InquiryReceiptCopy {
  if (localizedCopy) return localizedCopy;
  if (locale === "ja") throw new Error("Japanese inquiry receipt copy must be supplied by its locale module.");
  return inquiryReceiptCopy[locale];
}
