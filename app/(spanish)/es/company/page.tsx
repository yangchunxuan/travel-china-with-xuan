import { HomegroundCompanyPage } from "../../../../components/HomegroundCompanyPage";
import { buildCompanyEditionMetadata } from "../../../../lib/editionPageMetadata";

// Draft copy, as the English page: kept out of search until the owner approves the text.
export const metadata = buildCompanyEditionMetadata("es");
export default function CompanyPage() { return <HomegroundCompanyPage editionLocale="es" />; }
