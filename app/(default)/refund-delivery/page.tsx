import type { Metadata } from "next";
import { buildHomegroundSocialMetadata } from "../../../lib/homegroundSocialMetadata";
import { HomegroundLegalPage } from "../../../components/HomegroundLegalPage";
import {
  getHomegroundLegalCopy,
  getHomegroundLegalLanguagePaths,
} from "../../../lib/homegroundLegalI18n";

const copy = getHomegroundLegalCopy("refund-delivery", "en");

export const metadata: Metadata = {
  title: { absolute: copy.metadata.title },
  description: copy.metadata.description,
  alternates: {
    canonical: copy.pagePath,
    languages: getHomegroundLegalLanguagePaths("refund-delivery"),
  },
  robots: { index: true, follow: true },
  ...buildHomegroundSocialMetadata({
    locale: "en",
    title: copy.metadata.title,
    description: copy.metadata.description,
    url: copy.pagePath,
  }),
};

export default function RefundDeliveryPage() {
  return (
    <HomegroundLegalPage locale="en" pageId="refund-delivery" />
  );
}
