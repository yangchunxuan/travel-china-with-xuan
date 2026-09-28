import {
  getPrivateTourInquiryContext,
  getPrivateTourInquirySelection,
  privateTourInquirySelectionLabel,
  // @ts-ignore Deno resolves explicit TypeScript extensions.
} from "../../../lib/privateTourInquiryContext.ts";
import { safeInquiryDestinationNames, safeInquiryNights } from "../../../lib/inquirySafeSummary.ts";

export const travellerAckReplyTo = "hello@homegroundchina.com";
export const travellerAckPrivacyVersion = "2026-09-28.1";
export type TravellerAckLocale = "en" | "zh" | "ko" | "ja";
export interface TravellerAckContext {
  public_reference: string;
  locale: TravellerAckLocale;
  entry_path: string;
  answers: Record<string, unknown>;
  inquiry_created_at: string;
  first_response_due_at: string;
  requested_travelers?: number | null;
}

const copy = {
  en: {
    subject: "Your China trip enquiry", greeting: "Hi,", heading: "We’ve received your enquiry",
    intro: "Thank you for your enquiry. This is an automatic note to confirm we’ve received it.",
    reference: "Reference", enquiry: "Your enquiry", custom: "Custom trip enquiry",
    requested: "Arrival date", undecided: "Dates not decided", selection: "Price option",
    pricing: "The price shown is for this group size. We’ll confirm your actual number of travellers.",
    next: "What happens next", reply: (h: number) => `A trip planner will write to you from ${travellerAckReplyTo} within ${h} hours of your enquiry. We’re based in China (UTC+8). You don’t need to submit again.`,
    quote: "After checking your dates and group details, we’ll send your itinerary and exact quote. Your request is not a confirmed booking or a guarantee of availability.",
    contacts: `Found this email in Spam or Junk? Mark it ‘Not spam’ and reply ‘Received’ — that helps our replies reach your inbox. You can also add ${travellerAckReplyTo} to your contacts or, in Outlook, your Safe senders list.`,
    whatsapp: (r: string) => `Prefer WhatsApp? Message +86 131 7421 5999 and mention ${r}.`,
    notMe: "Didn’t send this enquiry? Reply “not me” and we’ll stop following up with this email address.",
    signature: "Homeground China · Private, tailor-made China trips",
    nights: "Trip length (nights)", destinations: "Requested destinations",
    colon: ": ", open: " (", close: ")",
  },
  zh: {
    subject: "你的中国旅行咨询", greeting: "你好，", heading: "我们已收到你的咨询",
    intro: "感谢你的咨询。这是一封自动确认信，你的咨询我们已经收到。",
    reference: "咨询编号", enquiry: "咨询内容", custom: "定制旅行咨询",
    requested: "抵达日期", undecided: "日期未定", selection: "价格方案",
    pricing: "这是页面上按该人数计算的参考价，实际人数我们会再和你确认。",
    next: "接下来", reply: (h: number) => `旅行规划师会在收到咨询后 ${h} 小时内，从 ${travellerAckReplyTo} 给你写信。我们在中国（UTC+8），无需重复提交。`,
    quote: "核对日期和同行人信息后，我们会发给你行程和准确报价。咨询不代表预订已确认，也不代表酒店、车辆已经留好。",
    contacts: `如果这封信在垃圾邮件里，请标记为“非垃圾邮件”并回复“已收到”，之后的回信更容易进收件箱。也可以把 ${travellerAckReplyTo} 加入通讯录；使用 Outlook 时，可加入“安全发件人”名单。`,
    whatsapp: (r: string) => `更习惯用 WhatsApp？发消息到 +86 131 7421 5999，并附上编号 ${r}。`,
    notMe: "不是你本人提交的？回复“不是我”，我们会停止向这个邮箱跟进这次咨询。",
    signature: "Homeground China · 私人定制中国之旅",
    nights: "计划住宿晚数", destinations: "希望游览的目的地",
    colon: "：", open: "（", close: "）",
  },
  ko: {
    subject: "중국 여행 문의", greeting: "안녕하세요.", heading: "문의를 접수했습니다",
    intro: "문의해 주셔서 감사합니다. 문의가 접수되었음을 알려 드리는 자동 확인 메일입니다.",
    reference: "문의 번호", enquiry: "문의 내용", custom: "맞춤 여행 문의",
    requested: "도착일", undecided: "날짜 미정", selection: "가격 옵션",
    pricing: "상품 페이지의 인원 기준 요금이며, 실제 여행 인원은 다시 확인드립니다.",
    next: "다음 단계", reply: (h: number) => `여행 플래너가 문의 접수 후 ${h}시간 이내에 ${travellerAckReplyTo}에서 회신드리겠습니다. 저희는 중국(UTC+8)에 있습니다. 다시 제출하실 필요는 없습니다.`,
    quote: "여행 날짜와 인원 정보를 확인한 뒤 일정표와 정확한 견적을 보내드리겠습니다. 문의 접수는 예약 확정이나 이용 가능 여부의 보장을 의미하지 않습니다.",
    contacts: `이 메일을 스팸함에서 찾으셨다면 ‘스팸 아님’으로 표시하고 ‘받았습니다’라고 답장해 주세요. 이후 답변이 받은편지함에 더 잘 도착합니다. ${travellerAckReplyTo}를 연락처에 추가하거나, Outlook에서는 수신 허용 목록에 추가하실 수도 있습니다.`,
    whatsapp: (r: string) => `WhatsApp이 편하시면 +86 131 7421 5999로 메시지를 보내시고 문의 번호 ${r}를 알려 주세요.`,
    notMe: "직접 문의하지 않으셨나요? “본인 아님”이라고 회신하시면 이 이메일 주소로 더 이상 해당 문의에 대해 연락드리지 않겠습니다.",
    signature: "Homeground China · 중국 프라이빗 맞춤 여행",
    nights: "예정 숙박 일수", destinations: "희망 목적지",
    colon: ": ", open: " (", close: ")",
  },
  ja: {
    subject: "中国旅行のお問い合わせ", greeting: "", heading: "お問い合わせを受け付けました",
    intro: "このたびは Homeground China にお問い合わせいただき、誠にありがとうございます。このメールは受付完了をお知らせする自動確認メールです。",
    reference: "お問い合わせ番号", enquiry: "お問い合わせ内容", custom: "オーダーメイド旅行のお問い合わせ",
    requested: "到着日", undecided: "日程未定", selection: "料金プラン",
    pricing: "商品ページの人数に基づく料金です。実際の参加人数は改めて確認いたします。",
    next: "今後の流れ", reply: (h: number) => `担当プランナーが受付から${h}時間以内に ${travellerAckReplyTo} よりご返信いたします。私たちは中国（UTC+8）を拠点にしています。お問い合わせを再送信する必要はありません。`,
    quote: "日程と参加者の情報を確認後、旅程と正確なお見積もりをお送りします。お問い合わせの受付は、予約の確定や空き状況の保証を意味するものではありません。",
    contacts: `このメールが迷惑メールフォルダに入っていた場合は「迷惑メールではない」に設定し、「受け取りました」とご返信ください。今後の返信が受信トレイに届きやすくなります。${travellerAckReplyTo} を連絡先、または Outlook の差出人セーフリストに追加することもできます。`,
    whatsapp: (r: string) => `WhatsApp をご希望の場合は +86 131 7421 5999 に、お問い合わせ番号 ${r} を添えてご連絡ください。`,
    notMe: "お問い合わせに心当たりがない場合は「心当たりなし」とご返信ください。このメールアドレスへの本件に関するご連絡を停止します。",
    signature: "Homeground China · 中国のプライベート・オーダーメイド旅行",
    nights: "予定宿泊数", destinations: "希望の目的地",
    colon: "：", open: "（", close: "）",
  },
} as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function htmlEscape(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}
/** The traveller's chosen calendar date in their own language (never shifted by time zone). */
function localDate(value: string, locale: TravellerAckLocale): string {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : locale === "en" ? "en-GB" : locale, { timeZone: "UTC", year: "numeric", month: locale === "en" ? "short" : "long", day: "numeric" })
    .format(new Date(Date.UTC(year, month - 1, day)));
}

