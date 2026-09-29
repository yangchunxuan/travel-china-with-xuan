import type { Metadata } from "next";
import { JapaneseGuidesHubPage } from "../../../../components/JapaneseGuidesHubPage";
import {
  buildJapaneseSocialMetadata,
  japaneseAlternates,
  japaneseSite,
} from "../../../../lib/japaneseSite";

const title = "中国旅行の実用ガイド | Homeground China";
const description = "中国旅行の移動と費用を考えるための日本語ガイド。上海から杭州への鉄道移動と、中国旅行の公開料金・見積もりの違いを比べます。";

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
  return <JapaneseGuidesHubPage />;
}
