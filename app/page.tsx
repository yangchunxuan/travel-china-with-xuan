import type { Metadata } from "next";
import { HomePage } from "../components/HomePage";
import { translations } from "../lib/i18n";

export const metadata: Metadata = {
  title: translations.en.meta.title,
  description: translations.en.meta.description,
  alternates: {
    canonical: "/",
    languages: { en: "/", ko: "/ko/", "zh-Hans": "/zh/" },
  },
  openGraph: {
    title: "Homeground China — Private China Journeys",
    description:
      "Tailor-made China trips planned by a Zhangjiajie-born local. No shopping stops, no hidden fees, and the difficult logistics handled.",
    type: "website",
    images: [
      {
        url: "https://yangchunxuan.github.io/travel-china-with-xuan/images/hero-zhangjiajie.jpg",
        width: 2200,
        height: 1238,
        alt: "The sandstone peaks of Zhangjiajie",
      },
    ],
  },
};

export default function Home() {
  return <HomePage lang="en" />;
}
