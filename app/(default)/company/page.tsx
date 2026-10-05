import type { Metadata } from "next";
import { HomegroundCompanyPage } from "../../../components/HomegroundCompanyPage";
import {
  getCompanyLanguagePaths,
  getHomegroundCompanyCopy,
} from "../../../lib/homegroundCompanyI18n";

const copy = getHomegroundCompanyCopy("en");

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
  alternates: {
    canonical: copy.path,
    languages: getCompanyLanguagePaths(),
  },
  // Draft copy: kept out of search until the owner approves the text.
  robots: { index: false, follow: true },
  openGraph: {
    title: copy.metadata.openGraphTitle,
    description: copy.metadata.description,
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN", "ko_KR"],
    url: copy.path,
  },
  twitter: {
    card: "summary",
    title: copy.metadata.openGraphTitle,
    description: copy.metadata.description,
  },
};

export default function CompanyPage() {
  return <HomegroundCompanyPage locale="en" />;
}
