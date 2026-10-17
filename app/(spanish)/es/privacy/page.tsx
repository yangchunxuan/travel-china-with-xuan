import { SpanishLegalPage } from "../../../../components/SpanishLegalPage";
import { getSpanishLegalCopy } from "../../../../lib/spanishLegalCopy";
import { buildSpanishMetadata } from "../../../../lib/spanishSite";

const copy = getSpanishLegalCopy("privacy");
export const metadata = buildSpanishMetadata(copy.metadata.title, copy.metadata.description, copy.pagePath, {
  en: "/privacy/", "zh-Hans": "/zh/privacy/", ko: "/ko/privacy/", ja: "/ja/privacy/", fr: copy.pagePath.replace("/es/", "/fr/"), es: copy.pagePath, de: "/de/privacy/", "x-default": "/privacy/",
});
export default function SpanishPrivacyPage() { return <SpanishLegalPage pageId="privacy" />; }
