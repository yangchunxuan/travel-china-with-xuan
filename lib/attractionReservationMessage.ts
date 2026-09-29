import type { AttractionReservationEnquiryCopy } from "./attractionReservationsI18n";

/**
 * The prepared reservation request shared by WhatsApp, email and KakaoTalk.
 * It carries only what the traveller chose on the page: service, cities,
 * attractions, dates, party size and an optional note. Passport details are
 * never part of it (they are requested only after the written confirmation).
 */
export interface AttractionReservationDraft {
  cities: readonly string[];
  attractions: readonly string[];
  from: string | null;
  to: string | null;
  travellers: number | null;
  note: string;
  pageUrl: string;
}

export const attractionReservationNoteMaxLength = 600;

const isoDate = /^\d{4}-\d{2}-\d{2}$/u;

export function attractionReservationDates(draft: Pick<AttractionReservationDraft, "from" | "to">, undecided: string) {
  const from = draft.from && isoDate.test(draft.from) ? draft.from : null;
  const to = draft.to && isoDate.test(draft.to) ? draft.to : null;
  if (from && to) return from === to ? from : `${from} – ${to}`;
  return from ?? to ?? undecided;
}

export function attractionReservationMessageText(copy: AttractionReservationEnquiryCopy["message"], draft: AttractionReservationDraft) {
  const note = draft.note.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/gu, "").trim().slice(0, attractionReservationNoteMaxLength);
  const travellers = draft.travellers && Number.isInteger(draft.travellers) && draft.travellers > 0 ? String(draft.travellers) : copy.none;
  return [
    copy.opening,
    `${copy.service}: ${copy.serviceValue}`,
    `${copy.city}: ${draft.cities.length ? draft.cities.join(", ") : copy.none}`,
    `${copy.attractions}: ${draft.attractions.length ? draft.attractions.join("; ") : copy.none}`,
    `${copy.dates}: ${attractionReservationDates(draft, copy.datesUndecided)}`,
    `${copy.travellers}: ${travellers}`,
    note ? `${copy.note}: ${note}` : null,
    draft.pageUrl,
  ].filter(Boolean).join("\n");
}

export function attractionReservationMailtoHref(email: string, copy: AttractionReservationEnquiryCopy["message"], draft: AttractionReservationDraft) {
  const subject = draft.cities.length ? `${copy.subject} – ${draft.cities.join(", ")}` : copy.subject;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(attractionReservationMessageText(copy, draft))}`;
}
