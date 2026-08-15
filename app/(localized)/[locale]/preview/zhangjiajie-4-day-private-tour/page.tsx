import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ZhangjiajiePrivateTourPreviewPage } from "../../../../../components/ZhangjiajiePrivateTourPreviewPage";
import {
  productPreviewCopy,
  type ProductPreviewLocale,
} from "../../../../../lib/zhangjiajiePrivateTourPreview";

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

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    robots: { index: false, follow: false },
  };
}

export default async function LocalizedZhangjiajiePrivateTourPreviewRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);
  if (process.env.NODE_ENV === "production") notFound();
  return <ZhangjiajiePrivateTourPreviewPage locale={locale} />;
}
