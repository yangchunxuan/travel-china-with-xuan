"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import { fullTripSupportEnquiryAnchor, fullTripSupportPath } from "../lib/fullTripSupport";
import { getFullTripSupportCopy } from "../lib/fullTripSupportI18n";
import {
  fullTripBudgetBases, fullTripBudgetCurrencies, fullTripBudgetDefaultCurrency, fullTripBudgetMaxDigits, fullTripCitiesMaxLength, fullTripCountMaxDigits, fullTripDigits,
  fullTripMonthDigits, fullTripMonthMaxLength, fullTripNoteMaxLength, fullTripSupportMessage, groupFullTripBudgetDigits,
  type FullTripBudgetBasis, type FullTripBudgetCurrency,
} from "../lib/fullTripSupportMessage";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { homegroundWhatsAppHref } from "../lib/tourContact";
import { trackEvent } from "../lib/analytics";
import { KakaoTalkContact } from "./KakaoTalkContact";
import styles from "./FullTripSupportPage.module.css";

const serviceInterest = "full_trip_support";

/**
 * One clause of the sentence: its words, with each {token} replaced by a
 * blank. Spacing follows the template: where it has no space ("预算{basis}",
 * "{travellers}명", a closing comma) the two pieces sit together. A `wide`
 * clause ends in a blank that takes the rest of the line.
 */
function Clause({ template, slots, wide = false, choosing = false }: { template: string; slots: Readonly<Record<string, ReactNode>>; wide?: boolean; /** One of its words is open for choosing. */ choosing?: boolean }) {
  const pieces = template.split(/(\{\w+\})/u).filter((piece) => piece !== "");
  return (
    <span className={wide ? `${styles.clause} ${styles.wide}` : styles.clause} data-choosing={choosing ? "true" : undefined}>
      {pieces.map((piece, index) => {
        const before = pieces[index - 1];
        const hug = index > 0 && !/^\s/u.test(piece) && !/\s$/u.test(before) ? styles.hug : undefined;
        const token = piece.match(/^\{(\w+)\}$/u)?.[1];
        if (token && token in slots) return <span className={hug} key={index}>{slots[token]}</span>;
        const words = piece.trim();
        return words ? <span className={hug} key={index}>{words}</span> : null;
      })}
    </span>
  );
}

/** A typed blank that is exactly as wide as what is in it (the hidden twin sets the width). */
function Blank({ label, name, shown, room, hint, numeric = true, maxLength, onType }: {
  label: string; name: string; shown: string;
  /** Figures of room when empty. */
  room: string;
  /** Grey guidance shown while empty. */
  hint?: string;
  numeric?: boolean; maxLength?: number; onType: (value: string) => void;
}) {
  return (
    <span className={styles.blank}>
      <span aria-hidden="true">{shown || (hint ? <i>{hint}</i> : room)}</span>
      <input aria-label={label} autoComplete="off" inputMode={numeric ? "numeric" : undefined} maxLength={maxLength} name={name} onChange={(event) => onType(event.target.value)} placeholder={hint} size={1} type="text" value={shown} />
    </span>
  );
}

/** An open blank for words: it takes the rest of the line and grows downwards as the traveller writes. */
function Lines({ label, name, value, hint, maxLength, onType }: { label: string; name: string; value: string; hint: string; maxLength: number; onType: (value: string) => void }) {
  return (
    <span className={styles.lines}>
      {/* The zero-width space keeps a trailing new line counted in the twin's height. */}
      <span aria-hidden="true">{value ? `${value}​` : <i>{hint}</i>}</span>
      <textarea aria-label={label} autoComplete="off" maxLength={maxLength} name={name} onChange={(event) => onType(event.target.value)} placeholder={hint} rows={1} value={value} />
    </span>
  );
}

/** A choice set in the sentence as a word. Pressing it unfolds its choices in a row under the line (Tray). */
function Pick({ label, text, open, controls, buttonRef, onToggle }: { label: string; text: string; open: boolean; controls: string; buttonRef: RefObject<HTMLButtonElement | null>; onToggle: () => void }) {
  return (
    <span className={styles.pick} data-open={open ? "true" : undefined} data-pick-zone="">
      <button aria-controls={controls} aria-expanded={open} aria-label={`${label}: ${text}`} onClick={onToggle} ref={buttonRef} type="button">
        {text}<i aria-hidden="true" />
      </button>
    </span>
  );
}

