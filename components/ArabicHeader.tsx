'use client';
import { HomegroundHeader, type HomegroundHeaderEdition, type HomegroundPageContext } from './HomegroundHeader';
import { getHomegroundCopy } from '../lib/homegroundI18n';
import { getHomegroundNavigationModel } from '../lib/homegroundNavigationModel';
import { arabicLanguagePaths, arabicSite, type ArabicLanguagePath } from '../lib/arabicSite';
import { getPrivateTourInquiryContext } from '../lib/privateTourInquiryContext';
import { openTourContactForContext } from '../lib/tourContact';
import { usePrivateTourSelection } from './PrivateTourSelection';
import { destinationsHubEditionPath, hasAllDestinationEditionCities } from '../lib/destinationEditions';
const source=getHomegroundCopy('en');
const navigationSource=getHomegroundNavigationModel('en','/', { includeCorporateTravel: false });
const arabicItems={
 // The destinations hub is Arabic: the item loses its English marker; its description keeps saying the city guides are English until they are not.
 destinations:{label:'الوجهات',description:hasAllDestinationEditionCities('ar')?'المدن وأفكار السفر والمعالم':'المدن وأفكار السفر والمعالم؛ الأدلة بالإنجليزية',href:destinationsHubEditionPath.ar},
 tours:{label:'الرحلات',description:'قارن البرامج والأسعار المنشورة',href:'/ar/tours/'},
 services:{label:'خدمات السفر',description:'التذاكر والإرشاد والسائق وتنظيم الرحلة',href:'/ar/services/'},
 guides:{label:'دليل السفر',description:'الدخول والتنقل والإقامة ومواسم السفر',href:'/ar/guides/'},
 studio:{label:'من نحن',description:'فريقنا وطريقة عملنا وتراخيصنا',href:'/ar/studio/'},
} as const;
const arabicEntries:Readonly<Record<string,{label:string;description:string;href:string}>>={
 cities:{label:'المدن',description:'بكين وشنغهاي وشيآن وخمس وجهات أخرى',href:destinationsHubEditionPath.ar},
 inspiration:{label:'أفكار السفر',description:'اهتماماتك وأفكارك والبرامج المناسبة',href:'/ar/inspiration/'},
 sights:{label:'المعالم',description:'سور الصين وجيش التيراكوتا ومعالم أخرى',href:'/ar/sights/'},
 'all-tours':{label:'جميع الرحلات',description:'قارن المناطق والمدة والأسعار',href:'/ar/tours/'},
 'multi-city':{label:'رحلات متعددة المدن بالإنجليزية',description:'اجمع بين وجهات رئيسية في رحلة واحدة',href:'/tours/multi-city/'},
 regions:{label:'المناطق بالإنجليزية',description:'شرق الصين وجنوبها الغربي وجنوبها ومناطق أخرى',href:'/tours/regions/'},
 seasonal:{label:'الرحلات الموسمية بالإنجليزية',description:'شتاء الشمال الشرقي: هاربين وجبال تشانغباي',href:'/tours/seasonal/'},
 'attraction-tickets':{label:'التذاكر والحجوزات',description:'نتولى حجز تذاكرك. راسلنا فور تحديد مواعيدك.',href:'/ar/services/china-attraction-reservations/'},
 'english-guides':{label:'مرشد خاص باللغة الإنجليزية',description:'جولات يومية خاصة بالإنجليزية في أربع مدن',href:'/ar/services/private-english-speaking-guides/'},
 'private-car':{label:'سيارة خاصة مع سائق',description:'انتقالات المطار والرحلات اليومية بسيارة خاصة',href:'/ar/services/private-car-and-driver/'},
 'trip-support':{label:'تنظيم الرحلة',description:'الإقامة والانتقالات والتنسيق المحلي',href:'/ar/services/full-trip-support/'},
 company:{label:'نهجنا بالإنجليزية',description:'لماذا أسسنا Homeground وما الذي يهمنا',href:'/company/'},
 planning:{label:'فريقنا وطريقة عملنا',description:'كيف نخطط لرحلات قابلة للتنفيذ على أرض الواقع',href:'/ar/studio/'},
 credentials:{label:'التراخيص والتسجيل',description:'بيانات رسمية يمكنك التحقق منها',href:'/ar/business-information/'},
};
const toggles:Readonly<Record<string,string>>={destinations:'فتح قائمة الوجهات',tours:'فتح قائمة الرحلات',services:'فتح قائمة الخدمات',studio:'فتح قائمة من نحن'};
const navigation:HomegroundHeaderEdition['navigation']={mobileCta:'خطّط',items:navigationSource.items.map(item=>({...item,...arabicItems[item.id]})),menus:Object.fromEntries(Object.entries(navigationSource.menus).map(([id,menu])=>[id,{toggle:toggles[id],entries:menu.entries.map(entry=>({...entry,...arabicEntries[entry.id]}))}]))};
const copy:HomegroundHeaderEdition['copy']={path:'/ar/',businessDescriptor:'منظم رحلات داخل الصين',navigation:{...source.navigation,
 primaryLabel:'التنقل الرئيسي',mobileLabel:'القائمة الرئيسية',mobileServicesLabel:'خدمات السفر',menuTagline:'الصين على طريقتك، وفريقنا إلى جانبك.',footerLabel:'روابط أسفل الصفحة',languageLabel:'اختر اللغة',languageChangeWarning:'قد تفقد البيانات غير المرسلة عند تغيير اللغة. هل تريد المتابعة؟',homeLabel:'Homeground China — الصفحة العربية',planning:'خطّط لرحلتك',studio:'فريقنا',faq:'الأسئلة الشائعة',visa:'الدخول إلى الصين بالإنجليزية',openMenu:'فتح القائمة',closeMenu:'إغلاق القائمة',plannerCta:{new:'خطّط لرحلتك',inProgress:'أكمل التخطيط',result:'عرض خطتي',disabled:'خطّط لرحلتك',validationError:'راجع البيانات',submitting:'جارٍ الإرسال…',success:'عرض طلبي',failed:'حاول مجدداً',uncertain:'تحقق من طلبي'}}};
export function ArabicSiteHeader({contactHref=arabicSite.contact,currentPath,languagePaths,tourSlug}:{contactHref?:string;currentPath:string;languagePaths:readonly ArabicLanguagePath[];tourSlug?:string}) {
 const selected=usePrivateTourSelection();
 const pageContext:HomegroundPageContext=tourSlug?'tour':currentPath==='/ar/'?'home':currentPath==='/ar/tours/'?'tours':currentPath.startsWith('/ar/services/')?'services':currentPath==='/ar/guides/'?'guides':currentPath==='/ar/studio/'?'studio':'content';
 return <HomegroundHeader locale="en" pageContext={pageContext} navigationIsExact plannerHrefOverride={contactHref} languagePaths={Object.fromEntries(languagePaths.map(item=>[item.lang,item.path]))} edition={{language:'ar',copy,navigation,servicesOverview:'جميع الخدمات',onPlannerClick:(event,returnFocus)=>{if(!tourSlug)return;openTourContactForContext(event,getPrivateTourInquiryContext(tourSlug,'en',selected?.slug===tourSlug?selected.selection:undefined),returnFocus);}}}/>;
}
export function ArabicTourHeader({tourSlug}:{tourSlug:string}) {const currentPath=`/ar/tours/${tourSlug}/`;return <ArabicSiteHeader currentPath={currentPath} tourSlug={tourSlug} contactHref={`${currentPath}#contact`} languagePaths={arabicLanguagePaths(`/tours/${tourSlug}/`,currentPath)}/>;}
