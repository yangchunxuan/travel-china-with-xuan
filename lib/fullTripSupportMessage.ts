import type { FullTripSupportCopy } from "./fullTripSupportI18n";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { fullTripSupportNeeds, type FullTripSupportNeed } from "./fullTripSupport.ts";

export interface FullTripSupportDraft {
  cities: string;
  from: string | null;
  to: string | null;
  travellers: string;
  needs: readonly FullTripSupportNeed[];
  note: string;
  pageUrl: string;
}

export const fullTripSupportTextMaxLength = 600;

const clean = (value: string, max: number) =>
  value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/gu, "").trim().slice(0, max);
const isoDate = /^\d{4}-\d{2}-\d{2}$/u;

/** The prepared WhatsApp / email / KakaoTalk text: only what the traveller chose on the page. */
export function fullTripSupportMessage(copy: FullTripSupportCopy, draft: FullTripSupportDraft) {
  const message = copy.enquiry.message;
  const cities = clean(draft.cities, 200);
  const count = Number(draft.travellers);
  const travellers = draft.travellers.trim() && Number.isSafeInteger(count) && count > 0 && count < 100 ? String(count) : message.none;
  const from = draft.from && isoDate.test(draft.from) ? draft.from : null;
  const to = draft.to && isoDate.test(draft.to) ? draft.to : null;
  // A range typed end-first is shown in order (ISO dates sort as text).
  const [start, end] = from && to && to < from ? [to, from] : [from, to];
  const dates = start && end ? (start === end ? start : `${start} – ${end}`) : start ?? end ?? message.datesOpen;
  const needs = fullTripSupportNeeds.filter((need: FullTripSupportNeed) => draft.needs.includes(need)).map((need: FullTripSupportNeed) => copy.needs[need].title);
  const note = clean(draft.note, fullTripSupportTextMaxLength);
  const line = (label: string, value: string) => `${label}${message.labelSeparator}${value}`;
  return [
    // The opening (and the email subject) already name the service.
    message.opening,
    line(message.cities, cities || message.none),
    line(message.dates, dates),
    line(message.travellers, travellers),
    line(message.needs, needs.length ? needs.join(message.listSeparator) : message.none),
    note ? line(message.note, note) : null,
    draft.pageUrl,
  ].filter(Boolean).join("\n");
}
