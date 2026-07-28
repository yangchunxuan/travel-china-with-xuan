import type { HomegroundLocale } from "./homegroundI18n";
import type { MalaysiaZhangjiajieGuideCopy } from "./zhangjiajieFromMalaysiaGuide";
import { malaysiaZhangjiajieGuideCopyEn } from "./zhangjiajieFromMalaysiaGuideCopy.en";
import { malaysiaZhangjiajieGuideCopyKo } from "./zhangjiajieFromMalaysiaGuideCopy.ko";
import { malaysiaZhangjiajieGuideCopyZh } from "./zhangjiajieFromMalaysiaGuideCopy.zh";

const copies = {
  en: malaysiaZhangjiajieGuideCopyEn,
  zh: malaysiaZhangjiajieGuideCopyZh,
  ko: malaysiaZhangjiajieGuideCopyKo,
} as const satisfies Record<HomegroundLocale, MalaysiaZhangjiajieGuideCopy>;

export function getMalaysiaZhangjiajieGuideCopy(
  locale: HomegroundLocale,
): MalaysiaZhangjiajieGuideCopy {
  return copies[locale];
}
