import type { HomegroundLocale } from "./homegroundI18n";
import type { PrivateGuideServiceCopy } from "./privateGuideServicesI18n";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { privateGuideCities, privateGuideRates, formatPrivateGuidePrice, type PrivateGuideCity } from "./privateGuideServices.ts";

export interface PrivateGuideEnquiryDraft {
  city: PrivateGuideCity | "";
  date: string;
  travellers: string;
  note: string;
  pageUrl: string;
}

export const privateGuideNoteMaxLength = 600;

export function privateGuideServiceMessage(copy: PrivateGuideServiceCopy, locale: HomegroundLocale, draft: PrivateGuideEnquiryDraft) {
  const message = copy.enquiry.message;
  const city = privateGuideCities.includes(draft.city as PrivateGuideCity) ? draft.city as PrivateGuideCity : null;
  const numericCount = Number(draft.travellers);
  const count = draft.travellers.trim() && Number.isSafeInteger(numericCount) && numericCount > 0 ? String(numericCount) : message.none;
  const date = /^\d{4}-\d{2}-\d{2}$/.test(draft.date) ? draft.date : message.none;
  const note = draft.note.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/gu, "").trim().slice(0, privateGuideNoteMaxLength);
  return [message.opening, `${message.service}: ${message.serviceValue}`,
    `${message.city}: ${city ? copy.cities[city].name : message.none}`,
    `${message.date}: ${date}`, `${message.travellers}: ${count}`,
    city ? `${message.rate}: ${formatPrivateGuidePrice(privateGuideRates[city].standardCny, locale)} · ${copy.unit}` : null,
    note ? `${message.route}: ${note}` : null, message.rateNote, draft.pageUrl,
  ].filter(Boolean).join("\n");
}
