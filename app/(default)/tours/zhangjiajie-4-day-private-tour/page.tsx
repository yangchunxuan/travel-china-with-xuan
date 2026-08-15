import type { Metadata } from "next";
import { ZhangjiajiePrivateTourPreviewPage } from "../../../../components/ZhangjiajiePrivateTourPreviewPage";
import {
  productPreviewCopy,
  zhangjiajiePrivateTourPaths,
} from "../../../../lib/zhangjiajiePrivateTourPreview";

const copy = productPreviewCopy.en;
const socialImage =
  "/product-previews/zhangjiajie-4-day-private-tour/hero/forest-pillars-og-1200.jpg";

export const metadata: Metadata = {
  title: copy.metadataTitle,
  description: copy.metadataDescription,
  alternates: {
    canonical: zhangjiajiePrivateTourPaths.en,
    languages: {
      en: zhangjiajiePrivateTourPaths.en,
      "zh-Hans": zhangjiajiePrivateTourPaths.zh,
      "x-default": zhangjiajiePrivateTourPaths.en,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: copy.heroTitle,
    description: copy.metadataDescription,
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
    url: zhangjiajiePrivateTourPaths.en,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Sunlit sandstone pillars in Zhangjiajie National Forest Park.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    images: [socialImage],
  },
};

export default function ZhangjiajiePrivateTourRoute() {
  return <ZhangjiajiePrivateTourPreviewPage locale="en" published />;
}
