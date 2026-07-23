import type { Metadata } from "next";
import { VisaFreeEntryPage } from "../../../components/VisaFreeEntryPage";
import {
  VISA_FREE_ENTRY_DESCRIPTION,
  VISA_FREE_ENTRY_META_TITLE,
  VISA_FREE_ENTRY_MODIFIED,
  VISA_FREE_ENTRY_PATH,
  VISA_FREE_ENTRY_PUBLISHED,
  VISA_FREE_ENTRY_URL,
} from "../../../lib/visaFreeEntry";

const socialImage =
  "https://homegroundchina.com/images/home/beijing-hero-1200.jpg";

export const metadata: Metadata = {
  title: {
    absolute: `${VISA_FREE_ENTRY_META_TITLE} — Homeground China`,
  },
  description: VISA_FREE_ENTRY_DESCRIPTION,
  alternates: {
    canonical: VISA_FREE_ENTRY_PATH,
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
    type: "article",
    locale: "en_GB",
    url: VISA_FREE_ENTRY_URL,
    title: VISA_FREE_ENTRY_META_TITLE,
    description: VISA_FREE_ENTRY_DESCRIPTION,
    publishedTime: VISA_FREE_ENTRY_PUBLISHED,
    modifiedTime: VISA_FREE_ENTRY_MODIFIED,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 800,
        alt: "The Forbidden City in Beijing reflected in its moat.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: VISA_FREE_ENTRY_META_TITLE,
    description: VISA_FREE_ENTRY_DESCRIPTION,
    images: [socialImage],
  },
};

export default function ChinaVisaFreeUkCanadaPage() {
  return <VisaFreeEntryPage />;
}
