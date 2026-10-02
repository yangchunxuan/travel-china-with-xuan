import type { AttractionReservationEnquiryCopy } from "./attractionReservationsI18n";

/** One chosen attraction and the single day it is to be visited. */
export interface AttractionReservationVisit {
  label: string;
  date: string | null;
}

/**
 * The prepared reservation request shared by WhatsApp, email and KakaoTalk.
 * It carries only what the traveller chose on the page: service, cities,
 * each attraction with its visit date, party size and an optional note.
 * Passport details are never part of it (they are requested only after the
 * written confirmation).
 */
export interface AttractionReservationDraft {
  cities: readonly string[];
  visits: readonly AttractionReservationVisit[];
  travellers: number | null;
  note: string;
  pageUrl: string;
}

export const attractionReservationNoteMaxLength = 600;

const isoDate = /^\d{4}-\d{2}-\d{2}$/u;

/** A ticket is for one day, so each attraction carries one date or "not decided yet". */
export function attractionReservationVisitDate(date: string | null, undecided: string) {
  return date && isoDate.test(date) ? date : undecided;
}

export function attractionReservationMessageText(copy: AttractionReservationEnquiryCopy["message"], draft: AttractionReservationDraft) {
  const note = draft.note.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/gu, "").trim().slice(0, attractionReservationNoteMaxLength);
  const travellers = draft.travellers && Number.isInteger(draft.travellers) && draft.travellers > 0 ? String(draft.travellers) : copy.none;
  return [
    copy.opening,
    `${copy.service}: ${copy.serviceValue}`,
    `${copy.city}: ${draft.cities.length ? draft.cities.join(", ") : copy.none}`,
    ...(draft.visits.length
      ? [`${copy.attractions}:`, ...draft.visits.map((visit) => `· ${visit.label}: ${attractionReservationVisitDate(visit.date, copy.datesUndecided)}`)]
      : [`${copy.attractions}: ${copy.none}`]),
    `${copy.travellers}: ${travellers}`,
    note ? `${copy.note}: ${note}` : null,
    draft.pageUrl,
  ].filter(Boolean).join("\n");
}

export function attractionReservationMailtoHref(email: string, copy: AttractionReservationEnquiryCopy["message"], draft: AttractionReservationDraft) {
  const subject = draft.cities.length ? `${copy.subject} – ${draft.cities.join(", ")}` : copy.subject;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(attractionReservationMessageText(copy, draft))}`;
}
