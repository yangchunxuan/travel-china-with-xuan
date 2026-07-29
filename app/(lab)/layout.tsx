import type { Metadata } from "next";
import "../globals.css";

/**
 * Root layout for local design labs. These routes are never indexed and are
 * removed from the production export by tools/prune-production-export.mjs, so
 * they deliberately skip analytics and the marketing metadata defaults.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://homegroundchina.com/"),
  robots: { index: false, follow: false, nocache: true },
  title: "Homeground design lab (not published)",
};

export default function LabRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* The dev-server indicator floats over the artwork being reviewed. */}
        <style>{"nextjs-portal { display: none; }"}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
