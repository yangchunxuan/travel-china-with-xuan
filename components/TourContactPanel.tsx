"use client";

import { closeModalDialog, supportsModalDialog, tryOpenModalDialog } from "../lib/browserCapabilities";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, BedDouble, Mail, MessageCircle, X } from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { getPrivateTourInquiryContext, getPrivateTourInquiryContextFromSearchParams, getPrivateTourInquirySubmissionContext, privateTourInquirySelectionLabel, privateTourInquiryStayPreference, buildPrivateTourMailtoHref, type PrivateTourInquiryContext } from "../lib/privateTourInquiryContext";
import { tourContactCopy, tourContactOpenEvent, guideContactOpenEvent, consumeTourContactReturnFocus, tourWhatsAppHref, tourContactMessageText, privateTourQuoteApiUrl } from "../lib/tourContact";
import { getTrafficSessionToken, trackEnquirySubmitted, trackEvent } from "../lib/analytics";
import { inquiryBodyWithCurrentTrafficConsent } from "../lib/inquiryTrafficConsent";
import { privateTourQuoteSchemaVersion, currentPrivateTourQuoteFormVersion, travellerAckPrivacyNoticeVersion } from "../lib/inquiryVersions";
import {
  getNavigationMenuOpen, getPrivacyManagerOpen, getServerPrivacyManagerOpen,
  getNewsletterExpanded, subscribeNavigationMenu, subscribePrivacyManager,
  subscribeNewsletterExpanded, setInquiryOpen, getConsentBannerPending,
  getServerConsentBannerPending, subscribeConsentBanner, getNewsletterDockSide,
  getServerNewsletterDockSide, subscribeNewsletterDock,
} from "../lib/siteOverlayState";
import { markNewsletterPromptHandled } from "../lib/newsletterPrompt";
import { openContactCard } from "../lib/contactCard";
import { TourDateField } from "./TourDateField";
import { isJiangnanTour, jiangnanContactCopy, parseRequestedTravelers, referralSources, tourContactNote, tourContactNoteMaxLength, customTourContactNoteMaxLength, type ZhangjiajieStayPreference, type ReferralSource } from "../lib/tourContactDraft";
import { KakaoTalkContact } from "./KakaoTalkContact";
import styles from "./TourContactPanel.module.css";
import { createInquiryReceipt, type InquiryReceiptData } from "../lib/inquiryReceipt";
import { InquiryReceipt } from "./InquiryReceipt";
import { EmailTypoHint } from "./EmailTypoHint";

type Status = "idle" | "sending" | "saved" | "failed" | "uncertain";
type Snapshot = { body: string; key: string; requestedTravelers?: number | null };

const directTourContactCopy = {
  en: {
    intro: "Email us from your own inbox or message us on WhatsApp. We'll reply in the same conversation.",
    email: "Email us directly",
    formIntro: "Prefer us to email you first? Leave your details for a personal quote.",
    failed: "We couldn't save your enquiry. Please try again, or email us using the option above.",
  },
  zh: {
    intro: "你可以用自己的邮箱直接给我们发邮件，或通过 WhatsApp 联系。我们会在同一段对话里回复。",
    email: "直接发邮件",
    formIntro: "希望我们先发邮件给你？也可以留下信息，获取专属报价。",
    failed: "暂时没能保存你的咨询，请重试或用上方的邮件入口联系我们。",
  },
  ko: {
    intro: "본인 이메일에서 직접 보내시거나 WhatsApp으로 문의해 주세요. 같은 대화에서 답변드리겠습니다.",
    email: "이메일로 직접 문의",
    formIntro: "저희가 먼저 이메일을 보내드릴까요? 정보를 남겨주시면 맞춤 견적을 보내드립니다.",
    failed: "문의를 저장하지 못했습니다. 다시 시도하거나 위의 이메일 버튼으로 연락해 주세요.",
  },
} as const;

