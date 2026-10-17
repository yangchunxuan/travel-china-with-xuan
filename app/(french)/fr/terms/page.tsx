import { FrenchLegalPage } from "../../../../components/FrenchLegalPage";
import { getFrenchLegalCopy } from "../../../../lib/frenchLegalCopy";
import { buildFrenchMetadata } from "../../../../lib/frenchSite";

const copy = getFrenchLegalCopy("terms");
export const metadata = buildFrenchMetadata(copy.metadata.title, copy.metadata.description, copy.pagePath, {
  en: "/terms/", "zh-Hans": "/zh/terms/", ko: "/ko/terms/", ja: "/ja/terms/", fr: copy.pagePath, es: copy.pagePath.replace("/fr/", "/es/"), de: "/de/terms/", ar: "/ar/terms/", "x-default": "/terms/",
});
export default function FrenchTermsPage() { return <FrenchLegalPage pageId="terms" />; }
