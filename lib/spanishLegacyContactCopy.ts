/** Shared by the legacy page and client contact adapters; contains no pricing or itinerary data. */
export const spanishLegacyZhangjiajieContactTitle = 'Zhangjiajie en 4 días: picos de arenisca, puente de cristal y montaña Tianmen';
export const spanishLegacyStayNames = {
  'selected-city-stay': 'Hotel en la ciudad',
  'spacious-premium-stay': 'Alojamiento superior con más espacio',
  'distinctive-mountain-stay': 'Alojamiento con carácter en la montaña',
} as const;

const stayIdByContractName = {
  'Selected City Stay': 'selected-city-stay',
  'Spacious Premium Stay': 'spacious-premium-stay',
  'Distinctive Mountain Stay': 'distinctive-mountain-stay',
} as const;

export function spanishLegacyDraftStayName(value: string | null | undefined): string | null {
  const id = value ? stayIdByContractName[value as keyof typeof stayIdByContractName] : null;
  return id ? spanishLegacyStayNames[id] : null;
}
