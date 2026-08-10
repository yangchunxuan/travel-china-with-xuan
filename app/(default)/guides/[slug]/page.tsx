import { notFound } from "next/navigation";
import { EditorialGuidePage } from "../../../../components/content/EditorialGuidePage";
import {
  buildEditorialGuideMetadata,
  getTemplateGuideBySlug,
  getTemplateGuideParams,
  loadTemplateGuideBody,
} from "../../../../lib/editorialGuideRuntime";

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  const params = getTemplateGuideParams("en");
  // Next 15 static export rejects a dynamic route when the array is empty.
  // The sentinel renders notFound and never enters the manifest or sitemap.
  return params.length > 0 ? params : [{ slug: "__no-template-guides__" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getTemplateGuideBySlug(slug, "en");
  if (!guide) notFound();
  return buildEditorialGuideMetadata(guide, "en");
}

export default async function EditorialGuideRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getTemplateGuideBySlug(slug, "en");
  if (!guide) notFound();
  const body = await loadTemplateGuideBody(guide.id, "en");
  return <EditorialGuidePage body={body} entry={guide} locale="en" />;
}