export function TourContactPanel({ locale }: { locale: HomegroundLocale }) {
  const pathname = usePathname();
  const text = tourContactCopy[locale];
  const directText = directTourContactCopy[locale];
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const snapshotRef = useRef<Snapshot | null>(null);
  const dispatching = useRef(false);
  const statusRef = useRef<Status>("idle");
  const formStartedRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [modalReady, setModalReady] = useState(false);
  // Each opening gets a fresh KakaoTalk hint, so a revealed number or copied message never carries over.
  const [openCount, setOpenCount] = useState(0);
  const [closing, setClosing] = useState(false);
  const [context, setContext] = useState<PrivateTourInquiryContext | null>(null);
  const [guideTitle, setGuideTitle] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [undecided, setUndecided] = useState(true);
  const [note, setNote] = useState("");
  const [requestedTravelersInput, setRequestedTravelersInput] = useState("");
  const [groupTouched, setGroupTouched] = useState(false);
  const [referralSource, setReferralSource] = useState<ReferralSource>("");
  const [status, setStatus] = useState<Status>("idle");
  const [receipt, setReceipt] = useState<InquiryReceiptData | null>(null);
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
  const jiangnan = isJiangnanTour(context?.slug);
  const jiangnanText = jiangnanContactCopy[locale];
  const customGroup = Boolean(context?.customGroup) || (jiangnan && Boolean(context) && !context?.selection);
  const requestedTravelers = customGroup ? parseRequestedTravelers(requestedTravelersInput) : null;
  // A Jiangnan custom group names its size first, so the WhatsApp message carries it (as on the live site).
  const contactLinkReady = !customGroup || requestedTravelers !== null;
  // Every product quote may carry the traveller's self-reported source; guides have no quote form.
  const stayPreference = context ? privateTourInquiryStayPreference(context, "en") as ZhangjiajieStayPreference | null : null;
  const stayLabel = context ? privateTourInquiryStayPreference(context, locale) : null;
  const noteMaxLength = context?.customGroup ? customTourContactNoteMaxLength : tourContactNoteMaxLength;
  const draft = { travelDate: undecided ? null : date, note, referralSource: context ? referralSource : "" as const, requestedTravelers, stayPreference };
  const privacyHref = `${locale === "en" ? "" : `/${locale}`}/privacy/`;
  const updateStatus = (value: Status) => { statusRef.current = value; setStatus(value); };

  function show(next: PrivateTourInquiryContext | null, returnFocus?: HTMLElement | null) {
    if (!tryOpenModalDialog(dialogRef.current)) {
      setModalReady(false);
      setOpen(false);
      setClosing(false);
      setInquiryOpen(false);
      return false;
    }
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosing(false);
    // An unresolved dispatch owns its immutable context and retry key, even after closing.
    if (!dispatching.current && statusRef.current !== "uncertain") {
      setContext(next);
      setGuideTitle(!next && isGuide ? document.querySelector("main h1")?.textContent?.trim() || "" : "");
      if (statusRef.current === "saved") { updateStatus("idle"); snapshotRef.current = null; setReceipt(null); setNote(""); setReferralSource(""); setRequestedTravelersInput(""); setGroupTouched(false); }
    }
    formStartedRef.current = false;
    setOpenCount(count => count + 1);
    triggerRef.current = returnFocus ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    markNewsletterPromptHandled();
    setInquiryOpen(true);
    setOpen(true);
    trackEvent("contact_options_viewed", { page_language: locale }, { firstPartyContext: { productSlug: next?.slug, packageId: next?.selection?.packageId, travelers: next?.selection?.travelers, surface: next ? "product" : "contact_options" } });
    return true;
  }

  useEffect(() => {
    const receive = (event: Event) => {
      const candidate = (event as CustomEvent<PrivateTourInquiryContext>).detail;
      const valid = candidate && getPrivateTourInquiryContext(candidate.slug, locale, candidate.selection, candidate.customGroup);
      if (!valid || pathname !== `${locale === "en" ? "" : `/${locale}`}/tours/${valid.slug}/`) return;
      if (show(valid, consumeTourContactReturnFocus())) event.preventDefault();
    };
    const receiveGuide = (event: Event) => {
      if (!isGuide || (event as CustomEvent<{ path?: string }>).detail?.path !== pathname) return;
      if (show(null, consumeTourContactReturnFocus())) event.preventDefault();
    };
    window.addEventListener(tourContactOpenEvent, receive);
    window.addEventListener(guideContactOpenEvent, receiveGuide);
    return () => {
      window.removeEventListener(tourContactOpenEvent, receive);
      window.removeEventListener(guideContactOpenEvent, receiveGuide);
    };
  }, [pathname, locale, isGuide]);

  useEffect(() => {
    setOpen(false); setClosing(false); setInquiryOpen(false);
    return () => { if (closeTimer.current) clearTimeout(closeTimer.current); setInquiryOpen(false); };
  }, [pathname]);

  // A modified click or a copied quote link opens the same controlled request
  // on its product page, rather than losing the preference at the homepage.
  useEffect(() => {
    if (!isTour || window.location.hash !== "#planner-contact") return;
    const linked = getPrivateTourInquiryContextFromSearchParams(new URLSearchParams(window.location.search), locale);
    if (linked?.customGroup && pathname === `${locale === "en" ? "" : `/${locale}`}/tours/${linked.slug}/`) show(linked);
  }, [pathname, locale, isTour]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const supported = Boolean(dialog && supportsModalDialog(dialog));
    setModalReady(supported);
    if (!dialog || !supported) return;
    if (!open) { closeModalDialog(dialog); return; }
    if (!tryOpenModalDialog(dialog)) {
      setModalReady(false); setOpen(false); setClosing(false); setInquiryOpen(false);
      return;
    }
    titleRef.current?.focus({ preventScroll: true });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; closeModalDialog(dialog); };
  }, [open]);

  useEffect(() => {
    if (status === "saved" && open) titleRef.current?.focus({ preventScroll: true });
  }, [status, open]);

  function close() {
    if (closing) return;
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      closeModalDialog(dialogRef.current);
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
        setReceipt(createInquiryReceipt(result, snapshot.body, submitted.locale, snapshot.requestedTravelers, snapshot.key)); updateStatus("saved");
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
    if (customGroup && requestedTravelers === null) { setGroupTouched(true); return; }
    if (note.length > noteMaxLength) {
      setFieldError(locale === "zh" ? `请将备注控制在 ${noteMaxLength} 字以内。` : locale === "ko" ? `메모는 ${noteMaxLength}자 이내로 입력해 주세요.` : `Please keep your note within ${noteMaxLength} characters.`);
      updateStatus("failed");
      return;
    }
    setFieldError("");
    const data = new FormData(event.currentTarget);
    const body = JSON.stringify({ schemaVersion: privateTourQuoteSchemaVersion, formVersion: currentPrivateTourQuoteFormVersion,
      entryPath: "private_tour_quote", locale, contact: { channel: "email", email: email.trim() }, productInterest: getPrivateTourInquirySubmissionContext(context, locale),
      travelDate: draft.travelDate, note: tourContactNote(note, draft.referralSource, requestedTravelers, stayPreference), privacyNoticeVersion: travellerAckPrivacyNoticeVersion,
      attribution: { landingPath: `${locale === "en" ? "" : `/${locale}`}/tours/${context.slug}/` },
      experiment: null, antiAbuse: { companyWebsite: String(data.get("companyWebsite") || "") }, trafficSessionToken: getTrafficSessionToken() ?? null });
    snapshotRef.current = { body, key: crypto.randomUUID(), requestedTravelers };
    void send(snapshotRef.current);
  }

  function trackContact(channel: "email" | "whatsapp" | "kakao") {
    trackEvent("contact_option_clicked", { channel, page_language: locale }, { firstPartyContext: { productSlug: context?.slug, packageId: context?.selection?.packageId, travelers: context?.selection?.travelers, surface: context ? "product" : "contact_options" } });
  }
  /** Once per opening, on the first focus or edit of a quote field (email, date, note, source). The Jiangnan group size also unlocks WhatsApp/KakaoTalk, so it is not a form start; buttons and links are not fields. */
  function trackFormStart(event: { target: EventTarget | null }) {
    if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) || event.target.name === "companyWebsite") return;
    if (formStartedRef.current || !context || !enabled || locked) return;
    formStartedRef.current = true;
    trackEvent("quick_email_started", { page_language: locale, submission_surface: "private_tour_quote" }, { firstPartyContext: { productSlug: context.slug, packageId: context.selection?.packageId, travelers: context.selection?.travelers, surface: "product" } });
  }
  // Korean pages only; follows the WhatsApp rule for a Jiangnan custom group.
  const kakao = (fallback: boolean) => locale === "ko" && contactLinkReady ? <KakaoTalkContact key={`${openCount}-${context?.slug ?? ""}`} className={fallback ? undefined : styles.kakaoChoice} inquiry={() => tourContactMessageText(locale, context, pathname || undefined, !fallback || customGroup ? draft : undefined)} onOpen={() => trackContact("kakao")} /> : null;
  const emailHref = context ? buildPrivateTourMailtoHref(homegroundBusiness.serviceEmail, locale, context, enabled || customGroup ? draft : undefined) : `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(text.ask)}&body=${encodeURIComponent([guideTitle, `https://homegroundchina.com${pathname}`].filter(Boolean).join("\n"))}`;
  const selectedLabel = context ? privateTourInquirySelectionLabel(context, locale) : null;
  const groupLabel = requestedTravelers !== null ? locale === "zh" ? `${requestedTravelers} 人同行` : locale === "ko" ? `${requestedTravelers}명 동행` : `${requestedTravelers} travellers` : null;
  const needsGroup = Boolean(context?.customGroup) && !contactLinkReady;
  const askForGroup = () => { setGroupTouched(true); document.getElementById(`${id}-group`)?.focus(); };

  return <div data-homeground-contact-ready={modalReady && (isTour || isGuide) ? "true" : undefined}>
    {modalReady && isGuide && !open && !privacy && !menu && !newsletter && !consentPending ? <button type="button" className={styles.launcher} data-newsletter-side={dockSide} data-contact-card-trigger="" ref={launcherRef} onClick={event => { if (!openContactCard({ trigger: "planner" }, event.currentTarget) && !show(null)) window.location.assign(emailHref); }} aria-haspopup="dialog"><MessageCircle size={20} strokeWidth={1.7} aria-hidden="true" /><span>{text.ask}</span></button> : null}
    <dialog ref={dialogRef} hidden={!open} className={styles.dialog} data-closing={closing} data-compact={!context || status === "saved"} aria-labelledby={`${id}-title`} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className={styles.sheet}>
        <div className={styles.header}><span>HOMEGROUND CHINA</span><button type="button" className={styles.close} aria-label={text.close} onClick={close}><X size={20} strokeWidth={1.7} aria-hidden="true" /></button></div>
        <div className={styles.body}>
          {status === "saved" && receipt ? <InquiryReceipt receipt={receipt} locale={locale} headingId={`${id}-title`} headingRef={titleRef}><button type="button" className={styles.primary} onClick={close}>{text.done}<ArrowRight size={18} aria-hidden="true" /></button></InquiryReceipt> : <>
            <h2 id={`${id}-title`} ref={titleRef} tabIndex={-1}>{text.title}</h2>
            <p className={styles.intro}>{context ? enabled ? directText.intro : text.unavailable : text.guideBody}</p>
            {context ? <div className={styles.context}><span>{text.selected}</span><strong>{context.name}</strong>{selectedLabel || groupLabel ? <p>{selectedLabel || groupLabel}</p> : null}{stayLabel ? <p className={styles.contextPreference}><BedDouble size={14} aria-hidden="true" /><span>{locale === "zh" ? "住宿偏好（待确认）" : locale === "ko" ? "숙소 선호(확인 예정)" : "Stay preference (to confirm)"}:</span> <strong>{stayLabel}</strong></p> : null}</div> : null}
            {!context && guideTitle ? <div className={styles.context}><span>{locale === "zh" ? "你正在看的攻略" : locale === "ko" ? "읽고 있는 가이드" : "About this guide"}</span><strong>{guideTitle}</strong></div> : null}
            {context && enabled ? <div className={styles.directFirst}>
              <div className={styles.directChoices}>
                {needsGroup ? <button type="button" className={styles.emailButton} onClick={askForGroup}><Mail size={18} aria-hidden="true" />{directText.email}</button> : <a className={styles.emailButton} href={emailHref} data-contact-card-direct="" onClick={() => trackContact("email")}><Mail size={18} aria-hidden="true" />{directText.email}</a>}
                {whatsappEnabled && contactLinkReady ? <a className={styles.whatsappButton} href={tourWhatsAppHref(locale, context, pathname || undefined, draft)} target="_blank" rel="noopener noreferrer" onClick={() => trackContact("whatsapp")}><MessageCircle size={18} aria-hidden="true" />{text.whatsapp}</a> : null}
                {kakao(false)}
              </div>
              <span className={styles.emailAddress}>{homegroundBusiness.serviceEmail}</span>
            </div> : null}
            {customGroup ? <div className={styles.groupField}>
              <label htmlFor={`${id}-group`}>{jiangnanText.group}</label>
              <input id={`${id}-group`} name="requestedTravelers" type="number" inputMode="numeric" min={1} max={99} step={1} required={enabled} form={enabled ? `${id}-quote-form` : undefined} value={requestedTravelersInput} onChange={event => { setRequestedTravelersInput(event.target.value); setGroupTouched(true); }} onBlur={() => setGroupTouched(true)} disabled={locked} aria-invalid={groupTouched && requestedTravelers === null ? "true" : undefined} aria-describedby={`${id}-group-hint${groupTouched && requestedTravelers === null ? ` ${id}-group-error` : ""}`} />
              <p id={`${id}-group-hint`}>{jiangnanText.groupHint}</p>
              {groupTouched && requestedTravelers === null ? <p id={`${id}-group-error`} className={styles.groupError} role="alert">{jiangnanText.groupError}</p> : null}
            </div> : null}
            {context && enabled ? <p className={styles.formIntro}>{directText.formIntro}</p> : null}
            {context && enabled ? <form id={`${id}-quote-form`} className={styles.form} onSubmit={submit} onFocus={trackFormStart} onChange={trackFormStart} aria-busy={status === "sending"}>
              <fieldset disabled={locked}>
                <label htmlFor={`${id}-email`}>{text.email}<input id={`${id}-email`} name="email" type="email" required autoComplete="email" autoCapitalize="none" spellCheck={false} maxLength={254} placeholder="you@example.com" value={email} onChange={event => setEmail(event.target.value)} /></label>
                <EmailTypoHint email={email} locale={locale} disabled={locked} onAccept={setEmail} />
                {!undecided ? <TourDateField id={`${id}-date`} label={text.date} locale={locale} value={date} onChange={setDate} disabled={locked} active={open && !closing} /> : null}
                <label className={styles.checkbox}><input type="checkbox" checked={undecided} onChange={event => setUndecided(event.target.checked)} />{text.undecided}</label>
                <label htmlFor={`${id}-note`}>{text.note} <span className={styles.optional}>{text.optional}</span><textarea id={`${id}-note`} name="note" rows={2} maxLength={noteMaxLength} value={note} placeholder={jiangnan ? jiangnanText.placeholder : text.placeholder} onChange={event => setNote(event.target.value)} /></label>
                {context ? <label htmlFor={`${id}-source`}>{jiangnanText.source} <span className={styles.optional}>{text.optional}</span><select id={`${id}-source`} value={referralSource} onChange={event => setReferralSource(event.target.value as ReferralSource)}><option value="">{jiangnanText.blank}</option>{referralSources.map(source => <option key={source} value={source}>{source === "friend" || source === "other" ? jiangnanText[source] : source}</option>)}</select></label> : null}
                <label className={styles.honeypot} aria-hidden="true">Website<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
              </fieldset>
              <p className={styles.consent}>{text.consent} <a href={privacyHref} target="_blank" rel="noopener noreferrer">{text.privacy}</a></p>
              {status === "failed" || status === "uncertain" ? <p className={styles.error} role="alert">{status === "failed" ? fieldError || directText.failed : text.uncertain}</p> : null}
              {status === "uncertain" ? <button className={styles.primary} type="button" onClick={() => snapshotRef.current && void send(snapshotRef.current)}>{text.retry}<ArrowRight size={18} aria-hidden="true" /></button> : <button className={styles.primary} type="submit" disabled={status === "sending"}>{status === "sending" ? text.sending : text.submit}{status !== "sending" ? <ArrowRight size={18} aria-hidden="true" /> : null}</button>}
              <p className={styles.manual}>{text.manual}</p>
            </form> : null}
            {(!context || !enabled) ? <div className={styles.direct}>
              {whatsappEnabled && contactLinkReady ? <a className={styles.primary} href={tourWhatsAppHref(locale, context, pathname || undefined, customGroup ? draft : undefined)} target="_blank" rel="noopener noreferrer" onClick={() => trackContact("whatsapp")}><MessageCircle size={19} aria-hidden="true" />{text.whatsapp}</a> : null}
              {kakao(true)}
              {needsGroup ? <button type="button" className={styles.directLink} onClick={askForGroup}><Mail size={18} aria-hidden="true" />{text.guideEmail}</button> : <a className={styles.directLink} href={emailHref} data-contact-card-direct="" onClick={() => trackContact("email")}><Mail size={18} aria-hidden="true" />{text.guideEmail}</a>}
              {!context ? <a className={styles.catalog} href={`${locale === "en" ? "" : `/${locale}`}/tours/`}>{text.tours}<ArrowRight size={16} aria-hidden="true" /></a> : null}
            </div> : null}
          </>}
        </div>
      </div>
    </dialog>
  </div>;
}
