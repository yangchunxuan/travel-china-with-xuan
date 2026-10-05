import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomegroundCareersPage } from "../../../../components/HomegroundCareersPage";
import { homegroundCareersCopy as copy } from "../../../../lib/homegroundCareersCopy";

// Careers is published in Chinese only; /ko/careers/ is not generated.
export function generateStaticParams() {
  return [{ locale: "zh" }];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "zh") notFound();

  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
    alternates: { canonical: copy.path },
    // Draft copy: kept out of search until the owner approves the text.
    robots: { index: false, follow: true },
    openGraph: {
      title: copy.metadata.openGraphTitle,
      description: copy.metadata.description,
      type: "website",
      locale: "zh_CN",
      url: copy.path,
    },
    twitter: {
      card: "summary",
      title: copy.metadata.openGraphTitle,
      description: copy.metadata.description,
    },
  };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "zh") notFound();

  return <HomegroundCareersPage />;
}
