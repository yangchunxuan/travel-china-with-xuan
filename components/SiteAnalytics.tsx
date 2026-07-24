"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GA_MEASUREMENT_ID, captureEntryAttribution } from "../lib/analytics";

/**
 * Loads GA4 on the public site and records where the visitor entered from.
 *
 * Mounted by the English and localized layouts, deliberately not by the admin
 * layout: the owner's own console traffic would otherwise pollute the numbers
 * that decide which guides are working.
 */
export function SiteAnalytics() {
  useEffect(() => {
    captureEntryAttribution();
  }, []);

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
