import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ZhangjiajiePrivateTourPreviewPage } from "../../../../components/ZhangjiajiePrivateTourPreviewPage";

export const metadata: Metadata = {
  title: "Zhangjiajie 4-Day Private Tour Preview",
  description:
    "A non-bookable local preview of Homeground's four-day private Zhangjiajie itinerary.",
  robots: { index: false, follow: false },
};

export default function ZhangjiajiePrivateTourPreviewRoute() {
  if (process.env.NODE_ENV === "production") notFound();
  return <ZhangjiajiePrivateTourPreviewPage locale="en" />;
}
