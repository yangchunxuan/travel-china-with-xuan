"use client";

import { useCallback, useEffect, useRef } from "react";
import { trackEventOnce, type EventParameters, type EventDispatchOptions, type HomegroundEventName, type PageViewMeasurementTarget } from "../lib/analytics";
import { subscribeAnalyticsConsent } from "../lib/analyticsConsent";
import { subscribeAnalyticsRuntime } from "../lib/analyticsRuntime";
import { observeAnalyticsVisibility } from "../lib/analyticsVisibility";

export function useAnalyticsEventOnce() {
  const delivered = useRef(new Set<PageViewMeasurementTarget>());
  return useCallback((name: HomegroundEventName, parameters: EventParameters, options: EventDispatchOptions = {}) => {
    trackEventOnce(delivered.current, name, parameters, options);
  }, []);
}

export function useVisibleAnalyticsEvent<T extends HTMLElement>(name: HomegroundEventName, parameters: EventParameters, enabled = true, options: EventDispatchOptions = {}) {
  const element = useRef<T>(null);
  const latest = useRef({ name, parameters, options });
  latest.current = { name, parameters, options };
  const recordOnce = useAnalyticsEventOnce();
  useEffect(() => {
    if (!enabled || !element.current) return;
    const visible = observeAnalyticsVisibility(element.current, () => {
      const event = latest.current;
      recordOnce(event.name, event.parameters, event.options);
    });
    const consent = subscribeAnalyticsConsent(visible.inspect);
    const runtime = subscribeAnalyticsRuntime(visible.inspect);
    return () => { visible.disconnect(); consent(); runtime(); };
  }, [enabled, recordOnce]);
  return element;
}
