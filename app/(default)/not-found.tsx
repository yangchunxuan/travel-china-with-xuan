import type { Metadata } from "next";
import { NotFoundPage } from "../../components/NotFoundPage";

export const metadata: Metadata = {
  title: { absolute: "Page not found — Homeground China" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundPage />;
}
