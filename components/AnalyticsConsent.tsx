"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  analyticsConsentOpenEventName,
  readAnalyticsConsent,
  saveAnalyticsConsent,
  subscribeAnalyticsConsent,
  type AnalyticsConsentPreferences,
} from "../lib/analyticsConsent";
import { getAnalyticsConsentCopy } from "../lib/analyticsConsentI18n";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import styles from "./AnalyticsConsent.module.css";

function privacyPath(locale: HomegroundLocale) {
  if (locale === "zh") return "/zh/privacy/";
  if (locale === "ko") return "/ko/privacy/";
  return "/privacy/";
}

const focusableSelector = [
  "button:not([disabled])",
  "a[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function AnalyticsConsent({
  locale,
}: {
  locale: HomegroundLocale;
}) {
  const copy = getAnalyticsConsentCopy(locale);
  const titleId = useId();
  const bodyId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [preferences, setPreferences] =
    useState<AnalyticsConsentPreferences | null>(null);
  const [managerOpen, setManagerOpen] = useState(false);
  const [draftAnalytics, setDraftAnalytics] = useState(false);
  const [draftMarketing, setDraftMarketing] = useState(false);

  useEffect(() => {
    setPreferences(readAnalyticsConsent());
    setHydrated(true);

    const handleOpen = () => {
      const current = readAnalyticsConsent();
      setDraftAnalytics(current?.analytics ?? false);
      setDraftMarketing(current?.marketing ?? false);
      setManagerOpen(true);
    };

    const unsubscribeConsent = subscribeAnalyticsConsent(setPreferences);
    window.addEventListener(analyticsConsentOpenEventName, handleOpen);
    return () => {
      unsubscribeConsent();
      window.removeEventListener(analyticsConsentOpenEventName, handleOpen);
    };
  }, []);

  useEffect(() => {
    if (!managerOpen) return;

    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>(focusableSelector)
        ?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setManagerOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          focusableSelector,
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      returnFocusRef.current?.focus();
      returnFocusRef.current = null;
    };
  }, [managerOpen]);

  const choose = (analytics: boolean, marketing: boolean) => {
    const next = saveAnalyticsConsent({ analytics, marketing });
    setPreferences(next);
    setDraftAnalytics(next.analytics);
    setDraftMarketing(next.marketing);
    setManagerOpen(false);
  };

  const openManager = () => {
    setDraftAnalytics(preferences?.analytics ?? false);
    setDraftMarketing(preferences?.marketing ?? false);
    setManagerOpen(true);
  };

  if (!hydrated) return null;

  return (
    <>
      {!preferences && !managerOpen ? (
        <section
          className={styles.banner}
          aria-labelledby={`${titleId}-banner`}
        >
          <div className={styles.bannerCopy}>
            <h2 id={`${titleId}-banner`}>{copy.bannerTitle}</h2>
            <p>{copy.bannerBody}</p>
            <a href={privacyPath(locale)}>{copy.privacyNotice}</a>
          </div>
          <div className={styles.bannerActions}>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={() => choose(true, true)}
            >
              {copy.acceptAll}
            </button>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() => choose(false, false)}
            >
              {copy.necessaryOnly}
            </button>
            <button
              className={styles.textButton}
              type="button"
              onClick={openManager}
            >
              {copy.manage}
            </button>
          </div>
        </section>
      ) : null}

      {managerOpen ? (
        <div className={styles.backdrop}>
          <div
            className={styles.dialog}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={bodyId}
          >
            <div className={styles.dialogHeader}>
              <div>
                <h2 id={titleId}>{copy.dialogTitle}</h2>
                <p id={bodyId}>{copy.dialogBody}</p>
              </div>
              <button
                className={styles.closeButton}
                type="button"
                onClick={() => setManagerOpen(false)}
              >
                {copy.close}
              </button>
            </div>

            <div className={styles.choiceList}>
              <div className={styles.choice}>
                <div>
                  <strong>{copy.necessaryTitle}</strong>
                  <p>{copy.necessaryBody}</p>
                </div>
                <span className={styles.alwaysOn}>
                  {copy.alwaysOn}
                </span>
              </div>

              <label className={styles.choice}>
                <span>
                  <strong>{copy.analyticsTitle}</strong>
                  <span className={styles.choiceBody}>
                    {copy.analyticsBody}
                  </span>
                </span>
                <span className={styles.switchControl}>
                  <span>{copy.optional}</span>
                  <input
                    type="checkbox"
                    checked={draftAnalytics}
                    onChange={(event) =>
                      setDraftAnalytics(event.target.checked)
                    }
                  />
                </span>
              </label>

              <label className={styles.choice}>
                <span>
                  <strong>{copy.marketingTitle}</strong>
                  <span className={styles.choiceBody}>
                    {copy.marketingBody}
                  </span>
                </span>
                <span className={styles.switchControl}>
                  <span>{copy.optional}</span>
                  <input
                    type="checkbox"
                    checked={draftMarketing}
                    onChange={(event) =>
                      setDraftMarketing(event.target.checked)
                    }
                  />
                </span>
              </label>
            </div>

            <div className={styles.dialogActions}>
              <a href={privacyPath(locale)}>{copy.privacyNotice}</a>
              <button
                className={styles.primaryButton}
                type="button"
                onClick={() => choose(draftAnalytics, draftMarketing)}
              >
                {copy.save}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
