import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ZhangjiajiePrivateTourPreviewPage } from "../../../../../components/ZhangjiajiePrivateTourPreviewPage";

export const metadata: Metadata = {
  title: "张家界4天3晚私家定制预览",
  description: "Homeground张家界4天3晚私家行程的本地、不可预订预览页。",
  robots: { index: false, follow: false },
};

export default async function LocalizedZhangjiajiePrivateTourPreviewRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (process.env.NODE_ENV === "production" || locale !== "zh") notFound();
  return <ZhangjiajiePrivateTourPreviewPage locale="zh" />;
}
