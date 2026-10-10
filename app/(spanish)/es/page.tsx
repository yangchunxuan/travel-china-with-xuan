import type { Metadata } from "next";
import {
  SpanishHomePage,
  spanishHomeDescription,
  spanishHomeTitle,
} from "../../../components/SpanishHomePage";
import { buildSpanishSocialMetadata, spanishSite } from "../../../lib/spanishSite";

export const metadata: Metadata = {
  title: spanishHomeTitle,
  description: spanishHomeDescription,
  alternates: {
    canonical: spanishSite.home,
    languages: { en: "/", "zh-Hans": "/zh/", ko: "/ko/", ja: "/ja/", es: spanishSite.home, "x-default": "/" },
  },
  robots: { index: true, follow: true },
  ...buildSpanishSocialMetadata({
    title: spanishHomeTitle,
    description: spanishHomeDescription,
    url: spanishSite.home,
  }),
};

export default function SpanishHomeRoute() {
  return <SpanishHomePage />;
}
