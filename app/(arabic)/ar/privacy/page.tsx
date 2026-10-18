import { ArabicLegalPage } from "../../../../components/ArabicLegalPage";
import { getArabicLegalCopy } from "../../../../lib/arabicLegalCopy";
import { buildArabicMetadata } from "../../../../lib/arabicSite";

const copy = getArabicLegalCopy("privacy");
export const metadata = buildArabicMetadata(copy.metadata.title, copy.metadata.description, copy.pagePath, {
  en: "/privacy/", "zh-Hans": "/zh/privacy/", ko: "/ko/privacy/", ja: "/ja/privacy/", ar: copy.pagePath, fr: copy.pagePath.replace("/ar/", "/fr/"), es: copy.pagePath.replace("/ar/", "/es/"), de: copy.pagePath.replace("/ar/", "/de/"), "x-default": "/privacy/",
});
export default function ArabicPrivacyPage() { return <ArabicLegalPage pageId="privacy" />; }
