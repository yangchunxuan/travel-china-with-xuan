"use client";
import { useEffect, useRef, useState } from "react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { HomegroundBrandMark } from "./HomegroundBrandMark";
import { getNewsletterEndpoint, postNewsletter } from "../lib/newsletter";
import { newsletterCopy } from "../lib/newsletterI18n";
import { markNewsletterJoined } from "../lib/newsletterPrompt";
import styles from "./NewsletterActionPage.module.css";

export function NewsletterActionPage({ locale, action }: { locale: HomegroundLocale; action: "confirm" | "unsubscribe" }) {
  const text = newsletterCopy[locale];
  const [token, setToken] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const requestId = useRef("");
  const inFlight = useRef(false);
  useEffect(() => {
    const value = new URLSearchParams(window.location.hash.slice(1)).get("token");
    setToken(value && /^[0-9a-f]{64}$/.test(value) ? value : null);
    setLoaded(true);
  }, []);
  const confirm = action === "confirm";
  const homeHref = locale === "en" ? "/" : `/${locale}/`;
  const title = state === "done" ? (confirm ? text.activeTitle : text.unsubscribedTitle) : (confirm ? text.confirmTitle : text.unsubscribeTitle);
  const body = state === "done" ? (confirm ? text.activeBody : text.unsubscribedBody) : (confirm ? text.confirmBody : text.unsubscribeBody);
  return <main className={styles.page} lang={locale}>
    <a className={styles.brand} href={homeHref}><HomegroundBrandMark /><strong>Homeground China</strong></a>
    <section className={styles.panel} aria-labelledby="newsletter-action-title">
      <p className={styles.eyebrow}>Homeground China</p>
      <h1 id="newsletter-action-title">{title}</h1>
      <p role={state === "done" ? "status" : undefined}>{body}</p>
      {loaded && (!token || !getNewsletterEndpoint()) ? <p role="alert">{text.invalidLink}</p> : null}
      {state === "error" ? <p className={styles.error} role="alert">{text.error} {text.invalidLink}</p> : null}
      {loaded && token && getNewsletterEndpoint() && state !== "done" ? <button type="button" className={styles.action} aria-disabled={state === "sending"}
        onClick={async () => {
          if (inFlight.current) return;
          inFlight.current = true;
          setState("sending");
          requestId.current ||= crypto.randomUUID();
          try {
            const result = await postNewsletter({ action, token, requestId: requestId.current });
            if (result !== (confirm ? "active" : "unsubscribed")) throw new Error("unexpected-response");
            setState("done"); markNewsletterJoined();
            window.history.replaceState(window.history.state, "", window.location.pathname);
          } catch { setState("error"); }
          finally { inFlight.current = false; }
        }}>{state === "sending" ? text.submitting : (confirm ? text.confirmAction : text.unsubscribeAction)}</button> : null}
      <a className={styles.home} href={homeHref}>{text.home}</a>
    </section>
  </main>;
}
