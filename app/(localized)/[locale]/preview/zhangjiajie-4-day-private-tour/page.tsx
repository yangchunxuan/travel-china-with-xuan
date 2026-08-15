import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ZhangjiajiePrivateTourPreviewPage } from "../../../../../components/ZhangjiajiePrivateTourPreviewPage";

export const metadata: Metadata = {
  title: "张家界4天3晚私家游：森林公园、玻璃桥与天门山",
  description:
    "用4天3晚走进张家界峰林、大峡谷玻璃桥与天门山，并比较市区酒店、高级度假别墅与精品住宿选择。",
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
