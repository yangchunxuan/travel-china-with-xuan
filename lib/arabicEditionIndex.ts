/** Only published Arabic-equivalent routes belong in this core registry. */
export const arabicSitePagePathByEnglishPath: Readonly<Record<string,string>> = Object.freeze({
  '/': '/ar/', '/tours/': '/ar/tours/', '/services/': '/ar/services/', '/studio/': '/ar/studio/', '/business-information/': '/ar/business-information/', '/guides/': '/ar/guides/',
  '/terms/': '/ar/terms/', '/privacy/': '/ar/privacy/', '/refund-delivery/': '/ar/refund-delivery/',
});
export function withArabicAlternate<T extends { alternates?: { languages?: object | null } | null }>(metadata:T, arPath:string | undefined):T {
  if (!arPath) return metadata;
  const alternates = metadata.alternates ?? {};
  return { ...metadata, alternates: { ...alternates, languages: { ...(alternates.languages ?? {}), ar: arPath } } };
}
