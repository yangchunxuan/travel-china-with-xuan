import { CorporateEditionRoute, corporateEditionMetadata } from "../../../../../components/CorporateEditionRoute";
import { notFound } from "next/navigation";
function local(value: string) { if (value === "zh" || value === "ko") return value; notFound(); }
import { corporateTrips } from "../../../../../lib/corporateTravel";
export const dynamicParams = false;
export function generateStaticParams() { return corporateTrips.map(trip => ({ slug: trip.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) { const { slug, locale: value } = await params; const locale = local(value); return corporateEditionMetadata(locale, slug); }
export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) { const { slug, locale: value } = await params; const locale = local(value); return <CorporateEditionRoute locale={locale} slug={slug} />; }
