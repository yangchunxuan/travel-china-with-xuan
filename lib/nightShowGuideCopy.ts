import type { HomegroundLocale } from "./homegroundI18n";
import { nightShowGuideEnglish } from "./nightShowGuideCopy.en";
import type { NightShowGuideCopy } from "./nightShowGuideCopy.types";
import { nightShowGuideChinese } from "./nightShowGuideCopy.zh";
import { nightShowGuideKorean } from "./nightShowGuideCopy.ko";

const nightShowGuideCopy: Record<HomegroundLocale, NightShowGuideCopy> = {
  en: nightShowGuideEnglish,
  zh: nightShowGuideChinese,
  ko: nightShowGuideKorean,
};

export function getNightShowGuideCopy(
  locale: HomegroundLocale,
): NightShowGuideCopy {
  return nightShowGuideCopy[locale];
}
