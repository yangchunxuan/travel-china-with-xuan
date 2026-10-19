import type { Metadata } from "next";
import { EditionAuthorPage } from "../../../../../components/EditionAuthorPage";
import { editionAuthorMetadata } from "../../../../../lib/editionAuthor";

export const metadata: Metadata = editionAuthorMetadata("es");

export default function SpanishAuthorRoute() {
  return <EditionAuthorPage language="es" />;
}
