import { buildPrivateTourDetailHref } from '../lib/privateTourInquiryContext';
import { PrivateToursHubPage, type PrivateToursHubEdition } from './PrivateToursHubPage';
import { ArabicSiteHeader, ArabicSiteFooter } from './ArabicChrome';
import { getArabicTourCatalog } from '../lib/arabicTourCatalog';
import { getPublishedPrivateTourCatalog, type PublishedPrivateTourCatalogItem } from '../lib/publishedPrivateTourCatalog';
import { getPrivateTourFacets } from '../lib/privateTourCatalogFacets';
import { arabicLanguagePaths, arabicGuideLanguageNote, arabicGuideLanguageBadge, arabicPublishedPriceNote } from '../lib/arabicSite';
import { arabicLegacyTourCards, arabicHalfDaySlug, arabicLegacyZhangjiajieSlug } from '../lib/arabicLegacyTours';

const placeNames: Readonly<Record<string,string>> = {
'Shanghai': 'شنغهاي',
'Suzhou': 'سوتشو',
'Hangzhou': 'هانغتشو',
'Chengdu': 'تشنغدو',
'Sanxingdui': 'سانشينغدوي',
'Dujiangyan': 'دوجيانغيان',
'Xi’an': 'شيآن',
'Chongqing': 'تشونغتشينغ',
'Wulong': 'وولونغ',
'Guilin': 'غويلين',
'Yangshuo': 'يانغشو',
'Harbin': 'هاربين',
'Zhujiajiao': 'تشوجياجياو',
'Zhangjiajie': 'تشانغجياجيه',
'Yuanjiajie': 'يوانجياجيه',
'Fenghuang': 'فنغهوانغ',
'Jiuzhaigou': 'جيوتشايغو',
'Huanglong': 'هوانغلونغ',
'Kunming': 'كونمينغ',
'Dali': 'دالي',
'Lijiang': 'ليجيانغ',
'Guiyang': 'غوييانغ',
'Huangguoshu': 'هوانغقوشو',
'Libo': 'ليبو',
'Xijiang': 'شيجيانغ',
'Zhenyuan': 'تشنيوان',
'Xiamen': 'شيامن',
'Gulangyu': 'غولانغيو',
'Yongding': 'يونغدينغ',
'Nanjing': 'نانجينغ',
'Anxi': 'آنشي',
'Quanzhou': 'تشوانتشو',
'Shantou': 'شانتو',
'Chaozhou': 'تشاوتشو',
'Leshan': 'ليشان',
'Dazu': 'داتسو',
'Shunde': 'شونده',
'Foshan': 'فوشان',
'Huangshan': 'هوانغشان',
'Hongcun': 'هونغتسون',
'Jingdezhen': 'جينغدتشن',
'Wuyuan': 'وويوان',
'Sanqingshan': 'سانتشينغشان',
'Yanji': 'يانجي',
'Zhengzhou': 'تشنغتشو',
'Kaifeng': 'كايفنغ',
'Dengfeng': 'دنغفنغ',
'Luoyang': 'لويانغ',
'Datong': 'داتونغ',
'Pingyao': 'بينغياو',
'Taiyuan': 'تاييوان',
'Zhangye': 'تشانغيه',
'Jiayuguan': 'جيايوغوان',
'Dunhuang': 'دونهوانغ',
'Yichang': 'ييتشانغ',
'Yining': 'يينينغ',
'Tekes': 'تكيس',
'Nalati': 'نالاتي',
'Hailar': 'هايلار',
'Erguna': 'إرغونا',
'Manzhouli': 'مانتشولي',
'Jianshui': 'جيانشوي',
'Yuanyang': 'يوانيانغ',
'Shenzhen': 'شنتشن',
'Huaqiangbei': 'هواشيانغبي',
'Turpan': 'توربان',
'Shangri-La': 'شانغريلا',
'Longji': 'لونغجي',
'Hong Kong': 'هونغ كونغ',
'Yabuli': 'يابولي',
'Mohe': 'موخه',
'Beihong': 'بيهونغ',
'Tongli': 'تونغلي',
'Wulingyuan': 'وولينغيوان',

 'Beijing':'بكين', "Xi'an":'شيان','Guangzhou':'غوانغجو','Panda Base':'مركز الباندا','Terracotta Warriors':'جيش التيراكوتا','City Wall':'سور المدينة','Muslim Quarter':'الحي الإسلامي','Three Natural Bridges':'الجسور الطبيعية الثلاثة','Li River':'نهر لي','Songhua River':'نهر سونغهوا','Ice and Snow World':'عالم الجليد والثلج','Suzhou day trip':'سوتشو (رحلة يومية)','Forbidden City':'المدينة المحرمة','Great Wall':'سور الصين العظيم','Golden Whip Stream':'جدول السوط الذهبي','Tianmen Mountain':'جبل تيانمن','Furong Town':'فورونغ',"Nan'ao Island":'جزيرة ناناو','Huizhou villages':'قرى هويتشو','Wangxian Valley':'وادي وانغشيان','Changbaishan Resort':'منتجع تشانغبايشان','North Slope':'المنحدر الشمالي','Shanghai Disneyland':'ديزني لاند شنغهاي','Hanging Temple':'المعبد المعلّق','Yangtze Three Gorges':'المضائق الثلاثة لنهر اليانغتسي','Urumqi':'أورومتشي','Sayram Lake':'بحيرة سايرام','Mergel River':'نهر ميرغيل','Stone Forest':'الغابة الحجرية','Science and Technology Museum':'متحف العلوم والتكنولوجيا','Yangtze River':'نهر اليانغتسي','Yangtze':'اليانغتسي','Snow Town':'شيويشيانغ','Changbai Mountain':'جبل تشانغباي','Arctic Village':'القرية القطبية','Wanda Resort':'منتجع واندا','Glass Bridge':'الجسر الزجاجي',
};
const arRoute=(route:string)=>route.split(' · ').map(place=>placeNames[place]??place).join(' · ');
const money=(amount:number,currency:string)=>new Intl.NumberFormat('ar-SA-u-ca-gregory-nu-latn',{style:'currency',currency,currencyDisplay:'code',maximumFractionDigits:0}).format(amount);
const firstSentence=(text:string)=>text.match(/^.*?[.!?](?:\s|$)/u)?.[0]?.trim()??text;
const guideLabels:Readonly<Record<string,string>>={
 'English-speaking guide':'مرشد ناطق بالإنجليزية',
 'English-speaking guide on land':'مرشد ناطق بالإنجليزية على اليابسة',
 'English guide or no on-site guide':'مرشد ناطق بالإنجليزية أو خيار دون مرشد في الموقع',
 'Guide language confirmed in quote':'لغة المرشد تُؤكّد في عرض السعر',
 'English-speaking driver-host':'سائق مضيف يتحدث الإنجليزية',
};

