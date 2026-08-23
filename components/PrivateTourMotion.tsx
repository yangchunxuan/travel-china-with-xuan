"use client";

import { useEffect } from "react";

/**
 * Adds a single, reusable reveal state to product-page sections. The content
 * remains visible without JavaScript; motion is enhancement only.
 */
export function PrivateTourMotion() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tour-reveal]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      elements.length === 0 ||
      reducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      document.documentElement.dataset.tourMotion = "reduced";
      elements.forEach((element) => {
        element.dataset.tourRevealed = "true";
      });
      return;
    }

    document.documentElement.dataset.tourMotion = "ready";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.tourRevealed = "true";
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
