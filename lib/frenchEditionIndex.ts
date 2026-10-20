/** Only equivalents with a real French page belong here. */
export const frenchSitePagePathByEnglishPath: Readonly<Record<string,string>> = Object.freeze({
  '/': '/fr/', '/tours/': '/fr/tours/', '/services/': '/fr/services/', '/studio/': '/fr/studio/', '/studio/evan/': '/fr/studio/evan/', '/business-information/': '/fr/business-information/', '/guides/': '/fr/guides/',
  '/terms/': '/fr/terms/', '/privacy/': '/fr/privacy/', '/refund-delivery/': '/fr/refund-delivery/',
});
export function withFrenchAlternate<T extends { alternates?: { languages?: object | null } | null }>(metadata:T, frPath:string | undefined):T {
  if (!frPath) return metadata;
  const alternates = metadata.alternates ?? {};
  return { ...metadata, alternates: { ...alternates, languages: { ...(alternates.languages ?? {}), fr: frPath } } };
}
