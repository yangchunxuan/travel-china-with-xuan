import type { Metadata } from "next";
import { HomegroundLegalPage } from "../../../components/HomegroundLegalPage";
import {
  getHomegroundLegalCopy,
  getHomegroundLegalLanguagePaths,
} from "../../../lib/homegroundLegalI18n";

const copy = getHomegroundLegalCopy("business-information", "en");

export const metadata: Metadata = {
  title: { absolute: copy.metadata.title },
  description: copy.metadata.description,
  alternates: {
    canonical: copy.pagePath,
    languages: getHomegroundLegalLanguagePaths("business-information"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: copy.metadata.title,
    description: copy.metadata.description,
    type: "website",
    locale: "en_US",
    url: copy.pagePath,
  },
};

export default function BusinessInformationPage() {
  return (
    <HomegroundLegalPage
      locale="en"
      pageId="business-information"
    />
  );
}
