import type { Metadata } from "next";
import { JapaneseExplorePage } from "../../../../components/JapaneseExplorePage";
import { japaneseExploreCopy as copy } from "../../../../lib/japaneseExploreCopy";
import { buildJapaneseSocialMetadata, japaneseAlternates, japaneseSite } from "../../../../lib/japaneseSite";

export const metadata: Metadata = {
  title: { absolute: copy.metadata.title },
  description: copy.metadata.description,
  alternates: {
    canonical: japaneseSite.explore,
    languages: japaneseAlternates("/explore/", japaneseSite.explore),
  },
  robots: { index: true, follow: true },
  ...buildJapaneseSocialMetadata({
    title: copy.metadata.title,
    description: copy.metadata.description,
    url: japaneseSite.explore,
  }),
};

export default function JapaneseExploreRoute() {
  return <JapaneseExplorePage />;
}
