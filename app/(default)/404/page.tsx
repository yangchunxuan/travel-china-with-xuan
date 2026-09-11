import type { Metadata } from "next";
import { NotFoundPage } from "../../../components/NotFoundPage";

// Rendered to out/404/index.html and promoted to out/404.html by
// tools/promote-not-found-export.mjs, because the route-group root layouts
// keep Next from using app/not-found.tsx for the static export's 404 page.
export const metadata: Metadata = {
  title: { absolute: "Page not found — Homeground China" },
  robots: { index: false, follow: true },
};

export default function NotFoundRoute() {
  return <NotFoundPage />;
}
