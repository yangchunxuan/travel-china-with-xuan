"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  consumeContactCardReturnFocus,
  contactCardDesktopQuery,
  contactCardOpenEvent,
  contactCardReadyAttribute,
  contactCardRequestForLink,
  type ContactCardRequest,
} from "../lib/contactCard";

const loadDialog = () => import("./ContactCardDialog");
const ContactCardDialog = lazy(() =>
  loadDialog().then((module) => ({ default: module.ContactCardDialog })),
);

/**
 * Site-wide, desktop-only: answers WhatsApp, studio email and plain "talk to
 * a planner" links with the contact card (see lib/contactCard.ts). The card's
 * code loads in the background once a desktop page is idle, and the card stays
 * mounted after the first open so a half-typed email survives closing it.
 */
export function ContactCardHost({ locale }: { locale: HomegroundLocale }) {
  const [ready, setReady] = useState(false);
  const [request, setRequest] = useState<ContactCardRequest | null>(null);
  const [open, setOpen] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const desktop = window.matchMedia(contactCardDesktopQuery);
    const sync = () => setReady(desktop.matches);
    sync();
    desktop.addEventListener("change", sync);

    const canIdle = typeof window.requestIdleCallback === "function";
    let idle = 0;
    if (desktop.matches) {
      const preload = () => { void loadDialog(); };
      idle = canIdle
        ? window.requestIdleCallback(preload, { timeout: 4000 })
        : window.setTimeout(preload, 2500);
    }

    const show = (next: ContactCardRequest, returnFocus: HTMLElement | null) => {
      returnFocusRef.current = returnFocus;
      setRequest(next);
      setOpen(true);
    };
    const onClick = (event: MouseEvent) => {
      if (!desktop.matches || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement) || anchor.closest("[data-contact-card-dialog], [data-contact-card-direct]")) return;
      const next = contactCardRequestForLink(anchor, locale);
      if (!next) return;
      // The link's own click handlers (analytics) still run; only the navigation is replaced.
      event.preventDefault();
      show(next, anchor);
    };
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<ContactCardRequest>).detail;
      if (detail) show(detail, consumeContactCardReturnFocus());
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener(contactCardOpenEvent, onOpen);
    return () => {
      desktop.removeEventListener("change", sync);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(contactCardOpenEvent, onOpen);
      if (canIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, [locale]);

  function close() {
    setOpen(false);
    window.requestAnimationFrame(() => {
      const previous = returnFocusRef.current;
      const visible = previous?.isConnected && previous.getClientRects().length > 0;
      const target = visible ? previous : document.querySelector<HTMLElement>("header a[href]");
      target?.focus({ preventScroll: true });
    });
  }

  return (
    <div {...{ [contactCardReadyAttribute]: ready ? "ready" : undefined }}>
      {request ? (
        <Suspense fallback={null}>
          <ContactCardDialog locale={locale} request={request} open={open} onClose={close} />
        </Suspense>
      ) : null}
    </div>
  );
}
