/** Arabic editorial content; source catalogue remains authoritative for prices and assets. */
export interface ArabicTourCopy {
  readonly title: string;
  readonly metadataTitle: string;
  readonly metadataDescription: string;
  readonly eyebrow: string;
  readonly lede: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly itinerary: readonly { title: string; description: string }[];
  readonly hotelNote: string;
  readonly serviceNote: string;
  readonly bookingNote: string;
  readonly exclusions: readonly string[];
  readonly faq?: readonly { question: string; answer: string }[];
  readonly facts?: readonly { label: string; value: string }[];
  readonly heroImage: { alt: string; caption: string };
  readonly gallery: readonly { alt: string; caption: string }[];
  readonly routeMedia: readonly { day: number; variants: readonly { label: string; alt: string; caption: string }[] }[];
  readonly packages: readonly { id: string; label: string; summary: string }[];
}
