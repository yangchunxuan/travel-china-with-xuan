import { CorporateEditionRoute, corporateEditionMetadata } from "../../../../components/CorporateEditionRoute";
export const dynamic = "force-static";
export const metadata = corporateEditionMetadata("fr");
export default function Page() { return <CorporateEditionRoute locale={"fr"} />; }
