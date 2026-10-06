import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomegroundCompanyPage } from "../../../../components/HomegroundCompanyPage";
import type { HomegroundLocale } from "../../../../lib/homegroundI18n";
import {
  getCompanyLanguagePaths,
  getHomegroundCompanyCopy,
} from "../../../../lib/homegroundCompanyI18n";

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
  const copy = getHomegroundCompanyCopy(locale);

  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
    alternates: {
      canonical: copy.path,
      languages: getCompanyLanguagePaths(),
    },
    // Draft copy: kept out of search until the owner approves the text.
    robots: { index: false, follow: true },
    openGraph: {
      title: copy.metadata.openGraphTitle,
      description: copy.metadata.description,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "ko_KR",
      alternateLocale:
        locale === "zh" ? ["en_US", "ko_KR"] : ["en_US", "zh_CN"],
      url: copy.path,
    },
    twitter: {
      card: "summary",
      title: copy.metadata.openGraphTitle,
      description: copy.metadata.description,
    },
  };
}

export default async function LocalizedCompanyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);

  return <HomegroundCompanyPage locale={locale} />;
}
