/**
 * Owner decision, 2026-10-22: Homeground replies to customers in French,
 * German, Spanish, Arabic and Japanese (machine translation checked by a
 * person) within 12 hours. Every contact point of those editions says so in
 * its own language, using these lines (or a sentence built on them).
 *
 * The 12 hours is the same public reply time as the English, Chinese and
 * Korean pages: keep it in step with REPLY_SLA_HOURS and the
 * NEXT_PUBLIC_HOMEGROUND_REPLY_SLA_* build values (docs/inquiry-deployment.md).
 */
export const editionReplyPromise = {
  fr: 'Nous vous répondons en français sous 12 heures.',
  de: 'Wir antworten Ihnen auf Deutsch innerhalb von 12 Stunden.',
  es: 'Te respondemos en español en un plazo de 12 horas.',
  ar: 'نرد عليك بالعربية خلال 12 ساعة.',
  ja: '日本語で12時間以内にご返信します。',
} as const;

export type EditionReplyLanguage = keyof typeof editionReplyPromise;

/** The Spanish line for pages that address the reader as usted (the Spanish guides). */
export const spanishFormalReplyPromise = 'Le respondemos en español en un plazo de 12 horas.';

/** What each line must say, for tests: the reply language and the 12 hours. */
export const editionReplyPromisePattern: Readonly<Record<EditionReplyLanguage, RegExp>> = {
  fr: /en français[^.]*12 heures|12 heures[^.]*en français/u,
  de: /auf Deutsch[^.]*12 Stunden|12 Stunden[^.]*auf Deutsch/u,
  es: /en español[^.]*12 horas|12 horas[^.]*en español/u,
  ar: /بالعربية[^.]*12 ساعة|12 ساعة[^.]*بالعربية/u,
  ja: /日本語で[^。]*12時間以内/u,
};

/** `text` followed by the reply line, spaced the way the language joins sentences. */
export function withEditionReplyPromise(text: string, language: EditionReplyLanguage): string {
  const promise = editionReplyPromise[language];
  return language === 'ja' ? `${text}${promise}` : `${text} ${promise}`;
}
