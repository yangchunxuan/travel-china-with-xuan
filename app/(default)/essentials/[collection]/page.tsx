import { SearchCollectionHubPage } from "../../../../components/SearchCollectionHubPage";
import { buildSearchCollectionMetadataForRoute, getPublicSearchCollection, getSearchCollectionParams } from "../../../../lib/searchCollectionRuntime";
export const dynamicParams = false; export const dynamic = "force-static";
export function generateStaticParams() { return getSearchCollectionParams("essentials"); }
export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }) { const { collection } = await params; return buildSearchCollectionMetadataForRoute("essentials", collection, "en"); }
export default async function Page({ params }: { params: Promise<{ collection: string }> }) { const { collection: slug } = await params; const collection = getPublicSearchCollection("essentials", slug); return <SearchCollectionHubPage collectionId={collection.id} locale="en" />; }
