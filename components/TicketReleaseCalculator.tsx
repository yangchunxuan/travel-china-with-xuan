"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CalendarPlus } from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { fillTicketReleaseCopy, type TicketReleaseCalculatorCopy } from "../lib/ticketReleaseTimeI18n";
import {
  CHINA_TIME_ZONE, chinaDate, firstUpcomingVisitDate, parseVisitDate, ticketReleaseCalendarFile,
  ticketReleaseGoogleCalendarUrl, ticketReleaseInstant, ticketReleaseRules, ticketReleaseStatus,
  ticketReleaseToolAttractionIds, visitWeekday, type TicketReleaseToolAttractionId,
} from "../lib/ticketReleaseTimes";
import styles from "./TicketReleaseTimePage.module.css";

/** One date style per page language, matching the page's "Rule checked" dates. */
const dateLocales: Record<HomegroundLocale, string> = { en: "en-GB", zh: "zh-CN", ko: "ko-KR" };

function zoneLabel(zone: string, copy: TicketReleaseCalculatorCopy) {
  if (zone === CHINA_TIME_ZONE) return copy.chinaZone;
  return copy.zones[zone] ?? zone.split("/").pop()?.replace(/_/gu, " ") ?? zone;
}

function countdownText(ms: number, copy: TicketReleaseCalculatorCopy) {
  const totalMinutes = Math.max(1, Math.ceil(ms / 60_000));
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  const parts = [];
  if (days) parts.push(fillTicketReleaseCopy(copy.units.days, { n: days }));
  if (days || hours) parts.push(fillTicketReleaseCopy(copy.units.hours, { n: hours }));
  parts.push(fillTicketReleaseCopy(copy.units.minutes, { n: minutes }));
  return parts.join(" ");
}

/**
 * Turns a visit date into the moment its tickets go on sale, shown first in
 * the visitor's own time zone and then in China time, with a calendar
 * reminder. It renders nothing date-dependent until mounted, because the
 * static page is built long before anyone opens it.
 */
