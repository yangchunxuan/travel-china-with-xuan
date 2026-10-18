import { GermanLegalPage } from "../../../../components/GermanLegalPage";
import { getGermanLegalCopy } from "../../../../lib/germanLegalCopy";
import { buildGermanMetadata } from "../../../../lib/germanSite";

const copy = getGermanLegalCopy("refund-delivery");
export const metadata = buildGermanMetadata(copy.metadata.title, copy.metadata.description, copy.pagePath, {
  en: "/refund-delivery/", "zh-Hans": "/zh/refund-delivery/", ko: "/ko/refund-delivery/", ja: "/ja/refund-delivery/", de: copy.pagePath, fr: copy.pagePath.replace("/de/", "/fr/"), es: copy.pagePath.replace("/de/", "/es/"), ar: copy.pagePath.replace("/de/", "/ar/"), "x-default": "/refund-delivery/",
});
export default function GermanRefundPage() { return <GermanLegalPage pageId="refund-delivery" />; }
