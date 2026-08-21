import { notFound } from "next/navigation";
import { getGuideSearchDocuments } from "../../../../../lib/guideSearchRuntime";
import type { HomegroundLocale } from "../../../../../lib/homegroundI18n";

type LocalizedLocale = Exclude<HomegroundLocale, "en">;

function localizedLocale(value: string): LocalizedLocale {
  if (value === "zh" || value === "ko") return value;
  notFound();
}

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "ko" }];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);

  return Response.json(getGuideSearchDocuments(locale), {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
