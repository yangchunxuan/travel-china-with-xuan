import { FrenchLegalPage } from "../../../../components/FrenchLegalPage";
import { getFrenchLegalCopy } from "../../../../lib/frenchLegalCopy";
import { buildFrenchMetadata } from "../../../../lib/frenchSite";

const copy = getFrenchLegalCopy("refund-delivery");
export const metadata = buildFrenchMetadata(copy.metadata.title, copy.metadata.description, copy.pagePath, {
  en: "/refund-delivery/", "zh-Hans": "/zh/refund-delivery/", ko: "/ko/refund-delivery/", ja: "/ja/refund-delivery/", fr: copy.pagePath, es: copy.pagePath.replace("/fr/", "/es/"), "x-default": "/refund-delivery/",
});
export default function FrenchRefundPage() { return <FrenchLegalPage pageId="refund-delivery" />; }
