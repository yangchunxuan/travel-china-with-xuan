'use client';
import { HomegroundFooter } from './HomegroundFooter';
import { getHomegroundCopy } from '../lib/homegroundI18n';
import { destinationEditionFooterCityLinks, destinationsHubEditionPath, hasAllDestinationEditionCities } from '../lib/destinationEditions';
export { ArabicSiteHeader, ArabicTourHeader } from './ArabicHeader';
export function ArabicSiteFooter({currentPath,variant='default'}:{currentPath:string;variant?:'default'|'homepage'}) {
 const source=getHomegroundCopy('en');
 // City links open the Arabic city pages that exist and the English ones otherwise; the list says "in English" until all eight are Arabic.
 const localCities=hasAllDestinationEditionCities('ar');
 const copy={...source,htmlLang:'ar',path:'/ar/',businessDescriptor:'منظم رحلات داخل الصين',navigation:{...source.navigation,studio:'الاستوديو',faq:'الأسئلة الشائعة',visa:'الدخول إلى الصين'},cities:{...source.cities,listLabel:localCities?'وجهاتنا':'وجهاتنا؛ الأدلة بالإنجليزية'},footer:{...source.footer,copyright:(year:number)=>`© ${year} Homeground China. جميع الحقوق محفوظة.`}};
 const names:Record<string,string>={beijing:'بكين',shanghai:'شنغهاي',xian:'شيآن',chengdu:'تشنغدو',guangzhou:'قوانغتشو',hangzhou:'هانغتشو',zhangjiajie:'تشانغجياجيه',chongqing:'تشونغتشينغ'};
 return <HomegroundFooter locale="en" pageContext={variant==='homepage'?'home':currentPath==='/ar/tours/'?'tours':currentPath==='/ar/guides/'?'guides':currentPath==='/ar/studio/'?'studio':currentPath==='/ar/company/'?'company':'content'} variant={variant} edition={{copy,
 sectionLabels:{guides:'دليل السفر',services:'جميع الخدمات',fullTripSupport:'تنظيم الرحلات الخاصة',attractionReservations:'دعنا نحجز تذاكرك',legalLabel:'الشروط والخدمات',legalHeading:'البيانات القانونية',exploreHeading:'اكتشف',destinationsHeading:localCities?'الوجهات':'الوجهات بالإنجليزية',homegroundHeading:'Homeground',socialLabel:'تابع Homeground',privateTours:'رحلاتنا',allDestinations:'جميع الوجهات',operatorPrefix:'تدير Homeground شركة',operatorSuffix:'.',codeLabel:'رقم الائتمان الاجتماعي الموحد',licenceLabel:'ترخيص وكالة السفر'},
 related:{business:'بيانات الشركة',terms:'شروط الخدمة',refund:'الاسترداد وتنفيذ الخدمات',privacy:'الخصوصية',contact:'تواصل معنا'},company:{path:'/ar/company/',navLabel:'رسالتنا'},manageConsent:'إعدادات الخصوصية',cityLinks:destinationEditionFooterCityLinks('ar',names),
 paths:{privacy:'/ar/privacy/',business:'/ar/business-information/',terms:'/ar/terms/',refund:'/ar/refund-delivery/',services:'/ar/services/',fullTripSupport:'/ar/services/full-trip-support/',reservations:'/ar/services/china-attraction-reservations/',guides:'/ar/guides/',tours:'/ar/tours/',destinations:destinationsHubEditionPath.ar,studio:'/ar/studio/',entry:'/ar/guides/china-entry-requirements/'}}}/>;
}
