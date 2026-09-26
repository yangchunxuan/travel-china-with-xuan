import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShanghaiJiangnanImaginePage } from "../../../../../components/ShanghaiJiangnanImaginePage";
import { JapaneseTourFooter, JapaneseTourHeader } from "../../../../../components/JapaneseTourChrome";
import {
  JapaneseLegacyZhangjiajieTourPage,
  japaneseLegacyZhangjiajieMetadata,
} from "../../../../../components/JapaneseLegacyZhangjiajieTourPage";
import { jaPilot } from "../../../../../lib/jaPilot";
import { localizeJapanesePrivateTourProduct } from "../../../../../lib/localizeJapanesePrivateTourProduct";
import { getPrivateTourLanguagePaths } from "../../../../../lib/privateTourMetadata";
import { getPrivateTourProduct, privateTourProducts } from "../../../../../lib/privateTourProducts";

const legacySlug = "zhangjiajie-4-day-private-tour";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...privateTourProducts
      .filter((product) => product.slug !== jaPilot.tourSlug)
      .map((product) => ({ slug: product.slug })),
    { slug: legacySlug },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === legacySlug) return japaneseLegacyZhangjiajieMetadata;
  if (slug === jaPilot.tourSlug) notFound();
  const product = getPrivateTourProduct(slug);
  if (!product) notFound();
  const localized = localizeJapanesePrivateTourProduct(product);
  const title = localized.metadataTitle.includes("Homeground China")
    ? localized.metadataTitle
    : `${localized.metadataTitle} | Homeground China`;
  return {
    title,
    description: localized.metadataDescription,
    alternates: {
      canonical: localized.path,
      languages: getPrivateTourLanguagePaths(product),
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: localized.title,
      description: localized.metadataDescription,
      type: "website",
      locale: "ja_JP",
      alternateLocale: ["en_US", "zh_CN", "ko_KR"],
      url: localized.path,
      images: [{
        url: localized.heroImage.src,
        width: localized.heroImage.width,
        height: localized.heroImage.height,
        alt: localized.heroImage.alt,
      }],
    },
  };
}

export default async function JapanesePrivateTourRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === legacySlug) return <JapaneseLegacyZhangjiajieTourPage />;
  if (slug === jaPilot.tourSlug) notFound();
  const product = getPrivateTourProduct(slug);
  if (!product) notFound();
  return <ShanghaiJiangnanImaginePage
    product={product}
    locale="ja"
    japaneseChrome={{
      header: <JapaneseTourHeader tourSlug={slug} />,
      footer: <JapaneseTourFooter tourSlug={slug} />,
    }}
  />;
}
