import { notFound } from "next/navigation";
import { ShanghaiJiangnanImaginePage } from "../../../../components/ShanghaiJiangnanImaginePage";
import {
  buildPrivateTourMetadata,
  getPrivateTourPreviewRouteParams,
  getPrivateTourRouteParams,
  isReservedPrivateTourSlug,
} from "../../../../lib/privateTourMetadata";
import { getPrivateTourRouteProduct } from "../../../../lib/privateTourProducts";

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  // Preview products render at their direct URL only (noindex, unlisted).
  return [
    ...getPrivateTourRouteParams("en"),
    ...getPrivateTourPreviewRouteParams("en"),
  ].map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (isReservedPrivateTourSlug(slug)) notFound();
  const product = getPrivateTourRouteProduct(slug);
  if (!product) notFound();
  return buildPrivateTourMetadata(product, "en");
}

export default async function PrivateTourRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (isReservedPrivateTourSlug(slug)) notFound();
  const product = getPrivateTourRouteProduct(slug);
  if (!product) notFound();
  return <ShanghaiJiangnanImaginePage product={product} locale="en" />;
}
