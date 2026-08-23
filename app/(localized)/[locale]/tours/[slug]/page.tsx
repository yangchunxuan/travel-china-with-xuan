import { notFound } from "next/navigation";
import { ShanghaiJiangnanImaginePage } from "../../../../../components/ShanghaiJiangnanImaginePage";
import {
  buildPrivateTourMetadata,
  getPrivateTourRouteParams,
  isReservedPrivateTourSlug,
} from "../../../../../lib/privateTourMetadata";
import type { HomegroundLocale } from "../../../../../lib/homegroundI18n";
import { getPrivateTourProduct } from "../../../../../lib/privateTourProducts";

type LocalizedLocale = Exclude<HomegroundLocale, "en">;

function localizedLocale(value: string): LocalizedLocale {
  if (value === "zh" || value === "ko") return value;
  notFound();
}

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return (["zh", "ko"] as const).flatMap((locale) =>
    getPrivateTourRouteParams(locale).map(({ slug }) => ({ locale, slug })),
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
  const product = getPrivateTourProduct(slug);
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
  const product = getPrivateTourProduct(slug);
  if (!product) notFound();
  return <ShanghaiJiangnanImaginePage product={product} locale={locale} />;
}
