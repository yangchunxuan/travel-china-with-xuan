import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore TS5097: export checks execute this module via type stripping.
import { getPublishedPrivateTourCatalog } from "./publishedPrivateTourCatalog.ts";
import type { PrivateTourInquirySelection } from "./privateTourInquiryContext";

export interface HomepagePrivateTourItem {
  readonly id: string;
  readonly kind: "tour";
  readonly title: string;
  readonly appeal: string;
  readonly days: number;
  readonly nights: number;
  readonly href: string;
  readonly startingPrice: {
    readonly formatted: string;
    readonly travelers: number;
    readonly serviceLabel: string;
    readonly selection?: PrivateTourInquirySelection;
    readonly validityNote?: string;
  } | null;
  /** Two-traveller per-person price shown beside a larger-group starting price. */
  readonly twoTravellerPrice?: {
    readonly formatted: string;
  };
  readonly image: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
    readonly objectPosition?: string;
  };
}

/**
 * Stable homepage edit: two priority routes plus four complementary choices.
 * The complete published catalog remains available on the tours hub.
 */
export const homepagePrivateTourSlugs = [
  "beijing-xian-chengdu-guilin-shanghai-13-day-private-tour",
  "beijing-highlights-5-day-private-tour",
  "suzhou-tongli-hangzhou-shanghai-12-day-private-tour",
  "chengdu-pandas-sanxingdui-5-day-private-tour",
  "xian-terracotta-warriors-5-day-private-tour",
  "guilin-yangshuo-5-day-private-tour",
] as const;

const quoteOnlyHomepageSlugs = new Set<string>([
  "beijing-xian-chengdu-guilin-shanghai-13-day-private-tour",
  "suzhou-tongli-hangzhou-shanghai-12-day-private-tour",
]);

/**
 * Backwards-compatible homepage projection of the single published catalog.
 * Comparison fields stay available to the hub without expanding homepage cards.
 */
export function getHomepagePrivateTourItems(
  locale: HomegroundLocale,
): readonly HomepagePrivateTourItem[] {
  const publishedProducts = getPublishedPrivateTourCatalog(locale);
  const publishedProductsBySlug = new Map(
    publishedProducts.map((product) => [product.slug, product] as const),
  );

  const selectedProducts = homepagePrivateTourSlugs.map((slug) => {
    const product = publishedProductsBySlug.get(slug);
    if (!product) {
      throw new Error(`Missing homepage private tour: ${slug}`);
    }
    if (quoteOnlyHomepageSlugs.has(slug)) {
      if (product.startingPrice || product.twoTravellerPrice) {
        throw new Error(`Homepage quote-only tour must not publish a price: ${slug}`);
      }
    } else if (!product.startingPrice) {
      throw new Error(`Homepage tour requires a published price: ${slug}`);
    }
    return product;
  });

  return Object.freeze(
    selectedProducts.map(
      (product) =>
        ({
          id: product.id,
          kind: "tour",
          title: product.title,
          appeal: product.comparison.appeal,
          days: product.days,
          nights: product.nights,
          href: product.startingPriceHref,
          startingPrice: product.startingPrice ? {
            formatted: product.startingPrice.formatted,
            travelers: product.startingPrice.travelers,
            serviceLabel: product.startingPrice.serviceLabel,
            selection: product.startingPrice.selection,
            validityNote: product.startingPrice.validityNote,
          } : null,
          ...(product.twoTravellerPrice
            ? { twoTravellerPrice: { formatted: product.twoTravellerPrice.formatted } }
            : {}),
          image: product.image,
        }) satisfies HomepagePrivateTourItem,
    ),
  );
}
