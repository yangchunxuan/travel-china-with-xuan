import { SpanishLegalPage } from "../../../../components/SpanishLegalPage";
import { getSpanishLegalCopy } from "../../../../lib/spanishLegalCopy";
import { buildSpanishMetadata } from "../../../../lib/spanishSite";

const copy = getSpanishLegalCopy("refund-delivery");
export const metadata = buildSpanishMetadata(copy.metadata.title, copy.metadata.description, copy.pagePath, {
  en: "/refund-delivery/", "zh-Hans": "/zh/refund-delivery/", ko: "/ko/refund-delivery/", ja: "/ja/refund-delivery/", fr: copy.pagePath.replace("/es/", "/fr/"), es: copy.pagePath, de: "/de/refund-delivery/", "x-default": "/refund-delivery/",
});
export default function SpanishRefundPage() { return <SpanishLegalPage pageId="refund-delivery" />; }
