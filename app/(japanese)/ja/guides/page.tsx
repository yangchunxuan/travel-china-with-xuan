import type { Metadata } from "next";
import { JapaneseGuidesPage } from "../../../../components/JapaneseGuidesPage";
import { japaneseGuidesHubCopy } from "../../../../lib/japaneseGuidesHubCopy";
import {
  buildJapaneseSocialMetadata,
  japaneseAlternates,
  japaneseSite,
} from "../../../../lib/japaneseSite";

const { title, description } = japaneseGuidesHubCopy.metadata;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: japaneseSite.guides,
    languages: japaneseAlternates("/guides/", japaneseSite.guides),
  },
  robots: { index: true, follow: true },
  ...buildJapaneseSocialMetadata({
    title,
    description,
    url: japaneseSite.guides,
    image: {
      url: "https://homegroundchina.com/images/guides/shanghai-hangzhou-transport-route/hero-1600.webp",
      width: 1600,
      height: 1000,
      alt: "杭州東駅の構内",
    },
  }),
};

export default function JapaneseGuidesRoute() {
  return <JapaneseGuidesPage />;
}
