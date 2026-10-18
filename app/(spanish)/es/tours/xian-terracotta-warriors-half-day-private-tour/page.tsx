import type { Metadata } from 'next';
import { SpanishTerracottaHalfDayPage } from '../../../../../components/SpanishLegacyTours';
import { spanishHalfDayCopy as copy,spanishHalfDayPath as path } from '../../../../../lib/spanishLegacyTours';
import { terracottaHalfDayImage as image } from '../../../../../lib/terracottaHalfDayTour';
import { buildSpanishMetadata } from '../../../../../lib/spanishSite';
const en='/tours/xian-terracotta-warriors-half-day-private-tour/';
const base=buildSpanishMetadata(copy.title,copy.description,path,{en,fr:path.replace('/es/','/fr/'),es:path,'zh-Hans':`/zh${en}`,ko:`/ko${en}`,de:`/de${en}`, ar: `/ar${en}`,ja:`/ja${en}`,'x-default':en});
export const metadata:Metadata={...base,openGraph:{...base.openGraph,images:[{url:image.src,width:image.width,height:image.height,alt:copy.heroAlt}]},twitter:{...base.twitter,images:[{url:image.src,alt:copy.heroAlt}]}};
export default function Page(){return <SpanishTerracottaHalfDayPage/>;}
