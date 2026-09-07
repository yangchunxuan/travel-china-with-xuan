import type { Metadata } from "next";
import { buildHomegroundSocialMetadata } from "../../../lib/homegroundSocialMetadata";
import { HomegroundPrivacyPage } from "../../../components/HomegroundPrivacyPage";
import { getHomegroundPrivacyCopy } from "../../../lib/homegroundPrivacyI18n";

const copy = getHomegroundPrivacyCopy("en");

export const metadata: Metadata = {
  title: {
    absolute: copy.metadata.title,
  },
  description: copy.metadata.description,
  ...buildHomegroundSocialMetadata({
    locale: "en",
    title: copy.metadata.title,
    description: copy.metadata.description,
    url: "/privacy/",
  }),
  alternates: {
    canonical: "/privacy/",
    languages: {
      en: "/privacy/",
      ko: "/ko/privacy/",
      "zh-Hans": "/zh/privacy/",
      "x-default": "/privacy/",
    },
  },
};

export default function PrivacyPage() {
  return <HomegroundPrivacyPage locale="en" />;
}
