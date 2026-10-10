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
}
