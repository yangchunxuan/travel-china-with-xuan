import type { HomegroundLocale } from "./homegroundI18n";
import { supportsModalDialog } from "./browserCapabilities.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { tourContactDraftText, type TourContactDraft } from "./tourContactDraft.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { getPrivateTourInquiryContextFromSearchParams, privateTourInquirySelectionLabel, type PrivateTourInquiryContext } from "./privateTourInquiryContext.ts";

// @ts-ignore Source-TypeScript tests require the explicit extension.
import { homegroundKakaoTalkPhone, type KakaoTalkPhone } from "./homegroundBusiness.ts";

let returnFocusTarget: HTMLElement | null = null;
export function consumeTourContactReturnFocus() { const target = returnFocusTarget; returnFocusTarget = null; return target; }

export const tourContactOpenEvent = "homeground:open-tour-contact";
export const guideContactOpenEvent = "homeground:open-guide-contact";

type ContactLinkEvent = { preventDefault: () => void; defaultPrevented?: boolean; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean; button?: number; currentTarget?: EventTarget | null };

function claimContactRequest(event: ContactLinkEvent, type: string, detail: unknown, returnFocus?: HTMLElement | null) {
  returnFocusTarget = returnFocus ?? (typeof HTMLElement !== "undefined" && event.currentTarget instanceof HTMLElement ? event.currentTarget : null);
  // The receiver cancels the native-link fallback only after its dialog opens.
  const request = new CustomEvent(type, { detail, cancelable: true });
  window.dispatchEvent(request);
  if (!request.defaultPrevented) {
    returnFocusTarget = null;
    return false;
  }
  event.preventDefault();
  return true;
}