/** Source catalogue order, amounts, party-size entry and currency are retained. */
export function getArabicPublishedTourCatalog(): readonly PublishedPrivateTourCatalogItem[] {
 const translated = new Map(getArabicTourCatalog().map(tour=>[tour.slug,tour]));
 const products = getPublishedPrivateTourCatalog('en').map(source=>{
  const tour=translated.get(source.slug);
  const legacy=arabicLegacyTourCards.find(item=>item.slug===source.slug);
  if(!tour&&!legacy) throw new Error(`Missing Arabic catalogue copy: ${source.slug}`);
  const starting = source.startingPrice;
  const packageLabel=tour?.packages.find(p=>p.id===starting?.selection?.packageId)?.label;
  const guide = source.slug===arabicLegacyZhangjiajieSlug
   ? 'مرشد ناطق بالإنجليزية في اليومين 2 و3. الإرشاد بالعربية غير مشمول في السعر.'
   : `${guideLabels[source.guideLanguage] ?? (()=>{throw new Error(`Missing Arabic guide label: ${source.guideLanguage}`)})()}. ${arabicGuideLanguageBadge}`;
  const validity=source.slug==='harbin-winter-5-day-private-tour'
   ? 'للوصول من الأحد إلى الخميس، من 6 يناير إلى 5 فبراير 2027، باستثناء العطلات وبعد افتتاح المعالم الجليدية الرئيسية.'
   : source.slug===arabicLegacyZhangjiajieSlug ? 'الأسعار المنشورة من 6 سبتمبر إلى 30 ديسمبر 2026 (UTC+8)؛ يلزم تأكيدها لمواعيد رحلتك.' : undefined;
  return {...source,title:tour?.title??legacy!.title,description:tour?.metadataDescription??legacy!.summary,href:tour?.path??legacy!.path,startingPriceHref:starting?.selection&&!source.twoTravellerPrice
    ? buildPrivateTourDetailHref(tour?.path??legacy!.path,source.slug,starting.selection)
    : `/ar${source.startingPriceHref}`,
   image:{...source.image,alt:tour?.heroImage.alt??legacy!.image.alt},
   comparison:{route:arRoute(source.comparison.route),appeal:firstSentence(tour?.lede??legacy!.summary),pace:firstSentence(tour?.hotelNote??'ثلاث ليالٍ ضمن فئة الإقامة المختارة؛ يُؤكد الفندق والغرفة لمواعيد رحلتك.'),fit:tour ? firstSentence(tour.summary) : 'زيارة أولى لمنتزه الغابات والجسر الزجاجي وجبل تيانمن.',highlights:tour?.highlights??['منتزه الغابات','الجسر الزجاجي','جبل تيانمن']},
   startingPrice:starting?{...starting,formatted:money(starting.amount,starting.currency),serviceLabel:packageLabel??'فندق في المدينة · مرشد ناطق بالإنجليزية في اليومين 2 و3',...(validity?{validityNote:validity}:{})}:null,
   ...(source.twoTravellerPrice?{twoTravellerPrice:{...source.twoTravellerPrice,formatted:money(source.twoTravellerPrice.amount,source.twoTravellerPrice.currency)}}:{}),guideLanguage:guide,
  };
 });
 const half=arabicLegacyTourCards[1];
 return [...products,{id:half.slug,slug:half.slug,source:'structured-tour',title:half.title,description:half.summary,days:half.days,nights:half.nights,href:half.path,startingPriceHref:half.path,paths:{en:`/tours/${half.slug}/`,zh:`/zh/tours/${half.slug}/`,ko:`/ko/tours/${half.slug}/`},image:half.image,comparison:{route:'شيان · جيش التيراكوتا',appeal:'زيارة خاصة للمتحف بسيارة وسائق، مع مرشد ناطق بالإنجليزية مستقل عن السائق.',pace:'نحو 5–6 ساعات من الفندق وإليه، منها 2.5–3 ساعات في المتحف.',fit:'استكشف جيش التيراكوتا دون حجز رحلة تستغرق عدة أيام.',highlights:['نقل خاص','مرشد ناطق بالإنجليزية داخل المتحف','تذاكر بالاسم الوارد في جواز السفر']},startingPrice:null,hasServiceChoice:false,guideLanguage:`مرشد ناطق بالإنجليزية داخل المتحف. ${arabicGuideLanguageBadge}`,shoppingStops:false,dateModified:products[0].dateModified}];
}

