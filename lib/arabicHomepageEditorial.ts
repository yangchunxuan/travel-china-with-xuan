import { getHomepagePrivateTourItems, type HomepagePrivateTourItem } from './homepagePrivateTourCatalog';
import { getHomepageGuideChapters, type HomepageGuideChapter } from './homepageEditorial';
import { buildPrivateTourDetailHref } from './privateTourInquiryContext';
import { getArabicTourCatalog } from './arabicTourCatalog';

const tourAppeals: Readonly<Record<string, { appeal: string; alt: string }>> = {
  'beijing-xian-chengdu-guilin-shanghai-13-day-private-tour': {
    appeal: 'سور الصين العظيم وجيش التيراكوتا والباندا ونهر لي وشنغهاي في رحلة خاصة لمدة 13 يومًا.',
    alt: 'زوار على سور الصين العظيم في موتيانيو',
  },
  'beijing-highlights-5-day-private-tour': {
    appeal: 'ثلاثة أيام للجولات تشمل سور بادالينغ والمدينة المحرمة، رهنًا بتأكيد الحجوزات، مع العودة إلى الفندق نفسه كل مساء.',
    alt: 'المحور الإمبراطوري ومباني بكين التاريخية',
  },
  'suzhou-tongli-hangzhou-shanghai-12-day-private-tour': {
    appeal: 'حدائق سوتشو وليلة في بلدة تونغلي المائية، ثم البحيرة الغربية ومزارع الشاي وخمس ليالٍ لاستكشاف أحياء شنغهاي ومتاحفها.',
    alt: 'البحيرة الغربية وتلال هانغتشو المشجّرة',
  },
  'chengdu-pandas-sanxingdui-5-day-private-tour': {
    appeal: 'زيارة الباندا صباحًا، ومعظم يوم في متحف سانشينغدوي، ووقت للشاي في حديقة الشعب، مع الإقامة في الفندق نفسه في تشنغدو.',
    alt: 'باندا في مركز الأبحاث في تشنغدو',
  },
  'xian-terracotta-warriors-5-day-private-tour': {
    appeal: 'استكشف سور شيان، وخصّص يومًا لجيش التيراكوتا وقصر هوا تشينغ، ثم زر المسجد الكبير والحي الإسلامي بصحبة مرشد.',
    alt: 'سور شيان وأسطح مبانيها التاريخية',
  },
  'guilin-yangshuo-5-day-private-tour': {
    appeal: 'أبحر في نهر لي بين جبال الكارست إلى يانغشو، وأقم فيها ليلتين مع يوم كامل لمناظر نهر يولونغ.',
    alt: 'طوافات الخيزران على نهر يولونغ عند سفح جبال الكارست في يانغشو',
  },
};

const serviceLabels: Readonly<Record<string, string>> = {
  'With hotels and breakfast': 'الفنادق والإفطار مشمولان',
  'Self-guided · private driver & remote support': 'دون مرشد مرافق في الموقع',
  'Private tour': 'رحلة خاصة',
};

/** Keep the original six routes, their order, photos, price basis and selection URLs. */
export function getArabicHomepageProducts(): readonly HomepagePrivateTourItem[] {
  const catalog = new Map(getArabicTourCatalog().map(tour => [tour.slug, tour]));
  return getHomepagePrivateTourItems('en').map(item => {
    const tour = catalog.get(item.id);
    const copy = tourAppeals[item.id];
    if (!tour || !copy) throw new Error(`Missing Arabic homepage tour: ${item.id}`);
    const selectedPackage = tour.packages.find(option => option.id === item.startingPrice?.selection?.packageId);
    const startingRow = selectedPackage?.rows.find(row => row.travelers === item.startingPrice?.travelers);
    const twoTravellerRow = selectedPackage?.rows.find(row => row.travelers === 2);
    if (item.startingPrice && (!startingRow || !serviceLabels[item.startingPrice.serviceLabel])) {
      throw new Error(`Missing Arabic homepage price or service label: ${item.id}`);
    }
    if (item.twoTravellerPrice && !twoTravellerRow) throw new Error(`Missing Arabic couple price: ${item.id}`);
    return {
      ...item,
      title: tour.title,
      appeal: copy.appeal,
      href: item.startingPrice?.selection && !item.twoTravellerPrice
        ? buildPrivateTourDetailHref(tour.path, tour.slug, item.startingPrice.selection)
        : `/ar${item.href}`,
      image: { ...item.image, alt: copy.alt },
      startingPrice: item.startingPrice && startingRow ? {
        ...item.startingPrice,
        formatted: startingRow.formatted,
        serviceLabel: serviceLabels[item.startingPrice.serviceLabel],
      } : null,
      ...(item.twoTravellerPrice && twoTravellerRow ? { twoTravellerPrice: { formatted: twoTravellerRow.formatted } } : {}),
    };
  });
}

const guideTitles: Readonly<Record<string, string>> = {
  'is-your-china-itinerary-too-rushed': 'هل برنامج رحلتك إلى الصين مزدحم أكثر من اللازم؟',
  'china-regional-food-route': 'كيف تخطّط لرحلة تستكشف فيها مطابخ الصين الإقليمية؟',
  'china-itinerary-with-older-parents': 'السفر إلى الصين مع الوالدين الأكبر سنًا: ما الوتيرة المناسبة؟',
  'beijing-south-station-to-capital-or-daxing-airport': 'من محطة بكين الجنوبية إلى مطار داشينغ أو العاصمة',
  'guilin-airport-or-railway-station-arrival-guide': 'الوصول إلى غويلين: أي مطار أو محطة يناسبك؟',
  'shenzhen-airport-railway-station-border-port-selector': 'الوصول إلى شنتشن: المطار أم محطة القطار أم المعبر الحدودي؟',
  'zhangjiajie-city-or-wulingyuan-hotel-base': 'أين تقيم: مدينة تشانغجياجيه أم وولينغيوان؟',
  'beijing-where-to-stay-first-trip': 'زيارتك الأولى إلى بكين: أي حي تختار؟',
  'yangshuo-town-or-yulong-river-where-to-stay': 'يانغشو: الإقامة قرب المركز أم في ريف نهر يولونغ؟',
};

/** Untranslated articles remain in English; only use an existing Arabic equivalent. */
export function getArabicHomepageGuideChapters(): readonly HomepageGuideChapter[] {
  return getHomepageGuideChapters('en').map(chapter => ({
    ...chapter,
    guides: chapter.guides.map(guide => {
      const title = guideTitles[guide.id];
      if (!title) throw new Error(`Missing Arabic homepage guide label: ${guide.id}`);
      if (guide.id === 'yangshuo-town-or-yulong-river-where-to-stay') return { ...guide, title, eyebrow: 'نصائح سفر عملية', href: '/ar/guides/yangshuo-town-or-yulong-river-where-to-stay/', linkLabel: 'اقرأ المقال بالعربية' };
      return { ...guide, title, eyebrow: 'نصائح سفر عملية', linkLabel: 'اقرأ المقال بالإنجليزية' };
    }),
  }));
}
