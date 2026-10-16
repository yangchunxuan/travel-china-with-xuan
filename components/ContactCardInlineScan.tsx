"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { contactCardDesktopQuery } from "../lib/contactCard";
import type { ContactCardScanCopy } from "./ContactCardScan";

const ContactCardScan = lazy(() =>
  import("./ContactCardScan").then((module) => ({ default: module.ContactCardScan })),
);

/** True on the wide, mouse-driven screens the contact card serves. */
export function useContactCardDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(contactCardDesktopQuery);
    const sync = () => setDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return desktop;
}

/**
 * The contact card's scan-to-chat block, embedded in a page (the homepage
 * contact board). Its code loads only when rendered, which callers do on
 * desktop; phones keep the one-tap WhatsApp button.
 */
export function ContactCardInlineScan({
  locale,
  href,
  headingId,
  app = "whatsapp",
  localizedCopy,
}: {
  locale: HomegroundLocale;
  href: string;
  headingId: string;
  app?: "whatsapp" | "messenger";
  localizedCopy?: ContactCardScanCopy;
}) {
  return (
    <Suspense fallback={null}>
      <ContactCardScan locale={locale} localizedCopy={localizedCopy} href={href} headingId={headingId} app={app} inline />
    </Suspense>
  );
}
