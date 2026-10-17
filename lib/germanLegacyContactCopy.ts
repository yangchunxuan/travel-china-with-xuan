/** Shared by the legacy page and client contact adapters; contains no pricing or itinerary data. */
export const germanLegacyZhangjiajieContactTitle = 'Zhangjiajie-Privatreise: 4 Tage mit Glasbrücke und Tianmen';
export const germanLegacyStayNames = {
  'selected-city-stay': 'Stadthotel',
  'spacious-premium-stay': 'Geräumige Unterkunft der gehobenen Kategorie',
  'distinctive-mountain-stay': 'Charaktervolle Unterkunft in den Bergen',
} as const;
const stayIdByContractName = { 'Selected City Stay': 'selected-city-stay', 'Spacious Premium Stay': 'spacious-premium-stay', 'Distinctive Mountain Stay': 'distinctive-mountain-stay' } as const;
export function germanLegacyDraftStayName(value: string | null | undefined): string | null {
  const id = value ? stayIdByContractName[value as keyof typeof stayIdByContractName] : null;
  return id ? germanLegacyStayNames[id] : null;
}
