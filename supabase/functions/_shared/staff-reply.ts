/** A clean new message: never copy internal notes, budgets or notification HTML. */
export function staffReplyMailto(email: string, reference: string, locale: string): string {
  if (!/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/u.test(email) || /[\r\n]/u.test(reference)) {
    throw new Error("invalid_staff_reply_contact");
  }
  const greetings: Record<string, string> = {
    en: "Hi,\r\n\r\nThank you for contacting Homeground China.",
    zh: "你好，\r\n\r\n感谢你联系 Homeground China。",
    ko: "안녕하세요.\r\n\r\nHomeground China에 문의해 주셔서 감사합니다.",
    ja: "このたびは Homeground China にお問い合わせいただき、誠にありがとうございます。",
  };
  const subject = `Your China trip enquiry (${reference})`;
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(greetings[locale] ?? greetings.en)}`;
}
