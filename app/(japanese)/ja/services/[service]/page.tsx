import { notFound } from 'next/navigation';
import { ServiceEditionPage } from '../../../../../components/ServiceEditionPage';
import { serviceDetailSlugs, type ServiceDetailSlug } from '../../../../../lib/serviceEdition';
import { buildServiceEditionMetadata } from '../../../../../lib/serviceEditionMetadata';

export const dynamic = 'force-static';
export const dynamicParams = false;
export function generateStaticParams() { return serviceDetailSlugs.map(service => ({ service })); }
function getService(value: string): ServiceDetailSlug {
  const slug = serviceDetailSlugs.find(service => service === value);
  if (!slug) notFound();
  return slug;
}
export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  return buildServiceEditionMetadata('ja', getService((await params).service));
}
export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  return <ServiceEditionPage language="ja" slug={getService((await params).service)} />;
}
