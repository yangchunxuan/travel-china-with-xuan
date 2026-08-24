import type { HomegroundLocale } from "./homegroundI18n";
import { getPublishedPrivateTourCatalog } from "./publishedPrivateTourCatalog";

export interface HomepagePrivateTourItem {
  readonly id: string;
  readonly kind: "tour";
  readonly title: string;
  readonly description: string;
  readonly days: number;
  readonly nights: number;
  readonly href: string;
  readonly image: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
    readonly objectPosition?: string;
  };
}

/**
 * Backwards-compatible homepage projection of the single published catalog.
 * Comparison fields stay available to the hub without expanding homepage cards.
 */
export function getHomepagePrivateTourItems(
  locale: HomegroundLocale,
): readonly HomepagePrivateTourItem[] {
  return getPublishedPrivateTourCatalog(locale).map((product) =>
    ({
      id: product.id,
      kind: "tour",
      title: product.title,
      description: product.description,
      days: product.days,
      nights: product.nights,
      href: product.href,
      image: product.image,
    }) satisfies HomepagePrivateTourItem,
  );
}
