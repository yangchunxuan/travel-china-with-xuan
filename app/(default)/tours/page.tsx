import type { Metadata } from "next";
import { PrivateToursHubPage } from "../../../components/PrivateToursHubPage";
import {
  getPrivateTourHubCopy,
  getPrivateTourHubLanguagePaths,
} from "../../../lib/privateTourHubI18n";
import { getPublishedPrivateTourCatalog } from "../../../lib/publishedPrivateTourCatalog";

const publishedTours = getPublishedPrivateTourCatalog("en");
const copy = getPrivateTourHubCopy("en", publishedTours.length);
const socialTour = publishedTours[0];

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
  alternates: {
    canonical: copy.path,
    languages: getPrivateTourHubLanguagePaths(),
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
        url: socialTour.image.src,
        width: socialTour.image.width,
        height: socialTour.image.height,
        alt: socialTour.image.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.metadata.openGraphTitle,
    description: copy.metadata.description,
    images: [socialTour.image.src],
  },
};

export default function PrivateToursPage() {
  return <PrivateToursHubPage locale="en" />;
}
