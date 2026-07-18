import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomegroundPrivacyPage } from "../../../../components/HomegroundPrivacyPage";
import {
  getHomegroundPrivacyCopy,
  type HomegroundPrivacyLocale,
} from "../../../../lib/homegroundPrivacyI18n";

type LocalizedPrivacyLocale = Exclude<HomegroundPrivacyLocale, "en">;

function localizedPrivacyLocale(value: string): LocalizedPrivacyLocale {
  if (value === "zh" || value === "ko") return value;
  notFound();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = localizedPrivacyLocale(routeLocale);
  const copy = getHomegroundPrivacyCopy(locale);
  const canonical = `/${locale}/privacy/`;

  return {
    title: {
      absolute: copy.metadata.title,
    },
    description: copy.metadata.description,
    alternates: {
      canonical,
      languages: {
        en: "/privacy/",
        ko: "/ko/privacy/",
        "zh-Hans": "/zh/privacy/",
        "x-default": "/privacy/",
      },
    },
  };
}

export default async function LocalizedPrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedPrivacyLocale(routeLocale);

  return <HomegroundPrivacyPage locale={locale} />;
}
