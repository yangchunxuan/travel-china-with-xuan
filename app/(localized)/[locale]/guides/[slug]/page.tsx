import { notFound } from "next/navigation";
import { EditorialGuidePage } from "../../../../../components/content/EditorialGuidePage";
import {
  buildEditorialGuideMetadata,
  getTemplateGuideBySlug,
  getTemplateGuideParams,
  loadTemplateGuideBody,
} from "../../../../../lib/editorialGuideRuntime";
import type { HomegroundLocale } from "../../../../../lib/homegroundI18n";

type LocalizedLocale = Exclude<HomegroundLocale, "en">;

function localizedLocale(value: string): LocalizedLocale {
  if (value === "zh" || value === "ko") return value;
  notFound();
}

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  const params = (["zh", "ko"] as const).flatMap((locale) =>
    getTemplateGuideParams(locale).map(({ slug }) => ({ locale, slug })),
  );
  // Next 15 static export rejects a dynamic route when the array is empty.
  // The sentinel renders notFound and never enters the manifest or sitemap.
  return params.length > 0
    ? params
    : [{ locale: "zh", slug: "__no-template-guides__" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: routeLocale, slug } = await params;
  const locale = localizedLocale(routeLocale);
  const guide = getTemplateGuideBySlug(slug, locale);
  if (!guide) notFound();
  return buildEditorialGuideMetadata(guide, locale);
}

export default async function LocalizedEditorialGuideRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: routeLocale, slug } = await params;
  const locale = localizedLocale(routeLocale);
  const guide = getTemplateGuideBySlug(slug, locale);
  if (!guide) notFound();
  const body = await loadTemplateGuideBody(guide.id, locale);
  return <EditorialGuidePage body={body} entry={guide} locale={locale} />;
}
