import type { Metadata } from "next";
import { CorporateTravelHubPage } from "../../../../components/CorporateTravelPages";
import { buildCorporateTravelMetadata, corporateTravelSchema } from "../../../../lib/corporateTravelMetadata";
import { localizedRouteLocale } from "../../../../lib/localizedRouteLocale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return buildCorporateTravelMetadata(undefined, localizedRouteLocale((await params).locale));
}

export default async function LocalizedCorporateTravelRoute({ params }: { params: Promise<{ locale: string }> }) {
  const locale = localizedRouteLocale((await params).locale);
  return <><CorporateTravelHubPage locale={locale} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(corporateTravelSchema(undefined, locale)).replace(/</g, "\\u003c") }} /></>;
}
