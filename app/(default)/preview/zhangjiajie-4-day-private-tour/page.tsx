import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ZhangjiajiePrivateTourPreviewPage } from "../../../../components/ZhangjiajiePrivateTourPreviewPage";
import { productPreviewCopy } from "../../../../lib/zhangjiajiePrivateTourPreview";

export const metadata: Metadata = {
  title: productPreviewCopy.en.metadataTitle,
  description:
    "Plan 4 days in Zhangjiajie across Wulingyuan, the Glass Bridge and Tianmen Mountain, with realistic pacing, accommodation choices and private-tour pricing.",
  robots: { index: false, follow: false },
};

export default function ZhangjiajiePrivateTourPreviewRoute() {
  if (process.env.NODE_ENV === "production") notFound();
  return <ZhangjiajiePrivateTourPreviewPage locale="en" />;
}