/** Open only a guide's generic consultation link, not product or service navigation. */
export function openGuideContactFromLink(event: ContactLinkEvent, href: string, locale: HomegroundLocale) {
  // On desktop the contact card has already answered this click.
  if (event.defaultPrevented) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || (event.button != null && event.button !== 0) || typeof window === "undefined") return false;
  if (!supportsModalDialog()) return false;
  const prefix = locale === "en" ? "" : `/${locale}`;
  if (!new RegExp(`^${prefix}/guides/[a-z0-9-]+/$`).test(window.location.pathname)) return false;
  let url: URL;
  try { url = new URL(href, window.location.origin); } catch { return false; }
  if (url.origin !== window.location.origin || url.pathname !== `${prefix}/` || !["#planner-contact", "#route-finder"].includes(url.hash)) return false;
  for (const [key, value] of url.searchParams) {
    // This old value selected the homepage's first step, not a traveller's itinerary.
    if (!key.startsWith("utm_") && !(key === "planner" && value === "destinations")) return false;
  }
  if (!document.querySelector('[data-homeground-contact-ready="true"]')) return false;
  return claimContactRequest(event, guideContactOpenEvent, { path: window.location.pathname });
}
export const tourContactCopy = {
  en: { title: "Let’s plan your trip.", intro: "Tell us when you’d like to travel. We’ll email you a personal quote.", ask: "Ask a trip planner", close: "Close enquiry", whatsapp: "Chat on WhatsApp", email: "Email address", date: "Preferred arrival date", undecided: "Dates not decided yet", note: "Anything you’d like us to know?", optional: "Optional", placeholder: "Your group, interests or a change to this itinerary…", submit: "Request my quote", sending: "Sending…", privacy: "Privacy notice", consent: "We’ll use these details to reply to your enquiry.", manual: "Your planner will confirm availability and the final price.", success: "Your enquiry is saved.", successBody: "We’ll review your plans and reply by email.", reference: "Reference", done: "Back to the itinerary", failed: "We couldn’t save your enquiry. Please try again, or contact us below.", uncertain: "We couldn’t confirm whether your enquiry was saved. Check again to safely retry the same request.", retry: "Check & retry", fallback: "Prefer to get in touch directly?", unavailable: "Send us a message about this trip. Your itinerary will be included.", guideBody: "Planning a trip to China? Talk to our team about routes, stays and private tours.", guideEmail: "Send us an email", tours: "Browse itineraries & prices", selected: "Your itinerary", alternative: "Or chat on WhatsApp" },
  zh: { title: "聊聊你的旅行计划。", intro: "告诉我们你想什么时候出发，我们会通过邮件回复你的专属报价。", ask: "咨询旅行规划师", close: "关闭咨询", whatsapp: "通过 WhatsApp 咨询", email: "邮箱地址", date: "预计抵达日期", undecided: "日期还没确定", note: "还有什么想告诉我们？", optional: "选填", placeholder: "同行人数、旅行偏好，或想调整的行程……", submit: "获取我的报价", sending: "正在发送……", privacy: "隐私说明", consent: "这些信息将用于回复你的旅行咨询。", manual: "具体可订情况与最终价格由规划师确认。", success: "已收到你的咨询。", successBody: "我们会查看你的计划，并通过邮件回复。", reference: "咨询编号", done: "继续查看行程", failed: "暂时没能保存你的咨询，请重试或通过下方方式联系我们。", uncertain: "暂时无法确认是否保存成功。请点击下方按钮，安全地重试同一份咨询。", retry: "检查并重试", fallback: "也可以直接联系我们", unavailable: "直接聊聊这趟旅行，消息中会带上你选择的行程。", guideBody: "准备来中国旅行？和我们的团队聊聊路线、住宿与私人团安排。", guideEmail: "发送邮件", tours: "查看行程与价格", selected: "你选择的行程", alternative: "或通过 WhatsApp 咨询" },
  ko: { title: "여행 계획을 들려주세요.", intro: "희망 여행 날짜를 알려주시면 이메일로 맞춤 견적을 보내드립니다.", ask: "여행 플래너에게 문의", close: "문의 닫기", whatsapp: "WhatsApp으로 문의", email: "이메일 주소", date: "희망 도착일", undecided: "날짜는 아직 미정이에요", note: "추가로 알려주실 내용이 있나요?", optional: "선택", placeholder: "여행 인원, 관심사 또는 변경하고 싶은 일정…", submit: "맞춤 견적 요청", sending: "전송 중…", privacy: "개인정보 안내", consent: "입력하신 정보는 여행 문의에 답변하기 위해 사용합니다.", manual: "예약 가능 여부와 최종 가격은 플래너가 확인해 드립니다.", success: "문의가 저장되었습니다.", successBody: "여행 계획을 검토한 뒤 이메일로 답변드리겠습니다.", reference: "문의 번호", done: "일정 계속 보기", failed: "문의를 저장하지 못했습니다. 다시 시도하거나 아래 방법으로 연락해 주세요.", uncertain: "문의가 저장되었는지 확인하지 못했습니다. 아래 버튼으로 동일한 요청을 안전하게 다시 확인해 주세요.", retry: "확인 후 재시도", fallback: "직접 연락하셔도 좋아요", unavailable: "선택하신 일정이 포함된 메시지로 여행에 대해 문의해 주세요.", guideBody: "중국 여행을 준비하시나요? 여행 동선, 숙소와 프라이빗 투어를 저희 팀과 상의해 보세요.", guideEmail: "이메일 보내기", tours: "일정과 가격 살펴보기", selected: "선택하신 일정", alternative: "또는 WhatsApp으로 문의" },
} as const;

/** The prepared inquiry text shared by every direct chat channel (WhatsApp link, KakaoTalk copy). */
export function tourContactMessageText(locale: HomegroundLocale, context: PrivateTourInquiryContext | null, path?: string, draft?: TourContactDraft) {
  const opening = locale === "zh" ? "你好，我想咨询中国私人旅行。" : locale === "ko" ? "안녕하세요. 중국 프라이빗 여행을 문의하고 싶습니다." : "Hi, I’d like to plan a private trip to China.";
  const publicPath = context ? `${locale === "en" ? "" : `/${locale}`}/tours/${context.slug}/` : path;
  const safePath = publicPath && /^\/(?:zh\/|ko\/)?(?:guides|tours)\/[a-z0-9-]+\/$/.test(publicPath) ? publicPath : null;
  return [opening, context?.name, context ? privateTourInquirySelectionLabel(context, locale) : null,
    safePath ? `https://homegroundchina.com${safePath}` : null, tourContactDraftText(locale, draft)].filter(Boolean).join("\n");
}

