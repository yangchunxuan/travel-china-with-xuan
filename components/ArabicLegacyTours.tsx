import { ArabicSiteHeader, ArabicSiteFooter, ArabicTourHeader } from './ArabicChrome';
import { TerracottaHalfDayPage } from './TerracottaHalfDayPage';
import { TerracottaHalfDaySend } from './TerracottaHalfDaySend';
import { ZhangjiajiePrivateTourPreviewPage, type ZhangjiajieTourEdition } from './ZhangjiajiePrivateTourPreviewPage';
import { ZhangjiajieTourComparisonLink } from './ZhangjiajieTourComparisonLink';
import { TourPriceScope } from './TourPriceScope';
import { TourWhatsAppLink } from './TourWhatsAppLink';
import { arabicLanguagePaths, arabicGuideLanguageNote } from '../lib/arabicSite';
import { arabicHalfDayCopy, arabicHalfDayPath, arabicHalfDaySlug, arabicLegacyZhangjiajie, arabicLegacyZhangjiajiePath, arabicLegacyZhangjiajieSlug, arabicLegacyPricing } from '../lib/arabicLegacyTours';
import { arabicClassicCopy, arabicClassicPricing, arabicZhangjiajieComparison } from '../lib/arabicLegacyPresentation';
import { arabicCommercialCopy } from '../lib/arabicTourPresentation';

function TourSchema({path,title,description,itinerary,faq}:{path:string;title:string;description:string;itinerary:readonly {title:string;body:string}[];faq:readonly {question:string;answer:string}[]}) {
 const url=`https://homegroundchina.com${path}`;
 const schema={'@context':'https://schema.org','@graph':[
  {'@type':'WebPage','@id':`${url}#webpage`,url,name:title,description,inLanguage:'ar'},
  {'@type':'TouristTrip','@id':`${url}#trip`,url,name:title,description,touristType:'مسافرون في رحلة خاصة',itinerary:{'@type':'ItemList',numberOfItems:itinerary.length,itemListElement:itinerary.map((day,index)=>({'@type':'ListItem',position:index+1,name:day.title,description:day.body}))}},
  {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'الرئيسية',item:'https://homegroundchina.com/ar/'},{'@type':'ListItem',position:2,name:'الرحلات',item:'https://homegroundchina.com/ar/tours/'},{'@type':'ListItem',position:3,name:title,item:url}]},
  {'@type':'FAQPage','@id':`${url}#faq`,inLanguage:'ar',mainEntity:faq.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))},
 ]};
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>;
}

/** The same half-day page and sending interaction as EN/ZH/KO, with Arabic copy. */
export function ArabicTerracottaHalfDayPage(){
 const copy=arabicHalfDayCopy;
 const message=[copy.message.opening,'',`${copy.message.date} :`,`${copy.message.travellers} :`,`${copy.message.hotel} :`,'لغة المرشد المطلوبة (يرجى تأكيد التوافر والسعر):','',`${copy.message.page} : https://homegroundchina.com${arabicHalfDayPath}`].join('\n');
 return <>
  <TerracottaHalfDayPage locale="en" edition={{language:'ar',copy,homePath:'/ar/',guideNote:arabicGuideLanguageNote,
   header:<ArabicSiteHeader currentPath={arabicHalfDayPath} contactHref={`${arabicHalfDayPath}#half-day-enquiry`} languagePaths={arabicLanguagePaths(`/tours/${arabicHalfDaySlug}/`,arabicHalfDayPath)}/>,
   footer:<ArabicSiteFooter currentPath={arabicHalfDayPath}/>,
   send:<TerracottaHalfDaySend locale="en" edition={{language:'ar',copy,message,homePath:'/ar/'}}/>,
  }}/>
  <TourSchema path={arabicHalfDayPath} title={copy.title} description={copy.description} itinerary={copy.stops} faq={copy.faq}/>
 </>;
}

