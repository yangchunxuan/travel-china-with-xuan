import type { Metadata } from "next";
import { JapaneseToursHubPage } from "../../../../components/JapaneseToursHubPage";
import { getPrivateTourHubLanguagePaths } from "../../../../lib/privateTourHubI18n";
import { localizeJapanesePrivateTourProduct } from "../../../../lib/localizeJapanesePrivateTourProduct";
import { privateTourProducts } from "../../../../lib/privateTourProducts";

const image = localizeJapanesePrivateTourProduct(privateTourProducts[0]).heroImage;

export const metadata: Metadata = {
  title: "中国ツアー一覧｜プライベート旅行・少人数グループ | Homeground China",
  description: "中国各地のプライベートツアーと出発日指定の少人数グループを日本語で比較。日程、サービス内容、公開料金や見積もり条件をご案内します。",
  alternates: { canonical: "/ja/tours/", languages: getPrivateTourHubLanguagePaths() },
  robots: { index: true, follow: true },
  openGraph: {
    title: "中国ツアー一覧 | Homeground China",
    description: "中国各地の行程を日本語で比べる。",
    type: "website",
    locale: "ja_JP",
    alternateLocale: ["en_US", "zh_CN", "ko_KR"],
    url: "/ja/tours/",
    images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }],
  },
};

export default function JapaneseToursHubRoute() {
  return <JapaneseToursHubPage />;
}
