import type { Metadata } from "next";
import { JapaneseAuthorPage } from "../../../../../components/JapaneseAuthorPage";
import { japaneseEditorialAuthor as author } from "../../../../../lib/japaneseAuthorCopy";
import { buildJapaneseSocialMetadata, japaneseAlternates } from "../../../../../lib/japaneseSite";

export const metadata: Metadata = {
  title: { absolute: author.copy.title },
  description: author.copy.introduction,
  alternates: {
    canonical: author.path,
    languages: japaneseAlternates("/studio/evan/", author.path),
  },
  robots: { index: true, follow: true },
  ...buildJapaneseSocialMetadata({
    title: author.copy.title,
    description: author.copy.introduction,
    url: author.path,
    type: "profile",
    image: {
      url: `https://homegroundchina.com${author.image.src}`,
      width: author.image.width,
      height: author.image.height,
      alt: author.image.alt,
    },
  }),
};

export default function JapaneseAuthorRoute() {
  return <JapaneseAuthorPage />;
}
