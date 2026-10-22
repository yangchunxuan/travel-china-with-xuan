import { notFound } from 'next/navigation';
import { GermanCorePage } from '../../../../components/GermanCorePages';
import { germanCoreCopy, type GermanCorePageId } from '../../../../lib/germanCoreCopy';
import { buildGermanMetadata } from '../../../../lib/germanSite';
import { japaneseAlternates } from '../../../../lib/japaneseSite';
export const dynamic='force-static';
export const dynamicParams=false;
export function generateStaticParams() { return Object.keys(germanCoreCopy).map(section=>({section})); }
function getId(section:string):GermanCorePageId { if(!Object.hasOwn(germanCoreCopy,section)) notFound(); return section as GermanCorePageId; }
export async function generateMetadata({params}: {params:Promise<{section:string}>}) {
  const id=getId((await params).section), copy=germanCoreCopy[id];
  // Nothing links to the contact page and English has none, so it stays reachable but unindexed.
  const metadata=buildGermanMetadata(copy.title,copy.description,`/de/${id}/`,id==='contact'?undefined:{...japaneseAlternates(`/${id}/`,`/ja/${id}/`),de:`/de/${id}/`,ar:`/ar/${id}/`});
  return id==='contact'?{...metadata,robots:{index:false,follow:true}}:metadata;
}
export default async function Page({params}: {params:Promise<{section:string}>}) { return <GermanCorePage id={getId((await params).section)}/>; }
