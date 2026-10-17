import { CorporateTravelHubPage } from "../../../components/CorporateTravelPages";
import { buildCorporateTravelMetadata, corporateTravelSchema } from "../../../lib/corporateTravelMetadata";

export const metadata = buildCorporateTravelMetadata();
export default function CorporateTravelRoute() {
  return <><CorporateTravelHubPage /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(corporateTravelSchema()).replace(/</g, "\\u003c") }} /></>;
}
