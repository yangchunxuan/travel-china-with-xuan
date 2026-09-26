import type { HomegroundLocale } from "../lib/homegroundI18n";
import { contactCardFrameCopy, holdPageScroll, type ContactCardLayout } from "../lib/contactCard";
import styles from "./ContactCardFrame.module.css";

// The card's height in pixels, so it takes the frame's place without a jump,
// [without, with] the line naming the tour or guide it was opened on. On
// desktop it is the same at every window size.
const cardHeight = [537, 579];
// The sheet fills the screen's width up to 36rem, and the wider it is, the
// fewer lines its words need: its height steps down at these widths (px) and
// stays the same from 36rem on. Measured at every width from 320 px.
const sheetSteps: Record<HomegroundLocale, number[]> = {
  en: [403, 411, 563],
  zh: [342, 367, 464],
  ko: [356, 438, 550],
};
// Its heights below the first step and from each step on, [without, with] the line.
const sheetHeights: Record<HomegroundLocale, [number, number][]> = {
  en: [[686, 734], [659, 707], [638, 677], [618, 657]],
  zh: [[686, 734], [665, 704], [638, 677], [618, 657]],
  ko: [[686, 734], [659, 707], [638, 677], [618, 657]],
};

function frameHeight(locale: HomegroundLocale, layout: ContactCardLayout, named: boolean) {
  if (layout === "card") return cardHeight[named ? 1 : 0];
  // The page's scrollbar has gone by now (holdPageScroll), so the sheet is
  // as wide as the window, up to 36rem.
  const width = window.innerWidth;
  const step = sheetSteps[locale].filter((at) => width >= at).length;
  return sheetHeights[locale][step][named ? 1 : 0];
}

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
  // From the press on, as under the card: the page's scrollbar goes before
  // the frame first paints, and the card, holding it in turn, opens exactly
  // where the frame is.
  const releaseScroll = holdPageScroll();

  const dialog = document.createElement("dialog");
  dialog.className = sheet ? `${styles.dialog} ${styles.sheet}` : styles.dialog;
  dialog.setAttribute("data-contact-card-dialog", "");
  dialog.setAttribute("data-contact-card-frame", "");
  dialog.setAttribute("data-layout", layout);
  dialog.setAttribute("aria-label", copy.title);
  dialog.setAttribute("aria-busy", "true");
  dialog.style.setProperty("--frame-height", `${frameHeight(locale, layout, named)}px`);

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
  return () => {
    dialog.remove();
    releaseScroll();
  };
}
