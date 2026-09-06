export const newsletterConsentVersion = "2026-09-06.1" as const;
export type NewsletterLocale = "en" | "zh" | "ko";
export type NewsletterRequest = {
  action: "subscribe";
  requestId: string;
  email: string;
  firstName: string;
  locale: NewsletterLocale;
  sourcePath: string;
  consent: true;
  consentVersion: typeof newsletterConsentVersion;
  website: "";
} | {
  action: "confirm" | "unsubscribe";
  requestId: string;
  token: string;
};

const uuidV4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const tokenPattern = /^[0-9a-f]{64}$/;
const controls = /[\u0000-\u001f\u007f]/u;

export function validateNewsletterRequest(value: unknown): NewsletterRequest | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  if (typeof input.requestId !== "string" || !uuidV4.test(input.requestId)) return null;
  const requestId = input.requestId.toLowerCase();
  if (input.action === "confirm" || input.action === "unsubscribe") {
    if (Object.keys(input).some((key) => !["action", "requestId", "token"].includes(key))) return null;
    if (typeof input.token !== "string" || !tokenPattern.test(input.token)) return null;
    return { action: input.action, requestId, token: input.token };
  }
  if (input.action !== "subscribe" || input.consent !== true ||
      input.consentVersion !== newsletterConsentVersion || input.website !== "") return null;
  if (Object.keys(input).some((key) => ![
    "action", "requestId", "email", "firstName", "locale", "sourcePath", "consent", "consentVersion", "website",
  ].includes(key))) return null;
  if (!["en", "zh", "ko"].includes(String(input.locale))) return null;
  if (typeof input.email !== "string" || input.email.length > 254 || controls.test(input.email)) return null;
  const email = input.email.trim().toLowerCase();
  const parts = email.split("@");
  if (parts.length !== 2 || parts[0].length > 64 || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(parts[0]) ||
      parts[0].startsWith(".") || parts[0].endsWith(".") || parts[0].includes("..") ||
      !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(parts[1]) ||
      parts[1].split(".").some((part) => part.length > 63)) return null;
  if (input.firstName !== undefined && (typeof input.firstName !== "string" ||
      input.firstName.length > 80 || controls.test(input.firstName))) return null;
  if (typeof input.sourcePath !== "string" || input.sourcePath.length > 240 ||
      !/^\/[a-z0-9/_-]*$/i.test(input.sourcePath) || input.sourcePath.includes("//")) return null;
  return {
    action: "subscribe", requestId, email, firstName: (input.firstName as string | undefined)?.trim() ?? "",
    locale: input.locale as NewsletterLocale, sourcePath: input.sourcePath,
    consent: true, consentVersion: newsletterConsentVersion, website: "",
  };
}

export function newsletterPageUrl(origin: string, locale: NewsletterLocale, action: "confirm" | "unsubscribe", token: string): string {
  if (!tokenPattern.test(token)) throw new Error("invalid_token");
  return `${origin}${locale === "en" ? "" : `/${locale}`}/newsletter/${action}/#token=${token}`;
}

export function newsletterConfirmationMessage(locale: NewsletterLocale, confirmUrl: string, unsubscribeUrl: string) {
  // Plain text contains only fixed copy and trusted fragment URLs; optional names
  // are stored for future editorial use, never inserted into email headers/HTML.
  const copy = {
    en: ["Confirm your Homeground China newsletter subscription", "Please confirm that you want Homeground China travel ideas, local advice and private journeys by email.", "Confirm subscription", "This link expires after 24 hours. If you did not request this, you can ignore this email. You will not receive the newsletter without confirmation.", "Cancel this request or unsubscribe"],
    zh: ["请确认订阅 Homeground China 邮件", "请确认你希望通过邮件接收 Homeground China 旅行灵感、本地建议和私人线路。", "确认订阅", "链接在 24 小时后失效。如果不是你本人申请，可以忽略此邮件。未完成确认，不会收到订阅内容。", "取消本次申请或退订"],
    ko: ["Homeground China 뉴스레터 구독을 확인해 주세요", "Homeground China의 여행 아이디어, 현지 조언과 프라이빗 여행 소식을 이메일로 받으려면 구독을 확인해 주세요.", "구독 확인", "링크는 24시간 후 만료됩니다. 직접 요청하지 않았다면 이 이메일을 무시하셔도 됩니다. 확인 전에는 뉴스레터가 발송되지 않습니다.", "요청 취소 또는 구독 해지"],
  }[locale];
  return { subject: copy[0], text: `${copy[1]}\n\n${copy[2]}:\n${confirmUrl}\n\n${copy[3]}\n\n${copy[4]}:\n${unsubscribeUrl}\n\nHomeground China` };
}
