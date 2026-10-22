import { notFound } from 'next/navigation';
import { SpanishCorePage } from '../../../../components/SpanishCorePages';
import { spanishCoreCopy, type SpanishCorePageId } from '../../../../lib/spanishCoreCopy';
import { buildSpanishMetadata, spanishAlternates } from '../../../../lib/spanishSite';
export const dynamic='force-static';
export const dynamicParams=false;
export function generateStaticParams(){return Object.keys(spanishCoreCopy).map(section=>({section}));}
function getId(section:string):SpanishCorePageId{if(!Object.hasOwn(spanishCoreCopy,section))notFound();return section as SpanishCorePageId;}
export async function generateMetadata({params}:{params:Promise<{section:string}>}){
  const id=getId((await params).section),copy=spanishCoreCopy[id];
  // Nothing links to the contact page and English has none, so it stays reachable but unindexed.
  const metadata=buildSpanishMetadata(copy.title,copy.description,`/es/${id}/`,id==='contact'?undefined:spanishAlternates(`/${id}/`,`/es/${id}/`));
  return id==='contact'?{...metadata,robots:{index:false,follow:true}}:metadata;
}
export default async function Page({params}:{params:Promise<{section:string}>}){return <SpanishCorePage id={getId((await params).section)}/>;}
