"use client";

import { useId, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { fullTripSupportNeeds, fullTripSupportPath, type FullTripSupportNeed } from "../lib/fullTripSupport";
import { getFullTripSupportCopy } from "../lib/fullTripSupportI18n";
import { fullTripSupportMessage, fullTripSupportTextMaxLength } from "../lib/fullTripSupportMessage";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { buildRouteServiceContactHref } from "../lib/routeServiceInterest";
import { homegroundWhatsAppHref } from "../lib/tourContact";
import { trackEvent } from "../lib/analytics";
import { KakaoTalkContact } from "./KakaoTalkContact";
import { TourDateField } from "./TourDateField";
import { fullTripNeedIcons } from "./fullTripNeedIcons";
import styles from "./FullTripSupportPage.module.css";

const serviceInterest = "full_trip_support";

/**
 * The trip brief on /services/full-trip-support/. It reuses the site's direct
 * channels: the answers are written into a WhatsApp or email draft (and, on
 * Korean pages, KakaoTalk text); nothing leaves the browser until the
 * traveller opens a channel. The homepage planner form stays available for
 * those who prefer it. A trip spans days, so this brief asks for a date
 * range (unlike a ticket, which is for one day).
 */
export function FullTripSupportEnquiry({ locale }: { locale: HomegroundLocale }) {
  const id = useId();
  const copy = getFullTripSupportCopy(locale);
  const enquiry = copy.enquiry;
  const [cities, setCities] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [undecided, setUndecided] = useState(false);
  const [travellers, setTravellers] = useState("2");
  const [needs, setNeeds] = useState<FullTripSupportNeed[]>([]);
  const [note, setNote] = useState("");
  const message = fullTripSupportMessage(copy, {
    cities,
    from: undecided ? null : from || null,
    to: undecided ? null : to || null,
    travellers,
    needs,
    note,
    pageUrl: `https://homegroundchina.com${fullTripSupportPath[locale]}`,
  });
  const emailHref = `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(enquiry.message.subject)}&body=${encodeURIComponent(message)}`;
  const homePath = locale === "en" ? "/" : `/${locale}/`;
  const toggle = (need: FullTripSupportNeed) =>
    setNeeds((current) => (current.includes(need) ? current.filter((item) => item !== need) : [...current, need]));
  function trackChannel(channel: "whatsapp" | "email" | "kakao" | "planner") {
    trackEvent("contact_option_clicked", { page_language: locale, channel, service_interest: serviceInterest }, { firstPartyContext: { surface: "contact_options" } });
  }
  const kakao = locale === "ko"
    ? <KakaoTalkContact buttonClassName={styles.primaryButton} inquiry={() => message} key={message} label={enquiry.kakaoAction} onOpen={() => trackChannel("kakao")} />
    : null;

  return (
    <div className={styles.enquiry}>
      <form className={styles.enquiryForm} onSubmit={(event) => event.preventDefault()}>
        <label className={styles.field} htmlFor={`${id}-cities`}>
          {enquiry.cities}
          <input autoComplete="off" id={`${id}-cities`} maxLength={200} name="cities" onChange={(event) => setCities(event.target.value)} placeholder={enquiry.citiesPlaceholder} type="text" value={cities} />
        </label>

        <div className={styles.dates}>
          <label className={styles.checkboxRow}>
            <input checked={undecided} onChange={(event) => setUndecided(event.target.checked)} type="checkbox" />
            {enquiry.undecided}
          </label>
          {!undecided ? (
            <div className={styles.fieldRow}>
              <TourDateField active disabled={false} id={`${id}-from`} label={enquiry.from} locale={locale} onChange={setFrom} required={false} value={from} />
              <TourDateField active disabled={false} id={`${id}-to`} label={enquiry.to} locale={locale} onChange={setTo} required={false} value={to} />
            </div>
          ) : null}
        </div>

        <label className={styles.field} htmlFor={`${id}-travellers`}>
          {enquiry.travellers}
          <input className={styles.short} id={`${id}-travellers`} inputMode="numeric" max={99} min={1} name="travellers" onChange={(event) => setTravellers(event.target.value)} step={1} type="number" value={travellers} />
        </label>

        <fieldset aria-describedby={`${id}-needs-hint`} className={styles.needs}>
          <legend>{enquiry.needsLegend}</legend>
          <p className={styles.hint} id={`${id}-needs-hint`}>{enquiry.needsHint}</p>
          <div className={styles.chips}>
            {fullTripSupportNeeds.map((need) => {
              const Icon = fullTripNeedIcons[need];
              return (
                <label className={styles.chip} key={need}>
                  <input checked={needs.includes(need)} name="needs" onChange={() => toggle(need)} type="checkbox" value={need} />
                  <span><Icon aria-hidden="true" size={16} strokeWidth={1.8} />{copy.needs[need].title}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* The hint sits with its field, not a form row away. */}
        <div className={styles.fieldGroup}>
          <label className={styles.field} htmlFor={`${id}-note`}>
            <span>{enquiry.note} <span className={styles.optional}>{enquiry.optional}</span></span>
            <textarea aria-describedby={`${id}-note-hint`} id={`${id}-note`} maxLength={fullTripSupportTextMaxLength} name="note" onChange={(event) => setNote(event.target.value)} placeholder={enquiry.notePlaceholder} rows={3} value={note} />
          </label>
          <p className={styles.hint} id={`${id}-note-hint`}>{enquiry.noteHint}</p>
        </div>
      </form>

      {/* Keep this prepared brief out of the generic desktop contact card,
          whose server payload carries none of these fields. */}
      <div aria-labelledby={`${id}-send`} className={styles.send} data-contact-card-direct="" role="group">
        <p className={styles.sendTitle} id={`${id}-send`}>{enquiry.send}</p>
        <div className={styles.sendButtons} data-kakao-first={kakao ? "" : undefined}>
          {kakao}
          <a className={kakao ? styles.secondaryButton : styles.primaryButton} href={homegroundWhatsAppHref(message)} onClick={() => trackChannel("whatsapp")} rel="noopener noreferrer" target="_blank">
            <MessageCircle aria-hidden="true" size={18} />{enquiry.whatsapp}
          </a>
          <a className={styles.secondaryButton} href={emailHref} onClick={() => trackChannel("email")}>
            <Mail aria-hidden="true" size={18} />{enquiry.email}
          </a>
        </div>
        <p className={styles.hint}>{enquiry.draftNote}</p>
        {/* The planner form changes the homepage query, so it is a document link. */}
        <p className={styles.sendLinks}>
          <a href={buildRouteServiceContactHref(homePath, "full-trip-support")} onClick={() => trackChannel("planner")}>{enquiry.planner}</a>
          <span aria-hidden="true"> · </span>
          <a href={`${homePath}privacy/`}>{enquiry.privacy}</a>
        </p>
      </div>
    </div>
  );
}
