"use client";
import { MessageCircle } from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { getPrivateTourInquiryContext, type PrivateTourInquirySlug } from "../lib/privateTourInquiryContext";
import { tourContactCopy, tourWhatsAppHref } from "../lib/tourContact";
import { trackEvent } from "../lib/analytics";
import { usePrivateTourSelection } from "./PrivateTourSelection";
import styles from "./TourContactPanel.module.css";
export function TourWhatsAppLink({ locale, slug }: { locale: HomegroundLocale; slug: string }) {
  const selected = usePrivateTourSelection();
  const context = getPrivateTourInquiryContext(slug, locale, selected?.slug === slug ? selected.selection : undefined);
  if (process.env.NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED === "false") return null;
  return <a className={styles.secondaryLink} href={tourWhatsAppHref(locale, context)} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("contact_option_clicked", { channel: "whatsapp", page_language: locale }, { firstPartyContext: { productSlug: slug, packageId: context?.selection?.packageId, travelers: context?.selection?.travelers, surface: "product" } })}><MessageCircle size={18} aria-hidden="true" />{tourContactCopy[locale].alternative}</a>;
}
