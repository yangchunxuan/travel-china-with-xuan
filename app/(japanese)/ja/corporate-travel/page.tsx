import { CorporateEditionRoute, corporateEditionMetadata } from "../../../../components/CorporateEditionRoute";
export const dynamic = "force-static";
export const metadata = corporateEditionMetadata("ja");
export default function Page() { return <CorporateEditionRoute locale={"ja"} />; }
