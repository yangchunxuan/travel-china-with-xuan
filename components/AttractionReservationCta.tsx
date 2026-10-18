"use client";

import type { MouseEvent, ReactNode, SyntheticEvent } from "react";
import { contactCardIsAvailable } from "../lib/contactCard";
import { homegroundWhatsAppNumber } from "../lib/tourContact";
import { appendVisitRefToContactHref, currentVisitRefLine } from "../lib/visitRef";

/** All sales links use the existing send control and its current draft/events. */
export function AttractionReservationCta({ href, formId, className, children }: {
  href: string;
  formId: string;
  className: string;
  children: ReactNode;
}) {
  function syncHref(event: SyntheticEvent<HTMLAnchorElement>) {
    const send = document.getElementById(formId)?.querySelector<HTMLAnchorElement>('a[data-reservation-channel="whatsapp"]');
    if (send) {
      // Click capture may already have added attribution. Keep the live draft
      // and apply the same current-consent rule before native modifier opens.
      event.currentTarget.href = appendVisitRefToContactHref(send.href, currentVisitRefLine(), {
        whatsappNumber: homegroundWhatsAppNumber(), email: "",
      });
    }
    return send;
  }
  function openRequest(event: MouseEvent<HTMLAnchorElement>) {
    const send = syncHref(event);
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!send) return;
    // Do not replace a visitor's chosen attractions, dates or group with the
    // initial empty draft. The existing control also retains its contact card
    // behaviour, analytics and per-edition WhatsApp handling.
    const trigger = event.currentTarget;
    if (contactCardIsAvailable()) {
      // The host returns focus to the delegated send control when it closes.
      // Relay that one return to the sales link the visitor actually used.
      send.addEventListener("focus", () => {
        if (trigger.isConnected) trigger.focus({ preventScroll: true });
      }, { once: true });
    }
    event.preventDefault();
    send.click();
  }
  return <a className={className} data-contact-card-direct="" data-reservation-cta="" href={href} onClick={openRequest} onContextMenu={syncHref} onFocus={syncHref} onPointerDown={syncHref} rel="noopener noreferrer" target="_blank">{children}</a>;
}
