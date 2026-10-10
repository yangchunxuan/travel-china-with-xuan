import type { Metadata } from "next";
import {
  SpanishToursHubPage,
  spanishToursHubDescription,
  spanishToursHubTitle,
} from "../../../../components/SpanishToursHubPage";
import { getPrivateTourHubLanguagePaths } from "../../../../lib/privateTourHubI18n";
import { buildSpanishSocialMetadata, spanishSite } from "../../../../lib/spanishSite";

const title = `${spanishToursHubTitle} | Homeground China`;

export const metadata: Metadata = {
  title,
  description: spanishToursHubDescription,
  alternates: {
    canonical: spanishSite.tours,
    languages: getPrivateTourHubLanguagePaths(),
  },
  robots: { index: true, follow: true },
  ...buildSpanishSocialMetadata({
    title,
    description: spanishToursHubDescription,
    url: spanishSite.tours,
  }),
};

export default function SpanishToursHubRoute() {
  return <SpanishToursHubPage />;
}
