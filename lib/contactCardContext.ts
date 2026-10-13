import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { getPrivateTourDetailSelectionFromSearchParams, getPrivateTourInquiryContext, type PrivateTourInquiryContext } from "./privateTourInquiryContext.ts";

export interface ContactCardPageContext {
  path: string;
  tour: PrivateTourInquiryContext | null;
  guideTitle: string;
}

/** Only a published price option may be copied from the product-page URL. */
export function selectedContactCardTour(slug: string | null | undefined, locale: HomegroundLocale, search: string, requestedTour?: PrivateTourInquiryContext) {
  if (!slug) return null;
  // A control can have an initial price option before the URL has query
  // parameters. Rebuild it through the published contract, never trust labels.
  if (requestedTour?.slug === slug && requestedTour.selection) {
    const validated = getPrivateTourInquiryContext(slug, locale, requestedTour.selection);
    if (validated?.selection) return validated;
  }
  const selection = getPrivateTourDetailSelectionFromSearchParams(slug, new URLSearchParams(search));
  return getPrivateTourInquiryContext(slug, locale, selection ?? undefined);
}

/** Tracking queries and a change of contact channel do not create a new request. */
export function contactCardContextKey(context: ContactCardPageContext) {
  return JSON.stringify([context.path, context.tour?.slug ?? null,
    context.tour?.selection?.packageId ?? null, context.tour?.selection?.travelers ?? null]);
}
