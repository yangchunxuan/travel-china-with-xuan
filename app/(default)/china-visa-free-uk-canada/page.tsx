import type { Metadata } from "next";
import { ChinaEntryGuidesPage } from "../../../components/ChinaEntryGuidesPage";

const entryHubPath = "/guides/china-entry-requirements/";
const entryHubUrl = `https://homegroundchina.com${entryHubPath}`;
const title = "China Entry Guides";
const description =
  "This former UK and Canada policy page now points to Homeground’s current passport- and route-specific China entry guides.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: entryHubPath,
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: entryHubUrl,
    title,
    description,
  },
};

export default function ChinaVisaFreeUkCanadaPage() {
  return <ChinaEntryGuidesPage />;
}
