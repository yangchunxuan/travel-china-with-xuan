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
}

const record = (value: unknown): Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};

/** Read the immutable submitted snapshot, never the form after a retry or navigation. */
export function createInquiryReceipt(response: unknown, submittedBody: string, locale: InquiryReceiptLocale, requestedTravelers?: number | null): InquiryReceiptData | null {
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
  return {
    publicReference: result.publicReference.trim(),
    email: contact.channel === "email" && typeof contact.email === "string" ? contact.email.trim() : null,
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
  };
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
    details: "View enquiry details", destinations: "Requested destinations", nights: "Trip length (nights)", suppressedNext: "If you haven’t seen the confirmation email, check Spam or Junk. If you find it, mark it as ‘Not spam’ or ‘Not junk’ and reply ‘Received’ so we know you’ve seen it. If it’s still missing, email us directly at", directNext: "You can also email us directly at",
    title: "We’ve received your enquiry", reference: "Reference", email: "Reply email", phone: "Reply via WhatsApp", homepage: "Homepage enquiry", planner: "Trip planning enquiry", tour: "Tour requested", selection: "Selected price option — party size to confirm", date: "Requested arrival date", undecided: "Dates not decided", party: "Travellers you entered", boundary: "This is an enquiry, not a confirmed booking. We’ll check the arrangements before quoting.",
    next: "If you haven’t seen the confirmation email, check Spam or Junk. If you find it, mark it as ‘Not spam’ or ‘Not junk’ and reply ‘Received’ so we know you’ve seen it. If it’s still missing, email us directly at", whatsappNext: "The Homeground team will review your request and reply on WhatsApp.", due: "We aim to reply by", zone: "China time (UTC+8)",
    queued: "We’ve arranged a confirmation email. You don’t need to submit again.", disabled: "Your enquiry is saved. You don’t need to submit again.", suppressed: "Your enquiry is saved. You don’t need to submit again.", unavailable: "We couldn’t arrange the confirmation email. Your enquiry is saved and our team will still review it.",
    correct: "Email address wrong?", correction: "Contact us with this reference to request a correction.", emailAction: "Email us", whatsappAction: "WhatsApp", continueWhatsapp: "Continue on WhatsApp", typo: "Did you mean", use: "Use this address",
  },
  zh: {
    correctionSubject: "更正咨询邮箱", correctionBody: "你好 Homeground，请帮我更正这条咨询的邮箱地址。", correctionAddress: "正确的邮箱地址：", continuationGreeting: "你好 Homeground，我已提交咨询，想在这里继续沟通。",
    details: "查看咨询内容", destinations: "希望游览的目的地", nights: "计划住宿晚数", suppressedNext: "如果没看到确认信，请先查看垃圾邮件。若找到，请标记为“非垃圾邮件”，并回复一句“已收到”，方便我们确认你已看到邮件。仍未收到，请直接发邮件联系我们：", directNext: "也可以直接发邮件联系我们：",
    title: "我们已收到你的咨询", reference: "咨询编号", email: "回复邮箱", phone: "通过 WhatsApp 回复", homepage: "首页旅行咨询", planner: "旅行规划咨询", tour: "咨询行程", selection: "所选价格档位，实际同行人数待确认", date: "希望抵达的日期", undecided: "日期尚未确定", party: "你填写的同行人数", boundary: "这是一条咨询，尚未确认预订。我们会核实安排后再报价。",
    next: "如果没看到确认信，请先查看垃圾邮件。若找到，请标记为“非垃圾邮件”，并回复一句“已收到”，方便我们确认你已看到邮件。仍未收到，请直接发邮件联系我们：", whatsappNext: "Homeground 团队会查看你的需求，并通过 WhatsApp 回复。", due: "预计最晚回复时间：", zone: "中国时间（UTC+8）",
    queued: "我们已安排发送一封确认信。无需重复提交。", disabled: "你的咨询已保存，无需重复提交。", suppressed: "你的咨询已保存，无需重复提交。", unavailable: "确认邮件暂时未能安排发送，但你的咨询已保存，我们仍会查看并回复。",
    correct: "邮箱填错了？", correction: "请带上咨询编号联系我们更正。", emailAction: "发邮件联系我们", whatsappAction: "WhatsApp 联系", continueWhatsapp: "通过 WhatsApp 继续聊", typo: "你想填写的是", use: "使用这个地址",
  },
  ko: {
    correctionSubject: "문의 이메일 주소 수정", correctionBody: "안녕하세요 Homeground, 아래 문의의 이메일 주소를 수정하고 싶습니다.", correctionAddress: "올바른 이메일 주소: ", continuationGreeting: "안녕하세요 Homeground, 문의를 제출했으며 여기에서 상담을 이어가고 싶습니다.",
    details: "문의 내용 보기", destinations: "희망 목적지", nights: "예정 숙박 일수", suppressedNext: "확인 이메일이 보이지 않으면 스팸함을 확인해 주세요. 찾으셨다면 ‘스팸 아님’으로 표시하고 ‘받았습니다’라고 답장해 주시면 수신 여부를 확인할 수 있습니다. 그래도 없으면 아래 주소로 직접 이메일을 보내 주세요:", directNext: "아래 주소로 직접 이메일을 보내셔도 됩니다:",
    title: "문의를 접수했습니다", reference: "문의 번호", email: "답변받을 이메일", phone: "WhatsApp으로 답변", homepage: "여행 상담 문의", planner: "여행 계획 문의", tour: "문의한 여행", selection: "선택한 가격 옵션 — 실제 인원은 확인 예정", date: "희망 도착일", undecided: "날짜 미정", party: "입력하신 여행 인원", boundary: "문의가 접수된 상태이며 예약 확정은 아닙니다. 준비 가능 여부를 확인한 후 견적을 드립니다.",
    next: "확인 이메일이 보이지 않으면 스팸함을 확인해 주세요. 찾으셨다면 ‘스팸 아님’으로 표시하고 ‘받았습니다’라고 답장해 주시면 수신 여부를 확인할 수 있습니다. 그래도 없으면 아래 주소로 직접 이메일을 보내 주세요:", whatsappNext: "Homeground 팀이 요청을 검토하고 WhatsApp으로 답변드립니다.", due: "답변 예정 기한:", zone: "중국 시간 (UTC+8)",
    queued: "확인 이메일 발송을 준비했습니다. 다시 제출하실 필요는 없습니다.", disabled: "문의가 저장되었습니다. 다시 제출하실 필요는 없습니다.", suppressed: "문의가 저장되었습니다. 다시 제출하실 필요는 없습니다.", unavailable: "확인 이메일의 발송을 준비하지 못했습니다. 문의는 저장되었으며 담당자가 검토 후 답변드립니다.",
    correct: "이메일 주소를 잘못 입력하셨나요?", correction: "문의 번호와 함께 연락해 주시면 수정을 도와드립니다.", emailAction: "이메일로 연락", whatsappAction: "WhatsApp으로 연락", continueWhatsapp: "WhatsApp으로 상담 이어가기", typo: "이 주소를 입력하려고 하셨나요?", use: "이 주소 사용",
  },
} as const;

export type InquiryReceiptCopy = { readonly [Key in keyof typeof inquiryReceiptCopy.en]: string };

/** Japanese-only callers supply their copy, keeping it out of EN/ZH/KO bundles. */
export function getInquiryReceiptCopy(locale: InquiryReceiptLocale, localizedCopy?: InquiryReceiptCopy): InquiryReceiptCopy {
  if (localizedCopy) return localizedCopy;
  if (locale === "ja") throw new Error("Japanese inquiry receipt copy must be supplied by its locale module.");
  return inquiryReceiptCopy[locale];
}
