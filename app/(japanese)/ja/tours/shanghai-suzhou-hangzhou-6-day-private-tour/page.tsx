import type { Metadata } from "next";
import { ShanghaiJiangnanImaginePage } from "../../../../../components/ShanghaiJiangnanImaginePage";
import { JapaneseTourHeader, JapaneseTourFooter } from "../../../../../components/JapaneseTourChrome";
import { jaPilot, jaPilotTourAlternates } from "../../../../../lib/jaPilot";
import { jaPilotCopy } from "../../../../../lib/jaPilotCopy";
import { getPrivateTourProduct } from "../../../../../lib/privateTourProducts";

const product = getPrivateTourProduct(jaPilot.tourSlug);
if (!product) throw new Error("Japanese tour source product is missing");

export const metadata: Metadata = {
  title: "上海・蘇州・杭州6日間｜日本語ガイド付きプライベートツアー | Homeground China",
  description: "上海2泊・蘇州1泊・杭州2泊。日本語ガイドによる4日間の観光と都市間の移動を含む6日間のプライベートツアー。",
  alternates: { canonical: jaPilot.tour, languages: jaPilotTourAlternates() },
  openGraph: {
    title: jaPilotCopy.tour.title,
    description: jaPilotCopy.tour.lede,
    type: "website",
    locale: "ja_JP",
    url: jaPilot.tour,
    images: [{
      url: product.heroImage.src,
      width: product.heroImage.width,
      height: product.heroImage.height,
      alt: jaPilotCopy.tour.photos.deck[0].alt,
    }],
  },
  robots: { index: true, follow: true },
};

export default function JapaneseJiangnanTour() {
  return <ShanghaiJiangnanImaginePage
    product={product!}
    locale="ja"
    japaneseChrome={{ header: <JapaneseTourHeader />, footer: <JapaneseTourFooter /> }}
  />;
}
