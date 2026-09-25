import type { Metadata } from "next";
import { HomegroundHomePage } from "../../components/HomegroundHomePage";
import { getHomegroundCopy } from "../../lib/homegroundI18n";
import {
  getHomepageDestinationHubItems,
  getHomepageGuideChapters,
  getHomepageSearchDemos,
} from "../../lib/homepageEditorial";
import { getHomepagePrivateTourItems } from "../../lib/homepagePrivateTourCatalog";
import { getHomepageTeamFaces } from "../../lib/homegroundStudioI18n";

const copy = getHomegroundCopy("en");

export const metadata: Metadata = {
  title: { absolute: copy.metadata.title },
  description: copy.metadata.description,
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ko: "/ko/",
      "zh-Hans": "/zh/",
      "x-default": "/",
    },
  },
  openGraph: {
    siteName: "Homeground China",
    title: copy.metadata.openGraphTitle,
    description: copy.metadata.description,
    type: "website",
    locale: "en",
    url: "/",
    images: [
      {
        url: "https://homegroundchina.com/images/home/beijing-hero-2400.jpg",
        width: 2400,
        height: 1600,
        alt: copy.hero.socialImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.metadata.openGraphTitle,
    description: copy.metadata.description,
    images: ["https://homegroundchina.com/images/home/beijing-hero-2400.jpg"],
  },
};

export default function Home() {
  return (
    <HomegroundHomePage
      destinationHubItems={getHomepageDestinationHubItems("en")}
      guideChapters={getHomepageGuideChapters("en")}
      locale="en"
      privateTourItems={getHomepagePrivateTourItems("en")}
      searchDemos={getHomepageSearchDemos("en")}
      teamFaces={getHomepageTeamFaces("en")}
    />
  );
}
