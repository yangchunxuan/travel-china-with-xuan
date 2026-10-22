import { notFound } from 'next/navigation';
import { ArabicCorePage } from '../../../../components/ArabicCorePages';
import { arabicCoreCopy, type ArabicCorePageId } from '../../../../lib/arabicCoreCopy';
import { buildArabicMetadata } from '../../../../lib/arabicSite';
import { japaneseAlternates } from '../../../../lib/japaneseSite';
export const dynamic='force-static';
export const dynamicParams=false;
export function generateStaticParams() { return Object.keys(arabicCoreCopy).map(section=>({section})); }
function getId(section:string):ArabicCorePageId { if(!Object.hasOwn(arabicCoreCopy,section)) notFound(); return section as ArabicCorePageId; }
export async function generateMetadata({params}: {params:Promise<{section:string}>}) {
  const id=getId((await params).section), copy=arabicCoreCopy[id];
  // Nothing links to the contact page and English has none, so it stays reachable but unindexed.
  const metadata=buildArabicMetadata(copy.title,copy.description,`/ar/${id}/`,id==='contact'?undefined:{...japaneseAlternates(`/${id}/`,`/ja/${id}/`),ar:`/ar/${id}/`});
  return id==='contact'?{...metadata,robots:{index:false,follow:true}}:metadata;
}
export default async function Page({params}: {params:Promise<{section:string}>}) { return <ArabicCorePage id={getId((await params).section)}/>; }
