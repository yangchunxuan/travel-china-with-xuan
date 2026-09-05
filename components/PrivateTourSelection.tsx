"use client";

import { createContext, useContext, useEffect, useState, type ComponentProps, type ReactNode } from "react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  buildPrivateTourMailtoHref,
  buildPrivateTourDetailHref,
  getPrivateTourDetailSelectionFromSearchParams,
  getPrivateTourInquiryContext,
  getPrivateTourInquirySelection,
  privateTourInquirySelectionQueryKeys,
  type PrivateTourInquirySelection,
  type PrivateTourInquirySlug,
} from "../lib/privateTourInquiryContext";
import { GuideCtaLink } from "./GuideCtaLink";
import { trackEvent } from "../lib/analytics";

const SelectionContext = createContext<{
  slug: PrivateTourInquirySlug;
  selection: PrivateTourInquirySelection;
  setSelection: (selection: PrivateTourInquirySelection) => void;
} | null>(null);

export function PrivateTourSelectionProvider({
  slug, initialSelection, children,
}: {
  slug: PrivateTourInquirySlug;
  initialSelection: PrivateTourInquirySelection;
  children: ReactNode;
}) {
  const [selection, setSelection] = useState<PrivateTourInquirySelection>(() => {
    const initial = getPrivateTourInquirySelection(slug, initialSelection.packageId, initialSelection.travelers);
    if (!initial) throw new Error("Missing published private tour selection");
    return initial;
  });
  useEffect(() => {
    const syncSelection = () => {
      const fromUrl = getPrivateTourDetailSelectionFromSearchParams(slug, new URLSearchParams(window.location.search));
      setSelection(fromUrl ?? initialSelection);
    };
    syncSelection();
    window.addEventListener("popstate", syncSelection);
    return () => window.removeEventListener("popstate", syncSelection);
  }, [slug, initialSelection.packageId, initialSelection.travelers]);
  const changeSelection = (candidate: PrivateTourInquirySelection) => {
    const next = getPrivateTourInquirySelection(slug, candidate.packageId, candidate.travelers);
    if (!next || (next.packageId === selection.packageId && next.travelers === selection.travelers)) return;
    setSelection(next);
    const href = buildPrivateTourDetailHref(window.location.href, slug, next);
    window.history.replaceState(window.history.state, "", href);
    trackEvent("product_selection_changed", {}, { firstPartyContext: { productSlug: slug, packageId: next.packageId, travelers: next.travelers, surface: "product" } });
  };
  return <SelectionContext.Provider value={{ slug, selection, setSelection: changeSelection }}>{children}</SelectionContext.Provider>;
}

export function usePrivateTourSelection() {
  return useContext(SelectionContext);
}

export function useSelectedPrivateTourInquiryHref(href: string | undefined) {
  const context = usePrivateTourSelection();
  if (!href || !context) return href;
  const url = new URL(href, "https://homegroundchina.com");
  if (url.searchParams.get("tour") !== context.slug) return href;
  url.searchParams.set(privateTourInquirySelectionQueryKeys.packageId, context.selection.packageId);
  url.searchParams.set(privateTourInquirySelectionQueryKeys.travelers, String(context.selection.travelers));
  return `${url.pathname}${url.search}${url.hash}`;
}

export function SelectedPrivateTourCta(props: ComponentProps<typeof GuideCtaLink>) {
  const href = useSelectedPrivateTourInquiryHref(props.href) ?? props.href;
  return <GuideCtaLink {...props} href={href} />;
}

export function SelectedPrivateTourEmailLink({
  email, locale, href, children, className,
}: {
  email: string;
  locale: HomegroundLocale;
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const context = usePrivateTourSelection();
  const selectedContext = context
    ? getPrivateTourInquiryContext(context.slug, locale, context.selection)
    : null;
  return <a className={className} href={selectedContext ? buildPrivateTourMailtoHref(email, locale, selectedContext) : href} onClick={() => trackEvent("contact_option_clicked", { channel: "email", page_language: locale }, { firstPartyContext: { productSlug: selectedContext?.slug, packageId: selectedContext?.selection?.packageId, travelers: selectedContext?.selection?.travelers, surface: "product" } })}>{children}</a>;
}
