import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TerracottaHalfDayDraftPage } from "../../../../components/TerracottaHalfDayDraftPage";
import { terracottaHalfDayCopy } from "../../../../lib/terracottaHalfDayDraft";

export const metadata: Metadata = {
  title: terracottaHalfDayCopy.en.title,
  description: terracottaHalfDayCopy.en.description,
  robots: { index: false, follow: false },
};

export default function TerracottaHalfDayDraftRoute() {
  if (process.env.NODE_ENV === "production") notFound();
  return <TerracottaHalfDayDraftPage locale="en" />;
}