/** Source classic-tour layout, live price window, stay grid and enquiry links. */
export function ArabicLegacyZhangjiajiePage(){
 const edition:ZhangjiajieTourEdition={
  language:'ar',copy:arabicClassicCopy,pricing:arabicClassicPricing(),commercialCopy:arabicCommercialCopy,
  homePath:'/ar/',canonicalPath:arabicLegacyZhangjiajiePath,
  header:<ArabicTourHeader tourSlug={arabicLegacyZhangjiajieSlug}/>,footer:<ArabicSiteFooter currentPath={arabicLegacyZhangjiajiePath}/>,
  whatsAppLink:<TourWhatsAppLink locale="en" slug={arabicLegacyZhangjiajieSlug} edition={{language:'ar',label:'راسلنا عبر واتساب',title:arabicLegacyZhangjiajie.title,path:arabicLegacyZhangjiajiePath,packageLabels:Object.fromEntries(arabicLegacyPricing.tiers.map(t=>[t.id,t.name])),guideNote:'لغة المرشد المطلوبة (يرجى تأكيد التوافر والسعر):'}}/>,
  priceScope:<TourPriceScope route="zhangjiajie" locale="en" detailsHref="#scope-title" edition={{copy:{title:'أهم شروط السعر',included:'مشمول',separate:'تكاليف إضافية',confirm:'قبل الدفع',details:'اطّلع على جميع الخدمات المشمولة والمستثناة'},content:{included:'ثلاث ليالٍ في الفئة المختارة؛ نقل محلي خاص والتنقلات المتفق عليها؛ مرشد ناطق بالإنجليزية في اليومين 2 و3؛ تذاكر البالغين والنقل داخل المعالم وفق التأكيد.',separate:'السفر إلى تشانغجياجيه ومنها والغداء والعشاء والأنشطة الاختيارية؛ فروق الغرفة المفردة والأطفال وترقية السيارة. الإرشاد بالعربية غير مشمول؛ ويلزم تأكيد التوافر والسعر منفصلين.',confirm:'الإقامة والغرفة والإفطار والسيارة والمرافقة. الصور لخيارات محتملة؛ تُؤكد غرفتك لمواعيدك.'}}}/>,
  comparison:<ZhangjiajieTourComparisonLink currentRoute="classic" locale="en" edition={{copy:arabicZhangjiajieComparison,paths:{classic:arabicLegacyZhangjiajiePath,forest:'/ar/tours/zhangjiajie-forest-4-day-private-tour/',ancientTowns:'/ar/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/'}}}/>,
  dayTitles:arabicLegacyZhangjiajie.itinerary.map(day=>day.title),
  routePhotos:{2:{alt:'مصعد بايلونغ على جروف الحجر الرملي في منتزه تشانغجياجيه',caption:'مصعد بايلونغ في قلب منتزه الغابات'},3:{alt:'الجسر الزجاجي فوق وادي تشانغجياجيه الكبير',caption:'الجسر الزجاجي في الوادي الكبير'},4:{alt:'قوس تيانمن الصخري الطبيعي في أعلى الدرج',caption:'تيانمن: قوس صخري بين السماء والجبل'}},
  photoCopy:{title:'مصادر الصور',local:'هذه الصور من أرشيف مشروع Homeground، وقد أذن المالك باستخدامها في هذا الموقع. اقتصر التعديل على القص وتغيير المقاس والصيغة.'},
  ui:{tourHub:'الرحلات',checkPrices:'تحقّق من السعر لمواعيدي',heroAlt:'الشمس تضيء قمم الحجر الرملي والوديان المشجّرة في منتزه تشانغجياجيه',dayPrefix:'اليوم',creditPrefix:'الصورة: ',cropped:' · مقتصّة',accommodationReference:'مثال للإقامة',touristType:'زيارة أولى لتشانغجياجيه',groupStayInquiry:'استفسر عن هذه الإقامة لمجموعتي'},
  planningContext:{destinations:[{id:'zhangjiajie',href:'/destinations/zhangjiajie/',label:'استكشف تشانغجياجيه (بالإنجليزية)'}],guides:[{id:'ar-guides',href:'/ar/guides/',label:'استعد لرحلتك إلى الصين'},{id:'ar-services',href:'/ar/services/',label:'اختر المساعدة المناسبة'}],relatedProducts:[{id:'forest',href:'/ar/tours/zhangjiajie-forest-4-day-private-tour/',label:'تشانغجياجيه: رحلة منتزه الغابات في أربعة أيام'},{id:'towns',href:'/ar/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/',label:'تشانغجياجيه وفورونغ وفنغهوانغ في سبعة أيام'}]},
 };
 return <ZhangjiajiePrivateTourPreviewPage locale="en" published edition={edition}/>;
}
