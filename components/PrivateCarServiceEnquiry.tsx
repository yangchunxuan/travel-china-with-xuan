"use client";

import { useId, useRef, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { privateCarServiceKinds, type PrivateCarServiceKind } from "../lib/privateCarServices";
import { getPrivateCarServiceCopy } from "../lib/privateCarServicesI18n";
import {
  privateCarServiceMessage, privateCarServiceShortTextMaxLength, privateCarServiceTextMaxLength,
  type PrivateCarServiceDraft,
} from "../lib/privateCarServiceMessage";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { homegroundWhatsAppHref } from "../lib/tourContact";
import { trackEvent } from "../lib/analytics";
import { TourDateField } from "./TourDateField";
import { KakaoTalkContact } from "./KakaoTalkContact";
import styles from "./PrivateCarServicesPage.module.css";

/** Prepare the customer's own message; this form has no intake or booking request. */
export function PrivateCarServiceEnquiry({ locale }: { locale: HomegroundLocale }) {
  const id = useId();
  const form = useRef<HTMLFormElement>(null);
  const copy = getPrivateCarServiceCopy(locale);
  const enquiry = copy.enquiry;
  const [draft, setDraft] = useState<PrivateCarServiceDraft>({
    kind: "", cities: "", date: "", dateUndecided: false, travellers: "2",
    luggage: "", pickup: "", pickupTime: "", route: "", note: "",
  });
  function update<K extends keyof PrivateCarServiceDraft>(field: K, value: PrivateCarServiceDraft[K]) {
    setDraft((previous) => ({ ...previous, [field]: value }));
  }
  const message = privateCarServiceMessage(copy, locale, draft);
  const emailHref = "mailto:" + homegroundBusiness.serviceEmail
    + "?subject=" + encodeURIComponent(enquiry.message.subject) + "&body=" + encodeURIComponent(message);
  const homePath = locale === "en" ? "/" : "/" + locale + "/";
  const optional = <span className={styles.optional}>{enquiry.optional}</span>;
  function trackChannel(channel: "whatsapp" | "email" | "kakao") {
    trackEvent("contact_option_clicked", {
      page_language: locale, channel, service_interest: "private_car_and_driver",
    }, { firstPartyContext: { surface: "contact_options" } });
  }

  return (
    <div className={styles.enquiryForm}>
      <p className={styles.requiredNotice} id={id + "-required"}>{enquiry.requiredNotice}</p>
      <form ref={form} aria-describedby={id + "-required"} onSubmit={(event) => event.preventDefault()}>
        <div className={styles.fieldRow}>
          <label className={styles.field} htmlFor={id + "-kind"}>
            {enquiry.kind}
            <select id={id + "-kind"} name="transport" required value={draft.kind}
              onChange={(event) => update("kind", event.target.value as PrivateCarServiceKind | "")}>
              <option value="">{enquiry.chooseKind}</option>
              {privateCarServiceKinds.map((kind) => <option key={kind} value={kind}>{copy.kinds[kind].title}</option>)}
            </select>
          </label>
          <label className={styles.field} htmlFor={id + "-travellers"}>
            {enquiry.travellers}
            <input id={id + "-travellers"} name="travellers" type="number" inputMode="numeric"
              min={1} step={1} required value={draft.travellers}
              onChange={(event) => update("travellers", event.target.value)} />
          </label>
        </div>
        <label className={styles.field} htmlFor={id + "-cities"}>
          {enquiry.cities}
          <input id={id + "-cities"} name="cities" type="text" required maxLength={privateCarServiceShortTextMaxLength}
            value={draft.cities} placeholder={enquiry.citiesPlaceholder}
            onChange={(event) => {
              event.target.setCustomValidity(event.target.value.trim() ? "" : enquiry.cities);
              update("cities", event.target.value);
            }} />
        </label>
        <div className={styles.dateGroup}>
          <label className={styles.checkboxRow}>
            <input name="dateUndecided" type="checkbox" checked={draft.dateUndecided}
              onChange={(event) => update("dateUndecided", event.target.checked)} />
            {enquiry.undecided}
          </label>
          {!draft.dateUndecided ? <TourDateField id={id + "-date"} label={enquiry.date} locale={locale}
            value={draft.date} onChange={(date) => update("date", date)} disabled={false} active /> : null}
        </div>
        <label className={styles.field} htmlFor={id + "-luggage"}>
          <span>{enquiry.luggage} {optional}</span>
          <input id={id + "-luggage"} name="luggage" type="text" maxLength={privateCarServiceShortTextMaxLength}
            value={draft.luggage} placeholder={enquiry.luggagePlaceholder}
            onChange={(event) => update("luggage", event.target.value)} />
        </label>
        <div className={styles.fieldRow}>
          <label className={styles.field} htmlFor={id + "-pickup"}>
            <span>{enquiry.pickup} {optional}</span>
            <input id={id + "-pickup"} name="pickup" type="text" autoComplete="street-address"
              maxLength={privateCarServiceShortTextMaxLength} value={draft.pickup}
              placeholder={enquiry.pickupPlaceholder} onChange={(event) => update("pickup", event.target.value)} />
          </label>
          <label className={styles.field} htmlFor={id + "-time"}>
            <span>{enquiry.pickupTime} {optional}</span>
            <input id={id + "-time"} name="pickupTime" type="text" maxLength={privateCarServiceShortTextMaxLength}
              value={draft.pickupTime} placeholder={enquiry.timePlaceholder}
              onChange={(event) => update("pickupTime", event.target.value)} />
          </label>
        </div>
        <label className={styles.field} htmlFor={id + "-route"}>
          <span>{enquiry.route} {optional}</span>
          <textarea id={id + "-route"} name="route" rows={3} maxLength={privateCarServiceTextMaxLength}
            value={draft.route} placeholder={enquiry.routePlaceholder}
            onChange={(event) => update("route", event.target.value)} />
        </label>
        <label className={styles.field} htmlFor={id + "-note"}>
          <span>{enquiry.note} {optional}</span>
          <textarea id={id + "-note"} name="note" rows={2} maxLength={privateCarServiceTextMaxLength}
            value={draft.note} placeholder={enquiry.notePlaceholder}
            onChange={(event) => update("note", event.target.value)} />
        </label>
      </form>
      {/* Exclude these prepared details from the generic site email intake. */}
      <div className={styles.actions} data-contact-card-direct="" onClickCapture={(event) => {
        if (!form.current?.reportValidity()) { event.preventDefault(); event.stopPropagation(); }
      }}>
        <a className={styles.primaryButton} href={homegroundWhatsAppHref(message)} target="_blank"
          rel="noopener noreferrer" onClick={() => trackChannel("whatsapp")}>
          <MessageCircle aria-hidden="true" size={18} />{enquiry.whatsapp}
        </a>
        <a className={styles.secondaryButton} href={emailHref} onClick={() => trackChannel("email")}>
          <Mail aria-hidden="true" size={18} />{enquiry.email}
        </a>
        {locale === "ko" ? <KakaoTalkContact inquiry={() => message} key={message}
          onOpen={() => trackChannel("kakao")} buttonClassName={styles.secondaryButton} /> : null}
      </div>
      <p className={styles.note}>{enquiry.draftNote}</p>
      <p className={styles.note}>{homegroundBusiness.serviceEmail} · <a href={homePath + "privacy/"}>{enquiry.privacy}</a></p>
    </div>
  );
}
