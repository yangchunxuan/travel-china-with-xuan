import type { Metadata } from "next";
import { HomegroundPrivacyPage } from "../../../components/HomegroundPrivacyPage";
import { getHomegroundPrivacyCopy } from "../../../lib/homegroundPrivacyI18n";

const copy = getHomegroundPrivacyCopy("en");

export const metadata: Metadata = {
  title: {
    absolute: copy.metadata.title,
  },
  description: copy.metadata.description,
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
