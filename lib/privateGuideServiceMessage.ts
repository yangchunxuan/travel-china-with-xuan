import type { HomegroundLocale } from "./homegroundI18n";
import type { PrivateGuideServiceCopy } from "./privateGuideServicesI18n";
import type { ServiceEditionLocale } from "./serviceEdition";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { formatPrivateGuideEditionPrice, getPrivateGuideServiceEditionLanguageCopy } from "./privateGuideServiceEditions.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { privateGuideCities, privateGuideRates, getPrivateGuideRates, formatPrivateGuidePrice, type PrivateGuideCity } from "./privateGuideServices.ts";

export interface PrivateGuideEnquiryDraft {
  city: PrivateGuideCity | "";
  date: string;
  travellers: string;
  note: string;
  pageUrl: string;
  guideLanguage?: "en" | ServiceEditionLocale;
}

export const privateGuideNoteMaxLength = 600;

export function privateGuideServiceMessage(copy: PrivateGuideServiceCopy, locale: HomegroundLocale, draft: PrivateGuideEnquiryDraft, editionLocale?: ServiceEditionLocale) {
  const message = copy.enquiry.message;
  const languageCopy = editionLocale ? getPrivateGuideServiceEditionLanguageCopy(editionLocale) : null;
  const localGuide = Boolean(editionLocale && draft.guideLanguage === editionLocale);
  const city = privateGuideCities.includes(draft.city as PrivateGuideCity) ? draft.city as PrivateGuideCity : null;
  const numericCount = Number(draft.travellers);
  const count = draft.travellers.trim() && Number.isSafeInteger(numericCount) && numericCount > 0 ? String(numericCount) : message.none;
  const date = /^\d{4}-\d{2}-\d{2}$/.test(draft.date) ? draft.date : message.none;
  const note = draft.note.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/gu, "").trim().slice(0, privateGuideNoteMaxLength);
  return [localGuide ? languageCopy!.opening : message.opening, `${message.service}: ${localGuide ? languageCopy!.serviceValue : message.serviceValue}`,
    languageCopy ? `${languageCopy.label}: ${localGuide ? languageCopy.local : languageCopy.english}` : null,
    `${message.city}: ${city ? copy.cities[city].name : message.none}`,
    `${message.date}: ${date}`, `${message.travellers}: ${count}`,
    city && !localGuide ? `${message.rate}: ${editionLocale ? formatPrivateGuideEditionPrice(privateGuideRates[city].standardCny, editionLocale) : formatPrivateGuidePrice(getPrivateGuideRates(locale)[city].standardCny, locale)} · ${copy.unit}` : null,
    note ? `${message.route}: ${note}` : null, localGuide ? languageCopy!.rateNote : message.rateNote, draft.pageUrl,
  ].filter(Boolean).join("\n");
}
