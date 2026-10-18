import { ArabicLegalPage } from "../../../../components/ArabicLegalPage";
import { getArabicLegalCopy } from "../../../../lib/arabicLegalCopy";
import { buildArabicMetadata } from "../../../../lib/arabicSite";

const copy = getArabicLegalCopy("terms");
export const metadata = buildArabicMetadata(copy.metadata.title, copy.metadata.description, copy.pagePath, {
  en: "/terms/", "zh-Hans": "/zh/terms/", ko: "/ko/terms/", ja: "/ja/terms/", ar: copy.pagePath, fr: copy.pagePath.replace("/ar/", "/fr/"), es: copy.pagePath.replace("/ar/", "/es/"), de: copy.pagePath.replace("/ar/", "/de/"), "x-default": "/terms/",
});
export default function ArabicTermsPage() { return <ArabicLegalPage pageId="terms" />; }
