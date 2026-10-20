import type { StructuredPageBody } from "./content-system/page-body";

/**
 * One Spanish guide. It is written for Spanish readers and leads to the
 * Spanish tour pages; it is not registered in the English, Chinese and Korean
 * guide system.
 */
export interface SpanishGuide {
  /** URL segment under /es/guias/. */
  readonly slug: string;
  /** English guide this page corresponds to, for hreflang. */
  readonly sourceGuideId?: string;
  /** Search title, at most 60 characters. */
  readonly title: string;
  /** Page headline. */
  readonly headline: string;
  /** Search description, at most 160 characters. */
  readonly description: string;
  /** Short name for breadcrumbs, cards and links. */
  readonly navTitle: string;
  readonly heroImage: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
    readonly credit?: {
      readonly text: string;
      readonly sourceLabel: string;
      readonly sourceUrl: string;
      readonly licenseLabel: string;
      readonly licenseUrl: string;
    };
  };
  readonly datePublished: string;
  readonly dateModified: string;
  /** Date the facts were last checked against their sources. */
  readonly sourceReviewedDate: string;
  /** Spanish tours this guide leads to, most relevant first. */
  readonly tourSlugs: readonly string[];
  /** A guide every traveller needs; every Spanish tour page links it. */
  readonly general?: true;
  readonly body: StructuredPageBody;
  /** Products offered in the body once the reader has the answer. */
  readonly offers?: readonly SpanishGuideOffer[];
}

/**
 * A product shown after a body block. The tour's name, photo and published
 * price, and the booking fee, are read from the catalogue when the page is
 * built; the guide only says why the product fits.
 */
export type SpanishGuideOffer =
  | {
      readonly id: string;
      readonly afterBlockId: string;
      readonly kind: "tour";
      /** A tour with a Spanish page. */
      readonly tourSlug: string;
      readonly label: string;
      /** Why this tour fits the guide; the published price follows it. */
      readonly note: string;
      readonly action: string;
    }
  | {
      readonly id: string;
      readonly afterBlockId: string;
      readonly kind: "attraction-reservation";
      readonly title: string;
      readonly body: string;
      /** Offered attractions shown as examples, each opening the form with it ticked. */
      readonly attractionIds: readonly string[];
      /** The attraction the main action ticks; omitted, it opens the service page. */
      readonly preselect?: string;
      readonly action: string;
    };
