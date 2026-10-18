"use client";

import { buildCorporateTiming, corporateMonthOptions, corporateTimingCopy, type CorporateTiming, type CorporateTimingMode } from "../lib/corporateEnquiryTiming";
import type { CorporateLocale } from "../lib/corporateTravelTypes";
import { CorporateEnquirySelect } from "./CorporateEnquirySelect";
import { TourDateField } from "./TourDateField";
import styles from "./CorporateTravelEnquiry.module.css";

const modes: CorporateTimingMode[] = ["month", "date", "undecided"];
export function CorporateEnquiryTiming({ id, label, locale, value, onChange }: { id: string; label: string; locale: CorporateLocale; value: CorporateTiming; onChange: (value: CorporateTiming) => void }) {
  const copy = corporateTimingCopy[locale];
  const baseLocale = locale === "zh" || locale === "ko" ? locale : "en";
  const edition = locale === "en" || locale === "zh" || locale === "ko" ? undefined : { language: locale, date: copy.calendar };
  const years = Array.from({ length: 11 }, (_, index) => { const year = String(new Date().getFullYear() + index); return { value: year, label: year }; });
  let messageTiming = "";
  try { messageTiming = buildCorporateTiming(value, locale); } catch { /* Incomplete choices remain invalid, not "dates open". */ }
  const edit = <Key extends keyof CorporateTiming>(key: Key, next: CorporateTiming[Key]) => onChange({ ...value, [key]: next });
  return <fieldset className={styles.timing}>
    <legend>{label}</legend>
    <input name="timing" type="hidden" value={messageTiming} />
    <div className={styles.timingModes}>
      {modes.map(mode => <label className={styles.timingMode} key={mode}><input checked={value.mode === mode} name={`${id}-mode`} onChange={() => edit("mode", mode)} type="radio" value={mode} /><span>{copy.modes[mode]}</span></label>)}
    </div>
    <div className={styles.timingFields}>
      {value.mode === "month" && <>
        <CorporateEnquirySelect id={`${id}-year`} label={copy.year} name="travelYear" onChange={next => edit("year", next)} options={years} placeholder={copy.chooseYear} value={value.year} />
        <CorporateEnquirySelect id={`${id}-month`} label={copy.month} name="travelMonth" onChange={next => edit("month", next)} options={corporateMonthOptions(locale)} placeholder={copy.chooseMonth} value={value.month} />
      </>}
      {value.mode === "date" && <div className={styles.arrivalField}><TourDateField active appearance="line" disabled={false} edition={edition} id={`${id}-date`} label={copy.arrival} locale={baseLocale} onChange={next => edit("date", next)} required value={value.date} /></div>}
      <label className={styles.daysField}><span className={styles.labelRow}>{copy.duration}<span>{copy.optional}</span></span><input id={`${id}-days`} inputMode="numeric" max={365} min={1} name="tripDays" onChange={event => edit("days", event.target.value)} placeholder={copy.daysHint} step={1} type="number" value={value.days} /></label>
    </div>
  </fieldset>;
}
