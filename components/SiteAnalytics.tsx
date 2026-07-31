"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ANALYTICS_ENABLED,
  GA_MEASUREMENT_ID,
  META_PIXEL_ID,
  captureEntryAttribution,
  clearAnalyticsSessionState,
  disableGoogleAnalytics,
  disableMetaPixel,
  initializeGoogleAnalytics,
  initializeMetaPixel,
  removeAttributionParametersFromAddressBar,
  trackPageView,
} from "../lib/analytics";
import {
  analyticsConsentChangedEventName,
  readAnalyticsConsent,
  type AnalyticsConsentPreferences,
} from "../lib/analyticsConsent";
import type { HomegroundLocale } from "../lib/homegroundI18n";

const googleScriptId = "homeground-ga4-script";
const metaScriptId = "homeground-meta-pixel-script";

function loadExternalScript(id: string, source: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = source;
  document.head.appendChild(script);
}

function removeExternalScript(id: string) {
  document.getElementById(id)?.remove();
}

export function SiteAnalytics({
  locale,
}: {
  locale: HomegroundLocale;
}) {
  const pathname = usePathname();
  const [preferences, setPreferences] = useState<
    AnalyticsConsentPreferences | null | undefined
  >(undefined);
  const lastTrackedPathRef = useRef("");

  useEffect(() => {
    const refreshPreferences = () => {
      setPreferences(readAnalyticsConsent());
    };
    refreshPreferences();
    window.addEventListener(
      analyticsConsentChangedEventName,
      refreshPreferences,
    );
    return () => {
      window.removeEventListener(
        analyticsConsentChangedEventName,
        refreshPreferences,
      );
    };
  }, []);

  useEffect(() => {
    if (!ANALYTICS_ENABLED || preferences === undefined) return;

    if (preferences?.analytics) {
      captureEntryAttribution();
      removeAttributionParametersFromAddressBar();
      if (initializeGoogleAnalytics()) {
        loadExternalScript(
          googleScriptId,
          `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
            GA_MEASUREMENT_ID,
          )}`,
        );
      }
    } else {
      disableGoogleAnalytics();
      clearAnalyticsSessionState();
      removeExternalScript(googleScriptId);
    }

    if (preferences?.marketing) {
      // Meta reads the current page URL. Remove campaign query values before
      // its script loads even when the visitor allowed marketing but not
      // Homeground's first-party analytics.
      removeAttributionParametersFromAddressBar();
      if (initializeMetaPixel()) {
        loadExternalScript(
          metaScriptId,
          "https://connect.facebook.net/en_US/fbevents.js",
        );
      }
    } else {
      disableMetaPixel();
      removeExternalScript(metaScriptId);
    }
  }, [preferences?.analytics, preferences?.marketing, preferences]);

  useEffect(() => {
    const measurementAllowed = Boolean(
      preferences?.analytics || preferences?.marketing,
    );
    if (!ANALYTICS_ENABLED || !measurementAllowed || !pathname) {
      if (!measurementAllowed) lastTrackedPathRef.current = "";
      return;
    }

    const pageKey = `${locale}:${pathname}`;
    if (lastTrackedPathRef.current === pageKey) return;
    lastTrackedPathRef.current = pageKey;
    trackPageView({ path: pathname, locale });
  }, [
    locale,
    pathname,
    preferences?.analytics,
    preferences?.marketing,
  ]);

  return null;
}
