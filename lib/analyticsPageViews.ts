export type AnalyticsPageViewSink = "first_party" | "google" | "meta";

export type AnalyticsPageViewState = Record<AnalyticsPageViewSink, string>;

export function createAnalyticsPageViewState(): AnalyticsPageViewState {
  return {
    first_party: "",
    google: "",
    meta: "",
  };
}

export function consumeAnalyticsPageView(
  state: AnalyticsPageViewState,
  sink: AnalyticsPageViewSink,
  pageKey: string,
) {
  if (!pageKey || state[sink] === pageKey) return false;
  state[sink] = pageKey;
  return true;
}

export function resetAnalyticsPageView(
  state: AnalyticsPageViewState,
  sink: AnalyticsPageViewSink,
) {
  state[sink] = "";
}

export function resetAnalyticsPageViewsForNewPage(
  state: AnalyticsPageViewState,
  pageKey: string,
) {
  for (const sink of ["first_party", "google", "meta"] as const) {
    if (state[sink] !== pageKey) resetAnalyticsPageView(state, sink);
  }
}
