import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomegroundLegalPage } from "../../../../components/HomegroundLegalPage";
import {
  getHomegroundLegalCopy,
  getHomegroundLegalLanguagePaths,
} from "../../../../lib/homegroundLegalI18n";
import type { HomegroundLocale } from "../../../../lib/homegroundI18n";

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
  const copy = getHomegroundLegalCopy("refund-delivery", locale);

  return {
    title: { absolute: copy.metadata.title },
    description: copy.metadata.description,
    alternates: {
      canonical: copy.pagePath,
      languages: getHomegroundLegalLanguagePaths("refund-delivery"),
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: copy.metadata.title,
      description: copy.metadata.description,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "ko_KR",
      url: copy.pagePath,
    },
  };
}

export default async function LocalizedRefundDeliveryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);
  return (
    <HomegroundLegalPage locale={locale} pageId="refund-delivery" />
  );
}
