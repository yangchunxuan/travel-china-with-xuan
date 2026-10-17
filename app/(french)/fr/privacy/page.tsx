import { FrenchLegalPage } from "../../../../components/FrenchLegalPage";
import { getFrenchLegalCopy } from "../../../../lib/frenchLegalCopy";
import { buildFrenchMetadata } from "../../../../lib/frenchSite";

const copy = getFrenchLegalCopy("privacy");
export const metadata = buildFrenchMetadata(copy.metadata.title, copy.metadata.description, copy.pagePath, {
  en: "/privacy/", "zh-Hans": "/zh/privacy/", ko: "/ko/privacy/", ja: "/ja/privacy/", fr: copy.pagePath, es: copy.pagePath.replace("/fr/", "/es/"), de: "/de/privacy/", ar: "/ar/privacy/", "x-default": "/privacy/",
});
export default function FrenchPrivacyPage() { return <FrenchLegalPage pageId="privacy" />; }
