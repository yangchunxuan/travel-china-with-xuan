import type { Metadata } from "next";
import { HomegroundStudioPage } from "../../../components/HomegroundStudioPage";
import {
  getHomegroundStudioCopy,
  getStudioLanguagePaths,
} from "../../../lib/homegroundStudioI18n";

const copy = getHomegroundStudioCopy("en");

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
  alternates: {
    canonical: copy.path,
    languages: getStudioLanguagePaths(),
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
        url: "/images/studio/evan-bookshop.jpg",
        width: 1200,
        height: 1600,
        alt: copy.members[0].image.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.metadata.openGraphTitle,
    description: copy.metadata.description,
    images: ["/images/studio/evan-bookshop.jpg"],
  },
};

export default function StudioPage() {
  return <HomegroundStudioPage locale="en" />;
}
