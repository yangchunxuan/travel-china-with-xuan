/** Only equivalents with a real German page belong here. */
export const germanSitePagePathByEnglishPath: Readonly<Record<string,string>> = Object.freeze({
  '/': '/de/', '/tours/': '/de/tours/', '/services/': '/de/services/', '/studio/': '/de/studio/', '/business-information/': '/de/business-information/', '/guides/': '/de/guides/',
  '/terms/': '/de/terms/', '/privacy/': '/de/privacy/', '/refund-delivery/': '/de/refund-delivery/',
});
export function withGermanAlternate<T extends { alternates?: { languages?: object | null } | null }>(metadata:T, dePath:string | undefined):T {
  if (!dePath) return metadata;
  const alternates = metadata.alternates ?? {};
  return { ...metadata, alternates: { ...alternates, languages: { ...(alternates.languages ?? {}), de: dePath } } };
}
