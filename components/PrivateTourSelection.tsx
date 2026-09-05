"use client";

import { createContext, useContext, useState, type ComponentProps, type ReactNode } from "react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  buildPrivateTourMailtoHref,
  getPrivateTourInquiryContext,
  getPrivateTourInquirySelection,
  privateTourInquirySelectionQueryKeys,
  type PrivateTourInquirySelection,
  type PrivateTourInquirySlug,
} from "../lib/privateTourInquiryContext";
import { GuideCtaLink } from "./GuideCtaLink";

const SelectionContext = createContext<{
  slug: PrivateTourInquirySlug;
  selection: PrivateTourInquirySelection;
  setSelection: (selection: PrivateTourInquirySelection) => void;
} | null>(null);

export function PrivateTourSelectionProvider({
  slug, initialPackageId, children,
}: {
  slug: PrivateTourInquirySlug;
  initialPackageId: string;
  children: ReactNode;
}) {
  const [selection, setSelection] = useState<PrivateTourInquirySelection>(() => {
    const initial = getPrivateTourInquirySelection(slug, initialPackageId, 2);
    if (!initial) throw new Error("Missing published private tour selection");
    return initial;
  });
  return <SelectionContext.Provider value={{ slug, selection, setSelection }}>{children}</SelectionContext.Provider>;
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
  return <a className={className} href={selectedContext ? buildPrivateTourMailtoHref(email, locale, selectedContext) : href}>{children}</a>;
}
