import { getHomegroundLegalCopy, type HomegroundLegalCopy, type HomegroundLegalPageId } from './homegroundLegalI18n';
import type { HomegroundPrivacyCopy } from './homegroundPrivacyI18n';
import { getArabicLegalCopy } from './arabicLegalCopy';
import { homegroundBusiness as business } from './homegroundBusiness';
import { travelAgencyCertificateHolder as certificates } from './homegroundTravelAgencyCredentials';

/** Localized content for the original legal components, with their structure intact. */
export function getArabicLegalLayoutCopy(pageId: HomegroundLegalPageId): HomegroundLegalCopy {
  const source = getHomegroundLegalCopy(pageId, 'en');
  const base: HomegroundLegalCopy = {
    ...source, htmlLang: 'ar', pagePath: `/ar/${pageId}/`, homePath: '/ar/', languageShort: "العربية",
    skipLink: "انتقل إلى المحتوى",
    navigation: { homeLabel: "الصفحة الرئيسية لـ Homeground China", languageLabel: "لغة الصفحة", pageLabel: "المعلومات القانونية", homeCta: "مناقشة رحلتي" },
    relatedLabel: "معلومات عن الشركة وخدماتنا",
    related: { business: "بيانات الشركة", terms: "شروط الاستخدام والخدمات", refund: "الاسترداد والتسليم", privacy: "الخصوصية", contact: "تواصل معنا" },
  };
  if (pageId !== 'business-information') {
    const copy = getArabicLegalCopy(pageId);
    return { ...base, metadata: copy.metadata, navigation: { ...base.navigation, pageLabel: copy.hero.eyebrow }, hero: { ...copy.hero, reviewedLabel: "آخر مراجعة للنص الأصلي" }, callout: copy.callout, sections: copy.sections };
  }
  return {
    ...base,
    metadata: { title: "بيانات شركة Homeground China وترخيصها", description: "الشركة المشغّلة لـ Homeground China وتسجيلها وترخيص وكالة السفر ونسخ الوثائق والتأكيد قبل الدفع." },
    hero: { eyebrow: "بيانات الشركة", title: "من يقف وراء Homeground؟", intro: "Homeground علامة للسفر إلى الصين تديرها شركة سفر مسجلة قانوناً في بكين بالبر الرئيسي الصيني. يشمل ترخيصها السياحة الداخلية والسياحة الوافدة للمسافرين من الخارج.", reviewedLabel: "آخر مراجعة للنص الأصلي", reviewedValue: "15 سبتمبر 2026" },
    callout: { label: "وضوح من البداية", title: "شركة يمكن التحقق منها وخدمات محددة قبل الدفع.", body: "أخبرونا بخطط سفركم. نوضح احتياجاتكم والخطوات التالية كتابةً. ولكل خدمة مقبولة، يُذكر المحتوى والسعر والنطاق والموعد وترتيبات الدفع قبل الدفع." },
    sections: [
      { id: 'registered-details', title: "بيانات التسجيل", facts: [
        { label: "الاسم المسجل", value: business.registeredName },
        { label: "رمز الائتمان الاجتماعي الموحد", value: business.unifiedSocialCreditCode },
        { label: "الممثل القانوني", value: business.legalRepresentative },
        { label: "العنوان المسجل", value: business.registeredAddress },
        { label: "جهة التسجيل", value: business.registrationAuthority },
        { label: "تاريخ التأسيس", value: business.registrationDate },
        { label: "السجل الرسمي", value: "النظام الوطني الصيني للمعلومات الائتمانية للشركات", detail: `ابحثوا في هذا الموقع باللغة الصينية عن الرمز ${business.unifiedSocialCreditCode}.`, href: business.registryUrl, external: true },
      ] },
      { id: 'travel-agency-credentials', title: "الترخيص ووثائق الشركة", paragraphs: ["تمتلك الشركة التي تدير Homeground الوثائق التالية للسياحة الداخلية والسياحة الوافدة في الصين."], facts: [
        { label: "الشركة المشغّلة", value: business.registeredName, detail: business.englishName },
        { label: "رمز الائتمان الاجتماعي الموحد", value: business.unifiedSocialCreditCode },
        { label: "رقم ترخيص وكالة السفر", value: business.travelAgencyLicenceNumber },
        { label: "مرجع الموافقة", value: business.travelAgencyPermitDocumentNumber },
        { label: "الأنشطة المرخصة", value: "السياحة الداخلية في الصين والسياحة الوافدة" },
        { label: "ترخيص وكالة السفر", value: "عرض الترخيص", href: certificates.travelAgencyLicencePath },
        { label: "الرخصة التجارية", value: "عرض الرخصة التجارية", href: certificates.businessLicencePath },
        { label: "التحقق من ترخيص السياحة", value: "وزارة الثقافة والسياحة الصينية", detail: "ابحثوا في هذا الموقع باللغة الصينية عن اسم الشركة الصيني المذكور أعلاه.", href: business.travelAgencyRegistryUrl, external: true },
        { label: "التحقق من التسجيل", value: "النظام الوطني الصيني للمعلومات الائتمانية للشركات", detail: `ابحثوا في هذا الموقع باللغة الصينية عن الرمز ${business.unifiedSocialCreditCode}.`, href: business.registryUrl, external: true },
      ] },
      { id: 'current-services', title: "الخدمات المتاحة حالياً", cards: [{ title: "تخطيط السفر والدعم على الأرض", body: "شاركوا Homeground خطتكم الكاملة. نبدأ بالتواريخ والمسافرين والأولويات والدعم المطلوب، ثم نحدد الخدمات ومقترحاً قابلاً للتنفيذ." }], paragraphs: ["لم نعد نقدم مراجعة مسارات السفر أو إعدادها كخدمات مدفوعة مستقلة. وتظل الخدمات المقبولة سابقاً خاضعة لاتفاقها المكتوب الأصلي. بالنسبة إلى الرحلات الخاصة، يُؤكَّد المسار والخدمات المشمولة والسعر وشروط الدفع كتابةً قبل الحجز."] },
      { id: 'how-it-starts', title: "خطوات استفساركم", numbered: ["شاركوا خطط سفركم مجاناً.", "توضح Homeground احتياجاتكم والخدمات التي يقدمها الفريق.", "قبل الدفع، تتلقون تأكيداً مكتوباً يتضمن المشغّل والخدمة والسعر والعملة والخدمات المشمولة والمعلومات المطلوبة وموعد التسليم والشروط السارية.", "تُرسل تعليمات الدفع بشكل منفصل.", "تبدأ الخدمات المتفق عليها بعد تأكيد الدفع واستلام جميع المعلومات المطلوبة."] },
      { id: 'payment-records', title: "الدفع وبيانات التواصل", paragraphs: ["لا ترسلوا بيانات البطاقة أو بيانات الدخول إلى البنك أو رموز QR للدفع عبر نموذج الموقع. قبل الدفع، تحققوا من مطابقة المستلم للتأكيد المكتوب. وتُوضَّح خيارات الفاتورة أو الإيصال قبل الدفع."], facts: [{ label: "أسئلة عن الخدمات أو بياناتكم", value: business.serviceEmail, href: `mailto:${business.serviceEmail}` }, { label: "العنوان المسجل", value: business.registeredAddress }] },
    ],
  };
}

