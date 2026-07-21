import type { HomegroundLocale } from "./homegroundI18n";
import { tenDayGuideChinese } from "./tenDayGuideCopy.zh";
import { tenDayGuideEnglish } from "./tenDayGuideCopy.en";
import { tenDayGuideKorean } from "./tenDayGuideCopy.ko";
import type { TenDayGuideCopy } from "./tenDayGuideCopy.types";

const guideCopy: Record<HomegroundLocale, TenDayGuideCopy> = {
  en: tenDayGuideEnglish,
  zh: tenDayGuideChinese,
  ko: tenDayGuideKorean,
};

export function getTenDayGuideCopy(locale: HomegroundLocale): TenDayGuideCopy {
  return guideCopy[locale];
}
