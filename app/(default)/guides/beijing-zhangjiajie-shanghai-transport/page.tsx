import type { Metadata } from "next";
import { TransportGuidePage } from "../../../../components/TransportGuidePage";
import {
  getGuideEntry,
  getGuideLanguagePaths,
} from "../../../../lib/guideRegistry";
import { getTransportGuideCopy } from "../../../../lib/beijingZhangjiajieShanghaiTransportI18n";

const guide = getGuideEntry(
  "beijing-zhangjiajie-shanghai-transport",
  "en",
);
const copy = getTransportGuideCopy("en");

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
  alternates: {
    canonical: guide.canonicalPath,
    languages: getGuideLanguagePaths(
      "beijing-zhangjiajie-shanghai-transport",
    ),
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
        height: 692,
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

export default function BeijingZhangjiajieShanghaiTransportPage() {
  return <TransportGuidePage locale="en" />;
}
