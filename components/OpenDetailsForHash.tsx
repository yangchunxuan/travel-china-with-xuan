"use client";

import { useEffect } from "react";

/**
 * Opens the collapsed <details> that holds the URL's #fragment, on load and
 * on every hash change, then scrolls the target into view. Destination pages
 * link to a city's reservation rules (#city-beijing), which sit in a closed
 * disclosure; not every browser opens one for a fragment by itself. A
 * disclosure marked data-keep-in-view scrolls back into view when closed.
 */
export function OpenDetailsForHash() {
  useEffect(() => {
    function open() {
      let id = "";
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      if (!id) return;
      const target = document.getElementById(id);
      const details = target?.closest("details");
      if (!target || !details) return;
      if (!details.open) details.open = true;
      target.scrollIntoView({ block: "start" });
    }
    open();
    window.addEventListener("hashchange", open);
    // Closing a long disclosure from its sticky row would leave the reader far
    // below it; bring the closed row back under the header instead.
    const keep = Array.from(document.querySelectorAll<HTMLDetailsElement>("details[data-keep-in-view]"));
    function keepInView(event: Event) {
      const details = event.currentTarget as HTMLDetailsElement;
      if (!details.open && details.getBoundingClientRect().top < 64) details.scrollIntoView({ block: "start" });
    }
    keep.forEach((details) => details.addEventListener("toggle", keepInView));
    return () => {
      window.removeEventListener("hashchange", open);
      keep.forEach((details) => details.removeEventListener("toggle", keepInView));
    };
  }, []);
  return null;
}
