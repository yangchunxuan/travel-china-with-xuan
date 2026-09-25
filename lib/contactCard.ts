import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { homegroundBusiness } from "./homegroundBusiness.ts";

/**
 * The contact card. On a computer, WhatsApp links usually land on a
 * "download the app" page, and mail links open a mail program many people
 * never set up, so on wide screens with a mouse those links open one card
 * instead: scan the chat onto the phone, copy the number, or leave an email.
 * Phones and tablets keep WhatsApp and mail links direct (the apps are right
 * there); their "talk to a planner" links open the same card as a sheet from
 * the bottom of the screen (WhatsApp, Messenger, email) instead of leaving
 * the page or jumping down it. Every link keeps its href, so modifier-clicks,
 * no-JavaScript visits and crawlers see what they did.
 */
export const contactCardDesktopQuery =
  "(min-width: 64rem) and (hover: hover) and (pointer: fine)";
export const contactCardOpenEvent = "homeground:open-contact-card";
export const contactCardReadyAttribute = "data-homeground-contact-card";

export type ContactCardTrigger = "whatsapp" | "email" | "planner";
/** The card on desktop; the sheet on phones and tablets. */
export type ContactCardLayout = "card" | "sheet";

export interface ContactCardRequest {
  trigger: ContactCardTrigger;
  /** The exact wa.me link that was clicked, message included. */
  whatsappHref?: string;
  /** The exact mailto link that was clicked, subject and draft included. */
  mailtoHref?: string;
}

let returnFocusTarget: HTMLElement | null = null;

export function consumeContactCardReturnFocus() {
  const target = returnFocusTarget;
  returnFocusTarget = null;
  return target;
}

export function contactCardIsAvailable() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(contactCardDesktopQuery).matches &&
    Boolean(document.querySelector(`[${contactCardReadyAttribute}="ready"]`))
  );
}

export function openContactCard(
  request: ContactCardRequest,
  returnFocus?: HTMLElement | null,
) {
  if (!contactCardIsAvailable()) return false;
  returnFocusTarget = returnFocus ?? null;
  window.dispatchEvent(
    new CustomEvent<ContactCardRequest>(contactCardOpenEvent, { detail: request }),
  );
  return true;
}

function localePrefix(locale: HomegroundLocale) {
  return locale === "en" ? "" : `/${locale}`;
}

/**
 * What a clicked link should open on desktop, or null to leave the link alone:
 * WhatsApp chats, the studio mailbox, and plain "talk to a planner" links that
 * would otherwise leave the page or jump down it to the homepage contact
 * section. Links that carry a chosen service or package keep their own flow
 * (a tour's quote form, the homepage planner).
 */
export function contactCardRequestForLink(
  anchor: HTMLAnchorElement,
  locale: HomegroundLocale,
): ContactCardRequest | null {
  const href = anchor.href;
  if (/^https:\/\/wa\.me\/[1-9][0-9]{6,14}(?:\?|$)/u.test(href)) {
    return { trigger: "whatsapp", whatsappHref: href };
  }
  if (
    href
      .toLowerCase()
      .startsWith(`mailto:${homegroundBusiness.serviceEmail.toLowerCase()}`)
  ) {
    return { trigger: "email", mailtoHref: href };
  }

  let url: URL;
  try {
    url = new URL(href, window.location.origin);
  } catch {
    return null;
  }
  const prefix = localePrefix(locale);
  if (
    url.origin !== window.location.origin ||
    url.pathname !== `${prefix}/` ||
    url.hash !== "#planner-contact"
  ) {
    return null;
  }
  for (const [key, value] of url.searchParams) {
    if (!key.startsWith("utm_") && !(key === "planner" && value === "destinations")) {
      return null;
    }
  }
  return { trigger: "planner" };
}

/**
 * A phone camera reads a QR code off a screen easily up to roughly version 15
 * (77 × 77 modules at the card's 208px). Long drafts (a chosen package, dates
 * and a note, often in Korean or Chinese, which percent-encode to nine bytes a
 * character) would pass that, so the code then carries the greeting and the
 * page link only; the "use WhatsApp on this computer" link keeps the whole
 * message.
 */
export function whatsappQrCandidates(href: string): string[] {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return [href];
  }
  const text = url.searchParams.get("text");
  if (!text) return [href];
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const pageLink = lines.find((line) =>
    line.startsWith("https://homegroundchina.com/"),
  );
  const base = `${url.origin}${url.pathname}`;
  const withText = (value: string) =>
    `${base}?text=${encodeURIComponent(value)}`;
  const candidates = [href];
  if (pageLink && lines[0] !== pageLink) {
    candidates.push(withText(`${lines[0]}\n${pageLink}`));
  }
  candidates.push(withText(lines[0]));
  return candidates;
}

export function whatsappDisplayNumber(href: string) {
  const digits = href.match(/^https:\/\/wa\.me\/([0-9]+)/u)?.[1] ?? "";
  if (digits.startsWith("86") && digits.length === 13) {
    return `+86 ${digits.slice(2, 5)} ${digits.slice(5, 9)} ${digits.slice(9)}`;
  }
  return digits ? `+${digits}` : "";
}
