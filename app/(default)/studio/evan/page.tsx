import type { Metadata } from "next";
import { EditorialAuthorPage } from "../../../../components/EditorialAuthorPage";
import { getEditorialAuthor, getEditorialAuthorLanguagePaths } from "../../../../lib/editorialIdentity";

const author = getEditorialAuthor("en");
export const metadata: Metadata = {
  title: author.copy.title,
  description: author.copy.introduction,
  alternates: { canonical: author.path, languages: { ...getEditorialAuthorLanguagePaths(), "x-default": author.path } },
  openGraph: { type: "profile", title: author.copy.title, description: author.copy.introduction, url: author.path, images: [author.image.src] },
};
export default function Page() { return <EditorialAuthorPage locale="en" />; }