type Row = { label: string; value: string } | { note: string };

export function renderTravellerAcknowledgement(job: TravellerAckContext): { subject: string; text: string; html: string } {
  if (!Object.hasOwn(copy, job.locale) || !/^HG-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(job.public_reference)) {
    throw new Error("invalid_ack_identity");
  }
  const c = copy[job.locale];
  const hours = Math.round((Date.parse(job.first_response_due_at) - Date.parse(job.inquiry_created_at)) / 3_600_000);
  if (!Number.isInteger(hours) || hours < 1 || hours > 720) throw new Error("invalid_ack_deadline");
  const rows: Row[] = [{ label: c.reference, value: job.public_reference }];
  if (Number.isInteger(job.requested_travelers) && job.requested_travelers! >= 1 && job.requested_travelers! <= 99) {
    const label = { en: "Requested number of travellers", zh: "填写的出行人数", ko: "입력하신 여행 인원", ja: "入力された参加人数" }[job.locale];
    rows.push({ label, value: String(job.requested_travelers) });
  }
  const suppliedProduct = job.answers.productInterest;
  if (isRecord(suppliedProduct)) {
    const suppliedSelection = suppliedProduct.selection;
    const selection = isRecord(suppliedSelection)
      ? getPrivateTourInquirySelection(String(suppliedProduct.slug), String(suppliedSelection.packageId), Number(suppliedSelection.travelers))
      : null;
    if (suppliedSelection && !selection) throw new Error("invalid_ack_product_selection");
    const product = getPrivateTourInquiryContext(String(suppliedProduct.slug), job.locale, selection ?? undefined);
    if (!product) throw new Error("invalid_ack_product");
    rows.push({ label: c.enquiry, value: product.name });
    if (job.entry_path === "private_tour_quote") {
      const date = job.answers.travelDate;
      rows.push({ label: c.requested, value: typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date) ? localDate(date, job.locale) : c.undecided });
    }
    const label = privateTourInquirySelectionLabel(product, job.locale);
    if (label) rows.push({ label: c.selection, value: label }, { note: c.pricing });
  } else {
    // A homepage email enquiry has no trip details yet; its internal source name means nothing to the traveller.
    if (job.entry_path !== "homepage_email") rows.push({ label: c.enquiry, value: c.custom });
    const nights = safeInquiryNights(job.answers.totalNights ?? job.answers.nights);
    if (nights !== null) rows.push({ label: c.nights, value: String(nights) });
    const names = safeInquiryDestinationNames(job.answers.destinationIds, job.locale);
    if (names.length) rows.push({ label: c.destinations, value: names.join(" · ") });
  }
  // No free-text note, otherPlace, arbitrary URL, or supplied product name is echoed.
  const rowText = rows.map((row) => "note" in row ? row.note : `${row.label}${c.colon}${row.value}`).join("\n");
  const followUp = job.entry_path === "private_tour_quote" ? [c.quote] : [];
  const sections = [...(c.greeting ? [c.greeting] : []), c.intro, rowText, `${c.next}\n${c.reply(hours)}`, ...followUp,
    c.contacts, c.whatsapp(job.public_reference), c.notMe, c.signature];
  const e = htmlEscape;
  const p = (text: string, style = "") => `<p style="margin:0 0 14px;${style}">${e(text)}</p>`;
  const rowHtml = rows.map((row, index) => "note" in row
    ? `<p style="margin:10px 0 0;color:#6b6a64;font-size:13px;line-height:1.55">${e(row.note)}</p>`
    : `<p style="margin:0;padding:${index ? "10px" : "0"} 0 10px;${index ? "border-top:1px solid #e6e2d8;" : ""}font-size:14px;line-height:1.5"><span style="display:block;color:#6b6a64;font-size:12px">${e(row.label)}</span><strong style="font-weight:600;color:#141413">${e(row.value)}</strong></p>`).join("");
  return {
    subject: `${c.subject}${c.open}${job.public_reference}${c.close}`,
    text: sections.join("\n\n"),
    html: `<!doctype html><html lang="${job.locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>`
      + `<body style="margin:0;padding:0;background:#f5f3ec;color:#141413;font-family:Arial,Helvetica,sans-serif">`
      + `<main style="max-width:560px;margin:0 auto;padding:28px 14px">`
      + `<div style="background:#ffffff;border:1px solid #e6e2d8;border-radius:16px;padding:32px 28px;color:#3d3c38;font-size:15px;line-height:1.65">`
      + `<p style="margin:0 0 22px;color:#a74731;font-size:12px;font-weight:700;letter-spacing:.16em">HOMEGROUND CHINA</p>`
      + `<h1 style="margin:0 0 12px;color:#141413;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:400;line-height:1.25">${e(c.heading)}</h1>`
      + p(c.intro)
      + `<div style="margin:22px 0 26px;padding:16px 18px;background:#f6f4ee;border-radius:12px">${rowHtml}</div>`
      + `<h2 style="margin:0 0 8px;color:#141413;font-size:15px;font-weight:700;line-height:1.4">${e(c.next)}</h2>`
      + p(c.reply(hours)) + followUp.map((text) => p(text)).join("")
      + p(c.contacts, "margin-top:18px;padding-left:12px;border-left:3px solid #ead6cb;color:#5f5f5a;font-size:13px;line-height:1.6")
      + p(c.whatsapp(job.public_reference), "font-size:14px").replace(job.public_reference, `<span style="white-space:nowrap">${job.public_reference}</span>`)
      + p(c.notMe, "color:#6b6a64;font-size:12px;line-height:1.55")
      + `<p style="margin:22px 0 0;padding-top:16px;border-top:1px solid #e6e2d8;color:#141413;font-size:13px">${e(c.signature)}</p>`
      + `</div></main></body></html>`,
  };
}
