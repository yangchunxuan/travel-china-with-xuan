import type { Metadata } from "next";
import {
  SpanishGuidesHubPage,
  spanishGuidesHubDescription,
  spanishGuidesHubTitle,
} from "../../../../components/SpanishGuidesHubPage";
import { buildSpanishSocialMetadata, spanishSite } from "../../../../lib/spanishSite";

const title = `${spanishGuidesHubTitle} | Homeground China`;

export const metadata: Metadata = {
  title,
  description: spanishGuidesHubDescription,
  alternates: {
    canonical: spanishSite.guides,
    languages: {
      en: "/guides/",
      "zh-Hans": "/zh/guides/",
      ko: "/ko/guides/",
      ja: "/ja/guides/",
      es: spanishSite.guides,
      "x-default": "/guides/",
    },
  },
  robots: { index: true, follow: true },
  ...buildSpanishSocialMetadata({
    title,
    description: spanishGuidesHubDescription,
    url: spanishSite.guides,
  }),
};

export default function SpanishGuidesHubRoute() {
  return <SpanishGuidesHubPage />;
}
