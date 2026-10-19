import type { Metadata } from 'next';
import { SpanishLegacyZhangjiajiePage } from '../../../../../components/SpanishLegacyTours';
import { spanishLegacyZhangjiajiePath as path,spanishLegacyTourCards } from '../../../../../lib/spanishLegacyTours';
import { buildSpanishMetadata } from '../../../../../lib/spanishSite';
import { spanishClassicPricing } from '../../../../../lib/spanishLegacyPresentation';
import { spanishZhangjiajieSearchMeta } from '../../../../../lib/spanish-sales/legacy-zhangjiajie';
const en='/tours/zhangjiajie-4-day-private-tour/';
const pricing=spanishClassicPricing();
const search=spanishZhangjiajieSearchMeta({tiers:pricing.tiers.map(tier=>({name:tier.name,base:tier.formattedPrice,six:tier.formattedSixPersonPrice})),validFromLabel:pricing.validFromLabel,validUntilLabel:pricing.validUntilLabel});
const base=buildSpanishMetadata(search.title,search.description,path,{en,fr:path.replace('/es/','/fr/'),es:path,'zh-Hans':`/zh${en}`,ko:`/ko${en}`,ja:`/ja${en}`,de:`/de${en}`, ar: `/ar${en}`,'x-default':en});
const image=spanishLegacyTourCards[0].image;
export const metadata:Metadata={...base,openGraph:{...base.openGraph,images:[{url:image.src,width:image.width,height:image.height,alt:image.alt}]},twitter:{...base.twitter,images:[{url:image.src,alt:image.alt}]}};
export default function Page(){return <SpanishLegacyZhangjiajiePage/>;}
