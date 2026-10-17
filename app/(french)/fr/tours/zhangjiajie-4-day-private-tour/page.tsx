import type { Metadata } from 'next';
import { FrenchLegacyZhangjiajiePage } from '../../../../../components/FrenchLegacyTours';
import { frenchLegacyZhangjiajie as copy,frenchLegacyZhangjiajiePath as path,frenchLegacyTourCards } from '../../../../../lib/frenchLegacyTours';
import { buildFrenchMetadata } from '../../../../../lib/frenchSite';
const en='/tours/zhangjiajie-4-day-private-tour/';
const base=buildFrenchMetadata(copy.title,copy.description,path,{en,fr:path,es:path.replace("/fr/","/es/"),'zh-Hans':`/zh${en}`,ko:`/ko${en}`,ja:`/ja${en}`,de:`/de${en}`, ar: `/ar${en}`,'x-default':en});
const image=frenchLegacyTourCards[0].image;
export const metadata:Metadata={...base,openGraph:{...base.openGraph,images:[{url:image.src,width:image.width,height:image.height,alt:image.alt}]},twitter:{...base.twitter,images:[{url:image.src,alt:image.alt}]}};
export default function Page(){return <FrenchLegacyZhangjiajiePage/>;}
