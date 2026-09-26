import type { Metadata } from "next";
import { JapaneseTourFooter, JapaneseTourHeader } from "./JapaneseTourChrome";
import { ShanghaiJiangnanImaginePage } from "./ShanghaiJiangnanImaginePage";
import {
  japaneseLegacyZhangjiajieCopy,
  japaneseLegacyZhangjiajieProduct,
} from "../lib/japaneseLegacyZhangjiajieProduct";

const slug = japaneseLegacyZhangjiajieProduct.slug;
const path = `/ja/tours/${slug}/`;

export const japaneseLegacyZhangjiajieMetadata: Metadata = {
  title: japaneseLegacyZhangjiajieCopy.metadataTitle,
  description: japaneseLegacyZhangjiajieCopy.metadataDescription,
  alternates: {
    canonical: path,
    languages: {
      en: `/tours/${slug}/`,
      "zh-Hans": `/zh/tours/${slug}/`,
      ko: `/ko/tours/${slug}/`,
      ja: path,
      "x-default": `/tours/${slug}/`,
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: japaneseLegacyZhangjiajieCopy.title,
    description: japaneseLegacyZhangjiajieCopy.metadataDescription,
    type: "website",
    locale: "ja_JP",
    url: path,
    images: [{
      url: japaneseLegacyZhangjiajieProduct.heroImage.src,
      width: japaneseLegacyZhangjiajieProduct.heroImage.width,
      height: japaneseLegacyZhangjiajieProduct.heroImage.height,
      alt: japaneseLegacyZhangjiajieCopy.heroImage.alt,
    }],
  },
};

export function JapaneseLegacyZhangjiajieTourPage() {
  return (
    <ShanghaiJiangnanImaginePage
      product={japaneseLegacyZhangjiajieProduct}
      locale="ja"
      japaneseCopyOverride={japaneseLegacyZhangjiajieCopy}
      japaneseChrome={{
        header: <JapaneseTourHeader tourSlug={slug} />,
        footer: <JapaneseTourFooter tourSlug={slug} />,
      }}
    />
  );
}
