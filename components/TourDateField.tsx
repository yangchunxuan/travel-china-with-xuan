"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { CalendarDays, X } from "lucide-react";
import type { TourCalendarProps } from "./TourCalendar";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { dateFromIso, dateToIso, formatTourDate, parseTourDate, tourDateCopy } from "../lib/tourDate";
import type { ContactEditionDateCopy } from "../lib/contactEdition";
import styles from "./TourDateField.module.css";

/** A visible, editable field; neither its text nor its calendar uses the OS locale. */
export function TourDateField({ id, label, locale, edition, value, onChange, disabled, active, required = true, appearance = "box" }: {
  id: string; label: string; locale: HomegroundLocale; value: string;
  /** A language edition keeps `locale`'s date order and brings its own words and calendar language. */
  edition?: { language: TourCalendarProps['language']; date: ContactEditionDateCopy };
  onChange: (iso: string) => void; disabled: boolean; active: boolean;
  /** Optional dates (a trip brief) accept an empty field without an error; tour pages keep the default. */
  required?: boolean;
  /** "line": a hairline blank in the full-trip page's language, no box and no icon. Tour pages keep the box. */
  appearance?: "box" | "line";
}) {
  // Japanese uses the same year-first parser as Chinese, with its own visible copy.
  const dateLocale = edition?.language === 'ja' ? 'zh' : locale;
  const copy = edition?.date ?? tourDateCopy[locale];
  const [raw, setRaw] = useState(() => formatTourDate(value, dateLocale));
  const [touched, setTouched] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [Calendar, setCalendar] = useState<ComponentType<TourCalendarProps> | null>(null);
  const [calendarLoadFailed, setCalendarLoadFailed] = useState(false);
  const [month, setMonth] = useState(() => dateFromIso(value) || new Date());
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDialogElement>(null);
  const lastEmitted = useRef(value);
  const lastLocale = useRef(dateLocale);
  const iso = parseTourDate(raw, dateLocale);
  // An optional field is only invalid when something unreadable was typed.
  const invalid = !iso && (required || raw.trim() !== "");

  useEffect(() => {
    if (!calendarOpen || Calendar || disabled || !active) return;
    let cancelled = false;
    setCalendarLoadFailed(false);
    // Keep the date library and its locale data off the initial page load.
    // A failed download leaves manual date entry available; reopening retries.
    import("./TourCalendar").then(module => {
      if (!cancelled) setCalendar(() => module.default);
    }).catch(() => {
      if (!cancelled) setCalendarLoadFailed(true);
    });
    return () => { cancelled = true; };
  }, [calendarOpen, Calendar, disabled, active]);

  useEffect(() => {
    // Do not erase partially typed text when our own onChange emits an empty ISO.
    if (value !== lastEmitted.current || dateLocale !== lastLocale.current) {
      setRaw(formatTourDate(value, dateLocale));
      setTouched(false);
    }
    lastEmitted.current = value;
    lastLocale.current = dateLocale;
  }, [value, dateLocale]);

  useEffect(() => {
    inputRef.current?.setCustomValidity(invalid ? copy.invalid : "");
  }, [invalid, copy.invalid]);

  useEffect(() => {
    const dialog = calendarRef.current;
    if (!dialog) return;
    if (!calendarOpen || !active || disabled) {
      dialog.close();
      if (calendarOpen) setCalendarOpen(false);
      return;
    }
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>('button[tabindex="0"]')?.focus();
    return () => dialog.close();
  }, [calendarOpen, active, disabled]);

  function closeCalendar() {
    calendarRef.current?.close();
    setCalendarOpen(false);
    if (active && !disabled) inputRef.current?.focus({ preventScroll: true });
  }

  function chooseDate(selected: Date | undefined) {
    if (!selected || disabled || !active) return;
    const next = dateToIso(selected);
    if (!next) return;
    lastEmitted.current = next;
    setRaw(formatTourDate(next, dateLocale));
    onChange(next);
    setTouched(false);
    inputRef.current?.setCustomValidity("");
    closeCalendar();
  }

  return <div className={appearance === "line" ? `${styles.field} ${styles.line}` : styles.field} lang={edition?.language ?? (locale === "zh" ? "zh-CN" : locale)}>
    <label htmlFor={id} className={styles.label}>{label}</label>
    <div className={styles.row}>
      <input ref={inputRef} id={id} type="text" inputMode="numeric" autoComplete="off"
        required={required} disabled={disabled} value={raw} maxLength={24} placeholder={copy.placeholder}
        aria-describedby={`${id}-hint${touched && invalid ? ` ${id}-error` : ""}`}
        aria-invalid={touched && invalid ? true : undefined}
        onChange={event => {
          const next = parseTourDate(event.target.value, dateLocale);
          event.target.setCustomValidity(next || (!required && event.target.value.trim() === "") ? "" : copy.invalid);
          setRaw(event.target.value);
          lastEmitted.current = next;
          onChange(next);
          setTouched(false);
        }}
        onBlur={() => { setTouched(true); if (iso) setRaw(formatTourDate(iso, dateLocale)); }}
        onInvalid={event => { event.preventDefault(); setTouched(true); event.currentTarget.focus(); }} />
      <button type="button" className={styles.open} disabled={disabled} aria-label={copy.openCalendar}
        aria-haspopup="dialog" aria-expanded={calendarOpen} aria-controls={`${id}-calendar`}
        onClick={() => { setMonth(dateFromIso(value) || new Date()); setCalendarOpen(true); }}>
        <CalendarDays size={19} strokeWidth={1.7} aria-hidden="true" />
      </button>
    </div>
    <p id={`${id}-hint`} className={styles.hint}>{copy.formatHint}</p>
    {touched && invalid ? <p id={`${id}-error`} className={styles.error} role="alert">{copy.invalid}</p> : null}
    <dialog ref={calendarRef} id={`${id}-calendar`} className={styles.calendar} aria-labelledby={`${id}-calendar-title`}
      onCancel={event => { event.preventDefault(); event.stopPropagation(); closeCalendar(); }}
      onClick={event => { if (event.target === event.currentTarget) closeCalendar(); }}>
      <div className={styles.heading}><strong id={`${id}-calendar-title`}>{copy.title}</strong>
        <button type="button" className={styles.close} aria-label={copy.closeCalendar} onClick={closeCalendar}><X size={19} aria-hidden="true" /></button>
      </div>
      {calendarOpen ? Calendar ? <Calendar locale={locale} language={edition?.language} title={edition?.date.title} value={value} onSelect={chooseDate}
        month={month} onMonthChange={setMonth} disabled={disabled} />
        : <p className={styles.calendarStatus} role={calendarLoadFailed ? "alert" : "status"}>
          {calendarLoadFailed ? copy.calendarUnavailable : copy.loadingCalendar}
        </p> : null}
    </dialog>
  </div>;
}
