import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ZhangjiajiePrivateTourPreviewPage } from "../../../../components/ZhangjiajiePrivateTourPreviewPage";

export const metadata: Metadata = {
  title: "Zhangjiajie 4-Day Private Tour: Itinerary & 2026 Price",
  description:
    "Plan 4 days in Zhangjiajie across Wulingyuan, the Glass Bridge and Tianmen Mountain, with realistic pacing, accommodation choices and private-tour pricing.",
  robots: { index: false, follow: false },
};

export default function ZhangjiajiePrivateTourPreviewRoute() {
  if (process.env.NODE_ENV === "production") notFound();
  return <ZhangjiajiePrivateTourPreviewPage locale="en" />;
}
