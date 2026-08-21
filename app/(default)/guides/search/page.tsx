import type { Metadata } from "next";
import { GuideSearchResultsPage } from "../../../../components/GuideSearchResultsPage";
import {
  getGuideSearchCopy,
  getGuideSearchLanguagePaths,
} from "../../../../lib/guideSearchI18n";

const copy = getGuideSearchCopy("en");

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: copy.page.metadataTitle,
  description: copy.page.metadataDescription,
  referrer: "origin",
  alternates: {
    canonical: copy.path,
    languages: getGuideSearchLanguagePaths(),
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: copy.page.metadataTitle,
    description: copy.page.metadataDescription,
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN", "ko_KR"],
    url: copy.path,
  },
  twitter: {
    card: "summary",
    title: copy.page.metadataTitle,
    description: copy.page.metadataDescription,
  },
};

export default function GuideSearchPage() {
  return <GuideSearchResultsPage locale="en" />;
}
