import { notFound } from "next/navigation";
import { ShanghaiJiangnanImaginePage } from "../../../../../components/ShanghaiJiangnanImaginePage";
import {
  buildPrivateTourMetadata,
  getPrivateTourPreviewRouteParams,
  getPrivateTourRouteParams,
  isReservedPrivateTourSlug,
} from "../../../../../lib/privateTourMetadata";
import type { HomegroundLocale } from "../../../../../lib/homegroundI18n";
import { getPrivateTourRouteProduct } from "../../../../../lib/privateTourProducts";

type LocalizedLocale = Exclude<HomegroundLocale, "en">;

function localizedLocale(value: string): LocalizedLocale {
  if (value === "zh" || value === "ko") return value;
  notFound();
}

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  // Preview products render at their direct URL only (noindex, unlisted).
  return (["zh", "ko"] as const).flatMap((locale) =>
    [
      ...getPrivateTourRouteParams(locale),
      ...getPrivateTourPreviewRouteParams(locale),
    ].map(({ slug }) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: routeLocale, slug } = await params;
  const locale = localizedLocale(routeLocale);
  if (isReservedPrivateTourSlug(slug)) notFound();
  const product = getPrivateTourRouteProduct(slug);
  if (!product) notFound();
  return buildPrivateTourMetadata(product, locale);
}

export default async function LocalizedPrivateTourRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: routeLocale, slug } = await params;
  const locale = localizedLocale(routeLocale);
  if (isReservedPrivateTourSlug(slug)) notFound();
  const product = getPrivateTourRouteProduct(slug);
  if (!product) notFound();
  return <ShanghaiJiangnanImaginePage product={product} locale={locale} />;
}
