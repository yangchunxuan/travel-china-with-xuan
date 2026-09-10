import type { HomegroundLocale } from "./homegroundI18n";

export const tourDateCopy = {
  en: {
    placeholder: "DD/MM/YYYY",
    formatHint: "Day / month / year (DD/MM/YYYY)",
    invalid: "Enter a valid date in DD/MM/YYYY format.",
    openCalendar: "Open calendar",
    closeCalendar: "Close calendar",
    title: "Choose a travel date",
  },
  zh: {
    placeholder: "YYYY/MM/DD",
    formatHint: "年 / 月 / 日（YYYY/MM/DD）",
    invalid: "请输入有效日期，格式为 YYYY/MM/DD。",
    openCalendar: "打开日历",
    closeCalendar: "关闭日历",
    title: "选择出行日期",
  },
  ko: {
    placeholder: "YYYY/MM/DD",
    formatHint: "연 / 월 / 일 (YYYY/MM/DD)",
    invalid: "YYYY/MM/DD 형식으로 올바른 날짜를 입력해 주세요.",
    openCalendar: "달력 열기",
    closeCalendar: "달력 닫기",
    title: "여행 날짜 선택",
  },
} as const;

interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

function validCalendarDate(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || year < 1 || year > 9999 ||
      !Number.isInteger(month) || month < 1 || month > 12 ||
      !Number.isInteger(day) || day < 1) return false;
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= days[month - 1];
}

function calendarIso(year: number, month: number, day: number): string {
  if (!validCalendarDate(year, month, day)) return "";
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function isoParts(iso: string): CalendarDate | undefined {
  if (typeof iso !== "string") return undefined;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(iso);
  if (!match) return undefined;
  const [, year, month, day] = match.map(Number);
  return validCalendarDate(year, month, day) ? { year, month, day } : undefined;
}

export function parseTourDate(text: string, locale: HomegroundLocale): string {
  if (typeof text !== "string") return "";
  const input = text.trim();
  const iso = isoParts(input);
  if (iso) return calendarIso(iso.year, iso.month, iso.day);

  // Mobile numeric keyboards may not offer a slash. Keep the same explicit
  // locale order instead of guessing another date layout when validation fails.
  if (/^\d{8}$/u.test(input)) {
    return locale === "en"
      ? calendarIso(Number(input.slice(4)), Number(input.slice(2, 4)), Number(input.slice(0, 2)))
      : calendarIso(Number(input.slice(0, 4)), Number(input.slice(4, 6)), Number(input.slice(6)));
  }

  if (locale === "en") {
    const match = /^(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{4})$/u.exec(input);
    return match ? calendarIso(Number(match[3]), Number(match[2]), Number(match[1])) : "";
  }

  let match = /^(\d{4})\s*\/\s*(\d{1,2})\s*\/\s*(\d{1,2})$/u.exec(input);
  if (!match && locale === "zh") match = /^(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日?$/u.exec(input);
  if (!match && locale === "ko") match = /^(\d{4})\s*년\s*(\d{1,2})\s*월\s*(\d{1,2})\s*일?$/u.exec(input);
  return match ? calendarIso(Number(match[1]), Number(match[2]), Number(match[3])) : "";
}

export function formatTourDate(iso: string, locale: HomegroundLocale): string {
  const parts = isoParts(iso);
  if (!parts) return "";
  const year = String(parts.year).padStart(4, "0");
  const month = String(parts.month).padStart(2, "0");
  const day = String(parts.day).padStart(2, "0");
  return locale === "en" ? `${day}/${month}/${year}` : `${year}/${month}/${day}`;
}

export function dateFromIso(iso: string): Date | undefined {
  const parts = isoParts(iso);
  if (!parts) return undefined;
  // The numeric Date constructor treats years 0–99 as 1900–1999. Setting the
  // full year explicitly retains the backend's complete 0001–9999 range.
  const date = new Date(0);
  date.setHours(12, 0, 0, 0);
  date.setFullYear(parts.year, parts.month - 1, parts.day);
  // A historical timezone change can skip an entire local date. Do not
  // silently select its neighbouring day in the calendar in that case.
  return date.getHours() === 12 && dateToIso(date) === iso ? date : undefined;
}

export function dateToIso(date: Date): string {
  if (!Number.isFinite(date.getTime())) return "";
  return calendarIso(date.getFullYear(), date.getMonth() + 1, date.getDate());
}
