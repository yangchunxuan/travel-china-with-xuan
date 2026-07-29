import { notFound } from "next/navigation";
import { LabHtmlLang } from "../../../../../components/LabHtmlLang";
import { PlanningScopeSection } from "../../../../../components/PlanningScopeSection";
import {
  homegroundLocales,
  type HomegroundLocale,
} from "../../../../../lib/homegroundI18n";
import { getPlanningScopeCopy } from "../../../../../lib/homegroundPlanningScopeI18n";

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

export default async function PlanningScopeSectionLabPage({
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
      <main>
        <PlanningScopeSection locale={locale} />
      </main>
    </>
  );
}
