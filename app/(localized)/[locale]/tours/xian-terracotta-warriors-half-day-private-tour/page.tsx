import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TerracottaHalfDayPage } from "../../../../../components/TerracottaHalfDayPage";
import { terracottaHalfDayMetadata } from "../../../../../lib/terracottaHalfDayTour";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "ko" }];
}

function pageLocale(locale: string) {
  if (locale === "zh" || locale === "ko") return locale;
  notFound();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return terracottaHalfDayMetadata(pageLocale((await params).locale));
}

export default async function LocalizedTerracottaHalfDayRoute({ params }: { params: Promise<{ locale: string }> }) {
  return <TerracottaHalfDayPage locale={pageLocale((await params).locale)} />;
}