/**
 * The choices for one word of the sentence, unfolding in place the way the
 * mobile menu's sections do: no panel, no box, a row of words with the
 * current one underlined. A radio group: arrows move, Enter or a tap
 * chooses, Escape folds it away.
 */
function Tray<Value extends string>({ id, label, open, value, options, onPick, onClose }: { id: string; label: string; open: boolean; value: Value; options: readonly { value: Value; text: string }[]; onPick: (value: Value) => void; onClose: () => void }) {
  const groupRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (open) groupRef.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus({ preventScroll: true });
  }, [open]);
  function onKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
    const step = ({ ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 } as Record<string, number>)[event.key];
    const buttons = Array.from(groupRef.current?.querySelectorAll<HTMLElement>("button") ?? []);
    const at = buttons.indexOf(document.activeElement as HTMLElement);
    if (!step || at < 0) return;
    event.preventDefault();
    buttons[(at + step + buttons.length) % buttons.length].focus();
  }
  return (
    <span className={styles.tray} data-open={open ? "true" : undefined} data-pick-zone="" id={id} inert={!open}>
      <span aria-label={label} className={styles.choices} onKeyDown={onKeyDown} ref={groupRef} role="radiogroup">
        {options.map((option, index) => (
          <button aria-checked={option.value === value} key={option.value} onClick={() => onPick(option.value)} role="radio" style={{ "--i": index } as CSSProperties} tabIndex={option.value === value ? 0 : -1} type="button">
            <span>{option.text}</span>
          </button>
        ))}
      </span>
    </span>
  );
}

/**
 * The trip brief under the headline of /services/full-trip-support/, in the
 * mobile menu's language: one serif sentence the traveller completes (how
 * many people, how many days, a budget in any currency, per person or in
 * total, the month they leave, the cities they have in mind, and anything
 * else they want us to hear), then a line with an arrow that sends it. Grey
 * words inside the open blanks say what could go there. The two words that
 * can be changed (the currency, per person or in total) unfold their choices
 * in a row under the line; there is no system drop-down and no box. Focusing a blank
 * draws its underline and quiets the other clauses, as the menu does with
 * its open section. This is full-trip planning, so nobody is asked to tick
 * hotels, tickets or guides, and the page never weighs the number against a
 * price. Nothing is pre-filled; what is left blank is simply not said. The
 * line opens a WhatsApp draft (KakaoTalk on Korean pages); email is a plain
 * link under it. Nothing leaves the browser until the traveller sends it.
 */
