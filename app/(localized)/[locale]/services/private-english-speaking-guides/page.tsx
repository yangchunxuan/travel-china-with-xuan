import type { Metadata } from "next";
import { PrivateGuideServicesPage } from "../../../../../components/PrivateGuideServicesPage";
import { buildPrivateGuideServiceMetadata } from "../../../../../lib/privateGuideServiceMetadata";
import { localizedRouteLocale } from "../../../../../lib/localizedRouteLocale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPrivateGuideServiceMetadata(localizedRouteLocale(locale));
}
export default async function LocalizedPrivateGuideServicesRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PrivateGuideServicesPage locale={localizedRouteLocale(locale)} />;
}
