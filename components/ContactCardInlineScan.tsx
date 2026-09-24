"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { contactCardDesktopQuery } from "../lib/contactCard";

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
 * contact panel). Its code loads only when rendered, which callers do on
 * desktop; phones keep the one-tap WhatsApp button.
 */
export function ContactCardInlineScan({
  locale,
  href,
  headingId,
}: {
  locale: HomegroundLocale;
  href: string;
  headingId: string;
}) {
  return (
    <Suspense fallback={null}>
      <ContactCardScan locale={locale} href={href} headingId={headingId} inline />
    </Suspense>
  );
}
