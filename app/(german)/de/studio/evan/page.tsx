import type { Metadata } from "next";
import { EditionAuthorPage } from "../../../../../components/EditionAuthorPage";
import { editionAuthorMetadata } from "../../../../../lib/editionAuthor";

export const metadata: Metadata = editionAuthorMetadata("de");

export default function GermanAuthorRoute() {
  return <EditionAuthorPage language="de" />;
}
