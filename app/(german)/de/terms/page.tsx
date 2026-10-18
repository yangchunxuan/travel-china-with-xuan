import { GermanLegalPage } from "../../../../components/GermanLegalPage";
import { getGermanLegalCopy } from "../../../../lib/germanLegalCopy";
import { buildGermanMetadata } from "../../../../lib/germanSite";

const copy = getGermanLegalCopy("terms");
export const metadata = buildGermanMetadata(copy.metadata.title, copy.metadata.description, copy.pagePath, {
  en: "/terms/", "zh-Hans": "/zh/terms/", ko: "/ko/terms/", ja: "/ja/terms/", de: copy.pagePath, fr: copy.pagePath.replace("/de/", "/fr/"), es: copy.pagePath.replace("/de/", "/es/"), ar: copy.pagePath.replace("/de/", "/ar/"), "x-default": "/terms/",
});
export default function GermanTermsPage() { return <GermanLegalPage pageId="terms" />; }
