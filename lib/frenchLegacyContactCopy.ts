/** Shared by the legacy page and client contact adapters; contains no pricing or itinerary data. */
export const frenchLegacyZhangjiajieContactTitle = 'Zhangjiajie en 4 jours : pics de grès, pont de verre et mont Tianmen';
export const frenchLegacyStayNames = {
  'selected-city-stay': 'Hôtel en ville',
  'spacious-premium-stay': 'Hébergement supérieur, plus spacieux',
  'distinctive-mountain-stay': 'Hébergement de caractère en montagne',
} as const;

const stayIdByContractName = {
  'Selected City Stay': 'selected-city-stay',
  'Spacious Premium Stay': 'spacious-premium-stay',
  'Distinctive Mountain Stay': 'distinctive-mountain-stay',
} as const;

export function frenchLegacyDraftStayName(value: string | null | undefined): string | null {
  const id = value ? stayIdByContractName[value as keyof typeof stayIdByContractName] : null;
  return id ? frenchLegacyStayNames[id] : null;
}
