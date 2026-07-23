import type { Metadata } from "next";
import { GuidesHubPage } from "../../../components/GuidesHubPage";
import { getGuideEntry } from "../../../lib/guideRegistry";
import {
  getGuidesHubCopy,
  getGuidesHubLanguagePaths,
} from "./guidesHubI18n";

const copy = getGuidesHubCopy("en");
const socialImage = getGuideEntry("is-your-china-itinerary-too-rushed", "en");

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
  alternates: {
    canonical: copy.path,
    languages: getGuidesHubLanguagePaths(),
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
    title: copy.metadata.openGraphTitle,
    description: copy.metadata.description,
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN", "ko_KR"],
    url: copy.path,
    images: [
      {
        url: socialImage.heroImageUrl,
        width: socialImage.imageWidth,
        height: socialImage.imageHeight,
        alt: socialImage.heroAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.metadata.openGraphTitle,
    description: copy.metadata.description,
    images: [socialImage.heroImageUrl],
  },
};

export default function GuidesPage() {
  return <GuidesHubPage locale="en" />;
}
