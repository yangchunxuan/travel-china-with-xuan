"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail, MessageCircle, MessagesSquare, X } from "lucide-react";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { homegroundMessengerUrl } from "../lib/homegroundSocial";
import {
  getPrivateTourInquiryContext,
  getPrivateTourInquirySubmissionContext,
  privateTourInquirySelectionLabel,
  type PrivateTourInquiryContext,
} from "../lib/privateTourInquiryContext";
import {
  currentHomepageEmailFormVersion,
  currentPrivateTourQuoteFormVersion,
  homepageEmailInquirySchemaVersion,
  travellerAckPrivacyNoticeVersion,
  privateTourQuoteSchemaVersion,
} from "../lib/inquiryVersions";
import { trackEnquirySubmitted, trackEvent } from "../lib/analytics";
import { inquiryBodyWithCurrentTrafficConsent } from "../lib/inquiryTrafficConsent";
import { isJiangnanTour, parseRequestedTravelers, tourContactNote } from "../lib/tourContactDraft";
import { privateTourQuoteApiUrl } from "../lib/tourContact";
import { japaneseDirectWhatsAppEnabled, japaneseContactOpenEvent, setJapaneseContactReady, type JapaneseContactRequest } from "../lib/japaneseContactFlow";
import { japaneseGeneralContactHrefs } from "../lib/japaneseSite";
import { setInquiryOpen } from "../lib/siteOverlayState";
import styles from "./TourContactPanel.module.css";
import { createInquiryReceipt, type InquiryReceiptData } from "../lib/inquiryReceipt";
import { InquiryReceipt } from "./InquiryReceipt";
import { EmailTypoHint } from "./EmailTypoHint";
import { japaneseInquiryReceiptCopy } from "../lib/japaneseInquiryReceiptCopy";

type Status = "idle" | "sending" | "saved" | "failed" | "uncertain";
type Snapshot = { body: string; key: string; requestedTravelers?: number | null };
const requestTimeoutMs = 20_000;

