"use client";

import { useEffect } from "react";
import { homegroundSerifScSlicesStylesheetUrl } from "../lib/homegroundSerifScFontFiles";

// The Chinese editorial serif ships as unicode-range slices
// (public/fonts/README.md). Slice 0 is declared in app/globals.css with no
// unicode-range and preloaded by the Chinese layout, so it is the only serif
// file that can take part in the first render. This adds the stylesheet that
// declares the other slices only after the page has fired its load event and
// slice 0 has loaded, in an idle period: their requests then never compete
// with the hero photo and never finish before slice 0. Until then the few
// characters outside slice 0 use the fallback serif.
//
// It is a component rather than an inline script because switching from a
// Korean page is a client navigation inside the same root layout, and a script
// element React inserts during a navigation does not run.
const primaryFace = '500 1em "Homeground Serif SC"';

export function HomegroundSerifScSlices() {
  useEffect(() => {
    const href = homegroundSerifScSlicesStylesheetUrl;
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
      document.fonts.load(primaryFace).then(whenIdle, whenIdle);
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
