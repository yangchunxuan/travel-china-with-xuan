import type { Metadata } from "next";
import { PrivateCarServicesPage } from "../../../../../components/PrivateCarServicesPage";
import { buildPrivateCarServiceMetadata } from "../../../../../lib/privateCarServiceMetadata";
import { localizedRouteLocale } from "../../../../../lib/localizedRouteLocale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPrivateCarServiceMetadata(localizedRouteLocale(locale));
}
export default async function LocalizedPrivateCarServicesRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PrivateCarServicesPage locale={localizedRouteLocale(locale)} />;
}