export function ArabicToursHubPage(){
 const products=getArabicPublishedTourCatalog();
 const count=products.length;
 const sourceFacets=getPrivateTourFacets(products,'en','حسب عرض السعر');
 const regionLabels:Record<string,string>={east:'شرق الصين',southwest:'جنوب غرب الصين',south:'جنوب الصين',north:'شمال الصين وشمال غربها',northeast:'شمال شرق الصين',central:'وسط الصين',multi:'عدة مناطق'};
 const lengthLabels:Record<string,string>={short:'من نصف يوم إلى 5 أيام',medium:'6 أيام',long:'7–21 يومًا'};
 const priceLabels:Record<string,string>={low:'أقل من 550 USD',mid:'550–1,000 USD',high:'أكثر من 1,000 USD',quote:'حسب عرض السعر'};
 const edition:PrivateToursHubEdition={
  language:'ar',products,home:{path:'/ar/',skipLink:'انتقل إلى الرحلات'},
  header:<ArabicSiteHeader currentPath="/ar/tours/" languagePaths={arabicLanguagePaths('/tours/','/ar/tours/')}/>,footer:<ArabicSiteFooter currentPath="/ar/tours/"/>,
  facets:{...sourceFacets,regions:sourceFacets.regions.map(o=>({...o,label:regionLabels[o.id]})),lengths:sourceFacets.lengths.map(o=>({...o,label:lengthLabels[o.id]})),prices:sourceFacets.prices.map(o=>({...o,label:priceLabels[o.id]}))},
  plannerPath:'/ar/#planner-contact',originalImageSlugs:[arabicHalfDaySlug],
  copy:{htmlLang:'ar',path:'/ar/tours/',metadata:{title:'رحلات خاصة إلى الصين: المسارات والأسعار',description:`قارن ${count} رحلة وجولة في الصين: المحطات والفنادق والأسعار والخدمات. الإرشاد بالعربية غير مشمول في السعر.`,openGraphTitle:`${count} طريقة لاستكشاف الصين`},breadcrumbLabel:'التنقّل بين الصفحات',breadcrumbHome:'الرئيسية',breadcrumbCurrent:'الرحلات',eyebrow:`${count} رحلة وجولة في الصين`,title:'الصين بالطريقة التي تناسبك.',introduction:'أيام في منطقة واحدة أو رحلة عبر البلاد: قارن المحطات ووتيرة السفر والأسعار. توضّح كل رحلة الخدمات المشمولة التي يُبنى عليها عرض السعر.',heroAction:`قارن ${count} مسارًا`,quickCompareEyebrow:'جميع المسارات',quickCompareTitle:'اعثر على الرحلة التي تناسبك.',quickCompareIntroduction:'قارن المدة والمحطات والإقامة والأسعار لمجموعتك.',priceBasisNote:`${arabicPublishedPriceNote} ${arabicGuideLanguageNote}`,quickFitLabel:'لمن تناسب هذه الرحلة؟',quickMovementLabel:'الإقامة ووتيرة السفر',quickAction:'اطّلع على المسار',catalogEyebrow:'جميع الرحلات',catalogTitle:`${count} طريقة لاستكشاف الصين.`,catalogIntroduction:'افتح صفحة الرحلة للاطّلاع على البرنامج اليومي والخدمات والخيارات.',tourCount:(n:number)=>`${n} مسارًا منشورًا`,duration:(days:number,nights:number)=>days<1?'نصف يوم':`الأيام: ${days} · الليالي: ${nights}`,startingPriceLabel:'ابتداءً من',quoteOnlyLabel:'حسب عرض السعر',quoteOnlyBody:'بحسب المواعيد والغرف والمجموعة',perPersonLabel:'لكل شخص',groupBasis:(n:number)=>`لمجموعة من ${n} مسافرين`,twinShareBasis:'عند مشاركة غرفة مزدوجة',partySize:(n:number)=>`${n} مسافرين`,perPersonPriceNote:'الأسعار لكل شخص',paceLabel:'الوتيرة والإقامة',fitLabel:'لمن تناسب هذه الرحلة؟',highlightsLabel:'أبرز الزيارات',viewLabel:'اطّلع على هذه الرحلة',finalEyebrow:'هل بدأت تتضح فكرة رحلتك؟',finalTitle:'لنتحدث عن رحلتك.',finalBody:'أخبرنا بالمواعيد وعدد المسافرين والمسارات التي تهمك. نتحقق من التعديلات الممكنة قبل إرسال عرض مكتوب. الرحلات ذات البرنامج الثابت تحتفظ بخدماتها المنشورة.',finalAction:'خطّط للرحلة',statsRoutes:'مسارات منشورة',statsRegions:'مناطق للاستكشاف',statsLengths:'المدة بالأيام',statsShopping:'رحلات تتضمن توقفات تسوّق مذكورة',filterGroupLabel:'تصفية الرحلات',filterRegionLabel:'المنطقة',filterLengthLabel:'المدة',filterPriceLabel:'السعر الابتدائي (USD)',filterAll:'الكل',filterReset:'إعادة ضبط الفلاتر',filterCount:'{shown} من أصل {total} مسارًا',filterEmpty:'لا توجد رحلة مطابقة لهذه المعايير. جرّب توسيع البحث.'},
  priorityCopy:{eyebrow:'من أين تبدأ؟',title:'طرق مختلفة للتعرّف على الصين.',introduction:'من أبرز محطات الزيارة الأولى إلى أيام أهدأ في جيانغنان: ابدأ بما يثير اهتمامك.'},
  priorityReasons:{'beijing-xian-shanghai-8-day-private-tour':'ثلاث محطات رئيسية للتعرّف على الصين في ثمانية أيام.','beijing-xian-chengdu-guilin-shanghai-13-day-private-tour':'تاريخ إمبراطوري وباندا ومناظر الجنوب، مع المرافقة المناسبة لكل محطة.','beijing-xian-chengdu-guilin-shanghai-14-day-private-tour':'أربعة عشر يومًا في رحلة خاصة من بكين عبر تشنغدو وغويلين إلى شنغهاي.','beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour':'معالم تاريخية بارزة ومناظر طبيعية مميّزة في تشانغجياجيه وغويلين.','beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour':'رحلة بمجموعة صغيرة وفق مواعيد الانطلاق والشروط المنشورة.','suzhou-tongli-hangzhou-shanghai-12-day-private-tour':'حدائق وقنوات وشاي وأحياء: اثنا عشر يومًا لاستكشاف جيانغنان بهدوء.'},
  arrivalPlanning:{eyebrow:'قبل الحجز',title:'استعد لرحلتك إلى الصين.',introduction:'تبدأ رحلاتنا داخل الصين. اختر المسار، ثم نؤكد كتابةً نقطة اللقاء والتنقلات والخدمات المناسبة لمواعيدك ومجموعتك.',questions:[{title:'أين تبدأ الرحلة؟',body:'الرحلات الجوية الدولية غير مشمولة. أخبرنا بمدينة المغادرة والرحلات الجوية المخططة. نراجع الاستقبال ونقل الوصول وبرنامج اليوم الأول قبل الحجز.'},{title:'كيف أقارن الأسعار؟',body:'تبقى الأسعار بالعملة المعروضة، USD أو CNY، دون تحويل إلى الريال السعودي أو الدرهم الإماراتي. تُحسب بعض مبالغ الدولار من السعر الأساسي باليوان، بينما تُسعّر خيارات أخرى بالدولار مباشرة. قارن أيضًا عدد المسافرين وإشغال الغرف. يوضّح عرض السعر عملة الدفع وسعر الصرف المعتمد والإجمالي.'},{title:'هل الإرشاد بالعربية مشمول؟',body:'لا. تشمل الأسعار المنشورة المرافقة المذكورة في الخيار المختار. إذا أردت مرشدًا ناطقًا بالعربية، فيجب تأكيد التوافر والسعر المنفصل قبل الحجز. راجع أيام الإرشاد: تتوفر في بكين أيضًا باقة دون مرشد، ورحلة تشانغجياجيه الكلاسيكية تشمل مرشدًا ناطقًا بالإنجليزية في اليومين 2 و3 فقط.'},{title:'ماذا عن الأطفال أو السفر بوتيرة أهدأ؟',body:'أخبرنا بأعمار الأطفال ووتيرة المشي والسلالم التي تفضّل تجنبها والغرف المطلوبة. نراجع الإمكانات قبل تقديم العرض. تحتفظ المسارات الثابتة بالزيارات وخدمات النقل المنشورة.'}],preparationLabel:'قبل المغادرة',links:[{href:'/ar/guides/china-entry-requirements/',label:'متطلبات دخول الصين'},{href:'/ar/services/',label:'اختر المساعدة المناسبة'},{href:'/ar/guides/',label:'نصائح قبل الحجز'}]},
 };
 return <PrivateToursHubPage locale="en" edition={edition}/>;
}
