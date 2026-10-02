"use client";

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { Mail, MessageCircle } from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import type { AttractionReservationEnquiryCopy } from "../lib/attractionReservationsI18n";
import { formatAttractionReservationFeeDisplay, type AttractionReservationFeeDisplay } from "../lib/attractionReservationFeeFormat";
import { attractionReservationMailtoHref, attractionReservationMessageText, attractionReservationNoteMaxLength } from "../lib/attractionReservationMessage";
import { homegroundWhatsAppHref } from "../lib/tourContact";
import { formatTourDate } from "../lib/tourDate";
import { trackEvent } from "../lib/analytics";
import { useVisibleAnalyticsEvent } from "./useAnalyticsEvent";
import { KakaoTalkContact } from "./KakaoTalkContact";
import { TourDateField } from "./TourDateField";
import styles from "./AttractionReservationsPage.module.css";

export interface ReservationEnquiryCity { id: string; label: string }
export interface ReservationEnquiryAttraction { id: string; city: string; label: string }

const serviceInterest = "attraction_reservation";

/**
 * The reservation request on /services/china-attraction-reservations/.
 * It reuses the site's direct channels rather than a new server form: the
 * choices are written into the WhatsApp text, the email draft and (Korean)
 * the KakaoTalk copy. On a desktop the site-wide contact card answers the
 * WhatsApp and email links with the same prepared message. Nothing leaves the
 * browser until the traveller opens one of those channels.
 *
 * Layout: the intro across the top, then the form on the left and, beside
 * it, a summary of the request with the estimated service fee and the send
 * buttons. The summary stays in view while the form scrolls (the checkout
 * pattern); on a short window its list scrolls inside it so the send
 * buttons never leave the screen. On phones it follows the form.
 */
