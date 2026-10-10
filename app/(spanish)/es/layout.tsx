import type { Metadata } from "next";
import { SpanishContactHost } from "../../../components/SpanishContactHost";
import { homegroundInternalRouteBootstrap } from "../../../lib/homegroundRouteSession";
import "../../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://homegroundchina.com/"),
  applicationName: "Homeground China",
  referrer: "origin",
  openGraph: { siteName: "Homeground China", type: "website" },
};

// Spanish pages use the main site's contact flow (SpanishContactHost). They
// carry no analytics, consent banner or newsletter prompt.
export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" dir="ltr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: homegroundInternalRouteBootstrap }} />
      </head>
      <body>{children}<SpanishContactHost /></body>
    </html>
  );
}
