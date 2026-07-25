"use client";

import Script from "next/script";
import {
  ANALYTICS_ENABLED,
  GA_MEASUREMENT_ID,
} from "../lib/analytics";

/**
 * HOLD — analytics collection is switched off pending a consent decision.
 *
 * The published privacy notice states, in all three languages, that the site
 * "does not collect planner or page-behaviour events and does not use
 * third-party marketing tracking". That statement was true while the GA script
 * was missing. Loading GA again made the site contradict its own notice for
 * every visitor, so collection is disabled until one of two things happens:
 *
 *   a) a consent mechanism lands (Google Consent Mode, default denied, with a
 *      visible choice), and the notice is rewritten to match; or
 *   b) the owner decides to rewrite the notice and accept unconditional
 *      collection where that is lawful for the audience.
 *
 * Everything else stays wired, but lib/analytics uses this same switch and is
 * a true no-op while it is false, so it cannot even accumulate unread
 * `dataLayer` behaviour events. Flipping this to true is the only code change
 * needed to resume — but it must not be flipped before the notice and the
 * behaviour agree.
 *
 * See supabase/tests/analytics-privacy-consistency.test.mjs, which fails if
 * this is enabled while the notice still denies collection.
 */
export function SiteAnalytics() {
  if (!ANALYTICS_ENABLED) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
