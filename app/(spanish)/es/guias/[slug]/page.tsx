import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpanishGuidePage } from "../../../../../components/SpanishGuidePage";
import { getGuideLanguagePaths, type GuideId } from "../../../../../lib/guideRegistry";
import { getSpanishGuide, spanishGuidePath, spanishGuides } from "../../../../../lib/spanishGuides";
import { buildSpanishSocialMetadata } from "../../../../../lib/spanishSite";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return spanishGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getSpanishGuide(slug);
  if (!guide) notFound();
  const path = spanishGuidePath(guide.slug);
  const title = `${guide.title} | Homeground China`;
  return {
    title,
    description: guide.description,
    alternates: {
      canonical: path,
      // A guide written only in Spanish has no other-language versions.
      ...(guide.sourceGuideId
        ? { languages: getGuideLanguagePaths(guide.sourceGuideId as GuideId) }
        : {}),
    },
    robots: { index: true, follow: true },
    ...buildSpanishSocialMetadata({
      title: guide.headline,
      description: guide.description,
      url: path,
      type: "article",
      image: {
        url: `https://homegroundchina.com${guide.heroImage.src}`,
        width: guide.heroImage.width,
        height: guide.heroImage.height,
        alt: guide.heroImage.alt,
      },
    }),
  };
}

export default async function SpanishGuideRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getSpanishGuide(slug);
  if (!guide) notFound();
  return <SpanishGuidePage guide={guide} />;
}
