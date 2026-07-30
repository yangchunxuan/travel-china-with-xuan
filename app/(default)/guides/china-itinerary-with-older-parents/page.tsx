import type { Metadata } from "next";
import { ChinaItineraryWithOlderParentsPage } from "../../../../components/ChinaItineraryWithOlderParentsPage";
import {
  getGuideEntry,
  getGuideLanguagePaths,
} from "../../../../lib/guideRegistry";

const guide = getGuideEntry("china-itinerary-with-older-parents", "en");

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

export default function ChinaItineraryWithOlderParentsRoute() {
  return <ChinaItineraryWithOlderParentsPage locale="en" />;
}
