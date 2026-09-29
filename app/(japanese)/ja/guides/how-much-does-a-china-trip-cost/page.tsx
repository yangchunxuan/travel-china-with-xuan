import type { Metadata } from "next";
import { ChinaTripCostGuidePage } from "../../../../../components/ChinaTripCostGuidePage";
import { chinaTripCostJapaneseCopy } from "../../../../../lib/chinaTripCostJapaneseCopy";
import { getGuideLanguagePaths } from "../../../../../lib/guideRegistry";

const copy = chinaTripCostJapaneseCopy;
const heroImage = "https://homegroundchina.com/images/guides/china-trip-cost/beijing-cbd-city-mobility-og-1200.jpg";

export const metadata: Metadata = {
  title: { absolute: `${copy.metadata.title} | Homeground China` },
  description: copy.metadata.description,
  alternates: {
    canonical: copy.pagePath,
    languages: getGuideLanguagePaths("how-much-does-a-china-trip-cost"),
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    title: copy.metadata.title,
    description: copy.metadata.description,
    type: "article",
    locale: "ja_JP",
    alternateLocale: ["en_US", "zh_CN", "ko_KR"],
    url: copy.pagePath,
    publishedTime: "2026-09-29",
    modifiedTime: "2026-09-29",
    images: [{ url: heroImage, width: 1200, height: 630, alt: copy.metadata.heroAlt }],
  },
  twitter: { card: "summary_large_image", title: copy.metadata.title, description: copy.metadata.description, images: [heroImage] },
};

export default function JapaneseChinaTripCostGuide() {
  return <ChinaTripCostGuidePage locale="ja" />;
}
