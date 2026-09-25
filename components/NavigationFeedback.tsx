"use client";

import { useEffect, useRef } from "react";
import { contactCardRequestForLink } from "../lib/contactCard";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  classifyNavigationClick,
  type NavigationFeedbackMode,
} from "../lib/navigationFeedback";
import styles from "./NavigationFeedback.module.css";

const pressedAttribute = "data-hg-nav-pressed";
/** Matches the longest "done" transition in NavigationFeedback.module.css. */
const settleMs = 400;
/** A navigation that has not arrived by now has failed or been abandoned. */
const giveUpMs = 20_000;

/**
 * One response to every page change. The chosen link answers at once; if the
 * next page is not there within 160ms (CSS transition-delay, no JS timer) a
 * terracotta line runs along the top edge and the page below the header
 * softly recedes. Fast arrivals show nothing else: pages still swap
 * atomically (components/PageArrivalFrame.tsx), with no entrance animation.
 */
export function NavigationFeedback({ locale }: { locale: HomegroundLocale }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let captureAt = 0;
    let frame = 0;
    let settleTimer = 0;
    let giveUpTimer = 0;
    let startKey = "";
    let mode: NavigationFeedbackMode | null = null;
    let pressed: HTMLAnchorElement | null = null;

    const setState = (state: "idle" | "pending" | "done") => {
      root.dataset.state = state;
    };
    const releasePressed = () => {
      pressed?.removeAttribute(pressedAttribute);
      pressed = null;
    };
    const stopWatching = () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(giveUpTimer);
      mode = null;
    };
    const reset = () => {
      stopWatching();
      window.clearTimeout(settleTimer);
      releasePressed();
      setState("idle");
    };
    const arrive = () => {
      stopWatching();
      releasePressed();
      setState("done");
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => setState("idle"), settleMs);
    };
    // The App Router writes the new URL in the same commit that swaps the page,
    // so the first frame that sees it runs before the new page is painted.
    const watch = () => {
      if (`${location.pathname}${location.search}` !== startKey) {
        arrive();
        return;
      }
      frame = window.requestAnimationFrame(watch);
    };

    // Capture on window runs before every page handler; bubble on window runs
    // after React (rooted at document) and the contact card's capture listener.
    const onClickCapture = () => {
      captureAt = performance.now();
    };
    const onClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const next = classifyNavigationClick({
        href: anchor.href,
        currentHref: location.href,
        target: anchor.target,
        download: anchor.hasAttribute("download"),
        button: event.button,
        metaKey: event.metaKey,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        defaultPrevented: event.defaultPrevented,
        handlerMs: performance.now() - captureAt,
        contactTrigger: contactCardRequestForLink(anchor, locale) !== null,
      });
      if (!next) return;

      if (root.dataset.state === "done") {
        // Restart from an empty line rather than shrinking a full one.
        setState("idle");
        void root.getBoundingClientRect();
      }
      stopWatching();
      window.clearTimeout(settleTimer);
      releasePressed();
      pressed = anchor;
      anchor.setAttribute(pressedAttribute, "");
      mode = next;
      startKey = `${location.pathname}${location.search}`;
      setState("pending");
      giveUpTimer = window.setTimeout(reset, giveUpMs);
      if (next === "client") frame = window.requestAnimationFrame(watch);
    };
    // A document navigation can be cancelled by a "Leave site?" prompt; the
    // visitor's next press or Escape means they stayed.
    const onInterrupt = (event: Event) => {
      if (mode !== "document") return;
      if (event instanceof KeyboardEvent && event.key !== "Escape") return;
      reset();
    };
    // Back from the next page restores this one from the back/forward cache
    // exactly as it was left: pending. Clear it before it is shown.
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) reset();
    };

    window.addEventListener("click", onClickCapture, true);
    window.addEventListener("click", onClick);
    window.addEventListener("pointerdown", onInterrupt, true);
    window.addEventListener("keydown", onInterrupt, true);
    window.addEventListener("popstate", reset);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      reset();
      window.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("click", onClick);
      window.removeEventListener("pointerdown", onInterrupt, true);
      window.removeEventListener("keydown", onInterrupt, true);
      window.removeEventListener("popstate", reset);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [locale]);

  return (
    <div
      ref={rootRef}
      className={styles.feedback}
      data-state="idle"
      data-homeground-navigation-feedback=""
      aria-hidden="true"
    >
      <div className={styles.veil} />
      <div className={styles.bar}>
        <span className={styles.fill} />
      </div>
    </div>
  );
}
