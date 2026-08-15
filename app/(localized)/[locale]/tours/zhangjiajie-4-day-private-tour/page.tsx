import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ZhangjiajiePrivateTourPreviewPage } from "../../../../../components/ZhangjiajiePrivateTourPreviewPage";
import {
  productPreviewCopy,
  type ProductPreviewLocale,
  zhangjiajiePrivateTourPaths,
} from "../../../../../lib/zhangjiajiePrivateTourPreview";

const socialImage =
  "/product-previews/zhangjiajie-4-day-private-tour/hero/forest-pillars-og-1200.jpg";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "ko" }];
}

type LocalizedLocale = Exclude<ProductPreviewLocale, "en">;

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
  const copy = productPreviewCopy[locale];
  const canonicalPath = zhangjiajiePrivateTourPaths[locale];
  const openGraphLocale = locale === "zh" ? "zh_CN" : "ko_KR";
  const socialImageAlt =
    locale === "zh"
      ? "阳光照亮张家界国家森林公园的砂岩峰柱。"
      : "햇살이 비치는 장자제 국가삼림공원의 사암 봉우리.";

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: zhangjiajiePrivateTourPaths.en,
        "zh-Hans": zhangjiajiePrivateTourPaths.zh,
        ko: zhangjiajiePrivateTourPaths.ko,
        "x-default": zhangjiajiePrivateTourPaths.en,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: copy.heroTitle,
      description: copy.metadataDescription,
      type: "website",
      locale: openGraphLocale,
      alternateLocale:
        locale === "zh" ? ["en_US", "ko_KR"] : ["en_US", "zh_CN"],
      url: canonicalPath,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metadataTitle,
      description: copy.metadataDescription,
      images: [socialImage],
    },
  };
}

export default async function LocalizedZhangjiajiePrivateTourRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);

  return <ZhangjiajiePrivateTourPreviewPage locale={locale} published />;
}
