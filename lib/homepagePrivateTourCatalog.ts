import zhangjiajieProduct from "../content/product-previews/zhangjiajie-4-day-private-tour/product.json" with { type: "json" };
import type { HomegroundLocale } from "./homegroundI18n";
import {
  localizePrivateTourProduct,
  privateTourProducts,
  type LocalizedPrivateTourImage,
} from "./privateTourProducts";
import { getZhangjiajiePrivateTourHomeCard } from "./zhangjiajiePrivateTourHomeCard";

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

const zhangjiajieContentLocale = {
  en: "en",
  zh: "zh-CN",
  ko: "ko",
} as const satisfies Record<HomegroundLocale, keyof typeof zhangjiajieProduct.title>;

function chooseDistinctHomepageImage(
  product: ReturnType<typeof localizePrivateTourProduct>,
  usedImagePaths: Set<string>,
): LocalizedPrivateTourImage {
  if (!usedImagePaths.has(product.heroImage.src)) {
    return product.heroImage;
  }

  return (
    product.gallery.find(
      (image) =>
        image.src !== product.heroImage.src &&
        !usedImagePaths.has(image.src),
    ) ?? product.heroImage
  );
}

/**
 * A server-side, lightweight homepage view of the published tour catalog.
 * Full itineraries, package rows and pricing remain on the product pages.
 */
export function getHomepagePrivateTourItems(
  locale: HomegroundLocale,
): readonly HomepagePrivateTourItem[] {
  const usedImagePaths = new Set<string>();
  const catalogItems = privateTourProducts.map((product) => {
    const localized = localizePrivateTourProduct(product, locale);
    const image = chooseDistinctHomepageImage(localized, usedImagePaths);
    usedImagePaths.add(image.src);

    return {
      id: localized.slug,
      kind: "tour",
      title: localized.title,
      description: localized.lede,
      days: localized.days,
      nights: localized.nights,
      href: localized.path,
      image: {
        src: image.src,
        alt: image.alt,
        width: image.width,
        height: image.height,
        objectPosition: image.objectPosition,
      },
    } satisfies HomepagePrivateTourItem;
  });

  const zhangjiajieCard = getZhangjiajiePrivateTourHomeCard(locale);
  const contentLocale = zhangjiajieContentLocale[locale];

  return [
    ...catalogItems,
    {
      id: zhangjiajieCard.id,
      kind: "tour",
      title: zhangjiajieProduct.title[contentLocale],
      description: zhangjiajieProduct.short_description[contentLocale],
      days: zhangjiajieProduct.duration.days,
      nights: zhangjiajieProduct.duration.nights,
      href: zhangjiajieCard.canonicalPath,
      image: {
        src: zhangjiajieCard.cardImagePath,
        alt: zhangjiajieCard.cardImageAlt,
        width: zhangjiajieCard.cardImageWidth,
        height: zhangjiajieCard.cardImageHeight,
      },
    },
  ];
}
