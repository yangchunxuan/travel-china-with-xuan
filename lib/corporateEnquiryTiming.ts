import type { CorporateLocale } from "./corporateTravelTypes";
import type { ContactEditionDateCopy } from "./contactEdition";

export type CorporateTimingMode = "month" | "date" | "undecided";
export interface CorporateTiming { mode: CorporateTimingMode; year: string; month: string; date: string; days: string }
export const emptyCorporateTiming: CorporateTiming = { mode: "undecided", year: "", month: "", date: "", days: "" };
interface TimingCopy {
  modes: Record<CorporateTimingMode, string>;
  year: string; month: string; arrival: string; duration: string; optional: string; daysHint: string; chooseYear: string; chooseMonth: string;
  flexible: string; monthError: string; dateError: string; daysError: string;
  durationText: (days: number) => string;
  calendar: ContactEditionDateCopy;
}
export const corporateTimingLocales: Record<CorporateLocale, string> = { en: "en-GB", zh: "zh-CN", ko: "ko-KR", ja: "ja-JP", es: "es-ES", fr: "fr-FR", de: "de-DE", ar: "ar-SA-u-ca-gregory-nu-latn" };
export const corporateTimingCopy: Record<CorporateLocale, TimingCopy> = {
  en: {
    modes: { month: "I know the month", date: "I know the date", undecided: "Dates still open" },
    year: "Year", month: "Travel month", arrival: "Planned arrival date", duration: "Number of days", optional: "(optional)", daysHint: "e.g. 4", chooseYear: "Choose a year", chooseMonth: "Choose a month", flexible: "Dates still open",
    monthError: "Please choose the year and month.", dateError: "Please choose a valid arrival date.", daysError: "Please enter a whole number of days between 1 and 365, or leave it blank.", durationText: days => `${days} ${days === 1 ? "day" : "days"}`,
    calendar: { placeholder: "DD/MM/YYYY", formatHint: "Day / month / year (DD/MM/YYYY)", invalid: "Enter a valid date in DD/MM/YYYY format.", openCalendar: "Open calendar", closeCalendar: "Close calendar", title: "Choose an arrival date", loadingCalendar: "Loading calendar…", calendarUnavailable: "The calendar could not load. Close it to type your date, or reopen it to try again." },
  },
  zh: {
    modes: { month: "月份已定", date: "日期已定", undecided: "日期未定" },
    year: "年份", month: "出行月份", arrival: "预计抵达日期", duration: "预计天数", optional: "（选填）", daysHint: "例如 4", chooseYear: "选择年份", chooseMonth: "选择月份", flexible: "日期未定",
    monthError: "请选择出行年份和月份。", dateError: "请选择有效的抵达日期。", daysError: "请填写 1 到 365 之间的整数天数，或留空。", durationText: days => `${days} 天`,
    calendar: { placeholder: "YYYY/MM/DD", formatHint: "年 / 月 / 日（YYYY/MM/DD）", invalid: "请输入有效日期，格式为 YYYY/MM/DD。", openCalendar: "打开日历", closeCalendar: "关闭日历", title: "选择抵达日期", loadingCalendar: "正在加载日历…", calendarUnavailable: "日历暂时无法加载。请关闭后直接输入日期，或重新打开重试。" },
  },
  ko: {
    modes: { month: "여행할 달은 정했어요", date: "날짜를 정했어요", undecided: "아직 미정이에요" },
    year: "연도", month: "여행할 달", arrival: "도착 예정일", duration: "여행 일수", optional: "(선택)", daysHint: "예: 4", chooseYear: "연도 선택", chooseMonth: "월 선택", flexible: "날짜 미정",
    monthError: "여행할 연도와 월을 선택해 주세요.", dateError: "올바른 도착일을 선택해 주세요.", daysError: "여행 일수는 1~365 사이의 정수로 입력하거나 비워 주세요.", durationText: days => `${days}일`,
    calendar: { placeholder: "YYYY/MM/DD", formatHint: "연 / 월 / 일 (YYYY/MM/DD)", invalid: "YYYY/MM/DD 형식으로 올바른 날짜를 입력해 주세요.", openCalendar: "달력 열기", closeCalendar: "달력 닫기", title: "도착일 선택", loadingCalendar: "달력을 불러오는 중…", calendarUnavailable: "달력을 불러오지 못했습니다. 닫고 날짜를 직접 입력하거나 다시 열어 주세요." },
  },
  ja: {
    modes: { month: "旅行する月は決まっている", date: "日付が決まっている", undecided: "まだ決まっていない" },
    year: "年", month: "旅行予定月", arrival: "到着予定日", duration: "旅行日数", optional: "（任意）", daysHint: "例：4", chooseYear: "年を選ぶ", chooseMonth: "月を選ぶ", flexible: "日程未定",
    monthError: "ご希望の年と月を選んでください。", dateError: "有効な到着日を選んでください。", daysError: "日数は1〜365の整数で入力するか、空欄にしてください。", durationText: days => `${days}日間`,
    calendar: { placeholder: "YYYY/MM/DD", formatHint: "年 / 月 / 日（YYYY/MM/DD）", invalid: "日付を YYYY/MM/DD の形式で正しく入力してください。", openCalendar: "カレンダーを開く", closeCalendar: "カレンダーを閉じる", title: "到着日を選ぶ", loadingCalendar: "カレンダーを読み込んでいます…", calendarUnavailable: "カレンダーを読み込めませんでした。閉じて日付を直接入力するか、もう一度開いてください。" },
  },
  es: {
    modes: { month: "Ya sabemos el mes", date: "Ya tenemos fecha", undecided: "Fechas por decidir" },
    year: "Año", month: "Mes del viaje", arrival: "Fecha de llegada prevista", duration: "Duración en días", optional: "(opcional)", daysHint: "p. ej., 4", chooseYear: "Elegir año", chooseMonth: "Elegir mes", flexible: "Fechas por decidir",
    monthError: "Elige el año y el mes del viaje.", dateError: "Elige una fecha de llegada válida.", daysError: "Indica un número entero de días entre 1 y 365, o deja el campo en blanco.", durationText: days => `${days} ${days === 1 ? "día" : "días"}`,
    calendar: { placeholder: "DD/MM/AAAA", formatHint: "Día / mes / año (DD/MM/AAAA)", invalid: "Escribe una fecha válida con el formato DD/MM/AAAA.", openCalendar: "Abrir el calendario", closeCalendar: "Cerrar el calendario", title: "Elige la fecha de llegada", loadingCalendar: "Cargando el calendario…", calendarUnavailable: "No se ha podido cargar el calendario. Ciérralo para escribir la fecha o vuelve a abrirlo para intentarlo de nuevo." },
  },
  fr: {
    modes: { month: "Nous connaissons le mois", date: "Nous avons une date", undecided: "Dates à définir" },
    year: "Année", month: "Mois du voyage", arrival: "Date d’arrivée prévue", duration: "Durée en jours", optional: "(facultatif)", daysHint: "p. ex. 4", chooseYear: "Choisir l’année", chooseMonth: "Choisir le mois", flexible: "Dates à définir",
    monthError: "Choisissez l’année et le mois du voyage.", dateError: "Choisissez une date d’arrivée valide.", daysError: "Indiquez un nombre entier de jours entre 1 et 365, ou laissez ce champ vide.", durationText: days => `${days} ${days === 1 ? "jour" : "jours"}`,
    calendar: { placeholder: "JJ/MM/AAAA", formatHint: "Jour / mois / année (JJ/MM/AAAA)", invalid: "Saisissez une date valide au format JJ/MM/AAAA.", openCalendar: "Ouvrir le calendrier", closeCalendar: "Fermer le calendrier", title: "Choisissez la date d’arrivée", loadingCalendar: "Chargement du calendrier…", calendarUnavailable: "Le calendrier n’a pas pu être chargé. Fermez-le pour saisir la date ou rouvrez-le pour réessayer." },
  },
  de: {
    modes: { month: "Der Monat steht fest", date: "Das Datum steht fest", undecided: "Reisedaten noch offen" },
    year: "Jahr", month: "Reisemonat", arrival: "Geplantes Ankunftsdatum", duration: "Reisedauer in Tagen", optional: "(optional)", daysHint: "z. B. 4", chooseYear: "Jahr auswählen", chooseMonth: "Monat auswählen", flexible: "Reisedaten noch offen",
    monthError: "Bitte wählen Sie das Reisejahr und den Monat.", dateError: "Bitte wählen Sie ein gültiges Ankunftsdatum.", daysError: "Bitte geben Sie eine ganze Zahl zwischen 1 und 365 ein oder lassen Sie das Feld leer.", durationText: days => `${days} ${days === 1 ? "Tag" : "Tage"}`,
    calendar: { placeholder: "TT/MM/JJJJ", formatHint: "Tag / Monat / Jahr (TT/MM/JJJJ)", invalid: "Geben Sie ein gültiges Datum im Format TT/MM/JJJJ ein.", openCalendar: "Kalender öffnen", closeCalendar: "Kalender schließen", title: "Ankunftsdatum auswählen", loadingCalendar: "Kalender wird geladen …", calendarUnavailable: "Der Kalender konnte nicht geladen werden. Schließen Sie ihn, um das Datum einzugeben, oder öffnen Sie ihn erneut." },
  },
  ar: {
    modes: { month: "حددنا الشهر", date: "حددنا التاريخ", undecided: "لم نحدد الموعد بعد" },
    year: "السنة", month: "شهر السفر", arrival: "تاريخ الوصول المتوقع", duration: "عدد أيام الرحلة", optional: "(اختياري)", daysHint: "مثلاً: 4", chooseYear: "اختر السنة", chooseMonth: "اختر الشهر", flexible: "الموعد لم يحدد بعد",
    monthError: "يرجى اختيار سنة السفر وشهره.", dateError: "يرجى اختيار تاريخ وصول صالح.", daysError: "أدخل عدداً صحيحاً من 1 إلى 365 يوماً، أو اترك الحقل فارغاً.", durationText: days => days === 1 ? "يوم واحد" : days === 2 ? "يومان" : `${days} ${days <= 10 ? "أيام" : "يوماً"}`,
    calendar: { placeholder: "DD/MM/YYYY", formatHint: "اليوم / الشهر / السنة (DD/MM/YYYY)", invalid: "أدخل تاريخاً صالحاً بصيغة DD/MM/YYYY.", openCalendar: "افتح التقويم", closeCalendar: "أغلق التقويم", title: "اختر تاريخ الوصول", loadingCalendar: "جارٍ تحميل التقويم…", calendarUnavailable: "تعذر تحميل التقويم. أغلقه لإدخال التاريخ، أو افتحه مجدداً." },
  },
};

