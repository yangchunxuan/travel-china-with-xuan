import type { contactCardCopy } from "./contactCardCopy";
import type { InquiryReceiptCopy } from "./inquiryReceipt";
import type { PrivateTourInquiryContext } from "./privateTourInquiryContext";
import type { tourContactCopy } from "./tourContact";
import type { jiangnanContactCopy, TourContactDraft } from "./tourContactDraft";
import type { tourDateCopy } from "./tourDate";

type Words<Copy> = {
  readonly [Key in keyof Copy]: Copy[Key] extends readonly string[] ? readonly string[] : string;
};

export type ContactEditionCardCopy = Words<typeof contactCardCopy.en>;
export type ContactEditionTourCopy = Words<typeof tourContactCopy.en>;
export type ContactEditionQuoteCopy = Words<typeof jiangnanContactCopy.en>;
export type ContactEditionDateCopy = Words<typeof tourDateCopy.en>;

/** The words of the contact card's email form and its phone sheet. */
export interface ContactEditionDeskCopy {
  whatsappAction: string;
  whatsappOpensExternally: string;
  whatsappUnavailable: string;
  messengerAction: string;
  messengerOpensExternally: string;
  emailTitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailAction: string;
  emailSubmitting: string;
  emailUse: string;
  privacyLead: string;
  privacyAction: string;
  emailInvalid: string;
  retryAction: string;
  failed: string;
  uncertain: string;
  emailUnavailable: string;
}

/**
 * A language edition that uses the main contact flow (the quote dialog, the
 * desktop contact card and the phone sheet) with its own words and page
 * paths. The enquiry itself is filed under the component's `locale`, the
 * language of the intake contract; the edition changes only what the visitor
 * reads, which pages count as its tours and guides, and the drafts it writes.
 */
export interface ContactEdition {
  /** The language of the page, for `lang` and for Intl formatting. */
  readonly language: "es";
  readonly intlLocale: string;
  readonly toursPath: string;
  readonly privacyHref: string;
  /** The edition's home page; a link to it with `#planner-contact` opens the card. */
  readonly homePath: string;
  tourPath(slug: string): string;
  tourSlugFromPath(path: string): string | null;
  isGuidePath(path: string): boolean;
  /** The tour's name as the edition's own page shows it. */
  tourName(context: PrivateTourInquiryContext): string;
  selectionLabel(context: PrivateTourInquiryContext): string | null;
  travellersLabel(count: number): string;
  /** The draft a WhatsApp link carries. */
  messageText(context: PrivateTourInquiryContext | null, path?: string, draft?: TourContactDraft): string;
  mailtoHref(context: PrivateTourInquiryContext | null, draft?: TourContactDraft, guide?: { title: string; path: string }): string;
  /** First line of a saved quote's note: tells the planner which page and language it came from. */
  noteMarker(path: string): string;
  noteTooLong(limit: number): string;
  readonly frame: { readonly title: string; readonly close: string };
  readonly card: ContactEditionCardCopy;
  readonly desk: ContactEditionDeskCopy;
  readonly tourContact: ContactEditionTourCopy;
  readonly direct: { readonly intro: string; readonly email: string; readonly formIntro: string; readonly failed: string };
  readonly quote: ContactEditionQuoteCopy;
  readonly fieldErrors: { readonly email: string; readonly date: string; readonly note: string; readonly control: string };
  readonly labels: { readonly stayPreference: string; readonly guide: string; readonly brand: string };
  readonly date: ContactEditionDateCopy;
  readonly receipt: InquiryReceiptCopy;
  /** The phone sheet's measured heights (see ContactCardFrame). */
  readonly sheetSteps: readonly number[];
  readonly sheetHeights: readonly (readonly [number, number])[];
}
