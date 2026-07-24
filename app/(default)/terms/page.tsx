import type { Metadata } from "next";
import { HomegroundLegalPage } from "../../../components/HomegroundLegalPage";
import {
  getHomegroundLegalCopy,
  getHomegroundLegalLanguagePaths,
} from "../../../lib/homegroundLegalI18n";

const copy = getHomegroundLegalCopy("terms", "en");

export const metadata: Metadata = {
  title: { absolute: copy.metadata.title },
  description: copy.metadata.description,
  alternates: {
    canonical: copy.pagePath,
    languages: getHomegroundLegalLanguagePaths("terms"),
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

export default function TermsPage() {
  return <HomegroundLegalPage locale="en" pageId="terms" />;
}
