import type { Metadata } from "next";
import { ZhangjiajieGuidePage } from "../../../../components/ZhangjiajieGuidePage";
import {
  getGuideEntry,
  getGuideLanguagePaths,
} from "../../../../lib/guideRegistry";
import { getZhangjiajieGuideCopy } from "../../../../lib/zhangjiajieGuideI18n";

const guide = getGuideEntry("zhangjiajie-itinerary", "en");
const copy = getZhangjiajieGuideCopy("en");

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
  alternates: {
    canonical: guide.canonicalPath,
    languages: getGuideLanguagePaths("zhangjiajie-itinerary"),
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
    title: copy.metadata.title,
    description: copy.metadata.description,
    type: "article",
    locale: guide.openGraphLocale,
    alternateLocale: ["zh_CN", "ko_KR"],
    url: guide.canonicalPath,
    publishedTime: guide.datePublished,
    modifiedTime: guide.dateModified,
    images: [
      {
        url: guide.heroImageUrl,
        width: 1600,
        height: 954,
        alt: guide.heroAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.metadata.title,
    description: copy.metadata.description,
    images: [guide.heroImageUrl],
  },
};

export default function ZhangjiajieItineraryPage() {
  return <ZhangjiajieGuidePage locale="en" />;
}
