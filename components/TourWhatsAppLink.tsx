"use client";
import { MessageCircle } from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { getPrivateTourInquiryContext, type PrivateTourInquirySlug } from "../lib/privateTourInquiryContext";
import { homegroundWhatsAppHref, tourContactCopy, tourWhatsAppHref } from "../lib/tourContact";
import { trackEvent } from "../lib/analytics";
import { usePrivateTourSelection } from "./PrivateTourSelection";
import styles from "./TourContactPanel.module.css";
export function TourWhatsAppLink({ locale, slug, edition }: { locale: HomegroundLocale; slug: string; edition?: {language:'fr';label:string;title:string;path:string;packageLabels:Readonly<Record<string,string>>;guideNote:string} }) {
  const selected = usePrivateTourSelection();
  const context = getPrivateTourInquiryContext(slug, locale, selected?.slug === slug ? selected.selection : undefined);
  const frenchMessage = edition ? ['Bonjour, ce circuit m’intéresse.',`Circuit : ${edition.title}`,`Formule : ${edition.packageLabels[context?.selection?.packageId ?? ''] ?? ''}`,`Nombre de voyageurs : ${context?.selection?.travelers ?? ''}`,'Dates approximatives :',edition.guideNote,`Page : https://homegroundchina.com${edition.path}`].join('\n') : null;
  const href = frenchMessage ? homegroundWhatsAppHref(frenchMessage) : tourWhatsAppHref(locale, context);
  if (process.env.NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED === "false") return null;
  return <a className={styles.secondaryLink} href={href} data-contact-tour={context?.slug} data-contact-package={context?.selection?.packageId} data-contact-travelers={context?.selection?.travelers} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("contact_option_clicked", { channel: "whatsapp", page_language: edition?.language ?? locale }, { firstPartyContext: { productSlug: slug, packageId: context?.selection?.packageId, travelers: context?.selection?.travelers, surface: "product" } })}><MessageCircle size={18} aria-hidden="true" />{edition?.label ?? tourContactCopy[locale].alternative}</a>;
}
