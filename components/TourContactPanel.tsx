"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Check, Mail, MessageCircle, X } from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { getPrivateTourInquiryContext, privateTourInquirySelectionLabel, buildPrivateTourMailtoHref, type PrivateTourInquiryContext } from "../lib/privateTourInquiryContext";
import { tourContactCopy, tourContactOpenEvent, consumeTourContactReturnFocus, tourWhatsAppHref, privateTourQuoteApiUrl } from "../lib/tourContact";
import { getTrafficSessionToken, trackEnquirySubmitted, trackEvent } from "../lib/analytics";
import { inquiryBodyWithCurrentTrafficConsent } from "../lib/inquiryTrafficConsent";
import { privateTourQuoteSchemaVersion, currentPrivateTourQuoteFormVersion, homepageEmailPrivacyNoticeVersion } from "../lib/inquiryVersions";
import {
  getNavigationMenuOpen, getPrivacyManagerOpen, getServerPrivacyManagerOpen,
  getNewsletterExpanded, subscribeNavigationMenu, subscribePrivacyManager,
  subscribeNewsletterExpanded, setInquiryOpen, getConsentBannerPending,
  getServerConsentBannerPending, subscribeConsentBanner, getNewsletterDockSide,
  getServerNewsletterDockSide, subscribeNewsletterDock,
} from "../lib/siteOverlayState";
import { markNewsletterPromptHandled } from "../lib/newsletterPrompt";
import styles from "./TourContactPanel.module.css";

type Status = "idle" | "sending" | "saved" | "failed" | "uncertain";
type Snapshot = { body: string; key: string };

