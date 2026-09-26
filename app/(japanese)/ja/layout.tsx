import type { Metadata } from "next";
import { homegroundInternalRouteBootstrap } from "../../../lib/homegroundRouteSession";
import "../../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://homegroundchina.com/"),
  applicationName: "Homeground China",
  referrer: "origin",
  openGraph: { siteName: "Homeground China", type: "website" },
};

export default function JapanesePilotLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" dir="ltr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: homegroundInternalRouteBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
