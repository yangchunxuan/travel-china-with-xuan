import type { Metadata } from "next";
import { TantanZhangjiajieStoryPage } from "../../../../components/TantanZhangjiajieStoryPage";
import {
  getGuideEntry,
  getGuideLanguagePaths,
} from "../../../../lib/guideRegistry";
import {
  getTantanZhangjiajieStoryCopy,
  ZHANGJIAJIE_GLASS_BRIDGE_HERO,
} from "../../../../lib/tantanZhangjiajieStoryI18n";

const guide = getGuideEntry("zhangjiajie-glass-bridge-vs-skywalk", "en");
const copy = getTantanZhangjiajieStoryCopy("en");

export const metadata: Metadata = {
  title: copy.title,
  description: copy.dek,
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
    title: copy.title,
    description: copy.dek,
    type: "article",
    locale: guide.openGraphLocale,
    alternateLocale: ["zh_CN", "ko_KR"],
    url: guide.canonicalPath,
    publishedTime: guide.datePublished,
    modifiedTime: guide.dateModified,
    authors: ["Tantan"],
    images: [
      {
        url: ZHANGJIAJIE_GLASS_BRIDGE_HERO.url,
        width: ZHANGJIAJIE_GLASS_BRIDGE_HERO.width,
        height: ZHANGJIAJIE_GLASS_BRIDGE_HERO.height,
        alt: copy.heroAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.title,
    description: copy.dek,
    images: [ZHANGJIAJIE_GLASS_BRIDGE_HERO.url],
  },
};

export default function TantanZhangjiajieStoryRoute() {
  return <TantanZhangjiajieStoryPage locale="en" />;
}
