import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChinaEntryGuidesEditionPage } from "../../../../../components/ChinaEntryGuidesEditionPage";
import { entryRequirementsEditionMetadata } from "../../../../../lib/entryRequirementsEditions";
import type { EntryRequirementsLocalizedLocale } from "../../../../../lib/entryRequirementsEditionPaths";

function localizedLocale(value: string): EntryRequirementsLocalizedLocale {
  if (value === "zh" || value === "ko") return value;
  notFound();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return entryRequirementsEditionMetadata(localizedLocale(locale));
}

export default async function ChinaEntryRequirementsLocalizedRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ChinaEntryGuidesEditionPage language={localizedLocale(locale)} />;
}
