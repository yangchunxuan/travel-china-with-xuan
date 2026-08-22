import { notFound } from "next/navigation";
import { HomegroundHomePage } from "../../../../../components/HomegroundHomePage";
import { LabHtmlLang } from "../../../../../components/LabHtmlLang";
import {
  homegroundLocales,
  type HomegroundLocale,
} from "../../../../../lib/homegroundI18n";
import { getPlanningScopeCopy } from "../../../../../lib/homegroundPlanningScopeI18n";
import {
  getHomepageGuideRailItems,
  getHomepageSearchDemos,
} from "../../../../../lib/homepageEditorial";

export const dynamicParams = false;

export function generateStaticParams() {
  return homegroundLocales.map((locale) => ({ locale }));
}

function labLocale(value: string): HomegroundLocale {
  if (homegroundLocales.includes(value as HomegroundLocale)) {
    return value as HomegroundLocale;
  }
  notFound();
}

/**
 * The "before" state: the whole homepage with the previous section three.
 *
 * The redesign is now the default on the real homepage, so this route exists to
 * compare against it — open / and this page side by side.
 */
export default async function PlanningScopeFullPageLab({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = labLocale(routeLocale);
  const copy = getPlanningScopeCopy(locale);

  return (
    <>
      <LabHtmlLang lang={copy.htmlLang} />
      <HomegroundHomePage
        guideRailItems={getHomepageGuideRailItems(locale).slice(0, 18)}
        locale={locale}
        planningSection="current"
        searchDemos={getHomepageSearchDemos(locale)}
      />
    </>
  );
}
