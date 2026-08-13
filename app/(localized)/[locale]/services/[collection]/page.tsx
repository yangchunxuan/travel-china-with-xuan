import { LocalizedSearchCollectionPage, localizedSearchCollectionMetadata, localizedSearchCollectionParams } from "../../../../../lib/localizedSearchCollectionRoute";
export const dynamicParams=false; export const dynamic="force-static";
export function generateStaticParams(){return localizedSearchCollectionParams("services");}
export function generateMetadata({params}:{params:Promise<{locale:string;collection:string}>}){return localizedSearchCollectionMetadata("services",params);}
export default function Page({params}:{params:Promise<{locale:string;collection:string}>}){return <LocalizedSearchCollectionPage section="services" params={params}/>;}
