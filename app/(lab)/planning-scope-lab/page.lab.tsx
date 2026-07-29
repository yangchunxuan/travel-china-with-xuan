import type { Metadata } from "next";
import { PlanningScopeLab } from "./PlanningScopeLab";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
  title: "Section three review — Homeground design lab",
};

export default function PlanningScopeLabPage() {
  return <PlanningScopeLab />;
}
