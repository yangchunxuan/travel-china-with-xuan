import type { Metadata } from "next";
import { HomePage } from "../../components/HomePage";
import { translations } from "../../lib/i18n";

export const metadata: Metadata = {
  title: translations.ko.meta.title,
  description: translations.ko.meta.description,
  alternates: {
    canonical: "/ko/",
    languages: { en: "/", ko: "/ko/", "zh-Hans": "/zh/" },
  },
  openGraph: {
    title: translations.ko.meta.title,
    description: translations.ko.meta.description,
    type: "website",
  },
};

export default function HomeKo() {
  return <HomePage lang="ko" />;
}
