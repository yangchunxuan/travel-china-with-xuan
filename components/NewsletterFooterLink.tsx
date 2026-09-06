"use client";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { getNewsletterConfig } from "../lib/newsletter";
import { newsletterCopy } from "../lib/newsletterI18n";
import { openNewsletter } from "../lib/newsletterPrompt";

export function NewsletterFooterLink({ locale, className }: { locale: HomegroundLocale; className?: string }) {
  if (!getNewsletterConfig()) return null;
  return <button type="button" className={className} onClick={openNewsletter}>{newsletterCopy[locale].footer}</button>;
}
