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
    subject: "Your China trip enquiry", greeting: "Hi,",
    intro: "Thank you for your enquiry. This automatic confirmation means we have received it.",
    reference: "Reference", enquiry: "Your enquiry", homepage: "Homepage enquiry", custom: "Custom trip enquiry",
    requested: "Requested travel date", undecided: "Dates not decided", selection: "Selected pricing option",
    pricing: "This is the published price basis, not a confirmed number of travellers.",
    next: "What happens next", reply: (h: number) => `The Homeground team will write to you within ${h} hours of your enquiry, from ${travellerAckReplyTo}. We're based in China (GMT+8). You don't need to submit again.`,
    quote: "After checking your dates and group details, we will send your itinerary and exact quote. Your request is not a confirmed booking or a guarantee of availability.",
    contacts: `If you found this email in Spam or Junk, mark it as ‘Not spam’ or ‘Not junk’ and reply ‘Received’ so we know you’ve seen it. You can also add ${travellerAckReplyTo} to your contacts or, in Outlook, your Safe senders list.`,
    whatsapp: (r: string) => `Prefer WhatsApp? Message +86 131 7421 5999 and mention ${r}.`,
    notMe: 'Did not send this enquiry? Reply "not me" and we will stop following up with this email address.',
    signature: "Homeground China · Private, tailor-made China trips",
    nights: "Trip length (nights)", destinations: "Requested destinations",
  },
  zh: {
    subject: "你的中国旅行咨询", greeting: "你好，",
    intro: "感谢你的咨询。这是一封自动确认信，说明我们已经收到你的咨询。",
    reference: "咨询编号", enquiry: "你的咨询", homepage: "首页咨询", custom: "定制旅行咨询",
    requested: "希望出行的日期", undecided: "日期未定", selection: "所选报价方案",
    pricing: "这是页面的报价人数基准，不代表已确认的实际出行人数。",
    next: "接下来", reply: (h: number) => `Homeground 团队会在收到咨询后 ${h} 小时内，从 ${travellerAckReplyTo} 给你写信。我们在中国（GMT+8），无需重复提交咨询。`,
    quote: "核对日期和同行人信息后，我们会发给你行程和准确报价。咨询不代表预订已确认，也不代表酒店、车辆等资源已确认可用。",
    contacts: `如果这封信在垃圾邮件中，请标记为“非垃圾邮件”，并回复一句“已收到”，方便我们确认你已看到邮件。你也可以把 ${travellerAckReplyTo} 加入通讯录；使用 Outlook 时，可加入“安全发件人”名单。`,
    whatsapp: (r: string) => `更习惯用 WhatsApp？发消息到 +86 131 7421 5999，并附上编号 ${r}。`,
    notMe: '不是你本人提交的？回复“not me”，我们会停止向这个邮箱跟进这次咨询。',
    signature: "Homeground China · 私人定制中国之旅",
    nights: "计划住宿晚数", destinations: "希望游览的目的地",
  },
  ko: {
    subject: "중국 여행 문의", greeting: "안녕하세요.",
    intro: "문의해 주셔서 감사합니다. 문의가 접수되었음을 알려 드리는 자동 확인 메일입니다.",
    reference: "문의 번호", enquiry: "문의 내용", homepage: "홈페이지 문의", custom: "맞춤 여행 문의",
    requested: "희망 여행 날짜", undecided: "날짜 미정", selection: "선택한 요금 옵션",
    pricing: "상품 페이지의 요금 산정 기준이며, 실제 여행 인원이 확정되었다는 뜻은 아닙니다.",
    next: "다음 단계", reply: (h: number) => `Homeground 팀이 문의 접수 후 ${h}시간 이내에 ${travellerAckReplyTo}에서 회신드리겠습니다. 저희는 중국(GMT+8)에 있습니다. 다시 제출하실 필요는 없습니다.`,
    quote: "여행 날짜와 인원 정보를 확인한 뒤 일정표와 정확한 견적을 보내드리겠습니다. 문의 접수는 예약 확정이나 이용 가능 여부의 보장을 의미하지 않습니다.",
    contacts: `이 메일을 스팸함에서 찾으셨다면 ‘스팸 아님’으로 표시하고 ‘받았습니다’라고 답장해 주시면 수신 여부를 확인할 수 있습니다. ${travellerAckReplyTo}를 연락처에 추가하거나, Outlook에서는 수신 허용 목록에 추가하실 수도 있습니다.`,
    whatsapp: (r: string) => `WhatsApp이 편하시면 +86 131 7421 5999로 메시지를 보내시고 문의 번호 ${r}를 알려 주세요.`,
    notMe: '직접 문의하지 않으셨나요? "not me"라고 회신하시면 이 이메일 주소로 더 이상 해당 문의에 대해 연락드리지 않겠습니다.',
    signature: "Homeground China · 중국 프라이빗 맞춤 여행",
    nights: "예정 숙박 일수", destinations: "희망 목적지",
  },
  ja: {
    subject: "中国旅行のお問い合わせ", greeting: "",
    intro: "このたびは Homeground China にお問い合わせいただき、誠にありがとうございます。このメールは受付完了をお知らせする自動確認メールです。",
    reference: "お問い合わせ番号", enquiry: "お問い合わせ内容", homepage: "ホームページからのお問い合わせ", custom: "オーダーメイド旅行のお問い合わせ",
    requested: "ご希望の旅行日", undecided: "日程未定", selection: "選択した料金プラン",
    pricing: "商品ページの料金算定基準であり、実際の参加人数が確定したことを意味するものではありません。",
    next: "今後の流れ", reply: (h: number) => `Homeground チームが受付から${h}時間以内に ${travellerAckReplyTo} よりご返信いたします。私たちは中国（GMT+8）におります。お問い合わせを再送信する必要はありません。`,
    quote: "日程と参加者の情報を確認後、旅程と正確なお見積もりをお送りします。お問い合わせの受付は、予約の確定や空き状況の保証を意味するものではありません。",
    contacts: `このメールが迷惑メールに入っていた場合は「迷惑メールではない」に設定し、「受け取りました」とご返信いただけますと、届いたことを確認できます。${travellerAckReplyTo} を連絡先、または Outlook の差出人セーフリストに追加することもできます。`,
    whatsapp: (r: string) => `WhatsApp をご希望の場合は +86 131 7421 5999 に、お問い合わせ番号 ${r} を添えてご連絡ください。`,
    notMe: 'お問い合わせに心当たりがない場合は「not me」とご返信ください。このメールアドレスへの本件に関するご連絡を停止します。',
    signature: "Homeground China · 中国のプライベート・オーダーメイド旅行",
    nights: "予定宿泊数", destinations: "希望の目的地",
  },
} as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function htmlEscape(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

export function renderTravellerAcknowledgement(job: TravellerAckContext): { subject: string; text: string; html: string } {
  if (!Object.hasOwn(copy, job.locale) || !/^HG-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(job.public_reference)) {
    throw new Error("invalid_ack_identity");
  }
  const c = copy[job.locale];
  const hours = Math.round((Date.parse(job.first_response_due_at) - Date.parse(job.inquiry_created_at)) / 3_600_000);
  if (!Number.isInteger(hours) || hours < 1 || hours > 720) throw new Error("invalid_ack_deadline");
  const context: string[] = [];
  if (Number.isInteger(job.requested_travelers) && job.requested_travelers >= 1 && job.requested_travelers <= 99) {
    const label = { en: "Requested number of travellers", zh: "填写的出行人数", ko: "입력하신 여행 인원", ja: "入力された参加人数" }[job.locale];
    context.push(`${label}: ${job.requested_travelers}`);
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
    context.push(`${c.enquiry}: ${product.name}`);
    if (job.entry_path === "private_tour_quote") {
      const date = job.answers.travelDate;
      const safeDate = typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : c.undecided;
      context.push(`${c.requested}: ${safeDate}`);
    }
    const label = privateTourInquirySelectionLabel(product, job.locale);
    if (label) context.push(`${c.selection}: ${label}`, c.pricing);
  } else {
    context.push(`${c.enquiry}: ${job.entry_path === "homepage_email" ? c.homepage : c.custom}`);
    const nights = safeInquiryNights(job.answers.totalNights ?? job.answers.nights);
    if (nights !== null) {
      context.push(`${c.nights}: ${nights}`);
    }
    const names = safeInquiryDestinationNames(job.answers.destinationIds, job.locale);
    if (names.length) context.push(`${c.destinations}: ${names.join(" · ")}`);
  }
  // No free-text note, otherPlace, arbitrary URL, or supplied product name is echoed.
  const sections = [...(c.greeting ? [c.greeting] : []), c.intro, `${c.reference}: ${job.public_reference}\n${context.join("\n")}`,
    `${c.next}\n${c.reply(hours)}`, ...(job.entry_path === "private_tour_quote" ? [c.quote] : []),
    c.contacts, c.whatsapp(job.public_reference), c.notMe, c.signature];
  return {
    subject: `${c.subject} (${job.public_reference})`,
    text: sections.join("\n\n"),
    html: `<!doctype html><html lang="${job.locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f5f3ec;color:#171717;font-family:Arial,sans-serif"><main style="max-width:560px;margin:24px auto;padding:28px;background:#fff;line-height:1.65"><p style="font-weight:700;letter-spacing:.02em">HOMEGROUND CHINA</p>${sections.map((section) => `<p>${htmlEscape(section).replace(/\n/g, "<br>")}</p>`).join("")}</main></body></html>`,
  };
}
