import type { Metadata } from "next";
import { buildHomegroundSocialMetadata } from "../../../lib/homegroundSocialMetadata";
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
  ...buildHomegroundSocialMetadata({
    locale: "en",
    title: copy.metadata.title,
    description: copy.metadata.description,
    url: copy.pagePath,
  }),
};

export default function TermsPage() {
  return <HomegroundLegalPage locale="en" pageId="terms" />;
}
