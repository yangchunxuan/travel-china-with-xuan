"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import type { AttractionReservationEnquiryCopy } from "../lib/attractionReservationsI18n";
import { attractionReservationMailtoHref, attractionReservationMessageText, attractionReservationNoteMaxLength } from "../lib/attractionReservationMessage";
import { homegroundWhatsAppHref } from "../lib/tourContact";
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
}: {
  locale: HomegroundLocale;
  copy: AttractionReservationEnquiryCopy;
  cities: readonly ReservationEnquiryCity[];
  attractions: readonly ReservationEnquiryAttraction[];
  email: string;
  pageUrl: string;
  privacyHref: string;
  queryKey: string;
}) {
  const id = useId();
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedAttractions, setSelectedAttractions] = useState<string[]>([]);
  // One date per attraction id: a ticket is for a single day, not a range.
  const [dates, setDates] = useState<Record<string, string>>({});
  const [undecided, setUndecided] = useState(false);
  const [travellers, setTravellers] = useState("2");
  const [note, setNote] = useState("");
  const [kakaoKey, setKakaoKey] = useState(0);
  const started = useRef(false);
  const eventParameters = { page_language: locale, submission_surface: serviceInterest, service_interest: serviceInterest };
  const visibleRef = useVisibleAnalyticsEvent<HTMLDivElement>("contact_options_viewed", eventParameters, true, { firstPartyContext: { surface: "contact_options" } });

  // A guide's "we can book this" link preselects one attraction by id.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get(queryKey);
    const match = attractions.find((attraction) => attraction.id === requested);
    if (!match) return;
    // Only the attraction: choosing its city too would hide the other cities' attractions.
    setSelectedAttractions((current) => (current.includes(match.id) ? current : [...current, match.id]));
  }, [attractions, queryKey]);

  const visibleAttractions = selectedCities.length
    ? attractions.filter((attraction) => selectedCities.includes(attraction.city) || selectedAttractions.includes(attraction.id))
    : attractions;

  const chosen = useMemo(
    () => attractions.filter((attraction) => selectedAttractions.includes(attraction.id)),
    [attractions, selectedAttractions],
  );

  const draft = useMemo(() => {
    const cityIds = cities.map((city) => city.id).filter((cityId) => selectedCities.includes(cityId) || chosen.some((attraction) => attraction.city === cityId));
    const count = Number.parseInt(travellers, 10);
    return {
      cities: cityIds.map((cityId) => cities.find((city) => city.id === cityId)?.label ?? cityId),
      visits: chosen.map((attraction) => ({ label: attraction.label, date: undecided ? null : dates[attraction.id] || null })),
      travellers: Number.isInteger(count) && count > 0 && count < 100 ? count : null,
      note,
      pageUrl,
    };
  }, [chosen, cities, selectedCities, dates, undecided, travellers, note, pageUrl]);

  const message = attractionReservationMessageText(copy.message, draft);
  const whatsappHref = homegroundWhatsAppHref(message);
  const mailtoHref = attractionReservationMailtoHref(email, copy.message, draft);

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

  return (
    <div className={styles.enquiry} ref={visibleRef}>
      <form className={styles.enquiryForm} onSubmit={(event) => event.preventDefault()} onFocus={markStarted} onChange={(event) => { markStarted(event); setKakaoKey((key) => key + 1); }}>
        <fieldset className={styles.choiceGroup}>
          <legend>{copy.cities}</legend>
          <div className={styles.chips}>
            {cities.map((city) => (
              <label className={styles.chip} key={city.id}>
                <input checked={selectedCities.includes(city.id)} name="city" onChange={() => setSelectedCities((current) => toggle(current, city.id))} type="checkbox" value={city.id} />
                <span>{city.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset aria-describedby={`${id}-attractions-hint`} className={styles.choiceGroup}>
          <legend>{copy.attractions}</legend>
          <p className={styles.fieldHint} id={`${id}-attractions-hint`}>{copy.attractionsHint}</p>
          <div className={styles.attractionList}>
            {visibleAttractions.map((attraction) => (
              <label className={styles.attractionOption} key={attraction.id}>
                <input checked={selectedAttractions.includes(attraction.id)} name="attraction" onChange={() => setSelectedAttractions((current) => toggle(current, attraction.id))} type="checkbox" value={attraction.id} />
                <span>{attraction.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* One visit date per chosen attraction, as Klook, GetYourGuide and
            the official systems ask: a ticket is for one day. The site's own
            date field, not the browser's native date input, which follows
            the OS language (a Chinese page showed Korean placeholders in a
            Korean-language Chrome). */}
        {!undecided ? (
          <fieldset aria-describedby={`${id}-dates-hint`} className={styles.choiceGroup}>
            <legend>{copy.visitDates}</legend>
            <p className={styles.fieldHint} id={`${id}-dates-hint`}>{chosen.length ? copy.visitDatesHint : copy.visitDatesEmpty}</p>
            {chosen.length ? (
              <div className={styles.fieldRow}>
                {chosen.map((attraction) => (
                  <TourDateField active disabled={false} id={`${id}-date-${attraction.id}`} key={attraction.id} label={attraction.label} locale={locale} onChange={(value) => setDates((current) => ({ ...current, [attraction.id]: value }))} value={dates[attraction.id] ?? ""} />
                ))}
              </div>
            ) : null}
          </fieldset>
        ) : null}
        <label className={styles.checkboxRow}>
          <input checked={undecided} onChange={(event) => setUndecided(event.target.checked)} type="checkbox" />
          {copy.undecided}
        </label>

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

      <div className={styles.send} aria-labelledby={`${id}-send`} role="group">
        <p className={styles.sendTitle} id={`${id}-send`}>{copy.send}</p>
        {selectedAttractions.length === 0 ? <p className={styles.fieldHint} role="status">{copy.noneSelected}</p> : null}
        <div className={styles.sendButtons}>
          <a className={styles.primaryButton} data-reservation-channel="whatsapp" href={whatsappHref} onClick={() => trackChannel("whatsapp")} rel="noopener noreferrer" target="_blank">
            <MessageCircle aria-hidden="true" size={18} />{copy.whatsapp}
          </a>
          <a className={styles.secondaryButton} data-reservation-channel="email" href={mailtoHref} onClick={() => trackChannel("email")}>
            <Mail aria-hidden="true" size={18} />{copy.email}
          </a>
          {locale === "ko" ? <KakaoTalkContact className={styles.kakao} inquiry={() => message} key={kakaoKey} onOpen={() => trackChannel("kakao")} /> : null}
        </div>
        <p className={styles.replyFrom}>{copy.emailAddress} <span>{email}</span></p>
        <p className={styles.privacyLine}><a href={privacyHref}>{copy.privacy}</a></p>
      </div>
    </div>
  );
}
