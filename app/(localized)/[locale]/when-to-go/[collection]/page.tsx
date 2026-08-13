import { LocalizedSearchCollectionPage, localizedSearchCollectionMetadata, localizedSearchCollectionParams } from "../../../../../lib/localizedSearchCollectionRoute";
export const dynamicParams=false; export const dynamic="force-static";
export function generateStaticParams(){return localizedSearchCollectionParams("when-to-go");}
export function generateMetadata({params}:{params:Promise<{locale:string;collection:string}>}){return localizedSearchCollectionMetadata("when-to-go",params);}
export default function Page({params}:{params:Promise<{locale:string;collection:string}>}){return <LocalizedSearchCollectionPage section="when-to-go" params={params}/>;}
