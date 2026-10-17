import type { Metadata } from 'next';
import { GermanLegacyZhangjiajiePage } from '../../../../../components/GermanLegacyTours';
import { germanLegacyZhangjiajie as copy,germanLegacyZhangjiajiePath as path,germanLegacyTourCards } from '../../../../../lib/germanLegacyTours';
import { buildGermanMetadata } from '../../../../../lib/germanSite';
const en='/tours/zhangjiajie-4-day-private-tour/';
const base=buildGermanMetadata(copy.title,copy.description,path,{en,fr:`/fr${en}`,de:path, ar: `/ar${en}`,es:path.replace("/de/","/es/"),'zh-Hans':`/zh${en}`,ko:`/ko${en}`,ja:`/ja${en}`,'x-default':en});
const image=germanLegacyTourCards[0].image;
export const metadata:Metadata={...base,openGraph:{...base.openGraph,images:[{url:image.src,width:image.width,height:image.height,alt:image.alt}]},twitter:{...base.twitter,images:[{url:image.src,alt:image.alt}]}};
export default function Page(){return <GermanLegacyZhangjiajiePage/>;}
