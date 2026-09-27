import type { Metadata } from "next";
import { JapaneseStudioPage } from "../../../../components/JapaneseStudioPage";
import { buildJapaneseSocialMetadata, japaneseAlternates, japaneseSite } from "../../../../lib/japaneseSite";
import { japaneseStudioCopy as copy } from "../../../../lib/japaneseStudioCopy";

const evan = copy.members.find((member) => member.id === "evan");

export const metadata: Metadata = {
  title: { absolute: copy.metadata.title },
  description: copy.metadata.description,
  alternates: {
    canonical: japaneseSite.studio,
    languages: japaneseAlternates("/studio/", japaneseSite.studio),
  },
  robots: { index: true, follow: true },
  ...buildJapaneseSocialMetadata({
    title: copy.metadata.openGraphTitle,
    description: copy.metadata.description,
    url: japaneseSite.studio,
    image: evan
      ? {
          url: `https://homegroundchina.com${evan.image.src}`,
          width: evan.image.width,
          height: evan.image.height,
          alt: evan.image.alt,
        }
      : undefined,
  }),
};

export default function JapaneseStudioRoute() {
  return <JapaneseStudioPage />;
}
