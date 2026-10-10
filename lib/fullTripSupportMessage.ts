import type { FullTripSupportCopy } from "./fullTripSupportI18n";

/** Any currency is welcome; these are the ones the brief's selector offers. */
export const fullTripBudgetCurrencies = ["USD", "EUR", "GBP", "AUD", "CAD", "SGD", "MYR", "HKD", "CNY", "KRW", "JPY"] as const;
export type FullTripBudgetCurrency = (typeof fullTripBudgetCurrencies)[number];
export const fullTripBudgetDefaultCurrency = { en: "USD", zh: "CNY", ko: "KRW" } as const satisfies Record<string, FullTripBudgetCurrency>;
export const fullTripBudgetBases = ["person", "group"] as const;
export type FullTripBudgetBasis = (typeof fullTripBudgetBases)[number];

/** A typed budget is only stopped from running away; the page sets no floor or ceiling. */
export const fullTripBudgetMaxDigits = 10;
/** Party size and days are typed too; three digits is room for any real trip. */
export const fullTripCountMaxDigits = 3;
/** Room for "next April" or "春节前后"; where the sentence supplies "月", two digits. */
export const fullTripMonthMaxLength = 16;
/** The cities stay on the message's first line, so they are kept short. */
export const fullTripCitiesMaxLength = 60;
export const fullTripNoteMaxLength = 400;

/**
 * The brief is one sentence: who is coming, for how long, on what budget if
 * there is one, leaving when, to which cities, and whatever else the
 * traveller wants us to hear. This is full-trip planning, so nobody is asked
 * to pick parts of it. Every blank may stay empty.
 */
export interface FullTripSupportDraft {
  /** Digits only, as typed; each is empty when the traveller has not said. */
  budget: string;
  currency: FullTripBudgetCurrency;
  basis: FullTripBudgetBasis;
  travellers: string;
  days: string;
  /** As typed: a month number where the sentence supplies "月", else free words. */
  month: string;
  cities: string;
  note: string;
  pageUrl: string;
}

const fill = (template: string, values: Readonly<Record<string, string | number>>) =>
  template.replace(/\{(\w+)\}/gu, (match, key: string) => (key in values ? String(values[key]) : match));

/** Digits only, without leading zeros, cut to a sane length. */
export function fullTripDigits(value: string, maxDigits: number) {
  return value.replace(/\D/gu, "").replace(/^0+/u, "").slice(0, maxDigits);
}

/** A month number, 1 to 12: a digit that would pass 12 is not taken. */
export function fullTripMonthDigits(value: string) {
  const digits = fullTripDigits(value, 2);
  return Number(digits) > 12 ? digits.slice(0, 1) : digits;
}

/** Typed words as they will be sent: no control characters, single spaces, trimmed, cut to length. */
export function fullTripWords(value: string, maxLength: number) {
  return value.replace(/[\u0000-\u001f\u007f]+/gu, " ").replace(/\s+/gu, " ").trim().slice(0, maxLength);
}

/** Digits grouped in threes with ASCII commas, identical on server and browser. */
export function groupFullTripBudgetDigits(digits: string) {
  return digits.replace(/^0+(?=\d)/u, "").replace(/\B(?=(\d{3})+(?!\d))/gu, ",");
}

/** "USD 1,500", or "" when no number was given. Passed on exactly as typed. */
export function fullTripBudgetText(draft: Pick<FullTripSupportDraft, "budget" | "currency">) {
  const digits = fullTripDigits(draft.budget, fullTripBudgetMaxDigits);
  return digits ? `${draft.currency} ${groupFullTripBudgetDigits(digits)}` : "";
}

/**
 * The prepared WhatsApp / email / KakaoTalk text: only what the traveller
 * typed; an unsaid part is simply absent. The first line names the service
 * and carries the party, length, month, cities and budget, so the phone-scan
 * code keeps them even when it has to drop the rest (see
 * `whatsappQrCandidates`); what else they wanted to say follows on its own
 * line.
 */
export function fullTripSupportMessage(copy: FullTripSupportCopy, draft: FullTripSupportDraft) {
  const message = copy.enquiry.message;
  const travellers = fullTripDigits(draft.travellers, fullTripCountMaxDigits);
  const days = fullTripDigits(draft.days, fullTripCountMaxDigits);
  const month = fullTripWords(draft.month, fullTripMonthMaxLength);
  const cities = fullTripWords(draft.cities, fullTripCitiesMaxLength);
  const note = fullTripWords(draft.note, fullTripNoteMaxLength);
  const budget = fullTripBudgetText(draft);
  const parts: string[] = [];
  if (travellers) parts.push(fill(travellers === "1" ? message.partyOne : message.party, { count: travellers }));
  if (days) parts.push(fill(message.length, { days }));
  if (month) parts.push(fill(message.month, { month }));
  if (cities) parts.push(fill(message.cities, { cities }));
  parts.push(budget ? fill(message.budgetPart, { budget, basis: copy.brief.basis[draft.basis] }) : message.budgetOpen);
  const said = Boolean(travellers || days || month || cities || budget);
  return [
    said ? `${message.opening}${message.openingJoin}${parts.join(message.partSeparator)}${message.sentenceEnd}` : `${message.opening}${message.sentenceEnd}`,
    budget ? message.flights : null,
    note ? `${message.noteLabel}${message.labelSeparator}${note}` : null,
    draft.pageUrl,
  ].filter(Boolean).join("\n");
}
