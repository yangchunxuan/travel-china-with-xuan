"use client";

import { useEffect } from "react";

/**
 * One-shot reveal for every `[data-reveal]` element on the page (the Apple /
 * Stripe pattern): elements that start below the fold are marked "pending"
 * and switch to "in" the first time they enter, then stay. Nothing is hidden
 * without script, with reduced motion or for content already on screen, and a
 * reveal never plays backwards, and an in-page link's target is shown at once.
 * CSS decides what "pending" and "in" look like.
 */
export function RevealOnce() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
      .filter((element) => element.getBoundingClientRect().top > window.innerHeight * 0.92);
    if (!targets.length) return;
    for (const element of targets) element.dataset.reveal = "pending";
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.reveal = "in";
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.18 });
    for (const element of targets) observer.observe(element);
    // An in-page link's target (and what holds it) shows at once: a jump must
    // never land on something still waiting to fade in.
    const showTarget = (id: string) => {
      const target = id ? document.getElementById(id) : null;
      const pending = target?.closest<HTMLElement>('[data-reveal="pending"]') ?? (target?.dataset.reveal === "pending" ? target : null);
      if (!pending) return;
      pending.dataset.reveal = "in";
      observer.unobserve(pending);
    };
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (link) showTarget(decodeURIComponent(link.getAttribute("href")!.slice(1)));
    };
    const onHash = () => showTarget(decodeURIComponent(window.location.hash.slice(1)));
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHash);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);
  return null;
}