export function TicketReleaseCalculator({ locale, copy }: { locale: HomegroundLocale; copy: TicketReleaseCalculatorCopy }) {
  const [attraction, setAttraction] = useState<TicketReleaseToolAttractionId>("forbidden-city");
  const [visitDate, setVisitDate] = useState("");
  const [zone, setZone] = useState(CHINA_TIME_ZONE);
  const [detectedZone, setDetectedZone] = useState<string | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const rule = ticketReleaseRules[attraction];
  const dateLocale = dateLocales[locale];

  useEffect(() => {
    const current = new Date();
    setNow(current);
    setVisitDate(firstUpcomingVisitDate(ticketReleaseRules["forbidden-city"], current));
    try {
      const resolved = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (resolved) { setDetectedZone(resolved); setZone(resolved); }
    } catch { /* keep China time */ }
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const zones = useMemo(() => {
    const list = [CHINA_TIME_ZONE, ...Object.keys(copy.zones)];
    if (detectedZone && !list.includes(detectedZone)) list.unshift(detectedZone);
    return list;
  }, [copy.zones, detectedZone]);

  const release = visitDate ? ticketReleaseInstant(rule, visitDate) : null;
  const status = release && now ? ticketReleaseStatus(rule, visitDate, now) : null;
  const parts = parseVisitDate(visitDate);
  const visitLabel = parts
    ? new Intl.DateTimeFormat(dateLocale, { timeZone: "UTC", weekday: "short", day: "numeric", month: "short", year: "numeric" })
      .format(new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 12)))
    : "";
  const moment = (timeZone: string) => {
    if (!release) return { date: "", time: "" };
    try {
      return {
        date: new Intl.DateTimeFormat(dateLocale, { timeZone, weekday: "short", day: "numeric", month: "short" }).format(release),
        time: new Intl.DateTimeFormat(dateLocale, { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(release),
      };
    } catch {
      return moment(CHINA_TIME_ZONE);
    }
  };
  const local = moment(zone);
  const china = moment(CHINA_TIME_ZONE);
  const closed = parts !== null && rule.usualClosedWeekday !== null && visitWeekday(visitDate) === rule.usualClosedWeekday;
  const minDate = now ? chinaDate(now) : undefined;
  const reminderValues = { attraction: copy.attractionNames[attraction], visit: visitLabel, time: rule.chinaTime, url: rule.officialUrl };
  const reminderTitle = fillTicketReleaseCopy(copy.reminderTitle, reminderValues);
  const reminderDescription = fillTicketReleaseCopy(copy.reminderDescription, reminderValues);
  const googleCalendarUrl = status === "upcoming"
    ? ticketReleaseGoogleCalendarUrl({ rule, visitDate, title: reminderTitle, description: reminderDescription })
    : null;

  function downloadReminder() {
    if (!release || !now) return;
    const file = ticketReleaseCalendarFile({ rule, visitDate, now, title: reminderTitle, description: reminderDescription });
    if (!file) return;
    const url = URL.createObjectURL(new Blob([file], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${attraction}-tickets-${visitDate}.ics`;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
  }

  return (
    <div className={styles.calculator} data-ticket-release-calculator>
      <div className={styles.calculatorFields}>
        <label className={styles.field}>
          <span>{copy.attraction}</span>
          <select value={attraction} onChange={(event) => setAttraction(event.target.value as TicketReleaseToolAttractionId)}>
            {ticketReleaseToolAttractionIds.map((id) => <option key={id} value={id}>{copy.attractionNames[id]}</option>)}
          </select>
        </label>
        <label className={styles.field}>
          <span>{copy.visitDate}</span>
          <input type="date" value={visitDate} min={minDate} onChange={(event) => setVisitDate(event.target.value)} />
        </label>
        <label className={styles.field}>
          <span>{copy.timeZone}</span>
          <select value={zone} onChange={(event) => setZone(event.target.value)}>
            {zones.map((id) => (
              <option key={id} value={id}>
                {zoneLabel(id, copy)}{id === detectedZone ? ` · ${copy.detected}` : ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.result}>
        {/* Only the answer is announced; the minute-by-minute countdown is not. */}
        <div role="status" aria-live="polite" aria-atomic="true">
          {!now ? null : !release || !status ? (
            <p>{copy.invalidDate}</p>
          ) : (
            <>
              {closed ? <p className={styles.warning}>{fillTicketReleaseCopy(copy.closedDay, { visit: visitLabel })}</p> : null}
              {status === "too-late" ? (
                <p className={styles.resultLead}>{fillTicketReleaseCopy(copy.tooLate[attraction], { visit: visitLabel })}</p>
              ) : (
                <>
                  <p className={styles.resultLead}>
                    {fillTicketReleaseCopy(status === "upcoming" ? copy.leadUpcoming : copy.leadOnSale, {
                      visit: visitLabel, date: local.date, time: local.time, zone: zoneLabel(zone, copy),
                    })}
                  </p>
                  {zone !== CHINA_TIME_ZONE ? (
                    <p className={styles.resultLocal}>{fillTicketReleaseCopy(copy.chinaLine, china)}</p>
                  ) : null}
                </>
              )}
            </>
          )}
        </div>
        {now && release && status === "upcoming" ? (
          <p className={styles.countdown} aria-live="off">
            {fillTicketReleaseCopy(copy.countdown, { countdown: countdownText(release.getTime() - now.getTime(), copy) })}
          </p>
        ) : null}
        {now && release && status && status !== "too-late" ? (
          <div className={styles.reminder}>
            {status === "upcoming" ? (
              <button className={styles.primaryButton} type="button" onClick={downloadReminder}>
                <CalendarPlus aria-hidden="true" size={18} />{copy.reminder}
              </button>
            ) : null}
            <a className={styles.textLink} href={rule.officialUrl} rel="noopener" target="_blank">
              {copy.officialLink}<ArrowUpRight aria-hidden="true" size={16} />
            </a>
            {googleCalendarUrl ? (
              <a className={styles.textLink} href={googleCalendarUrl} rel="noopener" target="_blank">{copy.googleCalendar}</a>
            ) : null}
          </div>
        ) : null}
        {now && release && status === "upcoming" ? <p className={styles.note}>{copy.reminderNote}</p> : null}
      </div>
      <p className={styles.note}>{fillTicketReleaseCopy(copy.rule, { days: rule.daysBefore, time: rule.chinaTime })}</p>
    </div>
  );
}
