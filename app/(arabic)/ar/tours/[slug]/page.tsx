import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { privateTourProducts, getPrivateTourProduct } from '../../../../../lib/privateTourProducts';
import { localizeArabicPrivateTourProduct } from '../../../../../lib/localizeArabicPrivateTourProduct';
import { getPrivateTourLanguagePaths } from '../../../../../lib/privateTourMetadata';
import { ShanghaiJiangnanImaginePage } from '../../../../../components/ShanghaiJiangnanImaginePage';
import { ArabicTourHeader, ArabicSiteFooter } from '../../../../../components/ArabicChrome';
export const dynamic='force-static';
export const dynamicParams=false;
export function generateStaticParams() { return privateTourProducts.map(p=>({slug:p.slug})); }
export async function generateMetadata({params}: {params:Promise<{slug:string}>}):Promise<Metadata> {
  const {slug}=await params; const source=getPrivateTourProduct(slug); if(!source) notFound();
  const product=localizeArabicPrivateTourProduct(source);
  return { title:{absolute:`${product.metadataTitle} | Homeground China`},description:product.metadataDescription,
    alternates:{canonical:product.path,languages:getPrivateTourLanguagePaths(source)},robots:{index:true,follow:true},
    openGraph:{siteName:'Homeground China',title:product.title,description:product.metadataDescription,url:product.path,type:'website',locale:'ar_SA',images:[{url:product.heroImage.src,width:product.heroImage.width,height:product.heroImage.height,alt:product.heroImage.alt}]},
    twitter:{card:'summary_large_image',title:product.metadataTitle,description:product.metadataDescription,images:[{url:product.heroImage.src,alt:product.heroImage.alt}]},
  };
}
export default async function Page({params}: {params:Promise<{slug:string}>}) {
  const {slug}=await params; const product=getPrivateTourProduct(slug); if(!product) notFound();
  return <ShanghaiJiangnanImaginePage product={product} locale="ar" arabicChrome={{header:<ArabicTourHeader tourSlug={slug}/>,footer:<ArabicSiteFooter currentPath={`/ar/tours/${slug}/`}/>}}/>;
}
