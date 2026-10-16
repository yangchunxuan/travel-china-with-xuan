import type { Metadata } from 'next';
import { SpanishLegacyZhangjiajiePage } from '../../../../../components/SpanishLegacyTours';
import { spanishLegacyZhangjiajie as copy,spanishLegacyZhangjiajiePath as path,spanishLegacyTourCards } from '../../../../../lib/spanishLegacyTours';
import { buildSpanishMetadata } from '../../../../../lib/spanishSite';
const en='/tours/zhangjiajie-4-day-private-tour/';
const base=buildSpanishMetadata(copy.title,copy.description,path,{en,fr:path.replace('/es/','/fr/'),es:path,'zh-Hans':`/zh${en}`,ko:`/ko${en}`,ja:`/ja${en}`,'x-default':en});
const image=spanishLegacyTourCards[0].image;
export const metadata:Metadata={...base,openGraph:{...base.openGraph,images:[{url:image.src,width:image.width,height:image.height,alt:image.alt}]},twitter:{...base.twitter,images:[{url:image.src,alt:image.alt}]}};
export default function Page(){return <SpanishLegacyZhangjiajiePage/>;}
