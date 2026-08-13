import { SearchCollectionHubPage } from "../../../../components/SearchCollectionHubPage";
import { buildSearchCollectionMetadataForRoute, getPublicSearchCollection, getSearchCollectionParams } from "../../../../lib/searchCollectionRuntime";
export const dynamicParams = false; export const dynamic = "force-static";
export function generateStaticParams() { return getSearchCollectionParams("culture"); }
export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }) { const { collection } = await params; return buildSearchCollectionMetadataForRoute("culture", collection, "en"); }
export default async function Page({ params }: { params: Promise<{ collection: string }> }) { const { collection: slug } = await params; const collection = getPublicSearchCollection("culture", slug); return <SearchCollectionHubPage collectionId={collection.id} locale="en" />; }
