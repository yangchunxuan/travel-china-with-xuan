import type { Metadata } from "next";
import { ChinaItineraryReviewPage } from "../../../components/ChinaItineraryReviewPage";

const title = "China Itinerary Review & Route Planning";
const description =
  "Have your China itinerary reviewed for US$69, or get a practical route built for US$129. Clear advice on city order, transfers, hotel bases and pace.";
const socialImage =
  "/images/guides/china-itinerary-reality/transfer-platform-soft-focus-1200.webp";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/china-itinerary-review/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Plan a China route that works beyond the map | Homeground",
    description:
      "Start with the route you have—or ask Homeground to build the structure before you book the rest.",
    type: "website",
    locale: "en_US",
    url: "/china-itinerary-review/",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
};

export default function ChinaItineraryReviewRoute() {
  return <ChinaItineraryReviewPage />;
}