export function FullTripSupportEnquiry({ locale }: { locale: HomegroundLocale }) {
  const copy = getFullTripSupportCopy(locale);
  const brief = copy.brief;
  const enquiry = copy.enquiry;
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState<FullTripBudgetCurrency>(fullTripBudgetDefaultCurrency[locale]);
  const [basis, setBasis] = useState<FullTripBudgetBasis>("person");
  const [travellers, setTravellers] = useState("");
  const [days, setDays] = useState("");
  const [month, setMonth] = useState("");
  const [cities, setCities] = useState("");
  const [note, setNote] = useState("");
  // Which of the two changeable words has its choices unfolded.
  const [choosing, setChoosing] = useState<"basis" | "currency" | null>(null);
  const basisRef = useRef<HTMLButtonElement>(null);
  const currencyRef = useRef<HTMLButtonElement>(null);
  const trayId = useId();
  function foldTray(word: "basis" | "currency") {
    setChoosing(null);
    (word === "basis" ? basisRef : currencyRef).current?.focus({ preventScroll: true });
  }
  useEffect(() => {
    if (!choosing) return;
    // A press anywhere else folds the choices away.
    const onPointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest("[data-pick-zone]")) setChoosing(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [choosing]);
  const message = fullTripSupportMessage(copy, { budget, currency, basis, travellers, days, month, cities, note, pageUrl: `https://homegroundchina.com${fullTripSupportPath[locale]}` });
  const whatsappHref = homegroundWhatsAppHref(message);
  const emailHref = `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(enquiry.message.subject)}&body=${encodeURIComponent(message)}`;
  const homePath = locale === "en" ? "/" : `/${locale}/`;
  function trackChannel(channel: "whatsapp" | "email" | "kakao") {
    trackEvent("contact_option_clicked", { page_language: locale, channel, service_interest: serviceInterest }, { firstPartyContext: { surface: "contact_options" } });
  }
  // On a computer a WhatsApp link opens the site's scan-to-phone card with the
  // code only: the card's own email form could not carry the brief.
  const whatsapp = (className: string) => (
    <a className={className} data-contact-card-scan-only="" href={whatsappHref} onClick={() => trackChannel("whatsapp")} rel="noopener noreferrer" target="_blank">{enquiry.whatsapp}</a>
  );

  return (
    <form aria-label={brief.title} className={styles.brief} id={fullTripSupportEnquiryAnchor} onSubmit={(event) => event.preventDefault()}>
      <p className={styles.sentence}>
        <Clause
          slots={{ travellers: <Blank label={brief.travellersLabel} name="travellers" onType={(value) => setTravellers(fullTripDigits(value, fullTripCountMaxDigits))} room="00" shown={travellers} /> }}
          template={brief.clauses.party}
        />
        <Clause
          slots={{ days: <Blank label={brief.daysLabel} name="days" onType={(value) => setDays(fullTripDigits(value, fullTripCountMaxDigits))} room="00" shown={days} /> }}
          template={days === "1" ? brief.clauses.lengthOne ?? brief.clauses.length : brief.clauses.length}
        />
        <Clause
          choosing={choosing !== null}
          slots={{
            basis: <Pick buttonRef={basisRef} controls={`${trayId}-basis`} label={brief.basisLabel} onToggle={() => setChoosing(choosing === "basis" ? null : "basis")} open={choosing === "basis"} text={brief.basis[basis]} />,
            currency: <Pick buttonRef={currencyRef} controls={`${trayId}-currency`} label={brief.currencyLabel} onToggle={() => setChoosing(choosing === "currency" ? null : "currency")} open={choosing === "currency"} text={currency} />,
            amount: <Blank label={brief.amountLabel} name="budget" onType={(value) => setBudget(fullTripDigits(value, fullTripBudgetMaxDigits))} room="00,000" shown={groupFullTripBudgetDigits(budget)} />,
          }}
          template={brief.clauses.budget}
        />
        <Tray<FullTripBudgetBasis>
          id={`${trayId}-basis`} label={brief.basisLabel} onClose={() => foldTray("basis")} onPick={(value) => { setBasis(value); foldTray("basis"); }} open={choosing === "basis"}
          options={fullTripBudgetBases.map((value) => ({ value, text: brief.basis[value] }))} value={basis}
        />
        <Tray<FullTripBudgetCurrency>
          id={`${trayId}-currency`} label={brief.currencyLabel} onClose={() => foldTray("currency")} onPick={(value) => { setCurrency(value); foldTray("currency"); }} open={choosing === "currency"}
          options={fullTripBudgetCurrencies.map((value) => ({ value, text: value }))} value={currency}
        />
        <Clause
          slots={{
            month: brief.monthIsNumber
              ? <Blank label={brief.monthLabel} name="month" onType={(value) => setMonth(fullTripMonthDigits(value))} room="00" shown={month} />
              : <Blank hint={brief.monthHint} label={brief.monthLabel} maxLength={fullTripMonthMaxLength} name="month" numeric={false} onType={setMonth} room="000000" shown={month} />,
          }}
          template={brief.clauses.month}
        />
        <Clause slots={{ cities: <Lines hint={brief.citiesHint} label={brief.citiesLabel} maxLength={fullTripCitiesMaxLength} name="cities" onType={setCities} value={cities} /> }} template={brief.clauses.cities} wide />
        <Clause slots={{ note: <Lines hint={brief.noteHint} label={brief.noteLabel} maxLength={fullTripNoteMaxLength} name="note" onType={setNote} value={note} /> }} template={brief.clauses.note} wide />
      </p>

      {/* The one way to send, set like the menu's planner line: words, then a thin arrow. */}
      <div className={styles.sendRow}>
        {locale === "ko"
          ? <KakaoTalkContact buttonClassName={styles.send} inquiry={() => message} key={message} label={enquiry.kakaoAction} onOpen={() => trackChannel("kakao")} />
          : whatsapp(styles.send)}
      </div>

      {/* One line of small print: anything may stay blank, what sending costs, the other ways to send. */}
      <p className={styles.fine}>
        <span>{brief.note}</span>
        <span>{enquiry.free}</span>
        {locale === "ko" ? whatsapp(styles.textLink) : null}
        <a className={styles.textLink} data-contact-card-direct="" href={emailHref} onClick={() => trackChannel("email")}>{enquiry.email}</a>
        <a className={styles.textLink} href={`${homePath}privacy/`}>{enquiry.privacy}</a>
      </p>
    </form>
  );
}
