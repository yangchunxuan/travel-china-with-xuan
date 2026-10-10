"use client";

import { useEffect } from "react";
import { spanishContactEdition } from "../lib/spanishContactEdition";
import { setConsentBannerPending } from "../lib/siteOverlayState";
import { ContactCardHost } from "./ContactCardHost";
import { TourContactPanel } from "./TourContactPanel";

/**
 * The main site's contact flow on Spanish pages: the quote dialog on tour
 * pages, the planner button on guides, the contact card on desktop and the
 * sheet on phones, all with Spanish words. Enquiries are filed under the
 * English contract until the intake service knows Spanish (see
 * lib/spanishContactEdition.ts).
 */
export function SpanishContactHost() {
  // Spanish pages show no consent banner, so nothing else clears the state
  // that keeps a guide's planner button out of the banner's way.
  useEffect(() => { setConsentBannerPending(false); }, []);
  return (
    <>
      <TourContactPanel locale="en" edition={spanishContactEdition} />
      <ContactCardHost locale="en" edition={spanishContactEdition} />
    </>
  );
}
