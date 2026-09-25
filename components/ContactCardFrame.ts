import type { HomegroundLocale } from "../lib/homegroundI18n";
import { contactCardFrameCopy, type ContactCardLayout } from "../lib/contactCard";
import styles from "./ContactCardFrame.module.css";

// The card's usual height in pixels, and with the line naming the tour or
// guide it was opened on (the same at every desktop window size; the sheet's
// measured on 360–390 px phones), so the card takes the frame's place
// without a jump.
const usualHeight: Record<ContactCardLayout, Record<HomegroundLocale, [number, number]>> = {
  card: { en: [537, 579], zh: [537, 579], ko: [537, 579] },
  sheet: { en: [686, 734], zh: [638, 677], ko: [659, 707] },
};

// The card's close icon (lucide X at 18 px, stroke 1.8).
const closeIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';

/**
 * The contact card's frame: the card (or, on phones, the sheet) with its
 * close button and an empty title area, opened in the press itself while the
 * card's code is still on its way. It is built straight in the DOM rather
 * than rendered by React, because React can hold its next commit back (until
 * stylesheets of routes Next.js has just prefetched have loaded, for
 * instance), and the frame is what answers the press meanwhile. The card then
 * opens in its place and carries on its entrance from where the frame got to.
 * Returns a function that removes the frame.
 */
export function openContactCardFrame(locale: HomegroundLocale, layout: ContactCardLayout, onClose: () => void) {
  const copy = contactCardFrameCopy[locale];
  const sheet = layout === "sheet";
  const named = /\/(tours|guides)\/[a-z0-9-]+\/$/u.test(window.location.pathname);

  const dialog = document.createElement("dialog");
  dialog.className = sheet ? `${styles.dialog} ${styles.sheet}` : styles.dialog;
  dialog.setAttribute("data-contact-card-dialog", "");
  dialog.setAttribute("data-contact-card-frame", "");
  dialog.setAttribute("data-layout", layout);
  dialog.setAttribute("aria-label", copy.title);
  dialog.setAttribute("aria-busy", "true");
  dialog.style.setProperty("--frame-height", `${usualHeight[layout][locale][named ? 1 : 0]}px`);

  const card = dialog.appendChild(document.createElement("div"));
  card.className = styles.card;
  if (sheet) {
    const grabber = card.appendChild(document.createElement("span"));
    grabber.className = styles.grabber;
    grabber.setAttribute("aria-hidden", "true");
  }
  const head = card.appendChild(document.createElement("header"));
  head.className = styles.head;
  head.appendChild(document.createElement("span")).setAttribute("aria-hidden", "true");
  const close = head.appendChild(document.createElement("button"));
  close.type = "button";
  close.className = styles.close;
  close.setAttribute("aria-label", copy.close);
  close.innerHTML = closeIcon;

  close.addEventListener("click", onClose);
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    onClose();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) onClose();
  });
  document.body.append(dialog);
  dialog.showModal();
  // Removed rather than closed: closing a modal dialog would hand focus back
  // to the link while the card, opening in its place, is taking it.
  return () => dialog.remove();
}
