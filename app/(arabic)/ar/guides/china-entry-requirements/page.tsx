import { ChinaEntryGuidesEditionPage } from "../../../../../components/ChinaEntryGuidesEditionPage";
import { entryRequirementsEditionMetadata } from "../../../../../lib/entryRequirementsEditions";

export const dynamic = "force-static";
export const metadata = entryRequirementsEditionMetadata("ar");

export default function ChinaEntryRequirementsEditionRoute() {
  return <ChinaEntryGuidesEditionPage language="ar" />;
}
