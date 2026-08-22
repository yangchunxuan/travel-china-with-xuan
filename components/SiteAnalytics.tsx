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
  readAnalyticsConsent,
  subscribeAnalyticsConsent,
  type AnalyticsConsentPreferences,
} from "../lib/analyticsConsent";
import {
  currentAnalyticsLocationKey,
  subscribeAnalyticsLocationChanges,
  thirdPartyMeasurementLocationIsSafe,
} from "../lib/analyticsLocation";
import {
  consumeAnalyticsPageView,
  createAnalyticsPageViewState,
  resetAnalyticsPageView,
} from "../lib/analyticsPageViews";
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
  const [locationKey, setLocationKey] = useState<string | undefined>(
    undefined,
  );
  const pageViewsRef = useRef(createAnalyticsPageViewState());

  useEffect(() => {
    const applyPreferences = (
      next: AnalyticsConsentPreferences | null,
    ) => {
      // Storage events arrive before React effects. Revoke each vendor and
      // clear first-party state synchronously so another tab's withdrawal
      // cannot leave an active measurement window until the next render.
      if (!next?.analytics) {
        disableGoogleAnalytics();
        clearAnalyticsSessionState();
        removeExternalScript(googleScriptId);
        resetAnalyticsPageView(pageViewsRef.current, "first_party");
        resetAnalyticsPageView(pageViewsRef.current, "google");
      }
      if (!next?.marketing) {
        disableMetaPixel();
        removeExternalScript(metaScriptId);
        resetAnalyticsPageView(pageViewsRef.current, "meta");
      }
      setPreferences(next);
    };

    applyPreferences(readAnalyticsConsent());
    return subscribeAnalyticsConsent(applyPreferences);
  }, []);

  useEffect(() => {
    const disableThirdPartyBeforeUnsafeLocation = (nextHref: string) => {
      if (thirdPartyMeasurementLocationIsSafe(nextHref)) return;
      disableGoogleAnalytics();
      disableMetaPixel();
      removeExternalScript(googleScriptId);
      removeExternalScript(metaScriptId);
      resetAnalyticsPageView(pageViewsRef.current, "google");
      resetAnalyticsPageView(pageViewsRef.current, "meta");
    };
    const refreshLocation = () => {
      disableThirdPartyBeforeUnsafeLocation(window.location.href);
      setLocationKey(currentAnalyticsLocationKey());
    };
    const unsubscribe = subscribeAnalyticsLocationChanges({
      beforeChange: disableThirdPartyBeforeUnsafeLocation,
      change: refreshLocation,
    });
    refreshLocation();
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (
      !ANALYTICS_ENABLED ||
      preferences === undefined ||
      locationKey === undefined
    ) {
      return;
    }

    if (preferences?.analytics) {
      captureEntryAttribution();
      removeAttributionParametersFromAddressBar();
      if (
        thirdPartyMeasurementLocationIsSafe() &&
        initializeGoogleAnalytics()
      ) {
        loadExternalScript(
          googleScriptId,
          `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
            GA_MEASUREMENT_ID,
          )}`,
        );
      } else {
        disableGoogleAnalytics();
        removeExternalScript(googleScriptId);
        resetAnalyticsPageView(pageViewsRef.current, "google");
      }
    } else {
      disableGoogleAnalytics();
      clearAnalyticsSessionState();
      removeExternalScript(googleScriptId);
      resetAnalyticsPageView(pageViewsRef.current, "first_party");
      resetAnalyticsPageView(pageViewsRef.current, "google");
    }

    if (preferences?.marketing) {
      // Meta reads the current page URL. Remove campaign query values before
      // its script loads even when the visitor allowed marketing but not
      // Homeground's first-party analytics.
      removeAttributionParametersFromAddressBar();
      if (
        thirdPartyMeasurementLocationIsSafe() &&
        initializeMetaPixel()
      ) {
        loadExternalScript(
          metaScriptId,
          "https://connect.facebook.net/en_US/fbevents.js",
        );
      } else {
        disableMetaPixel();
        removeExternalScript(metaScriptId);
        resetAnalyticsPageView(pageViewsRef.current, "meta");
      }
    } else {
      disableMetaPixel();
      removeExternalScript(metaScriptId);
      resetAnalyticsPageView(pageViewsRef.current, "meta");
    }
  }, [locationKey, preferences]);

  useEffect(() => {
    if (
      !ANALYTICS_ENABLED ||
      locationKey === undefined ||
      !pathname
    ) {
      return;
    }

    const pageKey = `${locale}:${pathname}`;
    const queryFree = thirdPartyMeasurementLocationIsSafe();

    if (preferences?.analytics) {
      if (
        consumeAnalyticsPageView(
          pageViewsRef.current,
          "first_party",
          pageKey,
        )
      ) {
        trackPageView({ path: pathname, locale, target: "first_party" });
      }
      if (
        queryFree &&
        consumeAnalyticsPageView(
          pageViewsRef.current,
          "google",
          pageKey,
        )
      ) {
        trackPageView({ path: pathname, locale, target: "google" });
      } else if (!queryFree) {
        resetAnalyticsPageView(pageViewsRef.current, "google");
      }
    } else {
      resetAnalyticsPageView(pageViewsRef.current, "first_party");
      resetAnalyticsPageView(pageViewsRef.current, "google");
    }

    if (
      preferences?.marketing &&
      queryFree &&
      consumeAnalyticsPageView(
        pageViewsRef.current,
        "meta",
        pageKey,
      )
    ) {
      trackPageView({ path: pathname, locale, target: "meta" });
    } else if (!preferences?.marketing || !queryFree) {
      resetAnalyticsPageView(pageViewsRef.current, "meta");
    }
  }, [
    locale,
    locationKey,
    pathname,
    preferences?.analytics,
    preferences?.marketing,
  ]);

  return null;
}
