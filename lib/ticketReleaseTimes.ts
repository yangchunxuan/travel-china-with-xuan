import type { HomegroundLocale } from "./homegroundI18n";

/**
 * Ticket releases that a source guide states precisely enough to compute: a
 * fixed number of days before the visit, at a fixed China wall-clock time.
 * China keeps UTC+8 all year (no daylight saving), so every release instant
 * is exact. The wording each rule is read from stays in
 * attractionReservationRules (`release`, `verifiedAt`, `source`); the release
 * tool's tests keep these numbers in step with that wording.
 *
 * Rules a guide words loosely ("within seven days", "for the next seven
 * days") are listed as text only, never computed, because a one-day misread
 * would send a traveller to an empty booking page.
 *
 * Small and dependency-free on purpose: the calculator ships it to the
 * browser, and lib/attractionReservations.ts pulls in the tour catalogue.
 */
export const ticketReleaseToolAttractionIds = ["forbidden-city", "shaanxi-history-museum"] as const;
export type TicketReleaseToolAttractionId = (typeof ticketReleaseToolAttractionIds)[number];

export interface TicketReleaseRule {
  readonly id: TicketReleaseToolAttractionId;
  readonly daysBefore: number;
  /** Release time on the China clock, "HH:MM". */
  readonly chinaTime: string;
  /** The weekday the attraction normally closes (0 = Sunday … 6 = Saturday), when the guide states one. */
  readonly usualClosedWeekday: number | null;
  /** The attraction's own booking page, linked from the result and the calendar reminder. */
  readonly officialUrl: string;
  /** When the release rule itself was last read on the official channel ("YYYY-MM-DD"). */
  readonly releaseCheckedAt: string;
}

export const ticketReleaseRules: Readonly<Record<TicketReleaseToolAttractionId, TicketReleaseRule>> = {
  "forbidden-city": {
    id: "forbidden-city",
    daysBefore: 7,
    chinaTime: "20:00",
    usualClosedWeekday: 1,
    // The guide's 8 October 2026 recheck: the official portal states 20:00, seven days before.
    officialUrl: "https://bookingticket.dpm.org.cn/",
    releaseCheckedAt: "2026-10-08",
  },
  "shaanxi-history-museum": {
    id: "shaanxi-history-museum",
    daysBefore: 5,
    chinaTime: "17:00",
    usualClosedWeekday: null,
    officialUrl: "https://en.sxhm.com/en/new/visit.html",
    releaseCheckedAt: "2026-08-12",
  },
};

export const ticketReleaseToolPath: Readonly<Record<HomegroundLocale, string>> = {
  en: "/tools/forbidden-city-ticket-release-time/",
  zh: "/zh/tools/forbidden-city-ticket-release-time/",
  ko: "/ko/tools/forbidden-city-ticket-release-time/",
};

export const CHINA_TIME_ZONE = "Asia/Shanghai";
const CHINA_UTC_OFFSET_HOURS = 8;
const DAY_MS = 86_400_000;

const isoDate = /^(\d{4})-(\d{2})-(\d{2})$/u;

/** "YYYY-MM-DD" → [year, month (1–12), day], or null when it is not a real calendar date. */
export function parseVisitDate(value: string): readonly [number, number, number] | null {
  const match = isoDate.exec(value);
  if (!match) return null;
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const check = new Date(Date.UTC(year, month - 1, day));
  if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) return null;
  return [year, month, day];
}

/** The instant tickets for `visitDate` (a China calendar date) go on sale. */
export function ticketReleaseInstant(rule: TicketReleaseRule, visitDate: string): Date | null {
  const parts = parseVisitDate(visitDate);
  if (!parts) return null;
  const [year, month, day] = parts;
  const [hours, minutes] = rule.chinaTime.split(":").map(Number);
  return new Date(Date.UTC(year, month - 1, day - rule.daysBefore, hours - CHINA_UTC_OFFSET_HOURS, minutes));
}

/** The China calendar date ("YYYY-MM-DD") of an instant. */
export function chinaDate(instant: Date): string {
  return new Date(instant.getTime() + CHINA_UTC_OFFSET_HOURS * 3_600_000).toISOString().slice(0, 10);
}

