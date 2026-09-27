import type { Metadata } from "next";
import { JapaneseLegalPage } from "../../../../components/JapaneseLegalPage";
import { getJapaneseLegalCopy } from "../../../../lib/japaneseLegalCopy";
import { buildJapaneseSocialMetadata, japaneseAlternates } from "../../../../lib/japaneseSite";

const copy = getJapaneseLegalCopy("business-information");

export const metadata: Metadata = {
  title: { absolute: copy.metadata.title },
  description: copy.metadata.description,
  alternates: {
    canonical: copy.pagePath,
    languages: japaneseAlternates("/business-information/", copy.pagePath),
  },
  robots: { index: true, follow: true },
  ...buildJapaneseSocialMetadata({
    title: copy.metadata.title,
    description: copy.metadata.description,
    url: copy.pagePath,
  }),
};

export default function JapaneseBusinessInformationPage() {
  return <JapaneseLegalPage pageId="business-information" />;
}
