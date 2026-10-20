import { homegroundBusiness as business } from './homegroundBusiness.ts';
import { arabicGuideLanguageNote } from './arabicSite.ts';
export type ArabicCoreSection={title:string;paragraphs:readonly string[];links?:readonly {href:string;label:string}[]};
export const arabicCoreCopy={
 services:{title:'خدمات السفر داخل الصين: مرشد وسائق وحجوزات',description:`رحلات وإرشاد وانتقالات وإقامة وحجوزات: اختر الخدمات المناسبة لرحلتك إلى الصين. ${arabicGuideLanguageNote}`,eyebrow:'مساعدة تناسب رحلتك',intro:'نبدأ بما رتبته بالفعل، ثم نحدد معاً أين تحتاج إلى فريق محلي.',sections:[] as readonly ArabicCoreSection[]},
 studio:{title:'كيف تخطط Homeground للرحلات إلى الصين',description:'تعرّف على كيف تحوّل Homeground تواريخك الفعلية ومن يسافر معك وأولوياتك وحجوزاتك الثابتة إلى مسار متماسك في الصين ونطاق خدمات مكتوب وخطة قابلة للاستخدام.',eyebrow:'تعرّف على فريقنا',intro:'نبدأ بالاستماع: ما الذي حجزته، وما الذي ترغب في رؤيته، وكم من الوقت تريد لنفسك؟',sections:[] as readonly ArabicCoreSection[]},
 'business-information':{title:'بيانات الشركة وترخيص Homeground China',description:`شركة Homeground China المشغلة ورقم التسجيل ${business.unifiedSocialCreditCode} وترخيص السفر ${business.travelAgencyLicenceNumber} وبيانات التواصل.`,eyebrow:'قبل أن تسند إلينا رحلتك',intro:'بيانات الشركة التي تدير Homeground China والمراجع التي يمكنك التحقق منها قبل الحجز.',sections:[] as readonly ArabicCoreSection[]},
 guides:{title:'دليل السفر إلى الصين: البرامج والميزانية والتنقل',description:'استعد لرحلتك إلى الصين: اختيار المسار وفهم الأسعار والتنقل ولغة الإرشاد. فهرس عربي يقود إلى مقالات تفصيلية بالإنجليزية.',eyebrow:'قبل السفر',intro:'ابدأ بما ترغب في تجربته. المهم الوقت المتاح في كل محطة، لا عدد المدن وحده.',sections:[] as readonly ArabicCoreSection[]},
 contact:{title:'تواصل مع Homeground China بشأن رحلتك',description:'أخبر Homeground بتواريخ السفر وعدد المسافرين والمسار المطلوب. نراجع التوفر والخدمات والسعر قبل تقديم تأكيد كتابي للحجز.',eyebrow:'لنتحدث عن رحلتك',intro:'أرسل المواعيد وعدد المسافرين والوجهات أو ما رتبته بالفعل. نراجع احتياجاتك والخدمات الممكنة قبل إعداد العرض.',sections:[] as readonly ArabicCoreSection[]},
};
export type ArabicCorePageId=keyof typeof arabicCoreCopy;
