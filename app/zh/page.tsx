import type { Metadata } from "next";
import { HomePage } from "../../components/HomePage";
import { translations } from "../../lib/i18n";

export const metadata: Metadata = {
  title: translations.zh.meta.title,
  description: translations.zh.meta.description,
  alternates: {
    canonical: "/zh/",
    languages: { en: "/", ko: "/ko/", "zh-Hans": "/zh/" },
  },
  openGraph: {
    title: translations.zh.meta.title,
    description: translations.zh.meta.description,
    type: "website",
  },
};

export default function HomeZh() {
  return <HomePage lang="zh" />;
}
