"use client";

import { useId, useRef, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { privateGuideCities, privateGuideServicePath, type PrivateGuideCity } from "../lib/privateGuideServices";
import { getPrivateGuideServiceCopy } from "../lib/privateGuideServicesI18n";
import { privateGuideNoteMaxLength, privateGuideServiceMessage } from "../lib/privateGuideServiceMessage";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { homegroundWhatsAppHref } from "../lib/tourContact";
import { trackEvent } from "../lib/analytics";
import { TourDateField } from "./TourDateField";
import { KakaoTalkContact } from "./KakaoTalkContact";
import styles from "./PrivateGuideServicesPage.module.css";

/** Uses the existing direct contact channels; preparing a draft sends no enquiry. */
export function PrivateGuideEnquiry({ locale }: { locale: HomegroundLocale }) {
  const id = useId();
  const form = useRef<HTMLFormElement>(null);
  const copy = getPrivateGuideServiceCopy(locale);
  const enquiry = copy.enquiry;
  const [city, setCity] = useState<PrivateGuideCity | "">("");
  const [date, setDate] = useState("");
  const [undecided, setUndecided] = useState(false);
  const [travellers, setTravellers] = useState("2");
  const [note, setNote] = useState("");
  const message = privateGuideServiceMessage(copy, locale, {
    city, date: undecided ? "" : date, travellers, note,
    pageUrl: `https://homegroundchina.com${privateGuideServicePath[locale]}`,
  });
  const emailHref = `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(enquiry.message.subject)}&body=${encodeURIComponent(message)}`;
  const homePath = locale === "en" ? "/" : `/${locale}/`;
  function trackChannel(channel: "whatsapp" | "email" | "kakao") {
    trackEvent("contact_option_clicked", { page_language: locale, channel, service_interest: "private_english_guide" }, { firstPartyContext: { surface: "contact_options" } });
  }
  return (
    <div className={styles.enquiryForm}>
      <form ref={form} onSubmit={(event) => event.preventDefault()}>
        <div className={styles.fieldRow}>
          <label className={styles.field} htmlFor={`${id}-city`}>
            {enquiry.city}
            <select id={`${id}-city`} name="city" required value={city} onChange={(event) => setCity(event.target.value as PrivateGuideCity | "")}>
              <option value="">{enquiry.chooseCity}</option>
              {privateGuideCities.map((key) => <option key={key} value={key}>{copy.cities[key].name}</option>)}
            </select>
          </label>
          <label className={styles.field} htmlFor={`${id}-travellers`}>
            {enquiry.travellers}
            <input id={`${id}-travellers`} name="travellers" type="number" inputMode="numeric" min={1} step={1} required value={travellers} onChange={(event) => setTravellers(event.target.value)} />
          </label>
        </div>
        <label className={styles.checkboxRow}>
          <input type="checkbox" checked={undecided} onChange={(event) => setUndecided(event.target.checked)} />{enquiry.undecided}
        </label>
        {!undecided ? <TourDateField id={`${id}-date`} label={enquiry.date} locale={locale} value={date} onChange={setDate} disabled={false} active /> : null}
        <label className={styles.field} htmlFor={`${id}-note`}>
          <span>{enquiry.route} <span className={styles.muted}>{enquiry.optional}</span></span>
          <textarea id={`${id}-note`} name="route" rows={3} maxLength={privateGuideNoteMaxLength} value={note} onChange={(event) => setNote(event.target.value)} placeholder={enquiry.placeholder} />
        </label>
      </form>
      {/* Keep this prepared enquiry out of the generic desktop email card,
          whose server payload does not include guide-service fields. */}
      <div className={styles.actions} data-contact-card-direct onClickCapture={(event) => {
        if (!form.current?.reportValidity()) { event.preventDefault(); event.stopPropagation(); }
      }}>
        <a className={styles.primaryButton} data-guide-channel="whatsapp" href={homegroundWhatsAppHref(message)} rel="noopener noreferrer" target="_blank" onClick={() => trackChannel("whatsapp")}>
          <MessageCircle aria-hidden="true" size={18} />{enquiry.whatsapp}
        </a>
        <a className={styles.secondaryButton} data-guide-channel="email" href={emailHref} onClick={() => trackChannel("email")}>
          <Mail aria-hidden="true" size={18} />{enquiry.email}
        </a>
        {locale === "ko" ? <KakaoTalkContact inquiry={() => message} key={message} onOpen={() => trackChannel("kakao")} buttonClassName={styles.secondaryButton} /> : null}
      </div>
      <p className={styles.note}>{enquiry.draftNote}</p>
      <p className={styles.note}>{homegroundBusiness.serviceEmail} · <a href={`${homePath}privacy/`}>{enquiry.privacy}</a></p>
    </div>
  );
}
