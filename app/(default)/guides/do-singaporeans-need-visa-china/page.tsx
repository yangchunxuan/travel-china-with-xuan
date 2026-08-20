import type { Metadata } from "next";
import { SingaporeChinaVisaPage } from "../../../../components/SingaporeChinaVisaPage";
import {
  getGuideEntry,
  getGuideLanguagePaths,
} from "../../../../lib/guideRegistry";
import { getSingaporeChinaVisaCopy } from "../../../../lib/singaporeChinaVisaI18n";

const guide = getGuideEntry("do-singaporeans-need-visa-china", "en");
const copy = getSingaporeChinaVisaCopy("en");

export const metadata: Metadata = {
  title: copy.title,
  description: copy.metadataDescription,
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
    description: copy.metadataDescription,
    type: "article",
    locale: guide.openGraphLocale,
    alternateLocale: ["zh_CN", "ko_KR"],
    url: guide.canonicalPath,
    publishedTime: guide.datePublished,
    modifiedTime: copy.sourceReviewedAt,
    images: [
      {
        url: guide.heroImageUrl,
        width: 1200,
        height: 630,
        alt: guide.heroAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.title,
    description: copy.metadataDescription,
    images: [guide.heroImageUrl],
  },
};

export default function SingaporeChinaVisaRoute() {
  return <SingaporeChinaVisaPage locale="en" />;
}
