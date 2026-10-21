import type { Metadata } from 'next';
import { homegroundBusiness } from './homegroundBusiness.ts';
import { editionReplyPromise } from './editionReplyPromise.ts';
import { spanishTourPagePath, spanishSitePagePathByEnglishPath } from './spanishEditionIndex.ts';
import { frenchSitePagePathByEnglishPath } from './frenchEditionIndex.ts';
import { germanSitePagePathByEnglishPath } from './germanEditionIndex.ts';

export const arabicSite = { home:'/ar/', tours:'/ar/tours/', guides:'/ar/guides/', services:'/ar/services/', studio:'/ar/studio/', contact:'/ar/#planner-contact' } as const;
export const arabicPrimaryLinks = [
 {href:arabicSite.home,label:'الرئيسية',description:'خطط لرحلتك إلى الصين'},
 {href:arabicSite.tours,label:'الرحلات',description:'البرامج والأسعار المنشورة'},
 {href:arabicSite.services,label:'خدمات السفر',description:'اختر المساعدة المناسبة لرحلتك'},
 {href:arabicSite.guides,label:'دليل السفر',description:'استعد لزيارتك للصين'},
 {href:arabicSite.studio,label:'فريقنا',description:'تعرّف على Homeground'},
];
export const arabicLegalLinks = [
 {href:'/ar/business-information/',label:'بيانات الشركة والترخيص'},
 {href:'/ar/terms/',label:'شروط الحجز'},
 {href:'/ar/privacy/',label:'الخصوصية'},
 {href:'/ar/refund-delivery/',label:'الإلغاء والاسترداد'},
];
export interface ArabicLanguagePath { readonly label:string; readonly lang:string; readonly path:string; }
export function arabicLanguagePaths(enPath:string, arPath:string):readonly ArabicLanguagePath[] {
 const slug=/^\/tours\/([^/]+)\/$/.exec(enPath)?.[1];
 const es=slug?spanishTourPagePath(slug):spanishSitePagePathByEnglishPath[enPath];
 const fr=slug?`/fr${enPath}`:frenchSitePagePathByEnglishPath[enPath];
 const de=slug?`/de${enPath}`:germanSitePagePathByEnglishPath[enPath];
 return [{label:'العربية',lang:'ar',path:arPath},{label:'EN',lang:'en',path:enPath},{label:'中文',lang:'zh-Hans',path:`/zh${enPath}`},{label:'한국어',lang:'ko',path:`/ko${enPath}`},
 {label:'日本語',lang:'ja',path:`/ja${enPath}`},
 ...(fr?[{label:'FR',lang:'fr',path:fr}]:[]),...(es?[{label:'ES',lang:'es',path:es}]:[]),...(de?[{label:'DE',lang:'de',path:de}]:[])];
}
export const arabicGuideLanguageNote='تسري الخدمات ولغة الإرشاد الموضحتان في الباقة المختارة. الإرشاد باللغة العربية غير مشمول في الأسعار المنشورة، ولا نؤكد توفره. إذا كنت تفضله، نتحقق من إمكانية ترتيبه وتكلفته ونؤكد ذلك كتابياً قبل الحجز.';
export const arabicGuideLanguageBadge='الإرشاد باللغة العربية غير مشمول في السعر';
export const arabicDraftNote=`${editionReplyPromise.ar} يفتح واتساب أو تطبيق البريد مسودة رسالة. لا تُرسل الرسالة حتى ترسلها بنفسك من التطبيق.`;
export const arabicTourContactNote=`${editionReplyPromise.ar} يؤكد النموذج على الشاشة حفظ طلبك. أما واتساب وتطبيق البريد فيفتحان مسودة رسالة ترسلها بنفسك.`;
export const arabicPublishedPriceNote='الأسعار للشخص بحسب الباقة وعدد المسافرين والفترة الموضحة، وبالعملة المعروضة دون تحويل إلى الريال السعودي أو الدرهم الإماراتي. تختلف شروط الموسم والغرف والخدمات بحسب الرحلة. نؤكد السعر الإجمالي وشروط الدفع كتابياً قبل الدفع.';
export function arabicWhatsAppHref(message:string) {
 const configured=process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER||'8613174215999';
 const number=/^\d{7,15}$/.test(configured)?configured:'8613174215999';
 return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
export function arabicEmailHref(subject:string,message:string) { return `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`; }
export function arabicGeneralContactHrefs(path:string) {
 const message=['مرحباً، أود التخطيط لرحلة إلى الصين.','الوجهات أو البرنامج:','تواريخ السفر التقريبية:','عدد المسافرين:','لغة الإرشاد المطلوبة، مع تأكيد التوفر والتكلفة:',`الصفحة: https://homegroundchina.com${path}`].join('\n');
 return {whatsapp:arabicWhatsAppHref(message),email:arabicEmailHref('طلب رحلة إلى الصين',message)};
}
export function buildArabicMetadata(title:string,description:string,path:string,languages?:Record<string,string>):Metadata {
 return {title:{absolute:`${title} | Homeground China`},description,alternates:{canonical:path,...(languages?{languages}: {})},robots:{index:true,follow:true},
 openGraph:{title,description,url:path,siteName:'Homeground China',locale:'ar_SA',type:'website',images:[{url:'/images/home/beijing-hero-2400.jpg',width:2400,height:1600,alt:'برج في المدينة المحرمة ينعكس في مياه الخندق في بكين'}]},
 twitter:{card:'summary_large_image',title,description,images:['/images/home/beijing-hero-2400.jpg']}};
}
