import type { Metadata } from "next";
import { ZhangjiajieFromMalaysiaPage } from "../../../../components/ZhangjiajieFromMalaysiaPage";
import {
  getGuideEntry,
  getGuideLanguagePaths,
} from "../../../../lib/guideRegistry";
import { malaysiaZhangjiajieGuideId } from "../../../../lib/zhangjiajieFromMalaysiaGuide";

const guide = getGuideEntry(malaysiaZhangjiajieGuideId, "en");

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: {
    canonical: guide.canonicalPath,
    languages: getGuideLanguagePaths(guide.id),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: guide.title,
    description: guide.description,
    type: "article",
    locale: guide.openGraphLocale,
    alternateLocale: ["zh_MY", "ko_KR"],
    url: guide.canonicalPath,
    publishedTime: guide.datePublished,
    modifiedTime: guide.dateModified,
    images: [
      {
        url: guide.heroImageUrl,
        width: guide.imageWidth,
        height: guide.imageHeight,
        alt: guide.heroAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: guide.title,
    description: guide.description,
    images: [guide.heroImageUrl],
  },
};

export default function ZhangjiajieFromMalaysiaRoute() {
  return <ZhangjiajieFromMalaysiaPage locale="en" />;
}
