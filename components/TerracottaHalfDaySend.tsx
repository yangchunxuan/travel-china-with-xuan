"use client";

import { homegroundBusiness } from "../lib/homegroundBusiness";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { terracottaHalfDayCopy, terracottaHalfDayMessage, terracottaHalfDayPaths, type TerracottaHalfDayCopy } from "../lib/terracottaHalfDayTour";
import { homegroundWhatsAppHref } from "../lib/tourContact";
import { trackEvent } from "../lib/analytics";
import { KakaoTalkContact } from "./KakaoTalkContact";
import styles from "./TerracottaHalfDayPage.module.css";

const serviceInterest = "terracotta_half_day";

/**
 * The one way to send, as on the full-trip page: words, then a thin arrow.
 * It opens a WhatsApp draft (KakaoTalk on Korean pages) with the date, party
 * and hotel as lines to fill in; email and the privacy notice are small words
 * under it. Nothing leaves the browser until the traveller sends it.
 */
export function TerracottaHalfDaySend({ locale, edition }: { locale: HomegroundLocale; edition?: { language: 'fr'; copy: Pick<TerracottaHalfDayCopy,'send'|'message'>; message: string; homePath: string } }) {
  const { send, message: messageCopy } = edition?.copy ?? terracottaHalfDayCopy[locale];
  const message = edition?.message ?? terracottaHalfDayMessage(locale, `https://homegroundchina.com${terracottaHalfDayPaths[locale]}`);
  const whatsappHref = homegroundWhatsAppHref(message);
  const emailHref = `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(messageCopy.subject)}&body=${encodeURIComponent(message)}`;
  const homePath = edition?.homePath ?? (locale === "en" ? "/" : `/${locale}/`);
  function trackChannel(channel: "whatsapp" | "email" | "kakao") {
    trackEvent("contact_option_clicked", { page_language: edition?.language ?? locale, channel, service_interest: serviceInterest }, { firstPartyContext: { surface: "contact_options" } });
  }
  const whatsapp = (className: string, label: string) => (
    <a className={className} data-contact-card-scan-only="" href={whatsappHref} onClick={() => trackChannel("whatsapp")} rel="noopener noreferrer" target="_blank">{label}</a>
  );
  return (
    <>
      <div className={styles.sendRow}>
        {locale === "ko" && send.kakaoAction
          ? <KakaoTalkContact buttonClassName={styles.sendLine} inquiry={() => message} label={send.kakaoAction} onOpen={() => trackChannel("kakao")} />
          : whatsapp(styles.sendLine, send.whatsapp)}
      </div>
      <p className={styles.fine}>
        {locale === "ko" ? whatsapp(styles.textLink, send.whatsappShort) : null}
        <a className={styles.textLink} data-contact-card-direct="" href={emailHref} onClick={() => trackChannel("email")}>{send.email}</a>
        <a className={styles.textLink} href={`${homePath}privacy/`}>{send.privacy}</a>
      </p>
    </>
  );
}
