"use client";

import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { contactCardRequestForLink } from "../lib/contactCard";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  classifyNavigationClick,
  navigationDocumentPrefetchRules,
  navigationIdlePrefetchHrefs,
  navigationIntentPrefetchHref,
  navigationLoaderCeiling,
  navigationLoaderCount,
  navigationPrefetchAllowed,
  navigationPrefetchedPagePath,
  navigationPrefetchKind,
  type NavigationFeedbackMode,
  type NavigationPrefetchConnection,
} from "../lib/navigationFeedback";
import styles from "./NavigationFeedback.module.css";

const pressedAttribute = "data-hg-nav-pressed";
const connection = () =>
  (navigator as Navigator & { connection?: NavigationPrefetchConnection }).connection;
/** Matches the longest "done" transition in NavigationFeedback.module.css. */
const settleMs = 400;
/** A navigation that has not arrived by now has failed or been abandoned. */
const giveUpMs = 20_000;

/**
 * One response to every page change. The chosen link answers at once. If the
 * next page is not there within 220ms (a CSS transition-delay, no JS timer),
 * the page below the header turns white, a count rises in the bottom-left
 * corner and a terracotta line follows it along the top edge; on arrival
 * the count completes and the loader fades. Fast arrivals draw nothing, and
 * pages still swap atomically (components/PageArrivalFrame.tsx), with no
 * entrance animation.
 *
 * It also prefetches, so the loader rarely has to show: a tour card's exact
 * page as soon as it is pointed at, touched or focused, the likeliest next
 * pages once a homepage is idle, and (Speculation Rules) the language switch.
 */
