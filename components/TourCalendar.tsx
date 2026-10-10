"use client";

import { DayPicker } from "@daypicker/react";
import { enGB, es, zhCN, ko } from "@daypicker/react/locale";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { dateFromIso, tourDateCopy } from "../lib/tourDate";
import "@daypicker/react/style.css";
import styles from "./TourDateField.module.css";

const calendarLocales = { en: enGB, zh: zhCN, ko, es };

export interface TourCalendarProps {
  locale: HomegroundLocale;
  /** A language edition's calendar language and title, in place of the locale's. */
  language?: "es";
  title?: string;
  value: string;
  month: Date;
  onMonthChange: (month: Date) => void;
  onSelect: (selected: Date | undefined) => void;
  disabled: boolean;
}

export default function TourCalendar({ locale, language, title, value, month, onMonthChange, onSelect, disabled }: TourCalendarProps) {
  return <DayPicker className={styles.days} mode="single" required locale={calendarLocales[language ?? locale]}
    selected={dateFromIso(value)} onSelect={onSelect} month={month} onMonthChange={onMonthChange}
    captionLayout="dropdown" navLayout="after"
    startMonth={dateFromIso(`${String(Math.min(2000, month.getFullYear())).padStart(4, "0")}-01-01`)}
    endMonth={new Date(Math.max(new Date().getFullYear() + 10, month.getFullYear()), 11)}
    autoFocus role="application" aria-label={title ?? tourDateCopy[locale].title} disabled={disabled} showOutsideDays />;
}