export function TourContactPanel({ locale }: { locale: HomegroundLocale }) {
  const pathname = usePathname();
  const text = tourContactCopy[locale];
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const snapshotRef = useRef<Snapshot | null>(null);
  const dispatching = useRef(false);
  const statusRef = useRef<Status>("idle");
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [context, setContext] = useState<PrivateTourInquiryContext | null>(null);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [undecided, setUndecided] = useState(true);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const [fieldError, setFieldError] = useState("");
  const privacy = useSyncExternalStore(subscribePrivacyManager, getPrivacyManagerOpen, getServerPrivacyManagerOpen);
  const menu = useSyncExternalStore(subscribeNavigationMenu, getNavigationMenuOpen, getServerPrivacyManagerOpen);
  const newsletter = useSyncExternalStore(subscribeNewsletterExpanded, getNewsletterExpanded, getServerPrivacyManagerOpen);
  const consentPending = useSyncExternalStore(subscribeConsentBanner, getConsentBannerPending, getServerConsentBannerPending);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const dockSide = useSyncExternalStore(subscribeNewsletterDock, getNewsletterDockSide, getServerNewsletterDockSide);
  const isGuide = /^\/(?:zh\/|ko\/)?guides\/[a-z0-9-]+\/$/.test(pathname || "");
  const isTour = /^\/(?:zh\/|ko\/)?tours\/[a-z0-9-]+\/$/.test(pathname || "");
  const apiUrl = privateTourQuoteApiUrl();
  const enabled = Boolean(apiUrl) && process.env.NEXT_PUBLIC_HOMEGROUND_PRIVATE_TOUR_QUOTE_ENABLED === "true" && process.env.NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED === "true" && process.env.NEXT_PUBLIC_HOMEGROUND_PRIVACY_READY === "true";
  const whatsappEnabled = process.env.NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED !== "false";
  const locked = status === "sending" || status === "uncertain" || status === "saved";
  const privacyHref = `${locale === "en" ? "" : `/${locale}`}/privacy/`;
  const updateStatus = (value: Status) => { statusRef.current = value; setStatus(value); };

  function show(next: PrivateTourInquiryContext | null, returnFocus?: HTMLElement | null) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosing(false);
    // An unresolved dispatch owns its immutable context and retry key, even after closing.
    if (!dispatching.current && statusRef.current !== "uncertain") {
      setContext(next);
      if (statusRef.current === "saved") { updateStatus("idle"); snapshotRef.current = null; setReference(""); setNote(""); }
    }
    triggerRef.current = returnFocus ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    markNewsletterPromptHandled();
    setInquiryOpen(true);
    setOpen(true);
    trackEvent("contact_options_viewed", { page_language: locale }, { firstPartyContext: { productSlug: next?.slug, packageId: next?.selection?.packageId, travelers: next?.selection?.travelers, surface: next ? "product" : "contact_options" } });
  }

  useEffect(() => {
    const receive = (event: Event) => {
      const candidate = (event as CustomEvent<PrivateTourInquiryContext>).detail;
      const valid = candidate && getPrivateTourInquiryContext(candidate.slug, locale, candidate.selection);
      if (!valid || pathname !== `${locale === "en" ? "" : `/${locale}`}/tours/${valid.slug}/`) return;
      show(valid, consumeTourContactReturnFocus());
    };
    window.addEventListener(tourContactOpenEvent, receive);
    return () => window.removeEventListener(tourContactOpenEvent, receive);
  }, [pathname, locale]);

  useEffect(() => {
    setOpen(false); setClosing(false); setInquiryOpen(false);
    return () => { if (closeTimer.current) clearTimeout(closeTimer.current); setInquiryOpen(false); };
  }, [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) { dialog?.close(); return; }
    if (!dialog.open) dialog.showModal();
    titleRef.current?.focus({ preventScroll: true });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; dialog.close(); };
  }, [open]);

  useEffect(() => {
    if (status === "saved" && open) titleRef.current?.focus({ preventScroll: true });
  }, [status, open]);

  function close() {
    if (closing) return;
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      dialogRef.current?.close();
      setOpen(false); setClosing(false); setInquiryOpen(false);
      requestAnimationFrame(() => {
        const previous = triggerRef.current;
        const visible = previous?.isConnected && previous.getClientRects().length && getComputedStyle(previous).visibility !== "hidden";
        const target = visible ? previous : launcherRef.current ?? document.querySelector<HTMLElement>('header button[aria-expanded]') ?? document.querySelector<HTMLElement>('header a[href]');
        target?.focus({ preventScroll: true });
      });
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 160);
  }

  async function send(snapshot: Snapshot) {
    if (dispatching.current || !enabled) return;
    dispatching.current = true;
    updateStatus("sending"); setFieldError("");
    const submitted = JSON.parse(snapshot.body) as { locale: HomegroundLocale; attribution: { landingPath: string }; productInterest: PrivateTourInquiryContext };
    const journey = { productSlug: submitted.productInterest.slug, packageId: submitted.productInterest.selection?.packageId, travelers: submitted.productInterest.selection?.travelers, surface: "product" as const };
    const parameters = { page_language: submitted.locale, submission_surface: "private_tour_quote" };
    const stillOnSource = () => window.location.pathname === submitted.attribution.landingPath;
    if (stillOnSource()) trackEvent("enquiry_submit_attempted", parameters, { firstPartyContext: journey });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch(apiUrl, { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": snapshot.key }, body: inquiryBodyWithCurrentTrafficConsent(snapshot.body), signal: controller.signal });
      const result = await response.json();
      if (response.ok && result?.state === "submitted" && typeof result.publicReference === "string" && result.publicReference.trim()) {
        setReference(result.publicReference.trim()); updateStatus("saved");
        if (stillOnSource()) trackEnquirySubmitted({ ...parameters, reply_channel: "email", form_version: currentPrivateTourQuoteFormVersion }, { firstPartyContext: journey });
      } else if (!response.ok && result?.error?.persistenceState === "not_persisted") {
        updateStatus("failed"); snapshotRef.current = null;
        const fields = result.error?.fieldErrors;
        const messages = {
          en: { email: "Please check your email address.", date: "Please enter a valid arrival date, or choose dates not decided.", note: "Please keep your note within 1,000 characters.", control: "Please remove unusual control characters from your note." },
          zh: { email: "请检查邮箱地址是否正确。", date: "请填写有效的抵达日期，或选择日期还没确定。", note: "请将备注控制在 1,000 字以内。", control: "请移除备注中复制进来的特殊控制字符。" },
          ko: { email: "이메일 주소를 확인해 주세요.", date: "올바른 도착일을 입력하거나 날짜 미정을 선택해 주세요.", note: "메모는 1,000자 이내로 입력해 주세요.", control: "메모에 포함된 특수 제어 문자를 삭제해 주세요." },
        }[submitted.locale];
        setFieldError(fields?.["contact.email"] ? messages.email : fields?.travelDate ? messages.date : fields?.note === "invalid_control_character" ? messages.control : fields?.note ? messages.note : "");
        if (stillOnSource()) trackEvent("enquiry_submit_failed", parameters, { firstPartyContext: { ...journey, errorCode: response.status === 429 ? "rate_limited" : response.status === 422 ? "validation" : "server_error" } });
      } else {
        updateStatus("uncertain");
        if (stillOnSource()) trackEvent("enquiry_submit_uncertain", parameters, { firstPartyContext: { ...journey, errorCode: "unknown_response" } });
      }
    } catch {
      updateStatus("uncertain");
      if (stillOnSource()) trackEvent("enquiry_submit_uncertain", parameters, { firstPartyContext: { ...journey, errorCode: "network" } });
    } finally { clearTimeout(timeout); dispatching.current = false; }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!context || locked || !enabled) return;
    const data = new FormData(event.currentTarget);
    const body = JSON.stringify({ schemaVersion: privateTourQuoteSchemaVersion, formVersion: currentPrivateTourQuoteFormVersion,
      entryPath: "private_tour_quote", locale, contact: { channel: "email", email: email.trim() }, productInterest: context,
      travelDate: undecided ? null : date, note: note.trim() || null, privacyNoticeVersion: homepageEmailPrivacyNoticeVersion,
      attribution: { landingPath: `${locale === "en" ? "" : `/${locale}`}/tours/${context.slug}/` },
      experiment: null, antiAbuse: { companyWebsite: String(data.get("companyWebsite") || "") }, trafficSessionToken: getTrafficSessionToken() ?? null });
    snapshotRef.current = { body, key: crypto.randomUUID() };
    void send(snapshotRef.current);
  }

  function trackContact(channel: "email" | "whatsapp") {
    trackEvent("contact_option_clicked", { channel, page_language: locale }, { firstPartyContext: { productSlug: context?.slug, packageId: context?.selection?.packageId, travelers: context?.selection?.travelers, surface: context ? "product" : "contact_options" } });
  }
  const emailHref = context ? buildPrivateTourMailtoHref(homegroundBusiness.serviceEmail, locale, context) : `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(text.ask)}&body=${encodeURIComponent(`https://homegroundchina.com${pathname}`)}`;

  return <div data-homeground-contact-ready={isTour || isGuide ? "true" : undefined}>
    {isGuide && !open && !privacy && !menu && !newsletter && !consentPending ? <button type="button" className={styles.launcher} data-newsletter-side={dockSide} ref={launcherRef} onClick={() => show(null)} aria-haspopup="dialog"><MessageCircle size={20} strokeWidth={1.7} aria-hidden="true" /><span>{text.ask}</span></button> : null}
    <dialog ref={dialogRef} className={styles.dialog} data-closing={closing} data-compact={!context || status === "saved"} aria-labelledby={`${id}-title`} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className={styles.sheet}>
        <div className={styles.header}><span>HOMEGROUND CHINA</span><button type="button" className={styles.close} aria-label={text.close} onClick={close}><X size={20} strokeWidth={1.7} aria-hidden="true" /></button></div>
        <div className={styles.body}>
          {status === "saved" ? <div className={styles.receipt}><span className={styles.check}><Check size={24} aria-hidden="true" /></span><h2 id={`${id}-title`} ref={titleRef} tabIndex={-1}>{text.success}</h2><p>{text.successBody}</p>{context ? <div className={styles.context}><strong>{context.name}</strong><p>{privateTourInquirySelectionLabel(context, locale)}</p></div> : null}<p className={styles.reference}>{text.reference} <strong>{reference}</strong></p><button type="button" className={styles.primary} onClick={close}>{text.done}<ArrowRight size={18} aria-hidden="true" /></button></div> : <>
            <h2 id={`${id}-title`} ref={titleRef} tabIndex={-1}>{text.title}</h2>
            <p className={styles.intro}>{context ? enabled ? text.intro : text.unavailable : text.guideBody}</p>
            {context ? <div className={styles.context}><span>{text.selected}</span><strong>{context.name}</strong>{privateTourInquirySelectionLabel(context, locale) ? <p>{privateTourInquirySelectionLabel(context, locale)}</p> : null}</div> : null}
            {context && enabled ? <form className={styles.form} onSubmit={submit} aria-busy={status === "sending"}>
              <fieldset disabled={locked}>
                <label htmlFor={`${id}-email`}>{text.email}<input id={`${id}-email`} name="email" type="email" required autoComplete="email" autoCapitalize="none" spellCheck={false} maxLength={254} placeholder="you@example.com" value={email} onChange={event => setEmail(event.target.value)} /></label>
                {!undecided ? <label htmlFor={`${id}-date`}>{text.date}<input id={`${id}-date`} name="travelDate" type="date" required disabled={locked} value={date} onInput={event => setDate(event.currentTarget.value)} onChange={event => setDate(event.target.value)} /></label> : null}
                <label className={styles.checkbox}><input type="checkbox" checked={undecided} onChange={event => setUndecided(event.target.checked)} />{text.undecided}</label>
                <label htmlFor={`${id}-note`}>{text.note} <span className={styles.optional}>{text.optional}</span><textarea id={`${id}-note`} name="note" rows={2} maxLength={1000} value={note} placeholder={text.placeholder} onChange={event => setNote(event.target.value)} /></label>
                <label className={styles.honeypot} aria-hidden="true">Website<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
              </fieldset>
              <p className={styles.consent}>{text.consent} <a href={privacyHref} target="_blank" rel="noopener noreferrer">{text.privacy}</a></p>
              {status === "failed" || status === "uncertain" ? <p className={styles.error} role="alert">{status === "failed" ? fieldError || text.failed : text.uncertain}</p> : null}
              {status === "uncertain" ? <button className={styles.primary} type="button" onClick={() => snapshotRef.current && void send(snapshotRef.current)}>{text.retry}<ArrowRight size={18} aria-hidden="true" /></button> : <button className={styles.primary} type="submit" disabled={status === "sending"}>{status === "sending" ? text.sending : text.submit}{status !== "sending" ? <ArrowRight size={18} aria-hidden="true" /> : null}</button>}
              {whatsappEnabled ? <a className={styles.whatsappButton} href={tourWhatsAppHref(locale, context, pathname || undefined)} target="_blank" rel="noopener noreferrer" onClick={() => trackContact("whatsapp")}><MessageCircle size={20} aria-hidden="true" />{text.whatsapp}</a> : null}
              <p className={styles.manual}>{text.manual}</p>
            </form> : null}
            {(!context || !enabled || status === "failed" || status === "uncertain") ? <div className={styles.direct}>
              {whatsappEnabled && (!context || !enabled) ? <a className={styles.primary} href={tourWhatsAppHref(locale, context, pathname || undefined)} target="_blank" rel="noopener noreferrer" onClick={() => trackContact("whatsapp")}><MessageCircle size={19} aria-hidden="true" />{text.whatsapp}</a> : null}
              {(!context || !enabled || status === "failed" || status === "uncertain") ? <a className={styles.directLink} href={emailHref} onClick={() => trackContact("email")}><Mail size={18} aria-hidden="true" />{text.guideEmail}</a> : null}
              {!context ? <a className={styles.catalog} href={`${locale === "en" ? "/" : `/${locale}/`}#travel-products`}>{text.tours}<ArrowRight size={16} aria-hidden="true" /></a> : null}
            </div> : null}
          </>}
        </div>
      </div>
    </dialog>
  </div>;
}
