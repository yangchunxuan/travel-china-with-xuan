import type { Metadata } from 'next';
import { ArabicLegacyZhangjiajiePage } from '../../../../../components/ArabicLegacyTours';
import { arabicLegacyZhangjiajie as copy,arabicLegacyZhangjiajiePath as path,arabicLegacyTourCards } from '../../../../../lib/arabicLegacyTours';
import { buildArabicMetadata } from '../../../../../lib/arabicSite';
const en='/tours/zhangjiajie-4-day-private-tour/';
const base=buildArabicMetadata(copy.title,copy.description,path,{en,fr:`/fr${en}`,ar:path,de:`/de${en}`,es:path.replace("/ar/","/es/"),'zh-Hans':`/zh${en}`,ko:`/ko${en}`,ja:`/ja${en}`,'x-default':en});
const image=arabicLegacyTourCards[0].image;
export const metadata:Metadata={...base,openGraph:{...base.openGraph,images:[{url:image.src,width:image.width,height:image.height,alt:image.alt}]},twitter:{...base.twitter,images:[{url:image.src,alt:image.alt}]}};
export default function Page(){return <ArabicLegacyZhangjiajiePage/>;}
