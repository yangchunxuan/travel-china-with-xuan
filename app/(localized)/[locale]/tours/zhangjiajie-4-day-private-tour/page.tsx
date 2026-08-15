import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ZhangjiajiePrivateTourPreviewPage } from "../../../../../components/ZhangjiajiePrivateTourPreviewPage";
import {
  productPreviewCopy,
  zhangjiajiePrivateTourPaths,
} from "../../../../../lib/zhangjiajiePrivateTourPreview";

const socialImage =
  "/product-previews/zhangjiajie-4-day-private-tour/hero/forest-pillars-og-1200.jpg";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "zh" }];
}

function requireChinese(locale: string) {
  if (locale !== "zh") notFound();
  return "zh" as const;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  requireChinese(routeLocale);
  const copy = productPreviewCopy.zh;

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: {
      canonical: zhangjiajiePrivateTourPaths.zh,
      languages: {
        en: zhangjiajiePrivateTourPaths.en,
        "zh-Hans": zhangjiajiePrivateTourPaths.zh,
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
      locale: "zh_CN",
      alternateLocale: ["en_US"],
      url: zhangjiajiePrivateTourPaths.zh,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "阳光照亮张家界国家森林公园的砂岩峰柱。",
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
  const locale = requireChinese(routeLocale);

  return <ZhangjiajiePrivateTourPreviewPage locale={locale} published />;
}
