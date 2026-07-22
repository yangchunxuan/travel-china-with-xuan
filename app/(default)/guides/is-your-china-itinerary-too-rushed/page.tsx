import type { Metadata } from "next";
import { ChinaItineraryTooRushedPage } from "../../../../components/ChinaItineraryTooRushedPage";

const title = "China Itinerary Too Rushed? A Practical Check";
const description =
  "Check whether your China itinerary is too rushed by testing city changes, door-to-door transfers, hotel moves, fixed bookings and recovery time.";
const socialImage =
  "/images/guides/china-itinerary-reality/transfer-platform-soft-focus-1200.webp";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/guides/is-your-china-itinerary-too-rushed/",
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
    title,
    description,
    type: "article",
    locale: "en_US",
    url: "/guides/is-your-china-itinerary-too-rushed/",
    publishedTime: "2026-07-22",
    modifiedTime: "2026-07-22",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 800,
        alt: "A softened railway platform used as a non-location-specific illustration of a transfer day.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
};

export default function ChinaItineraryTooRushedRoute() {
  return <ChinaItineraryTooRushedPage />;
}
