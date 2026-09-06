import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsletterActionPage } from "../../../../../components/NewsletterActionPage";
export const metadata: Metadata = { title: "Newsletter | Homeground China", robots: { index: false, follow: false }, referrer: "no-referrer" };
export const dynamicParams = false;
export function generateStaticParams() { return [{ action: "confirm" }, { action: "unsubscribe" }]; }
export default async function Page({ params }: { params: Promise<{ action: string; locale: string }> }) {
  const { action, locale } = await params;
  if ((action !== "confirm" && action !== "unsubscribe") || (locale !== "zh" && locale !== "ko")) notFound();
  return <NewsletterActionPage locale={locale} action={action} />;
}
