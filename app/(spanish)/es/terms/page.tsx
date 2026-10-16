import { SpanishLegalPage } from "../../../../components/SpanishLegalPage";
import { getSpanishLegalCopy } from "../../../../lib/spanishLegalCopy";
import { buildSpanishMetadata } from "../../../../lib/spanishSite";

const copy = getSpanishLegalCopy("terms");
export const metadata = buildSpanishMetadata(copy.metadata.title, copy.metadata.description, copy.pagePath, {
  en: "/terms/", "zh-Hans": "/zh/terms/", ko: "/ko/terms/", ja: "/ja/terms/", fr: copy.pagePath.replace("/es/", "/fr/"), es: copy.pagePath, "x-default": "/terms/",
});
export default function SpanishTermsPage() { return <SpanishLegalPage pageId="terms" />; }