export function AttractionReservationEnquiry({
  locale,
  copy,
  cities,
  attractions,
  email,
  pageUrl,
  privacyHref,
  queryKey,
  fee,
  formId,
  tickets,
  intro,
}: {
  locale: HomegroundLocale;
  copy: AttractionReservationEnquiryCopy;
  cities: readonly ReservationEnquiryCity[];
  attractions: readonly ReservationEnquiryAttraction[];
  email: string;
  pageUrl: string;
  privacyHref: string;
  queryKey: string;
  /** The service fee per person per attraction, as the page displays it. */
  fee: AttractionReservationFeeDisplay;
  /** The id of the form + summary row, the target of each rule's "Request this attraction" link. */
  formId: string;
  /** The tickets line of the summary: label and "official price" wording. */
  tickets: { label: string; value: string };
  intro: ReactNode;
}) {
  const id = useId();
  const [selectedAttractions, setSelectedAttractions] = useState<string[]>([]);
  // One date per attraction id: a ticket is for a single day, not a range.
  const [dates, setDates] = useState<Record<string, string>>({});
  const [undecided, setUndecided] = useState(false);
  const [travellers, setTravellers] = useState("2");
  const [note, setNote] = useState("");
  const [kakaoKey, setKakaoKey] = useState(0);
  const [addedMessage, setAddedMessage] = useState("");
  // Set by a rule's link; a new object each time, so a second click on the same attraction scrolls again.
  const [revealRequest, setRevealRequest] = useState<{ attractionId: string } | null>(null);
  const started = useRef(false);
  const eventParameters = { page_language: locale, submission_surface: serviceInterest, service_interest: serviceInterest };
  const visibleRef = useVisibleAnalyticsEvent<HTMLDivElement>("contact_options_viewed", eventParameters, true, { firstPartyContext: { surface: "contact_options" } });

  // A guide's "we can book this" link preselects one attraction by id.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get(queryKey);
    const match = attractions.find((attraction) => attraction.id === requested);
    if (!match) return;
    setSelectedAttractions((current) => (current.includes(match.id) ? current : [...current, match.id]));
  }, [attractions, queryKey]);

  // "Request this attraction" in a rules row ticks it here, then shows the
  // result: the new date field (or the chip, with dates undecided) is scrolled
  // into view and a status line announces it. Without JavaScript the link's
  // own #anchor still lands on the form.
  useEffect(() => {
    function select(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest("[data-reserve-attraction]") : null;
      const requested = target?.getAttribute("data-reserve-attraction");
      const match = attractions.find((attraction) => attraction.id === requested);
      if (!target || !match) return;
      event.preventDefault();
      setSelectedAttractions((current) => (current.includes(match.id) ? current : [...current, match.id]));
      setAddedMessage(copy.added.replace("{name}", match.label));
      setRevealRequest({ attractionId: match.id });
      const href = target.getAttribute("href");
      if (href?.startsWith("#")) window.history.replaceState(null, "", href);
    }
    document.addEventListener("click", select);
    return () => document.removeEventListener("click", select);
  }, [attractions, copy.added]);

  useEffect(() => {
    if (!revealRequest) return;
    const { attractionId } = revealRequest;
    const field = undecided ? null : document.getElementById(`${id}-date-${attractionId}`);
    const chip = document.querySelector(`input[name="attraction"][value="${CSS.escape(attractionId)}"]`)?.closest("label");
    (field ?? chip)?.scrollIntoView({ block: "center" });
    // Runs once per click: undecided is only read here, so toggling it never scrolls.
  }, [revealRequest]);

  // Attractions are listed under their city; the city is never a separate choice.
  const groups = useMemo(
    () => cities
      .map((city) => ({ ...city, attractions: attractions.filter((attraction) => attraction.city === city.id) }))
      .filter((group) => group.attractions.length > 0),
    [attractions, cities],
  );

  const chosen = useMemo(
    () => attractions.filter((attraction) => selectedAttractions.includes(attraction.id)),
    [attractions, selectedAttractions],
  );

  const draft = useMemo(() => {
    const count = Number.parseInt(travellers, 10);
    return {
      cities: cities.filter((city) => chosen.some((attraction) => attraction.city === city.id)).map((city) => city.label),
      visits: chosen.map((attraction) => ({ label: attraction.label, date: undecided ? null : dates[attraction.id] || null })),
      travellers: Number.isInteger(count) && count > 0 && count < 100 ? count : null,
      note,
      pageUrl,
    };
  }, [chosen, cities, dates, undecided, travellers, note, pageUrl]);

  const message = attractionReservationMessageText(copy.message, draft);
  const whatsappHref = homegroundWhatsAppHref(message);
  const mailtoHref = attractionReservationMailtoHref(email, copy.message, draft);
  const units = (draft.travellers ?? 0) * chosen.length;
  const feeTotal = units > 0 ? formatAttractionReservationFeeDisplay(fee, units) : null;
  const countText = (forms: { one: string; other: string }, n: number) => forms[n === 1 ? "one" : "other"].replace("{n}", String(n));
  // Each factor stays on one line ("2 travellers"), so a wrap never strands a lone word.
  const feeFormula = units > 0 && draft.travellers
    ? <>
        <span className={styles.nowrap}>{formatAttractionReservationFeeDisplay(fee)}</span>
        {" × "}<span className={styles.nowrap}>{countText(copy.summaryPeople, draft.travellers)}</span>
        {" × "}<span className={styles.nowrap}>{countText(copy.summaryAttractions, chosen.length)}</span>
      </>
    : null;

  function toggle(list: string[], value: string) {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
  }
  function markStarted(event: { target: EventTarget | null }) {
    if (started.current || !(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) return;
    started.current = true;
    trackEvent("quick_email_started", eventParameters, { firstPartyContext: { surface: "contact_options" } });
  }
  function trackChannel(channel: "whatsapp" | "email" | "kakao") {
    trackEvent("contact_option_clicked", { ...eventParameters, channel }, { firstPartyContext: { surface: "contact_options" } });
  }
  /**
   * "Choose a date": bring that attraction's date field into view and open its
   * calendar, the literal promise of the button. Focusing the text input would
   * raise a phone's number keypad, and blurring it empty shows an error.
   */
  function focusDateField(attractionId: string) {
    const field = document.getElementById(`${id}-date-${attractionId}`);
    if (!(field instanceof HTMLElement)) return;
    field.scrollIntoView({ block: "center" });
    const calendar = field.parentElement?.querySelector<HTMLButtonElement>('button[aria-haspopup="dialog"]');
    if (calendar) calendar.click();
    else field.focus({ preventScroll: true });
  }
  function visitDate(attractionId: string) {
    if (undecided) return <span className={styles.summaryDate}>{copy.message.datesUndecided}</span>;
    const date = dates[attractionId];
    return date
      ? <span className={styles.summaryDate}>{formatTourDate(date, locale)}</span>
      : <button className={styles.summaryPickDate} onClick={() => focusDateField(attractionId)} type="button">{copy.summaryPickDate}</button>;
  }

  const kakao = locale === "ko" ? <KakaoTalkContact className={styles.kakao} inquiry={() => message} key={kakaoKey} label={copy.kakaoAction} onOpen={() => trackChannel("kakao")} /> : null;

  return (
    <>
      {intro}
      <p className={styles.visuallyHidden} role="status">{addedMessage}</p>
      <div className={styles.enquiryLayout} id={formId}>
        <form className={styles.enquiryForm} onSubmit={(event) => event.preventDefault()} onFocus={markStarted} onChange={(event) => { markStarted(event); setKakaoKey((key) => key + 1); }}>
          <fieldset aria-describedby={`${id}-attractions-hint`} className={styles.choiceGroup}>
            <legend>{copy.attractions}</legend>
            <p className={styles.fieldHint} id={`${id}-attractions-hint`}>{copy.attractionsHint}</p>
            <div className={styles.cityGroups}>
              {groups.map((group) => (
                <div aria-labelledby={`${id}-city-${group.id}`} className={styles.cityGroup} key={group.id} role="group">
                  <p className={styles.cityLabel} id={`${id}-city-${group.id}`}>{group.label}</p>
                  <div className={styles.attractionList}>
                    {group.attractions.map((attraction) => (
                      <label className={styles.attractionOption} key={attraction.id}>
                        <input checked={selectedAttractions.includes(attraction.id)} name="attraction" onChange={() => setSelectedAttractions((current) => toggle(current, attraction.id))} type="checkbox" value={attraction.id} />
                        <span>{attraction.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          {/* One visit date per chosen attraction, as Klook, GetYourGuide and
              the official systems ask: a ticket is for one day. The site's own
              date field, not the browser's native date input, which follows
              the OS language (a Chinese page showed Korean placeholders in a
              Korean-language Chrome). */}
          {/* "Dates not decided" sits above the fields it hides, so it never jumps under the finger. */}
          <fieldset aria-describedby={`${id}-dates-hint`} className={styles.choiceGroup}>
            <legend>{copy.visitDates}</legend>
            <p className={styles.fieldHint} id={`${id}-dates-hint`}>{chosen.length ? copy.visitDatesHint : copy.visitDatesEmpty}</p>
            <label className={styles.checkboxRow}>
              <input checked={undecided} onChange={(event) => setUndecided(event.target.checked)} type="checkbox" />
              {copy.undecided}
            </label>
            {!undecided ? (
              chosen.length ? (
                <div className={styles.fieldRow}>
                  {chosen.map((attraction) => (
                    <TourDateField active disabled={false} id={`${id}-date-${attraction.id}`} key={attraction.id} label={attraction.label} locale={locale} onChange={(value) => setDates((current) => ({ ...current, [attraction.id]: value }))} value={dates[attraction.id] ?? ""} />
                  ))}
                </div>
              ) : null
            ) : null}
          </fieldset>

          <label className={styles.field} htmlFor={`${id}-travellers`}>
            {copy.travellers}
            <input id={`${id}-travellers`} inputMode="numeric" max={99} min={1} name="travellers" onChange={(event) => setTravellers(event.target.value)} step={1} type="number" value={travellers} />
          </label>

          <label className={styles.field} htmlFor={`${id}-note`}>
            <span>{copy.note} <span className={styles.optional}>{copy.optional}</span></span>
            <textarea aria-describedby={`${id}-note-hint`} id={`${id}-note`} maxLength={attractionReservationNoteMaxLength} name="note" onChange={(event) => setNote(event.target.value)} placeholder={copy.notePlaceholder} rows={3} value={note} />
          </label>
          <p className={styles.fieldHint} id={`${id}-note-hint`}>{copy.noteHint}</p>
        </form>

      <aside aria-labelledby={`${id}-summary`} className={styles.enquiryAside}>
        <div className={styles.summary}>
          <h3 id={`${id}-summary`}>{copy.summaryTitle}</h3>
          {chosen.length ? (
            <ul className={styles.summaryList}>
              {chosen.map((attraction) => (
                <li key={attraction.id}>
                  <span>{attraction.label}</span>
                  {visitDate(attraction.id)}
                </li>
              ))}
            </ul>
          ) : <p className={styles.summaryEmpty} role="status">{copy.noneSelected}</p>}
          <dl className={styles.summaryFacts}>
            <div>
              <dt>{copy.travellers}</dt>
              <dd>{draft.travellers ?? "—"}</dd>
            </div>
            <div>
              <dt>{copy.summaryFee}</dt>
              <dd>
                {feeTotal ?? "—"}
                {feeFormula ? <span className={styles.summaryFormula}>{feeFormula}</span> : null}
              </dd>
            </div>
            <div>
              <dt>{tickets.label}</dt>
              <dd className={styles.summaryTickets}>{tickets.value}</dd>
            </div>
          </dl>
          <p className={styles.summaryNote}>{copy.summaryNote}</p>
        </div>

        <div className={styles.send} aria-labelledby={`${id}-send`} ref={visibleRef} role="group">
          <p className={styles.sendTitle} id={`${id}-send`}>{copy.send}</p>
          {/* Korean visitors use KakaoTalk first; WhatsApp and email then sit side by side. */}
          <div className={styles.sendButtons} data-kakao-first={kakao ? "" : undefined}>
            {kakao}
            <a aria-label={kakao && copy.whatsappShort ? copy.whatsapp : undefined} className={kakao ? styles.secondaryButton : styles.primaryButton} data-reservation-channel="whatsapp" href={whatsappHref} onClick={() => trackChannel("whatsapp")} rel="noopener noreferrer" target="_blank">
              <MessageCircle aria-hidden="true" size={18} />{kakao ? copy.whatsappShort ?? copy.whatsapp : copy.whatsapp}
            </a>
            <a aria-label={kakao && copy.emailShort ? copy.email : undefined} className={styles.secondaryButton} data-reservation-channel="email" href={mailtoHref} onClick={() => trackChannel("email")}>
              <Mail aria-hidden="true" size={18} />{kakao ? copy.emailShort ?? copy.email : copy.email}
            </a>
          </div>
          <p className={styles.replyFrom}>{copy.emailAddress} <span>{email}</span><a href={privacyHref}>{copy.privacy}</a></p>
        </div>
      </aside>
      </div>
    </>
  );
}
