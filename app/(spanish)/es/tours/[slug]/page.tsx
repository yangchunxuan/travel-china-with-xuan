import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShanghaiJiangnanImaginePage } from "../../../../../components/ShanghaiJiangnanImaginePage";
import { SpanishSiteFooter, SpanishTourHeader } from "../../../../../components/SpanishChrome";
import { localizeSpanishPrivateTourProduct } from "../../../../../lib/localizeSpanishPrivateTourProduct";
import { getPrivateTourLanguagePaths } from "../../../../../lib/privateTourMetadata";
import { getPrivateTourProduct } from "../../../../../lib/privateTourProducts";
import { hasSpanishTourPage, spanishTourSlugs } from "../../../../../lib/spanishTourCopy";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return spanishTourSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = hasSpanishTourPage(slug) ? getPrivateTourProduct(slug) : undefined;
  if (!product) notFound();
  const localized = localizeSpanishPrivateTourProduct(product);
  const title = `${localized.metadataTitle} | Homeground China`;
  const image = {
    url: localized.heroImage.src,
    width: localized.heroImage.width,
    height: localized.heroImage.height,
    alt: localized.heroImage.alt,
  };
  return {
    title,
    description: localized.metadataDescription,
    alternates: {
      canonical: localized.path,
      languages: getPrivateTourLanguagePaths(product),
    },
    robots: { index: true, follow: true },
    openGraph: {
      siteName: "Homeground China",
      title: localized.title,
      description: localized.metadataDescription,
      type: "website",
      locale: "es_ES",
      alternateLocale: ["en_US", "zh_CN", "ko_KR"],
      url: localized.path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: localized.title,
      description: localized.metadataDescription,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

export default async function SpanishPrivateTourRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = hasSpanishTourPage(slug) ? getPrivateTourProduct(slug) : undefined;
  if (!product) notFound();
  return <ShanghaiJiangnanImaginePage
    product={product}
    locale="es"
    spanishChrome={{
      header: <SpanishTourHeader tourSlug={slug} />,
      footer: <SpanishSiteFooter currentPath={`/es/tours/${slug}/`} />,
    }}
  />;
}
