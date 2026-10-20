import type { Metadata } from "next";
import { EditionAuthorPage } from "../../../../../components/EditionAuthorPage";
import { editionAuthorMetadata } from "../../../../../lib/editionAuthor";

export const metadata: Metadata = editionAuthorMetadata("ar");

export default function ArabicAuthorRoute() {
  return <EditionAuthorPage language="ar" />;
}
