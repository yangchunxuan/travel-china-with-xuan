import type { Metadata } from "next";
import { EditionAuthorPage } from "../../../../../components/EditionAuthorPage";
import { editionAuthorMetadata } from "../../../../../lib/editionAuthor";

export const metadata: Metadata = editionAuthorMetadata("fr");

export default function FrenchAuthorRoute() {
  return <EditionAuthorPage language="fr" />;
}
