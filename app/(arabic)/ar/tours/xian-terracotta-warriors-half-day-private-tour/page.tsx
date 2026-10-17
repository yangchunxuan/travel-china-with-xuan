import type { Metadata } from 'next';
import { ArabicTerracottaHalfDayPage } from '../../../../../components/ArabicLegacyTours';
import { arabicHalfDayCopy as copy,arabicHalfDayPath as path } from '../../../../../lib/arabicLegacyTours';
import { terracottaHalfDayImage as image } from '../../../../../lib/terracottaHalfDayTour';
import { buildArabicMetadata } from '../../../../../lib/arabicSite';
const en='/tours/xian-terracotta-warriors-half-day-private-tour/';
const base=buildArabicMetadata(copy.title,copy.description,path,{en,fr:`/fr${en}`,ar:path,de:`/de${en}`,es:path.replace("/ar/","/es/"),'zh-Hans':`/zh${en}`,ko:`/ko${en}`,'x-default':en});
export const metadata:Metadata={...base,openGraph:{...base.openGraph,images:[{url:image.src,width:image.width,height:image.height,alt:copy.heroAlt}]},twitter:{...base.twitter,images:[{url:image.src,alt:copy.heroAlt}]}};
export default function Page(){return <ArabicTerracottaHalfDayPage/>;}
