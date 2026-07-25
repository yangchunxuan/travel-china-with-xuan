"use client";

import { useEffect } from "react";
import { captureEntryAttribution } from "../lib/analytics";

/**
 * Records first-party enquiry attribution on public pages.
 *
 * This remains active while Google Analytics is disabled: it writes only to
 * this tab's sessionStorage and lets a submitted enquiry retain its entry page,
 * external campaign labels and latest guide CTA.
 */
export function SiteAttribution() {
  useEffect(() => {
    captureEntryAttribution();
  }, []);

  return null;
}
