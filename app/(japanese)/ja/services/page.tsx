import type { Metadata } from "next";
import { JapaneseServicesPage, japaneseServicesCopy } from "../../../../components/JapaneseServicesPage";
import { buildJapaneseSocialMetadata, japaneseAlternates, japaneseSite } from "../../../../lib/japaneseSite";

const copy = japaneseServicesCopy;

export const metadata: Metadata = {
  title: { absolute: copy.metadata.title },
  description: copy.metadata.description,
  alternates: {
    canonical: japaneseSite.services,
    languages: japaneseAlternates("/services/", japaneseSite.services),
  },
  robots: { index: true, follow: true },
  ...buildJapaneseSocialMetadata({
    title: copy.metadata.title,
    description: copy.metadata.description,
    url: japaneseSite.services,
  }),
};

export default function JapaneseServicesRoute() {
  return <JapaneseServicesPage />;
}