export function NavigationFeedback({ locale }: { locale: HomegroundLocale }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const prefetchRef = useRef<((href: string) => void) | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const root = rootRef.current;
    const count = countRef.current;
    if (!root || !count) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let captureAt = 0;
    let clickAt = 0;
    let frame = 0;
    let settleTimer = 0;
    let giveUpTimer = 0;
    let startKey = "";
    let shown = -1;
    let blurredWhileVisible = false;
    let mode: NavigationFeedbackMode | null = null;
    let pressed: HTMLAnchorElement | null = null;

    const setState = (state: "idle" | "pending" | "done") => {
      root.dataset.state = state;
    };
    // The count and the line always show the same value.
    const show = (value: number) => {
      if (value === shown) return;
      shown = value;
      count.textContent = String(value);
      root.style.setProperty("--hg-nav-progress", String(value / 100));
    };
    const releasePressed = () => {
      pressed?.removeAttribute(pressedAttribute);
      pressed = null;
    };
    const stopWatching = () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(giveUpTimer);
      window.removeEventListener("beforeunload", onBeforeUnload);
      mode = null;
      blurredWhileVisible = false;
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
      show(100);
      setState("done");
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => setState("idle"), settleMs);
    };
    // One frame loop: counts while the loader waits and, for an App Router
    // change, watches for the new URL. The router writes it in the same
    // commit that swaps the page, so the first frame that sees it runs
    // before the new page is painted.
    const tick = () => {
      if (mode === "client" && `${location.pathname}${location.search}` !== startKey) {
        arrive();
        return;
      }
      const value = reducedMotion.matches ? 0 : navigationLoaderCount(performance.now() - clickAt);
      show(value);
      if (mode === "document" && (reducedMotion.matches || value >= navigationLoaderCeiling)) return;
      frame = window.requestAnimationFrame(tick);
    };

    // Capture on window runs before every page handler; bubble on window runs
    // after React (rooted at document) and the contact card's capture listener.
    const onClickCapture = () => {
      captureAt = performance.now();
      // A full document load was cancelled ("Leave site?" -> Stay) and the
      // visitor carried on: any later click means they stayed.
      if (mode === "document") reset();
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
        // Restart from an empty count rather than fading out a full one.
        setState("idle");
        void root.getBoundingClientRect();
      }
      stopWatching();
      window.clearTimeout(settleTimer);
      releasePressed();
      pressed = anchor;
      anchor.setAttribute(pressedAttribute, "");
      mode = next;
      clickAt = performance.now();
      startKey = `${location.pathname}${location.search}`;
      show(0);
      setState("pending");
      giveUpTimer = window.setTimeout(reset, giveUpMs);
      frame = window.requestAnimationFrame(tick);
      // Added now, so it runs after any page's own beforeunload handler.
      if (next === "document") window.addEventListener("beforeunload", onBeforeUnload);
    };
    // A full document load can be cancelled by the "Leave site?" prompt that
    // a page with an unsaved draft asks for (its beforeunload handler cancels
    // the event). The choice is the visitor's, so the loader clears while they
    // decide, as it does for a confirm() inside the click. Scrolling or
    // touching the old page while the next one loads changes nothing; Escape,
    // or the page getting focus back from a prompt (not from another tab),
    // means the visitor stayed.
    function onBeforeUnload(event: BeforeUnloadEvent) {
      if (mode === "document" && event.defaultPrevented) reset();
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (mode === "document" && event.key === "Escape") reset();
    };
    const onBlur = () => {
      if (mode === "document" && document.visibilityState === "visible") {
        blurredWhileVisible = true;
      }
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") blurredWhileVisible = false;
    };
    const onFocus = () => {
      if (mode === "document" && blurredWhileVisible) reset();
    };
    // The old page's last frame (and, where supported, the cross-document
    // view transition) shows the count completed.
    const onPageSwap = () => {
      if (mode === "document") show(100);
    };
    // Back from the next page restores this one from the back/forward cache
    // exactly as it was left: pending. Clear it before it is shown.
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) reset();
    };

    window.addEventListener("click", onClickCapture, true);
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("popstate", reset);
    window.addEventListener("pageswap", onPageSwap);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      reset();
      window.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("popstate", reset);
      window.removeEventListener("pageswap", onPageSwap);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [locale]);

  // Prefetch on intent: pointing at, touching or focusing a link with a query
  // (tour cards) fetches its exact page at once; the <Link>'s own prefetch is
  // filed under the path alone and its click fetches the page again. Other
  // links are left to <Link>, which prefetches them as they come into view.
  // Idle prefetches use the <Link>'s own kind and skip pages whose payload is
  // already in (resource timing); one still in flight shares its cache entry.
  useEffect(() => {
    const requested = new Set<string>();
    const fetched = new Set<string>();
    const note = (entries: PerformanceEntryList) => {
      for (const entry of entries) {
        const page = navigationPrefetchedPagePath(entry.name);
        if (page) fetched.add(page);
      }
    };
    let observer: PerformanceObserver | null = null;
    try {
      observer = new PerformanceObserver((list) => note(list.getEntries()));
      observer.observe({ type: "resource", buffered: true });
    } catch {
      observer = null;
    }
    const prefetch = (href: string) => {
      const kind = navigationPrefetchKind(href);
      if (requested.has(href) || (kind === "auto" && fetched.has(href))) return;
      if (!navigationPrefetchAllowed(connection())) return;
      requested.add(href);
      router.prefetch(href, { kind: kind === "full" ? PrefetchKind.FULL : PrefetchKind.AUTO });
    };
    prefetchRef.current = prefetch;

    const onIntent = (event: Event) => {
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = navigationIntentPrefetchHref({
        href: anchor.href,
        currentHref: location.href,
        target: anchor.target,
        download: anchor.hasAttribute("download"),
        contactTrigger: contactCardRequestForLink(anchor, locale) !== null,
      });
      if (href) prefetch(href);
    };
    const options = { capture: true, passive: true } as const;
    document.addEventListener("pointerenter", onIntent, options);
    document.addEventListener("touchstart", onIntent, options);
    document.addEventListener("focusin", onIntent, options);
    return () => {
      prefetchRef.current = null;
      observer?.disconnect();
      document.removeEventListener("pointerenter", onIntent, options);
      document.removeEventListener("touchstart", onIntent, options);
      document.removeEventListener("focusin", onIntent, options);
    };
  }, [locale, router]);

  // Once the page has loaded and the browser is idle, prefetch the few
  // likeliest next pages for this kind of page (the homepages only).
  useEffect(() => {
    const hrefs = navigationIdlePrefetchHrefs(pathname ?? "");
    if (hrefs.length === 0) return;
    let idle = 0;
    let timer = 0;
    const run = () => {
      for (const href of hrefs) prefetchRef.current?.(href);
    };
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(run, { timeout: 4000 });
      } else {
        timer = window.setTimeout(run, 1500);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idle) window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  // The language switch is a full document load; where Speculation Rules are
  // supported, the next document is fetched on hover or press.
  useEffect(() => {
    if (typeof HTMLScriptElement.supports !== "function" || !HTMLScriptElement.supports("speculationrules")) return;
    if (!navigationPrefetchAllowed(connection())) return;
    const rules = document.createElement("script");
    rules.type = "speculationrules";
    rules.textContent = JSON.stringify(navigationDocumentPrefetchRules(locale));
    document.head.append(rules);
    return () => rules.remove();
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
      <span ref={countRef} className={styles.count} />
    </div>
  );
}