export class CorporateTimingError extends Error {
  readonly field: "year" | "month" | "date" | "days";
  constructor(message: string, field: "year" | "month" | "date" | "days") { super(message); this.name = "CorporateTimingError"; this.field = field; }
}

/** A month remains a month in the customer message; it never becomes a booked date. */
export function buildCorporateTiming(value: CorporateTiming, locale: CorporateLocale): string {
  const copy = corporateTimingCopy[locale];
  let timing = copy.flexible;
  if (value.mode === "month") {
    if (!/^\d{4}$/.test(value.year) || Number(value.year) < 2000) throw new CorporateTimingError(copy.monthError, "year");
    if (!/^(?:0?[1-9]|1[0-2])$/.test(value.month)) throw new CorporateTimingError(copy.monthError, "month");
    timing = new Intl.DateTimeFormat(corporateTimingLocales[locale], { year: "numeric", month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(Number(value.year), Number(value.month) - 1, 1)));
  } else if (value.mode === "date") {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.date);
    const parsed = match ? new Date(`${value.date}T12:00:00Z`) : null;
    if (!parsed || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value.date) throw new CorporateTimingError(copy.dateError, "date");
    timing = new Intl.DateTimeFormat(corporateTimingLocales[locale], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(parsed);
  }
  const days = value.days.trim();
  if (days && (!/^\d{1,3}$/.test(days) || Number(days) < 1 || Number(days) > 365)) throw new CorporateTimingError(copy.daysError, "days");
  return days ? `${timing} · ${copy.durationText(Number(days))}` : timing;
}

export function corporateMonthOptions(locale: CorporateLocale) {
  return Array.from({ length: 12 }, (_, index) => ({ value: String(index + 1), label: new Intl.DateTimeFormat(corporateTimingLocales[locale], { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(2026, index, 1))) }));
}
