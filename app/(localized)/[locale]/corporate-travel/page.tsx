import { CorporateEditionRoute, corporateEditionMetadata } from "../../../../components/CorporateEditionRoute";
import { notFound } from "next/navigation";
function local(value: string) { if (value === "zh" || value === "ko") return value; notFound(); }
export const dynamic = "force-static";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale: value } = await params; const locale = local(value); return corporateEditionMetadata(locale); }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale: value } = await params; const locale = local(value); return <CorporateEditionRoute locale={locale} />; }
