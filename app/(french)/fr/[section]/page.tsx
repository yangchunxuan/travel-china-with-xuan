import { notFound } from 'next/navigation';
import { FrenchCorePage } from '../../../../components/FrenchCorePages';
import { frenchCoreCopy, type FrenchCorePageId } from '../../../../lib/frenchCoreCopy';
import { buildFrenchMetadata } from '../../../../lib/frenchSite';
import { japaneseAlternates } from '../../../../lib/japaneseSite';
export const dynamic='force-static';
export const dynamicParams=false;
export function generateStaticParams() { return Object.keys(frenchCoreCopy).map(section=>({section})); }
function getId(section:string):FrenchCorePageId { if(!Object.hasOwn(frenchCoreCopy,section)) notFound(); return section as FrenchCorePageId; }
export async function generateMetadata({params}: {params:Promise<{section:string}>}) {
  const id=getId((await params).section), copy=frenchCoreCopy[id];
  // Nothing links to the contact page and English has none, so it stays reachable but unindexed.
  const metadata=buildFrenchMetadata(copy.title,copy.description,`/fr/${id}/`,id==='contact'?undefined:{...japaneseAlternates(`/${id}/`,`/ja/${id}/`),fr:`/fr/${id}/`});
  return id==='contact'?{...metadata,robots:{index:false,follow:true}}:metadata;
}
export default async function Page({params}: {params:Promise<{section:string}>}) { return <FrenchCorePage id={getId((await params).section)}/>; }
