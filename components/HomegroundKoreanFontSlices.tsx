"use client";

import { useEffect } from "react";
import { homegroundKoreanSlicesStylesheetUrl } from "../lib/homegroundKoreanFontFiles";

// The two Korean fonts ship as unicode-range slices (public/fonts/README.md).
// Slice 00 of each family is declared in app/globals.css with no
// unicode-range and preloaded by the Korean layout, so they are the only
// Korean font files that can take part in the first render. This adds the
// stylesheet that declares the other slices only after the page has fired its
// load event and both slice 00 files have loaded, in an idle period: their
// requests then never compete with the hero photo and never finish before
// slice 00. Until then the few characters outside slice 00 use the fallback
// font.
//
// It is a component rather than an inline script because switching from a
// Chinese page is a client navigation inside the same root layout, and a
// script element React inserts during a navigation does not run.
const primaryFaces = ['400 1em "Homeground Pretendard"', '400 1em "Homeground MaruBuri"'];

export function HomegroundKoreanFontSlices() {
  useEffect(() => {
    const href = homegroundKoreanSlicesStylesheetUrl;
    const declared = () => document.head.querySelector(`link[href="${href}"]`) !== null;
    if (declared()) return undefined;
    let cancelled = false;

    const add = () => {
      if (cancelled || declared()) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    };
    const whenIdle = () => {
      if (cancelled) return;
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(add, { timeout: 2000 });
      } else {
        window.setTimeout(add, 200);
      }
    };
    const start = () => {
      if (cancelled) return;
      Promise.all(primaryFaces.map((face) => document.fonts.load(face))).then(whenIdle, whenIdle);
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
    };
  }, []);

  return null;
}
