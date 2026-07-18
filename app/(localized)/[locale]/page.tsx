import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomegroundHomePage } from "../../../components/HomegroundHomePage";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../../../lib/homegroundI18n";

type LocalizedLocale = Exclude<HomegroundLocale, "en">;

function localizedLocale(value: string): LocalizedLocale {
  if (value === "zh" || value === "ko") return value;
  notFound();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);
  const copy = getHomegroundCopy(locale);

  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
    alternates: {
      canonical: copy.path,
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
      locale: locale === "zh" ? "zh_CN" : "ko_KR",
      url: copy.path,
      images: [
        {
          url: "https://homegroundchina.com/images/home/beijing-hero-2400.jpg",
          width: 2400,
          height: 1600,
          alt: copy.hero.imageAlt,
        },
      ],
    },
  };
}

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);

  return <HomegroundHomePage locale={locale} />;
}