/** Japanese copy and paths, with the same saved inquiry receipt and retry rules as the main site. */
export function JapaneseInquiryDialog() {
  const pathname = usePathname() || "/ja/";
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const snapshotRef = useRef<Snapshot | null>(null);
  const sendingRef = useRef(false);
  const statusRef = useRef<Status>("idle");
  const id = useId();
  const [request, setRequest] = useState<JapaneseContactRequest | null>(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [datesUndecided, setDatesUndecided] = useState(true);
  const [note, setNote] = useState("");
  const [group, setGroup] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  statusRef.current = status;
  const [receipt, setReceipt] = useState<InquiryReceiptData | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");

  const context: PrivateTourInquiryContext | null = request?.slug && pathname === `/ja/tours/${request.slug}/`
    ? getPrivateTourInquiryContext(request.slug, "ja", request.selection)
    : null;
  const customGroup = context && isJiangnanTour(context.slug) && !context.selection;
  const requestedTravelers = customGroup ? parseRequestedTravelers(group) : null;
  const apiUrl = privateTourQuoteApiUrl();
  const formEnabled = Boolean(apiUrl) &&
    process.env.NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED === "true" &&
    process.env.NEXT_PUBLIC_HOMEGROUND_PRIVACY_READY === "true" &&
    (context
      ? process.env.NEXT_PUBLIC_HOMEGROUND_PRIVATE_TOUR_QUOTE_ENABLED === "true"
      : process.env.NEXT_PUBLIC_HOMEGROUND_HOMEPAGE_EMAIL_ENABLED === "true");
  const directLinks = japaneseGeneralContactHrefs(pathname.startsWith("/ja/") ? pathname : "/ja/");
  const productMessage = context ? [
    "こんにちは。日本語で旅行の相談をしたいです。",
    `希望する旅行：${context.name}`,
    context.selection ? `希望するプラン・人数：${privateTourInquirySelectionLabel(context, "ja")}` : "参加人数：",
    customGroup && requestedTravelers ? `参加人数：${requestedTravelers}名` : "",
    `旅行予定の時期：${datesUndecided ? "未定" : date}`,
    note.trim() ? `ご希望：${note.trim()}` : "",
    `参照ページ：https://homegroundchina.com/ja/tours/${context.slug}/`,
  ].filter(Boolean).join("\n") : "";
  const configuredPhone = process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER || "8613174215999";
  const phone = /^\d{7,15}$/.test(configuredPhone) ? configuredPhone : "8613174215999";
  const whatsappHref = context
    ? `https://wa.me/${phone}?text=${encodeURIComponent(productMessage)}`
    : request?.whatsappHref ?? directLinks.whatsapp;
  const emailHref = context
    ? `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(`日本語での旅行相談：${context.name}`)}&body=${encodeURIComponent(productMessage)}`
    : request?.emailHref ?? directLinks.email;
  const busy = status === "sending" || status === "saved" || status === "uncertain";

  useEffect(() => {
    const receive = (event: Event) => {
      const detail = (event as CustomEvent<JapaneseContactRequest>).detail ?? {};
      if (detail.slug && pathname !== `/ja/tours/${detail.slug}/`) return;
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      // Keep the original retry key and immutable submission if receipt is uncertain.
      if (snapshotRef.current && (statusRef.current === "uncertain" || sendingRef.current)) {
        setOpen(true);
        return;
      }
      setRequest(detail);
      setStatus("idle");
      setError("");
      setReceipt(null);
      setEmail("");
      setDate("");
      setDatesUndecided(true);
      setNote("");
      setGroup("");
      snapshotRef.current = null;
      setOpen(true);
    };
    window.addEventListener(japaneseContactOpenEvent, receive);
    setJapaneseContactReady(true);
    return () => {
      setJapaneseContactReady(false);
      window.removeEventListener(japaneseContactOpenEvent, receive);
    };
  }, [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      setInquiryOpen(true);
      dialog.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
    } else if (!open && dialog.open) {
      dialog.close();
      setInquiryOpen(false);
      if (returnFocusRef.current?.isConnected) returnFocusRef.current.focus({ preventScroll: true });
    }
    return () => {
      if (dialog.open) dialog.close();
      setInquiryOpen(false);
    };
  }, [open]);

  const close = () => { if (!sendingRef.current) setOpen(false); };

  useEffect(() => {
    if (status === "saved" && open) receiptRef.current?.focus({ preventScroll: true });
  }, [status, open]);

  async function send(snapshot: Snapshot) {
    if (!apiUrl || sendingRef.current) return;
    sendingRef.current = true;
    setStatus("sending");
    setError("");
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), requestTimeoutMs);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": snapshot.key },
        body: inquiryBodyWithCurrentTrafficConsent(snapshot.body),
        signal: controller.signal,
      });
      const raw = await response.text();
      let result: { state?: unknown; publicReference?: unknown; error?: { code?: unknown; persistenceState?: unknown } } | null = null;
      try { result = raw ? JSON.parse(raw) : null; } catch { result = null; }
      if (response.ok && result?.state === "submitted" && typeof result.publicReference === "string" && result.publicReference.trim()) {
        setReceipt(createInquiryReceipt(result, snapshot.body, "ja", snapshot.requestedTravelers));
        setStatus("saved");
        trackEnquirySubmitted({ page_language: "ja", reply_channel: "email", submission_surface: context ? "private_tour_quote" : "homepage_email" });
      } else if (!response.ok && result?.error?.persistenceState === "not_persisted") {
        setStatus("failed");
        snapshotRef.current = null;
        setError(response.status === 429 ? "送信が集中しています。少し待ってからお試しください。" :
          response.status === 422 ? "入力内容を確認してください。保存はされていません。" :
            "お問い合わせを保存できませんでした。もう一度お試しください。");
      } else {
        setStatus("uncertain");
      }
    } catch {
      setStatus("uncertain");
    } finally {
      window.clearTimeout(timer);
      sendingRef.current = false;
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formEnabled || busy || !email.trim() || (customGroup && requestedTravelers === null)) return;
    const form = new FormData(event.currentTarget);
    const base = {
      locale: "ja" as const,
      contact: { channel: "email" as const, email: email.trim() },
      privacyNoticeVersion: travellerAckPrivacyNoticeVersion,
      experiment: null,
      antiAbuse: { companyWebsite: String(form.get("companyWebsite") || "") },
      // JA pages do not yet mint a JA traffic session; never attach an EN/KO/ZH token.
      trafficSessionToken: null,
    };
    const payload = context ? {
      ...base,
      schemaVersion: privateTourQuoteSchemaVersion,
      formVersion: currentPrivateTourQuoteFormVersion,
      entryPath: "private_tour_quote",
      productInterest: getPrivateTourInquirySubmissionContext(context, "ja"),
      travelDate: datesUndecided ? null : date,
      note: tourContactNote(note, "", requestedTravelers),
      attribution: { landingPath: `/ja/tours/${context.slug}/` },
    } : {
      ...base,
      schemaVersion: homepageEmailInquirySchemaVersion,
      formVersion: currentHomepageEmailFormVersion,
      entryPath: "homepage_email",
      productInterest: null,
      attribution: { landingPath: "/ja/" },
    };
    snapshotRef.current = { body: JSON.stringify(payload), key: crypto.randomUUID(), requestedTravelers };
    trackEvent("enquiry_submit_attempted", { page_language: "ja", submission_surface: context ? "private_tour_quote" : "homepage_email" });
    void send(snapshotRef.current);
  }

  const recordClick = (channel: "email" | "whatsapp" | "messenger") =>
    trackEvent("contact_option_clicked", { channel, page_language: "ja" });

  return (
    <dialog ref={dialogRef} className={styles.dialog} data-homeground-contact-ready="true" data-compact={!context || status === "saved"} aria-labelledby={`${id}-title`}
      onCancel={event => { event.preventDefault(); close(); }}
      onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className={styles.sheet}>
        <div className={styles.header}><span>HOMEGROUND CHINA</span><button type="button" className={styles.close} aria-label="閉じる" onClick={close}><X size={20} aria-hidden="true" /></button></div>
        <div className={styles.body}>
          {status === "saved" && receipt ? <InquiryReceipt receipt={receipt} locale="ja" localizedCopy={japaneseInquiryReceiptCopy} headingId={`${id}-title`} containerRef={receiptRef}>
            <button type="button" className={styles.primary} onClick={close}>旅程に戻る <ArrowRight size={18} aria-hidden="true" /></button>
          </InquiryReceipt> : <>
            <h2 id={`${id}-title`} tabIndex={-1}>日本語で旅を相談する</h2>
            <p className={styles.intro}>{context ? "旅行時期とご希望をお知らせください。日程と料金を確認してメールでご返信します。" : "メールアドレスをお知らせください。旅のご希望は返信の中で伺います。"}</p>
            {context ? <div className={styles.context}><span>選択中の旅程</span><strong>{context.name}</strong>{context.selection ? <p>{privateTourInquirySelectionLabel(context, "ja")}</p> : null}</div> : null}
            {formEnabled ? <form className={styles.form} onSubmit={submit} aria-busy={status === "sending"}>
              <fieldset disabled={busy}>
                <label htmlFor={`${id}-email`}>メールアドレス<input id={`${id}-email`} type="email" autoComplete="email" required maxLength={254} value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" /></label>
                <EmailTypoHint email={email} locale="ja" localizedCopy={japaneseInquiryReceiptCopy} disabled={busy} onAccept={setEmail} />
                {context ? <>
                  {customGroup ? <label htmlFor={`${id}-group`}>参加人数<input id={`${id}-group`} type="number" min={1} max={99} required value={group} onChange={event => setGroup(event.target.value)} /></label> : null}
                  {!datesUndecided ? <label htmlFor={`${id}-date`}>希望する到着日<input id={`${id}-date`} type="date" required value={date} onChange={event => setDate(event.target.value)} /></label> : null}
                  <label className={styles.checkbox}><input type="checkbox" checked={datesUndecided} onChange={event => setDatesUndecided(event.target.checked)} />日程は未定</label>
                  <label htmlFor={`${id}-note`}>ご希望・ご質問 <span className={styles.optional}>任意</span><textarea id={`${id}-note`} rows={2} maxLength={900} value={note} onChange={event => setNote(event.target.value)} placeholder="宿泊、移動、歩くペースなど" /></label>
                </> : null}
                <label className={styles.honeypot} aria-hidden="true">Website<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
              </fieldset>
              <p className={styles.consent}>返信のために入力内容を使用します。<a href="/ja/privacy/" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a></p>
              {status === "failed" ? <p className={styles.error} role="alert">{error}</p> : null}
              {status === "uncertain" ? <p className={styles.error} role="alert">保存できたか確認できませんでした。二重送信を避けるため、同じ内容を安全に再確認してください。</p> : null}
              {status === "uncertain" ? <button type="button" className={styles.primary} onClick={() => snapshotRef.current && void send(snapshotRef.current)}>確認して再試行 <ArrowRight size={18} aria-hidden="true" /></button>
                : <button type="submit" className={styles.primary} disabled={status === "sending"}>{status === "sending" ? "送信中…" : "見積もり・相談を送る"}{status !== "sending" ? <ArrowRight size={18} aria-hidden="true" /> : null}</button>}
            </form> : <p className={styles.manual}>現在、サイト内のフォームは利用できません。下の方法で直接ご連絡ください。</p>}
            <div className={styles.direct}>
              {japaneseDirectWhatsAppEnabled() ? <a className={styles.whatsappButton} href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => recordClick("whatsapp")}><MessageCircle size={18} aria-hidden="true" />WhatsAppで相談</a> : null}
              <a className={styles.directLink} href={emailHref} onClick={() => recordClick("email")}><Mail size={18} aria-hidden="true" />メールアプリで送る</a>
              <a className={styles.directLink} href={homegroundMessengerUrl()} target="_blank" rel="noopener noreferrer" onClick={() => recordClick("messenger")}><MessagesSquare size={18} aria-hidden="true" />Messengerで相談</a>
              <p className={styles.manual}>これらのリンクは下書きやチャットを開くだけです。内容を確認してからご自身で送信してください。</p>
            </div>
          </>}
        </div>
      </div>
    </dialog>
  );
}
