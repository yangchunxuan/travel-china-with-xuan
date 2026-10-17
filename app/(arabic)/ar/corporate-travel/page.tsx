import { CorporateEditionRoute, corporateEditionMetadata } from "../../../../components/CorporateEditionRoute";
export const dynamic = "force-static";
export const metadata = corporateEditionMetadata("ar");
export default function Page() { return <CorporateEditionRoute locale={"ar"} />; }
