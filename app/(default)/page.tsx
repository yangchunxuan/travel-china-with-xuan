import type { Metadata } from "next";
import { HomegroundHomePage } from "../../components/HomegroundHomePage";
import { getHomegroundCopy } from "../../lib/homegroundI18n";

const copy = getHomegroundCopy("en");

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ko: "/ko/",
      "zh-Hans": "/zh/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: copy.metadata.openGraphTitle,
    description: copy.metadata.description,
    type: "website",
    locale: "en",
    url: "/",
    images: [
      {
        url: "https://homegroundchina.com/images/home/beijing-hero-2400.jpg",
        width: 2400,
        height: 1599,
        alt: copy.hero.imageAlt,
      },
    ],
  },
};

export default function Home() {
  return <HomegroundHomePage locale="en" />;
}
