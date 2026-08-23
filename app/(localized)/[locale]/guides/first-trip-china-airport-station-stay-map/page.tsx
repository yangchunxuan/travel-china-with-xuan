import { notFound } from "next/navigation";
import {
  FIRST_TRIP_TEN_CITY_GUIDE_ID,
  FirstTripTenCityMapPage,
} from "../../../../../components/FirstTripTenCityMapPage";
import { buildEditorialGuideMetadata } from "../../../../../lib/editorialGuideRuntime";
import { getGuideEntry } from "../../../../../lib/guideRegistry";
import type { HomegroundLocale } from "../../../../../lib/homegroundI18n";

type LocalizedLocale = Exclude<HomegroundLocale, "en">;

function localizedLocale(value: string): LocalizedLocale {
  if (value === "zh" || value === "ko") return value;
  notFound();
}

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);
  const guide = getGuideEntry(FIRST_TRIP_TEN_CITY_GUIDE_ID, locale);
  const metadata = buildEditorialGuideMetadata(guide, locale);
  const localizedHero = `/images/guides/first-trip-china-airport-station-stay-map/hero-1600.${locale}.webp`;

  return {
    ...metadata,
    openGraph: metadata.openGraph
      ? {
          ...metadata.openGraph,
          images: [
            {
              url: localizedHero,
              width: guide.imageWidth,
              height: guide.imageHeight,
              alt: guide.heroAlt,
            },
          ],
        }
      : undefined,
    twitter: metadata.twitter
      ? {
          ...metadata.twitter,
          images: [{ url: localizedHero, alt: guide.heroAlt }],
        }
      : undefined,
  };
}

export default async function LocalizedFirstTripTenCityMapRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);
  return <FirstTripTenCityMapPage locale={locale} />;
}
