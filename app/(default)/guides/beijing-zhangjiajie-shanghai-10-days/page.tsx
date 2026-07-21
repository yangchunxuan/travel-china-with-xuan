import type { Metadata } from "next";
import { TenDayChinaRouteGuidePage } from "../../../../components/TenDayChinaRouteGuidePage";
import {
  getGuideEntry,
  getGuideLanguagePaths,
} from "../../../../lib/guideRegistry";

const guide = getGuideEntry(
  "beijing-zhangjiajie-shanghai-10-days",
  "en",
);

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
    alternateLocale: ["zh_CN", "ko_KR"],
    url: guide.canonicalPath,
    publishedTime: guide.datePublished,
    modifiedTime: guide.dateModified,
    images: [
      {
        url: guide.heroImageUrl,
        width: 1800,
        height: 1200,
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

export default function BeijingZhangjiajieShanghaiTenDayPage() {
  return <TenDayChinaRouteGuidePage locale="en" />;
}
