import { JapaneseCorporateTravelHubPage } from "../../../../components/JapaneseCorporateTravelPages";
import { buildJapaneseCorporateTravelMetadata, japaneseCorporateTravelSchema } from "../../../../lib/japaneseCorporateTravelMetadata";

export const metadata = buildJapaneseCorporateTravelMetadata();
export default function Page() {
  return <><JapaneseCorporateTravelHubPage /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(japaneseCorporateTravelSchema()).replace(/</g, "\\u003c") }} /></>;
}