/** Map the already reviewed full Arabic notice onto the original privacy layout. */
export function getArabicPrivacyLayoutCopy(): HomegroundPrivacyCopy {
  const copy = getArabicLegalCopy('privacy');
  function section(id: string) {
    const item = copy.sections.find(s => s.id === id);
    if (!item) throw new Error(`Missing Arabic privacy section: ${id}`);
    return item;
  }
  function rows(id: string, eyebrow: string) {
    const item = section(id);
    return { eyebrow, title: item.title, intro: item.paragraphs?.join(' ') ?? "", rows: (item.facts ?? []).map(f => ({ label: f.label, value: f.value, detail: f.detail ?? "" })) };
  }
  const flow = section('current-flow'), collection = section('collection'), choices = section('choices'), contact = section('contact');
  return {
    htmlLang: 'ar', pagePath: '/ar/privacy/', homePath: '/ar/', languageShort: "العربية", metadata: copy.metadata, skipLink: "انتقل إلى إشعار الخصوصية",
    navigation: { homeLabel: "الصفحة الرئيسية لـ Homeground China", languageLabel: "لغة الإشعار", privacyLabel: "الخصوصية", homeCta: "مناقشة رحلتي" },
    hero: { ...copy.hero, reviewedLabel: "آخر مراجعة للنص الأصلي" },
    status: { eyebrow: copy.callout!.label, title: copy.callout!.title, body: copy.callout!.body, blockersTitle: "أهم النقاط", blockers: copy.callout!.bullets ?? [] },
    currentFlow: { title: flow.title, paragraphs: flow.paragraphs ?? [] },
    collection: { eyebrow: "المعلومات المجمعة", title: collection.title, intro: collection.paragraphs?.join(' ') ?? "", items: (collection.facts ?? []).map(f => ({ name: f.label, stage: f.value, purpose: f.detail ?? "" })) },
    reservation: rows('attraction-reservations', "الحجوزات المقبولة"), providers: rows('providers', "مزودو الخدمات"), configuration: rows('configuration', "التخزين والوصول"),
    choices: { eyebrow: "خياراتكم", title: choices.title, paragraphs: choices.paragraphs ?? [], items: choices.bullets ?? [] },
    contact: { eyebrow: "بياناتكم الشخصية", title: contact.title, body: contact.paragraphs?.join(' ') ?? "", emailLabel: "بريد الخصوصية", emailPlaceholder: business.serviceEmail, addressLabel: "العنوان المسجل", addressPlaceholder: business.registeredAddress },
    footer: section('scope').paragraphs?.join(' ') ?? "",
  };
}
