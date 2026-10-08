import type { PrivateTourInquirySelection } from "./privateTourInquiryContext";
import { supportsModalDialog } from "./browserCapabilities.ts";

export const japaneseContactOpenEvent = "homeground:open-japanese-contact";

export interface JapaneseContactRequest {
  slug?: string;
  selection?: PrivateTourInquirySelection;
  whatsappHref?: string;
  emailHref?: string;
}

/** A Japanese contact entry opens the same saved-enquiry path as other locales. */
type JapaneseContactWindow = Window & { __homegroundJapaneseContactReady?: boolean };

export function setJapaneseContactReady(ready: boolean) {
  if (typeof window !== "undefined") (window as JapaneseContactWindow).__homegroundJapaneseContactReady = ready;
}

export function japaneseContactReady() {
  return typeof window !== "undefined" && supportsModalDialog() && (window as JapaneseContactWindow).__homegroundJapaneseContactReady === true;
}

export function openJapaneseContact(request: JapaneseContactRequest): boolean {
  if (!japaneseContactReady()) return false;
  if (request.slug && window.location.pathname !== `/ja/tours/${request.slug}/`) return false;
  const event = new CustomEvent(japaneseContactOpenEvent, { detail: request, cancelable: true });
  window.dispatchEvent(event);
  return event.defaultPrevented;
}

export function japaneseDirectWhatsAppEnabled() {
  return process.env.NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED !== "false";
}
