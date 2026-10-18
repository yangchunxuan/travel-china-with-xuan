import { TravelServicesHubPage, type TravelServicesHubEdition } from './TravelServicesHubPage';
import { ArabicSiteFooter, ArabicSiteHeader } from './ArabicChrome';
import { arabicGuideLanguageNote, arabicLanguagePaths } from '../lib/arabicSite';
import { attractionReservationServiceFeeCny } from '../lib/attractionReservations';

const path = '/ar/services/';
const origin = 'https://homegroundchina.com';
const hrefs = {
  tours: '/ar/tours/',
  guides: '/ar/services/private-english-speaking-guides/',
  reservations: '/ar/services/china-attraction-reservations/',
  support: '/ar/services/full-trip-support/',
} as const;

export const arabicServicesHubCopy: TravelServicesHubEdition['copy'] = {
  breadcrumb: 'التنقّل بين الصفحات',
  overview: 'جميع الخدمات',
  choicesEyebrow: 'نبدأ بما خطّطت له حتى الآن',
  choicesTitle: 'اختر المساعدة التي تحتاج إليها في رحلتك.',
  choicesBody: 'قارن رحلاتنا الخاصة، أو أخبرنا بمواعيد السفر وعدد المسافرين والخدمات المطلوبة. نؤكد الخدمات المتاحة وعرض السعر قبل أي حجز.',
  cards: [
    { id: 'tours', eyebrow: 'مسارات الرحلات المنشورة', title: 'قارن الرحلات الخاصة', body: 'اطّلع على البرنامج اليومي والأسعار الابتدائية والخدمات المشمولة وشروط الحجز.', action: 'قارن الرحلات' },
    { id: 'guides', eyebrow: 'مرشد خاص في الأيام التي تحتاج إليه فيها', title: 'مرشدون خاصون يتحدثون الإنجليزية', body: 'في شنغهاي وبكين وشيان وتشانغجياجيه: قارن أسعار المرشدين الناطقين بالإنجليزية لمدة تصل إلى 8 ساعات. يُؤكد عدد المسافرين والمسار والنقل بصورة منفصلة. المرشد الناطق بالعربية يحتاج إلى تأكيد منفصل للتوافر والسعر.', action: 'خدمات المرشدين وأسعارهم' },
    { id: 'reservations', eyebrow: 'حددت مواعيدك؟ احجز مبكرًا.', title: 'تذاكر معالم الصين، نرتّبها لك', body: 'وفّر عناء التطبيقات الصينية ومتابعة لحظة فتح الحجز. نحجز في نظام كل معلم بالاسم الوارد في جواز سفرك. أرسل مواعيدك مبكرًا لنجهّز الحجز قبل فتحه. رسوم الخدمة: {fee} لكل شخص ولكل معلم، إضافة إلى التذكرة بسعرها الأصلي.', action: 'أرسل مواعيدك للحجز' },
    { id: 'support', eyebrow: 'من التخطيط حتى الرحلة', title: 'تنظيم الرحلة كاملة', body: 'مسار مترابط مع الفنادق والتذاكر والتنقلات المناسبة والتنسيق المحلي.', action: 'اطّلع على تنظيم الرحلة كاملة' },
  ],
  methodEyebrow: 'كيف نعمل',
  methodTitle: 'تعرّف على طريقة عملنا قبل تخطيط رحلتك.',
  methodBody: `قبل البدء بأي خدمة مدفوعة، نوضّح ما يمكنك ترتيبه بنفسك، وما يحتاج إلى تحقق، وما ستتولاه Homeground. ${arabicGuideLanguageNote}`,
  methodAction: 'كيف نخطّط للرحلة',
  adviceAction: 'ابدأ بإجابة عن سؤال عملي',
};

export function ArabicServicesPage() {
  const languagePaths = arabicLanguagePaths('/services/', path);
  const edition: TravelServicesHubEdition = {
    language: 'ar', homePath: '/ar/', homeLabel: 'الرئيسية', skipLink: 'انتقل إلى المحتوى',
    header: <ArabicSiteHeader currentPath={path} languagePaths={languagePaths} />,
    footer: <ArabicSiteFooter currentPath={path} />,
    copy: arabicServicesHubCopy,
    section: {
      navLabel: 'الخدمات', shortLabel: 'الخدمات', eyebrow: 'مرشدون · تنقلات · متابعة',
      title: 'مساعدة محلية تُحدث فرقًا في رحلتك.',
      description: 'مرشد خاص، تنقلات، اختيار الفنادق، تصميم المسار أو التنسيق: نكيّف المساعدة مع خطط رحلتك.',
      scopeTitle: 'أين تحتاج إلى مساعدة محلية؟',
      scope: ['هل تحتاج إلى مرشد خاص ليوم أكثر تعقيدًا؟', 'هل تحتاج إلى مساعدة في النقل أو الفنادق أو الحجوزات؟', 'هل تحتاج إلى جهة واحدة لتنسيق المسار كاملًا؟'],
    },
    serviceHref: id => hrefs[id], planningHref: '/ar/studio/', guidesHref: '/ar/guides/',
    feeLabel: `${new Intl.NumberFormat('ar-SA-u-ca-gregory-nu-latn').format(attractionReservationServiceFeeCny)} CNY`,
    schema: {
      '@context': 'https://schema.org', '@graph': [
        { '@type': 'CollectionPage', '@id': `${origin}${path}#webpage`, url: `${origin}${path}`, name: 'خدماتنا لرحلتك الخاصة إلى الصين', description: 'رحلات ومرشدون وحجوزات ومساعدة محلية لزيارتك إلى الصين. الإرشاد بالعربية غير مشمول في السعر.', inLanguage: 'ar', sameAs: languagePaths.map(item => `${origin}${item.path}`), mainEntity: { '@id': `${origin}${path}#services` } },
        { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${origin}/ar/` }, { '@type': 'ListItem', position: 2, name: 'الخدمات', item: `${origin}${path}` }] },
        { '@type': 'ItemList', '@id': `${origin}${path}#services`, numberOfItems: arabicServicesHubCopy.cards.length, itemListElement: arabicServicesHubCopy.cards.map((card,index) => ({ '@type': 'ListItem', position: index + 1, name: card.title, url: `${origin}${hrefs[card.id]}` })) },
      ],
    },
  };
  return <TravelServicesHubPage locale="en" edition={edition} />;
}
