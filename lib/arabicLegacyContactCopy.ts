/** Shared by the legacy page and client contact adapters; contains no pricing or itinerary data. */
export const arabicLegacyZhangjiajieContactTitle = 'رحلة خاصة إلى تشانغجياجيه: 4 أيام مع الجسر الزجاجي وجبل تيانمن';
export const arabicLegacyStayNames = {
  'selected-city-stay': 'فندق في المدينة',
  'spacious-premium-stay': 'إقامة فسيحة من فئة راقية',
  'distinctive-mountain-stay': 'إقامة جبلية ذات طابع مميّز',
} as const;
const stayIdByContractName = { 'Selected City Stay': 'selected-city-stay', 'Spacious Premium Stay': 'spacious-premium-stay', 'Distinctive Mountain Stay': 'distinctive-mountain-stay' } as const;
export function arabicLegacyDraftStayName(value: string | null | undefined): string | null {
  const id = value ? stayIdByContractName[value as keyof typeof stayIdByContractName] : null;
  return id ? arabicLegacyStayNames[id] : null;
}
