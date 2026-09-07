import type { Metadata } from "next";
import {
  getHomegroundCopy,
  HOMEGROUND_BRAND_NAME,
  type HomegroundLocale,
} from "./homegroundI18n";

export function buildHomegroundSocialMetadata({
  locale,
  title,
  description,
  url,
}: {
  locale: HomegroundLocale;
  title: string;
  description: string;
  url: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const image = {
    url: "https://homegroundchina.com/images/home/beijing-hero-2400.jpg",
    width: 2400,
    height: 1600,
    alt: getHomegroundCopy(locale).hero.socialImageAlt,
  };

  return {
    openGraph: {
      siteName: HOMEGROUND_BRAND_NAME,
      title,
      description,
      type: "website",
      locale: { en: "en_US", zh: "zh_CN", ko: "ko_KR" }[locale],
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