/** `visitDate` shifted by whole days, as "YYYY-MM-DD". */
export function addDays(visitDate: string, days: number): string {
  const parts = parseVisitDate(visitDate);
  if (!parts) return visitDate;
  return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]) + days * DAY_MS).toISOString().slice(0, 10);
}

export function visitWeekday(visitDate: string): number | null {
  const parts = parseVisitDate(visitDate);
  return parts ? new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])).getUTCDay() : null;
}

export type TicketReleaseStatus =
  /** The visit date is today or earlier in China: no booking is possible any more. */
  | "too-late"
  /** Tickets are already on sale (and may have sold out). */
  | "on-sale"
  /** Tickets go on sale in the future. */
  | "upcoming";

export function ticketReleaseStatus(rule: TicketReleaseRule, visitDate: string, now: Date): TicketReleaseStatus | null {
  const release = ticketReleaseInstant(rule, visitDate);
  if (!release) return null;
  if (visitDate <= chinaDate(now)) return "too-late";
  return now.getTime() < release.getTime() ? "upcoming" : "on-sale";
}

/** The earliest open visit date whose tickets have not gone on sale yet, from `now`. */
export function firstUpcomingVisitDate(rule: TicketReleaseRule, now: Date): string {
  let candidate = addDays(chinaDate(now), 1);
  for (let step = 0; step < rule.daysBefore + 9; step += 1) {
    const release = ticketReleaseInstant(rule, candidate);
    const closed = rule.usualClosedWeekday !== null && visitWeekday(candidate) === rule.usualClosedWeekday;
    if (release && release.getTime() > now.getTime() && !closed) return candidate;
    candidate = addDays(candidate, 1);
  }
  return candidate;
}

function icsStamp(instant: Date) {
  return instant.toISOString().replace(/[-:]/gu, "").replace(/\.\d{3}/u, "");
}

function icsText(value: string) {
  return value.replace(/\\/gu, "\\\\").replace(/\r?\n/gu, "\\n").replace(/[,;]/gu, (character) => "\\" + character);
}

/** RFC 5545 folds content lines longer than 75 octets, continuing with a leading space. */
function icsFold(line: string) {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = "";
  for (const character of line) {
    const limit = parts.length === 0 ? 75 : 74;
    if (encoder.encode(current + character).length > limit) {
      parts.push(current);
      current = character;
    } else {
      current += character;
    }
  }
  parts.push(current);
  return parts.join("\r\n ");
}

/**
 * A one-event calendar file: it starts, and alerts, ten minutes before the
 * release, so the traveller is signed in to the booking page when tickets open.
 */
export function ticketReleaseCalendarFile({
  rule,
  visitDate,
  title,
  description,
  now,
}: {
  rule: TicketReleaseRule;
  visitDate: string;
  title: string;
  description: string;
  now: Date;
}): string | null {
  const release = ticketReleaseInstant(rule, visitDate);
  if (!release) return null;
  const start = new Date(release.getTime() - 10 * 60_000);
  const end = new Date(release.getTime() + 20 * 60_000);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Homeground China//Ticket release reminder//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${rule.id}-${visitDate}@homegroundchina.com`,
    `DTSTAMP:${icsStamp(now)}`,
    `DTSTART:${icsStamp(start)}`,
    `DTEND:${icsStamp(end)}`,
    `SUMMARY:${icsText(title)}`,
    `DESCRIPTION:${icsText(description)}`,
    `URL:${rule.officialUrl}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "TRIGGER:PT0M",
    `DESCRIPTION:${icsText(title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].map(icsFold).join("\r\n") + "\r\n";
}

/** The same reminder as a Google Calendar link, for browsers that will not open a downloaded .ics file. */
export function ticketReleaseGoogleCalendarUrl({
  rule,
  visitDate,
  title,
  description,
}: {
  rule: TicketReleaseRule;
  visitDate: string;
  title: string;
  description: string;
}): string | null {
  const release = ticketReleaseInstant(rule, visitDate);
  if (!release) return null;
  const start = new Date(release.getTime() - 10 * 60_000);
  const end = new Date(release.getTime() + 20 * 60_000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${icsStamp(start)}/${icsStamp(end)}`,
    details: description,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
