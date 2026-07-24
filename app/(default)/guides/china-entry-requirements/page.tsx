import type { Metadata } from "next";
import { ChinaEntryGuidesPage } from "../../../../components/ChinaEntryGuidesPage";

const title = "China Entry Guides: Visa-Free Rules by Passport & Route";
const description =
  "Current China entry rules by passport, purpose and route, including 2026 UK visa-free entry, US visa guidance and a 240-hour transit route check.";
const path = "/guides/china-entry-requirements/";
const socialImage =
  "https://homegroundchina.com/images/guides/china-visa-free-uk-citizens-2026/great-wall-og-1200.jpg";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: path,
    languages: {
      en: path,
      "x-default": path,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: `https://homegroundchina.com${path}`,
    siteName: "Homeground China",
    title,
    description,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "The Great Wall crossing a mountain ridge near Beijing.",
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

export default function ChinaEntryRequirementsPage() {
  return <ChinaEntryGuidesPage />;
}
