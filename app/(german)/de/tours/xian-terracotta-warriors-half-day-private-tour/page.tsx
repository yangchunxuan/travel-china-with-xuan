import type { Metadata } from 'next';
import { GermanTerracottaHalfDayPage } from '../../../../../components/GermanLegacyTours';
import { germanHalfDayCopy as copy,germanHalfDayPath as path } from '../../../../../lib/germanLegacyTours';
import { terracottaHalfDayImage as image } from '../../../../../lib/terracottaHalfDayTour';
import { buildGermanMetadata } from '../../../../../lib/germanSite';
const en='/tours/xian-terracotta-warriors-half-day-private-tour/';
const base=buildGermanMetadata(copy.title,copy.description,path,{en,fr:`/fr${en}`,de:path, ar: `/ar${en}`,es:path.replace("/de/","/es/"),'zh-Hans':`/zh${en}`,ko:`/ko${en}`,ja:`/ja${en}`,'x-default':en});
export const metadata:Metadata={...base,openGraph:{...base.openGraph,images:[{url:image.src,width:image.width,height:image.height,alt:copy.heroAlt}]},twitter:{...base.twitter,images:[{url:image.src,alt:copy.heroAlt}]}};
export default function Page(){return <GermanTerracottaHalfDayPage/>;}
