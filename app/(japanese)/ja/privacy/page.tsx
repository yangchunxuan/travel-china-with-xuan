import type { Metadata } from "next";
import { JapanesePrivacyPage } from "../../../../components/JapanesePrivacyPage";
import { japanesePrivacyCopy } from "../../../../lib/japanesePrivacyCopy";
import { buildJapaneseSocialMetadata, japaneseAlternates, japaneseSite } from "../../../../lib/japaneseSite";

const copy = japanesePrivacyCopy;

export const metadata: Metadata = {
  title: { absolute: copy.metadata.title },
  description: copy.metadata.description,
  alternates: {
    canonical: japaneseSite.privacy,
    languages: japaneseAlternates("/privacy/", japaneseSite.privacy),
  },
  robots: { index: true, follow: true },
  ...buildJapaneseSocialMetadata({
    title: copy.metadata.title,
    description: copy.metadata.description,
    url: japaneseSite.privacy,
  }),
};

export default function JapanesePrivacyRoute() {
  return <JapanesePrivacyPage />;
}
