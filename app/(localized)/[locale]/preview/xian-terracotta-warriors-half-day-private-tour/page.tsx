import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TerracottaHalfDayDraftPage } from "../../../../../components/TerracottaHalfDayDraftPage";
import { terracottaHalfDayCopy } from "../../../../../lib/terracottaHalfDayDraft";

function draftLocale(locale: string) {
  if (locale === "zh" || locale === "ko") return locale;
  notFound();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = draftLocale((await params).locale);
  return { title: terracottaHalfDayCopy[locale].title, description: terracottaHalfDayCopy[locale].description, robots: { index: false, follow: false } };
}

export default async function LocalizedTerracottaHalfDayDraftRoute({ params }: { params: Promise<{ locale: string }> }) {
  const locale = draftLocale((await params).locale);
  if (process.env.NODE_ENV === "production") notFound();
  return <TerracottaHalfDayDraftPage locale={locale} />;
}
