"use client";

import { DayPicker } from "@daypicker/react";
import { enGB, zhCN, ko } from "@daypicker/react/locale";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { dateFromIso, tourDateCopy } from "../lib/tourDate";
import "@daypicker/react/style.css";
import styles from "./TourDateField.module.css";

const calendarLocales = { en: enGB, zh: zhCN, ko };

export interface TourCalendarProps {
  locale: HomegroundLocale;
  value: string;
  month: Date;
  onMonthChange: (month: Date) => void;
  onSelect: (selected: Date | undefined) => void;
  disabled: boolean;
}

export default function TourCalendar({ locale, value, month, onMonthChange, onSelect, disabled }: TourCalendarProps) {
  return <DayPicker className={styles.days} mode="single" required locale={calendarLocales[locale]}
    selected={dateFromIso(value)} onSelect={onSelect} month={month} onMonthChange={onMonthChange}
    captionLayout="dropdown" navLayout="after"
    startMonth={dateFromIso(`${String(Math.min(2000, month.getFullYear())).padStart(4, "0")}-01-01`)}
    endMonth={new Date(Math.max(new Date().getFullYear() + 10, month.getFullYear()), 11)}
    autoFocus role="application" aria-label={tourDateCopy[locale].title} disabled={disabled} showOutsideDays />;
}
