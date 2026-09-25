"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  consumeContactCardReturnFocus,
  contactCardDesktopQuery,
  contactCardOpenEvent,
  contactCardReadyAttribute,
  contactCardRequestForLink,
  type ContactCardLayout,
  type ContactCardRequest,
} from "../lib/contactCard";
import type { ContactCardDialog as ContactCardDialogComponent } from "./ContactCardDialog";
import { openContactCardFrame } from "./ContactCardFrame";

type DialogComponent = typeof ContactCardDialogComponent;

let loadedDialog: DialogComponent | null = null;
let loadingDialog: Promise<DialogComponent> | null = null;

/** Fetches the card's code once; callers share the request, and a failed one can be tried again. */
function loadDialog() {
  loadingDialog ??= import("./ContactCardDialog").then(
    (module) => (loadedDialog = module.ContactCardDialog),
    (error: unknown) => {
      loadingDialog = null;
      throw error;
    },
  );
  return loadingDialog;
}

function preloadDialog() {
  if (!loadedDialog && !loadingDialog) loadDialog().catch(() => {});
}

/**
 * Site-wide: on desktop answers WhatsApp, studio email and plain "talk to a
 * planner" links with the contact card; on phones and tablets answers only
 * the planner links, with the same card as a sheet (see lib/contactCard.ts).
 * The card's code loads in the background once a page is idle, or as soon as
 * a pointer, finger or keyboard focus reaches something the card answers, so
 * it is usually there by the click. If it is not, the card's frame opens at
 * once (ContactCardFrame.ts) and the card takes its place when the code
 * arrives. The card is rendered directly rather than through React.lazy and
 * Suspense: React holds a suspended boundary's content back until 300 ms
 * after its fallback appeared, which was the blank first open. The card stays
 * mounted after the first open so a half-typed email survives closing it.
 */
export function ContactCardHost({ locale }: { locale: HomegroundLocale }) {
  const [ready, setReady] = useState(false);
  const [request, setRequest] = useState<ContactCardRequest | null>(null);
  const [layout, setLayout] = useState<ContactCardLayout>("card");
  const [open, setOpen] = useState(false);
  // Whether the card is mounted (from its first open on).
  const [cardMounted, setCardMounted] = useState(false);
  // When the frame appeared for this open, so the card carries on its entrance.
  const [frameShownAt, setFrameShownAt] = useState<number | null>(null);
  const removeFrameRef = useRef<(() => void) | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const removeFrame = useCallback(() => {
    removeFrameRef.current?.();
    removeFrameRef.current = null;
  }, []);

  const close = useCallback(() => {
    removeFrame();
    setOpen(false);
    window.requestAnimationFrame(() => {
      const previous = returnFocusRef.current;
      const visible = previous?.isConnected && previous.getClientRects().length > 0;
      const target = visible ? previous : document.querySelector<HTMLElement>("header a[href]");
      target?.focus({ preventScroll: true });
    });
  }, [removeFrame]);

  // The card has opened in the frame's place (its own layout effect runs
  // first): the frame goes before the browser paints.
  useLayoutEffect(() => {
    if (cardMounted && open) removeFrame();
  }, [cardMounted, open, removeFrame]);

  useEffect(() => {
    const desktop = window.matchMedia(contactCardDesktopQuery);
    const sync = () => setReady(desktop.matches);
    sync();
    desktop.addEventListener("change", sync);

    // Small (about 6 KB compressed), so every screen fetches it once idle
    // and the card or the sheet opens at once.
    const canIdle = typeof window.requestIdleCallback === "function";
    const idle = canIdle
      ? window.requestIdleCallback(preloadDialog, { timeout: 4000 })
      : window.setTimeout(preloadDialog, 2500);

    // Sooner for a visitor already on the way: a pointer over, a finger on or
    // keyboard focus at a link the card answers (or a control marked for it).
    const onApproach = (event: Event) => {
      if (loadedDialog || loadingDialog) return;
      const target = event.target instanceof Element ? event.target.closest("a[href], [data-contact-card-trigger]") : null;
      if (!target || target.closest("[data-contact-card-dialog], [data-contact-card-direct]")) return;
      if (target instanceof HTMLAnchorElement) {
        const next = contactCardRequestForLink(target, locale);
        if (!next || (!desktop.matches && next.trigger !== "planner")) return;
      } else if (!desktop.matches) {
        return;
      }
      preloadDialog();
    };
    const approaches = ["pointerover", "pointerdown", "touchstart", "focusin"];

    const mountCard = () => setCardMounted(true);
    const show = (next: ContactCardRequest, returnFocus: HTMLElement | null, nextLayout: ContactCardLayout) => {
      returnFocusRef.current = returnFocus;
      setRequest(next);
      setLayout(nextLayout);
      setOpen(true);
      if (loadedDialog) {
        mountCard();
        setFrameShownAt(null);
        return;
      }
      // The code is still on its way: the frame answers the press in the
      // next frame, and the card takes its place when the code arrives.
      removeFrame();
      removeFrameRef.current = openContactCardFrame(locale, nextLayout, close);
      setFrameShownAt(performance.now());
      loadDialog().then(
        mountCard,
        () => {
          // The code did not arrive (offline, or a newer release replaced it):
          // close the frame and, if it is still open, let the link do what it
          // does without the card.
          const waiting = removeFrameRef.current !== null;
          removeFrame();
          setOpen(false);
          if (!waiting || !(returnFocus instanceof HTMLAnchorElement)) return;
          if (returnFocus.target === "_blank") window.open(returnFocus.href, "_blank", "noopener,noreferrer");
          else window.location.assign(returnFocus.href);
        },
      );
    };
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement) || anchor.closest("[data-contact-card-dialog], [data-contact-card-direct]")) return;
      const next = contactCardRequestForLink(anchor, locale);
      if (!next) return;
      // Phones and tablets open WhatsApp and mail links in their own apps.
      const onDesktop = desktop.matches;
      if (!onDesktop && next.trigger !== "planner") return;
      // The link's own click handlers (analytics) still run; only the navigation is replaced.
      event.preventDefault();
      show(next, anchor, onDesktop ? "card" : "sheet");
    };
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<ContactCardRequest>).detail;
      if (detail) show(detail, consumeContactCardReturnFocus(), "card");
    };

    for (const type of approaches) document.addEventListener(type, onApproach, { capture: true, passive: true });
    document.addEventListener("click", onClick, true);
    window.addEventListener(contactCardOpenEvent, onOpen);
    return () => {
      desktop.removeEventListener("change", sync);
      for (const type of approaches) document.removeEventListener(type, onApproach, { capture: true });
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(contactCardOpenEvent, onOpen);
      if (canIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      removeFrame();
    };
  }, [locale, close, removeFrame]);

  const ContactCardDialog = cardMounted ? loadedDialog : null;

  return (
    <div {...{ [contactCardReadyAttribute]: ready ? "ready" : undefined }}>
      {request && ContactCardDialog ? (
        <ContactCardDialog locale={locale} request={request} layout={layout} open={open} onClose={close} frameShownAt={frameShownAt} />
      ) : null}
    </div>
  );
}
