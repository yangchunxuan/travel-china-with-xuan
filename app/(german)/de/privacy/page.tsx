import { GermanLegalPage } from "../../../../components/GermanLegalPage";
import { getGermanLegalCopy } from "../../../../lib/germanLegalCopy";
import { buildGermanMetadata } from "../../../../lib/germanSite";

const copy = getGermanLegalCopy("privacy");
export const metadata = buildGermanMetadata(copy.metadata.title, copy.metadata.description, copy.pagePath, {
  en: "/privacy/", "zh-Hans": "/zh/privacy/", ko: "/ko/privacy/", ja: "/ja/privacy/", de: copy.pagePath, fr: copy.pagePath.replace("/de/", "/fr/"), es: copy.pagePath.replace("/de/", "/es/"), "x-default": "/privacy/",
});
export default function GermanPrivacyPage() { return <GermanLegalPage pageId="privacy" />; }