/** The studio WhatsApp number used by every prepared wa.me link. */
export function homegroundWhatsAppNumber() {
  const configured = process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER || "8613174215999";
  return /^\d{7,15}$/.test(configured) ? configured : "8613174215999";
}

/** A wa.me link to the studio number carrying a prepared message. */
export function homegroundWhatsAppHref(text: string) {
  return `https://wa.me/${homegroundWhatsAppNumber()}?text=${encodeURIComponent(text)}`;
}

export function tourWhatsAppHref(locale: HomegroundLocale, context: PrivateTourInquiryContext | null, path?: string, draft?: TourContactDraft) {
  return homegroundWhatsAppHref(tourContactMessageText(locale, context, path, draft));
}

/** The text a wa.me link would prefill, so another chat channel can reuse it verbatim. */
export function whatsAppHrefText(href: string) {
  try { return new URL(href).searchParams.get("text") || ""; } catch { return ""; }
}

/** Korean only: KakaoTalk is offered on /ko/ pages. */
export const kakaoTalkCopy = {
  action: "카카오톡으로 문의",
  tab: "카카오톡",
  lead: "카카오톡이 더 편하신가요? 버튼을 누르면 문의 내용이 복사되고, 추가할 번호가 표시됩니다.",
  copied: "문의 내용을 복사했어요.",
  copyFailed: "문의 내용을 자동으로 복사하지 못했어요. 아래 내용을 길게 눌러 복사해 주세요.",
  numberLabel: "카카오톡 연락처",
  copyNumber: "번호 복사",
  numberCopied: "번호를 복사했어요",
  steps: "카카오톡 앱 → 친구 추가 → 연락처로 추가에서 이 번호를 추가한 뒤, 복사된 문의 내용을 붙여넣어 보내 주세요.",
  message: "복사할 문의 내용",
} as const;

/** KakaoTalk has no public chat link by phone number: the traveller pastes this after adding the number. */
export function kakaoTalkInquiryText(inquiry: string, phone: KakaoTalkPhone = homegroundKakaoTalkPhone()) {
  return [inquiry.trim(), `Homeground 카카오톡 문의 번호: ${phone.display}`].filter(Boolean).join("\n\n");
}

/** Retain a real link for no-JS / modifier-key navigation. Only tour pages open a quote. */
export function openTourContactFromLink(event: ContactLinkEvent, href: string, locale: HomegroundLocale, returnFocus?: HTMLElement | null) {
  if (event.defaultPrevented) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || (event.button != null && event.button !== 0) || typeof window === "undefined") return false;
  if (!supportsModalDialog()) return false;
  const url = new URL(href, window.location.origin);
  if (url.origin !== window.location.origin) return false;
  const context = getPrivateTourInquiryContextFromSearchParams(url.searchParams, locale);
  if (!context || window.location.pathname !== `${locale === "en" ? "" : `/${locale}`}/tours/${context.slug}/`) return false;
  if (!document.querySelector('[data-homeground-contact-ready="true"]')) return false;
  return claimContactRequest(event, tourContactOpenEvent, context, returnFocus);
}

export function privateTourQuoteApiUrl() {
  const raw = process.env.NEXT_PUBLIC_HOMEGROUND_INQUIRY_API_URL || "";
  try {
    const url = new URL(raw);
    if (url.username || url.password || url.search || url.hash) return "";
    const path = url.pathname.replace(/\/+$/, "");
    if (url.protocol === "https:" && !url.port && url.hostname === "xbymvlxethfzqcgyoieb.supabase.co" && path === "/functions/v1/v1-inquiries") return raw;
    if (process.env.NODE_ENV !== "production" && url.protocol === "http:" && ["127.0.0.1", "localhost"].includes(url.hostname) && path === "/v1/inquiries") return raw;
  } catch { /* Direct contact remains available. */ }
  return "";
}
