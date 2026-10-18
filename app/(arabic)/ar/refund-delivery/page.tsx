import { ArabicLegalPage } from "../../../../components/ArabicLegalPage";
import { getArabicLegalCopy } from "../../../../lib/arabicLegalCopy";
import { buildArabicMetadata } from "../../../../lib/arabicSite";

const copy = getArabicLegalCopy("refund-delivery");
export const metadata = buildArabicMetadata(copy.metadata.title, copy.metadata.description, copy.pagePath, {
  en: "/refund-delivery/", "zh-Hans": "/zh/refund-delivery/", ko: "/ko/refund-delivery/", ja: "/ja/refund-delivery/", ar: copy.pagePath, fr: copy.pagePath.replace("/ar/", "/fr/"), es: copy.pagePath.replace("/ar/", "/es/"), de: copy.pagePath.replace("/ar/", "/de/"), "x-default": "/refund-delivery/",
});
export default function ArabicRefundPage() { return <ArabicLegalPage pageId="refund-delivery" />; }
