import type { Metadata } from "next";
import { ChinaItineraryReviewPage } from "../../../components/ChinaItineraryReviewPage";
import {
  getChinaItineraryReviewCopy,
  getChinaItineraryReviewLanguagePaths,
} from "../../../lib/chinaItineraryReviewI18n";

const copy = getChinaItineraryReviewCopy("en");
const socialImage =
  "/images/guides/china-itinerary-reality/transfer-platform-soft-focus-1200.webp";

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
  alternates: {
    canonical: copy.path,
    languages: getChinaItineraryReviewLanguagePaths(),
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
    description: copy.metadata.openGraphDescription,
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN", "ko_KR"],
    url: copy.path,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.metadata.title,
    description: copy.metadata.description,
    images: [socialImage],
  },
};

export default function ChinaItineraryReviewRoute() {
  return <ChinaItineraryReviewPage locale="en" />;
}
