import type { Metadata } from 'next';
import { FrenchTerracottaHalfDayPage } from '../../../../../components/FrenchLegacyTours';
import { frenchHalfDayCopy as copy,frenchHalfDayPath as path } from '../../../../../lib/frenchLegacyTours';
import { terracottaHalfDayImage as image } from '../../../../../lib/terracottaHalfDayTour';
import { buildFrenchMetadata } from '../../../../../lib/frenchSite';
const en='/tours/xian-terracotta-warriors-half-day-private-tour/';
const base=buildFrenchMetadata(copy.title,copy.description,path,{en,fr:path,es:path.replace("/fr/","/es/"),'zh-Hans':`/zh${en}`,ko:`/ko${en}`,'x-default':en});
export const metadata:Metadata={...base,openGraph:{...base.openGraph,images:[{url:image.src,width:image.width,height:image.height,alt:copy.heroAlt}]},twitter:{...base.twitter,images:[{url:image.src,alt:copy.heroAlt}]}};
export default function Page(){return <FrenchTerracottaHalfDayPage/>;}
